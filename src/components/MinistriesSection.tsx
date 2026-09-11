import React, { useState } from 'react';
import {
  Users,
  Baby,
  Flame,
  HeartHandshake,
  Music,
  Sparkles,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle,
  ArrowRight,
  X
} from 'lucide-react';
import { MINISTRIES_DATA } from '../data/churchData';
import { Ministry } from '../types';

export const MinistriesSection: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby':
        return <Baby className="w-6 h-6 text-rose-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-emerald-600" />;
      case 'Music':
        return <Music className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      default:
        return <Users className="w-6 h-6 text-amber-600" />;
    }
  };

  const handleOpenInquiry = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
    setInquiryModalOpen(true);
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', note: '' });
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('请填写您的姓名与联系方式');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep state open to show confirmation
    }, 500);
  };

  return (
    <section id="ministries" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider font-cinzel mb-3">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            Ministries & Community
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-stone-900">
            各具恩赐的事工与团契生活
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            教会不仅是每周一次的敬拜聚会，更是一个在爱中同舟共济、分享生命、各尽其职的大家庭。
            找到适合您的属灵小家，与同路人并肩同行。
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINISTRIES_DATA.map((ministry) => (
            <div
              key={ministry.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:border-amber-400 group"
            >
              <div>
                {/* Header with icon & badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-stone-100 rounded-2xl group-hover:scale-110 transition-transform">
                    {getIcon(ministry.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                    {ministry.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif-sc font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {ministry.name}
                </h3>
                <div className="text-xs text-stone-400 font-cinzel uppercase tracking-wider mb-4">
                  {ministry.enName}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {ministry.description}
                </p>

                {/* Key Info Pill Box */}
                <div className="space-y-2 bg-stone-50 p-4 rounded-2xl text-xs text-stone-600 mb-6 border border-stone-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>聚会时间：{ministry.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>地点：{ministry.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>团契负责人：{ministry.leader}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    事工特色：
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {ministry.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenInquiry(ministry)}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-amber-600 text-stone-800 hover:text-white rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>了解并联系该团契</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}

          {/* New Member Pastoral Class Card */}
          <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-medium backdrop-blur-md mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                慕道与初信专属
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-sc font-bold mb-2">
                “真理与恩典”信仰启发班
              </h3>
              <p className="text-xs text-amber-200/80 font-cinzel mb-4">Alpha & Foundations Class</p>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-6">
                专为对基督教信仰感兴趣的新朋友、慕道友设立。6周轻松课程，探讨宇宙起源、苦难的意义、耶稣基督的复活与永生盼望，无门槛自由提问。
              </p>
              <div className="space-y-2 bg-black/20 p-4 rounded-2xl text-xs text-amber-100 mb-6 backdrop-blur-xs">
                <div>📅 滚动开课：每周日午后 13:30 - 15:00</div>
                <div>📍 地点：教会二楼灵修书房</div>
                <div>☕ 包含免费咖啡、精致茶点与教材</div>
              </div>
            </div>

            <button
              onClick={() => {
                alert('已为您登记【真理与恩典信仰启发班】关注意向！\n负责牧者将在24小时内与您微信联系，提供最新一期开课信息。');
              }}
              className="w-full py-3 bg-white hover:bg-amber-100 text-stone-900 font-medium rounded-xl text-xs sm:text-sm transition-colors"
            >
              免费报名信仰启发班
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry / Join Ministry Modal */}
      {inquiryModalOpen && selectedMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif-sc font-bold text-stone-900 mb-2">
                  登记成功！欢迎融入
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  感谢您对【{selectedMinistry.name}】的关注。负责同工【{selectedMinistry.leader}】将尽快与您取得联系，邀请您参加近期的团契聚会与爱筵！
                </p>
                <button
                  onClick={() => setInquiryModalOpen(false)}
                  className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800"
                >
                  好的，期待相聚
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-amber-100 rounded-xl">
                    {getIcon(selectedMinistry.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif-sc font-bold text-stone-900">
                      申请了解【{selectedMinistry.name}】
                    </h3>
                    <div className="text-xs text-stone-500 font-cinzel">
                      Connect with {selectedMinistry.enName}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-5">
                  填写您的基本信息，团契组长将为您介绍小组详情，并为您预留本周聚会的座位与茶点。
                </p>

                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      您的姓名 / 称呼 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例如：陈弟兄 / 李姊妹 / 王朋友"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      手机号码 / 微信号 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="以便负责同工添加微信或致电"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      您的信仰背景或期望（选填）
                    </label>
                    <textarea
                      rows={3}
                      placeholder="例如：慕道初探、初次到访、想寻找家庭小组..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setInquiryModalOpen(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-800 text-sm font-medium"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                    >
                      提交意向
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
