# AI Strategy Socratic Sandbox V2

A browser-only, facilitated workshop for developing a public-sector AI Adoption Strategy:

**Huddle → interrogate an approved AI tool → debate → decide → capture → export.**

AI is a Socratic challenger. People own the judgments, priorities, accountability and final language. The app has no embedded chatbot, accounts, backend, database, API, telemetry, or content transmission.

V1 remains on `main` and tag `v1.0` at `4782ba0` while V2 is reviewed on `v2-strategy-redesign`. Nothing in this work merges or deploys V2 over the stable site. [V2-SPEC.md](V2-SPEC.md) is the implementation source of truth; [QA.md](QA.md) records verification and remaining manual checks.

## Use the workshop

1. Open `index.html` from a static host or a downloaded **complete folder**. Optional setup captures agency, title, version, date, facilitator, participating functions, and planning references. No field is required to begin.
2. Work through the ten Oregon strategy sections. Establish local context, copy the prompt into an enterprise-approved AI tool, and return with its response. Share only information permitted in that tool.
3. Debate the response. Context, AI scratchpad and optional discussion notes remain private working material.
4. Write the group's strategy decisions in the section-specific fields. A line starting with `- `, `* ` or `• ` becomes a bullet. Check the approval box to include that section in the strategy. Editing a strategy field revokes its approval until the group reviews it again.
5. After Phase 10, use **Strategy synthesis** to identify 3–5 near-term priorities, next actions, owners, dependencies, timeframes and unresolved risks. Approve the roadmap separately. Partial work is permitted.
6. Review the developing strategy, then **Export DOCX** or **Copy Draft**. Only approved strategy content and the setup metadata appear. Unapproved text and private notes never automatically become strategy language.

The ten numbered components remain Executive Summary; Guiding Principles; Governance; Intake and Evaluation; Data; Tool Adoption; Training; Human Oversight; Transparency & Public Trust; and Success Metrics. **Implementation Priorities is separate, not Section 11.**

## Storage and privacy

- Autosave uses `ai-strategy-socratic-sandbox-v2:` plus the page pathname. Metadata, each phase's context/scratchpad/discussion/structured capture/approval, and synthesis are stored with schema version 2 and app version 2.0.0.
- V1 storage is separate and is never migrated, overwritten or deleted. V2 begins fresh to avoid treating old workshop consensus as approved strategy.
- Reset confirms before removing all data for the current V2 workspace, clearing its in-memory fields, and returning to setup. Other page paths, other browsers, and V1 storage are independent.
- Notes do not roam between browsers or devices. Private browsing, browser cleanup, storage policy, or quota can prevent persistence. Visible status reports failures. Corrupt/unknown-schema data is not overwritten; use Reset deliberately to start fresh. When storage is unavailable, keep the tab open and copy working notes before closing; DOCX/Copy Draft contain approved content only.
- Static HTML, scripts, styles, logo and fonts load from the same host. No workshop content is sent by the application; there are no runtime CDNs or external requests. Clipboard transfer into an external AI is a deliberate participant action governed by that tool's policies.

## Architecture

No application build step is required. Vanilla HTML/CSS/JavaScript remains the architecture.

| File | Responsibility |
| --- | --- |
| `index.html` | Canonical semantic UI |
| `ai-strategy-socratic-sandbox.aspx` | Byte-identical SharePoint entry point |
| `assets/app.js` | UI, autosave, navigation, timer, clipboard, reset and downloads |
| `assets/state.js` | Defaults, validation and versioned storage loading |
| `assets/phases.js` | Ten Socratic exercises, guardrails and capture fields |
| `assets/strategy-content.js` | Shared approval boundary for preview, copy and DOCX |
| `assets/styles.css`, `assets/brand/` | Responsive EIS design and local fonts/logo |
| `templates/oregon-strategy.js` | Dedicated Oregon-based DOCX template |
| `assets/docx-export.js` | Approved model to OOXML paragraphs/headings/lists |
| `assets/vendor/` | Pinned browser DOCX library, licenses and checksum |

The export uses locally bundled **docx 9.6.1** (MIT), with its upstream dependencies contained in one browser distribution. It creates the OOXML ZIP on the device. It does not disguise HTML as Word. The [template notes](templates/README.md) document the confirmed [Oregon Attachment A reference](https://www.oregon.gov/eis/Documents/Attachment-A-AI-Adoption-Strategy-Template.docx), style measurements, and intentional removal of instructional content.

DOCX includes agency identification, supplied workshop/planning metadata, all ten official headings, approved fields, genuine bullets, implementation priorities, generation date, app version and page numbers. Blank fields are omitted; an incomplete strategy retains empty section headings. Filenames are sanitized and length-bounded, for example `Agency-AI-Adoption-Strategy-v2.1.docx`. Fonts may substitute on machines without Aptos. Successful export is not organizational approval beyond the decisions the group marked for inclusion.

## Static hosting and SharePoint

Host these together, preserving relative paths:

```text
index.html
ai-strategy-socratic-sandbox.aspx
assets/
templates/
```

This is a deliberate V1 packaging change: **V2 is a static folder, not a single self-contained file.** An `.aspx` entry point alone is insufficient. After changing HTML, regenerate the identical copy with `cp index.html ai-strategy-socratic-sandbox.aspx` (PowerShell: `Copy-Item index.html ai-strategy-socratic-sandbox.aspx`). `npm run check` checks parity.

GitHub Pages uses `.github/workflows/deploy-pages.yml`. It stages both entry points and their local assets. Deployment is restricted to `main`, including manual runs; feature-branch tests do not publish V2. The existing stable site is [GitHub Pages](https://roodor-tech.github.io/AI-Strategy-Socratic-Sandbox-MS/).

For a SharePoint library, upload the entry point and both asset folders with the same hierarchy. SharePoint's existing custom-script restrictions still apply. SharePoint Online may block `.aspx` script execution under `DenyAddAndCustomizePages`; use an approved host or have the administrator assess its configuration. A real SharePoint tenant deployment has not been verified here. Downloading the complete static folder and opening `index.html` locally is supported and tested.

## Development checks

Node is needed **only for development tests**, not hosting, DOCX generation, or workshop use. Pinned Playwright and axe dev dependencies are in `package-lock.json`. The local HTTP server exists only inside the test harness.

```sh
npm ci
npx playwright install chromium
npm run check
npm test
npm run test:browser
python tests/verify_docx.py
```

For installed Chrome/Edge, set `BROWSER_CHANNELS=chrome,msedge` before running browser tests. Otherwise tests use Playwright Chromium. CI installs Chromium automatically. Generated screenshots and DOCX fixtures go to ignored `test-results/`; no real workshop data is used.

Tests cover approval boundaries, safe state loading, all phases, keyboard tabs/focus, timer, clipboard/fallback, setup/synthesis, storage/reset, responsive layouts, axe, absence of external/content requests, HTML escaping, local/SharePoint entry points, and empty/partial/full/Unicode DOCX. Standard-library Python validates OOXML. Word and visual checks are documented in [QA.md](QA.md).

## Accessibility

The app preserves semantic landmarks, skip navigation, labelled fields, ARIA tab keyboard behavior, focus management, live status, visible focus, a native reset dialog, reduced-motion support and 320px reflow. Documents use Word Title/Heading styles and real lists. Automated checks support, but do not certify, WCAG conformance. A human NVDA/JAWS pass and agency review of exported content remain appropriate before public release. See the [accessibility directive](CLAUDE-accessibility-directive.md) and [QA evidence](QA.md).
