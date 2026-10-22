'use strict'

const {
  MODES,
  QUESTIONS,
  QUESTION_IDS,
  OPTION_IDS,
  FOOD_ROWS,
  getModeDefinition
} = require('../data/questions')
const { assessIntake } = require('./intake-screening')

const URGENT_SAFETY_IDS = new Set([
  'urgent_chest_breathing',
  'urgent_neurologic',
  'urgent_severe_allergy',
  'urgent_vision',
  'urgent_mental_safety',
  'urgent_overdose'
])

const PROFESSIONAL_SAFETY_IDS = new Set([
  'pregnant_or_lactating',
  'medication',
  'chronic_or_labs',
  'malabsorption_or_bariatric',
  'surgery_or_reaction',
  'severe_mood_impairment',
  'medical_food_restriction_quick'
])

const TARGET_FLAG_MAP = Object.freeze({
  flag_eye: Object.freeze(['eyes']),
  flag_hair_skin: Object.freeze(['hair', 'skin']),
  flag_gut: Object.freeze(['gut']),
  flag_joint: Object.freeze(['joint', 'bone']),
  flag_cognition: Object.freeze(['brain']),
  flag_sleep_function: Object.freeze(['sleep', 'stress', 'fatigue', 'brain']),
  flag_child_growth: Object.freeze(['life_stage']),
  flag_persistent_function_quick: Object.freeze(['sleep', 'stress', 'fatigue', 'brain', 'gut', 'skin', 'hair', 'eyes', 'joint'])
})

const LOW_FREQUENCIES = new Set(['zero', 'one_two'])
const TRAINING_FREQUENCIES = new Set(['one_two', 'three_four', 'five_plus'])

const GOAL_LABELS = Object.freeze((QUESTIONS[QUESTION_IDS.GOALS].options || []).reduce((result, item) => {
  result[item.id] = item.label
  return result
}, {}))

function normalizeMultiAnswer(value, noneId = OPTION_IDS.NONE) {
  let items = []
  if (Array.isArray(value)) {
    items = value
  } else if (typeof value === 'string') {
    items = [value]
  } else if (value && typeof value === 'object') {
    if (Array.isArray(value.selected)) {
      items = value.selected
    } else if (Array.isArray(value.values)) {
      items = value.values
    } else {
      items = Object.keys(value).filter((key) => value[key] === true)
    }
  }

  const unique = []
  const seen = new Set()
  items.forEach((item) => {
    if (typeof item !== 'string') return
    const id = item.trim()
    if (!id || seen.has(id)) return
    seen.add(id)
    unique.push(id)
  })

  return noneId && unique.includes(noneId) ? [noneId] : unique
}

function resolveQuestion(questionOrId) {
  if (questionOrId && typeof questionOrId === 'object') return questionOrId
  return QUESTIONS[questionOrId] || null
}

function validateStep(questionOrId, answer, answers = {}) {
  const question = resolveQuestion(questionOrId)
  if (!question) return { valid: false, message: '找不到这一步，请返回后重试。' }

  if (question.type === 'single') {
    const validIds = new Set((question.options || []).map((item) => item.id))
    const valid = typeof answer === 'string' && validIds.has(answer)
    return { valid, message: valid ? '' : '请选择一个最符合的选项。' }
  }

  if (question.type === 'multi') {
    const selected = normalizeMultiAnswer(answer, question.noneOptionId)
    const validIds = new Set((question.options || []).map((item) => item.id))
    const valid = selected.length > 0 && selected.every((id) => validIds.has(id))
    return { valid, message: valid ? '' : '请至少选择一项。' }
  }

  if (question.type === 'matrix') {
    const matrix = answer && typeof answer === 'object' ? answer : {}
    const missingRows = (question.rows || []).filter((row) => !(row.choices || question.choices || []).some((item) => item.id === matrix[row.id]))
    const valid = missingRows.length === 0
    return {
      valid,
      message: valid ? '' : `还有 ${missingRows.length} 项没有选择；不确定可选“说不清”。`,
      missingRows: missingRows.map((row) => row.id)
    }
  }

  if (question.type === 'fields') {
    const value = answer && typeof answer === 'object' ? answer : {}
    const invalid = (question.fields || []).find((field) => {
      const allowed = new Set(field.options.map((item) => item.id))
      const selected = field.type === 'multi' ? normalizeMultiAnswer(value[field.id], null) : [value[field.id]]
      const exclusive = field.exclusiveIds || []
      return !selected.length || selected.some((id) => !allowed.has(id)) ||
        (selected.length > 1 && selected.some((id) => exclusive.includes(id)))
    })
    return { valid: !invalid, message: invalid ? `请完成“${invalid.title}”；不确定可选择相应选项。` : '' }
  }

  if (question.type === 'profile') {
    const value = answer && typeof answer === 'object' ? answer : {}
    const sexField = (question.fields || []).find((field) => field.id === 'sex') || {}
    const validSexIds = new Set((sexField.options || []).map((item) => item.id))
    if (!validSexIds.has(value.sex)) {
      return { valid: false, message: '请选择生理性别，或选择“不想说明”。' }
    }

    const invalidMetric = (question.fields || []).find((field) => {
      if (field.type !== 'number') return false
      const rawValue = value[field.id]
      if (rawValue === '' || rawValue === undefined || rawValue === null) return false
      const numericValue = Number(rawValue)
      return !Number.isFinite(numericValue) || numericValue < field.min || numericValue > field.max
    })
    if (invalidMetric) {
      return {
        valid: false,
        message: `${invalidMetric.title}请填写合理数值，或留空跳过。`
      }
    }
    if (value.age !== '' && value.age !== undefined && value.age !== null) {
      const age = Number(value.age)
      const audience = answers.audience
      if (!Number.isInteger(age) || (audience === OPTION_IDS.ADULT && (age < 18 || age >= 65)) ||
          (audience === OPTION_IDS.MINOR && age >= 18) || (audience === OPTION_IDS.SENIOR && age < 65)) {
        return { valid: false, message: '年龄与第一步选择不一致，请检查年龄或返回修改。' }
      }
    }
    return { valid: true, message: '' }
  }

  if (question.type === 'training') {
    const value = answer && typeof answer === 'object' ? answer : {}
    const frequency = value.frequency
    if (!['zero', 'one_two', 'three_four', 'five_plus'].includes(frequency)) {
      return { valid: false, message: '请选择每周训练频率。' }
    }
    if (frequency !== 'zero' && normalizeMultiAnswer(value.types, null).length === 0) {
      return { valid: false, message: '请选择至少一种训练类型。' }
    }
    if (!['not_applicable', 'under_45', '45_to_75', 'over_75'].includes(value.duration)) {
      return { valid: false, message: '请选择单次训练通常多久。' }
    }
    if (!['not_applicable', 'adequate', 'sometimes_hard', 'usually_hard', 'unknown'].includes(value.protein_access || value.proteinAccess)) {
      return { valid: false, message: '请选择正餐蛋白的获取情况。' }
    }
    return { valid: true, message: '' }
  }

  return { valid: !question.required || Boolean(answer), message: answer ? '' : '请完成这一步。' }
}

