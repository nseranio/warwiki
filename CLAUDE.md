# WARWIKI - Claude Session Reference

Read this at the start of a session. Keep it small: this file is the working handbook, not the project archive. Put substantive history in `CHANGELOG.md`; use `docs/_STATUS.md` for the stub backlog.

---

## Current Handoff - 2026-05-12 — Launch-day cleanup pass

Launch-day pass touching site polish, inclusive language, navigation consistency, and a handful of new content additions. Twelve commits to `main`, all building clean across ~1,038 files.

**Anki deck experiment (added then reverted).** Built a 2,038-card Anki deck (commit `267a77f`) covering foundations, evaluation, clinical conditions, and special populations — three parallel agents extracted cards from the relevant sections within strict length and quality constraints, scoped to exclude the treatment atlas and library per the owner's direction. The deck file was at `static/anki/warwiki-anki-v1.csv` with a resource page at `docs/08-resources/anki-deck.mdx`. The owner reviewed and chose to remove it (commit `6052c0a`) — the content is preserved in git history if a future iteration is wanted. The supporting taxonomy (`WARWIKI::Section::Subsection::Topic`) and the parallel-agent generation pattern (Foundations / Evaluation+SpecialPops / Clinical with TSV temp files and a defensive dedup merge) are documented here for the next attempt.

**AUS revision/salvage expansion (commit `ac88819`).** Major expansion of the Revision and Salvage Techniques section on [Artificial Urinary Sphincter](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx). New conceptual subsection **"The Hourglass Debate — Capsulotomy and the Atrophy Question"** anchored on Bugeja/Mundy 2016 (hourglass deformity resolves on capsulectomy; PRB pressure loss is the dominant NOMECA driver; 85.7% same-size cuff replacement success) and Terlecki/Wilson 2022 "Wilson's Workshop 11" paradigm (capsulotomy → measure-after-release → same-size cuff → complete device replacement). Expanded outcomes per technique: Krughoff 2023 downsizing; Couillard 1995 proximal repositioning; O'Connor 2008 + Manka/Wright cadaver + Yafi PIF + Ahyai 2016 on tandem cuff (with the cadaver caveat that "tandem benefit" may reflect proximal placement, not the dual-cuff mechanism); Domínguez Gutiérrez 2025 SR (TC revision OR 2.99 but infection OR 0.33, erosion OR 0.35); Wiedemann / Ortiz heat-map / Mock urethral-risk-factors / Moser TC-after-erosion data; new Tandem-Transcorporal subsection (Magera/Elliott) and Distal-Double-Cuff-vs-TC head-to-head (Maurer 2019); Khouri PRB herniation 3.2%; Loh-Doyle PRB-exchange predictors. Updated Key Principles to surface capsulotomy + same-size replacement as the default and the DC→TC sequential salvage paradigm. **16 new references (40–55).** The companion `surgical-skills/` directory (Heaney stitch, Parker-Kerr, quilting, glove wetting, suture lubrication) remains hidden from the sidebar — reached only via cross-links from procedure pages; discoverability decision deferred.

**Polish / launch prep**

- Replaced the underbuilt Surgical Genealogy page at `docs/07-roots/surgical-lineage.mdx` with a concise two-sentence "in development" placeholder + call for collaborators (contact `warwikihq@gmail.com`); kept the History sub-page link from the parent landing. Tightened the 07-roots landing description so it no longer over-promises a searchable directory + tree that does not yet exist.
- Standardized the public contact email to **warwikihq@gmail.com** across the repo; scrubbed `nseranio@gmail.com` from all tracked files (was lingering in AGENTS.md historical notes); saved a feedback memory so future sessions default to the project mailbox.
- Removed per-page last-update author name (`showLastUpdateAuthor: false` in `docusaurus.config.ts`); last-update timestamp preserved.
- Audited site for stale content; ran `scripts/fix-citations.js` to clean 75 files with citation-anchor gaps / orphans across foundations flaps (igap, epap, posterior-thigh, mcfap, island-groin), 04ab BNC/VUAS (8 procedures), 04b bladder-reconstruction (9), 04c urinary-diversion, 04d upper-tract, 04e genital-reconstruction (22), 04g prolapse (8), 04h fistula-repair (10), and 04l cosmetic (2). Added missing `hide_title: true` to the 04a urethral-reconstruction index landing.

**Sex/gender language sweep**

- Renamed the heteronormative `both-genders` folder to `all-patients` across the fistula taxonomy — both `04h-fistula-repair/both-genders/` → `all-patients/` and `03f-fistulas/in-both-genders/` → `all-patients/`, plus the `04h/both-genders-fistula.mdx` landing → `all-patients-fistula.mdx`. Updated `_category_.json` labels, all inbound links, the JS export name in the landing's `GenericDatabase` array, and added three permanent vercel.json redirects covering the old URL families.
- Display prose updates: "Both-Genders Fistula Repair" → "Fistula Repair (All Patients)"; "Fistulas in Both Genders" → "Fistulas (All Patients)"; "in both sexes" → "across sexes"; "across both sexes" → "across all patients". One "nontranssexual patients" cohort descriptor → "patients undergoing phalloplasty for non-gender-affirming indications"; one "male-to-female gender-reassignment surgery" → "vaginoplasty (gender-affirming surgery)".
- Added a header note to `docs/08-resources/hidden-curriculum/billing-coding.mdx` acknowledging that several ICD-10 code descriptions (F64.0 Transsexualism; Q56.0–Q56.4 Hermaphroditism / Pseudohermaphroditism; Z87.890 Personal history of sex reassignment) use outdated stigmatizing language but are preserved verbatim because billing accuracy requires matching the official descriptor, and pointing clinicians to current preferred terminology (DSD, gender dysphoria / gender incongruence, gender-affirming surgery) for clinical documentation. Saved a feedback memory codifying this practice.

