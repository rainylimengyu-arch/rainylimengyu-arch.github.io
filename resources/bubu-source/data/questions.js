'use strict'

const { INTAKE_QUESTIONS } = require('./intake-questions')

const QUESTION_IDS = Object.freeze({
  AUDIENCE: 'audience',
  SAFETY: 'safety',
  PROFILE: 'profile',
  SCENES: 'scenes',
  DAILY_LOAD: 'daily_load',
  GOALS: 'goals',
  SLEEP_DETAIL: 'sleep_detail',
  IMPACT: 'impact',
  DIET_PATTERN: 'diet_pattern',
  FOOD_QUICK: 'food_quick',
  FOOD_FREQUENCY: 'food_frequency',
  TRAINING_DETAIL: 'training_detail',
  DAILY_PORTIONS: 'daily_portions',
  FOOD_SOURCES: 'food_sources',
  NUTRITION_CONTEXT: 'nutrition_context',
  EXISTING_SOURCES: 'existing_sources',
  HEALTH_DETAIL: 'health_detail'
})

const OPTION_IDS = Object.freeze({
  NONE: 'none',
  ADULT: 'adult_18_64',
  SENIOR: 'senior_65_plus',
  MINOR: 'minor_under_18',
  VEGAN: 'vegan',
  RELIABLE_B12: 'reliable_b12_source',
  STRENGTH_SCENE: 'strength_training',
  ENDURANCE_SCENE: 'endurance_training',
  STRENGTH_GOAL: 'strength',
  ENDURANCE_GOAL: 'endurance',
  COMPREHENSIVE_GOAL: 'comprehensive'
})

function option(id, label, description, modes) {
  const value = { id, label }
  if (description) value.description = description
  if (Array.isArray(modes) && modes.length) value.modes = Object.freeze(modes.slice())
  return Object.freeze(value)
}

const MODES = Object.freeze({
  quick: Object.freeze({
    id: 'quick',
    title: '极简版',
    timeLabel: '约 2 分钟',
    estimatedMinutes: 2,
    stepLabel: '5 个核心步骤',
    baseStepCount: 5,
    description: '快速看生活场景与关键食物来源，得到方向性营养类别。'
  }),
  detailed: Object.freeze({
    id: 'detailed',
    title: '详细版',
    timeLabel: '约 12–18 分钟',
    estimatedMinutes: Object.freeze([12, 18]),
    stepLabel: '14 个核心步骤，按情况增加追问',
    baseStepCount: 14,
    description: '逐项了解食物份量、维生素与矿物质来源，再结合睡眠、训练和健康情况排列重点。'
  })
})

const FOOD_FREQUENCY_CHOICES = Object.freeze([
  option('zero', '0 天'),
  option('one_two', '1–2 天'),
  option('three_four', '3–4 天'),
  option('five_seven', '5–7 天'),
  option('unknown', '说不清')
])

const FOOD_ROWS = Object.freeze([
  option('dairy_calcium', '奶、酸奶或明确强化钙的植物饮品'),
  option('calcium_soy', '豆类、豆腐或其他大豆制品'),
  option('eggs', '鸡蛋'),
  option('meat_poultry', '肉类或禽类'),
  option('fatty_fish', '三文鱼、沙丁鱼、鲭鱼等富脂鱼'),
  option('seafood', '其他鱼、虾、贝类或海鲜'),
  option('dark_greens', '深绿叶菜'),
  option('orange_produce', '胡萝卜、南瓜、红薯等橙黄色蔬果'),
  option('fruit_veg', '其他蔬菜和水果'),
  option('whole_grains', '全谷物、杂粮或薯类'),
  option('nuts_seeds', '坚果或种子')
])

