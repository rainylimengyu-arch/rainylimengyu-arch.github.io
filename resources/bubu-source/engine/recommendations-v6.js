'use strict'

// Goal-led candidates, not a diagnosis, prescription or product catalogue.
// Food screening stays internal; the report exposes only relevant decisions.
const previous=require('./recommendations-v5')
const list=v=>Array.isArray(v)?v:[]
const SOURCES={
  ginseng:{title:'NCCIH · 人参：用途与安全',url:'https://www.nccih.nih.gov/health/asian-ginseng'},
  turmeric:{title:'NCCIH · 姜黄：用途与安全',url:'https://www.nccih.nih.gov/health/turmeric'},
  turmeric_exercise:{title:'2025 · 姜黄与运动恢复随机试验',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12498372/'},
  magnesium_sleep:{title:'2025 · 甘氨酸镁与睡眠随机试验',url:'https://pubmed.ncbi.nlm.nih.gov/40918053/'},
  theanine:{title:'2019 · 茶氨酸与日常压力随机试验',url:'https://pubmed.ncbi.nlm.nih.gov/31623400/'},
  theanine_anxiety:{title:'2019 · 茶氨酸不替代焦虑治疗',url:'https://pubmed.ncbi.nlm.nih.gov/30580081/'},
  melatonin:{title:'NCCIH · 褪黑素',url:'https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know'},
  multivitamin:{title:'NIH ODS · 复合维生素矿物质',url:'https://ods.od.nih.gov/factsheets/MVMS-HealthProfessional/'},
  psyllium:{title:'MedlinePlus · 车前子壳',url:'https://medlineplus.gov/druginfo/meds/a601104.html'},
  fiber_guideline:{title:'AGA / ACG · 纤维与排便指南',url:'https://gastro.org/press-releases/acg-and-aga-guideline-on-chronic-constipation-management-is-first-to-recommend-supplements-magnesium-oxide-and-senna-as-evidence-based-treatments/'}
}
const getReportSource=id=>SOURCES[id]||previous.getReportSource(id)
const detail=(title,body)=>({title,body})
const GROUPS={
  foundation:{title:'补足日常营养',intro:'把平时不容易吃到的来源补上，先看这一组。'},
  sleep:{title:'睡眠与放松',intro:'按睡眠类型和压力程度筛选；这一组先选择一种，不叠加尝试。'},
  training:{title:'力量与运动恢复',intro:'围绕训练表现、蛋白质便利性和长时出汗安排。'},
  energy:{title:'白天精力',intro:'针对你描述的疲倦类型，选择额外支持。'},
  joint:{title:'活动与恢复',intro:'区分运动后的酸痛与需要检查的关节痛。'},
  gut:{title:'排便与消化',intro:'按排便类型选择，不把所有肠胃问题都交给益生菌。'},
  skin:{title:'皮肤状态',intro:'日常防晒、保湿和正常饮食之外的自选方向。'}
}
function buildRecommendationReport(a={}){
  const base=previous.buildPlanReport('detailed',a)
  const goals=list(a.goals),scope=a.supplement_scope||{},context=a.goal_context||{},profile=a.profile||{}
  const sleep=list(a.sleep_detail),sc=a.sleep_context||{},health=a.health_detail||{},existing=list(a.existing_sources)
  const safety=list(a.safety),conditions=list(health.conditions),meds=list(health.medicines),excluded=list(a.exclusions)
  const adult=a.audience!=='minor_under_18'
  const reproductive=['planning','pregnant','lactating','unknown'].includes(profile.life_stage)
  const specialHealth=safety.some(id=>id!=='none')||conditions.some(id=>id!=='none')||meds.some(id=>id!=='none')
  const abnormalLabs=list(a.labs).some(id=>!['none','unknown'].includes(id))
  const existingUnknown=existing.some(id=>['unknown','other','multivitamin'].includes(id))
  const unknownAllergy=excluded.some(id=>['unknown','other'].includes(id))
  const safe=adult&&!reproductive&&!specialHealth&&!abnormalLabs&&!existingUnknown&&!unknownAllergy&&profile.weight_change!=='unintentional'
  const functional=safe&&scope.functional==='yes'&&(a.preferences||{}).approach!=='food'
  const botanicalSafe=safe&&scope.botanicals==='yes'&&list(a.botanical_safety).length===1&&a.botanical_safety[0]==='none'&&(a.preferences||{}).approach!=='food'
  const existingHas=id=>existing.includes(id)||(id==='magnesium_glycinate'&&existing.includes('magnesium'))
  const candidates=[],foodActions=[],followUps=base.checks.filter(c=>c.medical||!['calcium','vitamin_d','b12'].includes(c.id))
  const rows=base.coverage.flatMap(g=>g.items)
  const byId=id=>rows.find(r=>r.id===id)
  function add(input){
    if(existingHas(input.id)||candidates.some(c=>c.id===input.id))return
    const c={selected:false,expanded:false,selectable:true,tag:'可选补充',details:[],sources:[],...input}
    candidates.push(c)
  }
  function review(id,title,reason,action){
    if(!followUps.some(r=>r.id===id))followUps.push({id,title,reason,action})
  }
  function functionalCard(id,title,group,reason,benefit,food,evidence,caution,sourceIds,extra={}){
    add({id,title,group,reason,benefit,food,caution,tag:'目标型可选',
      details:[detail('选择依据',evidence),detail('怎样选择与使用','先核对单方成分、实际含量与配方标签，一次只尝试一种新成分。这里不把研究用量直接写成你的每日剂量。')],
      sources:sourceIds.map(id=>({id,title:getReportSource(id).title})),...extra})
  }
  const nutrientForms={
    vitamin_d:['维生素 D','帮助钙吸收，支持骨骼与肌肉正常功能。'],
    calcium:['钙补充剂','补上食物中难以稳定获得的钙来源。'],
    b12:['维生素 B12','支持神经功能和红细胞形成，纯素饮食尤其需要可靠来源。'],
    magnesium:['镁补充剂','补充偏少的镁来源，支持正常神经与肌肉功能。'],
    omega3:[a.diet_style==='vegan'||a.diet_style==='vegetarian'||excluded.includes('fish')?'藻油 · EPA / DHA':'鱼油 / 藻油 · EPA / DHA','为很少吃富脂鱼的日常增加 EPA / DHA 来源。'],
    vitamin_c:['维生素 C','在蔬果长期不足、暂时难以改善时补充维 C 来源。']
  }
  const low=base.cards.filter(r=>['food','supplement'].includes(r.state))
  for(const r of low){
    const form=nutrientForms[r.id]
    if(safe&&form&&(a.preferences||{}).approach!=='food'){
      add({...r,title:form[0],group:'foundation',benefit:form[1],food:r.action,tag:r.state==='supplement'?'优先考虑':'饮食不足时可补',
        caution:r.caution||'先核对已有产品和标签含量，不叠加高剂量。',rank:undefined,
        details:r.details.filter(d=>d.title!=='这次判断的范围'),selectable:true,selected:false,expanded:false})
    }else if(!foodActions.some(f=>f.id===r.id))foodActions.push({id:r.id,title:r.title,reason:r.reason,action:r.action})
  }
  // A broad dietary problem can justify one basic multi, not a dozen isolated pills.
  const multiGaps=low.filter(r=>r.group==='vitamins'||r.group==='minerals')
  const habits=a.diet_habits||{}
  if(safe&&(a.preferences||{}).approach!=='food'&&multiGaps.length>=3&&
      ['months','long'].includes(habits.duration)&&(habits.meals==='one_two'||habits.restriction==='many_foods')&&!low.some(r=>r.id==='b12'&&r.essential)){
    functionalCard('multivitamin','基础复合维生素矿物质（无铁）','foundation',
      '你较长时间漏餐或限制多类食物，而且不止一类营养来源偏少。',
      '用一款基础配方补充多类来源，作为逐步恢复正常饮食的过渡。',
      '把能接受的主食、蛋白食物、蔬菜和水果重新安排到正餐。',
      '复合产品可增加多种营养素摄入，但不能替代食物，也不保证预防疾病。优先基础配方，不选超高剂量或“越全越好”的叠加方案。',
      '与单方维生素、矿物质择一规划，先核对标签；铁不默认加入。',['multivitamin'],{tag:'多类来源不足时可选',alternativeGroup:'micronutrient_plan'})
  }
  for(const r of base.optional){
    if(!functional||!['creatine','protein','hydration'].includes(r.id))continue
    add({...r,group:'training',food:r.action,benefit:{creatine:'辅助反复短时高强度运动，支持力量训练表现。',protein:'在正餐不方便时，提供容易安排的蛋白质来源。',hydration:'长时间大量出汗时，帮助补回水分和电解质。'}[r.id],tag:'训练可选',rank:undefined})
  }
  const concerningSleep=a.impact==='persistent_impairing'||list(sc.interference).includes('snoring')||(sc.frequency==='often'&&sc.duration==='long')
  const poorSleep=sleep.some(id=>['sleep_hard_to_start','sleep_waking','sleep_early_waking'].includes(id))
  if(functional&&goals.includes('sleep')&&poorSleep&&!concerningSleep&&['middle','enough'].includes(sc.hours)&&!existing.includes('magnesium')&&!existing.includes('melatonin')&&a.audience==='adult_18_64'){
    const current=candidates.findIndex(c=>c.id==='magnesium')
    const foodReason=current>=0?candidates[current].reason+' ':''
    if(current>=0)candidates.splice(current,1)
    functionalCard('magnesium_glycinate','甘氨酸镁','sleep',foodReason+'你有入睡或夜醒困扰，也为睡眠留出了时间。',
      '可以作为睡眠支持的可选尝试，预期改善幅度较小；不是缺镁诊断。',
      '镁也来自全谷、豆类、绿叶菜和可耐受的坚果；睡前放松和固定起床时间仍要保留。',
      '2025 年一项 155 人、4 周随机试验中，甘氨酸镁对自评失眠评分的改善略高于安慰剂，效应较小。不能据此承诺治疗失眠或认定这种形式优于所有镁。',
      '不要与其他镁或助眠配方叠加；肾病、用药或长期睡眠障碍先确认适用性。',['magnesium_sleep','magnesium'],{alternativeGroup:'sleep_support',tag:'睡眠可选 · 小幅改善'})
  }
  if(functional&&goals.includes('stress')&&context.stress==='mild'&&!concerningSleep&&a.impact!=='persistent_impairing'&&!existing.some(id=>['melatonin','magnesium','theanine'].includes(id))){
    functionalCard('theanine','L-茶氨酸','sleep','你描述的是偶尔紧绷，希望在不影响日常生活的情况下更容易放松。',
      '可作为日常放松的自选尝试，不用于治疗焦虑症。',
      '茶含茶氨酸也常含咖啡因；晚间不靠多喝浓茶获得同等效果。',
      '一项 30 人、4 周小型试验提示部分压力与睡眠指标改善。研究规模小；另一项焦虑障碍试验未支持抗焦虑疗效，不能把它当作治疗方案。',
      '先与其他睡眠支持成分择一；出现头晕或嗜睡时停止，持续焦虑请寻求专业帮助。',['theanine','theanine_anxiety'],{alternativeGroup:'sleep_support',tag:'放松自选 · 效果因人而异'})
  }
  if(functional&&goals.includes('sleep')&&context.sleep_timing==='jetlag'&&!concerningSleep&&!existing.some(id=>['melatonin','theanine','magnesium'].includes(id))){
    functionalCard('melatonin','褪黑素','sleep','你近期跨越多个时区，睡眠变化与时差有关。','用于短期调整睡眠时点，而不是所有睡不好的通用答案。',
      '配合目的地的起床时间和光照安排；食物不能代替明确的作息调整。',
      '褪黑素参与昼夜节律。时差是有研究支持的用途之一，长期失眠则不是默认使用场景；服用时点会影响结果。',
      '先向药师确认目的地、时点和产品；可能嗜睡，不与酒精同用，使用后不驾驶。',['melatonin'],{alternativeGroup:'sleep_support',tag:'短期时差可选'})
  }
  if(botanicalSafe&&goals.includes('fatigue')&&context.energy==='occasional'&&['middle','enough'].includes(sc.hours)&&!poorSleep&&!concerningSleep&&!['persistent','unknown'].includes(context.stress)&&a.impact!=='persistent_impairing'){
    functionalCard('ginseng','人参提取物（Panax ginseng）','energy','你是偶尔疲倦、休息后可恢复，没有提到入睡或夜醒困扰，并愿意了解植物成分。',
      '可作为一般疲倦的自选支持，可能的获益较小。',
      '先保持正餐、睡眠和恢复；人参不是能量或蛋白质的替代品。',
      '部分研究提示亚洲人参对一般疲倦有小幅帮助，但结果并不一致。不同参种、发酵工艺与提取物不能互换，也不把它包装成抗衰或抗焦虑必需品。',
      '可能引起失眠并影响血糖、凝血；出现睡不好就停用。用药、妊娠或自身免疫疾病需专业核对。',['ginseng'],{tag:'植物可选 · 精力支持',alternativeGroup:'botanical'})
  }
  const activeTraining=(a.training_detail||{}).frequency!=='zero'&&(a.training_detail||{}).stable==='stable'
  if(botanicalSafe&&context.joint==='exercise'&&activeTraining&&goals.some(id=>['joint','strength','endurance'].includes(id))){
    functionalCard('turmeric','姜黄 / 姜黄素提取物','joint','你有稳定训练，描述的是训练后几天内缓解的肌肉酸痛，并希望了解植物成分。',
      '可作为运动恢复的低优先级选项；不是每天必需，也不能替代处理运动损伤。',
      '先安排合理训练负荷、蛋白质、睡眠；烹调用姜黄可作香料，但不等同研究中的提取物。',
      '运动恢复研究采用特定制剂，样本较小，结果不完全一致；不能推广成所有姜黄产品都能“抗炎”。关节炎研究也不能直接套用于没有诊断的关节痛。',
      '浓缩提取物有肝损伤报告，不能把“高吸收”当成更安全。出现黄疸、深色尿或明显恶心应停用并就医。',['turmeric','turmeric_exercise'],{tag:'植物可选 · 先看配方',alternativeGroup:'botanical'})
  }
  if(goals.includes('joint')&&['knee_diagnosed','unexplained','alarm'].includes(context.joint))review('joint_review',context.joint==='knee_diagnosed'?'姜黄素与关节方案':'先确认关节不适的原因',
    context.joint==='knee_diagnosed'?'你已有膝骨关节炎诊断，可以把姜黄素作为与医生讨论的辅助选项。':'你提到持续关节痛、红肿或负重困难，不适合用恢复补剂自行处理。',
    context.joint==='knee_diagnosed'?'带上用药和具体配方核对；不替代既有治疗，也不直接套用运动恢复产品。':'安排就医；急性红肿、发热或无法负重时及时处理。')
  if(functional&&goals.includes('gut')&&(a.goal_detail||{}).gut==='constipation'&&context.gut_safety==='none'){
    functionalCard('psyllium','车前子壳 · 可溶性膳食纤维','gut','你关注排便不规律或偏干，并未报告吞咽、梗阻等使用限制。',
      '通过吸水增加粪便体积，帮助排便规律。',
      '燕麦、杂豆、蔬菜和完整水果也能增加纤维；慢慢增加，观察胀气。',
      '临床指南支持在合适成人中考虑纤维补充，其中车前子壳有相对直接的依据；不同纤维并不完全等效。',
      '不干吞，必须按标签充分配水；与药物间隔需问药师。持续便秘或需要连续使用时先咨询，便血或明显腹痛及时就医。',['fiber_guideline','psyllium'],{tag:'排便支持可选'})
    const idx=foodActions.findIndex(r=>r.id==='fiber');if(idx>=0)foodActions.splice(idx,1)
  }
  if(functional&&goals.includes('skin')&&(a.goal_detail||{}).skin==='appearance'&&!['vegan','vegetarian'].includes(a.diet_style)&&!excluded.some(id=>['fish','shellfish'].includes(id))){
    functionalCard('collagen','胶原蛋白肽','skin','你关注的是皮肤水分、弹性等外观，并希望了解目标型补充剂。',
      '可自选了解，但皮肤改善并不确定，不作为优先必买项。',
      '保留正常蛋白质摄入与富含维 C 的食物；防晒、保湿比增加补充种类更基础。',
      '部分试验报告皮肤水分或弹性改善；2025 年综述中，高质量及非产业资助研究未显示明确获益。不能承诺抗衰，也不能替代完整蛋白质。',
      '看清鱼、牛或猪等来源和过敏标识；不把胶原蛋白当作生发或完整蛋白粉。',['collagen'],{tag:'外观自选 · 获益不确定'})
  }
  if(scope.botanicals==='yes'&&!botanicalSafe)review('botanical_review','植物成分需要先核对','你的健康、用药、阶段或成分记录中，有需要进一步确认的情况。','暂不把人参、姜黄等提取物加入可选清单；把具体配方交给医生或药师核对，不自行停药。')
  if(context.energy==='persistent'||context.stress==='persistent')review('energy_review','持续疲倦或压力影响生活','这已经超出偶尔状态波动。','安排专业评估，不用人参或放松补剂掩盖持续变化。')
  if(goals.includes('gut')&&context.gut_safety!=='none')review('gut_review','排便变化需要确认','你提到持续变化、吞咽问题或尚未确认的限制。','先确认原因与饮水、用药要求，再选择纤维或益生菌。')
  if(!safe&&adult&&low.length)review('supplement_review','补充方式先做一次核对','饮食中有值得改善的来源，但健康或已有产品信息会影响补充选择。','可先参考适合你的食物调整，新增产品前核对阶段、用药和标签。')
  const priorityGroup={sleep:'sleep',stress:'sleep',fatigue:'energy',strength:'training',endurance:'training',joint:'joint',skin:'skin',gut:'gut'}[a.goal_priority]
  const tier=c=>c.essential?0:c.group==='foundation'?1:['creatine','protein','hydration','psyllium'].includes(c.id)?2:c.id==='collagen'?4:3
  candidates.sort((x,y)=>tier(x)-tier(y)||Number(y.group===priorityGroup)-Number(x.group===priorityGroup))
  candidates.forEach((c,i)=>{
    c.rank=i+1;c.selected=false;c.expanded=false
    if((c.group==='foundation'&&c.id!=='omega3')||c.id==='magnesium_glycinate')c.micronutrient=true
    if(['turmeric','ginseng','psyllium','melatonin'].includes(c.id))c.safetyBrief=c.caution.split('。')[0]+'。'
  })
  const programs=Object.keys(GROUPS).map(id=>({id,...GROUPS[id],items:candidates.filter(c=>c.group===id)})).filter(g=>g.items.length).sort((x,y)=>x.items[0].rank-y.items[0].rank)
  // One combined dietary action for multiple small micronutrient signals.
  const compactFood=(candidates.length?foodActions.filter(r=>['potassium','iron','iodine','fiber','vitamin_a'].includes(r.id)):foodActions).slice(0,4)
  if(!compactFood.length&&foodActions.length)compactFood.push(foodActions[0])
  const topicGroup={sleep_energy:'sleep',appearance:'skin',gut:'gut',eyes:'eyes'}
  for(const topic of base.topics){
    if(!programs.some(g=>g.id===topicGroup[topic.id]))compactFood.push({id:topic.id,title:topic.title,reason:topic.reason,action:topic.action})
  }
  if(goals.includes('healthy_aging'))compactFood.push({id:'healthy_aging',title:'长期健康的日常安排',reason:'你希望支持随年龄变化的长期状态。',action:'保留规律活动、适合自己的力量和平衡练习、正常蛋白质与骨骼营养来源；按年龄和既有情况安排健康检查，不用抗衰成分堆叠代替这些习惯。'})
  if(!candidates.length)followUps.push(...base.checks.filter(c=>['calcium','vitamin_d','b12'].includes(c.id)))
  const uniqueChecks=followUps.filter((r,i,all)=>all.findIndex(x=>x.id===r.id)===i)
  return {
    version:'goal-plan-v6',title:candidates.length?'为你筛选的补充建议':'你的下一步营养安排',
    summary:candidates.length?'先看最值得考虑的几项，再按目标选择。每一项都能展开看依据、食物替代与注意事项。':'根据你目前的记录，先做好下面的安排；不会为了凑数量加入不合适的成分。',
    highlights:candidates.slice(0,3).map(c=>({id:c.id,title:c.title,tag:c.tag,rank:c.rank})),
    programs,cards:candidates,foodActions:compactFood,checks:uniqueChecks,checksExpanded:false,
    selectedCount:0,selectedNames:'',selectionMessage:'',
    existingNote:existing.some(id=>!['none','unknown'].includes(id))?'已填写的补充成分已参与筛选，不重复加入。':'',
    emptyAction:adult?'保留稳定的饮食和生活习惯；如需要核对信息，下方会列出具体下一步。':base.emptyAction,
    disclaimer:'这是成分候选建议，不是诊断、处方或每日服用清单。选择后仍需结合具体产品、剂量和相互作用确认；不自动下单。'
  }
}

function updateSelection(report,id){
  const target=report.cards.find(c=>c.id===id&&c.selectable)
  if(!target)return report
  const selecting=!target.selected
  let replaced=false
  const cards=report.cards.map(c=>{
    if(c.id===id)return {...c,selected:selecting}
    const conflict=selecting&&c.selected&&((target.alternativeGroup&&target.alternativeGroup===c.alternativeGroup)||
      (target.id==='multivitamin'&&c.micronutrient)||(c.id==='multivitamin'&&target.micronutrient))
    if(conflict){replaced=true;return {...c,selected:false}}
    return c
  })
  const selected=cards.filter(c=>c.selected)
  return {...report,cards,programs:report.programs.map(g=>({...g,items:cards.filter(c=>c.group===g.id)})),
    selectedCount:selected.length,selectedNames:selected.map(c=>c.title).join('、'),
    selectionMessage:replaced?'已替换同类或可能重叠的选项，避免一起堆叠。':''}
}
module.exports={buildRecommendationReport,getReportSource,updateSelection}
