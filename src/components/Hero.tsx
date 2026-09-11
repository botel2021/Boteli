import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart, ArrowRight, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import sanctuaryImg from '../assets/images/church_hero_sanctuary_1789118267362.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { churchInfo } = useChurch();
  // Countdown to next Sunday 09:00 service
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isSundayMorning, setIsSundayMorning] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const currentHour = now.getHours();

      // Check if it's currently Sunday morning during service (09:00 - 12:30)
      if (currentDay === 0 && currentHour >= 9 && currentHour < 13) {
        setIsSundayMorning(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsSundayMorning(false);

      // Target: Next Sunday at 09:00:00
      let daysUntilSunday = (7 - currentDay) % 7;
      if (daysUntilSunday === 0 && currentHour >= 9) {
        // Today is Sunday but past 9am, next Sunday is in 7 days
        daysUntilSunday = 7;
      }

      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero" className="relative pt-24 md:pt-28 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={sanctuaryImg}
          alt="恩典之光基督教会大礼堂"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform duration-1000"
        />
        {/* Soft elegant gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/75 to-stone-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-transparent to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl pt-8 pb-12">
          {/* Welcoming Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>欢迎来到{churchInfo.name} · 一个有爱与盼望的属灵家园</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-sc font-bold text-white tracking-wide leading-tight sm:leading-tight md:leading-tight mb-6 drop-shadow-sm">
            扎根圣经真道，<br />
            <span className="text-amber-200">经历基督浩瀚恩典</span>
          </h1>

          {/* Bible Theme Quote */}
          <div className="relative pl-5 border-l-2 border-amber-400/80 mb-8 max-w-2xl bg-black/20 p-4 rounded-r-xl backdrop-blur-xs">
            <p className="font-serif-sc text-stone-200 text-base sm:text-lg italic leading-relaxed">
              “{churchInfo.bibleTheme}”
            </p>
            <div className="text-amber-300/90 text-xs sm:text-sm font-sans mt-2 tracking-wide font-medium flex items-center justify-between">
              <span>—— {churchInfo.motto}</span>
              <span className="text-stone-400 text-xs">{churchInfo.nameEn}</span>
            </div>
          </div>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl">
            无论您是在寻找生命的意义、渴望心灵的平静，还是希望为全家人寻找充满爱与真理的属灵团契，这里都有一群热诚温暖的弟兄姊妹敞开怀抱欢迎您。
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10">
            <button
              onClick={() => onNavigate('worship-schedule')}
              id="hero-btn-services"
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2 group"
            >
              <Clock className="w-4 h-4 text-amber-100" />
              <span>主日崇拜日程</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('visitor-guide')}
              id="hero-btn-visitor"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>新朋友初访指南</span>
            </button>

            <button
              onClick={() => onNavigate('sermons')}
              id="hero-btn-sermons"
              className="px-5 py-3.5 rounded-xl bg-stone-900/60 hover:bg-stone-800/80 text-stone-300 hover:text-white font-medium text-sm sm:text-base border border-stone-700/50 transition-all flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>讲道影音</span>
            </button>
          </div>
        </div>

        {/* Next Service Countdown / Live Indicator Banner */}
        <div className="max-w-4xl bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-700/60 p-5 sm:p-6 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold font-cinzel">
                  Upcoming Sunday Worship
                </div>
                <div className="text-base sm:text-lg font-serif-sc font-semibold text-stone-100">
                  {isSundayMorning ? '今日主日崇拜现正进行中' : '距离本周主日崇拜（早堂 09:00）还有'}
                </div>
                <div className="text-xs text-stone-400 mt-0.5">
                  早堂 09:00 · 午堂 11:00 · 成都市高新区天府大道中段128号主堂
                </div>
              </div>
            </div>

            {/* Timer boxes */}
            {isSundayMorning ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>崇拜正在进行 · 欢迎亲临或线上参与</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 text-center self-start md:self-auto">
                <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                  <div className="text-lg sm:text-xl font-bold font-mono text-amber-300">{timeLeft.days}</div>
                  <div className="text-[10px] text-stone-400 uppercase">天</div>
                </div>
                <span className="text-stone-600 font-bold">:</span>
                <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                  <div className="text-lg sm:text-xl font-bold font-mono text-stone-100">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase">时</div>
                </div>
                <span className="text-stone-600 font-bold">:</span>
                <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                  <div className="text-lg sm:text-xl font-bold font-mono text-stone-100">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase">分</div>
                </div>
                <span className="text-stone-600 font-bold">:</span>
                <div className="bg-stone-800/90 border border-stone-700 px-3 py-1.5 rounded-lg min-w-[52px]">
                  <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase">秒</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Church 4 Pillars Guarantee / Reassurance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-stone-800/60 text-stone-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-200">纯正圣经真道</div>
              <div className="text-[11px] text-stone-400">持守正统使徒信仰</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-200">温暖包容团契</div>
              <div className="text-[11px] text-stone-400">真诚相爱彼此扶持</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-200">各年龄段培育</div>
              <div className="text-[11px] text-stone-400">从幼童到长者门训</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-200">定期社区公益</div>
              <div className="text-[11px] text-stone-400">关怀探访传递基督爱</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
