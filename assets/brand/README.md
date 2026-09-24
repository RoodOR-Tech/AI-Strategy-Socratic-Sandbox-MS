# Oregon EIS visual reference

Retrieved 2026-09-24 from https://www.oregon.gov/eis/Pages/default.aspx.

- `eis-logo.png`: https://www.oregon.gov/eis/SiteAssets/eis-logo-color-white-text-20230116.png (EIS site webLogoUrl). Official agency identity, reused as requested; not a statement of software certification.
- EIS agency.css uses `#0F75AF`; used for primary controls. Text uses the site's `#222222`, with a dark blue header companion and restrained gray surfaces. Primary blue/white contrast is checked by axe.
- EIS theme-components.css explicitly assigns Inter to body/headings. Font files are Google Fonts Inter v20, weights 400/600/700, locally bundled; SIL Open Font License in `Inter-OFL.txt`. Helvetica/Arial fallbacks.
- No runtime Google Fonts, analytics, CDN or Oregon web requests. Assets load only from the application's own host.

Stylesheet references: `/eis/Style%20Library/css/agency.css` and `/eis/Style%20Library/CSS/theme-components.css`.
