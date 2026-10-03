'use client';

import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
}: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (isAr ? 'عبد الرحمن الباحث' : 'Abdulrahman Al-Bahith');
    const finalEmail = email.trim() || 'scholar@burhan.ai';
    onLoginSuccess({ name: finalName, email: finalEmail });
    onClose();
  };

  const handleQuickDemo = () => {
    onLoginSuccess({
      name: isAr ? 'طالب علم باحث' : 'Research Scholar',
      email: 'demo@burhan.ai',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#FBF9F4] dark:bg-[#0C1714] border border-[#0A3E31]/20 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-start">
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-xl text-[#6B7280] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0A3E31] dark:bg-emerald-600 text-white flex items-center justify-center font-['Amiri',serif] font-bold text-2xl shadow-md">
            ب
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0A3E31] dark:text-emerald-400 font-['Cairo',sans-serif]">
              {isRegister ? (isAr ? 'إنشاء حساب جديد' : 'Create an Account') : (isAr ? 'تسجيل الدخول لمنصة برهان' : 'Sign in to Burhan AI')}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-neutral-400">
              {isAr ? 'لحفظ تقدمك وشهاداتك وسجلات الحوار' : 'Save your progress, certificates, and dialogue logs'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#374151] dark:text-neutral-300 mb-1.5">
                {isAr ? 'الاسم الكامل أو اللقب' : 'Full Name'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required={isRegister}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'مثال: عبد الله بن أحمد' : 'e.g. Abdullah Ahmad'}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-white dark:bg-[#0E1B17] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500"
                />
                <User className="absolute start-3 top-3 w-4 h-4 text-[#9CA3AF]" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-neutral-300 mb-1.5">
              {isAr ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-white dark:bg-[#0E1B17] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500"
              />
              <Mail className="absolute start-3 top-3 w-4 h-4 text-[#9CA3AF]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] dark:text-neutral-300 mb-1.5">
              {isAr ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-white dark:bg-[#0E1B17] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500"
              />
              <Lock className="absolute start-3 top-3 w-4 h-4 text-[#9CA3AF]" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            {isRegister ? (isAr ? 'تأكيد التسجيل والانضمام' : 'Register Account') : (isAr ? 'دخول للمنصة' : 'Sign In')}
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10 dark:border-white/10" />
          </div>
          <span className="relative px-3 bg-[#FBF9F4] dark:bg-[#0C1714] text-[11px] text-[#6B7280] dark:text-neutral-400">
            {isAr ? 'أو الدخول التجريبي السريع' : 'Or Quick Access'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full py-2.5 rounded-xl border border-[#C8A366]/40 dark:border-[#E2C799]/30 bg-[#C8A366]/10 hover:bg-[#C8A366]/20 text-[#0A3E31] dark:text-[#E2C799] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#C8A366]" />
          <span>{isAr ? 'دخول فوري بحساب باحث تجريبي' : 'One-Click Demo Scholar Access'}</span>
        </button>

        <div className="mt-5 text-center text-xs text-[#6B7280] dark:text-neutral-400">
          {isRegister ? (
            <span>
              {isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-[#0A3E31] dark:text-emerald-400 hover:underline cursor-pointer"
              >
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </span>
          ) : (
            <span>
              {isAr ? 'ليس لديك حساب بعد؟' : "Don't have an account yet?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-[#0A3E31] dark:text-emerald-400 hover:underline cursor-pointer"
              >
                {isAr ? 'أنشئ حساباً مجانياً' : 'Create Free Account'}
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
