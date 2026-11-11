# Requirements (source of truth)

The team owns this file and fills it from our PACT analysis, interviews, surveys and card sort (labs 1–2). Agents read it and build against it, and may fix formatting or IDs. They don't add, remove or reword requirements or personas unless a human asks.

A requirement is "something the product must do or a quality the product must have" (Robertson & Robertson, quoted in the lecture 2 slides). Write each one so it can be tested. Say *what*, not *how*: the how belongs to design. Prioritise with MoSCoW: **Must** (the minimum viable product), **Should**, **Could**, **Won't** (this time).

## Scope (from D1)

Domain: budget cooking/grocery sharing · Target group: students on a strict budget · System goal: AI-driven recommendation (secondary: collaborative planning) · Platform: mobile web application (secondary: responsive desktop web application)

Priority: features that serve the primary goal can be **Must**. Features that only serve collaborative planning are **Should** or **Could**, unless user research shows they're essential. Design for phone width first; desktop must still work.

## PACT

| | |
|---|---|
| People | TODO |
| Activities | TODO |
| Context (physical, social, organisational) | TODO |
| Technologies | TODO |

## Personas

TODO: two personas from lab 1, each with goals, pain points, tech literacy and accessibility needs. Base them on real research; AI output alone doesn't count.

## Functional requirements (what the system must do)

| ID | The system must... | MoSCoW | Acceptance criterion (testable) | Evidence (interview, survey, PACT) |
|---|---|---|---|---|
| FR-01 | | | | |

## Non-functional requirements (qualities the system must have)

Cover usability, accessibility, performance, privacy and security, legal constraints, and cultural acceptability.

| ID | Quality | MoSCoW | Acceptance criterion | Evidence |
|---|---|---|---|---|
| NFR-01 | Core flows meet WCAG 2.2 AA | Must | Pass the checks in `accessibility.md` | Course rubric (required by the course) |
| NFR-02 | User data sent to AI services is minimised and anonymised | Must | Code review of the payloads; privacy notice shown | Course rubric (required by the course) |

## Information architecture

TODO from the card sort (lab 2): the top-level navigation labels (3–5 on mobile), the organisation scheme, and a screen map. Don't add new top-level items without updating this section.

## Feature backlog from the pitch (not yet requirements)

Validate these with users, then promote them to FRs with IDs:

- *(recommendation)* Compare grocery prices across stores, including personalised bonuses.
- *(recommendation)* Show the cheapest store per product, and the cheapest store or store combination for a whole list (split location).
- *(recommendation)* Suggest recipes within a user-set budget, and manage groceries against that budget.
- *(collaborative planning)* Groups: split groceries, use each member's personal discounts to decide who buys what.
- *(collaborative planning)* Track shared household expenses and debts.
