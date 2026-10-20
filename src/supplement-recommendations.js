// Educational adult shortlist, not a prescription or a clinically cleared Tape.
// Rule rationale and source scope: resources/personalisation/recommendation-rules.md.
export const intakeQuestions = [
  {
    name: "b12Foods",
    label: "Where do you usually get vitamin B12?",
    hint: "Include meat, fish, eggs, dairy or foods labelled B12-fortified. Required; choose Not sure if needed.",
    options: [
      "Animal foods most days",
      "B12-fortified foods regularly",
      "Rarely either",
      "Not sure",
    ],
  },
  {
    name: "calciumFoods",
    label: "How often do you have calcium-rich foods?",
    hint: "A serving could be milk, yoghurt, a calcium-fortified plant drink or calcium-set tofu. This is a screening question, not a nutrient calculation.",
    options: [
      "At least two servings most days",
      "Less than two servings most days",
      "Not sure",
    ],
  },
  {
    name: "fish",
    label: "How often do you eat oily fish?",
    hint: "For example salmon, sardines or mackerel. Required; choose Not sure if needed.",
    options: [
      "Oily fish weekly",
      "Less than weekly",
      "I do not eat fish",
      "Not sure",
    ],
  },
  {
    name: "sunlight",
    label: "What is your usual outdoor routine?",
    hint: "Required. This cannot measure vitamin D levels; location, season, skin and food intake also matter.",
    options: [
      "Rarely outdoors or usually covered",
      "Regular time outdoors",
      "Not sure",
    ],
  },
];

const sources = {
  b12: {
    title: "NIH ODS · Vitamin B12",
    url: "https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/",
  },
  vitaminD: {
    title: "NIH ODS · Vitamin D",
    url: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/",
  },
  calcium: {
    title: "NIH ODS · Calcium",
    url: "https://ods.od.nih.gov/factsheets/Calcium-Consumer/",
  },
  omega3: {
    title: "NIH ODS · Omega-3",
    url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/",
  },
  sleep: {
    title: "NCCIH · Sleep and supplements",
    url: "https://www.nccih.nih.gov/health/sleep-disorders-and-complementary-health-approaches",
  },
  biotin: {
    title: "NIH ODS · Biotin",
    url: "https://ods.od.nih.gov/factsheets/Biotin-Consumer/",
  },
  probiotics: {
    title: "NCCIH · Probiotics",
    url: "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety",
  },
};

