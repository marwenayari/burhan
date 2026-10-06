# Burhan AI — Architecture & Features

Burhan AI (برهان AI) is an Arabic-first Next.js app for two things:

1. **Looking up trusted answers** to common objections ("شبهات") about Islam — Quranic, Hadith, rational and scholarly evidence per objection.
2. **Training users to debate** those objections against AI skeptic personas, with live scoring of their arguments.

It started as a Google AI Studio applet (see `metadata.json`, `next.config.ts` HMR note), so it is a single-page client app with a few thin API routes.

---

## Stack

| Concern    | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 15 (App Router), React 19, TypeScript                          |
| Styling    | Tailwind CSS v4 (`app/globals.css`), hex colors inline, `dark:` class  |
| Icons      | `lucide-react`                                                         |
| Text LLM   | Gemini via `@google/genai` (`lib/gemini.ts`, server-side only)         |
| Voice      | ElevenLabs Conversational AI widget (see [VOICE_DEBATE.md](./VOICE_DEBATE.md)) |
| Data       | Static TypeScript data in `lib/data/` — no database                   |

Env vars (`.env.example`): `GEMINI_API_KEY`, `APP_URL`, `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`.

---

## Application shell (`app/page.tsx`)

There is **one route** (`/`). `app/page.tsx` is a client component that owns all global state and switches views with a `currentTab` string — there is no Next.js routing between sections.

Global state held in `page.tsx`:

| State                                         | Purpose                                                       |
| --------------------------------------------- | ------------------------------------------------------------- |
| `currentTab`                                  | Which view renders (`home`, `explore`, `simulator`, …)        |
| `language` (`'ar' \| 'en'`)                   | Synced to `<html lang dir>`; drives RTL/LTR                   |
| `theme` (`'light' \| 'dark'`)                 | Toggles `.dark` on `<html>`                                   |
| `selectedDoubt`                               | Opens `DoubtDetailModal` globally                             |
| `simulatorPersonaId`, `simulatorInitialTopic` | Deep-link into the simulator from Home / a doubt              |
| `bookmarks`                                   | In-memory bookmarked doubt ids                                |
| `user`                                        | Mock auth (`AuthModal` just sets a name/email; no backend)    |

`SimulatorView` is mounted with `key={persona-topic-language}` so changing any of those resets the session.

Nothing is persisted: refresh = fresh state.

---

## Domain model (`lib/types.ts`)

- **`DoubtItem`** — one objection with its full rebuttal: title, category, difficulty, summary, origin, `quranicEvidence[]`, `hadithEvidence[]`, `rationalEvidence*`, `scholarsQuotes*`, `fullRebuttal*`, references. Every text field exists in `…Ar` and `…En` variants.
- **`SkepticPersona`** — a debate opponent: `id` (`stubborn | evasive | seeker`), display names, badge (difficulty label), description, traits and an Arabic `promptInstruction` that tells the LLM how to behave.
- **`ChatMessage`** — a simulator message (`user | skeptic | system`) with an optional per-turn `evaluation` (strength / sourceQuality / manner 0–100 + feedback text).
- **`UserStats`**, **`DialogueSession`** — shapes for the training dashboard; currently filled with mock data.

## Content (`lib/data/`)

