'use strict'

const { INTAKE_QUESTIONS } = require('../data/intake-questions')
const list = (value) => Array.isArray(value) ? value : []
const has = (value, id) => list(value).includes(id)
const sourceUrl = (slug) => `https://ods.od.nih.gov/factsheets/${slug}-Consumer/`

// Source-coverage heuristics, NOT validated deficiency scores or DRI calculations.
// A "source" means a reported food source exists, never that intake is adequate.
const NUTRIENTS = [
  ['vitamin_d', '维生素 D', 'vitamins', 'VitaminD', ['fish', 'd_fortified'], '参与钙吸收与骨骼健康。', '富脂鱼、明确强化维生素 D 的食品'],
  ['vitamin_a', '维生素 A', 'vitamins', 'VitaminA', ['greens', 'orange', 'milk', 'eggs'], '维持正常视觉、皮肤和黏膜功能。', '深绿叶菜、橙黄色蔬菜、蛋和奶'],
  ['vitamin_c', '维生素 C', 'vitamins', 'VitaminC', ['vegetables', 'fruit'], '参与胶原合成，也帮助非血红素铁吸收。', '甜椒、猕猴桃、柑橘和其他蔬果'],
  ['vitamin_e', '维生素 E', 'vitamins', 'VitaminE', ['nuts', 'oil'], '参与保护细胞免受氧化损伤。', '坚果、种子和适量植物油'],
  ['vitamin_k', '维生素 K', 'vitamins', 'VitaminK', ['greens', 'oil', 'vegetables'], '参与正常凝血和骨相关蛋白的功能。', '绿叶菜、植物油等'],
  ['b1', '维生素 B1', 'vitamins', 'Thiamin', ['whole_grains', 'beans', 'meat'], '参与食物能量利用和正常神经功能。', '全谷、豆类和瘦猪肉'],
  ['b2', '维生素 B2', 'vitamins', 'Riboflavin', ['milk', 'eggs', 'meat', 'greens'], '参与细胞生长与能量代谢。', '奶、蛋、瘦肉和部分绿叶菜'],
  ['b3', '维生素 B3（烟酸）', 'vitamins', 'Niacin', ['meat', 'fish', 'whole_grains', 'beans', 'nuts'], '参与能量代谢；身体也可利用色氨酸合成一部分。', '肉、鱼、全谷、豆类和坚果'],
  ['b5', '维生素 B5（泛酸）', 'vitamins', 'PantothenicAcid', ['meat', 'eggs', 'whole_grains', 'vegetables', 'beans'], '参与脂肪等营养物质的代谢。', '多种肉、蛋、蔬菜、全谷和豆类'],
  ['b6', '维生素 B6', 'vitamins', 'VitaminB6', ['meat', 'fish', 'potato', 'fruit'], '参与氨基酸代谢和神经递质合成。', '禽肉、鱼、薯类及部分水果'],
  ['b7', '生物素（B7）', 'vitamins', 'Biotin', ['eggs', 'meat', 'nuts', 'vegetables'], '参与碳水化合物、脂肪和蛋白质代谢。', '熟蛋、肉、坚果种子和部分蔬菜'],
  ['b9', '叶酸（B9）', 'vitamins', 'Folate', ['greens', 'beans', 'fruit'], '参与 DNA 合成和细胞分裂。', '深绿叶菜、豆类及柑橘类水果'],
  ['b12', '维生素 B12', 'vitamins', 'VitaminB12', ['meat', 'fish', 'milk', 'eggs', 'b12_fortified'], '参与红细胞形成与神经功能。', '动物性食物，或明确强化 B12 的食品'],
  ['calcium', '钙', 'minerals', 'Calcium', ['calcium_drink', 'calcium_tofu', 'greens'], '构成骨骼与牙齿，并参与肌肉和神经功能。', '奶、强化钙饮品、含钙凝固剂豆腐和部分绿叶菜'],
  ['magnesium', '镁', 'minerals', 'Magnesium', ['whole_grains', 'beans', 'nuts', 'greens', 'tofu'], '参与能量代谢以及神经、肌肉功能。', '全谷、豆类、坚果种子和绿叶菜'],
  ['potassium', '钾', 'minerals', 'Potassium', ['vegetables', 'fruit', 'beans', 'potato', 'milk'], '参与正常心脏、神经和肌肉功能。', '蔬果、薯类、豆类及奶类'],
  ['iron', '铁', 'minerals', 'Iron', ['meat', 'beans', 'greens'], '参与血红蛋白形成和氧运输。', '肉类、豆类、绿叶菜；植物来源可搭配维生素 C 食物'],
  ['zinc', '锌', 'minerals', 'Zinc', ['meat', 'seafood', 'beans', 'nuts', 'milk'], '参与正常免疫功能、蛋白合成和伤口愈合。', '肉、贝类、豆类、坚果和奶类'],
  ['iodine', '碘', 'minerals', 'Iodine', ['iodized_salt', 'seafood', 'milk', 'eggs'], '用于合成甲状腺激素。', '加碘盐、部分海产品、奶和蛋'],
  ['selenium', '硒', 'minerals', 'Selenium', ['seafood', 'meat', 'eggs', 'whole_grains'], '参与甲状腺代谢和抗氧化相关酶的功能。', '鱼贝类、肉、蛋及谷物；含量受产地影响'],
  ['copper', '铜', 'minerals', 'Copper', ['nuts', 'whole_grains', 'seafood', 'beans'], '参与铁代谢、结缔组织和多种酶的功能。', '坚果种子、全谷、贝类和豆类'],
  ['manganese', '锰', 'minerals', 'Manganese', ['whole_grains', 'nuts', 'beans', 'greens'], '参与多种代谢酶的正常工作。', '全谷、坚果、豆类和绿叶菜'],
  ['phosphorus', '磷', 'minerals', 'Phosphorus', ['milk', 'meat', 'eggs', 'beans', 'whole_grains'], '参与骨骼结构和能量代谢。', '奶、肉、蛋、豆类和谷物'],
  ['choline', '胆碱', 'other', 'Choline', ['eggs', 'meat', 'fish', 'tofu', 'beans'], '参与细胞膜结构与神经递质合成。', '蛋、肉、鱼、大豆制品和豆类']
].map(([id, title, group, slug, foods, mechanism, sources]) => ({ id, title, group, slug, foods, mechanism, sources }))

