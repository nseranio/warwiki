# WARWIKI — Claude Session Reference

This file is for Claude to read at the start of every session. It captures the project architecture, conventions, and component patterns. Session history is in `CHANGELOG.md`; the stub backlog is in `docs/_STATUS.md`.

---

## Current handoff snapshot — May 3, 2026 (sidebar visual hierarchy + atlas cohort split + decision-framework rename + new Laboratory Studies subsection)

This was a structural / navigation polish session followed by a content-build pass for laboratory studies. Branch: `claude/unruffled-jepsen-ee3f4f`; pushes via `git push origin HEAD:main`. Session rule continues: **commit and push after every change.**

### Sidebar visual hierarchy restored ([`48be23c`](https://github.com/nseranio/warwiki/commit/48be23c))

The May 2 cleanup over-flattened sidebar styling — top-level section titles (Treatment Atlas children, Foundations subsections) lost their prominence and looked the same as plain doc links. Restored the deliberate hierarchy in `src/css/custom.css`:

- **Level-1 / level-2 categories** (collapsible OR plain top-level links) → **uppercase, weight 600, 0.78rem, subtle color** (the original visual hierarchy)
- **Level-2+ doc links** → normal-case, weight 400, 0.875rem, muted color
- Selector pattern: `.menu__list-item-collapsible .menu__link, .theme-doc-sidebar-item-link-level-1 > .menu__link` so plain top-level atlas sections (04i Tissue Transfer, 04k GAS, 04l Cosmetic — single-doc sections) render identically to their collapsible-category siblings.

**Editorial rule reaffirmed:** items at the same level look the same, items at different levels look different. Earlier "flatten everything to plain link" approach was the wrong fix.

### Treatment-atlas cohort split — every tabbed section now has per-cohort sub-pages ([`7499656`](https://github.com/nseranio/warwiki/commit/7499656), [`5ad0ef1`](https://github.com/nseranio/warwiki/commit/5ad0ef1))

Per user request for cleaner mobile UX, the seven multi-cohort treatment-atlas sections that previously rendered their MDF + Database as two stacked `<Tabs>` blocks on a single landing page were split into per-cohort sub-pages. The 04f Incontinence pattern (Female SUI / Male SUI / OAB & UUI) is now applied uniformly:

| Section | Sub-pages created |
|---|---|
| 04a Urethral Reconstruction | `male-urethroplasty`, `female-urethroplasty` |
| 04ab Bladder Neck Reconstruction | `bnc`, `vuas` |
| 04e Genital Reconstruction | `penile`, `scrotal`, `vulvar` (existing technique-deep articles preserved) |
| 04h Fistula Repair | `female-fistula`, `male-fistula` |
| 04j Sexual Dysfunction | `erectile-dysfunction`, `peyronies` |
| 04k GAS | `masculinizing-surgery`, `feminizing-surgery`, `non-binary-nullification` |
| 04l Cosmetic Genital Surgery | `male-cosmetic`, `female-cosmetic` (society-position admonition preserved on each) |

17 new cohort sub-pages; 7 landings rewritten as choosers. Each sub-page has a self-contained renumbered bibliography with refs cited in the body of that cohort. The 04l society-position admonition (SMSNA 2024 / ACOG 2020 / FIGO 2025 / FDA 2018) is repeated on the landing AND each sub-page per the editorial framing rule.

The 04e cohort sub-pages are named `penile.mdx`, `scrotal.mdx`, `vulvar.mdx` (slugs `/penile`, `/scrotal`, `/vulvar`). The existing `scrotal-reconstruction.mdx` technique deep-dive is preserved; the cohort `scrotal.mdx` cross-links to it at the top.

**Pattern guidance:** cohort sub-pages render at level-2 in the sidebar (no `sidebar_class_name`); existing principles articles remain hidden (`sidebar_class_name: sidebar-hidden-item`) but linked from the chooser landing. Each section's `_category_.json` keeps `link: { type: doc, id: ...index }` so the section title stays clickable to the chooser.

### Atlas sidebar consistency — carets show only where they expand ([`93fc337`](https://github.com/nseranio/warwiki/commit/93fc337))

After the cohort split, the broad May 2 caret-hide rule (`href^="/docs/surgical-techniques/04"`) was wrong: it hid carets on sections that NOW have visible cohort sub-pages, AND missed sections with custom slugs (Urethral, Incontinence which use `/urethral-reconstruction` and `/incontinence` without the `04` prefix) producing visible-but-non-functional carets. Replaced with explicit URL list for the four "landing-IS-database" sections:

```css
.menu__list-item-collapsible:has(.menu__link[href="/docs/surgical-techniques/04b-bladder-reconstruction"]) .menu__caret,
.menu__list-item-collapsible:has(.menu__link[href="/docs/surgical-techniques/04c-urinary-diversion"]) .menu__caret,
.menu__list-item-collapsible:has(.menu__link[href="/docs/surgical-techniques/04d-upper-tract-reconstruction"]) .menu__caret,
.menu__list-item-collapsible:has(.menu__link[href="/docs/surgical-techniques/04g-prolapse-repair"]) .menu__caret,
```

Bonus: unhid the three 04f Incontinence subcategories (Female SUI / Male SUI / OAB & UUI) so its caret expands to show the cohort sub-pages — they were inheriting a `sidebar-hidden-category` className that no longer made sense after the broader pattern shift.

**Final atlas-sidebar state:**
- 8 sections show working carets that expand to cohort sub-pages: Urethral, Incontinence, BNC, Fistula, Genital Recon, Male Sexual Dysfunction, GAS, Cosmetic
- 4 "landing-is-database" sections hide their empty carets: Bladder Aug & Catheterizable Channels, Urinary Diversion, Upper Tract, Prolapse Repair
- 1 single-doc entry renders as a plain link: Tissue Transfer

### Decision Framework rename ([`dc0138f`](https://github.com/nseranio/warwiki/commit/dc0138f))

Two consistency cleanups applied across 38 files in the Treatment Atlas:

1. **"Master Decision Framework" → "Decision Framework"** everywhere (heading, body prose, section-stack descriptions). The "Master" prefix was redundant.
2. **Stripped "Step N — " prefix from H3 framework headings.** The previous numbering implied a strict sequential workflow that didn't match the content — many of the "steps" are parallel considerations or decision branches rather than ordered procedural steps. Headings now use just the descriptive title; the markdown structure carries the hierarchy without overpromising sequence.

**Editorial rule:** when a framework is genuinely sequential (e.g., 04l cosmetic male framework — psychological screening before objective measurement before procedure selection), order is preserved by placement and prose. When parallel (most decision frameworks have 5–8 considerations that cluster rather than sequence), drop the "Step N" prefix entirely.

### Anatomy & Physiology landing fix ([`45f3d40`](https://github.com/nseranio/warwiki/commit/45f3d40))

The A&P category was the only Foundations sub-section using `link: { type: "generated-index" }` while every sibling (Pharmacology, Tools, Surgical Principles, Perioperative Care) uses `link: { type: "doc" }`. The generated-index variant produced the duplicate breadcrumb ("Anatomy & Physiology > Anatomy & Physiology") and routed the category-title click to a Docusaurus auto-generated page instead of the real `index.mdx`. Switched to `type: doc` pointing at the real index — clean single-segment breadcrumb.

### New Evaluation subsection — Laboratory Studies ([`c2031fa`](https://github.com/nseranio/warwiki/commit/c2031fa), [`934addb`](https://github.com/nseranio/warwiki/commit/934addb), [`5289137`](https://github.com/nseranio/warwiki/commit/5289137))

Added a new **Laboratory Studies** subsection at `docs/02-evaluation/laboratory-studies/` between History & Physical (position 1) and Imaging (position 3). Four pages, all framed for the reconstructive urologist / urogynecologist:

| Page | Sidebar | Refs | Anchors |
|---|---|---|---|
| **Urine Studies** | 1 | 39 | IDSA/ASM 2024 microbiology guideline · AUA/SUFU 2025 microhematuria · 2019 IDSA ASB · AUA Best Practice prophylaxis · Magistro 2021 / Qu 2020 diversion-colonization · Meares-Stamey 4-glass / 2-glass · Chen 2016 post-cystectomy cytology (sens 82% / spec 97% / NPV 98%) · Fernández 2012 FISH NPV-oriented utility · Ferraro 2025 24-hour-urine 4.8% utilization gap · Lui 2022 PHPT screening |
| **Renal Function & Metabolic Surveillance** | 2 | 27 | KDIGO 2024 · AUA/SUFU NLUTD 2021 · NCCN Bladder 2026 · Nishikawa 2014 169-pt 106-mo (HTN + pyelonephritis as predictors, not diversion type) · Cheng 2015 augmentation 10-yr · jejunal conduit syndrome (Golimbu 1975, Bonnheim 1984, Klein 1986) · Kim 2016 acidosis risk factors (DM OR 5.68) · Sagalowsky 2002 cobalamin profiles (MMA / homocysteine) · Pfitzenmaier 2003 Mainz I (37% on alkali) · McDougal 1989 sulfate Ca/Mg · Richard 2019 fracture HR 1.48 · Kawakita 1996 pyridinium · ammoniagenic encephalopathy |
| **Hormonal Assessment** | 3 | 17 | AUA Testosterone Deficiency 2018 · AUA/SUO Prostate Screening 2023 · NCCN Prostate Early Detection · TRAVERSE 2023 · Marks 2006 5-ARI VA data · Sarkar 2019 5-ARI outcomes · Hall 2025 BJU SR PSA in gender-diverse · Nik-Ahd 2023 trans women aggressive disease |
| **Preoperative Labs** | 4 | 18 | Feely AAFP de-implementation · Heidelbaugh TRT · NCCN Bladder · Lightner AUA antimicrobial BPS · ASA preanesthesia · ADA 2026 (HbA1c &lt;8%) · AHA/ACC 2024 perioperative (Class 2a) · Endocrine Society 2022 hyperglycemia · SGLT2 3–4 day preop hold · Samsel 2025 urogyn 634-pt (no labs changed mgmt) · ACOG PB 214 |

The four pages cluster the labs by clinical context rather than alphabetically:
- **Urine Studies** — workhorse: urinalysis / culture / cytology / Meares-Stamey / 24-hour urine / EQUC / NGS, with reconstruction-specific interpretation in diversions / augmented bladders / CIC
- **Renal Function & Metabolic Surveillance** — the highest-yield reconstruction-specific cluster: Cr/eGFR per KDIGO 2024, BMP for the three post-diversion derangements, B12 (MMA / homocysteine reframing), bone-density panel
- **Hormonal Assessment** — testosterone + reflexes, hematocrit on TRT, PSA with the 5-ARI doubling rule + GAH-estrogen suppression to 0.02 ng/mL caveats
- **Preoperative Labs** — what to order vs. skip, anchored on the AAFP/ACP de-implementation literature

**Editorial decisions:**
- Skipped dedicated pages for: LFTs (post-cystectomy oncologic surveillance, out of WARWIKI scope), urine cytology / tumor markers (already covered in Urine Studies), CBC / coagulation / glucose (folded into Preoperative Labs), semen analysis (lives separately under male-fertility eval if/when built).
- The PSA-on-GAH-estrogen and PSA-on-5-ARI interpretation caveats are the WARWIKI value-add for Hormonal Assessment — these are what general endocrinology/urology references don't cover and what reconstructive practice actually needs.
- The Samsel 2025 Int Urogynecol J 634-pt urogyn-surgery study is the single strongest evidence anchor for the "skip routine preop labs" framing — pelvic-floor literature gives more direct support than the older AAFP/ACP general-medicine guidance.

### Editorial conventions reaffirmed this session

- **Custom-slug atlas sections.** Two atlas sections use custom slugs that don't carry the `04*` prefix in the URL — Urethral Reconstruction (`/surgical-techniques/urethral-reconstruction`) and Incontinence (`/surgical-techniques/incontinence`). Any CSS rule keyed on `[href^="/docs/surgical-techniques/04"]` will miss them. Use explicit URL lists or `[href^="/docs/surgical-techniques/"]` with finer-grained `:not()` filtering.
- **Cohort-split atlas pattern (locked).** Multi-cohort sections render as: chooser landing (`hide_title: true`, intro + section-stack to principles + section-stack to cohorts) → visible cohort sub-pages at level-2 → existing technique articles either hidden (`sidebar_class_name: sidebar-hidden-item`) or visible at level-3, depending on whether they're operative deep-dives or section overviews.
- **Heading hierarchy convention.** "Decision Framework" (no "Master"), with descriptive H3 headings (no "Step N — " prefix). When sequence genuinely matters, an ordered list inside the section conveys it; the heading itself doesn't try to.
- **Lab-studies clustering rule.** Cluster labs by clinical use-case (urine / renal+metabolic / hormonal / preop), not alphabetically, not by chemistry-class. The clustering should match how the labs are actually ordered in practice — testosterone + LH + prolactin go together because they're a panel, not because they share a chemistry pathway.
- **Reconstruction-specific value-add rule.** Each lab page should foreground the interpretation caveats that *general medicine references don't cover but reconstructive practice actually needs* — bowel reabsorption of creatinine in conduits, jejunal conduit hyperkalemia, PSA suppression on 5-ARI / GAH estrogen, post-cystectomy cytology NPV, the "skip routine preop labs in healthy ASA 1-2 patients" Samsel data. Cut general-medicine depth that lives in nephrology / endocrinology / pathology textbooks.

---

## Current Codex addendum — April 30, 2026 (BPH / Male LUTS atlas section + prostate enucleation hub)

This Codex pass started a new **Treatment Atlas → BPH & Male LUTS** section and then expanded the HoLEP row into a broader prostate-enucleation detail page. These changes are currently local unless separately committed by the active agent.

### BPH & Male LUTS atlas landing

- Added [BPH & Male LUTS](docs/04-surgical-techniques/04m-bph-male-luts/index.mdx) as a new treatment-atlas section at `/docs/surgical-techniques/bph-male-luts`.
- Placement rationale: BPH / male LUTS is common enough to be a primary atlas domain. It is ordered immediately after Incontinence via `_category_.json` position `2.5`, matching the atlas landing placement.
- Scope: treatment-selection hub rather than duplicate disease page. It cross-links to the existing [Benign Prostatic Hyperplasia](docs/03-clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction.mdx) condition page and pharmacology hubs for alpha blockers, 5-ARIs, PDE5 inhibitors, anticholinergics, and beta3 agonists.
- Decision framework: symptom phenotype, core evaluation, early-procedure triggers, escalation by bother/risk/anatomy, and procedure trade-off selection.
- Searchable database rows now include TURP, TUIP, HoLEP, thulium / bipolar enucleation, GreenLight PVP, Aquablation, simple prostatectomy, UroLift / PUL, Rezum, iTIND, Optilume BPH, PAE, and catheter pathways.
- Added BPH to the parent [Treatment Atlas](docs/04-surgical-techniques/index.mdx) landing and added a backlink from the clinical BPH page.

### Prostate Enucleation / HoLEP detail page

- Added [Prostate Enucleation / HoLEP](docs/04-surgical-techniques/04m-bph-male-luts/prostate-enucleation-holep.mdx) as a hidden atlas detail page at `/docs/surgical-techniques/bph-male-luts/prostate-enucleation-holep`.
- Placement rationale: use **general anatomic endoscopic enucleation** as the concept, with HoLEP as the reference platform, so thulium laser, thulium fiber, bipolar TUEP, and future platform variants do not become duplicate pages.
- Scope: where enucleation fits in the BPH treatment ladder; equipment and Ho:YAG physics; low- vs high-power settings; pulse modulation (MOSES, Virtual Basket / Magneto); classic three-lobe, two-lobe, en-bloc, early-apical-release, top-down, and mucosal-preservation techniques; morcellation safety; outcomes vs TURP and simple prostatectomy; anticoagulation; complications; sexual function; incidental prostate cancer; learning curve; operative pearls.
- The HoLEP and thulium / bipolar enucleation rows in the BPH database both link to this page.
- Evidence anchors include AUA 2023 amendment, EAU 2026 male LUTS guideline, Gilling / Tan technique papers, low-power vs high-power HoLEP evidence, ESUT laser and AEEP consensus papers, morcellation recommendations, long-term HoLEP series, HoLEP-vs-TURP and HoLEP-vs-RASP comparisons, anticoagulation studies, continence predictors, sexual-function studies, incidental-prostate-cancer series, and learning-curve papers.

### Verification status from this pass

- `npm run lint:links` passed after the BPH / HoLEP changes.
- `git diff --check` passed.
- `npm run lint:citations` remains blocked by unrelated pre-existing citation issues in:
  - `docs/02-evaluation/laboratory-studies/hormonal-assessment.mdx`
  - `docs/02-evaluation/laboratory-studies/preoperative-labs.mdx`
  - `docs/02-evaluation/laboratory-studies/renal-function-metabolic-surveillance.mdx`
  - `docs/04-surgical-techniques/04l-cosmetic-genital-surgery/female-cosmetic.mdx`
- The new BPH / enucleation files are not among the citation-lint failures.

---

## Current Codex addendum — April 30, 2026 (PNE placement + priapism operative taxonomy)

This Codex pass added one SNM trial-technique page and reorganized detailed priapism shunt content so emergency algorithms stay fast while operative technique detail lives in the Treatment Atlas. Session rule remains: **commit and push after every change.** Latest commits from this pass:

- `7b401fa` — **Add percutaneous nerve evaluation technique page**
- `bb42b8c` — **Expand penoscrotal decompression priapism guidance**
- `86ae892` — **Add priapism shunts atlas page**

### Percutaneous nerve evaluation placement (commit `7b401fa`)

- Added [Percutaneous Nerve Evaluation](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-nerve-evaluation.mdx) as a hidden **Treatment Atlas → Incontinence → Procedures** detail page.
- Placement rationale: PNE is the **screening / trial technique for sacral neuromodulation**, not a standalone definitive treatment. It therefore sits beside [Sacral Neuromodulation](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx) rather than as its own atlas treatment row.
- Scope: indications for OAB/UUI, urgency-frequency, non-obstructive retention, and fecal incontinence; pre-procedure setup; fluoroscopic S3 landmarking; cranial-medial target; step-by-step temporary wire placement; correct S3 motor/sensory responses; programming and diary endpoint; PNE vs staged tined-lead trial; predictors; complications; and practical pearls.
- Cross-links added from the SNM test-phase table, the [OAB/UUI database](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx), and the neuromodulation pointer page.

### Priapism / penoscrotal decompression update (commit `bb42b8c`)

- Expanded [Priapism](docs/05-special-populations/05a-trauma-emergencies/priapism.mdx) with a dedicated **Step 5b — Penoscrotal decompression (PSD)** section.
- Scope: PSD as glans-sparing proximal decompression for prolonged ischemic priapism; when to consider PSD; original penoscrotal vs modified proximal-shaft approaches; Foley / urethral-protection and ventrolateral corporotomy pearls; default bilateral decompression; compressive dressing; and PSD's place between distal tunneling and acute penile prosthesis.
- Added prolonged-priapism evidence table for Fuchs 2018, Baumgarten 2020, Basile 2025, and VanDyke 2023, plus EAU systematic-review and post-shunting review context.

### Priapism shunts atlas page (commit `86ae892`)

- Added [Priapism Shunts & Decompression](docs/04-surgical-techniques/04j-sexual-dysfunction/priapism-shunts-decompression.mdx) under **Treatment Atlas → Male Sexual Dysfunction** as a hidden atlas detail page, visibly linked from the Male Sexual Dysfunction landing.
- Placement rationale: the Special Populations / Trauma [Priapism](docs/05-special-populations/05a-trauma-emergencies/priapism.mdx) page remains the fast emergency algorithm; detailed operative taxonomy belongs in the Treatment Atlas.
- Scope: distal corporoglanular shunts (Winter, Ebbehoj, T-shunt, Al-Ghorab), Burnett snake maneuver, PSD, proximal / historical shunts (Quackels, Grayhack, Barry), early prosthesis transition logic, and a searchable procedure database.
- The Priapism emergency page now links to the atlas shunt page from the surgical-shunting section and See Also list.

### Verification status from this pass

- `npm run lint:links`, `npm run typecheck`, `npm run build`, and `git diff --check` passed after the relevant changes.
- Local citation integrity checks passed:
  - PNE page: 21 refs, all cited.
  - Priapism emergency page after PSD update: 23 refs, all cited.
  - Priapism Shunts & Decompression page: 17 refs, all cited.
- Full `npm run lint:citations` remains blocked by unrelated pre-existing citation issues:
  - `docs/02-evaluation/laboratory-studies/hormonal-assessment.mdx`
  - `docs/02-evaluation/laboratory-studies/preoperative-labs.mdx`
  - `docs/02-evaluation/laboratory-studies/renal-function-metabolic-surveillance.mdx`
  - `docs/04-surgical-techniques/04l-cosmetic-genital-surgery/female-cosmetic.mdx`
- `src/data/stats.json` was regenerated by `npm run build` and included in the relevant commits.

---

## Current Codex addendum — April 30, 2026 (Special Populations / Prolapse / Female urethral-mass placement pass)

This Codex pass added three new scaffold / overview pages and pushed each change to `origin/main`. Session rule remains: **commit and push after every change.** Latest commits from this pass:

- `2940b6a` — **Add cancer survivorship special population scaffold**
- `d511257` — **Add augmented prolapse repair mesh guide**
- `88a915a` — **Add female urethral masses overview**

### Cancer survivorship scaffold (commit `2940b6a`)

- Added [Cancer Survivorship](docs/05-special-populations/05d-cancer-survivorship/index.mdx) under **Special Populations** with `_category_.json` position `3`, between Gender-Affirming Surgery and Women's Health.
- Purpose: a jumping-off scaffold for future prostate, bladder, testicular, penile, gynecologic, rectal / anal, and pelvic-exenteration survivorship expansion.
- Scope: reconstructive-urology / urogynecology overlay rather than oncology treatment page. Covers burden of dysfunction after prostatectomy / radiotherapy / gynecologic cancer surgery, urethral stricture / VUAS / devastated outlet, radiation cystitis, urinary diversion, secondary malignancy in reconstructed tracts, pelvic-floor survivorship, exenteration reconstruction, sexual health, chronic pelvic pain, and survivorship-care model.
- Added cross-links to Radiation & Tissue Effects, Urethral Reconstruction, Bladder Neck Reconstruction, Urinary Diversion, Fistula Repair, Incontinence, Genital Reconstruction, and GSM.
- Updated [Special Populations index](docs/05-special-populations/index.mdx) to include the new section.

### Mesh / graft-augmented prolapse repair page (commit `d511257`)

- Added [Mesh & Graft-Augmented Prolapse Repair](docs/04-surgical-techniques/04g-prolapse-repair/mesh-graft-augmented-repairs.mdx) under **04g Prolapse Repair**.
- Placement rationale: belongs in the Treatment Atlas prolapse section, beside Principles of Prolapse Repair, because it is an operative decision / counseling page for augmented vaginal POP repairs rather than a general pelvic-support condition page.
- Scope: material types, efficacy by compartment, PROSPECT / FDA 522 / PROSPERE / Menefee RCT anchors, mesh exposure / pain / de novo SUI / bladder injury / repeat surgery, FDA regulatory timeline, ACOG / AUGS positioning, mesh-complication management, sacrocolpopexy-vs-TVM counseling, long-term outcomes, and future biomimetic graft directions.
- Updated [Prolapse Repair landing](docs/04-surgical-techniques/04g-prolapse-repair/index.mdx) with a visible General Principles link and added the page slug to the "Transvaginal Mesh (Apical-Only Kits)" database row.
- Editorial split: the new page explicitly distinguishes transvaginal POP mesh from midurethral slings and abdominal mesh used in sacrocolpopexy.

### Female urethral / periurethral masses overview (commit `88a915a`)

- Added [Female Urethral & Periurethral Masses](docs/03-clinical-conditions/03b-voiding-outlet/female-urethral-masses.mdx) under **Clinical Conditions → Voiding & Outlet Disorders**, at `sidebar_position: 5.8`, next to Urethral Diverticulum and Urethral Prolapse.
- Placement rationale: this is primarily a diagnostic differential / clinical-condition overview, not a technique page. The existing [Urethral Diverticulum](docs/03-clinical-conditions/03b-voiding-outlet/urethral-diverticula.mdx) remains the deeper surgical-condition page.
- Scope: urethral diverticulum, Skene gland cyst / abscess, urethral caruncle, urethral mucosal prolapse, Gartner / Müllerian / inclusion cysts, urethral leiomyoma, condyloma, primary female urethral carcinoma, and diverticular carcinoma.
- Added workup framework: anatomy-first exam, MRI as preferred modality for complex periurethral masses / diverticulectomy planning, ultrasound alternative, cystourethroscopy, biopsy thresholds, red flags, and mandatory pathology for excised diverticula.
- Cross-linked from [Urethral Diverticulum](docs/03-clinical-conditions/03b-voiding-outlet/urethral-diverticula.mdx), [Vaginal Cysts & Masses](docs/03-clinical-conditions/03g-genital-scrotal/vaginal-cysts-masses.mdx), and [Clinical Conditions index](docs/03-clinical-conditions/index.mdx).

### Verification status from this pass

- For each new page, local citation integrity was checked separately and passed:
  - Cancer Survivorship: 37 refs, all cited.
  - Mesh & Graft-Augmented Prolapse Repair: 22 refs, all cited.
  - Female Urethral & Periurethral Masses: 40 refs, all cited.
- `npm run build`, `npm run typecheck`, `npm run lint:links`, and `git diff --check` passed after each relevant change.
- Full `npm run lint` / `npm run lint:citations` remains blocked by unrelated pre-existing citation issues introduced before this pass:
  - `docs/02-evaluation/laboratory-studies/hormonal-assessment.mdx`
  - `docs/02-evaluation/laboratory-studies/preoperative-labs.mdx`
  - `docs/02-evaluation/laboratory-studies/renal-function-metabolic-surveillance.mdx`
  - `docs/04-surgical-techniques/04l-cosmetic-genital-surgery/female-cosmetic.mdx`
- `npm run lint:orphans` also remains blocked by unrelated hidden Treatment Atlas pages from the upstream fast-forward.
- `src/data/stats.json` was regenerated by `npm run build` and included in the relevant commits.

---

## Current handoff snapshot — May 2, 2026 (Treatment Atlas sidebar cleanup — uniform "landing IS the database" pattern, prevalence-ordered, site-wide font consistency)

This session was a sidebar / styling cleanup pass plus a clinical-prevalence reordering of the Treatment Atlas. No new article content. Branch: `claude/competent-herschel-c1c94b`; pushes `git push origin HEAD:main`. Session rule continues: **commit and push after every change.**

### Treatment Atlas sidebar — uniform "landing IS the database" pattern (commit `9ab85a1`)

**Problem.** The atlas sidebar showed visible inconsistencies. Older sections (04a, 04ab, 04b, 04c, 04d, 04e, 04f, 04g, 04h, 04j) had 3–10 visible child entries that expanded under the section title; newer single-doc sections (04i Tissue Transfer, 04k Gender-Affirming Surgery, 04l Cosmetic Genital Surgery) had zero children and appeared as flat clickable items; the top-level orphan `drug-coated-balloon.mdx` rendered as a sibling to the section folders instead of nested under any section.

**Fix.** Apply the existing WARWIKI "landing IS the database" pattern to **every** atlas section. Each section now renders as a single clickable section title; clicking takes the user to the landing page where the MDF + searchable Database handle in-section navigation. Individual technique pages remain reachable via the database slug links and direct URLs.

- **48 files modified** in a single sweep.
- **9 sub-folder categories in 04a** (`anastomotic`, `combined`, `female`, `flap`, `graft`, `meatal-perineal`, `minimally-invasive`, `posterior`, `staged-complex`) — added `"className": "sidebar-hidden-category"` to each `_category_.json`.
- **4 sub-folder categories in 04d** (`anastomosis-repair`, `interposition-graft`, `minimally-invasive`, `reimplantation`).
- **3 sub-folder categories in 04f** (`female-sui`, `male-sui`, `oab-uui`). Note: the `procedures/` subfolder under 04f was already hidden from earlier work.
- **2 sub-folder categories in 04j** (`penile-implants`, `peyronies-disease`).
- **~28 section-root MDX files** — added `sidebar_class_name: sidebar-hidden-item` to frontmatter (principles articles, urinary-diversion technique pages, genital-reconstruction technique pages, sexual-dysfunction technique pages, etc.).
- **`drug-coated-balloon.mdx` at the top level** — hidden from the sidebar; remains accessible via direct URL and inbound database links from 04ab BNC and 04a urethral.

The sweep was applied with a Python script that walked each atlas section folder, marked subfolder `_category_.json` files with the hidden-category class, and injected `sidebar_class_name: sidebar-hidden-item` into frontmatter for every section-root MDX other than `index.mdx`.

### Clinical-prevalence reordering of atlas sections (commit `6b986e3`)

User request: "can these be ordered with some sort of rationale either alphabetical or prevalence of the issue?" The chosen rationale is **clinical prevalence in reconstructive-urology / urogynecology practice**, with **Tissue Transfer last** (the cross-cutting toolkit, not a primary domain) per explicit user request.

| Position | Section | Rationale |
|---|---|---|
| 1 | Urethral Reconstruction | Most-common GURS indication — strictures, hypospadias, post-trauma |
| 2 | Incontinence | Very common — male sling / AUS, female SUI, OAB |
| 3 | Prolapse Repair | Very common urogyn primary domain |
| 4 | Bladder Neck Reconstruction | Common after prostate surgery (TURP / RP) |
| 5 | Bladder Augmentation & Catheterizable Channels | NLUTD, exstrophy, refractory OAB |
| 6 | Urinary Diversion | Post-cystectomy, refractory |
| 7 | Upper Tract Reconstruction | UPJO, ureteral stricture |
| 8 | Fistula Repair | Less common but high-impact |
| 9 | Genital Reconstruction | Post-trauma, AABP, oncologic, FGM/C |
| 10 | Male Sexual Dysfunction | ED, Peyronie's |
| 11 | Gender-Affirming Surgery | Specialized |
| 12 | Cosmetic Genital Surgery | Elective |
| 13 | Tissue Transfer | Cross-cutting toolkit — last per user |

Implemented by updating the `position` field in each section's `_category_.json`.

### Site-wide sidebar typography unification (commits `6b986e3`, `74db211`, `[next]`)

User flagged that fonts looked different across the atlas — and ultimately wanted **site-wide** consistency: "And not just for this page but i just want the fonts and everything to be consistent across the site."

**Three layered CSS bugs were uncovered and fixed in sequence:**

1. **Collapsible category titles vs regular menu links.** WARWIKI's existing `.menu__list-item-collapsible .menu__link` rule (custom.css:501) styled category titles as **uppercase, 0.78rem, font-weight 600, letter-spacing 0.06em, --warwiki-text-subtle** — a deliberate visual hierarchy. But sections with hidden children kept the collapsible styling while sections with no children at all rendered as plain doc links (normal case, 0.875rem). The atlas after the prior cleanup had a mix of both, so titles looked visually inconsistent.

   **Fix:** rewrite the collapsible-category rule to match regular `.menu__link` styling (font-weight 400, 0.875rem, normal case, normal letter-spacing, --warwiki-text-muted, 0.35rem padding). This applies SITE-WIDE — every sidebar (Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations, Journal Club, History & Lineage, Resources) now renders collapsible category titles identically to non-collapsible doc links.

2. **Empty expand caret on atlas sections.** Every atlas section deliberately hides its children via `.sidebar-hidden-category` / `.sidebar-hidden-item` (`display: none !important`). Docusaurus still rendered the chevron expand-caret on each section title because internally the category is "expandable." Clicking the caret expanded to nothing — a misleading affordance.

   **Fix:** scoped CSS hides the `.menu__link--sublist-caret::after` pseudo-element and the `.menu__caret` button on links whose `href` starts with `/docs/surgical-techniques/04`. The `:has()` selector handles the wrapper-level caret button. Other sidebars keep their carets because they have real visible children.

3. **Plain-doc-link bold inheritance.** Even after fixes 1 and 2, the three single-doc sections (04i Tissue Transfer, 04k Gender-Affirming Surgery, 04l Cosmetic Genital Surgery) appeared bold in the atlas list, while everything else was regular weight. Reason: those three render as plain `.menu__link` (no `.menu__list-item-collapsible` wrapper because they have no children at all). The prior fix only retargeted `.menu__list-item-collapsible .menu__link`. Plain `.menu__link` was inheriting Infima's default font-weight 600.

   **Fix:** add an explicit `font-weight: 400` to the `.menu__link` rule in custom.css. This synchronizes plain doc links with the collapsible-category title style. After this fix, every sidebar entry across the site renders at the same weight, size, color, case, and padding.

### Atlas sidebar — final state

```
Treatment Atlas
├── Urethral Reconstruction
├── Incontinence
├── Prolapse Repair
├── Bladder Neck Reconstruction
├── Bladder Augmentation & Catheterizable Channels
├── Urinary Diversion
├── Upper Tract Reconstruction
├── Fistula Repair
├── Genital Reconstruction
├── Male Sexual Dysfunction
├── Gender-Affirming Surgery
├── Cosmetic Genital Surgery
└── Tissue Transfer
```

13 entries, all styled identically, no expand carets, no hidden-category clutter. Click any entry to land on the section's MDF + Database.

### Editorial conventions reaffirmed this session

