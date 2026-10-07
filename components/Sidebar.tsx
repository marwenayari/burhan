'use client';

import React from 'react';
import {
  Home,
  Compass,
  MessageSquareCode,
  Award,
  BookOpen,
  User,
  Info,
} from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  language,
}: SidebarProps) {
  const t = TRANSLATIONS[language];
  const isAr = language === 'ar';

  // shortLabel: fits the 7-tab mobile bottom bar
  const items = [
    { id: 'home', label: t.navHome, shortLabel: isAr ? 'الرئيسية' : 'Home', icon: Home },
    { id: 'explore', label: t.navExplore, shortLabel: isAr ? 'البحث' : 'Explore', icon: Compass },
    { id: 'simulator', label: t.navSimulator, shortLabel: isAr ? 'المحاكي' : 'Simulator', icon: MessageSquareCode },
    { id: 'training', label: t.navTraining, shortLabel: isAr ? 'التدريب' : 'Training', icon: Award },
    { id: 'encyclopedia', label: t.navEncyclopedia, shortLabel: isAr ? 'الموسوعة' : 'Library', icon: BookOpen },
    { id: 'profile', label: t.navProfile, shortLabel: isAr ? 'الملف' : 'Profile', icon: User },
    { id: 'about', label: t.navAbout, shortLabel: isAr ? 'عن برهان' : 'About', icon: Info },
  ];

  return (
    <>
      {/* Desktop Floating Sidebar (Inspired by image.png) */}
      <aside className="hidden xl:flex flex-col items-center justify-between w-20 fixed top-24 bottom-6 start-4 z-30 bg-[#F4EFE6]/80 dark:bg-[#0D1815]/90 backdrop-blur-md rounded-3xl border border-[#0A3E31]/10 dark:border-white/10 py-6 shadow-sm">
        {/* Top Mini Brand Icon */}
        <div className="w-11 h-11 rounded-2xl bg-[#0A3E31] dark:bg-emerald-600 text-white flex items-center justify-center font-['Amiri',serif] font-bold text-2xl shadow-sm">
          ب
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-3 my-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative group p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0A3E31] text-white shadow-md shadow-[#0A3E31]/20 scale-105 dark:bg-emerald-600'
                    : 'text-[#4B5563] dark:text-neutral-400 hover:text-[#0A3E31] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />

                {/* Subtle active dot */}
                {isActive && (
                  <span className="absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full bg-[#C8A366] dark:bg-[#E2C799]" />
                )}

                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute start-full ms-3 px-2.5 py-1 rounded-md text-xs font-medium bg-[#0A3E31] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Accent */}
        <div className="text-center text-[10px] font-bold text-[#C8A366] dark:text-[#E2C799]">
          AI
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FBF9F4]/95 dark:bg-[#0A1210]/95 backdrop-blur-lg border-t border-[#0A3E31]/10 dark:border-white/10 px-1 sm:px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-stretch justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              aria-label={item.label}
              className={`flex-1 min-w-0 max-w-24 flex flex-col items-center gap-1 py-1 px-0.5 rounded-xl text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-[#0A3E31] dark:text-emerald-400 font-bold'
                  : 'text-[#6B7280] dark:text-neutral-400'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  isActive ? 'bg-[#0A3E31]/10 dark:bg-emerald-500/15' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="truncate max-w-full">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
