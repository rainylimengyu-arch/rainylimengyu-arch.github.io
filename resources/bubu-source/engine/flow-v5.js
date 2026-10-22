'use strict'

const { QUESTIONS, MODES } = require('../data/questions-v5')
const legacy = require('./matcher')
const { buildPlanReport } = require('./recommendations-v5')
const list = value => Array.isArray(value) ? value : []
const has = (a, id) => list(a).includes(id)
const normalizeMultiAnswer = legacy.normalizeMultiAnswer

function getSafetyDisposition(answers = {}) {
  const selected = list(answers.safety)
  const urgent = selected.filter(id => id.startsWith('urgent_'))
  if (has(answers.goals,'eyes') && (answers.goal_detail || {}).eyes === 'acute') urgent.push('urgent_vision')
  return {
    status: urgent.length ? 'stop' : 'continue',
    title: urgent.length ? '请先处理当前的不适' : '继续了解你的饮食',
    message: urgent.length ? '这些情况需要立即联系当地急救或急诊。请不要等待问卷结果，也不要用补充剂自行处理。' : '',
    reasons: urgent, blockedTargets: [], educationOnly: false
  }
}

function buildQuestionPlan(mode = 'quick', answers = {}) {
  const detailed = mode === 'detailed'
  const goals = list(answers.goals)
  const sleep = goals.some(id => ['sleep','stress','fatigue','brain'].includes(id))
  const training = goals.some(id => ['strength','endurance'].includes(id)) || list(answers.scenes).some(id => ['strength_training','endurance_training'].includes(id))
  const health = list(answers.safety).some(id => !['none','unknown','persistent_symptoms'].includes(id))
  const ids = ['audience','profile']
  if (answers.audience === 'minor_under_18') ids.push('child_detail')
  ids.push('safety')
  if (getSafetyDisposition(answers).status === 'stop') return ids.filter(id => ['audience','profile','safety'].includes(id)).map(id=>QUESTIONS[id])
  if (health) ids.push('health_detail')
  if(answers.audience==='minor_under_18') return ids.concat(['goals','exclusions','child_food','existing_sources']).map(id=>{
    const q=QUESTIONS[id]
    return id==='profile'?{...q,fields:q.fields.filter(f=>['age','sex'].includes(f.id))}:q
  })
  ids.push('scenes')
  if (detailed) ids.push('daily_load')
  ids.push('goals')
  if (goals.filter(id=>id!=='none').length > 1) ids.push('goal_priority')
  if (sleep) ids.push('sleep_detail')
  if (detailed && sleep) ids.push('sleep_context','impact')
  if (detailed && goals.some(id=>['skin','hair','eyes','gut'].includes(id))) ids.push('goal_detail')
  ids.push('diet_style','exclusions')
  if (detailed) {
    ids.push('diet_habits','dairy_food')
    if(['dairy','fortified','unfortified','unknown'].includes((answers.dairy_food||{}).kind)) ids.push('calcium_label')
    ids.push('calcium_alternatives','animal_food','plant_food','plant_types')
  }
  else {
    ids.push('quick_food')
    if (['rare','unknown'].includes((answers.quick_food || {}).calcium)) ids.push('calcium_alternatives')
  }
  ids.push('fortified')
  if (detailed) ids.push('cooking')
  ids.push('daylight')
  if (detailed) {
    if ((answers.profile || {}).sex !== 'male') ids.push('menstrual')
    ids.push('labs')
  }
  if ((detailed || training) && answers.audience !== 'minor_under_18') ids.push('training_detail')
  ids.push('existing_sources','preferences')
  return ids.map(id => {
    const q = QUESTIONS[id]
    if (id === 'profile' && !detailed) return {...q, fields:q.fields.filter(f=>['sex','life_stage'].includes(f.id))}
    if (id === 'goal_priority') return {...q,options:[...QUESTIONS.goals.options.filter(o=>goals.includes(o.id) && o.id!=='none'),...q.options]}
    if (id === 'goal_detail') return {...q,fields:q.fields.filter(f=>(f.id==='skin' && goals.some(x=>['skin','hair'].includes(x))) || goals.includes(f.id))}
    return q
  })
}

function validateStep(questionOrId, answer, answers = {}) {
  const q = typeof questionOrId === 'string' ? QUESTIONS[questionOrId] : questionOrId
  if (!q) return {valid:false,message:'请返回上一题后重试。'}
  if (q.type === 'profile') {
    const value = answer || {}
    for (const f of q.fields) {
      const v = value[f.id]
      if (f.type === 'number') {
        if (v === '' || v === undefined || v === null) continue
        if (!Number.isFinite(Number(v)) || Number(v)<f.min || Number(v)>f.max) return {valid:false,message:`请检查${f.title}，也可以留空。`}
        if (f.id==='age' && (!Number.isInteger(Number(v)) || (answers.audience==='adult_18_64' && (v<18 || v>=65)) || (answers.audience==='senior_65_plus' && v<65) || (answers.audience==='minor_under_18' && v>=18))) return {valid:false,message:'年龄与前面选择的年龄段不同，请检查。'}
      } else if (f.required && !f.options.some(o=>o.id===v)) return {valid:false,message:`请完成“${f.title}”，也可以选择不说明。`}
    }
    if(q.id==='calcium_label' && Boolean(value.ml)!==Boolean(value.mg)) return {valid:false,message:'请同时填写饮用量和标签含钙量，或把两项都留空。'}
    return {valid:true,message:''}
  }
  if (q.type === 'training') {
    const base = legacy.validateStep(q, answer, answers)
    if (!base.valid) return base
    const v=answer||{}
    if (!['new','stable','none'].includes(v.stable) || !['no','yes','unknown'].includes(v.sweat)) return {valid:false,message:'请补充训练持续时间和出汗情况。'}
    if (v.frequency!=='zero' && (!list(v.types).every(id=>q.fields.find(f=>f.id==='types').options.some(o=>o.id===id)) || v.duration==='not_applicable' || v.stable==='none' || v.protein_access==='not_applicable')) return {valid:false,message:'你选择了规律训练，请补充对应的时长、持续时间和进餐情况。'}
    return {valid:true,message:''}
  }
  if (q.type === 'multi') {
    const selected=list(answer)
    if(selected.length>1 && selected.some(id=>list(q.exclusiveIds).includes(id))) return {valid:false,message:'“没有”和“不确定”不能与其他选项同时选择。'}
  }
  if(q.id==='child_detail' && (answers.profile||{}).age!==''){
    const age=Number((answers.profile||{}).age)
    const range={infant:[0,1],toddler:[1,4],child:[4,12],teen:[12,18]}[(answer||{}).stage]
    if(Number.isFinite(age)&&range&&(age<range[0]||age>=range[1]))return {valid:false,message:'孩子的年龄和所选年龄段不同，请核对。'}
  }
  return legacy.validateStep(q,answer,answers)
}

function buildQuestionnaireResult(mode='quick', answers={}) {
  const safety=getSafetyDisposition(answers)
  if(safety.status==='stop') return {mode,safety,report:null}
  const incomplete=buildQuestionPlan(mode,answers).filter(q=>!validateStep(q,answers[q.id],answers).valid)
  if(incomplete.length) return {mode,safety,incomplete:incomplete.map(q=>q.id),report:null}
  return {mode,modeDefinition:MODES[mode]||MODES.quick,safety,report:buildPlanReport(mode,answers)}
}
module.exports={normalizeMultiAnswer,validateStep,getSafetyDisposition,buildQuestionPlan,buildQuestionnaireResult}
