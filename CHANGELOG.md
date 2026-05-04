# WARWIKI Changelog

Running log of substantive content and platform changes. Extracted from session notes in CLAUDE.md on 2026-04-21 so that CLAUDE.md can remain pure rules and conventions.

For commit-level detail run `git log --oneline`.

---

## 2026-05-04 — Female cosmetic per-device buildout (10 new pages) + canonical-laser augmentation + atlas cleanup

**Ten new dedicated pages under [`04l-cosmetic-genital-surgery/`](docs/04-surgical-techniques/04l-cosmetic-genital-surgery):**

- **Labiaplasty** — [trim](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/trim-labiaplasty.mdx) (12 refs; Zahedi 2023 algorithm + Minikowski 2025 RCT), [wedge](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/wedge-labiaplasty.mdx) (18 refs; Alter 1998/2008 PRS hockey-stick n=407 + Sinnott 2020 dehiscence risk factors + Köle 2024 n=2,594), [de-epithelialization](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/de-epithelialization-labiaplasty.mdx) (9 refs; Choi-Kim 2000 founding + Géczi 2024 highest-satisfaction 97%), [laser-assisted](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/laser-assisted-labiaplasty.mdx) (18 refs; framed as surgical tool not technique; FDA 2018 distinction admonition).
- **Hybrid labiaplasty** — [combined wedge-edge resection (modified trim+wedge)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/combined-wedge-edge-labiaplasty.mdx) (10 refs; Cao 2015 hybrid n=49). Replaces the prior mis-cited "Modified Wedge with Trim Component" row.
- **Clitoral hoodoplasty** — [inverted-Y plasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/inverted-y-clitoral-hoodoplasty.mdx) (8 refs; Eserdağ 2021 n=63), [Liu-classification (bilateral triangular + inverted horizontal V)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/liu-classification-hoodoplasty.mdx) (9 refs; Liu 2022 n=789 — largest hoodoplasty cohort published, no paresthesia), [three-step / two-part composite](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/three-step-two-part-composite.mdx) (10 refs; Xia 2021 + Duan 2026).
- **Labia majora** — [augmentation (autologous fat grafting)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/labia-majora-augmentation.mdx) (14 refs; Jabbour 2017 SR + Menkes 2021 microfat+nanofat for GSM + Lai 2023 MAFT histology + Patel 2021 post-PIV), [reduction / majoraplasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/labia-majora-reduction.mdx) (11 refs; Saheb-Al-Zamani 2022 + Alter post-bariatric + Siliprandi 2026 vulvar-aging classification).
- **Mons pubis** — [monsplasty (reduction / lift)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/monsplasty.mdx) (15 refs; Hamdi 2023 JPRAS + El-Khatib 2011 ptosis grading + Bykowski 2017 UDI-6 data), [fat grafting to mons](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/fat-grafting-mons.mdx) (16 refs; Seleem 2023 normative volumes + Lai 2023 MAFT + Dong 2024 ADSC-assisted NMA SUCRA 82%).

**Canonical Vaginal Laser Therapy page augmented:**

- [vaginal-laser-therapy.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/vaginal-laser-therapy.mdx) refs 35 → 46. Added Er:YAG-specific data anchored on **Gambacciani 2020 113,000-patient safety dataset** (largest single dataset for any vaginal laser; no serious AEs); **Gaspar 2020** epithelial 45 → 153 µm histology; **Bayraktar 2024** sham-controlled shear-wave-elastography pilot; the **Phillips 2025 BJOG / O'Reilly 2024 IJGO / Lee 2025 AJOG** Er:YAG-SUI RCT trio (two positive, the largest negative); **Sathaworawong 2022** Er:YAG vaginal-laxity sham RCT; Avul 2023, Lin 2022, Vizintin 2015, Menkes 2026 (Er:YAG + plant-derived exosomes pilot). Explicit framing of the registry-vs-MAUDE discrepancy.

**Cosmetic atlas database cleanup:**

