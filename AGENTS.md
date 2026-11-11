# AGENTS.md: Boodschapper

Instructions for every coding agent in this repo (Claude Code, Copilot, Cursor, Codex, ...). Build and run commands are in `README.md`.

## What this repo is

Boodschapper is our group project for TU Delft **CSE12B Human-Computer Interaction & AI-Assisted Prototyping** (nickname "HAIP"), Q2 2026-27. The project is pass/fail against a 6-dimension rubric, and every team member must pass it to pass the course. The goal is a **high-fidelity web prototype, built with user-centred design and evaluated with real users**. Working software alone isn't enough. Every change should trace back to a requirement and be something we can defend on a slide.

Idea: compare grocery prices across stores (including personalised bonuses), find the cheapest store or cart (possibly split over stores), suggest recipes within a user-set budget, and let groups such as housemates split groceries, decide who buys what from each member's discounts, and track shared expenses and debts.

Scope (D1): target group **students on a strict budget**; system goal **AI-driven recommendation** first, collaborative planning second; platform **mobile web app** first, responsive desktop second. When priorities clash, recommendation and phone width win. Details are in `docs/hci/course-rules.md`.

## Hard rules

1. **The web app is the product.** The course only accepts a mobile web app, a responsive desktop web app, or a chatbot inside a web app, demoed at a live URL. Design mobile-first: check every UI change in the browser at phone width (390×844) first, then at desktop width (≥1280). It's installable as a PWA; there are no native apps.
2. **Build only what the requirements say.** Features come from `docs/hci/requirements.md` (IDs like `FR-03`, `NFR-02`). If a task needs something that isn't there, stop and ask. Don't invent requirements. Put the IDs in commit messages and PRs.
3. **Never invent user research.** Don't write personas, interview findings, survey or evaluation results, quotes or participant numbers, and never present "simulated users" as real ones. Fabricated evaluation data fails the whole project.
4. **The team writes the analysis.** UX justifications, heuristic evaluation findings, interpretations of results and reflections must come from humans. You may draft structure or summaries, but mark them `<!-- AI DRAFT: rewrite before use -->`. Code, UI components, mock data and placeholder text are fine to generate.
5. **Log AI use.** When you finish a substantial generation (a feature, a screen, a dataset, an in-app LLM prompt), add a row to `docs/hci/ai-use-log.md`. Every row names the team member who directed the work (from `git config user.name`, or ask); a row without a person doesn't go in. The final deck must list the tools, the key prompts and what humans changed.
6. **People author commits; you only edit the AI log.** Don't commit, push or open PRs unless a human asks. When you do, the human's git identity is the author, and nothing in the commit, branch name or PR text credits an AI: no `Co-authored-by` trailers for AI tools, no "Generated with ..." lines, no model names. The only place AI work is credited is `docs/hci/ai-use-log.md`. The `.githooks/commit-msg` hook removes AI trailers anyway, but don't rely on it.
7. **Accessibility is graded.** Target WCAG 2.2 AA and follow `docs/hci/accessibility.md`. Use semantic HTML and shadcn/ui components instead of hand-built widgets.
8. **Privacy.**
   - Real participant data (names, recordings, notes, consent forms) never goes in the repo or in your context. Use anonymous IDs (P1, P2, ...).
   - No API keys or secrets in client components or in `NEXT_PUBLIC_` variables: both end up in the browser. Modules that use secrets start with `import "server-only"`.
   - Minimise and anonymise user data before it goes to an LLM (see `ai-features.md`).
9. **Mock data is fine, fake claims are not.** Prices, stores and bonuses may be seeded demo data, as long as the UI labels them as demo data. Don't scrape supermarket sites, and never ask users for real loyalty-card or bank credentials.
10. **Don't change the stack on your own.** It's listed below. Don't add frameworks, UI libraries, ORMs or hosted services without a human decision. Small utility packages are fine; mention them in the PR.

## Stack and conventions

Next.js (App Router) + TypeScript (strict), Tailwind + shadcn/ui, PostgreSQL + Drizzle, zod, Vercel (Postgres from Neon). The layout and scripts are in `README.md`.

- **Server first.** Components are server components by default; add `"use client"` only for interactivity, and keep client components small.
- **Validate at the boundary.** Server Actions and route handlers are public HTTP endpoints: parse every input with zod and check who the user is, even if the UI already does.
- **Database.** Change `src/db/schema.ts`, run `npm run db:generate`, and commit the migration in `drizzle/`. Never edit a migration that's already applied. Demo data goes in `src/db/seed.ts`, never real prices scraped from stores.
- **Money** is stored and computed as integer cents. Format it only for display (`€ 2,49`).
- **Domain logic** (cheapest cart, splits, debts) lives in `src/lib` as plain, framework-free functions with Vitest tests. Pages call it; they don't reimplement it.
- **UI.** Add components with `npx shadcn@latest add <name>` and reuse them. Style with Tailwind classes and the theme tokens in `globals.css`; no hard-coded colours. Write mobile styles first and add `md:`/`lg:` for larger screens. Follow the visual style in `design-guidelines.md`: a consumer app, not a dashboard.
- **Tests.** Unit-test domain logic. Each core flow gets a Playwright test that also runs axe.

Before calling a task done, run `npm run lint`, `npm run typecheck` and `npm test`, plus `npm run test:e2e` if a flow changed.

## Read before you work

All of these are in `docs/hci/`. Read only the ones the task needs.

| Task touches | Read |
|---|---|
| Any screen or component | `design-guidelines.md`, `accessibility.md` |
| A new feature, or deciding what to build | `requirements.md` |
| An LLM, recommendations, personalisation or adaptation | `ai-features.md` |
| Study tooling, A/B variants, logging, consent, usability issues | `evaluation.md` |
| Deadlines, the rubric, what graders check | `course-rules.md` |

## Definition of done for UI changes

- [ ] Linked to FR/NFR IDs, and their acceptance criteria are met.
- [ ] Works at 390 px first, then at desktop width.
- [ ] Keyboard only: everything is reachable, focus is visible and the order is logical. Every interactive element and meaningful image has an accessible name.
- [ ] Contrast is at least 4.5:1 for text and 3:1 for UI parts. Touch targets are at least 44×44 px.
- [ ] Lint, typecheck and tests pass, and axe finds no violations on the pages touched.
- [ ] Nielsen self-check passed, with no dark patterns (`design-guidelines.md`).
- [ ] Loading, empty, error and success states exist.
- [ ] `ai-use-log.md` has a row if the work was AI-generated.

## Keeping this current

The course facts here are a snapshot from 9 Nov 2026; the stack was chosen on 11 Nov 2026. Sources: the syllabus, labs 1–7, and the slides for lectures 1, 2 and 7, the user-evaluation lecture and the adaptive-systems lecture. If a Brightspace announcement, TA feedback or the mid-term feedback contradicts these docs, the course wins: tell a human and update the docs.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
