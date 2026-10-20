import {
  pairRules,
  restrictedIngredients,
  sources,
  starterRainbows,
} from "./pairing-library.js";

export const builderZh = {
  "All Nutrients": "全部成分",
  Focus: "专注力",
  Heart: "心脏健康",
  "Essential fats": "必需脂肪酸",
  Proteins: "蛋白质",
  Vitamins: "维生素",
  Minerals: "矿物质",
  Performance: "运动表现",
  Immunity: "免疫支持",
  Beauty: "美丽养护",
  Wellness: "日常健康",
  "Sleep & Calm": "睡眠与平静",
  Botanicals: "植物成分",
  Biotics: "微生态成分",
  "Nutrition card for {name}": "查看{name}营养卡",
  "Details for {name}": "{name}的详细信息",
  "Add {name}": "添加{name}",
  "Remove {name}": "移除{name}",
  "Open {name} details": "打开{name}详情",
  "Remove {name} from your tape": "从营养带中移除{name}",
  "Remove {name} from preview": "从预览中移除{name}",
  "Amount pending": "含量待确认",
  "Amounts marked Reference are the quantities displayed by Nourished UK, not finalized VITA TAPE specifications or personal intake advice.":
    "标记为“参考”的含量来自 Nourished 英国目录，并非 VITA TAPE 最终规格或个人摄入建议。",
  "Reference amount": "参考含量",
  "Design concept": "设计概念",
  "Your daily tape preview": "你的每日营养带预览",
  "Made by you. For you.": "由你选择，为你而来。",
  "Your Daily Tape": "你的每日营养带",
  "A little ritual. A brighter everyday.": "小小习惯，点亮日常。",
  "Your ingredients. One simple tape.": "你的成分，一条营养带。",
  "YOUR FLAVOR": "你的口味",
  "Pairing rules checked": "已检查搭配规则",
  "Pairing needs attention": "搭配需要关注",
  "Final amounts & suitability still need review.":
    "最终含量和个人适用性仍需审核。",
  "Adjust your ingredients before continuing.": "请调整成分后再继续。",
  Review: "查看",
  "Good nutrition never runs out.": "让好营养融入每一天。",
  "Filter nutrients": "筛选营养成分",
  "Back to your tape": "返回你的营养带",
  "Explore ingredient library": "探索成分资料库",
  "{count} ingredients": "{count} 种成分",
  "{count} {category} ingredients": "{count} 种{category}成分",
  "Search nutrient library": "搜索成分资料库",
  "Find an ingredient…": "查找成分…",
  "Clear ingredient search": "清除成分搜索",
  "Nutrient cards": "营养成分卡片",
  "A little more to explore.": "还有更多值得探索。",
  "No ingredients match “{query}”.": "未找到与“{query}”匹配的成分。",
  "Show all ingredients": "显示全部成分",
  "Reference amounts are from Nourished UK. Final VITA TAPE specifications are to be confirmed.":
    "参考含量来自 Nourished 英国目录。VITA TAPE 的最终规格仍待确认。",
  "Our Science": "我们的科学",
  "See your choices": "让你的选择",
  "take shape.": "逐渐成形。",
  "A connected ribbon starts with considered choices: ingredient compatibility, texture and a material that can flex, roll and portion.":
    "一条相连的营养带，始于周全的选择：成分相容性、口感，以及可弯曲、卷起和分份的材料。",
  "Our proposed approach explores edible gels and multi-material fabrication. Final formulation, serving consistency and performance remain to be validated.":
    "我们提出的方案探索可食用凝胶与多材料制造。最终配方、每份一致性和表现仍需验证。",
  "How Our Science Works": "了解我们的科学方法",
  "A conceptual multi-material fabrication process forming a colourful connected ribbon":
    "多材料制造形成彩色相连营养带的概念过程",
  "Material engineering concept visualization*": "材料工程概念可视化*",
  "A little space in your day.": "为日常留一点空间。",
  "Explore your ingredients between the things you love.":
    "在热爱的生活间隙，探索适合你的成分。",
  "A bright creative desk and a relaxed everyday routine":
    "明亮的创意书桌与轻松的日常习惯",
  "Ready when you are.": "随你的节奏，随时出发。",
  "A personal ritual that belongs in your everyday.":
    "让专属的小习惯融入日常。",
  "A candid everyday commute in natural light": "自然光下的日常通勤场景",
  "A moment that feels like you.": "留一刻，回到自己的节奏。",
  "Make room for a small pause, in your own way.":
    "用自己的方式，为片刻停顿留点空间。",
  "A relaxed pause at home": "家中放松的片刻",
  "{description}. Illustrative imagery.": "{description}。示意图片。",
  "How many ingredients can I choose?": "我可以选择多少种成分？",
  "Choose between one and seven ingredients. Seven is a limit, not a target: a shorter rainbow is welcome too. Every starter is editable, and you can review each ingredient’s nutrition card before choosing.":
    "可选择 1 至 7 种成分。7 种是上限，不是目标，少一些也很好。每个主题组合均可编辑，选择前也可查看各成分的营养卡。",
  "What if a combination needs adjusting?": "如果组合需要调整怎么办？",
  "One rainbow is consumed together, so the builder checks the complete next selection. If an addition triggers a listed rule, your existing choices stay in place and the builder explains the issue, with alternatives rechecked against your current selection. No listed conflict establishes personal safety.":
    "一条彩虹营养带会同时食用，因此工具会检查下一步完整组合。若新增成分触发已列规则，原有选择会保留，并说明原因；提供的其他选项也会根据当前组合重新检查。未发现已列冲突不能证明个人使用安全。",
  "Are final nutrient amounts confirmed?": "最终营养成分含量已确认吗？",
  "Not yet. Catalog quantities shown for reference are separate from final VITA TAPE amounts. Formulation, suppliers, serving consistency and suitability still require review; this is an academic venture simulation and an ingredient explorer.":
    "尚未确认。展示的目录参考量不同于最终 VITA TAPE 含量。配方、供应商、每份一致性及适用性仍需审核；这是学术创业模拟及成分探索工具。",
  "Will changing the flavour reset my ingredients?":
    "更换口味会重置已选成分吗？",
  "No. Flavour is saved with your current draft on this device. You can change it here or in the dedicated flavour step while retaining your selected ingredients.":
    "不会。口味会与当前草稿一起保存在本设备上。你可以在这里或独立的口味步骤中更改，并保留已选成分。",
  "Your flavour": "你的口味",
  "A flavour for": "给日常习惯",
  "your ritual.": "添一份喜欢的味道。",
  "A taste that makes it yours. Explore five flavour directions and keep your current ingredients.":
    "用喜欢的味道，定制你的日常。探索五种口味方向，同时保留已选成分。",
  "Flavour design concepts. Final formulations are to be confirmed.":
    "口味设计概念，最终配方待确认。",
  "A bright, sculptural study of the connected rainbow ribbon material":
    "彩虹相连带状材料的明亮雕塑造型研究",
  "Your current flavour:": "当前口味：",
  "In real life": "融入真实生活",
  "A little personal.": "多一点专属。",
  "A little everyday.": "多一点日常。",
  "Illustrative lifestyle scenes.": "生活方式示意场景。",
  "Generated imagery; no customer testimony is implied.":
    "图片由 AI 生成，不代表顾客证言。",
  "Frequently asked questions": "常见问题",
  "Your questions,": "你的疑问，",
  "answered.": "在这里解答。",
  "*Proposed capabilities for an academic venture simulation. Imagery illustrates design concepts, not independently validated manufacturing or product performance.":
    "*所述能力是学术创业模拟中的拟议方案。图片用于说明设计概念，并非经独立验证的制造能力或产品表现。",
  "Build Your Tape — VITA TAPE": "定制你的营养带 — VITA TAPE",
  "Ingredient Library — VITA TAPE": "成分资料库 — VITA TAPE",
  "{title} is now your starting rainbow. Every ingredient is yours to edit.":
    "已将“{title}”设为起始组合。每一种成分均可自行调整。",
  "Your previous selection now needs review and cannot be restored automatically. Your current rainbow stays.":
    "之前的选择现在需要审核，无法自动恢复。当前组合会保留。",
  "Your previous rainbow is back.": "已恢复之前的组合。",
  "Choose at least one ingredient before continuing.":
    "请至少选择一种成分后再继续。",
  "Choose at least one ingredient before saving.":
    "请至少选择一种成分后再保存。",
  "Your browser could not save your formula. Allow local storage and try again.":
    "浏览器无法保存配方。请允许本地存储后重试。",
  "Skip to tape builder": "跳至营养带定制区",
  "Step {step} of 3": "第 {step} 步，共 3 步",
  "Build Your Daily Tape.": "定制你的每日营养带。",
  "Find your happy flavor.": "找到喜欢的口味。",
  "Beautifully, uniquely yours.": "专属于你的美好日常。",
  "Choose up to 7 ingredients. Make a little more room for you.":
    "最多选择 7 种成分，为自己多留一点空间。",
  "The finishing touch to a ritual that feels like yours.":
    "为专属于你的日常，添上最后一笔。",
  "Your ingredients. Your flavor. Your kind of everyday.":
    "你的成分，你的口味，你的日常。",
  "{count} of 7 selected": "已选 {count} / 7 种",
  "Next:": "下一步：",
  "Choose Flavor": "选择口味",
  "Review My Tape": "查看我的营养带",
  "Save My Formula": "保存我的配方",
  "Made to mix, with a little care.": "自由搭配，也多一份用心。",
  "Your saved rainbow needs attention.": "已保存的组合需要关注。",
  "Some ingredients need a different pairing. We’ll help you find one.":
    "部分成分需要调整搭配，我们会协助你探索其他组合。",
  "A listed pairing needs review before you continue.":
    "继续前，有一项已列搭配需要审核。",
  "How pairing works": "搭配规则说明",
  "Review pairings": "查看搭配",
  "Your starter rainbow is ready to edit.":
    "主题起始组合已准备好，可开始编辑。",
  "Undo rainbow change": "撤销组合更改",
  "← Back to ingredients": "← 返回成分选择",
  "A flavor for your everyday": "为日常挑选口味",
  "Something to look": "每天都多一份",
  "forward to.": "小小期待。",
  "← Back to flavors": "← 返回口味选择",
  "Your very own formula": "你的专属配方",
  "A little personal": "多一份专属的",
  "attention.": "用心。",
  "Give your formula a name": "为你的配方取个名字",
  "(optional)": "（选填）",
  "My brighter days": "我的明亮日常",
  "{amount} reference": "{amount}（参考）",
  "Save an ingredient concept on this device. Final amounts, formulation and personal suitability still need review.":
    "在本设备保存成分概念。最终含量、配方和个人适用性仍需审核。",
  "Choose Your Flavor": "选择你的口味",
  "A light, natural taste to make it yours.": "清新自然的味道，为你而选。",
  "← Back to VITA TAPE": "← 返回 VITA TAPE",
  "Small rituals. Brighter days.": "小小习惯，让日常更明亮。",
  "Ingredient library": "成分资料库",
  "View final tape preview": "查看最终营养带预览",
  "{count} of 7 ingredients": "已选 {count} / 7 种成分",
  "A little care before you continue.": "继续前，先多一份关照。",
  "Ingredient ideas are only a starting point.": "成分想法只是起点。",
  "Final amounts and suitability still need review. This is an ingredient concept, not a cleared product formula.":
    "最终含量和适用性仍需审核。这是成分概念，并非已经审核通过的产品配方。",
  "Continue exploring": "继续探索",
  "Back to browsing": "返回浏览",
  "Dismiss notification": "关闭通知",
  "Your brighter days, saved.": "你的美好日常，已保存。",
  "{name} is saved locally on this device.": "“{name}”已保存在本设备上。",
  "{count} ingredients, {flavour}, and a little more you.":
    "{count} 种成分，{flavour}口味，多一点你的风格。",
  "Saved as an ingredient concept. Final amounts, formulation and personal suitability still need review.":
    "已作为成分概念保存。最终含量、配方和个人适用性仍需审核。",
  "Keep exploring": "继续探索",
  "Your little collection.": "你的专属收藏。",
  "Edit my formula": "编辑我的配方",
  "Saved formula cleared from this device.": "已清除本设备上的已保存配方。",
  "Your browser could not clear the saved formula.":
    "浏览器无法清除已保存配方。",
  "Clear saved formula": "清除已保存配方",
  "Your next favorite ritual has a little space here.":
    "为你下一个喜欢的日常习惯，留一点空间。",
  "Build Your Tape": "定制你的营养带",
  "Thoughtfully chosen. Yours to explore.": "用心选择，由你探索。",
  "A little ingredient curiosity.": "多一点成分好奇心。",
  "{count} ingredients. Their story, their sources, and the details that matter.":
    "{count} 种成分，了解它们的故事、来源与重要细节。",
  "Explore the complete ingredient reference": "探索完整成分参考资料",
  "JSON resource": "JSON 资源",
  "CSV resource": "CSV 资源",
  "Thoughtful pairings. Clear reasons.": "用心搭配，理由清晰。",
  "Everything in one rainbow is taken together.":
    "同一条彩虹营养带中的成分会同时食用。",
  "Some pairings need a dose check.": "部分搭配需要检查剂量。",
  "For example, iron at 25 mg or more may reduce zinc absorption when taken together. Final amounts are still pending, so this pairing stays on hold.":
    "例如，同次摄入 25 mg 或以上的铁可能降低锌吸收。最终含量仍待确认，因此该搭配暂缓使用。",
  "Some belong to different routines.": "部分成分适合不同的日常时段。",
  "We keep ginseng separate from evening wind-down candidates. This is a routine choice, not a claim that those pairs are dangerous.":
    "我们将人参与晚间放松候选成分分开。这是使用时段策略，并非声称这些搭配有危险。",
  "Your circumstances matter too.": "你的个人情况同样重要。",
  "Medicines, existing supplements, health conditions, allergies, pregnancy, breastfeeding, planning pregnancy, being under 18 or having surgery planned need professional review first. This builder cannot check every interaction.":
    "正在用药或服用其他补剂、有健康状况或过敏、孕期、哺乳期、备孕、未满 18 岁或计划手术者，均需先由专业人员审核。本工具无法检查所有相互作用。",
  "No listed conflict does not establish safety. These are ingredient ideas; final amounts, suitability and formulation still need review.":
    "未发现已列冲突不能证明安全。以上仅为成分想法；最终含量、适用性和配方仍需审核。",
  "Read the research & flow design (中文)": "阅读研究与流程设计（中文）",
  "Back to my rainbow": "返回我的组合",
  "Let’s find a better fit.": "一起探索更合适的搭配。",
  "A little attention for your rainbow.": "为你的组合多一份关注。",
  "NOT ADDED TO YOUR RAINBOW": "尚未加入你的组合",
  "Your current ingredients stay as they are.": "你当前的成分保持不变。",
  "Your saved selection needs a fresh pairing review before you continue.":
    "继续前，已保存的选择需要重新进行搭配审核。",
  "Other ingredients to explore": "可以探索的其他成分",
  "These do not trigger a listed pairing rule with your current selection. They are not equivalent substitutes or a personal safety clearance.":
    "这些成分与当前选择不会触发已列搭配规则。它们并非等效替代品，也不代表已确认适合个人安全使用。",
  "Choose {name} instead": "改选{name}",
  "Adjust your selection": "调整你的选择",
  Remove: "移除",
  "A LITTLE INSPIRATION, JUST BELOW": "一点灵感，就在这里",
  "Find your kind of rainbow.": "发现属于你的彩虹组合。",
  "Seven themed starting points. Seven ingredients in each. Yours to edit.":
    "7 个主题起点，每个含 7 种成分，由你自由编辑。",
  "Ingredient ideas": "成分想法",
  "Final amounts pending": "最终含量待确认",
  "Explore starter rainbows": "探索主题起始组合",
  "Explore {title} rainbow": "探索{title}组合",
  "Preview this rainbow": "预览这个组合",
  "Review first. Then make it yours.": "先查看，再按你的想法调整。",
  "{title}: seven ingredient ideas": "{title}：7 种成分想法",
  "One rainbow.": "一条彩虹营养带。",
  "Your own daily ritual.": "属于你的日常习惯。",
  "Why these seven?": "为什么选择这 7 种？",
  "Food first.": "食物优先。",
  "A starting idea, not a personal recommendation. Seven is optional. Every edit is checked against the same pairing rules.":
    "这是起始想法，并非个人推荐。无需一定选满 7 种，每次编辑都会按同一套搭配规则检查。",
  "Before making this yours": "定制之前，先了解你的情况",
  "Do you take medicines or other supplements, have a health condition, allergies, abnormal test results or dietary restrictions, have surgery planned, or are you pregnant, breastfeeding, planning pregnancy or under 18?":
    "你是否正在用药或服用其他补剂，有健康状况、过敏、检查结果异常、饮食限制或计划手术，或正处于孕期、哺乳期、备孕期，或未满 18 岁？",
  "I’m 18+ and none of these apply.": "我已满 18 岁，且以上情况均不适用。",
  "At least one applies, or I’m not sure.": "至少有一项适用，或我不确定。",
  "Please review ingredients with a pharmacist or clinician first. You can keep browsing ideas here; automatic selection and the next step are paused.":
    "请先与药师或临床专业人员复核成分。你仍可继续浏览想法；自动选择和下一步已暂停。",
  "Your answer stays in this page session. No health details are collected or saved.":
    "你的回答仅保留在当前页面会话中，不收集或保存健康详情。",
  "{title}, made yours.": "{title}，由你定制。",
  "Seven ingredient ideas. A starting point to personalise.":
    "7 种成分想法，作为个性化调整的起点。",
  "This will replace your current {count} ingredient. Your flavour stays. You can undo the change.":
    "这将替换当前的 {count} 种成分，口味会保留，你可以撤销更改。",
  "This will replace your current {count} ingredients. Your flavour stays. You can undo the change.":
    "这将替换当前的 {count} 种成分，口味会保留，你可以撤销更改。",
  "This will add all seven ideas to your rainbow. You can edit or undo afterwards.":
    "这会将全部 7 种成分想法加入你的组合。之后可以编辑或撤销。",
  "Replace with this rainbow": "替换为此组合",
  "Use this rainbow": "使用此组合",
  "Keep browsing": "继续浏览",
  "Nutrition card": "营养成分卡",
  "Ingredient form": "原料形式",
  "Ingredient source": "原料来源",
  "Ingredient functions": "成分作用",
  "What it does": "它的作用",
  "Addition amount": "添加含量",
  "Formula pending": "配方待确认",
  "Confirmed amount": "已确认含量",
  "VITA TAPE amount": "VITA TAPE 含量",
  "To be confirmed": "待确认",
  "Reference catalog amount": "参考目录含量",
  "Reference label NRV": "参考标签 NRV",
  "Reference quantities are from the Nourished UK catalog. They are not final VITA TAPE amounts or personal intake recommendations.":
    "参考含量来自 Nourished 英国目录，并非 VITA TAPE 最终含量或个人摄入建议。",
  "No addition amount has been set for this design ingredient.":
    "此设计成分尚未设定添加量。",
  "Evidence & things to know": "证据与注意事项",
  "Final VITA TAPE form, supplier, country of origin and allergen status are to be confirmed.":
    "VITA TAPE 的最终形式、供应商、原产国和过敏原状态仍待确认。",
  "Sources & references": "来源与参考资料",
  "Manufacturer information": "制造商资料",
  "Reference catalog": "参考目录",
  "Independent reference": "独立参考资料",
  "Reviewed {date}. Ingredient research does not establish the effects of a finished VITA TAPE product.":
    "资料复核日期：{date}。成分研究不能确立 VITA TAPE 成品的效果。",
  "Remove from my tape": "从我的营养带移除",
  "Add to my tape": "加入我的营养带",
  "Back to ingredients": "返回成分列表",
  "Your tape preview, waiting for your ingredients":
    "你的营养带预览，等待添加成分",
  "Final tape preview with {count} nutrient lane: {ingredients}":
    "最终营养带预览，包含 {count} 条成分色带：{ingredients}",
  "Final tape preview with {count} nutrient lanes: {ingredients}":
    "最终营养带预览，包含 {count} 条成分色带：{ingredients}",
  "A little space": "留一点空间",
  "for your kind of everyday.": "给属于你的日常。",
};

