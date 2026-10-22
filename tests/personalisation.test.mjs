import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import {
  createDraftReport,
  formIssues,
  reportView,
  reportText,
  questionPlan,
  localQuestion,
  reconcileAnswers,
  validateQuestion,
  getSafetyDisposition,
  toggleOption,
  selectionConflict,
  selectAttachments,
  maxFileBytes,
} from "../src/personalisation.js";
import { buildRecommendationReport } from "../src/bubu/engine.js";
const fixtures = JSON.parse(
  fs.readFileSync(new URL("./bubu-fixtures.json", import.meta.url)),
);
const data = JSON.parse(
  fs.readFileSync(new URL("../src/nutrient-library.json", import.meta.url)),
);
const profile = (kind = "mixed", overrides = {}) => ({
  ...structuredClone(fixtures[kind]),
  ...overrides,
});
const file = (name = "report.pdf", overrides = {}) => ({
  name,
  type: "application/pdf",
  size: 2000,
  lastModified: 1,
  ...overrides,
});
const ids = (r) => r.cards.map((x) => x.id);
const sparsePlants = {
  vegetables: "zero",
  fruit: "zero",
  whole_grains: "zero",
  beans: "zero",
  nuts: "zero",
};
const sparseTypes = { greens: "rare", orange: "rare", potato: "rare" };