**New clinical content**

- New [Pelvic Venous Disorders](docs/03-clinical-conditions/03h-pelvic-pain/pelvic-venous-disorders.mdx) page under chronic-pelvic-pain. Full PeVD / PCS picture: normal anatomy with embryologic basis for left/right asymmetry; the deep uterine vein as a surgical landmark splitting the lateral uterine aspect into vascular and nervous zones (relevant to radical hysterectomy and uterine transplantation); US Uterus Transplant Consortium superior/inferior uterine vein nomenclature; reflux-vs-obstruction pathophysiology including nutcracker and May-Thurner; hormonal contribution; clinical presentation with post-coital pain as the pathognomonic feature; the four pelvic escape points and the bottom-up paradigm; SVP classification with zones 1–4; imaging hierarchy (TVUS, venography, CT/MRI, IVUS); endovascular management as mainstay (Hansrani 2023 RCT, durability data, Daniels SR); the 2026 Emory POTS / orthostatic-intolerance association (83% PeVD prevalence; 44% complete resolution after iliac stenting). 36 deduplicated references with DOI links. Cross-linked from the existing PCS subsection of `chronic-pelvic-pain.mdx`.
- New [Glove Wetting for Knot Tying](docs/01-foundations/surgical-skills/glove-wetting.mdx) page in `surgical-skills/`. Friction-reduction rationale; bench evidence that wet conditions reduce knot slippage (Pietschmann, Savage, Coleridge, Muffly); glove perforation literature (Enz 2023 25–37%, Martinez 2013 thicker-vs-thinner gloves, Battersby 2016 double-gloving knot-quality tradeoff); Enz 2026 global gloving consensus + WSES 2020; practical-pearls table; RU-specific moments where the pearl matters (anastomotic urethroplasty, VUA after RP, sling/prosthesis ties, robotic intracorporeal knots). Renamed the `surgical-skills/_category_.json` label from "Named Stitches" to "Surgical Skills" so the directory accommodates non-stitch operative pearls.
- New [Suture Lubrication](docs/01-foundations/surgical-skills/suture-lubrication.mdx) page covering the surgical tradition of running sutures through bacitracin ointment, petroleum jelly, or mineral oil. Frames against modern evidence: petroleum-based agents reduce knot failure load (Muffly 116.7 vs 123.8 N, p = 0.002) via the Johanns 2023 friction-elastoplasticity framework; bacitracin adds an anaphylaxis pathway (SHEA/IDSA 2022 contraindication of bacitracin irrigation) and an allergic-contact-dermatitis cost (Smack 1996 JAMA RCT n = 922); Adkins 2022 in vitro antimicrobial signal balanced against the CDC 2017 recommendation that triclosan-coated sutures are the engineered alternative for the antimicrobial goal. Bottom line: saline for lubrication, triclosan-coated sutures for antimicrobial coverage.
- New [Radiation Safety](docs/02-evaluation/imaging/radiation-safety.mdx) page in evaluation. Occupational fluoroscopy safety for the reconstructive urologist: ICRP/NCRP dose limits (eye lens 20 mSv/yr is the rate-limiting organ); FLASH UK reference levels by procedure (PCNL 24.1 Gy·cm² as the high-dose outlier); ALARA principles operationalized through shielding (apron, thyroid collar, leaded eyewear, ceiling-mounted, under-table — reducing trunk dose 95%, genital 99%, leg 97%), distance (inverse-square law — 3× distance = 9× scatter reduction), and equipment optimization (pulsed half-dose ~30% reduction, last-image hold, collimation); procedure-specific pearls including RUG/VCUG, URS/stent, PCNL, urethroplasty workup; pregnancy considerations. Patient-side radiation injury (cystitis, urethral stricture in irradiated bed, AUS durability) continues to live in `surgical-principles/radiation-tissue-effects.mdx`, with a cross-link added in both directions.

**Taxonomy decision codified**

For "where do disparate technique pearls live?" — answer: **named techniques / maneuvers / operative pearls** go in `01-foundations/surgical-skills/`; **physical instruments** in `01-foundations/tools/instruments/`; **broader principles** in `01-foundations/surgical-principles/`. The Heaney stitch, Parker-Kerr stitch, quilting stitch, glove wetting, and suture lubrication are all in surgical-skills; ski needle / J-hook is in tools/instruments; sutures, needles, and wound healing are in surgical-principles.

**Landing-page / sidebar ordering pass**

Audited every `index.mdx` against the sidebar order implied by `sidebar_position` and `_category_.json` `position` fields. Fixed real mismatches (left intentional curation choices alone):

