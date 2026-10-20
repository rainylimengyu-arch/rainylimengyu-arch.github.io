import test from "node:test";
import assert from "node:assert/strict";
import {
  createDraftReport,
  formIssues,
  initialAnswers,
  intakeQuestions,
  healthOptions,
  maxFileBytes,
  reportText,
  selectAttachments,
} from "../src/personalisation.js";

const valid = () => ({
  ...initialAnswers,
  goals: ["energy"],
  age: "30–44",
  diet: "Mixed diet",
  b12Foods: "Rarely either",
  calciumFoods: "Less than two servings most days",
  fish: "I do not eat fish",
  sunlight: "Rarely outdoors or usually covered",
  health: ["none"],
  consent: true,
});
const file = (name = "report.pdf", overrides = {}) => ({
  name,
  type: "application/pdf",
  size: 2000,
  lastModified: 1,
  ...overrides,
});

test("required answers and adult eligibility are enforced before report creation", () => {
  assert.deepEqual(Object.keys(formIssues(initialAnswers)), [
    "goals",
    "age",
    "diet",
    "b12Foods",
    "calciumFoods",
    "fish",
    "sunlight",
    "health",
    "consent",
  ]);
  assert.throws(() => createDraftReport(initialAnswers, []));
  assert.match(
    formIssues({ ...valid(), age: "Under 18" }).age,
    /adults aged 18/,
  );
  assert.ok(
    formIssues({ ...valid(), goals: ["everyday", "energy", "sleep", "gut"] })
      .goals,
  );
  assert.deepEqual(formIssues(valid()), {});
});

test("Plus reports remain optional and BUBU professional review stays pending", () => {
  const report = createDraftReport(valid(), [], { tier: "plus" });
  assert.equal(report.status, "Pending BUBU nutritionist review");
  assert.match(report.reviewNote, /does not establish suitability/);
  assert.deepEqual(report.attachments, []);
  const text = reportText(report);
  assert.match(text, /No review request has been sent/);
  assert.match(
    text,
    /not a diagnosis, approved plan or supplement prescription/,
  );
  assert.match(text, /BUBU REVIEWER SIGN-OFF: Not yet reviewed/);
  assert.match(text, /report upload is optional/);
});

test("health concerns require professional discussion and report holds an immutable answer snapshot", () => {
  const answers = {
    ...valid(),
    health: ["medicines", "pregnancy"],
    notes: "Example test note",
  };
  const attachment = file();
  const report = createDraftReport(answers, [attachment], { tier: "plus" });
  answers.goals.push("gut");
  answers.health.push("allergies");
  attachment.name = "changed.pdf";
  assert.deepEqual(report.profile.goals, ["energy"]);
  assert.equal(report.healthContext.length, 2);
  assert.match(report.reviewNote, /treating clinician or pharmacist/);
  assert.equal(report.attachments[0].name, "report.pdf");
  assert.match(
    reportText(report),
    /selected locally, not uploaded or analysed/,
  );
});

test("Standard completes with questionnaire only and cannot include Plus attachments or promise a review", () => {
  const report = createDraftReport(valid(), [file("ignored-standard.pdf")]);
  assert.equal(report.isPlus, false);
  assert.equal(report.status, "Self-guided supplement suggestions");
  assert.deepEqual(report.attachments, []);
  const text = reportText(report);
  assert.match(text, /Standard experience: questionnaire only/);
  assert.match(text, /No professional review is included/);
  assert.doesNotMatch(
    text,
    /BUBU|HEALTH REPORTS|REVIEWER SIGN-OFF|ignored-standard/,
  );
  assert.doesNotMatch(report.foodFirst, /nutritionist will review/);
});

test("attachments reject unsupported and mismatched file types, empty and oversize files", () => {
  const result = selectAttachments(
    [],
    [
      file("script.svg", { type: "image/svg+xml" }),
      file("fake.pdf", { type: "text/html" }),
      file("large.pdf", { size: maxFileBytes + 1 }),
      file("empty.pdf", { size: 0 }),
      file("safe.PNG", { type: "image/png" }),
      file("no-mime.jpg", { type: "" }),
    ],
  );
  assert.equal(result.files.length, 2);
  assert.equal(result.errors.length, 4);
});

test("attachments preserve existing selections, deduplicate and enforce the three-file limit", () => {
  const current = [file("one.pdf")];
  const result = selectAttachments(current, [
    file("one.pdf"),
    file("two.pdf"),
    file("three.pdf"),
    file("four.pdf"),
  ]);
  assert.deepEqual(
    result.files.map((item) => item.name),
    ["one.pdf", "two.pdf", "three.pdf"],
  );
  assert.equal(current.length, 1);
  assert.equal(result.errors.length, 2);
  assert.match(result.errors.join(" "), /already added/);
  assert.match(result.errors.join(" "), /up to 3 files/);
});

