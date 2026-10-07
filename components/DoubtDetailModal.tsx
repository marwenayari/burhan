'use client';

import React, { useState } from 'react';
import { DoubtItem, Language } from '@/lib/types';
import {
  X,
  BookOpen,
  Quote,
  CheckCircle2,
  Bookmark,
  Share2,
  MessageSquareCode,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';

interface DoubtDetailModalProps {
  doubt: DoubtItem | null;
  language: Language;
  onClose: () => void;
  onOpenInSimulator: (doubt: DoubtItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function DoubtDetailModal({
  doubt,
  language,
  onClose,
  onOpenInSimulator,
  isBookmarked,
  onToggleBookmark,
}: DoubtDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!doubt) return null;

  const isAr = language === 'ar';
  const knowledge = doubt.knowledge;
  const references = !isAr && knowledge ? knowledge.referencesEn : doubt.references;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(
        `${isAr ? doubt.titleAr : doubt.titleEn}\n\n${
          isAr ? doubt.summaryAr : doubt.summaryEn
        }\n\nمنصة برهان AI: ردود موثقة على الشبهات`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#FBF9F4] dark:bg-[#0C1714] border border-[#0A3E31]/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#0A3E31]/10 dark:border-white/10 bg-[#F4EFE6]/60 dark:bg-[#0E1B17]/60">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0 text-xs text-[#6B7280] dark:text-neutral-400 *:whitespace-nowrap">
            <span className="font-bold text-[#0A3E31] dark:text-emerald-400">
              {isAr ? doubt.categoryNameAr : doubt.categoryNameEn}
            </span>
            <span>·</span>
            <span>{isAr ? doubt.difficultyAr : doubt.difficultyEn}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {doubt.confidenceScore !== undefined
                ? `${doubt.confidenceScore}% ${isAr ? 'توثيق قطعي' : 'Verified'}`
                : isAr
                  ? 'موثق بالمصدر'
                  : 'Source-cited'}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(doubt.id)}
              className="p-2 rounded-xl text-[#6B7280] dark:text-neutral-300 hover:bg-[#0A3E31]/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ'}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-[#C8A366] text-[#C8A366]' : ''
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-[#6B7280] dark:text-neutral-300 hover:bg-[#0A3E31]/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={isAr ? 'مشاركة ونسخ' : 'Share'}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#6B7280] dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 text-start">
          {/* Main Title & Origin */}
          <div>
            {knowledge && (
              <div className="flex items-center gap-2 text-[11px] text-[#6B7280] dark:text-neutral-400 mb-2">
                <span className="font-mono">{knowledge.unitId}</span>
                <span>·</span>
                <span>{isAr ? knowledge.topicAr : knowledge.topicEn}</span>
              </div>
            )}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0A3E31] dark:text-emerald-400 leading-snug mb-3">
              {isAr ? doubt.titleAr : doubt.titleEn}
            </h2>
            {knowledge && !isAr && !knowledge.isTranslated && (
              <p className="text-xs text-[#C8A366] dark:text-[#E2C799] mb-3">
                English translation pending — showing the Arabic source.
              </p>
            )}
            {knowledge && (
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[#6B7280] dark:text-neutral-400 mb-2">
                  {isAr ? 'صيغ أخرى للشبهة' : 'Other ways this is asked'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(isAr ? knowledge.questionVariantsAr : knowledge.questionVariantsEn).map(
                    (variant, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 text-xs text-[#374151] dark:text-neutral-300"
                      >
                        {variant}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
            <div className="p-4 rounded-2xl bg-[#0A3E31]/5 dark:bg-emerald-950/20 border border-[#0A3E31]/10 dark:border-emerald-500/10">
              <h4 className="text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-1">
                {knowledge
                  ? isAr
                    ? 'تصوير الشبهة'
                    : 'How the Objection Is Framed'
                  : isAr
                    ? 'أصل ومنشأ الشبهة'
                    : 'Origin & Historical Context of the Doubt'}
              </h4>
              <p className="text-sm text-[#4B5563] dark:text-neutral-300 leading-relaxed">
                {isAr ? doubt.originAr : doubt.originEn}
              </p>
            </div>
          </div>

          {/* Section: Short Answer (knowledge base) */}
          {knowledge && (
            <div>
              <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-3">
                {isAr ? 'الجواب المختصر' : 'Short Answer'}
              </h3>
              <p className="p-5 rounded-2xl bg-white dark:bg-[#0E1B17] border-s-4 border-[#0A3E31] dark:border-emerald-500 text-sm sm:text-base leading-loose text-[#1F2937] dark:text-neutral-100">
                {isAr ? doubt.summaryAr : doubt.summaryEn}
              </p>
            </div>
          )}

          {/* Section: Quranic Evidence */}
          {doubt.quranicEvidence.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#0A3E31] dark:text-emerald-400" />
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                  {isAr ? 'البرهان من القرآن الكريم' : 'Quranic Proof & Exposition'}
                </h3>
              </div>
              <div className="space-y-4">
                {doubt.quranicEvidence.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10"
                  >
                    <div className="flex items-center justify-between text-xs text-[#C8A366] dark:text-[#E2C799] font-bold mb-3">
                      <span>
                        {isAr
                          ? `سورة ${q.surah} - الآية (${q.ayahNumber})`
                          : `Surah ${q.surah} - Verse ${q.ayahNumber}`}
                      </span>
                    </div>
                    <blockquote className="font-['Amiri',serif] text-xl sm:text-2xl text-[#0A3E31] dark:text-emerald-300 font-semibold leading-loose mb-3 text-center px-2 py-1">
                      « {q.textAr} »
                    </blockquote>
                    {!isAr && (
                      <p className="text-xs italic text-[#4B5563] dark:text-neutral-400 mb-2">
                        &ldquo;{q.translationEn}&rdquo;
                      </p>
                    )}
                    <p className="text-sm text-[#374151] dark:text-neutral-300 leading-relaxed pt-2 border-t border-black/5 dark:border-white/5">
                      <strong className="text-[#0A3E31] dark:text-emerald-400 font-semibold">
                        {isAr ? 'وجه الدلالة والتفسير: ' : 'Exegesis & Evidentiary Force: '}
                      </strong>
                      {isAr ? q.explanationAr : q.explanationEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Prophetic Sunnah Evidence */}
          {doubt.hadithEvidence.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C8A366] dark:text-[#E2C799]" />
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                  {isAr ? 'البرهان من السنة النبوية الصحيحة' : 'Authentic Prophetic Tradition Proof'}
                </h3>
              </div>
              <div className="space-y-4">
                {doubt.hadithEvidence.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10"
                  >
                    <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-neutral-400 mb-2 flex-wrap gap-2">
                      <span className="font-medium text-[#111827] dark:text-neutral-200">
                        {isAr ? `عن: ${h.narrator}` : `Narrated by: ${h.narrator}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                          {isAr ? `الدرجة: ${h.grade}` : `Grade: ${h.grade}`}
                        </span>
                        <span>·</span>
                        <span>{h.source}</span>
                      </div>
                    </div>
                    <blockquote className="font-['Amiri',serif] text-lg sm:text-xl text-[#0A3E31] dark:text-emerald-300 font-medium leading-relaxed my-3 px-2">
                      « {h.textAr} »
                    </blockquote>
                    {!isAr && (
                      <p className="text-xs italic text-[#4B5563] dark:text-neutral-400 mb-2">
                        &ldquo;{h.translationEn}&rdquo;
                      </p>
                    )}
                    <p className="text-sm text-[#374151] dark:text-neutral-300 leading-relaxed pt-2 border-t border-black/5 dark:border-white/5">
                      <strong className="text-[#0A3E31] dark:text-emerald-400 font-semibold">
                        {isAr ? 'البيان الشرعي: ' : 'Scholarly Commentary: '}
                      </strong>
                      {isAr ? h.explanationAr : h.explanationEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Rational and Philosophical Proofs */}
          <div>
            <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-3">
              {knowledge
                ? isAr
                  ? 'الأدلة ومسار الاستدلال'
                  : 'Evidence & Line of Reasoning'
                : isAr
                  ? 'البراهين العقلية والمنطقية'
                  : 'Rational & Philosophical Proofs'}
            </h3>
            <ul className="space-y-3">
              {(isAr ? doubt.rationalEvidenceAr : doubt.rationalEvidenceEn).map(
                (item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/70 dark:bg-[#0E1B17]/70 border border-[#0A3E31]/10 dark:border-white/10 text-sm text-[#374151] dark:text-neutral-300 leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#C8A366]/20 text-[#0A3E31] dark:text-[#E2C799] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Section: Scholarly Quotes */}
          {doubt.scholarsQuotesAr.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Quote className="w-5 h-5 text-[#C8A366]" />
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                  {isAr ? 'أقوال أئمة التحقيق والمستشرقين المنصفين' : 'Scholarly Testimonies'}
                </h3>
              </div>
              <div className="space-y-3">
                {(isAr ? doubt.scholarsQuotesAr : doubt.scholarsQuotesEn).map(
                  (sq, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#0A3E31]/5 dark:bg-emerald-950/20 border-s-4 border-[#C8A366] text-sm"
                    >
                      <p className="italic text-[#1F2937] dark:text-neutral-200 mb-2 leading-relaxed">
                        &ldquo;{sq.quote}&rdquo;
                      </p>
                      <div className="text-xs font-semibold text-[#0A3E31] dark:text-emerald-400">
                        {sq.scholar} — <span className="font-normal text-[#6B7280] dark:text-neutral-400">{sq.book}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Full Systematic Rebuttal */}
          <div>
            <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-3">
              {knowledge
                ? isAr
                  ? 'الجواب المفصل'
                  : 'Detailed Answer'
                : isAr
                  ? 'الرد المفصل والشامل'
                  : 'Full Systematic Rebuttal'}
            </h3>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 text-sm leading-loose whitespace-pre-line text-[#374151] dark:text-neutral-200 font-sans">
              {isAr ? doubt.fullRebuttalAr : doubt.fullRebuttalEn}
            </div>
          </div>

          {/* Section: Conversational Answer (knowledge base) */}
          {knowledge && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-[#C8A366] dark:text-[#E2C799]" />
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                  {isAr ? 'جواب حواري مقترح' : 'Suggested Conversational Answer'}
                </h3>
              </div>
              <blockquote className="p-5 rounded-2xl bg-[#0A3E31]/5 dark:bg-emerald-950/20 border-s-4 border-[#C8A366] text-sm leading-loose italic text-[#1F2937] dark:text-neutral-200">
                &ldquo;{isAr ? knowledge.spokenAnswerAr : knowledge.spokenAnswerEn}&rdquo;
              </blockquote>
            </div>
          )}

          {/* References & Bibliography */}
          <div>
            <h4 className="text-xs font-bold text-[#6B7280] dark:text-neutral-400 uppercase tracking-wider mb-2">
              {isAr ? 'المراجع والمصادر للاستزادة:' : 'Primary References & Further Reading:'}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-[#0A3E31] dark:text-emerald-400">
              {references.map((ref, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 font-medium"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar with Simulator CTA */}
        <div className="p-4 sm:p-5 border-t border-[#0A3E31]/10 dark:border-white/10 bg-[#F4EFE6]/80 dark:bg-[#0E1B17]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#6B7280] dark:text-neutral-400 text-center sm:text-start">
            {isAr
              ? 'هل ترغب في اختبار فهمك وتطبيق الرد عملياً أمام المشكك؟'
              : 'Want to test your mastery in a live debate simulation against a skeptic?'}
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenInSimulator(doubt);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>{isAr ? 'فتح المناظرة في المحاكي الحواري' : 'Debate in Dialogue Simulator'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