function getSafetyDisposition(answers = {}) {
  const audience = answers[QUESTION_IDS.AUDIENCE] || answers.audience
  const rawSelected = normalizeMultiAnswer(answers[QUESTION_IDS.SAFETY] || answers.safety, null)
  // 对安全题采取保守解析：即使异常数据同时带有“都没有”和风险项，也保留风险项。
  const selected = rawSelected.length > 1
    ? rawSelected.filter((id) => id !== OPTION_IDS.NONE)
    : rawSelected
  const urgentReasons = selected.filter((id) => URGENT_SAFETY_IDS.has(id))
  const professionalReasons = selected.filter((id) => PROFESSIONAL_SAFETY_IDS.has(id))
  const dietPattern = normalizeMultiAnswer(answers[QUESTION_IDS.DIET_PATTERN] || answers.diet_pattern)
  if (dietPattern.includes('medical_food_restriction')) professionalReasons.push('medical_food_restriction')
  const labs = normalizeMultiAnswer((answers.nutrition_context || {}).labs, null)
  if (labs.some((id) => ['d_low', 'iron_low', 'b12_low', 'potassium_abnormal', 'calcium_abnormal'].includes(id))) {
    professionalReasons.push('known_nutrient_labs')
  }
  const blockedTargets = []

  selected.forEach((id) => {
    ;(TARGET_FLAG_MAP[id] || []).forEach((target) => {
      if (!blockedTargets.includes(target)) blockedTargets.push(target)
    })
  })

  if (urgentReasons.length > 0) {
    return {
      status: 'stop',
      title: '请先处理当前的紧急情况',
      message: '本问卷已停止，不会显示任何补剂卡。请联系当地急救、急诊或中毒咨询；不要等待问卷结果。',
      reasons: urgentReasons,
      blockedTargets,
      educationOnly: true
    }
  }

  if (audience === OPTION_IDS.SENIOR || audience === OPTION_IDS.MINOR) {
    professionalReasons.unshift(audience)
  }

  if (professionalReasons.length > 0) {
    return {
      status: 'professional',
      title: '这次需要专业确认',
      message: '当前版本不会套用普通成人补剂路径，只提供一般食物教育。请与医生、药师或注册营养师确认。',
      reasons: Array.from(new Set(professionalReasons)),
      blockedTargets,
      educationOnly: true
    }
  }

  return {
    status: 'continue',
    title: blockedTargets.length ? '可继续，但部分目标会暂停' : '可以继续一般营养匹配',
    message: blockedTargets.length
      ? '带有红旗信号的相关目标不会生成补剂内容；其他目标仍只做一般营养教育。'
      : '结果只做食物来源与营养类别教育，不诊断缺乏，也不提供个人剂量。',
    reasons: [],
    blockedTargets,
    educationOnly: false
  }
}

