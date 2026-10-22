import {
  QUESTIONS,
  buildQuestionPlan as bubuPlan,
  validateStep as bubuValidate,
  getSafetyDisposition,
} from "./engine.js";

// Stable BUBU option identifiers are retained in both languages.
const copy = {
  audience: [
    "Who is this assessment for?",
    ["Adults aged 18–64", "Adults aged 65+", "Under 18"],
  ],
  profile: [
    "A little about you",
    {
      age: ["Age (optional)"],
      sex: [
        "Sex for nutrition context",
        ["Female", "Male", "Prefer not to say"],
      ],
      life_stage: [
        "Your current life stage",
        [
          "None of the following",
          "Planning pregnancy",
          "Pregnant",
          "Breastfeeding",
          "Perimenopause or postmenopause",
          "Prefer not to say",
        ],
      ],
      weight_change: [
        "Has your weight changed noticeably in the last 3 months?",
        [
          "Mostly stable",
          "Yes, intentionally",
          "Yes, unintentionally",
          "Not sure",
        ],
      ],
    },
  ],
  safety: [
    "Is there any health context to check first?",
    [
      "Medicines, including occasional painkillers or sleep medicines",
      "A diagnosed condition or known abnormal test",
      "A clinician-directed food, potassium, phosphorus or protein restriction",
      "Malabsorption or previous digestive / bariatric surgery",
      "Recent surgery or a serious supplement reaction",
      "Current chest pain, breathing difficulty, fainting or confusion",
      "Sudden weakness, speech difficulty or severe neurological symptoms",
      "Sudden vision loss or severe eye pain",
      "A worsening severe allergy or suspected large overdose",
      "Unable to stay safe or thoughts of self-harm",
      "Persistent symptoms affecting everyday life",
      "None of these",
      "Not sure / prefer not to say",
    ],
  ],
  health_detail: [
    "Your health and medicines",
    {
      conditions: [
        "Known health conditions",
        [
          "Kidney impairment / chronic kidney disease",
          "Thyroid condition",
          "Liver condition",
          "Kidney stones or high blood calcium",
          "A clinician-directed food or nutrient restriction",
          "Another condition",
          "None of these",
          "Not sure",
        ],
      ],
      medicines: [
        "Medicine types you currently use",
        [
          "ACE inhibitors, ARBs, spironolactone or other potassium-affecting medicines",
          "Warfarin",
          "Thyroid medicines",
          "Metformin or long-term acid-suppressing medicines",
          "Retinoid medicines",
          "Other medicines",
          "No medicines",
          "I do not know the medicine type",
        ],
      ],
    },
  ],
  scenes: [
    "What does your everyday life involve?",
    [
      "Office work, writing, coding or design",
      "Study, exams or research",
      "Physical work, prolonged standing or lifting",
      "Caring for others or substantial housework",
      "Working from home or a flexible routine",
      "Outdoor work, heat or humid conditions",
      "Night shifts or changing work hours",
      "Regular strength / muscle-building / interval training",
      "Regular running, cycling, ball sports or endurance training",
      "Frequent travel, time zones or long commutes",
      "No regular pattern",
    ],
  ],
  daily_load: [
    "Which situations do you often encounter?",
    [
      "Long periods of focused work, reading or screens",
      "Long periods sitting",
      "Long periods standing or walking",
      "Lifting or demanding physical work",
      "Demanding care, communication or emotional responsibilities",
      "Unplanned overtime or unpredictable rest",
      "Missed or late meals; snacks or takeaways replacing meals",
      "Most daylight hours indoors",
      "Caffeine in the afternoon or evening",
      "Heavy sweating for over 2 hours with limited meal access",
      "Travel disrupting sleep and meals",
      "None stand out",
    ],
  ],
  goals: [
    "What would you like to focus on?",
    [
      "Sleep",
      "Stress & relaxation",
      "Daytime energy",
      "Focus & memory",
      "Strength & muscle",
      "Endurance & recovery",
      "Bone nutrition",
      "Skin",
      "Hair & nails",
      "Eye comfort",
      "Digestion & bowel routine",
      "Nutrition with dietary restrictions",
      "A full nutrition review",
      "Joint comfort & movement",
      "Healthy ageing",
      "No particular goal",
    ],
  ],
  goal_priority: ["Which goal comes first?", ["Equally important"]],
  diet_style: [
    "How do you usually eat?",
    [
      "Mixed diet",
      "Vegetarian, including eggs / dairy",
      "Vegan, no animal foods",
      "Other dietary restrictions",
      "Not sure",
    ],
  ],
  exclusions: [
    "Which foods do you need to avoid?",
    [
      "Dairy",
      "Soy",
      "Fish",
      "Shellfish",
      "Nuts",
      "Eggs",
      "Gluten-containing grains",
      "Other foods",
      "None",
      "Not sure",
    ],
  ],
  diet_habits: [
    "Your meal routine",
    {
      meals: [
        "Usual main meals each day",
        ["1–2; often skip meals", "Around 3; fairly regular", "Varies a lot"],
      ],
      restriction: [
        "Have you reduced food amounts or variety long term?",
        [
          "No",
          "Restricting overall energy intake",
          "Many foods are difficult and alternatives are hard to find",
          "Not sure",
        ],
      ],
      duration: [
        "How long has this eating pattern lasted?",
        ["Less than 1 month", "1–3 months", "More than 3 months", "Not sure"],
      ],
    },
  ],
  dairy_food: [
    "Milk, alternatives and tofu",
    {
      kind: [
        "Your usual drink",
        [
          "Milk, yoghurt or lactose-free milk",
          "A plant drink labelled calcium-fortified",
          "Unfortified plant drinks",
          "Usually none",
          "Unsure about fortification",
        ],
      ],
      amount: [
        "Average drink amount each day",
        [
          "Usually none",
          "Under 250 mL",
          "250–500 mL",
          "Over 500 mL",
          "Not sure",
        ],
      ],
      tofu: [
        "Average tofu / firm bean curd each day",
        ["Usually none", "Under 100 g", "100–200 g", "Over 200 g", "Not sure"],
      ],
      tofu_kind: [
        "Type of tofu",
        [
          "Calcium-set, such as calcium sulphate",
          "Silken / glucono-delta-lactone or another type",
          "Usually none",
          "Not sure",
        ],
      ],
    },
  ],
  calcium_label: [
    "Have a drink label to hand? (Optional)",
    {
      ml: ["Average amount of this drink per day"],
      mg: ["Calcium on the label per 100 mL"],
    },
  ],
  calcium_alternatives: [
    "Any other regular calcium sources?",
    [
      "Cheese on most days; I check the label",
      "Small fish / sardines eaten with bones",
      "Other clearly calcium-fortified foods, regularly",
      "None of these",
      "Not sure",
    ],
  ],
  animal_food: [
    "Fish, meat and eggs",
    {
      fish: [
        "Oily fish; roughly a palm-sized portion",
        [
          "None",
          "Less than once a week",
          "Once a week",
          "Twice a week or more",
          "Not sure",
        ],
      ],
      meat: [
        "Meat, poultry or other fish / seafood; raw edible weight per day",
        ["Usually none", "Under 100 g", "100 g or more", "Not sure"],
      ],
      red_meat: ["Red meat or shellfish"],
      eggs: ["Whole eggs, including yolk"],
    },
  ],
  plant_food: [
    "Plants and staple foods",
    {
      vegetables: [
        "Vegetables; raw weight per day",
        ["Usually none", "Under 300 g", "300 g or more", "Not sure"],
      ],
      fruit: [
        "Whole fruit per day",
        ["Usually none", "Under 200 g", "200 g or more", "Not sure"],
      ],
      whole_grains: [
        "Oats, brown rice and whole grains",
        [
          "Usually none",
          "Less than one third of staple foods",
          "One third or more of staple foods",
          "Not sure",
        ],
      ],
      beans: [
        "Cooked beans / pulses, excluding tofu",
        [
          "Usually none",
          "Under half a bowl",
          "Half a bowl or more",
          "Not sure",
        ],
      ],
      nuts: [
        "Shelled nuts and seeds",
        [
          "Usually none",
          "Under a small handful (about 10 g)",
          "A small handful or more",
          "Not sure",
        ],
      ],
    },
  ],
  plant_types: [
    "Food variety over a usual week",
    {
      greens: ["Dark green leafy vegetables"],
      orange: ["Orange vegetables / fruit, such as carrots and pumpkin"],
      potato: ["Potatoes, sweet potatoes and other tubers"],
    },
  ],
  fortified: [
    "Do you regularly eat clearly labelled fortified foods?",
    ["Vitamin D-fortified", "B12-fortified", "No", "I have not checked labels"],
  ],
  cooking: [
    "Your usual cooking oil and salt",
    {
      salt: [
        "Salt",
        [
          "Iodised",
          "Non-iodised",
          "Potassium-containing lower-sodium salt",
          "Mostly eat out / not sure",
        ],
      ],
      oil: [
        "Cooking fats",
        [
          "Mostly plant oils",
          "Mostly butter, lard or coconut oil",
          "Long-term very low fat intake",
          "Not sure",
        ],
      ],
    },
  ],
  daylight: [
    "Your usual daylight exposure outdoors",
    [
      "Mostly indoors or behind glass",
      "A few days a week; brief or mostly covered",
      "Outdoors on most days",
      "Varies / not sure",
    ],
  ],
  training_detail: [
    "Your training routine",
    {
      frequency: [
        "Regular sessions per week over the last 4 weeks",
        ["None", "1–2", "3–4", "5 or more"],
      ],
      types: [
        "Training types (select all that apply)",
        [
          "Strength / muscle-building",
          "Short high-intensity, sprints or ball sports",
          "Aerobic sessions under 60 minutes",
          "Endurance sessions over 60 minutes",
          "Competition preparation or twice-daily training",
        ],
      ],
      duration: [
        "Usual session length",
        [
          "No regular training",
          "Under 45 minutes",
          "45–75 minutes",
          "Over 75 minutes",
        ],
      ],
      protein_access: [
        "Can you reliably eat protein-containing meals on training days?",
        [
          "No regular training",
          "Usually yes",
          "Sometimes difficult",
          "Usually difficult",
          "Not sure",
        ],
      ],
      stable: [
        "How long have you followed this routine?",
        ["Under 4 weeks", "4 weeks or longer", "No regular training"],
      ],
      sweat: [
        "Heavy sweating with limited meal access?",
        ["Usually no", "Yes; often over 2 hours", "Not sure"],
      ],
    },
  ],
  sleep_detail: [
    "What gets in the way of sleep?",
    [
      "Taking a long time to fall asleep",
      "Waking and struggling to return to sleep",
      "Waking much earlier than planned",
      "Work, care or scheduling reduces sleep opportunity",
      "Unrefreshed despite enough sleep",
      "Shifts, jet lag or changing schedules",
      "No sleep concern / not applicable",
    ],
  ],
  sleep_context: [
    "A few sleep details",
    {
      hours: [
        "Usual sleep each night",
        ["Under 6 hours", "6–7 hours", "7 hours or more", "Not sure"],
      ],
      frequency: ["Days affected per week", ["0–1", "2–3", "4 or more"]],
      duration: [
        "How long has it lasted?",
        ["Under 1 month", "1–3 months", "Over 3 months"],
      ],
      interference: [
        "Which situations occur regularly?",
        [
          "Afternoon / evening caffeine",
          "Care responsibilities interrupt sleep",
          "Shifts or time zones",
          "Alcohol before bed",
          "Loud snoring, gasping or drowsy driving",
          "None of these",
        ],
      ],
    },
  ],
  impact: [
    "How persistent or disruptive is the concern?",
    [
      "Occasional; little effect on daily life",
      "Frequent but manageable",
      "Persistent and clearly disrupting daily life",
      "No symptoms; learning about nutrition",
    ],
  ],
  goal_detail: [
    "Make your goal more specific",
    {
      skin: [
        "Skin / hair concern",
        [
          "Dryness, elasticity or appearance",
          "Ongoing hair loss or nail changes",
          "Sudden / patchy hair loss or a clear rash",
          "Not a concern",
        ],
      ],
      eyes: [
        "Eye concern",
        [
          "Long screen use; improving rest",
          "Persistent dryness or blurred vision",
          "An eye condition has been diagnosed",
          "Sudden vision loss or severe eye pain",
          "Not a concern",
        ],
      ],
      gut: [
        "Bowel / digestion pattern",
        [
          "Irregular or hard stools",
          "Bloating",
          "Persistent or recurrent diarrhoea",
          "Blood, black stools, marked pain or unexplained weight loss",
          "Not a concern",
        ],
      ],
    },
  ],
  menstrual: [
    "Any menstrual context to consider?",
    [
      "Menstruating; usual flow",
      "Heavy / prolonged bleeding or known excess blood loss",
      "Not menstruating / not applicable",
      "Not sure / prefer not to say",
    ],
  ],
  labs: [
    "Has a clinician told you about any test results in the last year?",
    [
      "Low vitamin D",
      "Iron deficiency / iron-deficiency anaemia",
      "Low B12",
      "Abnormal potassium",
      "Abnormal calcium",
      "Tested; none of these reported",
      "Not tested / not sure",
    ],
  ],
  existing_sources: [
    "What do you already supplement regularly?",
    [
      "Multivitamin / mineral",
      "Vitamin D",
      "Calcium",
      "Magnesium",
      "Potassium",
      "Iron",
      "B12",
      "B-complex",
      "Fish oil / algal oil",
      "Other",
      "None currently",
      "Taking something; ingredients unknown",
      "Creatine",
      "Protein powder",
      "Ginseng",
      "Turmeric / curcumin",
      "L-theanine",
      "Melatonin (existing use only)",
      "Collagen",
      "Psyllium / fibre",
    ],
  ],
  preferences: [
    "What is practical for you?",
    {
      approach: [
        "Your preferred starting point",
        [
          "Food changes first",
          "Supplements if food changes are impractical",
          "Open to food changes and supplements",
        ],
      ],
      fish: [
        "If fish intake is low, could you eat more?",
        [
          "Yes, I can plan it weekly",
          "Long-term avoidance / impractical",
          "Not decided",
        ],
      ],
      calcium: [
        "Could you add a reliable calcium food every day?",
        [
          "I can try a suitable milk or alternative",
          "Currently difficult",
          "Not decided",
        ],
      ],
    },
  ],
  goal_context: [
    "A little more context for your goals",
    {
      energy: [
        "Which best describes low energy?",
        [
          "Occasional; recovers with rest",
          "Mostly short sleep or late nights",
          "Several weeks or increasingly disruptive",
          "No noticeable fatigue",
          "Not sure",
        ],
      ],
      stress: [
        "How does stress affect you?",
        [
          "Occasional tension; daily life largely unaffected",
          "Persistent anxiety, panic or significant disruption",
          "No noticeable stress",
          "Not sure",
        ],
      ],
      joint: [
        "Joint or post-exercise discomfort",
        [
          "Post-training muscle soreness resolving in a few days",
          "Clinician-diagnosed knee osteoarthritis",
          "Persistent joint pain with no confirmed cause",
          "Redness, heat, injury or difficulty bearing weight",
          "No symptoms; prevention interest",
          "Not sure",
        ],
      ],
      sleep_timing: [
        "Any clear timing disruption?",
        [
          "Recent travel across time zones",
          "Sleep opportunity but a very late sleep clock",
          "Shift work changes sleeping times",
          "None of these",
        ],
      ],
      gut_safety: [
        "Any further bowel / fibre safety context?",
        [
          "None of the following",
          "Swallowing difficulty or previous bowel obstruction",
          "Persistent recent change or frequent laxative use",
          "Not sure",
        ],
      ],
    },
  ],
  supplement_scope: [
    "Which kinds of options interest you?",
    {
      functional: [
        "Beyond basic nutrition",
        [
          "Also show relevant sleep / training options",
          "Basic nutrition and diet only",
          "Start with basic nutrition",
        ],
      ],
      botanicals: [
        "Botanical extracts, such as turmeric or ginseng",
        [
          "Open to relevant botanical options",
          "Not considering botanical extracts",
          "Not decided",
        ],
      ],
    },
  ],
  botanical_safety: [
    "Before considering botanical extracts",
    [
      "Any prescription / OTC medicine, including occasional use",
      "Liver concerns, gallstones or bile-duct problems",
      "Abnormal glucose, diabetes or low-glucose episodes",
      "Autoimmune disease or immunosuppressive therapy",
      "Bleeding concerns or planned surgery",
      "Botanical allergy or previous reaction",
      "None of these",
      "Some details are uncertain",
    ],
  ],
};
const extras = {
  nutrition_basics: {
    id: "nutrition_basics",
    type: "fields",
    required: true,
    section: "主食、蛋白质与饮水",
    title: "再看看基础营养与饮水",
    why: "补剂不能替代足够的能量、蛋白质、脂肪和饮水。这些信息也会影响电解质与补液建议。",
    fields: [
      {
        id: "staples",
        type: "single",
        required: true,
        title: "主食和能量通常怎样安排？",
        options: [
          ["regular", "大多数正餐有主食，食量基本稳定"],
          ["limited", "长期明显限制主食或常吃不够"],
          ["unknown", "不确定"],
        ].map(([id, label]) => ({ id, label })),
      },
      {
        id: "protein",
        type: "single",
        required: true,
        title: "平时能稳定吃到蛋白质食物吗？",
        options: [
          ["regular", "多数正餐能吃到"],
          ["hard", "长期很难安排"],
          ["unknown", "不确定"],
        ].map(([id, label]) => ({ id, label })),
      },
      {
        id: "water",
        type: "single",
        required: true,
        title: "平时的饮水与限制",
        options: [
          ["regular", "能规律喝水，没有已知限液要求"],
          ["little", "常常忘记或不方便喝水"],
          ["restricted", "医生要求限制饮水"],
          ["unknown", "不确定"],
        ].map(([id, label]) => ({ id, label })),
      },
      {
        id: "salty",
        type: "single",
        required: true,
        title: "高盐或加工食品出现得多吗？",
        options: [
          ["often", "经常吃较咸的加工食品或外食"],
          ["less", "较少，通常会留意盐"],
          ["unknown", "不确定"],
        ].map(([id, label]) => ({ id, label })),
      },
    ],
  },
};
copy.nutrition_basics = [
  "Energy, protein, water and salt",
  {
    staples: [
      "Staple foods and energy",
      [
        "Staple foods at most main meals; fairly stable intake",
        "Long-term restricted staples or often not enough food",
        "Not sure",
      ],
    ],
    protein: [
      "Can you reliably eat protein-containing foods?",
      ["At most main meals", "Long-term difficulty", "Not sure"],
    ],
    water: [
      "Water and any restrictions",
      [
        "Regular access; no known fluid restriction",
        "Often forget or cannot drink regularly",
        "A clinician has restricted fluid intake",
        "Not sure",
      ],
    ],
    salty: [
      "Salty / processed foods",
      [
        "Frequent salty processed foods or takeaways",
        "Less frequent; I usually check salt",
        "Not sure",
      ],
    ],
  },
];
const weekly = [
  "0–1 days per week",
  "2–4 days per week",
  "5–7 days per week",
  "Not sure",
];
const intro = {
  safety:
    "Select all that apply. Unknowns are valid; do not guess or stop medicines. Urgent symptoms take priority over this questionnaire.",
  profile:
    "These details identify the relevant life stage. Body size is not used to diagnose a nutrient deficiency.",
  health_detail:
    "Select a known medicine class or Not sure. This is a screening record, not a complete interaction check.",
  goals:
    "You can select several goals. Food sources and safety context still determine whether a supplement is worth considering.",
  dairy_food:
    "Both food type and portion matter. Unfortified soy drinks are not assumed equivalent to calcium-fortified drinks.",
  calcium_label:
    "Optional. Enter both values or leave both blank. Only this drink’s calcium contribution is calculated.",
  animal_food:
    "Use your usual pattern over the last month. Food frequency cannot diagnose a deficiency.",
  plant_food:
    "Estimate a usual day. These portions screen sources; they do not calculate precise nutrient gaps.",
  fortified:
    "Only count regular use of foods whose labels clearly state fortification.",
  existing_sources:
    "Known ingredients prevent repeat suggestions. A mixed or unknown product needs its actual label reviewed.",
  supplement_scope:
    "Functional and botanical options have additional eligibility and safety checks. More ingredients is not automatically better.",
  botanical_safety:
    "Concentrated extracts differ from culinary ingredients. Select all that apply, including occasional medicines.",
  nutrition_basics:
    "Supplements do not replace sufficient food, protein, fats and water. Fluid restrictions also affect hydration advice.",
};
function localOptions(original, english) {
  if (!english || english.length !== original?.length)
    throw new Error("Missing BUBU option translation");
  return original.map((o, i) => ({ ...o, label: english[i] }));
}
export function localQuestion(q, language = "en") {
  if (language === "zh") return q;
  const meta = copy[q.id];
  if (!meta) throw new Error(`Missing questionnaire copy: ${q.id}`);
  const [title, children] = meta;
  const result = {
    ...q,
    title,
    helper:
      intro[q.id] ||
      "Answer for your usual routine. Select all that apply where indicated; use Not sure when available.",
    why: "",
  };
  if (q.options) {
    if (q.id === "goal_priority")
      result.options = q.options.map((o) => ({
        ...o,
        label:
          o.id === "equal"
            ? "Equally important"
            : localOptions(QUESTIONS.goals.options, copy.goals[1]).find(
                (x) => x.id === o.id,
              )?.label || o.id,
      }));
    else result.options = localOptions(q.options, children);
  }
  for (const key of ["fields", "rows"])
    if (q[key])
      result[key] = q[key].map((f) => {
        const [name, choices] = children[f.id] || [];
        if (!name) throw new Error(`Missing field copy: ${q.id}.${f.id}`);
        return {
          ...f,
          title: name,
          label: name,
          helper: "",
          placeholder: f.type === "number" ? "Optional" : undefined,
          unit: f.unit === "岁" ? "years" : f.unit,
          ...(f.options ? { options: localOptions(f.options, choices) } : {}),
          ...(f.choices
            ? { choices: localOptions(f.choices, choices || weekly) }
            : {}),
        };
      });
  if (q.choices) result.choices = localOptions(q.choices, weekly);
  return result;
}
export function questionPlan(answers = {}) {
  if (answers.audience === "minor_under_18") return [QUESTIONS.audience];
  let plan = bubuPlan("detailed", answers).map((q) => {
    if (q.id === "profile")
      return {
        ...q,
        helper: "年龄可留空，生理性别也可以选择不说明。",
        fields: q.fields.filter(
          (f) => !["height_cm", "weight_kg"].includes(f.id),
        ),
      };
    if (q.id === "existing_sources")
      return {
        ...q,
        helper:
          "填写已知成分帮助避免重复。此处不会连接 BUBU 补剂柜或读取其他账户资料。",
      };
    if (q.id === "safety")
      return {
        ...q,
        why: "用药或特殊情况时，仍可梳理完整饮食来源；新增补剂需要先核查。紧急不适优先处理。",
      };
    return q;
  });
  // Add a food baseline for macros; never infer intake from a goal alone.
  if (getSafetyDisposition(answers).status !== "stop")
    plan.splice(
      plan.findIndex((q) => q.id === "fortified"),
      0,
      extras.nutrition_basics,
    );
  return plan;
}
export function reconcileAnswers(answers) {
  const plan = questionPlan(answers);
  return Object.fromEntries(
    plan
      .filter((q) => answers[q.id] !== undefined)
      .map((q) => {
        const value = answers[q.id];
        const keys = q.fields?.map((f) => f.id) || q.rows?.map((f) => f.id);
        return [
          q.id,
          keys && value && typeof value === "object" && !Array.isArray(value)
            ? Object.fromEntries(
                Object.entries(value).filter(([key]) => keys.includes(key)),
              )
            : value,
        ];
      }),
  );
}
export function validateQuestion(q, answer, answers) {
  if (q.id === "nutrition_basics") {
    const valid = q.fields.every((f) =>
      f.options.some((o) => o.id === answer?.[f.id]),
    );
    return {
      valid,
      message: valid ? "" : "请完成本题各项，也可以选择不确定。",
    };
  }
  return bubuValidate(q, answer, answers);
}
export function toggleOption(value = [], id, exclusive = ["none", "unknown"]) {
  const selected = Array.isArray(value) ? value : [];
  if (selected.includes(id)) return selected.filter((item) => item !== id);
  return exclusive.includes(id)
    ? [id]
    : [...selected.filter((item) => !exclusive.includes(item)), id];
}
export function answerLines(answers, language = "en", ids) {
  return questionPlan(answers)
    .filter((q) => !ids || ids.includes(q.id))
    .flatMap((q) => {
      const translated = localQuestion(q, language),
        value = answers[q.id];
      const optionText = (options, v) =>
        Array.isArray(v)
          ? v
              .map((id) => options?.find((o) => o.id === id)?.label || id)
              .join(language === "zh" ? "、" : ", ")
          : options?.find((o) => o.id === v)?.label || String(v ?? "");
      if (q.fields || q.rows)
        return (translated.fields || translated.rows)
          .filter((f) => value?.[f.id] !== undefined && value[f.id] !== "")
          .map((f) => ({
            label: f.title || f.label,
            value:
              optionText(
                f.options || f.choices || translated.choices,
                value[f.id],
              ) + (f.unit ? ` ${f.unit}` : ""),
          }));
      return value === undefined
        ? []
        : [
            {
              label: translated.title,
              value: optionText(translated.options, value),
            },
          ];
    });
}
export { getSafetyDisposition };