const QUESTIONS = Object.freeze({
  ...INTAKE_QUESTIONS,
  [QUESTION_IDS.AUDIENCE]: Object.freeze({
    id: QUESTION_IDS.AUDIENCE,
    type: 'single',
    required: true,
    eyebrow: '先确定结果范围',
    title: '这次是为谁了解？',
    helper: '年龄会改变安全边界；未成年人和 65 岁以上不会套用普通成人路径。',
    options: Object.freeze([
      option(OPTION_IDS.ADULT, '18–64 岁成人'),
      option(OPTION_IDS.SENIOR, '65 岁及以上成人', '继续了解饮食，补充方式需结合健康情况'),
      option(OPTION_IDS.MINOR, '未满 18 岁', '不使用成人剂量或成人功能补剂路径')
    ])
  }),

  [QUESTION_IDS.SAFETY]: Object.freeze({
    id: QUESTION_IDS.SAFETY,
    type: 'multi',
    required: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '安全边界',
    title: '以下是否有符合你的情况？',
    helper: '可多选。只有紧急情况会停止问卷；其他情况会继续了解，并调整相关建议。',
    groups: Object.freeze([
      Object.freeze({ id: 'professional', label: '需要专业确认' }),
      Object.freeze({ id: 'urgent', label: '需要立即处理' }),
      Object.freeze({ id: 'target_flags', label: '只暂停相关目标' })
    ]),
    options: Object.freeze([
      option('pregnant_or_lactating', '备孕、怀孕或哺乳'),
      option('medication', '正在使用处方药或需长期使用的非处方药'),
      option('chronic_or_labs', '有医生正在处理的慢性病或异常化验'),
      option('malabsorption_or_bariatric', '有吸收障碍或做过减重/消化道手术'),
      option('surgery_or_reaction', '近期准备手术，或曾有严重补充剂不良反应'),
      option('medical_food_restriction_quick', '因过敏、疾病或医生建议，需要限制某类食物', '', ['quick']),
      option('urgent_chest_breathing', '现在有胸痛、呼吸困难、晕厥或意识混乱'),
      option('urgent_neurologic', '突然说话困难、单侧无力、抽搐或严重神经症状'),
      option('urgent_severe_allergy', '疑似严重过敏，症状正在快速加重'),
      option('urgent_vision', '突然视力下降/视野缺损，尤其伴剧烈头痛或呕吐'),
      option('urgent_mental_safety', '严重躁狂、极度激越、无法保证自身安全，或有自伤/伤人想法'),
      option('urgent_overdose', '疑似大量误服补充剂或不明软糖/粉剂'),
      option('severe_mood_impairment', '严重抑郁或情绪问题已明显无法维持基本生活/工作，但没有上述立即安全风险'),
      option('flag_eye', '眼痛、复视、白瞳，或持续头痛/呕吐伴视觉异常'),
      option('flag_hair_skin', '突然/斑片状脱发，或头皮、皮疹明显异常'),
      option('flag_gut', '便血/黑便、非意愿体重下降、持续呕吐、吞咽困难或明显腹痛'),
      option('flag_joint', '关节红肿发热、外伤后不能负重或怀疑骨折'),
      option('flag_cognition', '进行性认知或步态变化'),
      option('flag_sleep_function', '呼吸暂停、白天无法保持清醒，或情绪已明显影响功能'),
      option('flag_child_growth', '儿童生长停滞、体重下降、发育倒退或极端限制进食'),
      option('flag_persistent_function_quick', '已有困扰持续较久，并明显影响工作、学习或日常生活', '', ['quick']),
      option(OPTION_IDS.NONE, '以上都没有')
    ])
  }),

  [QUESTION_IDS.PROFILE]: Object.freeze({
    id: QUESTION_IDS.PROFILE,
    type: 'profile',
    required: true,
    eyebrow: '基本资料',
    title: '先补充一点基础信息',
    description: '只用于让训练和饮食解释更贴近你的情况；不用于诊断、体重评价或计算个人剂量。',
    helper: '生理性别必选；身高和体重可跳过。答案只在本次页面内使用。',
    fields: Object.freeze([
      Object.freeze({ id: 'age', type: 'number', required: false, title: '年龄（可选）', placeholder: '例如 35', unit: '岁', min: 0, max: 120 }),
      Object.freeze({
        id: 'sex',
        type: 'single',
        required: true,
        title: '生理性别',
        helper: '仅用于避免把一般营养信息写成“一刀切”的建议。',
        options: Object.freeze([
          option('female', '女性'),
          option('male', '男性'),
          option('prefer_not_to_say', '不想说明')
        ])
      }),
      Object.freeze({
        id: 'height_cm',
        type: 'number',
        required: false,
        title: '身高（可选）',
        placeholder: '例如 165',
        unit: 'cm',
        min: 45,
        max: 230
      }),
      Object.freeze({
        id: 'weight_kg',
        type: 'number',
        required: false,
        title: '体重（可选）',
        placeholder: '例如 60',
        unit: 'kg',
        min: 2,
        max: 300
      })
    ])
  }),

  [QUESTION_IDS.SCENES]: Object.freeze({
    id: QUESTION_IDS.SCENES,
    type: 'multi',
    required: true,
    allowSelectAll: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '生活场景',
    title: '过去 4 周，你经常处在哪些场景？',
    helper: '可全选。场景只决定追问和解释，不会直接推出某种补剂。',
    options: Object.freeze([
      option('knowledge_work', '办公、写作、编程、设计等脑力工作'),
      option('student', '上学、备考、科研或长时间学习'),
      option('physical_work', '体力工作、长时间站立/行走或搬抬'),
      option('caregiver', '全职照护、带娃或承担大量家务'),
      option('home_flexible', '居家或自由职业，生活安排较灵活'),
      option('outdoor_heat', '经常在户外、高温或闷热环境活动'),
      option('shift_work', '夜班、轮班、值班或作息经常变化'),
      option(OPTION_IDS.STRENGTH_SCENE, '规律力量训练、增肌或高强度间歇训练'),
      option(OPTION_IDS.ENDURANCE_SCENE, '规律跑步、骑行、球类或其他耐力运动'),
      option('travel', '经常出差、跨时区或长距离通勤'),
      option(OPTION_IDS.NONE, '目前没有固定场景')
    ])
  }),

  [QUESTION_IDS.DAILY_LOAD]: Object.freeze({
    id: QUESTION_IDS.DAILY_LOAD,
    type: 'multi',
    required: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '场景细化',
    title: '这些负荷或作息，哪些经常发生？',
    helper: '可多选。把职业拆成真正影响饮食与恢复的条件。',
    options: Object.freeze([
      option('high_focus_screen', '长时间高度专注、阅读或盯屏幕'),
      option('sedentary', '每天久坐时间很长'),
      option('standing_walking', '每天长时间站立或走动'),
      option('heavy_physical', '经常搬抬、用力或高体力活动'),
      option('emotional_care', '沟通、照护或情绪责任很重'),
      option('unpredictable_schedule', '临时加班、待命，休息难安排'),
      option('meals_irregular', '经常错过正餐、很晚吃或用零食/外卖顶替'),
      option('indoor_days', '大部分白天待在室内'),
      option('late_caffeine', '咖啡、茶或能量饮料常喝到下午/晚上'),
      option('sweat_over_2h_limited_meals', '高温或运动中连续明显出汗超过 2 小时，且不方便正常进餐'),
      option('travel_disruption', '跨时区或旅行经常打断睡眠和进餐'),
      option(OPTION_IDS.NONE, '以上都不明显')
    ])
  }),

  [QUESTION_IDS.GOALS]: Object.freeze({
    id: QUESTION_IDS.GOALS,
    type: 'multi',
    required: true,
    allowSelectAll: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '最想针对的问题',
    title: '你现在想改善或了解什么？',
    helper: '不限数量。选择 4 项及以上会进入综合模式，但不会把每项都变成一瓶补剂。',
    options: Object.freeze([
      option('sleep', '睡不好（入睡慢、半夜醒或醒后不解乏）'),
      option('stress', '压力大、紧张或难以放松'),
      option('fatigue', '白天疲劳、犯困或没精神'),
      option('brain', '脑雾、专注或记忆状态不理想'),
      option(OPTION_IDS.STRENGTH_GOAL, '力量、增肌和高强度训练表现'),
      option(OPTION_IDS.ENDURANCE_GOAL, '耐力、长时间运动或大量出汗后的恢复'),
      option('bone', '骨骼、钙和维生素 D 相关营养'),
      option('joint', '关节活动或运动后的关节困扰'),
      option('gut', '排便规律、膳食纤维和消化舒适度'),
      option('skin', '健康成人想了解皮肤水合、弹性或胶原（皮疹/痤疮不选此项）'),
      option('hair', '头发、头皮、指甲或担心脱发'),
      option('eyes', '成人长时间用眼/屏幕，想了解眼睛营养（视力变化或眼病不选此项）'),
      option('diet_coverage', '素食、少鱼、少奶或限制饮食的营养覆盖'),
      option('life_stage', '儿童、孕哺、老年或其他生命阶段营养'),
      option('cardiometabolic', '心血管、血脂、血糖或体重相关补剂知识'),
      option('immunity', '感冒、免疫相关营养和常见产品辨别'),
      option(OPTION_IDS.COMPREHENSIVE_GOAL, '没有单一问题，想做一次全面营养盘点'),
      option(OPTION_IDS.NONE, '暂时没有明确目标')
    ])
  }),

  [QUESTION_IDS.SLEEP_DETAIL]: Object.freeze({
    id: QUESTION_IDS.SLEEP_DETAIL,
    type: 'multi',
    required: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '睡眠追问',
    title: '最近 4 周，睡眠更像是哪一种情况？',
    description: '把“睡不好”拆开，避免把不同问题都笼统地指向同一种成分。',
    helper: '可多选；如果没有睡眠困扰，只是想了解精力或专注，请选最后一项。',
    options: Object.freeze([
      option('sleep_hard_to_start', '躺下后常要很久才能睡着'),
      option('sleep_waking', '夜里容易醒，醒后不容易再睡'),
      option('sleep_early_waking', '比计划早醒很多，而且睡不回去'),
      option('sleep_short_opportunity', '主要是工作、照护或作息挤占了睡眠时间'),
      option('sleep_nonrestorative', '睡够了仍常觉得不解乏'),
      option('sleep_schedule_shift', '轮班、倒时差或作息经常变化'),
      option(OPTION_IDS.NONE, '没有睡眠困扰 / 不适用')
    ])
  }),

  [QUESTION_IDS.IMPACT]: Object.freeze({
    id: QUESTION_IDS.IMPACT,
    type: 'single',
    required: true,
    eyebrow: '影响程度',
    title: '这些困扰持续和影响到什么程度？',
    helper: '这不是诊断量表，只决定症状型内容应该如何提示。',
    options: Object.freeze([
      option('occasional', '只是偶尔出现，对生活影响不大'),
      option('frequent_manageable', '经常出现，但还能应付'),
      option('persistent_impairing', '持续较长时间，并明显影响工作、学习或生活'),
      option('education_only', '没有在填症状，只想了解营养')
    ])
  }),

  [QUESTION_IDS.DIET_PATTERN]: Object.freeze({
    id: QUESTION_IDS.DIET_PATTERN,
    type: 'multi',
    required: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '饮食方式',
    title: '你的饮食方式有哪些特点？',
    helper: '可多选。纯素者会分别评估 B12、钙、碘、铁锌和 n-3，不会自动推一整套。',
    options: Object.freeze([
      option('lacto_ovo_vegetarian', '蛋奶素'),
      option(OPTION_IDS.VEGAN, '纯素或几乎不吃动物性食物'),
      option(OPTION_IDS.RELIABLE_B12, '我会按标签规律使用明确标注 B12 含量的强化食品或补充剂'),
      option('low_dairy', '很少奶制品或强化钙替代品'),
      option('low_fish', '很少鱼和海鲜'),
      option('restricted_energy', '长期减脂、断食或明显限制总食量'),
      option('takeaway_meal_replacement', '经常外卖、代餐或不方便正常做饭'),
      option('non_iodized_or_unknown_salt', '家中不用加碘盐、很少在家吃或不清楚'),
      option('medical_food_restriction', '因过敏、疾病或医生建议限制食物'),
      option(OPTION_IDS.NONE, '以上都不符合')
    ])
  }),

  [QUESTION_IDS.FOOD_QUICK]: Object.freeze({
    id: QUESTION_IDS.FOOD_QUICK,
    type: 'multi',
    required: true,
    noneOptionId: OPTION_IDS.NONE,
    eyebrow: '关键食物来源',
    title: '下面哪些食物或情况，平时明显偏少？',
    helper: '可全选。只判断来源覆盖，不换算毫克，也不诊断缺乏。',
    options: Object.freeze([
      option('low_dairy_calcium', '奶、酸奶或强化钙植物饮品'),
      option('low_calcium_soy', '豆类、豆腐或其他大豆制品'),
      option('low_eggs', '鸡蛋'),
      option('low_meat_poultry', '肉类或禽类'),
      option('low_fatty_fish', '三文鱼、沙丁鱼、鲭鱼等富脂鱼'),
      option('low_seafood', '其他鱼、虾、贝类或海鲜'),
      option('low_dark_greens', '深绿叶菜'),
      option('low_orange_produce', '胡萝卜、南瓜、红薯等橙黄色蔬果'),
      option('low_fruit_veg', '其他蔬菜和水果'),
      option('low_whole_grains', '全谷物、杂粮或薯类'),
      option('low_nuts_seeds', '坚果或种子'),
      option('no_reliable_b12', '纯素，且没有可靠的 B12 强化食品/补充来源'),
      option('non_iodized_or_unknown_salt', '不用加碘盐、很少在家吃或不清楚'),
      option('sweat_over_2h_limited_meals', '经常连续明显出汗超过 2 小时，且不方便正常进餐'),
      option(OPTION_IDS.NONE, '都不算少 / 说不清')
    ])
  }),

  [QUESTION_IDS.FOOD_FREQUENCY]: Object.freeze({
    id: QUESTION_IDS.FOOD_FREQUENCY,
    type: 'matrix',
    required: true,
    eyebrow: '食物来源频率',
    title: '过去 7 天，这些食物大约吃了几天？',
    helper: '不用回忆份量，按最接近的频率选择即可。结果仍只代表来源覆盖。',
    rows: FOOD_ROWS,
    choices: FOOD_FREQUENCY_CHOICES
  }),

  [QUESTION_IDS.TRAINING_DETAIL]: Object.freeze({
    id: QUESTION_IDS.TRAINING_DETAIL,
    type: 'training',
    required: true,
    eyebrow: '训练分支',
    title: '你的训练与恢复是怎样的？',
    helper: '每个人都会看到这一步。只有训练条件明确，才会出现蛋白、肌酸或运动补液类别。',
    fields: Object.freeze([
      Object.freeze({
        id: 'frequency',
        type: 'single',
        title: '过去 4 周，通常每周规律训练几次？',
        options: Object.freeze([
          option('zero', '0 次'),
          option('one_two', '1–2 次'),
          option('three_four', '3–4 次'),
          option('five_plus', '5 次及以上')
        ])
      }),
      Object.freeze({
        id: 'types',
        type: 'multi',
        title: '训练类型（可多选；不规律训练可不选）',
        options: Object.freeze([
          option('strength', '力量/增肌'),
          option('hiit', '短时高强度/冲刺/球类'),
          option('aerobic_under_60', '单次少于 60 分钟的有氧'),
          option('endurance_over_60', '单次超过 60 分钟的耐力训练'),
          option('competition_or_twice_daily', '备赛或一天多练')
        ])
      }),
      Object.freeze({
        id: 'duration',
        type: 'single',
        title: '单次训练通常多久？',
        options: Object.freeze([
          option('not_applicable', '不适用 / 暂无规律训练'),
          option('under_45', '少于 45 分钟'),
          option('45_to_75', '45–75 分钟'),
          option('over_75', '超过 75 分钟')
        ])
      }),
      Object.freeze({
        id: 'protein_access',
        type: 'single',
        title: '训练日，正餐蛋白通常能否稳定吃到？',
        options: Object.freeze([
          option('not_applicable', '不适用 / 暂无规律训练'),
          option('adequate', '大多能稳定吃到'),
          option('sometimes_hard', '有时很难'),
          option('usually_hard', '经常很难'),
          option('unknown', '说不清')
        ])
      })
    ])
  })
})

const OPTIONS_BY_QUESTION = Object.freeze(Object.keys(QUESTIONS).reduce((result, id) => {
  result[id] = QUESTIONS[id].options || QUESTIONS[id].choices || []
  return result
}, {}))

function getModeDefinition(mode) {
  return MODES[mode] || MODES.quick
}

module.exports = {
  MODES,
  QUESTIONS,
  QUESTION_IDS,
  OPTION_IDS,
  OPTIONS_BY_QUESTION,
  FOOD_ROWS,
  FOOD_FREQUENCY_CHOICES,
  getModeDefinition
}
