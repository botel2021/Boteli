import {
  ServiceSchedule,
  Sermon,
  BibleVerse,
  Ministry,
  ChurchEvent,
  PrayerRequest,
  Pastor,
  FAQItem,
  CountdownConfig,
  ModuleVisibilityConfig
} from '../types';

export const CHURCH_INFO = {
  name: '意大利普拉托伯特利教会',
  nameEn: 'Chiesa Cristiana Evangelica Bethel Prato',
  motto: '扎根真道 · 彼此相爱 · 见证基督 · 祝福侨胞',
  bibleTheme: '凡劳苦担重担的人可以到我这里来，我就使你们得安息。（马太福音 11:28）',
  address: '意大利普拉托市 (Prato, Toscana, Italia)',
  phone: '+39 0574-000000 / +39 328-000000',
  email: 'bethelprato@gmail.com',
  pastoralHours: '周二至周六 10:00 - 18:00',
  foundedYear: '2012年',
  sundayMainServiceTime: '每周日 10:00 / 14:30',
  liveStreamUrl: 'https://live.bethel-prato.org',
};

export const DEFAULT_COUNTDOWN_CONFIG: CountdownConfig = {
  enabled: true,
  mode: 'weekly',
  weeklyDay: 0, // 0 = 星期日/主日
  weeklyTime: '10:00',
  weeklyDurationHours: 3,
  customTitle: '距离特别特会培灵盛会还有',
  customTargetDate: '2026-10-04T10:00',
  customSubtitle: '意大利普拉托伯特利主堂现场举行',
  badgeText: 'Upcoming Sunday Worship',
  title: '距离本周主日崇拜还有',
  subtitle: '早堂 10:00 · 午堂 14:30 · 普拉托伯特利主堂',
  inProgressText: '今日主日崇拜现正进行中 · 欢迎入堂或在线同步参与'
};

export const DEFAULT_MODULE_VISIBILITY: ModuleVisibilityConfig = {
  hero: true,
  countdown: true,
  dailyVerse: true,
  worshipSchedule: true,
  sermons: true,
  ministries: true,
  visitorGuide: true,
  prayerWall: true,
  events: true,
  aboutUs: true,
  contact: true
};

export const SERVICES_SCHEDULE: ServiceSchedule[] = [
  {
    id: 'sunday-morning-1',
    name: '主日早堂崇拜',
    nameEn: 'Sunday Morning Service I',
    day: '每周日',
    time: '09:00 - 10:30',
    location: '主堂（三楼大礼堂）',
    language: '普通话（配英文同步字幕）',
    targetGroup: '适合成年人、家庭及长者',
    description: '庄严悠扬的圣诗敬拜，深入浅出的圣经真理释经讲道，包含每月圣餐典礼。',
    isOnlineAvailable: true,
    color: 'emerald',
  },
  {
    id: 'sunday-morning-2',
    name: '主日午堂敬拜',
    nameEn: 'Sunday Morning Service II',
    day: '每周日',
    time: '11:00 - 12:30',
    location: '主堂（三楼大礼堂）',
    language: '普通话（配同声传译耳机）',
    targetGroup: '青年基督徒、职场人士与新朋友',
    description: '现代现代赞美诗乐团敬拜，聚焦时代挑战与信仰践行，崇拜后设有新朋友爱筵茶聚。',
    isOnlineAvailable: true,
    color: 'amber',
  },
  {
    id: 'youth-service',
    name: '青年光盐敬拜',
    nameEn: 'Light & Salt Youth Service',
    day: '每周六',
    time: '19:00 - 20:45',
    location: '多功能二堂（二楼）',
    language: '普通话',
    targetGroup: '初高中生、大学生及青年职场',
    description: '充满生命活力的乐队赞美、生活见证分享、专题圣经剖析与小组深入探讨。',
    isOnlineAvailable: false,
    color: 'blue',
  },
  {
    id: 'kids-sunday-school',
    name: '儿童恩典乐园（主日学）',
    nameEn: 'Kingdom Kids Sunday School',
    day: '每周日',
    time: '09:00 / 11:00（与主日崇拜同步）',
    location: '教育楼幼儿童区（二楼）',
    language: '普通话 / 双语教学',
    targetGroup: '幼童班（3-6岁）/ 学童班（7-12岁）',
    description: '生动有趣的圣经戏剧、品格金句背诵、音乐律动及手工活动，提供安全温馨的陪育环境。',
    isOnlineAvailable: false,
    color: 'rose',
  },
  {
    id: 'prayer-meeting',
    name: '周三全教会守望祷告会',
    nameEn: 'Midweek Intercessory Prayer',
    day: '每周三',
    time: '19:30 - 21:00',
    location: '副堂 / 线上腾讯会议同步',
    language: '普通话',
    targetGroup: '全教会弟兄姊妹及代祷勇士',
    description: '同心为国家、城市、宣教士、病患软弱肢体及家庭婚姻呼求神，经历祷告的权柄。',
    isOnlineAvailable: true,
    color: 'violet',
  },
];

