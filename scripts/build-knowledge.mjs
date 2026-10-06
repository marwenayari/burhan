#!/usr/bin/env node
/**
 * Parses the Burhan knowledge base (public/knowledge/*.md, Arabic source of truth)
 * and its English mirror (public/knowledge/en/*.md) into lib/data/knowledge.generated.json.
 *
 * Runs before `dev` and `build`. Run manually with `npm run knowledge`.
 * Fails loudly on malformed units so a broken knowledge file never ships silently.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const AR_DIR = join(ROOT, 'public/knowledge');
const EN_DIR = join(AR_DIR, 'en');
const OUT_FILE = join(ROOT, 'lib/data/knowledge.generated.json');

// Section headings (Arabic source + English mirror) → field name
const SECTION_KEYS = {
  'صيغ الشبهة': 'variants',
  'تصوير الشبهة': 'framing',
  'الجواب المختصر': 'shortAnswer',
  'الجواب المفصل': 'detailedAnswer',
  'الأدلة ومسار الاستدلال': 'reasoning',
  'جواب حواري للصوت': 'spokenAnswer',
  'المصادر': 'sources',
  'Question variants': 'variants',
  'How the objection is framed': 'framing',
  'Short answer': 'shortAnswer',
  'Detailed answer': 'detailedAnswer',
  'Evidence and line of reasoning': 'reasoning',
  'Spoken answer': 'spokenAnswer',
  'Sources': 'sources',
};
const LIST_FIELDS = new Set(['variants', 'reasoning', 'sources']);
const REQUIRED_FIELDS = [
  'variants',
  'framing',
  'shortAnswer',
  'detailedAnswer',
  'reasoning',
  'spokenAnswer',
  'sources',
];

// Frontmatter `category` → DoubtCategory (lib/types.ts). An id can also be used directly.
const CATEGORY_IDS = {
  'العقيدة': 'creed',
  'القرآن': 'quran',
  'السنة': 'sunnah',
  'المرأة': 'women',
  'العلم': 'science',
  'الإسلام والتاريخ': 'history',
  'التاريخ': 'history',
  'الإلحاد': 'atheism',
};
const VALID_CATEGORIES = new Set(Object.values(CATEGORY_IDS));
const VALID_DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
const UNIT_HEADING = /^##\s+(BH-[A-Z]+-\d+)\s+-\s+(.+)$/;

const fail = (file, message) => {
  console.error(`✖ knowledge: ${relative(ROOT, file)}: ${message}`);
  process.exit(1);
};

const unquote = (value) => value.trim().replace(/^["“](.*)["”]$/s, '$1').trim();

function parseFrontmatter(lines) {
  const data = {};
  if (lines[0]?.trim() !== '---') return { data, body: lines };
  const end = lines.indexOf('---', 1);
  let listKey = null;
  for (const line of lines.slice(1, end)) {
    const item = line.match(/^\s+-\s+(.+)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1]));
      continue;
    }
    const pair = line.match(/^([\w-]+):\s*(.*)$/);
    if (!pair) continue;
    if (pair[2] === '') {
      listKey = pair[1];
      data[listKey] = [];
    } else {
      listKey = null;
      data[pair[1]] = unquote(pair[2]);
    }
  }
  return { data, body: lines.slice(end + 1) };
}

// Only files with a `category` in their frontmatter hold units; the README and
// agent-policy files are skipped. English mirror files are always units.
function parseFile(file, { requireCategory }) {
  const { data: frontmatter, body } = parseFrontmatter(
    readFileSync(file, 'utf8').replace(/\r\n/g, '\n').split('\n')
  );
  if (requireCategory && !frontmatter.category) return null;
  let topic = null;
  const units = [];
  let unit = null;
  let field = null;

  for (const raw of body) {
    const line = raw.trim();
    if (line.startsWith('# ')) {
      topic = line.slice(2).trim();
    } else if (line.startsWith('## ')) {
      const match = line.match(UNIT_HEADING);
      if (!match) fail(file, `unit heading must look like "## BH-XX-000 - Title", got "${line}"`);
      unit = { id: match[1], title: match[2].trim(), lines: {} };
      units.push(unit);
      field = null;
    } else if (line.startsWith('### ')) {
      if (!unit) fail(file, `section "${line}" appears before any unit heading`);
      const heading = line.slice(4).trim();
      field = SECTION_KEYS[heading];
      if (!field) fail(file, `${unit.id}: unknown section "${heading}"`);
      unit.lines[field] = [];
    } else if (line && line !== '---' && field) {
      unit.lines[field].push(line);
    }
  }

  return {
    frontmatter,
    topic,
    units: units.map(({ id, title, lines }) => {
      const text = { title };
      for (const key of REQUIRED_FIELDS) {
        const content = lines[key];
        if (!content?.length) fail(file, `${id}: missing or empty section for "${key}"`);
        text[key] = LIST_FIELDS.has(key)
          ? content.filter((l) => l.startsWith('- ')).map((l) => l.slice(2).trim())
          : unquote(content.join('\n'));
      }
      return { id, text };
    }),
  };
}

const mdFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .sort()
        .map((f) => join(dir, f))
    : [];

// English mirror, keyed by unit id
const english = new Map();
const englishTopics = new Map();
for (const file of mdFiles(EN_DIR)) {
  const parsed = parseFile(file, { requireCategory: false });
  for (const { id, text } of parsed.units) {
    if (english.has(id)) fail(file, `duplicate unit id ${id}`);
    english.set(id, text);
    englishTopics.set(id, parsed.topic);
  }
}

const units = [];
const seen = new Set();
for (const file of mdFiles(AR_DIR)) {
  const parsed = parseFile(file, { requireCategory: true });
  if (!parsed) continue;

  const rawCategory = parsed.frontmatter.category;
  const category = CATEGORY_IDS[rawCategory] ?? rawCategory;
  if (!VALID_CATEGORIES.has(category)) {
    fail(file, `unknown category "${rawCategory}". Use one of: ${Object.keys(CATEGORY_IDS).join('، ')}`);
  }
  const difficulty = parsed.frontmatter.difficulty ?? 'intermediate';
  if (!VALID_DIFFICULTIES.has(difficulty)) {
    fail(file, `difficulty must be one of ${[...VALID_DIFFICULTIES].join(', ')}`);
  }

  for (const { id, text } of parsed.units) {
    if (seen.has(id)) fail(file, `duplicate unit id ${id}`);
    seen.add(id);
    if (!english.has(id)) console.warn(`⚠ knowledge: ${id} has no English translation; Arabic will be shown`);
    units.push({
      id,
      file: relative(ROOT, file),
      category,
      difficulty,
      subcategories: parsed.frontmatter.subcategories ?? [],
      topicAr: parsed.topic,
      topicEn: englishTopics.get(id) ?? null,
      ar: text,
      en: english.get(id) ?? null,
    });
  }
}

for (const id of english.keys()) {
  if (!seen.has(id)) console.warn(`⚠ knowledge: English unit ${id} has no Arabic source and was ignored`);
}

writeFileSync(OUT_FILE, `${JSON.stringify({ units }, null, 2)}\n`);
const translated = units.filter((u) => u.en).length;
console.log(`✓ knowledge: ${units.length} units (${translated} translated) → ${relative(ROOT, OUT_FILE)}`);
