'use client';

import React, { useState, useMemo } from 'react';
import { DoubtItem, Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';
import { DOUBTS_DATA } from '@/lib/data/doubts';
import DoubtCard from './DoubtCard';
import { Search, Filter, Compass, Sparkles, X } from 'lucide-react';

interface ExploreViewProps {
  language: Language;
  onSelectDoubt: (doubt: DoubtItem) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export default function ExploreView({
  language,
  onSelectDoubt,
  bookmarks,
  onToggleBookmark,
}: ExploreViewProps) {
  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = [
    { id: 'all', labelAr: 'جميع التصنيفات', labelEn: 'All Topics' },
    { id: 'creed', labelAr: 'العقيدة والغيبيات', labelEn: 'Theology & Unseen' },
    { id: 'sunnah', labelAr: 'السنة النبوية', labelEn: 'Prophetic Sunnah' },
    { id: 'quran', labelAr: 'القرآن وعلومه', labelEn: 'Quran & Sciences' },
    { id: 'women', labelAr: 'قضايا المرأة', labelEn: 'Women in Islam' },
    { id: 'science', labelAr: 'العلم والإسلام', labelEn: 'Science & Islam' },
    { id: 'history', labelAr: 'التاريخ والحضارة', labelEn: 'History & Civilization' },
  ];

  const difficulties = [
    { id: 'all', labelAr: 'كل المستويات', labelEn: 'All Levels' },
    { id: 'beginner', labelAr: 'مبتدئ', labelEn: 'Beginner' },
    { id: 'intermediate', labelAr: 'متوسط', labelEn: 'Intermediate' },
    { id: 'advanced', labelAr: 'متقدم', labelEn: 'Advanced' },
  ];

  const filteredDoubts = useMemo(() => {
    return DOUBTS_DATA.filter((d) => {
      const matchCat =
        selectedCategory === 'all' || d.category === selectedCategory;
      const matchDiff =
        selectedDifficulty === 'all' || d.difficulty === selectedDifficulty;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchCat && matchDiff;

      const matchSearch =
        d.titleAr.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q) ||
        d.summaryAr.toLowerCase().includes(q) ||
        d.summaryEn.toLowerCase().includes(q) ||
        d.fullRebuttalAr.toLowerCase().includes(q) ||
        d.fullRebuttalEn.toLowerCase().includes(q);

      return matchCat && matchDiff && matchSearch;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-8 pb-12 text-start">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>{isAr ? 'بنك الشبهات والردود المحققة' : 'Verified Knowledge Bank'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A3E31] dark:text-emerald-300">
          {t.navExplore}
        </h1>
        <p className="text-sm text-[#4B5563] dark:text-neutral-400 mt-2 max-w-2xl">
          {isAr
            ? 'تصفح أدق الردود المنهجية على الشبهات المثارة، مدعمة بالنصوص القرآنية والأحاديث المخرجة والبراهين العقلية.'
            : 'Explore exhaustive, peer-reviewed refutations substantiated by Quranic exegesis, verified Hadith, and rational philosophy.'}
        </p>
      </div>

      {/* Advanced Search Input Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full ps-11 pe-10 py-3.5 rounded-2xl border border-[#0A3E31]/20 dark:border-white/10 bg-white dark:bg-[#0E1B17] text-sm text-[#111827] dark:text-neutral-100 placeholder-[#9CA3AF] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500 transition-all"
        />
        <Search className="absolute start-4 top-4 w-4 h-4 text-[#9CA3AF]" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute end-4 top-4 text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Segmented Controls */}
      <div className="space-y-4">
        {/* Category Pills/Tabs (Interactive buttons with active state) */}
        <div>
          <div className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400 mb-2">
            {t.filterByTopic}:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0A3E31] dark:bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-[#0E1B17] text-[#4B5563] dark:text-neutral-300 border border-[#0A3E31]/10 dark:border-white/10 hover:border-[#0A3E31]/30'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
              {t.filterByDifficulty}:
            </span>
            <div className="flex items-center gap-1.5">
              {difficulties.map((diff) => {
                const isActive = selectedDifficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#C8A366] text-white dark:bg-[#C8A366] font-bold'
                        : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111827] dark:hover:text-white'
                    }`}
                  >
                    {isAr ? diff.labelAr : diff.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-[#6B7280] dark:text-neutral-400 font-mono">
            {filteredDoubts.length} {isAr ? 'شبهة متطابقة' : 'doubts found'}
          </div>
        </div>
      </div>

      {/* Doubts Grid */}
      {filteredDoubts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoubts.map((doubt) => (
            <DoubtCard
              key={doubt.id}
              doubt={doubt}
              language={language}
              onSelect={onSelectDoubt}
              isBookmarked={bookmarks.includes(doubt.id)}
              onToggleBookmark={(e, id) => {
                e.stopPropagation();
                onToggleBookmark(id);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10">
          <Sparkles className="w-8 h-8 text-[#C8A366] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#111827] dark:text-white mb-1">
            {isAr ? 'لم نعثر على شبهات تطابق بحثك' : 'No matching doubts found'}
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-neutral-400 mb-4">
            {isAr
              ? 'جرّب تغيير كلمات البحث أو اختيار "جميع التصنيفات" للاطلاع على كامل المحتوى.'
              : 'Try broadening your search query or selecting "All Topics".'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
          >
            {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      )}
    </div>
  );
}
