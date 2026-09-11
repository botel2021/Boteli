import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2, Ticket, X } from 'lucide-react';
import { ChurchEvent } from '../types';
import { useChurch } from '../context/ChurchContext';

export const EventsSection: React.FC = () => {
  const { events } = useChurch();
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', headCount: '1' });

  const handleOpenRegister = (event: ChurchEvent) => {
    setSelectedEvent(event);
    setRegisterSuccess(false);
    setFormData({ name: '', phone: '', headCount: '1' });
    setRegisterModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('请填写姓名与手机号');
      return;
    }
    setRegisterSuccess(true);
  };

  return (
    <section id="events" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider font-cinzel mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            Events & Gatherings · 活动日历
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-stone-900">
            教会近期特别聚会与特会
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            在日常崇拜之余，我们定期举办受洗感恩典礼、神学研经特会、社区慈惠与户外团契，丰富属灵生活。
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 hover:border-amber-400"
            >
              {/* Left Date Block */}
              <div className="sm:w-28 shrink-0 flex sm:flex-col items-center justify-center p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center gap-2 sm:gap-1">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  {event.dayOfWeek}
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-900">
                  {event.date.includes('月') ? event.date.split('年')[1] : event.date}
                </span>
                <span className="text-[11px] text-stone-500 bg-white/80 px-2 py-0.5 rounded-md mt-1">
                  {event.category}
                </span>
              </div>

              {/* Right Content Block */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif-sc font-bold text-stone-900 mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>时间：{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>地点：{event.location}</span>
                    </div>
                    {event.speakerOrHost && (
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>主持/讲员：{event.speakerOrHost}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-800">
                    {event.requiresRegistration ? '需提前报名登记' : '公开聚会 · 自由入席'}
                  </span>
                  <button
                    onClick={() => handleOpenRegister(event)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{event.requiresRegistration ? '免费报名' : '查看详情'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {registerModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {registerSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif-sc font-bold text-stone-900 mb-2">
                  报名登记已确认！
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  您已成功报名参加【{selectedEvent.title}】（{formData.headCount}人）。
                  我们已将活动时间与地点发送至您的手机，期待您的到来！
                </p>
                <button
                  onClick={() => setRegisterModalOpen(false)}
                  className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800"
                >
                  好的，已了解
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                    {selectedEvent.category}
                  </span>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-900 mt-2">
                    {selectedEvent.title}
                  </h3>
                  <div className="text-xs text-stone-500 mt-1">
                    {selectedEvent.date} · {selectedEvent.time}
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                  教会活动均为公益免费性质。请填写您的联系信息，以便同工为您预留名额和餐食/资料。
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      姓名 / 称呼 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="您的真实姓名或称呼"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      联系电话 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="用于接收活动提醒通知"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      同行人数
                    </label>
                    <select
                      value={formData.headCount}
                      onChange={(e) => setFormData({ ...formData, headCount: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                    >
                      <option value="1">1 人</option>
                      <option value="2">2 人</option>
                      <option value="3">3 人</option>
                      <option value="4+">4 人以上家庭</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setRegisterModalOpen(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-800 text-sm"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-medium shadow-sm transition-colors"
                    >
                      确认报名
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
