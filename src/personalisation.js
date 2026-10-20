import personalisationTranslations from "./i18n-personalisation.js";
import {
  intakeQuestions,
  supplementRecommendations,
} from "./supplement-recommendations.js";
export { intakeQuestions };

export const goals = [
  {
    id: "everyday",
    label: "Everyday wellbeing",
    discussion:
      "Review meal patterns and food variety as a starting point for your everyday nutrition.",
  },
  {
    id: "energy",
    label: "Energy & vitality",
    discussion:
      "Discuss your eating pattern, activity and rest alongside your energy goals.",
  },
  {
    id: "sleep",
    label: "Sleep & relaxation",
    discussion:
      "Explore your evening routine, sleep pattern and everyday food and drink choices.",
  },
  {
    id: "gut",
    label: "Gut wellbeing",
    discussion:
      "Discuss food variety, digestive tolerance and any concerns you want to raise.",
  },
  {
    id: "active",
    label: "Active lifestyle",
    discussion: "Review your activity, meals and recovery routine together.",
  },
  {
    id: "beauty",
    label: "Skin, hair & nails",
    discussion:
      "Review your overall dietary pattern and any changes you want to discuss with a professional.",
  },
];

export const healthOptions = [
  ["medicines", "I take prescription or over-the-counter medicines"],
  ["supplements", "I currently take supplements"],
  ["pregnancy", "I am pregnant, breastfeeding or planning pregnancy"],
  ["conditions", "I have a diagnosed health condition"],
  ["allergies", "I have food allergies or intolerances"],
  ["private", "I am unsure or would prefer to discuss this privately"],
  ["none", "None of these apply to me"],
];
export const ageRanges = ["Under 18", "18–29", "30–44", "45–59", "60+"];
export const diets = ["Mixed diet", "Vegetarian", "Vegan", "Other"];
export const initialAnswers = {
  goals: [],
  age: "",
  diet: "",
  plants: "",
  activity: "",
  sleep: "",
  b12Foods: "",
  calciumFoods: "",
  fish: "",
  sunlight: "",
  health: [],
  notes: "",
  consent: false,
};

export function formIssues(answers) {
  const issues = {};
  if (
    !answers.goals.length ||
    answers.goals.length > 3 ||
    answers.goals.some((id) => !goals.some((goal) => goal.id === id))
  ) {
    issues.goals = "Choose between 1 and 3 priorities.";
  }
  if (!ageRanges.includes(answers.age))
    issues.age = "Please select your age range.";
  if (answers.age === "Under 18")
    issues.age =
      "This questionnaire is for adults aged 18+. Please speak with a qualified healthcare professional about nutrition for under-18s.";
  if (!diets.includes(answers.diet))
    issues.diet = "Please choose your usual eating pattern.";
  for (const question of intakeQuestions) {
    if (!question.options.includes(answers[question.name]))
      issues[question.name] =
        "Please choose an answer, including Not sure if needed.";
  }
  if (
    !answers.health.length ||
    answers.health.some((id) => !healthOptions.some(([known]) => known === id))
  )
    issues.health =
      "Please select your health context, None of these apply, or Unsure / private.";
  else if (answers.health.includes("none") && answers.health.length > 1)
    issues.health =
      "None of these apply cannot be combined with another health answer.";
  if (!answers.consent)
    issues.consent = "Please acknowledge the supplement report notice.";
  return issues;
}

const allowedFiles = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
};
export const maxFileBytes = 10 * 1024 * 1024;
export function selectAttachments(current, incoming) {
  const files = [...current];
  const errors = [];
  for (const file of incoming) {
    const extension = file.name.split(".").pop().toLowerCase();
    const mimeTypes = allowedFiles[extension];
    if (!mimeTypes || (file.type && !mimeTypes.includes(file.type))) {
      errors.push(`${file.name}: please choose a PDF, JPG or PNG.`);
    } else if (!file.size || file.size > maxFileBytes) {
      errors.push(
        `${file.name}: files must be non-empty and no larger than 10 MB.`,
      );
    } else if (
      files.some(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      )
    ) {
      errors.push(`${file.name} is already added.`);
    } else if (files.length >= 3) {
      errors.push("You can add up to 3 files. Remove a file to add another.");
    } else {
      files.push(file);
    }
  }
  return { files, errors: [...new Set(errors)] };
}

