'use strict'

// Short, answer-led screens. Shared identifiers preserve answers on quick -> detailed.
const legacy = require('./questions')
const { INTAKE_QUESTIONS } = require('./intake-questions')
const opt = (pairs) => pairs.map(([id, label]) => ({ id, label }))
const single = (id, title, pairs, section, why = '') => ({ id, title, type: 'single', required: true, section, why, options: opt(pairs) })
const multi = (id, title, pairs, section, why = '') => ({ ...single(id, title, pairs, section, why), type: 'multi', noneOptionId: 'none', exclusiveIds: ['none', 'unknown'], helper: '可多选；不确定可以直接说明。' })
const field = (id, title, pairs, type = 'single') => ({ id, title, type, required: true, options: opt(pairs), exclusiveIds: ['none', 'unknown'] })
const fields = (id, title, rows, section, why = '') => ({ id, title, type: 'fields', required: true, fields: rows, section, why })
const frequency = opt([['rare', '每周 0–1 天'], ['some', '每周 2–4 天'], ['often', '每周 5–7 天'], ['unknown', '不确定']])
const portion = (small, regular) => opt([['zero', '基本不吃'], ['small', small], ['regular', regular], ['unknown', '不确定']])
const matrix = (id, title, rows, section, why = '') => ({ id, title, type: 'matrix', required: true, rows, choices: frequency, section, why, helper: '按最近一个月的通常吃法，不用为了某一天的例外纠结。' })
const reused = (id, section, changes = {}) => ({ ...legacy.QUESTIONS[id], section, ...changes })

