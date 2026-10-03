'use client';

import React, { useState } from 'react';
import { Language, Theme } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';
import {
  User,
  Settings,
  Clock,
  Award,
  Volume2,
  Key,
  ShieldCheck,
  CheckCircle2,
  Save,
  Check,
} from 'lucide-react';

interface ProfileViewProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (th: Theme) => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
}

export default function ProfileView({
  language,
  setLanguage,
  theme,
  setTheme,
  user,
  onOpenAuth,
}: ProfileViewProps) {
  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Adam (English/Arabic)');
  const [speed, setSpeed] = useState('1.0');
  const [savedSettings, setSavedSettings] = useState(false);

  const dialogueHistory = [
    {
      id: 'd-1',
      topicAr: 'شبهة وجود الشر والألم وعلاقته بالحكمة',
      topicEn: 'Problem of Evil vs Divine Wisdom',
      personaAr: 'المشكك العنيد',
      personaEn: 'The Stubborn Skeptic',
      score: 91,
      date: '2026-10-02',
    },
    {
      id: 'd-2',
      topicAr: 'شبهة تدوين السنة النبوية وصحة النقل',
      topicEn: 'Preservation of Prophetic Sunnah',
      personaAr: 'المشكك المتهرب',
      personaEn: 'The Evasive Skeptic',
      score: 87,
      date: '2026-09-30',
    },
    {
      id: 'd-3',
      topicAr: 'حقوق المرأة ونظام الميراث التكاملي',
      topicEn: 'Inheritance and Women’s Equity in Islam',
      personaAr: 'المشكك طالب المعرفة',
      personaEn: 'The Sincere Seeker',
      score: 95,
      date: '2026-09-28',
    },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 text-start">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-2">
          <User className="w-4 h-4" />
          <span>{isAr ? 'الملف الشخصي والإعدادات' : 'Personal Profile & Settings'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A3E31] dark:text-emerald-300">
          {t.navProfile}
        </h1>
      </div>

      {/* User Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4 text-start">
          <div className="w-16 h-16 rounded-2xl bg-[#0A3E31] text-[#C8A366] flex items-center justify-center font-['Amiri',serif] font-bold text-3xl shadow-md">
            {user ? user.name.charAt(0) : 'ب'}
          </div>
          <div>
            <div className="text-xl font-bold text-[#111827] dark:text-white">
              {user ? user.name : (isAr ? 'باحث برهاني (زائر)' : 'Apologetic Scholar (Guest)')}
            </div>
            <div className="text-xs text-[#6B7280] dark:text-neutral-400 mt-0.5">
              {user ? user.email : 'guest@burhan.ai'}
            </div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-md bg-[#0A3E31]/10 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'باحث معتمد في تفنيد الشبهات' : 'Certified Debate Scholar'}</span>
            </div>
          </div>
        </div>

        {!user && (
          <button
            onClick={onOpenAuth}
            className="px-5 py-2.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] text-white text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            {isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dialogue Logs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111827] dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C8A366]" />
              <span>{isAr ? 'سجل المناظرات والحوارات المكتملة' : 'Completed Dialogue History'}</span>
            </h3>
            <span className="text-xs font-mono text-[#6B7280]">
              {dialogueHistory.length} {isAr ? 'جلسات' : 'sessions'}
            </span>
          </div>

          <div className="space-y-3">
            {dialogueHistory.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 flex items-center justify-between gap-4 text-start"
              >
                <div>
                  <div className="text-xs text-[#C8A366] dark:text-[#E2C799] font-medium mb-1">
                    {isAr ? item.personaAr : item.personaEn} · <span className="font-mono text-[11px] text-[#6B7280]">{item.date}</span>
                  </div>
                  <div className="text-sm font-bold text-[#111827] dark:text-white">
                    {isAr ? item.topicAr : item.topicEn}
                  </div>
                </div>

                <div className="text-center shrink-0">
                  <div className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {item.score}%
                  </div>
                  <div className="text-[10px] text-[#6B7280]">
                    {isAr ? 'درجة الحجة' : 'Score'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio & Platform Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handleSaveSettings}
            className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 space-y-5"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#111827] dark:text-white">
              <Volume2 className="w-4 h-4 text-[#C8A366]" />
              <span>{isAr ? 'إعدادات المحرك الصوتي (ElevenLabs API)' : 'Audio & ElevenLabs Voice Engine'}</span>
            </div>

            <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'المنصة تدعم نطق ردود المشككين صوتياً. يمكنك إدخال مفتاح ElevenLabs API الخاص بك أو استخدام المحرك التوليدي الافتراضي.'
                : 'Burhan AI supports speech synthesis. Enter your ElevenLabs API key for high-fidelity Arabic voice modeling, or use default synthesizer.'}
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#374151] dark:text-neutral-300 mb-1.5">
                {isAr ? 'مفتاح ElevenLabs API (اختياري)' : 'ElevenLabs API Key (Optional)'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={elevenLabsKey}
                  onChange={(e) => setElevenLabsKey(e.target.value)}
                  placeholder="xi-api-key-••••••••••••••••"
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0A3E31]"
                />
                <Key className="absolute start-3 top-2.5 w-4 h-4 text-[#9CA3AF]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] dark:text-neutral-300 mb-1.5">
                {isAr ? 'نبرة الصوت المعتمدة للمشكك' : 'Skeptic Persona Voice Style'}
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3E31]"
              >
                <option value="Tariq (Deep Classical Arabic)">طارق (نبرة عربية عميقة وقوية)</option>
                <option value="Hassan (Calm Academic Arabic)">حسان (نبرة هادئة وأكاديمية)</option>
                <option value="Adam (English/Arabic)">آدم (متعدد اللغات عربي/إنجليزي)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] dark:text-neutral-300 mb-1.5">
                {isAr ? 'سرعة الإلقاء' : 'Speech Pace'}: {speed}x
              </label>
              <input
                type="range"
                min="0.75"
                max="1.5"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full accent-[#0A3E31] dark:accent-emerald-500 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              {savedSettings ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{isAr ? 'تم حفظ الإعدادات' : 'Settings Saved'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'حفظ إعدادات الصوت' : 'Save Voice Settings'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Language & Appearance */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 space-y-4">
            <div className="text-sm font-bold text-[#111827] dark:text-white">
              {isAr ? 'المظهر واللغة' : 'Appearance & Locale'}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4B5563] dark:text-neutral-300">
                {isAr ? 'لغة الواجهة الرئيسية' : 'Primary Language'}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    language === 'ar'
                      ? 'bg-[#0A3E31] text-white'
                      : 'bg-black/5 dark:bg-white/5 text-[#4B5563]'
                  }`}
                >
                  عربي
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    language === 'en'
                      ? 'bg-[#0A3E31] text-white'
                      : 'bg-black/5 dark:bg-white/5 text-[#4B5563]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-black/5 dark:border-white/5">
              <span className="text-[#4B5563] dark:text-neutral-300">
                {isAr ? 'الوضع اللوني' : 'Color Mode'}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    theme === 'light'
                      ? 'bg-[#0A3E31] text-white'
                      : 'bg-black/5 dark:bg-white/5 text-[#4B5563]'
                  }`}
                >
                  {isAr ? 'فاتح' : 'Light'}
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    theme === 'dark'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black/5 dark:bg-white/5 text-[#4B5563]'
                  }`}
                >
                  {isAr ? 'داكن' : 'Dark'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
