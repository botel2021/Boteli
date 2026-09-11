export interface ChurchInfo {
  name: string;
  nameEn: string;
  motto: string;
  bibleTheme: string;
  address: string;
  phone: string;
  email: string;
  pastoralHours: string;
  foundedYear: string;
  sundayMainServiceTime: string;
  liveStreamUrl: string;
}

export interface VisitorRSVP {
  id: string;
  name: string;
  count: string;
  date: string;
  createdAt: string;
  phone?: string;
  status: '待联系' | '已安排接待' | '已到访';
}

export interface ServiceSchedule {
  id: string;
  name: string;
  nameEn: string;
  day: string;
  time: string;
  location: string;
  language: string;
  targetGroup: string;
  description: string;
  isOnlineAvailable: boolean;
  color: string;
}

export interface Sermon {
  id: string;
  title: string;
  series: string;
  speaker: string;
  date: string;
  scripture: string;
  duration: string;
  summary: string;
  keyPoints: string[];
  audioSampleDurationSec: number;
}

export interface BibleVerse {
  id: string;
  verse: string;
  reference: string;
  category: string;
  reflection: string;
}

export interface Ministry {
  id: string;
  name: string;
  enName: string;
  badge: string;
  leader: string;
  time: string;
  location: string;
  audience: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  dayOfWeek: string;
  time: string;
  location: string;
  category: '特会' | '团契' | '培训' | '社区' | '节期';
  description: string;
  speakerOrHost?: string;
  requiresRegistration: boolean;
}

export interface PrayerRequest {
  id: string;
  author: string;
  isAnonymous: boolean;
  content: string;
  category: '健康与医治' | '家庭与婚姻' | '学业与职场' | '灵命成长' | '宣教与福音' | '感恩赞美';
  amenCount: number;
  createdAt: string;
  isAnswered?: boolean;
}

export interface Pastor {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  verse: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface CountdownConfig {
  enabled: boolean;
  mode: 'weekly' | 'custom';
  // 每周常规模式
  weeklyDay: number; // 0 为主日/周日, 1-6 为周一至周六
  weeklyTime: string; // 格式如 "10:00"
  weeklyDurationHours: number; // 聚会时长(小时)，例如 3
  // 自定义特会/指定日期模式
  customTitle: string; // 特会名称或倒计时提示
  customTargetDate: string; // 目标ISO时间字符串，例如 "2026-10-04T10:00"
  customSubtitle: string; // 地点与说明
  // 通用文案配置
  badgeText: string; // 顶部角标徽章文案
  title: string; // 倒计时主标题
  subtitle: string; // 崇拜堂次与地点说明
  inProgressText: string; // 崇拜进行中提示文案
}

export interface ModuleVisibilityConfig {
  hero: boolean;             // 顶部宏伟欢迎横幅
  countdown: boolean;        // 聚会/特会倒计时横幅
  dailyVerse: boolean;       // 每日经文金句与灵修默想
  worshipSchedule: boolean;  // 崇拜聚会时间表
  sermons: boolean;          // 主日讲道与影音专区
  ministries: boolean;       // 团契与分龄事工
  visitorGuide: boolean;     // 新朋友指南与到访预约
  prayerWall: boolean;       // 同心代祷墙与祷告信项
  events: boolean;           // 教会特别活动与日程
  aboutUs: boolean;          // 关于教会与教牧团队
  contact: boolean;          // 聚会地点交通与联络
}