function assessIntake(answers = {}, safety = {}) {
  const portions = answers.daily_portions || {}
  const frequency = answers.food_frequency || {}
  const sources = answers.food_sources || {}
  const context = answers.nutrition_context || {}
  const existing = list(answers.existing_sources)
  const conditions = list((answers.health_detail || {}).conditions)
  const medicines = list((answers.health_detail || {}).medicines)
  const labs = list(context.labs)
  const vegan = has(answers.diet_pattern, 'vegan')
  const professional = safety.status === 'professional'
  const medicalRestriction = conditions.some((id) => ['kidney', 'food_limit', 'unknown'].includes(id)) ||
    has(answers.diet_pattern, 'medical_food_restriction') ||
    (has(answers.safety, 'chronic_or_labs') && !conditions.length)
  const signals = {}
  const signal = (id, state, description) => { signals[id] = { id, state, description }; return signals[id] }
  const portion = (id, title, sourceId = id) => {
    const row = INTAKE_QUESTIONS.daily_portions.rows.find((item) => item.id === id)
    const choice = row.choices.find((item) => item.id === portions[id])
    return signal(sourceId, !choice || portions[id] === 'unknown' ? 'unknown' : ['zero', 'small'].includes(portions[id]) ? 'low' : 'source',
      choice && portions[id] !== 'unknown' ? `${title}每天${choice.label}` : `${title}的份量还不清楚`)
  }
  const weekly = (id, title, sourceId = id, lowIds = ['zero', 'one_two']) => {
    const value = frequency[id]
    const label = { zero: '0 天', one_two: '1–2 天', three_four: '3–4 天', five_seven: '5–7 天' }[value]
    return signal(sourceId, !label ? 'unknown' : lowIds.includes(value) ? 'low' : 'source', label ? `${title}每周 ${label}` : `${title}的频率还不清楚`)
  }
  portion('dairy', '奶或植物饮品', 'drink')
  portion('tofu', '豆制品'); portion('beans', '杂豆'); portion('vegetables', '蔬菜')
  portion('fruit', '水果'); portion('whole_grains', '全谷'); portion('nuts', '坚果种子')
  portion('meat_fish', '肉禽鱼虾', 'meat'); portion('eggs', '蛋类')
  weekly('dark_greens', '深绿叶菜', 'greens'); weekly('orange_produce', '橙黄色蔬果', 'orange')
  weekly('fatty_fish', '富脂鱼', 'fish', ['zero']); weekly('seafood', '其他鱼虾贝类', 'seafood', ['zero'])
  signal('milk', sources.calcium_drink === 'dairy' ? signals.drink.state : ['fortified', 'unfortified', 'none'].includes(sources.calcium_drink) ? 'low' : 'unknown',
    sources.calcium_drink === 'dairy' ? signals.drink.description : '饮品不是明确的乳制品来源')
  signal('calcium_drink', ['dairy', 'fortified'].includes(sources.calcium_drink) ? signals.drink.state : ['unfortified', 'none'].includes(sources.calcium_drink) ? 'low' : 'unknown',
    ['dairy', 'fortified'].includes(sources.calcium_drink) ? signals.drink.description : '没有确认规律的奶或强化钙饮品来源')
  signal('calcium_tofu', portions.tofu === 'zero' ? 'low' : sources.calcium_tofu === 'calcium_set' ? signals.tofu.state : sources.calcium_tofu === 'none' ? 'low' : 'unknown',
    sources.calcium_tofu === 'calcium_set' ? `含钙豆腐：${signals.tofu.description}` : '没有确认含钙凝固剂豆腐的摄入量')
  signal('oil', sources.oil === 'plant' ? 'source' : ['animal_coconut', 'very_little'].includes(sources.oil) ? 'low' : 'unknown',
    sources.oil === 'plant' ? '日常使用植物油' : '植物油来源较少或类型不清楚')
  signal('potato', !sources.potato || sources.potato === 'unknown' ? 'unknown' : ['zero', 'one_two'].includes(sources.potato) ? 'low' : 'source',
    `薯类${{ zero: '每周 0 天', one_two: '每周 1–2 天', three_four: '每周 3–4 天', five_seven: '每周 5–7 天' }[sources.potato] || '频率不清楚'}`)
  signal('iodized_salt', sources.salt === 'iodized' ? 'source' : sources.salt === 'non_iodized' ? 'low' : 'unknown',
    sources.salt === 'iodized' ? '主要使用加碘盐' : sources.salt === 'non_iodized' ? '主要使用未加碘盐' : '还不清楚食盐是否加碘')
  const fortified = list(sources.fortified)
  for (const [id, key, label] of [['d_fortified', 'vitamin_d', '维生素 D'], ['b12_fortified', 'b12', 'B12']]) {
    signal(id, fortified.includes(key) ? 'source' : !fortified.length || fortified.includes('unknown') ? 'unknown' : 'low',
      fortified.includes(key) ? `有规律摄入明确强化 ${label} 的食品` : `尚未确认规律的 ${label} 强化食品来源`)
  }
  if (has(answers.diet_pattern, 'reliable_b12_source')) signal('b12_fortified', 'source', '已填写可靠的 B12 来源')
  if (vegan) {
    for (const id of ['meat', 'milk', 'eggs', 'fish', 'seafood']) signal(id, 'low', '纯素饮食不包含动物性来源')
  }

  const labels = { attention: '来源偏少，优先关注', review: '补充信息后再判断', sources: '有食物来源', unknown: '信息还不够', existing: '已有补充，需核对量', medical: '已有情况需核对', variety: '先关注饮食多样性' }
  const low = (id) => signals[id].state === 'low'
  const covered = (id) => signals[id].state === 'source'
  const broadOnly = new Set(['b3', 'b5', 'b7', 'selenium', 'copper', 'manganese', 'phosphorus', 'choline'])
  const nutrients = NUTRIENTS.map((n) => {
    const evidence = n.foods.map((id) => signals[id])
    const lows = evidence.filter((item) => item.state === 'low')
    const known = evidence.filter((item) => item.state !== 'unknown')
    let state = known.length < Math.ceil(evidence.length / 2) ? 'unknown' :
      lows.length >= Math.max(2, Math.ceil(evidence.length * 0.75)) ? 'attention' :
        evidence.some((item) => item.state === 'source') ? 'sources' : 'review'
    let priority = 45
    let reason = ''
    let action = `在日常餐单中轮换安排${n.sources}，先改善来源和份量。`
    let caution = ''
    if (n.id === 'calcium') {
      state = low('calcium_drink') && low('calcium_tofu') ? 'attention' :
        covered('calcium_drink') || covered('calcium_tofu') ? 'sources' :
          low('calcium_drink') ? 'review' : 'unknown'
      priority = 86
      action = '先建立每天能坚持的含钙来源。奶、强化钙饮品和含钙豆腐可按饮食习惯选择；调整后仍难覆盖，再考虑钙补充剂。'
    }
    if (n.id === 'vitamin_d') {
      const limited = ['very_little', 'some'].includes(context.daylight)
      state = limited && low('fish') && low('d_fortified') ? 'attention' :
        covered('d_fortified') ? 'sources' : 'review'
      if (!context.daylight && !known.length) state = 'unknown'
      priority = 92
      reason = state === 'attention' ? '你白天户外接触较少，最近一周没有吃富脂鱼，也没有规律的维生素 D 强化食品来源。' : ''
      action = '先核对强化食品和已有补充来源。饮食难以稳定覆盖时，可考虑维生素 D 补充，并按年龄与健康情况确认合适用量。'
      caution = '不需要为了补维生素 D 暴晒；是否需要检测，应结合个人风险判断。'
    }
    if (n.id === 'b12') {
      state = covered('b12_fortified') ? 'sources' : vegan && low('b12_fortified') ? 'attention' : state
      priority = 96
      action = vegan ? '把明确强化 B12 的食品或 B12 补充剂作为稳定来源，确认标签含量与使用安排。普通海藻和发酵食品不能替代。' : '核对动物性食物或 B12 强化食品是否规律摄入；难以覆盖时再考虑补充。'
    }
    if (n.id === 'magnesium') {
      priority = 72
      action = '先把全谷、豆类、坚果和绿叶菜安排进正餐；长期难以覆盖时再考虑镁补充剂，标签要看“元素镁”含量。'
      caution = '这里关注饮食中的镁，不把睡不好直接判断为缺镁。'
    }
    if (n.id === 'potassium') {
      priority = 78
      action = '优先通过蔬菜、水果、薯类、豆类和奶类增加钾来源，不把钾片当作常规营养补充。'
      caution = '膳食钾来源少不等于低血钾；血钾需要化验判断。'
    }
    if (n.id === 'iron') {
      priority = 68
      if (context.menstrual === 'heavy') {
        state = 'medical'; priority = 99
        reason = '你提到经量较多或经期较长，值得把失血情况与铁状态一起评估。'
      }
      action = '食物上安排合适的含铁来源；若经量多、已有贫血或持续不适，与医生讨论血常规、铁蛋白等检查，再决定是否补铁。'
      caution = '不要仅凭疲劳、脱发或食物频率自行加用铁剂。'
    }
    if (n.id === 'iodine') {
      priority = 65
      action = '先核对食盐是否加碘和其他食物来源，不为了补碘增加盐量，也不用海带或碘片自行加量。'
    }
    if (n.id === 'vitamin_a') caution = '优先改善食物来源；不因皮肤或用眼需求自行增加高剂量维生素 A、鱼肝油。'
    if (n.id === 'b6') caution = '不建议长期自行使用高剂量 B6；过量可能损伤周围神经。'
    if (n.id === 'b7') caution = '高剂量生物素会干扰部分化验；抽血前请告知医护人员。'
    if (broadOnly.has(n.id) && state === 'attention') state = 'variety'

    const directSupplement = existing.includes(n.id) || (n.id.startsWith('b') && /^b\d+$/.test(n.id) && existing.includes('b_complex'))
    const possibleSupplement = directSupplement || existing.includes('multivitamin') || existing.includes('unknown') || existing.includes('other')
    if (possibleSupplement && state !== 'medical') {
      state = 'existing'; priority = 20
      reason = directSupplement ? `你已经在补充${n.title}。饮食来源之外，还需要看清现有产品的实际含量与服用频率。` : '你已经在使用其他或复合营养补充品，需要先核对是否含有这一项，以及实际含量。'
      action = '先核对现有产品的成分、每份含量和实际吃法，再决定是否需要新增；不要仅根据这份问卷叠加。'
    } else if (!existing.length && state === 'attention') {
      state = 'review'
      reason = '饮食中有来源偏少的线索，但还没有填写已有补充来源，暂时不能完整排序。'
    }

    const abnormal = { vitamin_d: 'd_low', iron: 'iron_low', b12: 'b12_low', potassium: 'potassium_abnormal', calcium: 'calcium_abnormal' }[n.id]
    if (abnormal && labs.includes(abnormal)) {
      state = 'medical'; priority = 110
      reason = `你填写了医生已告知的${n.title}相关异常，现有结果比饮食问卷更值得优先跟进。`
      action = '按照已有检查结果与医生确认处理和复查安排，不自行追加或停用正在使用的补充剂。'
    }
    if (n.id === 'potassium' && (medicalRestriction || medicines.includes('potassium_affecting') ||
        (has(answers.safety, 'medication') && (medicines.includes('unknown') || !medicines.length)))) {
      state = 'medical'; priority = 108
      reason = '你填写的肾脏、饮食限制或用药情况可能影响血钾，需要先确认适合的钾摄入安排。'
      action = '先让医生核对血钾、肾功能与药物；不要自行加钾片、改用含钾低钠盐，或刻意增加高钾食物。'
    }
    if (n.id === 'vitamin_k' && medicines.includes('warfarin')) {
      state = 'medical'; priority = 106
      reason = '你正在使用华法林，维生素 K 的摄入稳定性比突然增加或减少更重要。'
      action = '保持日常饮食相对稳定，调整绿叶菜摄入或使用含 K 补充剂前，先与管理用药的医生确认。'
    }
    if (n.id === 'iodine' && conditions.includes('thyroid')) {
      state = 'medical'; priority = 105
      reason = '你提到甲状腺相关疾病，是否需要调整碘摄入应结合具体病情。'
      action = '先确认医生给出的碘摄入要求，不自行加碘片、海藻补充剂或改变现有饮食安排。'
    }
    if (n.id === 'b12' && medicines.includes('b12_affecting') && state !== 'medical') {
      state = 'medical'; priority = 98
      reason = '你提到长期使用二甲双胍或抑酸药，部分情况下可能影响 B12 状态。'
      action = '向开药医生询问是否需要评估 B12；不要自行停药，也不要仅凭用药就确定自己缺乏。'
    }
    if (n.id === 'vitamin_a' && medicines.includes('retinoids')) {
      state = 'medical'; priority = 103
      reason = '你正在使用维 A 酸类药物，额外补充维生素 A 可能增加不良反应风险。'
      action = '不要自行加用维生素 A 或鱼肝油；把已有补充品交给开药医生核对。'
    }
    if (n.id === 'b9' && has(answers.safety, 'pregnant_or_lactating')) {
      state = 'medical'; priority = 104
      reason = '你处于备孕、孕期或哺乳阶段，叶酸安排需要结合具体阶段和已有产品。'
      action = '把当前孕期营养品或叶酸产品带给产科医生，确认是否适合当前阶段及如何继续使用。'
    }
    if (medicalRestriction && state === 'attention') {
      action = `把${n.title}的这些食物来源记录交给熟悉你情况的医生或营养师，先确认可调整的种类和份量；不直接增加受限制的食物。`
    } else if (professional && state === 'attention') {
      action = `结合${n.sources}核对日常来源；如考虑补充剂，先让医生或药师结合年龄、用药与健康情况确认适用性。`
    }
    if (!reason) {
      const descriptions = (state === 'attention' || state === 'variety' ? lows : known).map((item) => item.description)
      reason = descriptions.length ? Array.from(new Set(descriptions)).join('；') + '。' : '相关食物的份量、种类或强化情况还没有确认。'
    }
    if (state === 'sources') action = '保留这些食物来源；目前只确认“有来源”，尚未核算全天摄入是否达到需要。'
    if (state === 'unknown' || state === 'review') action = `补充记录${n.sources}的实际份量、频率和标签，再判断是否需要调整。`
    if (state === 'variety') action = `先改善整体饮食种类与份量；${n.title}不因这份简化来源筛查而单独安排补充剂。`
    if (medicalRestriction && state !== 'medical') {
      action = `先把${n.title}的这些来源与现有医嘱核对，不自行增加、减少或更换受限制的食物。`
    }
    if (['energy', 'many_foods'].includes(context.restriction) && state === 'sources') {
      state = 'review'
      reason += '你也提到长期减少食量或排除多类食物，有来源仍需要进一步核对实际总量。'
      if (!medicalRestriction) action = '先记录几个有代表性的完整饮食日，核对全天份量；必要时请营养师评估整体摄入。'
    }
    if (answers.audience === 'minor_under_18' && state !== 'medical') {
      if (state === 'attention') state = 'review'
      reason += '儿童还需要按具体年龄、生长情况及奶 / 辅食等来源单独评估。'
      action = '请家长按实际年龄记录进食与奶 / 辅食情况，再与儿科或营养专业人员核对；不套用成人份量或成人补剂。'
    }
    return {
      ...n, state, status: labels[state], priority, reason, action, caution,
      evidence: evidence.map((item) => ({ ...item })),
      source: { id: `intake_${n.id}`, title: `NIH ODS · ${n.title}`, url: sourceUrl(n.slug) },
      limitations: broadOnly.has(n.id) ? '该项只做粗略食物来源核对，不能靠本问卷判断缺乏或补充需要。' :
        '食物频率和粗略份量只能提示需要进一步关注的来源；没有计算实际吸收量，也不能诊断体内缺乏。'
    }
  })
  return {
    version: 'intake-source-review-v1', nutrients,
    priorities: nutrients.filter((item) => ['attention', 'medical'].includes(item.state)).sort((a, b) => b.priority - a.priority),
    count: nutrients.length,
    unknownCount: nutrients.filter((item) => ['unknown', 'review'].includes(item.state)).length,
    // Explicitly not a deficiency probability, percentage score or personal dose.
    isDiagnostic: false
  }
}

module.exports = { assessIntake, NUTRIENTS, sourceUrl }
