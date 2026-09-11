import React, { useState } from 'react';
import {
  Clock,
  Radio,
  MapPin,
  Users,
  Languages,
  Info,
  CheckCircle2,
  CalendarPlus,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

interface WorshipScheduleSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const WorshipScheduleSection: React.FC<WorshipScheduleSectionProps> = ({ onNavigate }) => {
  const { services, churchInfo } = useChurch();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sunday' | 'weekday'>('all');
  const [showCalendarAddedToast, setShowCalendarAddedToast] = useState(false);

  const filteredServices = services.filter((service) => {
    if (selectedFilter === 'sunday') return service.day.includes('周日');
    if (selectedFilter === 'weekday') return !service.day.includes('周日');
    return true;
  });

  const handleAddToCalendar = (serviceName: string, serviceTime: string) => {
    setShowCalendarAddedToast(true);
    setTimeout(() => setShowCalendarAddedToast(false), 3000);
  };

  return (
    <section id="worship-schedule" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-semibold tracking-wider uppercase font-cinzel mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Worship Times & Gatherings
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-stone-900 tracking-tight">
            主日崇拜与聚会时间表
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            “当用诗章、颂词、灵歌彼此对说，口唱心和地赞美主。”（以弗所书 5:19）
            <br />
            欢迎您与家人一同来到神的殿中，瞻仰祂的荣美，在真理与圣灵中同心敬拜。
          </p>

          {/* Filter Pills */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-stone-200/80 border border-stone-300/60">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              全部聚会 ({services.length})
            </button>
            <button
              onClick={() => setSelectedFilter('sunday')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'sunday'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              主日崇拜与主日学
            </button>
            <button
              onClick={() => setSelectedFilter('weekday')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'weekday'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              周间青年与祷告会
            </button>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between group hover:border-amber-400"
            >
              <div>
                {/* Day & Live badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
                    {service.day}
                  </span>
                  {service.isOnlineAvailable ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
                      支持线上同步直播
                    </span>
                  ) : (
                    <span className="text-[11px] text-stone-400">线下实体聚会</span>
                  )}
                </div>

                {/* Service Name & English */}
                <h3 className="text-xl font-serif-sc font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-stone-400 font-cinzel uppercase tracking-wider mb-3">
                  {service.nameEn}
                </p>

                {/* Time Box */}
                <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl mb-4 text-stone-800 font-mono text-sm font-semibold border border-stone-100">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{service.time}</span>
                </div>

                {/* Location & Details */}
                <div className="space-y-2 text-xs text-stone-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{service.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{service.targetGroup}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-3 border-t border-stone-100">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Button */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => handleAddToCalendar(service.name, service.time)}
                  className="text-xs font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1.5 transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>添加日程提醒</span>
                </button>

                {service.isOnlineAvailable && (
                  <button
                    onClick={() => {
                      alert(`已开启【${service.name}】直播通道！\n直播间：${churchInfo.name}官方直播台\n会议号：889-234-7721\n密码：bethel`);
                    }}
                    className="text-xs font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>观看直播</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Streaming & Sunday Etiquette Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base sm:text-lg mb-2 font-serif-sc">
              <Radio className="w-5 h-5 text-amber-700 animate-pulse" />
              <span>无法亲临现场？欢迎参加主日线上同步崇拜</span>
            </div>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4">
              针对出差在外、身患疾病或身处异地的弟兄姊妹与慕道朋友，我们主日会同步开放在线音视频直播。崇拜前请预备安静的心，关闭打扰通知。
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  alert(`正在接入主日崇拜官方直播服务器...\n欢迎收看【${churchInfo.name}】线上敬拜！`);
                }}
                id="btn-enter-stream"
                className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Radio className="w-4 h-4" />
                <span>进入官方网络直播间</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('visitor-guide')}
                className="px-4 py-2.5 bg-white hover:bg-amber-100/50 text-stone-800 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium transition-colors"
              >
                查看初访礼仪指引
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600" />
                <span>主日聚会特别提示</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>建议提前 10-15 分钟入场安静默祷预备。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>每月首个主日举行圣餐，受洗信徒同领主的杯和饼。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>接待台提供免费圣经借阅与大字版赞美诗本。</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-amber-800">
              有特殊需要（如轮椅无障碍通道）请随时告知迎宾同工。
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Added Toast */}
      {showCalendarAddedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-500/40 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs sm:text-sm">
            已成功添加到聚会提醒！欢迎周日来到教会一同敬拜。
          </div>
        </div>
      )}
    </section>
  );
};
