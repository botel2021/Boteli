import React, { useState, useEffect } from 'react';
import {
  Timer,
  Calendar,
  Clock,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { CountdownConfig } from '../../types';

interface CountdownConfigPanelProps {
  countdownForm: CountdownConfig;
  setCountdownForm: React.Dispatch<React.SetStateAction<CountdownConfig>>;
  onSave: (e: React.FormEvent) => void;
  churchName: string;
}

export const CountdownConfigPanel: React.FC<CountdownConfigPanelProps> = ({
  countdownForm,
  setCountdownForm,
  onSave,
  churchName
}) => {
  // Live preview timer calculation
  const [previewTimeLeft, setPreviewTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isPreviewInProgress, setIsPreviewInProgress] = useState(false);

  useEffect(() => {
    const calculatePreview = () => {
      const now = new Date();

      if (countdownForm.mode === 'custom') {
        const target = new Date(countdownForm.customTargetDate);
        const diff = target.getTime() - now.getTime();

        if (isNaN(diff)) {
          setPreviewTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setIsPreviewInProgress(false);
          return;
        }

        if (diff <= 0 && diff > -3 * 3600 * 1000) {
          setIsPreviewInProgress(true);
          setPreviewTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        setIsPreviewInProgress(false);
        if (diff > 0) {
          setPreviewTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
          });
        } else {
          setPreviewTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } else {
        const targetDay = countdownForm.weeklyDay ?? 0;
        const [targetHourStr, targetMinStr] = (countdownForm.weeklyTime || '10:00').split(':');
        const targetHour = parseInt(targetHourStr, 10) || 10;
        const targetMinute = parseInt(targetMinStr, 10) || 0;
        const durationHours = countdownForm.weeklyDurationHours || 3;

        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeMinutes = currentHour * 60 + currentMinute;
        const targetStartTimeMinutes = targetHour * 60 + targetMinute;
        const targetEndTimeMinutes = targetStartTimeMinutes + durationHours * 60;

        if (
          currentDay === targetDay &&
          currentTimeMinutes >= targetStartTimeMinutes &&
          currentTimeMinutes < targetEndTimeMinutes
        ) {
          setIsPreviewInProgress(true);
          setPreviewTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        setIsPreviewInProgress(false);

        let daysUntil = (targetDay - currentDay + 7) % 7;
        if (daysUntil === 0 && currentTimeMinutes >= targetStartTimeMinutes) {
          daysUntil = 7;
        }

        const nextTarget = new Date(now);
        nextTarget.setDate(now.getDate() + daysUntil);
        nextTarget.setHours(targetHour, targetMinute, 0, 0);

        const diff = nextTarget.getTime() - now.getTime();
        if (diff > 0) {
          setPreviewTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
          });
        }
      }
    };

    calculatePreview();
    const timer = setInterval(calculatePreview, 1000);
    return () => clearInterval(timer);
  }, [countdownForm]);

  const applyPreset = (preset: 'sunday' | 'saturday' | 'friday' | 'conference') => {
    if (preset === 'sunday') {
      setCountdownForm((prev) => ({
        ...prev,
        enabled: true,
        mode: 'weekly',
        weeklyDay: 0,
        weeklyTime: '10:00',
        weeklyDurationHours: 3,
        badgeText: 'Upcoming Sunday Worship',
        title: '距离本周主日崇拜还有',
        subtitle: '早堂 10:00 · 午堂 14:30 · 普拉托伯特利主堂',
        inProgressText: '今日主日崇拜现正进行中 · 欢迎亲临或线上参与'
      }));
    } else if (preset === 'saturday') {
      setCountdownForm((prev) => ({
        ...prev,
        enabled: true,
        mode: 'weekly',
        weeklyDay: 6,
        weeklyTime: '19:30',
        weeklyDurationHours: 2.5,
        badgeText: 'Youth Fellowship Service',
        title: '距离本周六青年敬拜团契还有',
        subtitle: '周六 19:30 · 普拉托二楼多功能青年敬拜厅',
        inProgressText: '青年敬拜团契现正进行中 · 欢迎青年朋友加入！'
      }));
    } else if (preset === 'friday') {
      setCountdownForm((prev) => ({
        ...prev,
        enabled: true,
        mode: 'weekly',
        weeklyDay: 5,
        weeklyTime: '20:30',
        weeklyDurationHours: 2,
        badgeText: 'Friday Prayer Meeting',
        title: '距离周五全教会守望祷告会还有',
        subtitle: '周五 20:30 · 普拉托主堂 / 线上祷告同声传道',
        inProgressText: '守望祷告会正在同心合意祈求 · 欢迎一同代求'
      }));
    } else if (preset === 'conference') {
      // 3 weeks ahead
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 14);
      futureDate.setHours(10, 0, 0, 0);
      const isoString = futureDate.toISOString().slice(0, 16);

      setCountdownForm((prev) => ({
        ...prev,
        enabled: true,
        mode: 'custom',
        customTitle: '距离2026意大利普拉托秋季培灵特会开幕还有',
        customTargetDate: isoString,
        customSubtitle: '意大利普拉托伯特利主堂现场举行 · 同步多语直播',
        badgeText: 'Special Spiritual Revival Conference',
        inProgressText: '培灵特会现正热烈开展 · 愿神丰盛恩膏充满全堂'
      }));
    }
  };

  const dayNames = [
    { day: 0, label: '星期日（主日）' },
    { day: 1, label: '星期一' },
    { day: 2, label: '星期二' },
    { day: 3, label: '星期三' },
    { day: 4, label: '星期四' },
    { day: 5, label: '星期五' },
    { day: 6, label: '星期六' }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-200 gap-3">
        <div>
          <h3 className="text-xl font-serif-sc font-bold text-stone-950 flex items-center gap-2">
            <Timer className="w-5 h-5 text-amber-700" />
            <span>首页聚会倒计时设置</span>
          </h3>
          <p className="text-xs text-stone-700 font-medium mt-0.5">
            自由控制首页顶部的倒计时模块，可设为每周主日常规敬拜或指定日期的特别节期特会
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              countdownForm.enabled
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-stone-200 text-stone-800 border border-stone-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                countdownForm.enabled ? 'bg-emerald-600 animate-pulse' : 'bg-stone-500'
              }`}
            />
            {countdownForm.enabled ? '倒计时横幅已在前台显示' : '倒计时横幅已在前台隐藏'}
          </span>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        {/* 1. Global Enable Switch & Quick Presets */}
        <div className="bg-stone-50 rounded-2xl border border-stone-300 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="text-sm font-bold text-stone-950 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={countdownForm.enabled}
                  onChange={(e) =>
                    setCountdownForm({ ...countdownForm, enabled: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 border-stone-400"
                />
                <span>启用首页顶部倒计时横幅</span>
              </label>
              <p className="text-xs text-stone-700 font-medium mt-0.5 ml-6">
                勾选后，访客打开【{churchName}】首页顶部即可看到精美的聚会倒计时
              </p>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-800 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                快捷预设：
              </span>
              <button
                type="button"
                onClick={() => applyPreset('sunday')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-stone-900 border border-stone-300 hover:border-amber-700 hover:text-amber-900 hover:bg-amber-50/50 transition-colors shadow-2xs"
              >
                主日崇拜（周日10:00）
              </button>
              <button
                type="button"
                onClick={() => applyPreset('saturday')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-stone-900 border border-stone-300 hover:border-amber-700 hover:text-amber-900 hover:bg-amber-50/50 transition-colors shadow-2xs"
              >
                周六青年团契
              </button>
              <button
                type="button"
                onClick={() => applyPreset('friday')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-stone-900 border border-stone-300 hover:border-amber-700 hover:text-amber-900 hover:bg-amber-50/50 transition-colors shadow-2xs"
              >
                周五祷告会
              </button>
              <button
                type="button"
                onClick={() => applyPreset('conference')}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-stone-900 border border-stone-300 hover:border-amber-700 hover:text-amber-900 hover:bg-amber-50/50 transition-colors shadow-2xs"
              >
                特会培灵模式
              </button>
            </div>
          </div>
        </div>

        {/* 2. Mode Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-stone-900">倒计时工作模式</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCountdownForm({ ...countdownForm, mode: 'weekly' })}
              className={`p-4 rounded-xl border text-left transition-all ${
                countdownForm.mode === 'weekly'
                  ? 'border-amber-700 bg-amber-50/80 text-amber-950 ring-2 ring-amber-700/30'
                  : 'border-stone-300 bg-white hover:border-stone-400 text-stone-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-stone-950">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>每周常规聚会循环模式（推荐）</span>
              </div>
              <p className="text-xs text-stone-700 font-medium mt-1 leading-relaxed">
                每周自动循环倒计时（例如每周日 10:00），聚会结束后自动计算下一周，无需每周手动重置。
              </p>
            </button>

            <button
              type="button"
              onClick={() => setCountdownForm({ ...countdownForm, mode: 'custom' })}
              className={`p-4 rounded-xl border text-left transition-all ${
                countdownForm.mode === 'custom'
                  ? 'border-amber-700 bg-amber-50/80 text-amber-950 ring-2 ring-amber-700/30'
                  : 'border-stone-300 bg-white hover:border-stone-400 text-stone-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-stone-950">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>指定日期特会/节期聚会模式</span>
              </div>
              <p className="text-xs text-stone-700 font-medium mt-1 leading-relaxed">
                针对复活节特会、圣诞圣乐晚会、周年培灵特会等指定具体日期和时间的单次大型活动。
              </p>
            </button>
          </div>
        </div>

        {/* 3. Mode Detailed Settings */}
        {countdownForm.mode === 'weekly' ? (
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-300 space-y-4">
            <h4 className="text-sm font-bold text-stone-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>每周常规聚会参数设置</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  聚会星期 *
                </label>
                <select
                  value={countdownForm.weeklyDay}
                  onChange={(e) =>
                    setCountdownForm({
                      ...countdownForm,
                      weeklyDay: parseInt(e.target.value, 10)
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                >
                  {dayNames.map((d) => (
                    <option key={d.day} value={d.day}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  聚会开始时间 *
                </label>
                <input
                  type="time"
                  required
                  value={countdownForm.weeklyTime}
                  onChange={(e) =>
                    setCountdownForm({ ...countdownForm, weeklyTime: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  聚会持续时长（小时）
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={countdownForm.weeklyDurationHours}
                  onChange={(e) =>
                    setCountdownForm({
                      ...countdownForm,
                      weeklyDurationHours: parseFloat(e.target.value) || 3
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
                <span className="text-[11px] text-stone-700 font-medium mt-0.5 block">
                  崇拜期间前台将自动显示“崇拜正在进行”
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  倒计时主标题文案
                </label>
                <input
                  type="text"
                  value={countdownForm.title}
                  onChange={(e) =>
                    setCountdownForm({ ...countdownForm, title: e.target.value })
                  }
                  placeholder="如：距离本周主日崇拜还有"
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  堂次与地点补充说明
                </label>
                <input
                  type="text"
                  value={countdownForm.subtitle}
                  onChange={(e) =>
                    setCountdownForm({ ...countdownForm, subtitle: e.target.value })
                  }
                  placeholder="如：早堂 10:00 · 午堂 14:30 · 普拉托伯特利主堂"
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-300 space-y-4">
            <h4 className="text-sm font-bold text-stone-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>指定特会/日期参数设置</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  特会目标日期与开始时间 *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={countdownForm.customTargetDate}
                  onChange={(e) =>
                    setCountdownForm({
                      ...countdownForm,
                      customTargetDate: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1">
                  特会主标题文案 *
                </label>
                <input
                  type="text"
                  required
                  value={countdownForm.customTitle}
                  onChange={(e) =>
                    setCountdownForm({
                      ...countdownForm,
                      customTitle: e.target.value
                    })
                  }
                  placeholder="如：距离2026普拉托华人培灵特会开幕还有"
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 mb-1">
                特会地点与详细备注
              </label>
              <input
                type="text"
                value={countdownForm.customSubtitle}
                onChange={(e) =>
                  setCountdownForm({
                    ...countdownForm,
                    customSubtitle: e.target.value
                  })
                }
                placeholder="如：意大利普拉托伯特利主堂现场举行 · 同步线上直播"
                className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
              />
            </div>
          </div>
        )}

        {/* 4. Common Copywriting & In-Progress text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-900 mb-1">
              顶部英文字母角标 / 徽章文案
            </label>
            <input
              type="text"
              value={countdownForm.badgeText}
              onChange={(e) =>
                setCountdownForm({ ...countdownForm, badgeText: e.target.value })
              }
              placeholder="如：Upcoming Sunday Worship"
              className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-900 mb-1">
              聚会正在进行中文案
            </label>
            <input
              type="text"
              value={countdownForm.inProgressText}
              onChange={(e) =>
                setCountdownForm({ ...countdownForm, inProgressText: e.target.value })
              }
              placeholder="如：今日主日崇拜现正进行中 · 欢迎亲临或线上参与"
              className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-stone-400 bg-white text-stone-950 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 shadow-2xs"
            />
          </div>
        </div>

        {/* 5. Live Visual Preview Card */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>前台首页展示效果实时预览</span>
            </label>
            <span className="text-[11px] text-stone-700 font-semibold">所见即所得</span>
          </div>

          <div className="bg-stone-900 rounded-2xl border border-stone-700/70 p-5 sm:p-6 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold font-cinzel">
                    {countdownForm.badgeText || 'Upcoming Sunday Worship'}
                  </div>
                  <div className="text-base sm:text-lg font-serif-sc font-semibold text-stone-100">
                    {isPreviewInProgress
                      ? countdownForm.inProgressText || '今日主日崇拜现正进行中'
                      : countdownForm.mode === 'custom'
                      ? countdownForm.customTitle
                      : `${countdownForm.title || '距离本周主日崇拜还有'}（${countdownForm.weeklyTime || '10:00'}）`}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    {countdownForm.mode === 'custom'
                      ? countdownForm.customSubtitle
                      : countdownForm.subtitle || '早堂 10:00 · 午堂 14:30 · 普拉托伯特利主堂'}
                  </div>
                </div>
              </div>

              {/* Timer Boxes or In-Progress */}
              {isPreviewInProgress ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{countdownForm.inProgressText || '崇拜正在进行 · 欢迎亲临或线上参与'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 text-center self-start md:self-auto">
                  <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                    <div className="text-lg sm:text-xl font-bold font-mono text-amber-300">
                      {previewTimeLeft.days}
                    </div>
                    <div className="text-[10px] text-stone-400 uppercase">天</div>
                  </div>
                  <span className="text-stone-600 font-bold">:</span>
                  <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                    <div className="text-lg sm:text-xl font-bold font-mono text-stone-100">
                      {String(previewTimeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-stone-400 uppercase">时</div>
                  </div>
                  <span className="text-stone-600 font-bold">:</span>
                  <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                    <div className="text-lg sm:text-xl font-bold font-mono text-stone-100">
                      {String(previewTimeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-stone-400 uppercase">分</div>
                  </div>
                  <span className="text-stone-600 font-bold">:</span>
                  <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                    <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">
                      {String(previewTimeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-stone-400 uppercase">秒</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6. Save Action Button */}
        <div className="pt-4 flex items-center justify-between border-t border-stone-200">
          <button
            type="button"
            onClick={() => applyPreset('sunday')}
            className="px-4 py-2 rounded-xl border border-stone-300 text-stone-800 font-semibold hover:bg-stone-100 text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
            <span>重置为默认主日倒计时</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>保存倒计时设置并生效</span>
          </button>
        </div>
      </form>
    </div>
  );
};