export const SERMONS_DATA: Sermon[] = [
  {
    id: 'sermon-1',
    title: '在风浪中经历出人意外的平安',
    series: '作主门徒：路加福音精读',
    speaker: '李恩宏 主任牧师',
    date: '2026年9月6日',
    scripture: '路加福音 8:22-25',
    duration: '42 分钟',
    summary: '人生的风暴往往突如其来。门徒在加利利海面对惊涛骇浪时陷入恐慌，然而耶稣只用一句话就平息了风浪。真实的信心不是免除风暴，而是在风暴之舟上有基督同在。',
    keyPoints: [
      '一、风浪的真实与人有限的掌控力',
      '二、“夫子，我们丧命啦！”——从恐慌到转向主',
      '三、“你们的信心在哪里呢？”——信靠掌管风浪的主',
      '四、如何在今日生活的现实压力中持守安息'
    ],
    audioSampleDurationSec: 2520,
  },
  {
    id: 'sermon-2',
    title: '爱的真谛：超越感觉的选择与誓约',
    series: '基督化家庭与人际关系',
    speaker: '陈雅歌 牧师',
    date: '2026年8月30日',
    scripture: '哥林多前书 13:1-8',
    duration: '38 分钟',
    summary: '世人常把“爱”当作一种随情绪起伏的感觉，但圣经启示的爱是一种舍己的品格与意志的决断。爱是恒久忍耐又有恩慈，基督如何接纳我们，我们也当如何彼此包容。',
    keyPoints: [
      '一、缺少爱的热心是无益的鸣锣钹声',
      '二、爱的消极面：不嫉妒、不自夸、不计算人的恶',
      '三、爱的积极面：同真理一同欢喜，凡事盼望',
      '四、家庭中的实战操练：如何化解冲突与饶恕'
    ],
    audioSampleDurationSec: 2280,
  },
  {
    id: 'sermon-3',
    title: '作职场上的光与盐：日常中的敬拜',
    series: '活出真理：使命人生',
    speaker: '王志忠 长老',
    date: '2026年8月23日',
    scripture: '歌罗西书 3:23-24',
    duration: '35 分钟',
    summary: '信仰绝不仅仅局限在周日早晨的教堂四壁之内。当我们周一走进办公室、车间或家庭时，无论做什么都要从心里做，像是给主做的，工作便成了圣洁的敬拜工场。',
    keyPoints: [
      '一、打破圣俗二分的错误传统观念',
      '二、在专业追求中追求卓越与诚信',
      '三、面对利益试探时的信仰守望',
      '四、用善良、谦卑与公义服事身边的同事'
    ],
    audioSampleDurationSec: 2100,
  },
  {
    id: 'sermon-4',
    title: '恩典够用：在软弱中夸耀基督的能力',
    series: '保罗书信生命读经',
    speaker: '李恩宏 主任牧师',
    date: '2026年8月16日',
    scripture: '哥林多后书 12:7-10',
    duration: '45 分钟',
    summary: '保罗三次求主叫肉体上的那根“刺”离开他，但主对他说：“我的恩典够你用的，因为我的能力是在人的软弱上显得完全。”顺服神的主权，往往带来最深层的灵性翻转。',
    keyPoints: [
      '一、认识生命中无法挪去的“刺”',
      '二、祷告没有按心愿应允时的神美意',
      '三、神的恩典为何是“够用”的而非“过剩”的',
      '四、我什么时候软弱，什么时候就刚强了'
    ],
    audioSampleDurationSec: 2700,
  },
];

