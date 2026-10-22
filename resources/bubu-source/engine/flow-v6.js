'use strict'

const previous=require('./flow-v5')
const {QUESTIONS,MODES}=require('../data/questions-v6')
const {buildRecommendationReport}=require('./recommendations-v6')
const list=v=>Array.isArray(v)?v:[]
function buildQuestionPlan(_mode,answers={}) {
  const goals=list(answers.goals)
  let plan=previous.buildQuestionPlan('detailed',answers).map(q=>{
    if(q.id==='goal_priority') return {...q,options:[...QUESTIONS.goals.options.filter(o=>goals.includes(o.id)&&o.id!=='none'),{id:'equal',label:'都一样重要'}]}
    return ['goals','existing_sources','safety'].includes(q.id)?QUESTIONS[q.id]:q
  })
  if(previous.getSafetyDisposition(answers).status==='stop'||answers.audience==='minor_under_18')return plan
  const selectedFields=QUESTIONS.goal_context.fields.filter(f=>
    f.id==='energy'?goals.some(id=>['fatigue','brain'].includes(id)):
    f.id==='joint'?goals.some(id=>['joint','endurance','strength'].includes(id)):
    f.id==='sleep_timing'?goals.includes('sleep'):
    f.id==='gut_safety'?goals.includes('gut'):goals.includes(f.id))
  if(selectedFields.length)plan.splice(plan.findIndex(q=>q.id==='diet_style'),0,{...QUESTIONS.goal_context,fields:selectedFields})
  const at=plan.findIndex(q=>q.id==='existing_sources')
  const extras=[QUESTIONS.supplement_scope]
  if((answers.supplement_scope||{}).botanicals==='yes')extras.push(QUESTIONS.botanical_safety)
  plan.splice(at,0,...extras)
  return plan
}
function validateStep(question,answer,answers={}){
  return previous.validateStep(typeof question==='string'?QUESTIONS[question]:question,answer,answers)
}
function buildQuestionnaireResult(_mode,answers={}){
  const safety=previous.getSafetyDisposition(answers)
  if(safety.status==='stop')return {mode:'detailed',safety,report:null}
  const incomplete=buildQuestionPlan('detailed',answers).filter(q=>!validateStep(q,answers[q.id],answers).valid)
  if(incomplete.length)return {mode:'detailed',safety,report:null,incomplete:incomplete.map(q=>q.id)}
  return {mode:'detailed',modeDefinition:MODES.detailed,safety,report:buildRecommendationReport(answers)}
}
module.exports={...previous,buildQuestionPlan,validateStep,buildQuestionnaireResult}
