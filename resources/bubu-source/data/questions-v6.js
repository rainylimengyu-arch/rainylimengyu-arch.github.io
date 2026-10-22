'use strict'

const previous = require('./questions-v5')
const options = pairs => pairs.map(([id,label])=>({id,label}))
const field = (id,title,pairs,type='single') => ({id,title,type,required:true,options:options(pairs),exclusiveIds:['none','unknown']})
const fields = (id,title,items,why) => ({id,title,type:'fields',required:true,section:'让建议更适合你',fields:items,why})
const QUESTIONS = {...previous.QUESTIONS}
QUESTIONS.safety={...QUESTIONS.safety,options:QUESTIONS.safety.options.map(o=>o.id==='medication'?{...o,label:'正在用药，包括偶尔吃的止痛药、助眠药等'}:o)}
QUESTIONS.goals = {...QUESTIONS.goals, options:[
  ...QUESTIONS.goals.options.filter(o=>o.id!=='none'),
  {id:'joint',label:'关节舒适与活动'}, {id:'healthy_aging',label:'长期健康与年龄变化'},
  {id:'none',label:'暂时没有特别关注的'}
]}
QUESTIONS.goal_context = fields('goal_context','再确认一下你想改善的状态',[
  field('energy','白天没精神更接近哪种？',[
    ['occasional','偶尔疲倦，休息后能恢复'],['sleep_debt','主要是熬夜或睡眠时间不够'],
    ['persistent','连续数周，或越来越影响工作生活'],['none','没有明显疲倦'],['unknown','说不清']]),
  field('stress','压力对你的影响',[['mild','偶尔紧绷，但基本不影响生活'],['persistent','持续焦虑、惊恐或明显影响日常'],['none','没有明显压力'],['unknown','说不清']]),
  field('joint','关节或运动后的不适',[['exercise','主要是训练后的肌肉酸痛，几天内缓解'],['knee_diagnosed','医生已确认膝骨关节炎'],['unexplained','持续关节痛，还没确认原因'],['alarm','红肿、发热、受伤或难以负重'],['prevention','没有不适，想提前保养'],['unknown','说不清']]),
  field('sleep_timing','是否存在明确的作息时差？',[['jetlag','近期跨越多个时区，有时差'],['late_clock','有时间睡，但长期要很晚才睡得着'],['shift','轮班导致睡眠时间变化'],['none','没有以上情况']]),
  field('gut_safety','排便方面还有这些情况吗？',[['none','没有以下情况'],['swallowing','吞咽困难，或曾有肠梗阻'],['new_change','近来持续变化，或需要经常使用通便药'],['unknown','不确定']])
], '同一个目标可能有不同原因。只有和你实际情况相符的成分才会进入建议。')
QUESTIONS.supplement_scope = fields('supplement_scope','希望方案包含哪些选择？',[
  field('functional','除了基础营养，你希望',[['yes','也了解睡眠、训练等目标型补充剂'],['no','只看基础营养与饮食'],['unknown','先给我基础建议']]),
  field('botanicals','姜黄、人参等植物提取物',[['yes','可以了解适合我的植物成分'],['no','暂时不考虑植物提取物'],['unknown','还没想好']])
], '植物提取物与维生素不是一回事，会单独核对适用场景和注意事项；不默认越多越好。')
QUESTIONS.botanical_safety = {
  id:'botanical_safety',title:'植物成分使用前，再核对几个细节',type:'multi',required:true,section:'植物成分',
  helper:'可多选，包括偶尔使用的非处方药。',noneOptionId:'none',exclusiveIds:['none','unknown'],
  why:'这些情况可能影响姜黄、人参等提取物的适用性。做饭用的香料与浓缩提取物不能等同。',
  options:options([
    ['medicines','任何处方或非处方药，包括偶尔吃的止痛药、安眠药'],
    ['liver_gallbladder','肝病、肝功能异常、胆结石或胆道问题'],
    ['glucose','血糖异常、糖尿病或低血糖发作'],['autoimmune','自身免疫疾病或免疫抑制治疗'],
    ['bleeding','容易出血、凝血问题或近期计划手术'],['reaction','植物成分过敏或曾有不良反应'],
    ['none','以上都没有'],['unknown','有些情况不确定']])
}
QUESTIONS.existing_sources={...QUESTIONS.existing_sources,options:[...QUESTIONS.existing_sources.options,
  ...options([['ginseng','人参 / 西洋参 / 红参'],['turmeric','姜黄 / 姜黄素'],['theanine','茶氨酸'],['melatonin','褪黑素'],['collagen','胶原蛋白'],['psyllium','车前子壳等纤维补充剂']])
]}
const MODE={id:'detailed',title:'个人补充方案',timeLabel:'约 12–18 分钟',estimatedMinutes:[12,18]}
module.exports={QUESTIONS,MODES:{detailed:MODE},QUESTION_IDS:previous.QUESTION_IDS,OPTION_IDS:previous.OPTION_IDS,getModeDefinition:()=>MODE}
