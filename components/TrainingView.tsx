'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Language, UserStats } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';
import { DOUBTS_DATA } from '@/lib/data/doubts';
import {
  Award,
  BookOpen,
  MessageSquareCode,
  Clock,
  Sparkles,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ArrowLeft,
  X,
  Download,
  Share2,
} from 'lucide-react';

interface TrainingViewProps {
  language: Language;
  onNavigateToSimulator: () => void;
  onNavigateToExplore: () => void;
}

export default function TrainingView({
  language,
  onNavigateToSimulator,
  onNavigateToExplore,
}: TrainingViewProps) {
  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  const [stats, setStats] = useState<UserStats>({
    doubtsMastered: 18,
    dialoguesCompleted: 24,
    totalTrainingHours: 12.5,
    rebuttalScoreAverage: 89.2,
    currentStreakDays: 7,
    rankAr: 'باحث برهاني متمكن',
    rankEn: 'Certified Apologetic Scholar',
    levelProgress: 76,
    completedChallenges: ['ch-1', 'ch-2'],
    earnedBadges: [
      {
        id: 'badge-1',
        titleAr: 'حامي الثغور',
        titleEn: 'Guardian of Truth',
        descAr: 'إكمال 10 مناظرات بنجاح دون النزول عن 80% في قوة الحجة.',
        descEn: 'Completed 10 dialogues maintaining above 80% argument rigor.',
        icon: '🛡️',
        unlockedAt: '2026-09-28',
      },
      {
        id: 'badge-2',
        titleAr: 'المحاور الحكيم',
        titleEn: 'Wise Interlocutor',
        descAr: 'تحقيق درجة كاملة 100% في أدب ولين الجانب في 5 جلسات متتالية.',
        descEn: 'Achieved 100% in dialogue etiquette across 5 consecutive trials.',
        icon: '🌿',
        unlockedAt: '2026-10-01',
      },
      {
        id: 'badge-3',
        titleAr: 'المتقن للدليل',
        titleEn: 'Master of Evidence',
        descAr: 'استحضار براهين قرآنية وحديثية موثقة في جميع الشبهات العقدية.',
        descEn: 'Demonstrated authenticated Quranic and Hadith proofs in theological matters.',
        icon: '📜',
        unlockedAt: '2026-10-02',
      },
    ],
  });

  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const topicProficiency = [
    { nameAr: 'العقيدة والغيبيات', nameEn: 'Theology & Unseen', percent: 92 },
    { nameAr: 'السنة والحديث الشريف', nameEn: 'Prophetic Sunnah', percent: 85 },
    { nameAr: 'القرآن وعلومه', nameEn: 'Quran & Sciences', percent: 88 },
    { nameAr: 'قضايا المرأة', nameEn: 'Women in Islam', percent: 94 },
    { nameAr: 'العلم والفيزياء الكونية', nameEn: 'Science & Cosmology', percent: 79 },
    { nameAr: 'التاريخ والفتوحات', nameEn: 'History & Civilization', percent: 83 },
  ];

  const handleOpenCertificate = () => {
    setIsCertificateOpen(true);
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A3E31', '#C8A366', '#34D399', '#D4AF37'],
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }
  };

  return (
    <div className="space-y-10 pb-12 text-start">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>{isAr ? 'مسار الإتقان والاعتماد الأكاديمي' : 'Mastery & Accreditation Track'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A3E31] dark:text-emerald-300">
          {t.trainingTitle}
        </h1>
        <p className="text-sm text-[#4B5563] dark:text-neutral-400 mt-2 max-w-2xl">
          {t.trainingSubtitle}
        </p>
      </div>

      {/* Main KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: t.doubtsMastered,
            val: stats.doubtsMastered,
            icon: BookOpen,
            color: 'text-emerald-700 dark:text-emerald-400',
          },
          {
            label: t.dialoguesCompleted,
            val: stats.dialoguesCompleted,
            icon: MessageSquareCode,
            color: 'text-teal-700 dark:text-teal-400',
          },
          {
            label: t.trainingHours,
            val: `${stats.totalTrainingHours}h`,
            icon: Clock,
            color: 'text-[#C8A366] dark:text-[#E2C799]',
          },
          {
            label: t.avgScore,
            val: `${stats.rebuttalScoreAverage}%`,
            icon: Trophy,
            color: 'text-amber-600 dark:text-amber-400',
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#6B7280] dark:text-neutral-400">
                  {card.label}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#111827] dark:text-white">
                {card.val}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rank Progression Bar & Certificate Claim */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0A3E31]/10 via-[#C8A366]/10 to-transparent dark:from-[#0E241E] dark:to-[#0A1210] border border-[#0A3E31]/20 dark:border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 flex-1 w-full text-start">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#C8A366]" />
            <span className="text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider">
              {t.currentRank}:
            </span>
            <span className="text-base font-extrabold text-[#0A3E31] dark:text-emerald-300">
              {isAr ? stats.rankAr : stats.rankEn}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-neutral-400 mb-1.5 font-medium">
              <span>{t.levelProgress}</span>
              <span className="font-mono font-bold text-[#0A3E31] dark:text-emerald-300">
                {stats.levelProgress}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0A3E31] to-[#C8A366] dark:from-emerald-500 dark:to-[#E2C799] rounded-full transition-all duration-700"
                style={{ width: `${stats.levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenCertificate}
          className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
        >
          <Award className="w-4 h-4 text-[#C8A366] dark:text-[#E2C799]" />
          <span>{t.claimCertificate}</span>
        </button>
      </div>

      {/* Grid: Topic Progress Radar + Daily Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topic Proficiency Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[#111827] dark:text-white">
              {isAr ? 'مستوى الإتقان بحسب المواضيع' : 'Topic Mastery Breakdown'}
            </h3>
            <span className="text-xs text-[#6B7280] dark:text-neutral-400 font-mono">
              6 {isAr ? 'محاور' : 'axes'}
            </span>
          </div>

          <div className="space-y-3.5">
            {topicProficiency.map((tp, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#374151] dark:text-neutral-300">
                    {isAr ? tp.nameAr : tp.nameEn}
                  </span>
                  <span className="font-mono font-bold text-[#0A3E31] dark:text-emerald-400">
                    {tp.percent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-[#0A3E31] dark:bg-emerald-500 rounded-full"
                    style={{ width: `${tp.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Challenges & Daily Practice */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.dailyChallenge}</span>
            </div>

            <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">
              {isAr
                ? 'مناظرة "المشكك المتهرب" في شبهة تدوين السنة'
                : 'Debate "The Evasive Skeptic" on Hadith Inscription'}
            </h3>

            <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-300 leading-relaxed mb-4">
              {isAr
                ? 'تحدَّ نفسك للرد على قفزات المشكك المتهرب وإلزامه بالصحف المبكرة وصحيفة همام بن منبه دون فقدان الهدوء.'
                : 'Challenge yourself to pin down the evasive skeptic with early manuscript evidence without losing dialetical composure.'}
            </p>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5 flex items-center justify-between text-xs text-[#6B7280] dark:text-neutral-400">
              <span>{isAr ? 'المكافأة: +150 نقطة كفاءة' : 'Reward: +150 Competence Pts'}</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {isAr ? 'متاح الآن' : 'Available'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
            <button
              onClick={onNavigateToSimulator}
              className="flex-1 py-3 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer text-center"
            >
              {isAr ? 'بدء التحدي الآن' : 'Start Challenge Now'}
            </button>
            <button
              onClick={onNavigateToExplore}
              className="px-4 py-3 rounded-xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/20 dark:border-white/10 text-[#0A3E31] dark:text-neutral-300 text-xs font-semibold hover:border-[#0A3E31] transition-colors cursor-pointer"
            >
              {isAr ? 'مراجعة الأدلة أولاً' : 'Study Proofs First'}
            </button>
          </div>
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div>
        <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-4">
          {t.earnedBadges}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 flex items-start gap-4 text-start"
            >
              <div className="text-3xl p-2 rounded-2xl bg-[#F4EFE6] dark:bg-white/5 shrink-0">
                {badge.icon}
              </div>
              <div>
                <div className="font-bold text-sm text-[#111827] dark:text-white">
                  {isAr ? badge.titleAr : badge.titleEn}
                </div>
                <div className="text-xs text-[#6B7280] dark:text-neutral-400 mt-1 leading-relaxed">
                  {isAr ? badge.descAr : badge.descEn}
                </div>
                <div className="text-[10px] font-mono text-[#C8A366] dark:text-[#E2C799] mt-2">
                  {isAr ? `تاريخ الإنجاز: ${badge.unlockedAt}` : `Achieved: ${badge.unlockedAt}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verifiable Certificate Modal */}
      {isCertificateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#FBF9F4] dark:bg-[#0C1714] border-4 border-[#C8A366] rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
            <button
              onClick={() => setIsCertificateOpen(false)}
              className="absolute top-4 end-4 p-2 rounded-xl text-[#6B7280] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header Emblem */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0A3E31] text-[#C8A366] flex items-center justify-center font-['Amiri',serif] font-bold text-3xl shadow-lg border-2 border-[#C8A366]">
              ب
            </div>

            <div>
              <span className="text-xs font-bold text-[#C8A366] uppercase tracking-widest">
                {isAr ? 'شهادة إتقان وكفاءة معتمدة' : 'Official Certificate of Competence'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A3E31] dark:text-emerald-300 mt-1 font-['Cairo',sans-serif]">
                {t.certificateTitle}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
              {isAr
                ? 'تشهد منصة برهان AI بأن الباحث قد اجتاز بنجاح مسارات التدريب والمناظرة الفكرية واستوفى معايير الاستدلال الشرعي والعقلي بدقة وموضوعية.'
                : 'Burhan AI certifies that the scholar has completed rigorous apologetic training and satisfied academic standards in textual and rational argumentation.'}
            </p>

            {/* Recipient Box */}
            <div className="py-4 border-y border-[#C8A366]/30">
              <div className="text-xs text-[#6B7280] dark:text-neutral-400">
                {isAr ? 'مُنحت للباحث:' : 'Awarded To:'}
              </div>
              <div className="text-xl font-bold text-[#0A3E31] dark:text-emerald-400 font-['Amiri',serif] mt-1">
                {isAr ? 'عبد الرحمن بن أحمد الباحث' : 'Abdulrahman Ahmad'}
              </div>
              <div className="text-xs text-[#C8A366] font-mono mt-1">
                ID: BRH-2026-9842A · {isAr ? 'الدرجة: 89.2% (امتياز مع مرتبة الشرف)' : 'Score: 89.2% (Distinction)'}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  alert(isAr ? 'تم تنزيل الشهادة بصيغة PDF بنجاح.' : 'Certificate downloaded successfully.');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الشهادة (PDF)' : 'Download PDF'}</span>
              </button>
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#374151] dark:text-neutral-300 font-semibold text-xs cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
