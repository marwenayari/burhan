'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import { Mic, ShieldCheck } from 'lucide-react';
import { Language, SkepticPersona } from '@/lib/types';
import {
  ELEVENLABS_AGENT_ID,
  ELEVENLABS_WIDGET_SRC,
  DebateDynamicVariables,
  DebateEvaluationToolParams,
} from '@/lib/elevenlabs';

interface ConvaiCallEvent extends Event {
  detail: {
    config: {
      clientTools?: Record<string, (params: Record<string, unknown>) => unknown>;
    };
  };
}

interface VoiceDebateStageProps {
  language: Language;
  persona: SkepticPersona;
  topic: string;
  variables: DebateDynamicVariables;
  onEvaluation: (params: DebateEvaluationToolParams) => void;
  className?: string;
}

/**
 * Hosts the ElevenLabs <elevenlabs-convai> widget inside the simulator layout.
 * The widget is normally a floating, viewport-fixed bubble; the `.burhan-voice-stage`
 * rules in globals.css re-anchor it to this panel and keep it permanently expanded.
 */
export default function VoiceDebateStage({
  language,
  persona,
  topic,
  variables,
  onEvaluation,
  className = '',
}: VoiceDebateStageProps) {
  const isAr = language === 'ar';
  const widgetRef = useRef<HTMLElement>(null);
  const onEvaluationRef = useRef(onEvaluation);
  const [hasCallStarted, setHasCallStarted] = useState(false);

  useEffect(() => {
    onEvaluationRef.current = onEvaluation;
  }, [onEvaluation]);

  const dynamicVariables = useMemo(() => JSON.stringify(variables), [variables]);

  // Fired by the widget right before it connects; lets us register client tools.
  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const handleCall = (event: Event) => {
      setHasCallStarted(true);
      const { config } = (event as ConvaiCallEvent).detail;
      config.clientTools = {
        ...config.clientTools,
        update_debate_evaluation: (params) => {
          onEvaluationRef.current(params as DebateEvaluationToolParams);
          return 'evaluation displayed to the user';
        },
      };
    };

    widget.addEventListener('elevenlabs-convai:call', handleCall);
    return () => widget.removeEventListener('elevenlabs-convai:call', handleCall);
  }, []);

  return (
    <div
      className={`flex flex-col bg-white dark:bg-[#0E1B17] rounded-3xl border border-[#0A3E31]/10 dark:border-white/10 shadow-sm overflow-hidden ${className}`}
    >
      <Script id="elevenlabs-convai-widget" src={ELEVENLABS_WIDGET_SRC} strategy="afterInteractive" />

      {/* Stage Top Banner */}
      <div className="px-5 py-3.5 border-b border-[#0A3E31]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl">{persona.avatar}</span>
          <div className="min-w-0">
            <div className="font-bold text-sm text-[#111827] dark:text-white">
              {isAr ? persona.nameAr : persona.nameEn}
            </div>
            <div className="text-[11px] text-[#6B7280] dark:text-neutral-400 truncate max-w-xs sm:max-w-md">
              {topic}
            </div>
          </div>
        </div>

        {hasCallStarted ? (
          <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
            <span className="w-1 h-3 bg-emerald-500 rounded-full animate-soundwave-1" />
            <span className="w-1 h-4 bg-emerald-500 rounded-full animate-soundwave-2" />
            <span className="w-1 h-2 bg-emerald-500 rounded-full animate-soundwave-3" />
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 ms-1">
              {isAr ? 'المناظرة الصوتية جارية' : 'Voice debate in progress'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C8A366] dark:text-[#E2C799] bg-[#C8A366]/10 px-2.5 py-1 rounded-full border border-[#C8A366]/20 shrink-0">
            <Mic className="w-3 h-3" />
            <span>{isAr ? 'جاهز للاتصال' : 'Ready to connect'}</span>
          </div>
        )}
      </div>

      {/* The widget renders inside this stage */}
      <div className="burhan-voice-stage relative flex-1 isolate overflow-hidden bg-arabesque">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_38%,rgba(10,62,49,0.08),transparent_62%)] dark:bg-[radial-gradient(circle_at_50%_38%,rgba(16,185,129,0.12),transparent_62%)]"
        />
        <elevenlabs-convai
          ref={widgetRef}
          agent-id={ELEVENLABS_AGENT_ID}
          dynamic-variables={dynamicVariables}
          variant="full"
          placement="bottom"
          always-expanded="true"
          dismissible="false"
          transcript="true"
          text-input="true"
          mic-muting="true"
          avatar-orb-color-1="#10B981"
          avatar-orb-color-2="#E2C799"
        />
      </div>

      {/* Stage Footer */}
      <div className="px-5 py-3 border-t border-[#0A3E31]/10 dark:border-white/10 bg-[#FBF9F4] dark:bg-[#0A1210] flex items-center gap-2 text-[11px] text-[#6B7280] dark:text-neutral-400">
        <ShieldCheck className="w-3.5 h-3.5 text-[#0A3E31] dark:text-emerald-400 shrink-0" />
        <span>
          {isAr
            ? 'يحتاج المتصفح إذن الميكروفون. تحدث بهدوء واستحضر الدليل؛ سيظهر تقييم ردودك في اللوحة الجانبية.'
            : 'Your browser will ask for microphone access. Speak calmly and cite your evidence; your scores appear in the side panel.'}
        </span>
      </div>
    </div>
  );
}