export const DAILY_VERSES: BibleVerse[] = [
  {
    id: 'v-1',
    verse: '凡劳苦担重担的人，可以到我这里来，我就使你们得安息。我心里柔和谦卑，你们当负我的轭，学我的样式；这样，你们心里就必得享安息。',
    reference: '马太福音 11:28-29',
    category: '安息与安慰',
    reflection: '生活常让我们身心俱疲，但主耶稣发出的不是评判，而是充满慈爱的邀请。卸下重担，交托给掌管万有的恩主，在祂的同在中找回心灵深处的安宁。',
  },
  {
    id: 'v-2',
    verse: '神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生。',
    reference: '约翰福音 3:16',
    category: '救赎与恩典',
    reflection: '这是整本圣经中最浩大深广的福音宣言。这份爱没有先决条件，超越我们的罪污与软弱，在十字架上为我们成就了无可比拟的拯救。',
  },
  {
    id: 'v-3',
    verse: '应当一无挂虑，只要凡事藉着祷告、祈求，和感谢，将你们所要的告诉神。神所赐、出人意外的平安必在基督耶稣里保守你们的心怀意念。',
    reference: '腓立比书 4:6-7',
    category: '祷告与信靠',
    reflection: '挂虑是心灵的侵蚀剂，而感恩与祷告则是属天的良药。将未来的忧虑转化为当下的祈求，神的平安如守卫兵士般守卫我们的内心。',
  },
  {
    id: 'v-4',
    verse: '耶和华是我的牧者，我必不致缺乏。他使我躺卧在青草地上，领我在可安歇的水边。他使我的灵魂苏醒，为自己的名引导我走义路。',
    reference: '诗篇 23:1-3',
    category: '牧养与眷顾',
    reflection: '好牧人深知每一只羊的名字与需要。在喧嚣迷茫的世界里，祂的杖祂的竿都安慰我们，祂必不丢弃倚靠祂名的人。',
  },
  {
    id: 'v-5',
    verse: '但那等候耶和华的必从新得力。他们必如鹰展翅上腾；他们奔跑却不困倦，行走却不疲乏。',
    reference: '以赛亚书 40:31',
    category: '盼望与力量',
    reflection: '“等候”并非无所作为的停滞，而是在安静中专心仰望神的时间。借着信靠，神将超然的属天力量赐给疲乏的心灵。',
  },
];

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'm-children',
    name: '儿童恩典工坊',
    enName: 'Kingdom Kids Ministry',
    badge: '3-12岁儿童',
    leader: '张晓云 传道',
    time: '每周日 09:00 / 11:00',
    location: '教育楼幼童馆',
    audience: '学龄前及小学阶段儿童',
    description: '通过生动的圣经故事演绎、圣经金句律动操、品格工坊与圣诗合唱，陪伴孩子们在爱与真理中快乐成长，建立敬虔的属灵生命底色。',
    highlights: [
      '安全规范的签到接送流程与实名门禁',
      '启发式圣经戏剧与多媒体绘本教学',
      '每季度亲子手工日与儿童圣诗献唱',
      '专业受训的奉献老师与爱心助教陪同'
    ],
    icon: 'Baby',
  },
  {
    id: 'm-youth',
    name: '光盐青年团契',
    enName: 'Ignite Youth & Students',
    badge: '中学生 & 大学生',
    leader: '周道明 传道',
    time: '每周六 19:00 - 21:00',
    location: '青年活动多功能中心',
    audience: '初中、高中、高校学子及毕业初探职场者',
    description: '一个让年轻人卸下面具、畅所欲言探讨信仰与人生的活力社区。我们一起弹琴歌唱、研读圣经、讨论世界观，在迷茫与挑战中彼此坚固。',
    highlights: [
      '现代敬拜乐队操练与青年原创赞美诗',
      '世界观与信仰解惑沙龙（科学、婚恋、未来）',
      '寒暑假青年退修会与户外徒步野营',
      '大学校园福音团聚与考研关怀互助'
    ],
    icon: 'Flame',
  },
  {
    id: 'm-family',
    name: '迦南职场与家庭团契',
    enName: 'Canaan Marketplace & Family',
    badge: '职场与家庭',
    leader: '王志忠 长老 & 师母',
    time: '隔周五 19:30 - 21:30',
    location: '各分区分组家庭 / 教会多功能厅',
    audience: '职场青年、新婚夫妻、育儿父母',
    description: '面对高压的职场竞争与家庭婚姻挑战，我们一起学习圣经中的理财观、夫妻相处之道与子女养育原则，成为彼此随时的属灵同路人。',
    highlights: [
      '亲密之旅婚姻营会与婚前辅导课程',
      '基督徒职场伦理与专业见证分享会',
      '周末家庭日与儿童托管互助组',
      '定期家庭圣餐爱筵与弟兄祷告早餐会'
    ],
    icon: 'HeartHandshake',
  },
  {
    id: 'm-worship',
    name: '撒拉弗敬拜赞美团',
    enName: 'Seraphim Worship & Choir',
    badge: '敬拜事奉',
    leader: '方颂恩 执事',
    time: '每周四晚 19:30 排练 / 主日各堂事奉',
    location: '圣乐排练厅',
    audience: '具有音乐恩赐、立志用歌声与器乐服事主的信徒',
    description: '以灵和真理敬拜神。团队涵盖传统圣诗诗班与现代赞美诗乐团（管风琴、钢琴、吉他、贝斯、鼓组与管弦乐团），用音乐引领会众朝见上帝。',
    highlights: [
      '系统声乐培训、乐理基础与司琴技巧提升',
      '复活节与圣诞节大型圣乐清唱剧献演',
      '每月敬拜团灵修与生命守望之夜',
      '现代原创赞美诗编曲与录音制作'
    ],
    icon: 'Music',
  },
  {
    id: 'm-care',
    name: '撒玛利亚慈惠与关怀团',
    enName: 'Good Samaritan Care & Mercy',
    badge: '关怀宣教',
    leader: '刘慧心 姊妹',
    time: '常态化服事 / 每月第一个周六探访',
    location: '社区服务站与各区探访点',
    audience: '立志践行基督之爱、服事弱势群体的弟兄姊妹',
    description: '主说：“做在我这弟兄中一个最小的身上，就是做在我身上了。”关怀团长期开展医院病患探访、独居长者陪伴、社区爱心餐盒发放与助学项目。',
    highlights: [
      '定期探访病患、临终关怀与丧礼慰勉服事',
      '社区长者健康义诊与生活互助热线',
      '偏远山区乡村学校爱心图书室援建',
      '心理健康与哀伤辅导专业社工支持'
    ],
    icon: 'Sparkles',
  },
];