- `doubts.ts` — `SKEPTIC_PERSONAS` (3 personas) and `DOUBTS_DATA` (6 fully-sourced objections: problem of evil, hadith preservation, Quran preservation, women's inheritance, miracles & science, conquests & tolerance). This is the app's knowledge base.
- `translations.ts` — `TRANSLATIONS.ar` / `TRANSLATIONS.en` UI strings. Many components also inline `isAr ? '…' : '…'` ternaries.

**Bilingual convention:** every user-facing string has an Arabic and English form; components compute `const isAr = language === 'ar'`.

---

## Features (by view)

| Tab            | Component              | What it does                                                                                                                                              |
| -------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `home`         | `HomeView`             | Landing: hero CTAs, stats, persona cards (each deep-links into the simulator with that persona), featured doubt, pillars.                                  |
| `explore`      | `ExploreView`          | Search + filter (category, difficulty) over `DOUBTS_DATA`, client-side. Cards via `DoubtCard`, bookmark toggle.                                           |
| `simulator`    | `SimulatorView`        | **Core feature** — debate training. See below.                                                                                                            |
| `training`     | `TrainingView`         | Progress dashboard (stats, badges, challenges, certificate modal) — mock `UserStats`.                                                                     |
| `encyclopedia` | `EncyclopediaView`     | Browse doubts by section; opens the detail modal.                                                                                                         |
| `profile`      | `ProfileView`          | Language/theme settings, voice settings (UI only).                                                                                                        |
| `about`        | `AboutView`            | Mission, methodology, roadmap.                                                                                                                            |
| (modal)        | `DoubtDetailModal`     | Full evidence view of one doubt; "open in simulator" pre-fills the topic.                                                                                 |

### Dialogue simulator (`components/SimulatorView.tsx`)

Two stages:

1. **Setup** — pick a persona (`SKEPTIC_PERSONAS`), a preset topic or a custom one, and a **session mode**:
   - **Text** — chat with the Gemini-backed skeptic.
   - **Voice** — live spoken debate through the ElevenLabs agent (see [VOICE_DEBATE.md](./VOICE_DEBATE.md)).
2. **Active session** — a 12-column grid:
   - Left (8 cols): text chat **or** the embedded voice stage.
   - Right (4 cols): live rubric (argument strength, source quality, manner), coach feedback, and per-persona tactical advice. Shared by both modes.

In text mode, the persona's scripted opening line (`getOpeningLine`) is the first chat message. Preset topics and their stable ids (`DEBATE_TOPICS`) live in `lib/elevenlabs.ts`.

**Text mode turn loop:**

```
user types → POST /api/simulator { personaId, messages, topic, language }
          ← { replyText, evaluation }
          → append skeptic message, update rubric, optional browser TTS (speechSynthesis)
```

**Voice mode:** the ElevenLabs agent runs the whole conversation. It receives `{ mode, skeptic_type, topic, difficulty }`, and the rubric updates when it calls the `update_debate_evaluation` client tool.

---

## API routes (`app/api/`)

All routes **degrade gracefully**: if `GEMINI_API_KEY` is missing or the model call fails, they return plausible canned data so the UI keeps working.

| Route                 | Method | Input                                       | Output                                                         |
| --------------------- | ------ | ------------------------------------------- | -------------------------------------------------------------- |
| `/api/simulator`      | POST   | `personaId, messages[], topic, language`    | `{ replyText, evaluation{strength, sourceQuality, manner, …} }` — Gemini plays the persona and grades the last user turn in one JSON call |
| `/api/evaluate`       | POST   | `rebuttalText, doubtTitle, language`        | Standalone rubric for a written rebuttal                       |
| `/api/search`         | GET    | `q, category, difficulty`                   | Filtered `DOUBTS_DATA` (`{ total, results }`)                  |

---

## Styling conventions

- Palette (used as raw hex in class names):
  - Light: page `#FBF9F4`, card `white`, sand `#F4EFE6`, primary `#0A3E31`, gold `#C8A366`, text `#1F2937`.
  - Dark: page `#0A1210`, card `#0E1B17`, raised `#122420`, primary `emerald-600/400`, gold `#E2C799`.
- Borders: `border-[#0A3E31]/10 dark:border-white/10`. Radii: `rounded-xl` (controls), `rounded-2xl`/`rounded-3xl` (cards).
- Fonts: Cairo (UI), Amiri (Quranic text), IBM Plex Sans Arabic.
- Use logical properties (`ms-`, `me-`, `ps-`, `text-start`) so RTL and LTR both work.

---

## Known gaps / mock areas

- Auth, bookmarks, training stats and profile voice settings are client-side mocks with no persistence.
- The ElevenLabs API key field in `ProfileView` is not wired to anything. The voice debate uses the public agent id instead.
- The model name in the API routes is hard-coded (`gemini-3.8-flash`).