- `06-journal-club/index.mdx` — swapped to put Guidelines & White Papers before Journal Database (matches sidebar pos 2 vs 5).
- `05-special-populations/05a-trauma-emergencies/index.mdx` — reordered both sub-groups to match explicit `sidebar_position` numbers (gu-injury-overview → trauma-assessment in the initial approach; PFUI → bladder → ureteral → renal → penile → scrotal in the organ-specific group).
- `01-foundations/surgical-principles/index.mdx` — added missing Hyperbaric Oxygen Therapy entry.
- `04-surgical-techniques` — realigned all 13 `_category_.json` positions so the sidebar matches the landing's deliberate clinical narrative (urethral → BNC → bladder → diversion → upper-tract → genital → incontinence → BPH → prolapse → fistula → GAS → male SD → cosmetic). Previously sidebar positions had drifted to a scattered order that disagreed with the landing.

**Treatment Atlas `bestFor` tightening**

The `bestFor` indication column in 379 atlas `GenericDatabase` rows had grown into mini-paragraphs in several sections — citations, n-values, percentages, technique enumerations, and stepwise algorithms had accumulated, with the worst row 594 chars and 57 rows over 200 chars. Rewrote **~137 strings across 15 atlas files** so every atlas row is now ≤ 120 chars. Stripped citation residue, series numbers, percentages, stepwise algorithms, and trial names while preserving the load-bearing clinical scenario / qualifier that distinguishes each row from its siblings. Final stats: max 594 → 120, mean 132 → 84, p90 243 → 105, rows > 120 chars 113+ → 0. Atlas tables now render as a tight scannable index.

Files touched: `04ab-bladder-neck-reconstruction/bnc.mdx`, `04c-urinary-diversion/index.mdx`, `04d-upper-tract-reconstruction/index.mdx`, `04e-genital-reconstruction/penile.mdx` + `scrotal.mdx` + `vulvar.mdx`, `04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx`, `04g-prolapse-repair/index.mdx`, `04h-fistula-repair/all-patients-fistula.mdx` + `female-fistula.mdx` + `male-fistula.mdx`, `04k-gender-affirming-surgery/feminizing-surgery.mdx` + `masculinizing-surgery.mdx` + `non-binary-nullification.mdx`, `04l-cosmetic-genital-surgery/male-cosmetic.mdx`.

---

## Previous Handoff - 2026-05-11 (priapism atlas) — Full rewrite of priapism shunts & decompression page

Comprehensive page-level rewrite of `docs/04-surgical-techniques/04j-sexual-dysfunction/priapism-shunts-decompression.mdx` across **seven commits** pushed to both `claude/kind-wiles-84dcfe` and `main`. Replaced the GenericDatabase with a markdown summary table and expanded every named technique from a one-row stub into a full surgeon-oriented subsection. Reference list grew from 17 → **47**.

Section-by-section changes:

- **Winter / Ebbehoj / T-shunt** — feature tables; Nixon 92%-of-Winter-failures signal; Ebbehoj No. 11 blade vs Winter Tru-Cut framing; **Brant–Lue 9-step T-shunt technique**; outcomes-by-duration table (<24h ~100% → >48h ~30% with 100% necrotic smooth muscle); four T-shunt efficacy series (Brant 92%, Zacharakis 100% if <48h, Ortaç 84.2% ED, Unal/Burnett 92.3% vs 53.6%); converted database to 10-row markdown table.
- **Al-Ghorab** — 1973 origin; "largest tunical window, direct vision, lowest reoperation rate"; step-by-step including Shiraishi–Matsuyama blunt-cavernosotomy salvage (Pean forceps for 5–7 day priapism); four-shunt comparison table; five efficacy series.
- **Burnett Snake maneuver** — full Burnett–Pierorazio 9-step technique; shunt-compatibility matrix (Winter / Ebbehoj incompatible, T-shunt / Al-Ghorab compatible); five-row efficacy table culminating in the Unal/Burnett 2024 comparative (92.3% vs 53.6%; recurrence 4.2% vs 26.6%); complication profile; Shiraishi–Matsuyama salvage callout.
- **Penoscrotal Decompression (PSD)** — rationale vs immediate MPP (Fuchs: 37.5% revision / 50% distal extrusion / 25% impending lateral extrusion); Fuchs penoscrotal vs Basile proximal-shaft modification; four-row evidence table (Fuchs 100% / 0% revision; Baumgarten **0% bilateral recurrence**; Basile 96% detumescence / 69% success / 86% satisfactory EF; VanDyke surgeon survey 47.3% vs 18.7%); four-way comparison table; prosthesis-preservation framing.
- **Quackels** — 1964 origin; lithotomy + perineal corporospongiosal-anastomosis step-by-step; Quackels-vs-Grayhack head-to-head; five efficacy series (Cosgrove 1974 → EAU 2024); Quackels-specific complications anchored to **Manjunath 2015** (combined urethrocutaneous + urethrocavernous fistula → suprapubic diversion), **Robbins 1984** (late urethrocavernous fistula), and **Kulmala 1995** (19.2% permanent open shunt; **100% impotence reversal on shunt closure**).
- **Grayhack** — 1964 cavernovenous concept; saphenous-graft step-by-step; eight-row efficacy table (Cosgrove → Resnick pediatric → Moloney with 3-mo-graft-ligation rule → Richard 87.5%/62.5% → Nixon → Kulmala 19.2% → Zheng → EAU 2024 abandonment); Grayhack-vs-Quackels head-to-head emphasizing higher persistent-shunt and PE risk vs lower urethral-injury risk; modern cavernovenous variants — Barry 1976, **Chiou 2009** (DDV + saphenous graft; 100% / 69% in n=16 with 10 prior failed shunts), Kilinc 2009 (temporary cephalic-vein bedside).
- **Barry / Caverno-Dorsal Vein** — full subsection; penile venous-anatomy primer; original 1976 Barry technique; four modifications (**Micoogullari 2021 planned 2-mo closure** with adrenaline-irrigation × 5 protocol; Chiou 2009 DDV+SVG hybrid; Kilinc 2009 temporary cephalic; Soydaş 2025 algorithm); four-row efficacy table; complication framing anchored to Kulmala permanent-open-shunt physiology and the Micoogullari planned-closure solution; nuanced positioning that recognizes Barry data **exceed pooled proximal-shunt outcomes** while acknowledging absence from AUA/SMSNA 2022 and EAU 2024 recommendations.
- **Early Malleable Penile Prosthesis (renamed from "Early Penile Prosthesis Transition")** — pathophysiological rationale with the 48-h irreversibility threshold; **MRI-guided patient selection** (Ralph 2010 100% sensitivity; ISSM <40% utilization gap); guideline positioning (EAU 2024 / AUA-SMSNA 2022 / Pang 2025 / Calopedos 2025); malleable-vs-IPP table; step-by-step including **Salem sling-suture distal-erosion prophylaxis** (0% erosion in 11/12 prior-failed-shunt patients); seven-row evidence table — Ralph 2009 UCLH landmark (100% / 96% / **0% shortening**), Zacharakis 2014 early-vs-delayed (96% vs 60%; **80% of delayed required second corporotomy + downsized cylinders**), Barham 2023 multicenter IPP (**0% early vs 40.5% delayed**), Tausch 2015 cost ($83,818 preop), Salem 2010, Dighero 2025 long-term QoL (100% no-regret), Butaney 2019 ISSM survey (70.9% more comfortable with MPP than shunt, yet ~80% still favor shunts first-line — practice gap); elective **MPP → IPP exchange** at 6–12 mo; Clavijo 2017 IPP-into-fibrotic-corpora tips; SCD and prior-failed-shunt special populations; algorithmic biases table.

