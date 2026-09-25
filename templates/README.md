# Oregon strategy report template

`oregon-strategy.js` is the dedicated browser-compatible, declarative DOCX template. `assets/docx-export.js` maps group consensus into its styles and document components. It is not an HTML export and does not rename another format.

Design authority confirmed by the user: [Oregon Attachment A](https://www.oregon.gov/eis/Documents/Attachment-A-AI-Adoption-Strategy-Template.docx), retrieved September 24, 2026. SHA-256: `8f385d39e1ddc6eadbb8159955ee0b427c30c4be4ba61a3fbe6eb56a5fb84e5a`.

Reference inspected in Microsoft Word 16.0: 12 pages, US Letter portrait, one-inch margins, Aptos/Aptos Display theme, blue `2F5496` headings, Heading 1 16pt and Heading 2 13pt, lists and page footer. The refresh retains this structural and typographic anchor and all ten official components. Section 9 uses the requested ampersand spelling. A plain agency identification cover replaces the photographic instructional cover. Template instructions/resources are omitted. There is no added synthesis or roadmap section. The reference file is not modified or redistributed.

The report uses a 28pt Word Title, 11pt body, 1.15 line spacing, 6pt paragraph spacing, real Word headings, true list numbering, page numbers, and keep-with-next headings. Blank fields are omitted; all ten headings remain for partial strategies. Empty headings do not chain into an unbreakable block. Blank metadata is omitted; title/version have defaults. Only consensus and report metadata reach the renderer, without an extra approval checkbox. Footers include generation date and app version, not private workshop notes. Font substitution depends on fonts installed on the reader's device.

No runtime template fetch, API or templating server. The pinned `docx` library writes the OOXML ZIP locally. The template and library are embedded in each standalone entry point. After source edits, run `npm run package`, then DOCX structural and visual checks. Users and hosting do not run a build step.
