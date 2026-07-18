# Accessibility Directive — WCAG 2.1 Level AA (non-negotiable)

This project must conform to WCAG 2.1 Level AA. This is a legal requirement under ADA
Title II for Oregon state government digital services, not a nice-to-have. Every
component you write, edit, or review must satisfy this directive before you consider
the task complete. Do not wait to be asked — apply this by default.

## Non-negotiable rules

**Semantic HTML first, ARIA second.**
Use native elements (`<button>`, `<nav>`, `<main>`, `<label>`, `<dialog>`, `<details>`)
before reaching for ARIA. Only add ARIA attributes when no native element provides the
semantics you need. Never add `role="button"` to a `<div>` when `<button>` would work —
you lose free keyboard support, focus handling, and screen reader behavior.

**Every interactive element is keyboard-operable.**
- Tab order must be logical and match visual order.
- No keyboard traps — a user must always be able to Tab or Shift+Tab out.
- Custom widgets (dropdowns, tabs, accordions, modals, step wizards) must implement
  the correct ARIA Authoring Practices Guide (APG) keyboard pattern for that widget
  type — don't invent your own.
- Visible focus indicator on every focusable element (`:focus-visible`, not
  `outline: none` with nothing to replace it).

**Focus management on route/step/view changes — this is the #1 SPA failure point.**
Since this is a client-side SPA with no page reloads, the browser will NOT
automatically move focus or announce anything when the view changes. You must handle
this explicitly:
- On step/route change, move focus to the new view's heading or first interactive
  element (`ref.current.focus()` on an `h1`/`h2` with `tabindex="-1"`).
- Update `document.title` on each logical "page" change within the SPA.
- Never leave focus on a now-hidden/removed element.

**Live regions for dynamic content — required whenever content changes without
navigation.**
Any content injected or updated without a route change (validation errors, save
confirmations, progress updates, export-ready notifications) needs an
`aria-live="polite"` (or `"assertive"` for errors/urgent status) region so screen
reader users get the update. Silent DOM updates are a Level AA failure.

**Color contrast — verify with numbers, not eyeballing.**
- Normal text: minimum 4.5:1 against background.
- Large text (18pt+/14pt bold+) and UI component borders/icons: minimum 3:1.
- Never convey status (error, success, required) with color alone — pair with text
  or an icon plus text.

**Forms.**
- Every input has a visible, programmatically associated `<label>` (not just
  placeholder text — placeholders disappear on input and fail 1.3.1/3.3.2).
- Required fields marked in both visual and programmatic terms
  (`aria-required="true"` + visible indicator, not color alone).
- Errors are identified in text, associated with the field via `aria-describedby`,
  and announced via a live region — not just a red border.
- On submit failure, move focus to the first error or an error summary.

**Motion and animation.**
Wrap non-essential animation/transition in
`@media (prefers-reduced-motion: reduce)` and provide a reduced/no-motion version.

**Text resize and reflow.**
Layout must not break or clip content at 200% browser zoom (1.4.4) and must reflow
without horizontal scrolling at 320px width equivalent (1.4.10). Don't use fixed
pixel heights on text containers.

**Landmarks and skip navigation.**
Use `<header>`, `<nav>`, `<main>`, `<footer>` landmarks. Include a "Skip to main
content" link as the first focusable element on the page.

**Downloadable/exported content (specific to this project's in-browser export
feature).**
If the app generates a downloadable file (PDF, DOCX, CSV) in-browser, that generated
artifact must itself meet applicable accessibility standards where practical
(tagged PDF structure, not an image dump of the page). If full tagging isn't
feasible client-side, flag this explicitly as a known limitation rather than
silently shipping an inaccessible export.

## Verification loop — do this every time, don't just self-assess

1. After writing or editing any UI component, run the project's automated
   accessibility check (axe-core via the test runner — see below) and fix all
   violations before reporting the task done.
2. Automated tools catch roughly 30-50% of WCAG issues. For anything with custom
   interaction (wizards, modals, dynamic forms), also do a manual keyboard-only
   pass: unplug the mouse mentally and confirm you can complete the flow with
   Tab/Shift+Tab/Enter/Space/Arrow keys/Escape alone.
3. State explicitly in your response which WCAG success criteria a new component
   touches and confirm each is satisfied — don't just say "this should be accessible."
4. If you are uncertain whether something meets AA, say so directly and flag it for
   manual review rather than asserting compliance.

## Tooling to wire in

- **axe-core** (`@axe-core/react` in dev, or `axe-core` + Playwright/Cypress in CI)
  for automated scanning on every build.
- **eslint-plugin-jsx-a11y** if using React/JSX — catches missing alt text, invalid
  ARIA, missing labels at write-time, before it ever reaches runtime.
- **Pa11y CI** as a build-gate check against WCAG 2.1 AA ruleset.

Do not report a component or page as "done" until it has passed the automated scan.
If the automated scan can't run in this environment, say so and note that manual
verification is still required before this ships.