- **Vaginal Canal domain removed.** ACOG 2020: "rebranding" colporrhaphy / perineoplasty as cosmetic is misleading. Surgical Vaginoplasty / Vaginal Tightening + Perineoplasty rows deleted; these reconstructive procedures live in 04g Prolapse Repair, not cosmetic atlas. Decision Framework vaginal-laxity rows + Vaginal Laxity sub-comparison + Combined Procedures bullet all removed.
- **Energy-Based Devices collapsed to single pointer row.** Three rows (fractional CO₂, Er:YAG, RF) merged into one **Vaginal Laser Therapy (Fractional CO₂ / Er:YAG / RF)** row pointing at the canonical 04f page rather than duplicating cross-indication content.

**Editorial conventions locked / reaffirmed:**

- Female-cosmetic per-device pattern mirrors male-cosmetic (`sidebar_class_name: sidebar-hidden-item`; `:::warning[Society positioning]` with ACOG 795 + FIGO 2025 + ACOG 686).
- Tool-vs-technique distinction: laser-assisted = tool applied within other techniques; comparison logic targets other tools (scalpel / RF / electrocautery).
- FDA 2018 disambiguation as locked admonition pattern for any energy-based-device page.
- Centralize energy-based-device cross-indication content at the canonical [Vaginal Laser Therapy](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/vaginal-laser-therapy.mdx) page; cosmetic atlas holds a single pointer row.
- Reconstructive procedures (vaginoplasty = colporrhaphy, perineoplasty) stay out of the cosmetic atlas — apply this rule when auditing other cosmetic atlases.
- Database-row notes for cosmetic-female pages remain expanded; the male-cosmetic Notes-column-drop rule does not yet apply because not every row has a per-device page.

**Lint state:** `npm run lint:links` clean across 844 files; `npm run lint:citations` clean for all new and edited pages.

**Late-session additions (same day):**

- New page [hymenoplasty.mdx](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/hymenoplasty.mdx) (11 refs). Lahlali 2021 Moroccan n=529 + Eserdağ 2021 + Wei 2015 + Dogan 2024 temporary-vs-permanent comparative. Explicit legal-context call-out (UK ban) + ACOG 795/780 + Bawany 2017 Islamic ethico-legal perspectives. Distinguished from FGM/C.
- **Female-cosmetic database compression (LOCKED).** Notes column dropped entirely; "Genital Beautification Combined Packages" row deleted; row names trimmed to bare procedure names. Database is now 2 columns (Procedure + Domain), mirroring the May-4 male-cosmetic compression. The pattern is now applied consistently across both cosmetic atlases.

---

## 2026-04-22 — Lint harness + Surgical Skills collapse + IC/BPS build-out

**Platform / tooling:**

- **Lint harness** — new `scripts/` directory with three checks:
  - `check-scope.js` — flags out-of-scope titles/H1s against a forbidden-terms list (PCNL, cancer cystectomy/nephrectomy, etc.). Body mentions as reconstructive context remain fine.
  - `check-citations.js` — verifies every `<sup>[[N]](#refN)</sup>` has a matching anchor, detects numbering gaps, handles footnote `[^N]` style.
  - `check-orphans.js` — hidden-category pages without inbound links (exempts surgeon profiles + incontinence procedures rendered by React components from `src/data`).
- **Stub tracker** — `scripts/gen-status.js` → `docs/_STATUS.md`. 107 stubs cataloged with priority + notes, preserved across regenerations.
- **Citation auto-fix** — `scripts/fix-citations.js`: renumbers cited+anchored refs to contiguous 1..K, removes orphan anchor entries, detects unfixable orphan citations and skips those files.
- **Applied citation cleanup** to 88 articles — renumbered refs, removed orphan anchors. No body text altered; only citation numbers and reference-list entries.
- **`npm run lint`** now composes all three checks. `npm run status` regenerates the stub tracker.
- **CLAUDE.md prune** — 926 → 631 lines. Session history moved to `CHANGELOG.md`. Added "Rules for agents — read before writing" block at top (scope, voice, citations, lint checklist, common MDX/Docusaurus pitfalls).
- **`.gitignore`** — exclude `.claude/worktrees/` so Claude-spawned ephemeral worktrees don't pollute git status.

**Surgical Skills — collapse to GURS/URPS-signature techniques:**

