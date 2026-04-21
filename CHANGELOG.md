# WARWIKI Changelog

Running log of substantive content and platform changes. Extracted from session notes in CLAUDE.md on 2026-04-21 so that CLAUDE.md can remain pure rules and conventions.

For commit-level detail run `git log --oneline`.

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