References extended through ref 47 across the seven commits — added Mireku-Boateng 2001, Ortaç 2019, Shiraishi-Matsuyama 2013, Schifano 2025, Quackels 1964, Cosgrove-LaRocque 1974, Tabibi 2010, Zheng 2013, Manjunath 2015, Robbins 1984, Kulmala 1995, Grayhack 1964, Resnick-Grayhack 1975, Moloney 1975, Richard 1979, Barry 1976, Chiou 2009, Kilinc 2009, Calopedos 2025, Ralph 2009, Zacharakis 2014, Ralph 2010 MRI, Butaney 2019 ISSM, Tausch 2015, Salem 2010, Barham 2023, Dighero 2025, Clavijo 2017, Cocci 2025 PPI complications SR, von Stempel 2024 imaging review.

Verification: `npm run lint:links`, `npm run lint:citations`, `npm run build` all pass. Seven content commits + one docs commit pushed to both `claude/kind-wiles-84dcfe` and `main` as fast-forward.

Follow-up navigation fix (commit `c70f97c`) — converted bare procedure names to anchor links in two places after a "techniques are not clickable" report: (1) all 10 rows of the Procedure Summary Table at the bottom of the priapism atlas page now link to on-page anchors (Winter, Ebbehoj, T-Shunt, Al-Ghorab, Snake, PSD, Quackels, Grayhack, Barry, Early MPP); (2) the shunt tables on the emergency-condition priapism page in `05a-trauma-emergencies/priapism.mdx` now cross-link each row to the corresponding atlas anchor, and a missing Barry-shunt bullet was added to the proximal-shunt list.

## Previous Handoff - 2026-05-11 (LS surgical ladder) — Regenerative VLS / GSM expansion + four new LS / FGM/C atlas pages + DB audit

Comprehensive LS-surgical-ladder build-out (four new dedicated atlas pages spanning the conservative → maximal spectrum), a thorough regenerative VLS + GSM expansion of the existing microfat/nanofat grafting page, a new FGM/C clinical-condition page, vulvar-DB audit + cleanup, and 10 commits pushed to `main`. Build clean across **1,010 files**.

Highlights:

