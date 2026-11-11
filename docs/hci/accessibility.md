# Accessibility

Target: **WCAG 2.2 level AA**. The course says "WCAG" without a version, and 2.2 AA includes everything in 2.1 AA. The rubric fails a project for "severe WCAG failures". The labs practise contrast checks, accessible focus states and the Principles of Universal Design.

Our main platform is a **phone browser**, so test there, not only on a laptop.

## Starting points

- **Semantic HTML first.** A button is a `<button>`, a link is `<a>` / `<Link>`, a list is `<ul>`. Never put `onClick` on a `<div>` or `<span>`.
- **Use shadcn/ui for interactive widgets** (Dialog, Drawer, Select, Tabs, DropdownMenu, ...). They're built on Radix, which handles roles, keyboard support and focus. Don't hand-build these.
- **When editing shadcn components, keep the accessibility parts:** the `focus-visible:` classes, `aria-*` attributes, and visually hidden titles and descriptions (`DialogTitle`, `DrawerTitle`).

## Rules

| Need | Do |
|---|---|
| Icon-only buttons | `aria-label="Remove milk from list"`. Decorative icons (lucide) get `aria-hidden` |
| Images | `next/image` with a meaningful `alt`, or `alt=""` if decorative |
| Grouped info (price card) | Write the card so it reads in a sensible order: "Milk, Jumbo, € 1,19, bonus". Put visually hidden text (`sr-only`) where a visual cue has no words |
| Headings | One `<h1>` per page, then `h2`/`h3` in order. Don't pick heading levels for their size |
| Page titles | Every route sets a unique `metadata.title`. Next.js announces route changes using it |
| Language | `<html lang="en">` in the root layout (or `nl` if the UI is Dutch) |
| State | Use the component's props (`pressed`, `checked`, `aria-current="page"` on the active tab, `aria-selected`) so state is announced, not just shown |
| Changing values | `aria-live="polite"` on the cart total, the budget left and form-level errors. Toasts (Sonner) are announced, but don't put the only copy of important info in a toast |
| Forms | A visible `<Label>` for every field, never a placeholder alone. Errors linked with `aria-describedby` and `aria-invalid` (the shadcn form components do this). `inputMode="decimal"` for amounts. Correct `autocomplete` values |
| Keyboard | Everything reachable with Tab in visual order. In dialogs and drawers, focus moves in, stays inside while open, Esc closes, and focus returns to the trigger (Radix does this; don't break it) |
| Focus visibility | Keep a visible focus ring (at least 2 px, 3:1 contrast). Never `outline-none` without a replacement |
| Target size | Touch targets at least **44×44 px** (e.g. `h-11 min-w-11`). WCAG's hard minimum is 24×24 px, with spacing |
| Text size and zoom | Use `rem`-based Tailwind sizes. Layouts survive 200% zoom and 320 px width without clipping or horizontal scrolling. **Never disable pinch zoom** (no `maximumScale` or `userScalable: false` in the viewport settings) |
| Colour | Text contrast at least 4.5:1 (3:1 for large text). UI parts and focus at least 3:1. Never colour alone: "cheapest" gets a label or icon too. Colours come from theme tokens and are checked in light and dark mode |
| Motion | Use `motion-safe:` / `motion-reduce:` variants. Nothing flashes |
| Time limits | None on any task |

## How to verify before a PR

1. **Automated:** `npm run lint` (`jsx-a11y`) and the Playwright axe checks on the pages you touched. These catch only part of the problems, so a clean result is the start, not the end.
2. **Keyboard only** (desktop): complete the flow with Tab, Shift+Tab, Enter, Space and Esc.
3. **Screen reader on a phone:** VoiceOver (iOS) or TalkBack (Android). Each element announces its name, role and state, and swiping goes through the page in a sensible order.
4. **Contrast:** check the colour tokens with a contrast checker (e.g. WebAIM), in both themes.
5. **Zoom and width:** at 200% zoom and 320 px width nothing is clipped and there's no horizontal scrolling.

## Universal design

Design for low vision, limited motor control, low digital literacy, non-native speakers, and dyslexia or ADHD: plain language, short steps, predictable layouts, generous spacing, and nothing that relies on memory.
