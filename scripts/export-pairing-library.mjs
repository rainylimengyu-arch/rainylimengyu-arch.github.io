import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  pairingVersion,
  sources,
  pairRules,
  restrictedIngredients,
  futureRules,
  ingredientProfiles,
  starterRainbows,
} from "../src/pairing-library.js";
import { evaluateFormula } from "../src/pairing-engine.js";

const root = resolve(import.meta.dirname, "..");
const catalog = JSON.parse(
  await readFile(resolve(root, "src/nutrient-library.json"), "utf8"),
);
const byId = new Map(catalog.items.map((n) => [n.id, n]));
const name = (id) => byId.get(id)?.name || id;
const sourceLinks = (ids) =>
  ids.map((id) => `[${sources[id].label}](${sources[id].url})`).join("；");
const csv = (rows) =>
  "\ufeff" +
  rows
    .map((row) =>
      row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
const matrix = [
  [
    "ingredient_a",
    "ingredient_b",
    "prototype_status",
    "matched_rules",
    "clinical_safety_status",
  ],
];
for (let i = 0; i < catalog.items.length; i++) {
  for (let j = i + 1; j < catalog.items.length; j++) {
    const a = catalog.items[i].id,
      b = catalog.items[j].id;
    const check = evaluateFormula([a, b]);
    matrix.push([
      a,
      b,
      check.ok ? "no_listed_conflict_not_cleared" : "held_in_prototype",
      check.issues.map((r) => r.id).join(";"),
      "not_cleared",
    ]);
  }
}
const doc = `# VITA TAPE：同卷冲突、推荐搭配与网页链路 v1

日期：2026-10-18（Asia/Shanghai）｜规则版本：${pairingVersion}

## 先确定产品的含义

一个 rainbow 的所有成分在同一次食用。不能用“早晚分开服用”解决同一卷里的冲突；需要错时的成分应选另一套独立产品。本版按“每个主题一套 7 成分”理解需求，设计 Energy Boost、Beauty、60+、Mood & Sleep 等 7 个主题。7 是容量与展示形式，不是营养学上必须吃 7 种的结论。支持少于 7 种，也不因空位自动补满。

**这是有来源、可追踪的产品原型规则库，尚不是临床审定的安全库或可生产配方。** 现有 39 种成分均没有最终 VITA TAPE 规格。Nourished 的参考含量不能用于计算本产品的冲突阈值、总摄入量或合规性。未命中规则只代表“未发现已录入的冲突”，不等于适合本人，也不等于可以上市。

## 1. 冲突分层：证据与产品决策分开

| 层级 | 触发条件 | 本版行为 | 对用户怎么说 |
|---|---|---|---|
| 明确需要避免的相互作用 | 例如 5-HTP 与影响血清素的药物/圣约翰草/SAM-e | 不提供自助加入或强行继续 | 需要药师/医生先判断 |
| 剂量条件冲突 | 例如同次补充的铁达到 25 mg 或以上，同时含锌 | 最终剂量达阈值则同卷拦截；未知则待复核拦截 | 说明剂量条件，不能笼统写“铁锌不能同吃” |
| 有限证据/预防性复核 | 铁＋姜黄素；碘＋南非醉茄 | 当前产品策略先不放同卷 | 明写有限证据或推断，不称临床绝对禁忌 |
| 时段与目标不合适 | 人参＋晚间主题候选 | 产品时段策略拦截 | 人参可能引起失眠；这不是证明两种成分同服危险 |
| 个人适用性 | 用药、疾病、孕哺/备孕、未成年、手术、过敏、现有补剂等 | 可以看资料，不自动套用或进入个人配方流程 | 信息留在本次会话，不收具体病历或药名 |
| 未覆盖或规格未定 | 无规则命中、身份/剂量/活菌稳定性等未知 | 可保存搭配概念，不能宣称已安全审定 | 不显示“100% safe”“clinically approved” |

### 当前库内的具体规则

| ID | 成分 | 类别与证据 | 产品行为/依据 |
|---|---|---|---|
${pairRules.map((r) => `| ${r.id} | ${r.members.map(name).join(" ＋ ")} | ${r.kind}；${r.evidence} | ${r.message} ${sourceLinks(r.sourceIds)} |`).join("\n")}
| 5-htp-review | 5-HTP（单项） | 用药/血清素产品相互作用，个人适用性未建立 | 保留资料卡，自助不可加入，所有主题排除。${sourceLinks(["htp"])} |

**不能误拦截的组合：** 普通剂量的锌＋镁、D3＋K2、C＋B12、B12＋叶酸不做一律禁配。叶酸可能掩盖 B12 缺乏，是缺乏评估和大剂量长期使用问题，不是二者互斥。Omega-3＋维生素 E 不做“必然出血”的二元禁配；应看剂量、药物及个人状态。没有被禁用仍不代表完整安全评估完成。${sourceLinks(["zinc", "folate", "vitaminE", "vitaminK"])}

**未来规则，当前不参与匹配：** 钙＋铁（同次补充可能干扰吸收，宜独立时段）；5-HTP＋SAM-e / 圣约翰草（避免血清素产品叠加）。钙、SAM-e、圣约翰草不在当前 39 种目录内，不能为了展示冲突而假装当前可选。${sourceLinks(["iron", "htp"])}

### 药物/健康情况不是营养素二元冲突

| 情境 | 重点候选 | 处理 |
|---|---|---|
| 华法林/同类维生素 K 拮抗剂 | K2、含维生素 K 的复合配料 | 不自动新增或停用；让临床团队评估摄入一致性 |
| 抗抑郁药、MAOI、利奈唑胺等血清素相关药物 | 5-HTP | 不自助推荐 |
| 甲状腺疾病/用药 | 碘、南非醉茄 | 先专业复核 |
| 肾功能异常 | 镁等 | 先专业复核，不按普通成人阈值直接判安全 |
| 抗凝/抗血小板药、手术安排 | E、姜黄素/黑胡椒及多种草本等 | 全配方和药物清单复核，不用“错开两小时”泛化解决 |
| 左甲状腺素、部分抗生素等 | 铁、锌、镁等 | 药物各自间隔要求不同；本网页不生成个人服药时间表 |
| 孕哺/备孕、未成年、已确诊疾病、异常检查、医嘱限制或过敏 | 全部主题 | 看资料，不自动套用；是否补充由专业人员结合实际需要判断 |
| 现有补剂或复合维生素 | 所有重复营养素 | 总量、剂型与重复成分复核后再决定 |

依据：${sourceLinks(["vitaminK", "htp", "iodine", "ashwagandha", "magnesium", "iron", "zinc", "supplements"])}。

## 2. 39 种成分的覆盖台账

“重点筛查”表示查过与本次规则直接相关的资料，不表示该成分所有相互作用已穷尽。“专项待查”必须继续核实具体菌株/植物种属/提取比例/标准化指标/复合配料等。每项仍为 not-cleared。

| 成分 | 本版证据范围 | 关键复核项 | 资料 |
|---|---|---|---|
${ingredientProfiles.map((p) => `| ${name(p.id)} | ${p.evidenceStatus === "ingredient-specific-review-open" ? "专项待查" : "重点筛查"}；最终剂量待定 | ${p.reviewNoteZh || p.reviewNote} | ${sourceLinks(p.sourceIds)} |`).join("\n")}

配套 pair-coverage.csv 覆盖 39×38÷2＝741 个无序对，是**匹配覆盖表**，不是 741 项临床审查报告。未命中对明确写 no_listed_conflict_not_cleared；禁止把它翻译成“兼容认证”。复合成分还需在生产前展开为 constituent level：例如 HydroCurc + 黑胡椒、Greens Blend、Lutemax 的组成不能只按单一营销名称判断。

## 3. 七个主题搭配

以下是编辑设计的主题起点，不是个体医疗建议，不宣称整套协同增效，也没有整套临床有效性证据。每套的 21 个内部成分对都调用同一套规则校验；通过只表示没有命中本版拦截。所有剂量、来源、稳定性与本地准入均待最终确认。

${starterRainbows.map((s) => `### ${s.title}\n\n定位：${s.description}\n\n| 7 个候选成分 | 在这套里的角色 |\n|---|---|\n${s.ingredients.map(([id, role]) => `| ${name(id)} | ${role} |`).join("\n")}\n\n搭配逻辑：${s.rationale}\n\n食物优先：${s.food}\n\n边界：${s.caveat}\n\n依据与边界：${sourceLinks(s.sourceIds)}。`).join("\n\n")}

Mood & Sleep 特别说明：现有目录不足以支持“7 个都有可靠助眠效果”的说法，因此采用日常营养基础＋少量晚间候选的概念。若最终剂量或人体证据不能支持这套，应该减少成分或重命名，不能为了凑满 7 格虚构助眠机制。所有成分同一次食用，不能把其中几种另写成晨服来回避同卷约束。

## 4. 完整交互链路

1. **打开页面**：保留当前选择和真实 Tape 预览；读取旧草稿后重跑规则。旧草稿有冲突时明确列出问题，阻止下一步，不静默删掉原有选择。
2. **浏览卡片**：根据当前选择计算新候选状态。“Dose review / Different routines / Professional review”文字可见；按钮仍可点击以了解原因，不用只置灰制造死路。
3. **点加入**：先校验完整的新配方。移除始终可用。新增命中冲突时不改变原配方，展示所有命中原因、证据类别和来源，无 Add anyway。
4. **选其他成分**：按该规则的候选列表排序，过滤已选/原尝试项，再对完整配方复验，最多展示 3 个。它们只是“其他可探索项”，不称等效治疗或绝对安全。已满 7 种则先引导移除，不偷偷替换。
5. **下方主题区**：7 个主题切换；每个显示 7 成分、角色、时间概念、依据和不适用提醒。支持查看为什么这样搭配。
6. **套用主题**：先预览，再做一次最少个人适用性分流；符合普通成人探索范围才可套用。若当前已有选择，明确提示将替换，点击确认前保持原样。套用是整体替换，不把两套混到一卷；保留口味；提供撤销，撤销也复验。
7. **个人适用性分流**：单选“18+ 且无所列情况”或“任一情况适用/不确定”。后一项仅浏览，提示先找药师/医生，不自动套用、不进入下一步。无默认选中，无药名/病史采集，无健康答案持久化。
8. **进入口味、复核和保存**：再次校验现有整套配方并经过适用性分流；保存仅是浏览器内的搭配概念，标记规则版本及配方未审定，不是购买、医嘱或生产放行。
9. **编辑后反馈**：计数、卡片状态、替代项和最终 Tape 实时更新。已选项移除后相应冲突自动解除。不会引入进度条或七点追踪器。

## 5. 数据结构与上线前链路

源代码 pairing-library.js 保存规则 ID、成员、类别、证据强度、阈值、来源、复核状态、候选替代和主题；pairing-engine.js 是唯一的前端匹配入口。pairing-library.json 是可交接的数据导出。规则命中与是否适合某个人是两个维度。

生产流程应为：规范原料 ID → 展开复合配料 → 以最终元素/活性成分量汇总 → 重复成分与日摄入总量 → 年龄/地区对应上限与适用性 → 成分对/组风险 → 单次食用时段 → 技术配伍/活菌与油脂稳定性 → 标签和销售地审查 → 专业人员签核 → 后端权威校验 → 才能下单/放行。

不能只在前端拦截；后端必须对草稿恢复、主题套用、购物车、下单、批次替换重复校验，并保存配方哈希、规则版本、签核人和生效日期。上限必须区分食物＋补剂总量与仅补剂来源，例如镁；不同化学形式和地区阈值不能混用。本版没有后端、无订单和生产放行能力。

发布阻断项：所有最终剂量尚未签核；${ingredientProfiles.filter((p) => p.evidenceStatus === "ingredient-specific-review-open").length} 种成分的专项相互作用复核仍未完成；所有复合原料/菌株/过敏原、七主题整套剂量、工艺稳定性及销售地准入尚未签核。绝不因单元测试通过而改变 not-cleared 状态。
`;
const payload = {
  version: pairingVersion,
  reviewedAt: "2026-10-18",
  status: "prototype-not-clinically-cleared",
  sources,
  pairRules,
  restrictedIngredients,
  futureRules,
  ingredientProfiles,
  starterRainbows,
};
for (const dir of ["resources/pairing", "public/resources/pairing"]) {
  const target = resolve(root, dir);
  await mkdir(target, { recursive: true });
  await writeFile(
    resolve(target, "pairing-library.json"),
    JSON.stringify(payload, null, 2) + "\n",
  );
  await writeFile(resolve(target, "pair-coverage.csv"), csv(matrix));
  await writeFile(resolve(target, "README.zh-CN.md"), doc);
}
console.log(
  `Exported ${ingredientProfiles.length} ingredient profiles, ${matrix.length - 1} pair records, ${starterRainbows.length} starter rainbows. Not clinically cleared.`,
);