- **Microfat / nanofat grafting page (04l)** — three substantial expansions:
  - **VLS section**: three-pillar ADSC mechanism table (anti-fibrotic / immunomodulatory / pro-angiogenic) anchored to Lichen-SVF histologic p-values; full evidence table across 5 series ~166 patients (Boero 2015 n = 36, Tedesco 2020 RCT, Gutierrez-Ontalvilla 2022 RCT, Casabona 2023 n = 72, Lichen-SVF 2025); comparison table vs PRP monotherapy / Nd:YAG-Er:YAG laser / perineoplasty / aOAP flap; positioning subsection noting ACOG 2020 / German S3 2026 keep TCS first-line and frame fat grafting as complementary, not curative.
  - **PRP + fat-grafting synergy subsection**: ≥ 4× VEGF amplification when MSCs co-cultured with PRP; platelet → ADSC mitochondrial transfer for ROS reduction in inflamed VLS bed; i-PRF direct fibroreduction via TGF-β / SMAD3 inhibition; Tedesco early-stage therapeutic window.
  - **GSM section**: comparison table vs vaginal estrogen / DHEA / ospemifene / CO₂ laser anchored to the **2025 AUA / SUFU / AUGS guideline** (low-dose vaginal estrogen first-choice); the postmenopausal **estrogen paradox** (low E2 favors retention 79% vs 35% in OVX mice, but postmenopausal ASCs are transcriptomically distinct with ~2,299 DEGs and altered immunoregulation); GSM in **breast cancer survivors** with the 2024 *Lancet* / NCCN Survivorship framing and Chen 2025 PRP-BCS pilot as proof of concept; **FDA regulatory positioning** of microfat / MFAT (minimally manipulated) vs enzymatic SVF (351 HCT/P) vs mechanical SVF / nanofat (gray area). References extended through ref 48.

- **New FGM/C clinical condition page (03g)** — [Female Genital Mutilation / Cutting (FGM/C)](docs/03-clinical-conditions/03g-genital-scrotal/female-genital-mutilation-cutting.mdx) at sidebar 1.7. WHO classification with the anatomic note that the clitoral body and crura are preserved beneath the scar (substrate for Foldès); epidemiology (pooled 36.9% prevalence; Somalia 99.2%; > 500k US women / girls at risk); complications table organized by reconstructive-urology / urogyn relevance (urethral stricture / meatal obstruction, introital stenosis, hematocolpos, dyspareunia OR 2.47, obstructed labor OR 2.04, PTSD ~ 55%); AAP 2020 framework + defibulation timing / anesthesia; legal framework with the 2020 STOP FGM Act re-criminalization correcting the post-*Nagarwala* status; 2025 WHO integrated-systems framing. Cross-linked to the existing Foldès / aOAP / Mañero / fat-grafting atlas pages.

- **LS surgical ladder — four new / expanded atlas pages**:
  - **[Perineoplasty + De-Adhesion](docs/04-surgical-techniques/04e-genital-reconstruction/perineoplasty-de-adhesion.mdx)** (new) — seven depth-organized component subsections from simplest to most complex: Fenton's median perineotomy (Heineke-Mikulicz analogue); CO₂ laser adhesiolysis with **Breech 2000 Surgicel re-adhesion prophylaxis** in adolescents; **posterior vestibuloplasty with vaginal mucosal advancement** as the workhorse (Rouzier 90% / Lauber 90% satisfaction); clitoral de-hooding with dorsal-nerve caution; investigational anterior vestibuloplasty with free full-thickness vaginal mucosal graft (Burger); local skin-flap advancement (cross-link to dedicated page); aOAP cross-link. New "Choosing the appropriate technique" decision table mapping eight clinical scenarios to recommended technique.
  - **[aOAP Flap](docs/04-surgical-techniques/04e-genital-reconstruction/aoap-flap.mdx)** (expanded) — replaced the brief LSA stub with patient-selection criteria; three-component operative steps explicitly distinguishing skinning vulvectomy (epidermis + superficial dermis only) from simple or radical vulvectomy; outcomes table for O'Dey n = 61 (87% bilateral aOAP, p < 0.001 at 1 yr); LS-specific complication framing (TCS-induced tissue fragility; 180-patient combined denominator with 1 total flap loss and 21–33% minor wound complication ceiling); durability caveat (50% historical LS-vulvectomy recurrence; Rangatchew 38% severe relapse at 8.4 yr); new perioperative-management and **skinning vulvectomy — historical context** sections (VIN origin, STSG era, O'Dey innovation replacing graft with vascularized fasciocutaneous flap). References extended through ref 13.
  - **[Local Skin Flaps for LS Sequelae (Long-Term Outcomes)](docs/04-surgical-techniques/04e-genital-reconstruction/local-flaps-ls-sequelae.mdx)** (new) — anchored on **Rangatchew 2017 mean 8.4 yr follow-up** (the only decade-scale LS surgical series; 88% any relapse but 50% minor / 38% severe / 12% no-relapse stratification; 75% benefit / 74% satisfied at 8 yr) and **Brauer 2016 qualitative-couple study** (68% decreased sexual pain; 4 of 5 non-improvers had partner-communication failure → supports preoperative sexological couple-based consultation). LS-specific psychosexual-burden context (Jabłonowska, Sadownik). Flap-menu breakdown: sliding designs (Y-V, V-Y workhorse, pubolabial V-Y amplified) for the contracture-dominant LS deformity, pivoting designs (rhomboid, lotus-petal, gluteal-fold) for tissue deficit. Complication-profile table (Reid, Burke, Kwong, Commenge). Comparison across the full LS surgical ladder showing the time-dependent erosion of benefit Rangatchew uniquely captures. Six counseling points including indefinite topical clobetasol (0% vs 4.7% SCC in adherent vs non-adherent cohorts).
  - **[Defibulation (Type III FGM/C)](docs/04-surgical-techniques/04e-genital-reconstruction/defibulation.mdx)** (new) — historical context (traditional non-surgical opening by husband / birth attendant replaced by medicalized defibulation). Indications (universal AAP 2020 for all Type III; menstrual obstruction / hematocolpos; painful neuromas; dyspareunia; recurrent UTI; pregnancy; gynecologic-exam access). Tiered timing table including first-stage-of-labor and at-crowning rows for late presenters plus the survivor-vs-clinician preference asymmetry (Jones FGM Sister qualitative). Anesthesia by patient population (young children GA in all cases; non-pregnant regional or GA; pregnant spinal preferred) with AAP-vs-WHO local-anesthesia divergence (flashback risk). Outcomes with full 95% CIs (Okusanya 2026 meta n = 3,166: emergency CD OR 0.16 [0.06–0.42], lacerations OR 0.48 [0.29–0.79]). Berg 2017 SR 50–100% satisfaction. **Re-infibulation prohibition** subsection. Counseling / psychosocial section covering Johansen's qualitative work on male-perceived virility / pleasure as a deterrent to medicalized defibulation.

