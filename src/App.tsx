/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChurchProvider, useChurch } from './context/ChurchContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DailyVerseWidget } from './components/DailyVerseWidget';
import { WorshipScheduleSection } from './components/WorshipScheduleSection';
import { SermonPlayer } from './components/SermonPlayer';
import { MinistriesSection } from './components/MinistriesSection';
import { VisitorGuideSection } from './components/VisitorGuideSection';
import { PrayerWallSection } from './components/PrayerWallSection';
import { EventsSection } from './components/EventsSection';
import { AboutAndPastors } from './components/AboutAndPastors';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShieldCheck, ArrowRight, Settings } from 'lucide-react';

function ChurchAppContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAdminLoggedIn } = useChurch();

  // Track active section on scroll
  useEffect(() => {
    if (showAdminDashboard) return;

    const handleScroll = () => {
      const sectionIds = [
        'hero',
        'daily-verse',
        'worship-schedule',
        'sermons',
        'ministries',
        'visitor-guide',
        'prayer-wall',
        'events',
        'about-us',
        'contact'
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAdminDashboard]);

  const handleNavigate = (sectionId: string) => {
    if (showAdminDashboard) {
      setShowAdminDashboard(false);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setShowAdminDashboard(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setShowAdminDashboard(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing the Admin Dashboard
  if (showAdminDashboard) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans">
        <AdminDashboard onBackToSite={() => setShowAdminDashboard(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Admin Floating Quick Access Bar if logged in */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowAdminDashboard(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 bg-stone-900 text-amber-300 hover:bg-amber-800 hover:text-white rounded-full shadow-2xl border border-amber-500/50 text-xs font-semibold transition-all transform hover:scale-105"
            title="点击切换到教务管理系统"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:text-white" />
            <span>已登录管理员</span>
            <span className="bg-amber-500/20 group-hover:bg-white/20 text-amber-200 group-hover:text-white px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
              进入后台 <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      )}

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 1. Hero banner with sanctuary imagery & service countdown */}
        <Hero onNavigate={handleNavigate} />

        {/* 2. Verse of the Day & Devotional reflection widget */}
        <DailyVerseWidget />

        {/* 3. Worship Service Schedules (Sunday & Weekday) */}
        <WorshipScheduleSection onNavigate={handleNavigate} />

        {/* 4. Sermons Media Library with playable audio & outline drawer */}
        <SermonPlayer />

        {/* 5. Ministries & Fellowships for all life stages */}
        <MinistriesSection />

        {/* 6. Visitor Guide & Newcomer FAQs */}
        <VisitorGuideSection />

        {/* 7. Intercessory Prayer Wall & Online Prayer Requests */}
        <PrayerWallSection />

        {/* 8. Church Events Calendar & Retreats */}
        <EventsSection />

        {/* 9. About Church, Statement of Faith (Apostles' Creed) & Pastoral Team */}
        <AboutAndPastors />

        {/* 10. Campus Location, Transportation & Pastoral Contact */}
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenAdmin={handleOpenAdmin} />

      {/* Password-protected Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <ChurchProvider>
      <ChurchAppContent />
    </ChurchProvider>
  );
}
