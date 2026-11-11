# Evaluation support

Rubric dimension 5 asks for a real user evaluation (peer evaluation, heuristic review, focus group or user test), turned into concrete design revisions and carried out ethically. Agents build the tooling and draft materials. Humans run the studies and write the interpretation.

## Never

- Fabricate, simulate or fill in participant data, quotes, SUS scores or task times. Synthetic data is only for testing analysis scripts, lives in a file named `*_SYNTHETIC*`, and never appears in results.
- Put raw study data (recordings, transcripts, consent forms, names, emails) in the repo, or paste it into an LLM. The team stores it somewhere approved by TU Delft. The repo only gets anonymised aggregates (P1..Pn).

## Usability issues on GitHub

Label every issue that comes from an evaluation:

- `eval:heuristic`, `eval:cogwalk`, `eval:usertest` or `eval:focusgroup`
- the heuristic, `H1` to `H10`
- the severity: `sev:1` cosmetic, `sev:2` minor, `sev:3` major, `sev:4` catastrophe (the user can't finish the task)

Fix severity 3–4 first; priority is severity × frequency, weighed against cost. Link the issue in the PR that fixes it. That gives the decks their "what broke → how we found it → how we fixed it" story.

## Expert methods (before real users)

- **Heuristic evaluation:** 3–5 evaluators each review the UI against Nielsen's 10 on their own, then merge the problem lists. Each problem names the heuristic it violates.
- **Cognitive walkthrough:** write down the task, the persona, the exact action sequence and the user's starting state. At each step, ask four questions:
  1. Will they try to achieve the right effect?
  2. Will they notice the correct action?
  3. Will they connect the action with the effect?
  4. Will they see progress afterwards?

  Agents can help by extracting the exact action sequence for a flow from the code.

## User studies: what agents can build

- **Condition switch.** A `?variant=A|B` URL parameter that changes one independent variable. Within-subjects: counterbalance the order. Between-subjects: assign by participant code.
- **Study mode (opt-in, off by default, visibly on when active).** Log task start and end, errors, misclicks and back navigation against an anonymous participant code. Record no personal data. Export locally to CSV or JSON.
- **Study builds.** Run a study on a fixed Vercel preview URL, so the build doesn't change mid-study. Don't turn on third-party analytics or session recording (including Vercel Analytics) unless the consent form covers it.
- **Draft materials, marked `<!-- AI DRAFT -->` for humans to finalise:**
  - A task sheet with concrete, goal-based tasks and no UI hints, e.g. "Find the cheapest store for this 8-item list".
  - The standard SUS items, unchanged. The course says to reuse validated questionnaires.
  - The SEQ (Single Ease Question) after each task.
  - A consent form.

## Study design checklist (user-evaluation lecture, lab 5)

1. Write a research question comparing conditions ("Does A beat B on X for Y?"), not "Is our app good?".
2. Name the independent variable, the dependent variables and the likely confounders.
3. Choose within- or between-subjects. If you expect learning or fatigue effects, use between-subjects.
4. Set inclusion criteria (people from the target group) and exclusion criteria (exclude our own team).
5. Pick objective measures (time, errors, clicks) and subjective ones (SUS, SEQ, existing Likert scales).
6. Write a procedure detailed enough for someone else to replicate.
7. Plan the analysis before collecting data.
8. Do the consent and ethics work, then run a pilot.

## Qualitative data (focus groups, interviews, think-aloud)

Thematic analysis: get familiar with the data → code it → refine the codes → form themes (a theme is a conceptual insight, not a topic) → pick supporting quotes. AI clustering is only allowed on anonymised text, as a comparison against the team's own coding (lab 6). We report the team's themes.

## Consent and ethics minimum

- **The consent form states:** the purpose, what data is collected (e.g. screen recording, task time), how it's anonymised and stored and for how long, that taking part is voluntary and anyone can withdraw at any time without penalty, and a contact person.
- **Run the questions from the TU Delft Risk-Planning Tool**, including:
  - Do we collect identifiable data or recordings?
  - Does AI process participant data?
  - Are participants dependent on us?
- **Collect the least data that answers the question.**

## Reporting (for the decks)

- Cover: participants (who, how recruited, n), procedure, materials, measures, analysis, results, and the revisions they led to.
- Report means and SDs.
- Don't claim significance from tiny samples.
