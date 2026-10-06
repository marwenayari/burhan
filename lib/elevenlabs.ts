import { DoubtItem, SkepticPersona, SkepticPersonaId } from './types';
import { DOUBTS_DATA } from './data/doubts';

export const ELEVENLABS_AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_5801m48m3agbfve8xjy0gcq7ranc';

export const ELEVENLABS_WIDGET_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

export type DebateDifficulty = 'easy' | 'medium' | 'hard';

/** Skeptic values the ElevenLabs agent understands. */
export type SkepticType = 'stubborn' | 'evasive' | 'knowledge_seeker';

// المشكك العنيد / المشكك المتهرب / المشكك طالب المعرفة
export const PERSONA_SKEPTIC_TYPE: Record<SkepticPersonaId, SkepticType> = {
  stubborn: 'stubborn',
  evasive: 'evasive',
  seeker: 'knowledge_seeker',
};

// Mirrors the persona badges shown in the UI (صعوبة عالية / صعوبة متوسطة / تفاعلي وبنّاء)
export const PERSONA_DIFFICULTY: Record<SkepticPersonaId, DebateDifficulty> = {
  stubborn: 'hard',
  evasive: 'medium',
  seeker: 'easy',
};

export type DebateTopicId =
  | 'problem_of_evil'
  | 'hadith_compilation'
  | 'inheritance_and_women'
  | 'science_and_creator'
  | 'quran_preservation'
  | 'spread_by_sword';

/** Preset topics offered in the simulator setup. */
export const DEBATE_TOPICS: { id: DebateTopicId; ar: string; en: string }[] = [
  {
    id: 'problem_of_evil',
    ar: 'شبهة وجود الشر والألم في العالم وعلاقته بالحكمة الإلهية',
    en: 'The Problem of Evil & Suffering vs Divine Wisdom',
  },
  {
    id: 'hadith_compilation',
    ar: 'شبهة تدوين السنة النبوية وتأخر كتابتها',
    en: 'Preservation & Historical Inscription of Hadith',
  },
  {
    id: 'inheritance_and_women',
    ar: 'شبهة نظام الميراث وقضايا المرأة في التشريع',
    en: 'Islamic Inheritance and Women’s Financial Rights',
  },
  {
    id: 'science_and_creator',
    ar: 'شبهة التعارض بين العلم التجريبي والإيمان بالخالق',
    en: 'Science, Reason, and Divine Creation',
  },
];

// Doubts opened in the simulator from DoubtDetailModal arrive with their full title as the topic
const DOUBT_TOPIC_IDS: Record<DoubtItem['id'], DebateTopicId> = {
  'doubt-evil-suffering': 'problem_of_evil',
  'doubt-hadith-preservation': 'hadith_compilation',
  'doubt-women-inheritance': 'inheritance_and_women',
  'doubt-miracles-and-science': 'science_and_creator',
  'doubt-quran-preservation': 'quran_preservation',
  'doubt-conquests-and-tolerance': 'spread_by_sword',
};

/**
 * Maps a topic display label (Arabic or English) to its stable id.
 * Custom topics typed by the user have no id and are passed through as free text.
 */
export function toDebateTopic(label: string): DebateTopic {
  const text = label.trim();
  const preset = DEBATE_TOPICS.find((t) => t.ar === text || t.en === text);
  if (preset) return preset.id;
  const doubt = DOUBTS_DATA.find((d) => d.titleAr === text || d.titleEn === text);
  if (doubt && DOUBT_TOPIC_IDS[doubt.id]) return DOUBT_TOPIC_IDS[doubt.id];
  return text;
}

// A known topic id, or the user's own topic as free text
export type DebateTopic = DebateTopicId | (string & {});

/**
 * Dynamic variables sent to the ElevenLabs agent when a voice session starts.
 * Every key here must be declared in the agent (Agent → Dynamic variables) —
 * see docs/VOICE_DEBATE.md. An empty string means the user left it unselected
 * and will say it to the agent; keys are never omitted, because a variable
 * referenced in the prompt without a value stops the call from starting.
 */
export interface DebateDynamicVariables {
  mode: 'debate';
  skeptic_type: SkepticType | '';
  topic: DebateTopic;
  difficulty: DebateDifficulty | '';
}

export function buildDebateVariables({
  persona,
  topic,
  difficulty,
}: {
  persona: SkepticPersona | null;
  topic: string;
  difficulty: DebateDifficulty | null;
}): DebateDynamicVariables {
  return {
    mode: 'debate',
    skeptic_type: persona ? PERSONA_SKEPTIC_TYPE[persona.id] : '',
    topic: topic.trim() ? toDebateTopic(topic) : '',
    difficulty: difficulty ?? '',
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
