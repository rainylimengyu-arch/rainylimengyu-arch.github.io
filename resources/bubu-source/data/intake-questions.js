'use strict'

// Household portions are descriptive answers, not a nutrient-intake calculator.
const options = (pairs) => pairs.map(([id, label]) => ({ id, label }))
const choices = (small, middle, large) => options([
  ['zero', '基本没有'], ['small', small], ['medium', middle], ['large', large], ['unknown', '说不清']
])
const field = (id, title, pairs, type = 'single', helper = '') => ({
  id, title, type, required: true, helper, options: options(pairs), exclusiveIds: ['none', 'unknown']
})

const INTAKE_QUESTIONS = {
  daily_portions: {
    id: 'daily_portions', type: 'matrix', required: true, eyebrow: '每天吃多少',
    title: '把最近一周平均到每天，大约吃多少？',
    helper: '包含没吃的日子；份量不必精确。植物饮品、豆制品的强化情况下一步再问。',
    rows: [
      { id: 'dairy', label: '奶、酸奶或植物饮品', description: '一盒通常约 250 mL；先合计饮用量。', choices: choices('不足 250 mL', '250–500 mL', '超过 500 mL') },
      { id: 'tofu', label: '豆腐、豆干等豆制品', description: '约半盒嫩豆腐常为 150 g，以包装重量为准。', choices: choices('不足 100 g', '100–200 g', '超过 200 g') },
      { id: 'beans', label: '煮熟的杂豆', description: '红豆、扁豆、鹰嘴豆等；不重复计算豆腐。', choices: choices('不足半碗', '半碗至一碗', '超过一碗') },
      { id: 'vegetables', label: '蔬菜', description: '按生重估计；外卖里少量配菜也算，但不要算作一整份。', choices: choices('不足 300 g', '300–500 g', '超过 500 g') },
      { id: 'fruit', label: '新鲜水果', description: '不含果汁；一个中等苹果可食部约 150–200 g。', choices: choices('不足 200 g', '200–350 g', '超过 350 g') },
      { id: 'whole_grains', label: '全谷杂粮', description: '燕麦、糙米、全麦等占主食的比例；不把土豆算在这里。', choices: choices('不到主食的 1/3', '主食的 1/3–1/2', '超过主食的 1/2') },
      { id: 'nuts', label: '坚果、种子', description: '去壳后的重量；一小把约 10 g。', choices: choices('不足 10 g', '10–20 g', '超过 20 g') },
      { id: 'meat_fish', label: '肉、禽、鱼、虾、贝类合计', description: '按可食部分生重粗估；手掌大小薄片约 50–100 g。', choices: choices('不足 100 g', '100–200 g', '超过 200 g') },
      { id: 'eggs', label: '鸡蛋或等量其他蛋类', choices: choices('不足 1 个', '约 1 个', '超过 1 个') }
    ]
  },
  food_sources: {
    id: 'food_sources', type: 'fields', required: true, eyebrow: '食物里的关键区别',
    title: '再核对几种容易算错的来源', helper: '这些差别会直接影响钙、碘、维生素 D、E 等项目的判断。',
    fields: [
      field('calcium_drink', '前面喝的主要是什么？', [
        ['dairy', '牛奶、酸奶等乳制品'], ['fortified', '明确标注强化钙的植物饮品'],
        ['unfortified', '未强化钙的豆浆、燕麦饮等'], ['none', '基本不喝'], ['unknown', '不清楚是否强化']
      ]),
      field('calcium_tofu', '常吃的豆腐是哪种？', [
        ['calcium_set', '标签写有硫酸钙 / 石膏等含钙凝固剂'], ['other', '内酯豆腐或其他类型'],
        ['none', '基本不吃'], ['unknown', '不知道凝固剂类型']
      ]),
      field('fortified', '有规律吃这些强化食品吗？', [
        ['vitamin_d', '明确强化维生素 D'], ['b12', '明确强化 B12'], ['other', '其他强化营养素'],
        ['none', '没有'], ['unknown', '没看过标签']
      ], 'multi', '只算标签明确标注的，不默认所有牛奶都强化维生素 D。'),
      field('salt', '日常做饭主要用什么盐？', [
        ['iodized', '加碘盐'], ['non_iodized', '未加碘盐'], ['potassium_salt', '含氯化钾的低钠盐'],
        ['unknown', '主要在外吃 / 不清楚']
      ]),
      field('oil', '日常烹调油主要是什么？', [
        ['plant', '花生、菜籽、葵花籽、大豆、橄榄等植物油'], ['animal_coconut', '主要是猪油、黄油或椰子油'],
        ['very_little', '长期几乎不吃油脂'], ['unknown', '不清楚']
      ]),
      field('potato', '最近一周，土豆、红薯等薯类吃了几天？', [
        ['zero', '0 天'], ['one_two', '1–2 天'], ['three_four', '3–4 天'], ['five_seven', '5–7 天'], ['unknown', '说不清']
      ])
    ]
  },
  nutrition_context: {
    id: 'nutrition_context', type: 'fields', required: true, eyebrow: '影响营养需要的情况',
    title: '这些情况也会影响关注顺序', helper: '不知道可以直说；不会把“没检查过”当作“检查正常”。',
    fields: [
      field('daylight', '最近一个月，白天户外活动通常如何？', [
        ['very_little', '每周大多只有 0–1 天，或主要隔着玻璃'],
        ['some', '每周有几天户外活动，但多遮挡 / 暴露有限'],
        ['regular', '多数天都有一定户外活动'], ['unknown', '变化很大 / 说不清']
      ], 'single', '户外活动不能直接换算成维生素 D 合成量；这里不要求刻意晒伤或停止防晒。'),
      field('menstrual', '目前是否有月经相关失血？', [
        ['not_applicable', '目前没有月经 / 不适用'], ['usual', '有，出血量与平时相近'],
        ['heavy', '经量较多、经期较长，或曾被提醒失血较多'], ['unknown', '不确定 / 不想说明']
      ]),
      field('labs', '近一年是否被医生告知以下结果？', [
        ['d_low', '维生素 D 偏低'], ['iron_low', '缺铁或缺铁性贫血'], ['b12_low', '维生素 B12 偏低'],
        ['potassium_abnormal', '血钾异常'], ['calcium_abnormal', '血钙异常'],
        ['none', '检查过，未被告知这些异常'], ['unknown', '没有相关检查 / 不清楚']
      ], 'multi', '只填写已有结论，不用凭症状猜测；血钙正常也不等于日常钙摄入足够。'),
      field('restriction', '最近是否长期明显减少进食种类或总量？', [
        ['no', '没有，食量和食物种类基本稳定'], ['energy', '在节食或经常吃得很少'],
        ['many_foods', '排除了很多类食物，且很难找到替代'], ['unknown', '说不清']
      ])
    ]
  },
  existing_sources: {
    id: 'existing_sources', type: 'multi', required: true, noneOptionId: 'none',
    exclusiveIds: ['none', 'unknown'], eyebrow: '已有营养来源',
    title: '目前有规律补充哪些营养素？',
    helper: '只为避免把已有来源漏算；本题不做重复用量检查，也不判断目前剂量是否足够。可多选。',
    options: options([
      ['multivitamin', '复合维生素 / 矿物质'], ['vitamin_d', '维生素 D'], ['calcium', '钙'],
      ['magnesium', '镁'], ['potassium', '钾'], ['iron', '铁'], ['b12', 'B12'], ['b_complex', 'B 族'],
      ['omega3', '鱼油 / 藻油'], ['other', '其他'], ['none', '目前没有'], ['unknown', '有在吃，但不知道成分']
    ])
  },
  health_detail: {
    id: 'health_detail', type: 'fields', required: true, eyebrow: '把注意事项问清楚',
    title: '补充一下相关健康与用药情况', helper: '仍会继续完成饮食部分。这里用于避开不适合的饮食或补充建议。',
    fields: [
      field('conditions', '已明确的情况有哪些？', [
        ['kidney', '肾功能异常 / 慢性肾病'], ['thyroid', '甲状腺相关疾病'], ['liver', '肝病'],
        ['stones', '肾结石或高钙血症'], ['food_limit', '医生要求限制某些食物、钾、磷或蛋白质'],
        ['other', '其他疾病或特殊情况'], ['none', '没有这些情况'], ['unknown', '不清楚']
      ], 'multi'),
      field('medicines', '正在使用哪些类型的药物？', [
        ['potassium_affecting', '普利类、沙坦类、螺内酯等可能影响血钾的药物'],
        ['warfarin', '华法林'], ['thyroid_medicine', '甲状腺相关药物'],
        ['b12_affecting', '二甲双胍或长期抑酸药'], ['retinoids', '维 A 酸类药物'],
        ['other', '其他药物'], ['none', '没有用药'], ['unknown', '不知道药物类别']
      ], 'multi', '不认识药物类别时请选择“不知道”，不要为了完成问卷猜测或停药。')
    ]
  }
}

module.exports = { INTAKE_QUESTIONS }
