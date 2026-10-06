'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  SkepticPersonaId,
  Language,
  ChatMessage,
  DoubtItem,
} from '@/lib/types';
import { SKEPTIC_PERSONAS, DOUBTS_DATA } from '@/lib/data/doubts';
import { TRANSLATIONS } from '@/lib/data/translations';
import {
  clampScore,
  DEBATE_TOPICS,
  PERSONA_DIFFICULTY,
  DebateEvaluationToolParams,
} from '@/lib/elevenlabs';
import VoiceDebateStage from '@/components/VoiceDebateStage';
import {
  AudioLines,
  Keyboard,
  MessageSquareCode,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  Share2,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Radio,
  BookOpen,
  Mic,
  Copy,
  Check,
} from 'lucide-react';

type SessionMode = 'text' | 'voice';

// Persona's first line: opens the text chat, and is sent to the voice agent as `opening_line`.
const getOpeningLine = (personaId: SkepticPersonaId, topic: string, isAr: boolean) => {
  const initialOpening: Record<SkepticPersonaId, { ar: string; en: string }> = {
    stubborn: {
      ar: `أهلاً بك. قرأت الكثير من محاولات التبرير في موضوع "${topic}"، لكني لم أجد دليلاً واحداً مقنعاً يخلو من الدور المنطقي أو المصادرة على المطلوب! كيف تثبت لي وجهة نظرك دون أن تطلب مني الإيمان المسبق؟`,
      en: `Greetings. I have analyzed countless attempts to rationalize "${topic}", but failed to find a single argument free of circular logic. How do you objectively prove your position without presupposing scripture?`,
    },
    evasive: {
      ar: `مرحباً، أردت الحديث معك حول "${topic}". كيف يمكن لعقل حر أن يقبل بهذه المفارقة في عصر الاكتشافات العلمية والفكر الإنساني المعاصر؟`,
      en: `Hello. Let us discuss "${topic}". How can an objective intellect accept such an apparent paradox in our age of scientific clarity and moral philosophy?`,
    },
    seeker: {
      ar: `السلام عليكم، لقد شغلتني مسألة "${topic}" طويلاً وتسببت لي في حيرة حقيقية. أبحث عن فهم هادئ ومقنع يزيل هذا الإشكال ويخاطب العقل والوجدان بصدق. فما هو البيان الشافي لديكم؟`,
      en: `Peace be upon you. The dilemma of "${topic}" has weighed heavily on my thoughts. I am sincerely seeking a compassionate, coherent explanation that satisfies both intellect and soul. How do you articulate this truth?`,
    },
  };
  return isAr ? initialOpening[personaId].ar : initialOpening[personaId].en;
};

interface SimulatorViewProps {
  language: Language;
  initialPersonaId?: SkepticPersonaId;
  initialTopic?: string;
  onSessionComplete?: (score: { strength: number; source: number; manner: number }) => void;
}