test("Chinese Standard export translates canonical answers and keeps the self-guided boundary", () => {
  const answers = {
    ...valid(),
    plants: "Most meals",
    activity: "Moderately active",
    sleep: "Good",
    notes: "Mixed diet is my own English note",
  };
  const report = createDraftReport(answers, []);
  const text = reportText(report, "zh");
  assert.match(text, /你的补充剂建议报告/);
  assert.match(text, /自助补充剂参考建议/);
  assert.match(text, /饮食方式：混合饮食/);
  assert.match(text, /植物性食物：大多数餐次；活动量：中等活动量；睡眠：良好/);
  assert.match(text, /精力与活力/);
  assert.match(text, /不包含专业审核/);
  assert.match(text, /不能判定营养缺乏/);
  assert.match(text, /备注（选填）：Mixed diet is my own English note/);
  assert.doesNotMatch(text, /BUBU|体检报告|营养师审核/);
  assert.equal(report.profile.diet, "Mixed diet");
  assert.equal(report.profile.activity, "Moderately active");
  assert.equal(reportText(report, "en"), reportText(report));
});

test("Chinese Plus export keeps reports optional and professional approval pending", () => {
  const report = createDraftReport(
    { ...valid(), health: ["medicines", "pregnancy"] },
    [],
    { tier: "plus" },
  );
  const text = reportText(report, "zh");
  assert.match(text, /待 BUBU补补营养师审核/);
  assert.match(text, /尚未发送审核申请/);
  assert.match(text, /我正在服用处方药或非处方药/);
  assert.match(text, /我正处于孕期、哺乳期或备孕期/);
  assert.match(text, /报告上传为选填，Plus 用户也可选择不上传/);
  assert.match(text, /BUBU补补审核签署：尚未审核/);
  assert.match(text, /主诊医生或药师/);
  assert.doesNotMatch(
    text,
    /Pending|YOUR EVERYDAY|Not provided|No files added/,
  );
  assert.equal(report.status, "Pending BUBU nutritionist review");
});

test("Chinese report download preserves user notes and attachment names without translating them", () => {
  const note = "Good; Under 18; My private note 真实备注";
  const filename = "Good health report 体检.pdf";
  const report = createDraftReport(
    { ...valid(), notes: note },
    [file(filename)],
    { tier: "plus" },
  );
  const text = reportText(report, "zh");
  assert.ok(text.includes(note));
  assert.ok(text.includes(`${filename} — 仅在本地选择，尚未上传或分析`));
  assert.match(text, /健康背景或尚未审核的备注进行专业沟通/);
  assert.match(text, /最终建议及用量均须经专业审核/);
  assert.deepEqual(report.attachments, [{ name: filename, size: 2000 }]);
});

test("new intake questions and required health choices have complete Chinese copy", async () => {
  const { hasTranslation, translateText } = await import("../src/i18n-core.js");
  const copy = [
    ...intakeQuestions.flatMap((question) => [
      question.label,
      question.hint,
      ...question.options,
    ]),
    ...healthOptions.map(([, label]) => label),
    ...Object.values(formIssues(initialAnswers)),
    ...Object.values(formIssues({ ...valid(), health: ["none", "medicines"] })),
  ];
  for (const source of copy) {
    assert.equal(hasTranslation(source), true, source);
    assert.match(translateText(source, "zh"), /\p{Script=Han}/u, source);
    assert.equal(translateText(source, "en"), source);
  }
});

test("Chinese supplement reports cover low intake, adequate intake, uncertain answers and review holds", async () => {
  const { hasTranslation, translateText } = await import("../src/i18n-core.js");
  const cases = [
    valid(),
    { ...valid(), goals: ["sleep", "beauty", "gut"] },
    {
      ...valid(),
      b12Foods: "Animal foods most days",
      calciumFoods: "At least two servings most days",
      fish: "Oily fish weekly",
      sunlight: "Regular time outdoors",
    },
    {
      ...valid(),
      b12Foods: "B12-fortified foods regularly",
      fish: "Less than weekly",
    },
    {
      ...valid(),
      b12Foods: "Not sure",
      calciumFoods: "Not sure",
      fish: "Not sure",
      sunlight: "Not sure",
    },
    { ...valid(), health: ["medicines"] },
    { ...valid(), notes: "My unchanged English note" },
  ];
  const seen = new Set();
  for (const answers of cases) {
    for (const tier of ["standard", "plus"]) {
      const report = createDraftReport(answers, [], { tier });
      const exported = reportText(report, "zh");
      const copy = [
        report.status,
        report.overview,
        report.foodFirst,
        report.reviewNote,
        ...report.followUp,
        ...[...report.recommendations, ...report.discussionItems].flatMap(
          (item) => [
            item.name,
            item.priority,
            item.reason,
            item.food,
            item.caution,
            item.next,
            item.source.title,
          ],
        ),
        ...report.notSelected.flatMap((item) => [
          item.name,
          item.reason,
          ...(item.source ? [item.source.title] : []),
        ]),
      ];
      for (const source of copy) {
        seen.add(source);
        assert.equal(hasTranslation(source), true, source);
        assert.notEqual(translateText(source, "zh"), source, source);
        // reportText uses the personalisation dictionary directly: verify that
        // export follows the same translation as the visible report UI.
        if (
          ![...report.recommendations, ...report.discussionItems].some(
            (item) => item.priority === source,
          ) ||
          !report.needsReview
        )
          assert.ok(exported.includes(translateText(source, "zh")), source);
      }
      assert.doesNotMatch(
        exported,
        /YOUR SUPPLEMENT|SUPPLEMENTS TO DISCUSS|Worth considering|No personal dose|Not sure|Animal foods|Your answers do not yet/,
      );
      assert.equal(reportText(report, "en"), reportText(report));
      if (answers.notes) assert.ok(exported.includes(answers.notes));
    }
  }
  assert.ok(seen.size > 40, "all recommendation and review branches exercised");
});

