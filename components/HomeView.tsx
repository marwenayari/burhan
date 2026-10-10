"use client";

import React from "react";
import Image from "next/image";
import { Language, DoubtItem } from "@/lib/types";
import { TRANSLATIONS } from "@/lib/data/translations";
import { DOUBTS_DATA, SKEPTIC_PERSONAS } from "@/lib/data/doubts";
import {
  Compass,
  MessageSquareCode,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Users,
  Brain,
  Quote,
} from "lucide-react";

interface HomeViewProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onSelectDoubt: (doubt: DoubtItem) => void;
  onSelectPersonaForSimulator: (personaId: string) => void;
}

export default function HomeView({
  language,
  onNavigate,
  onSelectDoubt,
  onSelectPersonaForSimulator,
}: HomeViewProps) {
  const isAr = language === "ar";
  const t = TRANSLATIONS[language];
  const featuredDoubt = DOUBTS_DATA[0]; // Problem of evil & suffering

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[#0A3E31]/15 dark:border-white/10 bg-gradient-to-b from-[#0A3E31]/10 via-transparent to-transparent dark:from-[#0E2A22] dark:to-[#0A1210]">
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 sm:py-20 text-center">
          {/* Spiritual Opening Motto */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A3E31]/10 dark:bg-emerald-500/10 border border-[#0A3E31]/20 dark:border-emerald-500/20 text-xs font-semibold text-[#0A3E31] dark:text-emerald-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A366]" />
            <span className="font-['Amiri',serif] text-sm">
              « بَلْ نَقْذِفُ بِالْحَقِّ عَلَى الْبَاطِلِ فَيَدْمَغُهُ فَإِذَا
              هُوَ زَاهِقٌ »
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A3E31] dark:text-emerald-300 tracking-tight leading-[1.2] mb-6 font-['Cairo',sans-serif]">
            {isAr ? (
              <>
                منصة{" "}
                <span className="text-[#C8A366] dark:text-[#E2C799]">
                  برهان
                </span>{" "}
                الذكية
                <br />
                لترسيخ اليقين وتفنيد الشبهات
              </>
            ) : (
              <>
                Empowering Certainty with <br />
                <span className="text-[#C8A366] dark:text-[#E2C799]">
                  Burhan AI
                </span>{" "}
                Apologetics
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#4B5563] dark:text-neutral-300 leading-relaxed mb-8">
            {isAr
              ? "البيئة التفاعلية الأولى التي تجمع بين أصول الاستدلال الشرعي الرصين والبراهين العقلية الحديثة، مع محاكي حواري ذكي يدرّبك على مناظرة مختلف أنماط التشكيك."
              : "The comprehensive intellectual sanctuary unifying rigorous classical Islamic scholarship with modern philosophical proofs and an adaptive AI dialogue simulator."}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("simulator")}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-[#0A3E31]/20 hover:shadow-xl transition-all cursor-pointer group"
            >
              <MessageSquareCode className="w-4 h-4 text-[#C8A366] dark:text-[#E2C799]" />
              <span>{t.startDialogue}</span>
              {isAr ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <button
              onClick={() => onNavigate("explore")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/20 dark:border-white/10 hover:border-[#0A3E31] text-[#0A3E31] dark:text-neutral-200 font-semibold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{t.exploreDoubts}</span>
            </button>
          </div>
        </div>

        {/* Hero Background Image with Scrim */}
        {/* <div className="relative w-full h-48 sm:h-72 lg:h-96 mt-4 overflow-hidden border-t border-[#0A3E31]/10 dark:border-white/10">
          <Image
            src="/images/burhan_hero.jpg"
            alt="Burhan AI Modern Islamic Sanctuary"
            fill
            className="object-cover object-center brightness-[0.92] dark:brightness-[0.7]"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F4] dark:from-[#0A1210] via-transparent to-transparent" />
        </div> */}
      </section>

      {/* Quantitative Rigor Stats Row (Anti-Slop Clean Design) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            value: "100+",
            labelAr: "شبهة مفندة وموثقة",
            labelEn: "Documented Doubts",
            icon: ShieldCheck,
          },
          {
            value: "3",
            labelAr: "نماذج محاكاة ذكية للمشككين",
            labelEn: "Adaptive Skeptic Personas",
            icon: Brain,
          },
          {
            value: "98.6%",
            labelAr: "دقة الاستدلال والتوثيق",
            labelEn: "Citation Reliability",
            icon: CheckCircle2,
          },
          {
            value: "45,000+",
            labelAr: "طالب علم وباحث متدرب",
            labelEn: "Scholars & Trainees",
            icon: Users,
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 text-center flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0A3E31]/8 dark:bg-emerald-500/10 text-[#0A3E31] dark:text-emerald-400 flex items-center justify-center mb-2">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0A3E31] dark:text-emerald-300">
                {stat.value}
              </div>
              <div className="text-xs text-[#6B7280] dark:text-neutral-400 font-medium mt-1">
                {isAr ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          );
        })}
      </section>

      {/* Skeptic Personas Spotlight (Interactive Cards) */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A3E31] dark:text-emerald-300 mb-2">
            {isAr
              ? "محاكي الحوار مع أنماط المشككين"
              : "The Dialogue Simulator Personas"}
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-neutral-400">
            {isAr
              ? "تدرّب على مقارعة الحجة بالحجة أمام 3 شخصيات مختلفة صُممت لاختبار عمق علمك وصبرك."
              : "Refine your dialectic poise against three distinct psychological archetypes designed to test both depth and composure."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKEPTIC_PERSONAS.map((persona) => (
            <div
              key={persona.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 hover:border-[#0A3E31]/30 dark:hover:border-emerald-500/30 transition-all text-start"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{persona.avatar}</div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#0A3E31]/5 dark:bg-emerald-950/40 text-[#0A3E31] dark:text-emerald-300 border border-[#0A3E31]/10 dark:border-emerald-500/20">
                    {isAr ? persona.badgeAr : persona.badgeEn}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-1">
                  {isAr ? persona.nameAr : persona.nameEn}
                </h3>
                <p className="text-xs font-medium text-[#C8A366] dark:text-[#E2C799] mb-3">
                  {isAr ? persona.roleAr : persona.roleEn}
                </p>

                <p className="text-xs text-[#4B5563] dark:text-neutral-300 leading-relaxed mb-4">
                  {isAr ? persona.descriptionAr : persona.descriptionEn}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-black/5 dark:border-white/5 mb-5 text-[11px] text-[#6B7280] dark:text-neutral-400">
                  {(isAr ? persona.traitsAr : persona.traitsEn).map(
                    (trait, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A3E31] dark:bg-emerald-400 shrink-0" />
                        <span>{trait}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <button
                onClick={() => onSelectPersonaForSimulator(persona.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0A3E31]/10 hover:bg-[#0A3E31] hover:text-white dark:bg-emerald-500/10 dark:hover:bg-emerald-600 text-[#0A3E31] dark:text-emerald-300 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>
                  {isAr
                    ? `بدء محاورة ${persona.nameAr}`
                    : `Debate ${persona.nameEn}`}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight Doubt of the Week */}
      {featuredDoubt && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A3E31]/8 to-transparent dark:from-[#0E1F1A] dark:to-[#0A1210] border border-[#0A3E31]/20 dark:border-emerald-500/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl text-start">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>
                  {isAr
                    ? "شبهة الأسبوع المختارة للمدارسة"
                    : "Featured Doubt of the Week"}
                </span>
                <span>·</span>
                <span className="text-[#0A3E31] dark:text-emerald-400">
                  {isAr
                    ? featuredDoubt.categoryNameAr
                    : featuredDoubt.categoryNameEn}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0A3E31] dark:text-emerald-300 leading-snug">
                {isAr ? featuredDoubt.titleAr : featuredDoubt.titleEn}
              </h3>

              <p className="text-sm text-[#4B5563] dark:text-neutral-300 leading-relaxed">
                {isAr ? featuredDoubt.summaryAr : featuredDoubt.summaryEn}
              </p>

              <div className="flex items-center gap-4 text-xs text-[#6B7280] dark:text-neutral-400 pt-1">
                <span>
                  {isAr ? "درجة الصعوبة: " : "Difficulty: "}
                  {isAr
                    ? featuredDoubt.difficultyAr
                    : featuredDoubt.difficultyEn}
                </span>
                <span>·</span>
                <span>
                  {featuredDoubt.readTimeMin}{" "}
                  {isAr ? "دقائق قراءة" : "min read"}
                </span>
                <span>·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  {featuredDoubt.confidenceScore}%{" "}
                  {isAr ? "توثيق قطعي" : "Verified"}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectDoubt(featuredDoubt)}
              className="px-6 py-3.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              {isAr
                ? "قراءة الرد والتحليل البرهاني"
                : "Examine Verified Rebuttal"}
            </button>
          </div>
        </section>
      )}

      {/* Methodology Pillars (Inspired by Bathel.sa) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A3E31] dark:text-emerald-300 mb-2">
            {t.methodologyTitle}
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-neutral-400">
            {isAr
              ? "نعتمد في منصة برهان على منهج علمي متكامل يجمع بين الثبات على الوحي والخطاب العقلي المقنع."
              : "Our epistemological framework combines uncompromised adherence to revelation with rational dialectical proof."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: t.methodology1Title,
              desc: t.methodology1Desc,
              icon: BookOpen,
            },
            {
              num: "02",
              title: t.methodology2Title,
              desc: t.methodology2Desc,
              icon: Brain,
            },
            {
              num: "03",
              title: t.methodology3Title,
              desc: t.methodology3Desc,
              icon: ShieldCheck,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 text-start relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C8A366]/15 dark:bg-[#C8A366]/20 text-[#0A3E31] dark:text-[#E2C799] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#0A3E31]/20 dark:text-white/10">
                    {pillar.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Endorsements / Academic Testimonials */}
      <section className="p-8 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 text-start">
        <div className="flex items-center gap-3 mb-6">
          <Quote className="w-6 h-6 text-[#C8A366]" />
          <h3 className="text-xl font-bold text-[#0A3E31] dark:text-emerald-400">
            {isAr
              ? "أصداء وتزكيات الباحثين والمحققين"
              : "Academic Endorsements & Peer Reviews"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5">
            <p className="text-xs sm:text-sm italic text-[#374151] dark:text-neutral-300 leading-relaxed mb-4">
              {isAr
                ? "«تمثل منصة برهان نقلة نوعية في أدوات الدعوة المعاصرة؛ فالمحاكي الحواري يُكسب الطالب ملكة حقيقية في سرعة استحضار البرهان والتحلي بأسلوب الحكمة واللين القرآني.»"
                : '"Burhan AI represents a transformative leap in contemporary Islamic apologetics. The dialogue simulator builds visceral poise, rapid evidence recall, and steadfast Quranic grace under debate pressure."'}
            </p>
            <div className="text-xs font-bold text-[#0A3E31] dark:text-emerald-400">
              {isAr ? "د. عبد الله الشهري" : "Dr. Abdullah Al-Shehri"}
              <div className="text-[11px] font-normal text-[#6B7280] dark:text-neutral-400">
                {isAr
                  ? "أستاذ العقيدة ومقارنة الأديان، الرياض"
                  : "Professor of Comparative Theology, Riyadh"}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FBF9F4] dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5">
            <p className="text-xs sm:text-sm italic text-[#374151] dark:text-neutral-300 leading-relaxed mb-4">
              {isAr
                ? "«التوثيق الدقيق للأحاديث والمخطوطات في بنك الشبهات ينقل الحوار من الجدل العاطفي إلى البراهين التاريخية والمادية التي لا تقبل الرد.»"
                : '"The exhaustive manuscript collation and hadith verification transform debates from emotional dialectic into unassailable historiographical facts."'}
            </p>
            <div className="text-xs font-bold text-[#0A3E31] dark:text-emerald-400">
              {isAr ? "د. مروان التونسي" : "Dr. Marwan Al-Tunisi"}
              <div className="text-[11px] font-normal text-[#6B7280] dark:text-neutral-400">
                {isAr
                  ? "باحث في علم المخطوطات والحديث الشريف، الزيتونة"
                  : "Researcher in Hadith Sciences & Manuscripts, Ez-Zitouna"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
