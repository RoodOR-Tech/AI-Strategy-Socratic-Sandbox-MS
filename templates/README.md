# V2 Oregon strategy export template

`oregon-strategy.js` is the dedicated browser-compatible, declarative DOCX template. `assets/docx-export.js` maps the approved strategy model into its styles and document components. It is not an HTML export and does not rename another format.

Design authority confirmed by the user: [Oregon Attachment A](https://www.oregon.gov/eis/Documents/Attachment-A-AI-Adoption-Strategy-Template.docx), retrieved September 24, 2026. SHA-256: `8f385d39e1ddc6eadbb8159955ee0b427c30c4be4ba61a3fbe6eb56a5fb84e5a`.

Reference inspected in Microsoft Word 16.0: 12 pages, US Letter portrait, one-inch margins, Aptos/Aptos Display theme, blue `2F5496` headings, Heading 1 16pt and Heading 2 13pt, lists and page footer. V2 retains this structural and typographic anchor and all ten official components. Section 9 uses the requested ampersand spelling. It deliberately replaces the photographic instructional cover with a plain agency identification cover, omits template instructions/resources, and adds unnumbered Implementation Priorities. It does not modify or redistribute the reference file.

V2 uses a 28pt Word Title, 11pt body, 1.15 line spacing, 6pt paragraph spacing, real Word headings, true list numbering, page numbers, and keep-with-next headings. Blank fields are omitted; all ten headings remain for partial strategies. Empty headings do not chain into an unbreakable block. Blank metadata is omitted; title/version have documented defaults. Only the human-approved content model reaches this renderer. Footers include generation date and app version, not workshop notes. Font substitution depends on fonts installed on the reader's device.

No runtime template fetch, API, templating server, or build step. The pinned `docx` library writes the OOXML ZIP locally. To adjust output styling, edit this file and rerun DOCX structural and visual checks.