const pairingCopy = {
  "iron-zinc": [
    "需要剂量审核",
    "人体吸收证据；作用取决于剂量",
    "同次摄入 25 mg 或以上的补充铁与锌，可能降低锌吸收。我们的最终铁剂量尚未设定，因此该搭配暂缓使用。参考含量并非最终剂量。",
    "在此最终铁剂量（25 mg 或以上）下，铁与锌不会放在同一条营养带中，以避免降低锌吸收。",
  ],
  "iron-curcumin": [
    "需要搭配审核",
    "证据有限；来自高剂量姜黄的病例报告，并非已证实的 HydroCurc 特异性相互作用",
    "一篇病例报告将高剂量姜黄与缺铁联系起来，但不能据此确立本参考含量下的风险。本原型暂不将铁与姜黄素组合，直至具体配方完成审核。",
  ],
  "iodine-ashwagandha": [
    "需要甲状腺相关审核",
    "基于各成分的预防性考虑；尚未确立直接搭配证据",
    "碘摄入和南非醉茄各自都可能影响甲状腺健康。有关这一具体搭配的直接证据有限，配方审核前暂不将它们放入同一条营养带。",
  ],
  routine: [
    "适合不同时段",
    "VITA TAPE 使用时段策略，并非临床禁忌",
    "人参可能引起失眠。由于同一条营养带中的成分会同时食用，我们将人参与晚间放松候选成分分开。这是我们的日常时段策略，并非证明该搭配有危险。",
  ],
  "5-htp-review": [
    "需先由专业人员审核",
    "药物及影响血清素的补剂相互作用警告",
    "5-HTP 可能与抗抑郁药及其他影响血清素的产品发生相互作用。你可以阅读资料，但无法通过本自助定制工具添加。请向药师或临床专业人员咨询适用性。",
  ],
};
for (const rule of [...pairRules, ...restrictedIngredients]) {
  const row = pairingCopy[rule.kind === "routine" ? "routine" : rule.id];
  ["label", "evidence", "message", "confirmedMessage"].forEach((field, i) => {
    if (rule[field]) builderZh[rule[field]] = row[i];
  });
}
Object.assign(builderZh, {
  "Your rainbow has room for 7": "你的组合最多容纳 7 种成分",
  "Remove an ingredient before adding another. A shorter rainbow is welcome too.":
    "请先移除一种成分再添加，少一些的组合也很好。",
  "Repeated ingredient": "成分重复",
  "Each ingredient can appear only once.": "每种成分只能出现一次。",
  "Unrecognised ingredient": "无法识别的成分",
  "This ingredient needs a library review before it can be used.":
    "该成分需要完成资料库审核后才能使用。",
});

