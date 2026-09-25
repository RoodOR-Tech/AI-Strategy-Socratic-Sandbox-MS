# V1 refresh — current product direction

This supersedes the expanded V2 workflow specification following user review of the live prototype. Preserve V1 functionality and facilitation; retain the accepted branding, colors, fonts, tighter presentation and report-quality export. Do not merge into main. Prior V2 work remains in Git history.

## Keep V1's interaction model
- Open directly on Phase 1; retain exactly ten phases and Previous/Next wrapping.
- Restore Group Huddle, exercise question, local context, guide cards, copyable AI prompt, AI response scratchpad, Consensus Capture and starter-phrase buttons.
- Retain phase tabs/progress, timer, focus mode, live strategy preview, copy draft, local autosave and reset.
- One consensus field per phase remains the final strategy content; no approval checkbox, structured section forms, setup gate or synthesis stage.
- AI remains external and enterprise-approved; scratchpad/context never export automatically. Retain evidence/assumption guardrails in prompts without changing the exercise interaction.

## Refresh presentation and export
- Keep locally sourced Oregon EIS logo, Inter font and restrained blue palette, compact cards and document-like preview.
- Add only optional, collapsed report details (agency, title, version, workshop date).
- Export genuine DOCX with cover identification, ten headings, consensus prose, true bullets, generation date and page numbers. No private notes, unfilled placeholders or fabricated strategy language.

## One-file delivery
- `index.html` is a complete standalone application, with inline CSS, scripts, DOCX dependency and data-URI images/fonts. The byte-identical ASPX is an alternative single-file entry point.
- No runtime asset folders, CDN, fetch, server, API, telemetry or hosting changes are required. Download HTML and double-click it, or upload that one file.
- Maintain readable source assets in the repository; a small maintainer packaging script inlines them into the checked-in deliverables. Users and hosting do not run a build step.
- Test a copy of the HTML in an otherwise empty directory with network disabled, including DOCX export.

## State and compatibility
- New path-scoped `ai-strategy-socratic-sandbox-v1-refresh` schema avoids overwriting either V1 or V2 storage.
- If no refresh workspace exists, safely copy valid V1 context, scratchpad and consensus into refresh state. Never modify the original V1 data. Do not convert V2 structured fields automatically.
- Reset writes an empty refresh workspace so an old V1 workspace is not silently reimported on reload. Corrupt or unsupported refresh data is not overwritten without explicit reset.

## Verification and delivery
Compare against v1.0, test all ten guide/chip/prompt interactions, capture/autosave/reset/migration, keyboard/timer/copy/focus, desktop/mobile/reduced motion and axe in Chrome/Edge. Verify export structure and Word rendering. Update README and PR to this narrower scope. Publish the tested refresh at the already authorized Pages URL, preserve main/v1.0 and provide the standalone HTML directly.

Implemented and checked: the V1 baseline smoke test, eight unit tests, all-ten-phase Chrome/Edge regressions, ten axe scans, twelve OOXML fixtures and isolated offline one-file exports pass. Word opens empty/partial/complete/long-text reports normally; all rendered pages were inspected. Source modules and license notices are embedded by `npm run package`. See QA.md for coverage and limits.
