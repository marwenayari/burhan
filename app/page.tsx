'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HomeView from '@/components/HomeView';
import ExploreView from '@/components/ExploreView';
import SimulatorView from '@/components/SimulatorView';
import TrainingView from '@/components/TrainingView';
import EncyclopediaView from '@/components/EncyclopediaView';
import ProfileView from '@/components/ProfileView';
import AboutView from '@/components/AboutView';
import DoubtDetailModal from '@/components/DoubtDetailModal';
import AuthModal from '@/components/AuthModal';
import { Language, Theme, DoubtItem, SkepticPersonaId } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';
import { DOUBTS_DATA } from '@/lib/data/doubts';

export default function Page() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedDoubt, setSelectedDoubt] = useState<DoubtItem | null>(null);
  const [simulatorPersonaId, setSimulatorPersonaId] =
    useState<SkepticPersonaId>('stubborn');
  const [simulatorInitialTopic, setSimulatorInitialTopic] = useState<
    string | undefined
  >(undefined);
  const [bookmarks, setBookmarks] = useState<string[]>(['doubt-evil-suffering']);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Sync theme to document html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync language attribute & direction to document
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleOpenDoubtInSimulator = (doubt: DoubtItem) => {
    setSelectedDoubt(null);
    setSimulatorInitialTopic(language === 'ar' ? doubt.titleAr : doubt.titleEn);
    setCurrentTab('simulator');
  };

  const handleSelectPersonaFromHome = (personaId: string) => {
    setSimulatorPersonaId(personaId as SkepticPersonaId);
    setSimulatorInitialTopic(undefined);
    setCurrentTab('simulator');
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] dark:bg-[#0A1210] text-[#1F2937] dark:text-[#E5E7EB] transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 xl:pb-12 flex gap-8">
        {/* Modern Icon Sidebar (Inspired by image.png) */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          language={language}
        />

        {/* Main Content Area */}
        <main className="flex-1 xl:ps-20 w-full min-w-0">
          {currentTab === 'home' && (
            <HomeView
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onSelectDoubt={(d) => setSelectedDoubt(d)}
              onSelectPersonaForSimulator={handleSelectPersonaFromHome}
            />
          )}

          {currentTab === 'explore' && (
            <ExploreView
              language={language}
              onSelectDoubt={(d) => setSelectedDoubt(d)}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
            />
          )}

          {currentTab === 'simulator' && (
            <SimulatorView
              key={`${simulatorPersonaId}-${simulatorInitialTopic || 'default'}-${language}`}
              language={language}
              initialPersonaId={simulatorPersonaId}
              initialTopic={simulatorInitialTopic}
            />
          )}

          {currentTab === 'training' && (
            <TrainingView
              language={language}
              onNavigateToSimulator={() => setCurrentTab('simulator')}
              onNavigateToExplore={() => setCurrentTab('explore')}
            />
          )}

          {currentTab === 'encyclopedia' && (
            <EncyclopediaView
              language={language}
              onSelectDoubt={(d) => setSelectedDoubt(d)}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
              user={user}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {currentTab === 'about' && <AboutView language={language} />}
        </main>
      </div>

      {/* Global Modals */}
      <DoubtDetailModal
        doubt={selectedDoubt}
        language={language}
        onClose={() => setSelectedDoubt(null)}
        onOpenInSimulator={handleOpenDoubtInSimulator}
        isBookmarked={selectedDoubt ? bookmarks.includes(selectedDoubt.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* Quiet, refined footer (Anti-slop compliant) */}
      <footer className="border-t border-[#0A3E31]/10 dark:border-white/10 bg-[#F4EFE6]/50 dark:bg-[#080E0D] py-8 text-center text-xs text-[#6B7280] dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0A3E31] dark:text-emerald-400 font-['Cairo',sans-serif]">
              {t.brandName} AI
            </span>
            <span>·</span>
            <span>{language === 'ar' ? 'منصة ذكية غير ربحية للرد على الشبهات' : 'Intelligent Islamic Apologetics Platform'}</span>
          </div>

          <div className="text-[11px]">
            {language === 'ar'
              ? 'جميع البراهين موثقة من مصادر السنة والقرآن وأمهات كتب الفكر الإسلامي © 2026'
              : 'All proofs authenticated through classical Quranic, Hadith, and scholarly texts © 2026'}
          </div>
        </div>
      </footer>
    </div>
  );
}