- **Vulvar DB audit** — slug-and-content audit of the [Vulvar Reconstruction database](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar.mdx) found four issues, all corrected:
  - **Merged** the two LS fat-grafting rows ("Autologous Fat Grafting for VLS" + "Combined PRP + Fat Grafting for VLS") into a single concise row **"Fat Grafting (± PRP / SVF) for Vulvar LS"** with concrete evidence (~166 patients across 5 series; histologic ↓ hyalinization / ↓ CD3+ T-cells / ↑ microvascular density).
  - **Added** new Defibulation row under FGM/C Reconstruction pointing to the new defibulation page.
  - **Repointed** all three regenerative fat-grafting slugs from the catch-all `genital-reconstruction-principles` / PRP pharmacology slugs to the canonical `microfat-nanofat-grafting` page.
  - **Tightened** the VLS and GSM `bestFor` strings to concrete evidence (Menkes / Casarotti 36-mo durability, AUA 2025 guideline positioning for GSM; 166-patient denominator for VLS).
  - Three LS-surgical DB rows (Perineoplasty / De-Adhesion, Skinning Vulvectomy + aOAP, Local Skin Flaps for LS Sequelae) repointed from the principles page to their new dedicated pages.

All 38 vulvar-DB anchors verified against the live rendered HTML (the IGAP / gluteal-fold Part 2 / Part 3 anchors with double-hyphens were the suspected breakage; both match exactly).

Full session detail in `CHANGELOG.md`. Verification: `npm run lint:links`, `npm run lint:citations`, `npm run typecheck`, `npm run build` all pass across 1,010 files. **10 commits** pushed to `main` as fast-forward.

## Previous Handoff - 2026-05-11 (later) — Lymphedema named-technique atlas + vulvar-recon consolidation + new foundations flap pages

Six lymphedema named-technique atlas pages (3R/SCIP-LFT, CHASCIP, Abdelfattah, LYST, SAPL, BLOOM), vulvar-reconstruction overhaul under the hybrid "foundations is canonical, atlas only for region-specific named techniques" policy (10 redundant atlas pages collapsed back to foundations), four new foundations flap pages (IPAP / TFL / DIEP / TRAM), four FGM/C-specific atlas pages, misrouting audit fixes. 31 commits across 1,006 files. Full detail in `CHANGELOG.md`.

## Previous Handoff - 2026-05-11 — 04e scrotal-reconstruction + genital-lymphedema overhaul

Comprehensive scrotal-reconstruction atlas build-out (12 new 04e pages + 4 new 04l pages), scrotal-DB restructuring (new Lymphedema Surgery domain with 10 rows), broadening of the lymphedema clinical-conditions section from scrotal to genital scope, expansion of five foundations flap pages (EPAP / Posterior Thigh / IGAP-Gluteal-Fold / MCFAP / Island Groin), and a new GUVCA atlas mirrored across both treatment databases. 28 commits across 988 files. Full detail in `CHANGELOG.md`.

Older handoffs (2026-05-10 penile-reconstruction + best-for, 2026-05-09 fistula-atlas + HBOT, 2026-05-09 style cleanup, 2026-05-09 later, 2026-05-09, 2026-05-08, and earlier) are archived in `CHANGELOG.md` to keep this file compact.

<!-- Older detailed handoffs preserved in CHANGELOG.md; uncomment if needed for quick reference -->

<!-- ## Previous Handoff - 2026-05-09

Long fistula / catheterizable-channel / upper-tract / robotics build-out session. All work pushed to `main`. Build clean across ~915 files.

Highlights of this session:

- **Resources cleanup** — drop filler intros from resources index, podcasts, patient resources, textbooks, websites, hidden curriculum (deleted RVU-anecdote / "no MBA" / "If you can't quote your numbers, you can't lead" lines). Reorder websites so Professional Societies appears first. Textbooks: every card is a clickable link to a Google search surfacing the Springer / PDF source. Site-wide eradication of `:::tip / :::note / :::warning / :::info / :::caution` admonitions across **123 files** (titles preserved as bolded inline lead). Billing & Coding restructured into Tabs (CPT / ICD-10 / Modifiers / External Resources) with ~120 new codes covering upper-tract reconstruction, bladder reconstruction & diversion, BNC/VUAS, vaginal recon & GAS, hypospadias / penile recon, BPH, mesh / IPP / congenital / gender-incongruence / trauma / rUTI codes.
- **Female cosmetic database** → static markdown table with a "Best for / indication" column. **Podcasts** "Contributing" section deleted.
- **04b bladder reconstruction — full catheterizable-channel build-out**:
  [Yang-Monti Channel](docs/04-surgical-techniques/04b-bladder-reconstruction/yang-monti.mdx) (incl. Double Monti, Casale spiral, Tapered, sigmoid/gastric variants),
  [Tubularized Bladder Flap](docs/04-surgical-techniques/04b-bladder-reconstruction/tubularized-bladder-flap.mdx),
  [Hemi-Kock Continent Stoma](docs/04-surgical-techniques/04b-bladder-reconstruction/hemi-kock.mdx),
  [Indiana Augmentation Cystoplasty (IAC)](docs/04-surgical-techniques/04b-bladder-reconstruction/indiana-augmentation-cystoplasty.mdx),
  [Cutaneous Vesicostomy (Blocksom / Lapides + Benchekroun history)](docs/04-surgical-techniques/04b-bladder-reconstruction/cutaneous-vesicostomy.mdx).
- **04c urinary diversion** — new [Parastomal Hernia After Urinary Diversion](docs/04-surgical-techniques/04c-urinary-diversion/parastomal-hernia.mdx) (canonical home; cross-linked from 04b CCC principles section 9). 04c diversion DB gained a "Best for / indication" column.
- **04d upper-tract reconstruction — major build-out**:
  [Balloon Dilation](docs/04-surgical-techniques/04d-upper-tract-reconstruction/balloon-dilation.mdx),
  [Yang-Monti Ileal Ureter](docs/04-surgical-techniques/04d-upper-tract-reconstruction/yang-monti-ileal-ureter.mdx),
  [Reconfigured Colon Ureteral Substitute](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reconfigured-colon.mdx),
  [Pyelovesicostomy](docs/04-surgical-techniques/04d-upper-tract-reconstruction/pyelovesicostomy.mdx),
  [Simple (Benign) Nephrectomy](docs/04-surgical-techniques/04d-upper-tract-reconstruction/simple-nephrectomy.mdx),
  [Transvaginal Ureteral Reimplantation (single-port robotic vNOTES)](docs/04-surgical-techniques/04d-upper-tract-reconstruction/transvaginal-ureteral-reimplant.mdx).
  Existing UAS revision page un-hidden and expanded with hybrid Bricker/Wallace, Allium stent, and ICG-prevention discordance data; cross-linked from 04c diversion principles.
  Database `notes` column → `bestFor`. Deleted Lingual Mucosal Graft and solo Psoas Hitch rows.
