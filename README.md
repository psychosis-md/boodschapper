# Boodschapper

Boodschapper compares grocery prices across stores so students on a budget can shop smarter, alone or as a household.

- **Compare prices** across supermarkets, including your personal bonuses.
- **Find the cheapest option** per product or for your whole list, even if that means splitting it over two stores.
- **Cook within budget** with recipe suggestions that fit the amount you set.
- **Shop as a group:** split groceries with housemates, decide who buys what based on each person's discounts, and keep track of shared expenses and who owes whom.

This is our group project for TU Delft **CSE12B Human-Computer Interaction & AI-Assisted Prototyping** (2026-27, Q2). We design it user-first: requirements come from research with our target group, and the prototype is evaluated with real users.

> Prices and bonuses in the prototype are demo data.

## Team

| Name | NetID |
|---|---|
| Amir Djaffar | adjaffar |
| Iker Jonker | ikerjonker |
| Auke Jonker | aukejonker |
| Luca Ardanaz | lardanaz |
| Tomasz Sykula | tsykula |
| Rareș Buruiana | rburuiana |

Project scope (D1): domain *budget cooking/grocery sharing* · target group *students on a strict budget* · system goal *AI-driven recommendation* (secondary: collaborative planning) · platform *mobile web application* (secondary: responsive desktop web application)

Live prototype: TODO

## Stack

- **Next.js** (App Router) with **TypeScript**: pages, server logic and API in one app
- **Tailwind CSS** + **shadcn/ui** (built on Radix) for the UI, themed for a mobile consumer app
- **PWA**: installable on a phone's home screen. There are no native apps
- **PostgreSQL** with **Drizzle ORM** (schema and migrations in TypeScript)
- **zod** to validate input and LLM output
- **Vercel** for hosting, with Postgres from **Neon** via the Vercel Marketplace
- **Quality:** ESLint (with `jsx-a11y`), Vitest, Playwright with axe

## Project layout

| Path | What's in it |
|---|---|
| `src/app/` | Routes (App Router), layouts, `manifest.ts` for the PWA, and route handlers under `api/` |
| `src/components/ui/` | shadcn/ui components, added with the shadcn CLI. We own and may edit them |
| `src/components/` | Our own components |
| `src/lib/` | Domain logic as plain functions: prices, cheapest cart, splits, debts. Unit tested |
| `src/lib/ai/` | LLM prompts and calls. Server-only |
| `src/db/` | `schema.ts` (Drizzle schema), the database client, and `seed.ts` (demo data) |
| `drizzle/` | Generated SQL migrations. Committed, never edited by hand once applied |
| `tests/e2e/` | Playwright tests, including axe accessibility checks |
| `docs/hci/` | Our HCI documentation. See below |

## Requirements

- Node.js 22 LTS or newer
- Docker, for local PostgreSQL

## Run it locally

```bash
cp .env.example .env.local      # then fill in the values
docker compose up -d postgres   # database at localhost:5432 (name, user and password: boodschapper)
npm install                     # also enables our git hooks (see Contributing)
npm run db:migrate              # apply migrations
npm run db:seed                 # demo data (nothing to seed yet: the schema is empty)
npm run dev                     # http://localhost:3000
```

To check it at phone size, use your browser's device toolbar (390×844), or open `http://<your-laptop-ip>:3000` on your phone on the same network.

### Scripts

| Script | Does |
|---|---|
| `npm run prepare` | Runs automatically on `npm install`: `git config core.hooksPath .githooks` |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run vercel-build` | What Vercel runs instead of `build`: applies migrations, then builds |
| `npm run lint` / `npm run typecheck` | ESLint (including accessibility rules) / TypeScript |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright end-to-end and axe checks |
| `npm run db:generate` | Generate a migration after changing `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations |
| `npm run db:seed` | Load demo data |
| `npm run db:studio` | Browse the database in Drizzle Studio |

### Environment variables

| Variable | What |
|---|---|
| `DATABASE_URL` | Postgres connection string. Locally the Docker database; on Vercel it's set by the Neon integration |
| `LLM_API_KEY` | API key for our LLM provider (TODO: pick the provider). Server-only |

