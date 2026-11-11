# Course rules that shape this repo

Source: CSE12B 2026-27 syllabus and Brightspace lab pages, read 9 Nov 2026. Course announcements override this file.

## Pass rule

- To pass the project, we must meet the pass criteria on **at least 5 of the 6** rubric dimensions. Failing 2 or more dimensions triggers feedback and a repair deadline.
- These fail the project no matter what: an unexcused absence at a presentation, fabricated user-evaluation data, unattributed AI text in the analytical sections, or not completing a repair.
- The exam is 100% of the grade, but nobody passes the course without passing the project.

## Rubric dimensions and what the repo must show

| # | Dimension | Fails if... | What it means for the repo |
|---|---|---|---|
| 1 | Scope & team (D1) | The scope is outside the allowed categories | Stay within the scope below. Don't add features that change the domain, user group, goal or platform |
| 2 | Requirements & adaptive design | Requirements are generic or not tied to the target group; no clear functional vs non-functional split; the design ignores platform or accessibility constraints | `requirements.md` is the source of truth. Adaptive behaviour follows `ai-features.md` |
| 3 | Hi-fi web prototype | The prototype is static or broken; core flows can't be demoed; "fails to use appropriate web technologies" | Keep `main` deployable. The live demo must work without signing up (seed a demo account and demo data) |
| 4 | AI integration & reflection | No "AI Use" section or prompt log; raw AI output in the analysis; "the AI wrote it" used to excuse bugs; no critique of AI's downsides | `ai-use-log.md`. In-app AI must keep a human in the loop |
| 5 | Evaluation & responsible design | No real user evaluation, or fabricated data; findings not turned into revisions; ethics violations; severe WCAG failures | `evaluation.md`, `accessibility.md` |
| 6 | Presentation | Deck sections missing, late, absence | Humans handle this |

## Scope (D1: one option from each category)

- **Domain:** budget cooking/grocery sharing (this is Boodschapper).
- **Target user group:** first-year international students, commuting students, neurodivergent students, students on a strict budget, or TAs.
- **System goal:** AI-driven recommendation, collaborative planning, peer-to-peer matching, smart search, or automated scheduling.
- **Platform:** mobile web app, responsive desktop web app, or a conversational interface (a chatbot in a web app).

**Team's D1 choice (10 Nov 2026):**

| Category | Primary | Secondary |
|---|---|---|
| Target user group | students on a strict budget | — |
| System goal | AI-driven recommendation | collaborative planning |
| Platform | mobile web application | responsive desktop web application |

Optimise for the primary choices. D1 names the primary options; the secondary ones are extras we aim for, not part of the scope we're assessed on. Features that only serve collaborative planning are Should or Could, unless research shows they're essential. Group features must not delay the recommendation flow.

## Timeline

| When | Deliverable | What the repo needs by then |
|---|---|---|
| Fri 13 Nov 2026, end of day | D1 project outline + group | — |
| Weeks 2.1–2.4 (labs) | PACT, personas, survey → information architecture and lo-fi wireframes → interactive Figma prototype, accessibility audit, consent form → peer heuristic evaluation | `requirements.md` filled in. Code should follow the validated design, not run ahead of it |
| Wed 9 Dec 2026, 23:59 | **D2 mid-term deck.** It's locked once submitted. Presentations are Thu 10 / Fri 11 Dec and every member must attend | Deck sections: motivation & problem, proposed solution, functional & non-functional requirements, system design, next steps |
| Weeks 2.6–2.8 | Lectures on design-to-code, web tech & HTTP, React/Next.js, hi-fi prototypes & deployment, data visualisation, conversational UIs & LLM APIs. Labs on user evaluation & focus groups (16 Dec), qualitative analysis (6 Jan), deployment (13 Jan) | Hi-fi build deployed, user study run |
| Wed 20 Jan 2027, 23:59 | **D3 final deck + live prototype** | Deck sections: motivation & problem, solution, FR/NFR, system design & critical AI use, interactive prototype, evaluation & results, conclusions & future outlook, AI Use section |

## AI policy (syllabus §5), condensed

- **Encouraged:** AI for ideation, UI scaffolding, code generation and mock data.
- **Required:** document the tools, the core prompts (especially for complex UI or logic) and how the team changed the output.
- **Prohibited:** raw, unedited AI text in the analytical parts (heuristic evaluations, UX justifications, reflections).
- **Accountability:** the team answers for every committed line. "The AI wrote it" is never accepted for broken features, security flaws, inaccessible UI or bias.
- **Critique is graded:** we must justify why we used AI and name its limitations. Note real problems you hit (hallucinated APIs, inaccessible output, poor state handling) in the AI log as they happen.

## Stack decision (11 Nov 2026)

Next.js + TypeScript + Tailwind + shadcn/ui, with PostgreSQL + Drizzle on Vercel. Reasons: it's the rubric's example stack ("appropriate web technologies"), the lectures and labs teach React and Next.js, semantic HTML makes WCAG compliance straightforward, AI tools generate this stack well, and mobile is covered by a PWA instead of native apps. Native apps earn nothing in the rubric. Agents never change the stack on their own.
