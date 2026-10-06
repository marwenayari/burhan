# Voice Debate (ElevenLabs)

The dialogue simulator (المحاكي الحواري الذكي) has two session modes: **text**, backed by Gemini through `/api/simulator`, and **voice**, which is a live spoken debate run by an ElevenLabs Conversational AI agent. This file covers how voice mode works and what has to be configured in the ElevenLabs dashboard.

## How it works

```
SimulatorView (setup)
  persona + topic + "مناظرة صوتية مباشرة"  →  بدء المناظرة الصوتية
        │
        ▼
VoiceDebateStage  (left 8 columns of the session grid)
  <elevenlabs-convai agent-id=… dynamic-variables='{…}' always-expanded …>
        │  user presses the call button
        ├─ widget fires `elevenlabs-convai:call` → we register client tool `update_debate_evaluation`
        ▼
ElevenLabs agent (orchestrator → Debate Training subagent)
        │  after each user answer, calls update_debate_evaluation({...})
        ▼
SimulatorView rubric panel (right 4 columns) updates live
```

| File                              | Role                                                                     |
| --------------------------------- | ------------------------------------------------------------------------ |
| `lib/elevenlabs.ts`               | Agent id, widget script URL, `buildDebateVariables()`, client tool types |
| `lib/elevenlabs-convai.d.ts`      | JSX typing for the `<elevenlabs-convai>` custom element                  |
| `components/VoiceDebateStage.tsx` | Loads the widget script, renders the embedded stage, handles the call event |
| `components/SimulatorView.tsx`    | Mode picker, builds the variables, shares the rubric panel between modes |
| `app/globals.css`                 | `.burhan-voice-stage` rules that embed and theme the widget              |

### Embedding (no floating bubble)

By default the widget's host element is `position: fixed; inset: 0` and floats over the page. Three things keep it inside the stage instead:

- CSS on the `elevenlabs-convai` element from the page overrides the widget's `:host` rule. `globals.css` sets it to `position: absolute; inset: 0` inside the stage.
- The widget's own `transform` on the host keeps its internal fixed layers inside the stage too.
- The `always-expanded="true"` and `dismissible="false"` attributes keep it permanently open.

The `--el-*` color tokens are set on the same element and follow the page's light/dark mode. Those values **override the dashboard palette**. Browser checks confirmed that both themes render correctly.

Unmounting the stage removes the widget, which ends the call. That happens on "reset" or when you leave the simulator tab.

### Agent id

The agent id comes from `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` and falls back to `agent_5801m48m3agbfve8xjy0gcq7ranc`. The id is public by design.

---

## Dynamic variables sent per session

| Variable               | Example                              | Source                                                  |
| ---------------------- | ------------------------------------ | ------------------------------------------------------- |
| `mode`                 | `debate_training`                    | Always this value for the simulator                     |
| `persona`              | `stubborn` \| `evasive` \| `seeker`  | Selected persona card                                   |
| `persona_name`         | `المشكك العنيد`                      | Persona name in the UI language                         |
| `persona_instructions` | `أنت تجسد "المشكك العنيد"…`          | `SkepticPersona.promptInstruction` (same text Gemini uses) |
| `topic`                | `شبهة وجود الشر والألم…`             | Preset topic, or the custom topic text                  |
| `difficulty`           | `hard` \| `medium` \| `easy`         | stubborn→hard, evasive→medium, seeker→easy              |
| `language`             | `ar` \| `en`                         | UI language                                             |
| `opening_line`         | `أهلاً بك. قرأت الكثير…`             | Persona's scripted first line (also used in text mode)  |

> **Dashboard step:** declare each variable under **Agent → Dynamic variables**, with a placeholder value for dashboard testing (for example `mode = debate_training`, `persona = stubborn`). If a prompt references a variable that has no value, the conversation will not start.

---

## Dashboard configuration

### 1. Client tool: live evaluation (recommended)

Go to **Agent → Tools → Add tool → Client tool**. Add the tool to the Debate Training subagent node if your workflow has per-node tools.

- **Name:** `update_debate_evaluation`
- **Description:** `Call this silently after every answer the user gives in Debate Training mode, to show the user live scores of their last answer on screen. Do not mention that you are calling it.`
- **Wait for response:** off
- **Parameters:**

| Name                   | Type   | Description                                                                 |
| ---------------------- | ------ | --------------------------------------------------------------------------- |
| `strength`             | number | 0–100: logical and rational strength of the user's last argument           |
| `source_quality`       | number | 0–100: accuracy of Quran/Hadith/scholarly citations and how well they were sourced |
| `manner`               | number | 0–100: courtesy, calmness and wisdom of tone                                |
| `strengths_feedback`   | string | One sentence on what was strong, in the session language                   |
| `improvement_feedback` | string | One concrete suggestion to make the answer more convincing, in the session language |

If the tool is not configured, nothing breaks. The rubric panel simply keeps showing its dimmed "awaiting" state.

### 2. First message

Set **First message** to:

```
{{opening_line}}
```

The skeptic then opens the debate in character, using the same line as text mode.

### 3. Language

The site sends `language`, and the prompt below tells the agent to follow it. The widget's own UI strings ("أرسل رسالة", "جارٍ الاتصال") come from the agent's language setting in the dashboard.