const sourceLabels = {
  zinc: "NIH ODS · 锌",
  iron: "NIH ODS · 铁",
  iodine: "NIH ODS · 碘",
  magnesium: "NIH ODS · 镁",
  vitaminK: "NIH ODS · 维生素 K",
  vitaminE: "NIH ODS · 维生素 E",
  folate: "NIH ODS · 叶酸",
  multivitamin: "NIH ODS · 多种维生素／矿物质补剂",
  ashwagandha: "NCCIH · 南非醉茄",
  ginseng: "NCCIH · 亚洲人参",
  sleep: "NCCIH · 睡眠障碍",
  turmeric: "MSK · 姜黄",
  htp: "MSK · 5-HTP",
  supplements: "NCCIH · 合理使用膳食补剂",
  coq10: "NCCIH · 辅酶 Q10",
  probiotics: "NCCIH · 益生菌",
  ginger: "NCCIH · 生姜",
  cordyceps: "MSK · 虫草",
  milkThistle: "MSK · 水飞蓟",
  resveratrol: "MSK · 白藜芦醇",
  maca: "MSK · 玛咖",
  lycopene: "MSK · 番茄红素",
  theanine: "MSK · 茶氨酸",
  exercise: "NIH ODS · 运动补剂",
  weightLoss: "NIH ODS · 减重补剂",
  bpl1: "Pedret 等 · CECT 8145 试验",
  careflow: "芒果制剂 · 先导研究",
  collagen: "鱼胶原蛋白 · 过敏病例报告",
  eyes: "美国国家眼科研究所 · AREDS／AREDS2 常见问题",
  silica: "欧洲食品安全局 · 特定硅形式评估",
  vinegar: "大量苹果醋摄入 · 病例报告",
  omega3: "NIH ODS · Omega-3 脂肪酸",
  tartCherry: "Losso 等 · 酸樱桃汁先导试验",
  scutellaria: "黄芩素片 · 一期研究",
  inositol: "肌肉肌醇 · 安全性综述",
};
for (const [id, source] of Object.entries(sources))
  builderZh[source.label] = sourceLabels[id];