// The imported BUBU source is the user's source of truth, not a look-alike rewrite.
test("BUBU source snapshots match recorded hashes and the bundled engine preserves its recommendations", () => {
  const manifest = JSON.parse(
    fs.readFileSync(
      new URL("../resources/bubu-source/provenance.json", import.meta.url),
    ),
  );
  for (const entry of manifest.files) {
    const bytes = fs.readFileSync(
      new URL("../resources/bubu-source/" + entry.path, import.meta.url),
    );
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      entry.sha256,
      entry.path,
    );
  }
  const require = createRequire(import.meta.url),
    source = require("../resources/bubu-source/engine/recommendations-v6.js");
  for (const kind of ["balanced", "mixed"]) {
    const a = reconcileAnswers(profile(kind));
    assert.deepEqual(
      buildRecommendationReport(a),
      source.buildRecommendationReport(a),
    );
  }
});
test("a normal sleep and training profile produces the broad BUBU shortlist, not only three nutrients", () => {
  const r = createDraftReport(profile());
  assert.deepEqual(ids(r), [
    "vitamin_d",
    "calcium",
    "omega3",
    "creatine",
    "magnesium_glycinate",
    "theanine",
    "turmeric",
  ]);
  assert.equal(r.needsReview, false);
  assert.equal(reportView(r, "zh").programs.length, 4);
});
test("complete coverage includes all vitamins, minerals, macros and all 39 live Tape ingredients", () => {
  const r = createDraftReport(profile()),
    rows = r.coverage.flatMap((g) => g.items),
    v = reportView(r, "en");
  assert.equal(rows.length, 37);
  assert.equal(new Set(rows.map((x) => x.id)).size, 37);
  for (const id of [
    "vitamin_a",
    "vitamin_c",
    "vitamin_d",
    "vitamin_e",
    "vitamin_k",
    "b1",
    "b2",
    "b3",
    "b5",
    "b6",
    "b7",
    "b9",
    "b12",
    "calcium",
    "magnesium",
    "potassium",
    "iron",
    "zinc",
    "iodine",
    "selenium",
    "copper",
    "manganese",
    "phosphorus",
    "sodium_chloride",
    "molybdenum",
    "chromium",
    "fluoride",
    "choline",
    "protein",
    "carbohydrate",
    "fat",
    "fiber",
    "water",
    "energy",
    "omega3",
    "omega6",
    "ala",
  ])
    assert.ok(
      rows.some((r) => r.id === id),
      id,
    );
  assert.deepEqual(
    v.catalog.map((x) => x.id),
    data.items.map((x) => x.id),
  );
  assert.ok(
    v.catalog.every(
      (x) => x.reason && x.evidence && x.reference.url.startsWith("https://"),
    ),
  );
  assert.equal(
    v.catalog.some((x) => x.id === "melatonin"),
    false,
  );
});
test("stable food sources do not force a seven-ingredient stack", () => {
  const r = createDraftReport(profile("balanced"));
  assert.deepEqual(r.cards, []);
  assert.equal(r.coverageCount, 37);
  assert.equal(reportView(r, "zh").catalog.length, 39);
});
test("vegan B12 priority requires lack of a reliable source; regular fortification prevents duplication", () => {
  const a = profile("balanced", {
    diet_style: "vegan",
    dairy_food: {
      kind: "none",
      amount: "zero",
      tofu: "regular",
      tofu_kind: "calcium",
    },
    animal_food: { fish: "zero", meat: "zero", red_meat: "rare", eggs: "rare" },
    fortified: ["none"],
  });
  const first = createDraftReport(a);
  assert.ok(ids(first).includes("b12"));
  assert.equal(first.cards[0].id, "b12");
  assert.equal(first.cards[0].essential, true);
  const fortified = createDraftReport({
    ...a,
    fortified: ["b12", "vitamin_d"],
  });
  assert.equal(ids(fortified).includes("b12"), false);
});
test("a prolonged broad dietary restriction can match one basic multi even when functional options are declined", () => {
  const r = createDraftReport(
    profile("balanced", {
      diet_habits: {
        meals: "one_two",
        restriction: "many_foods",
        duration: "long",
      },
      plant_food: sparsePlants,
      plant_types: sparseTypes,
      animal_food: {
        fish: "zero",
        meat: "small",
        red_meat: "rare",
        eggs: "rare",
      },
      dairy_food: {
        kind: "none",
        amount: "zero",
        tofu: "zero",
        tofu_kind: "none",
      },
      fortified: ["none"],
      supplement_scope: { functional: "no", botanicals: "no" },
    }),
  );
  assert.ok(ids(r).includes("multivitamin"));
  assert.equal(
    ids(r).some((id) =>
      ["ginseng", "theanine", "turmeric", "creatine"].includes(id),
    ),
    false,
  );
});
test("food-first preference prevents automatic supplement candidates while retaining full review", () => {
  const a = profile();
  a.preferences.approach = "food";
  const r = createDraftReport(a);
  assert.deepEqual(r.cards, []);
  assert.equal(r.coverageCount, 37);
  assert.ok(r.foodActions.length);
});
test("known existing ingredients are not recommended again", () => {
  const r = createDraftReport(
    profile("mixed", {
      existing_sources: [
        "vitamin_d",
        "calcium",
        "omega3",
        "creatine",
        "magnesium",
        "theanine",
        "turmeric",
      ],
    }),
  );
  for (const id of [
    "vitamin_d",
    "calcium",
    "omega3",
    "creatine",
    "magnesium",
    "magnesium_glycinate",
    "theanine",
    "turmeric",
  ])
    assert.equal(ids(r).includes(id), false, id);
});
for (const [label, patch] of [
  [
    "medicines",
    {
      safety: ["medication"],
      health_detail: { conditions: ["none"], medicines: ["other"] },
    },
  ],
  [
    "kidney restrictions",
    {
      safety: ["medical_food_restriction_quick"],
      health_detail: { conditions: ["kidney"], medicines: ["none"] },
    },
  ],
  [
    "pregnancy",
    { profile: { ...fixtures.mixed.profile, life_stage: "pregnant" } },
  ],
  [
    "planning pregnancy",
    { profile: { ...fixtures.mixed.profile, life_stage: "planning" } },
  ],
  ["abnormal tests", { labs: ["d_low"] }],
  ["unknown safety", { safety: ["unknown"] }],
  ["unknown supplement", { existing_sources: ["unknown"] }],
  ["unknown allergy", { exclusions: ["unknown"] }],
  [
    "unintentional weight change",
    { profile: { ...fixtures.mixed.profile, weight_change: "unintentional" } },
  ],
  [
    "fluid restriction",
    {
      nutrition_basics: {
        staples: "regular",
        protein: "regular",
        water: "restricted",
        salty: "less",
      },
    },
  ],
])
  test(`${label} pauses personal supplement selection and retains full nutrient coverage`, () => {
    const r = createDraftReport(profile("mixed", patch));
    assert.equal(r.needsReview, true);
    assert.deepEqual(r.cards, []);
    assert.equal(r.coverageCount, 37);
    assert.equal(reportView(r, "zh").catalog.length, 39);
  });
