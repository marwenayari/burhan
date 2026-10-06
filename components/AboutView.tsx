"use client";

import React from "react";
import { Language } from "@/lib/types";
import { TRANSLATIONS } from "@/lib/data/translations";
import {
  BookText,
  ShieldCheck,
  Brain,
  Code2,
  Users,
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface AboutViewProps {
  language: Language;
}

export default function AboutView({ language }: AboutViewProps) {
  const isAr = language === "ar";
  const t = TRANSLATIONS[language];

  const advisoryCouncil = [
    {
      nameAr: "أ. د. عبد الله بن علي الشهري",
      nameEn: "Prof. Abdullah M. Al-Shehri",
      roleAr: "أستاذ العقيدة والمذاهب المعاصرة ومقارنة الأديان",
      roleEn:
        "Professor of Creed, Contemporary Schools of Thought, and Comparative Religion",
      institutionAr: "جامعة الأمير سطام بن عبد العزيز",
      institutionEn: "Prince Sattam bin Abdulaziz University",
    },
    {
      nameAr: "د. سامي عامري",
      nameEn: "Dr. Sami Ameri",
      roleAr: "كبير الباحثين في الفلسفة ومناهج الاستدلال",
      roleEn: "Senior Fellow in Philosophy & Epistemology",
      institutionAr: "مركز براهين للأبحاث ودراسة الإلحاد",
      institutionEn: "Baraheen Research Center",
    },
    {
      nameAr: "د. مروان التونسي",
      nameEn: "Dr. Marwan Al-Tunisi",
      roleAr: "مستشار علوم الحديث ونقد المخطوطات",
      roleEn: "Consultant in Hadith Sciences & Codices",
      institutionAr: "جامعة الزيتونة المعمورة",
      institutionEn: "Ez-Zitouna University",
    },
  ];

  return (
    <div className="space-y-12 pb-12 text-start">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-2">
          <BookText className="w-4 h-4" />
          <span>
            {isAr ? "الرسالة والهوية العلمية" : "Mission & Scholarly Identity"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A3E31] dark:text-emerald-300">
          {t.aboutTitle}
        </h1>
        <p className="text-sm text-[#4B5563] dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed">
          {t.aboutSubtitle}
        </p>
      </div>

      {/* Vision & Core Purpose */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-[#111827] dark:text-white">
          {isAr ? "رؤية مشروع برهان AI" : "The Vision of Burhan AI"}
        </h2>
        <p className="text-sm text-[#4B5563] dark:text-neutral-300 leading-loose">
          {isAr
            ? 'انطلقت منصة "برهان" استجابةً للحاجة الملحة في العصر الرقمي إلى بيئة معرفية تفاعلية تحمي الثوابت الإسلامية وتخاطب العقول المعاصرة بلغة البرهان العقلي والنقلي الرصين. إننا نؤمن بأن الإسلام يمتلك أقوى منظومة براهين في تاريخ الفكر الإنساني، وأن الشبهات لا تصمد أمام التحقيق العلمي الدقيق.'
            : "Burhan AI was conceived in response to the urgent modern imperative for an interactive scholarly ecosystem that fortifies Islamic certainty and addresses contemporary inquiries through rigorous rational proofs and textual authenticity. We believe that verified truth fearlessly invites examination."}
        </p>
      </div>

      {/* Scholarly Advisory Council */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#C8A366]" />
          <h2 className="text-xl font-bold text-[#111827] dark:text-white">
            {isAr
              ? "الهيئة الاستشارية واللجنة العلمية"
              : "Scholarly Advisory Board"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisoryCouncil.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 space-y-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0A3E31]/10 dark:bg-emerald-500/10 text-[#0A3E31] dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
                {isAr ? member.nameAr.charAt(3) || "ع" : "Dr"}
              </div>
              <div className="font-bold text-sm text-[#111827] dark:text-white">
                {isAr ? member.nameAr : member.nameEn}
              </div>
              <div className="text-xs text-[#C8A366] dark:text-[#E2C799] font-medium">
                {isAr ? member.roleAr : member.roleEn}
              </div>
              <div className="text-[11px] text-[#6B7280] dark:text-neutral-400 pt-2 border-t border-black/5 dark:border-white/5">
                {isAr ? member.institutionAr : member.institutionEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap & Tech Integrations (ElevenLabs, MCP, REST APIs) */}
      <div className="p-8 rounded-3xl bg-[#F4EFE6] dark:bg-[#0E1B17] border border-[#0A3E31]/15 dark:border-white/10 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A3E31] dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>{t.integrationsTitle}</span>
          </div>
          <h2 className="text-xl font-bold text-[#111827] dark:text-white">
            {isAr
              ? "هندسة التكامل البرمجي ونقاط الربط (APIs & MCPs)"
              : "Technical Architecture & MCP Integrations"}
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-300 mt-1 max-w-3xl leading-relaxed">
            {t.integrationsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5 space-y-2">
            <div className="font-bold text-xs text-[#0A3E31] dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isAr ? "محرك الحوار Gemini 3.8" : "Gemini 3.8 Flash Engine"}
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 leading-relaxed">
              {isAr
                ? "مفعل وجاهز خادمياً عبر مسار /api/simulator لتوليد ردود واقعية بحسب شخصية المشكك."
                : "Server-side route /api/simulator powered by Gemini 3.8 for adaptive dialectic argumentation."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5 space-y-2">
            <div className="font-bold text-xs text-[#C8A366] dark:text-[#E2C799] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isAr ? "محرك الصوت ElevenLabs" : "ElevenLabs Voice Engine"}
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 leading-relaxed">
              {isAr
                ? "واجهات الصوت مهيأة مع إمكانية التبديل بين النطق التوليدي ومفتاح ElevenLabs الخاص."
                : "UI and state fully wired for ElevenLabs real-time low-latency Arabic/English voice streaming."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5 space-y-2">
            <div className="font-bold text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isAr
                  ? "بروتوكول أدوات الذكاء (MCP)"
                  : "Model Context Protocol"}
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 leading-relaxed">
              {isAr
                ? "تجهيز مسارات استعلامية لربط المساعدين الشخصيين مثل Claude وChatGPT ببنك شبهات برهان."
                : "Exposes standardized tools for Claude & GPT clients to query the Burhan knowledge graph directly."}
            </p>
          </div>
        </div>

        {/* Code Snippet for Developers */}
        <div className="rounded-2xl bg-[#0A1210] text-[#E5E7EB] p-4 text-xs font-mono overflow-x-auto border border-white/10 dir-ltr text-start">
          <div className="text-[10px] text-[#9CA3AF] mb-2">{`// Sample API Integration with Burhan AI Simulator`}</div>
          <pre>{`// POST /api/simulator
const response = await fetch("https://burhan.ai/api/simulator", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    personaId: "stubborn", // "stubborn" | "evasive" | "seeker"
    topic: "Preservation of Hadith",
    messages: [
      { sender: "user", text: "We have early manuscripts like Sahifah of Hammam." }
    ],
    language: "ar"
  })
});
const { replyText, evaluation } = await response.json();`}</pre>
        </div>
      </div>
    </div>
  );
}
