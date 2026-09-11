import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Church,
  Clock,
  BookOpen,
  Headphones,
  Users,
  Compass,
  Heart,
  Calendar,
  MapPin,
  Radio,
  Phone,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection, onOpenAdmin }) => {
  const { churchInfo, isAdminLoggedIn } = useChurch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'worship-schedule', label: '崇拜时间', icon: Clock },
    { id: 'daily-verse', label: '每日经文', icon: BookOpen },
    { id: 'sermons', label: '主日讲道', icon: Headphones },
    { id: 'ministries', label: '团契事工', icon: Users },
    { id: 'visitor-guide', label: '新朋友指南', icon: Compass },
    { id: 'prayer-wall', label: '同心代祷', icon: Heart },
    { id: 'events', label: '教会活动', icon: Calendar },
    { id: 'about-us', label: '关于教会', icon: Church },
    { id: 'contact', label: '来访交通', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top utility bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 hidden md:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              主日崇拜：每周日 09:00 / 11:00
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              成都市高新区天府大道中段128号
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {churchInfo.phone.split('/')[0]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('worship-schedule')}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              主日线上直播入口
            </button>
            <span className="text-stone-600">|</span>
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                isAdminLoggedIn
                  ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-500/50'
                  : 'text-stone-400 hover:text-amber-300'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>已登录后台 · 点击进入管理</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3 h-3" />
                  <span>教务管理登录</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-stone-200'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3 text-left group"
              id="church-brand-logo"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 flex items-center justify-center text-amber-100 shadow-sm shadow-amber-900/20 group-hover:scale-105 transition-transform">
                {/* Traditional cross motif */}
                <div className="relative flex items-center justify-center">
                  <div className="w-1.5 h-6 bg-amber-200 rounded-xs"></div>
                  <div className="absolute top-1.5 w-4 h-1.5 bg-amber-200 rounded-xs"></div>
                </div>
              </div>
              <div>
                <div className="font-serif-sc font-bold text-lg md:text-xl text-stone-900 tracking-wide flex items-center gap-1.5">
                  {churchInfo.name}
                </div>
                <div className="text-[11px] text-stone-500 font-medium tracking-wider uppercase font-cinzel">
                  {churchInfo.nameEn}
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                      isActive
                        ? 'text-amber-800 bg-amber-50 font-semibold'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/70'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-700 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Action buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                id="btn-plan-visit"
                onClick={() => handleNavClick('visitor-guide')}
                className="px-3.5 py-2 text-xs md:text-sm font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-100 border border-amber-300/80 rounded-lg transition-colors"
              >
                新朋友指南
              </button>
              <button
                id="btn-live-worship"
                onClick={() => handleNavClick('worship-schedule')}
                className="px-3.5 py-2 text-xs md:text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm shadow-amber-900/20 transition-all flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>在线敬拜</span>
              </button>
            </div>

            {/* Mobile menu hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => handleNavClick('visitor-guide')}
                className="px-2.5 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 rounded-md"
              >
                新朋友
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg"
                aria-label="切换菜单"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                      isActive
                        ? 'bg-amber-100/70 text-amber-900 font-semibold'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('worship-schedule')}
                className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4" />
                进入在线直播敬拜
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border border-stone-200"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                <span>{isAdminLoggedIn ? '进入教务可视化管理后台' : '教务管理后台登录'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
