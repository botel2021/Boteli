import React from 'react';
import { ArrowUp, Heart, Phone, Mail, MapPin, KeyRound } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { churchInfo, moduleVisibility } = useChurch();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Priestly Benediction Card */}
        <div className="mb-16 bg-gradient-to-r from-stone-900 via-amber-950/20 to-stone-900 border border-amber-500/20 rounded-3xl p-8 text-center">
          <div className="text-amber-400 text-xs uppercase tracking-widest font-cinzel mb-2">
            Aaronic Benediction · 亚伦大祭司的祝福
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-serif-sc font-medium text-amber-100 max-w-3xl mx-auto leading-relaxed">
            “愿耶和华赐福给你，保护你；<br />
            愿耶和华使他的脸光照你，赐恩给你；<br />
            愿耶和华向你仰脸，赐你平安。”
          </p>
          <div className="text-xs text-amber-400 font-mono mt-3">
            —— 民数记 6:24-26 (Numbers 6:24-26)
          </div>
        </div>

        {/* 4 Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-xs sm:text-sm">
          {/* Col 1: Church Identity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-700 flex items-center justify-center text-amber-100">
                <div className="relative flex items-center justify-center">
                  <div className="w-1 h-5 bg-amber-200"></div>
                  <div className="absolute top-1 w-3 h-1 bg-amber-200"></div>
                </div>
              </div>
              <span className="font-serif-sc font-bold text-lg text-white">
                {churchInfo.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {churchInfo.motto}。持守基督信仰正道，陪伴每一个寻求真理的心灵，在主爱中建造健康丰盛的生命。
            </p>
            <div className="text-xs text-stone-500 font-cinzel">
              Founded in {churchInfo.foundedYear} · Sola Scriptura · Sola Gratia
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-cinzel">
              快速导航 (Navigation)
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('worship-schedule')}
                  className="hover:text-amber-400 transition-colors"
                >
                  主日崇拜日程安排
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('daily-verse')}
                  className="hover:text-amber-400 transition-colors"
                >
                  每日经文与灵修笔记
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sermons')}
                  className="hover:text-amber-400 transition-colors"
                >
                  主日讲道录音档案
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('visitor-guide')}
                  className="hover:text-amber-400 transition-colors"
                >
                  新朋友初访须知 (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prayer-wall')}
                  className="hover:text-amber-400 transition-colors"
                >
                  同心代祷信箱与代求墙
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Gathering Times Summary */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-cinzel">
              聚会时间 (Gathering Times)
            </h4>
            <ul className="space-y-2.5 text-stone-400 text-xs">
              <li>
                <span className="text-amber-300 font-semibold block">主日早堂崇拜：</span>
                每周日 09:00 - 10:30（配同步字幕）
              </li>
              <li>
                <span className="text-amber-300 font-semibold block">主日午堂崇拜：</span>
                每周日 11:00 - 12:30（青年敬拜）
              </li>
              <li>
                <span className="text-amber-300 font-semibold block">光盐青年团聚：</span>
                每周六晚 19:00 - 20:45
              </li>
              <li>
                <span className="text-amber-300 font-semibold block">守望祷告会：</span>
                每周三晚 19:30 - 21:00
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Visit */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-cinzel">
              来访与联络 (Contact & Visit)
            </h4>
            <div className="space-y-3 text-stone-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{churchInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{churchInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{churchInfo.email}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors"
                >
                  查看详细乘车与停车指引 →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              © {new Date().getFullYear()} {churchInfo.name} ({churchInfo.nameEn}). 保留所有权利。
            </span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-stone-400 hover:text-amber-400 underline flex items-center gap-1 text-[11px]"
              >
                <KeyRound className="w-3 h-3 text-amber-500" />
                <span>教务后台管理入口</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-400">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              以基督之爱服侍每一位来到身边的朋友
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-400 rounded-full transition-colors"
              title="回到顶部"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