export default function SimulatorView({
  language,
  initialPersonaId = 'stubborn',
  initialTopic,
  onSessionComplete,
}: SimulatorViewProps) {
  const isAr = language === 'ar';
  const t = TRANSLATIONS[language];

  // Persona and topic can be unselected; in voice mode the user then says them to the agent
  const [selectedPersonaId, setSelectedPersonaId] =
    useState<SkepticPersonaId | null>(initialPersonaId);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    initialTopic || (isAr ? DEBATE_TOPICS[0].ar : DEBATE_TOPICS[0].en)
  );
  const [customTopic, setCustomTopic] = useState('');
  const [sessionMode, setSessionMode] = useState<SessionMode>('voice');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [hasVoiceEvaluation, setHasVoiceEvaluation] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // Live Rubric Evaluation
  const [currentScore, setCurrentScore] = useState({
    strength: 85,
    sourceQuality: 80,
    manner: 90,
    strengthsText: isAr
      ? 'استدلال سليم يبدأ بالمسلمات العقلية المشتركة.'
      : 'Sound starting premise using shared rational axioms.',
    improvementsText: isAr
      ? 'استحضر آية كريمة أو حديثاً مخرجاً لتعزيز قوة البرهان الإلزامي.'
      : 'Integrate an explicit Quranic verse or verified Hadith citation to seal the argument.',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedPersona =
    SKEPTIC_PERSONAS.find((p) => p.id === selectedPersonaId) ||
    SKEPTIC_PERSONAS[0];

  const activeTopic = customTopic.trim() || selectedTopic;
  const isVoiceSession = isSessionActive && sessionMode === 'voice';

  // Debate difficulty follows the selected persona (see the persona badges)
  const selectedDifficulty = selectedPersonaId ? PERSONA_DIFFICULTY[selectedPersonaId] : null;
  const hasFullSelection = selectedPersonaId !== null && activeTopic !== '';
  // Text mode needs both; voice mode lets the agent ask for whatever is missing
  const canStartSession = sessionMode === 'voice' || hasFullSelection;

  // Called by the voice agent through the `update_debate_evaluation` client tool
  const handleVoiceEvaluation = useCallback((params: DebateEvaluationToolParams) => {
    setHasVoiceEvaluation(true);
    setCurrentScore((prev) => ({
      strength: clampScore(params.strength, prev.strength),
      sourceQuality: clampScore(params.source_quality, prev.sourceQuality),
      manner: clampScore(params.manner, prev.manner),
      strengthsText: params.strengths_feedback || prev.strengthsText,
      improvementsText: params.improvement_feedback || prev.improvementsText,
    }));
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech synthesis for voice chat simulation
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis)
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isAr ? 'ar-SA' : 'en-US';
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Start Session
  const handleStartSession = () => {
    setIsSessionActive(true);

    // Voice sessions are run end-to-end by the ElevenLabs agent
    if (sessionMode === 'voice') {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setMessages([]);
      return;
    }

    const openingMessage: ChatMessage = {
      id: 'init-1',
      sender: 'skeptic',
      text: getOpeningLine(selectedPersona.id, activeTopic, isAr),
      timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([openingMessage]);
    speakText(openingMessage.text);
  };

  // Send User Message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaId: selectedPersona.id,
          messages: updatedMessages,
          topic: activeTopic,
          language,
        }),
      });

      const data = await res.json();

      const skepticReplyMsg: ChatMessage = {
        id: `skeptic-${Date.now()}`,
        sender: 'skeptic',
        text: data.replyText,
        timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        evaluation: data.evaluation,
      };

      setMessages((prev) => [...prev, skepticReplyMsg]);
      speakText(data.replyText);

      if (data.evaluation) {
        setCurrentScore({
          strength: data.evaluation.strength || 85,
          sourceQuality: data.evaluation.sourceQuality || 80,
          manner: data.evaluation.manner || 90,
          strengthsText: isAr
            ? data.evaluation.strengthsTextAr
            : data.evaluation.strengthsTextEn,
          improvementsText: isAr
            ? data.evaluation.improvementsTextAr
            : data.evaluation.improvementsTextEn,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTranscript = () => {
    const transcript = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'المحاور' : selectedPersona.nameAr}: ${m.text}`)
      .join('\n\n');

    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(transcript);
      setCopiedTranscript(true);
      setTimeout(() => setCopiedTranscript(false), 2000);
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSessionActive(false);
    setMessages([]);
    setIsSpeaking(false);
    setHasVoiceEvaluation(false);
  };

  return (
    <div className="space-y-6 pb-12 text-start">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#C8A366] dark:text-[#E2C799] uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>{isAr ? 'بيئة المحاكاة الحوارية التفاعلية' : 'Interactive Dialogue Sandbox'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A3E31] dark:text-emerald-300">
            {t.simulatorTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-neutral-400 mt-1 max-w-xl">
            {t.simulatorSubtitle}
          </p>
        </div>

        {/* Voice and Controls Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {sessionMode === 'text' && (
            <button
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (!next && typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                voiceEnabled
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-[#0E1B17] text-[#4B5563] dark:text-neutral-300 border-[#0A3E31]/15 dark:border-white/10'
              }`}
              title="تفعيل/تعطيل الصوت التفاعلي (مجهز لـ ElevenLabs API)"
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{t.voiceActive}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{t.voiceInactive}</span>
                </>
              )}
            </button>
          )}

          {isSessionActive && (
            <>
              {!isVoiceSession && (
                <button
                  onClick={handleCopyTranscript}
                  className="p-2 rounded-xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/15 dark:border-white/10 text-[#4B5563] dark:text-neutral-300 hover:text-[#0A3E31] transition-colors cursor-pointer"
                  title={t.exportTranscript}
                >
                  {copiedTranscript ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/15 dark:border-white/10 text-[#4B5563] dark:text-neutral-300 hover:text-rose-600 transition-colors cursor-pointer"
                title={t.resetDialogue}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {!isSessionActive ? (
        /* Configuration Stage (Before starting) */
        <div className="space-y-8 bg-white dark:bg-[#0E1B17] p-6 sm:p-8 rounded-3xl border border-[#0A3E31]/10 dark:border-white/10 shadow-sm">
          {/* 1. Choose Persona */}
          <div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white mb-3">
              {t.selectPersona}:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SKEPTIC_PERSONAS.map((persona) => {
                const isSelected = selectedPersonaId === persona.id;
                return (
                  <div
                    key={persona.id}
                    onClick={() => setSelectedPersonaId(isSelected ? null : persona.id)}
                    aria-pressed={isSelected}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-start ${
                      isSelected
                        ? 'border-[#0A3E31] dark:border-emerald-500 bg-[#0A3E31]/5 dark:bg-emerald-950/20 shadow-md ring-2 ring-[#0A3E31]/20'
                        : 'border-[#0A3E31]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] hover:border-[#0A3E31]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{persona.avatar}</span>
                      <span className="text-[11px] font-semibold text-[#0A3E31] dark:text-emerald-300 bg-white dark:bg-black/30 px-2 py-0.5 rounded-md border border-[#0A3E31]/10">
                        {isAr ? persona.badgeAr : persona.badgeEn}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[#111827] dark:text-white mb-1">
                      {isAr ? persona.nameAr : persona.nameEn}
                    </div>
                    <div className="text-xs text-[#C8A366] dark:text-[#E2C799] font-medium mb-2">
                      {isAr ? persona.roleAr : persona.roleEn}
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {isAr ? persona.descriptionAr : persona.descriptionEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Choose Topic */}
          <div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white mb-3">
              {t.selectTopic}:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {DEBATE_TOPICS.map((top) => {
                const topicText = isAr ? top.ar : top.en;
                const isSelected = selectedTopic === topicText && !customTopic;
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(isSelected ? '' : topicText);
                      setCustomTopic('');
                    }}
                    aria-pressed={isSelected}
                    className={`p-3.5 rounded-xl border text-xs font-semibold text-start transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A3E31] text-white border-[#0A3E31] shadow-sm'
                        : 'bg-[#FBF9F4] dark:bg-[#0A1210] text-[#374151] dark:text-neutral-300 border-[#0A3E31]/10 dark:border-white/10 hover:border-[#0A3E31]/30'
                    }`}
                  >
                    {topicText}
                  </button>
                );
              })}
            </div>

            {/* Custom Topic Input */}
            <div className="relative">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder={t.customTopicPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] text-xs text-[#111827] dark:text-neutral-200 placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* 3. Choose Session Mode */}
          <div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white mb-3">
              {isAr ? 'اختر طريقة المحاورة' : 'Choose how to debate'}:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  {
                    id: 'voice',
                    Icon: AudioLines,
                    titleAr: 'مناظرة صوتية مباشرة',
                    titleEn: 'Live voice debate',
                    descAr: 'حاور المشكك بصوتك في الزمن الحقيقي، كما في مناظرة حقيقية.',
                    descEn: 'Speak with the skeptic in real time, like a real debate.',
                    badgeAr: 'جديد',
                    badgeEn: 'New',
                  },
                  {
                    id: 'text',
                    Icon: Keyboard,
                    titleAr: 'حوار نصي مكتوب',
                    titleEn: 'Written dialogue',
                    descAr: 'اكتب ردودك بتأنٍّ وتلقَّ تقييماً مفصلاً بعد كل رد.',
                    descEn: 'Compose each rebuttal carefully and get scored after every turn.',
                  },
                ] as const
              ).map((mode) => {
                const isSelected = sessionMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSessionMode(mode.id)}
                    aria-pressed={isSelected}
                    className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#0A3E31] dark:border-emerald-500 bg-[#0A3E31]/5 dark:bg-emerald-950/20 shadow-md ring-2 ring-[#0A3E31]/20'
                        : 'border-[#0A3E31]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] hover:border-[#0A3E31]/30'
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0A3E31] dark:bg-emerald-600 text-white'
                          : 'bg-[#0A3E31]/5 dark:bg-white/5 text-[#0A3E31] dark:text-emerald-400'
                      }`}
                    >
                      <mode.Icon className="w-5 h-5" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-2 font-bold text-sm text-[#111827] dark:text-white mb-1">
                        {isAr ? mode.titleAr : mode.titleEn}
                        {'badgeAr' in mode && (
                          <span className="text-[10px] font-semibold text-[#C8A366] dark:text-[#E2C799] bg-[#C8A366]/10 px-1.5 py-0.5 rounded-md border border-[#C8A366]/20">
                            {isAr ? mode.badgeAr : mode.badgeEn}
                          </span>
                        )}
                      </span>
                      <span className="block text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                        {isAr ? mode.descAr : mode.descEn}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start CTA */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#6B7280] dark:text-neutral-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C8A366] shrink-0" />
              <span>
                {hasFullSelection
                  ? isAr
                    ? 'سيتم تقييم ردودك فورياً على محاور قوة الحجة، وجودة المصدر، ولين الجانب.'
                    : 'Your arguments will be scored in real-time across rigor, citation quality, and manner.'
                  : sessionMode === 'voice'
                    ? isAr
                      ? 'لم تحدد كل الخيارات؛ أخبر المحاور صوتياً بنمط المشكك وموضوع المناظرة.'
                      : 'Not everything is selected; tell the agent the skeptic type and topic by voice.'
                    : isAr
                      ? 'اختر نمط المشكك وموضوع المناظرة لبدء الحوار النصي.'
                      : 'Choose a skeptic and a topic to start the written dialogue.'}
              </span>
            </div>

            <button
              onClick={handleStartSession}
              disabled={!canStartSession}
              className="px-6 py-3 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {sessionMode === 'voice' ? (
                <AudioLines className="w-4 h-4" />
              ) : (
                <MessageSquareCode className="w-4 h-4" />
              )}
              <span>
                {sessionMode === 'voice'
                  ? isAr
                    ? 'بدء المناظرة الصوتية'
                    : 'Start voice debate'
                  : t.startSession}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Dialogue Session Layout: Chat Box + Real-time Rubric Drawer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {isVoiceSession ? (
            /* Voice Stage (8 cols on lg): embedded ElevenLabs agent */
            <VoiceDebateStage
              className="lg:col-span-8 h-[650px]"
              language={language}
              persona={selectedPersonaId ? selectedPersona : null}
              topic={activeTopic}
              difficulty={selectedDifficulty}
              onEvaluation={handleVoiceEvaluation}
            />
          ) : (
            /* Main Chat Area (8 cols on lg) */
            <div className="lg:col-span-8 flex flex-col h-[650px] bg-white dark:bg-[#0E1B17] rounded-3xl border border-[#0A3E31]/10 dark:border-white/10 shadow-sm overflow-hidden">
              {/* Chat Top Banner */}
              <div className="px-5 py-3.5 border-b border-[#0A3E31]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedPersona.avatar}</span>
                  <div>
                    <div className="font-bold text-sm text-[#111827] dark:text-white">
                      {isAr ? selectedPersona.nameAr : selectedPersona.nameEn}
                    </div>
                    <div className="text-[11px] text-[#6B7280] dark:text-neutral-400 truncate max-w-xs sm:max-w-md">
                      {activeTopic}
                    </div>
                  </div>
                </div>

                {/* Speaking Indicator */}
                {isSpeaking && (
                  <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-soundwave-1" />
                    <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-soundwave-2" />
                    <span className="w-1.5 h-2 bg-emerald-500 rounded-full animate-soundwave-3" />
                    <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 ms-1">
                      {isAr ? 'يتحدث...' : 'Speaking...'}
                    </span>
                  </div>
                )}
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isUser ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[78%]">
                        {!isUser && (
                          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 text-base mb-1">
                            {selectedPersona.avatar}
                          </div>
                        )}

                        <div
                          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isUser
                              ? 'bg-[#0A3E31] text-white rounded-br-xs dark:bg-emerald-700'
                              : 'bg-[#F4EFE6] dark:bg-[#122420] text-[#1F2937] dark:text-neutral-100 rounded-bl-xs border border-[#0A3E31]/10 dark:border-white/5'
                          }`}
                        >
                          {msg.text}
                        </div>

                        {isUser && (
                          <div className="w-8 h-8 rounded-full bg-[#C8A366] text-white font-bold flex items-center justify-center shrink-0 text-xs mb-1">
                            {isAr ? 'أنت' : 'You'}
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#9CA3AF] px-10 mt-1 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-neutral-400 p-2">
                    <div className="w-2 h-2 rounded-full bg-[#0A3E31] dark:bg-emerald-400 animate-ping" />
                    <span>
                      {isAr
                        ? `${selectedPersona.nameAr} يفكر في الرد...`
                        : `${selectedPersona.nameEn} is contemplating rebuttal...`}
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-[#0A3E31]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] flex items-center gap-2"
              >
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder={t.userTurnPlaceholder}
                  className="flex-1 max-h-24 resize-none px-4 py-2.5 rounded-xl border border-[#0A3E31]/20 dark:border-white/10 bg-white dark:bg-[#0E1B17] text-xs sm:text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0A3E31] dark:focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-3 rounded-xl bg-[#0A3E31] dark:bg-emerald-600 hover:bg-[#083227] dark:hover:bg-emerald-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4 rtl:rotate-180" />
                </button>
              </form>
            </div>
          )}

          {/* Live Evaluation & Coaching Drawer (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0E1B17] border border-[#0A3E31]/10 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A3E31] dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.evaluationPanel}</span>
                </div>
                <span
                  className={`text-[10px] text-[#6B7280] dark:text-neutral-400 ${
                    isVoiceSession && !hasVoiceEvaluation ? '' : 'font-mono'
                  }`}
                >
                  {isVoiceSession && !hasVoiceEvaluation
                    ? isAr
                      ? 'بانتظار ردك الأول'
                      : 'Awaiting your first answer'
                    : isAr
                      ? 'تقييم فوري'
                      : 'Live Rubric'}
                </span>
              </div>

              {/* Rubric Bars */}
              <div
                className={`space-y-4 transition-opacity duration-500 ${
                  isVoiceSession && !hasVoiceEvaluation ? 'opacity-40' : ''
                }`}
              >
                {/* 1. Strength */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#374151] dark:text-neutral-300">
                      {t.argumentStrength}
                    </span>
                    <span className="font-mono font-bold text-[#0A3E31] dark:text-emerald-400">
                      {currentScore.strength}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${currentScore.strength}%` }}
                    />
                  </div>
                </div>

                {/* 2. Source Quality */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#374151] dark:text-neutral-300">
                      {t.sourceQuality}
                    </span>
                    <span className="font-mono font-bold text-[#C8A366] dark:text-[#E2C799]">
                      {currentScore.sourceQuality}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-[#C8A366] rounded-full transition-all duration-500"
                      style={{ width: `${currentScore.sourceQuality}%` }}
                    />
                  </div>
                </div>

                {/* 3. Manner / Wisdom */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#374151] dark:text-neutral-300">
                      {t.mannerAndWisdom}
                    </span>
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                      {currentScore.manner}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-500"
                      style={{ width: `${currentScore.manner}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Coach Feedback Box */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FBF9F4] dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C8A366] dark:text-[#E2C799]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.coachFeedback}</span>
                </div>
                <p className="text-xs text-[#374151] dark:text-neutral-300 leading-relaxed">
                  <strong>{isAr ? 'نقطة القوة: ' : 'Strength: '}</strong>
                  {currentScore.strengthsText}
                </p>
                <p className="text-xs text-[#4B5563] dark:text-neutral-400 leading-relaxed pt-2 border-t border-black/5 dark:border-white/5">
                  <strong>{isAr ? 'توجيه للتحسين: ' : 'Improvement: '}</strong>
                  {currentScore.improvementsText}
                </p>
              </div>
            </div>

            {/* Persona Quick Insight Card */}
            {selectedPersonaId && (
              <div className="p-5 rounded-3xl bg-[#F4EFE6] dark:bg-[#0A1210] border border-[#0A3E31]/10 dark:border-white/5 text-xs text-[#4B5563] dark:text-neutral-400">
                <div className="font-bold text-[#0A3E31] dark:text-emerald-400 mb-1">
                  {isAr ? 'نصيحة لمناظرة هذا النمط:' : 'Tactical Advice for this Persona:'}
                </div>
                <p className="leading-relaxed">
                  {selectedPersonaId === 'stubborn' &&
                    (isAr
                      ? 'المشكك العنيد لا يتراجع بسهولة؛ لا تغضب، واعتمد على الإلزام المنطقي وإرجاع المسألة إلى أصولها الأولى.'
                      : 'The Stubborn skeptic does not yield readily; maintain poise and tether your proofs to inescapable first principles.')}
                  {selectedPersonaId === 'evasive' &&
                    (isAr
                      ? 'المشكك المتهرب يقفز سريعاً؛ ذكّره بأدب بحسم النقطة الأولى قبل الانتقال لأي شبهة فرعية جديدة.'
                      : 'The Evasive skeptic shifts topics rapidly; gently invite them to conclude the primary point before branching.')}
                  {selectedPersonaId === 'seeker' &&
                    (isAr
                      ? 'طالب المعرفة يبحث عن السكينة واليقين؛ قدّم له الحكمة والمقصد الإلهي بأسلوب رحيم ومؤصل.'
                      : 'The Sincere Seeker yearns for clarity; present transcendent wisdom and divine mercy with warmth.')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
