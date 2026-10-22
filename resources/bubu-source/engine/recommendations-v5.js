'use strict'

const { NUTRIENTS, sourceUrl } = require('./intake-screening')
const list = v => Array.isArray(v) ? v : []
const has = (v,id) => list(v).includes(id)
const SOURCES = Object.fromEntries(NUTRIENTS.map(n=>[n.id,{title:`NIH ODS · ${n.title}`,url:sourceUrl(n.slug)}]))
Object.assign(SOURCES,{
  omega3:{title:'NIH ODS · Omega-3',url:'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/'},
  sport:{title:'NIH ODS · 运动营养',url:'https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/'},
  sleep:{title:'NHLBI · 睡眠与失眠',url:'https://www.nhlbi.nih.gov/health/insomnia/treatment'},
  eyes:{title:'NEI · AREDS2 适用范围',url:'https://www.nei.nih.gov/eye-health-information/clinical-trials/age-related-eye-disease-studies-aredsareds2/aredsareds2-frequently-asked-questions'},
  collagen:{title:'2025 年胶原与皮肤研究综述',url:'https://pubmed.ncbi.nlm.nih.gov/40324552/'},
  probiotics:{title:'NCCIH · 益生菌',url:'https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety'}
})
const TAGS={food:'先靠饮食补足',supplement:'值得考虑补充',optional:'按目标可选',check:'先确认一件事',maintain:'保留现有来源',existing:'已有补充安排'}
function card(id,title,state,reason,action,supplement='',details=[],sourceIds=[],caution='') {
  return {id,title,state,tag:TAGS[state],reason,action,supplement,caution,details,sources:sourceIds.filter(id=>SOURCES[id]).map(id=>({id,title:SOURCES[id].title})),expanded:false}
}
const d=(title,body)=>({title,body})