function shouldShowTrainingBranch(answers = {}) {
  const scenes = normalizeMultiAnswer(answers[QUESTION_IDS.SCENES] || answers.scenes)
  const goals = normalizeMultiAnswer(answers[QUESTION_IDS.GOALS] || answers.goals)
  return scenes.includes(OPTION_IDS.STRENGTH_SCENE) ||
    scenes.includes(OPTION_IDS.ENDURANCE_SCENE) ||
    goals.includes(OPTION_IDS.STRENGTH_GOAL) ||
    goals.includes(OPTION_IDS.ENDURANCE_GOAL)
}

function shouldShowSleepDetail(answers = {}) {
  const goals = normalizeMultiAnswer(answers[QUESTION_IDS.GOALS] || answers.goals)
  return ['sleep', 'stress', 'fatigue', 'brain'].some((id) => goals.includes(id))
}

function buildQuestionPlan(mode = 'quick', answers = {}) {
  const normalizedMode = MODES[mode] ? mode : 'quick'
  let baseIds = normalizedMode === 'detailed'
    ? [
        QUESTION_IDS.AUDIENCE,
        QUESTION_IDS.SAFETY,
        QUESTION_IDS.PROFILE,
        QUESTION_IDS.SCENES,
        QUESTION_IDS.DAILY_LOAD,
        QUESTION_IDS.GOALS,
        QUESTION_IDS.IMPACT,
        QUESTION_IDS.DIET_PATTERN,
        QUESTION_IDS.FOOD_FREQUENCY,
        QUESTION_IDS.DAILY_PORTIONS,
        QUESTION_IDS.FOOD_SOURCES,
        QUESTION_IDS.NUTRITION_CONTEXT,
        QUESTION_IDS.EXISTING_SOURCES,
        QUESTION_IDS.TRAINING_DETAIL
      ]
    : [
        QUESTION_IDS.AUDIENCE,
        QUESTION_IDS.SAFETY,
        QUESTION_IDS.SCENES,
        QUESTION_IDS.GOALS,
        QUESTION_IDS.FOOD_QUICK
      ]

  if (normalizedMode === 'detailed' && shouldShowSleepDetail(answers)) {
    const impactIndex = baseIds.indexOf(QUESTION_IDS.IMPACT)
    baseIds = baseIds.slice()
    baseIds.splice(impactIndex, 0, QUESTION_IDS.SLEEP_DETAIL)
  }

  const disposition = getSafetyDisposition(answers)
  if (normalizedMode === 'detailed' && disposition.status === 'professional') {
    // Never end the interview because of age, routine medication or nonurgent illness.
    baseIds.splice(baseIds.indexOf(QUESTION_IDS.TRAINING_DETAIL), 0, QUESTION_IDS.HEALTH_DETAIL)
  }
  let visibleIds = baseIds
  if (disposition.status === 'stop') {
    visibleIds = baseIds.filter((id) => id === QUESTION_IDS.AUDIENCE || id === QUESTION_IDS.SAFETY)
  }

  return visibleIds.map((id) => QUESTIONS[id])
}

function isLowFrequency(foodFrequency, rowId) {
  return LOW_FREQUENCIES.has(foodFrequency[rowId])
}

function createFoodAssessment(mode, answers, diet) {
  const quick = new Set(normalizeMultiAnswer(answers[QUESTION_IDS.FOOD_QUICK] || answers.food_quick))
  const matrix = answers[QUESTION_IDS.FOOD_FREQUENCY] && typeof answers[QUESTION_IDS.FOOD_FREQUENCY] === 'object'
    ? answers[QUESTION_IDS.FOOD_FREQUENCY]
    : {}
  const detailed = mode === 'detailed'

  function low(rowId, quickId) {
    return detailed ? isLowFrequency(matrix, rowId) : quick.has(quickId)
  }

  const vegan = diet.has(OPTION_IDS.VEGAN) || quick.has('no_reliable_b12')
  return {
    dairy: low('dairy_calcium', 'low_dairy_calcium') || diet.has('low_dairy'),
    calciumSoy: low('calcium_soy', 'low_calcium_soy'),
    eggs: vegan || low('eggs', 'low_eggs'),
    meatPoultry: vegan || low('meat_poultry', 'low_meat_poultry'),
    fattyFish: vegan || low('fatty_fish', 'low_fatty_fish') || diet.has('low_fish'),
    seafood: vegan || low('seafood', 'low_seafood') || diet.has('low_fish'),
    darkGreens: low('dark_greens', 'low_dark_greens'),
    orangeProduce: low('orange_produce', 'low_orange_produce'),
    fruitVeg: low('fruit_veg', 'low_fruit_veg'),
    wholeGrains: low('whole_grains', 'low_whole_grains'),
    nutsSeeds: low('nuts_seeds', 'low_nuts_seeds'),
    vegan,
    noReliableB12: vegan && !diet.has(OPTION_IDS.RELIABLE_B12) &&
      (detailed || quick.has('no_reliable_b12')),
    iodineUncertain: diet.has('non_iodized_or_unknown_salt') || quick.has('non_iodized_or_unknown_salt'),
    prolongedSweat: quick.has('sweat_over_2h_limited_meals')
  }
}

