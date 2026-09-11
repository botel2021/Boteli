import React from 'react';
import {
  SlidersHorizontal,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Layers,
  Clock,
  Timer,
  BookOpen,
  Headphones,
  Users,
  Compass,
  Heart,
  Calendar,
  Church,
  MapPin,
  Image as ImageIcon,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ModuleVisibilityConfig } from '../../types';

interface ModuleVisibilityPanelProps {
  visibility: ModuleVisibilityConfig;
  onToggle: (moduleKey: keyof ModuleVisibilityConfig) => void;
  onUpdateAll: (config: ModuleVisibilityConfig) => void;
  onShowSavedToast: () => void;
  churchName: string;
}

interface ModuleDefinition {
  key: keyof ModuleVisibilityConfig;
  name: string;
  nameEn: string;
  sectionId: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  impactNotice: string;
  category: '核心展示' | '崇拜牧养' | '团契互动' | '堂务联络';
}

export const ModuleVisibilityPanel: React.FC<ModuleVisibilityPanelProps> = ({
  visibility,
  onToggle,
  onUpdateAll,
  onShowSavedToast,
  churchName
}) => {
  const modules: ModuleDefinition[] = [
    {
      key: 'hero',
      name: '顶部宏伟欢迎横幅 (Hero)',
      nameEn: 'Sanctuary Hero Welcome & Call to Action',
      sectionId: 'hero',
      icon: ImageIcon,
      category: '核心展示',
      description: '全屏大图教会主堂背景、核心经文、中意双语教会名及快捷行动按钮（线上直播与预约）。',
      impactNotice: '关闭后前台将直接从下一个启用的模块开始展示。'
    },
    {
      key: 'countdown',
      name: '聚会/特会倒计时横幅 (Countdown)',
      nameEn: 'Worship Countdown Banner',
      sectionId: 'countdown-banner',
      icon: Timer,
      category: '核心展示',
      description: '位于首页顶部的高亮倒计时模块，支持每周主日常规倒计时或指定日期的秋季培灵特会。',
      impactNotice: '关闭后将隐藏顶部的聚会倒计时横幅，也可在【倒计时设置】标签中调整详细参数。'
    },
    {
      key: 'dailyVerse',
      name: '每日经文金句与灵修 (Daily Verse)',
      nameEn: 'Daily Bible Verse & Devotional Reflection',
      sectionId: 'daily-verse',
      icon: BookOpen,
      category: '崇拜牧养',
      description: '每日圣经金句卡片、灵修默想、经文分类徽章及一键复制分享功能。',
      impactNotice: '关闭后前台将不展示每日金句卡片，顶部导航栏对应链接将同步隐藏。'
    },
    {
      key: 'worshipSchedule',
      name: '常规崇拜聚会时间表 (Schedules)',
      nameEn: 'Worship Service Schedules & Languages',
      sectionId: 'worship-schedule',
      icon: Clock,
      category: '崇拜牧养',
      description: '主日早堂、午堂、青年敬拜团契、全教会守望祷告会等聚会时间、地点、语言及线上直播入口。',
      impactNotice: '关闭后前台不展示崇拜日程板块，顶部导航栏“崇拜时间”项将同步隐藏。'
    },
    {
      key: 'sermons',
      name: '主日讲道与影音录音 (Sermons)',
      nameEn: 'Sermon Audio Player & Outlines',
      sectionId: 'sermons',
      icon: Headphones,
      category: '崇拜牧养',
      description: '在线讲道录音试听播放器、讲道大纲抽屉、经文引用及讲员系列信息列表。',
      impactNotice: '关闭后前台不展示讲道录音板块，顶部导航栏“主日讲道”项将同步隐藏。'
    },
    {
      key: 'ministries',
      name: '团契事工与分龄牧养 (Ministries)',
      nameEn: 'Ministries & Fellowship Groups',
      sectionId: 'ministries',
      icon: Users,
      category: '团契互动',
      description: '儿童主日学、青年团契、职场夫妻小组、长者关怀及敬拜赞美团等团契聚会详情。',
      impactNotice: '关闭后前台不展示团契事工介绍，顶部导航栏“团契事工”项将同步隐藏。'
    },
    {
      key: 'visitorGuide',
      name: '新朋友指南与到访预约 (Visitor Guide)',
      nameEn: 'Newcomer FAQ & RSVP Form',
      sectionId: 'visitor-guide',
      icon: Compass,
      category: '团契互动',
      description: '新朋友初访常见问答、迎新关怀流程以及在线填写到访人数与日期的预约表单。',
      impactNotice: '关闭后前台不展示新朋友指南与预约表，顶部导航栏“新朋友指南”项将同步隐藏。'
    },
    {
      key: 'prayerWall',
      name: '同心代祷墙与代求信箱 (Prayer Wall)',
      nameEn: 'Intercessory Prayer Wall & Requests',
      sectionId: 'prayer-wall',
      icon: Heart,
      category: '团契互动',
      description: '全教会信徒代祷心愿墙、阿们同心代祷计数以及线上实名/匿名提交代祷信项表单。',
      impactNotice: '关闭后前台不展示代祷墙板块，顶部导航栏“同心代祷”项将同步隐藏。'
    },
    {
      key: 'events',
      name: '教会特别活动与节期日程 (Events)',
      nameEn: 'Church Calendar & Upcoming Retreats',
      sectionId: 'events',
      icon: Calendar,
      category: '崇拜牧养',
      description: '复活节特别圣乐崇拜、青年秋季退修营、圣乐赞美特会及义诊服侍等活动日程与报名须知。',
      impactNotice: '关闭后前台不展示活动日程板块，顶部导航栏“教会活动”项将同步隐藏。'
    },
    {
      key: 'aboutUs',
      name: '关于教会、信条与教牧团队 (About)',
      nameEn: 'About Church, Creed & Pastoral Staff',
      sectionId: 'about-us',
      icon: Church,
      category: '堂务联络',
      description: '教会发展简史、使徒信经信仰立场宣告、主任牧师及教牧同工履历介绍。',
      impactNotice: '关闭后前台不展示关于教会与教牧板块，顶部导航栏“关于教会”项将同步隐藏。'
    },
    {
      key: 'contact',
      name: '聚会地点交通与教牧联络 (Contact)',
      nameEn: 'Location, Public Transit & Contact Info',
      sectionId: 'contact',
      icon: MapPin,
      category: '堂务联络',
      description: '主堂意大利详细地址、公共交通指南、教会电话/邮箱、办公时间及高德/谷歌地图卡片。',
      impactNotice: '关闭后前台不展示地址交通板块，顶部导航栏“来访交通”项将同步隐藏。'
    }
  ];

  // Calculate active counts
  const totalCount = modules.length;
  const activeCount = modules.filter((m) => visibility[m.key]).length;

  const handleToggleModule = (key: keyof ModuleVisibilityConfig) => {
    onToggle(key);
    onShowSavedToast();
  };

  const handleShowAll = () => {
    const allOn: ModuleVisibilityConfig = {
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
    onUpdateAll(allOn);
    onShowSavedToast();
  };

  const handleResetRecommended = () => {
    const recommended: ModuleVisibilityConfig = {
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
    onUpdateAll(recommended);
    onShowSavedToast();
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-700/10 text-amber-800 rounded-xl">
              <SlidersHorizontal className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="text-xl font-serif-sc font-bold text-stone-950 flex items-center gap-2">
                <span>前台模块显隐自由控制</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold">
                  自由开关
                </span>
              </h3>
              <p className="text-xs text-stone-700 font-medium mt-0.5">
                无需修改代码，自由选择各板块在【{churchName}】前台首页的显示与隐藏，改动即时生效。
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={handleShowAll}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>一键全部开启</span>
          </button>
          <button
            type="button"
            onClick={handleResetRecommended}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
            <span>恢复默认</span>
          </button>
        </div>
      </div>

      {/* 2. Global Status & Notice Card */}
      <div className="bg-stone-50 rounded-2xl border border-stone-300 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-stone-950">当前前台模块展示状态</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                已启用 {activeCount} / {totalCount} 个模块
              </span>
            </div>
            <p className="text-xs text-stone-700 font-medium mt-0.5">
              关闭某个模块后，该板块将从前台主页隐藏；同时顶部导航栏与页脚快捷链接将自动剔除，确保访客浏览无断层。
            </p>
          </div>
        </div>

        {/* Visual page flow preview pill chain */}
        <div className="flex items-center gap-1 flex-wrap text-[11px] font-mono font-medium">
          {modules.map((m, idx) => {
            const isVisible = visibility[m.key];
            return (
              <React.Fragment key={m.key}>
                <span
                  className={`px-2 py-0.5 rounded-md border transition-all ${
                    isVisible
                      ? 'bg-white text-stone-950 border-stone-300 shadow-2xs font-semibold'
                      : 'bg-stone-200 text-stone-500 border-stone-300 line-through'
                  }`}
                  title={`${m.name}: ${isVisible ? '已显示' : '已隐藏'}`}
                >
                  {m.name.split(' ')[0]}
                </span>
                {idx < modules.length - 1 && (
                  <span className="text-stone-400">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => {
          const isVisible = visibility[mod.key];
          const Icon = mod.icon;

          return (
            <div
              key={mod.key}
              className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between ${
                isVisible
                  ? 'bg-white border-stone-300 shadow-2xs hover:border-amber-600'
                  : 'bg-stone-100/80 border-stone-300/80 opacity-80'
              }`}
            >
              <div>
                {/* Header with Title, Category, and Switch */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isVisible
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-stone-200 text-stone-600 border border-stone-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-stone-950">
                          {mod.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold border border-stone-300">
                          {mod.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-600 font-mono">
                        #{mod.sectionId} · {mod.nameEn}
                      </div>
                    </div>
                  </div>

                  {/* Switch Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleModule(mod.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                      isVisible ? 'bg-emerald-600' : 'bg-stone-400'
                    }`}
                    role="switch"
                    aria-checked={isVisible}
                    title={`点击切换${mod.name}的显隐状态`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isVisible ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-700 leading-relaxed font-medium mt-2">
                  {mod.description}
                </p>
              </div>

              {/* Bottom status indicator & toggle trigger */}
              <div className="pt-3 mt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold">
                  {isVisible ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      前台正常展示中
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 border border-stone-300 text-[11px]">
                      <EyeOff className="w-3.5 h-3.5 text-stone-600" />
                      前台已隐藏
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleModule(mod.key)}
                  className={`text-xs font-bold underline transition-colors ${
                    isVisible
                      ? 'text-stone-700 hover:text-rose-700'
                      : 'text-amber-800 hover:text-amber-950'
                  }`}
                >
                  {isVisible ? '点击隐藏此板块' : '点击恢复展示'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Tips & Help Box */}
      <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>使用提示：</span>
        </div>
        <ul className="list-disc list-inside space-y-0.5 text-stone-800 font-medium pl-1">
          <li>当教会在筹备特别节期（如圣诞、复活节培灵特会）时，可临时关闭常规讲道或团契板块，使主页聚焦于核心敬拜与特会信息；</li>
          <li>关闭某模块后，系统会自动保存至本地存储（LocalStorage），刷新网页或重新进入均会保持该显隐配置；</li>
          <li>顶部导航栏会自动隐藏已关闭模块的跳转菜单项，避免新朋友点击跳转到空白区域，确保极佳的用户浏览体验。</li>
        </ul>
      </div>
    </div>
  );
};
