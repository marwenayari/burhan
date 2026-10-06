import { DoubtCategory, DoubtItem } from '../types';
// Generated from public/knowledge/*.md by scripts/build-knowledge.mjs. Do not edit by hand.
import generated from './knowledge.generated.json';

interface KnowledgeText {
  title: string;
  variants: string[];
  framing: string;
  shortAnswer: string;
  detailedAnswer: string;
  reasoning: string[];
  spokenAnswer: string;
  sources: string[];
}

interface KnowledgeUnit {
  id: string;
  file: string;
  category: DoubtCategory;
  difficulty: DoubtItem['difficulty'];
  subcategories: string[];
  topicAr: string;
  topicEn: string | null;
  ar: KnowledgeText;
  en: KnowledgeText | null;
}

// Same labels as the Explore filters
const CATEGORY_NAMES: Record<DoubtCategory, { ar: string; en: string }> = {
  creed: { ar: 'العقيدة والغيبيات', en: 'Theology & Unseen' },
  quran: { ar: 'القرآن وعلومه', en: 'Quran & Sciences' },
  sunnah: { ar: 'السنة النبوية', en: 'Prophetic Sunnah' },
  women: { ar: 'قضايا المرأة', en: 'Women in Islam' },
  science: { ar: 'العلم والإسلام', en: 'Science & Islam' },
  history: { ar: 'التاريخ والحضارة', en: 'History & Civilization' },
  atheism: { ar: 'الإلحاد', en: 'Atheism' },
};

const DIFFICULTY_NAMES: Record<DoubtItem['difficulty'], { ar: string; en: string }> = {
  beginner: { ar: 'مبتدئ', en: 'Beginner' },
  intermediate: { ar: 'متوسط', en: 'Intermediate' },
  advanced: { ar: 'متقدم', en: 'Advanced' },
};

const WORDS_PER_MINUTE = 200;

const readTimeMin = (text: KnowledgeText) => {
  const words = [
    text.framing,
    text.shortAnswer,
    text.detailedAnswer,
    text.spokenAnswer,
    ...text.reasoning,
  ]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

function toDoubtItem(unit: KnowledgeUnit): DoubtItem {
  const { ar } = unit;
  const en = unit.en ?? unit.ar; // untranslated units fall back to Arabic
  const slug = unit.id.toLowerCase();

  return {
    id: slug,
    slug,
    titleAr: ar.title,
    titleEn: en.title,
    category: unit.category,
    categoryNameAr: CATEGORY_NAMES[unit.category].ar,
    categoryNameEn: CATEGORY_NAMES[unit.category].en,
    difficulty: unit.difficulty,
    difficultyAr: DIFFICULTY_NAMES[unit.difficulty].ar,
    difficultyEn: DIFFICULTY_NAMES[unit.difficulty].en,
    summaryAr: ar.shortAnswer,
    summaryEn: en.shortAnswer,
    originAr: ar.framing,
    originEn: en.framing,
    quranicEvidence: [],
    hadithEvidence: [],
    rationalEvidenceAr: ar.reasoning,
    rationalEvidenceEn: en.reasoning,
    scholarsQuotesAr: [],
    scholarsQuotesEn: [],
    fullRebuttalAr: ar.detailedAnswer,
    fullRebuttalEn: en.detailedAnswer,
    references: ar.sources,
    readTimeMin: readTimeMin(ar),
    knowledge: {
      unitId: unit.id,
      file: unit.file,
      topicAr: unit.topicAr,
      topicEn: unit.topicEn ?? unit.topicAr,
      questionVariantsAr: ar.variants,
      questionVariantsEn: en.variants,
      spokenAnswerAr: ar.spokenAnswer,
      spokenAnswerEn: en.spokenAnswer,
      referencesEn: en.sources,
      isTranslated: unit.en !== null,
    },
  };
}

export const KNOWLEDGE_DOUBTS: DoubtItem[] = (generated.units as KnowledgeUnit[]).map(toDoubtItem);
