import { Language, SkepticPersona } from './types';

export const ELEVENLABS_AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_5801m48m3agbfve8xjy0gcq7ranc';

export const ELEVENLABS_WIDGET_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

export type DebateDifficulty = 'easy' | 'medium' | 'hard';

// Mirrors the persona badges shown in the UI (تفاعلي وبنّاء / صعوبة متوسطة / صعوبة عالية)
const PERSONA_DIFFICULTY: Record<SkepticPersona['id'], DebateDifficulty> = {
  seeker: 'easy',
  evasive: 'medium',
  stubborn: 'hard',
};

/**
 * Dynamic variables sent to the ElevenLabs agent when a voice session starts.
 * Every key here must be declared in the agent (Agent → Dynamic variables) —
 * see docs/VOICE_DEBATE.md.
 */
export interface DebateDynamicVariables {
  mode: 'debate_training';
  persona: SkepticPersona['id'];
  persona_name: string;
  persona_instructions: string;
  topic: string;
  difficulty: DebateDifficulty;
  language: Language;
  opening_line: string;
}

export function buildDebateVariables({
  persona,
  topic,
  language,
  openingLine,
}: {
  persona: SkepticPersona;
  topic: string;
  language: Language;
  openingLine: string;
}): DebateDynamicVariables {
  return {
    mode: 'debate_training',
    persona: persona.id,
    persona_name: language === 'ar' ? persona.nameAr : persona.nameEn,
    persona_instructions: persona.promptInstruction,
    topic,
    difficulty: PERSONA_DIFFICULTY[persona.id],
    language,
    opening_line: openingLine,
  };
}

/** Parameters of the `update_debate_evaluation` client tool configured on the agent. */
export interface DebateEvaluationToolParams {
  strength?: number;
  source_quality?: number;
  manner?: number;
  strengths_feedback?: string;
  improvement_feedback?: string;
}

export const clampScore = (value: unknown, fallback: number) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
};
