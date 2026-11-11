## What and why

<!-- One or two sentences. -->

Requirements: <!-- FR-xx / NFR-xx from docs/hci/requirements.md. No ID, no feature. -->

## Checks

- [ ] Works at phone width (390×844) first, then desktop (≥1280)
- [ ] Keyboard only: everything reachable, focus visible, logical order
- [ ] Screen reader: interactive elements and meaningful images have accessible names
- [ ] Contrast ≥ 4.5:1 for text, ≥ 3:1 for UI parts; touch targets ≥ 44×44 px
- [ ] Loading, empty, error and success states exist
- [ ] Nielsen self-check, no dark patterns (`design-guidelines.md`)
- [ ] `npm run lint`, `npm run typecheck`, `npm test` pass (and `npm run test:e2e` if a flow changed)
- [ ] No secrets in client code or `NEXT_PUBLIC_` variables
- [ ] No participant data (names, recordings, notes, consent forms)
- [ ] New packages are listed below
- [ ] AI-generated work has a row in `docs/hci/ai-use-log.md`; no AI attribution in commits or this PR

## New packages

<!-- Name and why, or "none". -->

## Screenshots

<!-- Phone and desktop. -->