const QUESTIONS = {
  audience: single('audience', '这次想为谁了解营养？', [['adult_18_64', '18–64 岁成人'], ['senior_65_plus', '65 岁及以上成人'], ['minor_under_18', '未满 18 岁，由监护人填写']], '关于你', '不同年龄的需要不同。儿童不会套用成人补充方案。'),
  profile: reused('profile', '关于你', {
    title: '先认识一下你', description: '', helper: '身高、体重可留空；生理性别也可以选择不说明。',
    why: '这些信息用于区分适用人群，不会用身高、体重猜测你缺哪一种营养。',
    fields: [...legacy.QUESTIONS.profile.fields,
      field('life_stage', '目前处于哪个阶段？', [['usual', '不属于以下阶段'], ['planning', '备孕'], ['pregnant', '孕期'], ['lactating', '哺乳期'], ['menopause', '围绝经期或绝经后'], ['unknown', '不想说明']]),
      field('weight_change', '近 3 个月，体重是否明显变化？', [['stable', '基本稳定'], ['intentional', '有，在主动调整体重'], ['unintentional', '有，并不是主动减重'], ['unknown', '不确定']])]
  }),
  safety: multi('safety', '有没有需要先留意的健康情况？', [
    ['medication', '正在长期用药'], ['chronic_or_labs', '有慢性病或已知异常检查'],
    ['medical_food_restriction_quick', '医生要求限制食物、钾、磷或蛋白质'],
    ['malabsorption_or_bariatric', '吸收障碍或做过减重 / 消化道手术'],
    ['surgery_or_reaction', '近期手术或严重补充剂不良反应'],
    ['urgent_chest_breathing', '现在有胸痛、呼吸困难、晕厥或意识异常'],
    ['urgent_neurologic', '突然单侧无力、说话困难或严重神经症状'],
    ['urgent_vision', '突然视力下降或剧烈眼痛'],
    ['urgent_severe_allergy', '严重过敏正在加重，或疑似大量误服'],
    ['urgent_mental_safety', '目前无法保证自身安全，或有自伤想法'],
    ['persistent_symptoms', '近期不适持续存在，已明显影响日常生活'],
    ['none', '以上都没有'], ['unknown', '不确定 / 暂不说明']
  ], '健康与用药', '长期用药不会提前结束问卷。我们会只调整受影响的建议；紧急不适需要立即处理。'),
  health_detail: reused('health_detail', '健康与用药', { helper: '不认识药物类别可以选“不知道”，不用猜，也不要自行停药。' }),
  child_detail: fields('child_detail', '孩子的饮食和生长情况', [
    field('stage', '孩子属于哪个年龄段？', [['infant', '未满 1 岁'], ['toddler', '1–3 岁'], ['child', '4–11 岁'], ['teen', '12–17 岁']]),
    field('growth', '近期生长和进食情况', [['usual', '生长和进食基本稳定'], ['picky', '明显挑食或长期不吃多类食物'], ['concern', '生长停滞、体重下降或吞咽困难'], ['unknown', '不确定']]),
    field('feeding', '主要饮食', [['milk', '母乳 / 配方奶为主'], ['mixed', '奶与辅食或正餐并行'], ['meals', '以日常正餐为主']])
  ], '关于你', '儿童需要单独的年龄标准。本次整理食物来源，补充品和剂量由儿科确认。'),
  child_food: fields('child_food','记录孩子实际的食物来源',[
    field('milk','奶或适龄替代来源',[['regular','有稳定来源'],['little','比较少 / 很难安排'],['unknown','不清楚']]),
    field('variety','辅食或正餐的种类',[['not_started','还没有开始辅食'],['varied','种类较多，能轮换吃'],['restricted','长期少吃好几类食物'],['unknown','不清楚']]),
    field('plan','是否已有儿科给出的营养补充安排？',[['yes','有，正在按安排执行'],['no','没有'],['unknown','不清楚']])
  ],'孩子的饮食','先记录实际来源，不要求用成人每天多少克的标准衡量孩子。'),
  scenes: reused('scenes', '你的日常', { title: '最近，你的日常更像哪些场景？', helper: '可以多选，也可以全选。', why: '工作、学习和照护会影响作息与吃饭安排。接下来只追问与你相关的内容。' }),
  daily_load: reused('daily_load', '你的日常', { title: '日常最常遇到哪些情况？', helper: '可多选。', why: '关注真实的作息和饮食条件，而不是只看职业名称。' }),
  goals: reused('goals', '你的目标', { title: '这次，你最想关注哪些方面？', helper: '可以多选或全选，下一步再排轻重。', options: opt([
    ['sleep', '睡眠'], ['stress', '压力与放松'], ['fatigue', '白天精力'], ['brain', '专注与记忆'],
    ['strength', '力量与增肌'], ['endurance', '耐力与运动恢复'], ['bone', '骨骼营养'],
    ['skin', '皮肤状态'], ['hair', '头发与指甲'], ['eyes', '眼部舒适'], ['gut', '消化与排便'],
    ['diet_coverage', '饮食限制下的营养'], ['comprehensive', '全面了解营养'], ['none', '暂时没有特别关注的']
  ]), why: '目标帮你安排阅读重点。是否需要某种补充，还要看食物来源和实际情况。' }),
  goal_priority: single('goal_priority', '如果先改善一件事，你会选什么？', [['equal', '都一样重要']], '你的目标', '只影响同等条件下的展示顺序，不会因为选了睡眠就认定缺镁。'),
  diet_style: single('diet_style', '你平时怎么吃？', [['mixed', '荤素都吃'], ['vegetarian', '蛋奶素，不吃肉鱼'], ['vegan', '纯素，不吃动物性食物'], ['restricted', '有其他饮食限制'], ['unknown', '不确定']], '日常饮食'),
  exclusions: multi('exclusions', '有哪些食物需要避开？', [['dairy', '奶制品'], ['soy', '大豆和豆制品'], ['fish', '鱼类'], ['shellfish', '虾蟹贝类'], ['nuts', '坚果'], ['eggs', '蛋类'], ['gluten', '含麸质谷物'], ['other', '其他食物'], ['none', '没有'], ['unknown', '不确定']], '日常饮食', '不推荐你过敏、不耐受或明确不吃的食物。其他过敏请继续按已有要求避开。'),
  diet_habits: fields('diet_habits', '平常吃饭的安排是怎样的？', [
    field('meals', '通常一天吃几顿正餐？', [['one_two', '1–2 顿，经常漏餐'], ['regular', '3 顿左右，比较规律'], ['unknown', '变化很大']]),
    field('restriction', '有没有长期减少食量或种类？', [['no', '没有'], ['energy', '主动少吃或控制总热量'], ['many_foods', '很多食物吃不了，也难找到替代'], ['unknown', '不确定']]),
    field('duration', '这种吃法持续了多久？', [['recent', '不到 1 个月'], ['months', '1–3 个月'], ['long', '超过 3 个月'], ['unknown', '不确定']])
  ], '日常饮食'),
  quick_food: matrix('quick_food', '这些食物，你平时吃得多吗？', [
    {id:'calcium', label:'奶、酸奶、加钙饮品或其他可靠含钙食物', description:'普通豆浆不默认含钙丰富。'},
    {id:'fish', label:'三文鱼、沙丁鱼、鲭鱼等富脂鱼', choices: opt([['zero','不吃'],['rare','不到每周 1 次'],['some','每周 1 次'],['often','每周 2 次及以上'],['unknown','不确定']])},
    {id:'b12', label:'肉、鱼、蛋、奶或明确强化 B12 的食物'},
    {id:'magnesium', label:'全谷、豆类、坚果、绿叶菜'},
    {id:'vegetables', label:'蔬菜，不只是几口配菜'}, {id:'fruit', label:'完整水果，不含果汁'}
  ], '食物来源', '每一种来源都分别确认，避免把“不确定”当作“没有”。极简版不估算毫克缺口。'),
  dairy_food: fields('dairy_food', '先看看你每天的奶和豆制品', [
    field('kind', '通常喝哪一种？', [['dairy','牛奶、酸奶或无乳糖奶'],['fortified','标签明确加钙的植物饮品'],['unfortified','普通豆浆等未强化饮品'],['none','基本不喝'],['unknown','不知道是否强化']]),
    field('amount', '平均每天喝多少？', [['zero','基本没有'],['small','不足 250 mL'],['regular','250–500 mL'],['large','超过 500 mL'],['unknown','不确定']]),
    field('tofu', '平均每天吃多少豆腐、豆干等？', [['zero','基本没有'],['small','不足 100 g'],['regular','100–200 g'],['large','超过 200 g'],['unknown','不确定']]),
    field('tofu_kind', '常吃的豆腐是哪种？', [['calcium','硫酸钙 / 石膏等含钙凝固剂'],['other','内酯豆腐或其他类型'],['none','基本不吃'],['unknown','不知道']])
  ], '奶豆鱼肉蛋', '钙来源要同时看种类和份量。加钙饮品可以替代奶，普通豆浆不能直接按奶计算。'),
  calcium_label: {id:'calcium_label',title:'手边有饮品的营养标签吗？',type:'profile',required:false,section:'奶豆鱼肉蛋',helper:'可全部留空。只计算这份饮品的钙，不当作全天摄入。',why:'有真实标签才能把食物贡献算清楚，不用粗略频率猜毫克。',fields:[
    {id:'ml',title:'这款饮品平均每天喝多少',type:'number',required:false,unit:'mL',min:0,max:3000,placeholder:'可跳过，例如 300'},
    {id:'mg',title:'标签每 100 mL 含钙多少',type:'number',required:false,unit:'mg',min:0,max:1000,placeholder:'看标签，可跳过'}
  ]},
  calcium_alternatives: multi('calcium_alternatives', '还有这些固定的含钙来源吗？', [['cheese','多数天吃奶酪，会留意标签含钙量'],['bone_fish','经常吃连骨的小鱼或沙丁鱼'],['fortified','其他食品标签明确加钙，并规律食用'],['none','没有这些来源'],['unknown','不确定']], '食物来源', '少喝奶不一定钙来源少，还要把替代食物算进去。'),
  animal_food: matrix('animal_food', '鱼、肉和蛋，通常怎么吃？', [
    {id:'fish', label:'富脂鱼（一次约一掌心可食鱼肉）', choices: opt([['zero','不吃'],['rare','不到每周 1 次'],['some','每周 1 次'],['often','每周 2 次及以上'],['unknown','不确定']])},
    {id:'meat',label:'肉、禽或其他鱼虾（平均每天可食生重）',choices:portion('不足 100 g','100 g 及以上')},
    {id:'red_meat',label:'红肉或贝类',choices:frequency},
    {id:'eggs',label:'全蛋（包括蛋黄）',choices:frequency}
  ], '奶豆鱼肉蛋', '鱼种影响 EPA / DHA，红肉与贝类有不同的铁锌来源，蛋黄也是胆碱来源。'),
  plant_food: matrix('plant_food', '蔬果和主食，平均每天有多少？', [
    {id:'vegetables',label:'蔬菜（生重）',choices:portion('不到 300 g','300 g 及以上')},
    {id:'fruit',label:'完整水果',choices:portion('不到 200 g','200 g 及以上')},
    {id:'whole_grains',label:'燕麦、糙米、全麦等',choices:portion('不到主食的 1/3','约占主食 1/3 或更多')},
    {id:'beans',label:'熟杂豆，不重复算豆腐',choices:portion('不到半碗','半碗或更多')},
    {id:'nuts',label:'去壳坚果、种子',choices:portion('不到一小把（约 10 g）','一小把或更多')}
  ], '蔬果与主食', '这里看来源是否稳定，不把粗略份量当成精确的营养摄入量。'),
  plant_types: matrix('plant_types', '再看看食物的种类', [
    {id:'greens',label:'深绿叶菜'}, {id:'orange',label:'胡萝卜、南瓜等橙黄色蔬果'}, {id:'potato',label:'土豆、红薯等薯类'}
  ], '蔬果与主食'),
  fortified: multi('fortified', '有固定吃这些强化食品吗？', [['vitamin_d','明确添加维生素 D'],['b12','明确添加 B12'],['none','没有'],['unknown','没看过标签']], '强化食品与油盐', '只算标签明确标注、并规律食用的食品。普通牛奶不默认添加维生素 D。'),
  cooking: fields('cooking', '家里通常用什么油和盐？', [
    field('salt','食盐',[['iodized','加碘盐'],['non_iodized','未加碘盐'],['potassium_salt','含钾低钠盐'],['unknown','外食多 / 不清楚']]),
    field('oil','烹调油',[['plant','主要用植物油'],['animal','主要是黄油、猪油或椰子油'],['little','长期几乎不吃油脂'],['unknown','不清楚']])
  ], '强化食品与油盐'),
  daylight: single('daylight', '白天通常有多少户外活动？', [['little','多数天在室内，或主要隔着玻璃'],['some','每周有几天，多遮挡或时间较短'],['regular','多数天有户外活动'],['unknown','变化很大 / 不清楚']], '与你有关的细节', '户外只是维生素 D 的背景信息，不能据此计算合成量，也不建议为了补 D 暴晒。'),
  training_detail: reused('training_detail', '运动与恢复', { title:'你的运动安排是怎样的？', helper:'没有规律运动也可以直接说明。', fields: [...legacy.QUESTIONS.training_detail.fields,
    field('stable','这种训练安排持续多久？',[['new','不足 4 周'],['stable','4 周或更久'],['none','暂无规律训练']]),
    field('sweat','是否长时间明显出汗且不方便进餐？',[['no','通常不会'],['yes','会，常持续 2 小时以上'],['unknown','不确定']])], why:'训练频率、类型与进食条件决定肌酸、蛋白质或补液是否值得考虑。' }),
  sleep_detail: reused('sleep_detail','与你有关的细节',{title:'你的睡眠主要卡在哪里？',description:'',helper:'可多选。',why:'入睡慢、夜醒和睡眠时间被挤占，需要不同的改善方式。'}),
  sleep_context: fields('sleep_context','再了解一点睡眠习惯',[field('hours','通常每晚睡多久？',[['short','少于 6 小时'],['middle','6–7 小时'],['enough','7 小时以上'],['unknown','说不清']]),field('frequency','困扰每周发生几天？',[['rare','0–1 天'],['some','2–3 天'],['often','4 天或更多']]),field('duration','持续多久？',[['short','不到 1 个月'],['months','1–3 个月'],['long','超过 3 个月']]),field('interference','哪些情况经常发生？',[['caffeine','下午或晚上喝咖啡、浓茶'],['care','带娃或照护导致夜醒'],['shift','轮班或跨时区'],['alcohol','睡前饮酒'],['snoring','明显打鼾、憋醒或困到影响驾驶'],['none','以上都没有']],'multi')],'你的目标'),
  impact: reused('impact','你的目标',{helper:'按你的真实感受选择。'}),
  goal_detail: fields('goal_detail','把你关心的变化说得更具体',[field('skin','皮肤或头发主要关注什么？',[['appearance','干燥、弹性等外观'],['hair','持续脱发或指甲变化'],['sudden','突然 / 成片脱发、明显皮疹'],['none','不关注这方面']]),field('eyes','眼睛主要是什么情况？',[['screen','长时间用眼，想改善休息'],['discomfort','持续干涩或视物不清'],['diagnosed','眼科已有明确诊断'],['acute','突然视力下降或剧烈眼痛'],['none','不关注这方面']]),field('gut','排便或消化更像哪一种？',[['constipation','排便不规律或偏干'],['bloating','容易胀气'],['diarrhea','持续或反复腹泻'],['alarm','便血、黑便、明显腹痛或不明原因消瘦'],['none','不关注这方面']])],'你的目标'),
  menstrual: single('menstrual','月经方面，有没有需要留意的变化？',[['usual','有月经，出血量和平时相近'],['heavy','经量明显多、经期长或曾被提醒失血多'],['none','没有月经 / 不适用'],['unknown','不确定 / 不想说明']],'营养背景'),
  labs: multi('labs','近一年，医生有没有告知这些检查结果？',[['d_low','维生素 D 偏低'],['iron_low','缺铁或缺铁性贫血'],['b12_low','B12 偏低'],['potassium_abnormal','血钾异常'],['calcium_abnormal','血钙异常'],['none','做过检查，未被告知这些异常'],['unknown','没做过 / 不清楚']],'营养背景','没有检查过和检查正常不同；这里只记录已有结论。'),
  existing_sources: reused('existing_sources','你的补充安排',{title:'你已经在规律补充哪些成分？', helper:'只记录已知类别，避免重复建议；完整查重仍在家庭补剂柜里做。', options:[...INTAKE_QUESTIONS.existing_sources.options,{id:'creatine',label:'肌酸'},{id:'protein',label:'蛋白粉'}]}),
  preferences: fields('preferences','你更愿意怎样开始？',[
    field('approach','饮食和补充剂，你倾向于',[['food','先调整饮食'],['if_needed','食物做不到时再补充'],['both','两种方式都能接受']]),
    field('fish','如果鱼吃得少，你愿意增加吗？',[['yes','愿意，安排进每周餐单'],['no','长期不吃 / 不方便'],['unknown','还没想好']]),
    field('calcium','每天安排一种可靠含钙食物，做得到吗？',[['yes','可以尝试奶或合适的替代食物'],['no','目前很难做到'],['unknown','还没想好']])
  ],'你的补充安排','能执行的食物调整优先；不方便吃到时，再讨论补充形式。')
}
const MODES = {
  quick:{id:'quick',title:'极简版',timeLabel:'约 3–5 分钟',estimatedMinutes:[3,5],stepLabel:'关键来源 · 少量相关追问',description:'快速找到值得先关注的营养，以及容易做到的饮食调整。'},
  detailed:{id:'detailed',title:'详细版',timeLabel:'约 12–18 分钟',estimatedMinutes:[12,18],stepLabel:'完整饮食 · 按回答展开',description:'细看食物份量、替代来源、睡眠和训练，让每一项建议都有依据。'}
}
module.exports={QUESTIONS,MODES,QUESTION_IDS:legacy.QUESTION_IDS,OPTION_IDS:legacy.OPTION_IDS,getModeDefinition:(mode)=>MODES[mode]||MODES.quick}
