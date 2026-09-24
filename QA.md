# V1 refresh verification

The original V1 at `4782ba0` / `v1.0` remains preserved. The refreshed controller and interface were restored from that baseline. Its original smoke test passed: context/scratchpad/consensus, reload, tabs, timer, focus mode and reset.

## Automated checks

- `npm run check`: embedded assets, script syntax, deterministic packaging, identical HTML/ASPX, pinned DOCX checksum and no production content-network APIs.
- Eight Node tests: state/default independence, type validation, safe V1 copying, reset/migration behavior, blocked storage, consensus-only output, ten exercises/guide cards/starters, filenames and XML characters.
- Installed Chrome and Edge: all ten huddle/guide/starter/prompt exercises, single consensus capture, optional report details, preview, autosave/reload, reset, V1/V2 storage preservation, corrupt/denied/quota storage, clipboard and fallback, timer start/pause/expiry/restart, focus mode.
- Keyboard: skip link, tablist arrows/Home/End/wrap, roving tab stop, phase focus, reset Escape/focus return, clipboard fallback focus. Reduced-motion environment exercised.
- Ten axe scans across Chrome/Edge, covering initial workshop, report details, 768px and 320px layouts and reset dialog: zero violations in tested states. No horizontal document overflow at narrow widths. Desktop/mobile screenshots inspected.
- HTTP test server serves only the two entry points; asset paths return 404. No external requests, content submissions, failed requests or browser errors observed.
- A copy of **only index.html** in an otherwise empty directory loads with networking disabled in both browsers. Guide interactions, save/reload and genuine DOCX download pass.
- Twelve DOCX fixtures pass ZIP integrity and XML parsing: empty, partial, complete, special-character/long-text, ASPX and isolated offline exports in each browser. All have ten numbered headings; private context/scratchpad and preview placeholders are excluded. Bullets, Unicode and XML-invalid controls are tested.

## Word and visual verification

The Oregon Attachment A reference was inspected in Microsoft Word 16.0 and OOXML: US Letter, one-inch margins, Aptos theme and blue headings inform the report template. Instructions and photographic cover are omitted.

Microsoft Word opens empty, partial, complete and long-text/Unicode reports through normal read-only `Documents.Open`, without invoking repair mode. These render to two, two, four and seven pages respectively. All pages were visually inspected after PDFium rasterization; layout, wrapping and bullet/heading hierarchy are readable. PDFium is used because LibreOffice required by `render_docx.py` is unavailable. Report content comes solely from fictitious fixtures. Source documents are never overwritten.

## Scope and remaining manual checks

Automated accessibility and scripted keyboard evidence support the covered states; they are not full WCAG or assistive-technology certification. Human NVDA/JAWS testing, manual browser-menu zoom and real SharePoint tenant deployment were not performed. Word pagination/fonts can vary by installation. Browser file-storage behavior can vary. Review exported strategy content and document accessibility before organizational distribution.

The Pages workflow stages standalone entry points only. The refresh is published by an explicit manual branch deployment; `main` and `v1.0` remain unchanged. The PR stays open for review.
