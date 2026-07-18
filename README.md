# AI Strategy Socratic Sandbox

A static, single-file workshop app for guiding an agency AI adoption strategy session.
It runs entirely in the browser, makes **zero network calls**, and stores workshop notes
only in the browser's local storage on the user's device.

Two copies of the same app ship in this repo:

| File | Purpose |
|---|---|
| `index.html` | Canonical source. Use for Vercel or any static web host. |
| `ai-strategy-socratic-sandbox.aspx` | Byte-identical copy for SharePoint document libraries, which render `.aspx` in the browser but force `.html` files to download or open in a preview pane. |

**If you edit `index.html`, regenerate the copy:** `cp index.html ai-strategy-socratic-sandbox.aspx`

## Deploy to SharePoint

### SharePoint Server Subscription Edition (on-premises)

1. Upload `ai-strategy-socratic-sandbox.aspx` to any document library (e.g. Site Assets or Documents).
2. Users click the file and it opens as a full page in the browser. That's it — on-prem
   SharePoint renders library `.aspx` pages by default. Only client-side script is used;
   nothing runs on the server.

### SharePoint Online (Microsoft 365)

SharePoint Online blocks custom script on most sites by default (`DenyAddAndCustomizePages`).
With custom script blocked, an uploaded `.aspx` page will not execute its JavaScript and the
page shows its built-in "JavaScript required" notice instead of the app.

Options, in order of preference:

1. **Enable custom script on one dedicated site** (admin action), then upload the `.aspx`
   to a library on that site:
   `Set-SPOSite -Identity https://tenant.sharepoint.com/sites/workshops -DenyAddAndCustomizePages $false`
   Scope this to a single, controlled site — do not enable it tenant-wide.
2. **Host `index.html` on an approved static host** (Vercel, Azure Static Web Apps) and
   link to it from SharePoint, or surface it in a page with the Embed web part.
3. If neither is possible, users can still download the `.html` file and open it locally —
   the app is fully self-contained.

### Why it is safe for a SharePoint environment

- No external scripts, styles, fonts, images, or network requests of any kind — the page
  is one self-contained file, so there is nothing for a CSP or firewall to worry about.
- No server-side code (`<%` blocks or `runat="server"`) — SharePoint parses the `.aspx`
  as static markup and everything runs client-side.
- All dynamic text is HTML-escaped before rendering, and workshop notes never leave the
  browser. Local storage is keyed by page path, so copies in different libraries keep
  separate state.
- Clipboard and file download have graceful fallbacks with clear user messaging for
  locked-down browsers and embedded webviews; if local storage is unavailable, the app
  says so and keeps working for the session.

## Deploy on Vercel

1. In Vercel, choose **Add New Project**.
2. Import this GitHub repository.
3. Use the default static-site settings. No build command is required.

## Accessibility (WCAG 2.1 Level AA)

The app is built to WCAG 2.1 AA per `CLAUDE-accessibility-directive.md`:

- Semantic landmarks (`header`, `main`, `aside`, `footer`), a skip-to-content link, and a
  logical heading hierarchy.
- The phase switcher implements the ARIA APG **tabs** pattern: roving tabindex,
  Left/Right/Home/End arrow navigation, `aria-selected`, and a labelled tab panel.
  Captured/not-captured state is in each tab's accessible name, not conveyed by the
  green dot alone.
- Focus management: Previous/Next moves focus to the new phase heading and
  `document.title` updates on every phase change. The reset confirmation is a native
  `<dialog>` (focus trap, Escape, focus return for free).
- Live regions announce autosave status, capture progress, phase capture state, and all
  toast messages (copy/export/timer/reset). The countdown uses `role="timer"` and does
  **not** announce every second.
- Visible `:focus-visible` indicators on all interactive elements; text and UI contrast
  verified ≥ 4.5:1 / 3:1; no fixed text heights; reflows without horizontal scroll at
  320 px; non-essential motion disabled under `prefers-reduced-motion: reduce`.

**Verification:** axe-core (WCAG 2.1 A/AA + best-practice rules) run via Playwright against
the initial view, the open reset dialog, and a populated later phase — 0 violations — plus
a scripted keyboard-only pass (skip link, tablist arrows, dialog Escape/focus return, timer,
chips, focus mode). Automated tools catch only part of WCAG; a manual screen reader pass
(NVDA/JAWS) is still recommended before certifying compliance.

**Known limitation:** the export is a plain-text Markdown file, which carries its heading
structure as text. If a formally tagged accessible document (e.g. tagged PDF) is required
for distribution, convert the Markdown in Word or another tool that produces tagged output.
