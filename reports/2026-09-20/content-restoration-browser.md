# Content restoration browser checks — September 20, 2026

**All 10 representative checks passed** against the final local production build at `http://127.0.0.1:4173`, after the final Barbed Sutures wording correction. Chromium viewports: desktop 1440×1000 and mobile 390×844.

| Page | Desktop | Mobile | Content confirmed |
|---|---|---|---|
| Lone Star | Pass | Pass | Frame/stay tables, manufacturer setup steps, applications, video card, references |
| Bookwalter | Pass | Pass | Components, practical setup, reprocessing, references |
| Lighted Retractors | Pass | Pass | Configurations and model-specific LightMat UA2550 setup/warnings |
| Mouth Retractors | Pass | Pass | Named instrument options, practical harvest setup, references |
| Barbed Sutures | Pass | Pass | Product comparison table, technical/clinical sections, references |

Every route returned HTTP 200 with substantive article text and expected headings. No blanket removal notice was found. All local citation targets resolved, and an actual citation link was clicked successfully on each page/profile. Tables stayed within the document viewport; any wider table could scroll horizontally inside its own container. No document-level horizontal overflow, JavaScript exceptions, or console errors occurred.

Six focused screenshots were captured and **actually opened for visual inspection**. The pages have readable text, clean headings, usable table columns, and mobile layouts without clipped side edges. Lone Star's mobile video thumbnail loaded, and the video card and source citations are visible. This checks the card's rendering, not the full external video's playback or clinical content.

Screenshots remain outside the repository/deployment:

- `/tmp/warwiki-content-restoration-browser/lonestar-desktop-top.png`
- `/tmp/warwiki-content-restoration-browser/lonestar-mobile-setup.png`
- `/tmp/warwiki-content-restoration-browser/lonestar-mobile-video.png`
- `/tmp/warwiki-content-restoration-browser/lightmat-mobile-warning.png`
- `/tmp/warwiki-content-restoration-browser/barbed-desktop-table.png`
- `/tmp/warwiki-content-restoration-browser/mouth-mobile-options.png`

The JSON companion contains per-page metrics, citation counts, table measurements, errors, and screenshot hashes. This is a representative local browser check, not a new clinical review or a complete browser sweep of the entire site. No page content was changed during this check.