test("contradictory vegan food records require correction before recommendations", () => {
  const r = createDraftReport(
    profile("mixed", {
      diet_style: "vegan",
      animal_food: {
        fish: "often",
        meat: "regular",
        red_meat: "some",
        eggs: "often",
      },
    }),
  );
  assert.equal(r.needsReview, true);
  assert.deepEqual(r.cards, []);
  assert.ok(r.checks.some((x) => x.id === "diet_consistency"));
});
test("urgent symptoms and minors never produce an adult supplement report", () => {
  const urgent = profile("mixed", { safety: ["urgent_chest_breathing"] });
  assert.equal(getSafetyDisposition(urgent).status, "stop");
  assert.throws(() => createDraftReport(urgent));
  assert.throws(() =>
    createDraftReport(profile("mixed", { audience: "minor_under_18" })),
  );
  assert.deepEqual(
    questionPlan({ audience: "minor_under_18" }).map((q) => q.id),
    ["audience"],
  );
});
test("sleep timing does not introduce melatonin into the VITA TAPE recommendations", () => {
  const a = profile();
  a.goal_context.sleep_timing = "jetlag";
  const r = createDraftReport(a);
  assert.equal(ids(r).includes("melatonin"), false);
});
test("botanical medicine and liver flags exclude botanical options without inventing a substitute", () => {
  const r = createDraftReport(
    profile("mixed", { botanical_safety: ["liver_gallbladder"] }),
  );
  assert.equal(ids(r).includes("turmeric"), false);
  assert.equal(ids(r).includes("ginseng"), false);
  assert.ok(r.checks.some((x) => x.id === "botanical_review"));
});
test("persistent sleep disruption does not become an automatic magnesium or relaxation stack", () => {
  const a = profile();
  a.sleep_context = {
    hours: "enough",
    frequency: "often",
    duration: "long",
    interference: ["snoring"],
  };
  a.impact = "persistent_impairing";
  const r = createDraftReport(a);
  assert.equal(ids(r).includes("magnesium_glycinate"), false);
  assert.equal(ids(r).includes("theanine"), false);
});
test("fibre and ginseng branches use their own context rather than selecting from a goal label alone", () => {
  const gut = profile("balanced", {
    goals: ["gut"],
    goal_priority: "gut",
    goal_detail: { gut: "constipation" },
    goal_context: { gut_safety: "none" },
  });
  assert.ok(ids(createDraftReport(gut)).includes("psyllium"));
  const unsafe = { ...gut, goal_context: { gut_safety: "swallowing" } };
  assert.equal(ids(createDraftReport(unsafe)).includes("psyllium"), false);
  const energy = profile("balanced", {
    goals: ["fatigue"],
    goal_priority: "fatigue",
    sleep_detail: ["none"],
    goal_context: { energy: "occasional" },
    sleep_context: {
      hours: "enough",
      frequency: "rare",
      duration: "short",
      interference: ["none"],
    },
  });
  assert.ok(ids(createDraftReport(energy)).includes("ginseng"));
});
test("skin appearance option respects vegan diet and fish / shellfish exclusions", () => {
  const a = profile("balanced", {
    goals: ["skin"],
    goal_priority: "skin",
    goal_detail: { skin: "appearance" },
  });
  assert.ok(ids(createDraftReport(a)).includes("collagen"));
  assert.equal(
    ids(createDraftReport({ ...a, exclusions: ["fish"] })).includes("collagen"),
    false,
  );
});
test("discussion selections never silently replace overlapping alternatives", () => {
  const r = createDraftReport(profile());
  assert.equal(
    selectionConflict(r, ["magnesium_glycinate"], "theanine"),
    "magnesium_glycinate",
  );
  assert.equal(selectionConflict(r, ["vitamin_d"], "creatine"), null);
  assert.equal(selectionConflict(r, [], "melatonin"), "unavailable");
});
test("changed goals prune stale follow-up answers and exclusive choices remain exclusive", () => {
  const a = profile();
  a.goals = ["gut"];
  a.goal_detail = { gut: "bloating" };
  a.goal_context = { gut_safety: "none" };
  const r = reconcileAnswers(a);
  assert.equal(r.sleep_detail, undefined);
  assert.equal(r.sleep_context, undefined);
  assert.equal(r.goal_context.energy, undefined);
  assert.deepEqual(toggleOption(["medication"], "none"), ["none"]);
  assert.deepEqual(toggleOption(["none"], "medication"), ["medication"]);
  assert.deepEqual(toggleOption(["unknown"], "medication"), ["medication"]);
});
test("English question copy covers every supported adult branch and validates no guessed defaults", () => {
  const cases = [
    profile(),
    profile("balanced"),
    profile("mixed", {
      safety: ["medication"],
      health_detail: { conditions: ["none"], medicines: ["other"] },
    }),
    profile("balanced", {
      goals: ["skin", "eyes", "gut", "joint", "fatigue", "stress", "sleep"],
      goal_priority: "joint",
      goal_detail: { skin: "appearance", eyes: "screen", gut: "bloating" },
      goal_context: {
        joint: "exercise",
        energy: "occasional",
        stress: "mild",
        sleep_timing: "none",
        gut_safety: "none",
      },
    }),
  ];
  for (const a of cases)
    for (const q of questionPlan(a)) {
      const english = localQuestion(q, "en");
      assert.doesNotMatch(
        JSON.stringify({
          title: english.title,
          helper: english.helper,
          options: english.options,
          fields: english.fields,
          rows: english.rows,
          choices: english.choices,
        }),
        /[\u3400-\u9fff]/,
        q.id,
      );
    }
  assert.ok(Object.keys(formIssues({})).length > 10);
  const q = questionPlan({}).find((q) => q.id === "nutrition_basics");
  assert.equal(validateQuestion(q, {}, {}).valid, false);
});
test("Standard excludes all files; Plus files stay optional, local, uninterpreted and pending", () => {
  const a = profile();
  const standard = createDraftReport(a, [file("ignored.pdf")]);
  assert.deepEqual(standard.attachments, []);
  assert.doesNotMatch(
    reportText(standard),
    /ignored.pdf|No files were uploaded|Reviewer sign-off/,
  );
  const plus = createDraftReport(a, [], { tier: "plus" });
  assert.equal(plus.isPlus, true);
  assert.match(reportText(plus), /Pending BUBU nutritionist review/);
  assert.match(reportText(plus), /No files were uploaded or analysed/);
  assert.match(reportText(plus), /files are optional/);
  assert.deepEqual(ids(plus), ids(standard));
});
test("both report languages include every recommendation, all 37 coverage rows and all 39 catalogue decisions", () => {
  const r = createDraftReport(profile(), [file("Private 原文件名.pdf")], {
    tier: "plus",
    notes: "Original English note 真实备注",
  });
  for (const language of ["en", "zh"]) {
    const v = reportView(r, language),
      text = reportText(r, language, ["creatine"]);
    for (const item of [
      ...v.cards,
      ...v.coverage.flatMap((g) => g.items),
      ...v.catalog,
    ])
      assert.ok(text.includes(item.name), item.name);
    assert.ok(text.includes("Original English note 真实备注"));
    assert.ok(text.includes("Private 原文件名.pdf"));
    assert.ok(text.includes("https://"));
  }
  assert.match(reportText(r, "zh"), /完整营养评估/);
  assert.match(reportText(r, "zh"), /待 BUBU补补营养师审核/);
  assert.match(reportText(r, "en", ["creatine"]), /In discussion shortlist/);
});
test("a generated report keeps an immutable snapshot, strips unused body-size data and never prescribes doses", () => {
  const a = profile(),
    attachment = file();
  const r = createDraftReport(a, [attachment], { tier: "plus" });
  a.goals.push("skin");
  a.profile.life_stage = "pregnant";
  attachment.name = "changed.pdf";
  assert.equal(r.answers.goals.includes("skin"), false);
  assert.equal(r.answers.profile.life_stage, "usual");
  assert.equal(r.attachments[0].name, "report.pdf");
  assert.equal(r.answers.profile.height_cm, undefined);
  assert.equal(r.answers.profile.weight_kg, undefined);
  assert.match(reportText(r), /does not diagnose deficiency, prescribe doses/);
});
test("attachment type, MIME, byte limit, duplicate and count rules are retained", () => {
  const bad = selectAttachments(
    [],
    [
      file("bad.svg", { type: "image/svg+xml" }),
      file("fake.pdf", { type: "text/html" }),
      file("large.pdf", { size: maxFileBytes + 1 }),
      file("empty.pdf", { size: 0 }),
      file("safe.PNG", { type: "image/png" }),
    ],
  );
  assert.equal(bad.files.length, 1);
  assert.equal(bad.errors.length, 4);
  const current = [file("one.pdf")],
    r = selectAttachments(current, [
      file("one.pdf"),
      file("two.pdf"),
      file("three.pdf"),
      file("four.pdf"),
    ]);
  assert.equal(r.files.length, 3);
  assert.equal(r.errors.length, 2);
  assert.equal(current.length, 1);
});