- **"Landing IS the database" applied uniformly.** The pattern (used historically in 04b's `bnc-vuas/` + `outlet-continence/`, plus Foundations `flaps/` + `grafts/` + `surgeons/`) is now the locked default for the entire Treatment Atlas. Each section landing hosts the searchable Database with slug links to every individual technique page; sub-folders live under the section but are hidden from the sidebar. Direct URLs continue to resolve.
- **Sidebar uniformity is enforced via CSS + structure.** Three rules in `src/css/custom.css` together enforce uniform sidebar appearance: (a) `.menu__link` and `.menu__list-item-collapsible .menu__link` both use the same 400-weight / 0.875rem / normal-case styling; (b) `.sidebar-hidden-category` / `.sidebar-hidden-item` use `display: none !important`; (c) atlas-specific `[href^="/docs/surgical-techniques/04"]` rules hide the empty expand caret. Future atlas sections should inherit this automatically.
- **Atlas-section ordering rule.** Use clinical-prevalence ordering with cross-cutting toolkits (e.g., Tissue Transfer) last. The position numbers in each section's `_category_.json` are the source of truth — `sidebars.ts` uses `type: 'autogenerated'` so position values drive sidebar order.
- **Atlas-section structural rule.** Every new atlas section follows the locked tabbed pattern: tabbed MDF + tabbed searchable Database (when the decision space splits cleanly into two or three cohorts) OR single MDF + single Database (when it doesn't). Section landing has `hide_title: true` and `slug: /surgical-techniques/<prefix>-<slug>`. The `_category_.json` has `link: { type: doc, id: surgical-techniques/<prefix>-<slug>/index }` and a `position` field.

---

## Previous handoff snapshot — May 1, 2026 (Treatment Atlas MDF rollout COMPLETE — 04e three-tab Genital Reconstruction + new 04l Cosmetic Genital Surgery section)

This session **completed the Treatment Atlas Master Decision Framework rollout** — every primary atlas landing now has a uniform MDF + searchable Database structure. Two structural changes finished the rollout: the **04e Genital Reconstruction** landing was rebuilt as three tabs (Penile default + Scrotal + Vulvar), and a brand-new top-level section **04l Cosmetic Genital Surgery** was created at sidebar position 13 with tabbed Male (default) + Female cosmetic decision frameworks. Branch: `claude/competent-herschel-c1c94b`; pushes `git push origin HEAD:main`. Session rule continues: **commit and push after every change.**

### 04e Genital Reconstruction — three-tab Penile / Scrotal / Vulvar

The 04e atlas landing was first rebuilt with a tabbed Penile + Scrotal pattern (commit `7c52e89`), then the Scrotal MDF + Database were filled out (commit `3dc13a4`), then a third tab **Vulvar Reconstruction** was added (commit `4f1f184`). Header was broadened from "external male genitalia" → "external genitalia (penile / scrotal / vulvar)" and the section-stack pointer in the parent atlas landing updated.

**Penile tab (default)** — 6-step MDF + 23-row database across 8 domains. Anchored on Kristinsson 2021 review, Alwaal 2015 UCSF n=54 STSG, Mendel 2023 / McLaughlin 2024 bipedicled scrotal, Tsukuura 2025 sensate EPAP, Liguori 2020 Integra, Crane 2026 Matriderm 92.1%, Mirastschijski / Schlaepfer / Flynn PAS, Brouwer 2023 EAU-ASCO, Pang 2026 glansectomy SR (91.1% preserved EF / 75.6% standing voiding), Baumgarten 2018 n=1,188 (5-yr LRFS 73.6%), Elst 2025 BJU (local recurrence does NOT affect CSS), Fakin 2017 siliconoma 4.37/5, Yamamoto 2022 SCIP-LFT, Tausch 2016 PAS, Gül 2026 STSG-vs-FTSG no-difference, Jeng 2026 escutcheon-derived FTSG. Glans-specific decision matrix added (7 scenarios — PeIN resurfacing, total glansectomy + neoglans, WLE + graft, lichen sclerosus, traumatic glans loss, total penile loss).

**Scrotal tab** — 7-step MDF + 24-row database across 9 domains. Anchored on Schifano 2022 SR scrotal reconstruction, Hayon 2021 orchidopexy + STSG framework, Alammar 2026 Fournier's flap SR (n=625, 1.6% flap-loss), Sahai 2021 30-yr island groin (n=29), Mopuri 2016 modified pudendal-thigh, Lee 2012 gracilis + IPAP (100% survival), Singh 2016 gracilis-perineum (obesity OR 7.5 / smoking OR 9.3), Abdelfattah 2023 SCIP complete-functional-lymphatic transfer (n=26 / 100% flap survival), Wisenbaugh 2018 MLL (mean +5.2 kg post-op weight gain / QoL 1.3 → 7.7), McDermott 2024 *JAMA Surg* NSTI review, Hayon 2020 modern testicular prosthesis, Atwater 2025 Rigicon Testi10 (KM 99.8% at 54 mo), Thomas 2021 aesthetic-scrotoplasty SR + algorithm. Database categories: Primary Closure / Skin Graft / Pedicled Flap / Lymphatic Flap / Testicular Thigh Pouch (temporary + definitive) / NPWT Adjunct / Testicular Prosthesis / Aesthetic / Combined-Salvage (incl. total penis-scrotum-LAW VCA).

**Vulvar tab** — 8-step MDF + 30-row database across 7 domains. Atlas-page intentionally focused on **non-GAS vulvar reconstruction** (oncologic, EMPD, VIN, lichen sclerosus, FGM/C, trauma, vulvar HS, GSM-related fat-grafting). Anchored on Höckel-Dornhöfer 2008 *Lancet Oncol*, Pavlov 2021 review, Kwong 2025 *BJOG* prospective vulval-flap series (sexual activity 9.3% → 24.4%; continence 48.1% → 80.4%; 88.9% reported reconstruction helped diagnostic acceptance), Ricotta 2025 *IJGC* Toulouse Algorithm, Han 2023 *Ann Plast Surg* simplified algorithm, NCCN Vulvar 2026, Lavoué 2013 EJSO skinning vulvectomy + STSG (occult cancer 31%), Lauber 2021 EJOGRB perineoplasty for LS, O'Dey 2024 *PRS* FGM anatomical reconstruction (n=119), O'Dey 2024 *JPRAS* aOAP for LS (n=61), Almadori 2024 *BJOG* FGM scoping review, ACOG PB 224, Salgarello 2005, Fin 2019, Confalonieri 2017 V-Y vs LPF, Negosanti 2015 *IJGC* perforator-flap algorithm, Huang 2015, Commenge 2025 genito-crural island perforator (n=27/46), Gentileschi 2017 pedicled ALT, O'Brien 2021 split ALT total vulvectomy, Zhang 2015 advanced/recurrent vulvar n=36, Eseme 2022 *Cancers* VRAM-vs-gracilis meta, Stein 2019 direct n=88, Caretto 2023 *Front Oncol* secondary algorithm, Galbraith 2023, Botter 2021 clitoral reconstruction, Meremikwu 2026 *IJGO* SR (meta-OR 79.67 for pain reduction), Mañero 2018 vaginal-graft clitoral reconstruction, Casabona 2023 PRP+fat for LS, Boero 2015 fat grafting for LS, Almadori 2025 fat grafting for FGM/C, Menkes 2021 microfat / nanofat for GSM, Pérez-López 2017 LS review, Rangatchew 2017 LS surgical (38% relapse). Database categories: Primary Closure / Graft (3) / Local Random / Fasciocutaneous (8) / Regional Pedicled (6) / Free Tissue Transfer (2) / FGM/C Reconstruction (4) / Regenerative / Fat Grafting (3) / Lichen Sclerosus — Surgical (3).

Bibliography end-state: **99 sequential, DOI-linked references** in `04e-genital-reconstruction/index.mdx`, all cited.

### New 04l Cosmetic Genital Surgery section (commit `[next]`)

Created a new top-level Treatment Atlas section at **sidebar position 13** (end of atlas) with `_category_.json` label "Cosmetic Genital Surgery" and tabbed Male (default) + Female cosmetic decision frameworks. The atlas page is **explicitly elective / aesthetic** and clearly distinguishes itself from reconstructive (04e), gender-affirming (04k), and clinical-conditions SPS/PDD content. Top-of-page admonition cites the **SMSNA 2024 position statement** (evidence low, most procedures investigational), the **ACOG 2020 Committee Opinion** (FGCS not medically indicated; safety / effectiveness not established), the **FIGO 2025 Statement** (ethically inappropriate to recommend / perform / refer FGCS in women without structural / functional abnormalities), and the **FDA 2018 safety communication** warning against energy-based devices for "vaginal rejuvenation."

**Male tab MDF (8 steps)** — Mandatory psychological screening (BDDQ-AS / BDD-YBOCS / MGSIS) → objective measurement (Veale nomograms; SPL anchors) → first-line non-invasive (PTT / VED / cryolipolysis) → invasive-procedure selection by clinical goal (12-row matrix: girth → length → apparent shortening → combined → penoscrotal webbing → scrotal laxity → refractory dissatisfaction) → procedure-specific sub-comparisons (HA vs Penuma vs autologous fat for girth; PTT vs suprapubic lipectomy vs SLD for length) → concurrent procedures → postop management → SMSNA 2024 evidence-hierarchy summary table.

**Male database** — 19 procedures across 6 domains: Non-Invasive (3) / Injectable Girth (4 — HA, PLA, autologous fat, "DO NOT USE" non-autologous injectables explicitly carved out) / Surgical Lengthening (5 — SLD ± V-Y, suprapubic lipectomy, V-Y plasty, penoscrotal-web Z-plasty, sliding/slicing techniques) / Surgical Girth (3 — Penuma, HST, dermal fat / AlloDerm) / Scrotal Aesthetic (3 — reduction scrotoplasty, penoscrotal-web correction, "scrotox") / Combined / Complex (2 — SLD+V-Y+fat, suprapubic lipectomy + IPP).

**Female tab MDF (7 steps)** — Mandatory pre-procedural assessment (counseling on normal anatomic variation, distinguish functional vs cosmetic, BDD screening, psychological-distress assessment, ACOG / FIGO informed consent) → identify clinical goal (10-row matrix) → technique selection by category (labiaplasty trim vs wedge vs de-epi with Zahedi 2023 algorithm; vaginal laxity surgical vs energy-based with Pereira 2024 SR — "RCTs do not confirm efficacy" anchor) → combined procedures → special branch — clitoral hoodoplasty (Liu 2022 classification, n=789, 95.7% satisfaction) → postop management → complications.

**Female database** — 22 procedures across 8 domains: Labiaplasty (5) / Clitoral Hoodoplasty (3) / Labia Majora (2) / Mons Pubis (2) / Vaginal Canal (2) / Energy-Based Devices (3) / Hymenoplasty / G-Spot (2) / Regenerative (2 incl. "Genital Beautification" combined packages). Surgical-vaginoplasty row explicitly includes the ACOG-2020 caveat that "rebranding posterior colporrhaphy as cosmetic vaginal rejuvenation is misleading."

**Anchors for female tab**: Escandón 2022 *PRS* labiaplasty meta (94–99% satisfaction), Géczi 2024 *Aesthet Surg J* comprehensive labiaplasty meta, Sorice-Virk 2020 *PRS* prospective n=62 (mean 6.5 of 11 symptoms preop → 93.5% symptom-free postop), Sharp 2016 *PRS* (preoperative distress predicts lower satisfaction; p=0.001), Goodman 2010 multicenter n=258 (91.6% satisfaction), Liu 2022 hood classification n=789 (95.7% satisfaction; revision 1.9%), Eserdağ 2021 inverted-Y, Xia 2021 three-step composite, Hersant 2018 labia majora aug n=21, Cihantimur 2013 / 2021 / Toplu 2021 genital-beautification packages, Alter 2012 pubic contouring, Fang 2023 *JPRAS* bilateral wall tightening (vaginal pressure 2.3 → 21.4 mmHg), Islek 2025 *Medicine* US (levator-hiatal area 29.14 → 23.51 cm²), Pereira 2024 *J Sex Med* SR (RCTs negative for VLQ), Slongo 2025 RCT, Wattanakrai 2022 RF + PEMF RCT, Lahlali 2021 hymenoplasty Moroccan center n=529, Menkes 2021 microfat / nanofat for GSM.

**Bibliography**: 60 DOI-linked sequential references for the cosmetic landing (independent of the 04e bibliography to keep the file self-contained).

### Treatment-atlas-completion summary

After this session, **every primary atlas landing has the locked tabbed-MDF + tabbed-database pattern**:

| Section | Tabs | MDF + DB |
|---|---|---|
| 04a Urethral Reconstruction | Male / Female | ✓ |
| 04ab Bladder Neck Reconstruction | BNC / VUAS | ✓ |
| 04b Bladder Augmentation & Catheterizable Channels | (single) | ✓ |
| 04c Urinary Diversion | (single) | ✓ |
| 04d Upper Tract Reconstruction | (single) | ✓ |
| **04e Genital Reconstruction** | **Penile / Scrotal / Vulvar (3)** | ✓ |
| 04f Incontinence | Female SUI / Male SUI / OAB-UUI | ✓ |
| 04g Prolapse Repair | (single) | ✓ |
| 04h Fistula Repair | Female / Male | ✓ |
| 04i Tissue Transfer | (pointer-database) | ✓ |
| 04j Male Sexual Dysfunction | ED / Peyronie's | ✓ |
| 04k Gender-Affirming Surgery | Masculinizing / Feminizing / Non-Binary (3) | ✓ |
| **04l Cosmetic Genital Surgery (NEW)** | **Male / Female (2)** | ✓ |

### Editorial conventions reaffirmed this session

- **Three-tab pattern** is now in production at 04e (Penile / Scrotal / Vulvar) and 04k (Masculinizing / Feminizing / Non-Binary). The locked structure: same `defaultValue` and `values` arrays for both MDF and Database tab-pairs so users see the same default tab in both blocks. Always include a **list-followed-by-non-list-paragraph** before the `</TabItem>` boundary to avoid MDX's "Expected closing tag … after end of listItem" error (`mdast-util-mdx-jsx end-tag-mismatch`).
- **Atlas page scope discipline**: cosmetic content does not duplicate clinical-conditions SPS/PDD coverage; vulvar atlas does not duplicate 04k feminizing GAS; female cosmetic atlas explicitly carves "rebranded colporrhaphy" claims with the ACOG warning. Each atlas landing should host **operative decision support and a procedure database**; clinical-conditions, pharmacology, and foundations articles host the deeper content.
- **Bibliography hygiene**: each new atlas landing builds its own self-contained bibliography rather than sharing across atlas files. When a paper is genuinely shared across two atlas pages (e.g., Yamamoto 2022 SCIP-LFT used in both 04e Penile and Scrotal), it lives once per file and is cited locally — no cross-file ref import.
- **Cosmetic-surgery editorial framing**: cosmetic atlas pages must lead with the relevant society positions (SMSNA 2024 / ACOG 2020 / FIGO 2025 / FDA 2018) before any procedural detail. The `> ` admonition at the top is the locked place for this.

---

## Previous handoff snapshot — April 30, 2026 (new 04k Gender-Affirming Surgery atlas section with tabbed Masculinizing / Feminizing / Non-Binary-Nullification MDF + Database)

This session created a new top-level Treatment Atlas section, **04k Gender-Affirming Surgery**, at sidebar position 10 (between Fistula Repair at 9 and Male Sexual Dysfunction at 11). The landing follows the locked tabbed pattern (used by 04a, 04ab, 04h, 04j) and is **focused exclusively on the genitourinary / reconstructive-urologic component** of GAS — top-surgery / breast / FFS / voice content lives only on `05c-gender-affirming/*` clinical-conditions pages and is not duplicated on the atlas. Branch: `claude/competent-herschel-c1c94b`; pushes `git push origin HEAD:main`. Session rule continues to be **commit and push after every change**.

### Section creation + tabbed pattern (commits `1f2d3e1`, `6c376b8`, `36fc7a4`)

- **`docs/04-surgical-techniques/04k-gender-affirming-surgery/`** — new directory with `_category_.json` (label "Gender-Affirming Surgery", position 10) and `index.mdx` as the tabbed landing.
- **Treatment-atlas parent landing** (`docs/04-surgical-techniques/index.mdx`) updated with a one-line section-stack entry for the new section.
- **Three tabs** on both the Master Decision Framework and the Treatment Database:
  1. **Masculinizing Surgery** (default tab)
  2. **Feminizing Surgery**
  3. **Non-Binary / Nullification**

Both tab pairs use identical `defaultValue` and `values` arrays so users see the same default tab in MDF and database.

### Masculinizing tab MDF (Steps 1–6)

Anchored on **WPATH SOC v8 (2022)**, **ACOG 2021**, **Endocrine Society 2017 (Hembree)**, **Bordas 2021 *Front Endocrinol* 813-pt metoidioplasty series**, **Wang 2026 *Microsurgery* flap-vs-flap complication-rate analysis**, **Berli 2025 *Plast Reconstr Surg* "Big Ben Method"** two-stage UL phalloplasty (27% urologic complication / 96% standing micturition), **Veerman 2020** and **Waterschoot 2021** complication-rate publications (UL OR 15.5; smoking OR 6.54 for fistula), **Pigot 2019 / Levy 2026** consensus on penile-implant timing.

- Step 1 — Goal-directed pathway selection (6-row matrix; metoidioplasty vs phalloplasty by patient priority)
- Step 2 — Phalloplasty flap selection (6-row matrix: RFFF / pedicled ALT / pedicled abdominal / Big Ben two-stage / fibula osteocutaneous / no-microsurgery options)
- Step 3 — Urethral lengthening decision (4-row matrix; smoking-cessation requirement is explicit)
- Step 4 — Vaginectomy timing & technique (5-row matrix: Hougen 2020 transperineal vs Ho 2025 fulguration vs Gomes da Costa 2016 laparoscopic-assisted)
- Step 5 — 4-stage staged-sequencing table (HBSO → vaginectomy + scrotoplasty + meta/phalloplasty → testicular implants ≥6 mo → erectile prosthesis 9–12 mo)
- Step 6 — Long-term urologic surveillance with red flags

**Top-surgery removal**: Stage 1 row no longer mentions chest surgery; Mancini 2021 ref dropped because the only thing being cited from it was the chest-combo data. HBSO row reframed around laparoscopic-route + vaginal-route caveat + oophorectomy decision.

### Feminizing tab MDF (Steps 1–8) — GU/reconstructive-urology focus only

Anchored on **van der Sluis 2023 *Best Pract Res Clin Obstet Gynaecol*** review, **Hehemann/Walsh 2019** orchiectomy-as-bridge, **Stelmar 2023** shallow-depth (32% chose shallow over full-depth), **Opsomer 2021 Ghent 15-year n=384** (97.2% penetrative-intercourse capable; 1.6% rectal perforation; 37.1% late revision), **Fakin 2021 single-stage-vs-two-stage** (single-stage stable depth vs >30% loss in two-stage), **Castanon 2022** laparoscopy peritoneal pull-through (n = 52, depth 14.7 cm, ~96% satisfaction), **Lee 2025 *Neurourol Urodyn*** (no LUT-function degradation at 12 mo), **Shamamian 2025** dilation-difficulty predictors (primary peritoneal graft OR 3.20), **De Rosa 2024** vaginal-stenosis SR (PIV 5.70% vs sigmoid 0.20%), **Blasdel 2024 *Plast Reconstr Surg*** "blind spots" patient-vs-surgeon-reporting, **AFFIRM (Huber 2021)** validated patient-reported instrument.

- Step 1 — Eligibility & readiness (WPATH / Endocrine Society)
- Step 2 — Goal-directed GU pathway selection (orchiectomy / vulvoplasty / full-depth vaginoplasty 7-row patient-priority matrix)
- Step 3 — Vaginoplasty technique selection (7-row scenario matrix)
- Step 4 — Peritoneal vs PIV vs sigmoid sub-comparison (10 features × 3 techniques)
- Step 5 — Component-procedure decisions (Fascelli 2024 anatomy-guided clitoroplasty preputial vs urethral-flap; Sigurjónsson 2017 long-term sensory durability; Blasdel 2024 patient-vs-surgeon reporting "blind spots" with AFFIRM 68.9% misdirected stream; labiaplasty)
- Step 6 — Preoperative preparation (electrolysis 6–12 mo, smoking, BMI, PFPT, dilation counseling, estradiol management)
- Step 7 — Postoperative dilation protocol (Gomez 2026 longitudinal PRO: 6.6 d/wk, 2.4×/d, ~38 min)
- Step 8 — Long-term urologic surveillance (AFFIRM-domain follow-up, vaginal prostate exam, hygiene)

**Removed entirely from atlas Feminizing tab**: breast augmentation, FFS (3 rows), chondrolaryngoplasty, voice therapy / glottoplasty / laryngoplasty (3 rows), non-binary chest surgery. All still live in `05c-gender-affirming/feminizing-procedures` for clinical reference.

### Non-Binary / Nullification tab MDF (Steps 1–4)

Anchored on **Ascha 2024 *J Sex Med*** individually-customized procedures (n = 16), **Claeys 2025 *BJU Int*** SR of variant GGAS (23 case series), **Skorochod 2023** *J Plast Reconstr Aesthet Surg* nonbinary patient-centered care, **Pletta 2025 *JAMA Netw Open*** (30.8% non-binary in chest-surgery cohort; 17.8% non-binary AMAB / 33.9% non-binary AFAB had received ≥1 GAS), **Kennis 2022** (similar GAS desire between binary and non-binary, p = 0.411), **Klemm 2024 *J Urol*** PU long-term (84–95% retreatment-free at median 55–61 mo, 86% satisfied), **Joshi 2024 *Urology*** algorithmic midline PU, **Chen-Berli 2021 *Plast Reconstr Surg*** OHSU shaft-only with vulvoscrotoplasty, **Moorefield 2024 *Plast Reconstr Surg*** Y-to-V advancement variant, **Bouman 2023** nonbinary identities, **Myers 2011 *Urology*** dorsal-plate-preservation PU.

- Step 1 — Identify the patient's genital goals (6-question framework)
- Step 2 — Match goals to procedure (9-row matrix: genital nullification / phallus-preserving vaginoplasty / vagina-preserving phalloplasty-or-metoidioplasty / standalone gonadectomy)
- Step 3 — UL decision in vagina-preserving procedures (4-row matrix; vagina + UL → higher complication rate than UL + vaginectomy per Claeys 2025 SR)
- Step 4 — Counseling considerations unique to non-binary patients (irreversibility of nullification, fertility, evidence base = case series only, insurance written around binary endpoints, gynecologic + urologic surveillance, psychosexual adjustment)

### Treatment Database (3 tabs)

| Tab | Domains | Rows |
|---|---|---|
| **Masculinizing** | Phallic Construction (8) / Urethral Reconstruction (5) / Vaginectomy (3) / Scrotoplasty (2) / Testicular Implants (1) / Erectile Prosthesis (3) / Hysterectomy-BSO (1) | **23** |
| **Feminizing** (GU only) | Gonadectomy (1) / Vulvoplasty (1) / Vaginoplasty (6) / Component Procedures (4) / Revision-Salvage (6) | **18** |
| **Non-Binary / Nullification** | Genital Nullification (2 — AMAB, AFAB) / Phallus-Preserving (1) / Vagina-Preserving (3 — Chen-Berli OHSU, Moorefield Y-to-V, vagina-preserving meta) / Standalone Gonadectomy (2) / Component-PU (1) / Component-Vulvoplasty (1) | **10** |

### Two new technique stubs ride alongside (in 04j, not 04k)

The April 29 commit had already created `/04j-sexual-dysfunction/li-eswt.mdx` and `/penile-traction-therapy.mdx` as ED-and-PD adjuncts; no new stubs were needed for the GAS section because all decision-database rows link to existing 05c-gender-affirming pages, foundations flap/graft articles (RFFF, ALT, peritoneal, SCIP, BMG), the 04j penile-implants subsection, or pharmacology hubs.

### Bibliography cleanup pass

The session ended with a clean-up of the GAS-section bibliography:

- **Dropped 10 orphan refs** that were either placeholders (Castanon-2024-without-DOI, Haley 2025) or no longer cited after the chest-surgery strip and the feminizing-tab refocus (Mancini 2021 chest+HBSO combined, Dy 2021 peritoneal-flap revision, Robinson 2022 intra-abdominal, Coon 2020 breast aug, Liu 2024 SR breast aug, Kocjancic, Ascha 2018 ALT-vs-RFFF, Netshiongolwe, van de Grift).
- **Added inline `<sup>[[N]](#refN)</sup>` cites** at all name-only mentions for: Hougen 2020, Ho 2025, Gomes da Costa 2016, Pigot 2020 stepwise scrotoplasty, Sun 2023 IPP infrapubic, Pigot ZSI 2020, Fascelli 2024 clitoroplasty anatomy-guided, Motiwala 2026 PFPT review, Gaither 2018 BMI cohort, Myers 2011 PU dorsal-plate, Bouman 2023 nonbinary identities, Robinson 2022 intra-abdominal, Jacoby 2019 Davydov, Ratanalert 2025 full-length peritoneal.
- **Renumbered remaining refs sequentially** via Python script — bibliography now has **56 refs, all cited**.

### Editorial conventions reaffirmed this session

- **Tabbed-MDF + tabbed-database with three or more cohorts is a valid extension** of the locked two-tab pattern. The same `<Tabs defaultValue="masc">` block with the same `values` array is reused for both MDF and Database tab pairs so users see the same default in both blocks.
- **Atlas page is GU/reconstructive-urology only.** When an atlas section's traditional scope sprawls into non-GU territory (top surgery, FFS, voice surgery, breast augmentation), keep that material on the corresponding `05-special-populations/05c-*` clinical-conditions page and explicitly direct readers there from the atlas section-stack pointer. Do **not** duplicate clinical content on the atlas page.
- **Bibliography hygiene**: when a series of edits leaves orphan refs, do a final pass using a Python renumbering script with `TMP_` markers to avoid collisions during in-place sed renaming. Anchor pattern: `<a id="refN"></a>N. ...` and citation pattern: `[[N]](#refN)`.
- **JS-string database notes**: `<sup>[[N]](#refN)</sup>` markers do **not** render inside `export const ... = [{notes: "..."}]` strings — those go through React as plain text. Place all citations in the markdown body (MDF tables, prose) instead. Keep database notes plain.
- **Editorial cleanup applied to source dump**: filtered all bleed-through refs (RVF / fistula / hidradenitis / Crohn's / pelvic-fistulae / breast-augmentation / FFS), dropped two trailing chatbot prompts, escaped every `<` in body prose.

---

## Previous handoff snapshot — April 29, 2026 (04j Sexual Dysfunction → "Male Sexual Dysfunction" + tabbed ED/Peyronie's Master Decision Framework + tabbed Treatment Database)

This session rebuilt **04j Sexual Dysfunction** end-to-end. Section label was renamed to **Male Sexual Dysfunction**, the landing now defaults to ED with a **tabbed Master Decision Framework** (ED tab default + Peyronie's tab) and a **tabbed Treatment Database**, and detailed clinical content (epidemiology, pathophysiology, full evaluation, special-population narratives) was deliberately removed from the atlas landing because it is already covered in the corresponding `03g-genital-scrotal/erectile-dysfunction.mdx` and `peyronies-disease.mdx` clinical-conditions articles. **Session rule continues to be commit and push after every change.** Branch: `claude/competent-herschel-c1c94b`; pushes `git push origin HEAD:main`.

### Section rename + landing structural rebuild (commits `6396fa6`, `a9e7da3`)

- **`04j-sexual-dysfunction/_category_.json`** label changed from "Sexual Dysfunction" → **"Male Sexual Dysfunction"**. Treatment-atlas parent landing pointer in `04-surgical-techniques/index.mdx` updated to match.
- **Landing now defaults to ED**. The thin three-pointer hub was replaced with a tabbed structure mirroring 04a urethral, 04ab BNC, and 04h fistula:
  - **Master Decision Framework** with `<Tabs>` — ED tab default, Peyronie's tab second.
  - **Treatment Database** in a second `<Tabs>` block with the same two tabs.
- **Old `erectile-dysfunction-database.mdx` was deleted** — its content was absorbed into the new landing. A Vercel redirect was added (`/docs/surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction-database` → landing). Two inbound links repointed: `02-evaluation/history-physical/assessment-tools.mdx` and `peyronies-disease/index.mdx` See Also block.

### ED tab — Master Decision Framework

Anchored on **AUA 2018 ED Guideline (Burnett)**, **EAU 2025 Male Sexual & Reproductive Health Update (Salonia)**, **ICSM 2015 (Hatzimouratidis)**, **Mykoniatis 2021 *JAMA Netw Open*** combination meta of 59 RCTs / 8,000+ patients, and **Lopategui 2018** length-preservation data (mean 0.6 cm loss with immediate Mulcahy salvage vs 3.7 cm with delayed reimplantation).

- **12-row Treatment Selection by Clinical Scenario matrix** spanning newly diagnosed → hypogonadism → PDE5i non-responder → nitrate user → post-RP → regenerative-adjunct candidate → refractory → PD+ED → corporal fibrosis → prosthesis infection → traumatic vascular ED.
- **7-tier stepwise treatment ladder** (Tier 0 lifestyle → Tier 3 IPP), each row with expected efficacy and explicit advancement criteria.
- **IPP device-selection sub-comparison** (3-piece vs 2-piece vs malleable) — components, naturalness, mechanical survival, surgical complexity, ideal candidate.
- **Mulcahy salvage hierarchy** (4 rows): immediate IPP salvage 82% / 0.6 cm; immediate malleable salvage 93% single-center / **70.5% in 2026 VA national n=76 (Angulo-Llanos)** with 45.5% reinfection in diabetics; extracapsular reimplantation 94.4%; delayed reimplantation with mean 3.7 cm length loss as the operational anchor.

### Peyronie's tab — Master Decision Framework

Anchored on **AUA 2015 PD Guideline (Nehra)**, **EAU 2025**, **2026 BJU Guideline-of-Guidelines (Chierigo)**, **Cochrane 2023 PD non-surgical (Rosenberg)**, **IMPRESS pooled-cycle data (Ziegelmann 2023)**, **Alom 2019 CCH+RestoreX** (49% vs 31% curvature improvement), **Ziegelmann 2019 RestoreX RCT**, **Demzik 2022 8-dot plication**, **Reddy 2018 plication-severe-PD long-term**, **Yafi 2018 multi-institutional CCH/plication/PEG head-to-head**, **Badr 2026 BMG SR/meta** (98.6% success / 1.7% de novo ED / 1.1% shortening), **Hatzichristodoulou 2021 collagen-fleece sealing technique**, **Hammad 2025 multicenter IPP** (82.4% required adjunct beyond IPP alone), **Khera PROPPER**, **Moncada 2025 IPP-without-ED** (87.9% satisfaction / lower mechanical-failure than ED group), **Antonini 2018 scratch+VED**.

- **Step 1** — phase determination table (acute vs stable; stability defined as no curvature change ≥3–6 months + absent pain + onset >12 mo).
- **Step 2** — acute-phase treatment matrix (5 rows; CCH+RestoreX as the most evidence-based combination; explicit "AUA: should NOT be offered" rows for vitamin E, tamoxifen).
- **Step 3** — stable-phase surgical decision algorithm (8 rows) with the EF-status branch as the primary axis.
- **Step 4** — plication-vs-grafting sub-comparison (7 factors + the Yafi 2018 head-to-head numbers row).
- **Step 5** — graft-material selection table (BMG / collagen fleece / tunica vaginalis / SIS / pericardium / saphenous vein / dermis) anchored on Badr 2026 BMG-as-best-success.

### Treatment Database — ED tab

**17 rows across 8 tier categories**: Lifestyle/Behavioral (2), Oral Pharmacotherapy (2), Mechanical (1), Intraurethral (1), Injectable (2), Regenerative/Emerging (3), Surgical Prosthesis (4), Vascular Surgery (2). Tier-only badge column (the Invasiveness column was added then removed at user request — the Tier column already conveys invasiveness implicitly). Slugs link out to existing technique pages (PDE5i, ICI, MUSE, VED, Penile Implants), pharmacology hubs (testosterone replacement, peyronies-disease-agents, PRP), and the new Li-ESWT stub. Stem-cell row has no slug (intentional — no destination page).

### Treatment Database — Peyronie's tab

**28 rows across 11 tier categories**: Oral — Limited Evidence (3), Oral — Not Recommended (3, including the explicit vitamin E / tamoxifen "DO NOT OFFER" rows per AUA 2015), Intralesional — FDA-Approved (1, CCH/Xiaflex), Intralesional — Second-Line (2, IFN α-2b / verapamil), Intralesional — Investigational (1), Mechanical/Device (4 including ESWT-for-pain-only with the AUA "should NOT be used for curvature" caveat), Combination Non-Surgical (1, CCH+RestoreX), Surgical — Plication (4 named variants: Nesbit / Yachia / 16-dot/8-dot / TAP), Surgical — Grafting/PEG (4 graft-material rows), Surgical — Prosthesis (1), Surgical — Prosthesis Adjunct (5: manual modeling / concurrent plication / plaque incision over cylinders / scratch+VED / IPP+multiple corporeal incisions+collagen fleece). All slugs point at existing peyronies-disease/ subsection pages or pharmacology hubs.

### New technique stubs created this session

- **[`li-eswt.mdx`](docs/04-surgical-techniques/04j-sexual-dysfunction/li-eswt.mdx)** — 8 refs. Mechanism (VEGF / eNOS / EPC recruitment), ED evidence (Lu 2017 meta IIEF +2.0; Hinojosa-Gonzalez 2024 Bayesian SMD 0.84; Cochrane 2025 + Capogrosso 2025 EAU "not yet recommended as standalone"), patient selection, typical protocol (0.05–0.25 mJ/mm², 1500–3000 pulses, 6–12 sessions), Peyronie's-specific note that **AUA 2015 explicitly says ESWT should NOT be used for curvature/plaque** — pain-only role.
- **[`penile-traction-therapy.mdx`](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-traction-therapy.mdx)** — 6 refs. Device comparison table (RestoreX 30–90 min/day vs Penimaster PRO / Andropenis 3–8 hr/day), Ziegelmann 2019 *J Urol* RCT (n=110: −11.7° curvature, +1.5 cm length, EF improvement), Joseph 2020 follow-up (95% length gains at 6 mo; 61% curvature improvements), **Alom 2019 CCH+RestoreX** combination (49% vs 31% curvature improvement; +1.9 cm; 6.9× more likely to achieve ≥20° improvement) as the most evidence-based non-surgical regimen, Levine 2011 pre-IPP length-restoration pilot.

### Redundancy management

- **Dropped from atlas landing (already in `03g-genital-scrotal/erectile-dysfunction.mdx`)**: epidemiology paragraph, pathophysiology + etiology classification table, Step 1–4 evaluation walkthrough (history, PE, labs, Princeton III narrative, psychosexual), Tier 0 lifestyle table, Tier 1 PDE5i agent details, Tier 1B combination table, Tier 2 ICI agent details, Tier 2.5 regenerative narrative, Tier 3 IPP outcomes/special populations, Tier 4 vascular surgery narrative, post-RP / diabetic / neurogenic special-clinical-contexts sections, Key Takeaways.
- **Dropped from atlas landing (already in `peyronies-disease/index.mdx`)**: disease-phases prose, pathophysiology cascade, evaluation deep-dive, non-surgical narrative beyond the matrices, comparative-outcomes-after-surgery prose, full guideline-consensus discussion.
- **Kept on atlas landing (operational decision support)**: Master Decision Framework matrices for both conditions, IPP device sub-comparison, Mulcahy salvage hierarchy, plication-vs-grafting and graft-material sub-tables for PD, both Treatment Databases.
- The landing's section-stack now points readers to the clinical-conditions articles for full pathophysiology / natural history / evaluation, to the Penile Implants subsection for operative-deep-dive, and to the Pharmacology Sexual Medicine & Andrology hub for medical-therapy detail.

### Editorial conventions reaffirmed this session

- **Tabbed-MDF + tabbed-database pattern** is now the locked structure for any treatment-atlas landing whose decision space splits cleanly into two cohorts (Male / Female; BNC / VUAS; ED / Peyronie's; Female-fistula / Male-fistula). The same `defaultValue` and `values` array should be reused for the MDF and database tab pairs so users see the same default tab in both blocks.
- **Database column `Invasiveness` is redundant when the `Tier` column already encodes invasiveness** (Lifestyle / Oral / Mechanical / Intraurethral / Injectable / Regenerative / Surgical Prosthesis / Vascular Surgery — each tier already implies invasiveness level). User explicitly requested removal of the Invasiveness column from both ED and PD databases on this landing — apply this to future databases where the Tier column already conveys the same information.
- **Bleed-through reference filtering**: assistant-generated PD content arrived with refs to RVF / fistula / hidradenitis / Crohn's / pelvic-fistulae — all filtered before publication. Only refs actually cited in the body matrices were retained, then renumbered sequentially.
- **`<` escaping in body prose**: `<300 ng/dL`, `<3 risk factors`, `<5 mL/min`, `<5 cm/s`, `<45 mmHg/30 sec`, `<2`, `<12–24 months`, etc., all escaped to `&lt;` in markdown body. Inside `export const` JS string literals (e.g., database `notes` properties), `<300 ng/dL` and similar are safe because MDX does not parse JSX inside JS strings — but the body prose, table headers, and admonition contents must escape.
- **Trailing chatbot follow-up question** ("Would you like to explore the specific technical details and comparative outcomes…") stripped per WARWIKI convention.
- **`Figure N / undefined` placeholder blocks** stripped (two placeholders in the source — molecular-mechanism figure, diabetic-ED treatment-options figure).

---

## Previous handoff snapshot — April 28, 2026 (Master Decision Frameworks across the Treatment Atlas + Bladder Neck Reconstruction promoted to its own section + 28 urethral stubs + 4 redirects)

This was a single-day rebuild of the **Treatment Atlas landing pages** around a uniform **Master Decision Framework + searchable database** pattern, plus a major reorganization that promoted **Bladder Neck Reconstruction** to its own top-level section and renamed the old 04b folder to **Bladder Augmentation & Catheterizable Channels**. Every framework anchors on contemporary literature with explicit page-link integration into the corresponding technique pages. The session rule continues to be **commit and push after every change** — every action below was pushed to `origin/main` immediately. New worktree branch is `claude/competent-hamilton-8d8ffc`; pushes use `git push origin HEAD:main`.

### Bladder Neck Reconstruction is now its own top-level section (commit `09a089c`)

The most consequential structural change of the day. **04ab-bladder-neck-reconstruction/** is a new top-level treatment-atlas section sitting between Urethral Reconstruction (04a) and Bladder Augmentation & Catheterizable Channels (04b). Slug: `/docs/surgical-techniques/04ab-bladder-neck-reconstruction`.

- Section landing **[index.mdx](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/index.mdx)** hosts: principles cross-link, the BNC/VUAS Master Decision Framework, the technique-library quick-link block, and a **29-row 7-tier database** (Endoscopic — First-Line / Endoscopic — Adjunct / Reconstruction — Robotic / Reconstruction — Open / Reconstruction — Graft-Based / Continence-Creating Outlet / Salvage / Diversion).
- **Master Decision Framework is tabbed** (commit `aa962d3`): **BNC tab default** (5-row matrix anchored on AUA 2023, Wu 2024, Nealon 2022, Zhang 2021, Abramowitz 2021, Shamout 2022, Pfalzgraf 2011, Avallone 2019, Pariser 2015 neobladder BNC, Brede 2014, Martins 2021); **VUAS tab** (6-row matrix anchored on Britton 2023, LaBossiere 2016 holmium-laser, Sterling 2024 D-BMGU, Shakir 2022 / Kirshenbaum 2018 TURNS robotic, Lee/Eun 2025 RTV-BNR, Berg 2025 DCB, Hacker 2022 / Rozanski 2021 radiation modifier, Doležel 2024, Rodriguez 2024, Savun 2025).
- **Full directory move**: `bnc-vuas/`, `outlet-continence/`, `bladder-neck-reconstruction-principles.mdx`, and the old `bladder-neck-reconstruction.mdx` (renamed to `index.mdx`) all moved from 04b/ to 04ab/. All `04b-bladder-reconstruction/{bnc-vuas,outlet-continence,bladder-neck-reconstruction,bladder-neck-reconstruction-principles}/*` URL patterns redirect to the new 04ab/ paths via 5 Vercel rules.
- All 04b–04j positions bumped one slot to make room.

### Bladder Augmentation & Catheterizable Channels (commit `808894d`)

- Renamed 04b's `_category_.json` label and page H1 from "Bladder Reconstruction" → **"Bladder Augmentation & Catheterizable Channels"**. URL/slug unchanged at `/04b-bladder-reconstruction` to preserve all existing redirects and internal links.
- **Master Decision Framework**: 11-row Reservoir / Channel / Outlet decision matrix anchored on **AUA / SUFU 2021 NLUTD guideline** (Conditional Recommendation Grade C for AC; same recommendation for CCC with or without AC). Three sub-tables: **Bowel-Segment Selection** (Ileum default; sigmoid alternative; gastrocystoplasty for eGFR &lt; 40; ureterocystoplasty; SCLU); **CCC Type Selection** (Mitrofanoff &gt; TBF &gt; Monti per Polm 2024 revision-rate hierarchy; Hemi-Kock; Indiana pouch); **Outlet Procedure Selection** (bulking → fascial sling for CIC patients → AUS for voiders → BN closure as last resort).
- **Database expanded 13 → 16** with **Indiana Pouch Modification (IAC)**, **Hemi-Kock continent stoma**, and **Seromuscular Colocystoplasty (SCLU)**. Existing Mitrofanoff / Monti / TBF / gastrocystoplasty notes refined with Polm 2024 revision data and AUA-aligned indications.

### Master Decision Framework rollout — every other Treatment Atlas landing

Each section follows the same pattern: **brief intro → main scenario matrix → sub-tables for sub-decisions → optional stepwise ladder**. Inline page-links wire every recommendation to its corresponding technique page. References cite the contemporary literature anchors only (no full reference lists; we kept the four-column "no-refs" version per user "Keep as is" decision when offered the references-column option).

| Section | Landing | Framework Highlights | Database Δ |
|---|---|---|---|
| **Urethral Reconstruction** | [04a/index.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/index.mdx) | Tabbed Male / Female; Male = 12-row matrix anchored on AUA 2023; Female = 10-row matrix on dorsal-onlay-BMG-as-default consensus | Added `hideLocation` prop to `TechniqueDatabase`; female tab now renders 3-column (Technique / Eponym / Notes) with no Location filter |
| **Urinary Diversion** | [04c/index.mdx](docs/04-surgical-techniques/04c-urinary-diversion/index.mdx) | 9-row scenario matrix + Three-Option Comparison sub-table — anchored on AUA / ASCO / ASTRO / SUO MIBC guideline three-option discussion + Pellegrino 2025 utilization trends (~56% conduit / 41 → 19% neobladder / 2 → 22% ureterostomy) | 9 → 19; new **Continent Heterotopic** family (purple badge) for Ureterosigmoidostomy + Mainz II; added Camey II, VIP, Le Bag, Mansoura, Kock, Mainz I, Florida, Penn |
| **Upper Tract Reconstruction** | [04d/index.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/index.mdx) | Three sub-sections: Location × Length matrix (3 × 3), Modifying Factors (9 rows), Stepwise Escalation Ladder (9 tiers) — anchored on You 2023 BMG-vs-ileal-ureter meta (94.9% vs 85.8%) | 14 → 22; added Balloon Dilation, Lingual Mucosal Graft (ureter), standalone Psoas Hitch, Downward Nephropexy, Yang-Monti Ileal Ureter, Reconfigured Colon, Pyelovesicostomy, Nephrectomy |
| **Genital Reconstruction** | (no framework added this session — already had a database in `04e/index.mdx` from an earlier session) | — | — |
| **Female SUI** | [04f/female-sui/](docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx) | 10-row scenario matrix + MUS Sub-Comparison + 9-tier Stepwise Ladder — anchored on AUA / SUFU 2023, SIMS NEJM 2022 (single-incision noninferior to standard MUS at 36 mo), Imamura BMJ 2019 SUCRA, Grigoryan 2024 autologous-vs-MUS, Brosche 2021 7-yr Bulkamid, Peyronnet 2019 female-AUS meta | 10 → 18; new **Salvage** category (red badge); + Biofeedback PFMT, Behavioral / Lifestyle, Weight Loss, Pelvic Floor Electrical Stim, Topical Vaginal Estrogen, Vaginal Laser (flagged investigational), Obstructing PVS / BNC, Urinary Diversion |
| **Male SUI** | [04f/male-sui/](docs/04-surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database.mdx) | 10-row scenario matrix + Sling/Adjustable Device Sub-Comparison (4 columns) + AUS-vs-Sling Snapshot (5 anchors) + 9-tier Ladder — anchored on AUSCO 2025 (94% &gt; 50% pad-weight reduction), MASTER RCT 2021, Lenfant 2025 (40% reintervention-free at 10 yr), Bentellis 2021 (urethral atrophy = 56.5% of revisions), Sacco 2021, Geretto 2023, Angulo 2019 ATOMS-vs-ProACT, Queissert 2021 ATOMS as second-line, Toia 2019 limited male bulking evidence | 5 → 22; **6 new categories** (Surgical split into Fixed / Adjustable / Sphincter; new Pharmacological / Minimally Invasive / Emerging / Salvage); + Biofeedback, Electrical Stim, Lifestyle, Containment, Duloxetine, Antimuscarinic-mixed-only, Bulking, ProACT, AdVance XP, Virtue, ATOMS, Argus, REMEEX, AUS Revision/Tandem, Stem Cell, Electroacupuncture, ExMI, BNC + Mitrofanoff, Diversion |
| **OAB & UUI** | [04f/oab-uui/](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx) | 9-row scenario matrix + Minimally-Invasive Sub-Comparison (BTX / SNM / iTNM / PTNS) + **Antimuscarinic Cognitive-Risk Hierarchy** (Trospium / Fesoterodine lowest → Oxybutynin highest) + optional Stepwise Ladder. Anchored on **AUA / SUFU 2024 paradigm shift** that eliminated mandatory step therapy in favor of shared-decision menus, Malcher 2022 (aOR 1.48 dementia at &gt; 365 DDDs), Sheyn 2025 (n = 941,402), Drake 2017 NMA, Hsieh 2025, Siegel 2018 5-yr SNM, Amundsen 2025 iTNM-vs-SNM | 10 → 16; categories realigned to the 2024 6-menu structure: Behavioral / **Non-Invasive (NEW)** / Pharmacological / **Minimally Invasive** (renamed from Procedural) / Invasive Surgical / **Indwelling Catheter (NEW, red badge)**; β-3 listed first per 2024 preferred-first-line update |
| **Prolapse Repair** | [04g/index.mdx](docs/04-surgical-techniques/04g-prolapse-repair/index.mdx) | 11-row Treatment Selection by Clinical Scenario + Apical Suspension Sub-Comparison (USLS / SSLF / SCP / Manchester) + Compartment Stepwise Approach with explicit **Level-A "no mesh / grafts in posterior repair"** rule. Anchored on ACOG PB 214, **Menefee 2024 JAMA Surg** 3-arm RCT (SCP &gt; NTR aHR 0.57; TVM noninferior to SCP), Lavelle 2018 stage-III stratification, OPTIMAL trial, Enklaar 2023 Manchester RCT (0% reoperation at 2 yr), Ruffolo 2025 / Brennand 2025 hysteropexy-vs-hysterectomy data, Dallas 2021 colpocleisis durability, Kahn 2022 FDA 522 TVM, Yeung 2024 Cochrane | 24 → 30; + PFMT, Lifestyle Modifications, Sacrohysteropexy / Sacrocervicopexy, Laparoscopic Lateral Suspension (LLS), Transvaginal Mesh (Apical-Only Kits — flagged US-market-removed) |
| **Fistula Repair** | [04h/index.mdx](docs/04-surgical-techniques/04h-fistula-repair/index.mdx) | **Master Framework is itself tabbed (Female / Male)**. Female tab: 5-step framework spanning VVF, UretVF, UVF, VUF, RVF, obstetric (12-row decision-by-type matrix + 8-row RVF algorithm). Male tab: 6-step framework spanning RUF, EVF/CVF, USF/PPF, UCF, radiation anterior urinary fistula. Universal-principles content was deliberately consolidated to the [Principles of Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/fistula-repair-principles.mdx) article and removed from both tabs to avoid duplication. | Female 15 → 41; Male 15 → 33. Male added 3 new fistula-type domains (Enterovesical / Colovesical · Urosymphyseal / Puboprostatic · Radiation Anterior Urinary Fistula) with new badge colors |

### Master Decision Framework anchors — male urethroplasty table

The original framework added to the Male tab on the urethral landing has 12 rows and references the AUA 2023 guideline's three signature rules: oral mucosa is the first-choice graft, avoid genital skin in lichen sclerosus, and perineal urethrostomy is a legitimate long-term option for high-risk patients. Anchors include Jasionowska 2022 SR, Nilsen 2022 Scandinavian RCT (transect vs not), Chapman 2019 sexual-dysfunction, Reid 1975 Turner-Warwick, Olsson-Krane 1978, Brock-Kaplan 1981 transpubic-pediatric, Greenwell-Mundy 1999 anterior trends, Secrest 2002 staged, Alexander 1977, Fernandes-Draper 1975, Guralnick-Webster 2001 AAU, Baudry 2025 ntAAU, Redmond-Hoare-Rourke 2020 (HR 4.8 AAU vs dorsal onlay), Oszczudlowski 2023 transecting-vs-non meta, Virasoro-DeLong 2020 ntBU, Wessells 2023 AUA guideline amendment, Al-Ali 2001 Johanson-salvage, McAninch 1993 / Whitson 2008 / Carney-McAninch 2002 fasciocutaneous, Carr 1997 mesh-graft, Horiguchi 2017 substitution-urethroplasty review.

### Female urethroplasty database — Location column hidden via component prop

`TechniqueDatabase.tsx` gained an opt-in `hideLocation?: boolean` prop. Female SUI page passes `hideLocation`; male tab is unchanged. Verified live in dev preview — female db renders 3-column (Technique / Eponym / Notes) with only the Category filter; male db renders 4-column with both Category + Location filters.

### 28 stub pages created for previously slug-less urethral database rows (commit `4f86310`)

User directive: "put stubs for anything in the database that doesnt have one yet, and you can have a link for DCB to where it actually lives."

- **Combined / Graft + Flap** — new sidebar category (position 5; bumped staged-complex → 6, posterior → 7, meatal-perineal → 8, minimally-invasive → 9, female → 10): `combined/erickson-dorsal-bmg-ventral-flap.mdx`, `combined/karapanos-dorsal-bmg-ventral-orandi.mdx`.
- **Other male stubs** (9): `graft/penile-skin-free-graft.mdx`, `graft/preputial-spiral-graft.mdx`, `graft/tissue-engineered-oral-mucosa.mdx`, `posterior/robotic-posterior-urethroplasty.mdx`, `minimally-invasive/icg-perfusion-assessment.mdx`, `minimally-invasive/drug-coated-balloon.mdx` (a pointer stub, since the canonical DCB page lives at `/docs/surgical-techniques/drug-coated-balloon`).
- **Female stubs** (19): `female-dviu`, `distal-urethrectomy-advancement`, `lateral-based-anterior-vaginal-wall-flap`, `onol-vaginal-mucosal-inlay`, `dorsal-vaginal-flap`, `labia-minora-flap`, `bladder-wall-flap-urethroplasty`, `female-ventral-inlay-bmg`, `dorsal-onlay-labial-mucosa`, `vaginal-free-graft`, `lingual-mucosal-graft-female`, `circular-bmg-female`, `bmg-martius-combined`, `vaginal-flap-bmg-combined`, `staged-bmg-female`, `primary-end-to-end-female`, `vaginal-wall-tubularization`, `bladder-flap-tubularized`, `tissue-engineered-female`.
- All 28 entries wired into the male/female `techniques` arrays with proper `slug` fields. Build now passes with no broken-link warnings on the 04a database.

### Auto-redirects + page deletions

User directive: "Have posterior urethroplasty / PFUI link to the canonical page automatically. Delete scrotal dropback page. Delete Prelaminated BMG-Gracilis Flap. Delete Oral Mucosa Flap (Lingual) from urethral reconstruction. Make sure the sidebar reflects the organization of the urethral reconstruction database."

- **Vercel redirects added** (`vercel.json`): `posterior-urethroplasty-pfui` → `/special-populations/05a-trauma-emergencies/pfui`; `scrotal-dropback` → `/04e-genital-reconstruction/cecil-culp-procedure`; `prelaminated-bmg-gracilis` → `/foundations/surgical-principles/flaps/gracilis`; `oral-mucosa-flap` → `/foundations/surgical-principles/grafts/buccal-mucosa`. Plus the 5 redirects added with the 04ab promotion (above).
- **Sidebar reorganization for 04a urethral reconstruction**: sidebar order now mirrors the database 8-category structure — Anastomotic (2) → Graft (3) → Flap (4) → Combined (5) → Staged (6) → Posterior (7) → Distal/Meatal/Perineal (8) → Minimally Invasive (9) → Female (10). Two procedure files moved into the new `posterior/` folder (`core-through-urethrotomy.mdx` from anastomotic/; `bladder-neck-reconstruction.mdx` from meatal-perineal/). Two procedure files moved from `graft/` into `minimally-invasive/` (`liquid-minced-buccal.mdx`, `transmeatal-omg-ventral-inlay.mdx`).

### Videos added

- **MsANTA / Joshi Step**: video on [joshi-step-msanta.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/joshi-step-msanta.mdx) (commit `f66abf0`)
- **Ventral Onlay BMG**: video on [ventral-onlay-omg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/ventral-onlay-omg.mdx) (commit `1461c67`)
- **Dorsal Onlay BMG**: 2 videos on [dorsal-onlay-omg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/dorsal-onlay-omg.mdx) (commit `47cf442`)
- **Buccal Mucosa Graft**: video on [buccal-mucosa.mdx](docs/01-foundations/surgical-principles/grafts/buccal-mucosa.mdx) (commit `47cf442`)
- **Non-Transecting Bulbar**: video on [non-transecting-bulbar.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/non-transecting-bulbar.mdx) (commit `47cf442`)

### Editorial / convention guidance reaffirmed this session

- **Master Decision Framework column convention**: 4 columns (Clinical Scenario / First-Line / Alternative(s) / Avoid) for sex-or-anatomy-driven matrices; 4–5 columns for tier-driven matrices (e.g., First-Line / Second-Line / Recalcitrant). User explicitly preferred **no References column** in the framework table itself (decided when offered the option for the male urethroplasty table — answered "Keep as is").
- **Tabbed framework pattern**: when a single decision space splits cleanly into two cohorts (Male / Female; BNC / VUAS; Female-fistula / Male-fistula), wrap both matrices in `<Tabs>` / `<TabItem>` to mirror the existing database tabs below. The Male/Female urethroplasty framework was the originating example.
- **Universal principles consolidation**: when content applies across both sexes (e.g., universal fistula principles, transvaginal-vs-transabdominal cheat-sheets), house it on the **principles article** for that section and use a 1-line pointer from the landing-page tabs. Avoid duplicating principle-level content per tab.
- **Database "tier" / "category" / "domain" / "family" naming**: each landing chooses the badge-field name that fits its tradition — `tier` (BNR), `category` (SUI / OAB), `domain` (urethral, fistula, upper tract, prolapse), `family` (urinary diversion). All use the `badgeColors` map on the `GenericDatabase` component to color-code the column.
- **Slug stability when moving directories**: every page that lives in a moved folder should have an explicit `slug:` in frontmatter (or be covered by a Vercel redirect). Verify with `grep -rln "old-path"` before deleting / moving.
- **`onBrokenLinks: "throw"` is set** in `docusaurus.config.ts` — every move / delete must be followed by `npx docusaurus build --locale en` to verify no inbound links broke. Hot-reload won't catch missing pages.

---

## Previous handoff snapshot — April 27, 2026 (massive 04a urethral reconstruction buildout + 8-category reorg)

This was a sustained, single-day buildout of the male urethral reconstruction section. Twenty-plus stubbed technique pages were converted to comprehensive deep dives, two consolidations were executed (PFUI canonicalized in trauma; Cecil-Culp absorbs scrotal-dropback), the four non-transecting AAU variants were given dedicated pages, the searchable technique database was reorganized into a conceptual 8-category framework (male) and F1–F8 framework (female), and the `TechniqueDatabase` component was enhanced to support category grouping. **Session rule: commit and push after every change.**

### Anastomotic urethroplasty buildouts (all in `04a-urethral-reconstruction/anastomotic/`)

- [excision-primary-anastomosis.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/excision-primary-anastomosis.mdx) — 14-ref EPA deep dive with Eltahawy / Jordan 98.8%, SIU/ICUD pooled 93.8%, Horiguchi 97.1%, Siegel repeat-EPA 94/95/94%, Jasionowska SR. Then expanded with full **EPAPP (VanDyke 2021)** section: concept, full step-by-step operative technique with the **ventral corporal plication** detail (non-absorbable braided 2-0 Ethibond, inverted-mattress geometry, 15–20 mm spans, paired sutures one per corporal body in tandem until the urethral ends approximate, unilateral sutures for residual asymmetry only), 10-pt outcome series (8/10 asymptomatic at 9.7 mo), and patient-counseling points. Distinction from Peyronie's plication explicitly drawn (Peyronie's = convex tunical side; EPAPP = ventral, gap-bridging).
- [augmented-anastomotic.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/augmented-anastomotic.mdx) — 17-ref AAU article anchored on **Redmond / Rourke 2020 HR 4.8** transecting-AAU-vs-pure-dorsal-onlay recurrence signal. Floor / roof strip configurations, Augmented Russell / El-Kassaby variant, full ANTA / MsANTA / MANTA / ntAAU non-transecting evolution.
- [muscle-sparing-urethroplasty.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/muscle-sparing-urethroplasty.mdx) — 16-ref article on the **Barbagli 2008** muscle/nerve-sparing technique (between BS and ischiocavernosus access) and **Kulkarni one-sided dorsolateral** for long-segment / panurethral. Conflicting bulbospongiosus-sparing evidence (Elkady RCT positive; Fredrick/Vanni and Farias/Martins negative; **Theisen 728-pt cohort** challenging the BS-muscle-damage theory entirely). Furr dorsal-vs-anastomotic PVD/tethering pattern.
- [core-through-urethrotomy.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/core-through-urethrotomy.mdx) — 16-ref article on the Gupta/Gill 1986 endoscopic technique for obliterative posterior urethral strictures. Cold knife / Nd:YAG / Ho:YAG / thulium energy comparison; Koraitim 145-pt landmark; **Ravichandran RCT via Cochrane** 64% vs 24% reintervention at 2 yr; the **Koraitim genuine-stricture-vs-distraction-defect** framework that determines candidacy.

### Non-transecting variants — 4 new dedicated pages

Per user request, ANTA, MsANTA, MANTA, and ntAAU each got a dedicated page. The four pages were placed in `anastomotic/` (semantically correct; `manta.mdx` and `joshi-step-msanta.mdx` git-mv'd from `staged-complex/`).

- [anta.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/anta.mdx) — **Augmented Non-Transected Anastomotic** (Welk / Kodama 2012) — first non-transecting AAU; mucosectomy through preserved spongiosum + mucosal anastomosis + dorsal onlay BMG; 93% in 21-pt cohort with smaller graft (4.5 vs 5.0 cm, p = 0.047).
- [joshi-step-msanta.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/joshi-step-msanta.mdx) — **Mucosal-Sparing Augmented Non-Transected Anastomotic** (Joshi / Bandini / Kulkarni 2022) — most tissue-sparing variant; **both spongiosum AND mucosa preserved** (mucosa incised but not resected); preserves communicant vessels.
- [manta.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/manta.mdx) — **Mucomucosal Anastomotic Non-Transecting Augmentation** (Marks / Dahlem / Janisch 2023, Hamburg) — ventral approach, dorsal mucomucosal anastomosis at obliterative core (≤1.5 cm) + ventral onlay BMG; 93% functional success in 54-pt series at 41 mo; IIEF-EF preserved; 26% redo / 30% penobulbar.
- [ntaau.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/ntaau.mdx) — **Non-Transecting Augmented Anastomotic** (Baudry / Schirmann / Guillot-Tantay 2025) — most recent variant; obliterative bulbar &gt;2 cm; 90.5% anatomical / 83.3% functional success at 18 mo; IIEF-5 preserved (median 22).

**Important corrections** — the prior MANTA and MsANTA stubs both incorrectly described the techniques as "muscle-sparing" (a confusion with the bulbospongiosus-muscle-sparing technique). MANTA is **Mucomucosal Anastomotic Non-Transecting Augmentation**; MsANTA is **Mucosal-Sparing Augmented Non-Transected Anastomotic** — neither is about preserving the bulbospongiosus muscle.

### Non-transecting family connection / redundancy slim

After the 4 variant pages were built, redundant Chapman 2019 / Oszczudlowski 2023 / Scandinavian-RCT recitations were trimmed from each variant page; foundational evidence is now housed canonically in the [non-transecting-bulbar.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/non-transecting-bulbar.mdx) umbrella article. Variant pages retain only the variant-specific signal (Redmond / Rourke 2020 HR 4.8 for ANTA / MANTA / ntAAU) and link back to the umbrella for the broader framework.

**Database attribution fix** — the "Vessel-sparing EPA (ntEPA)" aka was incorrectly placed under the Andrich/Mundy 2012 ntBU entry; moved to the Jordan/Eltahawy/Virasoro 2007 entry where it belongs. Andrich/Mundy ntBU now carries "Non-transecting anastomotic urethroplasty" as the aka and is positioned as the umbrella article.

### Graft urethroplasty buildouts

- [dorsal-onlay-omg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/dorsal-onlay-omg.mdx) — 25-ref Barbagli 1996 deep dive. Kulkarni one-sided dorsolateral, Asopa dorsal inlay, why-buccal-mucosa biology, Berg 2024 GURS 66/34 dorsal-vs-ventral preference, Redmond / Rourke 2020 dorsal-onlay-superior-to-augmented-anastomotic data, Hassan 2025 dorsal-vs-ventral meta (RR 1.00 success / RR 0.24 transient ED favoring ventral), Sterling 2024 post-prostatectomy / radiation outcomes, Soave 2018 closure-vs-nonclosure RCT, Hoare 2021 GURS perioperative-practice survey, Patil 2021 pediatric.
- [ventral-onlay-omg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/ventral-onlay-omg.mdx) — 15 refs. Barbagli 2013 214-pt landmark with preoperative Qmax as the only significant predictor (OR 1.35); spongioplasty + Cordon pseudospongioplasty (80% vs 84% equivalence); Vasudeva 2015 RCT; Mousa 2025 proximal-bulbar in sexually active men favoring ventral; Hassan 2025 meta; **Mousa 2024 post-TURP bulbomembranous**; Berdondini 2024 female ventral onlay 98%; Gelman / Siegel combined dorsal+ventral 94%; the avoid-ventral-in-penile-urethra admonition.
- [asopa-dorsal-inlay-omg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/asopa-dorsal-inlay-omg.mdx) — 11 refs. Asopa 2001 inlay-vs-onlay distinction; Aldaqadossi 2014 RCT (128 vs 205 min OR time, 105 vs 228 mL EBL vs Barbagli, equivalent success); Pisapati 2009 87% / 11% fistula; Zumstein 2020 125-pt penile 70%; Mangera 2011 SR; **Wan 2023 LS comparison Asopa-vs-Kulkarni** favoring Asopa for RFS and meatal stenosis; Palminteri two-sided role; head-to-head Asopa-vs-Barbagli table.
- [sliding-t-dorsal-inlay.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/sliding-t-dorsal-inlay.mdx) — 14 refs on the **Hoare / Rourke 2021** single-stage glans-sparing fossa navicularis BMG technique (92.4% success in 27 pts, 70.4% LS, 96.3% satisfaction, 7.4% Clavien ≥2). 11-row comparison table of fossa navicularis approaches. **Calvo / Rourke 2024** LS HR 4.46 long-term-recurrence caveat. Corrected the prior stub which mistakenly described sliding-T as a local-tissue T-shaped glans flap; the actual technique is a BMG inlay.
- [transmeatal-omg-ventral-inlay.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/transmeatal-omg-ventral-inlay.mdx) — 10-ref **Nikolavsky** transmeatal ventral inlay deep dive. Sterling 2023 single-center 44-pt 95% at 36 mo + **Daneshvar 2020** 12-institution validation (n = 68, 95% at 17 mo). Full 4-step pull-through technique with triangular BMG delivered via 6-0 PDS suture pulled through ventral penile skin; quilting on ventral spongiosum; same-day discharge / 1-week catheter. **Tolbert 2025 TraMUS** extension to penile strictures.
- [enterourethroplasty.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/enterourethroplasty.mdx) — 24-ref article covering Mundy/Andrich full-thickness sigmoid, Xu colonic mucosal grafts (2009 36-pt 85.7% at 53.6 mo), modern minimally-invasive rectal-mucosa-graft evolution (Palmer TEM, **Granieri 2019 TURNS 13-pt 85%**, Howard/Zhao R-TAMIS, Ozgur single-port endorobotic), appendiceal interposition, Bales/Gottlieb jejunal free flap, Castellan 2012 **10.3% gastric-segment malignancy signal** that retired stomach from lower-tract reconstruction.
- [liquid-minced-buccal.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/liquid-minced-buccal.mdx) — 24-ref article. **Nikolavsky 2016** LBMG proof-of-concept (rabbit DVIU + minced BMG in fibrin glue, 100% Phase 2 engraftment); **Scott 2020** validation (8/12 vs 0/13 controls, p = 0.0005). TEOMG section on **Ram-Liebig 2017 MukoCell multicenter** (58.2% at 24 mo, experience-dependent), **Karapanos 2023** comparing TEOMG vs native BMG. Why-it-works section on the **Griffin 2025 GAS6-AXL** scarless-healing pathway. Future directions: extracellular vesicles, organoids.

### Flap urethroplasty buildouts

- [mcaninch-circular-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/flap/mcaninch-circular-flap.mdx) — 20 refs. McAninch 1993 origin, Buck's-fascia pedicle anatomy, McAninch / Morey 1998 87%-onlay-vs-42%-tubularized signal, **Whitson 2008 124-pt 84%/79% at 5/10 yr** with multivariate predictors (smoking HR 4.0, hypospadias HR 4.4, length 7-10 cm HR 7.0). Zhao 2026 modified-circular dorsally-split. **Three flap-vs-BMG RCTs** (Dubey, Hussein, Tyagi PeeBuSt, Alrefaey 2025). Karapanos 2024 preserved-spongiosum + dorsal BMG + Orandi flap combination. Bandini 2025 PSGU spiral-graft alternative.
- [orandi-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/flap/orandi-flap.mdx) — 20-ref Amin Orandi 1968 founding pedicled-flap technique. Dartos pedicle anatomy, classic 6-step ventral-onlay, **Barbagli / Kulkarni 2019 dorsal modification** (12 pts, 60-min OR, 0% fistula, 0% diverticulum). **Bhandari 2001** sacculation 29% (VO) vs 0% (DO), p = 0.01. **Greenwell / Mundy 1999** "gold standard for penile patch urethroplasty" claim. Karapanos 2024 combination, predictors-of-failure table, Mathur dyskeratosis-population indication. Corrected prior misattribution (Ahmad → Amin; 1970 → 1968 *Br J Urol*).
- [quartey-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/flap/quartey-flap.mdx) — 27 refs. Quartey 1983 transverse preputial island flap. SEPA anatomy (La Falce 2006). Bhandari 2001 dorsal-vs-ventral; Tijani 2009 100%-DO-vs-40%-tubularized in West African circumcised men; Srivastava 2012 60-pt TPIF DOF subset; Mathur 2014. Karapanos / Anadani / Erickson / Iselin combination evidence. Wang / Chen TPIF hypospadias literature (320-pt 15-yr, staged 102-pt). Bandini 2025 / Kulkarni 2023 PSGU as modern free-graft evolution.
- [turner-warwick-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/flap/turner-warwick-flap.mdx) — **renamed** from "Longitudinal Ventral Penile Flap" (a misattribution — that's the Orandi 1968 technique) to **"Two-Stage Scrotal Inlay Urethroplasty"** at slug `turner-warwick-scrotal-inlay`. 18-ref deep dive: Reid 1975 60-pt ~90%, Stage 1 marsupialization → Stage 2 tubularization technique, Olsson/Krane 1978 single-vs-multistage, Johanson-vs-Turner-Warwick contrast, scrotal-inlay limitations. Includes explicit Turner-Warwick-vs-Orandi distinction table to prevent the very misattribution that was on the previous page.
- [pedicled-prepucial-tube.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/flap/pedicled-prepucial-tube.mdx) — 27 refs. Quartey 1983 (adult-stricture origin) + Duckett 1980 (pediatric hypospadias TPIF). Full step-by-step tubularization on dartos pedicle. Central onlay-vs-tubularization message: tubularized repairs have 2-4× higher failure (40–58% vs 11–15%). Adult-stricture outcomes table anchored by Greenwell/Mundy 1999 verdict; hypospadias-literature outcomes table (Wang 2019 320-pt, Wiener 1997 12.2% vs 0% diverticula p = 0.016, Hayashi 2001 7.7% with two-layer + spongiosum wrap). **Cinman / McAninch 2012** acquired-diverticula long-term-consequence data.
- [single-stage-prepucial-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/flap/single-stage-prepucial-flap.mdx) — 29-ref umbrella covering all single-stage pedicled-preputial-flap configurations. **Srivastava 2012 144-pt single-institution series** anchor (DOF 90%/85%, TF 75%/85%, circumpenile DOF 93.3% in circumcised). Mathur 2014 predictors-of-failure (diabetes RR 5.21, smoking RR 4.19). Three RCTs comparing penile skin vs BMG (Dubey, Tyagi PeeBuSt, Alrefaey). **ICG-guided flap-perfusion innovation** — Paraboschi 2023 first ICG-guided preputial island flap; Zhang 2024 cutoffs ≥60% graft / ≥40% flap.

### PFUI consolidation + MRI expansion

- [pfui.mdx](docs/05-special-populations/05a-trauma-emergencies/pfui.mdx) is now the **canonical 37-reference PFUI page** spanning the full lifecycle (acute trauma → MRI workup → SPT-vs-PER → delayed reconstruction). Major MRI expansion: full MRI-vs-urethrography comparison table; **Pubourethral Stump Angle** validated by Horiguchi 2025 (n = 184, OR 0.95/degree, prior-TUR OR 2.77, AUC 0.782); Narumi 1993 cavernous-avulsion + lateral-prostatic-displacement → 95% permanent-impotence prediction; Koraitim 2013 ED multivariate predictors (diastasis OR 15.9, lateral displacement OR 6.9, gap OR 2.0); Koraitim/Reda 2007 86%/89% accuracy data; comparison table of Horiguchi PUA / Koraitim Gapometry / Yepes PUS / Scherñuk 2026 prediction systems. **MRI-integrated surgical decision algorithm** mapping MRI findings → predicted Webster step. Detailed Webster step-by-step. **Sa / Xu 2021 1,637-pt progressive transperineal series** (92.4% success, 1.6% de novo ED). Pratap 2006 abdominoperineal technique. Xu 2010 + Guo 2017 URF management with gracilis interposition. Zhang/Zhao 2023 105-pt robotic + Liu/Zhao single-port. Pediatric (Zhang 2006, Wang 2020). The treatment-atlas page [posterior-urethroplasty-pfui.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/posterior-urethroplasty-pfui.mdx) is now a brief redirect-style stub pointing to the canonical trauma article.

### Cecil-Culp / scrotal-dropback consolidation

- [scrotal-dropback.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/scrotal-dropback.mdx) is now a redirect-style stub.
- [cecil-culp-procedure.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/cecil-culp-procedure.mdx) acknowledges the scrotal-dropback / scrotal-inlay alias in the header, with new Pierce 1979 + Kinnaird 2019 Turner-Warwick scrotal-drop-back references covering related lineages.
- Urethral-reconstruction database entry renamed to "Cecil-Culp Procedure (Scrotal Dropback)" and points to the canonical genital-reconstruction page.

### Gracilis BMG urethroplasty consolidation

- [gracilis.mdx](docs/01-foundations/surgical-principles/flaps/gracilis.mdx) expanded with 7 new refs (now 62 total): full **Vanni / Zinman technique** details and **Rozanski 2020 30-pt 20-year update** (76.7% success, 60% radiation, 23.3% AUS rate); rewrote **Prelaminated BMG section** with explicit Stage 1 / Stage 2 description (replacing stale ref17 mismatch with proper Nikolavsky 2015 + Zinman 2002 refs); **Beckenstein 1996** muscle-flap-alone urethral regeneration; expanded RUF table with **Vanni 2010** (100% non-radiated / 84% radiated, 97% bowel undiverted), **Park 2022** comparative gracilis-vs-no-flap (92% vs 50%, p = 0.009), **Garoufalia 2023** 658-pt meta (79.4% weighted, 16.7% recurrence).
- Standalone [prelaminated-bmg-gracilis.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/prelaminated-bmg-gracilis.mdx) is now a brief redirect to the canonical gracilis-flap section.

### Sidebar reorganization

- **Principles of Urethral Reconstruction** now sits above Anastomotic Urethroplasty in the urethral-reconstruction sidebar. Cascaded category positions: anastomotic 1→2, graft 2→3, flap 3→4, staged-complex 4→5, female 5→6, meatal-perineal 6→7, minimally-invasive 7→8.

### TechniqueDatabase — 8-category framework

The searchable technique database on the urethral-reconstruction landing page now groups techniques by conceptual category. The component was enhanced ([TechniqueDatabase.tsx](src/components/TechniqueDatabase.tsx)) to support an optional `category` field; when present, rows are grouped under ordered section headers and a **category filter dropdown** is added to controls. Search, location filter, and the "X of Y techniques" count work across all groups.

**Male techniques (51 total) — 8 categories:**

1. **Anastomotic (no substitute tissue)** — EPA, ntEPA / non-transecting bulbar, Jordan VS-EPA, AAU, ANTA, MsANTA / Joshi Step, MANTA, ntAAU, muscle-sparing
2. **Substitution — Free Grafts** — dorsal/ventral/inlay BMG, Kulkarni dorsolateral, sliding-T, glanuloplasty, penile/preputial graft, PSGU, lingual mucosa, TEOMG, enterourethroplasty
3. **Substitution — Pedicled Flaps** — Orandi, Quartey, McAninch, single-stage preputial DOF, preputial tube, propeller, Singapore, lotus petal, Y-V glans
4. **Combined (Graft + Flap)** — Erickson dorsal BMG + ventral flap, Karapanos dorsal BMG + ventral Orandi, Vanni / Zinman ventral BMG + gracilis, prelaminated BMG-gracilis
5. **Staged Urethroplasty** — Johanson, Kulkarni 2-stage, Turner-Warwick scrotal inlay, Cecil-Culp scrotal dropback
6. **Posterior Urethroplasty (PFUI)** — Webster perineal, abdominoperineal transpubic, robotic, core-through, BNR
7. **Distal / Meatal / Perineal Urethrostomy** — meatotomy, fasciocutaneous ventral penile transverse island, penile skin fossa, Blandy PU, 7-flap PU
8. **Minimally Invasive / Emerging** — DVIU, Optilume DCB, transmeatal OMG ventral inlay (Nikolavsky), endoscopic suturing-device, liquid/minced BMG, ICG perfusion

**Female techniques (27 total) — F1–F8 categories:**

- **F1.** Endoscopic / Minimally Invasive — dilation, DVIU
- **F2.** Distal Urethrectomy + Meatal Advancement
- **F3.** Flap Urethroplasty — Blandy U-flap, Romero-Maroto lateral-based vaginal wall flap, Önol AVW mucosal inlay, dorsal vaginal flap, labia minora, Martius interposition, bladder wall flap (Patidar)
- **F4.** Free Graft Urethroplasty — dorsal onlay BMG, ventral onlay BMG (Berdondini 2024), **ventral inlay BMG (Mandal 2025 RCT)**, **dorsal labial mucosal graft (Jena 2025, 204-pt 93.5%)**, vaginal free graft, lingual mucosa, circular BMG
- **F5.** Combined / Hybrid — BMG + Martius, vaginal flap + BMG, staged BMG
- **F6.** Urethral Loss / Obliteration — primary end-to-end, vaginal wall tubularization, tubularized bladder flap
- **F7.** Emerging / Investigational — tissue-engineered grafts / bioscaffolds
- **F8.** Other Female Reconstructive Procedures — diverticulum repair, prolapse repair, female BNR

`CATEGORY_ORDER` in `TechniqueDatabase.tsx` includes both male (1–8) and female (F1–F8) strings; each tab automatically renders only the categories present in its own data array.

### Editorial conventions reinforced this session

- **Bleed-through references** must be filtered before publication. Assistant-generated content frequently arrives with refs from unrelated articles. Always check that every cited ref is actually used in body and renumber sequentially.
- **Trailing chatbot follow-up questions** ("Would you like to explore...") must be stripped.
- **"Figure N / undefined" placeholder blocks** must be removed per WARWIKI convention.
- **Swallowed `<` artifacts** ("p [N]" / "&lt;X cm" / "p ≤ 0.001") must be reconstructed with explicit comparators.
- **Mashed tables** (no whitespace between cells) must be rebuilt as proper markdown.
- **Eponym attribution** matters — corrected several bad attributions: Pedicled Preputial Tube was wrongly attributed to Hodgson 1970 (correct: Quartey 1983 / Duckett 1980); Orandi was wrongly attributed to "Ahmad Orandi 1970" (correct: Amin Orandi 1968 *Br J Urol*); Turner-Warwick "Longitudinal Ventral Penile Flap" was a misnomer (the longitudinal ventral penile flap is Orandi 1968; Turner-Warwick's actual eponymous technique is the two-stage scrotal inlay urethroplasty); MANTA / MsANTA prior stubs both erroneously described them as "muscle-sparing" (MANTA = Mucomucosal Anastomotic Non-Transecting Augmentation; MsANTA = Mucosal-Sparing Augmented Non-Transected Anastomotic — neither preserves the bulbospongiosus muscle).

---

## Previous handoff snapshot — April 26, 2026 (ntBU + Jordan VS-EPA fill)

Two anastomotic urethroplasty technique pages built out from stub in `04a-urethral-reconstruction/anastomotic/`. Session rule: **commit and push after every change**.

### Technique fills

- [non-transecting-bulbar.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/non-transecting-bulbar.mdx) — stub → 17-ref article. Opening paragraph establishes ntBU as achieving 90–98% stricture-free rates equivalent to transecting EPA while significantly reducing penile complications (RR 0.47) and likely erectile dysfunction. Sections: historical development (Jordan 2007 concept; Andrich/Mundy 2012 formal series); indications (≤3 cm bulbar and posterior strictures); step-by-step dorsal approach (180° rotation, mucosectomy, spatulated anastomosis, spongioplasty) and ventral approach (Morán / Bogdanov: Heineke–Mikulicz closure without circumferential mobilization); augmented non-transecting variants table (ANTA / MANTA / ntAAU with Welk, Marks, and Baudry outcome data); outcomes section with stricture-free rates, sexual function comparative data (Chapman 2019 4.3% vs. 14.3%, Scandinavian RCT penile shortening), and perioperative comparison table; predictors; practice trends (Berg 2024 GURS survey).

- [jordan-vessel-sparing-epa.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/jordan-vessel-sparing-epa.mdx) — stub → 17-ref article. Frame: the 2007 Jordan/Eltahawy/Virasoro paradigm shift showing spongiosal transection is unnecessary for mucosal excision. Anatomical rationale (internal pudendal → bulbar → urethral artery chain; Chiou 1998 and Kishore 2005 Doppler data showing urethral arteries are NOT reliably at 3/9 o'clock — supports whole-shell preservation over selective identification); 7-step technique (mobilization, 180° rotation, dorsal urethrotomy, mucosectomy, spatulated anastomosis, spongioplasty, 9–14 day catheter); outcomes table with original Jordan 10-pt series and Virasoro 2015 68-pt multi-institutional validation (95.6% success); Verla/Lumen 117-pt series (93.4% bulbar, 88.5% posterior); Chapman 2019 comparative data; limitations (dense spongiofibrosis conversion risk, no direct RCT vs. tEPA); evolution/legacy section tracing Andrich/Mundy → ANTA → MsANTA → MANTA → ventral approach, closed with Cotter 2019 +430% adoption increase.

### Editorial cleanups applied (same conventions as prior sessions)

- UTF-8 mojibake fixed throughout (–, °, ≤, ≥, é, á, →, etc.)
- Empty figure placeholders and comparison table shells removed
- Trailing chatbot follow-up questions stripped
- `&lt;` escaping applied to all `<` before letters/digits in prose

---

## Previous handoff snapshot — April 26, 2026 (RAT + Botox + Müllerian + PDUS + GAS refresh + 03g rename)

This session knocked out the most actionable stubs and curriculum gaps from the audit, refreshed the entire GAS family, and reorganized the genital section.

### Stub fills

- [renal-autotransplantation.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/renal-autotransplantation.mdx) — 9-line stub → 23-ref article framing RAT as the upper-tract salvage tier. Indications (renovascular, ureteral stricture / trauma 79% modern indication, LPHS pain-resolution 65–76%, RCC, UTUC, nutcracker, stones), three-phase technique (nephrectomy → ex vivo bench → ipsilateral iliac fossa autotransplant), Kaouk single-port robotic SP series, outcomes table (90–97% long-term graft function, 9.7–10.7% failure, 0–1.3% mortality), complications, multidisciplinary framework. Cross-links to ileal ureter, Boari/psoas hitch, UU, ureteral stricture.
- [intradetrusor-botox.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx) — 8-line stub → 37-ref article positioned as the procedural counterpart to the [botulinum-toxin pharmacology hub](docs/01-foundations/pharmacology/neuromodulation-adjuncts/botulinum-toxin.mdx). Dual efferent / afferent mechanism, dosing table (OAB 100 U, NDO 200 U adults + pediatric ≥ 5), pivotal NDO 2011 (Ginsberg / Cruz) and OAB 2013 (Nitti) RCTs, injection technique, retreatment cadence, third-line comparison vs SNM and PTNS (Roman 2025 / Lo 2020 / Chughtai 2020 cost data $2,896 vs $15,343), off-label IC/BPS and DSD, antithrombotic safety (El Issaoui / Mensah), Brin 2023 29-yr pregnancy registry.

### Curriculum-gap fills

- [mullerian-anomalies.mdx](docs/03-clinical-conditions/03g-genital-scrotal/mullerian-anomalies.mdx) — closes URPS curriculum gap IX. 37-ref article on ASRM MAC2021 classification, MRKH (1:5,000, Type I/II + MURCS, 53% associated anomalies, HNF1B / LHX1 / WNT4 / PAX2 genetics), ACOG dilation-first management (Frank vs coital, 90–96% success), and McIndoe / Davydov / Vecchietti / sigmoid colpoplasty head-to-head with Martens 2024 SR/meta and Yinuo 2025 peritoneal-vs-sigmoid comparative study. ISUTx 2024 registry (91 transplants, 44 live births, 30.3% LBR per ET) and Kölle neovagina-method-vs-future-UTx framing.
- [penile-doppler-ultrasound.mdx](docs/02-evaluation/imaging/penile-doppler-ultrasound.mdx) — new article under **Evaluation › Imaging** at sidebar_position 4.5. 41-ref deep-dive: PDUS technique with ICI vasoactive protocols (alprostadil / Trimix / papaverine), normative PSV / EDV / RI / acceleration time / cavernosal artery diameter thresholds, Pagano sampling-location problem (PSV ~53 cm/s at crura vs ~22 cm/s at mid-shaft), diagnostic categories for arteriogenic / venogenic / mixed / psychogenic ED, Chen 2019 venous-leak diagnostic accuracy (sens 91.7%, spec 70.6%), PDUS in Peyronie disease (Masterson questionnaire-vs-Doppler discordance), priapism subtypes with the STIFF protocol, penile fracture per AUA Urotrauma 2020, and the four-phase DICC technique (EIP, FTM, pressure decay, cavernosography) with the Mulhall normal-cavernosogram-despite-abnormal-FTM caveat.

### GAS refresh — all 5 pages

Full rewrite of the gender-affirming surgery family in the established footnote-citation style:

- [overview.mdx](docs/05-special-populations/05c-gender-affirming/overview.mdx) — 10 refs; NSQIP-anchored complication framework, Pletta 2025 access-barrier data (94% encounter at least one barrier), Park 40-yr follow-up.
- [feminizing-procedures.mdx](docs/05-special-populations/05c-gender-affirming/feminizing-procedures.mdx) — 32 refs; breast augmentation (Coon 2020, Liu 2024 SR/meta), penile-inversion vs peritoneal pull-through vs sigmoid technique split, Haley 2025 prospective QoL data, FFS by facial third with Morrison QoL data, Wendler glottoplasty vs feminization laryngoplasty effect sizes, perioperative-estrogen continuation per WPATH SOC 8.
- [masculinizing-procedures.mdx](docs/05-special-populations/05c-gender-affirming/masculinizing-procedures.mdx) — 39 refs; DIFNG vs PAT vs PNT trade-off, Bordas 813-pt metoidioplasty series, RFFF vs ALT vs MLD vs pedicled abdominal flap-table with Wang 2026 complication-by-flap data, Big Ben method 27% urologic complication rate, Fraiman 2024 penile-prosthesis meta and Levy 2025 ZSI cohort, HBSO route + bone-health framing, Robinson 2023 testosterone-continuation evidence, Ren 2024 / Thornton 2024 0.8% transmasculine regret data.
- [revision-salvage-gas.mdx](docs/05-special-populations/05c-gender-affirming/revision-salvage-gas.mdx) — 38 refs; vulvar revision categories, robotic peritoneal-flap and sigmoid revision for stenosis, rectoneovaginal-fistula management algorithm, urethral complications driving 73% phalloplasty revision burden, colpectomy reduces fistula 48%→21%, Keller 2024 algorithmic framework for salvage-vs-redo, Rochlin 2022 secondary FFS data.
- [non-binary-nullification.mdx](docs/05-special-populations/05c-gender-affirming/non-binary-nullification.mdx) — 23 refs; nonbinary chest-surgery preferences with Esmonde primer, Stelmar / van der Sluis / Aaen shallow-depth vulvoplasty, Ascha 2024 individually-customized procedures (genital nullification, phallus-preserving vaginoplasty), shaft-only phalloplasty with vaginal preservation (Chen, Moorefield), isolated gonadectomy, WPATH SOC 8 broadened nonbinary language and insurance-concordance gaps.

### 03g restructure

- **Renamed `03g` from "Genital & Scrotal Disorders" → "Disorders of Genitalia"** in [_category_.json](docs/03-clinical-conditions/03g-genital-scrotal/_category_.json) and the [03-clinical-conditions landing](docs/03-clinical-conditions/index.mdx). The folder slug `03g-genital-scrotal/` and individual file slugs were preserved to avoid breaking the dozens of inbound cross-links.
- **Moved Müllerian Anomalies & Vaginal Agenesis from Women's Health → 03g Disorders of Genitalia** via `git mv`. The "Congenital & Reconstructive Gynecology" subsection was removed from the Women's Health landing and replaced with a one-line pointer paragraph; the GAS overview cross-link was repointed.

### Editorial cleanups (consistent across all pasted content this session)

- Bracketed `[N]` inline citations converted to either `<sup>[[N]](#refN)</sup>` or `[^N]` footnote style depending on the file's existing convention (GAS uses footnotes; everything else uses anchored sup).
- Bleed-through references stripped before renumbering (renal-autotransplant refs in PDUS / botox content; SCI / autonomic-dysreflexia refs in Müllerian; uncited book chapters dropped).
- Mashed tables (no whitespace between cells) rebuilt as proper markdown — affected dosing tables, eligibility/timing summaries, flap-comparison tables, normal-values tables, advanced-imaging tables, surgical-technique comparison tables.
- Recovered swallowed `<` artifacts throughout — every `(p[N]` / `(p0.001)` / threshold like `EDV [13]` reconstructed with explicit comparators (`p &lt; 0.001`, `&lt; 5 cm/s`, etc.).
- Stripped all OpenEvidence rare-disease promo links (`https://www.openevidence.com/rare-disease/...`) — kept the medical terms inline as plain text.
- Removed all `Figure N / undefined` placeholder blocks (gender-affirming surgery options figure, embryology figure, ischemic-vs-non-ischemic priapism Doppler figure, DICC setup figure, received-vs-desired surgeries figure).
- Stripped trailing chatbot follow-up questions ("Would you like to explore...?") from every pasted block.
- "DaVinci" → "da Vinci" per WARWIKI convention.
- Added cross-links to existing canonical pages (radial-forearm / ALT / peritoneal flaps, buccal mucosa graft, pelvic floor PT, GAH pharmacology hub, single-port robotics, Z-plasty, ileal ureter, Boari/psoas hitch, etc.) rather than duplicating content.

### Homepage counter

- Stats counter softened in [src/pages/index.module.css](src/pages/index.module.css): back to body-text size (0.95rem from 1.5rem), weight 600 from 800, label weight 400 from 600 with muted color, 0.7 opacity on the whole element so the counter sits behind the search pill rather than competing with it.
- [scripts/gen-stats.js](scripts/gen-stats.js) now emits `articlesRounded` (floor to nearest 50) alongside `referencesRounded` (floor to nearest 100); homepage displays as **600+ articles · 6,300+ references** with `+` suffixes for honest understatement.

---

## Previous handoff snapshot — April 26, 2026 (scrotal lymphedema + hidradenitis suppurativa fill)

### 03g-genital-scrotal fill (latest)

Two clinical-conditions articles converted from stub to depth:

- [scrotal-lymphedema.mdx](docs/03-clinical-conditions/03g-genital-scrotal/scrotal-lymphedema.mdx) — 24-reference article. Primary (congenital, 92% of pediatric cases, 24% familial) vs secondary (filariasis / cancer treatment / MLL-obesity / Crohn's ano-genital granulomatosis / HS / radiation) classification. Pathophysiology cascade (stasis → inflammation → fibrosis → lymphangiectasia; filariasis vicious cycle). Clinical presentation (72–80% combined penoscrotal, 76% concurrent lower-extremity lymphedema in pediatric series). Complications: cellulitis OR 6.8, stage III vs II doubling (61.7% vs 31.8%), Stewart–Treves angiosarcoma risk. Diagnosis table (lymphoscintigraphy, MR lymphangiography, ICG, biopsy, filarial antigen). Management: CDT first-line; surgical ladder table — Charles excision, LVA, VLNT, CHASCIP (Ciudad 2025); Guiotto 2019 SR anchor (9% microsurgical vs 54.2% excisional complication rates); Torio-Padron 2015 integrated CDT + surgery concept; median GBI +41 (Abdelfattah 2023). No recurrence at 34–49 months in combined excisional + lymphatic reconstruction series.

- [hidradenitis-suppurativa.mdx](docs/03-clinical-conditions/03g-genital-scrotal/hidradenitis-suppurativa.mdx) — 22-reference article framed for the reconstructive urologist/urogynecologist. Epidemiology (1% prevalence, 3:1 female, 10-year diagnostic delay), Hurley staging table (I–III), genitoperineal anatomy of involvement. Urologic complications table: urethrocutaneous fistula, urethral stricture, phimosis, genital lymphedema, adalimumab GU infection risk (IRR 2.22; Wafae 2025 JAMA Dermatol). Urogynecologic considerations: vulvoperineal misdiagnosis patterns, 67% sexual dysfunction rate (Matusiak 2020), PCOS &gt;3× risk, perimenstrual flares, pregnancy medication selection. Malignant transformation table: SCC arising in chronic HS (gluteal 47.5%, perianal 18.9%, genital 13.9%), ~25-year latency, 54% metastasis rate, 59% mortality, up to 4.6% in severe groin/perianal disease; **danger admonition: biopsy any refractory lesion**. Surgical management: wide excision + 1 cm margins; Fuchs 2026 two-stage excision → NPWT → STSG (&gt;90% graft take, no recurrence at ~19 months). Medical management table: adalimumab, secukinumab (SUNSHINE/SUNRISE RCT, Kimball 2023), bimekizumab; JAK inhibitors under investigation.

---

## Previous handoff snapshot — April 26, 2026 (fistula buildout + flap-foundations sweep + osteoporosis screening)

### Osteoporosis Screening fill (latest)

- [osteoporosis-screening.mdx](docs/05-special-populations/05e-womens-health/osteoporosis-screening.mdx) — filled from stub to 7-reference article. Framed for the reconstructive urology / urogyn audience: GnRH agonist bone-loss admonition (leuprolide reduces lumbar BMD 4–8% in 6 months), aromatase-inhibitor monitoring, chronic-glucocorticoid (IC/BPS Hunner) DXA protocol, and vertebral-fracture / pelvic-floor-biomechanics tie-in. Anchored on Walker & Shane NEJM 2023 and USPSTF 2025 Grade B recommendation. Covers: universal ≥65 threshold, two-step FRAX approach for &lt;65, T score −2.5 diagnosis, FRAX treatment thresholds (3% hip / 20% major), high vs very high risk stratification, antiresorptive vs anabolic first-line, rescreening interval table by T-score band, four-society comparison table (USPSTF / ACOG / ACR / BHOF).

---

This long session split into two big arcs.

### Arc 1 — `03f-fistulas` clinical-conditions buildout

Filled six fistula pages from stub to depth, plus polished the two atlas databases that surface them:

- [pyeloenteric.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/pyeloenteric.mdx) — 12 refs; pyeloduodenal right-sided predominance, etiology, evaluation, nephrectomy-with-closure as standard.
- [nephropleural.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/nephropleural.mdx) — 9 refs; urinothorax anchored on the **pleural-creatinine / serum-creatinine > 1** diagnostic, supracostal-PCNL pleural injury data, diversion-plus-drainage management.
- [ureterocolonic.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/ureterocolonic.mdx) — 20 refs; left-ureter / sigmoid 75% predominance, spontaneous (calculi, diverticulitis) vs iatrogenic (colorectal / gynecologic surgery, anastomotic leak, ESWL, radiation), CT-urography-as-gold-standard, PCN+stent vs Boari/psoas-hitch ladder, Shackley three-stage, ASCRS / WSES prevention.
- [colovesical-small-bowel.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/colovesical-small-bowel.mdx) — 21 refs in two parts. **Part 1 CVF** anchors on diverticular-disease 41–75% / colorectal cancer ~16% with the Najjar missed-malignancy caveat, full triad-frequency table, **poppy-seed test** 94.6–100% sensitivity (beats CT), Froiio meta on one-stage resection + primary anastomosis (Clavien ≥ 3 7.4%, mortality 1.5%, recurrence 0.5%), Ferguson 68% Foley-only bladder management, Sassun robotic 1.1% conversion. **Part 2 ileovesical** is Crohn's-dominated (~80%), 27-yr mean age, anti-TNF-first management (Kaimakliotis 57.1% complete response; Lightner ASCRS / Lichtenstein ACG; Zhang 35.1% long-term remission for isolated ileovesical). Plus a CVF-vs-ileovesical comparison table.
- [vesicocutaneous.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/vesicocutaneous.mdx) — 29 refs across pelvic-fracture trauma, iatrogenic post-surgical / suprapubic catheter, inguinoscrotal hernia, radiation (post-RT-biopsy OR 5.27, modern image-guided brachytherapy ~0.7%), neurogenic bladder (Raup 21-pt with 81% requiring permanent diversion), infection / inflammatory, and malignancy (sunitinib anti-angiogenic case). Five persistence factors plus radiation ischemia. Fistulectomy + primary closure → tissue interposition (omental, muscle, free flaps including Ludolph bipedicled latissimus + serratus) → Bockrath muscle-and-fascial-coverage rule for post-traumatic suprapubic VCF, McKay transurethral suture cystorrhaphy. Subsections for neurogenic-bladder VCF and radiation-induced VCF (Zhang 75% surgical failure in irradiated tissue vs 10.8%, p = 0.012).
- [post-kidney-transplant.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/post-kidney-transplant.mdx) — 34 refs; watershed-distal-ureter pathophysiology (single hilar arterial supply); 1.1–8.9% incidence with 76.7% from distal ischemic necrosis (Karam); 6-day mean onset; risk factors (DGF, donor age, renal-artery multiplicity, CMV/BK histology). Lich-Gregoir vs Leadbetter-Politano vs UU table with Alberts meta (RR 0.47 leak for Lich-Gregoir). Stenting evidence (Cochrane 2024 RR 0.30, NSQIP 3,407-pt propensity matched no-MUC-difference signal, UTI trade-off RR 1.41). Ladder from Foley + PCN through redo UNC, native-ureter UU, Boari/psoas-hitch, pyelovesicostomy, Ye pedicled-omentum-graft for recurrent fistulae (100% success), ureteroenterostomy, NPWT, transplant nephrectomy. Lucignani EAU-YAU reconstructive-vs-palliative (86.7% definitive vs eGFR degradation on permanent stenting).
- [vascular-urinary.mdx](docs/03-clinical-conditions/03f-fistulas/in-both-genders/vascular-urinary.mdx) — 29 refs in two parts. **Part 1 AUF** ("wolf in sheep's clothing"): chronic-stent + pelvic-cancer + radiation risk-factor stack, herald-bleed-to-massive-hemorrhage pattern with 42% bleeding-at-stent-exchange, conventional angiography 58–66% / provocative 100% / CT 33–36%, endovascular stent-graft as first-line (mortality 19% pre-2000 → 7% post-2000), ileal-conduit infection caveat 14.3%, indications for open repair. **Part 2 renal AVF**: congenital (cirsoid / angiomatous / aneurysmal) vs acquired (post-biopsy 14.4%, 95% asymptomatic, 46.6% spontaneous closure within 30 days), TAE first-line (technical 100%, clinical 88–100%).

Atlas database polish:

- Linked all bulking agents in [urethral-bulking-agents.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/urethral-bulking-agents.mdx) to canonical biomaterials pages.
- Linked Duloxetine in the female SUI database to the canonical [SNRIs hub](docs/01-foundations/pharmacology/neuropathic-pelvic-pain/snris.mdx).
- In [04h-fistula-repair/index.mdx](docs/04-surgical-techniques/04h-fistula-repair/index.mdx): added **Endorectal Advancement Flap** and **Turnbull–Cutait pull-through** as male-table entries; spelled out abbreviations (RUF → Rectourethral Fistula, etc.) and updated badge color map.

### Arc 2 — Local-flap and free-flap foundations sweep

Built out / augmented the entire `01-foundations/surgical-principles/flaps/` family with consistent structure, comparison tables, and cross-links. Two main themes: **(a) the geometric local-tissue-rearrangement quartet+** got new dedicated pages; **(b) every named GU reconstructive flap** now has a comprehensive deep dive.

#### Geometric local-tissue-rearrangement framework (new pages)

- **[Y-V plasty](docs/01-foundations/surgical-principles/flaps/y-v-plasty.mdx)** — expanded from BNC-only into cross-organ deep dive with Y-V vs V-Y directional table, van Niekerk-Taggart math (gain = (l × x) / a), plastic-surgery applications (running Y-V, opposite-running Y-V for axillary), urology applications (BNC / VUAS, **Foley Y-V pyeloplasty** for UPJO with Szydełko 86–97% success and the small-intrarenal-pelvis indication, **Y-V meatoplasty** with Sennert 96.5%, **Y-V glanuloplasty** for distal hypospadias). 22 refs.
- **[V-Y advancement](docs/01-foundations/surgical-principles/flaps/v-y-advancement.mdx)** — new page; advances tissue into a defect. Knoll suprapubic V-Y (3.5–6.5 cm length gain in penile-fibrosis IPP), Shaeer half-skin-half-fat V-Y, Alexander ventral V-plasty for congenital megaprepuce, Fournier's reconstruction (El-Khatib pudendal-thigh, Alammar 2026 SR 1.6% flap loss in 619 patients, Myers gluteal V-Y bilateral 100% survival), three-donor-site framework for vulvar reconstruction (pubolabial / medial-thigh stepladder Saito / gluteal-fold Lee), Sakamoto interrupted V-Y, Jaiswal pentagonal-gluteal V-Y after APR (110-pt 2.7% partial necrosis), Lenoir episiotomy-dehiscence V-Y. 27 refs.
- **[Z-plasty](docs/01-foundations/surgical-principles/flaps/z-plasty.mdx)** — new page; reorients scar by up to 90°. Angle-vs-lengthening table; explicit Z-vs-Y-V-vs-V-Y decision rule. Álvarez Vega 2025 100-case pediatric genital reconstruction series (98% primary healing, 97% stable at ≥ 1 yr). Stewart foreskin Z-plasty preputioplasty (82% circumcision avoidance), Dockray frenuloplasty (8.9/10 satisfaction). **Garcia/Grünberger Z-plasty for transverse vaginal septum** (ACOG-recommended, 100% functioning vagina). Frappell "Plymouth Procedure" (double-opposing Z-plasty + V-Y for posterior-fourchette dyspareunia). 23 refs.
- **[Rhomboid (Limberg)](docs/01-foundations/surgical-principles/flaps/rhomboid-limberg.mdx)** — new page; 60° / 120° rhombus, line-of-maximal-extensibility flap selection, Rajabi finite-element data showing rhombic-toward-Z optimization reduces peak von Mises stress 43% vs Limberg / 53% vs Dufourmentel. Pilonidal-disease evidence anchor (Bi network meta lowest recurrence, Stauffer 0.6%/1.8% at 12/24 mo). Höckel-Dornhöfer recommendation for anterior/posterior commissure and peripheral vulvar defects; Tock 2019 head-to-head showing V-Y wins for larger defects while rhomboid keeps small-defect niche. 23 refs.
- **[Bilobed flap](docs/01-foundations/surgical-principles/flaps/bilobed.mdx)** — new page; double-transposition relay around a shared pivot (Zitelli 90–100° arc). Pelster mathematical analysis showing pivot location is the master variable. Vyas-Pomahac bilobed gracilis (transverse primary + vertical secondary) for hostile-abdomen post-APR / Fournier's; Yun bilobed PAP flap (15 patients, 100% survival, urogenital + anal triangle); Jandali bilateral bilobed flaps for fourth-degree obstetric cloacal-like defects; butterfly bilateral scrotal flaps. 15 refs.
- **[Propeller flap](docs/01-foundations/surgical-principles/flaps/propeller-flap.mdx)** — new general-principle page (sits above the existing PMTP variant). Tokyo Consensus 2009 definition; Han *Eur Urol* 2018 IPAP gluteal-fold propeller for aesthetic penoscrotal resurfacing (10-pt, 100% satisfaction); Schulster posterior-thigh propeller for **perineal-urethrostomy revision**; Hashimoto 71-IPAP / 45-pt 94.4% survival; Toulouse Algorithm and Han 2023 vulvo-thigh-junctional-crease 12.9% vs 37.5% complication split; lotus-petal as a propeller variant; venous-congestion mitigation (Chaput supercharging 36.7% → 6.7%, Pérez local LMWH salvage, optimal flap-design parameters). 28 refs.
- **[Lotus petal flap](docs/01-foundations/surgical-principles/flaps/lotus-petal.mdx)** — new page disambiguating from the medial-thigh Singapore flap. Yii-Niranjan 1996 gluteal-fold IPA-perforator origin. Hashimoto / Giroux / Jin perforator anatomy. Four design variants (classic, Warrier-thinned, Bodin supra-fascial, tunneled, IPAT). Hellinga 137-flap complications (51.7% Clavien I–II, 18.3% IIIb, **0% total flap loss**); Confalonieri 234-vs-128 V-Y comparison favoring tunneled lotus; Negosanti IA / IB / II algorithm with LPF as first-line for vulvar-only defects; Hellinga ELAPE with neovagina creation; Payne male-scrotal Fournier's; Nassar IPAT 38-pt with 37/38 fully healed. Singapore-vs-lotus-petal admonition added to the Singapore page. 21 refs.

#### Comprehensive flap deep-dives (filled / augmented)

- **[Pedicled penile / preputial skin flap](docs/01-foundations/surgical-principles/flaps/penile-preputial.mdx)** — 33 refs; Grossman 1989 cadaveric vascular study, Lohasammakul IEPA 0.94 mm anastomosis; seven configurations (TPIF, longitudinal/oblique, double-face, Orandi, McAninch circular, circumpenile, dartos); AUA 2023 Moderate Recommendation Grade C; three head-to-head RCTs (Dubey, PeeBuSt, Alrefaey) with the SGUR 99% BMG-preference signal; Wiener / Ghali / Wang hypospadias; Liang dartos waterproofing; Saylor / Wylie penile skin inversion vaginoplasty; Savanelli CAH feminizing genitoplasty.
- **[Radial forearm free flap](docs/01-foundations/surgical-principles/flaps/radial-forearm.mdx)** — 44 refs; watershed pedicle anatomy with ≥ 2-vein rule; Allen test debate; Chang-Hwang vs Gottlieb-Levine designs; Garaffa 2010 UCL 115-pt landmark (97% survival, 99% standing-tip-voiding); Netshiongolwe 2025 769-pt SR ("RFFF most reliable; pALT secondary"); Wang 2026 counterpoint (80% complication rate); Ma 2011 / Küenzlen 2020 / Hu 2024 sensory data; Pang 2025 IPP SR; Falcone Integra-vs-FTSG donor-site superiority.
- **[Anterolateral thigh (ALT)](docs/01-foundations/surgical-principles/flaps/anterolateral-thigh.mdx)** — 40 refs; Lee sixteen perforator patterns; D'Arpa 93-pt urethral-reconstruction strategy table (tube-in-tube only feasible in 5.8%, ALT + pedicled SCIP best at 26.3%); Wong & Sbitany free ALT updating Cordeiro algorithm; Gentileschi vulvar first-line; Guiotto suspensory-ligament reconstruction with composite ALT + fascia lata; Maruccia / Cha / Fan / Viviano thinning strategies; Chang 2025 closure algorithm by FW/TCR.
- **[Vastus lateralis](docs/01-foundations/surgical-principles/flaps/vastus-lateralis.mdx)** — 34 refs; comparative APR-reconstruction table (Pang, Galbraith, Nelson MD Anderson 15% vs 42%, Johnstone meta 35.8% / 43.7% / 52.9%); di Summa TAPP technique; Gentileschi vulvar; phalloplasty applications (D'Arpa, Harris exstrophy, Morrison "mushroom flap", Ozkan prefabricated ALT); donor-site table with **Puladi 2023 tolerable-muscle-reduction rules** (≤ 50% elderly, ≤ 30% young/athletic).
- **[Gracilis flap](docs/01-foundations/surgical-principles/flaps/gracilis.mdx)** — augmented from 31 to 55 refs. Whetzel myofasciocutaneous 1997. RUF evidence table — Wexner 2008 53-pt landmark (78%→97%), Sbizzera 2022 *Eur Urol* 21-pt 95%, Higashino, Zmora. RVF/VVF subsection with Chen, Paprottka. **Palmer 2015 Lahey BMG + gracilis 80%** (canonical urethroplasty citation; the page previously said "~77%" with no source). Adynamic / dynamic graciloplasty (Guo, Chancellor, Janknegt, Van Aalst, Perez-Abadia) with the **2021 ACG "not currently recommended"** positioning. Copeland 1989 107-pt neovagina. Ismayilzade dead-space LOS data; Hsu / Lee / Kayikçioğlu penoscrotal.
- **[VRAM](docs/01-foundations/surgical-principles/flaps/vram.mdx)** — augmented from 18 to 25 refs. ORAM (Combs 2014); Davila / Asaad robotic harvest; Bruce 2000 complex urethrovaginal fistula; **new Vaginoplasty After Anterior Exenteration** subsection (Parsons 2003), **Bladder Neck Closure in Neurogenic Incontinence** (Smith 2010), and **Epispadias / Exstrophy Reconstruction** (Horton 1988).
- **[Omental flap](docs/01-foundations/surgical-principles/flaps/omental.mdx)** — augmented from 0 formal refs to 23. Turner-Warwick / Logmans biologic-properties block; Topor cadaveric arterial variants (56% / 26% / 18%) + Barkow's; Zaha laparoscopic 96-pt 99% success; Watts robotic VVF; Kulkarni urethroplasty 93.3%; Diamond bladder-neck; **Atala 2006 *Lancet* tissue-engineered bladder constructs** wrapped in omentum showing largest improvements in LPP / volume / compliance; Kusiak / Wheeless omental J-flap STSG neovagina with 2025 NCCN endorsement; Hultman 2002 25-yr 135-flap donor-site complication table; Welten 2019 NSQIP counterpoint (organ-space infection signal in APR); Hwang perivesical-fat alternative.
- **[Peritoneal flap](docs/01-foundations/surgical-principles/flaps/peritoneal.mdx)** — augmented from 15 to 33 refs. Yang 2025 "rainbow-shaped" peritoneal flap robotic VVF (15-pt 100%); MRKH series table (Zhou 182, Zhao 83, Willemsen-Kluivers 68, Uncu 27); GAS robotic vaginoplasty table (Dy 100-pt Da Vinci Xi vs SP, Castanon 52-pt, Jacoby 41-pt augmenting penile inversion +5 cm, Ratanalert 2025 full-length); Robinson 2022 intra-abdominal complications (2.2% in 274 patients including unique internal hernia); Yifeng dog-model tubularized peritoneal grafts; **Shen 2023 BLAPER prospective Stage II** (27-pt 96.3% success, no SBO/perineal hernia/retrourogenital small-bowel descent); new **Mesh Coverage in Sacrocolpopexy** subsection (Baessler 2026 Cochrane standard, Yagur 2025 11-pt no-erosion, Kulhan 2018 no-mesh-benefit, van den Akker 2020 178-pt no-peritoneal-closure).
- **[SCIP flap](docs/01-foundations/surgical-principles/flaps/scip.mdx)** — built out from stub to 22 refs; full vascular anatomy (Gandolfi/Yoshimatsu superficial + deep branches, Yamamoto SCIAt with 8-17 cm pedicles); seven configurations including LYST (lymph-node) and double-skin-paddle SCIP-t; D'Arpa 93-pt phalloplasty / De Gelder 10-yr 55-flap series; Scaglioni & B perineo-scrotal Fournier's; Lichtenberg 2024 chimeric SCIP + external oblique fascia for **vesicocutaneous fistula** (24-mo no recurrence); Gentileschi 32-pt vulvar; Xu 2026 LYST / Meroni-Scaglioni 12-pt VLNT / Yoshimatsu 8-pt long-term lymphedema. **Flap-table entry now spells out "Superficial Circumflex Iliac Artery Perforator (SCIP)"** with expanded indication phrasing per user request.
- **[Blandy flap](docs/01-foundations/surgical-principles/flaps/blandy.mdx)** — built from stub to 15 refs. Dual-eponym disambiguation: female Blandy ventral vaginal flap urethroplasty / meatoplasty (contemporary clinically dominant) vs male perineal urethrostomy. Outcomes table (Önol, Hajebrahimi, Blaivas, Flisser, Kowalik, Spilotros). Romero-Maroto retrusive-meatus criticism that motivated lateral-based modification. Lange 2022 V-Y modification for post-vulvectomy meatal reconstruction; Waterloos 2019 trans-women neo-vaginal advancement.
- **[Martius flap](docs/01-foundations/surgical-principles/flaps/martius.mdx)** — built from stub to 25 refs. Fibroadipose-not-bulbocavernosus anatomy clarification; Rothenberger 2025 right-sided-default mapping. VVF (Kapriniotis 2024 graftless > 90% for simple obstetric, Eilber 97% distal cure, Pushkar 80.4% radiation cumulative, Safan fibrin-glue RCT, Rangnekar recurrent-VVF advantage). Urethral diverticulum (Malde 70-pt 100%/1.4%/12% SUI, Osman 121-pt, Ko recurrent salvage). RVF (ASCRS 2022 Grade 1C, Swindon SR/meta 91.4%/77.5%/94.6%, Pastier 2024 Martius-vs-gracilis 69%/69% with shorter LOS and 27% no-stoma, smoking p = 0.02). MUT erosion (ACOG 2025, Mortimer 100%). When-necessary-vs-unnecessary decision rule. Comparison table with gracilis / peritoneal / omental.
- **[Labia majora fasciocutaneous flap](docs/01-foundations/surgical-principles/flaps/labia-majora-fasciocutaneous.mdx)** — augmented from 1 to 12 refs. Rothenberger neurovascular mapping. New vulvar reconstruction subsection (Höckel-Dornhöfer framework, Moschella-Cordova pubolabial V-Y amplified for total vulvectomy, Salgarello 2005 algorithm, Kwong 2025 prospective 92.6% mild-complication rate at 7 days). New vaginoplasty subsection (Flack tubularized labia minora, Belloli tissue-expander variant). New tubularized-labial-urethroplasty subsection (Xu 2009 8-pt complex female stricture + UVF after PFUI, 7/8 normal micturition at 48 mo). Candiani island bulbocavernosus musculocutaneous for recurrent UVF; Windhofer infragluteal local fasciocutaneous for perineal reconstruction (13/14 healed). Design-variations table; comparison table with Martius / pudendal-thigh / lotus petal / gracilis / VRAM.

The local-rearrangement table in [flaps-gu-reconstruction.mdx](docs/01-foundations/surgical-principles/flaps-gu-reconstruction.mdx) was updated throughout to hyperlink each entry to the new dedicated page with expanded indication phrasing. Orphan-check passes (197 hidden-category pages, all linked).

Practice notes carried forward from this sweep:

- The **dartos pedicle is the true vascular carrier** of all penile/preputial skin flaps — suprafascial dissection compromises the entire family.
- For phalloplasty urethral reconstruction in pedicled ALT, the **D'Arpa hierarchy** (SCIP best at 26.3%, RFFF urethra 37.9%, prelaminated ALT worst at 87.5%) is the contemporary decision anchor.
- For RVF, Martius-vs-gracilis is **equivalent at long-term follow-up** (Pastier 69% vs 69%); use Martius first with gracilis as salvage.
- For BMG ureteroplasty, the omentum is the **definitive vascularized backing** — do not substitute.
- For rectal-cancer pelvic exenteration, the omental-flap APR signal is **mixed** — single-center data favor it, but Welten NSQIP showed an organ-space-infection signal that may reflect selection bias.
- The 2024 SGUR survey shows **99% of contemporary reconstructive urologists prefer BMG** over penile fasciocutaneous flaps for substitution urethroplasty, even though the recent RCT evidence (PeeBuSt, Alrefaey 2025) shows equivalent success.

---

## Previous handoff snapshot — April 26, 2026 (incontinence canonicalization + behavioral / bulking fill)

Current incontinence-procedure canonicalization batch includes the previously uncommitted SNM / PTNS / PFPT work plus the behavioral therapy and urethral bulking fill.

### Sacral neuromodulation / tibial neuromodulation split

- Added [sacral-neuromodulation.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx) as a dedicated, filled SNM technique page.
- Scope: indications (UUI, urgency-frequency, non-obstructive urinary retention, fecal incontinence), off-label / emerging indications, multifocal mechanism of action, device families and MRI considerations, preoperative evaluation, PNE vs staged tined-lead trial, S3 lead placement technique and correct motor/sensory responses, stage-2 implantation, programming / rescue programming, urinary and fecal outcomes, ROSETTA SNM-vs-onabotulinumtoxinA framing, complications, revision patterns, MRI / pregnancy / neurogenic-LUTD special considerations, and key takeaways.
- Added [percutaneous-tibial-nerve-stimulation.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx) as the canonical PTNS / TTNS / implantable tibial stimulation target.
- Converted [neuromodulation.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/neuromodulation.mdx) from a stub into a small routing hub pointing to SNM and PTNS separately.
- Updated [oab-uui-database.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx): SNM now links to `sacral-neuromodulation`; PTNS and implantable tibial stimulation now link to `percutaneous-tibial-nerve-stimulation`.
- Updated related condition links in [urgency-incontinence-oab.mdx](docs/03-clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab.mdx), [mixed-incontinence.mdx](docs/03-clinical-conditions/03a-storage-incontinence/mixed-incontinence.mdx), and [fecal-incontinence.mdx](docs/03-clinical-conditions/03i-defecatory-disorders/fecal-incontinence.mdx) away from the generic neuromodulation page.

### Intradetrusor onabotulinumtoxinA naming cleanup

- In the OAB/UUI database, renamed `Intradetrusor OnabotulinumtoxinA (Botox 100U)` to **Intradetrusor OnabotulinumtoxinA** while preserving the canonical slug [intradetrusor-botox.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx).
- Updated [intradetrusor-botox.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx) title / H1 from "Intradetrusor Botox" to **Intradetrusor OnabotulinumtoxinA**.

### Pelvic floor physical therapy canonical page

- Expanded [pelvic-floor-pt.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/pelvic-floor-pt.mdx) from a short stub into a 28-reference canonical PFPT / PFMT page.
- Scope: phenotype-based framing (hypotonic strengthening vs hypertonic down-training/manual therapy vs dyssynergic coordination), core modalities, female SUI, OAB/UUI, POP, post-prostatectomy incontinence, IC/BPS and chronic pelvic pain, vulvodynia / vaginismus / dyspareunia, fecal incontinence / defecatory disorders, pregnancy and postpartum, evidence snapshot, referral / safety, and clinic pearls.
- Important editorial rule: **do not equate PFPT with Kegels.** Kegel-type strengthening is inappropriate for hypertonic pelvic pain phenotypes; IC/BPS with pelvic-floor tenderness should route toward manual therapy / down-training and explicitly avoid strengthening-first programs.
- Updated PFPT entries in [female-stress-incontinence-database.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx), [male-stress-incontinence-database.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database.mdx), and [oab-uui-database.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx) so all point to the same canonical page with condition-specific notes.
- Added / tightened PFPT links in [sexual-dysfunction.mdx](docs/05-special-populations/05e-womens-health/sexual-dysfunction.mdx), [gsm.mdx](docs/05-special-populations/05e-womens-health/gsm.mdx), [geriatric-urology.mdx](docs/05-special-populations/05f-lifelong-care/geriatric-urology.mdx), and [defecatory-disorders/index.mdx](docs/03-clinical-conditions/03i-defecatory-disorders/index.mdx).

### Behavioral therapy for OAB / UUI

- Added [behavioral-therapy-oab-uui.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/behavioral-therapy-oab-uui.mdx) as the canonical behavioral page for OAB / UUI.
- Scope: 2024 AUA/SUFU clinical-principle positioning, bladder training / bladder drill protocol, urge suppression script, timed voiding, fluid / caffeine / diet / constipation / weight-loss interventions, CBT-informed strategies, containment / skin-care counseling for UUI, Burgio behavioral-vs-oxybutynin evidence, Balk network meta-analysis, Cochrane bladder-training and conservative-intervention reviews, combined behavioral + drug trials in women and men, and delivery models by phenotype.
- Updated [oab-uui-database.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx) so Behavioral Therapy now links to the new page; anticholinergic and beta-3 rows now link to their pharmacology hubs. Corrected vibegron branding and combination-therapy wording.
- Updated [urgency-incontinence-oab.mdx](docs/03-clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab.mdx) to point to the dedicated behavioral page.

### Urethral bulking agents

- Filled [urethral-bulking-agents.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/urethral-bulking-agents.mdx) from stub into a 19-reference procedural counseling page.
- Scope: indications / patient selection, mechanism and injection workflow, currently available and historical agents (Bulkamid / PAHG, Macroplastique, Coaptite, Durasphere, Urolastic, Contigen), AUA/SUFU 2023 positioning, Bulkamid pivotal and 7-year data, bulking-vs-surgery evidence, recurrent SUI after failed sling, complications, limited male post-prostatectomy role, regenerative injection directions, and counseling script.
- Cross-linked the page with [SNRIs](docs/01-foundations/pharmacology/neuropathic-pelvic-pain/snris.mdx) and [Vaginal & Topical Estrogen](docs/01-foundations/pharmacology/hormonal-therapies/vaginal-topical-estrogen.mdx). Fixed the female SUI database typo `PAHW` → `PAHG`.

---

## Previous handoff snapshot — April 26, 2026 (male urethral slings filled)

- [male-urethral-slings.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/male-urethral-slings.mdx) converted from a stub into a 37-reference dedicated technique page. Anchored on the **MASTER RCT** (Abrams 2021 *Eur Urol* + Constable 2022 *HTA*) for sling-vs-AUS noninferiority, with all secondary outcomes favoring AUS; the 6th ICI severity-tiered framework as the central decision matrix (mild → sling acceptable; moderate → AUS preferred; severe → AUS).
- Scope: epidemiology / PPI context, fixed-vs-adjustable classification, mechanism-of-action table (relocation vs compression) anchored on Kahokehr 2018 dynamic MRI; AdVance / AdVance XP technique + outcomes (Bauer 2009/2017, Cornu 2009, Rehder 2012, Collado 2019, Chua 2019, Papachristos 2018) with declining-cure-over-time data; Virtue quadratic sling (Comiter 2012/2014 fixation, Roumeguère 2022 3-yr, Ferro 2017); historical bone-anchored InVance; ATOMS adjustable system (Seweryn 2012, Hoda 2013, Doiron 2019, Redmond 2021, Bajaj 2024, Téllez 2024); adjustable retropubic slings (Argus / REMEEX, Chiu 2022); predictors-of-failure table with Ghaffar 2023 radiation meta-analysis as the strongest signal; complications-by-sling-type comparison; concomitant-with-IPP framing (Ammirati 2026); step-by-step AdVance XP technique with the Soljanik 2012 absorbable-suture failure-OR caveat.
- Editorial split: cross-links to [AUS](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx) for moderate-to-severe SUI as the canonical companion. Ileal-ureter bleed-through references (originally numbered 8–12, 20–22, 41–44 in the source dump) were filtered out and the ref list renumbered sequentially.
- Verification: `npm run lint` passes (only pre-existing reference-density advisories); `npx docusaurus build --locale en` completes cleanly.

---

## Previous handoff snapshot — April 25, 2026 (upper-tract technique fill + validation hardening)

The upper-tract technique fill is continuing on `origin/main`. Baseline pushed commits before the current Boari / ileal batch: `4442b99` (pyeloplasty) and `d2b59d1` (ureteral reimplantation).

### Validation / audit hardening now in place

- Commit `3e63e54` **Tighten site validation and fix link hygiene** fixed the remaining pharmacology broken links and made production broken links fail hard (`onBrokenLinks: "throw"` in `docusaurus.config.ts`).
- Added [check-internal-links.js](scripts/check-internal-links.js) and [check-reference-density.js](scripts/check-reference-density.js); `npm run lint` now runs scope, citations, orphans, internal links, and reference-density advisory.
- Added [anatomy-physiology/index.mdx](docs/01-foundations/anatomy-physiology/index.mdx) and tightened React return types. `npm install` was run after confirmation; no package-lock churn was introduced.
- Current verification pattern used for the filled technique pages: `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`.

### Upper Tract Reconstruction — pyeloplasty filled

- Commit `4442b99` **Build out pyeloplasty technique page** converted [pyeloplasty.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/pyeloplasty.mdx) from a stub into a 44-reference operative technique hub.
- Scope: operative indications, preoperative planning, Anderson-Hynes dismembered pyeloplasty steps, nondismembered techniques (Fenger, Foley Y-V, Culp-DeWeerd, Scardino-Prince, dismembered V-flap), open/laparoscopic/robotic approach comparison, transperitoneal vs retroperitoneal access, infant RALP, stenting strategies, vascular hitch, endopyelotomy, failed-pyeloplasty salvage, complications, follow-up, and operative pearls.
- Editorial split: the page intentionally avoids duplicating [UPJ Obstruction](docs/03-clinical-conditions/03e-upper-tract/upj-obstruction.mdx), [MAG3 renal scintigraphy](docs/02-evaluation/imaging/mag3-renal-scintigraphy.mdx), and [GU Anastomotic Technique](docs/01-foundations/surgical-principles/gu-anastomotic-technique.mdx); it cross-links to them instead.
- Pasted-source artifacts cleaned: smashed tables rebuilt, `undefined` figure text removed, incomplete MAG3 / p-value / contraindication fragments repaired, and source "Would you like..." prompt text omitted.

### Upper Tract Reconstruction — ureteral reimplantation filled

- Commit `d2b59d1` **Build out ureteral reimplantation technique page** converted [ureteral-reimplantation.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx) from a stub into a 37-reference technique hub.
- Scope: pediatric VUR / primary obstructive megaureter indications, adult distal ureteral reconstruction indications, core reimplant principles, technique-selection table, Cohen / Politano-Leadbetter / Glenn-Anderson intravesical approaches, Lich-Gregoir extravesical technique, adult direct reimplant / psoas hitch / Boari flap / TUU ladder, robotic and pneumovesicoscopic approaches, endoscopic injection context, POM tapering and side-to-side ureterovesicostomy, complications, follow-up, and operative pearls.
- Editorial split: this is the main reimplantation hub. It cross-links to [GU Anastomotic Technique](docs/01-foundations/surgical-principles/gu-anastomotic-technique.mdx), [Ureteral Stricture](docs/03-clinical-conditions/03e-upper-tract/ureteral-stricture.mdx), and the narrower [Boari Flap & Psoas Hitch](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx) stub for future expansion.

### Upper Tract Reconstruction — Boari flap / psoas hitch filled

- [boari-flap-psoas-hitch.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx) converted from a stub into a 20-reference dedicated bladder-mobilization technique page.
- Scope: indications / contraindications, reconstruction ladder from direct reimplant → psoas hitch → Boari flap → nephropexy / bowel / autotransplant, psoas hitch step sequence and technical rules, Boari flap design and step sequence, downward nephropexy, robotic approach, complications, when bladder-based reconstruction is insufficient, and operative pearls.
- Editorial split: the page is the dedicated adjunct page under the broader ureteral reimplantation hub. It cross-links back to [ureteral-reimplantation.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx) and forward to ileal ureter / salvage concepts.

### Upper Tract Reconstruction — ileal ureter filled

- [ileal-ureter.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/ileal-ureter.mdx) converted from a stub into a 24-reference salvage bowel-interposition technique page.
- Scope: indications, contraindications and caution zones, preoperative planning, standard ileal ureter technique, Yang-Monti reconfigured ileal ureter, ileal onlay / combined Boari / downward nephropexy modifications, antireflux strategy, open and robotic outcomes, complications, alternatives, lifelong surveillance, and operative pearls.
- Editorial split: this is the "last-resort bowel interposition" page, deliberately cross-linking out to [Bowel Anatomy](docs/01-foundations/anatomy-physiology/pelvis-support/bowel-anatomy.mdx), [Mucus Management](docs/01-foundations/pharmacology/urinary-diversion-specific/mucus-management.mdx), [Vitamin B12 Supplementation](docs/01-foundations/pharmacology/urinary-diversion-specific/vitamin-b12-supplementation.mdx), and [Urinary Acidifiers & Alkalinizers](docs/01-foundations/pharmacology/urinary-diversion-specific/urinary-acidifiers.mdx) to prevent metabolic-surveillance drift.

### Near-term continuation targets

- Still-stubbed adjacent 04d pages now made more obvious by the filled hubs: [distal-ureterectomy-reimplant.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/distal-ureterectomy-reimplant.mdx), [non-transecting-reimplant.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/non-transecting-reimplant.mdx), [ureterocalicostomy.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/ureterocalicostomy.mdx), [bmg-onlay-ureter.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/bmg-onlay-ureter.mdx), and [appendiceal-ileal-onlay.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/appendiceal-ileal-onlay.mdx).
- `npm audit` still reports dependency vulnerabilities; no automated fix was applied because the available force path may be breaking.

---

## Current handoff snapshot — April 24, 2026 (site audit + landings + transitional / geriatric urology)

The latest work has been committed and pushed to `origin/main`. This session was an audit-driven cleanup pass plus three substantive content additions.

### Audit-driven cleanup

- **All 5 broken-link warnings fixed.** Build now reports zero broken links for the first time. Stale paths from the Pharmacology promotion-from-Tools migration repointed in [imipramine.mdx](docs/01-foundations/pharmacology/legacy-low-evidence/imipramine.mdx), [parasympathomimetics.mdx](docs/01-foundations/pharmacology/legacy-low-evidence/parasympathomimetics.mdx), [phenazopyridine.mdx](docs/01-foundations/pharmacology/legacy-low-evidence/phenazopyridine.mdx), [phytotherapy.mdx](docs/01-foundations/pharmacology/legacy-low-evidence/phytotherapy.mdx), and [perioperative-eras/corticosteroids.mdx](docs/01-foundations/pharmacology/perioperative-eras/corticosteroids.mdx). Patterns repointed: `neuromodulation-adjuncts/{desmopressin,antimuscarinics,beta-3-agonists}` → `storage-oab/{desmopressin,anticholinergics,beta3-agonists}`; `clinical-conditions/voiding-outlet/...` → `clinical-conditions/03b-voiding-outlet/...`; `clinical-conditions/pelvic-pain/ic-bps` → `clinical-conditions/03h-pelvic-pain/ic-pbs`; `pharmacology/5-alpha-reductase-inhibitors` → `pharmacology/voiding-outlet/alpha-reductase-inhibitors` (filename-numeric-prefix strip rule); `pharmacology/storage-oab/intravesical-ic-bps-agents` → `pharmacology/bladder-pain-ic-bps/intravesical-agents`.
- **04c (Urinary Diversion) and 04j (Sexual Dysfunction) `_category_.json`** — added `link: { type: doc, id: ... }` so both category titles are clickable to their landing pages instead of being non-clickable dropdowns. Brings them in line with the other treatment-atlas sections.

### Surgical Skills reorg (Plan B from the audit)

The Surgical Skills index had 10 mixed techniques — half generic bowel-anastomotic stitches that belong in any general-surgery textbook, half truly signature GU/urogyn techniques. Reorganized so Skills is now strictly named-eponym GU operative techniques.

- **Renamed category** `Surgical Skills` → `Named Operative Techniques` in [_category_.json](docs/01-foundations/surgical-skills/_category_.json) and the index header.
- **Tightened the index table** to 6 truly signature techniques: Heaney, Quilting, Ski needle, Van Velthoven VUA, **Parker-Kerr** (kept — it's the classic two-layer over-the-clamp stump closure for urinary diversion), and SEXI. See [surgical-skills/index.mdx](docs/01-foundations/surgical-skills/index.mdx).
- **Hid the 4 generic bowel stitches** from the sidebar via `sidebar_class_name: sidebar-hidden-item` on each frontmatter: Connell, Cushing, Lembert, Halsted. Pages remain reachable.
- **Added a new "Bowel Anastomotic Stitches" subsection** to [bowel-anastomosis.mdx](docs/01-foundations/surgical-principles/bowel-anastomosis.mdx) with a table linking to all four hidden stitch pages plus a pointer to Parker-Kerr. **Note:** Docusaurus 3 + MDX 3 do **not** support the `### Heading {#explicit-anchor}` syntax — using it in surgical-principles/bowel-anastomosis.mdx caused an acorn parse failure. Auto-generated heading anchors work; do not add `{#...}` syntax to MDX 3 files.

### New: Transitional Urology + Geriatric Urology (new 05f Lifelong Care subsection)

Created a new `docs/05-special-populations/05f-lifelong-care/` subsection with a section-stack landing covering both age-bookend overlays of the reconstructive practice. The Special Populations top-level landing was updated to include the new subsection alongside Trauma / GAS / Women's Health.

- **[transitional-urology.mdx](docs/05-special-populations/05f-lifelong-care/transitional-urology.mdx)** — 47 refs anchored on Akdağcık 2025 (World J Urol global SR), Peycelon 2021, Wood Eur Urol 2019, ICCS 2017 position statement, SBA 2023 transition guidelines, AAP / AAFP / ACP "Got Transition" 2023, and the AUA Working Group on Genitourinary Congenitalism 2015. Sections: definition (transition vs. transfer), universal goals, when-to-start (age 12–14), TRAQ / TRAQ-SB / Good2Go / RTQ readiness assessment tools, structured-program outcomes (Blubaum 2023 96.2% transition success vs. 36.8% without). Condition-specific subsections for spina bifida / NLUTD (CIC, renal surveillance, latex allergy, shunt management); PUV (15–23% ESRD with 28.5% lifetime risk, valve-bladder syndrome 38%, multidisciplinary clinic Rickard 2025 12% vs. 27% CKD progression); BEEC (~83% diurnal continence, male oligoasthenoteratozoospermia ~71%, 22–32% paternity rates with sperm banking); hypospadias (53% suboptimal AYA outcomes, 39% reoperation, 47% adult stricture, 83% two-stage BMG re-op success); DSD (lifelong hormone replacement, gonadal-tumor surveillance). Augmentation cystoplasty surveillance: 0–5.5% malignancy with 19–20-yr latency, AUA / SUFU annual surveillance, controversy on routine cystoscopy, urine FISH and molecular profiling. Care models, barriers table, 7-point key-recommendations summary.
- **[geriatric-urology.mdx](docs/05-special-populations/05f-lifelong-care/geriatric-urology.mdx)** — 42 refs anchored on Rashid Clin Geriatr Med 2025, ASPIRe substudy (Erekson AJOG 2026), SUFU White Paper on anticholinergics-and-dementia, ACP / ACOG / AGS Beers Criteria. Frailty screening (TUG, CFS-9 — Amin AUC 0.86–0.91, Mini-Cog, Robinson Frailty Index, Life-Space Assessment) is the central preoperative gate. ASPIRe finding: prefrail / frail patients have no immediate-complication increase but **2.1× treatment-failure hazard** at follow-up. Anticholinergic burden / dementia: Malcher 2022 OR 1.48 with &gt;365 DDDs, oxybutynin / solifenacin highest risk, trospium spared (no BBB crossing); Kotochinsky 2025 meta n = 3.66 M (RR 1.20 vs. no Rx, 1.28 vs. mirabegron); SUFU recommends earlier progression to BoNT / neuromodulation. β3-agonists (mirabegron / vibegron) preferred — Lozano-Ortega network meta in ≥65 yr: equivalent efficacy, dry-mouth at placebo levels. Surgical selection: colpocleisis as ACOG-recommended first-line for comorbid patients (Drain 2020 equivalent complications + shorter LOS, Yildiz 2026 94.8% anatomic success / 6.8% regret); native-tissue repair the most common (43.7% of POP repairs ≥75 yr); sacrocolpopexy reserved for durability when warranted. Stepp 25.8% perioperative complication rate driven by op time + CAD + PVD (not age alone). ERAS RCT (Huang 2025) 65 vs. 74 hr LOS. GSM cross-references women's-health framework, with geriatric-specific underutilization data (Gallo 2025 only 2.2–4.2% of eligible Medicare beneficiaries). FI section (ACOG PB 210, SNM ~63% short-term / ~54% long-term).

### Other clinical-conditions split

- [scrotal-lymphedema.mdx](docs/03-clinical-conditions/03g-genital-scrotal/scrotal-lymphedema.mdx) and [hidradenitis-suppurativa.mdx](docs/03-clinical-conditions/03g-genital-scrotal/hidradenitis-suppurativa.mdx) — combined `scrotal-lymphedema-hidradenitis.mdx` stub split into two articles framed for the reconstructive urologist with cross-links to scrotal-reconstruction and buried-penis (HS-driven escutcheon disease). Both currently stubs awaiting fill.

### Pattern guidance reaffirmed

- **`_category_.json` `link` field** is what makes a category title clickable to its landing page. Categories without `link` fields fall back to a non-clickable dropdown — this is the primary reason for "some sidebars feel finished, others don't" perception. Audit recommended this fix everywhere there's an index.mdx without a corresponding `link` field. Currently 04c and 04j are aligned; ~75 deeper subsections still lack `link` fields but most don't have index.mdx either.
- **`sidebar_class_name: sidebar-hidden-item`** in frontmatter hides an individual page from sidebar (vs. `className: sidebar-hidden-category` in `_category_.json`, which hides an entire category). Used here to keep Connell/Cushing/Lembert/Halsted reachable from bowel-anastomosis.mdx without cluttering the Skills sidebar.
- **Treatment Atlas pattern maturity:** 04b and 04g now fully match the principles+database+hidden-compartments pattern; 04a, 04c, 04d, 04e, 04f, 04h, 04i, 04j show mixed adoption (some have database in index but compartments still visible; some have index without database). Future cleanup pass would standardize.

### Curriculum-coverage gaps still outstanding

From the audit comparing `src/data/curriculum.ts` against the docs tree:

- **URPS V — Urethral Diverticulum (female)** — article exists at [03b-voiding-outlet/urethral-diverticula.mdx](docs/03-clinical-conditions/03b-voiding-outlet/urethral-diverticula.mdx); content depth not verified.
- **URPS VII — Hematuria evaluation** — missing entirely. Should live under 02-evaluation or 03-clinical-conditions.
- **URPS IX — Müllerian anomalies / vaginal agenesis / McIndoe / Davydov** — missing; pairs cleanly with the existing GAS feminizing-procedures article.
- **GURS III — Hidradenitis Suppurativa** — stub created this session, awaiting fill.
- **URPS I — Successful aging framework** — partial coverage in geriatric-urology; standalone framework article not written.

---

## Previous handoff snapshot — April 25, 2026 (Women's Health content sweep)

The latest work has been committed and pushed to `origin/main`. Four Women's Health articles filled in this session:

### Special Populations — Women's Health expansions

- [cancer-screening/breast.mdx](docs/05-special-populations/05e-womens-health/preventative-care/cancer-screening/breast.mdx) — filled the stub. 14 refs. Risk-stratified framework (NCCN 2026 as primary algorithm). Average-risk guideline comparison table (USPSTF 2024 biennial 40–74, NCCN annual from 40, ACS annual 45–54 biennial ≥55, ACR annual from 40, ACP 2026 biennial 50–74). Increased-risk categories: lifetime risk ≥20%, BRCA1/2 (ages 25–29 MRI only; 30–75 mammogram + MRI), prior chest radiation, Gail ≥1.7% / ADH / lobular neoplasia, dense breasts (DENSE trial ~50% interval cancer reduction with supplemental MRI for extremely dense; Category 1 evidence ages 50–75). Supplemental modalities table (MRI 13–23/1,000 CDR, abbreviated MRI, CEM, MBI, whole-breast US). Risk model table (Tyrer-Cuzick, BCSC highest AUC with density, Gail, BOADICEA). WISDOM trial 2025 (risk-based noninferior to annual, 89% patient preference). Special populations: age ≥75, male BRCA2, transgender, racial disparities (40% higher BC mortality in non-Hispanic Black women).

- [cancer-screening/endometrial.mdx](docs/05-special-populations/05e-womens-health/preventative-care/cancer-screening/endometrial.mdx) — filled the stub. 23 refs. No routine screening for average-risk women (all major societies in consensus). Patient education at menopause onset as primary recommendation. Four reasons no population screening: favorable natural history (stage I &gt;88% 5-yr survival), TVUS specificity only 35–62% at 5-mm cutoff, biopsy too invasive, no proven mortality reduction. Symptomatic workup: TVUS ≤4 mm NPV >99% but 9.5% false-negative in Black women; Pipelle 75–100% sensitivity. Lynch syndrome gene-specific table (MLH1/MSH2/MSH6/PMS2/EPCAM — NCCN caveats: screening unproven, TVUS not recommended premenopausal, hysterectomy reduces incidence not mortality). Cowden syndrome (5–22% lifetime risk). Risk factor table (10 factors with RR estimates). Risk reduction: OCPs (2.3 → 1.3/100 absolute risk), LNG-IUS (OR 0.81), CAPP2 aspirin (HR 0.50), bariatric surgery (OR 0.32). Tamoxifen: no routine screening at 20 mg/day. Emerging technologies: WID-qEC methylation (EPI-SURE), 3-gene methylation panel (92.86% stage I), liquid biopsy piRNA/miRNA, HE4 (AUC ~0.76).

- [gsm.mdx](docs/05-special-populations/05e-womens-health/gsm.mdx) — filled the stub. 19 refs. Anchored on 2025 AUA/SUFU/AUGS Guideline + 2020 NAMS Position Statement. Pathophysiology: pH shift, microbiome transition (Shardell 2021 — 50% low-Lactobacillus postmenopausal vs 21% premenopausal), ERα/ERβ in bladder trigone and pelvic floor. Vaginal estrogen formulation table (estradiol cream, conjugated estrogen cream, Vagifem 10 µg inserts, Imvexxy 4/10 µg soft gel, Estring ring — doses, frequency, systemic absorption gradient). Danan 2024 Ann Intern Med SR (vaginal estrogen, DHEA, ospemifene, moisturizers all improve some symptoms). Energy-based therapies: Zerzan 2025 SR (CO₂ laser no difference vs sham or vs vaginal estrogen, low certainty); Jang 2022 meta comparable CO₂ vs estrogen; NAMS not standard of care. Breast cancer survivors: ACOG 2021 clinical consensus; Beste 2025 meta-analysis (&gt;24,000 patients — OR 0.48 recurrence, OR 0.46 all-cause mortality); Mainar 2026 FDA boxed-warning removal; NCCN rings/inserts preferred over creams.

- [sexual-dysfunction.mdx](docs/05-special-populations/05e-womens-health/sexual-dysfunction.mdx) — filled the stub. 15 refs. ACOG PB 213 as primary framework; Davis NEJM 2024 as epidemiology anchor. DSM-5 four-disorder table (FSIAD, female orgasmic disorder, GPPPD, substance-induced) with ISSWSH/ICSM comparison (separate desire/arousal, PGAD, expanded orgasm subtypes). ACOG evidence-graded recommendations (Level A/B/C) in full. Flibanserin: +0.5 SSE/month, alcohol contraindication. Bremelanotide (RECONNECT phase 3, +0.35 FSFI desire p&lt;0.001; 52-week extension; subgroup consistency). Transdermal testosterone: Islam 2019 36-RCT meta +0.85 SSE/month; no FDA approval in US; 2M+ off-label Rx/year; oral route harms HDL/LDL. Toledo 2025 SR/meta: mindfulness-based CBT improves FSFI desire/arousal/orgasm; no direct CBT vs pharmacotherapy comparisons yet. Combined treatment summary table with disorder target, route, key data, and risks for all modalities.

---

## Previous handoff snapshot — April 25, 2026 (treatment atlas overhaul + condition / instrument expansion)

The latest work has been committed and pushed to `origin/main`. Major additions in this session (commits `034780b` → most recent at this snapshot):

### Treatment Atlas — major reorganization

- **04d Upper Tract Reconstruction** now uses the landing-page-as-database pattern with **Endoscopic / Minimally Invasive** as a new domain. New articles: [endoureterotomy.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/minimally-invasive/endoureterotomy.mdx) and [optilume-ureter.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/minimally-invasive/optilume-ureter.mdx) (referencing the **ENDURE-1** trial NCT07020520 evaluating Optilume DCB in the ureter). The standalone `ureteral-reconstruction-database.mdx` was deleted; the section now follows the principles-above-database pattern.
- **04e Tissue Transfer (deleted)** and **04i Endoscopic Procedures (deleted)** — obsolete stubs removed. DVIU was relocated into [04a-urethral-reconstruction/minimally-invasive/dviu.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu.mdx) alongside Optilume DCB and Urethral Dilation; the urethral-reconstruction-database DVIU slug was repointed.
- **04e Genital Reconstruction (new)** — new atlas section at position 5. Landing-page database with domains: Adult-Acquired Buried Penis, Peyronie's Correction (cross-links to existing 04j), Gender-Affirming (Masculinizing / Feminizing / Non-Binary / Revision — cross-links to 05c), Post-Traumatic / Oncologic, Staged / Salvage Reconstruction, and **Penile Augmentation** (new teal-badge domain). New articles: [genital-reconstruction-principles.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/genital-reconstruction-principles.mdx) (16-principle deep-dive with 46 refs), [buried-penis-repair.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/buried-penis-repair.mdx), [penile-skin-reconstruction.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-reconstruction.mdx), [glans-reconstruction.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/glans-reconstruction.mdx), [scrotal-reconstruction.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-reconstruction.mdx) (now a 25-ref comprehensive article — Fournier's, MLL / VLNT lymphedema, GAS scrotoplasty, aesthetic, testicular thigh pouches), and [cecil-culp-procedure.mdx](docs/04-surgical-techniques/04e-genital-reconstruction/cecil-culp-procedure.mdx) (Cecil-Culp two-stage marsupialization, 24 refs).
- **04h Fistula Repair (new)** — gender-toggled tabbed database (Female default / Male) at position 8. Female: VVF / VUF / UVF / RVF / Obstetric / Urethrovaginal. Male: RUF / Rectovesical / UCF / UPF. Plus [fistula-repair-principles.mdx](docs/04-surgical-techniques/04h-fistula-repair/fistula-repair-principles.mdx). Database entries link to existing clinical-conditions articles.
- **04i Tissue Transfer (new pointer-database)** — replaces the deleted stub. Pure cross-cutting index of flaps and grafts by GU recipient site and indication, all linking back to `foundations/surgical-principles/flaps/*` and `grafts/*`. **Sits at the bottom of the atlas (sidebar position 11)** — the cross-cutting toolkit, not a primary domain.
- **Treatment Atlas landing reordered** to 10 sections: Urethral, Bladder, Diversion, Upper Tract, Genital Reconstruction, Incontinence, Prolapse, Fistula Repair, Sexual Dysfunction, Tissue Transfer.

### Foundations expansions

- [exposure.mdx](docs/01-foundations/surgical-principles/exposure.mdx) — new Operative Exposure article at sidebar_position 9 (before Incisions & Closure). Vaginal / perineal / abdominal exposure by target, positioning, incisions, Kocher / Cattell-Braasch / Mattox visceral rotations, transmesenteric approaches, zone-based retroperitoneal trauma algorithm. 21 refs.
- [vascular-damage-control.mdx](docs/01-foundations/surgical-principles/vascular-damage-control.mdx) — new article at sidebar_position 9.5. Three-phase DCS paradigm + DCR, vaginal / perineal packing, the pelvic-hemorrhage algorithm (binder → PPP → angioembolization → IIAL), REBOA zones with UK-REBOA safety context, proximal aortic control, vessel-specific damage control with TIVS, OB / GYN abdomino-pelvic packing. 35 refs.
- [staplers/index.mdx](docs/01-foundations/tools/instruments/staplers/index.mdx) — new comprehensive Staplers article in instruments. GIA / TA / Endo-GIA Vascular / robotic platforms; renal-hilum en-bloc stapling (Lai 595-pt meta), radical cystectomy pedicles, bowel reanastomosis (Saxena 2025 RARC robotic ileo-ileal, Ghanaat GIA-60 vs 80), neobladder construction (Mastroianni 2025 RCT showing hand-sewn superior for continence + lower stones), the absorbable-vs-titanium stone-formation problem (Dangman 27%, Arif 4.8% vs 30% RCT), bladder-cuff / pyeloplasty / Boari / catheterizable-channel applications, FDA MAUDE complication data. 34 refs. Added to the instruments database with new Staplers category (4 entries).
- [bowel-anastomosis.mdx](docs/01-foundations/surgical-principles/bowel-anastomosis.mdx) — expanded the side-to-side / functional end-to-end section with vascular-vs-tissue cartridge rule, Ghanaat 2018 GIA-60-vs-80 equivalence, Saxena 2025 RARC outcomes, Chan 2000 stapler-malfunction data, and a cross-link to the Staplers article. Three new refs (24-26).
- [surgical-ergonomics.mdx](docs/01-foundations/surgical-principles/surgical-ergonomics.mdx) — replaced the one-line microbreak bullet with a full **Targeted Stretching Micro Breaks (TSMB)** subsection (Park 2017 Ann Surg landmark + Mayo protocol + ASGE 2023 + Kjærgaard 2025 meta), new **Exercise-based Prevention** subsection (Giagio 2019 RCT, Vijay 2025 resistance training, Rathee 2025 strengthening + TSMB), and Education subsection augmented with Gleave 2025 residency data. 7 new refs (19-25).
- [quilting-stitch.mdx](docs/01-foundations/surgical-skills/quilting-stitch.mdx) — added the Schardein 2020 *Urol Video J* "sewing machine" reference (handheld battery-powered suturing for rapid BMG quilting in deep / narrow fields) as a new Suture-Placement technical pearl bullet. New ref41.

### Evaluation expansions

- [endoscopy.mdx](docs/02-evaluation/ancillary-tests/endoscopy.mdx) — filled the stub at evaluation/ancillary-tests with a comprehensive cystoscopy + ureteroscopy article. 12 clinical roles: intraoperative injury detection in pelvic surgery, urethroplasty surveillance, augmentation cystoplasty malignancy screening (with the surveillance-vs-symptom-driven controversy), BNC / VUAS cystoscopic platform, ureteral stricture evaluation and endoscopic treatment, ureteroenteric anastomotic strictures (antegrade / retrograde / combined), stone management in reconstructed tracts, iatrogenic stricture prevention, catheterizable-channel evaluation, post-phalloplasty neourethral complications. 44 refs.
- [cystography.mdx](docs/02-evaluation/imaging/cystography.mdx) — new dedicated article at sidebar_position 2.5 (after RUG & VCUG). CT cystography, fluoroscopic cystography, VCUG for VUR, RNC, ceVUS; trauma indications with EAST risk-stratified follow-up; non-trauma uses (VUR, colovesical fistula, augmented bladder perforation, recurrent UTI); pitfalls and quick-reference summary. 25 refs.

### Trauma & Emergencies expansions

- [acute-urinary-retention.mdx](docs/05-special-populations/05a-trauma-emergencies/acute-urinary-retention.mdx) — new article at sidebar_position 11. Definition / epidemiology / etiology, rapid-vs-gradual decompression (Mayo Nyman 1997 — no RCT supports clamping), difficult-catheterization escalation algorithm (coudé → guidewire → flexible cystoscopy → fluoroscopy → SPC), Miller 2024 coudé protocol (3.0% → 0.2% traumatic-catheterization), POD recognition / management, alpha-blocker pre-TWOC evidence (Cochrane, EAU meta), Fowler's syndrome, special populations. 31 refs.
- [on-table-ivp.mdx](docs/05-special-populations/05a-trauma-emergencies/on-table-ivp.mdx) — new article at sidebar_position 12. ACS 2025 / WSES-AAST 2019 guidelines, the 2 mL/kg / 10-min single-shot protocol, Morey 1999 SFGH landmark (32% obviated exploration), false-negative limitations (37–75% renal, up to 60% ureteral), decision algorithm during trauma laparotomy, alternatives. 16 refs.

### Clinical Conditions expansions

- [small-penis-syndrome.mdx](docs/03-clinical-conditions/03g-genital-scrotal/small-penis-syndrome.mdx) — new SPS / PDD condition at sidebar_position 5. Veale 2015 nomograms, micropenis vs SPS / PDD, BDD overlap (11–14%), psychological assessment as critical first step, full procedural ladder (PTT / VEDs → HA / PLA / fat fillers → suspensory ligament release → dermal-graft wrapping → Penuma / Himplant), illicit-injectables danger (78–91% surgical-correction rate), SMSNA 2024 position statements, management algorithm. 36 refs. The new Penile Augmentation domain in the genital-reconstruction database (3 entries: Penile Fillers, Suspensory Ligament Release, Penuma / Himplant) all link here.

### Special Populations — Women's Health expansions

- [opportunistic-adnexal-surgery.mdx](docs/05-special-populations/05e-womens-health/preventative-care/opportunistic-adnexal-surgery.mdx) — new at preventative-care position 4. Tubal hypothesis / STIC pathology, 42–80% risk-reduction evidence (Tang meta, Falconer, Duus 16,822, Kahn 2023), guideline matrix (ACOG 774, ESGO JAMA 2026, NCCN, FIGO, AGO intergroup), SEE-FIM technique with QOS completeness data, perioperative safety, ovarian-function impact, missed-opportunity literature (Moufarrij 23.7%, Tischer 60% prior abdominopelvic), cholecystectomy / 6-procedure cost-effectiveness, BRCA delayed-oophorectomy framework. 27 refs.
- [recurrent-uti.mdx](docs/05-special-populations/05e-womens-health/recurrent-uti.mdx) — filled the stub. 12 sections anchored on the 2025 AUA / CUA / SUFU paradigm shift. IBC / QIR pathway (Hannan, Rosen 18%, Sharma organoid), risk stratification, ACR-aligned selective imaging (Pat 2022), full non-antibiotic toolkit (Raz-Stamm 1993 → Chen 58% meta → Tan-Kim 51.9% real-world for vaginal estrogen; ALTAR / ImpresU / Hodgkinson formaldehyde-resistance for methenamine; cranberry; MERIT D-mannose negative RCT; OM-89 / MV140), antibiotic prophylaxis regimens, ELIMINATE phage trial, FMT, intravesical GAG, paradigm shifts. 34 refs.
- [cancer-screening/cervical.mdx](docs/05-special-populations/05e-womens-health/preventative-care/cancer-screening/cervical.mdx) — filled the stub. Primary HPV testing as preferred method, USPSTF vs ACS by-age comparison table, May 2024 / May 2025 self-collection FDA approvals (Teal Wand at-home), ASCCP risk-based management framework with the &lt;4 / 4–24 / 25–59 / ≥60% CIN3+ thresholds, special populations, screening gaps and disparities. 10 refs.

### Removals / consolidations

- **05-special-populations / 05d Men's Health & Andrology** — entirely deleted. The only article was hypogonadism-testosterone, fully covered by the pharmacology testosterone-replacement hub. Three pharmacology cross-links (androgen-adjuncts, testosterone-replacement) repointed.

### Pattern guidance reaffirmed in this session

- **Treatment-atlas landing-page pattern** — the landing IS the searchable database with a short principles block above. Used now in 04b (bladder), 04c (urinary diversion), 04d (upper tract), 04e (genital reconstruction), 04h (fistula repair).
- **Pointer-database pattern** — for cross-cutting toolkits (04i Tissue Transfer), the database links out to authoritative pages elsewhere (foundations) rather than duplicating named-technique content.
- **Bleed-through reference filtering** — assistant-generated content typically arrives with refs from unrelated articles (urinary-diversion refs in genital-reconstruction content, aspirin/pregnancy refs in cervical-cancer content, etc.). Always filter to refs actually cited in body, then renumber sequentially.
- **MDX `<` artifacts** — assistant-generated content has consistent `<` swallow patterns ("p[N]" instead of "p<0.001).[N]", "<48 hours" missing entirely, etc.). Always sweep and fix with `&lt;` escaping.

---

## Previous handoff snapshot — April 24, 2026 (surgical-principles reorg + library overhaul)

The previous session focused on the surgical-principles reorganization, library overhaul, perioperative-pharmacology pair pages, and the bladder / urethral / urinary-diversion treatment-atlas landing-page pattern. Preserved below for historical context.

### Liposomal bupivacaine built out

- [liposomal-bupivacaine.mdx](docs/01-foundations/pharmacology/intraoperative-adjuncts/liposomal-bupivacaine.mdx) — 16 refs; anchored on Ilfeld 2021 *Anesthesiology* 76-RCT review (only 11% clinically relevant benefit over standard bupivacaine); **CLEVELAND 2025 RCT** (LB TAP = plain bupivacaine TAP = saline placebo TAP); Ji 2021 14× financial-COI signal; urology-specific data (Chu 2021 LB-vs-epidural confounding vs Schmidt 2021 LB-vs-standard-bupivacaine no difference); preparation-rule warning admonition (lidocaine admixture, 96-h no-additional-LA rule).

### Liposomal bupivacaine built out

- [liposomal-bupivacaine.mdx](docs/01-foundations/pharmacology/intraoperative-adjuncts/liposomal-bupivacaine.mdx) — 16 refs; anchored on Ilfeld 2021 *Anesthesiology* 76-RCT review (only 11% clinically relevant benefit over standard bupivacaine); **CLEVELAND 2025 RCT** (LB TAP = plain bupivacaine TAP = saline placebo TAP); Ji 2021 14× financial-COI signal; urology-specific data (Chu 2021 LB-vs-epidural confounding vs Schmidt 2021 LB-vs-standard-bupivacaine no difference); preparation-rule warning admonition (lidocaine admixture, 96-h no-additional-LA rule).

### SEXI — new named-technique page

- [sexi-stance-exchange.mdx](docs/01-foundations/surgical-skills/sexi-stance-exchange.mdx) — single ICVTS 2005 ref (Hosseinpour / Hilton / Nashef); five SEXI maneuvers (Tissue Anchor, Tak, Saatvedt Swing, Large Flip, Pirouette) with cross-links to every existing surgical-skills technique. Added to the [surgical-skills index](docs/01-foundations/surgical-skills/index.mdx) techniques table at sidebar_position 5.

### GU Anastomotic Technique — new cross-cutting reference

- [gu-anastomotic-technique.mdx](docs/01-foundations/surgical-principles/gu-anastomotic-technique.mdx) built out from scratch then expanded — now **57 refs**; per-site step-by-step + evidence review: VUA (Van Velthoven steps + Meeks continuous-tension + Simone SKSR; Gallo 2-vs-4-vs-6-suture RCT; **Dadashian 2026 EASE RCT** with the top-5 microskills that predict watertightness and 100% tailored-feedback watertight rate; Perera porcine biomechanics; Ficarra urethral-fixation); Bricker vs Wallace full step-by-step + Al-Nader 2024 propensity-matched bilateral-stricture insight + Liu 2014 algorithm; **Pyeloplasty** (Anderson-Hynes; Gu-Luo 2024 1-mm-bite-depth data; Kim 2022 continuous-vs-interrupted meta; Nayyar ureter-first); **Bladder closure** (Duffy 2019 double-layer leak-pressure; Yalcin 2018 rabbit barbed-stone danger admonition); ureteral repair by location + Lich-Gregoir 10-step; urethroplasty graft fixation (Barbagli fibrin glue + ventral onlay + Sterling 2023 transurethral ventral inlay); PDS-in-urine surprise + Kerstein 2013 human-urine counterpoint.

### Barbed Sutures — new dedicated article

- [barbed-sutures.mdx](docs/01-foundations/surgical-principles/barbed-sutures.mdx) — 29 refs + 2 added (Gupta 2016, Cakici 2018); full product biomechanics (V-Loc 90/180 vs Quill vs Stratafix vs MONOFIX); the upper-tract pyeloplasty controversy (**Liatsikos 2013 83% Quill failure**, **Radford 2018 40% pediatric V-Loc failure** with plaque-like inflammatory histology, Sorokin counter-evidence, Anand 2022 meta with 6× non-significant redo trend); VUA success story (Zorn + Williams overtightening + Sammon + Li + Bai); **Stratafix renorrhaphy danger admonition** (Gupta 2016 82% vs V-Loc 24% failure at 3 wk with Lapra-Ty/Hem-o-lok); **Cakici 2018** bidirectional VUA RCT (76% vs 40% immediate continence); renorrhaphy WIT data (Bertolo SR, Olweny, Erdem, Liu PADUA, Hu RCT); Yalcin rabbit bladder-stone animal-model warning; Clapp 2020 MAUDE SBO review; clinical-decision framework. Sutures.mdx has a brief summary + info-callout pointing here.

### Surgical Principles — reorganized visually into three groups

Custom index.mdx replaces the `generated-index` with three `section-stack` groups (zero URL changes; sidebar_position renumbered):

- **Plastic Surgery Principles (1–5):** plastic-surgery-principles, reconstructive-ladder, wound-healing, flaps-gu-reconstruction, grafts-gu-reconstruction
- **General Surgical Technique (10–15):** incisions-closure, needles, sutures, barbed-sutures, bowel-anastomosis, surgical-ergonomics
- **GU-Specific Reconstruction Principles (20–22):** principles-gu-reconstruction, gu-anastomotic-technique, radiation-tissue-effects

`_category_.json` switched from `type: "generated-index"` → `type: "doc"` pointing at index. Build passes, pre-existing broken-link warnings (pharmacology → neuromodulation-adjuncts/desmopressin etc.) are unrelated and tracked as a separate cleanup item.

### Perioperative-care workflow pages — cross-reference boxes added

Before the References section of the three perioperative-care workflow articles, added "Pharmacology Hub Companion(s)" tables pointing up to their pharmacology-hub companions to prevent duplication drift:

- [steroids.mdx](docs/01-foundations/perioperative-care/preoperative-assessment/steroids.mdx) → [pharmacology/corticosteroids](docs/01-foundations/pharmacology/perioperative-eras/corticosteroids.mdx)
- [constipation.mdx](docs/01-foundations/perioperative-care/postoperative-management/constipation.mdx) → [bowel-preparation](docs/01-foundations/pharmacology/perioperative-eras/bowel-preparation.mdx) + [postop-bowel-ileus-management](docs/01-foundations/pharmacology/perioperative-eras/postop-bowel-ileus-management.mdx)
- [antithrombotic-therapy.mdx](docs/01-foundations/perioperative-care/perioperative-protocols/antithrombotic-therapy.mdx) → [vte-prophylaxis](docs/01-foundations/pharmacology/perioperative-eras/vte-prophylaxis.mdx) + [anticoagulation-reversal](docs/01-foundations/pharmacology/perioperative-eras/anticoagulation-reversal.mdx). Also updated the FXa inhibitor reversal line and reversal-plan checklist bullet to reflect **andexanet alfa's US market withdrawal** (4F-PCC is now first-line).

### Library / Resources overhauled

- **Navbar dropdown order:** Library → Resources (first), Journal Club, History & Lineage
- **Resources index order** (and sidebar_position renumbering): Videos & Surgical Atlases → Podcasts → Patient Resources → Textbooks → Websites & Online Tools → Hidden Curriculum
- **Websites page:** Equipment & Supplies moved to top; **Clinical Calculators & Tools** and **Anatomy & Reference** sections deleted; **theplasticsfella.com** added to Plastic Surgery & Microsurgery
- **Videos page** extensively reorganized. New section order: WARWIKI (single card linking to `/@warwikihq/playlists` with brand-blue accent border + 90+-playlists emphasized) → GU Reconstruction Channels → Urogyn & Pelvic Floor → Pediatric Urology → General Urology Channels → Adjacent Specialties (Colorectal & General Surgery) → Video Journals → Surgical Video Platforms & Databases. **Society & CME section deleted** (AUA University, Grand Rounds, SIUT moved into General Urology). Bollens and Gómez-Sancha moved from GU Recon to General Urology. VoidWell and Green Journal moved into Urogyn. Major additions: 18 general-urology channels (AINU, Wisc, UNC, UCSF Skills Lab, Case, Empire, NM, CHU Rennes, Pansadoro, Eun, Jiang, Dr Rad, Residents, 60 Minutes, Urofact, Urology Book, COVID), 3 adjacent-specialty (Behind The Knife, SAGES, Mark Soliman), 10 video-platform databases (Giblib, JOMI, VuMedi, WebSurg, SP Marathon, SurgQuest, Experts in Surgery, NARUS, SRS Sundays, SRS Webinars), 3 new GU Recon (GURS official, Virasoro, Sarychev), 2 Urogyn (Louisville Urogyn, Obstetric Fistula Masterclass), 2 pediatric (Urología Infantil, Bayne), and Kramer + Christine moved from general to GURS.
- **Podcasts page:** Urology Audio Guidelines feed added to `feeds` array (AUA-guideline audio summaries).

### Wound Healing Adjuncts — new article

- [wound-healing-adjuncts.mdx](docs/01-foundations/surgical-principles/wound-healing-adjuncts.mdx) — 28 refs; added to the Plastic Surgery Principles group at sidebar_position 6 (last in group). Covers tissue adhesives (Dermabond, Prineo + Kulkarni 2025 meta, Dumville Cochrane superiority-of-sutures caveat), Steri-Strips (Custis 2015 null finding), **Brölmann 2013 6-arm STSG donor-site RCT** (hydrocolloid 7 d faster, **gauze doubles infection rate — abandon as donor-site dressing**), NPWT (Zens meta, Gu 2025 DFU 87% vs 29%, Norman Cochrane ciNPWT, NPWTi-d instillation), ADMs (Integra two-stage, AlloDerm, Oasis), cellular skin substitutes (Apligraf, CEA, ReCell), amniotic membrane (Armstrong 2023 meta), PRP + becaplermin, HBOT. Framed around GU-reconstruction applications (phalloplasty STSG donor site, Fournier's post-debridement, ciNPWT Prevena for high-risk pelvic reconstruction, ADM for perineal recon, HBOT for radiation wounds). Cross-linked to the pharmacology [PRP hub](docs/01-foundations/pharmacology/dermatologic-topical-urethral/platelet-rich-plasma.mdx) for urologic-specific PRP uses (Peyronie's, ED, urethroplasty).

### Bladder Reconstruction — landing-page database + new channel article

- [04b-bladder-reconstruction/index.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/index.mdx) is now the **database landing page itself**. The standalone `bladder-reconstruction-database.mdx` page was deleted, and the landing now hosts the searchable table directly.
- The bladder-reconstruction database is organized into four domains: **Capacity / Reservoir**, **Outlet / Stenosis**, **Catheterizable Channels**, and **Outlet / Continence**. The earlier `Approach` column was removed for a cleaner, more uniform section-level view.
- [bladder-augmentation.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/bladder-augmentation.mdx) rebuilt as **Augmentation Cystoplasty** — full article covering indications, contraindications, segment selection (ileum / sigmoid / ileocecal / stomach), alternative augmentation strategies (autoaugmentation, SCLU, ureterocystoplasty, robotic augmentation), concomitant procedures, outcomes, stones / perforation / mucus / reoperation, metabolic consequences by segment, malignancy surveillance, and augmentation-vs-diversion framing.
- [catheterizable-channels.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/catheterizable-channels.mdx) added — Mitrofanoff principle, APV / Monti / Double Monti / Casale / TBF, stomal siting, concomitant augmentation / bladder-neck closure / MACE, outcomes, complications, predictors of success, robotic construction, and lifelong follow-up.
- Sidebar cleanup: the `bnc-vuas/` and `outlet-continence/` folders are now hidden via `className: "sidebar-hidden-category"` in their `_category_.json` files. Their individual technique pages remain reachable through explicit visible links from [bnc-vuas-reconstruction.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/bnc-vuas-reconstruction.mdx) and [catheterizable-channels.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/catheterizable-channels.mdx), so `npm run lint:orphans` passes.
- URL cleanup for consistency: the hidden technique pages no longer use flattened custom slugs. They now live at file-aligned nested paths under `/docs/surgical-techniques/04b-bladder-reconstruction/bnc-vuas/...` and `/docs/surgical-techniques/04b-bladder-reconstruction/outlet-continence/...`, and the landing/database links were repointed accordingly.

### April 24 follow-up — treatment-atlas landing-page pattern extended

- **Bladder Reconstruction** now follows a **principles-above-database** pattern. [04b-bladder-reconstruction/index.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/index.mdx) has three visible principles links above the searchable database:
  [augmentation-principles.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/augmentation-principles.mdx),
  [bladder-neck-reconstruction-principles.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/bladder-neck-reconstruction-principles.mdx),
  and [catheterizable-channels.mdx](docs/04-surgical-techniques/04b-bladder-reconstruction/catheterizable-channels.mdx), which was rewritten from a mixed overview into **Principles of Continent Catheterizable Channels**. The landing database was cleaned up to remove `Combined Abdominoperineal Approach`, and `bladder-augmentation.mdx` plus `bnc-vuas-reconstruction.mdx` were hidden from the sidebar via `sidebar_class_name: sidebar-hidden-item` while remaining directly linkable.
- **Urethral Reconstruction** now mirrors this pattern. [04a-urethral-reconstruction/index.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/index.mdx) has a visible principles block above a **tabbed database** using `@theme/Tabs` / `TabItem`, with **Male Urethral Reconstruction as the default tab** and Female as the second tab. New article:
  [urethral-reconstruction-principles.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/urethral-reconstruction-principles.mdx). The female dataset also now includes **Urethral Prolapse Repair**, currently linking to the clinical-conditions article at `/docs/clinical-conditions/03b-voiding-outlet/urethral-prolapse`.
- **Urinary Diversion** was reorganized into the same structure. The old standalone [urinary-diversion-database.mdx](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-database.mdx) was deleted and replaced by [04c-urinary-diversion/index.mdx](docs/04-surgical-techniques/04c-urinary-diversion/index.mdx) as the section landing page. A new principles article,
  [urinary-diversion-principles.mdx](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx),
  sits above the searchable diversion database. The diversion families on the landing are now grouped as **Incontinent**, **Continent Orthotopic**, **Continent Cutaneous**, and **Complex / Salvage**, and the database now explicitly includes **Cutaneous Ureterostomy** with a new stub page at [cutaneous-ureterostomy.mdx](docs/04-surgical-techniques/04c-urinary-diversion/cutaneous-ureterostomy.mdx).
- **Pattern guidance for future atlas sections:** the current preferred structure for treatment-atlas domains is:
  1. a section landing page that is itself the searchable database,
  2. a short **General Principles** block above that database linking to one or more cross-cutting principles articles,
  3. individual named-technique pages linked from the database,
  4. hide redundant overview pages from the sidebar when the landing page already serves that role.
- **Build status:** the new bladder / urethral / urinary-diversion landing-page work all passes `npm run build`. The only outstanding warnings remain the unrelated pre-existing pharmacology broken links (`imipramine`, `parasympathomimetics`, `phenazopyridine`, `phytotherapy`, `corticosteroids`).

### Organizational pattern guidance

The perioperative-pharmacology pair pattern (5 topic pairs) is the reference model for future cross-cutting topics:

- **Pharmacology hub** = drug-class pharmacology (agents, doses, FDA labels, evidence, safety ceilings)
- **Perioperative-care workflow** = bedside decisions, protocols, procedure-specific decision-making
- **Cross-reference box at the top or bottom of both pages** naming the companion
- **Single source of truth per fact** — agent dose in pharmacology; procedure-specific decision in perioperative-care
- **Flag the sister page** when a drug's status changes (e.g., andexanet withdrawal)

---

## Previous handoff snapshot — April 2026 (pharmacology-heavy sessions)

The previous snapshot covered the large pharmacology buildout. Preserved below for historical context:

### Perioperative-pharmacology pair session (April 24, 2026) — not yet committed

Built out six drug-class hubs in `pharmacology/perioperative-eras/` and `pharmacology/urinary-diversion-specific/` as **companion articles to existing perioperative-care workflow pages**. Pattern:

- **Pharmacology hub** = drug-class pharmacology (agents, doses, FDA labels, per-indication evidence, safety ceilings)
- **Perioperative-care workflow** = bedside decisions, protocols, Caprini-in-urology, bridging, etc.

Each hub opens with an explicit "this article is the drug-class hub; for workflow, see [perioperative-care article]" paragraph, and includes a **cross-reference table** near the end listing what sits on the workflow page to avoid duplication.

Built out:

- **Phenazopyridine** (`legacy-low-evidence/phenazopyridine.mdx`) — 5 refs; TRPM8 mechanism (Luyts 2023), 2-day rule, G6PD + methemoglobinemia + methylene-blue antidote paradox cross-link.
- **Imipramine** (`legacy-low-evidence/imipramine.mdx`) — 21 refs; only FDA-approved TCA for urology (childhood enuresis), five-mechanism table including vasopressin-independent antidiuretic effect; Kornholt 2019 negative SUI RCT; positioned vs TCAs hub.
- **Phytotherapy** (`legacy-low-evidence/phytotherapy.mdx`) — 24 refs; four-agent framework (saw palmetto / β-sitosterol / pumpkin seed / Pygeum); CAMUS negative vs Vela-Navarrete hexanic-Permixon positive; three counseling scenarios.
- **Parasympathomimetics** (`legacy-low-evidence/parasympathomimetics.mdx`) — 23 refs; legacy/specialty companion to existing cholinergic-agonists hub (Bethanechol Supersensitivity Test history, Riedl 2000 electromotive test, 2025 pyridostigmine RCTs, Japan's distigmine).
- **Mucus management** (`urinary-diversion-specific/mucus-management.mdx`) — 24 refs; saline as mainstay, NAC in-vitro-vs-clinical mismatch (N'Dow 2001 RCT negative), octreotide 75% reduction data, urea rescue, explicit de-prescribe for ranitidine/aspirin.
- **Vitamin B12 supplementation** (`urinary-diversion-specific/vitamin-b12-supplementation.mdx`) — 22 refs; anatomic-risk-by-segment table (Kock 80% Schilling+ vs ileal neobladder 0%), NCCN v1.2026 annual monitoring, oral B12 1–2 mg/day via passive diffusion as emerging standard, andrology cross-reference (Rastegar Panah testosterone).
- **Urinary acidifiers &amp; alkalinizers** (`urinary-diversion-specific/urinary-acidifiers.mdx`) — 33 refs; Müller 2020 continence-acidosis paradox (45 → 87%), KDIGO HCO₃⁻ &lt; 18 trigger, NH₄Cl loading test vs F+F test, ascorbic-acid "does not reliably acidify urine" + Ferraro 2016 male stone-risk 43% HR.
- **Corticosteroids** (`pharmacology/perioperative-eras/corticosteroids.mdx`) — 29 refs; six-domain framework (PONV/ERAS, mCRPC steroid switch, transplant rejection, contrast premed, IC/BPS Hunner, MET deflazacort). Explicitly cross-links to existing [Perioperative steroids](docs/01-foundations/perioperative-care/preoperative-assessment/steroids.mdx) for stress dosing / adrenal crisis / wound healing.
- **Post-op bowel &amp; ileus management** (`pharmacology/perioperative-eras/postop-bowel-ileus-management.mdx`) — 27 refs; alvimopan (Lee 2014 + Hanna 2021 ERAS-integrated), neostigmine-for-ACPO protocol, explicit de-prescribe-docusate, reconstructive-scope framing (diversion / augment / catheterizable channels). Companion to existing [Postoperative constipation &amp; ileus](docs/01-foundations/perioperative-care/postoperative-management/constipation.mdx).
- **Bowel preparation** (`pharmacology/perioperative-eras/bowel-preparation.mdx`) — 33 refs; five-study paradigm-shift table for no-MBP-before-ileal-conduit, Simhal 2025 NSQIP diversion-type-dependent OABP signal (ileal conduit vs continent diversion), sodium phosphate APhN boxed-warning danger admonition, Nichols neomycin + erythromycin / metronidazole, Calaway 2019 C. diff screening.
- **Anticoagulation reversal** (`pharmacology/perioperative-eras/anticoagulation-reversal.mdx`) — 26 refs; **andexanet alfa US withdrawal** anchored as headline news → 4F-PCC now primary for FXa inhibitor reversal. Idarucizumab gold standard for dabigatran (RE-VERSE AD). Vitamin K must be co-administered with PCC for warfarin. Protamine boxed warning + NPH/fish/vasectomy screening. Ciraparantag emerging. **Note:** [Antithrombotic therapy](docs/01-foundations/perioperative-care/perioperative-protocols/antithrombotic-therapy.mdx) still lists andexanet — needs updating to reflect withdrawal.
- **VTE prophylaxis** (`pharmacology/perioperative-eras/vte-prophylaxis.mdx`) — 23 refs; Caprini ≥ 7 threshold, Westerman 2022 apixaban compliance/safety data (70% of SUO members now use apixaban for extended prophylaxis), NCCN procedure-specific inpatient + 4-week extended prophylaxis, apixaban-after-bowel-resection absorption caveat, neuraxial-anesthesia timing.

**Organizational recommendation (from this session):** keep the pharmacology-hub-vs-perioperative-workflow split; it answers two different reader questions ("which agent and dose?" vs "what do I do at the bedside?"). Apply three disciplines to every pair: (1) cross-reference box at top of both pages; (2) single source of truth per fact (agent dose = pharmacology; procedure-specific decision = perioperative); (3) when a drug's status changes (e.g., andexanet withdrawal), immediately flag the sister page for update. Four perioperative-care workflow articles still need matching cross-reference boxes pointing up to their pharmacology hubs — quick cleanup job for a future session.

**Other housekeeping:** WARWIKI contact email updated in [about.mdx:91](src/pages/about.mdx:91) from `nseranio@gmail.com` → `warwikihq@gmail.com`.

### Pharmacology deep-dive session (April 23, 2026) — not yet committed

Twenty-plus pharmacology articles built out or augmented across six subsection sweeps (neuropathic-pelvic-pain, neuromodulation-adjuncts, infection-prophylaxis, sexual-medicine-andrology, hormonal-therapies, dermatologic-topical-urethral) **plus a major organizational migration** consolidating intraoperative-adjuncts from `tools/` into `pharmacology/`. All lint (`npm run lint`) and production builds (`npx docusaurus build --locale en`) pass cleanly. Pending commit as of this snapshot.

**Sexual Medicine & Andrology subsection (all seven articles built from stub):**

- **PDE5 inhibitors** (`sexual-medicine-andrology/pde5-inhibitors.mdx`) — 49 refs; FDA-approved ED + tadalafil-LUTS/BPH, post-RP rehab (Sari Motlagh network meta + REACTT + Jo 2018 immediate start), recurrent ischemic priapism (AUA/SMSNA 2022 + Hou 2021 4.4× ED-visit reduction + NO-resistance mechanism), Peyronie's disease-modifying (Spirito 2024 + Ilg PDE5i+SERM synergy), PE (Sun 2017 + Jin 2018), MET (Sharma 2021 tadalafil+silodosin), transplant tacrolimus PK, nitrate **Trolle Lagerros 2024 JACC mortality data**.
- **Intracavernosal injection agents** (`sexual-medicine-andrology/intracavernosal-injection-agents.mdx`) — 33 refs; AUA second-line ED; BiMix / TriMix / QuadMix / **Invicorp (Al-Mitwalli 2025)**; ICI for Peyronie's (**CCH REMS, IMPRESS, Ziegelmann 2023 incremental benefit per cycle, Goldstein 2020 5-y durability, Zucker 2024 corporal rupture 0.7%**); PDUS diagnostic; **phenylephrine rescue** for ICI-induced prolonged erection.
- **Intraurethral alprostadil** (`sexual-medicine-andrology/intraurethral-alprostadil.mdx`) — 20 refs; MUSE applicator technique, **Padma-Nathan 1997 NEJM pivotal (65% vs 18%)**, real-world efficacy 35–78%, Shabsigh 2000 and Shokeir 1999 head-to-head vs ICI (efficacy vs acceptability trade-off); ACTIS band rescue; MUSE + PDE5i combination for salvage; McCullough 2010 post-RP rehab equivalent to sildenafil.
- **Testosterone replacement** (`sexual-medicine-andrology/testosterone-replacement.mdx`) — 31 refs; **TRAVERSE 2023 resolving MACE non-inferiority**, Snyder 2024 fracture paradox, 2025 NEJM reframing (libido yes, ED no); full formulation table including oral undecanoate (Jatenzo / Tlando / Kyzatrex) and nasal Natesto; T4DM vs TRAVERSE glycemic contrast; **prostate-cancer safety** (TRAVERSE substudy; Baik 2025 Medicare HR 0.84; García-Becerra 2026 41-RCT meta; saturation-model rationale; Kaplan / Gibson / Santucci for PCa survivors); fertility-preservation alternatives.
- **Androgen adjuncts** (`sexual-medicine-andrology/androgen-adjuncts.mdx`) — 37 refs; hCG only FDA-approved agent; **Habous 2018 RCT** clomiphene / hCG / combination equivalence; Muir 2025 meta for HH spermatogenesis induction; enclomiphene investigational; **Helo 2015 head-to-head CC vs anastrozole RCT** (CC higher T, AI higher T/E2, neither PRO); **Burnett-Bowie 2009 anastrozole bone-loss signal** + Russell 2019 review; five-row combination-strategy table.
- **Peyronie's disease agents** (`sexual-medicine-andrology/peyronies-disease-agents.mdx`) — 26 refs; CCH only FDA-approved (IMPRESS 17°, Hellstrom 2019 real-world, **Ziegelmann 2023 pooled incremental benefit per cycle**, Goldstein 5-y durability, Zucker 2024 0.7% corporal rupture); IFN α-2b (Tulane / ventral plaques); verapamil Cochrane very-low-certainty + EAU recommends-against; **explicit AUA do-NOT-offer list** (vitamin E, tamoxifen, procarbazine, omega-3, E+carnitine); acute-phase tadalafil (Spirito 2024) + pentoxifylline; emerging PRP (Ledesma Phase 2, Dachille, Zugail) and hyaluronic acid.
- **Priapism management** (`sexual-medicine-andrology/priapism-management.mdx`) — 25 refs; intracavernosal phenylephrine protocol with standard and CV-risk dilutions; Scarberry 2022 / Sidhu 2018 / Ridyard 2016 / Muruve 1996 efficacy; methylene blue Martínez Portillo 100% CCIT-induced rescue; Lowe-Jarow 1993 terbutaline RCT; prevention anchored on **counterintuitive daily PDE5i** (Burnett 2006 / 2014 RCT / Hou 2021 4.4× reduction + Pereira NO-resistance mechanism), **Hoeh-Levine 2014 ketoconazole-prednisone 94% success**, etilefrine, hormonal suppression with explicit fertility impact; Idris 2025 hydroxyurea-driven SCD benefit.

**Hormonal Therapies subsection (all five articles built from stub):**

- **Vaginal and topical estrogen** (`hormonal-therapies/vaginal-topical-estrogen.mdx`) — 34 refs; AUA/CUA/SUFU 2022 rUTI recommendation; full formulation table with systemic-absorption gradient (Imvexxy 4 µg → Estring 7.5 µg/day → Vagifem → creams); Chen 2021 meta (RR 0.42 vaginal vs RR 1.11 oral); **Tan-Kim 2023 Kaiser n=5,638 51.9% reduction**; **Srinivasan 2022 JAMA Netw Open 26% → 80% Lactobacillus-dominant microbiome**; Harncharoenkul 2026 UUI RCT; Beste 2025 / McVicker 2024 *JAMA Oncol* / Agrawal 2023 / Cold 2022 breast-cancer-survivor safety data; **November 2025 FDA boxed-warning removal** (Sriprasert 2026 / Bartz 2026 *JAMA*).
- **Vaginal DHEA (prasterone)** (`hormonal-therapies/vaginal-dhea.mdx`) — 21 refs; intracrinology mechanism (Cellai 2021); **Labrie 2018 pivotal**; **Labrie 2015 all-six-FSFI-domain signal** (the defining differentiator from vaginal estrogen); Ke/Martel 2015–2016 LC-MS/MS showing serum E2 below postmenopausal; NCCTG 2018 AI-user systemic-E2-unchanged data; Mension 2022 VIBRA pilot in breast cancer survivors on AIs; Archer 2017 indirect comparison vs CEE and estradiol.
- **Ospemifene** (`hormonal-therapies/ospemifene.mdx`) — 27 refs; SERM tissue-selectivity (vaginal agonist + bone agonist + breast antagonist); take-with-food rule (2.3× Cmax); fluconazole 2.7× AUC collision; pivotal + Di Donato / Simon 2023 NMA; **OAB / UUI as strongest off-label signal** (Schiavi 2017/2018 + Novara 2020 first-line-refractory + Russo 2023 urodynamic); Constantine 2015 endometrial safety; **Nordstrom 2020 MarketScan VTE ~1/3 other SERMs**; FDA-contraindicated-vs-EMA-approved breast-cancer divergence with PEONY 6- and 12-month data.
- **Preoperative hormonal priming** (`hormonal-therapies/preoperative-hormonal-priming.mdx`) — 15 refs; framed around the **IMPROVE trial** as evidence-turning-point (Rahn 2023 *JAMA* + Rahn 2024 *AJOG* 3-yr); Rahn 2014 biopsy RCT (1.8× epithelium, 6× collagen Iα1 mRNA); Balgobin animal model; Vodegel 2022 meta; **supported claims** (tissue quality, Marschalek 2021 postop complications + antibiotic use, Taithongchai 2023 Cochrane UTI RR 0.49, **Zhou 2025 *BMJ* pessary-tolerance RCT**) vs **unsupported claims** (prolapse recurrence, surgical success, preop symptoms, sling mesh exposure); Cadish 2016 negative sling-mesh signal.
- **Gender-affirming hormone therapy** (`hormonal-therapies/gender-affirming-hormone-therapy.mdx`) — 25 refs; Endocrine Society 2017 + WPATH v8 / ACOG 2021 / AAFP 2023 framework; feminizing table with **17β-estradiol preferred over ethinyl estradiol (20× VTE signal)**; spironolactone / cyproterone (not US) / GnRHa / finasteride antiandrogens; masculinizing testosterone regimens mirroring hypogonadism care; **van Zijverden 2025 Dutch cohort** (transfeminine MI SIR 0.50 / VTE 1.81; transmasculine MI SIR 4.20 / stroke 1.55); **Skeith 2026 NEJM CV-VTE review**; puberty-suppression with Nos 2022 *JAMA Netw Open* delaying-not-accelerating data; **De Roo 2025 fertility-preservation SR**; da Silva 2024 94% pelvic-floor-dysfunction prevalence on T; cancer screening by anatomy (PSA >1 ng/mL upper-limit on estrogen); perioperative 4–6 wk estrogen hold.

**Neuropathic & Pelvic Pain subsection:**

- **Topical compounded agents** (`neuropathic-pelvic-pain/topical-compounded-agents.mdx`) — 29 refs; framed around the **Brutcher 2019 *Ann Intern Med* negative RCT** (n=399) as critical context, then individual-agent evidence for urogenital use (lidocaine strongest — Zolnoun overnight 5% ointment + ACOG breast-cancer-survivor 4% aqueous consensus + Vestibulodynia UPDATe NCT03844412; gabapentin 6% Boardman retrospective; amitriptyline-ketamine Mayo 85% response; baclofen 5% + PEA case data; common-formulations table; Vulvodynia Therapeutic Research Summit 2024 directions).
- **Local anesthetics** (`neuropathic-pelvic-pain/local-anesthetics.mdx`) — 59 refs covering **twelve urologic domains**: intraurethral jelly + cystoscopy (Raskolnikov/Desai multimodal data), prostate biopsy (Kim 2019 network meta — PPB+IRLA / PNB+IPLA), intravesical lidocaine for IC/BPS (AUA Grade B; LiRIS Nickel 2012; TRG-100 Raisin 2023), penile nerve block (APS/ASRA/ASA + Park 2025 LAST SR with infant-risk data), vasectomy (AUA + Aggarwal LIA+SCB + Shih mini-needle), PE topicals (Fortacin / EMLA / 5% spray), vulvodynia anchors, pudendal + pelvic-floor TPI (Antolak, Levin, ACOG CPP), TAP block and wound infiltration (Zayed, Zako 2025 123-RCT meta, **UROTAP RCT showing wound-LA ≈ US-TAP**), EAU retrograde stenting under LA (Pischetola 2025 89% success), hydrodistension under LA (Aihara, EMDA Rose), and a dedicated LAST safety section with per-agent dose ceilings and the 20%-lipid-emulsion protocol call-out.

**Neuromodulation Adjuncts subsection:**

- **Botulinum toxin** (`neuromodulation-adjuncts/botulinum-toxin.mdx`) — 50 refs; dual efferent+afferent+anti-inflammatory mechanism table; OAB 100 U (AUA/SUFU 2024 bypass-oral policy; Nitti 2013 pivotal; Nitti 2016 3.5-yr; Hsieh 2025 RCT vs soli+mira); NDO 200 U (Ginsberg AUA/SUFU 2021; Sanford review; **Tullman 2018 Class I low-dose 100 U for noncatheterizing MS**; Rovner 4-yr 100% UI reduction data; Wang 2026 personalization); **ROSETTA 2016** head-to-head with Hendrickson 2024 fluctuation + Yang 2020 crossover + Richter 2017 secondary analysis; Eilber 2025 expert-consensus technique with 360 U / 3-month ceiling; predictors (Abrar — male sex OR 5.45; Hsiao; Hanna 2026 cytokine biomarker); off-label IC/BPS (Pinto intratrigonal), DSD (Goel meta; Huang concomitant detrusor+EUS; Lee 2025 DSD-grade predictors), PBNO (Sacco; Lee 2025), decisive **negative BPH data** (Marberger, McVary), CP/CPPS (Falahatkar intraprostatic dramatic signal vs Dessie negative RCT for women's pelvic-floor injection), and novel afferent-selective delivery (lipotoxin Chuang/Kuo; TC-3 hydrogel; ESW).

**Infection & Prophylaxis subsection:**

- **Perioperative antibiotic prophylaxis** (`infection-prophylaxis/perioperative-antibiotic-prophylaxis.mdx`) — augmented from existing PUMP-framed article with new sections and 12 new references (now 19 total): preoperative urine culture + **IDSA 2019 ASB split** (endoscopic vs prosthetic) + **TOCUS 2024** (positive culture OR 3.68 for febrile infection); national trends for IPP (Brant 2023 n=26,574) and AUS (Sun 2023 n=9,775) guideline-adherence; prostate biopsy TR (Pilatz 2020 EAU meta) vs TP (**NORAPP 2022 Jacewicz *Lancet ID* non-inferiority**; Xiao 2025 Cochrane); radical cystectomy PAP duration (**Thurnheer 2024 *JAMA Netw Open* RCT**; Mohamed 2026 meta — ≤24 h non-inferior); SSI risk factors (Grabe 2012 EAU tentative classification; Seidelman 2023 *JAMA* review).
- **UTI treatment antibiotics** (`infection-prophylaxis/uti-treatment-antibiotics.mdx`) — augmented with 8 new references (now 24 total): **pivmecillinam (Pivya)** FDA-approved 2024 and **gepotidacin (Blujepa)** FDA-approved 2025 (EAGLE-2 / EAGLE-3) added as first-line; **cefepime-enmetazobactam** (Kaye 2022 *JAMA* superior to pip-tazo) and **plazomicin** added to MDR table; **cefepime-taniborbactam** enhanced with **CERTAIN-1 *NEJM* 2024**; new men's-UTI 7-day subsection; **Kim 2020 *Lancet ID* network meta** on cystitis duration; **IDSA 2025 four-step empiric framework** with explicit ≥90% / ≥80% local-antibiogram susceptibility thresholds for septic shock vs sepsis, IV-to-oral transition criteria, and the **7-day bacteremia shortening** (vs historical 14).
- **UTI suppressive &amp; prophylactic** (`infection-prophylaxis/uti-suppressive-prophylactic.mdx`) — 21 refs; built from stub as the **stepwise framework** anchor (AUA/CUA/SUFU 2022 + WikiGuidelines 2024): vaginal estrogen first-line in postmenopausal, **ALTAR non-inferiority RCT** of methenamine vs daily antibiotics, **ImpresU 2025 placebo-controlled phase IV** with post-discontinuation rebound data, *frmRAB* formaldehyde-resistance signal (Hodgkinson 2026), cranberry ≥36 mg PAC, **negative MERIT D-mannose RCT** (Hayward 2024), Jent 2022 antibiotic-prophylaxis meta (85% reduction), continuous / post-coital / self-start regimen tables, OM-89 / MV140 / Urovac immunoprophylaxis, and special-population handling (pregnancy, transplant, SCI, post-reconstruction / diversion).
- **Non-antibiotic UTI prevention** (`infection-prophylaxis/non-antibiotic-uti-prevention.mdx`) — 29 refs; built from stub as the **prescribing-detail deep-dive** complement: **Han 2025 network meta** anchor (50 RCTs / 14 interventions); vaginal estrogen formulation table with **Tan-Kim 2023 n=5,638 real-world 51.9% reduction**; methenamine pharmacology with urea-splitter caveat; cranberry with **Stonehouse 2025 whole-fruit-powder multicenter RCT** (52% reduction); MERIT-negative D-mannose; Hooton 2018 hydration RCT; probiotics (pediatric subgroup signal); Uro-Vaxom (Bauer 2005 + Volontè 2025 SR); vitamin D via cathelicidin (Hertting mechanism + Jorde 20,000 IU RCT + D-Health Pham); intravesical HA/CS refractory tier (Damiano / Corona 2025 / Goddard); and the **Kwon 2026 intravesical-aminoglycoside meta (IRR 0.23)** as the strongest intravesical signal.

### Prior snapshot content (below) — carried forward through the April 21 commit batch

### Fistulas (03f) — every primary article rebuilt to depth

- `aa96ac1` **VVF** — rebuilt with 19 refs; Goh + Waaldijk + simple/complex; double-dye + 10–12% concurrent ureteral injury; timing-of-repair (immediate vs early vs delayed vs long-radiation delay); transvaginal Latzko / classic flap vs robotic O'Conor; interposition table with Browning's negative Martius data in obstetric VVF.
- `4b69bb6` **VUF** — 27 refs, anchored on Bonavina 2024 systematic review; Youssef syndrome; Józwik I-III; one-way-valve diagnostic challenge → uterine-side contrast (HSG, intrauterine CEUS); GnRH-agonist hormonal management exploiting endometrial-like tract lining; uterine-sparing robotic O'Conor; fertility outcomes.
- `747c8cd` **UVF** — 21 refs; AUA-stent-first algorithm with Bahuguna time-dependent stenting (95% &lt; 2 wk → 20% &gt; 6 wk); Dallas immediate-vs-delayed recognition (0.7% vs 3.4%); three anatomic danger zones; Kidd robotic ureteroneocystostomy 100%/1-day-LOS data. Cross-links to Ureteral Stricture for distal-reconstruction technique.
- `845f3fc` **RVF** — 17 refs around the **ASCRS 2022 stepwise algorithm** (Recommendations 12–18); Pastier head-to-head Martius-vs-gracilis; Swindon Martius meta (91% primary, 95% radiation); GRECCAR delayed-coloanal data; Söderqvist outcome differential (traumatic 92% vs inflammatory 46% final healing).
- `90b3db1` **Obstetric Fistula** — 33 refs; obstructed-labour-injury-complex pathogenesis; Waaldijk/Goh/Panzi (Capes head-to-head favors Goh); Mourad multinational 1,185-repair series + adjuncts; Fistula Foundation 87% across 24,568 repairs; full POFRI section per FIGO 2025 expert opinion; COFFEE CBT psychosocial intervention; Three Delays prevention model.
- `9b781c7` **RUF** — 40 refs; treatment-specific incidence; Muñoz etiologic + Mundy/Andrich complexity; Lahey transperineal-gracilis algorithm (Vanni/Kaufman/Harris 84–100%); York-Mason for non-irradiated (van der Graaf 2025 RARP series, McKibben Wexner data, Dafnis 15-yr); MITAR/TAMIS/robotic options; the irradiated 17%-vs-87% interposition data; Khouri concurrent-urethroplasty data; Wagner 2026 long-term PROMs; Martins permanent-dual-diversion legitimacy. **Three video resources linked at the end.**
- `90d5d90` **UCF** — 34 refs; Khosravi 2026 meta risk factors; Horton-Devine-Graham classification; Choudhury 2023 waterproofing meta (TVF/scrotal 94–95% vs simple closure 73%); Fahmy algorithm (double dartos for primary distal; TVF for proximal/redo/fistula-repair); Myers/McAninch failed-childhood-hypospadias adult section; Raup neurogenic-bladder 81% diversion data; Sen catheterless adult repair.
- `bfaf0e5` **UPF** — 37 refs; **CUPF** with the Cheng diagnostic-discriminator table preventing misdiagnosis as urethral duplication or H-type RUF; acquired UPF with etiology-specific management (Fournier's, PFUI ± urethrorectal, post-urethroplasty, LS, neurogenic); Guo 91% gracilis-interposition; Klemm 2024 long-term PROs framing **definitive perineal urethrostomy as a legitimate primary option** (use rose 4.3% → 38.7% with 95% success per Fuchs).

### Section restructures

- `9ea266c`, `279d996` **Upper Tract (03e):** UPJ Obstruction (19 refs) and Ureteral Stricture (33 refs) filled; **renovascular-conditions stub deleted**.
- `279d996` **Fistulas sidebar reorder:** Females (1) → Males (2) → Both Genders (3); index sections rebuilt in the same order.
- `279d996` **Genital & Scrotal (03g):** removed `male-infertility.mdx`; added Vaginal Cysts & Masses stub.
- `279d996` **Men's Health (05d):** pruned to **only `hypogonadism-testosterone.mdx`** (deleted bph-luts, cancer-survivorship-sexual-med, erectile-dysfunction-medical, male-infertility).
- `279d996` **Women's Health (05e):** pruned to **GSM** + new top-level stubs (Sexual Dysfunction, Recurrent UTI, STIs); **new Preventative Care subsection** with Cancer Screening (cervical/breast/endometrial), HPV Vaccination, and Osteoporosis Screening.
- `273fc7e` **Pelvic Pain (03h):** deleted `pudendal-neuralgia.mdx` and `myofascial-pelvic-pain.mdx`, consolidated into a comprehensive **Chronic Pelvic Pain** article (36 refs) following the ACOG 2020 biopsychosocial framework.
- `5fe39aa` **Pelvic Pain GSM stub deleted**; canonical GSM lives at `/docs/special-populations/05e-womens-health/gsm`. Inbound links repointed (POP, urethral prolapse, chronic-pelvic-pain).
- `0891f08` **Pharmacology promoted to its own top-level Foundations subsection** at position **6** (just above [Tools](docs/01-foundations/tools/index.mdx) at position 7). Directory moved from `tools/pharmacology/` → `pharmacology/`. All inbound URLs and category-link IDs repointed.

### Other clinical articles built this session

- `aa96ac1` etc. — **Vesicovaginal**, **Vesicouterine**, **Ureterovaginal**, **Rectovaginal**, **Obstetric**, **Rectourethral**, **Urethrocutaneous**, **Urethroperineal** Fistulas (all listed above).
- `9e072d0` **Peyronie's disease** — 50 refs; AUA/EAU/CUA/ISSM Guideline-of-Guidelines framework; Levine surgical algorithm; CCH, RestoreX PTT, IPP with Hammad multicenter adjuncts data; PROPPER depression-reduction.
- `ec288c3` **Buried penis** — 34 refs; AABP vs congenital BP; obesity-LS-stricture vicious cycle; Mirastschijski / Hesse / Pariser-Santucci classifications; Pekala 7% SCC + 35% premalignant; Daly 2025 LS+stricture cohort; modern operation (escutcheonectomy + STSG + panniculectomy + scrotoplasty); Chestnut BMI-driven risk data.
- `0121580` **Vaginal cysts and masses** — 45 refs; Müllerian most common (34–44%); Gartner-cyst cystocele-mimic; AMFB-vs-aggressive-angiomyxoma 30–40% recurrence; VAIN management; primary vaginal cancer per NCCN 2026; location-based diagnostic differential.

### Earlier pharmacology sweeps (pre-desmopressin batch)

Prior pharmacology work completed before the desmopressin-through-NSAIDs batch. All articles follow the same WARWIKI reconstructive-surgeon voice, inline `<sup>[[N]](#refN)</sup>` citations, and class-hub / agent-deep-dive split where appropriate.

- **Neuropathic pelvic pain:** `topical-compounded-agents.mdx` (29 refs) and `local-anesthetics.mdx` (59 refs across 12 urologic domains).
- **Neuromodulation adjuncts:** `botulinum-toxin.mdx` (50 refs) — OAB / neurogenic DO / IC-BPS / pelvic-floor myofascial / priapism-prevention uses; detrusor injection technique.
- **Infection & prophylaxis:** `perioperative-antibiotic-prophylaxis.mdx` (19 refs), `uti-treatment-antibiotics.mdx` (24 refs), `uti-suppressive-prophylactic.mdx` (21 refs), `non-antibiotic-uti-prevention.mdx` (29 refs), `antifungals.mdx` (13 refs), `prosthetic-infection-biofilm.mdx` (26 refs).
- **Sexual medicine / andrology:** `pde5-inhibitors.mdx` (49 refs), `intracavernosal-injection-agents.mdx` (33 refs), `intraurethral-alprostadil.mdx` (20 refs), `testosterone-replacement.mdx` (31 refs), `androgen-adjuncts.mdx` (37 refs), `peyronies-disease-agents.mdx` (25 refs), `priapism-management.mdx` (24 refs).
- **Hormonal therapies:** `vaginal-topical-estrogen.mdx` (34 refs), `vaginal-dhea.mdx` (21 refs), `ospemifene.mdx` (27 refs), `preoperative-hormonal-priming.mdx` (15 refs), `gender-affirming-hormone-therapy.mdx` (25 refs).
- **Dermatologic / topical / urethral:** `high-potency-topical-corticosteroids.mdx` (34 refs), `topical-calcineurin-inhibitors.mdx` (34 refs), `intralesional-corticosteroids.mdx` (~30 refs after dedupe), `antimitotics-antifibrotics.mdx` (35 refs), `drug-coated-balloon-therapy.mdx` (17 refs — Optilume deep-dive), `platelet-rich-plasma.mdx` (31 refs after dedupe).

### Intraoperative-adjuncts migration (Tools → Pharmacology)

The intraoperative-adjuncts tree was consolidated out of `tools/` and now lives only under `pharmacology/`.

- **Moved** `tools/intraoperative-adjuncts/{visualization-agents,tissue-sealants,hemostatic-agents}/` and all children → `pharmacology/intraoperative-adjuncts/`. Deleted the `tools/intraoperative-adjuncts/` tree entirely.
- **Rewrote** `pharmacology/intraoperative-adjuncts/index.mdx` with the `section-stack` + "Which Adjunct, When?" framework table and a "Relation to other Foundations subsections" table at the bottom.
- **Built out the visualization-agents hub** (`visualization-agents/index.mdx`, 37 refs) alongside the migrated per-agent deep-dives (ICG, methylene blue, indigo carmine, sodium fluorescein, pudexacianinium/ASP-5354).
- **Fixed migrated `_category_.json` files** — several still had stale `id: foundations/tools/intraoperative-adjuncts/...` that needed repointing to `foundations/pharmacology/intraoperative-adjuncts/...`. Required `rm -rf .docusaurus build` to clear Docusaurus cache before the error cleared.
- **Updated `tools/index.mdx`** to remove the intraoperative-adjuncts section-stack entry; intro paragraph now points readers to the Pharmacology location for adjuncts.
- **Bulk-repointed inbound links** `/docs/foundations/tools/intraoperative-adjuncts` → `/docs/foundations/pharmacology/intraoperative-adjuncts` across `docs/` and `src/`.

### Integrity checks and fixes (same earlier batch)

- **Duplicate-DOI scan** flagged several articles with the same citation stored under two different `refN` anchors. Consolidated via Edit `replace_all` + deletion of the duplicate anchor, then ran `scripts/fix-citations.js` to renumber. Caught in: `intralesional-corticosteroids.mdx` (ACOG 224 as ref2/ref24, Trost 2007 as ref4/ref18), `peyronies-disease-agents.mdx` (Russo 2018 as ref14/ref17), `priapism-management.mdx` (Sidhu 2018 as ref4/ref6), `platelet-rich-plasma.mdx` (Asmundo 2024 as ref4/ref9 — also cleaned residual `[[4]](#ref4)[[4]](#ref4)` from the replace_all).
- **Broken cross-reference** in `pde5-inhibitors.mdx` — URL used the stripped-prefix filename convention (`5-alpha-reductase-inhibitors.mdx` serves at `/alpha-reductase-inhibitors`); fixed path and removed a stale `/priapism` link.
- **Orphan `ref17`** in `drug-coated-balloon-therapy.mdx` — FIRST-CARE protocol was citing ref12 (Jelisejevas) instead of ref17 (Mahdi); repointed.

### Pharmacology buildout (all new in this session)

The Pharmacology subsection now has substantially deeper drug-class articles. All written in the WARWIKI reconstructive-surgeon voice with full FDA-label safety data and consistent cross-linking among classes:

- `4d6d937` **Desmopressin** — 22 refs; nocturia / NP, pediatric enuresis (the only FDA-approved urologic indication), neurogenic LUTD, perioperative hemostasis (mild hemA / vWD I), CDI; comprehensive hyponatremia section per FDA boxed warning.
- `ad638b3` **Cholinergic agonists** — 14 refs; bethanechol per FDA label with the absolute outlet-obstruction contraindication; cholinesterase inhibitors as not-in-US-practice; CIC outperforms.
- `8f6b8e0` **Skeletal muscle relaxants** — 22 refs; **focused on systemic SMRs (baclofen, dantrolene, diazepam, cyclobenzaprine)**; defers BoNT-A and α-blockers to their own articles; vaginal-diazepam adjunct-only framing.
- `5a78523` **Intravesical IC/BPS agents** — 23 refs; DMSO per Rimso-50 label + 2025 Li meta; cocktail recipes (DMSO classic, heparin-lidocaine, BTH); HA / CS / HA+CS GAG-replenishment with Cervigni equivalent-to-DMSO RCT; defers BoNT-A to neuromodulation-adjuncts article.
- `25e5237` **Gabapentinoids** — 38 refs; all 7 urologic uses; Pontari pregabalin RCT; Agarwal NNT 2.9 favoring gabapentin in CP/CPPS; **GaPP2 negative for women's CPP**; perioperative meta and Rosen URS RCT showing **no benefit / increased pain** → not recommended; dedicated underrecognized-AE section (Hamed 41% sexual dysfunction).
- `393b5e9` **TCAs** — 39 refs; 8 urologic uses; van Ophoven and Foster 2010 RCTs in IC/BPS with the ≥ 50 mg/day efficacy threshold; imipramine for childhood enuresis (only FDA-approved urologic TCA indication); low-dose doxepin for sleep-fragmentation nocturia; urinary retention as the most common urologic ADR (OR 3.30).
- `514e980` **SNRIs** — 46 refs; Onuf's-nucleus mechanism explaining storage-phase sphincter facilitation; **duloxetine EU-approved (not US) for SUI**; PPUI as bridge therapy with the Filocamo "U-turn" caveat; OAB Steers RCT and central-pathway Wróbel preclinical; Zhang doxazosin + duloxetine vs sertraline in CP/CPPS; Trinchieri OR 3.30 voiding-disorder signal; Asnis tamsulosin-rescue strategy.
- (current commit) **NSAIDs & analgesics** — 46 refs; renal-colic first-line; SKOPE RCT; NOPIOIDS protocol (cystectomy / nephrectomy / RP — 80.9% → 2.2% discharge opioid rate); ORIOLES 77% unused; AUA expert-panel maximum-tablet table; phenazopyridine FDA + TRPM8 mechanism; nephrotoxicity section for the urologic patient; the NSAID-ED confounding-by-indication conclusion.

### Current clinical-conditions structure notes (updated)

- **Subsections 03a–03i:** Storage & Incontinence, Voiding & Outlet, Pelvic Support, NLUTD, Upper Tract, Fistulas, Disorders of Genitalia, Pelvic Pain, Defecatory Disorders.
- **03e Upper Tract** — UPJ Obstruction, Ureteral Stricture (renovascular-conditions stub deleted).
- **03f Fistulas** — Females (sidebar position 1) → Males (2) → Both Genders (3); every primary article filled to depth.
- **03g Disorders of Genitalia** (renamed from "Genital & Scrotal Disorders" in this session) — male-infertility removed (canonical in Men's Health); Vaginal Cysts & Masses added; Müllerian Anomalies & Vaginal Agenesis moved here from Women's Health.
- **03h Pelvic Pain** — IC/PBS, Chronic Pelvic Pain (consolidates pudendal-neuralgia and myofascial-pelvic-pain content); GSM lives in 05e Women's Health, not here.
- **05d Men's Health** — only Hypogonadism & Testosterone.
- **05e Women's Health** — GSM, Sexual Dysfunction, Recurrent UTI, STIs, Preventative Care subsection (Cancer Screening with cervical/breast/endometrial; HPV Vaccination; Osteoporosis Screening).

### Current Foundations structure notes (updated)

- **01-foundations** subsections in sidebar order: Anatomy & Physiology (2) → Surgical Principles (3) → Surgical Skills (4) → Perioperative Care (5) → **Pharmacology (6)** → **Tools (7)**.
- **Pharmacology** is now its own top-level subsection at `docs/01-foundations/pharmacology/` (moved from `docs/01-foundations/tools/pharmacology/` in `0891f08`). All category-link IDs and inbound URLs were repointed in the same commit.
- **Tools** intro paragraph and section list **no longer include pharmacology** — Tools now covers instruments, technology, biomaterials, intraoperative adjuncts, and gear.

Before starting new work, run `git status --short` and expect a clean tree unless the user has made changes.

---

## Rules for agents — read before writing

Before writing or modifying an article:

1. **Scope.** Primary topics must fit reconstructive / functional urology / urogynecology. **Out of scope** as primary topics: endourology (PCNL, URS for stones) and primary urologic oncology (cancer cystectomy / nephrectomy / prostatectomy). Body mentions as *reconstructive context* are fine (post-PCNL stricture, post-cystectomy reconstruction, RUF after prostatectomy). See `feedback_site_scope.md`.
2. **Voice.** Frame every article around surgical/operative relevance for the reconstructive surgeon — not general medicine. Cut subspecialty depth that belongs elsewhere (nephrology tubular transport, IBD pathophysiology, HPV molecular biology, etc.). See `feedback_article_voice.md`.
3. **Citations.** Real, DOI-linked references only. Default pattern: inline `<sup>[[N]](#refN)</sup>`, reference list with `<a id="refN"></a>N. …` anchors. GAS articles use footnote-style (`[^N]`). Do not fabricate citations.

Before committing:

4. **Run `npm run lint`** — scope + citations + orphans all must pass.
5. **If you added or filled stubs**, run `npm run status` to refresh `docs/_STATUS.md`.
6. **If you added an article**, run `npx docusaurus build --locale en` to catch broken links and MDX errors.

Common pitfalls:

- **Unescaped `<` in prose breaks MDX** — use `&lt;35 kg/m²` (any `<` followed by a letter or digit starts a JSX tag).
- **`useDoc()` imports from `@docusaurus/plugin-content-docs/client`** — NOT `theme-common/internal` (that doesn't export `useDoc` in v3.10).
- **Filename numeric prefix strips to URL** — `5-alpha-reductase-inhibitors.mdx` serves at `/alpha-reductase-inhibitors`. Factor into cross-links.
- **Same-name file/dir collapses URL** — `oral-cavity/oral-cavity.mdx` serves at `/docs/.../oral-cavity` (not `.../oral-cavity/oral-cavity`).
- **Landing pages use `hide_title: true`** — this auto-suppresses the TTS ArticleListener.
- **Hidden category pattern:** `{"className": "sidebar-hidden-category"}` hides a subdir from sidebar while keeping its pages linkable (used for `flaps/`, `grafts/`, `surgeons/`, `procedures/`).

---

## Project Overview

**WARWIKI** is a Docusaurus v3 medical reference wiki for functional urology and genitourinary reconstruction. It is authored and edited by **Nicolas Seranio, MD** (Editor in Chief) and advised by **Humberto Villarreal, MD** (Senior Advisor). The site is deployed at **https://www.warwiki.org**.

- **Tagline:** *Reconstruction, codified.*
- **Homepage:** `WARWIKI` heading is a link to `/docs/foundations`; large "Where should we start?" search pill below opens the Algolia DocSearch modal. No ENTER button.
- **Target audience:** urology residents, fellows, reconstructive surgeons, urogynecologists. Content is written for specialists, not patients.
- **Brand aesthetic:** deep blue (`#185FA5`), clean and academic, inspired by medical journals. NOT a consumer health site.

---

## Repository Structure

```
warwiki/
├── docs/                          # All MDX content
│   ├── 01-foundations/            # → /docs/foundations
│   ├── 02-evaluation/             # → /docs/evaluation
│   ├── 03-clinical-conditions/    # → /docs/clinical-conditions
│   ├── 04-surgical-techniques/    # → /docs/surgical-techniques
│   ├── 05-special-populations/    # → /docs/special-populations
│   ├── 06-journal-club/           # → /docs/journal-club
│   ├── 07-roots/                  # → /docs/roots (history + surgeon profiles) — section label: "History & Lineage"
│   └── 08-resources/              # → /docs/resources (includes hidden-curriculum/ subfolder)
├── src/
│   ├── css/custom.css             # ALL custom styling — single source of truth
│   ├── components/
│   │   ├── SurgeonProfile.tsx     # Surgeon profile page component
│   │   ├── SurgeonDirectory.tsx   # Searchable list of surgeons (accepts `subspecialty` prop)
│   │   ├── SurgeonTree.tsx        # Lineage tree view (accepts `subspecialty` prop)
│   │   ├── SurgeonsExplorer.tsx   # Wraps tree + directory with GURS / URPS subspecialty tabs
│   │   ├── VideoCards.tsx         # Reusable lazy-loading YouTube thumbnail grid
│   │   ├── CurriculumViewer.tsx   # URPS / GURS curriculum viewer (used on Foundations index)
│   │   └── ComingSoon.tsx         # Placeholder for stub pages
│   ├── data/
│   │   ├── surgeons.ts            # All ~80 surgeon records (GURS + URPS) + dynasty data
│   │   └── curriculum.ts          # URPS and GURS curriculum blueprints
│   └── pages/
│       ├── about.mdx              # /about page
│       ├── index.tsx              # Homepage (hero + search + WARWIKI-as-link)
│       └── index.module.css       # Homepage styling (light gradient, gradient title, search pill)
├── static/
│   └── img/
│       ├── favicon.svg            # Solid vector W on brand-blue square (renders consistently in tabs)
│       ├── warwiki-social-card.png / .svg   # OG social card — current aesthetic + 'Reconstruction, codified.'
│       ├── anatomy/               # Gray's, OpenStax, and Blausen plates used in anatomy articles
│       └── team/                  # Team headshots
├── docusaurus.config.ts
├── sidebars.ts
├── vercel.json                    # cleanUrls: true, trailingSlash: false
└── CLAUDE.md                      # ← this file
```

### URL Pattern
Docusaurus strips the **numeric prefix only** from top-level directories:
- `docs/03-clinical-conditions/` → `/docs/clinical-conditions/`
- `docs/04-surgical-techniques/04a-urethral-reconstruction/` → `/docs/surgical-techniques/04a-urethral-reconstruction/`

The alphanumeric prefix (`04a-`, `03b-`, etc.) is **retained** in URLs on subdirectories.

Vercel uses `cleanUrls: true` + `trailingSlash: false` — `/docs/foundations` serves `foundations.html` without redirect.

---

## Article Structure Convention

Every clinical article follows this structure:

```mdx
---
title: Short Title for Sidebar
sidebar_position: N
---

# Full Article Title (Can Be Longer Than Frontmatter Title)

Opening paragraph — 2–4 sentences establishing clinical significance, prevalence framing,
and why this matters to reconstructive urologists. End first sentence with a citation.

---

## Epidemiology
## Etiology / Pathophysiology
## Clinical Presentation / Diagnosis
## Classification / Staging
## Management
## Complications
## Outcomes / Follow-Up
## References

<a id="ref1"></a>1. Last FM, Last FM. "Article Title." *Journal Name.* Year;Vol(Issue):Pages. doi:[10.xxxx/...](https://doi.org/10.xxxx/...)
```

### Anatomy-article pattern ("The X")

Anatomy-and-physiology articles use a different convention that prioritises **reconstructive-surgery framing** over organ-system overview:

- **Title format:** `The Kidneys`, `The Ureters`, `The Bladder`, `The Prostate & Seminal Vesicles`, `The Testicles & Scrotum`, `The Vulva`, `The Vagina`, `The Cervix`, `The Uterus`, `The Adnexa`, `The Perineum`, `The Anal Canal`, `The Presacral Space`, `The Retropubic Space`. Male Urethra and Female Urethra are exceptions (kept paired for sidebar symmetry).
- **Opening paragraph** states *why this organ matters to a reconstructive urologist / urogynecologist*, not its general-medicine importance.
- **Sections** (typical): Gross / Surgical Anatomy → Vascular Supply → Innervation → Physiology (only at reconstructive depth) → Clinical Correlations for the Reconstructive Surgeon → Videos (optional) → References.
- **Cross-links** at top to related organ articles (see also [...]) to keep navigation cohesive.
- **Image convention:** embed one image (usually OpenStax / Blausen / Gray's) near the top before "Surgical Anatomy", with an italicised caption line. See `static/img/anatomy/` for the available set. Caption-only figure blocks (no image) are *not* used — either embed a real image or omit.
- **Videos (if present):** use the `<VideoCards />` component before the References section. See below.

### Citation Style
- **Inline:** `<sup>[[1]](#ref1)</sup>` — renders as a superscript linked number
- Multiple inline: `<sup>[[1]](#ref1)[[2]](#ref2)</sup>`
- **Reference list:** `<a id="refN"></a>N. Author et al. "Title." *Journal.* Year;Vol:Pages. doi:[...](...)`
- References go at the **very end** of the article, after a `---` separator
- Every factual claim should be cited. Aim for **8–16+** references per article
- Use **real, verifiable** citations. Include DOI links where available
- Cite specific guidelines (AUA, EAU, WPATH SOC8, Endocrine Society, ASCRS, AGA-ACG) when applicable

### GAS Articles Citation Style (Footnote Variant)
Gender-affirming surgery articles use footnote-style citations: inline `[^N]`, bottom `[^N]: …`. MDX footnote format — keep consistent within GAS section.

### Callout Boxes (Admonitions)
```mdx
:::info[Title]
Content
:::

:::danger[Title]
Content
:::

:::warning
:::note
```

### MDX Gotchas
- **Angle brackets** in prose MUST be escaped: `&lt;35 kg/m²` not `<35 kg/m²` (MDX 3 parses `<` followed by a letter or digit as the start of a JSX tag — this breaks the build).
- **`&gt;` before numbers or units** in prose is usually safe, but escape if MDX complains.
- **Ampersands** in JSX attributes: use `&amp;` (e.g., `RUG &amp; VCUG`).
- Do NOT use raw HTML tags mid-sentence unless they're valid JSX.
- `<a id="refN"></a>` reference anchors and `<sup>[[N]](#refN)</sup>` links are the established citation pattern and render correctly.
- `$$...$$` LaTeX math is **not** supported — no remark-math / rehype-katex plugin; use plain-text formulas in bold or code spans.

---

## Foundations Landing Page

The Foundations index `docs/01-foundations/index.mdx` now contains:
1. Site-mission opening (WARWIKI framed around the two **reconstructive subspecialties** — URPS and GURS — not "fellowships")
2. Summary of the Foundations subsections using the `<ul className="toc-list">` grid with **`.toc-links` inline text-link style** (not chips — quieter)
3. `<CurriculumViewer />` embedded directly (standalone curriculum page was deleted; no `/docs/foundations/curriculum` page exists)

---

## Section Index Pages (`index.mdx`)

Every section has an `index.mdx` with frontmatter `slug`, `hide_title: true`, and a list-grid of entries.

Two patterns are in use, and the choice is **locked by page level**:

### 1. Top-level landings — `section-stack` (LOCKED)

The 8 top-level section landings (Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations, Journal Club, History & Lineage, Resources) all use `section-stack`. Do not convert these to `toc-list` — that pattern was tried and reverted.

```mdx
<ul className="section-stack">
  <li>
    <a href="/docs/section/subsection" className="section-stack-title section-stack-link">Subsection Title</a>
    <span className="section-stack-desc">One-line description of what's inside.</span>
  </li>
</ul>
```

### 2. Sub-section indexes — `toc-list` + `toc-chips` (optional)

Deeper landings (e.g. `docs/04-surgical-techniques/04f-incontinence-procedures/index.mdx`) may use `toc-list` with optional `toc-chips` quick-links when the section has many children and chips help with scanning.

```mdx
<ul className="toc-list">
  <li>
    <a href="/docs/.../page"><strong>Subsection Title</strong></a>
    <span className="toc-desc">Description</span>
    <div className="toc-chips">
      <a href="/docs/.../child">Child</a>
    </div>
  </li>
</ul>
```

**Rules (both patterns):**
- Section with an `index.mdx` → linked `<a>` title. Section without landing → `<span className="toc-section">` (grey, non-clickable).
- On mobile both grids collapse to single column.

### CSS Classes Reference

| Class | Purpose |
|---|---|
| `.section-stack` | Stacked list used on top-level section landings |
| `.section-stack-title` / `.section-stack-link` | Bold linked entry title |
| `.section-stack-desc` | Muted description line |
| `.toc-list` | 2-column CSS grid for sub-section indexes |
| `.toc-desc` | Muted description text below section title |
| `.toc-section` | Non-clickable grey bold title (no landing page) |
| `.toc-chips` | Flex row of pill links to sub-pages |
| `.toc-chips a` | Individual pill — small, bordered, brand-colored |
| `.toc-links` | Middot-separated inline text links (quieter alternative to chips) |
| `.sidebar-hidden-category` | Applied via `_category_.json` `className` to hide an entire sidebar category |

---

## `_category_.json` Convention

Every subdirectory needs a `_category_.json`. For subsections that link to a real first doc:

```json
{
  "label": "Section Label",
  "position": N,
  "link": {
    "type": "doc",
    "id": "section/subsection/first-doc-filename"
  }
}
```

Add `"className": "sidebar-hidden-category"` to hide an entire sidebar category (see: Surgeons directory hidden from sidebar — profiles reached via the Surgeons & Lineage page).

---

## Surgeon Profile System

### `src/data/surgeons.ts`

All surgeon records live here. The `Surgeon` interface now includes **subspecialty**:

```ts
export type Subspecialty = 'GURS' | 'URPS';

export interface Surgeon {
  id: string;
  path: string;            // e.g. 'h-r/jack-mcaninch' — used for lineage links
  name: string;
  subspecialty?: Subspecialty;  // defaults to 'GURS' when absent
  photo?: string;
  country?: string;
  countryFlag?: string;
  born?: string;
  died?: string;
  bioUrl?: string;
  mentorId?: string;
  traineeIds?: string[];
  institution?: string;
  title?: string;
  website?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
  keyPubs?: string[];
  instruments?: string[];
}

export interface Dynasty {
  id: string;
  label: string;
  rootId: string;
  color: string;
  subspecialty?: Subspecialty;
}
```

Helpers (preferred access in components):
```ts
getSubspecialty(surgeon)          // returns 'GURS' if absent
surgeonsBySubspecialty(sub)
dynastiesBySubspecialty(sub)
SUBSPECIALTIES                    // label/color/fullName table for UI
```

### Current inventory
- **~58 GURS surgeons** (pre-existing) + **~20 URPS surgeons** (seeded this session) = ~80 records.
- **GURS dynasties:** McAninch, Turner-Warwick, Webster, Santucci, **Devine-Jordan School (EVMS)**.
- **URPS dynasties:** Raz, Nitti, Comiter, Ginsberg (each with confirmed mentor–trainee links: Cohen←Raz, Enemchukwu←Nitti, Burton←Comiter, Rude←Ginsberg).

### Components

- **`SurgeonProfile`** — individual surgeon page layout. Used in every `docs/07-roots/surgeons/{alpha-group}/{name}.mdx` stub.
- **`SurgeonDirectory`** — searchable list. Accepts optional `subspecialty` prop to filter.
- **`SurgeonTree`** — lineage tree by dynasty. Accepts optional `subspecialty` prop; renders an empty-state message if the chosen subspecialty has no dynasties.
- **`SurgeonsExplorer`** — wraps tree + directory with a top-level GURS / URPS tab switcher. Used on the Surgeons & Lineage page.

### The Surgical Genealogy page

`docs/07-roots/surgical-lineage.mdx` (sidebar label: **"Surgical Genealogy"**) hosts `<SurgeonsExplorer defaultSubspecialty="GURS" />`. The auto-generated "Surgeons" sidebar category (58+ names) is **hidden** via `className: "sidebar-hidden-category"` on `docs/07-roots/surgeons/_category_.json` — all profiles are reached through the Directory on this page.

**Critical:** `SurgeonDirectory` and `SurgeonTree` must link using `s.path` (e.g. `h-r/jack-mcaninch`), **not** `s.id` — the alpha-group subfolder is required. Using `s.id` produces 404s.

Surgeon pages live at `docs/07-roots/surgeons/{alpha-group}/{surgeon-name}.mdx` (alpha groups: `a-g/`, `h-r/`, `s-z/`).

---

## VideoCards component

Reusable YouTube thumbnail grid with lazy-loading iframes. Used instead of raw iframe embeds for any article with video.

```mdx
import VideoCards from '@site/src/components/VideoCards';

<VideoCards videos={[
  { id: 'JVOycQzgHN0', title: 'Kidney anatomy', subtitle: 'Gross and vascular overview' },
  { id: '-0XwzgGX0LE', title: 'The nephron' },
]} />
```

- `id` is the YouTube video ID only (the part after `youtu.be/` and before `?si=`).
- Clicks the play button → replaces thumbnail with an autoplaying `youtube-nocookie.com/embed/{id}` iframe in-place.
- Responsive grid collapses to single column on mobile.
- CSS lives under `.vc-*` classes in `custom.css`.
- Place the section with `## Videos` immediately before `## References`.

---

## Anatomy Images

Located in `static/img/anatomy/`. Current set (all public-domain or CC-licensed):

| File | Source | Used in |
|---|---|---|
| `openstax-kidney.jpg` | OpenStax (CC BY 4.0) | The Kidneys |
| `openstax-bladder.jpg` | OpenStax (CC BY 4.0) | The Bladder |
| `openstax-male-perineum.png` / `openstax-female-perineum.png` | OpenStax (CC BY 4.0) | The Perineum |
| `blausen-female-repro.png` | Blausen Medical (CC BY 3.0) | The Vagina |
| `ovary-follicle-stages.jpg` | Wikimedia Commons | The Adnexa |
| `gray1142-urethra.png` | Gray's Anatomy (public domain) | Male Urethra |
| `penis-lateral-cross-section.jpg` | Preexisting | The Penis |
| `gray1143-testis.png` | Gray's Anatomy | The Testicles & Scrotum |
| `gray1160-prostate.png` | Gray's Anatomy | The Prostate & Seminal Vesicles |
| `gray589-female-external.png` | Gray's Anatomy | The Vulva |
| `gray1170-uterus-broad-lig.png` | Gray's Anatomy | The Uterus |

**Embed pattern:** `![Alt](/img/anatomy/file.ext)` followed by an italic caption line underneath.

---

## Search (Algolia DocSearch)

Configured via `themeConfig.algolia` in `docusaurus.config.ts`:
- `appId: GYFUZH5C10`
- `apiKey: cff8e1468c9ff78226494ff86aef7e09` (search-only key — safe to commit)
- `indexName: WARWIKI`
- `contextualSearch: true`

Navbar search box sits **between Library and About** (placed via explicit `{type: 'search', position: 'right'}` navbar entry). Styling overrides `.DocSearch-Button` to match navbar height. Site-verification meta tag (`algolia-site-verification`) is injected via `headTags` in config.

---

## Design Tokens (from `custom.css`)

```css
--ifm-color-primary:         #185FA5;   /* Deep Blue — brand color */
--ifm-color-primary-light:   #1B6CBD;
--ifm-color-primary-lightest:#3691E2;
--warwiki-bg:                #F7F9FC;
--warwiki-bg-subtle:         #EEF2F8;
--warwiki-border:            #DDE3ED;
--warwiki-border-strong:     #C2CBD9;
--warwiki-text:              #111827;
--warwiki-text-muted:        #4B5767;
--warwiki-text-subtle:       #8494A8;
```

Dark mode overrides use `[data-theme='dark']` selectors. Always add dark mode variants for new CSS that uses light-only values.

---

## Navigation (docusaurus.config.ts)

Navbar order:
1. Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations (left, docSidebar types)
2. Library dropdown → **Journal Club**, **Resources**, **History & Lineage** (in that order)
3. **Search** (Algolia DocSearch)
4. About → `/about`
5. GitHub icon (SVG mark, no text) → `className: 'header-github-link'`

Hidden Curriculum is **no longer a top-level dropdown item** — it lives as a subfolder under Resources (`08-resources/hidden-curriculum/`, served by `resourcesSidebar`). The `hiddenCurriculumSidebar` in `sidebars.ts` was removed.

The GitHub icon is pure CSS using a `::before` pseudo-element with an SVG `data:` URI.

---

## Homepage (`src/pages/index.tsx`)

- `WARWIKI` heading is a `<Link to="/docs/foundations">` rendered in a blue gradient.
- Tagline: *Reconstruction, codified.*
- Below tagline: large search pill that triggers the navbar DocSearch button on click. Placeholder text: *Where should we start?*
- Background: soft white → light-blue gradient with subtle radial blue / violet accents.
- No ENTER button.
- Styling in `index.module.css` using `.heroBanner`, `.heroInner`, `.heroTitle`, `.heroTitleLink`, `.heroSearch`, etc.

---

## About Page (`src/pages/about.mdx`)

Team section uses CSS module classes from `about.module.css`:
- `.teamCard` — flex row, border-left accent
- `.teamPhoto` — 160px circle, `object-fit: cover`
- `.teamPhotoNick` — override: `object-position: center 22%`

Team members:
1. **Nicolas Seranio, MD** — Editor in Chief (`nick-seranio.jpg`)
2. **Humberto Villarreal, MD** — Senior Advisor (`humberto-villarreal.jpg`)

The "contact" link in About uses a mailto obfuscation — link text says "WARWIKI" but resolves to `nseranio@gmail.com`.

The Turner-Warwick reference links to his surgeon profile at `/docs/roots/surgeons/s-z/richard-turner-warwick`.

---

## Content Standards

### Article voice — frame for the reconstructive urologist / urogynecologist

**Any article on a general-medicine topic must be reframed around surgical / operative relevance.** Compress nephrology-, internist-, or colorectal-level detail to the depth a GU reconstructionist actually needs. This is a hard rule — see the memory file `feedback_article_voice.md` and the established anatomy articles for the pattern.

Examples of what to keep vs cut:
- Kidney article: **keep** fascial compartments, vascular pedicle, warm-ischemia targets, hyperfiltration; **cut** detailed tubular-transporter tables and ammoniagenesis biochemistry.
- Bowel article: **keep** SMA/IMA branches relevant to urinary diversion, terminal-ileum B12/bile-salt absorption, detubularization biomechanics; **cut** mucosal-immunity, IBD pathophysiology, microbiome composition detail.
- Cervix article: **keep** ureter anatomy, cardinal/uterosacral ligaments for Level-I apical support, nerve-sparing radical hysterectomy; **cut** mucin biochemistry, HPV molecular biology, pregnancy ripening biomechanics beyond the principle.

### Reference quality
- Only cite **real, published papers**. Do not fabricate citations.
- Prefer: AUA / EAU guidelines, WPATH SOC8, ACOG / ASCRS / AGA-ACG guidelines, landmark RCTs, systematic reviews, high-volume case series.
- Journal abbreviations: *J Urol*, *Eur Urol*, *Urology*, *BJU Int*, *J Sex Med*, *Nat Rev Urol*, *JAMA Surg*, *Ann Surg*, *N Engl J Med*.
- Always include first author + "et al." for 4+ authors, journal, year, volume, issue, pages, DOI.

### Clinical accuracy
- Content written for **specialists**, not patients — correct anatomical and clinical terminology.
- Be specific: percentages, complication rates, success rates with citations.
- Mention when data is limited or evidence quality is low.
- Distinguish guideline recommendations from expert consensus.

### Tone
- Formal academic prose, active voice where possible.
- No hedging ("it is important to note", "it should be mentioned").
- No consumer health disclaimers.
- Tables preferred over prose lists for comparative data.

### Site scope — what belongs on WARWIKI

**In-scope:** reconstructive urology (GURS), urogynecology & reconstructive pelvic surgery (URPS), and functional urology — urethroplasty, ureteral reconstruction, reimplant, pyeloplasty, bladder augmentation, Mitrofanoff, VVF / UVF / RUF / USF repair, incontinence surgery, AUS / IPP, Peyronie's, ED surgery, phalloplasty / vaginoplasty / GAS, hypospadias, prolapse surgery, perineal reconstruction after trauma / Fournier's / radiation, neurogenic bladder, functional voiding disorders.

**Out-of-scope (do not use as primary examples or applications):** endourology (PCNL, ureteroscopy for stones) and urologic oncology (radical cystectomy for cancer, radical nephrectomy for cancer, radical prostatectomy for cancer).

**Gray zone — acceptable only as the reconstructive consequence:** post-radiation reconstruction, urinary diversion framed as reconstructive (not cancer staging), reconstruction after extirpative oncology, urethral stricture after prostatectomy or radiation, RUFs after prostate cancer treatment.

When framing a new article, ask: is the reader here to learn reconstructive / functional / urogynecologic practice? If the article's principal value is teaching cancer surgery or stone management, **it does not belong on WARWIKI**. See `feedback_site_scope.md` for the full rule.

---

## Deployment

- Builds with `npm run build`; deploys via **Vercel** from `main`.
- Dev server: `npm start` (Docusaurus dev server; `.claude/launch.json` configured to run this on port 3001 for preview tooling).
- `vercel.json` sets `cleanUrls: true` + `trailingSlash: false` so `/docs/foundations` → `foundations.html` without redirect.

**Common build errors:**
- MDX JSX parse errors from unescaped `<` in prose → use `&lt;` / `&gt;`. *Any* `<` followed by a letter or digit in a table cell, paragraph, or admonition will break the build.
- Missing `_category_.json` `link` entries → 404 flash on sidebar click.
- Broken TOC hrefs pointing to directory URLs without `index.mdx` → 404 flash.

---

## Section Inventory

| Section | Path | Notes |
|---|---|---|
| Foundations | `01-foundations/` | Landing page has section-stack + **embedded `<CurriculumViewer />`**; standalone `/curriculum` was deleted. Six top-level subsections: Anatomy & Physiology (2), Surgical Principles (3), Surgical Skills (4), Perioperative Care (5), **Pharmacology (6 — promoted from `tools/pharmacology/` in `0891f08`)**, Tools (7) |
| Evaluation | `02-evaluation/` | Three children: **History & Physical** (bundles assessment-tools + male/female exams), Imaging, Ancillary Testing. `physical-exam/` subdirectory was flattened into `history-physical/` (2026-04-21). |
| Clinical Conditions | `03-clinical-conditions/` | **9 subsections (03a–03i)**. 03e Upper Tract: renovascular-conditions deleted; UPJO and Ureteral Stricture filled. 03f Fistulas: sidebar reordered Females → Males → Both Genders; every primary article filled. 03g Disorders of Genitalia (renamed from "Genital & Scrotal Disorders"): male-infertility removed; Vaginal Cysts & Masses added; Müllerian Anomalies & Vaginal Agenesis moved here from Women's Health. 03h Pelvic Pain: pudendal-neuralgia, myofascial-pelvic-pain, and GSM removed; Chronic Pelvic Pain consolidates the first two. 03i Defecatory Disorders (added 2026-04). |
| Treatment Atlas | `04-surgical-techniques/` | 9 subsections; **04h-prosthetics DELETED**; **04b Bladder Reconstruction now uses the landing page itself as the searchable database** (domains: Capacity / Reservoir, Outlet / Stenosis, Catheterizable Channels, Outlet / Continence), with visible pages for Augmentation Cystoplasty, BNC / VUAS Reconstruction, and Continent Catheterizable Channels and hidden nested technique folders for `bnc-vuas/` and `outlet-continence/`; 04f renamed "Incontinence" with 3 sub-databases (Female SUI, Male SUI, OAB & UUI); 04c (urinary diversion) has no index.mdx |
| Special Populations | `05-special-populations/` | 4 subsections (05a, 05c, 05d, 05e); 05b (oncologic) was DELETED. 05d Men's Health pruned to Hypogonadism & Testosterone only. 05e Women's Health pruned to GSM + new Sexual Dysfunction / Recurrent UTI / STIs + new Preventative Care subsection (Cancer Screening — cervical/breast/endometrial — plus HPV Vaccination and Osteoporosis Screening). |
| Journal Club | `06-journal-club/` | journal-database.mdx, guidelines-white-papers.mdx |
| History & Lineage | `07-roots/` | Renamed from "Roots of Reconstruction". **Surgical Genealogy** page uses `<SurgeonsExplorer />` with GURS/URPS tabs; surgeons/ category hidden from sidebar |
| Resources | `08-resources/` | Textbooks, podcasts, websites, videos, patient resources + **Hidden Curriculum subfolder** |

### Foundations — anatomy-physiology status

All articles in `docs/01-foundations/anatomy-physiology/` have been populated (no remaining stubs):

- **Urinary tract:** The Kidneys, The Ureters, The Bladder, Male Urethra, Female Urethra
- **Genitalia:** The Penis, The Prostate & Seminal Vesicles, The Testicles & Scrotum, The Vulva, The Vagina, The Cervix, The Uterus, The Adnexa
- **Pelvis & Support:** Bony Pelvic Anatomy, Retropubic (The Retropubic Space), Abdominal Wall, Pelvic Vascular Anatomy, Pelvic Neuroanatomy, Bowel Anatomy, GU Embryology, Perineum, Anal Anatomy (The Anal Canal), Presacral Anatomy (The Presacral Space)
- **Lower Extremity:** The Leg & Thigh (gracilis anatomy + PTNS ankle anatomy — NEW)
- **Oral Cavity:** The Oral Cavity (buccal / lingual / labial mucosa for urethroplasty — NEW)

### Foundations — Surgical Principles status

Populated: wound-healing, reconstructive-ladder, plastic-surgery-principles, principles-gu-reconstruction, radiation-tissue-effects, flaps-gu-reconstruction, grafts-gu-reconstruction, **incisions-closure**, **bowel-anastomosis**, **sutures**, **needles**, **surgical-ergonomics**.

**Flap subdirectory** — `flaps/` hosts 11 stub pages (hidden category) reachable only via links from the main Flaps article:
- **Fully built out:** gracilis, vram, peritoneal, vastus-lateralis, omental
- **Stubs ready for expansion:** penile-preputial, radial-forearm, anterolateral-thigh, scip, blandy, martius

**Graft subdirectory** — `grafts/` hosts 10 stub pages (hidden category) reachable only via links from the main Grafts article:
- **buccal-mucosa** ← **fully built out** (biological properties, harvest technique, GU applications, named placement techniques table, donor site morbidity, outcomes, comparison with alternatives — 22 citations)
- lingual-mucosa, labial-mucosa, intestinal-segments, penile-preputial-skin, saphenous-vein, posterior-auricular, stsg, ftsg, bladder-mucosa (stubs)

### Foundations — Surgical Skills status (restructured 2026-04-21)

Collapsed from 4 subsections (knot-tying, suturing patterns, ligatures, special-techniques) to a **single flat landing with a table** focused exclusively on GURS/URPS-signature techniques. Generic knot tying, generic suturing patterns, and ligature types were deleted — those are covered in any surgery textbook.

**10 techniques retained (all at the flat root):**
- **Bowel stitches:** connell, cushing, lembert, halsted, parker-kerr
- **Signature GU/pelvic:** heaney, quilting (fully built — 40 refs), ski-needle, van-velthoven-vua. Barbed sutures now live in `surgical-principles/sutures.mdx` as a material / knotless-closure subsection.

The landing also hosts a **Learning Resources** section with 3 structured curricula (UCSF Surgical Skills Center, UCSF ATOSS, BBASS) and 4 curated video playlists (Behind The Knife Boot Camp, The Clean Scalpel, Basic Surgical Skills, WARWIKI Surgical Technique).

### Foundations — Perioperative Care restructured (Temporal + Protocols framework)

Old folders `preoperative/`, `anesthesia-pain/`, `postoperative/` were reorganized into:

```
perioperative-care/
├── preoperative-assessment/    # risk-calculators, cardiovascular-risk, frailty, diabetes, steroids, immunosuppression
├── intraoperative-care/        # anesthesia (new), analgesia, nerve-blocks, nausea-vomiting, positioning-nerve-injury
├── postoperative-management/   # constipation, electrolyte-abnormalities, nutrition (renamed from tpn-ppn), pulmonary-embolism
└── perioperative-protocols/    # eras, antithrombotic-therapy (crosscutting protocols)
```

All 16 articles are populated. URL paths changed from the old flat structure — internal cross-links were updated; external inbound links to `/docs/foundations/perioperative-care/{preoperative,anesthesia-pain,postoperative}/*` will 404.

### Foundations — Tools / Technology / Robotics subsection (path updated 2026-04-21)

`docs/01-foundations/tools/technology/robotics/` — three-article subsection (moved under the new Technology container in 2026-04-21 restructure):
- **platforms.mdx** — da Vinci (Si/Xi/X/SP/5), Hugo RAS, Versius, Senhance, Avatera, Hinotori, REVO-I, KangDuo, MicroHand S, Toumai, Dexter — manufacturer profiles + feature axes
- **reconstructive-applications.mdx** — by anatomic region (upper tract, bladder, urethra, andrologic microsurgery)
- **single-port.mdx** — SP incision atlas (periumbilical, mini-Pfannenstiel, midline suprapubic, LAA, SARA) + approaches (transvesical, LAA, SARA, transperitoneal, retroperitoneal, extraperitoneal)

### Special Populations — Trauma &amp; Emergencies: new Intraoperative Consultation subsection

`docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/` — the urologist's operational guide to iatrogenic urinary-tract injury during non-urologic surgery. The `index.mdx` is the main comprehensive article (when to get the call, diagnostic maneuvers, organ-by-organ repair, damage-control pathway, prevention, timing outcomes, documentation). 8 references including 2023 WSES IUTI guideline, 2025 ACS Best Practices, Kato/Skokan algorithm, Sylla taTME urethral-injury study.

**Nested under it:** `procedures-causing-gu-injury/` — reference subsection describing the non-urologic operations that generate GU injuries, framed for the reconstructive surgeon. First article is **Cesarean Section** (30 citations — Joel-Cohen vs Pfannenstiel, bladder flap dissection, hysterotomy, uterine closure / niche, vesicouterine fistula / Youssef syndrome, placenta accreta spectrum). Planned additions: hysterectomy, radical hysterectomy, colpopexy, anti-incontinence surgery, colorectal (LAR / APR / taTME), inguinal/pelvic hernia, pelvic trauma.

Structure:

```
05-special-populations/05a-trauma-emergencies/
├── (existing flat articles: bladder-trauma, ureteral-trauma, renal-trauma, pfui, ...)
└── intraoperative-consultation/
    ├── _category_.json (position 9, link to index)
    ├── index.mdx                      ← the main article
    └── procedures-causing-gu-injury/
        ├── _category_.json (position 99)
        ├── index.mdx                  ← subsection landing
        └── cesarean-section.mdx       ← first article (30 refs)
```

### Hidden Curriculum (now under Resources)

`docs/08-resources/hidden-curriculum/` — operational-literacy layer for the reconstructive urologist. **No longer a top-level navbar item** — accessible via Library → Resources → Hidden Curriculum. Served by `resourcesSidebar`. URLs changed from `/docs/hidden-curriculum/*` → `/docs/resources/hidden-curriculum/*`.

- **index.mdx** — section landing (slug: `/resources/hidden-curriculum`)
- **overview.mdx** — "Clinical Operator Mindset"
- **healthcare-finance.mdx** — revenue cycle, RVU decomposition, payment models
- **billing-coding.mdx** — CPT/ICD-10/modifier reference for GU reconstruction

---

## Key Files to Know

| File | Purpose |
|---|---|
| `src/css/custom.css` | All styles (VideoCards, SurgeonsExplorer, toc-links, video-embed, sidebar-hidden-category) |
| `src/data/surgeons.ts` | ~80 surgeons with `subspecialty` field + `SUBSPECIALTIES` / helper exports |
| `src/components/SurgeonsExplorer.tsx` | GURS/URPS tab wrapper around tree + directory |
| `src/components/VideoCards.tsx` | Thumbnail-grid YouTube embed |
| `src/pages/index.tsx` / `index.module.css` | Homepage hero + search + linked WARWIKI title |
| `docusaurus.config.ts` | Site config, navbar, Algolia block, tagline, `headTags` |
| `vercel.json` | `cleanUrls: true` + `trailingSlash: false` |
| `docs/01-foundations/index.mdx` | toc-list + `.toc-links` pattern + `<CurriculumViewer />` |
| `docs/07-roots/surgical-lineage.mdx` | `<SurgeonsExplorer />` host — page title/sidebar label: **"Surgical Genealogy"** |
| `docs/07-roots/surgeons/_category_.json` | Has `className: sidebar-hidden-category` |
| `scripts/check-scope.js` | Flags out-of-scope titles against forbidden terms list. `npm run lint:scope`. |
| `scripts/check-citations.js` | Verifies `<sup>[[N]](#refN)</sup>` and `[^N]` integrity. `npm run lint:citations`. |
| `scripts/check-orphans.js` | Flags hidden-category pages with no inbound links (exempts dynamic-linked dirs). `npm run lint:orphans`. |
| `scripts/gen-status.js` | Regenerates `docs/_STATUS.md` stub tracker. `npm run status`. |
| `scripts/fix-citations.js` | One-shot renumber/compact citation anchors; used for the 2026-04-21 cleanup pass. |
| `docs/_STATUS.md` | Stub tracker with hand-edited priority/notes; auto-refreshed, priorities preserved. |
| `CHANGELOG.md` | Rolling session-history log (formerly in CLAUDE.md). |

---

## Session History

Substantive content and platform changes are logged in `CHANGELOG.md`. For commit-level detail, run `git log --oneline`.

---

## Image Wishlist — High-Value Additions

Today's additions were text-only. The following new pages would benefit from images when appropriate public-domain / CC assets are available. Listed by priority:

### Highest priority — directly improves comprehension

1. **`flaps/gracilis.mdx`** — diagram of the gracilis muscle + medial circumflex femoral artery pedicle anatomy. Gray's Anatomy plate exists for the adductor compartment.
2. **`flaps/vram.mdx`** — diagram of rectus abdominis + DIEA pedicle + arcuate line. Gray's or open-source anatomy illustration.
3. **`flaps/omental.mdx`** — diagram of the gastroepiploic arcade (right and left) along the greater curvature.
4. **`flaps/vastus-lateralis.mdx`** — diagram of LCFA descending branch and perforator distribution.
5. **`anatomy-physiology/lower-extremity/leg-thigh.mdx`** — anatomy article has zero images; should match the image-per-article convention of the other anatomy articles. Gray's plates for gracilis and medial ankle cross-section (for PTNS anatomy) are public domain.
6. **`anatomy-physiology/oral-cavity/oral-cavity.mdx`** — anatomy article has zero images; Gray's plate of buccal mucosa and oral cavity cross-section.
7. **`surgical-principles/incisions-closure.mdx`** — diagram showing the incision atlas (midline, Pfannenstiel, Gibson, flank, Chevron, Makuuchi, thoracoabdominal, dorsal lumbotomy, perineal) as anatomic overlays.

### Medium priority — supporting visualization

8. **`surgical-principles/bowel-anastomosis.mdx`** — diagrams of end-to-end, end-to-side, and functional end-to-end (GIA-stapled) configurations; ICG fluorescence example.
9. **`surgical-principles/sutures.mdx`** — table already scaffolds comparisons; a suture-size / needle-type diagram would help.
10. **`surgical-principles/needles.mdx`** — cross-section diagrams of cutting vs reverse-cutting vs taper vs blunt-taper vs taper-cut tips.
11. **`tools/robotics/single-port.mdx`** — incision-site map on an abdominal/pelvic silhouette.
12. **`tools/robotics/platforms.mdx`** — the platforms table could be enhanced with logos/photos if CC-licensed (Intuitive / Medtronic / CMR / Asensus press images may be available).

### Lower priority — could benefit but text is sufficient

- Perioperative Care articles (ERAS, antithrombotic, cardiovascular risk, diabetes, frailty) — the tables convey most of the value; flow diagrams of decision trees (e.g., 2024 AHA/ACC stepwise, ERAS pathway, RCRI) would be elegant if appropriate Creative Commons versions exist.
- Hidden Curriculum articles — healthcare-finance might benefit from a revenue-cycle schematic.

### Source-finding conventions (from earlier sessions)

- **Gray's Anatomy** plates are public domain; Wikimedia Commons hosts them with the `Gray####` convention.
- **OpenStax Anatomy & Physiology** plates are CC BY 4.0 and suitable for direct use.
- **Blausen Medical** plates are CC BY 3.0; limited number available on Wikimedia.
- Use `curl -sL "https://commons.wikimedia.org/wiki/Special:FilePath/FILENAME.png"` to download Wikimedia Commons files reliably (direct URLs sometimes serve error HTML instead).
- Store in `static/img/anatomy/` and reference as `/img/anatomy/filename.ext` with an italicized caption underneath.
- **Never** create caption-only figure blocks — either embed a real image or omit the figure.

---


*Last updated: 2026-05-02*
