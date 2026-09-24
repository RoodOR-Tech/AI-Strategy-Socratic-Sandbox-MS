# V2 verification

## Environment and baseline

V1 baseline `4782ba0` was tested before implementation: Chrome load, context/scratchpad/consensus, save/reload, keyboard tabs, timer, focus mode and reset dialog. V1 is preserved at `v1.0`; all implementation commits are on `v2-strategy-redesign`.

V2 uses pinned development-only Playwright 1.58.2 and axe-core 4.10.3. `npm run check`, `npm test`, `npm run test:browser` and `python tests/verify_docx.py` are repeatable locally and in the new PR CI workflow. No previous regression CI existed; the previous Pages workflow was reviewed and updated to stage local assets while preventing feature-branch deployment.

Remote CI on implementation commit `558dfd6`: [push run](https://github.com/RoodOR-Tech/AI-Strategy-Socratic-Sandbox-MS/actions/runs/36044844537) and [PR run](https://github.com/RoodOR-Tech/AI-Strategy-Socratic-Sandbox-MS/actions/runs/36044938063) passed npm checks, unit tests, Linux Chromium/axe regression, OOXML verification and artifact upload. [PR #5](https://github.com/RoodOR-Tech/AI-Strategy-Socratic-Sandbox-MS/pull/5) is open for review; no merge or deployment was performed.

## Checks completed locally

- Eight Node unit tests: state schema/default independence, Unicode round trip, unsafe/incorrect data types, corrupt/blocked storage, approved-only output, bullet parsing, ten prompt guardrails, roadmap approval, safe filenames and XML character handling.
- Syntax, local asset references, matching HTML/ASPX, pinned DOCX checksum and source network checks.
- Installed Chrome and Microsoft Edge: entire workshop flow, metadata, all ten approvals, approval invalidation, synthesis creation/removal and maximum five priorities, preview, autosave/reload, reset/Escape/focus return, V1 preservation, corrupted and denied storage, and quota failure.
- Keyboard: skip link, tablist Left/Right/Home/End/wrap, one tab stop, Enter activation, focus on view/phase change, reset dialog Escape, clipboard fallback focus restoration. Focus mode exposes pressed state. Timer start/pause/expiry/restart verified.
- Actual prompt copy and rich draft clipboard operations; denied-clipboard fallback and visible failure tested. Scratchpad/context/discussion excluded from preview, clipboard and DOCX.
- Twenty axe scans across Chrome and Edge: setup, approved phase, synthesis, 768px and 320px layouts, and open reset dialog. Zero WCAG 2 A/AA, 2.1 AA or best-practice violations in these states.
- No horizontal document overflow at 320px or 768px; desktop viewport 1440px. Reduced-motion environment tested. Desktop and mobile screenshots inspected. Effective narrow layouts cover reflow at zoomed desktop widths; no claim of a manual browser-menu zoom test.
- No external requests or non-GET/content submissions observed. Hostile HTML captured as text does not create elements or requests. No production content-network APIs; CSP also blocks connections, plugins and base URL changes.
- Both HTTP entry points and a downloaded `file://` copy load/export. Six DOCX downloads per browser: empty, partial, complete, Unicode/long-text, ASPX and file entry points.

## DOCX verification

The confirmed Oregon Attachment A was inspected in Microsoft Word 16.0 and via its OOXML styles. Word rendered the source as 12 pages. US Letter, one-inch margins, Aptos theme and blue heading hierarchy inform the dedicated V2 template; instructional content and photographic cover intentionally do not enter final strategies.

Four browser-generated sample outputs passed ZIP integrity and parsing of every XML/rels part, ten numbered Heading 1s, unnumbered Implementation Priorities, real list paragraphs, safe filename/metadata handling, and exclusion of private notes. Empty/partial outputs contain no fabricated placeholders. Unicode accents, CJK, emoji, ampersands, angle brackets, quotes, multiline content, long agency names and XML-invalid controls were exercised.

Microsoft Word 16.0 opened empty, partial, full and edge-case DOCX files through its normal read-only `Documents.Open` path, without invoking repair mode. All exported to PDF successfully. Final sample page counts were 2, 2, 7 and 10. Raster images were inspected for readable layout, wrapping, bullet/heading hierarchy and page flow; roadmap spacing was refined. Source files were never overwritten. Packaged `render_docx.py` could not run because LibreOffice was absent; actual Word rendering and PDFium rasterization were used instead.

## Accessibility scope and remaining manual checks

Evidence addresses WCAG 1.3.1 (landmarks, labels, heading/list relationships), 1.4.3/1.4.11 (axe text/UI contrast checks), 1.4.10 (320px reflow), 2.1.1/2.1.2 (keyboard behavior and native dialog), 2.4.3/2.4.7 (focus order/visibility), 3.3.2 (visible labels), 4.1.2 (tab/checkbox/button names and state), and 4.1.3 (status announcements). Automated and scripted keyboard checks passed for the covered states. This is not full assistive-technology certification.

Not performed: human NVDA/JAWS testing, manual browser-menu 200% zoom, and deployment in a real SharePoint tenant. Word fonts/pagination can vary by installed fonts/version. Agency reviewers still need to approve their strategy's substance and document accessibility before distribution. The later user request authorizes a manual V2 Pages deployment while preserving main and the V1 tag; see V2-SPEC.md.
