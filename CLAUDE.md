# WARWIKI - Claude Session Reference

Read this at the start of a session. Keep it small: this file is the working handbook, not the project archive. Put substantive history in `CHANGELOG.md`; use `docs/_STATUS.md` for the stub backlog.

---

## Current Handoff - 2026-05-18 (extended) — Algolia overhaul + instruments rebuild wave + build fix

~30 commits, all fast-forwarded to `main`. Lints + typecheck + build clean across **1,166 files**.

**Algolia search rebuilt (dashboard-only)**: full Crawler Editor overhaul — reference-list stripping (`<a id="refN">`, GAS footnotes, inline `<sup>` citations), nav/database/scaffolding strip, section-tier pageRank (Tier 1 = 80 for all clinical content, Tier 2 = 55 for roots/resources, default 40), landing penalty for sub-landings, `unordered(hierarchy.lvl1)` first in `searchableAttributes`, `desc(weight.pageRank)` first in `customRanking`, `exclusionPatterns` for homepage / /about / /docs/journal-club. New `algolia-synonyms.json` at repo root with ~90 multi-way groups (BMG, AUS, IPP, DVIU, VVF, BNC, VUAS, OAB, SUI, NLUTD, GAS, RARC, ileal conduit/Bricker, Y-V pyeloplasty, GLP-1 brand names, etc.) — uploaded via dashboard. `docusaurus.config.ts` bumped DocSearch `hitsPerPage` from 5 → 20. Full Crawler Editor config preserved in memory file `reference_algolia_crawler_config.md` for future rebuild.

**Instruments rebuild wave** — 7 new pages + ~14 expanded pages with full sourced evidence:

- **New**: [LigaSure](docs/01-foundations/tools/instruments/cautery/ligasure.mdx), [Lowsley Retractor](docs/01-foundations/tools/instruments/urethral-specialty/lowsley-retractor.mdx), [Ellik Evacuator](docs/01-foundations/tools/instruments/suction/ellik-evacuator.mdx), [Toomey Syringe](docs/01-foundations/tools/instruments/suction/toomey-syringe.mdx), [Gelman Visualizing Sound (CS7001)](docs/01-foundations/tools/instruments/sounds-bougies/gelman-visualizing-sound.mdx), [Haygrove Sound (restored)](docs/01-foundations/tools/instruments/sounds-bougies/haygrove.mdx), [Gelman RUG Adapter](docs/01-foundations/tools/instruments/urethral-specialty/gelman-rug-adapter.mdx).
- **Expanded SSLF device family**: Capio, Anchorsure, Saffron, i-Stitch (Manning 2014 vascular signal + Chene 2024/2025 NanoScope visual-guidance), Endostitch (corrected attribution to Schlesinger 1997 from fabricated 'Lantzsch'), Miya Hook (corrected to Frank S. Miyazaki 1987; Lo 2026 strongest pull-out 69.2 N vs 44.0 N Anchorsure), Deschamps (Amiri 2024 highest-blood-transfusion signal + Veronikis VLC subsection).
- **Expanded suction**: Yankauer (anesthesia/airway content removed per user scope), Frazier (3–12 Fr size-by-procedure routing).
- **Expanded graft-harvest family**: Dermatome Overview, Zimmer Air (Egro 2020 71.6% market + 0.1%/yr laceration risk), Padgett (Models B/PI/S + Hattori 2020 free-flap de-epithelialization), Humby (corrected to George Humby 1934, Tehrani 2006 medicolegal survey, Cohen 2020 pomelo simulator), Goulian/Weck (Dicran Goulian attribution, Jeffery 2007 shelving), Padgett-Hood drum (reframed around Kuo 2003 reused-graft niche — uniquely capable via adhesive drum on excised tissue), Skin Mesher (Henderson 2012 nominal-vs-actual expansion, over-vs-cross-meshing rule, Meek comparison).
- **Staplers (GIA) Hub** augmented with Kracht 1993 hemicolectomy RCT (stapled leak 2.8% vs handsewn 8.3%) + new safety section: Emile 2025 stapling-failures SR, Reddy 2023 MAUDE 24-yr mortality (676 deaths), Wexner Quadruple Intraoperative Assessment protocol.

**Index trimming**: deleted Specimen Retrieval Bag (Endo Catch), Laparoscopic Needle Holder, Gore Suture Passer rows. Earlier deleted Guyon / Haygrove / Gelman stub sound pages (Haygrove later restored as sourced page). Removed "Key Use" column from instruments database.

**Build fix (recovery)**: malformed `<sup>` closing tag in [mouth-retractors.mdx:91](docs/01-foundations/tools/instruments/retractors/mouth-retractors.mdx) (`</sup>` typed as `]`) broke `npm run build` and the Vercel deploy across multiple recent pushes. Diagnosed by running `npm run build` locally; fixed in this push. Build now clean.

