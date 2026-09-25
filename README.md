# AI Strategy Socratic Sandbox — V1 Refresh

**[Open the live workshop](https://roodor-tech.github.io/AI-Strategy-Socratic-Sandbox-MS/)**

The original guided workshop, refreshed with Oregon EIS branding and genuine Word reports. **One self-contained HTML file** works offline or on a static host. No accounts, backend, APIs, telemetry, or transmission of workshop content.

**Huddle → ask your approved AI → debate → capture the group's consensus.**

## Use the workshop

Open the live link, or [download index.html](https://raw.githubusercontent.com/RoodOR-Tech/AI-Strategy-Socratic-Sandbox-MS/v2-strategy-redesign/index.html) (save the linked file, then double-click it). No other files are needed.

1. Start on Phase 1. Discuss the huddle question and enter local context. Guide cards help facilitate each exercise.
2. Copy the prompt into your enterprise-approved AI tool. Bring useful questions or responses back to the AI scratchpad.
3. Challenge the response and record the group's decisions in **Consensus Capture**. Starter buttons help begin the language. Only consensus enters the developing strategy and export.
4. Work through the ten phases using the tabs or Previous/Next. Use the timer and Focus Mode as needed.
5. Optionally expand **Report details** for agency, title, version and workshop date. Use **Export DOCX** for a real Word report, or **Copy Draft**.

There is no setup gate, approval checkbox, structured intake form or extra synthesis phase. AI remains a challenger; humans make the decisions. Context and scratchpad notes never automatically become strategy content.

## Word report

The export has an identification cover, the ten official Oregon AI Adoption Strategy headings, consensus prose, proper bullet lists, generation information and page numbers. Start a line with `- `, `* ` or `• ` to make a bullet. Empty sections retain their headings without placeholder text. The filename is sanitized and length-bounded, such as `Agency-AI-Adoption-Strategy-v1.0.docx`.

The dedicated [export template](templates/README.md) follows the structure and typography of [Oregon Attachment A](https://www.oregon.gov/eis/Documents/Attachment-A-AI-Adoption-Strategy-Template.docx). Template instructions do not enter the report. Bundled **docx 9.6.1** generates genuine Office Open XML locally; no conversion service is involved. Word may substitute fonts depending on the device.

## Local storage and privacy

Autosave uses `ai-strategy-socratic-sandbox-v1-refresh:` plus the page pathname, schema `1.1`, app version `1.1.0`. Each phase retains V1's context, scratchpad and consensus. Report details are saved alongside them.

On first use, valid V1 data at the same origin/path is copied into the refresh workspace without changing the original. V2 data is left separate. Reset confirms before clearing the refresh workspace and saves an empty workspace to prevent old V1 notes from reappearing. Other paths, browsers and versions are unaffected.

Browser cleanup, private browsing, storage policies or quota can prevent persistence. Visible status reports failures. Corrupt or unsupported saved data is preserved until explicit Reset. Keep the tab open and copy unsaved working notes if autosave fails; the report contains consensus only. Moving/renaming a downloaded file can change its storage location, and local-file storage behavior varies by browser.

All fonts, logo, styles, scripts and DOCX support are embedded. There are no runtime asset requests, CDNs or content-network calls. Copying a prompt into an external AI is a deliberate participant action subject to that tool's policies.

## Hosting: upload one file

Upload **`index.html` alone** to GitHub Pages or another static host. The byte-identical `ai-strategy-socratic-sandbox.aspx` is an alternative for environments that allow that entry point. Neither needs `assets/` or `templates/` beside it. Each is approximately 2.4 MB because fonts and Word support are embedded.

SharePoint's custom-script restrictions still apply; a tenant may block ASPX execution. A real SharePoint tenant deployment has not been verified. Downloaded HTML works independently, including offline DOCX export.

Pages is published at **[https://roodor-tech.github.io/AI-Strategy-Socratic-Sandbox-MS/](https://roodor-tech.github.io/AI-Strategy-Socratic-Sandbox-MS/)**. Pushes to `main` deploy that branch. This review branch can be published deliberately through **Actions → Deploy to GitHub Pages → Run workflow → v2-strategy-redesign**. Feature-branch pushes do not deploy automatically.

## Maintainer source and checks

Readable source remains modular in the repository; distribution is a single file. After source edits, run `npm run package` to regenerate both checked-in entry points. This small packaging step only embeds assets; users and hosting need no Node installation or build system.

| Source | Purpose |
| --- | --- |
| `src/index.template.html` | Original V1 interface with embedding markers |
| `assets/app.js`, `assets/phases.js` | V1 interactions and ten guided Socratic exercises |
| `assets/workshop-state.js` | Refresh state, validation and safe V1 copying |
| `assets/report-content.js` | Consensus-only preview, clipboard and export model |
| `assets/styles.css`, `assets/brand/` | Oregon EIS presentation, fonts and logo |
| `assets/docx-export.js`, `templates/oregon-strategy.js` | Word document generation and styling |
| `assets/vendor/` | Pinned DOCX library and license notices |
| `scripts/package-single-file.cjs` | Deterministic one-file packaging |

```sh
npm ci
npm run package
npx playwright install chromium
npm run check
npm test
npm run test:browser
python tests/verify_docx.py
```

Set `BROWSER_CHANNELS=chrome,msedge` to test installed Chrome and Edge. CI uses Chromium. Playwright and axe are development-only dependencies. Tests include V1 interactions, keyboard navigation, timer, clipboard, migration/reset, responsive layouts, accessibility scans, private-note exclusion, DOCX structure, and a lone HTML file in an empty directory with networking disabled. See [QA.md](QA.md) for results and limits.

The original V1 remains on `main` and tag `v1.0` at `4782ba0`. This refresh is reviewed in [PR #5](https://github.com/RoodOR-Tech/AI-Strategy-Socratic-Sandbox-MS/pull/5) on `v2-strategy-redesign`; it has not been merged. [REFRESH-SPEC.md](REFRESH-SPEC.md) is the current source of truth. The earlier expanded V2 specification is retained as historical context.