export const EVENTS_DATA: ChurchEvent[] = [
  {
    id: 'e-1',
    title: '秋季全教会联合受洗感恩崇拜',
    date: '2026年9月27日',
    dayOfWeek: '主日',
    time: '14:00 - 16:30',
    location: '主堂大礼堂 & 浸礼池',
    category: '特会',
    description: '见证数十位弟兄姊妹归入基督的名下，埋葬旧我，活出新生的荣美见证。崇拜后举行盛大浸礼爱筵。',
    speakerOrHost: '教牧团同工',
    requiresRegistration: true,
  },
  {
    id: 'e-2',
    title: '“在职场活出呼召”秋季培灵特会',
    date: '2026年10月17日 - 18日',
    dayOfWeek: '周六至主日',
    time: '09:30 - 17:00',
    location: '恩光会议中心',
    category: '培训',
    description: '特邀资深基督教伦理学者与跨国企业高管弟兄，深度剖析现代科技与AI浪潮下的信仰坚守与使命拓展。',
    speakerOrHost: '特邀讲员：林宪平 博士',
    requiresRegistration: true,
  },
  {
    id: 'e-3',
    title: '社区中秋爱心慰问与长者茶话会',
    date: '2026年9月24日',
    dayOfWeek: '周四',
    time: '14:30 - 16:30',
    location: '教会二楼多功能厅',
    category: '社区',
    description: '邀请社区孤寡与独居长者共度佳节，提供免费血压血糖检测、理发关怀、月饼品尝及诗歌表演。',
    speakerOrHost: '慈惠关怀事工部',
    requiresRegistration: false,
  },
  {
    id: 'e-4',
    title: '青年秋日“向光而行”草地音乐野餐',
    date: '2026年10月4日',
    dayOfWeek: '周日午后',
    time: '14:00 - 18:00',
    location: '青龙湖湿地公园草坪',
    category: '团契',
    description: '阳光、吉他赞美、互动飞盘与真理畅谈。欢迎邀请同学、同事和慕道友新朋友一同在自然中感受造物之美。',
    speakerOrHost: '光盐青年团契部',
    requiresRegistration: true,
  },
];