test("supplement shortlist responds to food evidence rather than assigning a goal-based stack", () => {
  const low = createDraftReport(valid(), []);
  assert.deepEqual(
    low.recommendations.map((item) => item.name),
    ["Vitamin B12", "Vitamin D", "Calcium"],
  );
  assert.equal(low.needsReview, false);
  assert.deepEqual(low.discussionItems, []);
  for (const item of low.recommendations) {
    assert.ok(item.reason && item.food && item.caution && item.next);
    assert.ok(item.source.url.startsWith("https://ods.od.nih.gov/"));
    assert.ok(reportText(low).includes(item.reason));
  }
  const adequate = createDraftReport(
    {
      ...valid(),
      b12Foods: "Animal foods most days",
      calciumFoods: "At least two servings most days",
      fish: "Oily fish weekly",
      sunlight: "Regular time outdoors",
      goals: ["sleep", "beauty", "gut"],
      sleep: "Poor",
    },
    [],
  );
  assert.deepEqual(adequate.recommendations, []);
  assert.match(adequate.overview, /do not yet support/);
  assert.ok(
    adequate.notSelected.some(
      (item) => item.name === "Magnesium / sleep blends",
    ),
  );
  assert.ok(
    adequate.notSelected.some((item) => item.name === "Biotin / beauty blends"),
  );
  assert.ok(adequate.notSelected.some((item) => item.name === "Probiotics"));
});

test("vegan diets with reliable fortified B12 do not get automatic extra B12", () => {
  const report = createDraftReport(
    { ...valid(), diet: "Vegan", b12Foods: "B12-fortified foods regularly" },
    [],
  );
  assert.equal(
    report.recommendations.some((item) => item.id === "vitamin-b12"),
    false,
  );
  assert.ok(report.notSelected.some((item) => item.name === "Vitamin B12"));
  // Not eating fish alone must never become a routine fish-oil recommendation.
  assert.equal(
    report.recommendations.some((item) => /omega/i.test(item.name)),
    false,
  );
});

test("every safety flag and unreviewed notes pause personal supplement recommendations", () => {
  for (const flag of [
    "medicines",
    "supplements",
    "pregnancy",
    "conditions",
    "allergies",
    "private",
  ]) {
    const report = createDraftReport({ ...valid(), health: [flag] }, []);
    assert.equal(report.needsReview, true, flag);
    assert.deepEqual(report.recommendations, [], flag);
    assert.equal(report.discussionItems.length, 3, flag);
    assert.match(reportText(report), /SUPPLEMENTS TO DISCUSS AFTER REVIEW/);
    assert.match(reportText(report), /Review before use/);
    assert.doesNotMatch(reportText(report), /YOUR SUPPLEMENT SUGGESTIONS/);
  }
  const note = createDraftReport(
    { ...valid(), notes: "I have a health detail to discuss" },
    [],
  );
  assert.equal(note.needsReview, true);
  assert.deepEqual(note.recommendations, []);
});

test("uncertain answers remain unanswered evidence, not presumed deficiency or automatic supplements", () => {
  const report = createDraftReport(
    {
      ...valid(),
      b12Foods: "Not sure",
      calciumFoods: "Not sure",
      fish: "Not sure",
      sunlight: "Not sure",
    },
    [],
  );
  assert.equal(report.recommendations.length, 0);
  assert.equal(report.followUp.length, 4);
  assert.ok(reportText(report).includes("CHECK BEFORE DECIDING"));
  assert.ok(formIssues({ ...valid(), health: [] }).health);
  assert.ok(formIssues({ ...valid(), health: ["none", "medicines"] }).health);
  assert.ok(formIssues({ ...valid(), b12Foods: "unrecognised" }).b12Foods);
});

test("Plus files do not alter supplement matching or claim document analysis", () => {
  const answers = valid();
  const noFiles = createDraftReport(answers, [], { tier: "plus" });
  const withFiles = createDraftReport(answers, [file()], { tier: "plus" });
  assert.deepEqual(noFiles.recommendations, withFiles.recommendations);
  assert.equal(withFiles.status, "Pending BUBU nutritionist review");
  assert.match(reportText(withFiles), /not uploaded or analysed/);
  assert.match(reportText(withFiles), /No personal dose/);
  assert.match(reportText(withFiles), /No ingredients have been added/);
});
