'use client';

import React from 'react';
import { TRANSLATIONS } from '@/lib/data/translations';
import { Language, Theme } from '@/lib/types';
import {
  Moon,
  Sun,
  Languages,
  BookOpen,
  MessageSquareCode,
  Compass,
  Award,
  BookText,
  User,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  theme,
  setTheme,
  onOpenAuth,
  user,
}: NavbarProps) {
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: ShieldCheck },
    { id: 'explore', label: t.navExplore, icon: Compass },
    { id: 'simulator', label: t.navSimulator, icon: MessageSquareCode },
    { id: 'training', label: t.navTraining, icon: Award },
    { id: 'encyclopedia', label: t.navEncyclopedia, icon: BookOpen },
    { id: 'about', label: t.navAbout, icon: BookText },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FBF9F4]/90 dark:bg-[#0A1210]/90 border-b border-[#0A3E31]/10 dark:border-emerald-500/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-start group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 text-[#FBF9F4] flex items-center justify-center shadow-md shadow-[#0A3E31]/10 group-hover:scale-105 transition-transform">
              <span className="font-['Amiri',serif] font-bold text-2xl leading-none">ب</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#0A3E31] dark:text-emerald-400 font-['Cairo',sans-serif]">
                {t.brandName}
              </span>
              <span className="hidden sm:inline-block ms-1.5 text-xs font-medium text-[#C8A366] dark:text-[#E2C799]">
                AI
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#0A3E31] dark:text-emerald-400 bg-[#0A3E31]/8 dark:bg-emerald-500/10 font-semibold'
                    : 'text-[#4B5563] dark:text-neutral-300 hover:text-[#0A3E31] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#0A3E31]/15 dark:border-white/10 hover:bg-[#0A3E31]/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-[#0A3E31] dark:text-neutral-200"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg text-[#0A3E31] dark:text-neutral-200 hover:bg-[#0A3E31]/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-[#0A3E31]/10 dark:border-white/10"
            title={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#0A3E31]" />
            ) : (
              <Sun className="w-4 h-4 text-[#C8A366]" />
            )}
          </button>

          {/* User Profile or Sign In */}
          {user ? (
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 ps-2 pe-3 py-1.5 rounded-lg bg-[#0A3E31]/8 dark:bg-emerald-950/40 border border-[#0A3E31]/20 dark:border-emerald-500/20 text-[#0A3E31] dark:text-emerald-300 text-xs font-medium cursor-pointer hover:bg-[#0A3E31]/12 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#0A3E31] text-white flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="max-w-[90px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0A3E31] hover:bg-[#083227] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.signIn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