function buildSceneProfile(answers = {}) {
  const scenes = normalizeMultiAnswer(answers[QUESTION_IDS.SCENES] || answers.scenes)
  const loads = normalizeMultiAnswer(answers[QUESTION_IDS.DAILY_LOAD] || answers.daily_load)
  const sceneLabels = (QUESTIONS[QUESTION_IDS.SCENES].options || []).reduce((result, item) => {
    result[item.id] = item.label
    return result
  }, {})
  const loadLabels = (QUESTIONS[QUESTION_IDS.DAILY_LOAD].options || []).reduce((result, item) => {
    result[item.id] = item.label
    return result
  }, {})
  const profile = []

  scenes.filter((id) => id !== OPTION_IDS.NONE).forEach((id) => {
    profile.push({ id: `scene_${id}`, title: sceneLabels[id] || id, type: 'scene' })
  })
  loads.filter((id) => id !== OPTION_IDS.NONE).forEach((id) => {
    profile.push({ id: `load_${id}`, title: loadLabels[id] || id, type: 'load' })
  })

  const training = answers[QUESTION_IDS.TRAINING_DETAIL] || answers.training_detail
  if (training && TRAINING_FREQUENCIES.has(training.frequency)) {
    const frequencyLabels = { one_two: '每周训练 1–2 次', three_four: '每周训练 3–4 次', five_plus: '每周训练 5 次及以上' }
    profile.push({ id: 'training_frequency', title: frequencyLabels[training.frequency], type: 'training' })
  }

  const sleepDetails = normalizeMultiAnswer(answers[QUESTION_IDS.SLEEP_DETAIL] || answers.sleep_detail)
  const sleepLabels = {
    sleep_hard_to_start: '睡眠：入睡耗时长',
    sleep_waking: '睡眠：夜里容易醒',
    sleep_early_waking: '睡眠：常提前醒',
    sleep_short_opportunity: '睡眠：时间常被挤占',
    sleep_nonrestorative: '睡眠：醒来仍不解乏',
    sleep_schedule_shift: '睡眠：作息经常变化'
  }
  sleepDetails.filter((id) => sleepLabels[id]).slice(0, 2).forEach((id) => {
    profile.push({ id: `sleep_${id}`, title: sleepLabels[id], type: 'sleep' })
  })
  return profile
}

function card(id, title, data = {}) {
  return Object.assign({
    id,
    title,
    kind: 'nutrition-category',
    priority: 3,
    evidence: '来源评估',
    why: '',
    foodFirst: '',
    boundary: '本卡只做一般营养教育，不代表缺乏诊断、个人剂量或商品推荐。',
    matchedGoals: []
  }, data)
}

function addUnique(collection, value) {
  const existing = collection.find((item) => item.id === value.id)
  if (!existing) {
    collection.push(value)
    return value
  }
  existing.matchedGoals = Array.from(new Set([...(existing.matchedGoals || []), ...(value.matchedGoals || [])]))
  return existing
}

