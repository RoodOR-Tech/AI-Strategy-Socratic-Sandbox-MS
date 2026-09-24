# AI Strategy Socratic Sandbox V2

## Authority and purpose
This specification implements the requested disciplined V2 evolution. It is the implementation source of truth. Humans huddle, interrogate an external approved AI, debate, decide, and capture an agency strategy. AI challenges reasoning; it does not make agency decisions. No embedded AI, accounts, backend, database, telemetry, or transmission of workshop content.

## Protected baseline
- GitHub default/stable branch: `main`, commit `4782ba0205f1a9ef6223776b90419c1330ce4144`.
- `v1.0` preserves that commit; development occurs only on `v2-strategy-redesign`. Never merge or rewrite stable history as part of this task.
- V1 uses inline HTML/CSS/JS, path-scoped browser storage, ten accessible phase tabs, context, scratchpad, consensus, prompt copy, timer, focus mode, live preview, rich clipboard, and reset dialog.
- `index.html` is canonical; `.aspx` is a byte-identical SharePoint entry point. Preserve both. Pages currently stages only those files; V2 local assets must also be staged.
- Discrepancy: README says Markdown export, but actual V1 exports HTML with a `.doc` extension. Replace this with genuine OOXML.
- Baseline Chrome smoke passed: load, capture, autosave/reload, arrow-key tabs, timer start/pause, focus mode, reset dialog/Escape. No existing test runner or QA CI; Pages deployment is the only workflow.

## Architecture and privacy
Retain vanilla HTML/CSS/JS and static hosting. Extract small data/state/export modules only where useful. Local assets must work without runtime CDN requests. External AI interaction is manual prompt copy. Context, scratchpad and discussion never enter exports. Only explicitly approved strategy fields and intentionally entered identification metadata enter preview/export.

V2 storage key: `ai-strategy-socratic-sandbox-v2:` plus page pathname. Schema includes `schemaVersion`, `appVersion`, `metadata`, `phases` (context, scratchpad, discussion, capture, approval), and `synthesis` priorities. Validate loaded types; handle unavailable/corrupt storage visibly. Do not migrate generic V1 consensus into approved strategy. V1 storage remains separate. Reset removes all V2 data and returns to optional setup.

## Strategy structure and capture
Keep exactly ten official numbered strategy sections:
1. Executive Summary — mission/problem, rationale, public value, boundaries.
2. Guiding Principles for Responsible AI Use — principles, meaning, practical decision rules.
3. Governance and Oversight — strategic and operational governance, escalation, accountability.
4. Use Case Intake and Evaluation Process — intake path, risk approach, approval/escalation, safeguards.
5. Data Management and Classification — boundaries, classification, restricted data, stewardship.
6. Tool Adoption — approved tools, evaluation, prohibited/unmanaged uses, workforce needs.
7. Training and Employee Engagement Strategy — audiences, expectations, role requirements, support.
8. Human Oversight and Accountability — human review, verification, sign-off, non-autonomous uses.
9. Transparency & Public Trust — disclosure triggers, internal/public transparency, feedback.
10. Success Metrics and Evaluation — outcomes, efficiency, risk/compliance, cadence.

Use at most four concise capture fields per phase. Keep context and AI scratchpad separate, with optional private discussion. Editing approved content revokes approval until reviewed again. Preview reflects the final strategy hierarchy and excludes unapproved text. Preserve the Socratic exercises and their focus; add assumption, evidence, tradeoff, missing-information and agency-knowledge guardrails. Data exercise asks for due-diligence evidence about data flow, retention, logging, training, subprocessors, jurisdiction, contract, privacy, records and security, never an invented exact vendor data path. Intake uses supplied statewide/agency policy or explicitly identified NIST AI RMF and states assumptions. Fictional errors are labelled and explained.

## Setup and synthesis
Optional setup before Phase 1: agency, title (default AI Adoption Strategy), version, date, facilitator, participating functions, agency strategic-plan reference, IT-plan reference. No required metadata gate.

Separate Strategy Synthesis follows Phase 10; it is not official Section 11. Capture 3–5 near-term priorities with next action, owner, dependency, timeframe and unresolved decisions/risks. Allow partial work without blocking export. Explicitly approve implementation content. Export as unnumbered Implementation Priorities.

## Design and accessibility
Restrained Oregon EIS visual reference: https://www.oregon.gov/eis/Pages/default.aspx. Inspect real site colors/fonts/logos; bundle used assets locally with provenance. Strong hierarchy, whitespace, document preview, readable fields, no decorative gradients/animation. Preserve tabs, progress, focus mode, timer and clipboard fallbacks. Setup/synthesis navigation must have focus management and accessible names. Follow repository accessibility directive: semantic landmarks, labels, keyboard access, visible focus, live status, contrast, 320px reflow, 200% zoom, reduced motion. Automated axe plus keyboard checks are required; manual screen-reader limits must be disclosed.