const starterCopy = {
  energy: {
    title: "活力日常",
    time: "日间想法",
    kicker: "为你的日常节奏",
    description:
      "围绕日常营养设计的日间起点。不含咖啡因，不自动加入铁，也不承诺即刻提神。",
    roles: [
      "正常能量代谢",
      "肌肉与神经功能",
      "日常营养基础",
      "正常能量代谢",
      "细胞能量候选成分",
      "日间植物候选成分",
      "正常营养素代谢",
    ],
    rationale:
      "以 B12、C 和镁作为基础。CoQ10 和甜菜根是可选候选成分；仍需核对研究中的制剂和剂量。持续疲劳需要评估，不能靠猜测补铁。",
    food: "先从规律用餐、豆类、鸡蛋或其他蛋白质食物、蔬菜及充足睡眠做起。",
    caveat:
      "完整的 7 成分混合物尚未经过临床测试。纠正摄入不足，不同于为营养充足者提升精力。",
  },
  beauty: {
    title: "美丽养护",
    time: "日常想法",
    kicker: "从内而外，多一点关照",
    description:
      "以营养为基础的皮肤、头发和指甲概念，以维生素 C 为起点，不作高剂量美容声明。",
    roles: [
      "正常胶原蛋白形成",
      "蛋白质候选成分；来源待定",
      "正常皮肤维持",
      "正常头发与指甲维持",
      "日常营养基础",
      "类胡萝卜素候选成分",
      "膳食脂肪酸候选成分",
    ],
    rationale:
      "维生素 C 支持正常胶原蛋白形成，但不能证明这条营养带可改善外观。胶原蛋白来源、剂量和过敏原适用性仍未确定。硒过量可损害头发和指甲。",
    food: "添加补剂前，优先安排蛋白质食物、彩色蔬菜、水果、坚果和种子。",
    caveat:
      "此 7 成分概念尚未确立任何皮肤、头发或指甲方面的效果。我们不会默认添加高剂量视黄醇。",
  },
  "sixty-plus": {
    title: "60 岁以上",
    time: "日常想法",
    kicker: "为人生新篇章提供一点想法",
    description:
      "面向 60 岁以上成人、以 B12 为核心的探索起点。年龄本身不能说明你需要什么。",
    roles: [
      "60 岁后值得关注 B12",
      "正常骨骼维持",
      "正常肌肉功能",
      "膳食脂肪酸候选成分",
      "叶黄素／玉米黄质候选成分",
      "日常营养基础",
      "正常免疫功能",
    ],
    rationale:
      "在年龄增长后，强化食品或补剂中的 B12 可能值得关注。我们不常规加入铁、视黄醇、碘和 K2。这不是 AREDS 配方，也不是眼病或骨病的治疗方案。",
    food: "以蛋白质食物、富钙食物、蔬菜和适当的强化食品为基础。",
    caveat:
      "使用前必须复核药物、肾功能、现有补剂和个人需求。没有一种配方适合所有 60 岁以上人群。",
  },
  "mood-sleep": {
    title: "情绪与睡眠",
    time: "晚间概念",
    kicker: "给放松留点空间",
    description:
      "以晚间为主题的日常营养概念。不含褪黑素或 5-HTP，也不在同一组合中加入人参。",
    roles: [
      "正常神经系统功能",
      "放松候选成分",
      "晚间植物候选成分",
      "日常营养，并非镇静剂",
      "日常营养，并非镇静剂",
      "日常营养，并非镇静剂",
      "日常营养，并非镇静剂",
    ],
    rationale:
      "只有茶氨酸和酸樱桃作为放松候选成分，其余成分体现日常营养主题。镁对失眠的证据有限；此组合不是情绪低落或失眠的治疗方案。",
    food: "保持规律作息、减少晚间咖啡因摄入，并规律均衡用餐。",
    caveat:
      "7 种成分是一种设计形式，不等于 7 种已证实的助眠成分。制剂、剂量、耐受性和睡前适用性仍需审核。",
  },
  everyday: {
    title: "日常基础",
    time: "日常想法",
    kicker: "你的日常探索起点",
    description:
      "在饮食基础上探索的一组简单营养想法。少一些的组合也可能是合适的选择。",
    roles: [
      "正常骨骼维持",
      "正常能量代谢",
      "正常免疫功能",
      "正常肌肉功能",
      "正常营养素代谢",
      "膳食脂肪酸候选成分",
      "菌株特异性培养物候选成分",
    ],
    rationale:
      "这是广泛的营养概念，并非每位成人都需要全部 7 种的证据。益生菌菌株、保质期末活菌数以及营养带工艺中的稳定性仍未解决。",
    food: "多样饮食优先；有相关缺口时，再用强化食品或补剂补充。",
    caveat: "本工具不提供营养缺乏评估或个人剂量。所有最终含量仍待确认。",
  },
  active: {
    title: "活跃每一天",
    time: "日间想法",
    kicker: "为持续行动的日子",
    description: "以活动为主题，围绕肌肉、蛋白质和日常营养设计的探索起点。",
    roles: [
      "正常肌肉功能",
      "正常能量代谢",
      "正常骨骼维持",
      "正常胶原蛋白形成",
      "细胞能量候选成分",
      "活动主题候选成分",
      "蛋白质候选成分；来源待定",
    ],
    rationale:
      "镁和 D3 构成营养主题基础。甜菜根、CoQ10 和胶原蛋白只是候选成分，并不代表参考含量已被证实可提升耐力或促进恢复。",
    food: "运动前后优先保证充足食物、蛋白质、水分和恢复。",
    caveat:
      "营养带不能代替正餐、补水或恢复。此组合的运动表现和恢复效果尚未确立。",
  },
  "gut-immune": {
    title: "肠道与免疫",
    time: "日常想法",
    kicker: "用心考虑的日常关照",
    description:
      "以肠道和免疫为主题，结合日常营养素及两种依赖具体制剂的候选成分。",
    roles: [
      "菌株特异性培养物候选成分",
      "制剂特异性候选成分",
      "正常免疫功能",
      "正常免疫功能",
      "正常免疫功能",
      "日常营养基础",
      "日常营养基础",
    ],
    rationale:
      "益生菌和 β-葡聚糖的作用取决于具体制剂。不能将某一菌株或提取物的研究套用于任何同名成分的营养带。",
    food: "先从富含膳食纤维的食物、多样饮食及个人可耐受的发酵食品做起。",
    caveat:
      "不作预防感染或治疗肠道疾病的声明。免疫功能低下者使用益生菌前需由专业人员审核。",
  },
};
for (const starter of starterRainbows) {
  const translated = starterCopy[starter.id];
  for (const field of [
    "title",
    "time",
    "kicker",
    "description",
    "rationale",
    "food",
    "caveat",
  ])
    builderZh[starter[field]] = translated[field];
  starter.ingredients.forEach(([, role], index) => {
    builderZh[role] = translated.roles[index];
  });
}

export default builderZh;