function buildQuestionnaireResult(mode = 'quick', answers = {}) {
  const normalizedMode = MODES[mode] ? mode : 'quick'
  const modeDefinition = getModeDefinition(normalizedMode)
  const safety = Object.assign({}, getSafetyDisposition(answers))
  const impact = answers[QUESTION_IDS.IMPACT] || answers.impact || ''
  const persistentImpact = impact === 'persistent_impairing'
  if (safety.status === 'continue' && persistentImpact) {
    safety.title = '这些困扰已明显影响生活，建议先进一步评估'
    safety.message = '症状型内容只保留为知识说明，不作为补剂方向。请优先和医生或合适的专业人员评估持续原因。'
    safety.needsFurtherAssessment = true
  }
  const selectedGoals = normalizeMultiAnswer(answers[QUESTION_IDS.GOALS] || answers.goals)
    .filter((id) => id !== OPTION_IDS.NONE)
  const comprehensiveMode = selectedGoals.includes(OPTION_IDS.COMPREHENSIVE_GOAL) || selectedGoals.length >= 4
  const baseResult = {
    mode: normalizedMode,
    modeDefinition,
    safety,
    sceneProfile: buildSceneProfile(answers),
    foodFoundations: [],
    topActions: [],
    allMatches: [],
    researchCards: [],
    notRecommended: [],
    targetCoverage: [],
    comprehensiveMode,
    disclaimer: '问卷只做一般营养与食物来源教育，不诊断、不治疗，也不提供个人剂量或具体商品。'
  }

  if (safety.status === 'stop') {
    baseResult.sceneProfile = []
    return baseResult
  }

  if (normalizedMode === 'detailed') baseResult.intakeAssessment = assessIntake(answers, safety)

  if (safety.status === 'professional') {
    baseResult.foodFoundations.push({
      id: 'general_food_education',
      title: '先保持规律、均衡和多样的饮食',
      detail: '当前身份或健康情况需要专门评估；本结果不会生成普通成人补剂候选。',
      kind: 'food-education'
    })
    return baseResult
  }

  const blockedTargets = new Set(safety.blockedTargets || [])
  const activeGoals = new Set(selectedGoals.filter((id) => !blockedTargets.has(id)))
  const scenes = new Set(normalizeMultiAnswer(answers[QUESTION_IDS.SCENES] || answers.scenes))
  const loads = new Set(normalizeMultiAnswer(answers[QUESTION_IDS.DAILY_LOAD] || answers.daily_load))
  const diet = new Set(normalizeMultiAnswer(answers[QUESTION_IDS.DIET_PATTERN] || answers.diet_pattern))
  const food = createFoodAssessment(normalizedMode, answers, diet)
  const training = answers[QUESTION_IDS.TRAINING_DETAIL] || answers.training_detail || {}
  const trainingTypes = new Set(normalizeMultiAnswer(training.types, null))
  const explicitStrength = normalizedMode === 'quick'
    ? scenes.has(OPTION_IDS.STRENGTH_SCENE)
    : TRAINING_FREQUENCIES.has(training.frequency) && (trainingTypes.has('strength') || trainingTypes.has('hiit'))
  const explicitEndurance = normalizedMode === 'quick'
    ? scenes.has(OPTION_IDS.ENDURANCE_SCENE)
    : TRAINING_FREQUENCIES.has(training.frequency) &&
      (trainingTypes.has('endurance_over_60') || trainingTypes.has('competition_or_twice_daily'))
  const prolongedSweat = food.prolongedSweat || loads.has('sweat_over_2h_limited_meals')
  const magnesiumFoodSourcesLow = [food.calciumSoy, food.wholeGrains, food.nutsSeeds, food.darkGreens]
    .filter(Boolean).length >= 3
  const vitaminAAnimalSourcesLow = diet.has(OPTION_IDS.VEGAN) || (food.dairy && food.eggs && food.meatPoultry)

  function foundation(id, title, detail, relatedGoals = []) {
    addUnique(baseResult.foodFoundations, { id, title, detail, kind: 'food-foundation', relatedGoals })
  }

  function match(id, title, data) {
    return addUnique(baseResult.allMatches, card(id, title, data))
  }

  function research(id, title, data) {
    return addUnique(baseResult.researchCards, card(id, title, Object.assign({ kind: 'research', priority: 4 }, data)))
  }

  function decline(id, title, reason, matchedGoals = []) {
    return addUnique(baseResult.notRecommended, {
      id,
      title,
      reason,
      status: 'not_automatic',
      matchedGoals
    })
  }

  if (food.fattyFish) {
    foundation('fatty_fish_foundation', '把富脂鱼安排进每周饮食', '先看能否用富脂鱼覆盖；长期不吃鱼时，再了解标明 EPA+DHA 含量的藻油或鱼油来源。', ['diet_coverage', 'cardiometabolic', 'brain'])
    match('epa_dha_sources', '优先把富脂鱼安排进每周饮食', {
      priority: 2,
      evidence: '食物来源条件型',
      why: '富脂鱼来源很少，或饮食明确排除鱼类。',
      foodFirst: '优先考虑三文鱼、沙丁鱼、鲭鱼等富脂鱼；纯素者可了解藻油来源。',
      boundary: '不把鱼油总重当作 EPA+DHA，也不承诺护心或护脑；用药或疾病管理需专业确认。',
      matchedGoals: ['diet_coverage'].filter((id) => activeGoals.has(id))
    })
  }

  if (food.dairy && food.calciumSoy) {
    foundation('calcium_food_foundation', '把稳定的钙来源加进每天饮食', '奶/强化钙饮品和豆腐/大豆制品都较少，先规划可持续的钙食物来源。', ['bone', 'diet_coverage'])
    match('calcium_sources', '把稳定的钙来源加进每天饮食', {
      priority: 2,
      evidence: '食物来源条件型',
      why: '两类主要钙来源同时偏少。',
      foodFirst: '奶、酸奶、明确强化钙的植物饮品和合适的豆制品优先。',
      boundary: '这不代表已缺钙；是否需要补充量还取决于总饮食、年龄和专业资料。',
      matchedGoals: ['bone', 'diet_coverage'].filter((id) => activeGoals.has(id))
    })
  }

  if (food.vegan) {
    foundation('vegan_iron_zinc_foods', '纯素饮食分别检查铁与锌食物来源', '豆类、豆制品、全谷和坚果种子需要单独看；疲劳或脱发不能代替化验。', ['diet_coverage'])
    decline('vegan_iron_zinc_supplements', '纯素饮食：先逐项核对铁和锌的来源', '纯素身份只触发来源评估；铁剂需要结合风险、症状和专业检查，锌也要考虑总量与铜平衡。', ['diet_coverage', 'fatigue', 'hair'].filter((id) => activeGoals.has(id)))

    if (food.noReliableB12) {
      foundation('b12_reliable_foundation', '核对你的可靠维生素 B12 来源', '纯素饮食不能依赖海藻或普通发酵食品作为可靠 B12 来源。', ['diet_coverage'])
      match('b12_reliable_source', '核对你的可靠维生素 B12 来源', {
        priority: 1,
        evidence: '明确饮食排除',
        why: '纯素且没有按标签规律使用可靠的 B12 强化食品或补充来源。',
        foodFirst: '查看强化食品标签是否明确标注 B12 含量和使用频率。',
        boundary: '本问卷不计算个人剂量；如已有神经症状、贫血或异常化验，应专业评估。',
        matchedGoals: ['diet_coverage'].filter((id) => activeGoals.has(id))
      })
    }

    if (food.iodineUncertain) {
      foundation('iodine_food_foundation', '核对家用盐与碘来源', '纯素且加碘盐使用不明确时，先核对盐标签和实际用量，不把海藻当作稳定剂量来源。', ['diet_coverage'])
      match('iodine_source_review', '核对家用盐与碘来源', {
        priority: 2,
        evidence: '来源评估',
        why: '纯素饮食叠加加碘盐来源不明确。',
        foodFirst: '查看家用盐是否加碘；海藻碘含量波动很大。',
        boundary: '不自动推荐碘片；甲状腺问题、孕哺或用药时需专业确认。',
        matchedGoals: ['diet_coverage'].filter((id) => activeGoals.has(id))
      })
    }
  }

  if (food.darkGreens && food.orangeProduce && vitaminAAnimalSourcesLow) {
    foundation('vitamin_a_food_foundation', '把深绿叶菜和橙黄色蔬果加进一周', '深绿叶菜、橙黄色蔬果和动物性来源同时较少，先增加多样食物来源。', ['diet_coverage', 'skin', 'eyes'])
    match('vitamin_a_source_review', '先补齐维生素 A 相关食物来源', {
      priority: 3,
      evidence: '食物来源评估',
      why: '植物前体和动物性食物来源同时偏少。',
      foodFirst: '优先增加深绿叶菜、橙黄色蔬果及适合自身饮食方式的食物来源。',
      boundary: '不因皮肤或用眼自动推荐维 A 补充剂；备孕孕期、维 A 酸类药物及鱼肝油叠加尤其需谨慎。',
      matchedGoals: ['diet_coverage', 'skin', 'eyes'].filter((id) => activeGoals.has(id))
    })
  }

  if (explicitStrength) {
    foundation('training_protein_foundation', '让训练日的正餐蛋白更稳定', '把蛋白分布到正餐；粉剂只是食物难以覆盖时的便利形式。', ['strength'])
    match('training_protein', '先让训练日的正餐蛋白更稳定', {
      priority: 1,
      evidence: '明确训练场景',
      why: '已确认规律力量或短时高强度训练。',
      foodFirst: '先用正餐中的蛋、奶、肉、鱼、豆类和豆制品规划全天蛋白。',
      boundary: '不从“疲劳”推出蛋白粉，也不在缺少体重、总能量和份量时计算克数。',
      matchedGoals: ['strength'].filter((id) => activeGoals.has(id))
    })
    match('creatine_monohydrate', '可以进一步了解肌酸一水合物', {
      priority: 1,
      evidence: '运动证据较充分',
      why: '规律力量、增肌或短时高强度训练条件明确。',
      foodFirst: '它不是饮食底盘的替代品，先确保训练、能量和蛋白安排。',
      boundary: '这里只显示运动类别，不给个人剂量；不会因为脑雾单独推荐肌酸。',
      matchedGoals: ['strength'].filter((id) => activeGoals.has(id))
    })
  }

  if (explicitEndurance) {
    foundation('endurance_fueling_foundation', '先完善长时训练的进食与补液', '运动饮料和电解质不是日常短练的默认选择。', ['endurance'])
    match('endurance_fueling', '先完善长时训练的进食与补液', {
      priority: 2,
      evidence: '明确训练场景',
      why: '已确认长时耐力、备赛或一天多练。',
      foodFirst: '先规划训练前后正餐、碳水和液体。',
      boundary: '本问卷未收集体重与汗率，不计算个体化补液或碳水量。',
      matchedGoals: ['endurance'].filter((id) => activeGoals.has(id))
    })
  }

  if (prolongedSweat) {
    foundation('hydration_foundation', '长时大量出汗时，先保证水和正常进餐', '只有连续明显出汗数小时且正常进餐受限时，才打开电解质类别。', ['endurance'])
    match('hydration_electrolytes', '长时出汗时再考虑电解质', {
      priority: 2,
      evidence: '场景条件型',
      why: '明确存在连续出汗超过 2 小时且不便正常进餐的条件。',
      foodFirst: '普通短时活动通常先用水和正常正餐恢复。',
      boundary: '不默认推荐盐片；疾病、用药或极端环境应由专业人员制定方案。',
      matchedGoals: ['endurance'].filter((id) => activeGoals.has(id))
    })
  }

  if (activeGoals.has('gut') && (food.fruitVeg || food.wholeGrains || food.calciumSoy)) {
    foundation('fiber_food_foundation', '把纤维食物慢慢加回日常饮食', '逐步增加蔬果、全谷、豆类并配合饮水，比泛推益生菌更适合作为第一步。', ['gut'])
    match('fiber_food_sources', '先把纤维食物慢慢加回日常饮食', {
      priority: 2,
      evidence: '食物来源条件型',
      why: '排便/消化目标叠加多类纤维食物来源偏少。',
      foodFirst: '蔬果、全谷、豆类、坚果种子优先，并循序增加。',
      boundary: '便血、消瘦、持续呕吐或明显腹痛应先就医；本卡不泛推益生菌。',
      matchedGoals: ['gut']
    })
  }

  if ((activeGoals.has('sleep') || activeGoals.has('stress')) && magnesiumFoodSourcesLow) {
    research('magnesium_glycinate_sleep_stress', '关于甘氨酸镁：先看清它能做什么、不能做什么', {
      evidence: '有限证据，不自动推荐',
      why: '睡眠或压力目标叠加多类镁食物来源偏少，因此开放研究卡，而非判断缺镁。',
      foodFirst: '豆类、全谷、坚果种子和深绿叶菜仍是优先来源。',
      boundary: '不能写成治疗失眠或焦虑，也不能把盐总重当元素镁；用药或肾脏问题需专业确认。',
      matchedGoals: ['sleep', 'stress'].filter((id) => activeGoals.has(id))
    })
  } else if (activeGoals.has('sleep') || activeGoals.has('stress')) {
    decline('magnesium_symptom_only', '睡不好或压力大，不等于需要先补镁', '症状本身不能推出镁缺乏；当前食物来源筛查也没有形成明确的镁来源缺口。', ['sleep', 'stress'].filter((id) => activeGoals.has(id)))
  }

  if (activeGoals.has('brain')) {
    foundation('brain_fog_foundations', '脑雾先排查基础原因', '先看睡眠机会、晚间咖啡因、进餐稳定性、压力与持续影响；症状不能直接换成补剂。', ['brain'])
    research('brain_fog_magnesium_threonate_creatine', '关于苏糖酸镁和肌酸：先了解证据边界', {
      evidence: '研究进展，证据不足',
      why: '用户主动选择脑雾/认知目标，因此开放机制和研究边界说明。',
      foodFirst: '先处理睡眠、规律进餐、训练恢复等更基础的可改变因素。',
      boundary: '苏糖酸镁和肌酸都不会仅因脑雾进入自动推荐，也不设置所谓“脑雾剂量”。',
      matchedGoals: ['brain']
    })
  }

  if (activeGoals.has('skin')) {
    research('collagen_peptides_skin', '关于胶原肽：它更适合被当作可选项', {
      evidence: '低优先级、效果不确定',
      why: '健康成人主动选择皮肤水合或弹性目标。',
      foodFirst: '总蛋白、均衡饮食、防晒和基础皮肤护理优先。',
      boundary: '不能替代皮肤病处理，也不因脱发或脆甲自动推荐。',
      matchedGoals: ['skin']
    })
  }

  if (activeGoals.has('eyes')) {
    research('lutein_screen_education', '关于叶黄素：屏幕用眼不等于必须补', {
      evidence: '一般屏幕场景证据有限',
      why: '用户主动了解屏幕与眼睛营养，因此只开放证据说明。',
      foodFirst: '规律休息、合适照明、验光与深绿叶菜等食物来源优先。',
      boundary: '儿童用眼、近视或高屏幕时长不构成自动补充理由；AREDS2 只属于特定眼科路径。',
      matchedGoals: ['eyes']
    })
    decline('lutein_not_automatic', '屏幕用眼，先别急着买叶黄素', '一般屏幕疲劳或儿童用眼没有足够依据自动生成叶黄素补充方案。', ['eyes'])
  }

  if (activeGoals.has('bone') && loads.has('indoor_days')) {
    research('vitamin_d_status_review', '维生素 D：来源、季节与必要时检测', {
      evidence: '需要进一步评估',
      why: '骨骼目标叠加白天大多在室内，因此值得了解来源与状态评估。',
      foodFirst: '先看饮食来源、户外条件和实际生活环境。',
      boundary: '问卷不能判断血液状态，也不会把维生素 D 作为人人都要补的默认答案。',
      matchedGoals: ['bone']
    })
  }

  if (activeGoals.has('fatigue')) {
    decline('fatigue_iron_b_complex', '疲劳时，先别急着买铁或维 B', '疲劳原因很多，不能用症状判断缺铁或缺 B 族；持续或明显影响功能时应进一步评估。', ['fatigue'])
  }
  if (activeGoals.has('hair')) {
    decline('hair_biotin_iron', '脱发或脆甲，先别自行补生物素或铁', '脱发和脆甲不能证明缺乏；生物素还会干扰肌钙蛋白、甲功等化验。', ['hair'])
  }
  if (activeGoals.has('joint')) {
    decline('joint_stack', '关节不适，先别把氨糖或关节胶原当答案', '关节响、运动酸痛与急伤不是自动补充依据；红肿热痛或不能负重需先就医。', ['joint'])
  }
  if (activeGoals.has('gut') && !baseResult.allMatches.some((item) => item.matchedGoals.includes('gut'))) {
    decline('generic_probiotic', '肠道问题，先不泛推益生菌', '益生菌需要匹配具体菌株和结局；仅凭“肠道健康”不足以推荐。', ['gut'])
  }
  if (activeGoals.has('cardiometabolic')) {
    decline('cardiometabolic_products', '血脂或血糖相关问题，不在这里配产品', '血脂、血糖、体重和心血管问题属于疾病风险管理，问卷只做一般教育。', ['cardiometabolic'])
  }
  if (activeGoals.has('immunity')) {
    decline('immune_megadoses', '“增强免疫”不是直接买大剂量维矿的理由', '感冒或免疫目标不能直接推出高剂量维 C、锌、维 D 或草本产品。', ['immunity'])
  }
  if (activeGoals.has('life_stage')) {
    decline('life_stage_adult_path', '生命阶段营养，要走专门路径', '儿童、孕哺和老年不能套用普通成人功能补剂与剂量逻辑。', ['life_stage'])
  }
  if (activeGoals.has('strength') && !explicitStrength) {
    decline('strength_without_training', '想增肌前，先把训练条件说清楚', '还没有确认规律力量/高强度训练条件，目标本身不足以生成运动补剂。', ['strength'])
  }
  if (activeGoals.has('endurance') && !explicitEndurance && !prolongedSweat) {
    decline('electrolytes_without_condition', '普通短时活动，先不需要电解质', '未确认长时耐力训练或连续大量出汗且进餐受限；普通短时活动通常先用水和正餐。', ['endurance'])
  }
  if (activeGoals.has('bone') && !baseResult.allMatches.some((item) => item.matchedGoals.includes('bone')) &&
      !baseResult.researchCards.some((item) => item.matchedGoals.includes('bone'))) {
    decline('bone_goal_without_source_gap', '关心骨骼，也先不急着补钙或维生素 D', '需要先看食物来源、生命阶段、环境和必要时的专业资料。', ['bone'])
  }
  if (activeGoals.has('diet_coverage') && !baseResult.allMatches.some((item) => item.matchedGoals.includes('diet_coverage'))) {
    decline('diet_no_blanket_stack', '全面盘点，不等于先买“一整套”', '当前回答没有形成足够明确的单项来源缺口；限制饮食也必须逐项评估，而不是自动全补。', ['diet_coverage'])
  }

  if (persistentImpact) {
    const symptomGoals = ['sleep', 'stress', 'fatigue', 'brain', 'gut', 'skin', 'hair', 'eyes', 'joint']
      .filter((goalId) => activeGoals.has(goalId))
    baseResult.researchCards.forEach((item) => {
      if (!(item.matchedGoals || []).some((goalId) => symptomGoals.includes(goalId))) return
      item.evidence = '仅作知识说明'
      item.boundary = `这些困扰已明显影响生活，应先评估持续原因。${item.boundary || ''}`
    })
    if (symptomGoals.length) {
      decline(
        'persistent_impact_assessment',
        '先评估持续且影响功能的困扰',
        '问卷不能判断病因；在原因未明确前，不把症状型研究成分当作补充方向。',
        symptomGoals
      )
    }
  }

  blockedTargets.forEach((goalId) => {
    if (!selectedGoals.includes(goalId)) return
    decline(`blocked_${goalId}`, `${GOAL_LABELS[goalId] || goalId}：先暂停补剂匹配`, '相关红旗信号需要尽快由专业人员评估；该目标不会显示补剂或研究候选。', [goalId])
  })

  baseResult.allMatches.sort((a, b) => a.priority - b.priority)
  baseResult.topActions = baseResult.allMatches.slice(0, 3)

  selectedGoals.forEach((goalId) => {
    const matchedRefs = []
    baseResult.allMatches.forEach((item) => {
      if ((item.matchedGoals || []).includes(goalId)) matchedRefs.push(item.id)
    })
    baseResult.researchCards.forEach((item) => {
      if ((item.matchedGoals || []).includes(goalId)) matchedRefs.push(item.id)
    })
    const declinedRefs = baseResult.notRecommended
      .filter((item) => (item.matchedGoals || []).includes(goalId))
      .map((item) => item.id)
    let status = 'not_recommended'
    if (blockedTargets.has(goalId)) status = 'blocked'
    else if (matchedRefs.length > 0) status = 'matched'
    else if (goalId === OPTION_IDS.COMPREHENSIVE_GOAL && baseResult.allMatches.length > 0) status = 'matched'

    baseResult.targetCoverage.push({
      goalId,
      goalLabel: GOAL_LABELS[goalId] || goalId,
      status,
      referenceIds: status === 'matched' && goalId === OPTION_IDS.COMPREHENSIVE_GOAL && matchedRefs.length === 0
        ? baseResult.allMatches.map((item) => item.id)
        : Array.from(new Set([...matchedRefs, ...declinedRefs]))
    })
  })

  if (activeGoals.has(OPTION_IDS.COMPREHENSIVE_GOAL) && baseResult.allMatches.length === 0) {
    decline('comprehensive_no_blanket_stack', '这次先把饮食底盘理清，不用补剂凑“全面”', '没有明确来源缺口或训练条件时，不用复合维生素或功能成分凑“全面”。', [OPTION_IDS.COMPREHENSIVE_GOAL])
    const coverage = baseResult.targetCoverage.find((item) => item.goalId === OPTION_IDS.COMPREHENSIVE_GOAL)
    if (coverage) coverage.referenceIds.push('comprehensive_no_blanket_stack')
  }

  return baseResult
}

module.exports = {
  normalizeMultiAnswer,
  validateStep,
  getSafetyDisposition,
  buildQuestionPlan,
  buildQuestionnaireResult
}
