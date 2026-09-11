import React, { useState } from 'react';
import {
  Heart,
  PlusCircle,
  Filter,
  CheckCircle2,
  Lock,
  Sparkles,
  Send,
  X,
  MessageCircle
} from 'lucide-react';
import { PrayerRequest } from '../types';
import { useChurch } from '../context/ChurchContext';

export const PrayerWallSection: React.FC = () => {
  const { prayers, addPrayer, incrementAmen } = useChurch();
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [amenClickedIds, setAmenClickedIds] = useState<Set<string>>(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // New prayer form state
  const [author, setAuthor] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<PrayerRequest['category']>('健康与医治');
  const [content, setContent] = useState('');
  const [isPastoralOnly, setIsPastoralOnly] = useState(false);

  const categories = [
    '全部',
    '健康与医治',
    '家庭与婚姻',
    '学业与职场',
    '灵命成长',
    '宣教与福音',
    '感恩赞美',
  ];

  const filteredPrayers = prayers.filter((p) => {
    if (activeCategory === '全部') return true;
    return p.category === activeCategory;
  });

  const handleAmenClick = (id: string) => {
    if (amenClickedIds.has(id)) {
      // already amened
      return;
    }
    setAmenClickedIds((prev) => new Set(prev).add(id));
    incrementAmen(id);
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('请输入您的代祷内容');
      return;
    }

    if (isPastoralOnly) {
      alert('已将您的代祷内容加密发送至教牧团队邮箱！李牧师与代祷同工将在每周三守望祷告会为您私密代求。');
    } else {
      addPrayer({
        author: isAnonymous ? '主内肢体（匿名）' : (author.trim() || '一位弟兄/姊妹'),
        isAnonymous,
        category,
        content: content.trim()
      });
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }

    // Reset form & close
    setAuthor('');
    setContent('');
    setIsAnonymous(false);
    setIsPastoralOnly(false);
    setShowSubmitModal(false);
  };

  return (
    <section id="prayer-wall" className="py-20 bg-stone-900 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel uppercase tracking-widest mb-3">
              <Heart className="w-3.5 h-3.5 text-amber-400" />
              Intercessory Prayer Wall · 同心代祷
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-white">
              一人不能成事，两人同心祈求
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              “凡你们在地上同心合意地求什么事，我在天上的父必为他们成全。”（马太福音 18:19）
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowSubmitModal(true)}
              id="btn-open-prayer-modal"
              className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>提交我的代祷请求</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-stone-500 shrink-0 ml-1 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prayer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrayers.map((prayer) => {
            const hasAmened = amenClickedIds.has(prayer.id);
            return (
              <div
                key={prayer.id}
                className="bg-stone-850 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-amber-300 text-[11px] font-medium border border-stone-700">
                      {prayer.category}
                    </span>
                    <span className="text-[11px] text-stone-500">{prayer.createdAt}</span>
                  </div>

                  {prayer.isAnswered && (
                    <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded-full mb-3">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>已蒙神垂听成就 · 感恩见证</span>
                    </div>
                  )}

                  <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-6 font-serif-sc">
                    {prayer.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">
                    {prayer.isAnonymous ? '主内肢体（匿名）' : prayer.author}
                  </span>

                  <button
                    onClick={() => handleAmenClick(prayer.id)}
                    className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                      hasAmened
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 cursor-default'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        hasAmened ? 'fill-rose-400 text-rose-400 scale-110' : 'text-rose-400'
                      }`}
                    />
                    <span>{hasAmened ? '已同心阿们' : '同心阿们'}</span>
                    <span className="font-mono text-amber-300 ml-0.5">({prayer.amenCount})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wednesday Prayer Meeting Callout */}
        <div className="mt-12 bg-gradient-to-r from-stone-800 via-stone-850 to-stone-800 rounded-2xl p-6 border border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">周三晚全教会守望祷告会</div>
              <div className="text-xs text-stone-400">
                每周三晚 19:30 · 副堂与线上同步，由李牧师带领全教会为每条代祷信项逐一跪下祈求
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              alert('周三祷告会线上接入信息：\n会议号：889-234-7721\n每周三晚 19:30 准时开始，欢迎同心守望！');
            }}
            className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-xl text-xs font-medium shrink-0 transition-colors"
          >
            获取会议接入号
          </button>
        </div>
      </div>

      {/* Submit Prayer Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-wider font-cinzel mb-2">
              <Heart className="w-4 h-4" />
              Prayer Request
            </div>
            <h3 className="text-xl font-serif-sc font-bold text-white mb-2">
              写下您的心愿与代祷事项
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              “你们要彼此认罪，互相代求，使你们可以得医治。”（雅各书 5:16）
            </p>

            <form onSubmit={handleSubmitPrayer} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  代祷类别 *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PrayerRequest['category'])}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="健康与医治">健康与医治</option>
                  <option value="家庭与婚姻">家庭与婚姻</option>
                  <option value="学业与职场">学业与职场</option>
                  <option value="灵命成长">灵命成长</option>
                  <option value="宣教与福音">宣教与福音</option>
                  <option value="感恩赞美">感恩赞美</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  您的称呼（如选择匿名可不填）
                </label>
                <input
                  type="text"
                  placeholder="例如：陈姊妹 / 张弟兄"
                  disabled={isAnonymous}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-sm focus:outline-none focus:border-amber-400 disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="checkbox-anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded bg-stone-800 border-stone-700 text-amber-500 focus:ring-0"
                />
                <label htmlFor="checkbox-anonymous" className="text-xs text-stone-300 cursor-pointer">
                  以匿名身份在祷告墙展示（保护个人隐私）
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  代祷详情内容 *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="请在此写下您需要弟兄姊妹同心代祷的详细内容..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-sm focus:outline-none focus:border-amber-400 placeholder:text-stone-500"
                />
              </div>

              <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="checkbox-pastoral"
                  checked={isPastoralOnly}
                  onChange={(e) => setIsPastoralOnly(e.target.checked)}
                  className="rounded bg-stone-800 border-stone-700 text-amber-500 mt-0.5"
                />
                <label htmlFor="checkbox-pastoral" className="text-xs text-stone-300 cursor-pointer leading-relaxed">
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <Lock className="w-3 h-3" />
                    仅教牧团队保密代祷
                  </span>
                  事项将不公开发布在祷告墙，仅由主任牧师与专职代祷团在周三特会闭门代求。
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-stone-400 hover:text-stone-200 text-sm"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-xl text-sm flex items-center gap-2 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>提交代祷</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs sm:text-sm">
            您的代祷事项已成功登入祷告墙，愿神在暗中察看，施恩眷顾！
          </div>
        </div>
      )}
    </section>
  );
};
