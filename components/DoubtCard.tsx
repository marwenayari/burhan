'use client';

import React from 'react';
import { DoubtItem, Language } from '@/lib/types';
import { BookOpen, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

interface DoubtCardProps {
  doubt: DoubtItem;
  language: Language;
  onSelect: (doubt: DoubtItem) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, id: string) => void;
}

export default function DoubtCard({
  doubt,
  language,
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
}: DoubtCardProps) {
  const isAr = language === 'ar';

  const categoryColorMap: Record<string, string> = {
    creed: 'text-emerald-700 dark:text-emerald-300',
    sunnah: 'text-amber-700 dark:text-amber-300',
    quran: 'text-teal-700 dark:text-teal-300',
    women: 'text-rose-700 dark:text-rose-300',
    science: 'text-blue-700 dark:text-blue-300',
    history: 'text-indigo-700 dark:text-indigo-300',
  };

  return (
    <div
      onClick={() => onSelect(doubt)}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 hover:border-[#0A3E31]/30 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-[#0A3E31]/5 dark:hover:shadow-emerald-950/20 transition-all duration-200 cursor-pointer text-start"
    >
      <div>
        {/* Zero-Pill Clean Unboxed Metadata */}
        <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-neutral-400 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-semibold ${
                categoryColorMap[doubt.category] || 'text-emerald-700 dark:text-emerald-300'
              }`}
            >
              {isAr ? doubt.categoryNameAr : doubt.categoryNameEn}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? doubt.difficultyAr : doubt.difficultyEn}</span>
            <span aria-hidden="true">·</span>
            <span>{doubt.readTimeMin} {isAr ? 'دقائق' : 'min'}</span>
          </div>

          {onToggleBookmark && (
            <button
              onClick={(e) => onToggleBookmark(e, doubt.id)}
              className="p-1 rounded-md text-[#9CA3AF] hover:text-[#C8A366] transition-colors"
              title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ'}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-[#C8A366] text-[#C8A366]' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#111827] dark:text-neutral-100 group-hover:text-[#0A3E31] dark:group-hover:text-emerald-400 transition-colors mb-2.5 leading-snug">
          {isAr ? doubt.titleAr : doubt.titleEn}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-300 line-clamp-3 leading-relaxed mb-4">
          {isAr ? doubt.summaryAr : doubt.summaryEn}
        </p>
      </div>

      {/* Footer info & CTA */}
      <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{doubt.confidenceScore}% {isAr ? 'توثيق قطعي' : 'Verified'}</span>
        </div>

        <div className="flex items-center gap-1 text-[#0A3E31] dark:text-emerald-300 font-semibold group-hover:translate-x-0.5 group-hover:rtl:-translate-x-0.5 transition-transform">
          <span>{isAr ? 'قراءة الرد' : 'Read Rebuttal'}</span>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
}
