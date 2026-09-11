import React, { useState } from 'react';
import { BookOpen, RefreshCw, Copy, Check, Share2, Heart, Sparkles, X } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

export const DailyVerseWidget: React.FC = () => {
  const { verses, churchInfo } = useChurch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showReflection, setShowReflection] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  const currentVerse = verses[currentIndex % verses.length] || {
    id: 'default',
    verse: '神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生。',
    reference: '约翰福音 3:16',
    category: '救赎与恩典',
    reflection: '神的爱主动临到我们。'
  };

  const handleNextVerse = () => {
    setCurrentIndex((prev) => (prev + 1) % verses.length);
  };

  const handleCopy = async () => {
    const textToCopy = `【${currentVerse.reference}】\n${currentVerse.verse}\n\n— ${churchInfo.name}·每日灵修`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <section id="daily-verse" className="py-12 bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-cinzel mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Scripture of the Day · 每日金句
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-sc font-bold text-stone-100">
            在真理的话语中重新得力
          </h2>
          <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto">
            “你的话是我脚前的灯，是我路上的光。”（诗篇 119:105）
          </p>
        </div>

        {/* Verse Parchment Card */}
        <div className="relative bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Subtle decorative cross watermarks */}
          <div className="absolute top-4 right-6 text-amber-500/10 select-none pointer-events-none font-serif text-8xl font-bold">
            ✝
          </div>

          <div className="relative z-10">
            {/* Top metadata pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-800">
              <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-medium tracking-wide">
                主题：{currentVerse.category}
              </span>
              <div className="text-xs text-stone-400 font-mono">
                灵修编号 {currentIndex + 1} / {verses.length}
              </div>
            </div>

            {/* Scripture Verse Text */}
            <blockquote className="my-6">
              <p className="font-serif-sc text-xl sm:text-2xl md:text-3xl text-amber-100/95 leading-relaxed tracking-wide font-medium">
                “{currentVerse.verse}”
              </p>
              <div className="mt-4 text-right">
                <cite className="not-italic text-amber-400 font-serif-sc font-bold text-base sm:text-lg">
                  —— {currentVerse.reference}
                </cite>
              </div>
            </blockquote>

            {/* Devotional Reflection */}
            {showReflection && (
              <div className="mt-6 pt-6 border-t border-stone-800/80 bg-stone-950/40 rounded-2xl p-5 border border-stone-800/50">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  教牧灵修微默想
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-sans">
                  {currentVerse.reflection}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextVerse}
                  id="btn-next-verse"
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>换一节经文</span>
                </button>

                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className="px-3 py-2 rounded-xl bg-stone-800/60 hover:bg-stone-700/60 text-stone-300 text-xs sm:text-sm font-medium transition-colors"
                >
                  {showReflection ? '收起灵修笔记' : '查看灵修笔记'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  id="btn-copy-verse"
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 border border-amber-500/30"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '已复制经文' : '复制经文'}</span>
                </button>

                <button
                  onClick={() => setShowShareModal(true)}
                  id="btn-share-verse"
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>生成经文卡片</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Card Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Generated Card Preview */}
            <div className="bg-gradient-to-b from-stone-900 via-amber-950/20 to-stone-900 border border-amber-400/30 p-6 rounded-2xl mb-6 text-left shadow-inner">
              <div className="flex items-center justify-between text-xs text-amber-400 mb-4 pb-2 border-b border-stone-800">
                <span className="font-cinzel tracking-wider">{churchInfo.nameEn || 'BETHEL CHURCH'}</span>
                <span>✝ {churchInfo.name}</span>
              </div>
              <p className="font-serif-sc text-stone-100 text-lg leading-relaxed mb-4 italic">
                “{currentVerse.verse}”
              </p>
              <div className="text-right text-amber-300 font-serif-sc font-bold text-sm">
                —— {currentVerse.reference}
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex justify-between items-center">
                <span>每日晨更灵修</span>
                <span>愿主的恩惠与你同在</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 mb-4">
              长按或右键可截屏保存卡片，发送给肢体或分享至朋友圈
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制文字' : '复制经文文字'}
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