Never give a secret the `NEXT_PUBLIC_` prefix: those values are shipped to the browser.

## Deployment

Vercel deploys `main` to production and gives every pull request its own preview URL, which is handy for peer evaluations. The database is a Neon Postgres added from the Vercel Marketplace, and `DATABASE_URL` is set automatically. Migrations run as part of the build.

### CI/CD

| Step | Where | What |
|---|---|---|
| CI | GitHub Actions, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | On every PR and push to `main`: lint, typecheck, unit tests, a check that schema changes have a committed migration, then Playwright + axe at phone and desktop width against a production build with a throwaway Postgres |
| Preview | Vercel Git integration | Every PR gets its own URL. Use a fixed preview URL for user studies (`evaluation.md`) |
| Production | Vercel Git integration | Every merge to `main` |

One-time setup in the dashboards (done by a team member, not in code):

1. **Vercel:** import the GitHub repo as a project (framework: Next.js; Vercel runs `vercel-build` by itself).
2. **Neon:** add it from Vercel → Storage, and turn on **a database branch for each preview deployment**. `vercel-build` runs migrations, so without this a PR's migration would run against the production database.
3. **Vercel → Settings → Deployment Checks:** add the two CI jobs, so a production deploy is only promoted once CI is green.
4. **GitHub → Settings → Branches:** protect `main` and require the CI checks to pass before merging.

TODO: the production URL, and the demo account evaluators use. The final deliverable needs a working live URL by **Wed 20 Jan 2027**.

## HCI documentation

| Doc | What's in it |
|---|---|
| [`requirements.md`](docs/hci/requirements.md) | PACT, personas, functional and non-functional requirements (`FR-xx`, `NFR-xx`), information architecture. The source of truth for what we build |
| [`design-guidelines.md`](docs/hci/design-guidelines.md) | Visual style, Nielsen's heuristics applied to our app, navigation, adaptive design, dark patterns to avoid |
| [`accessibility.md`](docs/hci/accessibility.md) | Our WCAG 2.2 AA rules for React and shadcn/ui, and how to test them |
| [`ai-features.md`](docs/hci/ai-features.md) | Rules for the in-app AI: privacy, grounding, human control |
| [`evaluation.md`](docs/hci/evaluation.md) | Usability issue labels, study tooling, consent and ethics |
| [`course-rules.md`](docs/hci/course-rules.md) | Rubric, deadlines and the course AI policy |
| [`ai-use-log.md`](docs/hci/ai-use-log.md) | Every substantial AI use. This feeds the "AI Use" section of our final deck |

## Contributing

- **Link work to requirements.** Reference `FR-xx` / `NFR-xx` IDs in commits and PRs. A feature that isn't in `requirements.md` gets added there first, by the team.
- **Fill in the PR template.** It's a short HCI checklist: phone and desktop width, keyboard and screen reader, UI states, no secrets or participant data.
- **Label usability issues** from evaluations by method, heuristic (`H1`–`H10`) and severity (`sev:1`–`sev:4`); see `evaluation.md`.
- **Log AI use** in `docs/hci/ai-use-log.md`, including what you changed afterwards and any problems the AI caused.
- **People author commits, not AI tools.** You commit under your own name. Commits and PRs carry no AI attribution (no AI `Co-authored-by` trailers or "Generated with ..." lines); AI work is credited only in `ai-use-log.md`. Claude Code's attribution is switched off in `.claude/settings.json`, and the `.githooks/commit-msg` hook removes AI trailers left by other tools. Don't let cloud agents commit under their own bot account.
- **Keep participant data out of the repo**, including recordings, notes and consent forms.

### Coding agents

Agent instructions live in [`AGENTS.md`](AGENTS.md). Copilot, Cursor and Codex read it directly; `CLAUDE.md` imports it for Claude Code. If you use another tool, point it at `AGENTS.md`.

## Course

CSE12B is taught by Dr.ir. U.K. Gadiraju, Dr. M.L. Tielman and Ir. T.A.R. Overklift Vaupel Klein. Questions about the course go on [Answers EWI](https://answers.ewi.tudelft.nl/) with the tag `#CSE12B`.