- **Foundations / robotics** — new [vNOTES & Robotic vNOTES](docs/01-foundations/tools/technology/robotics/vnotes.mdx) page covering platforms, technique, indications, ACOG/RCOG guidance.
- **04h fistula repair — full VVF atlas build-out** (all renamed and repointed from clinical-conditions slug to dedicated atlas pages):
  [Conservative VVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/conservative-vvf-management.mdx) (replaces the old "Foley Catheter Drainage" row),
  [Endoscopic VVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/endoscopic-vvf-repair.mdx) (cystoscopic Bugbee, Ho:YAG laser, tissue adhesives, NOTES, transvesicoscopic, V-NOTES, lap/robotic/LESS),
  [Transvaginal Latzko Repair](docs/04-surgical-techniques/04h-fistula-repair/female/transvaginal-latzko.mdx),
  [Transvaginal Sims-Simon Multilayered Closure](docs/04-surgical-techniques/04h-fistula-repair/female/transvaginal-sims-simon.mdx),
  [Martius Flap for VVF](docs/04-surgical-techniques/04h-fistula-repair/female/martius-flap-vvf.mdx),
  [O'Conor (Transabdominal Transvesical) VVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/oconor-vvf-repair.mdx),
  [Extravesical Transabdominal VVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/extravesical-vvf-repair.mdx),
  [Robotic VVF Repair (platform overview)](docs/04-surgical-techniques/04h-fistula-repair/female/robotic-vvf-repair.mdx),
  and the unifying [Vaginal Fistula — Interposition Flap Options](docs/04-surgical-techniques/04h-fistula-repair/vaginal-fistula-flaps.mdx) catalog. Now also covers a dedicated **Native Vaginal-Wall Flaps** section (Shoukry rectangular reinforcement, Wang lateral transfer, Tang annular single-layer, Sayegh vaginal-cuff for robotic, Latzko-as-vaginal-flap), the **Labia Majora Fasciocutaneous flap** (vaginal-wall-deficit cases), the **Full-Thickness Martius graft with skin paddle** (large obstetric fistulae), and a full **Vaginal Advancement Flap (VAF) for RVF** section (VAF vs RAF — Ruffolo SR Crohn's data; Nosti +pedicled-flap zero-failure result; Li 2025 RAF; ASCRS 2022 guidance). Plus omental / rainbow peritoneal / sigmoid epiploicae / gracilis / VRAM / Singapore / TachoSil / SIS / PRP / amniotic / buccal. Female-fistula DB rows repointed; intro repair-strategy table cross-links updated.

Verification: `npm run lint:links` passes; `npm run typecheck` passes; `npm run build` passes.

Previous Heavy 04ab BNC/VUAS + 04b bladder-reconstruction build-out highlights are archived in `CHANGELOG.md`; keep this file as the compact working handbook.

## Previous Handoff - 2026-05-08

Heavy 04ab BNC/VUAS consolidation + 04b bladder-reconstruction build-out session. All work pushed to `main` via `git push origin HEAD:main`. Build clean across ~890+ files.

Highlights of this session:

- **04ab BNC/VUAS database consolidation** — collapsed redundant rows: holmium / cold-knife / DVIU into one TUIBNC row; deleted DVIU+MMC and DCB rows (DCB now under balloon dilation); deleted RBNR, Extraperitoneal Robotic, and Robotic Transperineal Urethral Advancement (subsumed by Primary Re-Anastomosis and Combined Abdominoperineal). Removed Young-Dees-Leadbetter, Kropp, and Pippi-Salle outlet procedures and their pages. Both DBs use `bestFor` column (header "Best for / indication") — short indication strings instead of long-form notes.
- **New 04ab atlas pages** — [TUITMR](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transurethral-incision-transverse-mucosal-realignment.mdx), [Y-V Plasty (Robotic + Open)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/yv-plasty.mdx), [T-Plasty](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/t-plasty-bnc.mdx), [Subtrigonal Inlay (BMG family)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/subtrigonal-inlay.mdx), [Tanagho Flap](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/tanagho-flap.mdx), [Transvesical Approaches](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transvesical-approaches.mdx) (RTV-BNR + TvRARP), [Primary Re-Anastomosis](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/primary-reanastomosis.mdx), [Combined Abdominoperineal / Pull-Through](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/combined-abdominoperineal.mdx), [Robotic Bladder Flap Posterior Urethroplasty](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/robotic-bladder-flap-urethroplasty.mdx), [Salvage Prostatectomy (reconstructive)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/outlet-continence/salvage-prostatectomy.mdx) — moved from VUAS to BNC, [BMG Endourethroplasty](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/endourethroplasty.mdx), focused [Dorsal Onlay BMG for VUAS/BNC](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/dorsal-bmg-bnc.mdx) (Shahrour technique only; 2 operative videos).
- **VUAS Lee 2025 algorithm** — caliber + EUS-involvement decision tree (Naser-Tavakolian & Lee, *Transl Androl Urol* 2025;14(8):2405–2418, doi:[10.21037/tau-24-503](https://doi.org/10.21037/tau-24-503)) keys non-transecting flap (≥10 Fr no EUS), excision + primary anastomosis vs anterior bladder flap (\<10 Fr no EUS), or urethral pull-through (any caliber past EUS).
- **04b bladder-reconstruction build-out** — eight new dedicated atlas pages with full content + database slugs updated:
  [Ileocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ileocystoplasty.mdx),
  [Ileocecocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ileocecal-cystoplasty.mdx),
  [Sigmoid Cystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/sigmoid-cystoplasty.mdx),
  [Autoaugmentation](docs/04-surgical-techniques/04b-bladder-reconstruction/autoaugmentation.mdx),
  [Ureterocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ureterocystoplasty.mdx),
  [Gastrocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/gastrocystoplasty.mdx),
  [SCLU](docs/04-surgical-techniques/04b-bladder-reconstruction/seromuscular-colocystoplasty.mdx),
  [Ileovesicostomy](docs/04-surgical-techniques/04b-bladder-reconstruction/ileovesicostomy.mdx),
  [Appendicovesicostomy / Mitrofanoff](docs/04-surgical-techniques/04b-bladder-reconstruction/appendicovesicostomy.mdx).
- **04c urinary diversion** — new [Simple Cystectomy (Benign Disease)](docs/04-surgical-techniques/04c-urinary-diversion/simple-cystectomy.mdx) page added to the Complex / Salvage family.
- **04b** — new [Supratrigonal Cystectomy + Augmentation](docs/04-surgical-techniques/04b-bladder-reconstruction/supratrigonal-cystectomy.mdx) page; both linked from the IC/BPS clinical page.
- **Cross-database link audit** — added slugs to duplicate rows referring to suprapubic catheter, balloon dilation, indwelling catheter, Foley/Coudé/Council/Penrose so all duplicate rows now point at their dedicated pages.
- **Instruments** — new [Ski / J-Hook Needle](docs/01-foundations/tools/instruments/urethral-specialty/ski-needle-j-hook.mdx) page (operative video at 3:07); cross-linked from the [Dorsal Onlay BMG](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/dorsal-bmg-bnc.mdx) technique step.
- **Peyronie's-at-implant** — added the **Balzano** *Can J Urol* 2022 curvature-direction algorithm and the **Brock 2006** intracorporeal-incision lineage to the [IPP-with-adjunctive-straightening](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/prosthesis-with-straightening.mdx) page; expanded TEP detail.

Verification: `npm run lint:links` passes; `npm run typecheck` passes; `npm run build` passes.

Previous prolapse-atlas, GAS phalloplasty, and older session history are archived in `CHANGELOG.md`; keep this file as the compact working handbook. -->

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

Last compacted: 2026-05-11.
