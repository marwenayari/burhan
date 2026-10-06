export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type SkepticPersonaId = 'stubborn' | 'evasive' | 'seeker';

export interface SkepticPersona {
  id: SkepticPersonaId;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string;
  badgeAr: string;
  badgeEn: string;
  descriptionAr: string;
  descriptionEn: string;
  traitsAr: string[];
  traitsEn: string[];
  promptInstruction: string;
}

export type DoubtCategory =
  | 'creed'
  | 'quran'
  | 'sunnah'
  | 'women'
  | 'science'
  | 'history'
  | 'atheism';

export interface DoubtItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: DoubtCategory;
  categoryNameAr: string;
  categoryNameEn: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficultyAr: string;
  difficultyEn: string;
  confidenceScore?: number; // e.g. 98% — curated items only
  summaryAr: string;
  summaryEn: string;
  originAr: string; // The origin/source of the doubt
  originEn: string;
  quranicEvidence: {
    surah: string;
    ayahNumber: number;
    textAr: string;
    translationEn: string;
    explanationAr: string;
    explanationEn: string;
  }[];
  hadithEvidence: {
    narrator: string;
    source: string;
    grade: string;
    textAr: string;
    translationEn: string;
    explanationAr: string;
    explanationEn: string;
  }[];
  rationalEvidenceAr: string[];
  rationalEvidenceEn: string[];
  scholarsQuotesAr: { scholar: string; quote: string; book: string }[];
  scholarsQuotesEn: { scholar: string; quote: string; book: string }[];
  fullRebuttalAr: string;
  fullRebuttalEn: string;
  references: string[];
  viewsCount?: number;
  readTimeMin: number;
  /** Present on items generated from the knowledge base (public/knowledge/*.md) */
  knowledge?: KnowledgeDetails;
}

export interface KnowledgeDetails {
  unitId: string; // e.g. BH-QP-001
  file: string;
  topicAr: string;
  topicEn: string;
  questionVariantsAr: string[];
  questionVariantsEn: string[];
  spokenAnswerAr: string;
  spokenAnswerEn: string;
  referencesEn: string[];
  isTranslated: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'skeptic' | 'system';
  text: string;
  timestamp: string;
  audioDuration?: string;
  evaluation?: {
    strength: number; // 0 - 100
    sourceQuality: number; // 0 - 100
    manner: number; // 0 - 100
    strengthsTextAr: string;
    strengthsTextEn: string;
    improvementsTextAr: string;
    improvementsTextEn: string;
  };
}

export interface DialogueSession {
  id: string;
  personaId: SkepticPersonaId;
  topicAr: string;
  topicEn: string;
  startedAt: string;
  messages: ChatMessage[];
  overallScore?: {
    averageStrength: number;
    averageSource: number;
    averageManner: number;
  };
}

export interface UserStats {
  doubtsMastered: number;
  dialoguesCompleted: number;
  totalTrainingHours: number;
  rebuttalScoreAverage: number;
  currentStreakDays: number;
  rankAr: string;
  rankEn: string;
  levelProgress: number; // 0 - 100%
  completedChallenges: string[];
  earnedBadges: {
    id: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: string;
    unlockedAt: string;
  }[];
}