**Convention reinforced — always run `npm run build` after MDX-with-raw-HTML edits** before declaring a push complete. The standard `npm run lint` catches citation pairing and broken `/docs/` links but does NOT validate JSX/HTML tag closure inside `<sup>` or other raw HTML — only the full Docusaurus build catches that class of error. Saved to user memory.

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-18 — Nutrition deep-dive, LSE classification, ICUD page, four new retractor pages, orphan-lint overhaul, title-disambiguation convention

Large session — **14 commits, all fast-forwarded to `main`**. Lints / typecheck / build clean across ~1,162 files.

**New dedicated atlas pages**:

- [Intracorporeal Urinary Diversion (ICUD)](docs/04-surgical-techniques/04c-urinary-diversion/intracorporeal-urinary-diversion.mdx) — relocated Principle 12 of urinary-diversion-principles into its own page; full robotic step-by-step for ileal conduit + orthotopic neobladder, Bricker vs Wallace, ICUD-vs-ECUD outcomes (IRCC, Katayama 2021, Zhang 2020, Mastroianni 2024 RCT), learning curve. 25 refs.
- [Intraoperative Bowel Handling & Injury Management](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) — new foundations page covering prevention (sharp adhesiolysis, atraumatic graspers, bipolar over monopolar, intestinal isolation bag, Seprafilm caveat, viscera retainer) and iatrogenic-injury management (small-bowel primary repair WSES 1B; colon paradigm shift to liberal primary repair / anastomosis per Fitzgerald 2025 EAST and Mitchao 2022; thermal-injury resect-don't-repair rule with Bishoff 1999 69%-missed signal; damage-control 48–72 h relook; EAF prevention / ChimneyVAC). 27 refs.

**Four new retractor pages** (all + index rows): [Collins](docs/01-foundations/tools/instruments/retractors/collins.mdx) (Charité Alexis-vs-Collins SSI RCT 1% vs 8% non-obese; BMI ≥ 40 benefit lost), [Gelpi](docs/01-foundations/tools/instruments/retractors/gelpi.mdx) (single-sharp-prong Weitlaner sibling; Datta 2004 60-min paraspinal-perfusion rule), [O-Ring / Plastic Sheath Wound Retractor](docs/01-foundations/tools/instruments/retractors/o-ring-wound-protector.mdx) (Alexis / Mobius / O Trac; JAMA Surg 2024 46.8% SSI RRR; ASCRS 2024 strong; WSES Grade 1B dual-vs-single; **cost-effectiveness section** with Chomsky-Higgins 2019 dominant in colorectal vs ROSSINI 2014 single-ring not-cost-effective signal), and [Viscera Retainer (FISH / Glassman)](docs/01-foundations/tools/instruments/retractors/viscera-retainer.mdx) (with evidence-gap section: no RCT shows outcome reduction; framed against 1.9% AHSQC / 12.8% adhesiolysis / 19–20% reoperative enterotomy incidence).

**Nutrition build-out**:

- **Expanded [Perioperative Nutrition](docs/01-foundations/perioperative-care/postoperative-management/nutrition.mdx)** with three new sections (28 new refs, 32–59):
  - **Nutrition and Wound Healing — The Reconstructive Evidence** — Alfertshofer 2026 200k-pt albumin analysis, Bruno 2026 abdominoplasty protein RCT (dehiscence 6% vs 17%), Herzog 2024 H&N flap 3.4× failure, Panayi 2024 frailty + hypoalbuminemia NSQIP, Saeg 2021 micronutrient table, Kjaer 2020 multinutrient collagen-synthesis RCT.
  - **Expanded urology immunonutrition** — Khaleel 2021, Hamilton-Reeves 2018 pilot RCT, Amer 2025 RCT (LOS 7.8 vs 10.6 d), Cochrane Burden 2019, INCyst trial protocol; new **Urogynecologic ERAS Nutrition** subsection (AUGS-IUGA 2022 + ACOG 750).
  - **GLP-1 Receptor Agonists in Perioperative Care** — candidacy expansion (Sidhu 2025 DIEP n = 5,618), mixed wound-healing signal reconciled via protein deficit (Lee 2025, Koenig 2026, Aschen 2025); ADA 2026 personalized aspiration framework; **OCULUS RCT** counter-evidence (holding doesn't empty stomach); Mehta 2025 protein-timing protocol.
- **New evaluation subsection — [Nutritional Assessment](docs/02-evaluation/laboratory-studies/nutritional-assessment/index.mdx)** under Evaluation → Laboratory Studies. Comprehensive landing (ACS framework, full lab table, MUST / NRS-2002 / MNA-SF / GLIM, body-composition workup; 11 refs) plus **15 per-test stub pages** ready to fill out: serum-albumin, prealbumin, transferrin, c-reactive-protein, vitamin-d, iron-ferritin, vitamin-b12, folate, zinc, vitamin-a, thiamine, copper, screening-tools, handgrip-strength, body-composition.

**Urethral stricture / LS rebuild**:

- **[urethral-stricture.mdx](docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx) Classification section** — corrected "Severity" → **Segment** in LSE; added full Erickson 2020 classification, the 2025 LSE staging system (I–V with substages, Urethroplasty Triad Score), and a comparison table with U-Score / ULTRA / cystoscopy / Gombe systems (John 2021 SR). 6 new refs.
- **[lichen-sclerosus.mdx](docs/03-clinical-conditions/03g-genital-scrotal/lichen-sclerosus.mdx) LS Urethral Stricture section** — replaced brief paragraph with comprehensive reconstructive block: AUA 2023 principles, Kurtzman 2021 one-stage BMG meta-analysis (10%/18% recurrence, penile-invagination superiority p = 0.004), Kulkarni vs Asopa head-to-head (Wan 2023), two-stage BMG data with Palminteri 2022 12-mo interval rule, full perineal urethrostomy evidence (Patel, Fuchs, Klemm, Zhao 2025 meta), LS decision-framework table, cross-links to all named technique pages and the LSE-staging anchor. 14 new refs (37–50, with duplicate Chung 2020 collapsed and 39–50 renumbered to 38–49).

**"Shorter ureters, fewer strictures"** — Das 2024 (OR 0.73, 95% CI 0.58–0.92; median resection 2.3 cm vs 1.65 cm) added to [ileal-conduit](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx) as the perfusion-driven counter-intuitive principle; cross-callout in Principle 5 (Achilles heel) of urinary-diversion-principles.

**Orphan-lint overhaul** — fixed [scripts/check-orphans.js](scripts/check-orphans.js) on two dimensions: (1) honor frontmatter `slug:` overrides; (2) count GenericDatabase / data-array `slug:` entries as valid inbound paths. Result: **95 false-positive orphans → 4 real → 0 after cleanup**. Real orphans fixed by adding DB rows (Lotus Petal, Singapore, Laminated Gracilis to male-urethroplasty; Tissue-Engineered Grafts cross-linked from grafts hub). Wired Peyronies [prosthesis-with-straightening.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/prosthesis-with-straightening.mdx) inline at first mention to scratch-technique / manual-modeling / sliding-slicing-techniques deep-dive companions — addresses the user-raised pattern re: hidden deep-dive pages findable only by search.

**Title-disambiguation convention** — 22 files updated with parenthetical suffix when titles actually collide across sections (URLs unchanged):

- Identical-title pairs: **AUS** → (Device) / (Procedure); **Erectile Dysfunction** → (Condition) / (Procedures); **Testicular Reimplantation** → (Condition) / (Procedure); **Botulinum Toxin** → (Neuromodulation Adjunct) / (OAB / Storage); **PDE5 Inhibitors** → (Pharmacology) / (Procedures); **Non-Binary / Nullification** → (Procedures) / (Special Population).
- BPH device/procedure pairs standardized to (Device) / (Procedure): ProACT, iTind, Optilume BPH, Aquablation.
- Same-eponym instrument pairs got instrument type: Iris **Forceps**, Heaney **Clamp** (siblings already had "Scissors" / "Needle Driver").
- Fistula "...Repair" pairs and overview.mdx section-disambiguated pages left alone. Convention saved to user memory for future sessions.

**CSS** — table top-margin tightened ([custom.css](src/css/custom.css:240)) when a table directly follows a `<p>`: ~ 44 px → ~ 20 px.

**Algolia search** (dashboard-only, no repo commit) — diagnosed PageRank-backward + GenericDatabase-content-pollution; recommended Crawler-Editor recordExtractor with reversed pageRank tiers, exclusion of references / `.section-stack` / `.toc-list` / tables / `.GenericDatabase`, breadcrumb-anchored `lvl0`, and `desc(weight.pageRank)` as first custom-ranking attribute. Owner applied and confirmed improvement; reference-strip drop required raising SafeReindex threshold 30% → 70% for the one-time republish.

**Conventions reinforced**:

- **Disambiguate duplicate page titles with parenthetical suffix** when (and only when) titles actually collide; URLs unchanged.
- **Hidden pages must be reachable via inline prose cross-link** from the consolidated parent — search-only access is unacceptable for deep-dive content.
- **GenericDatabase slugs count as inbound links** for orphan-lint purposes.

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-16 — Instruments build-out: endoscopy + robotic subdirectories, sounds-bougies completion, urinary-diversion principles

Continued the comprehensive instruments build from 2026-05-15. **~50 commits across ~40 new / expanded instrument pages and one urinary-diversion-principles update**, all fast-forwarded to `main`. Lints clean throughout (~1,140 files).

**Sounds & Bougies completion** — new pages: [hegar-dilators](docs/01-foundations/tools/instruments/sounds-bougies/hegar-dilators.mdx) (Kaplan 2015 postmenopausal labial-fusion separation), [dittel](docs/01-foundations/tools/instruments/sounds-bougies/dittel.mdx) (Sarin 2021 female-stricture-dilation 49% pooled / Santucci 2008 office overutilization), [s-dilators](docs/01-foundations/tools/instruments/sounds-bougies/s-dilators.mdx) (Herschorn / Carrington 2007), [filiforms-followers](docs/01-foundations/tools/instruments/sounds-bougies/filiforms-followers.mdx) (Heyns 1998), [otis-urethrotome](docs/01-foundations/tools/instruments/sounds-bougies/otis-urethrotome.mdx) (Schultz vs Nielsen 1989 pre-TURP debate), [sachse-urethrotome](docs/01-foundations/tools/instruments/sounds-bougies/sachse-urethrotome.mdx) (21 Fr DVIU workhorse; Giannakopoulos 1997 / Farrell 2017 MMC), [balloon-dilator](docs/01-foundations/tools/instruments/sounds-bougies/balloon-dilator.mdx) (radial-vs-axial; anatomic-hub table), [guidewires](docs/01-foundations/tools/instruments/sounds-bougies/guidewires.mdx) (Amasyali 2020 four-category data; Dutta 2016 "Death of the safety wire"). Substantially expanded [van-buren](docs/01-foundations/tools/instruments/sounds-bougies/van-buren.mdx). **Deleted** Goodwin Sound row (likely fabricated attribution).

**Retractors** — added [pederson](docs/01-foundations/tools/instruments/retractors/pederson.mdx) (ACOG-recommended narrow speculum) and [lighted-retractors](docs/01-foundations/tools/instruments/retractors/lighted-retractors.mdx) (Lumitex LightMat® + Kokosis 2020 headlamp-pain OR 2.5 surgeon-ergonomics framing). Fixed Pedersen cross-link on Graves.

**Urethral & Pelvic Specialty** — added [midurethral-sling-trocars](docs/01-foundations/tools/instruments/urethral-specialty/midurethral-sling-trocars.mdx) (renamed from "Tunneler" to WARWIKI's "trocar" convention; full IVS / TVT / TVT-Exact / outside-in / inside-out / mini-sling / Stamey-substitute family table; Zahn 2007 cadaveric data; Ludwig TOT 8/4; Kim 2019 high-risk meta), [single-tooth-tenaculum](docs/01-foundations/tools/instruments/urethral-specialty/single-tooth-tenaculum.mdx) and [jacobs-tenaculum](docs/01-foundations/tools/instruments/urethral-specialty/jacobs-tenaculum.mdx) (Andrews 2023 / Samy 2019 / ACOG 2025; deleted Bozeman row), [vessel-loops](docs/01-foundations/tools/instruments/urethral-specialty/vessel-loops.mdx) (Moore / Manship 1985 SEM endothelial-injury data; shoelace-technique RCTs), [probe-grooved-director](docs/01-foundations/tools/instruments/urethral-specialty/probe-grooved-director.mdx), [bladder-scanner](docs/01-foundations/tools/instruments/urethral-specialty/bladder-scanner.mdx) (Chrouser 2024 RAND/UCLA ≥500 mL threshold; Palese 2010 CAUTI OR 0.27; Mavani 2025 obesity caveat; post-augmentation non-validation), [laparotomy-pads](docs/01-foundations/tools/instruments/urethral-specialty/laparotomy-pads.mdx) (Stone 1983 damage-control 7%→65% survival; Brown 2025 ACOG accreta packing; Inaba 2016 RFD 100% sensitivity), [ray-tec-sponges](docs/01-foundations/tools/instruments/urethral-specialty/ray-tec-sponges.mdx) (4×4 sponge-stick workhorse; never-in-abdomen rule).

**Clamps** — added [backhaus](docs/01-foundations/tools/instruments/clamps/backhaus.mdx) (penetrating-vs-non-penetrating; Lhotka 1998 nickel-allergy; David 2020 negative-pressure-drape rationale).

**NEW `endoscopy/` subdirectory** (sidebar position 13, 8 pages): [rigid-cystoscope](docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx) (lens-angle table; AUGS 2018 cystoscopy-at-prolapse; Otis-Chapados 2022 AUS-cuff safe-passage table), [flexible-cystoscope](docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx) (chip-on-tip vs fiberoptic; single-use-vs-reusable Holmes 2023 / Seyam 2020 / Assmus 2022 $185 vs $272), [semi-rigid-ureteroscope](docs/01-foundations/tools/instruments/endoscopy/semi-rigid-ureteroscope.mdx) (Dretler/Cho 1989; Omar 2022 4.5/6 vs 6/7.5 Fr; Sunaryo 2022 OR 1.71 URS stricture), [flexible-ureteroscope](docs/01-foundations/tools/instruments/endoscopy/flexible-ureteroscope.mdx) (Belkovsky 2024 single-use meta; Gauhar 2025 dusting + TFL signal; AUA/SUO 2023 UTUC kidney-sparing), [resectoscope](docs/01-foundations/tools/instruments/endoscopy/resectoscope.mdx) (Cochrane Alexander 2019 mono-vs-bipolar TUR-syndrome 18 vs 3 / 1000; Teoh 2024 ERBT 29% vs 38%), [collins-knife](docs/01-foundations/tools/instruments/endoscopy/collins-knife.mdx) (TUIP / TUIBNC / external sphincterotomy / NU bladder-cuff; **deleted** Cold-Cup Biopsy Forceps and Bugbee Electrode rows), [resection-loop](docs/01-foundations/tools/instruments/endoscopy/resection-loop.mdx) (Bhalla 2007 90% tensile loss at 30° bend; Sharma 2021 bipolar OR 0.27 artifact; Mancon 2025 bipolar ERBT HR 0.24), [vaporization-electrode](docs/01-foundations/tools/instruments/endoscopy/vaporization-electrode.mdx) (Hoekstra 2010 10-yr 11% vs 23% favoring TURP; Huang 2019 network-meta favoring enucleation).

**NEW `robotic/` subdirectory** (sidebar position 14, ~10 pages): **bipolar trio** [maryland-bipolar](docs/01-foundations/tools/instruments/robotic/maryland-bipolar.mdx) + [fenestrated-bipolar](docs/01-foundations/tools/instruments/robotic/fenestrated-bipolar.mdx) + [force-bipolar](docs/01-foundations/tools/instruments/robotic/force-bipolar.mdx); **grasper trio** [prograsp](docs/01-foundations/tools/instruments/robotic/prograsp.mdx) (Ramirez 2016 three-instrument 40% cost-reduction RARP; Lee 2015 1.84–3.37× posture-dependent grip) + [cadiere](docs/01-foundations/tools/instruments/robotic/cadiere.mdx) (bowel-handling for urinary diversion; Single-Site availability) + [tip-up-fenestrated](docs/01-foundations/tools/instruments/robotic/tip-up-fenestrated.mdx) (perpendicular-lift vector); **energy instruments** [monopolar-curved-scissors](docs/01-foundations/tools/instruments/robotic/monopolar-curved-scissors.mdx) (Overbey 2021 stray-energy; Wikiel 2023 cVRG-vs-cPRG 4.4 vs 41.1 °C; cold-only-for-NVB pearl) + [cautery-hook](docs/01-foundations/tools/instruments/robotic/cautery-hook.mdx) (Lee 2020 colectomy LN harvest signal) + [harmonic-ace](docs/01-foundations/tools/instruments/robotic/harmonic-ace.mdx) (ultrasonic; **no-EndoWrist as defining trade-off**, assistant-port workflow Kakeji 2015 251 vs 306 min); **consolidated pages** [needle-drivers](docs/01-foundations/tools/instruments/robotic/needle-drivers.mdx) (Large + Mega + SutureCut + Mega SutureCut + Black Diamond Micro with anchor routing; **emphasized sacrocolpopexy mesh-to-vagina (SutureCut) and mesh-to-promontory (Mega SutureCut)** per user request; Lai 2019 + Sudarman 2026 96% flap-survival vs Symani/MUSA) and [vessel-sealers](docs/01-foundations/tools/instruments/robotic/vessel-sealers.mdx) (VSE + SynchroSeal with anchors; Pilz da Cunha 2024 48 vs 95 mL; Birgin 2026 SAMBA wet-sealing); [robotic-stapler](docs/01-foundations/tools/instruments/robotic/robotic-stapler.mdx) (Saxena 2025 RARC ileo-ileal n = 170; Holzmacher 2017 cost / fires-per-patient).

**Biomaterials linking** — created [open-ended-ureteral-catheter](docs/01-foundations/tools/biomaterials/ureteral-stents/open-ended-ureteral-catheter.mdx), [ureteral-access-sheath](docs/01-foundations/tools/biomaterials/ureteral-stents/ureteral-access-sheath.mdx) (Traxer 2013 PULS classification; Ali 2026 6 N force threshold; FANS-suction sheaths), and [three-way-catheter](docs/01-foundations/tools/biomaterials/urinary-catheters/three-way-catheter.mdx) (Davis 2016 CSA-not-French; Clarebrough 2018 CATCH-22 protocol). Linked existing comprehensive [double-j-stent](docs/01-foundations/tools/biomaterials/ureteral-stents/double-j-stent.mdx) and [nephrostomy-tube](docs/01-foundations/tools/biomaterials/ureteral-stents/nephrostomy-tube.mdx) biomaterials pages from the instruments-index rows.

**Surgical-principles update** — added **Principle 12 — Intracorporeal Reconstruction Is Now the Default Robotic Approach** to [urinary-diversion-principles](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx). IRCC 9% → 97% adoption (Hussein 2018), ICUD-vs-ECUD outcomes table (transfusion 4% vs 19%, 90-d major-complications OR 0.57 at high-volume centers, LN yield +3.68), Mastroianni 2022 / 2024 only RCT vs open RC, volume + comorbidity modifiers, cross-link to [robotic stapler](docs/01-foundations/tools/instruments/robotic/robotic-stapler.mdx) and [staplers index](docs/01-foundations/tools/instruments/staplers/index.mdx). 9 new refs (30–38).

**Conventions reinforced**:
- **Consolidation pattern** — when 2–5 variants share 80%+ content, consolidate into one page with anchor-fragment routing per variant from the index rows (needle-drivers and vessel-sealers as worked examples; vercel redirects for retired slugs). Peer instruments with genuinely distinct roles (Maryland / Fenestrated / Force bipolar trio; ProGrasp / Cadiere / Tip-Up grasper trio) stay separate.
- **Push-main-cadence memory** saved — every commit fast-forwards `main` and pushes `origin main` in the same step (Vercel deploys from main). Documented in `feedback_push_main_cadence.md`.
- **Index-row use-column conciseness** — rebalanced when the user flagged the table becoming too spaced out. House style is ~ 10–15 word use descriptions, not 30–40-word sentences.

**Deletions**: Goodwin Sound row, Bozeman Uterine Dressing Forceps row, Cold-Cup Biopsy Forceps row, Bugbee Electrode row, Large Needle Driver and Mega Needle Driver standalone pages (consolidated with redirects), SynchroSeal standalone page (consolidated with redirect).

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-15 — Full instruments-section rewrite

Comprehensive, evidence-based expansion of the entire `01-foundations/tools/instruments/` directory — **43 commits across ~55 instrument pages** spanning tissue forceps, needle holders, clamps, scissors (new subdirectory), cautery, retractors, urethral & pelvic specialty. House-style template established: design → RU/urogyn uses → comparison table → technique pearls → safety profile → named historical context → cross-links → references. Historical-attribution corrections (Crawford, Richardson, Hegar, Graves). Lints clean across ~1,095 files. Full detail in `CHANGELOG.md` under 2026-05-15.

The 2026-05-16 build-out above (endoscopy + robotic subdirectories, sounds-bougies completion, consolidation pattern, urinary-diversion-principles update) is a direct continuation.

---

## Older Handoffs

All session detail from 2026-05-14 and earlier is archived in [CHANGELOG.md](CHANGELOG.md). For commit-level history, see `git log --oneline`.

---

## Non-Negotiables

Before writing or modifying an article:

1. Scope: primary topics must fit reconstructive urology, functional urology, or urogynecology. Out of scope as primary topics: endourology for stones and primary urologic oncology. Reconstructive consequences are fine.
2. Voice: write for reconstructive surgeons and urogynecologists, not patients or general medicine readers. Keep operative relevance, anatomy, decision points, complications, and outcomes.
3. Citations: use real published references only. Default citation pattern is inline `<sup>[[N]](#refN)</sup>` plus `<a id="refN"></a>N. ...` anchors. GAS pages use footnotes (`[^N]`). Do not fabricate citations.
4. Cross-link instead of duplicating: when a nearby hub already owns anatomy, pharmacology, physiology, or workflow detail, link to it and keep the new page narrow.
5. Hidden atlas pages must still be reachable through explicit database or hub links so orphan lint passes.

Before committing:

1. Run `npm run lint`.
2. If stubs were added or filled, run `npm run status`.
3. If articles, links, routes, MDX, or React changed, run `npm run typecheck` and `npm run build`.
4. Run `git diff --check`.

---

## Commands

| Task | Command |
|---|---|
| Dev server | `npm start` |
| Production build | `npm run build` |
| TypeScript | `npm run typecheck` |
| Full lint | `npm run lint` |
| Scope lint | `npm run lint:scope` |
| Citation lint | `npm run lint:citations` |
| Orphan lint | `npm run lint:orphans` |
| Internal links | `npm run lint:links` |
| Reference-density advisory | `npm run lint:density` |
| Stub tracker | `npm run status` |
| Regenerate stats | `npm run stats` |

`npm run build` runs `prebuild` and regenerates `src/data/stats.json`.

---

## Project Shape

WARWIKI is a Docusaurus v3 medical reference wiki for functional urology and genitourinary reconstruction. Audience: urology residents, fellows, reconstructive surgeons, and urogynecologists.

Top-level docs:

| Directory | URL |
|---|---|
| `docs/01-foundations/` | `/docs/foundations` |
| `docs/02-evaluation/` | `/docs/evaluation` |
| `docs/03-clinical-conditions/` | `/docs/clinical-conditions` |
| `docs/04-surgical-techniques/` | `/docs/surgical-techniques` |
| `docs/05-special-populations/` | `/docs/special-populations` |
| `docs/06-journal-club/` | `/docs/journal-club` |
| `docs/07-roots/` | `/docs/roots` |
| `docs/08-resources/` | `/docs/resources` |

URL rules:

- Docusaurus strips numeric prefixes from top-level dirs only: `03-clinical-conditions` becomes `/docs/clinical-conditions`.
- Alphanumeric subsection prefixes stay in URLs: `04a-urethral-reconstruction` stays `04a-urethral-reconstruction`.
- Same-name file/dir collapses: `oral-cavity/oral-cavity.mdx` serves at `/docs/.../oral-cavity`.
- Vercel uses `cleanUrls: true` and `trailingSlash: false`.

Key files:

| File | Purpose |
|---|---|
| `docusaurus.config.ts` | Site config, navbar, Algolia, metadata, broken-link behavior |
| `sidebars.ts` | Sidebar wiring |
| `src/css/custom.css` | Main custom styling and reusable classes |
| `src/components/GenericDatabase.tsx` | Searchable/filterable database component |
| `src/components/VideoCards.tsx` | Lazy YouTube card grid |
| `src/components/SurgeonsExplorer.tsx` | GURS/URPS genealogy explorer |
| `src/data/surgeons.ts` | Surgeon records and dynasty data |
| `src/data/stats.json` | Generated article/reference counts |
| `scripts/check-*.js` | Lint checks |
| `scripts/gen-status.js` | Stub tracker generator |
| `docs/_STATUS.md` | Current stubs and priorities |
| `CHANGELOG.md` | Session history archive |

---

## Article Pattern

Default clinical article:

```mdx
---
title: Short Sidebar Title
sidebar_position: N
---

# Full Article Title

Opening paragraph with reconstructive relevance and an early citation.

---

## Epidemiology
## Etiology / Pathophysiology
## Clinical Presentation / Diagnosis
## Classification / Staging
## Management
## Complications
## Outcomes / Follow-Up
## References

<a id="ref1"></a>1. Last FM, et al. "Article Title." *Journal.* Year;Volume(Issue):Pages. doi:[10.xxxx/...](https://doi.org/10.xxxx/...)
```

Citation rules:

- Inline: `<sup>[[1]](#ref1)</sup>`.
- Multiple: `<sup>[[1]](#ref1)[[2]](#ref2)</sup>`.
- References go after a `---` separator at the end.
- Include DOI links when available.
- Cite guidelines, RCTs, systematic reviews, and high-volume series when applicable.
- Keep reference numbering contiguous; use `scripts/fix-citations.js` only when appropriate and review the result.

GAS citation variant:

- Use footnotes consistently within GAS pages: inline `[^1]`, bottom `[^1]: ...`.

MDX gotchas:

- Escape prose angle brackets: `&lt;35 kg/m2`, not `<35 kg/m2`.
- Escape ampersands in JSX attributes: `RUG &amp; VCUG`.
- No `$$...$$` LaTeX; math plugins are not installed.
- Raw HTML must be valid JSX.
- Landing pages use `hide_title: true`, which also suppresses the TTS ArticleListener.

---

## Content Standards

Scope:

- In scope: urethroplasty, ureteral reconstruction, reimplantation, pyeloplasty, bladder augmentation, catheterizable channels, urinary diversion framed reconstructively, fistula repair, incontinence surgery, AUS/IPP, Peyronie's, ED surgery, GAS, hypospadias, prolapse, perineal reconstruction, neurogenic bladder, voiding dysfunction, and functional pelvic disorders.
- Out of scope as primary topics: PCNL, ureteroscopy for stones, radical cystectomy/nephrectomy/prostatectomy as cancer operations.
- Gray zone: acceptable only when framed as reconstructive consequence, such as radiation injury, post-prostatectomy stricture, post-cystectomy diversion complications, or RUF after prostate cancer treatment.

Voice and accuracy:

- Formal academic prose, active voice, no consumer-health disclaimers.
- Be specific with complication rates, success rates, follow-up intervals, and evidence quality.
- Tables are preferred for comparisons and operative decision logic.
- Cut general-medicine depth that does not alter reconstructive decisions.

Source cleanup for chatbot-assisted drafts:

- Remove trailing "Would you like..." prompt text.
- Remove placeholder figure text unless embedding a real image.
- Rebuild mashed markdown tables.
- Convert bracket citations to the site citation pattern.
- Check that every cited reference supports the claim and that every anchor is used.
- Watch for copied `undefined`, malformed `p[N]`, and wrong acronym links.

---

## Atlas And Database Conventions

Treatment-atlas preferred pattern:

1. Section landing page is itself the searchable database.
2. A short "General Principles" block appears above the database when useful.
3. Named technique pages are linked from database rows.
4. Redundant overview pages are hidden from the sidebar when the landing already serves that role.

Database row naming:

- Use bare procedure names with optional acronym only.
- Do not add indication, uniqueness, FDA status, evidence claims, or long parentheticals to row names.
- Keep notes only when not every row has a dedicated page. Once every row has a full page, drop duplicated notes if the section pattern supports it.

Hidden pages:

- Page frontmatter can use `sidebar_class_name: sidebar-hidden-item`.
- Hidden directories use `_category_.json` with `"className": "sidebar-hidden-category"`.
- Hidden pages still need explicit links from a visible hub/database.

Current locked examples:

- Male cosmetic database: notes dropped after every row gained a dedicated page.
- Female cosmetic database: notes remain until every row has a dedicated per-device page.
- Energy-device cosmetic pages must distinguish surgical cutting-tool use from nonsurgical "rejuvenation" marketing and FDA warnings.

---

## Index And Landing Pages

Every section has an `index.mdx` with `hide_title: true`.

Top-level landings use `section-stack`:

```mdx
<ul className="section-stack">
  <li>
    <a href="/docs/section/subsection" className="section-stack-title section-stack-link">Subsection Title</a>
    <span className="section-stack-desc">One-line description.</span>
  </li>
</ul>
```

Deeper indexes may use `toc-list` and optional `toc-chips`:

```mdx
<ul className="toc-list">
  <li>
    <a href="/docs/.../page"><strong>Page Title</strong></a>
    <span className="toc-desc">Description.</span>
    <div className="toc-chips">
      <a href="/docs/.../child">Child</a>
    </div>
  </li>
</ul>
```

Use linked `<a>` titles for sections with real landings; use `<span className="toc-section">` for non-clickable headings.

---

## Components And Assets

VideoCards:

```mdx
import VideoCards from '@site/src/components/VideoCards';

<VideoCards videos={[
  { id: 'JVOycQzgHN0', title: 'Kidney anatomy', subtitle: 'Gross and vascular overview' },
]} />
```

- `id` is only the YouTube ID.
- Place `## Videos` immediately before `## References`.

Anatomy images:

- Store in `static/img/anatomy/`.
- Embed as `![Alt text](/img/anatomy/file.ext)` followed by an italic caption.
- Use public-domain or CC sources such as Gray's Anatomy, OpenStax, and Blausen.
- Never create caption-only figure blocks.

Surgeon profiles:

- Profiles live at `docs/07-roots/surgeons/{a-g|h-r|s-z}/{name}.mdx`.
- `SurgeonDirectory` and `SurgeonTree` must link with `s.path`, not `s.id`, because alpha-group folders are part of the URL.
- `docs/07-roots/surgical-lineage.mdx` hosts `<SurgeonsExplorer defaultSubspecialty="GURS" />`; the surgeons category is hidden from the sidebar.

---

## Design And Navigation

Brand:

- Primary blue: `#185FA5`.
- Clean academic style, not consumer health.
- Add dark-mode CSS variants for new light-only colors.

Navbar:

1. Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations.
2. Library dropdown: Journal Club, Resources, History & Lineage.
3. Search.
4. About.
5. GitHub icon.

Homepage:

- `WARWIKI` title links to `/docs/foundations`.
- Tagline: `Reconstruction, codified.`
- Search pill text: `Where should we start?`

---

## Current Section Notes

- Foundations: Anatomy & Physiology, Surgical Principles, Surgical Skills, Perioperative Care, Pharmacology, Tools.
- Treatment Atlas: landing-page-as-database pattern is preferred; 04b bladder, 04a urethral, and 04c urinary diversion are examples.
- Incontinence lives under `04f-incontinence-procedures/`; old `04h-prosthetics/` was deleted.
- History & Lineage uses `SurgeonsExplorer`; hidden surgeon pages are reached through the genealogy page.
- Hidden Curriculum now lives under Resources at `docs/08-resources/hidden-curriculum/`.

Current stub list is generated in `docs/_STATUS.md`. Run `npm run status` after filling stubs.

---

## History

Keep only the live handoff and durable conventions here. For historical detail:

- `CHANGELOG.md` has the rolling session archive.
- `git log --oneline` has commit-level history.
- `docs/_STATUS.md` has the active stub backlog.

Last compacted: 2026-05-18.