- Deleted `knot-tying/`, `ligatures/`, and the generic stitches in `suturing/` (simple-interrupted, running-continuous, running-locking, figure-of-eight, horizontal-mattress, vertical-mattress, purse-string, subcuticular). Generic skills live in surgery textbooks.
- Kept (flattened to `surgical-skills/` root): bowel stitches (connell, cushing, lembert, halsted, parker-kerr) and signature techniques (heaney, quilting, ski-needle, van-velthoven-vua, barbed-sutures).
- Landing rewritten as a single **table of 10 techniques** grouped by signature use.
- **Learning Resources** section added — UCSF Surgical Skills Center, UCSF ATOSS, BBASS, and 4 curated video playlists (Behind The Knife Boot Camp, The Clean Scalpel, Basic Surgical Skills, WARWIKI Surgical Technique).
- Cross-links updated in 4 external pages (tools/instruments/..., tools/biomaterials/..., tools/intraoperative-adjuncts/...) and all 10 moved files.

**Quilting Stitch — comprehensive rewrite:**

- Expanded from 35-line stub to full 350-line article. Graft-survival phases, suture quilting techniques (Barbagli dorsal onlay, Asopa dorsal inlay, ventral onlay + spongio-/pseudospongioplasty, Palminteri double graft, transurethral fossa navicularis, VUAS periosteal quilting), fibrin glue fixation, barbed sutures, staged urethroplasty, skin graft fixation (tie-over, TODGA, NPWT, eggcrate foam). 40 DOI-linked references.
- Preserved flap-quilting content (scrotal, Fournier's, perineal, phalloplasty).

**IC/BPS — comprehensive article + deduplication:**

- Canonical article at `docs/03-clinical-conditions/03h-pelvic-pain/ic-pbs.mdx` — AUA 2022 framework, Hunner vs non-Hunner phenotyping, 7-mechanism pathophysiology, cystoscopy indications, validated instruments, behavioral/dietary/PFPT, oral meds with PPS maculopathy safety alert + FDA screening, intravesical agents with DMSO meta-analysis, procedures (hydrodistension, Hunner fulguration, Botox, SNM), major surgery, emerging therapies, modality-based algorithm. 28 DOI-linked refs.
- Deleted duplicate stub at `03d-bladder-disorders/painful-bladder-syndrome-ic.mdx`.
- Fixed the one inbound link in `uti-treatment-antibiotics.mdx`.

**Oral IC/BPS Agents — drug-class companion built out:**

- `docs/01-foundations/tools/pharmacology/bladder-pain-ic-bps/oral-ic-bps-agents.mdx` — amitriptyline, PPS, hydroxyzine, cimetidine, cyclosporine A. Mechanism table, phenotype-directed indications (Hunner → cyclosporine; pain/sleep → amitriptyline; atopic → hydroxyzine), dosing table, per-agent contraindications + monitoring (PPS maculopathy + FDA screening; cyclosporine team-monitoring; cimetidine CYP450), perioperative hold/continue table, evidence summary citing Sant 2003 ICCTG, Foster 2010, Sairanen 2005 (75% vs 19% responder rate), Thilagarajah 2001, Di 2021 Bayesian network MA, Imamura 2020 Cochrane. 11 refs.

**Evaluation — History & Physical bundle:**

- Collapsed flat `assessment-tools.mdx` and `physical-exam/` subdirectory into new `history-physical/` subsection. New landing + 3 children (assessment-tools, male-urogenital-exam, female-pelvic-examination).
- URL changes: `/docs/evaluation/assessment-tools` → `/docs/evaluation/history-physical/assessment-tools`; `/docs/evaluation/physical-exam/*` → `/docs/evaluation/history-physical/*`.

**Surgical Ergonomics — new article:**

- Added at `docs/01-foundations/surgical-principles/surgical-ergonomics.mdx`. WMSD overview + urology-specific section (endoscopic, laparoscopic, robotic, open, microsurgical). 19 DOI-linked refs.

**Citation cleanup, site-wide:**

- 88 articles had real citation-integrity issues (orphan anchors, numbering gaps). Auto-fix renumbered and removed orphans — every cited ref now has an anchor, every anchor is cited at least once.

---

## 2026-04-21 (continued) — Treatment Atlas restructure + platform fixes

**GenericDatabase dropdown fix:**
- `filterLabel="Category"` was rendering as "All Categorys". Fixed by: (1) smart pluralization in `GenericDatabase.tsx` (skip appending `s` if label already ends in `s`), (2) updating all database pages to pass `filterLabel="Categories"`. Affects instruments, biomaterials, pharmacology, incontinence, ED, male stress incontinence databases.

**Treatment Atlas — Incontinence section rebuilt:**
- `04h-prosthetics/` deleted entirely (5 files).
- `04f-incontinence-procedures/` renamed → sidebar label "Incontinence"; new `index.mdx` section landing with 3 subcategory cards.
- Three subcategories created, each with a `GenericDatabase`-powered searchable database:
  - `female-sui/female-stress-incontinence-database.mdx` — 10 treatments (PFPT, pessary, duloxetine, bulking agents, retropubic MUS, TOT, mini-sling, autologous fascial sling, Burch, AUS)
  - `male-sui/male-stress-incontinence-database.mdx` — 5 treatments
  - `oab-uui/oab-uui-database.mdx` — 10 treatments (behavioral, PFPT, anticholinergics, β3, combination, Botox, SNM, PTNS, eCoin/Revi, bladder augmentation)
- All 9 individual procedure pages moved into `procedures/` hidden subfolder (same pattern as `flaps/`, `grafts/`).
- Shared master PFPT page — `pelvic-floor-pt-male.mdx` replaced with `pelvic-floor-pt.mdx` covering male SUI, female SUI, and OAB/UUI.
- Invasiveness column dropped from all three databases for mobile optimization.

**URL changes:**
- `/docs/surgical-techniques/04h-prosthetics` → DELETED
- `/docs/surgical-techniques/04f-incontinence-procedures/[page]` → `/docs/surgical-techniques/04f-incontinence-procedures/procedures/[page]`
- `/docs/surgical-techniques/04f-incontinence-procedures/pelvic-floor-pt-male` → `/docs/surgical-techniques/04f-incontinence-procedures/procedures/pelvic-floor-pt`
- `/docs/surgical-techniques/04f-incontinence-procedures/male-stress-incontinence-database` → `/docs/surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database`

**TTS visibility fix:**
- Replaced hardcoded 8-path `LANDING_PATHS` set with `useDoc().frontMatter.hide_title` check. Any page with `hide_title: true` suppresses ArticleListener. All section landings and sub-section index pages already use this convention — no per-page maintenance needed.

**History & Physical bundle (Evaluation):**
- Collapsed flat `assessment-tools.mdx` and `physical-exam/` into new `history-physical/` subsection.
- URL changes: `/docs/evaluation/assessment-tools` → `/docs/evaluation/history-physical/assessment-tools`; `/docs/evaluation/physical-exam/*` → `/docs/evaluation/history-physical/*`.

**Lint harness + stub tracker:**
- `scripts/check-scope.js` — flags out-of-scope titles/H1s against forbidden terms list.
- `scripts/check-citations.js` — verifies `<sup>[[N]](#refN)</sup>` anchors, numbering gaps, footnote-style consistency.
- `scripts/check-orphans.js` — hidden-category pages with no inbound links (exempts surgeon profiles + incontinence procedures which are linked dynamically from React components).
- `scripts/gen-status.js` → `docs/_STATUS.md` — stub tracker with priority + notes, preserved across regenerations.
- Wired to `npm run lint`, `npm run lint:scope`, `npm run lint:citations`, `npm run lint:orphans`, `npm run status`.

---

## 2026-04-20 to 2026-04-21 — Content expansion + Tools restructure

The largest multi-day expansion session to date. Themes: penile-implant / Peyronie's deep-dive, intraoperative-adjuncts library, pharmacology database, antibiotics, energy devices, Tools restructure.

**Penile Implants** — built out from overview to 8 articles (~60 refs total):
- `penile-implants/index.mdx` (overview with section-stack to 7 deep-dives)
- `infection.mdx` (29 refs; IPP infection evolution + 2026 Irrisept pivot)
- `preoperative-evaluation.mdx` (11 refs; CURSED framework)
- `intraoperative-setup.mdx` (12 refs; Eid no-touch protocol)
- `surgical-approaches.mdx` (6 refs; PS/IP/SC/TS)
- `reservoir-placement.mdx` (6 refs; SoR vs HSM ectopic vs 2-piece)
- `implant-models.mdx` (9 refs; AMS/Titan/Rigicon/Ambicor/Tactra/ZSI)
- `revision-scenarios.mdx` (9 refs; fibrosis, crossover, SST, salvage)
- `complications.mdx` (7 refs; erosion, glans ischemia, aneurysm)

**Peyronie's Disease** — converted to subsection with 5 surgical deep-dives (~50 refs total):
- `peyronies-disease/index.mdx` (overview + section-stack)
- `tunica-plication.mdx` (15 refs; Nesbit/16-dot/8-dot/Yachia/TAP/Dugi-Morey/Kiel Knots/Essed-Schröder/MPP)
- `plaque-incision-grafting.mdx` (10 refs; Hatzichristodoulou sealing; BMG meta)
- `prosthesis-with-straightening.mdx` (12 refs; adjunctive ladder Hammad 2025; PICS technique)
- `manual-modeling.mdx` (8 refs; Wilson 1994; Lucas optimal; Moncada home modeling)
- `scratch-technique.mdx` (8 refs; Antonini + vacuum; Shaeer punch)

**Trauma & Emergencies additions:**
- `priapism.mdx` (18 refs) — all 3 subtypes, TWIST, AUA/SMSNA 2021 algorithm, tunneling + PSD, early prosthesis for >36h
- `testicular-torsion.mdx` (20 refs) — TWIST score (AUC 0.924), salvage rates, 5 fixation techniques, TVF salvage

**Evaluation:** NEW `assessment-tools.mdx` (22 refs) — validated-instruments reference: SHIM/IIEF, full POP-Q, pad tests (1-hr/24-hr/7-day), MSIGS, bladder diaries, IPSS, PFDI-20/PFIQ-7, PISQ-IR, USS-PROM, Urethral Stricture Score, NIH-CPSI, ICIQ family, EQ-5D. *(Later moved to `history-physical/` subsection.)*

**Surgical skills expansion:**
- `knot-tying/self-locking-knots.mdx` — biomechanics terminology, Aberdeen (Ultimate), Forwarder, Middler/loop-lock, Loop Knot, Nice Knot (+ Modified), Cow Hitch (stiffest UHMWPE)
- `knot-tying/laparoscopic-knot.mdx` — deleted; repoint links to self-locking-knots
- `suturing/parker-kerr-stitch.mdx` — NEW
- `suturing/barbed-sutures.mdx` — NEW (26 refs)

**Flaps expansion — 5 new pages + geometric plasty framework:**
- `flaps/y-v-plasty.mdx` — BNC workhorse; 90-100% success refractory BNC; ICG/Firefly
- `flaps/medial-thigh.mdx` — Fournier's regional flap; 1.6% flap loss
- `flaps/labia-majora-fasciocutaneous.mdx` — distinct from Martius; Gupta 2022
- `flaps/pmtp-propeller.mdx` — posteromedial thigh perforator
- `flaps/singapore-pudendal-thigh.mdx` — bilateral for neovagina
- Main `flaps-gu-reconstruction.mdx` trimmed to pure index (detail on dedicated pages)
- Penile-preputial flap fully built (McAninch-Morey 13% vs 58% recurrence)

**Intraoperative Adjuncts** — NEW tools subsection (22 files, 2,032 lines) — visualization agents (ICG, methylene blue, indigo carmine, sodium fluorescein, pudexacianinium ASP-5354), hemostatic agents (Surgicel, Arista, Gelfoam/Surgiflo, FloSeal, thrombin), tissue sealants (Tisseel/Evicel/Artiss, TachoSil, cyanoacrylates, PEG sealants).

**Pharmacology** — converted to 13-category searchable database:
- Storage & OAB (anticholinergics, β3-agonists, desmopressin — fully built)
- Voiding outlet (α-blockers, 5-ARIs fully built + 4 stubs)
- Bladder pain IC/BPS, neuropathic pelvic pain, neuromodulation adjuncts
- Infection prophylaxis (UTI treatment + periop antibiotic fully built, 28 refs; 4 stubs)
- Sexual medicine andrology, hormonal therapies, dermatologic topical urethral
- Intraoperative adjuncts, perioperative ERAS, urinary-diversion-specific
- Legacy/low-evidence

**Tools restructure (2026-04-21) — Technology as new subsection:**
- `tools/technology/` container for robotics + energy devices
- Moved: `tools/robotics/` → `tools/technology/robotics/`, `tools/energy-devices.mdx` → `tools/technology/energy-devices.mdx`
- New `tools/index.mdx` section-stack landing
- New `tools/technology/index.mdx` section-stack to Robotics + Energy Devices

New Tools structure: (1) Instruments, (2) Technology, (3) Biomaterials, (4) Pharmacology, (5) Intraoperative Adjuncts, (6) Gear.

**Energy Devices** (~430 lines, 39 refs) — electrosurgery, Bipolar vs Monopolar TURP (Cochrane 59 RCTs), lasers (Ho:YAG / TFL / GreenLight / ThuVAP), Harmonic scalpel, LigaSure, Aquablation, morcellation, electrosurgical safety.

**Antibiotics expansion (in Pharmacology):**
- `uti-treatment-antibiotics.mdx` — 21 refs; stratified framework (uncomplicated cystitis → urosepsis → ESBL → DTR Pseudomonas → CRE → prostatitis → CAUTI → ASB); 2025 IDSA cUTI guideline
- `perioperative-antibiotic-prophylaxis.mdx` — 7 refs; AUA BPS 2020 + PUMP-era (Barham 2023, Abou Chawareb 2025); device-specific; MRSA decolonization

**Site audit (2026-04-21):** Build clean. Foundations landing fix — 3 of 5 section entries were non-clickable `<span>`; added `link: {type: "generated-index"}` and converted to `<a>`.

---

## 2026-04-19 — Fistula build-out + instruments/biomaterials databases + TTS platform

**Content:**
- Rectovesical Fistula article (27 citations) — RVF-vs-RUF distinction, Mundy-Andrich + Sotelo classifications, 4 approaches, 5 interposition options
- Urethropubic Fistula article (16 citations) — UPF spectrum, etiologic pathway (radiation → BNC → endoscopic BOO → UPF), UPF-as-osteomyelitis (88-97% histologic), 4-element operation
- Procedures Causing GU Injury / Cesarean Section (30 citations)
- Intraoperative Consultation subsection (8 references) under Trauma & Emergencies

**Instruments — refactored into searchable database:**
- 38 individual instrument pages across 9 subcategories (needle holders, forceps, clamps, cautery, retractors, sounds & bougies, urethral & pelvic specialty, suction, graft harvest)
- Notable: Turner-Warwick Ryder, Heaney, Lone Star, perineal Bookwalter (Jordan), Haygrove, Ravini, Raz-Pereyra, Gorget
- Later added: Bone Instruments (rongeur, pituitary rongeur, periosteal elevator, air drill, osteotome+mallet); TUITMR devices (JNW UrTrac, RD180, Ti-Knot); SSLF device expansion (Capio, Anchorsure, Saffron, i-Stitch, Endostitch, Miya Hook, Deschamps); Dermatome expansion (Zimmer Air, Padgett, Humby, Goulian, Drum/Padgett-Hood, Skin Mesher)

**Biomaterials — refactored into searchable database:**
- ~46 individual pages across 12 subcategories
- Added: Ureteral Stents (4), Urinary Catheters (6), Surgical Drains (3), Neuromodulation Devices (6 — InterStim II/Micro/X, Axonics r-SNM/F15/R20, PTNS, eCoin, Revi, Altaviva)
- Glean Urodynamics System (Bright Uro, FDA 2025)

**New Foundations subsection — Surgical Skills:** 4 sub-categories, 29 technique pages.

**New Tools subsection — Gear:** loupes, headlights, microscope, radiation protection, ergonomics, PPE, adjunct gear.

**Fistulas revamp by gender:** reorganized `03f-fistulas/` into 3 gender buckets.

**Platform features:**
- ArticleListener TTS — cloud (OpenAI) with browser fallback; progressive playback; section-based chunking with chapter picker
- CitationTooltips — hover-to-view reference text
- Both swizzled into `src/theme/DocItem/Content/index.tsx`

**Podcasts section** — `PodcastLibrary` component with ~40 curated episodes across 10 topics, 7 color-coded feeds.

**CSS fix:** database table headers were white-on-gray (unreadable) — raised specificity.

---

## 2026-04-18 — Intraoperative Consultation + Fistula gender-bucket reorg

- NEW Intraoperative Consultation subsection under Trauma & Emergencies (8 refs — WSES 2023, ACS 2025, Kato/Skokan, Sylla taTME)
- NEW Procedures Causing GU Injury subsection nested inside — first article Cesarean Section (30 citations; Palacios-Jaraquemada 2026 AJOG cited not figure-reproduced)
- Fistulas fully revamped — 3 gender buckets (in-both-genders, in-females, in-males); 13 new stubs; 4 articles moved; `cutaneous-complex.mdx` deleted (content rescued into landing page)

**URL changes:**
- `/docs/clinical-conditions/03f-fistulas/vesicovaginal` → `.../in-females/vesicovaginal`
- `/docs/clinical-conditions/03f-fistulas/ureterovaginal` → `.../in-females/ureterovaginal`
- `/docs/clinical-conditions/03f-fistulas/rectovaginal` → `.../in-females/rectovaginal`
- `/docs/clinical-conditions/03f-fistulas/rectourethral` → `.../in-males/rectourethral`
- `/docs/clinical-conditions/03f-fistulas/cutaneous-complex` → DELETED

---

## 2026-04-17 — Lineage + buccal mucosa + reorgs

- Surgeon profile link bug fixed (`s.id` → `s.path`)
- Library dropdown reordered: Journal Club → Resources → History & Lineage
- "Roots of Reconstruction" renamed to "History & Lineage"
- "Surgical Lineage" renamed to "Surgical Genealogy"
- Hidden Curriculum moved into Resources (`09-hidden-curriculum/` → `08-resources/hidden-curriculum/`)
- Buccal Mucosa Graft article fully built (22 citations) — biological properties, harvest technique, donor site RCT, GU applications, named placement techniques table (Barbagli/Asopa/Kulkarni/Palminteri)

---

## 2026-04-16 — Foundations expansion wave

- Perioperative Care restructured (preoperative-assessment / intraoperative-care / postoperative-management / perioperative-protocols); 16 articles populated
- Surgical Principles built out (incisions-closure, bowel-anastomosis, sutures, needles); flap + graft subdirectories created
- Robotics subsection added (platforms, reconstructive-applications, single-port)
- Anatomy subsections added (Lower Extremity, Oral Cavity)

**URL changes** (perioperative reshuffle):
- `/docs/foundations/perioperative-care/preoperative/*` → `.../preoperative-assessment/*`
- `/docs/foundations/perioperative-care/anesthesia-pain/*` → `.../intraoperative-care/*`
- `/docs/foundations/perioperative-care/postoperative/positioning-nerve-injury` → `.../intraoperative-care/positioning-nerve-injury`
- `/docs/foundations/perioperative-care/postoperative/{constipation,electrolyte-abnormalities,pulmonary-embolism,tpn-ppn}` → `.../postoperative-management/{constipation,electrolyte-abnormalities,pulmonary-embolism,nutrition}`
- `/docs/foundations/perioperative-care/postoperative/{eras,antithrombotic-therapy}` → `.../perioperative-protocols/{eras,antithrombotic-therapy}`

---

## Pre-2026-04-16 — Foundation era (summary)

- Anatomy-and-physiology articles (22) rewritten for the GU-reconstructionist voice; "The X" title convention established
- New components: `SurgeonsExplorer` (GURS/URPS tabs), `VideoCards` (lazy YouTube thumbnail grid)
- Surgeon data model extended with `subspecialty` field; ~20 URPS surgeons seeded + 4 URPS dynasties (Raz, Nitti, Comiter, Ginsberg)
- Sidebar "Surgeons" auto-category hidden
- Algolia DocSearch integrated
- Homepage redesigned — light gradient hero, WARWIKI-as-link, search pill, tagline *Reconstruction, codified.*
- Vercel fix — `cleanUrls: true` + `trailingSlash: false`
- Favicon replaced with solid vector W; social card regenerated
- Public-domain/CC-licensed anatomy images downloaded into `static/img/anatomy/`; no caption-only figure blocks (real image or nothing)
