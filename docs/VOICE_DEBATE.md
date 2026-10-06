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
| `lib/elevenlabs.ts`               | Agent id, widget script URL, persona/topic mappings, `buildDebateVariables()`, client tool types |
| `lib/elevenlabs-convai.d.ts`      | JSX typing for the `<elevenlabs-convai>` custom element                  |
| `components/VoiceDebateStage.tsx` | Loads the widget script, builds the variables from its props, renders the embedded stage, handles the call event |
| `components/SimulatorView.tsx`    | Mode picker, works out the difficulty, shares the rubric panel between modes |
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

`VoiceDebateStage` builds the variables from its `persona`, `topic` and `difficulty` props using `buildDebateVariables()`. It sends them two ways: in the `dynamic-variables` attribute, and again on the session config inside the `elevenlabs-convai:call` handler. The second copy guarantees the call starts with the current selection.

| Variable       | Values                                                    | Source                                                                  |
| -------------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| `mode`         | `debate`                                                  | Always this value for the simulator                                     |
| `skeptic_type` | `stubborn` \| `evasive` \| `knowledge_seeker`             | Selected persona, mapped by `PERSONA_SKEPTIC_TYPE`                      |
| `topic`        | A topic id (see below), or the user's custom topic as free text | Selected topic label, mapped by `toDebateTopic()`                 |
| `difficulty`   | `easy` \| `medium` \| `hard`                              | `PERSONA_DIFFICULTY[selectedPersonaId]`, worked out in `SimulatorView` |

Persona mapping:

| Persona             | `skeptic_type`     | `difficulty` |
| ------------------- | ------------------ | ------------ |
| المشكك العنيد       | `stubborn`         | `hard`       |
| المشكك المتهرب      | `evasive`          | `medium`     |
| المشكك طالب المعرفة | `knowledge_seeker` | `easy`       |

Topic ids are matched from the Arabic or English label of a preset topic, or from the title of a doubt opened in the simulator from the encyclopedia:

| `topic`                 | Meaning                                         |
| ----------------------- | ----------------------------------------------- |
| `problem_of_evil`       | Evil and suffering vs divine wisdom             |
| `hadith_compilation`    | Compilation and late writing-down of the Sunnah |
| `inheritance_and_women` | Inheritance law and women's issues              |
| `science_and_creator`   | Empirical science vs belief in the Creator      |
| `quran_preservation`    | Integrity of the Quranic text                   |
| `spread_by_sword`       | "Islam spread by the sword" and freedom of belief |

Example payload, captured from the real `conversation_initiation_client_data` message sent to ElevenLabs:

```json
{ "mode": "debate", "skeptic_type": "stubborn", "topic": "problem_of_evil", "difficulty": "hard" }
```

> **Dashboard step:** declare all four variables under **Agent → Dynamic variables**, with placeholder values for dashboard testing (`mode = debate`, `skeptic_type = stubborn`, `topic = problem_of_evil`, `difficulty = hard`). If a prompt references a variable that has no value, the conversation will not start.

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
| `strengths_feedback`   | string | One sentence on what was strong, in the language of the conversation        |
| `improvement_feedback` | string | One concrete suggestion to make the answer more convincing, in the language of the conversation |

If the tool is not configured, nothing breaks. The rubric panel simply keeps showing its dimmed "awaiting" state.

### 2. First message

Keep the first message short and neutral, for example `أهلاً بك، لنبدأ المناظرة.` The Debate Training subagent then opens with its first challenge on the topic. Don't put `{{topic}}` in the first message: it is a machine id such as `problem_of_evil` and would be read aloud as-is.

### 3. Language

No language variable is sent. The prompts below default to Arabic and switch to English if the user speaks English. The widget's own UI strings ("أرسل رسالة", "جارٍ الاتصال") come from the agent's language setting in the dashboard.

### 4. Workflow routing

On the edge from the orchestrator to the **Debate Training** subagent, use the condition: *"The session variable mode is `debate`, or the user asks to practise debating."* Route everything else to **Evidence Answer**.

