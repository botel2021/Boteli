import React, { useState } from 'react';
import {
  Compass,
  Smile,
  Coffee,
  Heart,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarCheck,
  Gift,
  CheckCircle2
} from 'lucide-react';
import { FAQS_DATA } from '../data/churchData';
import { useChurch } from '../context/ChurchContext';

export const VisitorGuideSection: React.FC = () => {
  const { addVisitorRSVP } = useChurch();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', count: '1', date: '本周日早堂' });

  const steps = [
    {
      num: '01',
      title: '到达与迎新',
      desc: '一出电梯，大厅接待台的迎宾义工会以亲切微笑迎接您，为您递上今日聚会程序单并解答任何疑问。',
      icon: Smile,
    },
    {
      num: '02',
      title: '舒适入座与敬拜',
      desc: '您可以自由选择任何喜爱的座位。大礼堂配有舒适软椅与恒温空调，大屏幕实时显示诗歌歌词与圣经经文。',
      icon: Heart,
    },
    {
      num: '03',
      title: '聆听真道与祈祷',
      desc: '庄重而温暖的释经讲道，联系当代职场与日常生活，无需担心听不懂；在安静默祷中享受心灵深处的安息。',
      icon: Compass,
    },
    {
      num: '04',
      title: '新朋友茶叙与礼物',
      desc: '崇拜结束后，诚邀您前往二楼接待室享用现磨咖啡与点心，并领取一份我们精心准备的新朋友见面祝福礼。',
      icon: Gift,
    },
  ];

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name) {
      alert('请填写您的称呼');
      return;
    }
    addVisitorRSVP({
      name: rsvpForm.name,
      count: `${rsvpForm.count} 人`,
      date: rsvpForm.date
    });
    setRsvpSuccess(true);
  };

  return (
    <section id="visitor-guide" className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider font-cinzel mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Plan Your Visit · 初次到访指南
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-stone-900">
            第一次来到教会？我们已经为您备好一切
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            来到一个陌生的环境常常令人有些局促。请放轻松，这里没有审视的目光，只有热诚的家人。
            我们准备了详尽的流程指引与解惑，期待与您在爱中相遇。
          </p>
        </div>

        {/* 4 Steps Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs relative hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-extrabold text-amber-200">
                    {step.num}
                  </span>
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-serif-sc font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two Column Section: RSVP Welcome Host + FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: RSVP Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-800 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 mb-4">
              <CalendarCheck className="w-3.5 h-3.5" />
              新朋友到访专属接待
            </div>
            <h3 className="text-2xl font-serif-sc font-bold mb-3">
              提前告诉我们，让我们专程迎接您
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              如果您愿意提前告知到访时间，我们将为您安排一位亲切热心的同工在接待处等候您，带您熟悉礼堂与设施，并为您保留前排视野优良的舒适席位。
            </p>

            {rsvpSuccess ? (
              <div className="bg-white/10 border border-emerald-400/40 rounded-2xl p-6 text-center backdrop-blur-xs">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <div className="text-lg font-bold text-white mb-1">已为您安排专属接待！</div>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  欢迎您，{rsvpForm.name}！迎宾组同工已收到通知，我们将在{rsvpForm.date}于大堂接待台等候您的到来。
                </p>
                <button
                  onClick={() => setRsvpSuccess(false)}
                  className="text-xs text-amber-300 underline"
                >
                  重新填写预约信息
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    您的称呼 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：王先生 / 李女士"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-stone-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      预计到访人数
                    </label>
                    <select
                      value={rsvpForm.count}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, count: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="1">1 人（独自前行）</option>
                      <option value="2">2 人（伴侣/朋友）</option>
                      <option value="3-4">3-4 人（家庭同行）</option>
                      <option value="5+">5 人以上团体</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      计划参加聚会
                    </label>
                    <select
                      value={rsvpForm.date}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="本周日早堂(09:00)">本周日早堂 09:00</option>
                      <option value="本周日午堂(11:00)">本周日午堂 11:00</option>
                      <option value="周六青年聚会">周六晚青年聚会</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-medium transition-colors shadow-md mt-2"
                >
                  确认到访预约 · 享受专人接待
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                新朋友茶叙区全天开放
              </span>
              <span className="flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                赠送迎新精美圣经与笔记本
              </span>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-amber-700" />
              <h3 className="text-xl font-serif-sc font-bold text-stone-900">
                新朋友常见疑问解答 (FAQ)
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-amber-400 bg-amber-50/20'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-medium text-stone-900"
                    >
                      <span className="text-sm sm:text-base font-serif-sc font-semibold">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-700 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-amber-200/40 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