### 4. Workflow routing

On the edge from the orchestrator to the **Debate Training** subagent, use the condition: *"The session variable mode is `debate_training`, or the user asks to practise debating."* Route everything else to **Evidence Answer**.

---

## Recommended prompts

### Orchestrator (replaces the current system prompt)

The changes from the original prompt:

- It reads the variables explicitly with `{{…}}`.
- It routes immediately, without small talk.
- It forwards the persona to the subagent.

```text
You are the main conversational orchestrator for Burhan AI (برهان AI), an Arabic-first platform for trusted Islamic knowledge and intellectual dialogue training.

Your only job is to understand the requested mode and route the conversation to the right specialized workflow. Never answer in depth yourself when a specialized subagent exists.

## Session context (provided by the website)
- mode: {{mode}}
- topic: {{topic}}
- difficulty: {{difficulty}}
- persona: {{persona}} ({{persona_name}})
- language: {{language}}

## Modes
1. Evidence Answer Mode: the user asks a question, raises an objection, or presents a doubt about Islam. Route to the Evidence Answer subagent, which answers only from the approved Burhan knowledge base and trusted sources.
2. Debate Training Mode (mode = "debate_training"): the user wants to practise answering objections. Route to the Debate Training subagent, which plays the skeptic persona above, about the topic above, at the difficulty above.

## Routing rules
- If mode is "debate_training", route to Debate Training immediately. Do not ask the user to choose a mode, and do not restate the settings.
- If a topic is provided, it is the debate topic. Do not ask for a topic.
- If the mode is missing or unclear, ask once, briefly, in Arabic, whether the user wants:
  - الرد على شبهة أو سؤال
  - التدريب على مناظرة ومحاورة مشكك

## Guardrails
- Do not invent Quranic verses, hadith, scholarly opinions, historical claims or citations.
- Do not claim a source supports something unless it is in the approved knowledge base.
- Language: speak Arabic when language is "ar" (default). Speak English when it is "en", or when the user clearly speaks English.
- Tone: calm, respectful, clear and intellectually serious.
```

### Debate Training subagent

```text
You are the skeptic in a Burhan AI debate-training session. The user is a Muslim practising how to answer objections. Your role exists to train them; it is not to persuade anyone away from Islam.

## Your character
You are {{persona_name}}.
{{persona_instructions}}

Difficulty: {{difficulty}}
- hard: challenge every premise, ask for stronger evidence after each answer, point out gaps in reasoning, and rarely concede.
- medium: shift to a related objection when cornered, and concede only when the answer is clearly decisive.
- easy: ask sincere, thoughtful questions, and acknowledge good answers openly.

## Debate topic
{{topic}}

## Rules
- Stay in character and on the topic (the "evasive" persona may drift to related objections, as its character requires).
- Keep each turn short and spoken: 2–4 sentences, one main challenge per turn.
- Never insult, mock sacred figures, or use vulgar language. Stay polite even when you are stubborn.
- Do not invent fake verses, hadith or quotes, even as the skeptic.
- After every user answer, silently call `update_debate_evaluation` with honest scores (0–100) for strength, source_quality and manner, plus one short strengths_feedback and one improvement_feedback in the session language. Then reply in character.
- If the user asks to stop or to see an evaluation, step out of character and give a brief, fair summary of their strengths and what to improve.
- Language: {{language}} ("ar" means Modern Standard Arabic).
```

---

## Widget palette

The site overrides these colors at runtime through CSS, in both light and dark mode. Set them in the dashboard anyway, because they are what the dashboard preview and any other embed will show. They are the dark theme, which matches your current setup.

| Setting         | Value     |
| --------------- | --------- |
| Base            | `#0E1B17` |
| Base Hover      | `#122420` |
| Base Active     | `#17302A` |
| Base Border     | `#1F3530` |
| Base Subtle     | `#9CA3AF` |
| Base Primary    | `#E5E7EB` |
| Base Error      | `#F87171` |
| Accent          | `#059669` |
| Accent Hover    | `#10B981` |
| Accent Active   | `#047857` |
| Accent Border   | `#34D399` |
| Accent Subtle   | `#6EE7B7` |
| Accent Primary  | `#FFFFFF` |
| Overlay Padding | `16px`    |
| Button Radius   | `12px`    |
| Input Radius    | `12px`    |
| Orb color 1     | `#10B981` |
| Orb color 2     | `#E2C799` |

The orb colors are also set as attributes on the embed (emerald and gold, the brand pair), so they apply even if the dashboard values differ. Using the same color twice, as in `#0e875f` / `#0e875f`, makes the orb look flat.

---

## Known limitations

- The widget emits no "call ended" event, so the stage badge stays on "المناظرة الصوتية جارية" after the user hangs up.
- Voice sessions are not saved to `messages`, so "copy transcript" is hidden in voice mode. The widget shows its own transcript.
- The theme toggle in the navbar does not affect Tailwind `dark:` classes. Tailwind v4 follows the OS setting unless `@custom-variant dark (&:where(.dark, .dark *));` is added to `globals.css`. The widget tokens use the same OS-based condition, so the widget always matches the page. If the toggle is fixed later, change the widget's `@media (prefers-color-scheme: dark)` block to `.dark .burhan-voice-stage elevenlabs-convai`.
