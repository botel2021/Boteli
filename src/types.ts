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