export const INITIAL_PRAYER_WALL: PrayerRequest[] = [
  {
    id: 'p-1',
    author: '王弟兄',
    isAnonymous: false,
    content: '请为家父的白内障手术祈祷，愿主赐给主刀医生智慧，保守手术平安顺利，让父亲重见光明，也求主借此开他的心窍信靠耶稣。',
    category: '健康与医治',
    amenCount: 48,
    createdAt: '2小时前',
  },
  {
    id: 'p-2',
    author: '一位刚参加工作的姊妹',
    isAnonymous: true,
    content: '新入职跨国团队，业务压力很大，常常失眠焦虑。求主赐我平静安稳的心，有智慧处理复杂的人际关系，无论顺境逆境都记得为主做见证。',
    category: '学业与职场',
    amenCount: 65,
    createdAt: '5小时前',
  },
  {
    id: 'p-3',
    author: '陈牧师一家',
    isAnonymous: false,
    content: '为我们在云南偏远山区宣教培训的同工团队祈祷，山路崎岖时常有落石，愿主的使者安营扎寨四围看顾，使福音真光照亮苗族与彝族村寨。',
    category: '宣教与福音',
    amenCount: 112,
    createdAt: '昨天',
  },
  {
    id: 'p-4',
    author: '感恩的张姊妹',
    isAnonymous: false,
    content: '感恩赞美主！经过三年的恳切祷告，我和丈夫终于迎来了健康可爱的宝宝。感谢教会众弟兄姊妹这几年来的代祷与扶持，一切荣耀归给在天上的父！',
    category: '感恩赞美',
    amenCount: 142,
    createdAt: '2天前',
    isAnswered: true,
  },
];

export const PASTORS_DATA: Pastor[] = [
  {
    id: 'pastor-1',
    name: '李恩宏 牧师',
    title: '主任牧师 (Senior Pastor)',
    role: '主理全堂牧养、讲道及教会远景规划',
    bio: '毕业于新加坡三一神学院道学硕士（M.Div.），服侍逾二十年。讲道平实透彻，长于释经式讲道与教牧辅导，热心于推动社区慈惠关怀与青年门训。',
    verse: '“我却不以性命为念，也不看为宝贵，只要行完我的路程，成就我从主耶稣所领受的职事，证明神恩惠的福音。”（使徒行传 20:24）',
  },
  {
    id: 'pastor-2',
    name: '陈雅歌 牧师',
    title: '副主任牧师 (Associate Pastor)',
    role: '主管关怀事工、家庭婚姻门训及姊妹团契',
    bio: '神学硕士，专攻基督教家庭辅导。长期致力于促进夫妻亲密关系与青少年亲子沟通，著有家庭灵修手册，常年在各地主领婚姻营会。',
    verse: '“至于我和我家，我们必定事奉耶和华。”（约书亚记 24:15）',
  },
  {
    id: 'pastor-3',
    name: '周道明 传道',
    title: '青年事工传道 (Youth Ministry Pastor)',
    role: '主管青年团契、校园事工及现代敬拜赞美',
    bio: '毕业于神学院基督教教育系，富有亲和力与音乐恩赐。善于带领年轻人用真理剖析当代文化思潮，陪伴大中学生建立终身坚定的信仰基石。',
    verse: '“不可叫人小看你年轻，总要在言语、行为、爱心、信心、清洁上，都作信徒的榜样。”（提摩太前书 4:12）',
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    category: '初次来访',
    question: '我不是基督徒，也没有宗教背景，可以来参加聚会吗？',
    answer: '非常欢迎！无论您的信仰背景、生活经历或对信仰抱有什么疑问，意大利普拉托伯特利教会的大门向所有人敞开。您可以像普通朋友一样安静聆听诗歌与讲道，不用担心会有任何压力。'
  },
  {
    category: '初次来访',
    question: '参加崇拜需要穿很正式的衣服吗？',
    answer: '不需要。上帝看重的是人内心的真诚，而不是外在衣着的华丽。无论是衬衫、T恤、牛仔裤还是休闲便装，只要端庄舒适即可。'
  },
  {
    category: '聚会安排',
    question: '崇拜过程中有奉献环节，新朋友必须奉献金钱吗？',
    answer: '绝对不需要！奉献是已经认识并相信耶稣的基督徒对上帝恩典怀着感恩之心的自愿回应。作为新朋友，您来到我们当中就是我们最大的荣幸，请安心享受聚会，切勿感到任何奉献压力。'
  },
  {
    category: '家庭与孩子',
    question: '我带着年幼的孩子，会影响聚会秩序吗？',
    answer: '完全不用担心！教会二楼设有专门的“儿童主日学”和“母婴亲子室”，配有柔软防摔地垫、玩具、消毒设施及大屏实时转播。专业的爱心老师会精心照顾孩子，让您可以专心参与敬拜。'
  },
  {
    category: '交通与停车',
    question: '教会如何到达？自驾车好停车吗？',
    answer: '教会紧邻地铁1号线/18号线“世纪城站”B出口，步行约280米即达；大厦地下停车场配有充足车位，聚会信徒凭教会接待处扫码可享3小时免费停车福利。'
  },
];
