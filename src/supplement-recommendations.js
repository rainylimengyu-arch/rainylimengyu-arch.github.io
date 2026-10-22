import library from "./nutrient-library.json" with { type: "json" };
import { translateText } from "./i18n-core.js";
import {
  buildRecommendationReport,
  buildPlanReport,
  getReportSource,
  NUTRIENTS,
} from "./bubu/engine.js";
import {
  questionPlan,
  reconcileAnswers,
  validateQuestion,
  answerLines,
  getSafetyDisposition,
} from "./bubu/questions.js";
import {
  choose,
  nutrientEnglish,
  candidateEnglish,
  groups,
  statusCopy,
} from "./bubu/report-copy.js";
export {
  questionPlan,
  reconcileAnswers,
  validateQuestion,
  answerLines,
  getSafetyDisposition,
};
export { localQuestion, toggleOption } from "./bubu/questions.js";
export const initialAnswers = {};
const eatingReference = {
  title: "NHS · Eatwell Guide",
  url: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/",
};
export const reportVersion = "bubu-comprehensive-2026-10-20";
const nutrientToTape = {
  vitamin_d: "vitamin-d3",
  vitamin_c: "vitamin-c",
  b12: "vitamin-b12",
  magnesium: "magnesium",
  magnesium_glycinate: "magnesium",
  omega3: "omega-3",
  zinc: "zinc",
  collagen: "collagen",
  theanine: "l-theanine",
  iron: "iron",
  b9: "folic-acid",
  iodine: "iodine",
  vitamin_k: "vitamin-k2",
  selenium: "selenium",
  vitamin_a: "vitamin-a",
  vitamin_e: "vitamin-e",
  ginseng: "ginseng",
};
const evidenceQuestions = {
  vitamin_d: ["animal_food", "fortified", "daylight"],
  calcium: [
    "dairy_food",
    "calcium_label",
    "calcium_alternatives",
    "preferences",
  ],
  b12: ["diet_style", "animal_food", "dairy_food", "fortified"],
  magnesium: ["plant_food", "plant_types"],
  omega3: ["animal_food", "diet_style", "preferences"],
  vitamin_c: ["plant_food"],
  multivitamin: ["diet_habits", "plant_food", "animal_food"],
  creatine: ["training_detail", "goals"],
  protein: ["training_detail", "nutrition_basics"],
  hydration: ["daily_load", "training_detail", "nutrition_basics"],
  magnesium_glycinate: ["sleep_detail", "sleep_context", "plant_food"],
  theanine: ["goal_context", "sleep_context"],
  ginseng: ["goal_context", "sleep_context", "botanical_safety"],
  turmeric: ["goal_context", "training_detail", "botanical_safety"],
  psyllium: ["goal_detail", "goal_context", "plant_food"],
  collagen: ["goal_detail", "diet_style", "exclusions"],
};
export function formIssues(answers) {
  const issues = {};
  if (answers.audience === "minor_under_18")
    return {
      audience:
        "此问卷仅适用于 18 岁及以上成人，请由儿科或合适的专业人员评估。",
    };
  for (const q of questionPlan(answers)) {
    const check = validateQuestion(q, answers[q.id], answers);
    if (!check.valid) issues[q.id] = check.message;
  }
  return issues;
}
function sourceFor(id) {
  if (id === "multivitamin")
    return {
      title: "NIH ODS · Multivitamin / mineral",
      url: "https://ods.od.nih.gov/factsheets/MVMS-Consumer/",
    };
  return getReportSource(id) || eatingReference;
}
function extraRows(a) {
  const n = a.nutrition_basics || {},
    restriction =
      n.water === "restricted" ||
      (a.safety || []).includes("medical_food_restriction_quick");
  const make = (id, title, state, reason, action, slug, group = "other") => ({
    id,
    title,
    state,
    reason,
    action,
    group,
    status: statusCopy[state]?.[1],
    sources: [],
    reference: slug
      ? {
          title: `NIH ODS · ${nutrientEnglish[id][0]}`,
          url: `https://ods.od.nih.gov/factsheets/${slug}-Consumer/`,
        }
      : eatingReference,
  });
  return [
    make(
      "molybdenum",
      "钼",
      "check",
      "钼分布在多类食物中，单凭频率问卷不支持常规单独补充。",
      "保持豆类、谷物等多样来源；有特殊医疗营养安排时按医嘱核对。",
      "Molybdenum",
      "minerals",
    ),
    make(
      "chromium",
      "铬",
      "check",
      "本问卷不能建立常规补铬的需要，也不把控制体重或血糖目标转为补铬推荐。",
      "以多样化饮食为主；血糖问题按专业方案处理，不自行用铬替代治疗。",
      "Chromium",
      "minerals",
    ),
    make(
      "fluoride",
      "氟",
      "check",
      "本问卷没有测量饮水含氟量或评估个人龋齿风险，不能由此决定是否口服补氟。",
      "结合当地饮水资料和牙科指导；牙膏等局部用法不等于营养补剂。",
      "Fluoride",
      "minerals",
    ),
    make(
      "carbohydrate",
      "碳水化合物",
      n.staples === "regular"
        ? "maintain"
        : n.staples === "limited"
          ? "food"
          : "check",
      "主食和实际食量来自你的基础营养记录，不据此计算精确克数。",
      "按可接受的饮食方式安排主食、全谷与薯类；长期限制或吃不够时先改善正餐。",
    ),
    make(
      "fat",
      "脂肪",
      (a.cooking || {}).oil === "plant"
        ? "maintain"
        : (a.cooking || {}).oil === "unknown"
          ? "check"
          : "food",
      "结合烹调油和坚果记录看脂肪来源，不能单靠问卷计算总脂肪比例。",
      "在适量能量范围内选择合适的植物油和可耐受的坚果，不追求无脂饮食。",
    ),
    make(
      "omega6",
      "Omega-6 · 亚油酸",
      (a.cooking || {}).oil === "plant" ? "maintain" : "check",
      "植物油、坚果和种子可提供亚油酸；本次没有建立额外补 Omega-6 的需要。",
      "保留适合的食物来源，不把脂肪酸种类凑成补剂清单。",
    ),
    make(
      "ala",
      "Omega-3 · ALA",
      (a.plant_food || {}).nuts === "regular" ? "maintain" : "check",
      "坚果、种子和部分植物油可提供 ALA；本问卷没有确认具体品种，不能把坚果份数当成 ALA 达标。",
      "可了解亚麻籽、奇亚籽、核桃等适合自己的食物；ALA 不与 EPA / DHA 等量换算。",
    ),
    make(
      "water",
      "饮水与液体",
      restriction
        ? "review"
        : n.water === "regular"
          ? "maintain"
          : n.water === "little"
            ? "food"
            : "check",
      restriction
        ? "你报告了饮水或饮食限制，补液不能套用一般方案。"
        : "结合饮水可及性和出汗背景记录，不从问卷直接指定饮水升数。",
      restriction
        ? "继续按已有的限液要求，调整前咨询专业人员。"
        : "安排规律饮水；运动补液要结合出汗、环境和正餐，不自行叠加盐片。",
    ),
    make(
      "energy",
      "膳食能量",
      a.profile?.weight_change === "unintentional"
        ? "review"
        : n.staples === "limited" || a.diet_habits?.meals === "one_two"
          ? "food"
          : "check",
      "结合进餐规律、食量限制和体重变化记录；没有计算个人能量需要。",
      "先安排足够的正餐与恢复。非主动体重下降需要评估，不能靠补剂掩盖。",
    ),
  ];
}
export function createDraftReport(
  input,
  files = [],
  { tier = "standard", notes = "" } = {},
) {
  const answers = structuredClone(reconcileAnswers(input));
  if (getSafetyDisposition(answers).status === "stop")
    throw new Error(
      "Urgent safety context: no supplement report may be generated.",
    );
  const issues = formIssues(answers);
  if (Object.keys(issues).length)
    throw new Error(
      `Incomplete questionnaire: ${Object.keys(issues).join(", ")}`,
    );
  const effective = structuredClone(answers);
  if (effective.nutrition_basics.water === "restricted")
    effective.safety = [
      ...(effective.safety || []).filter((x) => x !== "none"),
      "medical_food_restriction_quick",
    ];
  const raw = buildRecommendationReport(effective),
    base = buildPlanReport("detailed", effective);
  const inconsistent = base.checks.some((x) => x.id === "diet_consistency");
  const healthHold =
    (effective.safety || []).some((x) => x !== "none") ||
    ["planning", "pregnant", "lactating", "unknown"].includes(
      effective.profile?.life_stage,
    ) ||
    (effective.labs || []).some((x) => !["none", "unknown"].includes(x)) ||
    ["unknown", "other", "multivitamin"].some((x) =>
      effective.existing_sources?.includes(x),
    ) ||
    ["unknown", "other"].some((x) => effective.exclusions?.includes(x)) ||
    effective.profile?.weight_change === "unintentional" ||
    inconsistent;
  const cards = (healthHold ? [] : raw.cards).filter(
    (c) => c.id !== "melatonin",
  );
  if (
    !healthHold &&
    effective.nutrition_basics.protein === "hard" &&
    ["months", "long"].includes(effective.diet_habits.duration) &&
    effective.supplement_scope.functional === "yes" &&
    effective.preferences.approach !== "food" &&
    !effective.existing_sources.includes("protein") &&
    !cards.some((c) => c.id === "protein")
  ) {
    cards.push({
      id: "protein",
      title: "蛋白质补充（食物不方便时）",
      group: "foundation",
      tag: "饮食不足时可选",
      reason:
        "你记录了长期难以稳定安排蛋白质食物的情况。先改善正餐，仍不方便时可了解合适的蛋白补充。",
      benefit: "提供方便安排的蛋白质来源，不代替正餐。",
      food: "优先安排你能吃的豆类、豆腐、蛋、奶、肉或鱼等。",
      caution: "肾病或蛋白限制需要先核对；本问卷不按体重给出个人蛋白剂量。",
      details: [],
      sources: [{ id: "sport", title: "NIH ODS · 蛋白质与运动营养" }],
      rank: cards.length + 1,
    });
  }
  const discussion = healthHold
    ? base.cards.filter((c) =>
        [
          "vitamin_d",
          "calcium",
          "b12",
          "magnesium",
          "omega3",
          "vitamin_c",
        ].includes(c.id),
      )
    : [];
  const coverage = base.coverage.map((g) => ({
    ...g,
    items: g.items.map((x) => ({
      ...x,
      reference: sourceFor(x.id),
      state: x.state || "check",
    })),
  }));
  const proteinRow = coverage
    .flatMap((g) => g.items)
    .find((row) => row.id === "protein");
  if (
    effective.nutrition_basics.protein === "hard" &&
    proteinRow &&
    !healthHold
  )
    Object.assign(proteinRow, {
      state: "food",
      reason: "你表示长期难以稳定安排蛋白质食物，应先改善正餐来源。",
      action: "从适合你且可获得的蛋白食物开始；长期难以安排时再讨论补充类型。",
    });
  for (const row of extraRows(effective))
    coverage.find((g) => g.id === row.group).items.push(row);
  const checks = [...raw.checks];
  if (raw.cards.some((c) => c.id === "melatonin"))
    checks.push({
      id: "sleep_timing_review",
      title: "时差与睡眠时点",
      reason: "你描述了明确的作息时差，但此网站不自动推荐褪黑素。",
      action:
        "先规划光照和目的地作息；如需补充方案，由药师或医生核对时点和产品。",
    });
  if (inconsistent && !checks.some((x) => x.id === "diet_consistency"))
    checks.unshift(base.checks.find((x) => x.id === "diet_consistency"));
  return {
    version: reportVersion,
    created: new Date().toISOString(),
    isPlus: tier === "plus",
    answers,
    notes,
    attachments:
      tier === "plus" ? files.map((f) => ({ name: f.name, size: f.size })) : [],
    needsReview: healthHold,
    cards,
    discussion,
    coverage,
    coverageCount: coverage.reduce((sum, g) => sum + g.items.length, 0),
    foodActions: raw.foodActions,
    checks,
    sourceVersion: "BUBU goal-plan-v6 + comprehensive web adapter",
  };
}
function ingredientDecisions(report, language) {
  const C = (en, zh) => choose(language, en, zh);
  return library.items.map((item) => {
    const matched = report.cards.find((c) => nutrientToTape[c.id] === item.id);
    const row = report.coverage
      .flatMap((g) => g.items)
      .find((c) => nutrientToTape[c.id] === item.id);
    let state = matched
      ? "matched"
      : row?.state === "existing"
        ? "existing"
        : report.needsReview
          ? "review"
          : "not_selected";
    let reason = matched
      ? C(
          "A related supplement type matched your answers. The studied form and final Tape form / amount still need confirmation.",
          "有相关补充类型匹配本次答案，但研究形态与 Tape 的最终形态、用量仍需确认。",
        )
      : row
        ? C(
            "The nutrition-source decision is shown in the full assessment. A goal alone is not a reason to add this ingredient.",
            "对应营养来源已在完整评估中说明，不因单一目标而额外添加。",
          )
        : C(
            "The answers did not establish the specific evidence and suitability needed to add this ingredient.",
            "本次答案未建立推荐该成分所需的具体依据和适用前提。",
          );
    if (
      item.id === "hydrocurc" &&
      report.cards.some((c) => c.id === "turmeric")
    ) {
      state = "review";
      reason = C(
        "Curcumin is a discussion option, but a branded extract plus black pepper cannot be assumed equivalent to a studied preparation. Check product-specific evidence and interactions.",
        "姜黄素有讨论选项，但品牌提取物加黑胡椒不能直接等同研究制剂，需另查具体配方和相互作用。",
      );
    }
    if (item.id === "5-htp") {
      state = "review";
      reason = C(
        "Held for professional review. A sleep or mood goal does not establish suitability.",
        "保留专业审核限制；睡眠或情绪目标不能直接证明适用。",
      );
    }
    if (item.id === "probiotics")
      reason = C(
        "A general gut goal does not identify a probiotic strain, dose or use. Product- and condition-specific review is needed.",
        "一般肠道目标不能确定益生菌菌株、用量及用途，需按具体产品与情况核查。",
      );
    if (item.id === "lutemax")
      reason = C(
        "Screen use is not an AREDS2 indication. Persistent or diagnosed eye concerns require eye-care review.",
        "长时间看屏幕不等于 AREDS2 适用情形；持续或已诊断的眼部问题需眼科确认。",
      );
    return {
      id: item.id,
      name: language === "zh" ? item.nameZh : item.name,
      state,
      stateLabel: C(
        {
          matched: "Related match",
          existing: "Already using",
          review: "Review first",
          not_selected: "Not selected",
        }[state],
        {
          matched: "相关匹配",
          existing: "已有补充",
          review: "先核查",
          not_selected: "本次未选",
        }[state],
      ),
      reason,
      evidence: translateText(item.profile.evidence, language),
      reference:
        item.profile.sources.find((s) => s.type === "independent") ||
        item.profile.sources[0],
    };
  });
}
function englishDecision(row) {
  if (row.state === "existing")
    return "You already reported using this nutrient. Check the label and actual frequency before adding anything else.";
  if (row.medical || row.state === "review")
    return "Your health, medicine, test or life-stage context requires professional review before changing intake.";
  if (row.state === "maintain")
    return "A relevant food source is recorded. This is not proof that total intake or absorption is adequate.";
  if (row.state === "food" || row.state === "supplement")
    return "Your reported sources are limited. Review the matched food answers, practical alternatives and total intake before choosing supplementation.";
  return "This questionnaire does not establish a personal supplement need. Confirm sources, labels and relevant context first.";
}
export function reportView(report, language = "en") {
  const C = (en, zh) => choose(language, en, zh);
  const status = (state) => {
    const values = statusCopy[state] || statusCopy.check;
    return language === "zh" ? values[1] : values[0];
  };
  const card = (raw, held = false) => {
    const en = candidateEnglish[raw.id] || [
      nutrientEnglish[raw.id]?.[0] || raw.id,
      englishDecision(raw),
      "",
      "",
      "Check personal suitability and the product label before use.",
    ];
    const mappedId = nutrientToTape[raw.id],
      mapped = mappedId && library.items.find((i) => i.id === mappedId);
    return {
      ...raw,
      name: C(en[0], raw.title),
      reason: C(en[1], raw.reason),
      benefit: C(en[2], raw.benefit || raw.supplement || ""),
      food: C(
        en[3] || nutrientEnglish[raw.id]?.[1] || "Suitable varied foods",
        raw.food || raw.action || "",
      ),
      caution: C(
        en[4],
        raw.caution ||
          "使用前核对已有产品、实际含量及个人适用性，不叠加高剂量。",
      ),
      status: held
        ? C("Review before use", "使用前需核查")
        : language === "zh" && raw.tag
          ? raw.tag
          : raw.essential
            ? "Prioritise a reliable source"
            : raw.state === "food"
              ? "Conditional on an unresolved food gap"
              : raw.group === "foundation"
                ? "Worth considering"
                : "Optional · evidence varies",
      details:
        language === "zh"
          ? raw.details || []
          : [
              {
                title: "Evidence boundary",
                body: [
                  "magnesium_glycinate",
                  "theanine",
                  "ginseng",
                  "turmeric",
                  "collagen",
                ].includes(raw.id)
                  ? "Evidence is limited or preparation-specific. A study cannot guarantee a personal benefit or establish the final Tape product’s effect."
                  : "Evidence concerns the nutrient or supplement type, not a validated VITA TAPE product or a personal prescription.",
              },
            ],
      matchedAnswers: answerLines(
        report.answers,
        language,
        evidenceQuestions[raw.id] || [
          "diet_style",
          "plant_food",
          "animal_food",
        ],
      ),
      references: (raw.sources || []).map((s) => ({
        title:
          language === "zh"
            ? s.title
            : sourceFor(s.id).title.replace(
                /[\u3400-\u9fff]+/g,
                "nutrition reference",
              ),
        url: sourceFor(s.id).url,
      })),
      availability: mapped
        ? C(
            "A related ingredient exists in the Tape library; final form, quantity and suitability remain unconfirmed.",
            "Tape 成分库中有相关类型；最终形态、用量与适用性仍需确认。",
          )
        : C(
            "Broader nutrition option; not currently a selectable Tape ingredient.",
            "属于更广泛的营养补充类型，当前不在 Tape 可选成分中。",
          ),
    };
  };
  const cards = report.cards.map((c) => card(c));
  const coverage = report.coverage.map((g) => ({
    id: g.id,
    name: language === "zh" ? groups[g.id][1] : groups[g.id][0],
    items: g.items.map((row) => ({
      ...row,
      name: C(nutrientEnglish[row.id]?.[0] || row.id, row.title),
      status: status(row.state),
      reason: C(englishDecision(row), row.reason),
      food: C(
        nutrientEnglish[row.id]?.[1] || "Varied suitable foods",
        NUTRIENTS.find((n) => n.id === row.id)?.sources || row.action,
      ),
      action: C(
        row.state === "maintain"
          ? "Keep suitable sources and check overall portions."
          : row.state === "existing"
            ? "Review your existing product label; do not add duplicates."
            : row.medical || row.state === "review"
              ? "Keep prescribed restrictions and seek professional review."
              : "Review food sources and practical changes; the questionnaire does not prescribe a personal amount.",
        row.action,
      ),
      reference: row.reference || sourceFor(row.id),
    })),
  }));
  return {
    title: C(
      "Your personal nutrition & supplement report",
      "你的营养与补充建议报告",
    ),
    status: report.isPlus
      ? C("Pending BUBU nutritionist review", "待 BUBU补补营养师审核")
      : C("Self-guided BUBU-based report", "基于 BUBU 逻辑的自助建议报告"),
    overview: report.needsReview
      ? C(
          "Your food sources have been reviewed, but health or product details need checking before starting supplements.",
          "已梳理你的食物来源，但健康背景或产品信息需要先核查，补充建议暂不作为可直接执行方案。",
        )
      : cards.length
        ? C(
            "These options match your food record, practical preferences and selected goals. Review the reasons and choose what to discuss; this is not a ready-to-take combination.",
            "以下选项结合你的饮食记录、可执行偏好和目标筛出。请查看理由，选择希望讨论的项目；这不是可直接一起服用的配方。",
          )
        : C(
            "No automatic supplement shortlist is supported by this record. The complete assessment explains what to maintain, improve or clarify.",
            "本次记录暂不支持自动新增补剂。完整评估会说明哪些来源应保留、改善或进一步确认。",
          ),
    cards,
    discussion: report.discussion.map((c) => card(c, true)),
    coverage,
    catalog: ingredientDecisions(report, language),
    programs: Object.entries(groups)
      .filter(([id]) => cards.some((c) => c.group === id))
      .map(([id, names]) => ({
        id,
        name: names[language === "zh" ? 1 : 0],
        items: cards.filter((c) => c.group === id),
      }))
      .sort((a, b) => a.items[0].rank - b.items[0].rank),
    checks: report.checks.map((c) => ({
      id: c.id,
      name: C(
        "Review: " + (nutrientEnglish[c.id]?.[0] || c.id.replaceAll("_", " ")),
        c.title,
      ),
      reason: C(englishDecision({ ...c, state: "review" }), c.reason),
      action: C(
        "Confirm the recorded context with a qualified clinician, pharmacist or dietitian. Bring existing product labels; do not stop prescribed medicines.",
        c.action,
      ),
    })),
    foodActions: report.foodActions.map((c) => ({
      id: c.id,
      name: C(nutrientEnglish[c.id]?.[0] || c.id.replaceAll("_", " "), c.title),
      reason: C(
        "A food or routine action is more appropriate than adding a supplement from this goal alone.",
        c.reason,
      ),
      action: C(
        nutrientEnglish[c.id]?.[1] ||
          "Review regular meals, sleep, training and recovery; seek assessment for persistent concerns.",
        c.action,
      ),
    })),
    disclaimer: C(
      "This report screens reported food sources and possible supplement options. It does not diagnose deficiency, prescribe doses or confirm a safe combined formula. Final product forms, quantities and suitability require checking. No Tape ingredients were added.",
      "本报告筛查已报告的食物来源和可考虑的补充选项，不诊断营养缺乏、不开具个人剂量，也不代表组合配方已通过临床审核。最终产品形态、用量和适用性仍需确认，未向 Tape 自动添加任何成分。",
    ),
  };
}
export function selectionConflict(report, selected, id) {
  const target = report.cards.find((c) => c.id === id);
  if (!target) return "unavailable";
  return (
    report.cards.find(
      (c) =>
        selected.includes(c.id) &&
        c.id !== id &&
        ((target.alternativeGroup &&
          c.alternativeGroup === target.alternativeGroup) ||
          (target.id === "multivitamin" && c.micronutrient) ||
          (c.id === "multivitamin" && target.micronutrient)),
    )?.id || null
  );
}
export function reportText(report, language = "en", selected = []) {
  const C = (en, zh) => choose(language, en, zh),
    v = reportView(report, language);
  const lines = [
    v.title,
    v.status,
    v.overview,
    "",
    C("SUPPLEMENT OPTIONS", "可考虑的补充选项"),
  ];
  for (const card of [...v.cards, ...v.discussion])
    lines.push(
      "",
      `${card.rank || ""}. ${card.name} · ${card.status}${selected.includes(card.id) ? C(" · In discussion shortlist", " · 已加入讨论清单") : ""}`,
      card.reason,
      card.benefit,
      C("Food: ", "食物替代：") + card.food,
      C("Caution: ", "注意事项：") + card.caution,
      card.availability,
      ...card.details.map((d) => `${d.title}: ${d.body}`),
      ...card.matchedAnswers.map((a) => `${a.label}: ${a.value}`),
      ...card.references.map((s) => `${s.title}: ${s.url}`),
    );
  lines.push("", C("FOOD & ROUTINE ACTIONS", "饮食与日常行动"));
  v.foodActions.forEach((x) =>
    lines.push(`${x.name}: ${x.reason} ${x.action}`),
  );
  lines.push("", C("REVIEW BEFORE USE", "使用前需核查"));
  v.checks.forEach((x) => lines.push(`${x.name}: ${x.reason} ${x.action}`));
  lines.push("", C("COMPLETE NUTRITION COVERAGE", "完整营养评估"));
  v.coverage.forEach((g) => {
    lines.push("", g.name);
    g.items.forEach((x) =>
      lines.push(
        `${x.name} — ${x.status}`,
        x.reason,
        x.food,
        x.action,
        x.reference.url,
      ),
    );
  });
  lines.push("", C("ALL TAPE INGREDIENT DECISIONS", "全部 Tape 成分决策"));
  v.catalog.forEach((x) =>
    lines.push(
      `${x.name}: ${x.stateLabel} — ${x.reason} ${x.evidence}`,
      x.reference.url,
    ),
  );
  lines.push(
    "",
    C("YOUR ANSWERS", "你的问卷记录"),
    ...answerLines(report.answers, language).map(
      (a) => `${a.label}: ${a.value}`,
    ),
  );
  if (report.notes)
    lines.push(
      "",
      C("Your notes (not interpreted): ", "你的备注（未自动解读）：") +
        report.notes,
    );
  if (report.isPlus)
    lines.push(
      "",
      C(
        "OPTIONAL PLUS FILES · SELECTED LOCALLY ONLY",
        "PLUS 选填文件 · 仅本地选择",
      ),
      ...(report.attachments.length
        ? report.attachments.map((f) => f.name)
        : [C("None added; files are optional.", "未添加；文件为选填。")]),
      C(
        "No files were uploaded or analysed. No review request was sent. Reviewer sign-off: not yet reviewed.",
        "文件未上传或分析，未发送审核申请。审核签署：尚未审核。",
      ),
    );
  lines.push("", v.disclaimer);
  return lines.join("\n");
}
