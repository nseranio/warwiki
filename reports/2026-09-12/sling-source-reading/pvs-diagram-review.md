# PVS existing schematic review — 2026-09-12

Read-only review; no clinical sign-off and no source-paper full-read claim.

## Exact scope

Read complete `static/img/diagrams/pubovaginal-sling.svg`, complete `scripts/diagrams/pubovaginal-sling.js`, full single `pubovaginal-sling` record in `src/data/figures.json`, and complete ClinicalFigure TSX/CSS. Inspected actual headless Chromium renders: standalone 820×459 SVG; existing built page at desktop1440×1000 and mobile390×844; desktop enlarged-fit; mobile enlarged-fit and full-size. Full-size desktop image was generated but not separately visually inspected. The local built page still contains the older PVS prose, not the parent's concurrent MDX rewrite. Images saved under `/tmp/warwiki-pvs-diagram/`.

Source comparison was restricted to EAU Female LUTS2026 disease-management §4.2.4.c.2.b (autologous sling, online lines850–867) and Asfour DOI10.1007/s00192-021-04815-w online surgical-technique/placement/tension passage(lines77–103), with surrounding publicly returned abstract/ref/disclosure passages. Did not read complete EAU or Asfour article/video for this task. No AUA independent read this task.

## Concrete correction required

The main illustration does **not** depict its claimed traditional bladder-neck position. The drawn bladder–urethra junction is near(312,218), drawn meatus near(288,340), but the sling hammock crosses near y291—roughly60% down the drawn urethral length. The text says `hammock at bladder neck`, and the inset separately contrasts proximal PVS with midurethral MUS. These are internally inconsistent anatomical levels. Its `bladder neck` text is itself displaced along the urethra below the actual junction. This is plainly visible in the actual SVG and enlarged desktop screenshot, not just a coordinate inference.

The left sling arm overlaps the right edge/interior of the pubis ellipse. In the labelled sagittal schematic that visually suggests a transosseous course. A true retropubic path should be depicted behind the symphysis, with a projection/cross-section convention that does not suggest going through it. Drawing both bilateral arms in a single sagittal plane also needs an explicit projection convention, or a better plane. Exact safe trajectories are not supported by the sole EAU concept citation.

The inset additionally presents all PVS as bladder-neck versus all MUS as synthetic. It would need explicit wording limiting this to **traditional bladder-neck PVS** versus **synthetic MUS**, because modified autologous midurethral sling techniques exist (Asfour). Textual teaching of that distinction is preferable until a correct figure is available.

The generator comment still says cough compresses the urethra against the pubis, although provenance says the earlier compression-against-pubis oversimplification was removed. The visible arrow remains `cough→compress`. Do not treat this force vector as a source-validated biomechanical account. Asfour's relevant modified technique discussion stresses preventing downward displacement rather than elevation and avoiding excessive tension.

**Recommended disposition:** remove this figure from the PVS clinical page pending anatomical redraw/review; retain its provenance/history as a superseded illustration if desired. This is not a conclusion that all autologous sling schematics are unsuitable. Rectus/fascia autologous tissue, proximal-support concept, retropubic passage and fixation toward abdominal fascia are broadly appropriate concepts; the drawn geometry undermines this specific illustration.

## Display quality

Inline rendered widths: desktop723px(image404.703pxhigh), mobile316px(image176.875pxhigh). Most labels are too small at mobile inline size; existing Enlarge/full-size controls work and provide scrolling. More substantially, the enlarged modal toolbar and description panel are **transparent**, letting underlying article text visibly compete through them on both viewport sizes. Actual screenshots show this. CSS sets `.dialog {background:var(--ifm-background-color)}`; the computed variable/background should be checked and an opaque light/dark modal surface used. This is a shared component concern beyond the removed PVS figure. No UI edits made.

## Provenance limits

Current source record calls the figure an original schematic with clinical review pending, no named reviewer/date, and EAU evidence checking that explicitly does not validate exact suture trajectories. Those limits are honest but do not fix an internally misleading drawing. Existing SVG metadata and source record were read; no illustrator qualification or clinical approval inferred.

## Sources

- https://uroweb.org/guidelines/non-neurogenic-female-luts/chapter/disease-management
- https://link.springer.com/article/10.1007/s00192-021-04815-w

## Optional supplement task

No new Offiah2025 supplement access attempt made in this task. Previous parent-reported PMCbin HTML/403 and OA404 remain unresolved; nothing counted as read.
