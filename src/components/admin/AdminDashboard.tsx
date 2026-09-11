import React, { useState, useEffect } from 'react';
import {
  Church,
  Clock,
  Timer,
  BookOpen,
  Headphones,
  Calendar,
  Heart,
  Users,
  KeyRound,
  LogOut,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Radio,
  RotateCcw,
  Download,
  X,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useChurch } from '../../context/ChurchContext';
import { ServiceSchedule, Sermon, BibleVerse, ChurchEvent } from '../../types';
import { CountdownConfigPanel } from './CountdownConfigPanel';
import { ModuleVisibilityPanel } from './ModuleVisibilityPanel';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    churchInfo,
    updateChurchInfo,
    countdownConfig,
    updateCountdownConfig,
    moduleVisibility,
    toggleModuleVisibility,
    updateModuleVisibility,
    services,
    addService,
    updateService,
    deleteService,
    sermons,
    addSermon,
    updateSermon,
    deleteSermon,
    verses,
    addVerse,
    updateVerse,
    deleteVerse,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    prayers,
    togglePrayerAnswered,
    deletePrayer,
    rsvps,
    updateRSVPStatus,
    deleteRSVP,
    logoutAdmin,
    changeAdminPassword,
    resetToDefaults
  } = useChurch();

  const [activeTab, setActiveTab] = useState<
    'info' | 'countdown' | 'modules' | 'services' | 'sermons' | 'verses' | 'events' | 'rsvps' | 'prayers' | 'security'
  >('info');

  const [saveToast, setSaveToast] = useState(false);

  const showSavedNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // 1. Church Info Form State
  const [infoForm, setInfoForm] = useState(churchInfo);
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateChurchInfo(infoForm);
    showSavedNotification();
  };

  // 1.1 Countdown Form State
  const [countdownForm, setCountdownForm] = useState(countdownConfig);

  useEffect(() => {
    setCountdownForm(countdownConfig);
  }, [countdownConfig]);

  const handleSaveCountdown = (e: React.FormEvent) => {
    e.preventDefault();
    updateCountdownConfig(countdownForm);
    showSavedNotification();
  };

  // 2. Service Modal State
  const [editingService, setEditingService] = useState<ServiceSchedule | null>(null);
  const [isNewService, setIsNewService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceSchedule, 'id'>>({
    name: '',
    nameEn: '',
    day: '每周日',
    time: '09:00 - 10:30',
    location: '主堂',
    language: '普通话',
    targetGroup: '全教会信徒',
    description: '',
    isOnlineAvailable: true,
    color: 'emerald'
  });

  const handleOpenNewService = () => {
    setIsNewService(true);
    setEditingService(null);
    setServiceForm({
      name: '',
      nameEn: '',
      day: '每周日',
      time: '09:00 - 10:30',
      location: '主堂大礼堂',
      language: '普通话',
      targetGroup: '适合成年人与家庭',
      description: '',
      isOnlineAvailable: true,
      color: 'emerald'
    });
  };

  const handleOpenEditService = (s: ServiceSchedule) => {
    setIsNewService(false);
    setEditingService(s);
    setServiceForm({ ...s });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewService) {
      addService(serviceForm);
    } else if (editingService) {
      updateService(editingService.id, serviceForm);
    }
    setEditingService(null);
    setIsNewService(false);
    showSavedNotification();
  };

  // 3. Sermon Modal State
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [isNewSermon, setIsNewSermon] = useState(false);
  const [sermonForm, setSermonForm] = useState<Omit<Sermon, 'id'>>({
    title: '',
    series: '',
    speaker: '李恩宏 主任牧师',
    date: '2026年9月',
    scripture: '',
    duration: '40 分钟',
    summary: '',
    keyPoints: ['', '', '', ''],
    audioSampleDurationSec: 2400
  });

  const handleOpenNewSermon = () => {
    setIsNewSermon(true);
    setEditingSermon(null);
    setSermonForm({
      title: '',
      series: '作主门徒系列',
      speaker: '李恩宏 主任牧师',
      date: `${new Date().getFullYear()}年${new Date().getMonth() + 1}月`,
      scripture: '',
      duration: '40 分钟',
      summary: '',
      keyPoints: ['一、', '二、', '三、', '四、'],
      audioSampleDurationSec: 2400
    });
  };

  const handleOpenEditSermon = (sm: Sermon) => {
    setIsNewSermon(false);
    setEditingSermon(sm);
    setSermonForm({ ...sm });
  };

  const handleSaveSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewSermon) {
      addSermon(sermonForm);
    } else if (editingSermon) {
      updateSermon(editingSermon.id, sermonForm);
    }
    setEditingSermon(null);
    setIsNewSermon(false);
    showSavedNotification();
  };

  // 4. Verse State
  const [editingVerse, setEditingVerse] = useState<BibleVerse | null>(null);
  const [isNewVerse, setIsNewVerse] = useState(false);
  const [verseForm, setVerseForm] = useState<Omit<BibleVerse, 'id'>>({
    verse: '',
    reference: '',
    category: '安息与安慰',
    reflection: ''
  });

  const handleSaveVerse = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewVerse) {
      addVerse(verseForm);
    } else if (editingVerse) {
      updateVerse(editingVerse.id, verseForm);
    }
    setEditingVerse(null);
    setIsNewVerse(false);
    showSavedNotification();
  };

  // 5. Events State
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [eventForm, setEventForm] = useState<Omit<ChurchEvent, 'id'>>({
    title: '',
    date: '2026年10月',
    dayOfWeek: '主日',
    time: '14:00 - 16:30',
    location: '主堂大礼堂',
    category: '特会',
    description: '',
    speakerOrHost: '教牧团',
    requiresRegistration: true
  });

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewEvent) {
      addEvent(eventForm);
    } else if (editingEvent) {
      updateEvent(editingEvent.id, eventForm);
    }
    setEditingEvent(null);
    setIsNewEvent(false);
    showSavedNotification();
  };

  // 6. Security State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setPwdMsg('新密码长度不能少于4位');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg('两次输入的密码不一致');
      return;
    }
    changeAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setPwdMsg('管理密码修改成功，请牢记新密码！');
    showSavedNotification();
  };

  const tabs = [
    { id: 'info', label: '基本资料', icon: Church, count: undefined },
    { id: 'countdown', label: '倒计时设置', icon: Timer, count: undefined },
    { id: 'modules', label: '模块显隐控制', icon: SlidersHorizontal, count: undefined },
    { id: 'services', label: '崇拜日程', icon: Clock, count: services.length },
    { id: 'sermons', label: '主日讲道', icon: Headphones, count: sermons.length },
    { id: 'verses', label: '每日金句', icon: BookOpen, count: verses.length },
    { id: 'events', label: '活动特会', icon: Calendar, count: events.length },
    { id: 'rsvps', label: '到访预约', icon: Users, count: rsvps.length },
    { id: 'prayers', label: '代祷审核', icon: Heart, count: prayers.length },
    { id: 'security', label: '密码设置', icon: Shield, count: undefined },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-700 flex items-center justify-center text-amber-100 font-bold">
              ✝
            </div>
            <div>
              <div className="text-sm font-serif-sc font-bold text-white flex items-center gap-2">
                <span>{churchInfo.name} · 教务管理系统</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                  CMS v2.0
                </span>
              </div>
              <div className="text-[11px] text-stone-400">
                实时同步 · 修改即时在前台生效
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回前台主页预览</span>
            </button>

            <button
              onClick={() => {
                if (confirm('确认退出教务管理后台？')) {
                  logoutAdmin();
                  onBackToSite();
                }
              }}
              className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-stone-300 p-3 shadow-xs space-y-1 sticky top-24">
            <div className="px-3 py-2 text-[11px] font-bold text-stone-600 uppercase tracking-wider font-cinzel">
              Management Modules
            </div>
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-700 text-white font-bold shadow-xs'
                      : 'text-stone-900 hover:bg-stone-100 hover:text-stone-950'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-stone-700'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-900'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          {/* TAB 1: Church Info */}
          {activeTab === 'info' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    教会基本资料与联络信息
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    修改教会名称、主题经文、地址、电话及主日直播地址
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveInfo} className="space-y-5 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      教会中文名称 *
                    </label>
                    <input
                      type="text"
                      required
                      value={infoForm.name}
                      onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      教会英文名称
                    </label>
                    <input
                      type="text"
                      value={infoForm.nameEn}
                      onChange={(e) => setInfoForm({ ...infoForm, nameEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    宗旨与座右铭 (Motto)
                  </label>
                  <input
                    type="text"
                    value={infoForm.motto}
                    onChange={(e) => setInfoForm({ ...infoForm, motto: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    年度/主页金句主题 (Theme Scripture)
                  </label>
                  <textarea
                    rows={2}
                    value={infoForm.bibleTheme}
                    onChange={(e) => setInfoForm({ ...infoForm, bibleTheme: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      联系电话
                    </label>
                    <input
                      type="text"
                      value={infoForm.phone}
                      onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      联系邮箱
                    </label>
                    <input
                      type="email"
                      value={infoForm.email}
                      onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    实体园区地址
                  </label>
                  <input
                    type="text"
                    value={infoForm.address}
                    onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      线上直播房间地址/提示
                    </label>
                    <input
                      type="text"
                      value={infoForm.liveStreamUrl}
                      onChange={(e) => setInfoForm({ ...infoForm, liveStreamUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      教牧值班时间
                    </label>
                    <input
                      type="text"
                      value={infoForm.pastoralHours}
                      onChange={(e) => setInfoForm({ ...infoForm, pastoralHours: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>保存资料并同步至前台</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: Countdown Config */}
          {activeTab === 'countdown' && (
            <CountdownConfigPanel
              countdownForm={countdownForm}
              setCountdownForm={setCountdownForm}
              onSave={handleSaveCountdown}
              churchName={churchInfo.name}
            />
          )}

          {/* TAB: Module Visibility Config */}
          {activeTab === 'modules' && (
            <ModuleVisibilityPanel
              visibility={moduleVisibility}
              onToggle={toggleModuleVisibility}
              onUpdateAll={updateModuleVisibility}
              onShowSavedToast={showSavedNotification}
              churchName={churchInfo.name}
            />
          )}

          {/* TAB 2: Services Schedule */}
          {activeTab === 'services' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    主日崇拜与聚会日程管理
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    管理早堂、午堂、青年与周间聚会的时间和堂次
                  </p>
                </div>
                <button
                  onClick={handleOpenNewService}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加新聚会堂次</span>
                </button>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl border border-stone-300 bg-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300">
                          {service.day}
                        </span>
                        <span className="font-mono text-xs font-bold text-stone-950">
                          {service.time}
                        </span>
                        {service.isOnlineAvailable && (
                          <span className="text-[11px] text-emerald-950 bg-emerald-100 font-bold px-2 py-0.5 rounded border border-emerald-300">
                            直播支持
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-serif-sc font-bold text-stone-950">
                        {service.name}
                      </h4>
                      <p className="text-xs text-stone-800 font-medium mt-1">
                        {service.location} · {service.language} · {service.targetGroup}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditService(service)}
                        className="p-2 text-stone-700 hover:text-amber-900 hover:bg-stone-200/80 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`确定删除聚会【${service.name}】吗？`)) {
                            deleteService(service.id);
                            showSavedNotification();
                          }
                        }}
                        className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Sermons */}
          {activeTab === 'sermons' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    主日讲道与影音发布
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    录入最新讲道主题、经文、讲员及四大提纲
                  </p>
                </div>
                <button
                  onClick={handleOpenNewSermon}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>发布新讲道篇目</span>
                </button>
              </div>

              <div className="space-y-4">
                {sermons.map((sermon) => (
                  <div
                    key={sermon.id}
                    className="p-5 rounded-2xl border border-stone-300 bg-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="text-amber-900 font-bold">{sermon.series}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-800 font-bold">{sermon.date}</span>
                      </div>
                      <h4 className="text-base font-serif-sc font-bold text-stone-950">
                        {sermon.title}
                      </h4>
                      <div className="text-xs text-stone-900 font-medium mt-1">
                        讲员：{sermon.speaker} | 经文：{sermon.scripture} | 时长：{sermon.duration}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditSermon(sermon)}
                        className="p-2 text-stone-700 hover:text-amber-900 hover:bg-stone-200/80 rounded-lg"
                        title="编辑讲道"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`确定删除讲道【${sermon.title}】吗？`)) {
                            deleteSermon(sermon.id);
                            showSavedNotification();
                          }
                        }}
                        className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                        title="删除讲道"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Daily Verses */}
          {activeTab === 'verses' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    每日金句与灵修管理
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    维护每日轮播展示的圣经经文与教牧灵修笔记
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsNewVerse(true);
                    setEditingVerse(null);
                    setVerseForm({
                      verse: '',
                      reference: '',
                      category: '安息与安慰',
                      reflection: ''
                    });
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加新金句</span>
                </button>
              </div>

              <div className="space-y-4">
                {verses.map((v) => (
                  <div
                    key={v.id}
                    className="p-5 rounded-2xl border border-stone-300 bg-stone-50 flex items-start justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-950 text-xs rounded-md font-bold border border-amber-300">
                        {v.category}
                      </span>
                      <p className="font-serif-sc text-sm text-stone-950 font-medium my-2 italic">
                        “{v.verse}”
                      </p>
                      <div className="text-xs text-amber-900 font-bold">
                        —— {v.reference}
                      </div>
                      <div className="text-xs text-stone-800 font-medium mt-1">
                        灵修：{v.reflection}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsNewVerse(false);
                          setEditingVerse(v);
                          setVerseForm({ ...v });
                        }}
                        className="p-2 text-stone-700 hover:text-amber-900 hover:bg-stone-200/80 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('确认删除此节经文？')) {
                            deleteVerse(v.id);
                            showSavedNotification();
                          }
                        }}
                        className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Events */}
          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    特别聚会与活动日历
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    管理受洗崇拜、培灵特会、长者慰问与青年户外活动
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsNewEvent(true);
                    setEditingEvent(null);
                    setEventForm({
                      title: '',
                      date: '2026年10月',
                      dayOfWeek: '主日',
                      time: '14:00 - 16:30',
                      location: '主堂大礼堂',
                      category: '特会',
                      description: '',
                      speakerOrHost: '教牧团',
                      requiresRegistration: true
                    });
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>添加新活动</span>
                </button>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 rounded-2xl border border-stone-300 bg-stone-50 flex items-start justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 text-xs font-bold border border-amber-300">
                          {event.category}
                        </span>
                        <span className="text-xs text-stone-900 font-mono font-bold">
                          {event.date} ({event.dayOfWeek}) · {event.time}
                        </span>
                      </div>
                      <h4 className="text-base font-serif-sc font-bold text-stone-950">
                        {event.title}
                      </h4>
                      <p className="text-xs text-stone-900 font-medium mt-1">
                        {event.description}
                      </p>
                      <div className="text-xs text-stone-800 font-medium mt-2">
                        地点：{event.location} | 主持：{event.speakerOrHost || '教牧同工'} |{' '}
                        {event.requiresRegistration ? '需报名' : '自由入场'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsNewEvent(false);
                          setEditingEvent(event);
                          setEventForm({ ...event });
                        }}
                        className="p-2 text-stone-700 hover:text-amber-900 hover:bg-stone-200/80 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`确认删除活动【${event.title}】吗？`)) {
                            deleteEvent(event.id);
                            showSavedNotification();
                          }
                        }}
                        className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RSVPs */}
          {activeTab === 'rsvps' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    新朋友到访预约列表
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    查看前台新朋友提交的到访预约，安排同工提前接待
                  </p>
                </div>
                <div className="text-xs font-bold text-stone-800 font-mono bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-300">
                  共收到 {rsvps.length} 条预约
                </div>
              </div>

              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-stone-600 font-medium text-sm bg-stone-50 rounded-2xl border border-stone-200">
                  暂无新朋友预约记录
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-stone-300 shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-300 text-stone-950 font-bold text-xs">
                        <th className="py-3.5 px-4">到访姓名</th>
                        <th className="py-3.5 px-4">人数</th>
                        <th className="py-3.5 px-4">预定到访日期</th>
                        <th className="py-3.5 px-4">联系电话</th>
                        <th className="py-3.5 px-4">登记时间</th>
                        <th className="py-3.5 px-4">接待状态</th>
                        <th className="py-3.5 px-4 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-stone-50/80 transition-colors text-sm">
                          <td className="py-3.5 px-4 font-bold text-stone-950 whitespace-nowrap">
                            {rsvp.name}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-stone-900 whitespace-nowrap">
                            {rsvp.count}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-amber-900 whitespace-nowrap">
                            {rsvp.date}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-medium text-stone-900 whitespace-nowrap">
                            {rsvp.phone || '未填写'}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-stone-700 whitespace-nowrap">
                            {rsvp.createdAt}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={rsvp.status}
                              onChange={(e) =>
                                updateRSVPStatus(
                                  rsvp.id,
                                  e.target.value as '待联系' | '已安排接待' | '已到访'
                                )
                              }
                              className={`px-3 py-1 text-xs rounded-lg border font-bold focus:outline-none focus:ring-2 focus:ring-amber-600 ${
                                rsvp.status === '已到访'
                                  ? 'bg-emerald-50 text-emerald-950 border-emerald-400'
                                  : rsvp.status === '已安排接待'
                                  ? 'bg-blue-50 text-blue-950 border-blue-400'
                                  : 'bg-amber-50 text-amber-950 border-amber-400'
                              }`}
                            >
                              <option value="待联系">待联系</option>
                              <option value="已安排接待">已安排接待</option>
                              <option value="已到访">已到访</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <button
                              onClick={() => {
                                if (confirm(`确认删除【${rsvp.name}】的预约记录？`)) {
                                  deleteRSVP(rsvp.id);
                                  showSavedNotification();
                                }
                              }}
                              className="p-1.5 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                              title="删除记录"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: Prayers */}
          {activeTab === 'prayers' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    同心代祷墙信项审核与管理
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    审核信徒代祷信项、标记蒙应允感恩见证、删除不当内容
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {prayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="p-5 rounded-2xl border border-stone-300 bg-stone-50 flex items-start justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 text-xs">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-950 rounded font-bold border border-amber-300">
                          {prayer.category}
                        </span>
                        <span className="font-bold text-stone-950">
                          {prayer.isAnonymous ? '匿名肢体' : prayer.author}
                        </span>
                        <span className="text-stone-700 font-medium">· {prayer.createdAt}</span>
                        <span className="text-rose-700 flex items-center gap-1 font-mono font-bold">
                          <Heart className="w-3.5 h-3.5 fill-rose-600" />
                          {prayer.amenCount} 人阿们
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-950 leading-relaxed font-serif-sc font-medium">
                        {prayer.content}
                      </p>
                      {prayer.isAnswered && (
                        <div className="mt-2 text-xs text-emerald-900 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                          ✓ 已标记为：蒙神垂听成就
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          togglePrayerAnswered(prayer.id);
                          showSavedNotification();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                          prayer.isAnswered
                            ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                            : 'bg-stone-200 hover:bg-stone-300 text-stone-900 border-stone-300'
                        }`}
                      >
                        {prayer.isAnswered ? '已蒙应允' : '标记已蒙应允'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('确认删除该代祷信项？')) {
                            deletePrayer(prayer.id);
                            showSavedNotification();
                          }
                        }}
                        className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="删除代祷"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Security & Settings */}
          {activeTab === 'security' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-950">
                    教务管理密码与系统设置
                  </h3>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    修改后台管理密码、导出数据备份或重置演示数据
                  </p>
                </div>
              </div>

              {/* Password Change Form */}
              <div className="max-w-md bg-stone-50 p-6 rounded-2xl border border-stone-300 mb-8 shadow-2xs">
                <h4 className="text-sm font-bold text-stone-950 mb-4 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-700" />
                  <span>修改后台管理密码</span>
                </h4>

                {pwdMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs mb-4 font-medium ${
                      pwdMsg.includes('成功')
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-300'
                        : 'bg-rose-50 text-rose-950 border border-rose-300'
                    }`}
                  >
                    {pwdMsg}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      输入新管理密码
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="不少于4位字符"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 placeholder:text-stone-500 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      确认新密码
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="再次输入新密码"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white text-stone-950 placeholder:text-stone-500 shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    确认更新密码
                  </button>
                </form>
              </div>

              {/* Data Backup & Reset */}
              <div className="max-w-xl space-y-4 pt-6 border-t border-stone-200">
                <h4 className="text-sm font-bold text-stone-950">
                  数据安全与初始化
                </h4>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const data = {
                        churchInfo,
                        services,
                        sermons,
                        verses,
                        events,
                        rsvps,
                        prayers
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], {
                        type: 'application/json'
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `church_backup_${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>导出全站数据备份 (JSON)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (
                        confirm(
                          '警告：此操作将清空本地所有修改，恢复到教会出厂演示数据状态！确认重置？'
                        )
                      ) {
                        resetToDefaults();
                        alert('已恢复为默认演示数据！');
                      }
                    }}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>恢复初始默认数据</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Service Edit / New Modal */}
      {(editingService || isNewService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingService(null);
                setIsNewService(false);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif-sc font-bold text-stone-950 mb-4">
              {isNewService ? '添加新聚会堂次' : `编辑【${editingService?.name}】`}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  聚会名称 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：主日早堂崇拜"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    聚会日期 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：每周日 / 每周三"
                    value={serviceForm.day}
                    onChange={(e) => setServiceForm({ ...serviceForm, day: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    时间段 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：09:00 - 10:30"
                    value={serviceForm.time}
                    onChange={(e) => setServiceForm({ ...serviceForm, time: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    地点/会堂
                  </label>
                  <input
                    type="text"
                    value={serviceForm.location}
                    onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    使用语言
                  </label>
                  <input
                    type="text"
                    value={serviceForm.language}
                    onChange={(e) => setServiceForm({ ...serviceForm, language: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  适宜群体
                </label>
                <input
                  type="text"
                  value={serviceForm.targetGroup}
                  onChange={(e) => setServiceForm({ ...serviceForm, targetGroup: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  详细说明
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-online"
                  checked={serviceForm.isOnlineAvailable}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, isOnlineAvailable: e.target.checked })
                  }
                  className="rounded text-amber-600"
                />
                <label htmlFor="chk-online" className="text-xs font-bold text-stone-900 cursor-pointer">
                  支持线上同步网络直播
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsNewService(false);
                  }}
                  className="px-4 py-2 text-stone-700 hover:text-stone-950 text-sm font-medium hover:bg-stone-100 rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  保存聚会
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sermon Edit / New Modal */}
      {(editingSermon || isNewSermon) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingSermon(null);
                setIsNewSermon(false);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif-sc font-bold text-stone-950 mb-4">
              {isNewSermon ? '发布新讲道篇目' : `编辑讲道【${editingSermon?.title}】`}
            </h3>

            <form onSubmit={handleSaveSermon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  讲题 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：在风浪中经历出人意外的平安"
                  value={sermonForm.title}
                  onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    讲道系列
                  </label>
                  <input
                    type="text"
                    value={sermonForm.series}
                    onChange={(e) => setSermonForm({ ...sermonForm, series: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    讲员 *
                  </label>
                  <input
                    type="text"
                    required
                    value={sermonForm.speaker}
                    onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    圣经经文 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：路加福音 8:22-25"
                    value={sermonForm.scripture}
                    onChange={(e) => setSermonForm({ ...sermonForm, scripture: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    讲道日期
                  </label>
                  <input
                    type="text"
                    value={sermonForm.date}
                    onChange={(e) => setSermonForm({ ...sermonForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  内容概要 / 经文默想
                </label>
                <textarea
                  rows={3}
                  value={sermonForm.summary}
                  onChange={(e) => setServiceForm ? setSermonForm({ ...sermonForm, summary: e.target.value }) : undefined}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  讲道核心要点提纲 (分行录入)
                </label>
                {sermonForm.keyPoints.map((point, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`要点 ${idx + 1}`}
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...sermonForm.keyPoints];
                      newPoints[idx] = e.target.value;
                      setSermonForm({ ...sermonForm, keyPoints: newPoints });
                    }}
                    className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 mb-1.5 shadow-2xs"
                  />
                ))}
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSermon(null);
                    setIsNewSermon(false);
                  }}
                  className="px-4 py-2 text-stone-700 hover:text-stone-950 text-sm font-medium hover:bg-stone-100 rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  发布讲道
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Verse Edit / New Modal */}
      {(editingVerse || isNewVerse) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <button
              onClick={() => {
                setEditingVerse(null);
                setIsNewVerse(false);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif-sc font-bold text-stone-950 mb-4">
              {isNewVerse ? '录入新经文金句' : '编辑经文与默想'}
            </h3>

            <form onSubmit={handleSaveVerse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  分类主题 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：安息与安慰 / 救赎与恩典"
                  value={verseForm.category}
                  onChange={(e) => setVerseForm({ ...verseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  圣经经文内容 *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="请输入经文全文..."
                  value={verseForm.verse}
                  onChange={(e) => setVerseForm({ ...verseForm, verse: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs font-serif-sc"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  经文章节出处 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：马太福音 11:28-29"
                  value={verseForm.reference}
                  onChange={(e) => setVerseForm({ ...verseForm, reference: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs font-serif-sc"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  教牧灵修默想笔记
                </label>
                <textarea
                  rows={3}
                  placeholder="为这节经文配上一段温暖的属灵默想..."
                  value={verseForm.reflection}
                  onChange={(e) => setVerseForm({ ...verseForm, reflection: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingVerse(null);
                    setIsNewVerse(false);
                  }}
                  className="px-4 py-2 text-stone-700 hover:text-stone-950 text-sm font-medium hover:bg-stone-100 rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  保存经文
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Edit / New Modal */}
      {(editingEvent || isNewEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <button
              onClick={() => {
                setEditingEvent(null);
                setIsNewEvent(false);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif-sc font-bold text-stone-950 mb-4">
              {isNewEvent ? '发布新特别活动' : '编辑活动日程'}
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  活动标题 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：秋季全教会联合受洗感恩崇拜"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    活动日期 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：2026年9月27日"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    星期 / 时间 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：主日 14:00 - 16:30"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    分类
                  </label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        category: e.target.value as ChurchEvent['category']
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl border border-stone-400 bg-white text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  >
                    <option value="特会">特会</option>
                    <option value="团契">团契</option>
                    <option value="培训">培训</option>
                    <option value="社区">社区</option>
                    <option value="节期">节期</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    地点
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  活动描述
                </label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-reg"
                  checked={eventForm.requiresRegistration}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, requiresRegistration: e.target.checked })
                  }
                  className="rounded text-amber-600"
                />
                <label htmlFor="chk-reg" className="text-xs font-bold text-stone-900 cursor-pointer">
                  需要信徒提前在线登记报名
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingEvent(null);
                    setIsNewEvent(false);
                  }}
                  className="px-4 py-2 text-stone-700 hover:text-stone-950 text-sm font-medium hover:bg-stone-100 rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  保存活动
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Saved Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm">更新成功！已即时同步至网站前台。</span>
        </div>
      )}
    </div>
  );
};
