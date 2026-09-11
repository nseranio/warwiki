# Diagram quality audit

September 11, 2026. **All 55 original SVG diagrams received a structural metadata scan; five received source-code, rendered-image and consuming-caption review.** This is not clinical sign-off for the full collection.

## Important corrections completed

### POP-Q measurement diagram

The stage ruler in `popq-points.svg` had positive values above the hymen and negative below, contradicting the caption and sign convention. Its stage III–IV description also incorrectly began at the hymen. These were corrected in the generator and regenerated SVG. Above the hymen is now negative; stage II spans −1 to +1 cm; the III–IV band begins beyond +1 cm. A footnote explains that stage 0 requires all normal points and the III/IV distinction depends on TVL − 2 cm.

The Aa/Ap key and article caption now distinguish the anatomical definitions: Aa is 3 cm proximal to the external urethral meatus, whereas Ap is 3 cm proximal to the hymen. The diagram no longer suggests these measurements remain fixed at −3 during prolapse. The caption specifies maximal straining and TVL with prolapse reduced. Source: [ICS/IUGA terminology in ICS Standards 2020–2021](https://www.ics.org/Publications/ICS%20Standards%202020-2021.pdf), female POP terminology, printed pp. 144–146; the article already cites the original [Bump et al. standardization](https://pubmed.ncbi.nlm.nih.gov/8694033/).

### Pressure-flow nomogram

The image and consuming page classified BOOI 40 as obstructed (`≥40`). They now use **>40 obstructed, 20–40 equivocal, <20 unobstructed** and explicitly identify the male population. The word “Equivocal” had also been drawn inside the obstructed region; its label position is now inside the correct band. Example dots are identified as hypothetical, not research observations. The article's incorrect “Schäfer BOOI” wording was separated into ICS BOOI and the distinct Schäfer nomogram.

Both the article and illustration point to [ICS adult male terminology, section 5.12](https://doi.org/10.1002/nau.23897), also reproduced in [ICS Standards 2020–2021](https://www.ics.org/Publications/ICS%20Standards%202020-2021.pdf). Low-pressure/low-flow patterns do not establish detrusor underactivity without the rest of the study; the caption no longer implies the nomogram alone diagnoses it.

Both corrected diagrams were regenerated from source and visually checked at twice their native resolution. An XML geometry check also confirmed the POP-Q ruler sign order and that the Equivocal label sits inside the 20–40 BOOI band. They have embedded source links, an explanatory `<title>`/`<desc>`, and an explicit “clinician sign-off: pending” metadata entry. No claim is made that an identified clinician approved them.

## The five-image sample

| Diagram | What works | Remaining issue / next improvement |
|---|---|---|
| POP-Q | Clear orientation and measurement labels; corrected sign ruler and stage limits | This is an orientation schematic, not an exact anatomical drawing or full staging calculator. Split the measurement schematic from the full stage-definition table on narrow screens. |
| Male pressure-flow nomogram | Actual quantitative axes, correct line slopes, clearly labeled zones and units | Add a small accessible worked-example table with Qmax, Pdet and calculated BOOI. Keep the female-exclusion label prominent when exported. |
| Sling trajectories | Useful overview of retropubic, transobturator and single-incision route families | “Least pain” is an unsupported universal rank in the legend, caption and SVG aria-label. Device designs and comparative endpoints differ. Replace with evidence-qualified, device-specific wording after reviewing the relevant trial/IFU. The lower urethral label crowds the suburethral-sling label. |
| Urethral cross-section | Normal versus fibrotic lumen is understandable, and hatching supports the color distinction | The lower central labels crowd each other. Its bottom note lets spongiofibrosis depth sound like a stand-alone treatment rule; treatment choice also needs location, length, etiology and prior procedures. Label it an anterior-urethral conceptual section, not a surgical selection algorithm. |
| BMG placement | Dorsal/ventral orientation and named approaches are explicit | The closed circular schematic leaves an apparent gap between the dorsal graft and its tunical bed; a surgeon-reviewed operative cross-section should show actual bed apposition. The “66% versus 34% preferred” claim in the aria-label/caption has no direct figure source and should not become a recommendation. Some anatomy labels are very small and pale. |

These are editorial/design findings rather than claims that every depicted surgical detail was validated. The FDA describes different sling routes and reports comparable mini-sling performance in its reviewed evidence, which does not by itself establish a universal “least pain” rank. Use the applicable trial and manufacturer instructions for a device-specific figure. [FDA SUI overview](https://www.fda.gov/medical-devices/urogynecologic-surgical-mesh-implants/stress-urinary-incontinence-sui)

## Findings across all 55 SVGs

At the start of this review:

- **55/55** had `role="img"` and an `aria-label` on the SVG root.
- **0/55** contained an SVG `<title>` or `<desc>` element.
- **0/55** embedded a DOI, PubMed or ICS source link.
- **0/55** contained explicit review metadata.

After the clinical corrections and the technical repair below, **11/55** have title/description; **2/55** have embedded source and source-check metadata. The remaining 53 still need figure-level source metadata, and 44 need title/description. This scan does not imply the surrounding articles have no references: those are separate from figure-level provenance.

The five sampled articles do provide Markdown image alt text and an adjacent caption. That matters because an SVG rendered through an HTML `<img>` relies on the outer alt text; its internal accessibility labels should not be assumed to supply the page's complete accessible description.

The smallest sampled type ranges from 8.5 to 11 SVG units across figures 760–900 units wide. If scaled to a 340-pixel content area, some labels become approximately 3–5 pixels high. This is a predictable fit-to-width issue, not a measured screen-reader failure. A tap-to-enlarge control, a text equivalent, and mobile-specific panel stacking are more useful than simply increasing SVG resolution.

## Recommended figure standard

Use one reusable figure component and registry containing: figure ID, title, intended teaching point, population/anatomical view, source DOI/URL, source version, author/illustrator, license, source-check date, named clinical reviewer and sign-off date, and an explicit not-to-scale marker where appropriate. A source check and clinician approval are different states.

For quantitative charts, keep the classification formulas and labels in shared data and test boundary examples against the cited standard. For operative diagrams, require the reviewer to check orientation, actual tissue planes, graft apposition, high-risk neighboring structures and which steps are intentionally omitted. Add concise text equivalents and a downloadable high-resolution figure whose source travels with it.

Prioritize the remaining diagrams by clinical consequence: anastomotic orientation, sling passage, POP-Q staging and pressure-flow interpretation before decorative illustrations. The corrected sign/threshold problems show why consistent styling is not evidence of clinical reliability. Preserve the vector workflow; redraw only after the intended anatomy and source are agreed.


## Nine additional SVG build warnings repaired

The production build reported unsupported image types for `peyronie-correction`, `studer-neobladder`, `burch`, `vvf-layered-closure`, `pfui-webster-steps`, `pubovaginal-sling`, `sphincteroplasty`, `indiana-pouch`, and `aus-components`. These were valid SVGs, but their root tags exceeded 1,000 bytes because their aria-label attributes contained long teaching narratives. The installed `image-size` detector checks only the first 1,000 bytes when recognizing SVG, so it could not find the end of those opening tags.

The generators and SVGs now use short root aria-labels and preserve each full original narrative in an associated `<desc>`, with a concise `<title>`. All 55 SVGs now pass the installed dimension detector. Headless Chromium loaded all nine repaired images with the expected nonzero intrinsic dimensions. XML comparisons verified that every visible shape/text element was unchanged and every original narrative was preserved. This was a format/accessibility repair, **not an anatomical review of those nine procedures**.