## DOCX design and export architecture
Use a pinned mature browser-compatible DOCX library, locally vendored with license and checksum. No app build/server needed. A dedicated declarative template under `templates/` controls page geometry, paragraph styles, ten sections, cover metadata, and implementation content. Generate genuine ZIP/Office Open XML in-browser, not HTML with a renamed extension. Reference the official Oregon strategy template; omit its instructional paragraphs. Inspect the supplied/named template if available; document source discrepancies.

Cover: agency, strategy title, version/date, optional workshop identification and planning references. Body: exactly ten numbered headings with approved structured content, proper Word heading styles, paragraphs, real bullets, whitespace and line breaks. Blank fields omitted, no invented commitments or ugly placeholders. Implementation Priorities follows separately. Generation/version information included. Filename: sanitized, length-bounded `[Agency]-AI-Adoption-Strategy-v[Version].docx`. Test empty/partial/full content, Unicode/XML characters, long text/agency names, bullets and metadata. Verify package structure and render; test opening in Microsoft Word when available and report any unverified requirement.

## Sequential implementation and gates
0. Baseline/branch/tag/spec — inspect, baseline smoke, protect V1, commit this specification.
1. State — schema/defaults, metadata/capture/synthesis types, safe load, autosave, tests; retain UI initially; commit.
2. Capture — section fields, improved prompts, approval boundary, preview/navigation; test and commit.
3. Visual — Oregon assets, optional setup, responsive document-oriented layout; axe/keyboard/reflow; commit.
4. Synthesis — 3–5 priorities and accountability, preview wiring; test and commit.
5. DOCX — pinned dependency, dedicated template, genuine export; structural/visual/Word checks; separate commit.
6. QA — Chrome and Edge, desktop/mobile, keyboard tabs/focus/dialog, reduced motion, timer/copy, storage recovery/reset, all export edge cases; update docs/CI, review diff, commit, publish review PR without merge.

At each stage inspect relevant code, make coherent changes, run checks, review diff, fix failures, commit and summarize files/checks/limits/next stage. Never claim unperformed verification.

## Acceptance checklist
- [x] Stable V1 recoverable on unchanged main and v1.0; separate V2 branch.
- [ ] Static deployable, local-only content, no unnecessary infrastructure.
- [ ] Ten official components and original facilitated Socratic flow.
- [ ] Optional setup, structured human-approved capture, separate synthesis.
- [ ] Document-like preview and Oregon visual identity.
- [ ] Real template-anchored DOCX with headings/bullets/metadata/roadmap; no scratchpad.
- [ ] Accessibility/responsiveness maintained or improved with regression evidence.
- [ ] Autosave, refresh, reset and schema separation verified.
- [ ] Architecture, dependencies, hosting and known limitations documented.
- [ ] Focused stage commits and reviewable PR; no merge to main.

## Stage evidence and limitations
Stage 0: repository and workflow inspected; V1 Chrome baseline passed. Tag and branch pushed successfully. No application code changed. Exact named Exec Team template is not in the repository; official EIS page links `Attachment-A-AI-Adoption-Strategy-Template.docx`, to be inspected as a public reference unless the named file is supplied.

Stage 1: added pure validated V2 state module and three unit tests; old UI adapted to phases envelope. Chrome V1-flow regression passed. Corrupt/unsupported saved state is preserved until explicit reset. Temporary consensus field is retained only until structured capture stage.

Stage 2: extracted existing exercises/controller into assets/phases.js and assets/app.js; added structured capture, separate private discussion, explicit review approval and a shared output whitelist. Five unit tests passed; Chrome capture/refresh/approval-invalidation and axe WCAG A/AA plus best practices passed with zero violations. Confirmed user reference is the public Attachment A template.

Stage 3: added optional metadata setup, local EIS logo/Inter assets with provenance, restrained Oregon-blue styling, responsive document preview and setup focus management. Five unit tests passed; Chrome axe scans on setup, phase and 320px viewport reported zero violations, with no horizontal overflow. Desktop screenshots inspected. Static asset folders are now required for hosting; deployment staging updates follow in QA.

Stage 4: separate synthesis step follows Phase 10; three expandable priority cards, up to five, capture action/owner/dependency/timeframe/risks. Explicit roadmap approval uses the shared preview/export boundary. Six unit tests and Chrome navigation/add/remove/approval/reload checks passed; synthesis axe scan reported zero violations.
