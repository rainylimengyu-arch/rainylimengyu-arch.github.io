import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  evaluateFormula,
  additionDecision,
  alternativesFor,
  validateStarter,
  starterIds,
} from "../src/pairing-engine.js";
import {
  pairRules,
  ingredientProfiles,
  starterRainbows,
  futureRules,
} from "../src/pairing-library.js";

const catalog = JSON.parse(
  await readFile(
    new URL("../src/nutrient-library.json", import.meta.url),
    "utf8",
  ),
);
const ids = catalog.items.map((n) => n.id);
test("all 39 catalog IDs have exactly one non-cleared review profile", () => {
  assert.equal(ingredientProfiles.length, 39);
  assert.deepEqual(ingredientProfiles.map((p) => p.id).sort(), ids.toSorted());
  assert.ok(
    ingredientProfiles.every((p) => p.formulationStatus === "not-cleared"),
  );
});
test("all rules have sources, evidence and valid IDs; reserved rules stay separate", () => {
  assert.ok(
    pairRules.every(
      (r) =>
        r.sourceIds.length &&
        r.evidence &&
        r.members.every((id) => ids.includes(id)),
    ),
  );
  assert.ok(
    futureRules.every((r) => r.members.some((id) => !ids.includes(id))),
  );
});
test("no listed conflict never means production clearance", () => {
  assert.equal(
    evaluateFormula(["vitamin-c", "vitamin-b12"]).releaseStatus,
    "not-cleared",
  );
});
test("all 741 unordered pairs have symmetric decisions", () => {
  let count = 0;
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++) {
      assert.deepEqual(
        evaluateFormula([ids[i], ids[j]]),
        evaluateFormula([ids[j], ids[i]]),
      );
      count++;
    }
  assert.equal(count, 741);
});
for (const value of [0, 12, 24.99])
  test(`final iron ${value} mg does not trigger the >=25 mg zinc hold`, () => {
    assert.equal(
      evaluateFormula(["iron", "zinc"], {
        amounts: { iron: { value, unit: "mg", status: "final" } },
      }).ok,
      true,
    );
  });
for (const value of [25, 30])
  test(`final iron ${value} mg triggers zinc hold`, () => {
    const r = evaluateFormula(["iron", "zinc"], {
      amounts: { iron: { value, unit: "mg", status: "final" } },
    });
    assert.equal(r.ok, false);
    assert.equal(r.issues[0].doseStatus, "threshold-met");
  });
for (const dose of [
  undefined,
  { value: 12, unit: "mg", status: "reference" },
  { value: 12, unit: "g", status: "final" },
  { value: -1, unit: "mg", status: "final" },
])
  test(`unconfirmed/invalid iron amount stays held: ${JSON.stringify(dose)}`, () => {
    assert.equal(
      evaluateFormula(["iron", "zinc"], { amounts: { iron: dose } }).issues[0]
        .doseStatus,
      "unknown",
    );
  });
test("all simultaneous issues are returned, including capacity", () => {
  const r = evaluateFormula([
    "iron",
    "zinc",
    "hydrocurc",
    "ginseng",
    "tart-cherry",
    "iodine",
    "ashwagandha",
    "vitamin-c",
  ]);
  for (const id of [
    "capacity",
    "iron-zinc",
    "iron-curcumin",
    "iodine-ashwagandha",
    "ginseng-ashwagandha",
    "ginseng-tart-cherry",
  ])
    assert.ok(r.issues.some((r) => r.id === id));
});
test("removal always works even from an invalid legacy formula", () => {
  assert.equal(additionDecision(["iron", "zinc"], "iron").action, "remove");
  assert.equal(additionDecision(["iron", "zinc"], "iron").ok, true);
});
test("adding cannot ignore an existing conflict", () =>
  assert.equal(additionDecision(["iron", "zinc"], "vitamin-c").ok, false));
test("5-HTP is held even alone, no melatonin or unknown IDs", () => {
  assert.equal(evaluateFormula(["5-htp"]).ok, false);
  assert.equal(evaluateFormula(["melatonin"]).ok, false);
  assert.equal(evaluateFormula(["unknown"]).ok, false);
});
test("common combinations are not blanket-banned", () => {
  for (const pair of [
    ["zinc", "magnesium"],
    ["vitamin-d3", "vitamin-k2"],
    ["vitamin-c", "vitamin-b12"],
    ["folic-acid", "vitamin-b12"],
    ["omega-3", "vitamin-e"],
  ])
    assert.equal(evaluateFormula(pair).ok, true);
});
test("duplicate IDs and >7 capacity fail", () => {
  assert.equal(evaluateFormula(["vitamin-c", "vitamin-c"]).ok, false);
  assert.equal(evaluateFormula(ids.slice(0, 8)).ok, false);
});
test("each of seven starter rainbows contains seven unique known IDs and passes current rules", () => {
  assert.equal(starterRainbows.length, 7);
  for (const starter of starterRainbows) {
    assert.equal(new Set(starterIds(starter)).size, 7);
    assert.equal(validateStarter(starter.id).ok, true);
    assert.equal(starterIds(starter).includes("5-htp"), false);
  }
  assert.equal(validateStarter("unknown").ok, false);
});
test("alternatives are new ingredients and the entire resulting formula passes", () => {
  for (const attempted of ids)
    for (const selected of ids) {
      for (const alt of alternativesFor([selected], attempted)) {
        assert.notEqual(alt, selected);
        assert.notEqual(alt, attempted);
        assert.equal(evaluateFormula([selected, alt]).ok, true);
      }
    }
});
test("full rainbows never offer silently replacing alternatives", () => {
  assert.deepEqual(
    alternativesFor(starterIds(starterRainbows[0]), "ginseng"),
    [],
  );
});
test("60+ and energy never insert iron automatically; mood has no ginseng/5-HTP", () => {
  for (const id of ["sixty-plus", "energy"])
    assert.equal(
      starterIds(starterRainbows.find((s) => s.id === id)).includes("iron"),
      false,
    );
  for (const id of ["ginseng", "5-htp"])
    assert.equal(
      starterIds(starterRainbows.find((s) => s.id === "mood-sleep")).includes(
        id,
      ),
      false,
    );
});
