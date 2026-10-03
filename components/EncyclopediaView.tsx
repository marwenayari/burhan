'use client';

import React, { useState } from 'react';
import { DoubtItem, Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';
import { DOUBTS_DATA } from '@/lib/data/doubts';
import { BookOpen, Search, Sparkles, ChevronRight, Bookmark, CheckCircle2 } from 'lucide-react';

interface EncyclopediaViewProps {
  language: Language;
  onSelectDoubt: (doubt: DoubtItem) => void;
}

export default function EncyclopediaView({
  language,
  onSelectDoubt,
}: EncyclopediaViewProps) {
  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [query, setQuery] = useState('');

  const sections = [
    { id: 'all', titleAr: 'كامل الموسوعة', titleEn: 'Full Encyclopedia', count: DOUBTS_DATA.length },
    { id: 'creed', titleAr: 'أصول العقيدة والغيبيات', titleEn: 'Theology & Metaphysics', count: 1 },
    { id: 'sunnah', titleAr: 'علوم السنة وتاريخ التدوين', titleEn: 'Hadith Sciences & Inscription', count: 1 },
    { id: 'quran', titleAr: 'علوم القرآن وسلامة النص', titleEn: 'Quranic Integrity & Exegesis', count: 1 },
    { id: 'women', titleAr: 'التشريع وحقوق المرأة', titleEn: 'Jurisprudence & Women’s Rights', count: 1 },
    { id: 'science', titleAr: 'براهين التصميم والعلم', titleEn: 'Cosmic Design & Science', count: 1 },
    { id: 'history', titleAr: 'تاريخ الفتوحات وحرية الاعتقاد', titleEn: 'Historical Expeditions & Freedom', count: 1 },
  ];

  const filteredItems = DOUBTS_DATA.filter((d) => {
    const matchSec = selectedSection === 'all' || d.category === selectedSection;
    const q = query.trim().toLowerCase();
    if (!q) return matchSec;
    return (
      matchSec &&
      (d.titleAr.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q) ||
        d.summaryAr.toLowerCase().includes(q) ||
        d.fullRebuttalAr.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 pb-12 text-start">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>{isAr ? 'الموسوعة العلمية المؤصلة' : 'Authentic Scholarly Encyclopedia'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A3E31] dark:text-emerald-300">
          {t.navEncyclopedia}
        </h1>
        <p className="text-sm text-[#4B5563] dark:text-neutral-400 mt-2 max-w-2xl">
          {isAr
            ? 'مرجع شامل ومفهرس يضم تفنيد الشبهات الفكرية مع تخريج الأحاديث وعزو الآيات وأقوال المحققين.'
            : 'A comprehensive catalog of intellectual refutations with verified scripture citations and classical scholarly consensus.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isAr ? 'ابحث في الموسوعة عن مسألة، أو اسم كتاب، أو راوٍ...' : 'Search encyclopedia topics, books, or transmitters...'}
          className="w-full ps-11 pe-4 py-3.5 rounded-2xl border border-[#0A3E31]/20 dark:border-white/10 bg-white dark:bg-[#0E1B17] text-sm text-[#111827] dark:text-neutral-100 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500"
        />
        <Search className="absolute start-4 top-4 w-4 h-4 text-[#9CA3AF]" />
      </div>

      {/* 2-Column Encyclopedia Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sections Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-[#6B7280] dark:text-neutral-400 uppercase tracking-wider mb-3">
            {isAr ? 'أبواب ومحاور الموسوعة' : 'Encyclopedia Sections'}
          </div>
          {sections.map((sec) => {
            const isSelected = selectedSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold text-start transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A3E31] text-white shadow-sm dark:bg-emerald-600'
                    : 'bg-white dark:bg-[#0E1B17] text-[#374151] dark:text-neutral-300 border border-[#0A3E31]/10 dark:border-white/10 hover:border-[#0A3E31]/30'
                }`}
              >
                <span>{isAr ? sec.titleAr : sec.titleEn}</span>
                <span className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 text-[#6B7280] dark:text-neutral-400'
                }`}>
                  {sec.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Directory (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-neutral-400 mb-2">
            <span>{isAr ? 'الدراسات والردود المحققة' : 'Verified Studies & Rebuttals'}</span>
            <span className="font-mono">{filteredItems.length} {isAr ? 'مبحث' : 'entries'}</span>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectDoubt(item)}
                className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 hover:border-[#0A3E31]/30 dark:hover:border-emerald-500/30 hover:shadow-md transition-all cursor-pointer group text-start"
              >
                <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-neutral-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0A3E31] dark:text-emerald-400">
                      {isAr ? item.categoryNameAr : item.categoryNameEn}
                    </span>
                    <span>·</span>
                    <span>{isAr ? item.difficultyAr : item.difficultyEn}</span>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.confidenceScore}%
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white group-hover:text-[#0A3E31] dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                  {isAr ? item.summaryAr : item.summaryEn}
                </p>

                {/* Evidence count tags (unboxed text) */}
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5 text-xs">
                  <div className="flex items-center gap-3 text-[11px] text-[#6B7280] dark:text-neutral-400">
                    <span>{item.quranicEvidence.length} {isAr ? 'شواهد قرآنية' : 'Quranic proofs'}</span>
                    <span>·</span>
                    <span>{item.hadithEvidence.length} {isAr ? 'أحاديث صحيحة' : 'Authentic Hadiths'}</span>
                    <span>·</span>
                    <span>{item.references.length} {isAr ? 'مراجع أصلية' : 'References'}</span>
                  </div>

                  <span className="font-semibold text-[#0A3E31] dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 group-hover:rtl:-translate-x-0.5 transition-transform">
                    <span>{isAr ? 'قراءة المبحث' : 'View Study'}</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
