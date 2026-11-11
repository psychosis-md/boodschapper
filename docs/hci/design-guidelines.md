# Design guidelines

Course basis: Nielsen's 10 heuristics (the list the course's evaluation labs use), Shneiderman's 8 golden rules, Norman's principles, and Benyon's *Designing User Experience*. Peer evaluators will test our prototype against heuristics H1–H10 and rate problems for severity on a 1–4 scale, so design against them from the start.

## Visual style

Boodschapper is a consumer app for students on a phone, not a B2B dashboard. shadcn/ui's defaults look like a SaaS admin panel, so change them:

- **Theme tokens** in `globals.css` set the look: a warm primary colour, a separate "savings" accent, a generous radius and a friendly font. Never use supermarket brand colours (e.g. Albert Heijn blue, Jumbo yellow), so we're never confused with a store.
- **Mobile patterns:** a bottom tab bar (3–5 items), `Drawer` (bottom sheet) rather than `Dialog` on phones, cards with product images rather than tables, and main actions within thumb reach.
- **Prices:** `tabular-nums` so amounts line up; the saving is the most prominent number.
- **Feedback:** skeletons while loading or while the AI works, toasts to confirm, friendly empty states with a next step.
- Light and dark mode both work, from the same tokens.

## Nielsen's heuristics applied to Boodschapper

| | Heuristic | In Boodschapper |
|---|---|---|
| H1 | Visibility of system status | Show where each price comes from and when it was last updated. Show progress while comparing or while the AI is working. Keep the cart total and remaining budget visible. Confirm after adding, splitting or settling up |
| H2 | Match between system and real world | Euros in Dutch format (€ 2,49). Unit prices (€/kg) like on shelf labels. Use the bonus terms shoppers already know ("1+1 gratis", "2e halve prijs") and explain them for internationals. Use the users' words, not database terms |
| H3 | User control and freedom | Undo for removing an item, leaving a group or deleting an expense. Back (including the browser's back button) always works. Users can override any recommended store or split |
| H4 | Consistency and standards | One component per concept (price tag, store chip, member avatar). The primary action always sits in the same place. One term per thing: pick "list" or "cart", not both. Follow web and mobile platform conventions |
| H5 | Error prevention | Confirm destructive and money actions and state the consequence ("Remove Sam? Sam's €12,40 debt stays recorded"). Validate amounts inline. Disable actions that can't work yet |
| H6 | Recognition rather than recall | Recent and frequent products, visible active filters, and "who owes whom" visible without digging |
| H7 | Flexibility and efficiency of use | Quick add, reuse the last list, sensible defaults, keyboard shortcuts on desktop |
| H8 | Aesthetic and minimalist design | The cheapest option and the saving are the focus. Every store's price is on demand, not shown by default |
| H9 | Help users recognise, diagnose and recover from errors | Plain-language messages next to the cause: what happened, then what to do. Never raw exceptions or HTTP codes |
| H10 | Help and documentation | Short inline explanations of how personal bonuses and splits are calculated |

Also from the course:

- Shneiderman: every flow ends in clear success or a clear, explained failure ("closure"). Reduce what users must remember.
- Norman: the digital flow mirrors the real shopping trip (mapping); use constraints so wrong input can't happen.

## Information architecture

- Few top-level sections: 3–5 in a bottom bar on mobile, the same items in the top or side navigation on desktop. The labels come from the team's card sort and are recorded in `requirements.md`.
- Labels must be specific, predictable and consistent. Don't mix organisation schemes in one menu (for example a task, a store and a user type side by side).
- Users always know where they are: an active nav state, a screen title, and back or breadcrumbs from depth 2 onward.

## Adaptive design (rubric dimension 2)

Personal bonuses, budget-aware recipes and who-buys-what are adaptive features. They must:

- Use an **explicit user model** (budget, diet, nearby stores, accessibility needs) that the user sets and can edit.
- Be **scrutable**: a "Why this?" explanation cites the inputs, for example "Jumbo is €4,20 cheaper with your 2 bonuses". Our code computes the numbers, not an LLM.
- Leave the **user in control**: accept, edit or dismiss. Nothing changes silently.
- **Adapt to accessibility constraints**: respect the browser's text size, reduced motion and dark mode.

## Money, groups, trust

- Store money as integer cents. Totals must add up exactly, and the rounding rule for splits is visible.
- Each price shows its store and date. Personalised prices are marked as personal to that user.
- Use neutral debt language ("Sam owes €12,40"): no shaming and no nagging.

## No dark patterns

No fake urgency or scarcity, no pre-ticked opt-ins, no confirmshaming, no hidden costs. Sponsored or affiliate ordering is labelled. Leaving a group or deleting an account is easy. AI-generated UI often slips these in, so check its output.

## States

Every screen has loading, empty (with a next step), error and success states. Slow or offline networks are stated plainly.

## Showing prices, savings and expenses

Use the simplest form that answers the question: a sorted list beats a chart for "where is it cheapest?". Use charts only for trends or expense shares. Label values directly, never use colour as the only signal, and give the numbers as text too.

TODO: update this section after lecture 13 (data visualisation, Mon 11 Jan 2027).