---

## Recommended prompts

### Orchestrator (replaces the current system prompt)

```text
You are the main conversational orchestrator for Burhan AI (برهان AI), an Arabic-first platform for trusted Islamic knowledge and intellectual dialogue training.

Your only job is to understand the requested mode and route the conversation to the right specialized workflow. Never answer in depth yourself when a specialized subagent exists.

## Session context (provided by the website)
- mode: {{mode}}
- skeptic_type: {{skeptic_type}}
- topic: {{topic}}
- difficulty: {{difficulty}}

## Modes
1. Evidence Answer Mode: the user asks a question, raises an objection, or presents a doubt about Islam. Route to the Evidence Answer subagent, which answers only from the approved Burhan knowledge base and trusted sources.
2. Debate Training Mode (mode = "debate"): the user wants to practise answering objections. Route to the Debate Training subagent, which plays the skeptic_type above, about the topic above, at the difficulty above.

## Routing rules
- If mode is "debate", route to Debate Training immediately. Do not ask the user to choose a mode, and do not restate the settings.
- If a topic is provided, it is the debate topic. Do not ask for a topic.
- If the mode is missing or unclear, ask once, briefly, in Arabic, whether the user wants:
  - الرد على شبهة أو سؤال
  - التدريب على مناظرة ومحاورة مشكك

## Guardrails
- Do not invent Quranic verses, hadith, scholarly opinions, historical claims or citations.
- Do not claim a source supports something unless it is in the approved knowledge base.
- Language: Arabic by default. Use English only if the user clearly speaks English.
- Tone: calm, respectful, clear and intellectually serious.
```

### Debate Training subagent

```text
You are the skeptic in a Burhan AI debate-training session. The user is a Muslim practising how to answer objections. Your role exists to train them; it is not to persuade anyone away from Islam.

## Session
- skeptic_type: {{skeptic_type}}
- topic: {{topic}}
- difficulty: {{difficulty}}

## Your character (by skeptic_type)
- stubborn (المشكك العنيد): critical and doubtful. After every answer you ask for more evidence, and you calmly challenge the user's reasoning with pointed questions. Never vulgar. Your purpose is to train the user in solid argument.
- evasive (المشكك المتهرب): when the user gives a strong proof, you do not acknowledge it directly. You jump to a different, related objection instead (for example from preservation of the Quran to women's inheritance).
- knowledge_seeker (المشكك طالب المعرفة): you have sincere, respectful questions about Islam, ask carefully and rationally, and openly appreciate convincing answers.

## Difficulty
- hard: challenge every premise and rarely concede.
- medium: concede only when an answer is clearly decisive.
- easy: acknowledge good answers openly and ask thoughtful follow-up questions.

## Topic
The topic is either one of these ids, or the user's own topic written in natural language:
- problem_of_evil: evil and suffering in the world vs divine wisdom
- hadith_compilation: compilation of the Sunnah and the delay in writing it down
- inheritance_and_women: Islamic inheritance and women's issues in the law
- science_and_creator: empirical science vs belief in the Creator
- quran_preservation: integrity of the Quranic text from alteration
- spread_by_sword: "Islam spread by the sword" and freedom of belief
Never say the id aloud. Refer to the topic in natural words.

## Rules
- Open the debate with your first challenge on the topic, in character.
- Stay in character and on the topic (the evasive skeptic may drift to related objections, as its character requires).
- Keep each turn short and spoken: 2–4 sentences, one main challenge per turn.
- Never insult, mock sacred figures, or use vulgar language. Stay polite even when you are stubborn.
- Do not invent fake verses, hadith or quotes, even as the skeptic.
- After every user answer, silently call `update_debate_evaluation` with honest scores (0–100) for strength, source_quality and manner, plus one short strengths_feedback and one improvement_feedback. Then reply in character.
- If the user asks to stop or to see an evaluation, step out of character and give a brief, fair summary of their strengths and what to improve.
- Language: Modern Standard Arabic by default. Switch to English only if the user speaks English.
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