function buildPlanReport(mode, a) {
  const detailed=mode==='detailed', q=a.quick_food||{}, dairy=a.dairy_food||{}, animal=a.animal_food||{}, plant=a.plant_food||{}, types=a.plant_types||{}
  const pref=a.preferences||{}, health=a.health_detail||{}, profile=a.profile||{}, training=a.training_detail||{}, goals=list(a.goals)
  const existing=list(a.existing_sources), conditions=list(health.conditions), meds=list(health.medicines), labs=list(a.labs), excluded=list(a.exclusions)
  const vegan=a.diet_style==='vegan', vegetarian=vegan||a.diet_style==='vegetarian', child=a.audience==='minor_under_18'
  const reproductive=['planning','pregnant','lactating'].includes(profile.life_stage)
  if(child){
    const cf=a.child_food||{},cd=a.child_detail||{}
    const checks=[card('child_nutrition','孩子的营养安排','check',cf.plan==='yes'?'孩子已有儿科给出的补充安排。':'孩子的营养需要取决于年龄、生长、奶和辅食或正餐。',cf.plan==='yes'?'继续按已有安排执行，把进食记录带到复诊；不要叠加成人产品。':'先记录几天的奶、辅食或正餐，按具体年龄与儿科确认钙、铁、维生素 D 等安排。')]
    if(cf.milk==='little')checks.push(card('child_calcium','钙的食物来源','check','你提到孩子的奶或适龄替代来源比较少。','结合准确年龄、过敏和进食情况，确认适合的奶或替代食物，不套用成人份量。','',[],['calcium']))
    if(cd.growth==='concern')checks.unshift(card('child_growth','先确认生长与进食变化','check','你提到生长停滞、体重下降或吞咽困难。','请及时安排儿科评估，不用营养补充剂代替检查。'))
    return {version:'persona-inspired-v5-child',title:'先看孩子的营养来源',summary:'这是监护人填写的饮食记录，不套用成人补充方案。',cards:[],optional:[],checks,topics:[],coverage:[],coverageCount:0,coverageExpanded:false,remainingCount:0,showMore:false,topicsExpanded:false,highlights:[],emptyTitle:'按年龄和生长情况安排',emptyAction:cf.variety==='restricted'?'记录长期吃不到的食物和能接受的替代来源，优先与儿科一起核对。':'保留适龄、多样的进食安排，下面列出本次需要确认的重点。',disclaimer:'儿童补充品和用量需按年龄及实际情况确认；不展示成人运动、减重或通用补脑组合。',notice:null}
  }
  const restricted=conditions.some(id=>['kidney','food_limit'].includes(id)) || has(a.safety,'medical_food_restriction_quick')
  const unknownHealth=has(a.safety,'unknown') || has(a.safety,'surgery_or_reaction') || has(a.safety,'malabsorption_or_bariatric') ||
    (has(a.safety,'chronic_or_labs') && conditions.some(id=>['unknown','other','liver'].includes(id))) ||
    (has(a.safety,'medication') && (!meds.length || meds.some(id=>['unknown','other'].includes(id))))
  const cannotAutoSupplement=child||reproductive||restricted||unknownHealth
  const knownUnknownProduct=existing.some(id=>['unknown','other','multivitamin'].includes(id))
  const direct=id=>existing.includes(id) || (/^b\d+$/.test(id) && existing.includes('b_complex'))
  const state = v => ['zero','small','rare'].includes(v)?'low':['regular','large','often'].includes(v)?'source':v==='some'?'partial':'unknown'
  const signals={}
  const addSignal=(id,v,label)=>{signals[id]={state:state(v),label}}
  if(detailed){
    for(const id of ['vegetables','fruit','whole_grains','beans','nuts']) addSignal(id,plant[id],{vegetables:'蔬菜',fruit:'水果',whole_grains:'全谷',beans:'杂豆',nuts:'坚果种子'}[id])
    for(const id of ['greens','orange','potato']) addSignal(id,types[id],{greens:'深绿叶菜',orange:'橙黄色蔬果',potato:'薯类'}[id])
    addSignal('milk',['dairy'].includes(dairy.kind)?dairy.amount:['none','unfortified','fortified'].includes(dairy.kind)?'zero':undefined,'奶类')
    addSignal('calcium_drink',['dairy','fortified'].includes(dairy.kind)?dairy.amount:['none','unfortified'].includes(dairy.kind)?'zero':undefined,'奶或加钙饮品')
    addSignal('tofu',dairy.tofu,'豆制品')
    addSignal('calcium_tofu',dairy.tofu==='zero'||dairy.tofu_kind==='none'?'zero':dairy.tofu_kind==='calcium'?dairy.tofu:undefined,'含钙豆腐')
    addSignal('meat',animal.meat,'肉、禽、鱼虾'); addSignal('red_meat',animal.red_meat,'红肉或贝类'); addSignal('eggs',animal.eggs,'全蛋')
    addSignal('fish',animal.fish,'富脂鱼'); addSignal('seafood',animal.red_meat,'肉或贝类')
    addSignal('oil',(a.cooking||{}).oil==='plant'?'often':['animal','little'].includes((a.cooking||{}).oil)?'zero':undefined,'植物油')
    addSignal('iodized_salt',(a.cooking||{}).salt==='iodized'?'often':(a.cooking||{}).salt==='non_iodized'?'zero':undefined,'加碘盐')
  }else{
    addSignal('calcium_drink',q.calcium,'主要含钙食物'); addSignal('fish',q.fish,'富脂鱼'); addSignal('b12_quick',q.b12,'B12 食物')
    addSignal('vegetables',q.vegetables,'蔬菜'); addSignal('fruit',q.fruit,'水果')
    for(const id of ['whole_grains','beans','nuts','greens']) addSignal(id,q.magnesium,'全谷、豆类、坚果和绿叶菜')
  }
  for(const id of ['d_fortified','b12_fortified']){
    const key=id==='d_fortified'?'vitamin_d':'b12'
    addSignal(id,has(a.fortified,key)?'often':has(a.fortified,'none')?'zero':undefined,`${key==='b12'?'B12':'维生素 D'} 强化食品`)
  }
  const get=id=>(signals[id]||{state:'unknown',label:id}).state
  const allLow=ids=>ids.every(id=>get(id)==='low')
  const anySource=ids=>ids.some(id=>get(id)==='source')
  const inconsistent=vegan && (detailed ? dairy.kind==='dairy'&&dairy.amount!=='zero'||animal.meat==='regular'||animal.eggs==='often'||animal.fish==='often' : q.b12==='often' && !has(a.fortified,'b12'))
  const rows=[],checks=[],optional=[],topics=[]
  const acceptableFoods=(n)=>{
    const replacements={
      calcium:excluded.includes('dairy')||vegan?'标签明确加钙的植物饮品、合适的含钙食物':'牛奶、酸奶、加钙植物饮品或含钙豆腐',
      b12:vegan?'明确强化 B12 的食品':'肉、鱼、蛋、奶或明确强化 B12 的食品',
      omega3:vegan||excluded.includes('fish')?'藻油等非鱼类来源':'三文鱼、沙丁鱼、鲭鱼等富脂鱼',
      magnesium:'全谷杂粮、杂豆、深绿叶菜'+(excluded.includes('nuts')?'':'和坚果种子'),
      potassium:'蔬菜、水果、薯类和杂豆', iron:vegetarian?'杂豆、豆制品，搭配含维生素 C 的蔬果':'瘦肉或合适的豆类，搭配新鲜蔬果',
      protein:vegetarian?(excluded.includes('soy')?'可耐受的杂豆、全谷和种子':'豆腐、豆类及其他可耐受的蛋白食物'):'你能吃的蛋、奶、肉、鱼或豆制品'
    }
    let text=replacements[n.id]||n.sources
    // Avoid giving excluded foods as a direct action; the broader source list remains educational.
    if(excluded.includes('soy')) text=text.replace(/、?豆腐|、?豆制品|、?大豆制品/g,'')
    return text
  }
  const addCheck=(id,title,reason,action,sourceIds=[],caution='')=>checks.push(card(id,title,'check',reason,action,'',[],sourceIds,caution))
  if(has(a.safety,'persistent_symptoms'))addCheck('persistent_symptoms','持续影响生活的不适','你提到近期不适已持续并影响日常生活。','请安排就医确认原因；以下饮食建议不替代这一步。')
  if(inconsistent) addCheck('diet_consistency','核对素食与食物记录','你选择了纯素，但部分食物回答可能包含动物性来源。','请返回核对饮食方式；如果吃的是强化替代品，把它记在对应的强化来源里。')

  for(const n of NUTRIENTS){
    let s='check',reason='这次还没有确认主要食物的种类和份量。',action=`先记录${acceptableFoods(n)}的实际吃法。`,supplement='',caution=''
    let certainty=0,essential=false
    const rule=(ids)=>{
      if(allLow(ids)){s='food';certainty=2;reason=`你填写的${ids.map(id=>signals[id].label).filter((v,i,all)=>all.indexOf(v)===i).join('、')}都比较少。`}
      else if(anySource(ids)){s='maintain';reason='你已经有较稳定的相关食物来源；继续保留，份量还要结合全天饮食来看。'}
      else reason='部分来源频率或份量还不清楚，先确认再决定是否调整。'
    }
    if(n.id==='calcium'){
      const alternatives=list(a.calcium_alternatives)
      const noAlt=alternatives.includes('none')
      if(anySource(['calcium_drink','calcium_tofu'])) {s='maintain';reason='你已经有规律的奶、加钙饮品或含钙豆腐来源，不需要因为少喝某一种奶就另买钙片。'}
      else if((detailed?allLow(['calcium_drink','calcium_tofu']):get('calcium_drink')==='low') && noAlt){s='food';certainty=2;reason='你常吃的主要含钙食物比较少，也没有固定的可靠替代来源。'}
      else reason=alternatives.some(id=>!['none','unknown'].includes(id))?'你有其他含钙食物，先看标签含量和每次份量，再决定是否需要钙片。':'先确认饮品是否加钙、豆腐的种类和替代食物的份量。'
      action=`每天安排一种你能坚持的含钙食物，例如${acceptableFoods(n)}。`
      supplement='调整后仍难稳定覆盖时，再考虑钙补充剂；看清元素钙含量，并把已有产品一起算上。'
      if(s==='food' && pref.calcium==='no' && pref.approach!=='food') s='supplement'
    }else if(n.id==='vitamin_d'){
      if(get('d_fortified')==='source'){s='maintain';reason='你有固定的维生素 D 强化食品来源，先保留并核对标签含量。'}
      else if(get('fish')==='low' && get('d_fortified')==='low') {s='food';certainty=2;reason=`富脂鱼吃得少，也没有固定的维生素 D 强化食品。${a.daylight==='little'?'你还提到多数时间在室内。':''}`; if(pref.approach!=='food') s='supplement'}
      else reason='鱼类、强化食品或户外情况中仍有未确认的信息，先核对现有维生素 D 来源。'
      action='优先核对明确强化维生素 D 的食品；能吃鱼时，也可安排富脂鱼。天然食物来源相对有限。'
      supplement='来源长期不稳定时，可以了解适龄的常规维生素 D 补充；不自行使用高剂量或冲击剂量。'
      caution='不用刻意暴晒；是否检测由个人风险决定，不因室内工作就必须抽血。'
    }else if(n.id==='b12'){
      if(get('b12_fortified')==='source'){s='maintain';reason='你已规律食用明确强化 B12 的食品，继续核对标签含量和使用频率。'}
      else if(vegan && !inconsistent && get('b12_fortified')==='low'){s='supplement';essential=true;certainty=3;reason='你不吃动物性食物，也没有固定的 B12 强化来源；这一项需要建立可靠的长期安排。'}
      else if(detailed) rule(['meat','milk','eggs','fish','b12_fortified'])
      else if(get('b12_quick')==='source'){s='maintain';reason='你表示 B12 食物来源比较规律，先保留这些来源。'}
      action=vegan?'选择明确标注 B12 的强化食品，或安排适合你的 B12 补充剂。普通海藻和发酵食品不能替代。':`规律安排${acceptableFoods(n)}。`
      supplement='长期缺少可靠来源时，B12 是比笼统补一整套更需要先确认的方向。'
    }else if(n.id==='magnesium'){
      rule(detailed?['whole_grains','beans','nuts','greens']:['whole_grains'])
      action=`每天从${acceptableFoods(n)}中选两类，逐步加进正餐。`
      supplement='食物长期难覆盖时再考虑镁；产品应看元素镁含量，不以“助眠”“补脑”的名字判断效果。'
    }else if(n.id==='potassium'){
      rule(detailed?['vegetables','fruit','beans','potato','milk']:['vegetables','fruit'])
      action='把蔬菜、水果、薯类和杂豆稳定安排进正餐，先从食物改善钾来源。'
      supplement='这项以饮食为主，不建议把钾片作为日常自行补充。'
    }else if(n.id==='vitamin_a'){
      if(detailed) rule(['greens','orange','eggs','milk'])
      action='轮换安排深绿叶菜、胡萝卜、南瓜等食物，并按饮食方式搭配其他来源。'
      supplement='皮肤或用眼目标不等于需要额外维生素 A；通常先调整食物。'
      caution='备孕、孕期或使用维 A 酸类药物时，不自行加用维生素 A 或鱼肝油。'
    }else if(n.id==='vitamin_c'){
      rule(['vegetables','fruit']);action='每天安排新鲜蔬菜和完整水果，例如彩椒、西兰花、柑橘或猕猴桃。';supplement='能稳定吃到蔬果时，通常先改善饮食，不急着加大剂量维 C。'
    }else if(n.id==='b9'){
      if(detailed) rule(['greens','beans','fruit']);action='正餐增加深绿叶菜和豆类，水果作为日常搭配。'
    }else if(n.id==='iron'){
      if(detailed) rule(['red_meat','beans','greens'])
      action=`安排${acceptableFoods(n)}；铁剂要结合失血情况和检查再决定。`;supplement='不凭疲劳或脱发直接加铁。'
    }else if(n.id==='iodine'){
      if(detailed) rule(['iodized_salt','milk','eggs','fish'])
      action='看看食盐是否标注加碘，并核对平时的蛋、奶或海产品来源；不为了补碘多吃盐。';supplement='不靠海带、海藻片或碘片自行加量。'
    }else if(n.id==='vitamin_e') {if(detailed) rule(['oil','nuts']);action='选择适量的植物油和可耐受的坚果种子，避免长期极端低脂。'}
    else if(n.id==='vitamin_k'){if(detailed) rule(['greens','vegetables']);action='保持绿叶菜摄入相对规律。'}
    else if(n.id==='b1'){if(detailed) rule(['whole_grains','beans','meat']);action='把部分精制主食换成全谷，并轮换豆类及适合的瘦肉。'}
    else if(n.id==='b2'){if(detailed) rule(['milk','eggs','meat','greens']);action='在能吃的食物中轮换奶、全蛋、肉和绿叶菜。'}
    else if(n.id==='b6'){if(detailed) rule(['meat','fish','potato','fruit']);action='轮换鱼肉、薯类和水果等来源。';caution='不长期自行服用高剂量 B6；过量可能损伤周围神经。'}
    else if(n.id==='zinc'){if(detailed) rule(['meat','beans','nuts','milk']);action='轮换肉类、豆类和可耐受的坚果等来源；不因为皮肤问题就单独加锌。'}
    else {
      // Widely distributed nutrients: variety review, not a standalone supplement trigger.
      const related=n.foods.filter(id=>signals[id])
      if(related.length && anySource(related)){s='maintain';reason='你有相关食物来源，继续保持多样搭配；本次不单独增加这一项。'}
      else {s='check';reason='这项分布在多种食物中，单靠本次粗略记录不足以决定是否额外补充。'}
      action=`通过${acceptableFoods(n)}等多样食物保持来源。`
      if(n.id==='b7') {supplement='不把生物素作为一般脱发的默认补充。';caution='高剂量生物素可能干扰化验，正在服用时请提前告知医护。'}
    }
    if(vegetarian && ['b1','b2','b3','b5','b6','b7','zinc','selenium','copper','phosphorus','choline'].includes(n.id)) action='在符合你饮食方式的全谷、豆类、蔬菜和可耐受的坚果种子中保持多样搭配；强化食品按标签确认。'
    if(direct(n.id)){s='existing';reason=`你已经在补充${n.title}，这次不重复建议新增。`;action='保留当前记录，先核对每份含量和实际使用频率；已有医嘱请继续按医嘱安排。';supplement='';certainty=0}
    const medical=[]
    const abnormal={vitamin_d:'d_low',iron:'iron_low',b12:'b12_low',potassium:'potassium_abnormal',calcium:'calcium_abnormal'}[n.id]
    if(abnormal && labs.includes(abnormal)) medical.push(['你已有这项相关检查异常。','优先按医生给出的处理和复查安排，不用问卷替代已有方案。'])
    if(n.id==='potassium' && (restricted||meds.includes('potassium_affecting')||has(a.safety,'unknown')||(has(a.safety,'medication')&&meds.some(id=>['other','unknown'].includes(id))))) medical.push(['健康或用药情况可能影响适合你的钾摄入安排。','先核对血钾、肾功能和药物，不自行增加高钾食物、钾片或含钾低钠盐。'])
    if(n.id==='vitamin_k' && meds.includes('warfarin')) medical.push(['你正在使用华法林。','保持维生素 K 食物相对稳定，调整饮食或含 K 产品前先与开药医生确认。'])
    if(n.id==='iron' && a.menstrual==='heavy') medical.push(['你提到经量较多或经期较长。','把失血情况告诉医生，讨论是否需要血常规、铁蛋白等评估，再决定是否补铁。'])
    if(n.id==='b12' && meds.includes('b12_affecting')) medical.push(['你提到二甲双胍或长期抑酸药。','向开药医生询问是否需要评估 B12，不自行停药。'])
    if(n.id==='iodine' && conditions.includes('thyroid')) medical.push(['你提到甲状腺相关疾病。','按具体病情确认碘摄入要求，不自行更换盐或增加海藻和碘补充剂。'])
    if(n.id==='vitamin_a' && meds.includes('retinoids')) medical.push(['你正在使用维 A 酸类药物。','不要自行加维生素 A 或鱼肝油，把现有产品交给开药医生核对。'])
    if(n.id==='calcium' && conditions.includes('stones')) medical.push(['你提到结石或高钙血症。','先确认结石类型或高钙原因，不自行增加钙补充，也不要擅自把正常饮食中的钙全部去掉。'])
    if(reproductive && n.id==='b9') medical.push(['备孕、孕期和哺乳期需要分别安排叶酸等营养。','核对当前阶段和孕期补充品，与产科确认叶酸及其他成分的安排。'])
    if(medical.length){s='check';reason=medical.map(x=>x[0]).join('');action=medical.map(x=>x[1]).join('');supplement='';certainty=0;caution=action}
    else if(restricted){if(['food','supplement'].includes(s))s='check';action='先把这些食物来源与现有饮食医嘱核对，确认能调整的种类与份量。';supplement='';caution='已有饮食限制请继续遵循，不自行增减受限食物。'}
    else if(child){s=s==='existing'?'existing':'check';reason='儿童需要按具体年龄、生长和奶 / 正餐情况单独核对。';action='由监护人整理实际进食，与儿科或营养专业人员确认适龄食物和补充安排。';supplement='';certainty=0}
    else if(s==='supplement' && (cannotAutoSupplement||knownUnknownProduct)){s='check';caution=knownUnknownProduct?'你还在使用成分未核对的复合或其他产品，新增前先看清是否包含这一项。':'结合当前阶段、健康或用药情况，请先确认补充方式。';supplement=''}
    if(s==='maintain') action='继续保留这些稳定的食物来源。这里确认的是有来源，全天份量是否合适还要结合其他餐食。'
    if(s==='check'&&!medical.length&&!restricted&&!child) action=n.id==='calcium'?'先确认饮品或替代食物的标签含量和份量，再决定是否增加钙。':n.id==='vitamin_d'?'先核对强化食品与已有产品是否含维生素 D，以及实际食用频率。':n.id==='b12'?'先确认动物性食物或 B12 强化食品是否稳定，以及现有产品的成分。':action
    if(['food','supplement'].includes(s) && excluded.some(id=>['unknown','other'].includes(id))) caution+=' 食物过敏范围还未完全确认，只选择自己明确能吃的食物。'
    if(s==='food' && ['b2','b6','zinc'].includes(n.id) && excluded.length && !excluded.includes('none')) action='从你明确能吃的食物中安排多样来源；具体可参考展开后的食物清单，并避开已知过敏食物。'
    const details=[d('它主要做什么',n.mechanism),d('哪些食物能提供',n.sources),d('这次判断的范围','这里确认的是食物来源是否值得改善，不是体内缺乏诊断，也没有把频率换算成精确毫克缺口。')]
    if(n.id==='calcium' && a.calcium_label){
      const x=a.calcium_label, ml=Number(x.ml), mg=Number(x.mg)
      if(ml>0 && mg>0) details.unshift(d('你填写的饮品贡献',`按标签 ${mg} mg / 100 mL、每天 ${ml} mL 计算，这一种饮品约提供 ${Math.round(ml*mg/100)} mg 钙。不含其他食物，也不等于全天已吃够。`))
    }
    rows.push({...card(n.id,n.title,s,reason,action,supplement,details,[n.id],caution),group:n.group,certainty,essential,medical:medical.length>0})
  }

  const fishLow=get('fish')==='low'
  if(fishLow){
    let s=pref.fish==='no'&&pref.approach!=='food'?'supplement':'food'
    if(direct('omega3'))s='existing'
    if(s==='supplement'&&(cannotAutoSupplement||knownUnknownProduct))s='check'
    const fishExcluded=vegetarian||excluded.includes('fish')
    rows.push({...card('omega3','Omega-3 · 鱼油 / 藻油',s,direct('omega3')?'你已规律使用鱼油或藻油，先核对 EPA 和 DHA 含量。':'你平时富脂鱼吃得少，EPA 和 DHA 的稳定来源值得单独安排。',
      direct('omega3')?'先保留当前记录，核对标签与实际使用频率，这次不重复新增。':restricted?'先按现有饮食要求核对可用的来源。':fishExcluded?'如果长期不吃鱼，可以了解藻油来源，并核对具体 EPA / DHA 含量。':'愿意吃鱼时，先把三文鱼、沙丁鱼等安排进每周餐单。',
      direct('omega3')?'':'长期不吃鱼时，再考虑鱼油或藻油；看 EPA + DHA，不只看“鱼油总重量”。',
      [d('为什么适合关注','EPA 和 DHA 是细胞膜成分。这项来自鱼类来源线索，不是血脂治疗或缺乏诊断。'),d('怎么选来源','核桃和亚麻籽主要提供 ALA，不能按同等重量换算成 EPA / DHA。鱼油来源需留意鱼类过敏；藻油配方也要看具体含量。')],['omega3'],meds.some(id=>id!=='none')?'正在用药时，新增鱼油或藻油前请让医生或药师核对。':''),group:'other',certainty:2})
  }else{
    const s=direct('omega3')?'existing':get('fish')==='source'?'maintain':'check'
    rows.push({...card('omega3','Omega-3 · 鱼油 / 藻油',s,s==='existing'?'你已在规律使用鱼油或藻油。':s==='maintain'?'你有较规律的富脂鱼来源。':'鱼种、频率或份量还需要进一步确认。',s==='maintain'?'保留每周吃鱼的习惯，不因选择多个目标就额外增加鱼油。':'先看清鱼类来源，或已有产品的 EPA 与 DHA 含量。','',[],['omega3']),group:'other',certainty:0})
  }
  const plantLow=detailed?allLow(['vegetables','fruit','whole_grains','beans']):allLow(['vegetables','fruit'])
  if(plantLow && !restricted && !child) rows.push({...card('fiber','膳食纤维','food','你常吃的蔬果和部分植物性食物偏少。','从一份燕麦、杂豆或蔬菜开始，逐步增加，并按自己的饮水限制和耐受情况调整。','先看饮食改善；不把所有消化问题都交给益生菌。'),group:'other',certainty:2})
  else rows.push({...card('fiber','膳食纤维',restricted?'check':anySource(['vegetables','fruit','whole_grains','beans'])?'maintain':'check','结合蔬果、全谷和豆类的种类与份量来看。',restricted?'按现有饮食医嘱确认可以调整的食物。':'保留能耐受的多样植物性食物，份量不清楚时再补充记录。'),group:'other',certainty:0})
  rows.push({...card('protein','蛋白质',direct('protein')?'existing':'check',direct('protein')?'你已有蛋白粉补充来源。':'蛋白质需要结合全天食物、训练和实际份量一起看。',restricted?'按现有医嘱确认蛋白质摄入安排。':`先记录正餐中的${acceptableFoods({id:'protein'})}，粉剂主要提供便利。`,'',[d('怎样更准确地判断','身高和体重不能单独决定还需要多少蛋白粉。至少需要全天蛋白食物与份量，不能把体重直接换成补充缺口。')],['sport']),group:'other',certainty:0})
  const confirmedTraining=training.frequency && training.frequency!=='zero' && training.stable==='stable'
  if(confirmedTraining && list(training.types).some(id=>['strength','hiit'].includes(id)) && goals.includes('strength') && !cannotAutoSupplement){
    if(!direct('creatine')&&!knownUnknownProduct) optional.push(card('creatine','肌酸一水合物','optional',`你有${{one_two:'每周 1–2 次',three_four:'每周 3–4 次',five_plus:'每周 5 次及以上'}[training.frequency]}的稳定训练，并希望提升力量或增肌。`,'在训练、正餐和恢复稳定的基础上，可以把肌酸作为可选项。','这是训练表现选项，不是“缺肌酸”。',[d('它主要做什么','帮助肌肉在反复短时高强度活动中快速补充能量；研究较充分的形式是一水合物。'),d('使用前了解','部分人会出现体内水分增加或胃肠不适。肾病、孕哺期、未成年人和用药情况需单独确认，不套用成人研究方案。')],['sport'],meds.some(id=>id!=='none')?'你正在用药，开始补充前请核对适用性。':''))
  }
  if(training.frequency && training.frequency!=='zero' && ['sometimes_hard','usually_hard'].includes(training.protein_access) && !restricted && !child){
    optional.push(card('protein','蛋白质 · 食物或蛋白粉','optional','你提到训练日有时难以稳定吃到正餐蛋白。',`先把${acceptableFoods({id:'protein'})}分配到正餐。`,'吃饭不方便时，蛋白粉可以补上便利性；不是因为健身就必须喝。',[d('为什么不直接算几勺','体重本身不足以算出缺口，还要知道全天食物、总能量和现有粉剂。先记录实际份量，再决定是否需要额外补充。')],['sport']))
  }
  if(training.sweat==='yes'&&!restricted&&!child) optional.push(card('hydration','长时出汗的补水与电解质','optional','你提到连续明显出汗超过 2 小时，也不方便正常进餐。','提前安排饮水、进食和便携补给，留意气温与出汗情况。','这种场景可以考虑含电解质饮品；日常短时活动以水和正常饮食为主。',[d('补水注意','不强迫自己大量饮水，也不自行叠加盐片；心肾疾病、限盐限液或用药情况需要个别安排。')],['sport']))

  const sleep=list(a.sleep_detail), sleepContext=a.sleep_context||{}
  if(goals.some(id=>['sleep','stress','fatigue','brain'].includes(id))){
    const actions=[]
    if(sleepContext.hours==='short')actions.push('你通常每晚睡不到 6 小时，先留出更充分的睡眠机会。')
    if(sleep.includes('sleep_short_opportunity')) actions.push('先为睡眠留出稳定的时间；夜间照护能分担的部分提前安排。')
    if(sleep.includes('sleep_hard_to_start')) actions.push('把咖啡、浓茶安排得更早，睡前留一段安静的放松时间。')
    if(sleep.includes('sleep_waking')||sleep.includes('sleep_early_waking')) actions.push('记录夜醒或早醒的时间，以及饮酒、照护和卧室环境的影响。')
    if(!actions.length)actions.push('连续记录几天睡眠、正餐和状态变化，从最常被打断的一项开始调整。')
    topics.push(card('sleep_energy','睡眠与白天状态','food',sleep.length&&!sleep.includes('none')?'你具体提到了睡眠困扰，先处理与你的作息相符的影响因素。':'你希望改善精力或专注，先从睡眠机会和规律进餐找线索。',actions.join(''),'',
      [d('镁应该放在哪里看','如果全谷、豆类、坚果或绿叶菜来源少，前面的镁建议会提示改善饮食。来源稳定时，不因为睡不好就额外增加甘氨酸镁或苏糖酸镁。'),d('肌酸与专注','肌酸在这里按明确的力量训练场景考虑，不把一般脑雾转成补脑配方。')],['sleep']))
    if(a.impact==='persistent_impairing'||has(sleepContext.interference,'snoring')||(sleepContext.frequency==='often'&&sleepContext.duration==='long')) addCheck('sleep_followup','持续困倦或睡眠困扰','你提到困扰长期频繁出现、明显影响生活，或有打鼾、憋醒等情况。','请安排医疗评估；困到影响驾驶时，先暂停驾驶等危险活动。',['sleep'])
  }
  if(goals.includes('skin')||goals.includes('hair')) topics.push(card('appearance','皮肤、头发与指甲','optional','你关注外观状态，饮食和日常护理是这次的基础。','保持正常进食、蛋白质来源、防晒和保湿；持续或突然脱发、明显皮疹先确认原因。','胶原蛋白可作为健康成人外观目标的自选了解项，不是必需营养缺口。',[d('胶原蛋白','研究对皮肤水分或弹性的结果并不一致，效果受研究质量等影响，不能保证明显改善。'),d('生物素','一般脱发不默认补生物素；高剂量可能干扰部分化验。')],['collagen','b7']))
  if(goals.includes('eyes')) topics.push(card('eyes','用眼与眼部舒适','food','你关注眼睛状态，先看连续用眼和休息安排。','安排近距离用眼间歇，保持照明，日常轮换深绿叶菜。视物不清或持续不适请检查眼睛。','叶黄素不是长时间看屏幕或儿童近视的必选补剂。',[d('叶黄素适合谁','叶黄素可以来自食物。AREDS2 配方对应特定阶段的年龄相关黄斑变性，不能套用于普通用眼疲劳。')],['eyes']))
  if(goals.includes('gut')) topics.push(card('gut','消化与排便','food','排便偏干、腹胀和反复腹泻的改善方式不同。',(a.goal_detail||{}).gut==='diarrhea'?'反复腹泻应先确认原因，记录食物和发作时间，必要时就医。':'逐步调整能耐受的蔬果、全谷和豆类，记录排便与食物的关系。','益生菌要对应具体用途和菌株，不按“肠胃不好”统一安排。',[d('选择前了解','不同菌株不能互相替代；免疫功能严重受损等人群使用前需要专业确认。')],['probiotics']))
  if(profile.weight_change==='unintentional'||(a.goal_detail||{}).gut==='alarm'||(a.child_detail||{}).growth==='concern') addCheck('health_followup','先了解近期身体变化','你提到非主动体重下降、生长变化或消化方面的警示情况。','请及时就医确认原因，不用补充剂替代检查。')
  if((a.goal_detail||{}).skin==='sudden') addCheck('skin_followup','突然脱发或明显皮疹','你提到突然或明显的皮肤、头发变化。','安排皮肤科评估，先确认原因，再讨论营养调整。')
  if(knownUnknownProduct) addCheck('existing_label','看看正在吃的产品标签','你在使用复合或其他成分未完全核对的产品。','先确认标签里的成分和实际用量。其他食物来源仍会分别评估，不会把所有营养都算作已经补足。')

  const goalMap={calcium:['bone'],vitamin_d:['bone'],magnesium:['diet_coverage'],potassium:['diet_coverage'],b12:['diet_coverage'],iron:['diet_coverage'],omega3:['diet_coverage'],fiber:['gut']}
  // Ordinal evidence tiers, then expressed preference. No deficiency scores or fixed nutrient rankings.
  const ordered=rows.filter(r=>['food','supplement'].includes(r.state)).sort((x,y)=>
    Number(Boolean(y.essential))-Number(Boolean(x.essential)) || y.certainty-x.certainty ||
    Number((goalMap[y.id]||[]).includes(a.goal_priority))-Number((goalMap[x.id]||[]).includes(a.goal_priority)) ||
    Number(y.state==='supplement')-Number(x.state==='supplement') || x.title.localeCompare(y.title,'zh'))
  if((a.diet_habits||{}).duration==='recent') ordered.forEach(r=>{r.reason+='这是最近的吃法，先观察是否能恢复稳定来源。'})
  const cards=ordered.map((r,i)=>({...r,rank:i+1}))
  const relevantChecks=rows.filter(r=>r.medical || (r.state==='check'&&['calcium','vitamin_d','b12'].includes(r.id)))
  checks.push(...relevantChecks)
  const coverage=[['vitamins','维生素'],['minerals','矿物质'],['other','其他营养与补充方向']].map(([id,title])=>({id,title,items:rows.filter(r=>r.group===id).map(r=>({...r,status:r.tag}))}))
  if(detailed) coverage[1].items.push({id:'sodium_chloride',title:'钠与氯',status:'结合盐和出汗场景',reason:'日常食盐可提供钠与氯，不把少吃盐直接当成缺乏。',action:restricted?'按现有的限盐、限液要求安排。':'日常不常规加盐片；长时出汗时单独看补液条件。'})
  return {
    version:'persona-inspired-v5',title:'你现在优先关注',summary:cards.length?'先看这几项：为什么值得关注，以及从食物还是补充剂开始。':'先确认下面的关键信息，再决定是否新增补充剂。',
    cards,optional,checks,topics,coverage,coverageCount:coverage.reduce((n,g)=>n+g.items.length,0),coverageExpanded:false,
    remainingCount:Math.max(0,cards.length-3),showMore:false,topicsExpanded:false,
    highlights:cards.slice(0,3).map(r=>({id:r.id,title:r.title,tag:r.tag,rank:r.rank,reason:r.reason})),
    emptyTitle:cards.length?'':'目前先不新增一整套补充剂',
    emptyAction:checks.length?'先完成“需要先确认”里的关键核对；其他已经稳定的食物来源继续保持。':'你填写的主要食物来源较稳定，先保留这些习惯；有明确训练目标时，可看下面的目标选项。',
    disclaimer:'根据本次饮食与生活记录整理，不代表体内缺乏诊断或处方。补充量需结合年龄、食品标签和已有医嘱。',notice:null
  }
}
module.exports={buildPlanReport,getReportSource:id=>SOURCES[id]||null}