export function createDraftReport(answers, files, { tier = "standard" } = {}) {
  if (Object.keys(formIssues(answers)).length)
    throw new Error("Complete the required questionnaire fields first.");
  const isPlus = tier === "plus";
  const recommendations = supplementRecommendations(answers);
  return {
    ...recommendations,
    isPlus,
    status: isPlus
      ? "Pending BUBU nutritionist review"
      : "Self-guided supplement suggestions",
    created: new Date().toISOString(),
    profile: {
      ...answers,
      goals: [...answers.goals],
      health: [...answers.health],
    },
    priorities: goals.filter((goal) => answers.goals.includes(goal.id)),
    attachments: isPlus
      ? files.map((file) => ({ name: file.name, size: file.size }))
      : [],
    healthContext: healthOptions
      .filter(([id]) => answers.health.includes(id))
      .map(([, label]) => label),
    foodFirst:
      "Use food and fortified foods to cover needs where practical. Questionnaire answers alone do not establish a deficiency, and supplements do not replace a varied diet.",
    reviewNote: recommendations.needsReview
      ? "Your health context or unreviewed notes need professional discussion before starting supplements. A nutritionist may need to involve your treating clinician or pharmacist. Existing supplements need a duplicate-ingredient check."
      : "No listed health factors were reported. This does not establish suitability or rule out interactions. Check product labels, total intake and personal suitability before use.",
  };
}

export function reportText(report, language = "en") {
  const p = report.profile;
  const t = (text) =>
    language === "zh" ? (personalisationTranslations[text] ?? text) : text;
  const field = (label, value) =>
    `${t(label)}${language === "zh" ? "：" : ": "}${t(value || "Not provided")}`;
  const separator = language === "zh" ? "；" : "; ";
  return [
    t(
      report.isPlus
        ? "VITA TAPE Plus × BUBU补补 — Your draft nutrition report"
        : "VITA TAPE — Your supplement recommendation report",
    ),
    `${t(report.status)} · ${t("Local demonstration")}`,
    t(
      report.isPlus
        ? "No review request has been sent. This is a questionnaire-based draft, not a diagnosis, approved plan or supplement prescription."
        : "Standard experience: questionnaire only. These self-guided supplement suggestions are not a diagnosis or supplement prescription. No professional review is included.",
    ),
    "",
    t(
      report.needsReview
        ? "SUPPLEMENTS TO DISCUSS AFTER REVIEW"
        : "YOUR SUPPLEMENT SUGGESTIONS",
    ),
    t(report.overview),
    ...[...report.recommendations, ...report.discussionItems].flatMap(
      (item, index) => [
        "",
        `${index + 1}. ${t(item.name)} — ${t(report.needsReview ? "Review before use" : item.priority)}`,
        field("Why this matches", item.reason),
        field("Food first", item.food),
        field("Before you start", item.caution),
        field("Next step", item.next),
        `${t("Evidence")}: ${t(item.source.title)} — ${item.source.url}`,
      ],
    ),
    "",
    t("NOT AUTOMATICALLY SUGGESTED"),
    ...report.notSelected.map(
      (item) =>
        `${t(item.name)}: ${t(item.reason)}${item.source ? ` [${t(item.source.title)} — ${item.source.url}]` : ""}`,
    ),
    ...(report.followUp.length
      ? ["", t("CHECK BEFORE DECIDING"), ...report.followUp.map(t)]
      : []),
    "",
    t("AMOUNTS & COMBINATIONS"),
    t(
      "No personal dose, treatment duration or combined Tape formula is prescribed. Check all existing products for overlap; final VITA TAPE forms and amounts remain unconfirmed.",
    ),
    "",
    t("YOUR EVERYDAY"),
    `${field("Age", p.age)}${separator}${field("Eating pattern", p.diet)}`,
    `${field("Plant foods", p.plants)}${separator}${field("Activity", p.activity)}${separator}${field("Sleep", p.sleep)}`,
    ...intakeQuestions.map((question) =>
      field(question.label, p[question.name]),
    ),
    "",
    t("YOUR PRIORITIES"),
    ...report.priorities.map(
      (item) =>
        `${t(item.label)}${language === "zh" ? "：" : ": "}${t(item.discussion)}`,
    ),
    "",
    t("FOOD-FIRST OPPORTUNITIES"),
    t(report.foodFirst),
    "",
    t("HEALTH CONTEXT"),
    ...(report.healthContext.length
      ? report.healthContext.map(t)
      : [t("Not provided")]),
    `${t("Optional notes")}${language === "zh" ? "：" : ": "}${p.notes || t("Not provided")}`,
    ...(report.isPlus
      ? [
          "",
          t("HEALTH REPORTS (OPTIONAL · PLUS)"),
          ...(report.attachments.length
            ? report.attachments.map(
                (file) =>
                  `${file.name}${t(" — selected locally, not uploaded or analysed")}`,
              )
            : [
                t(
                  "No files added — report upload is optional, including for Plus members",
                ),
              ]),
        ]
      : []),
    "",
    t("SUITABILITY & SAFETY CHECK"),
    t(report.reviewNote),
    "",
    ...(report.isPlus
      ? [
          t(
            "BUBU REVIEWER SIGN-OFF: Not yet reviewed. Reviewer identity and credentials are not assigned in this demonstration.",
          ),
        ]
      : []),
    t(
      "Any final recommendation and amounts require professional review. No ingredients have been added to your Tape.",
    ),
  ].join("\n");
}
