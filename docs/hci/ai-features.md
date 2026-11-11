# AI features in the app

The course wants AI built into the system goal. The syllabus's own example is an LLM suggesting recipes from leftover budget ingredients. We must justify each AI use, analyse its limitations and keep humans in the loop. Lecture 14 (Wed 13 Jan 2027) covers conversational interfaces and LLM API integration: update this file after it.

## Rules

- **Server-side only.** LLM calls live in `src/lib/ai/` (marked `import "server-only"`) and run from Server Actions or route handlers. The API key is a server environment variable (Vercel project settings, `.env.local` locally): never `NEXT_PUBLIC_`, never in git.
- **Cap the cost.** These endpoints are public. Require a signed-in user (or the demo account), rate-limit per user, and set a spending limit at the provider.
- **Ground the model in our data.** Prices, stores and bonuses come from the database. Pass the LLM product IDs and prices, then validate its output on the server: drop anything that references an unknown product or price. Never show a price that a model generated.
- **Minimise and anonymise.** Send only what the task needs (budget, items, dietary preferences). Never send names, emails, group members, location history or health information. Tell users that suggestions are AI-generated and what data is sent: a 2-sentence privacy notice, as in lab 3.
- **Structured output.** Define the expected output as a zod schema, ask the model for JSON in that shape, and parse it with `safeParse`. If parsing fails, fall back to a non-AI result (e.g. a plain cheapest-first list), not an error wall.
- **Human in the loop.** AI output is a suggestion the user can accept, edit or dismiss. Nothing AI-driven changes a list, a split or a debt without explicit confirmation.
- **Explain.** Every recommendation shows why: the inputs used, and the saving computed by our code.
- **Latency.** Show progress (H1), allow cancelling, and cache results.
- **Bias and fairness.** Test the outputs across diets, cuisines and budgets. The who-buys-what optimisation must not keep loading the same member; show the split and let the group adjust it.
- **Prompts are code.** Keep prompts as versioned constants in `src/lib/ai/`, so the deck can quote them. Log new or changed prompts in `ai-use-log.md`.

## Adaptivity: how to describe and evaluate it (adaptive-systems lecture)

**Levels of adaptivity** (Browne et al. 1990):

1. The output changes with the input.
2. It responds to sequences of input, so it has some memory.
3. It monitors the effect of its adaptation and adjusts.
4. It has an internal model of the interaction and adapts based on the expected effect.
5. It reasons at a higher level and can change its own models.

Say which level each feature reaches.

**Layered evaluation** (Paramythis et al. 2010): evaluate each layer separately.

| Layer | Boodschapper example | Criteria |
|---|---|---|
| Collect input data | Purchases, bonuses and budget entries are recorded correctly | Reliability, accuracy, latency |
| Interpret data | Does "bought often" really mean "likes it"? | Validity |
| Model the current state | The user and group model (preferences, budget, discounts) | Validity, scrutability |
| Decide on adaptation | Should we suggest switching stores? Push the suggestion, or wait for the user to ask? | Necessity, appropriateness, acceptance |
| Apply the adaptation | How the suggestion is shown | Usability, obtrusiveness, timeliness, user control |

Keep these layers separate in code (data → model → decision → presentation), so each can be tested on its own or simulated. In a **Wizard of Oz** test, a human or a fixed script plays one layer. They follow a written protocol that limits them to what the real system could observe and do.
