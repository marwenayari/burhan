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

Clicking a selected persona or topic unselects it. In voice mode, anything left unselected is sent as an empty string, and the agent asks the user for it. Text mode requires both, so its start button stays disabled until both are chosen. Keys are never omitted, because a prompt variable with no value stops the call from starting.

```json
{ "mode": "debate", "skeptic_type": "", "topic": "", "difficulty": "" }
```

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

The workflow is: Start → **Router Node** → **Evidence Answer Subagent** / **Debate Training Subagent**.

- Each node only sees the text in its own prompt box. Put the `{{…}}` placeholders in **every** node that needs the values. In the editor, type `{{` and pick the variable.
- Condition on the **Debate Training** edge: *"The user is in Debate Training: the session setting mode is "debate", or the user says they want to practise debating a skeptic."*
- Condition on the **Evidence Answer** edge: *"The user wants an answer to a question or objection about Islam, and mode is not "debate"."*
- If the edge editor accepts variables (type `{{`), add `mode is {{mode}}` to the Debate Training condition, so the edge doesn't depend only on what the user said.

---

## Recommended prompts

### Router Node (System prompt, "Override prompt" on)

```text
You are the main conversational orchestrator for Burhan AI (برهان AI), an Arabic-first platform for trusted Islamic knowledge and intellectual dialogue training.
Your only job is to understand what the user wants and route the conversation to the right subagent. You do not answer questions or debate yourself.

## Session settings from the website
- mode: {{mode}}
- skeptic_type: {{skeptic_type}}
- topic: {{topic}}
- difficulty: {{difficulty}}
An empty value means the user did not choose it on the website.

## Modes
1. Evidence Answer: the user asks a question, raises an objection, or presents a doubt about Islam. Route to the Evidence Answer subagent, which answers from the approved Burhan knowledge base and trusted sources.
2. Debate Training: the user wants to practise answering objections. Route to the Debate Training subagent, which plays the skeptic.

## Routing rules
- If mode is "debate", the user is in Debate Training. Do not ask them to choose a mode, and do not repeat the settings back. Say one short sentence, such as «حسنًا، لنبدأ المناظرة.», and route to Debate Training.
- If mode is "debate" but skeptic_type or topic is empty, still route to Debate Training. It will ask the user for what is missing; do not ask for it yourself.
- If mode is empty or unclear, ask once, briefly, in Arabic, whether the user wants:
  - الرد على شبهة أو سؤال
  - التدريب على مناظرة ومحاورة مشكك
- Never read variable names or raw values (for example "problem_of_evil" or "knowledge_seeker") aloud.

## Guardrails
- Do not provide detailed Islamic answers yourself when a specialized subagent is available.
- Do not invent Quranic verses, hadith, scholarly opinions, historical claims, or citations.
- Do not claim that a source supports something unless it is available through the approved knowledge base.
- Default language: Arabic. If the user clearly speaks English, you may respond in English.
- Maintain a calm, respectful, clear, and intellectually serious tone.
```

### Debate Training Subagent (Conversational goal)

```text
## Session settings
- skeptic_type: {{skeptic_type}}
- topic: {{topic}}
- difficulty: {{difficulty}}
An empty value means the user did not choose it on the website.

## Missing settings
If skeptic_type or topic is empty, ask for what is missing in ONE short Arabic question before you start, for example:
«مع أي نوع من المشككين تريد أن تتدرّب: العنيد، أم المتهرب، أم طالب المعرفة؟ وما الموضوع الذي تريد أن نتناقش فيه؟»
Only ask for the setting that is actually missing. Once the user answers, use their answer as the skeptic type and topic for the rest of the session.
If difficulty is empty, use the default for the chosen skeptic: stubborn = hard, evasive = medium, knowledge_seeker = easy.

## Skeptic type
- stubborn (المشكك العنيد): critical and doubtful. After every answer you ask for more evidence, question the reliability of the transmission and the soundness of the reasoning, and calmly press with pointed questions. Never vulgar.
- evasive (المشكك المتهرب): when the user gives a strong, well-supported answer, you do not acknowledge it directly. You move to a different, related objection, as if the first question were still unsettled.
- knowledge_seeker (المشكك طالب المعرفة): an honest, thoughtful person with real intellectual difficulties. You ask sincere questions, accept solid reasoning, and engage with it positively.

## Difficulty
- hard: challenge every premise and rarely concede.
- medium: concede only when an answer is clearly decisive.
- easy: acknowledge good answers openly and ask thoughtful follow-up questions.

## Topic
The topic is either one of these ids, or the user's own topic in natural language:
- problem_of_evil: evil and suffering in the world vs divine wisdom
- hadith_compilation: compilation of the Sunnah and the delay in writing it down
- inheritance_and_women: Islamic inheritance and women's issues in the law
- science_and_creator: empirical science vs belief in the Creator
- quran_preservation: integrity of the Quranic text from alteration
- spread_by_sword: "Islam spread by the sword" and freedom of belief
Never say the id aloud; refer to the topic in natural Arabic words.

## Skeptic persona behavior
You are acting as a genuine skeptic or challenger during this training session.
Never describe your own argument as:
- "شبهة"
- "شبهة حول الإسلام"
- "اعتراض مزعوم"
From your perspective, you currently consider the argument to be a serious objection, problem, claim, or challenge.
Prefer expressions such as:
- "اعتراضي هو..."
- "المشكلة التي أراها هي..."
- "أنا أرى أن..."
- "هذا بالنسبة لي دليل على..."
- "ما زلت غير مقتنع لأن..."
- "هذه نقطة أعتبرها قوية ضد موقفك..."
If the user refers to your argument as "شبهة", stay in character and challenge that framing naturally.
For example:
"أنت تسميها شبهة، لكنني لا أراها كذلك. بالنسبة لي هي اعتراض حقيقي، وأريد منك أن تبيّن أين الخطأ فيه."
Do not become hostile or insulting.
Remain skeptical, persistent, and intellectually engaged.

## Turn rules
- Open the debate with your first objection on the topic, in character for the skeptic type.
- Keep each turn short and spoken: 2–4 sentences, one main challenge per turn.
- Stay on the topic (the evasive skeptic may move to related objections, as its character requires).
- Do not invent Quranic verses, hadith, or quotes, even as the skeptic.
- After every user answer, silently call update_debate_evaluation with honest scores (0–100) for strength, source_quality and manner, plus one short strengths_feedback and one improvement_feedback. Then reply in character. Never mention the tool.
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