export function supplementRecommendations(answers) {
  const needsReview =
    !answers.health.includes("none") ||
    answers.health.some((id) => id !== "none") ||
    Boolean(answers.notes.trim());
  const candidates = [];
  const followUp = [];
  const notSelected = [];
  if (answers.b12Foods === "Rarely either") {
    candidates.push({
      id: "vitamin-b12",
      name: "Vitamin B12",
      priority: "Worth considering",
      source: sources.b12,
      reason:
        "You reported few animal foods or B12-fortified foods. A B12 supplement is worth considering if a reliable food source is not practical.",
      food: "Check B12-fortified food labels and regular intake; animal foods are another source if they fit your diet.",
      caution:
        "This does not diagnose B12 deficiency. Ongoing fatigue or tingling needs assessment; B12 is not an energy booster when intake is adequate.",
      next: "Confirm a reliable B12 source and choose a suitable product and amount with a pharmacist or dietitian.",
    });
  } else if (answers.b12Foods === "Not sure") {
    followUp.push(
      "Check your B12 food labels and usual intake before deciding on a B12 supplement.",
    );
  } else {
    notSelected.push({
      name: "Vitamin B12",
      reason:
        "You reported regular B12 food sources. Extra B12 is not automatically suggested; frequency alone does not confirm adequacy or absorption.",
      source: sources.b12,
    });
  }
  if (answers.sunlight === "Rarely outdoors or usually covered") {
    candidates.push({
      id: "vitamin-d",
      name: "Vitamin D",
      priority: "Worth considering",
      source: sources.vitaminD,
      reason:
        "You reported little outdoor exposure or usually covered skin. This can limit vitamin D production, so a supplement is worth considering alongside your food intake and local guidance.",
      food: "Review vitamin D-fortified foods and oily fish if suitable. Keep normal sun protection; do not seek unprotected sun exposure.",
      caution:
        "Outdoor habits do not establish your vitamin D level. Excess supplemental vitamin D can be harmful; do not combine high-dose products.",
      next: "Check local guidance and existing products with a pharmacist; personal amount and need for testing are not determined here.",
    });
  } else if (answers.sunlight === "Not sure") {
    followUp.push(
      "Review your location, season, outdoor routine and vitamin D foods before deciding on vitamin D.",
    );
  } else {
    notSelected.push({
      name: "Vitamin D",
      reason:
        "Outdoor time alone cannot determine vitamin D needs. Check local seasonal guidance and food intake; this report has not established a supplement need.",
      source: sources.vitaminD,
    });
  }
  if (answers.calciumFoods === "Less than two servings most days") {
    candidates.push({
      id: "calcium",
      name: "Calcium",
      priority: "Consider if food changes are not enough",
      source: sources.calcium,
      reason:
        "You reported few calcium-rich servings. Review portions and labels first; a calcium supplement may help if food changes still leave a shortfall.",
      food: "Try calcium-fortified plant drinks, calcium-set tofu or dairy if suitable. Check the actual calcium content on labels.",
      caution:
        "This serving screen does not calculate a calcium gap. Supplements can cause constipation and interact with medicines; excess intake is not beneficial.",
      next: "Estimate total food calcium before choosing a supplement. No personal amount is assigned from this questionnaire.",
    });
  } else if (answers.calciumFoods === "Not sure") {
    followUp.push(
      "Record calcium-rich portions and label amounts before deciding whether a calcium supplement would fill a gap.",
    );
  } else {
    notSelected.push({
      name: "Calcium",
      reason:
        "You reported regular calcium-rich foods. A supplement is not automatically suggested without checking total intake against your needs.",
      source: sources.calcium,
    });
  }
  if (["Less than weekly", "I do not eat fish"].includes(answers.fish)) {
    // Low fish intake alone is not evidence to recommend routine fish oil.
    notSelected.push({
      name: "Omega-3 (fish or algal oil)",
      reason:
        "You reported little oily fish. Review suitable food sources first. Low fish intake alone does not establish a need for routine fish-oil or algal-oil supplements; discuss these if dietary needs cannot be met.",
      source: sources.omega3,
    });
  } else if (answers.fish === "Not sure") {
    followUp.push(
      "Review oily fish and other omega-3 food sources; a low intake answer alone will not trigger a fish-oil recommendation.",
    );
  }
  if (answers.goals.includes("energy")) {
    notSelected.push({
      name: "Iron / energy blends",
      reason:
        "An energy goal does not establish iron deficiency. Persistent fatigue deserves assessment before choosing iron or an energy blend.",
    });
  }
  if (answers.goals.includes("sleep")) {
    notSelected.push({
      name: "Magnesium / sleep blends",
      reason:
        "A sleep goal alone is not enough to select a supplement. Evidence for magnesium in insomnia is limited; review sleep habits and persistent problems first.",
      source: sources.sleep,
    });
  }
  if (answers.goals.includes("beauty")) {
    notSelected.push({
      name: "Biotin / beauty blends",
      reason:
        "A hair or nail goal does not establish a deficiency. Evidence for routine biotin is limited, and high intakes can interfere with laboratory tests.",
      source: sources.biotin,
    });
  }
  if (answers.goals.includes("gut")) {
    notSelected.push({
      name: "Probiotics",
      reason:
        "A gut wellbeing goal does not identify a suitable probiotic strain or use. Benefits and safety depend on the product and the specific situation.",
      source: sources.probiotics,
    });
  }
  return {
    needsReview,
    // A health flag or unreviewed note must never become an approved personal plan.
    recommendations: needsReview ? [] : candidates,
    discussionItems: needsReview ? candidates : [],
    followUp,
    notSelected,
    overview: needsReview
      ? "Check suitability before starting supplements. Your food answers identify the discussion items below, but your health context or notes need a professional review first."
      : candidates.length
        ? "Start with these food-linked supplement options. Each has a reason from your answers and a check to complete before use; they are not a prescription or a ready-to-take combination."
        : "Your answers do not yet support a specific supplement recommendation in this screening. Check the items below; you do not need to fill seven Tape slots.",
  };
}
