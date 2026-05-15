# WARWIKI Changelog

Running log of substantive content and platform changes. Extracted from session notes in CLAUDE.md on 2026-04-21 so that CLAUDE.md can remain pure rules and conventions.

For commit-level detail run `git log --oneline`.

---

## 2026-05-15 — Full instruments-section rewrite

Comprehensive evidence-based expansion of the entire `01-foundations/tools/instruments/` directory. **43 commits across ~55 instrument pages** plus the landing-page database. Lints clean throughout (~1,095 files). All fast-forwarded to `main`.

### Tissue forceps (8 pages)

- [Adson](docs/01-foundations/tools/instruments/forceps/adson.mdx) — 4 variants (1×2 toothed / smooth-serrated / Adson-Brown 7×7 / double-ended); toothed-vs-smooth trade-off.
- [Olsen-Hegar](docs/01-foundations/tools/instruments/needle-holders/olsen-hegar.mdx) — combination needle holder + scissor.
- [Singley](docs/01-foundations/tools/instruments/forceps/singley.mdx) — **corrected** the prior "long angled tips with serrations" framing; defining feature is the fenestrated oval tip on a spring-action thumb forceps.
- [Wangensteen](docs/01-foundations/tools/instruments/forceps/wangensteen.mdx) — **corrected** the prior "long fine-tipped" framing; defining feature is the 3×3 interlocking-tooth pattern.
- [Iris](docs/01-foundations/tools/instruments/forceps/iris.mdx) — ~ 10 cm fine thumb forceps; iris-vs-Adson distinction; hypospadias / glansplasty / labiaplasty default.
- [Lahey](docs/01-foundations/tools/instruments/forceps/lahey.mdx) — 2×2 / 3×3 interlocking-tooth traction-grasping forceps; Frank Lahey RLN historical context.
- [Ring (Sponge / Foerster / Rampley) Forceps](docs/01-foundations/tools/instruments/forceps/ring-forceps.mdx) — ring-jaw ratcheted forceps; prep, packing, sponge-stick dissection, Kittner handle, atraumatic cervical grasp.
- [Kittner (Peanut) Dissector](docs/01-foundations/tools/instruments/forceps/kittner.mdx) — peanut sponge for atraumatic plane development.

### Needle holders (2 pages)

- [Olsen-Hegar](docs/01-foundations/tools/instruments/needle-holders/olsen-hegar.mdx) (above).
- [Mayo-Hegar](docs/01-foundations/tools/instruments/needle-holders/mayo-hegar.mdx) — workhorse ring-handled ratcheted needle holder. Seki 1988 Grip-1-vs-Grip-2 accuracy data (1.4 vs 2.0 mm). **Corrected** historical attribution to Alfred Hegar (not Ernst). Abidin 1990 TC-insert mechanics.

### Clamps (14 pages)

- [Allis](docs/01-foundations/tools/instruments/clamps/allis.mdx) — Andrews 2023 RCT 6.3% vs 55.3% post-removal bleeding vs single-tooth tenaculum.
- [Babcock](docs/01-foundations/tools/instruments/clamps/babcock.mdx), [Kocher](docs/01-foundations/tools/instruments/clamps/kocher.mdx) — atraumatic-vs-traumatic spectrum (Babcock → Allis → Kocher).
- [Kelly](docs/01-foundations/tools/instruments/clamps/kelly.mdx) — distal-half-only serrations; Kellyclasia liver-transection context. Johns Hopkins "Big Four" historical context.
- [Péan](docs/01-foundations/tools/instruments/clamps/pean.mdx) — Péan-vs-Kelly serration-length distinction; Jules-Émile Péan as founder of modern hemostatic surgery + 1893 first shoulder arthroplasty.
- [Crile](docs/01-foundations/tools/instruments/clamps/crile.mdx) — George Washington Crile: radical neck dissection 1905–06, first direct human blood transfusion 1906, anoci-association, G-suit forerunner, Cleveland Clinic principal founder.
- [Halsted Mosquito](docs/01-foundations/tools/instruments/clamps/halsted-mosquito.mdx) — Halsted "Big Four"; radical mastectomy 1894; rubber surgical gloves 1889; Halstedian principles.
- [Jacobson](docs/01-foundations/tools/instruments/clamps/jacobson.mdx) — Julius H. Jacobson II as father of microsurgery (first to apply the operating microscope to vascular surgery).
- [Schnidt (Tonsil)](docs/01-foundations/tools/instruments/clamps/schnidt.mdx) — long curved deep-pelvic hemostat.
- [Rochester-Péan](docs/01-foundations/tools/instruments/clamps/rochester-pean.mdx) — long Mayo-Clinic-refined Péan variant.
- [Mixter (Right Angle)](docs/01-foundations/tools/instruments/clamps/mixter.mdx) — Broglia 1994 modification engineered for radical retropubic prostatectomy + cystectomy DVC encirclement.
- [Gemini](docs/01-foundations/tools/instruments/clamps/gemini.mdx) — ultra-fine right-angle. Eponym note: catalog designation, not surgeon eponym.
- [Heaney clamp](docs/01-foundations/tools/instruments/clamps/heaney.mdx) — stepwise Heaney vaginal-hysterectomy technique; ACOG 2017 vaginal-hysterectomy-as-preferred guidance; Pergialiotis 2014 / Jeppson 2017 vessel-sealer-vs-clamp meta-analysis.
- [Masterson](docs/01-foundations/tools/instruments/clamps/masterson.mdx) — straight long-jawed abdominal-hysterectomy counterpart to the Heaney. Samaan 2014 ureter "water under the bridge" anatomy.

### Scissors — new subdirectory `scissors/` (8 pages)

- [Mayo](docs/01-foundations/tools/instruments/scissors/mayo.mdx), [Metzenbaum](docs/01-foundations/tools/instruments/scissors/metzenbaum.mdx) — Pepper 2026 Anglo-American common-core data; role-segregation principle (straight Mayo for non-tissue, curved Mayo for tissue, Metzenbaum for fine planes).
- [Potts](docs/01-foundations/tools/instruments/scissors/potts.mdx) — angled 25 / 45 / 60° for vessel / ureter / urethra spatulation.
- [Iris Scissors](docs/01-foundations/tools/instruments/scissors/iris.mdx) — paired with iris forceps for the fine-skin tray.
- [Tenotomy](docs/01-foundations/tools/instruments/scissors/tenotomy.mdx) (Stevens / Westcott / Castroviejo).
- [Jorgensen](docs/01-foundations/tools/instruments/scissors/jorgensen.mdx) — heavy long curved blunt-tip scissor at the high-force end (Metzenbaum → Mayo → Jorgensen).
- [Scalpel Handles](docs/01-foundations/tools/instruments/scissors/scalpel-handles.mdx) — handle numbering (#3 / #3L / #4 / #4L / #7 / #9), pencil-vs-palmar grip, Bard-Parker historical context. Watt 2010 / DeGirolamo 2013 sharps-injury data. 12 refs.
- [Scalpel Blades](docs/01-foundations/tools/instruments/scissors/scalpel-blades.mdx) — blade numbering (#10 / #11 / #15 / #15c / #20). **Awadalla 2016 objective-sharpness data** (force-to-cut in N: razor 0.395 / dermablade 0.46 / plastic #15 0.541 / #15c 0.575 / #10 0.647 / standard #15 0.664). **Cold-steel vs energy-device wound-healing comparison** (Sowa 1985 — epithelial migration POD 1 vs POD 7; Sinha 2003 — re-epithelialization POD 7 vs POD 28; Kakarala 2010 — oncologic margin clarity advantage over monopolar electrosurgery). **Mathilde Schott 1890 patent** (US431153) for the detachable blade — recovered by Elson 2023 *Am Surg* historical paper. 13 refs.

### Cautery (3 pages)

- [Electrosurgical Pencil](docs/01-foundations/tools/instruments/cautery/electrosurgical-pencil.mdx) — full Bovie/Cushing 1926 history; ESU physics; peak-power table (30 W set = 90/228/1154 W cut/blend/coag); FDA 20-yr data (178 deaths / 3,553 injuries); CIED management; capacitive-coupling mitigation; Charoenkwan 2017 Cochrane.
- [Bovie Tips](docs/01-foundations/tools/instruments/cautery/bovie-tip.mdx) — **new page replacing the deleted Colorado Tip**. Consolidates standard blade / needle (Colorado) / extended / ball / loop / bent / laparoscopic-hook. Papay 1998 needle-vs-cold-scalpel alopecia.
- [Gerald Bipolar](docs/01-foundations/tools/instruments/cautery/gerald-bipolar.mdx) — **corrected** the prior "fine-tipped" framing; defining feature is the broad flat 1–2 mm platform tip. Mikami 2004 gold-plated-tip data.
- **Deleted**: `malis-bipolar.mdx` (consolidated into the Gerald Bipolar mirror-finish reference; Malis credited in the historical-context paragraph as the 1960s neurosurgical bipolar pioneer).

### Retractors (22 pages)

- [Adson-Beckman](docs/01-foundations/tools/instruments/retractors/adson-beckman.mdx), [Lone Star](docs/01-foundations/tools/instruments/retractors/lone-star.mdx) — expanded with **Tranchart 2008** cutaneous perianal recurrence at hook sites in J-pouch coloanal anastomosis for rectal cancer, framed for the RU/urogyn surgeon as a tissue-seeding caveat.
- [Sims](docs/01-foundations/tools/instruments/retractors/sims.mdx) — with the **explicit ethics-and-legacy section** acknowledging Sims's technique development on enslaved Black women (Anarcha, Betsey, Lucy) without anesthesia and the 2018 Central Park statue removal.
- [Senn](docs/01-foundations/tools/instruments/retractors/senn.mdx) — Senn-Miller blunt-prong default; Nicholas Senn historical context.
- [Langenbeck](docs/01-foundations/tools/instruments/retractors/langenbeck.mdx) — Bernhard von Langenbeck (Halle chief of surgery, early German Lister-antisepsis adopter, von Langenbeck palatoplasty 1861, Hueter-Volkmann law, "Richard Leander" children's literature).
- [S Retractor](docs/01-foundations/tools/instruments/retractors/s-retractor.mdx) — bridges the Richardson-to-Deaver gap.
- [Deaver](docs/01-foundations/tools/instruments/retractors/deaver.mdx) — Kvist-Poulsen 1982 11.6% femoral neuropathy with deep lateral self-retaining blades.
- [Richardson](docs/01-foundations/tools/instruments/retractors/richardson.mdx) — **corrected** historical attribution to **Maurice Howe Richardson** (MGH; collaborator with Reginald Heber Fitz on early appendectomy), not Edward Peirson Richardson.
- [Army-Navy](docs/01-foundations/tools/instruments/retractors/army-navy.mdx) — non-eponymous (US Army/Navy Medical Corps standardization). Rankin 2014 PLA 3D-printed retractor at ~ $0.46 / unit + 13.6 kg tangential force; Chambers 2020 Air Force Retractor for expeditionary medicine.
- [Volkmann (Rake)](docs/01-foundations/tools/instruments/retractors/volkmann.mdx) — 1–6-prong variants; Volkmann's ischemic contracture 1869 / Hueter-Volkmann law historical context.
- [Malleable (Ribbon)](docs/01-foundations/tools/instruments/retractors/malleable.mdx) — shape-adaptable visceral retractor + shield. **Rodrigues 2006 retained-instrument case** (33 × 5 cm ribbon retained 14 years; copper radiopaque on plain film).
- [Weighted Speculum](docs/01-foundations/tools/instruments/retractors/weighted-speculum.mdx) — **rewritten as the full Auvard Weighted Speculum page**. **Vilos 2003 thermal-burn safety** section (ball > 45 °C for > 30 min after autoclaving; ≥ 1 L saline cools to < 40 °C in 1 min).
- [Skin Hooks](docs/01-foundations/tools/instruments/retractors/skin-hooks.mdx) — Joseph / Guthrie / Gillies / double-prong / Walton / retractable variants. **No-crush mechanism** as the defining advantage over forceps. Clark 2019 (85.1% utilization), Talebi-Liasi 2023 (56.7% past-year sharps-injury rate), LoPiccolo 2012 (no exposures with blunt hooks).
- [Breisky-Navratil](docs/01-foundations/tools/instruments/retractors/breisky.mdx) — **rewritten** with August Breisky + Josef Navratil joint attribution. Vitale 2018 sacrospinous-fixation context.
- [Weitlaner](docs/01-foundations/tools/instruments/retractors/weitlaner.mdx) — hinged scissor-style self-retaining.
- [Balfour](docs/01-foundations/tools/instruments/retractors/balfour.mdx) — Donald Church Balfour 1912 Mayo Clinic three-point retraction.
- [Omni-Tract](docs/01-foundations/tools/instruments/retractors/omni-tract.mdx) — articulating-arm alternative to ring-based Bookwalter. Mehrara 2003 pediatric-Omni for microsurgical recipient-vessel work.
- [Thompson](docs/01-foundations/tools/instruments/retractors/thompson.mdx) — obesity bar + sidebar architecture; independently releasable per-arm joints. Chang 2010 Modified Makuuchi + Thompson.
- [Denis Browne](docs/01-foundations/tools/instruments/retractors/denis-browne.mdx) — Sir Denis Browne (Great Ormond Street; father of modern UK pediatric surgery). Architectural ancestor of the Lone Star / Alexis.
- [Graves Speculum](docs/01-foundations/tools/instruments/retractors/graves.mdx) — bivalve duckbill office workhorse. **Historical attribution corrected** to William P. Graves (Boston gynecologist), not Robert James Graves of Graves' disease (Irish internist; Feliciano 2023). ACOG 2020 size-selection guidance.
- [Bookwalter](docs/01-foundations/tools/instruments/retractors/bookwalter.mdx) — table-fixed self-retaining ring retractor. Noldus 2002 > 4,000-case safety review (4 bowel injuries — all delayed POD 2–7; 1 femoral neuropathy).
- [Perineal Bookwalter](docs/01-foundations/tools/instruments/retractors/perineal-bookwalter.mdx) — **expanded** to a two-modification family page covering both **Jordan** (perineal urethroplasty) and **Brooke** (perineal prostatectomy) blade modifications.
- [Turner-Warwick](docs/01-foundations/tools/instruments/retractors/turner-warwick.mdx) — **corrected** the prior "retropubic" description; this is the self-retaining ring-based **perineal** retractor purpose-built by Richard Turner-Warwick.

**Index cleanup**: deleted **Heiss**, **O'Connor-O'Sullivan**, **Suture Scissors**, and multiple additional-list duplicates (Mosquito-Halsted, Schnidt, Mixter, Sponge-Holding, Kelly, Auvard, Mayo-Hegar) after promoting their primary slugged entries. Replaced **Rumi Uterine Manipulator** and **Koh Colpotomizer** rows with a single consolidated [Uterine Manipulators](docs/01-foundations/tools/instruments/urethral-specialty/uterine-manipulator.mdx) entry.

### Urethral & Pelvic Specialty (3 pages)

- [Crawford Fascial Stripper](docs/01-foundations/tools/instruments/urethral-specialty/crawford-stripper.mdx) — **historical-attribution corrected** from "Edmund Sterling Crawford" (vascular surgeon, different person) to **J. Stewart Crawford** (Canadian oculoplastic surgeon, 1956 frontalis sling). Framed for the urogyn surgeon: autologous fascia-lata pubovaginal sling (PVS) for SUI / ISD / recurrent SUI / mesh-avoidant patients, salvage sling after mesh erosion, fascia-lata interposition for VVF / RVF / RUF, pediatric BNR, urethroplasty buttress, mesh-free sacrocolpopexy. Johnson 2024 + Delu 2024 urogynecologic donor-site data; Bleyen 2009 pediatric outcomes.
- [Stamey Needle](docs/01-foundations/tools/instruments/urethral-specialty/stamey-needle.mdx) — full **Pereyra → Stamey → Raz → Burch → TVT** lineage. Long-term-decline outcomes (Kondo 71.5% at 14 yr; Nigam 28% at 9 yr with all repeat needle ops failing; Clemens 44% at 15 yr). Glazener 2017 Cochrane showing needle suspension inferior to Burch (71% vs 84% cure). Type III ISD as contraindication.
- [Uterine Manipulators](docs/01-foundations/tools/instruments/urethral-specialty/uterine-manipulator.mdx) — general family page (RUMI + Koh / VCare / Hohl / Clermont-Ferrand / Colpo-Probe / myoma screw / Boztosun). Pan 2025 cadaveric ureteral-displacement (1.4 → 6.2 cm). Husslein 2017 RCT (Hohl vs Colpo-Probe). Melnyk 2025 carbon-footprint / cost analysis (reusable saves $16–43k over 300 uses). Endometrial-cancer manipulator-safety debate framed as out-of-scope but mentioned for multidisciplinary awareness.

### Stub-fill resolution

Mid-session, **15 stale uncommitted doc-page edits** from a prior unmerged 2026-05-11 launch-stub-sweep session were salvaged and applied on top of current main (immunosuppression, intestinal-segments, gelman sound, drug-coated-balloon, adjustable-continence-devices, neuromodulation, lotus-petal-flap, ventral-onlay-glanuloplasty, laminated-gracilis-flap, transperineal-reanastomosis, glans-reconstruction, penile-skin-reconstruction, pde5-inhibitors, intracavernosal-injections, muse-intraurethral). Stale CLAUDE.md / CHANGELOG.md / _STATUS.md / stats.json from the same uncommitted set were discarded as superseded. Fixed one `/04h-fistula-repair/both-genders/` → `/all-patients/` broken link to match the 2026-05-12 rename.

### Conventions reinforced for instrument pages

- **House-style structure**: bold-lead one-paragraph summary → Design → RU/urogyn Uses (organized by anatomic / procedural use case) → Comparison table vs adjacent instruments → Technique pearls → Safety profile → Historical Context → cross-links → References.
- **Historical-attribution corrections** when warranted (Crawford, Richardson, Hegar, Graves, Turner-Warwick) — flag the prior index error, give the correct attribution, anchor to a citation.
- **Index promotion pattern**: instrument moves from the "additional" list (no slug) to a primary slugged entry once a dedicated page exists; the additional-list duplicate is removed in the same commit.
- **Scope-framing rule**: instruments that originated in non-RU specialties are framed for WARWIKI scope by leading with the RU/urogyn use cases and noting cross-disciplinary context briefly. Out-of-scope cancer-surgery topics are explicitly framed as such.
- **Subdirectory creation**: new `scissors/` subdirectory created with `_category_.json` at sidebar position 12.

Verification: `npm run lint:citations`, `npm run lint:links` clean across **1,095 files**. 43 commits, all fast-forwarded to `main`.

---

## 2026-05-14 — Database-gap pass: new biomaterials, pharmacology, and instrument pages

Cross-site audit for branded products, agents, and instruments mentioned in clinical articles but missing dedicated entries in the relevant database. Resulted in **6 new substantive pages, 4 MIST-BPH device stubs, 4 forceps / needle-holder expansions, and 1 Tutoplast major-expansion follow-up.** All commits fast-forwarded to `main`. Lints clean throughout (~1,053 files).

### Audit method

Listed inventories in `tools/biomaterials/`, `tools/instruments/`, and `pharmacology/` and grepped `docs/` for branded products (Tutoplast, AlloDerm, FlexHD, ProACT, ATOMS, Argus, Remeex, AdVance, Botox, imiquimod, Optilume, Rezūm, etc.). Cross-referenced against the existing directory contents to find items repeatedly mentioned in procedure / clinical-condition articles but lacking dedicated foundations entries. The user's exemplar — **Tutoplast** — had not been caught by the prior biomaterials-section rewrite.

### New biomaterials pages

- **[Tutoplast-Processed Allografts](docs/01-foundations/tools/biomaterials/biological-grafts/tutoplast-allografts.mdx)** — first created with 19 refs, then **substantially expanded to 39 refs** in a follow-up commit incorporating user-supplied source material. Final coverage spans the Tutoplast process (osmotic / oxidative / alkaline / solvent-dehydration / 17.8–25 kGy gamma; Moore 1997, Vangsness 2006, Grieb 2006); Peyronie's pericardium series (8 series including Levine & Estrada 2003 n = 40, **Taylor & Levine 2008 n = 81 mean 58 mo** — the longest published series, Hellstrom & Reddy 2000, Egydio 2002 / 2008, Hatzichristou 2002, Usta 2004, Pathak 2020); Kovac & Brock 2007 head-to-head table (Tutoplast vs dermal vs SIS — **100% straightening but 23% length / 39% rigidity preservation**); new **Complex Penile-Prosthesis Corporoplasty** section anchored on Palese & Burnett 2001 and Farrell 2019; expanded female-SUI section with direct Suspend-Tutoplast comparators (**McBride 2005**: USI recurrence **41.7% Tutoplast vs 0% autograft, p = 0.007**; **Howden 2006**: 3–4× higher failure / women-year for cadaveric vs autologous); new **Pelvic Organ Prolapse — Sacrocolpopexy** section (Loffeld 2009 Tutoplast vs Prolene RR 2.9 reintervention; Maher 2016 Cochrane; ACOG 2019). Venous-reconstruction cross-link (Coleman 2014 bovine). Comparative summary table; Advantages / Limitations / Current Status sections.
- **[Human Acellular Dermal Matrix](docs/01-foundations/tools/biomaterials/biological-grafts/human-acellular-dermal-matrix.mdx)** — AlloDerm family page (18 refs). Product table (AlloDerm, AlloDerm RTU, FlexHD, Belladerm, Repriza, AlloMax, AxisDermis, Epiflex, DermaMatrix); processing detail; Peyronie's PIG outcomes (Cosentino 2016, Liu 2016, Adamakis Epiflex 2010); IPP-revision and phalloplasty applications; parastomal-hernia data; **cautionary cosmetic-girth data** (Solomon 2013 42% infection / exposure, Xu 2019 60% erectile discomfort).
- **[ProACT Adjustable Balloons](docs/01-foundations/tools/biomaterials/prosthetics/proact-balloons.mdx)** — device-level entry (10 refs). Paired silicone-balloon + titanium scrotal-port construction; **bilateral focal compression at bladder neck** (mechanism distinct from all sling devices that act at the bulbar urethra); postoperative percutaneous titration; iso-osmolar radiocontrast fill; MR-conditional construction; device-level comparison table vs AUS / AdVance / Virtue / ATOMS / Argus / Remeex; **Uromedica → Laborie 2018** regulatory timeline; failure-mode profile (mechanical balloon failure, migration, erosion).
- **[Male Continence Implants — Sling Devices](docs/01-foundations/tools/biomaterials/prosthetics/male-continence-implants.mdx)** — sling-family device page (8 refs). Covers AdVance / AdVance XP, Virtue, ATOMS, Argus, Remeex MRS, legacy InVance / I-STOP TOMS. Component-and-materials breakdown for each; **mechanistic comparison** (compressive vs repositioning, fixed vs postoperatively adjustable); materials-by-class summary (Type 1 polypropylene, silicone elastomer, titanium ports); US regulatory status; shared device-level failure modes.
- **Four MIST BPH device stubs under `adjunct-specialty/`** (3 refs each): **[Rezūm](docs/01-foundations/tools/biomaterials/adjunct-specialty/rezum.mdx)** (Boston Scientific convective water-vapor), **[iTind](docs/01-foundations/tools/biomaterials/adjunct-specialty/itind.mdx)** (Olympus 5–7 day temporary nitinol), **[Aquablation](docs/01-foundations/tools/biomaterials/adjunct-specialty/aquablation.mdx)** (Procept AquaBeam robotic waterjet), **[Optilume BPH](docs/01-foundations/tools/biomaterials/adjunct-specialty/optilume-bph.mdx)** (Laborie paclitaxel DCB, PINNACLE RCT). Each covers components, mechanism, indications, reconstructive-urology relevance, and cross-links to its procedure page and sibling MIST devices.

### New pharmacology pages

- **[Botulinum Toxin](docs/01-foundations/pharmacology/storage-oab/botulinum-toxin.mdx)** — onabotulinumtoxinA (Botox) page (14 refs). SNARE-cleavage mechanism with dual motor and sensory effects; FDA-approved OAB (100 U, Nitti / Chapple) and NDO (200 U, Cruz / Ginsberg); off-label DSD sphincter chemodenervation, primary bladder-neck obstruction, IC/BPS; adverse-effect profile with the **OAB vs NDO retention split (6% vs 30%)**; retreatment / antibody resistance; non-interchangeable formulation comparison (Dysport, Xeomin, Jeuveau, Daxxify, MyoBloc). The previously missing canonical foundations entry for the agent referenced across NLUTD pages, OAB DB, and intradetrusor-botox procedure.
- **[HPV / Condyloma Topical Agents](docs/01-foundations/pharmacology/dermatologic-topical-urethral/hpv-topical-agents.mdx)** — imiquimod, sinecatechins (Veregen EGCG), podophyllotoxin / podophyllin, TCA, off-label topical 5-FU, intralesional interferon (9 refs). Patient-applied vs clinician-applied; CDC 2021 STI guidelines and Cochrane SR efficacy / recurrence; pregnancy-safe agents (TCA, surgical); immunosuppressed-patient regimens; intraurethral / meatal lesion management; **9-valent HPV vaccination** as prevention.

### Forceps and needle-holder expansions

Five existing instrument pages substantially expanded from short stubs into comprehensive entries:

- **[Russian Tissue Forceps](docs/01-foundations/tools/instruments/forceps/russian.mdx)** — corrected the prior "multiple small teeth" framing (concentric **serrations**, not teeth). Comparison table vs DeBakey / Adson / Bonney / Gerald; reconstructive-urology use cases (bladder, ureter, fascial harvest, flap handling, tunica, renal pelvis, suture-edge eversion); historical context. 5 refs (Kirkup 1996 spring-forceps history; Cheng 2016 FEA grasper mechanics; Sachs 1998; Chandler 2017 real-time tissue-trauma; Sakaguchi 2018 force-limiting grasper).
- **[Gerald Tissue Forceps](docs/01-foundations/tools/instruments/forceps/gerald.mdx)** — **new page** (the Gerald entry was missing). Smooth, fine-serrated, and 1×2 toothed variants; **Marucci 2000 instrument-tissue-interface trade-off** as the central framing; Smooth-vs-Toothed selection guide by clinical scenario (vasovasostomy mucosa vs muscularis, tunica albuginea, BMG, dartos, fine genital skin); comparison vs Adson-toothed; reconstructive-urology use across vas / ureter / Peyronie's / IPP / urethroplasty / hypospadias. 8 refs.
- **[Bonney Tissue Forceps](docs/01-foundations/tools/instruments/forceps/bonney.mdx)** — design detail (1×2 teeth, 3–4 mm broad tips, cross-hatched heavy shaft, firm spring); Marucci 2000 grip-trauma trade-off anchored on **Rodrigues 2012** tractive-force data (fascia ~ 11.4 N tolerance vs fallopian tube ~ 1.25 N); explicit Bonney-vs-Adson-toothed distinction; full forceps-family comparison; fascial-closure primary use grounded on the **STITCH small-bites RCT** (13-yr incisional hernia 49% → 34%) and **EHS/AHS 2022** closure guidelines; Wertheim-Bonney historical context; expanded urologic applications (radical nephrectomy / prostatectomy / cystectomy, Gibson incision, Gerota's fascia, pubovaginal-sling fascial harvest); avoid-list. 10 refs.
- **[DeBakey Tissue Forceps](docs/01-foundations/tools/instruments/forceps/debakey.mdx)** — serration-pattern anatomy (2–3 rows of rounded longitudinal ridges with interdigitating central groove); tip-width / length / variant taxonomy (15 / 19 / 24 / 30 cm; standard / broad / extra-fine; titanium variants); friction-vs-penetration mechanism contrast; endothelial-integrity historical rationale (Mansfield 1978, Zeebregts 2003); biomechanical-evidence table (Marucci wave-vs-tooth p &lt; 0.001, Cheng FEA, **Heijnsdijk 2004** contact-area-and-profile optimum at 37 N pinch / 3 N slip, Bos 2013 rounded-edge peak-pressure, Darçin 2004 clamp-injury); MIS-jaw-design adoption; DeBakey instrument-family overview (vascular / Satinsky / needle-holder / Bahnson / Cooley / bulldog clamps). 12 refs.
- **[Ryder Needle Holder](docs/01-foundations/tools/instruments/needle-holders/ryder.mdx)** — smooth-vs-TC-insert jaw variants (**Abidin 1989 / 1990** atraumatic-rounded-edge and metallurgically-bonded evidence); physical dimensions; biomechanics of needle security (Edlich 1990 clamping-moment-and-bending relationship; Abidin 1989 needle-damage on cross-hatched jaws) and suture integrity; side-by-side comparison vs Mayo-Hegar / Crile-Wood / Castroviejo; explicit Ryder-vs-Castroviejo and Ryder-vs-Mayo-Hegar distinctions; expanded urologic uses (ureter, bladder, renal pelvis, urethroplasty, penile, renal transplant, AUS / sling / fistula); training notes with **Seki 1988** grip-technique and **Durand 2022** force-sensing data (experts &lt; 2 N, trainees up to 8 N). 11 refs.
- **[Heaney Needle Driver](docs/01-foundations/tools/instruments/needle-holders/heaney.mdx)** — detailed curved-jaw and TC-insert variant detail; four-point biomechanical rationale for curvature (angle of approach, needle trajectory, wrist ergonomics with **Basager 2024** small-hand musculoskeletal data + **Berguer 1999** ergonomics, visualization); full needle-holder comparison; explicit Heaney-vs-Mayo-Hegar and Heaney-vs-Ryder distinctions; expanded reconstructive-urology uses (open RP urethrovesical anastomosis, radical cystectomy diversion anastomoses, perineal urethroplasty, fistula repair, apical prolapse suspension); gynecologic / colorectal applications with **Pickett 2023 Cochrane** vaginal-hysterectomy preference; Heaney instrument family (clamp, retractor, **pedicle stitch**); variants (Heaney-Ballentine, Stratte, Finochietto, Sarot, Thorlakson); Heaney-stitch technique anchored on **Balgobin 2019** simulation curriculum (pass rates 3.3–46.7%). 11 refs.

### Index updates

- Registered new entries in the biomaterials landing-page database: Tutoplast-Processed Allografts, Human Acellular Dermal Matrix, ProACT Adjustable Balloons, Male Continence Implants (Slings), and the four MIST BPH device stubs.
- Updated the storage-oab and dermatologic-topical-urethral pharmacology indices.
- Added Gerald to the instruments landing-page database; refined the Russian database row description (the prior "star-burst tip" gloss was inaccurate — concentric serrations).
- Corrected the pre-existing "Bovine Dermal Graft / Permacol" row in the biomaterials landing — Permacol is porcine, not bovine; row updated to Peri-Guard / Veritas / Xenform.

### Conventions reinforced

- For named-device biomaterial pages with an existing procedure page (ProACT, ATOMS, Argus, AdVance, Virtue, Remeex, Rezūm, iTind, Aquablation, Optilume BPH): the **device page** covers components, materials, mechanism, device-level comparison, regulatory status, and failure modes, with explicit cross-links to the procedure page for technique / outcomes / clinical positioning. Mirrors the IPP / AUS / PTNS pattern already established.
- When user-supplied source material contains a reference list, **deduplicate against the existing page** before integrating — the Tutoplast follow-up initially had a Hellstrom 2000 entry as both ref 1 and ref 17.
- Renumbering refs after deduplication: do a single complete-rewrite rather than chained sed passes — sequential `N → N-1` replacements cascade when ranges overlap (one earlier attempt collapsed refs 18–40 → 17 across the file).

---

## 2026-05-12 (biomaterials) — Full biomaterials-section rewrite

End-to-end evidence-based rewrite of the entire `docs/01-foundations/tools/biomaterials/` directory. ~40 commits across ~30 device / material pages, all fast-forwarded to `main`. Lints clean (1,042 files). Common rewrite pattern: history → mechanism → design / device-by-device comparison → indication-specific outcomes tables → contraindications → complications → comparative effectiveness → clinical bottom line, with house-style citations and DOI-linked anchors throughout.

### Bulking agents

Every page in `biomaterials/bulking-agents/` substantially expanded:

- **Bulkamid (PAHG)** — 24 refs. FDA 2020, particle-free polyacrylamide hydrogel composition / mechanism, 10/2/5/7-o'clock submucosal injection, Sokol pivotal RCT vs Contigen, Elmelund / Nosal predictors, Lose / Toozs-Hobson / Lamblin / Sze outcomes table, the **Helsinki TVT-vs-PAHG 5-yr NEJM Evidence 2025 RCT** (PAHG did not meet noninferiority for satisfaction — 74.7% vs 92.7% — but had half the complications and 86% subjective cure at 5 yr), head-to-head sling table, Braga 80% post-failed-MUS cure, Myhr Norwegian registry, post-prostatectomy framing inferior to AUS, Ramsay 71% pediatric VUR, AUA/SUFU 2023 96-mo persistence.
- **Macroplastique (PDMS)** — 28 refs. Textured PDMS macroparticles in PVP, foreign-body-encapsulation mechanism, MIS non-endoscopic delivery, 3D EVUS placement predictors (OR 22 for proximal+circumferential), Ghoniem 2009 pivotal RCT vs Contigen (61.5% vs 48% statistical superiority), Ghoniem-Miller meta cure curve, ROSE 5-yr 47.6% / Kusin 2024 7.4-yr 43%, three-way comparison vs Bulkamid, **2.4% urethral exposure signal** at median 48 mo, FDG-PET pitfall, Imamoglu RCT vs AUS for post-prostatectomy SUI, Moore prospective vs Deflux 90% vs 81% pediatric VUR.
- **Coaptite (CaHA)** — 12 refs. 75–125 μm CaHA microspheres in CMC gel, non-immunogenic radiopaque Radiesse-equivalent, Unger 2016 sonographic **40–46% 3-mo volume loss** correlated with efficacy decline, Mayer 2007 pivotal RCT vs Contigen, AUA/SUFU 73.2-mo persistence, three-way comparison headlining the **34–41% transient retention** (highest among bulking agents), erosion / Gafni-Kane granuloma signal, Mevorach pediatric VUR data **inferior** to Macroplastique and Deflux.
- **Durasphere** — 17 refs. Pyrolytic carbon-coated ZrO₂ beads 212–500 μm in beta-glucan (EXP 90–212 μm), historical FDA 1999 as first non-collagen agent, Madjar 4-o'clock + hydrodissection technique, Lightner 2001 pivotal RCT vs Contigen (80.3% vs 69.1%), **Chrouser 2004 defining long-term data showing only 21% effective at 36 mo**, Pannek 2001 documented lymph-node migration despite > 80 μm bead size, Madjar 2006 2.9% periurethral mass formation at 14.7 mo, fecal-incontinence Maeda Cochrane head-to-head vs PTQ silicone (Durasphere significantly worse) with type-III hypersensitivity case, ASCRS 2023 non-recommendation.
- **Urolastic (PDMS-U)** — 12 refs. In-situ-polymerizing PDMS distinct from Macroplastique macroparticles, no-cystoscopy 10/2/4/8 periurethral injection, Capobianco 2018 SR (pooled 57% objective, 20% reinjection), Futyma 2016 24-mo (32.7% objective with **4.5% intravesical material** unique complication, 25.8% complication rate), Casteleijn 2020 with **18% excision rate**, Casteleijn 2023 PDMS-U vs MUS (MUS objective cure 90% vs 63% but PDMS-U cheaper €3,567 vs €6,688), Hoe 2021 SR with erosion **up to 24.6%** (highest of any urethral bulking agent), Casteleijn 2023 learning-curve study finding **physician experience did not improve safety**.
- **Deflux (Dx/HA, NASHA/Dx)** — 35 refs. Dextranomer + NASHA biodegradable composition with the four-phase mechanism (94% giant-cell granuloma, 69% calcification histologically), STING/HIT/Double HIT comparison with Yap meta showing HIT superior (82.5% vs 71.4%) and 92% practice shift to double HIT, resolution-by-grade table (79% I–II to 51% V), major-studies table (Puri 2012 87.1%, Friedmacher 2018 69.5% at 8.5 yr, Moore 2014 81% vs 90% Macroplastique, Lee 2009 true 1-yr 46.1%), the **Swedish Reflux Trial** caveat that resolution does NOT reduce febrile UTIs or renal scarring vs antibiotic prophylaxis, Cochrane 2019 favoring Macroplastique, comprehensive late-complications section (delayed obstruction 1 mo to 8 yr post-injection with **asymptomatic renal function loss** across Papagiannopoulos / Rubenwolf / Pham / Romain / Nseyo / Vandersteen), **Solesta extension for adult fecal incontinence** (52% vs 31% sham response), dedicated "Why This Matters for Reconstructive Urology" section.

### Historical bulking agents (split out)

The single `historical-agents.mdx` hub was split into four dedicated pages, with the hub slimmed to a navigation index:

- **Teflon (PTFE / Polytef)** — 32 refs. Politano 1964 as first urologic bulking agent ever, Puri 1981 STING origin, the critical 3–100 μm particle-size design flaw with phagocytosable fraction &lt; 50 μm, **Malizia 1984 JAMA migration study** with Aaronson / Vandenbossche / Claes / Aragona confirmation, the **Puri-Granata multicenter 12,251-ureter VUR experience** with Chertin 11–17 yr 95% reflux-free, McKinney 9-year-out BOO teflonoma, laryngeal teflonomas. Never FDA-approved for urologic use.
- **Contigen (GAX-collagen)** — 37 refs. First FDA-approved (1993), **gold-standard comparator** in every subsequent pivotal trial until C.R. Bard discontinued 2011, mandatory skin testing with HLA-DR2/DR4 and 28% antibody formation, **dermatomyositis SIR 18.8**, female SUI outcomes including Gorton 26% at &gt; 5 yr and Chrouser 5% at 62 mo (worst long-term durability), the four pivotal head-to-head RCTs (Ghoniem PDMS-superior, Lightner / Mayer equivalent, Sokol Bulkamid non-inferior), Westney 6.3-mo mean response in men.
- **Autologous fat** — 21 refs. Kato three-zone fat-graft remodeling, **Lee 2001 RCT showing 22.2% fat vs 20.7% saline (no benefit) with a fatal pulmonary fat embolism** — the only treatment-related death in any bulking-agent RCT, JAMA scientific review NNH 5, periurethral venous-plexus embolism mechanism, Palma 1994 VUR only 1/17 ureters corrected, 17–49% resorption range. Cochrane 2017: autologous fat should not be used as a bulking agent. Contrasting laryngology success story preserved. Adjacent ADRC / SVF regenerative programs (ADRESU 37.2%, Gotoh 69-mo, Maene SVF + PRF pilot).
- **Autologous chondrocytes** — 13 refs. Atala / Diamond tissue-engineered cartilage program: 1993 preclinical 94% cartilage in mice, 1994 mini-pig VUR, **Diamond-Caldamone 1999 clinical VUR 83% → Caldamone-Diamond 2001 long-term 65% at 1 yr** with mound volume loss / shifting on cystoscopy, Bent 2001 only-clinical-SUI study 50% dry with single injection but no control arm, Paltiel sonographic 34% mound volume loss, **Gargollo 2009 long-term 37% mound calcification at 9 yr** (3 cases mimicked UVJ stones). Detailed "why abandoned" framing and reconstructive-urology relevance.

### Biological grafts

- **Porcine Acellular Collagen Matrix** — 26 refs. Broadened scope to umbrella family (SIS + UBM + porcine dermis), decellularization protocol, commercial product map (Surgisis, Pelvisoft/Pelvicol discontinued, ACell UBM), urethroplasty evidence (Chen/Atala rabbit, Mantovani first clinical, narrow onlay-only scope with tubularized-graft failure ~20%), Springer pediatric urethrocutaneous fistula 100%, Ansari/Karram female posterior urethral reconstruction, UROGRAFT composite scaffold, full SUI sling decline curve (Barrington 85% short-term → Giri 54% vs 80.4% autologous → Broussard 42.9% → Siracusano 69% at 76 mo), PROSPECT / ACOG 214 for POP, nuanced Culligan / Deprest sacrocolpopexy data.
- **Porcine SIS** — 47 refs. Comprehensive Surgisis page. **Palminteri 2024 propensity-matched urethroplasty at 156 mo (SIS 68% vs BMG 83.4%)**, Peyronie's as strongest contemporary indication (Knoll 91%, Sayedahmed bicentric 74.4%, Rosenhammer matched-pair vs collagen fleece showing more SIS recurrence/shortening), Zhang/Liao bladder augmentation long-term 60% with cannot-replace-enterocystoplasty caveat, ureteral onlay-works-vs-tubularized-fails pattern, hypospadias corporal grafting 1-ply safe vs 4-ply higher complications, Farahat VVF 91.3%, **Cour 2022 LUT prosthesis perforation 100% as Martius alternative**, Rutner → Siracusano sling decline, **John 2008 31.3% intense inflammatory reaction** with 4-ply/8-ply SIS slings, transvaginal POP recurrence, Deprest sacrocolpopexy 21% vs 3% PP with histopathology showing SIS entirely replaced by connective tissue.
- **Bovine-derived grafts** — 25 refs. Broadened from dermis-only to umbrella family of bovine pericardium (Peri-Guard glutaraldehyde-fixed, Veritas non-crosslinked) and dermis (Xenform non-crosslinked bovine fetal dermis). Crosslinked-vs-non-crosslinked load-bearing distinction. Peyronie's as strongest indication (Otero 80.5%, Choi/Lee 70° → 5°, Caraceni Xenform 75% straightening with the **43.8% glans-sensitivity-loss / 25% ED safety signal**), Lara canine urethroplasty 80% fistula rate, mixed bladder-augmentation preclinical, Guerette 2009 anterior-colporrhaphy RCT no benefit, **Lipetskaia 2022 FDA-designed Xenform study with 36-mo 83.6% noninferiority to native tissue with 0.9% exposure / no erosion**.

### Autologous tissue

- **Rectus fascia** — 29 refs. Broadened from PVS-focused to multi-application: Cardenas-Trowers safety-zone harvest anatomy (5.4 cm superior to symphysis), full PVS evidence (Grigoryan 2024 SR, Khan 10-yr RCT 75.4% vs 73% TVT with higher dry rate and zero reoperations, Wu NEJM, Zargham, Athanasopoulos 85%), midurethral "sling on a string" (Osman 87.8%, Fayyad laparoscopic), autologous transobturator (Kilinc RCT, Vasudeva meta), sacrocolpopexy (Wang 2022 0% / 6.8% failure at 1 / 5 yr), Cormio trapezoidal cystocele sling (no recurrence at 62.6 mo), Peyronie's dorsal-lamina-of-rectus-sheath graft (Craatz histology), Pathak corporal reconstruction during IPP, full pediatric neurogenic bladder-neck toolkit (Bauer sling, Walker wrap, Bugg cinch, Kolligian myofascial wrap, Smith RAM flap, Horton epispadias/exstrophy), Johnsen metoidioplasty urethrocutaneous fistula repair.
- **Fascia lata** — 25 refs. Urology/urogyn-focused per user instruction (skipped ophthalmology, orthopedic SCR, neurosurgical skull-base). ITB anatomy and biomechanics (Hutchinson, Otsuka), Lemer tensile equivalence to rectus, Crawford-stripper minimally invasive harvest, PVS evidence (Latini 85%, Brown/Govier 90%), **Nair 17-yr RCT durable improvement**, Patel 2022 / Vereeck 2026 / Bock robotic sacrocolpopexy, Australia mesh-unavailable context, Peyronie's (Kargi 100%, Kalsi Tutoplast 79%, Burnett seminal series), pediatric bladder neck (Snodgrass Leadbetter-Mitchell 82%), Buckley 201-patient donor-site morbidity (17% any-issue, 1% hernia at 12 mo).
- **Bowel segments** — 54 refs. Comprehensive segment-by-segment reference. Detubularization first principle with LaPlace and the 34% vs 10% tubular-vs-patch contraction data; full **ileum** coverage (cystoplasty neurogenic 22.7% → 81.8% continence, adult capacity 166 → 572 mL and detrusor pressure 53 → 14 cmH₂O, multi-configuration neobladders, **Hautmann 35-yr 87% spontaneous voiding**, Bricker conduit, ileal ureter multi-institutional 91.7% with bilateral 3.7× renal-function risk, Yang-Monti, Monti channels); **ileocecal** pouches (Mainz 91% / Indiana ~100% with **16-yr revision-free survival** / Charleston / Miami); sigmoid neobladder meta vs ileal; **gastrocystoplasty "now largely abandoned"** framing with HDS 17–51% / alkalosis / **Castellan 10.3% reservoir malignancy**; jejunal-syndrome avoidance; appendix Mitrofanoff with lower revision than Monti. Full metabolic-complications table, **Somani 8-yr bowel-dysfunction data with 24% regret**, Chan 2026 pediatric obesity signal, secondary-malignancy table (ureterosigmoidostomy 2.58% → ileal conduit 0.02%) with 20–36 yr latency and 5-yr / 10-yr surveillance schedule, Higuchi caveat about the underlying congenital bladder as the risk driver.

### Synthetic meshes

- **Polypropylene** — 23 refs. Material / Amid classification, lightweight-vs-heavy outcomes (Page 2023: 7.3% vs 22.8% sacrocolpopexy complications), MUS evidence with the **Gurol-Urganci 95,057-woman UK cohort** (6.9% 9-yr reoperation), sacrocolpopexy data with the explicit **FDA-scope caveat that the 2019 transvaginal POP order does NOT apply to MUS or sacrocolpopexy**, complications (Chughtai NY 36,195 cohort 7-yr erosion 3.7% / reoperation 6.7%, Priyatini 2026 risk factors), ACOG 694 management framework, full 2008–2019 regulatory timeline.
- **Absorbable mesh** — 17 refs. Filtered to RU / urogyn scope (skipping hernia). Materials by degradation window (short-term Vicryl / PGA / PDS vs long-term P4HB / PLA / BIO-A / TIGR), the urine-specific degradation problem (PGA loses 64% strength by 10 d in sterile urine, total loss in 1 d with *Proteus*), 2024 Cochrane verdict against transvaginal POP, **Guler 2-yr P4HB sheep model with 0% vs 50% exposure vs PP**, PLGA cell-seeded bladder augmentation, biodegradable PLGA stents.
- **Coated / Hybrid mesh** — 22 refs. Three-category framing (partially absorbable, reinforced tissue matrices, electrospun / tissue-engineered scaffolds). Full transvaginal-POP partially-absorbable table (Farthmann 2013 PA 3.4% vs PP 7.5% exposure, Lensen 5% vs 12%, Quemener, Steures 2019 no benefit vs native tissue, Cho). **Redundancy resolved**: absorbable-mesh page's partially-absorbable subsection collapsed to a pointer here.

### Prosthetics

- **Inflatable Penile Prosthesis** — 57 refs. Full Scott 1973 → AMS 800 1983 history through 2002 ectopic-reservoir and 2001–2002 antibiotic-coating milestones to Rigicon and Zephyr entrants; three-piece component anatomy with AMS 700 / Coloplast Titan / Rigicon Infla 10 comparison; penoscrotal-vs-infrapubic equivalence; **high-submuscular reservoir placement with the Baumgarten Five-Step Technique** (1.0% revision, zero deep pelvic complications, ~5× further from bladder / iliac vessels than SOR); no-touch technique reducing infection to 0.46% (Eid); Chawareb 2025 perioperative antifungal prophylaxis OR 0.22; Miller meta-analysis device survival 93.3% at 1 yr → 52.9% at 20 yr with modern 5-yr improvement to 90.6%; Cocci 2025 92,777-patient complication SR; **changing microbiology to 90.5% virulent gram-negative / fungal organisms**; manufacturer-specific mechanical-failure profiles (BSCI no predominant site vs Coloplast 78–83% tubing fracture); full Peyronie's stepwise approach including PICS 84% and scratch + VED; early-IPP for ischaemic priapism (Ralph 2009 immediate insertion, 96% satisfaction, Dighero 100% no-regret); gender-affirming phalloplasty with **Levy 2026 Delphi consensus** and 42–78% 5-yr retention / 43% revision; combined IPP + AUS safety.
- **Malleable Penile Prosthesis** — 28 refs. Full history from Bogaraz 1936 rib cartilage through Small-Carrion 1975 to Rigi10 2019 and ZSI FTM; six-device current-market table (Tactra / Genesis / Rigi10 / ZSI 100 / ZSI 100 FTM / TUBE-Shah); design principles; expanded indication list with **MIST infection salvage**, refractory priapism, phalloplasty, resource-limited settings, hostile pelvis, length preservation; surgical technique with ~72-vs-87 min OR-time advantage; satisfaction data (Akdemir 96.2%, **Cayan 7.7% MPP-to-IPP conversion vs 0.2% reverse**); Habous penile-length preservation; **Rigi10 99.2% 3-yr device survival**; Kohl 2026 real-world EHR n = 29,385 showing mechanical-breakdown advantage (6.7% vs 9.1%) but higher explantation; full MIST data (Gross 93% / **Angulo-Llanos 2026 VA 29.5% reinfection with diabetic predictor**); phalloplasty (Fraiman meta 37% vs 38%, Sun infrapubic, Pigot ZSI 100 FTM, Levy 2025–2026 cohorts, Levy Delphi consensus).
- **Artificial Urinary Sphincter** — 43 refs. **Scoped to the device** (history, design, components, outcomes, alternative devices) with explicit cross-link to the AUS procedure page for the Hourglass / capsulotomy / same-size-replacement / tandem / TC / distal-double-cuff revision strategies from the prior session. Scott 1972 → AS 721/742/791-792 → **AMS 800 1983** (16 vs 7.6 patient-years mechanical-failure breakthrough); AUSCO 2025 prospective (94% &gt; 50% pad-weight reduction, 60% pad-free, 7.8% revision, zero infections); long-term reintervention-free survival table across France 8,475-patient database, Mayo 1,082-case Linder, Bentellis 16-center European, Ontario population, Léon long-term French 15-yr, **Cotte women-vs-men mid-term advantage**; MASTER RCT vs male sling, Sacco propensity-matched for moderate SUI; fragile-urethra erosion signal; prolonged-catheterization risk and deactivation-before-instrumentation imperative; **radiation as the single biggest risk factor** (HR 4.32–7.57) with the &gt; 1.74-yr post-RT timing signal; alternative-device table (Victo adjustable / ZSI 375 one-piece / FlowSecure / electronic) with the Victo postoperative-pressure-adjustability differentiator.

### Neuromodulation devices

- **Medtronic InterStim** — 50 refs. Schmidt / Tanagho 1970s NIH work → 1997 FDA approval → 2019–2020 InterStim Micro; three-generation comparison with the original-vs-InterStim-II battery longevity asymmetry (7.3 vs 5.9 yr) and MRI-labeling progression; real-world Swiss 1.5T non-head MRI safety with device off; expanded mechanism (somatic-afferent modulation, supraspinal effects on cingulate / PAG / limbic, neural plasticity, reversibility); four FDA indications plus off-label IC/BPS (84% success) and neurogenic bladder (84.2% permanent SNM success); testing-phase options including 44% PNE-failure rescue with tined-lead testing and &gt; 61–65% single-stage cost-effectiveness threshold; indication-specific outcomes (**InSite 67–82% 5-yr OAB**, 71% retention at 5 yr, FI pivotal 86% at 3 yr, **French 10-yr KM 64%**); full **ROSETTA** detail (6-mo OnaBT edge, 24-mo equivalence, **BTX higher UTI 24% vs 10%**) and cost-effectiveness against SNM; complications / reintervention table across six cohorts including **Medicare 8-yr 43% cumulative reoperation**; the **Cohen 2025 rechargeable-class real-world signal** (revision-free survival 64% vs 82%); Okocha 62% regret in FI cohort; guideline matrix.
- **Axonics SNM** — 15 refs. 2012 founding through 2024 BSCI acquisition; three-way device-spec table (Axonics r-SNM vs InterStim II vs InterStim Micro) plus post-acquisition F15 / R20 recharge-free variants; **ARTISAN-SNM pivotal data through 2 yr (90% / 89% / 93% responder rates, 37% completely dry at 2 yr)**; FI 6-mo data 87–92%; Cohen 2025 rechargeable-class real-world signal with trial-vs-real-world charging-acceptability discrepancy; Amundsen 2025 SR / meta vs iTNM showing comparable efficacy without trial phase.
- **Revi (BlueWind)** — 16 refs. RENOVA → OASIS history through FDA clearance for non-refractory UUI (**first-ever for an implantable neuromodulation device**); three-component architecture (battery-free implant + RF-coupled wearable + clinician programmer); no-internal-battery design advantage over SNM and eCoin; subfascial implantation under local in 34 min; OASIS pivotal outcomes showing **remarkably stable responder rates 78 / 82 / 79 / 79% across 6 mo / 12 mo / 2 yr / 3 yr** with 95–97% satisfaction and **zero device- or procedure-related SAEs through 3 yr**; **Sutherland 2026 QoL signal that 83% of non-responders still reported benefit** and 100% willing to continue.
- **eCoin (ITNS)** — 7 refs. FDA 2022, n = 137 pivotal 48-wk 68% responder rate, 2-yr extension 78% / 22% dry, TITAN 2 comparator data.
- **PTNS systems (biomaterials index)** — tightened to device-focused index (Urgent PC, NURO) with prominent cross-link at the top to the canonical [PTNS procedure page](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx). The two pages are not redundant: biomaterials page = device / hardware index (matches eCoin / Revi / Altaviva / Bulkamid pattern); procedure page = canonical clinical reference (mechanism, technique, SUmiT sham RCT, comparators, FI evidence, TTNS).
- **Altaviva** — discrepancy flagged: user pasted content described Altaviva as a Boston Scientific non-rechargeable SNM with full-body MRI, whereas the current WARWIKI page describes it as Medtronic's implantable tibial neuromodulator (TITAN 2 device, FDA-cleared Sept 2025). After confirmation, **current page kept**; pasted content treated as hallucination.

### Ureteral stents

- **Double-J stent** — 60 refs. Full Zimskind 1967 → Gibbons 1972 (CPT 52332) → Finney 1978 → Andriole 1984 history; Nestler 2020 smaller-stent advantage (4.7 Fr vs 7 Fr); three-method length selection with Barrett CT-measurement showing 100% vs 71% ideal positioning; comprehensive transplant evidence (Patterson 2024 Cochrane RR 0.25 leak / 0.42 stricture, Patel 2017 RCT early-vs-late removal 7.6% vs 28.6% complications, **Amara 2026 NSQIP n = 3,407 UTI signal OR 2.22**, Oudmaijer DJ-vs-single-J, Yin 2026 meta); Ordonez 2019 Cochrane stenting-vs-no-stenting with Pais OR 1.63 and Allam / Reddy RCTs; Katsimperis SR optimal 10–14 d dwell with Heidenberg 3-vs-7-d RCT; full **stent-on-string** evidence (Liu, Harrison SR, Oliver SR, Inoue controlled trial, Juliebø-Jones pediatric); Bosio 2019 USSQ data (**62% would be dissatisfied with further stenting**); Bhojani 2026 CEGSSS new short-dwell-time questionnaire; **Hinojosa-Gonzalez 2023 Bayesian network meta** identifying silodosin 8 mg + solifenacin 10 mg as top combination; Pricop 2024 combination-vs-mono RCT; Lamb α-blocker pain RR 0.59; Legrand 2021 / Maxim 2025 encrustation time curves; **Zhang 2020 6-year forgotten-stent case** with 4.2 cm bladder stone; Thomas 98% retrograde-URS-with-holmium success; full **metallic-stent evidence** (Chow Resonance 4-mo functional advantage, Kim 2018 CMS RCT 239 vs 80 days, Khoo SR, Ong, Benson, Law); Wang 2023 biodegradable mesh; drug-eluting landscape.
- **Percutaneous nephrostomy (PCN)** — 20 refs. Full indication list, SIR high-bleeding-risk workup with the ~7% pyo septic-shock framing; detailed Seldinger technique including posterolateral subcostal access, Brödel's-line posterior-calyx puncture at 20–30°, catheter sizing 8–12 Fr adult / 5–10 Fr pediatric, non-dilated-system challenge ~80–90% success; SIR quality-improvement complication thresholds with explicit "**asymptomatic bacteriuria should NOT be treated**"; PCN-vs-RUS evidence (Ahmad meta lower failure with PCN, **Kim antegrade 98.4% vs retrograde 47.4%** in MUO, QoL preference for internal stents); special populations (pregnancy US-only ALARA, pediatrics, malignancy); tract-tumor-seeding caveat for UTUC.
- **Nephroureteral stent (PCNU)** — 15 refs. PCN-vs-PCNU-vs-DJ comparison up top; full indication list with the **13% vs 87% surgical-ureteral-repair failure data**, Spradling hemorrhagic-cystitis case series, transplant complications, bridge-to-internalization, ileal-conduit setting; unique capping-trial use case; two-stage standard plus Arslan 2024 single-stage first-hand approach with shorter fluoro and 3× lower complications; **Moon 2024 MarketScan real-world exchange-interval data** (41% within 29 d vs 90-d recommendation); transileal retrograde NU catheter 91.8% / 89.8% in ileal-conduit patients; MUO antegrade vs retrograde 98.4% vs 47.4%.
- **Metal &amp; long-term ureteral stents** — 35 refs (post-cleanup). Rationale with **6.3/yr → 1.4/yr** exchange-frequency reduction and 43% annual cost reduction; five stent types each in depth — **Resonance** (full-length coiled Ni-Co-Cr-Mo with the **Blaschko no-central-lumen interstitial-flow mechanism that cannot be completely occluded by extrinsic compression**, 11.7-mo median functional survival, 1% lowest migration, active-urolithiasis caveat); **Memokath-051** (thermo-expandable nitinol with the cold-water-collapse removal feature, NICE ≥ 30-mo cost-saving framing, **5-yr 72% complication rate including 46% migration**); **Allium URS** (covered nitinol with curative-intent benign-stricture data **92.9% for ≤ 2 cm with 12–24 mo dwell**, Bian meta showing 81% 1–2 yr vs 65% &gt; 2 yr success, 321-patient prospective 3-yr 74% primary patency, radiation 54.7%); **Uventa** (PTFE-mesh with the **Kim 2016 long-term-safety alarm of 28% major complications including ureteroarterial fistula and OR 20.4 for placement ≥ 24 months**); **Detour extra-anatomic nephrovesical bypass**. Four-way comparison, polymer-vs-metallic data, specific contraindications including prostate-cancer-bladder-invasion Resonance failure HR 6.50.

### Adjunct specialty

- **Glean Urodynamics System** — 9 refs. Conventional-UDS limitations with Gross 2026 catheter-impairs-voiding data in neurogenic bladder; ring-shaped 45 mm OD / 5.1 mm (15.3 Fr) intravesical sensor anatomy; operational workflow (median insertion 33.6 sec / removal 5.7 sec, 100% voiding success with sensor in place); full MUSE pivotal feasibility (n = 38, 97% insertion success, **zero serious AEs**); **Hamson 2026 bench-top comparative data showing Glean significantly outperformed Laborie Goby air-charged catheter across rise time / fall time / bandwidth / accuracy / linearity**; UroMonitor developmental lineage (Frainey 2023 98% event capture); broader TAUM landscape (UroMOCA, WiCa, Bladder Pill). Removed the prior page's unverified "Bright Uro / FDA 510(k) 2025 / Cleveland Clinic June 2025" specifics absent confirmation.

### Conventions / cross-cutting

- **Device-vs-procedure scope discipline**: device pages (AUS, IPP, MPP, InterStim, Axonics, PTNS) cover device-level content with explicit cross-links to the procedure pages in `04-surgical-techniques/` rather than duplicating the surgical-technique and revision content.
- **Hub-trimming pattern**: when dedicated sub-pages exist (Teflon, Contigen, autologous fat, autologous chondrocytes), the parent hub (`historical-agents.mdx`) is slimmed to a navigation index.
- **Citation hygiene**: extensive user-supplied content often contained mid-list reference fabrications from search systems (eg penile-prosthesis citations on a stent page). Discipline: filter to citations actually used in the body and renumber contiguously — enforced by `npm run lint:citations` which catches both gaps and orphan anchors.
- **Altaviva-style verification**: when user-supplied content conflicts with the existing page's identity for a device, the existing page wins absent positive confirmation. Existing-page-correct, pasted-content-treated-as-hallucination is the default.

---

## 2026-05-12 (later) — Launch-asset session (external; no repo changes)

Working session focused on launch marketing materials. No commits to the repo — all deliverables saved to `~/Downloads/`. Recorded here so the next session knows what exists and what was tried.

**Pottred font experiment (reverted).** Owner shared a chunky decorative TTF (`~/Downloads/pottred/Pottred.ttf`) to try on the homepage hero wordmark. Wired via `@font-face` in `src/css/custom.css` and `font-family: 'Pottred', ...` on `.heroTitleLink` in `src/pages/index.module.css`, with the file copied to `static/fonts/`. Rendered fine but overflowed the viewport at the existing `clamp(3rem, 8vw, 5.75rem)` size, and the existing `-0.025em` letter-spacing crowded Pottred's already-tight glyphs. Owner chose to revert. All three changes (font file, `@font-face` rule, `font-family` override) removed from both this worktree and the main repo; repo tree returned to clean.

**Launch assets (external, in `~/Downloads/`):**

- `warwiki-homepage.png` — 2880×1620 headless-Chrome screenshot of the live homepage at desktop width for trailer use.
- `warwiki-end-card.png` — 3840×2160 (1920×1080 @ 2×) trailer end card: WARWIKI gradient title + "Reconstruction, codified." + `warwiki.org` on the homepage gradient. Source HTML at `/tmp/warwiki-end.html`.
- `warwiki-end-card-vertical.png` — 2160×3840 (1080×1920 @ 2×) 9:16 version of the end card for Reels/TikTok/Shorts. Source at `/tmp/warwiki-end-vertical.html`.
- `warwiki-infographic-instagram.png` — 2160×2700 (1080×1350 @ 2×) single-slide IG carousel post. Header "An open-access platform for functional reconstructive urology & urogynecology"; five feature blocks (Comprehensive · Evidence-first · Curated playlists · Listenable · In your pocket) with icons in the brand-blue rounded tile style; footer `warwiki.org` / "Reconstruction, codified." Source at `/tmp/warwiki-infographic.html`.
- `warwiki-infographic-twitter.png` — 1600×900 (16:9) two-column variant of the same infographic for Twitter/X. Source at `/tmp/warwiki-infographic-twitter.html`.

**Caption / post copy drafted** in conversation (not saved to disk):

- IG carousel slide-by-slide rewrite (10 slides → distilled to the four-quality "Comprehensive / Evidence-first / Curated playlists / Listenable / In your pocket" infographic that ended up being the single-slide deliverable).
- Trailer post captions for two trailers (vintage clips + modern clips) in two strategies (paired post vs separate posts), plus platform-specific notes for Twitter/Instagram/TikTok/YouTube Shorts.
- Quote-tweet copy options for the announcement (sincere/restrained/mission-first/direct/community variants).

**Platform decisions confirmed in the conversation:**

- Trailer aspect ratio: post **vertical (9:16) even on Twitter** — mobile feed is ~80% of views and gives vertical clips ~3× the real estate of 16:9.
- Trailer hosting: upload **natively to Twitter** rather than linking YouTube. External-link posts are deprioritized; YouTube can host the discoverability copy separately.
- Tone preference for all launch copy: concise, not boastful — drop "proud to announce" framing and superlatives.

---

## 2026-05-12 — Launch-day pass: polish, inclusive language, navigation consistency, new content

Twelve commits to `main` covering site polish, inclusive-language remediation, structural consistency, and three new clinical pages. Build clean across ~1,038 files.

### Anki deck — added and reverted

Built a 2,038-card Anki spaced-repetition deck (commit `267a77f`) covering the four in-scope sections — foundations, evaluation, clinical conditions, special populations — explicitly excluding the treatment atlas and library per the owner's direction. Three parallel agents extracted cards from each section into TSV temp files; a defensive dedup merge produced the final CSV at `static/anki/warwiki-anki-v1.csv` with a resource page at `docs/08-resources/anki-deck.mdx`. Cards followed a uniform shape (Front ≤ 200 chars, Back ≤ 350, hierarchical tag `WARWIKI::Section::Subsection::Topic`). The owner reviewed and chose to remove it (commit `6052c0a`); content lives in git history for a future iteration. The taxonomy and parallel-agent generation pattern are documented in CLAUDE.md for the next attempt.

### AUS revision / salvage expansion (commit `ac88819`)

Major expansion of the Revision and Salvage Techniques section on the [Artificial Urinary Sphincter](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx) page.

**New conceptual subsection** — "The Hourglass Debate: Capsulotomy and the Atrophy Question":

- Bugeja / Mundy / UCLH 2016 demonstration that the hourglass deformity at the cuff site resolves on capsulectomy and is largely an artifact of the constrictive fibrous pseudocapsule; concurrent manometry of explanted PRBs showed pressure loss in all cases, supporting **PRB material failure**, not true atrophy, as the dominant NOMECA mechanism. 12/14 (85.7%) success with same-size cuff + same-pressure PRB replacement.
- Terlecki / Wilson 2022 "Wilson's Workshop 11" paradigm: (1) capsulotomy / capsulectomy at cuff site; (2) measure urethra after capsule release; (3) replace with same-size cuff; (4) complete device replacement (cuff + PRB + pump).
- Capsulotomy also relevant around the PRB (Khouri 2020 PRB herniation 3.2% as correctable cause of malfunction) and the scrotal pump.
- Bentellis 2021 "larger cuff size as only independent revision predictor" framing.

**Expanded outcomes per technique:**

- Cuff downsizing — Krughoff 2023 (97% subjective improvement, −2.2 pads/day, 70.6% in-place at 1.8 yr); Saffarian 2003 original-atrophy data; 3.5 cm cuff impact (22.2% → 4.7% revision rate).
- Cuff repositioning — Couillard / Stone 1995 proximal (5/6 improved at > 1 yr); benefit depends on appropriate re-sizing.
- Tandem cuff — DiMarco / Elliott 4.3 → 1.6 pads/day; O'Connor 2008 single-vs-double no continence difference but 12 vs 7 reoperations; Manka / Wright cadaver model showed tandem cuff did not improve LPP vs single (p = 0.44) — benefit may reflect more-proximal placement rather than dual-cuff mechanism; Yafi AMS PIF database (selection bias); Ahyai 2016 high-vs-low-risk (5.7× higher late explantation in double-cuff).
- Transcorporal cuff — Domínguez Gutiérrez 2025 SR / meta-analysis (revision OR 2.99, infection OR 0.33, erosion OR 0.35); Wiedemann 2013 functional outcomes; Ortiz 2020 erosion heat-map (18.3% TC vs 6.1% standard); Mock 2015 urethral risk factors (≥ 2 risk factors drop 35-mo erosion-free survival from 100% to 64%); Moser 2018 TC after prior erosion (irradiated patients remain high-risk).
- New: Tandem transcorporal cuff (Magera / Elliott pad data).
- New: Distal double cuff vs transcorporal head-to-head (Maurer 2019 prospective; DC→TC sequential salvage strategy).
- PRB modification — Khouri PRB herniation; Loh-Doyle predictors; caution against routine upsizing in atrophic tissue.

Updated Key Principles of Revision and Salvage to surface the capsulotomy + same-size replacement default, the cadaver-model qualifier on tandem cuff benefit, and the DC → TC sequential salvage paradigm. **16 new references (40–55).**

### Site polish

- Replaced the underbuilt Surgical Genealogy page (`docs/07-roots/surgical-lineage.mdx`) with a concise two-sentence "in development" placeholder + call for collaborators routed to `warwikihq@gmail.com`. Tightened the `07-roots/index.mdx` description.
- Standardized the public contact email to `warwikihq@gmail.com` and scrubbed the personal `nseranio@gmail.com` from all tracked files (was lingering in AGENTS.md historical notes).
- Removed per-page last-update author name from rendered docs (`showLastUpdateAuthor: false`); timestamp preserved.
- Auto-fixed citation-anchor gaps / orphans across 75 files via `scripts/fix-citations.js` — concentrated in foundations flaps (igap, epap, posterior-thigh, mcfap, island-groin), 04ab BNC/VUAS (8 procedures), 04b bladder-reconstruction (9), 04c urinary-diversion, 04d upper-tract, 04e genital-reconstruction (22), 04g prolapse (8), 04h fistula-repair (10), and 04l cosmetic (2). Added missing `hide_title: true` to the 04a urethral-reconstruction index.

### Sex/gender language sweep

- Renamed `both-genders` to `all-patients` across the fistula taxonomy: `04h-fistula-repair/both-genders/` → `all-patients/`, `03f-fistulas/in-both-genders/` → `all-patients/`, `both-genders-fistula.mdx` → `all-patients-fistula.mdx`. Updated category labels, the JS export in the landing's `GenericDatabase` array, all inbound `/docs/` links, and added three permanent `vercel.json` redirects covering the old URL families.
- Display prose: "Both-Genders Fistula Repair" → "Fistula Repair (All Patients)"; "Fistulas in Both Genders" → "Fistulas (All Patients)"; "in both sexes" → "across sexes"; "across both sexes" → "across all patients". One "nontranssexual patients" cohort descriptor in radial-forearm.mdx → "patients undergoing phalloplasty for non-gender-affirming indications". One "male-to-female gender-reassignment surgery" in singapore-flap.mdx → "vaginoplasty (gender-affirming surgery)".
- Added a header disclaimer to `docs/08-resources/hidden-curriculum/billing-coding.mdx` acknowledging that several ICD-10 code descriptors (F64.0 Transsexualism, Q56.0–Q56.4 Hermaphroditism / Pseudohermaphroditism, Z87.890 Personal history of sex reassignment) use outdated and sometimes stigmatizing language but are preserved verbatim for billing accuracy.

### New clinical content

- **[Pelvic Venous Disorders](docs/03-clinical-conditions/03h-pelvic-pain/pelvic-venous-disorders.mdx)** — full PeVD / PCS picture (anatomy with embryologic basis, deep uterine vein as surgical landmark, US Uterus Transplant Consortium superior/inferior uterine vein nomenclature, reflux-vs-obstruction pathophysiology including nutcracker and May-Thurner, hormonal contribution, post-coital pain as pathognomonic feature, four pelvic escape points + bottom-up paradigm, SVP classification, imaging hierarchy through IVUS, endovascular management with Hansrani 2023 RCT + Daniels SR, the 2026 Emory POTS / orthostatic-intolerance association at 83% PeVD prevalence with 44% complete resolution after iliac stenting). 36 deduplicated references.
- **[Glove Wetting for Knot Tying](docs/01-foundations/surgical-skills/glove-wetting.mdx)** — new operative-pearl page in `surgical-skills/`. Friction-reduction rationale; wet-conditions-reduce-knot-slippage evidence (Pietschmann, Savage, Coleridge, Muffly); glove perforation literature (Enz 2023 25–37%; Martinez 2013; Battersby 2016); Enz 2026 global gloving consensus. Renamed the `surgical-skills/_category_.json` label from "Named Stitches" to "Surgical Skills" so the directory accommodates non-stitch pearls.
- **[Suture Lubrication](docs/01-foundations/surgical-skills/suture-lubrication.mdx)** — bacitracin / petroleum / saline practice page. Petroleum-based agents reduce knot failure load (Muffly 116.7 vs 123.8 N, p = 0.002); bacitracin adds an anaphylaxis pathway and allergic-contact-dermatitis cost (Smack 1996 JAMA RCT n = 922). Bottom line: saline for lubrication, triclosan-coated sutures for antimicrobial coverage.
- **[Radiation Safety](docs/02-evaluation/imaging/radiation-safety.mdx)** — new occupational-safety page in evaluation/imaging. ICRP/NCRP dose limits, FLASH UK reference levels (PCNL 24.1 Gy·cm² as the high-dose outlier), shielding stack reducing trunk dose 95% / genital 99% / leg 97%, the inverse-square law, pulsed half-dose / collimation / last-image hold for 30% entrance-skin-dose reduction, procedure-specific pearls, pregnancy considerations. Cross-linked bidirectionally with `surgical-principles/radiation-tissue-effects.mdx`.

### Taxonomy decision codified

Where disparate technique pearls live going forward:
- **Named techniques / maneuvers / operative pearls** → `01-foundations/surgical-skills/`.
- **Physical instruments** → `01-foundations/tools/instruments/`.
- **Broader principles / concepts** → `01-foundations/surgical-principles/`.

### Landing-page / sidebar ordering pass

Audited every `index.mdx` against sibling sidebar order. Fixed real mismatches:

- `06-journal-club/index.mdx` — Guidelines & White Papers now precedes Journal Database.
- `05a-trauma-emergencies/index.mdx` — reordered to match explicit `sidebar_position` (gu-injury-overview → trauma-assessment; PFUI → bladder → ureteral → renal → penile → scrotal).
- `surgical-principles/index.mdx` — added the missing Hyperbaric Oxygen Therapy entry.
- `04-surgical-techniques` — realigned all 13 `_category_.json` `position` fields so the sidebar matches the landing's clinical narrative (urethral → BNC → bladder → diversion → upper-tract → genital → incontinence → BPH → prolapse → fistula → GAS → male SD → cosmetic).

### Treatment Atlas `bestFor` tightening

Rewrote ~137 `bestFor` indication strings across 15 atlas files so every row is ≤ 120 chars. Stripped citation residue, n-values, percentages, technique enumerations, and stepwise algorithms while preserving the load-bearing clinical scenario per row.

| metric | before | after |
| --- | --- | --- |
| longest | 594 chars | 120 chars |
| mean | 132 | 84 |
| p90 | 243 | 105 |
| median | 98 | 84 |
| rows > 200 chars | 57 | 0 |
| rows > 120 chars | 113+ | 0 |

---

## 2026-05-11 (priapism atlas) — Full rewrite of priapism shunts & decompression page

Comprehensive page-level rewrite of `docs/04-surgical-techniques/04j-sexual-dysfunction/priapism-shunts-decompression.mdx` across **seven commits** pushed to both `claude/kind-wiles-84dcfe` and `main`. Replaced the GenericDatabase block with a 10-row markdown summary table, removed the now-unused `GenericDatabase` import, and expanded every named technique from a one-row stub into a full surgeon-oriented subsection. Reference list grew from **17 → 47** entries.

### Distal corporoglanular shunts (Winter / Ebbehoj / T-Shunt / Al-Ghorab)

- **Winter** — feature table; Nixon's 92%-of-reoperated-patients-had-Winter signal; **Snake-incompatible** framing because core is too small to accept a Hegar dilator.
- **Ebbehoj** — 1974 origin as a No. 11 blade modification of the Winter; positioning between Winter and Al-Ghorab; urethral-injury caveat if directed too ventrally.
- **T-Shunt (Lue)** — full **Brant–Lue 9-step technique** (lateral glans entry at 2 / 10 o'clock, No. 10 blade, 90° rotation, Foley protection, optional corporal biopsy); outcomes-by-duration table (< 24 h ~ 100%, 24–48 h ~ 60–75%, > 48 h ~ 30% with **100% necrotic smooth muscle on biopsy**); four named efficacy series — Brant/Lue 2009 92%, Zacharakis 2014 100% if < 48 h, Ortaç 2019 84.2% ED, Unal/Burnett 2024 **92.3% Snake vs 53.6% no-Snake** (p < 0.001).
- **Al-Ghorab** — 1973 origin; "largest tunical window, direct vision, lowest reoperation rate"; step-by-step including **Shiraishi–Matsuyama blunt-cavernosotomy salvage** (Pean forceps for 5–7 day priapism refractory to T-shunt/Snake; 2/2 immediate resolution); four-shunt comparison table; five efficacy series.

### Burnett Snake Maneuver

- Full Burnett–Pierorazio 9-step technique anchored on why Winter and Ebbehoj windows are too small to accept a 7–8 mm Hegar dilator while T-shunt and Al-Ghorab are compatible.
- Shunt-compatibility matrix; five-row efficacy table culminating in Unal/Burnett 2024 comparative (**92.3% vs 53.6%** resolution, **recurrence 4.2% vs 26.6%**, EF at follow-up 42.8% vs 50% NS).
- Complication profile from the Segal series (1/10 wound infection, 1/10 urethral injury with subsequent urethrocutaneous fistula); Shiraishi–Matsuyama salvage call-back.
- VanDyke practice-pattern signal — corporoglanular tunneling remains favored first-line (71.2%) and more widely performed (89.9% vs 62.8% PSD).

### Penoscrotal Decompression (PSD)

- Rationale vs immediate MPP — Fuchs documented **37.5% revision rate** for immediate MPP after failed distal shunting with **50% distal extrusion / 25% impending lateral extrusion**; PSD's glans-sparing approach was designed to break this loop.
- Original Fuchs 2018 penoscrotal incision vs **Basile 2025 proximal-shaft modification**.
- Four-row evidence table: **Fuchs 2018** 6/6 resolution with 0% revision vs MPP 37.5%; **Baumgarten 2020** mean 71 h duration, 48% with prior failed shunting, **bilateral PSD 0% recurrence vs unilateral 20%**, 60% spontaneous EF, median IIEF-5 drop 3.5; **Basile 2025** longest follow-up — 96% immediate detumescence, 92% pain relief, 69% overall success (73% bilateral), 86% satisfactory EF (± PP); **VanDyke 2023/2024 surgeon survey** — 47.3% rated PSD "Very/Extremely Effective" vs 18.7% for corporoglanular tunneling (p < 0.001).
- Comparison table across distal shunts / Snake / PSD / immediate MPP; prosthesis-preservation framing.

### Proximal and Venous Shunts

- **Quackels** — 1964 origin; lithotomy + perineal corporospongiosal-anastomosis step-by-step; Quackels-vs-Grayhack head-to-head; five efficacy series (Cosgrove 1974 → EAU 2024 abandonment recommendation); Quackels-specific complications anchored to **Manjunath 2015** (simultaneous urethrocutaneous + urethrocavernous fistula after proximal corporospongiosal shunt requiring suprapubic diversion), **Robbins 1984** (late urethrocavernous fistula 3 mo post-shunt), and **Kulmala 1995** (19.2% permanent open shunt on cavernosography; **100% impotence reversal by shunt closure**).
- **Grayhack** — Grayhack/McCullough/O'Conor/Trippel 1964 cavernovenous concept; full saphenous-graft step-by-step; eight-row efficacy table (Cosgrove → **Resnick 1975 pediatric Grayhack** → **Moloney 1975 with the 3-mo graft-ligation rule** → Richard 1979 87.5%/62.5% → Nixon → Kulmala 19.2% → Zheng → EAU 2024); Grayhack-vs-Quackels head-to-head emphasizing higher persistent-shunt + PE risk vs lower urethral-injury risk; modern cavernovenous variants — Barry 1976, **Chiou 2009** DDV + saphenous-vein graft (100% resolution / 69% EF in n = 16 with 10 prior failed shunts; Doppler-confirmed shunt patency in 100% and restored cavernosal arterial flow in 92%), Kilinc 2009 temporary cavernosal-cephalic angiocath-and-serum-set bedside construct (86.7%).
- **Barry / Caverno-Dorsal Vein** — promoted from one-row mention to full subsection. Penile venous-anatomy primer (superficial DV / deep dorsal vein as principal flaccid-state drainage / cavernosal-crural). Original 1976 Barry technique. Four modifications: **Micoogullari 2021 planned 2-month closure** with 0.01% adrenaline irrigation × 5 protocol (the direct procedural answer to the Kulmala/Moloney permanent-open-shunt physiology); Chiou DDV+SVG hybrid; Kilinc temporary cephalic-vein; Soydaş 2025 algorithm. Four-row efficacy table — Barry 2/2, Chiou 100%/69%, Micoogullari 100%/80%, Kilinc 86.7%/77%. Nuanced positioning that the Barry-shunt-specific data **exceed** pooled proximal-shunt outcomes (EAU 5.7–100% / 11.1–77.2%) while acknowledging absence from AUA/SMSNA 2022 and EAU 2024 recommendations.

### Early Malleable Penile Prosthesis (renamed from "Early Penile Prosthesis Transition")

- Pathophysiological rationale with the 48-h irreversibility threshold and the four simultaneous functions of acute MPP (mechanical detumescence, length preservation, proactive ED treatment, avoidance of the dense-fibrosis surgery problem).
- **MRI-guided patient selection** anchored to **Ralph 2010 BJU Int** (100% sensitivity of T2-weighted gadolinium-enhanced penile MRI for nonviable smooth muscle vs corporal-biopsy reference) and the **ISSM survey gap** (< 40% currently use MRI / biopsy).
- Guideline positioning (EAU 2024 / AUA-SMSNA 2022 > 36 h / Pang 2025 / Calopedos 2025); malleable-vs-IPP head-to-head table; full step-by-step including **Salem 2010 sling-suture distal-erosion prophylaxis** (0% distal erosion in 11/12 patients with prior failed shunting at median 15-mo follow-up).
- **Seven-row evidence table**: **Ralph 2009 UCLH landmark** (n = 50, 100% resolution / 84% intercourse / 96% satisfaction / **0% penile shortening**); **Zacharakis 2014 UCLH early-vs-delayed** (96% vs 60% satisfaction; **80% of delayed implantations required a second corporotomy and downsized cylinders**); **Barham 2023 multicenter IPP** (0% complication rate when placed ≤ 6 mo vs **40.5% when placed > 6 mo**); **Tausch 2015 cost-effectiveness** (mean preop **US $83,818** in repeated interventions; all discharged ≤ 24 h after MPP); Salem 2010; **Dighero 2025 long-term QoLSPP** (n = 39 at median 9-yr follow-up; **100% would not regret the prosthesis**); **Butaney 2019 ISSM survey** (70.9% more comfortable with MPP than shunt, yet ~ 80% still favor shunts first-line — the practice gap Calopedos 2025 explicitly challenges).
- Elective **MPP → IPP exchange** at 6–12 mo; Clavijo 2017 IPP-into-fibrotic-corpora tips; special-population notes (SCD, prior failed shunting); algorithmic biases table; head-to-head prosthesis-vs-shunt table.

### References added (refs 18–47)

Mireku-Boateng 2001, Yassin 2023, Ortaç 2019, Shiraishi-Matsuyama 2013, Schifano 2025, Quackels 1964, Cosgrove-LaRocque 1974, Tabibi 2010, Zheng 2013, Manjunath 2015, Robbins 1984, Kulmala 1995, Grayhack 1964, Resnick-Grayhack 1975, Moloney 1975, Richard 1979, Barry 1976, Chiou 2009, Kilinc 2009, Calopedos 2025, Ralph 2009 EUR Urol, Zacharakis 2014, Ralph 2010 MRI, Butaney 2019 ISSM, Tausch 2015, Salem 2010, Barham 2023, Dighero 2025, Clavijo 2017, Cocci 2025 PPI complications SR, von Stempel 2024 imaging review.

Verification: `npm run lint:links` clean across 1,034 files; `npm run lint:citations` clean for this page; `npm run build` succeeds. Seven content commits + one docs commit pushed to both `claude/kind-wiles-84dcfe` and `main` as fast-forward.

### Follow-up navigation fix (commit `c70f97c`)

Converted bare procedure names to anchor links after a "techniques are not clickable" report. All 10 rows of the Procedure Summary Table at the bottom of the priapism atlas page now link to the corresponding on-page subsection anchors (Winter, Ebbehoj, T-Shunt, Al-Ghorab, Snake, PSD, Quackels, Grayhack, Barry, Early MPP). The shunt tables on the emergency-condition priapism page in `docs/05-special-populations/05a-trauma-emergencies/priapism.mdx` now cross-link each Winter / Ebbehoj / T-shunt / Al-Ghorab / Quackels / Grayhack / Snake / PSD row to the matching atlas-page anchor; a missing Barry-shunt bullet was added to the proximal-shunt list. Lint + build clean; pushed to `main`.

---

## 2026-05-11 (LS surgical ladder) — Regenerative VLS / GSM expansion + four new LS / FGM/C atlas pages + DB audit

LS-surgical-ladder build-out spanning the full conservative → maximal spectrum, thorough regenerative VLS + GSM expansion of the existing microfat / nanofat grafting page, new FGM/C clinical-condition page under 03g, and a vulvar-DB audit + cleanup pass. **10 commits**. Build clean across **1,010 files**.

### Microfat / nanofat grafting page (04l) — three substantial expansions

- **VLS section** — three-pillar ADSC mechanism table (anti-fibrotic / immunomodulatory / pro-angiogenic) anchored to Lichen-SVF histologic p-values; full evidence table across 5 series (~166 patients): **Boero 2015 n = 36** (94% improved trophism, 95% stopped routine TCS), **Tedesco 2020** RCT n = 40 (combination superior in early-stage; discouraged in late-stage), **Gutierrez-Ontalvilla 2022 RCT** n = 20 (the only RCT vs TCS; significant ↓ inflammatory cells but no elasticity improvement), **Casabona 2023 n = 72** (largest cohort; Skindex-29 −31.8, FSFI +7.6, DLQI −9, all p &lt; 0.001), **Lichen-SVF 2025 n = 18** (histologic reversal — ↓ hyalinization p = 0.0036, ↓ CD3+ T-cells p = 0.0068, ↑ microvascular density p = 0.0121). Comparison table vs PRP monotherapy / Nd:YAG-Er:YAG laser / perineoplasty / aOAP flap. Positioning subsection noting ACOG 2020 / German S3 2026 keep TCS first-line and frame fat grafting as complementary, not curative; Lichen-SVF protocol maintained low-dose TCS throughout follow-up.
- **PRP + fat-grafting synergy subsection** — three of five VLS series (132 of 166 patients) used PRP + fat / SVF combinations. **&gt; 4× VEGF amplification** when MSCs co-cultured with PRP (Myung 2020); ADSC pluripotency upregulation (NANOG, SOX2) by platelet-rich-fibrin extract (Wachtel 2025); platelet → ADSC **mitochondrial transfer** restoring mitochondrial function and reducing ROS in chronically inflamed VLS bed (Ke 2025); **i-PRF direct fibroreduction** via TGF-β / SMAD3 inhibition (Sun 2025). Tedesco early-stage therapeutic-window caveat.
- **GSM section** — positioning comparison table vs vaginal estrogen / DHEA / ospemifene / CO₂-Er:YAG laser anchored to the **2025 AUA / SUFU / AUGS guideline** (low-dose vaginal estrogen first-choice pharmacotherapy). The postmenopausal **estrogen paradox**: low E2 paradoxically improves volumetric graft retention (**79% vs 35%** in OVX-mouse model; clinical mirror in elderly cohorts with AQP-7-mediated adipocyte hypertrophy) but postmenopausal ASCs are transcriptomically distinct (~2,299 DEGs; M1 polarization), giving a plausible mechanism for the **9–12 mo gradual peak** observed by Casarotti. **GSM in breast cancer survivors** — highest-unmet-need population (up to 60% incidence, AI-driven); no fat-grafting-specific study yet, ER-upregulation theoretical caveat for HR+ disease, Chen 2025 PRP-BCS pilot (n = 20, 65% on AIs) as proof of concept. **FDA regulatory positioning** of microfat / MFAT (minimally manipulated, practice of medicine), enzymatic SVF (351 HCT/P), and mechanical SVF / nanofat (gray area, product- and indication-specific). References extended through ref 48 across all three expansions.

### New FGM/C clinical condition page (03g)

[Female Genital Mutilation / Cutting (FGM/C)](docs/03-clinical-conditions/03g-genital-scrotal/female-genital-mutilation-cutting.mdx) at sidebar_position 1.7, framed for reconstructive surgeons and urogynecologists. WHO Type I–IV classification table with the anatomic note that the clitoral body (8–10 cm) and crura are preserved beneath the visible scar (operative substrate for the Foldès reconstruction). Epidemiology — pooled global prevalence 36.9%, Somalia 99.2% in women, Mali 72.7% in girls, sub-Saharan pooled 53.5%, &gt; 500k US women / girls at risk. Risk-factor AORs (family history 13.71, lower maternal education 3.28, rural residency 2.27, poverty 1.38). Complications table organized by reconstructive-urology / urogyn relevance — urinary (urethral stricture, meatal obstruction, recurrent UTI / pyelonephritis); vulvovaginal (introital stenosis, hematocolpos, epidermoid inclusion cysts, post-FGM neuromas); sexual (dyspareunia OR 2.47); obstetric (prolonged labor OR 2.04, perineal tears OR 2.63, episiotomy OR 1.89, PPH, fetal distress); mental health (PTSD ~ 55%). AAP 2020 framework — never perform any form; counsel families pre-travel; recommend defibulation for all Type III regardless of symptoms; document with ICD-10 N90.810–N90.818. Defibulation timing (2nd-trimester ideal, up to ~ 34 wk acceptable) and anesthesia (avoid local; flashback risk). US legal framework with the **2020 STOP FGM Act re-criminalization** correcting the post-*US v Nagarwala* (2018) status; 35 states with specific statutes; Transport for FGM Act 2013 against "vacation cutting". 2025 WHO integrated-systems framing. Cross-linked to the four existing FGM/C atlas pages.

### LS surgical ladder — four new / expanded atlas pages

- **[Perineoplasty + De-Adhesion](docs/04-surgical-techniques/04e-genital-reconstruction/perineoplasty-de-adhesion.mdx)** (new) — seven depth-organized component subsections from simplest to most complex: Fenton's median perineotomy (Heineke–Mikulicz analogue, mild-to-moderate posterior band); CO₂ laser adhesiolysis with **Breech 2000 Surgicel re-adhesion prophylaxis** in adolescents; **posterior vestibuloplasty with vaginal mucosal advancement** as the workhorse (Rouzier 2002 90% dyspareunia improvement; Lauber 2021 90% satisfaction; mandatory histopathology to exclude VIN / SCC; ~ 25-min OR time per Frigerio); clitoral de-hooding with dorsal-nerve-of-the-clitoris caution; **investigational anterior vestibuloplasty with free full-thickness vaginal mucosal graft** (Burger 2016; 1 / 5 required reoperation for graft contraction / keratinization); local skin-flap advancement (cross-link to the dedicated page); aOAP cross-link. New **"Choosing the appropriate technique"** decision table mapping 8 clinical scenarios (mild posterior band → Fenton's; isolated adhesions → CO₂ + Surgicel; moderate-severe posterior → vestibuloplasty; clitoral phimosis → de-hooding; anterior → mucosal-graft vestibuloplasty; multi-site → combined session; extensive / salvage → local flaps; severe refractory → aOAP). Outcomes table for ~191 patients across 5 series. Perioperative principles — preop topical control, mandatory histology, indefinite postoperative clobetasol, dilator considerations, SCC surveillance.
- **[aOAP Flap](docs/04-surgical-techniques/04e-genital-reconstruction/aoap-flap.mdx)** (expanded LSA section) — replaced the brief LSA stub with patient-selection criteria (failure of maximal medical therapy + simpler surgery, histologic LS confirmation, VIN / SCC exclusion). Three-component **operative steps** explicitly distinguishing skinning vulvectomy (epidermis + superficial dermis only; preserves subcutaneous fat / muscles / nerves / vasculature) from simple or radical vulvectomy. Outcomes table for O'Dey n = 61 (87% bilateral aOAP, 1-yr follow-up, dyspareunia and apareunia both p &lt; 0.001). LS-specific complication framing — TCS-induced epidermal atrophy and impaired healing; 180-patient combined LS + FGM/C denominator with **1 total flap loss** and 21–33% minor wound complication ceiling; 8.4% revision rate. Durability caveat — 50% historical LS-vulvectomy recurrence and Rangatchew 38% severe relapse at 8.4 yr vs the 1-yr O'Dey window. New perioperative-management section and **"Skinning vulvectomy — historical context"** subsection covering the VIN origin, the STSG era (Lavoué QOL data), and the O'Dey innovation of replacing the graft with a vascularized fasciocutaneous flap. References extended through ref 13.
- **[Local Skin Flaps for LS Sequelae (Long-Term Outcomes)](docs/04-surgical-techniques/04e-genital-reconstruction/local-flaps-ls-sequelae.mdx)** (new) — anchored on the unique long-term data the perineoplasty / aOAP pages cannot host. **Rangatchew 2017 mean 8.4 yr follow-up** — the only decade-scale LS surgical series; 38 consecutive histologically verified LS patients; central stratification at 8 yr: **12% no relapse / 50% minor LS relapse (coitus preserved) / 38% severe LS relapse (apareunia recurs)**; 75% reported surgical benefit / 74% satisfied / 58% improved sexual life. **Brauer 2016 qualitative-couple study** — the only qualitative LS-surgery study; 68% decreased sexual pain (4 pain-free, 9 "pain → discomfort"); **4 of 5 non-improvers had partner-communication failure**, supporting preoperative sexological couple-based consultation. LS-specific psychosexual-burden context (Jabłonowska, Sadownik). Flap-menu breakdown: **sliding designs** (Y-V advancement, V-Y workhorse, pubolabial V-Y amplified) for the contracture-dominant LS deformity; **pivoting designs** (rhomboid / Limberg, lotus-petal / pudendal-thigh, gluteal-fold) for tissue deficit. Complication-profile table — Reid 1997 207-flap historical (89.9% primary healing), Burke 1994 (87%), Kwong 2025 (92.6%), Commenge 2025 (78.3% at 4 wk). Comparison across the full LS surgical ladder showing the time-dependent erosion of benefit Rangatchew uniquely captures. **Six counseling points** including indefinite topical clobetasol maintenance (0% vs 4.7% SCC in adherent vs non-adherent 507-patient cohort).
- **[Defibulation (Type III FGM/C)](docs/04-surgical-techniques/04e-genital-reconstruction/defibulation.mdx)** (new) — most common FGM/C operation worldwide; AAP 2020 universal recommendation for all Type III regardless of symptoms. Historical context — traditional non-surgical opening by husband (North Sudan, Somalia, southern Egypt) or birth attendant at marriage (Djibouti) replaced by medicalized defibulation. Expanded indications (menstrual obstruction with rare hematocolpos / hematometra, painful neuromas from entrapped nerves or retained foreign bodies, gynecologic-exam access, pre-conception preparation, recurrent UTI, pregnancy). **Tiered timing table** including first-stage-of-labor and at-crowning rows for late presenters (unstudied caveat) plus the survivor-vs-clinician timing-preference asymmetry from the Jones FGM Sister qualitative study (survivors lean pre-pregnancy; clinicians lean antenatal). **Anesthesia by patient population** — young children GA in all cases; non-pregnant adolescents / adults regional or GA; pregnant spinal preferred; AAP-vs-WHO local-anesthesia divergence with the AAP flashback-risk rationale. Outcomes — Okusanya 2026 meta n = 3,166: emergency CD **OR 0.16 (95% CI 0.06–0.42)**, genital-tract lacerations **OR 0.48 (95% CI 0.29–0.79)**, antepartum may shorten labor vs intrapartum. Berg 2017 SR (71 studies, **50–100% satisfaction**, sexual-function most consistent) and the Somali-cohort 94% recommend / 100% pleased. **Re-infibulation prohibition** subsection — classified as FGM/C, illegal in many countries, AAP-prohibited regardless of patient or family request. Counseling / psychosocial section covering virginity concerns, **Johansen 2017 qualitative work on male-perceived virility / pleasure** as a specific deterrent to medicalized defibulation, mental-health-provision deficit, adolescent-autonomy / best-interest considerations.

### Vulvar DB audit + cleanup

Slug-and-content audit of the [Vulvar Reconstruction database](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar.mdx) surfaced four issues, all corrected:

- **Merged** the two LS fat-grafting rows ("Autologous Fat Grafting for VLS" + "Combined PRP + Fat Grafting for VLS") into one concise row **"Fat Grafting (± PRP / SVF) for Vulvar LS"** — both indications now sit on the canonical microfat / nanofat grafting page with a unified VLS section and PRP-synergy subsection.
- **Added** a Defibulation row under FGM/C Reconstruction pointing to the new defibulation atlas page.
- **Repointed** all three regenerative fat-grafting slugs from the catch-all `genital-reconstruction-principles` / PRP-pharmacology slugs to the canonical `microfat-nanofat-grafting` page.
- **Tightened** the VLS and GSM `bestFor` strings to concrete evidence — VLS: "~166 patients across 5 series; histologic ↓ hyalinization, ↓ CD3+ T-cells, ↑ microvascular density; complementary to topical maintenance, not curative"; GSM: "Menkes n=50 VHI/FSD significant at 18 mo; Casarotti MFAT n=35 99% resolution sustained 36 mo; ER upregulation + neoangiogenesis + lactobacilli restoration; not yet in AUA/SUFU/AUGS 2025."
- Three LS-surgical DB rows (Perineoplasty / De-Adhesion, Skinning Vulvectomy + aOAP, Local Skin Flaps for LS Sequelae) repointed from the principles page to their new dedicated pages.

All 38 vulvar-DB anchors verified against the live rendered HTML (the IGAP / gluteal-fold Part 2 / Part 3 anchors with double-hyphens were the suspected breakage; both match the Docusaurus-rendered IDs exactly — the em-dash is stripped but the adjacent spaces preserve as a double-hyphen).

### Verification

`npm run lint:links` (1,010 files clean), `npm run lint:citations`, `npm run typecheck`, `npm run build` all pass. **10 commits** pushed to `main` as fast-forward (b8f0e7d → 05eaf0b).

---

## 2026-05-11 (later) — Lymphedema named-technique atlas + vulvar-reconstruction consolidation + new foundations flap pages

Six new genital-lymphedema named-technique atlas pages, a complete vulvar-reconstruction atlas + DB overhaul under a newly established hybrid consolidation policy (10 redundant atlas pages collapsed back to foundations after initial expansion), four new foundations flap pages (**IPAP / TFL / DIEP / TRAM**), four new FGM/C-specific atlas pages, and resolution of audit-identified misroutings (labial-flap / mons-pubis / PAP-DFAP / IGAP). **31 commits**. Build clean across **1,006 files**.

### New genital-lymphedema atlas pages (all retained — substantial named-technique content with no foundations equivalent)

- **[3R / SCIP-LFT (Yamamoto)](docs/04-surgical-techniques/04e-genital-reconstruction/3r-scip-lft.mdx)** — Radical Reduction and Reconstruction technique. SCIA branch anatomy (Yoshimatsu cadaveric, Gandolfi, Jeong axiality, Fernandez-Garrido extended SCIP, Yoshimatsu transverse-branch landmark), lymphatic-system inclusion (LYST concept), Yoshimatsu proximal-to-distal harvest, the four operative steps (radical resection + SCIP-LFT + chimeric pure-skin perforator for penis + primary donor closure), Yamamoto n = 7 / 22.7 mo with 0% complications and 0% recurrence and no compression required (GLS 6.7 → 0.3), Abdelfattah n = 26 / 44.9 mo with GLS 6.2 → 0.05 and GBI +41, LYST long-term Yoshimatsu data, prophylactic L-SCIP after groin dissection (Caretto), and head-to-head with excision-only / Modified Charles / excision+flap / free VLNT.
- **[CHASCIP (Ciudad)](docs/04-surgical-techniques/04e-genital-reconstruction/chascip.mdx)** — Combined Charles' Procedure + Bilateral Lymphatic SCIP Flap. Hybrid Charles excision + bilateral SCIP-LFT for scrotum + hypogastric FTSG for penis. Ciudad 2025 n = 8 / 34 mo with 0% recurrence and 87.5% → 0% sexual dysfunction (p &lt; 0.001), 160-min OR time, 200.6 mL EBL despite ~1.8 kg excision. ISL Stage III penoscrotal positioning vs Yamamoto 3R and Abdelfattah.
- **[Complete Functional Lymphatic-System Pedicled Transfer (Abdelfattah)](docs/04-surgical-techniques/04e-genital-reconstruction/complete-functional-lymphatic-pedicled-transfer.mdx)** — Largest SCIP-LFT genital series. Single SCIP-lymphatic flap covers both scrotum and penis. Maruccia podoplanin-positive vessel-density rise (7.92 → 11.79 vessels/mm²), Aschen LN transplant mechanism, Yoshimatsu LYST principle. Abdelfattah 2023 n = 26 / 44.9 mo with 100% flap survival, GLS 6.2 → 0.05, GBI +41. Combined SILN + distal LVA approach for concurrent scrotal + LE lymphedema (Abdelfattah 2020 Microsurgery).
- **[LYST (Yoshimatsu / Yamamoto)](docs/04-surgical-techniques/04e-genital-reconstruction/lyst.mdx)** — Lymphatic System Transfer framework (cross-region concept). Conceptual evolution beyond VLNT — deliberately includes afferent lymphatic vessels with their draining nodes. Scaglioni / Suami inguinal-LN subgroup anatomy, safe-harvest zone (lateral to femoral artery; superolateral abdominal-draining nodes). Free SCIP-LYST (Yoshimatsu 2025), pedicled SCIP-LYST + distal LVA for LE-LE with CVI (Xu 2026), Zone-4 lymphatic SCIP + DIEP for simultaneous breast reconstruction + BCRL (Yoshimatsu 2022), perforator-to-perforator SCIP-LYST (Meroni / Scaglioni 2024), Lymphatic Flow-Through (LyFT) SCIP + LVA (Scaglioni 2023). Reverse lymphatic mapping with ICG / SPECT/CT (Pons / Dayan / Broyles).
- **[SAPL / Liposuction (Brorson)](docs/04-surgical-techniques/04e-genital-reconstruction/sapl-liposuction.mdx)** — Suction-Assisted Protein Lipectomy. Two-component (fluid vs solid) lymphedema model — the fibroadipose component is not reachable by CDT / LVA / VLNT. LAT pathobiology (Karaman multi-omics, Koc). Brorson dry-PAL protocol with circumferential 3–4 mm stab incisions, distal-to-proximal radial cannula passes, immediate compression before tourniquet release, lifelong compression with &gt; 40 mmHg (lower leg) / &gt; 20 mmHg (thigh) threshold pressures. Standalone outcomes across 8 series (85–117% excess-volume reduction). Chen 2025 meta-analysis (n = 2,334; 99.7% standalone vs 87.3% combined with LVA / VLNT). Brazio-Nguyen and Chen ISTL "3L" algorithms. AAPS Grade 1C. Limited role in genital lymphedema (anatomic / compression / fibrosis constraints push toward excisional + SCIP-LFT approaches).
- **[BLOOM (Sim)](docs/04-surgical-techniques/04e-genital-reconstruction/bloom-bariatric-vlnt.mdx)** — Bariatric Lymphedema One-Stage Operative Management. Single-stage laparoscopic sleeve gastrectomy + gastroepiploic VLNT repurposed from the resected greater-curvature specimen. Bidirectional obesity-lymphedema vicious cycle. Sim 2025 first case (BMI 35 + secondary LE LE). Gastroepiploic anatomy and station-4d LN distribution (Yoo). Single-case evidence; limitations include warm-ischemia time, pedicle-length feasibility from the resected specimen, LN viability vs intact harvest, and BMI ≥ 35 effects on VLNT efficacy.

### New vulvar atlas pages (retained)

- **[Vulvar Primary Closure](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar-primary-closure.mdx)** — indications by anatomy (anterior more mobile; posterior under-tension dehiscence risk), 2-0 chromic / Vicryl with layered SFS repair, Muallem n = 177 PC vs RS equivalent wound healing, Dutch multicenter n = 394 with 46.7% wound complications, ACOG obstetric vulvar-laceration practice, Larsen vulvar-abscess primary-closure variant.
- **[Vulvar Skin Graft (STSG / FTSG)](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar-skin-graft.mdx)** — consolidated row covering both STSG (scalp donor) and FTSG (groin donor). VIN / Paget skinning-vulvectomy indication, Lavoué QOL + occult-cancer-detection (31%), NPWT perineal adjunct evidence (Lee perineal-specific, Cao RCT, Lee meta-analysis: +8.3% take, OR 1.86 success, OR 0.31 reoperation), Toulouse positioning vs flaps.
- **[Genito-Crural Island Perforator Flap (GCIPF)](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar-gcipf.mdx)** — Toulouse-named technique unifying several historically related labiocrural-fold flaps. O'Dey 2010 cadaveric vascular foundation (aOAP present in 100% of specimens; 80% MC vs 20% SC; 1.3 cm-lateral-to-IPR landmark; ~7 × 15 cm sulcus genitofemoralis territory). Commenge 2025 series — n = 46 flaps, 0% total flap necrosis, 78.3% healing within 4 wk, median 4-d LOS, no adjuvant-RT delay. First-line in the Toulouse 2025 algorithm. Head-to-head with IPAP / DFAP / EPAP; Han 2023 vulvo-thigh-crease decision rule (IPAP 12.9% vs PAP-TUG 37.5% wound complications, p = 0.04).
- **[Foldès Clitoral Reconstruction](docs/04-surgical-techniques/04e-genital-reconstruction/foldes-clitoral-reconstruction.mdx)** — 95% of published FGM/C cases. Anatomic premise (deeper clitoral body and dorsal NVB remain intact beneath the scar). Six-step technique (scar excision → suspensory-ligament transection → NVB preservation → ≥ 5 mm neoglans → anti-retraction fixation → closure). O'Dey OD-preputial-flap / NMCS / aOAP complements. Foldès 2012 n = 2,938 with 51% orgasm at 1 y. Meremikwu 2026 SR / meta-analysis (OR 79.67 for pain / dyspareunia reduction). Almadori 2024 scoping (n = 7,274 with 94% improvement, 3% complication rate). AAP adolescent caveat. Wilson / Mañero / Manin adjuncts.
- **[Mañero Vaginal Mucosal Graft](docs/04-surgical-techniques/04e-genital-reconstruction/manero-vaginal-graft.mdx)** — Only published non-Foldès FGM/C clitorolabial-reconstruction technique. Free vaginal-mucosal graft for neoclitoral coverage + labial reconstruction. Mañero & Labanca 2018 n = 32 with FSFI 16 → 29 (p &lt; 0.001). Only non-Foldès technique in the Meremikwu 2026 SR.
- **[aOAP Flap](docs/04-surgical-techniques/04e-genital-reconstruction/aoap-flap.mdx)** — O'Dey anterior-obturator-artery-perforator flap. FGM/C vulvovestibular reconstruction (36% of O'Dey 2024 n = 119); refractory LSA last-resort with 87% of n = 61 receiving bilateral aOAP after skinning vulvectomy. O'Dey 2010 cadaveric foundation; three-technique FGM/C system (OD 85% + NMCS 82% + aOAP 36%). Single-surgeon evidence. Cross-linked to GCIPF (same vascular territory, oncologic application).
- **[Fat Grafting for FGM/C Vulvar Scars](docs/04-surgical-techniques/04e-genital-reconstruction/fgm-fat-grafting.mdx)** — Almadori 2025 first and only clinical application. Dual mechanism (mechanical rigottomy + biological ADSC-mediated ECM remodeling). Kang 2025 decorin-mediated TGF-β1 trapping. M2-macrophage / pro-regenerative immune shift, neoangiogenesis, PGP-9.5 neuropathic-pain reduction. n = 13 with VASS p &lt; 0.001, FGSIS p = 0.001, FSFI p = 0.019, HADS p = 0.002. VASS scale (Almadori 2020 — 6 aesthetic units, ICC 0.928–0.944). Supporting evidence (Krastev 45-study meta, Spiekman histology, Huang neuropathic pain). Minimally invasive, cost-effective, scalable to low-resource settings; potentially combinable with Foldès.

### Vulvar DB expansion + consolidation

- **Round 1 expansion** — added 9 missing flap rows: IGAP / MCFAP / EPAP / PAP-DFAP / vPMT propeller / TUG / TRAM / gluteal-fold / sigmoid; split the previously-combined Lotus Petal / Pudendal-Thigh / Singapore row into two distinct rows.
- **Round 1 indication-string tightening** — all 30 `bestFor` strings rewritten to one-line indications stripping series names / n-values / p-values / percentage outcomes; full operative detail remains on the linked foundations flap pages.
- **Round 2 consolidation** — after initially creating 9 dedicated vulvar atlas pages for the perforator family + V-Y + Limberg flaps, audit revealed that foundations pages (lotus-petal, singapore-pudendal-thigh, igap-gluteal-fold, epap, mcfap, v-y-advancement, rhomboid-limberg) already comprehensively cover the vulvar applications with named modifications and Höckel / Toulouse / Negosanti / Salgarello algorithm positioning. Collapsed 9 redundant atlas pages back to anchored foundations sections. Deleted the Sigmoid Colon Flap row.

### New foundations flap pages

- **[IPAP](docs/01-foundations/surgical-principles/flaps/ipap.mdx)** — promoted from a vulvar-specific atlas page to a foundations entity (IPAP applies across vulvar / vaginal / perineal-APR-ELAPE / anal / buttock-PIPAP / Fournier / penoscrotal / chronic-wound domains). Historical lineage (Yii 1996 → Hashimoto 2001 cadaveric → Jin 2009 microdissection → Hashimoto 2014 formal IPAP → Giroux 2021 no-imaging), perforator anatomy (3–5 perforators in the anogenital triangle, 27.3 mm from ischial tuberosity), Tham three-territory framework, sensate innervation, broad indication menu, propeller / V-Y / transposition design options with routine flap thinning, seven named variants (IPAT / PTO / bilobed / gull-wing / PIPAP / IPAP-propeller / Loreti rotation-island-propeller), outcomes across 12 series (0% total flap failures everywhere; 5.6% partial necrosis), Coltro 2015 sensibility-preservation study (all four modalities at 12 mo), head-to-head vs PAP/TUG (Han 2023: 12.9 vs 37.5 percent wound complications, p = 0.04), Coltro 2017 APR risk-factor analysis, Han 2023 vulvo-thigh-crease decision algorithm.
- **[TFL](docs/01-foundations/surgical-principles/flaps/tfl.mdx)** — Hill / Nahai 1978 origin → Hubmer 2009 perforator anatomy (mean 2.5 perforators per TFL; septocutaneous more constant and larger than musculocutaneous; 8–12 cm-from-ASIS hot spot) → Powers 2018 CTA → Gandolfi 2024 SCIA / IGA accessory-vascularization data → Bulstrode 2006 free-TFL n = 85 / 93% success. Gosain three-zone extended-flap model (distal skin paddle unreliable 8–10 cm above the knee). Nine named variants (standard MC / extended / V-Y / island V-Y FC / subcutaneous-pedicle / transverse / free perforator / pedicled perforator / free MFC). Clinical applications across trochanteric pressure sores / groin-post-LND / vulvar-perineal / head-and-neck / abdominal-wall / lower-limb domains. Höckel **first-choice for inguinal-region vulvar defects**. Nirmal 2011 prophylactic TFL reduces post-LND major flap necrosis from 75% → 17% after ilioinguinal dissection (p = 0.001).
- **[DIEP](docs/01-foundations/surgical-principles/flaps/diep.mdx)** — Conceptual evolution from TRAM / VRAM. Rozen 2010 in-vivo branching pattern classification (Type II bifurcating most favorable; Type III trifurcating most muscle dissection). Perforator anatomy (Ireton SR, El-Mrakby microdissection, Meyerov CTA, Bailey single-dominant-medial-row). Schaverien medial vs lateral row perforasome perfusion. SIEV-inferior thinning plane. Six named variants. The Ferron Toulouse pedicled-vertical-DIEP technique for circumferential neovagina after pelvic exenteration. Eight clinical outcomes series (including Qiu DIEP-vs-TRAM head-to-head and Pividori n = 34 multicenter with 3% major donor morbidity and 0% hernia). Four operative-efficiency benchmarks (Haddock-Teotia 54.8-min faculty, Feingold antegrade, Kim 2023 short-fasciotomy n = 304, Hivelin / Wittesaele minimally invasive). Negosanti **two-flap algorithm** — Type II vulvar + vaginal resection = pedicled DIEP first-line.
- **[TRAM](docs/01-foundations/surgical-principles/flaps/tram.mdx)** — Hartrampf 1982 birth, Moon-Taylor 1988 DSEA-DIEA anastomotic patterns (Type I 29% / II 57% / III 14%), Hartrampf-Hallock zone classification with the Holm 2006 zone-II-III swap (zone IV perfusion completely absent in 33%), MS-0/1/2/DIEP-MS-3 classification spectrum, pedicled-superior vs pedicled-inferior vs free configuration comparison, six vulvar / perineal / vaginal clinical series (Patsner-Hetzler n = 5 first inferiorly-based neovulvar TRAM, Pursell n = 22, Skene, Carlson, Bell, Soper VRAM-vs-TRAM), three vascular-enhancement procedures (Restifo-Erdmann delay → DSEA diameter 1.3 → 1.8 mm and flow 7.25 → 18.2 mL/min; Kajikawa supercharging; Semple turbocharging), Jeong meta-analysis (n = 3,968), Espinosa hernia / bulge meta, Knox 12-y DIEP-vs-pTRAM (21.2% vs 3.1% hernia; 5× adjusted odds), Man-Selber-Serletti free-TRAM-vs-DIEP meta, Wan mesh-effect (mesh reduces TRAM abdominal morbidity to DIEP-equivalent), Qiu n = 28 vaginal-reconstruction head-to-head (TRAM 62% vs DIEP 100% survival).

### VRAM page change

- Added a brief Transverse Rectus Abdominis Myocutaneous (TRAM) Variant cross-link subsection after the Free VRAM subsection.

### Misrouting audit fixes

| DB row | From | To |
|---|---|---|
| Labial flap (anterior / posterior-based) | `martius` (wrong scope — Martius is fibroadipose interposition) | `labia-majora-fasciocutaneous` (correct — axial-pattern fasciocutaneous) |
| Mons-pubis flap | `v-y-advancement` (wrong — mons pubis is SEPA axial-pattern) | `epap#the-external-pudendal-flap-family` (correct — Mayer SEPA pedicle flap is the EPA family's pre-perforator-era predecessor) |
| PAP / DFAP | `posterior-thigh` (Friedman-Reece is distinct from PAP) | `medial-thigh#profunda-artery-perforator-pap-flap` (medial-thigh has a dedicated PAP section) |
| IGAP | `igap-gluteal-fold` (whole page) | `igap-gluteal-fold#part-2--inferior-gluteal-artery-perforator-igap-flap` (anchor to the IGAP-specific Part 2) |
| TFL | `anterolateral-thigh` (wrong — TFL is a distinct LCFA-ascending-branch flap) | new `foundations/flaps/tfl` |
| DIEP × 2 (pedicled + free) | `vram` (no DIEP section) | new `foundations/flaps/diep` |
| TRAM | `vram` (no TRAM section initially) | new `foundations/flaps/tram` |

### Hybrid consolidation policy established

**Foundations flap pages are the canonical home** for vascular anatomy, surgical technique, donor-site morbidity, complication profiles, and cross-flap comparisons. **Per-region atlas pages are retained only when they carry substantial region-specific algorithm content, named-technique focus, or comparative-series data that does not fit cleanly into a foundations subsection.**

Retained vulvar atlas pages meeting the criterion:
- Toulouse-named GCIPF (Commenge 2025 single-center series, no foundations equivalent)
- FGM/C-specific Foldès / Mañero / aOAP / fat grafting (region-specific clinical applications)
- Vulvar Primary Closure (region-specific clinical practice with no foundations counterpart)
- Vulvar Skin Graft (consolidated STSG + FTSG with VIN / Paget skinning-vulvectomy + NPWT perineal evidence)

Retained scrotal-side lymphedema atlas pages (all named operations with substantial dedicated literature):
- 3R / SCIP-LFT, CHASCIP, Abdelfattah Complete Functional Lymphatic Pedicled Transfer, LYST, SAPL, BLOOM

Folded back to foundations (the perforator-flap family + V-Y / Limberg / sigmoid):
- IPAP, EPAP, MCFAP, Lotus Petal, Singapore / pudendal-thigh, Gluteal-Fold / sulcus, medial-thigh V-Y, gluteal V-Y, pubolabial V-Y, Limberg / rhomboid, sigmoid bowel flap

Verification: `npm run lint:links`, `npm run lint:citations`, `npm run typecheck`, `npm run build` all pass across 1,006 files.

---

## 2026-05-11 — 04e scrotal-reconstruction + genital-lymphedema overhaul

Comprehensive build-out of the scrotal-reconstruction atlas, full restructuring of the scrotal-reconstruction DB, broadening of the lymphedema clinical-conditions section from scrotal to genital scope, expansion of five foundations flap pages, addition of a male-cosmetic Scrotox row, and a new GUVCA atlas page mirrored across the scrotal and penile DBs. **28 commits**. Build clean across **988 files**.

### New 04e atlas pages

- **[Scrotal Primary Closure](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-primary-closure.mdx)** — anatomy, indications, layered closure, ten mobilization maneuvers (septum / dartos / gubernaculum / cord + orchidopexy / component separation / delayed primary closure / rapid intraop expansion / two-stage V-Y / superthin groin / thigh-pouch bridge), defect-size selection, outcomes vs STSG and flaps (cosmesis, spermatogenesis per Demir animal model, sexual function per Czymek, convalescence).
- **[Scrotal Skin Grafting (STSG / FTSG)](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-stsg.mdx)** — STSG vs FTSG selection, donor sites, recipient-bed hierarchy (tunica vaginalis vs dartos vs tunica albuginea), stepwise technique with orchidopexy, Konofaos two-stage wrap-around, NPWT bed-prep and −80 mmHg fixation (Cao RCT, Lee meta-analysis).
- **[Testicular Thigh Pouch](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-thigh-pouch.mdx)** — Okwudili temporary bridge with manual return, Staniorski definitive + fasciocutaneous flap, Mandel Hiawatha pseudocapsule neoscrotum, Berli salvage flap, technical pearls, spermatogenesis / thermoregulation physiology.
- **[Testicular Prosthesis](docs/04-surgical-techniques/04e-genital-reconstruction/testicular-prosthesis.mdx)** — 1941 Vitallium → 2002 Torosa → Rigicon Testi10™ (99.8% KM at 54 mo) history, saline vs silicone-gel head-to-head, indications including GAS neoscrotal augmentation, the 91% offer-rate counseling gap, Musi 2020 simultaneous-at-orchiectomy safety, Osemlak suprascrotal pediatric advantage, Besombes fixation evidence, emerging hormone-eluting / tissue-engineered designs.
- **[Scrotal Flap Reconstruction](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-flaps.mdx)** — consolidated 13-flap comparison linking each row to its foundations deep-dive; selection by clinical scenario (Fournier's per Alammar 2026, EMPD per Kim algorithm, HS, penile-shaft EPAP, lymphedema SCIP-LFT and VLNT).
- **[Genitourinary VCA](docs/surgical-techniques/04e-genital-reconstruction/genitourinary-vca.mdx)** — penile + total-penis-scrotum-lower-abdominal-wall VCA: 5-case global series, Johns Hopkins extended composite with bone-marrow-based immunomodulation → tacrolimus monotherapy at 3 yr, Baltimore Criteria 2023, Tuffaha perfusion-territory anatomy, Ruiz anterior-pubic-osteotomy model, Knoedler 2026 rejection SR, Sopko cavernous-physiology evidence, Caplan ethical framework, Cristofari trans-masculine GUVCA feasibility, VCA-vs-RFFF comparison.
- **[Modified Charles Procedure](docs/04-surgical-techniques/04e-genital-reconstruction/modified-charles-procedure.mdx)** — Sir Havelock Charles 1912 origin, FTSG-from-specimen vs STSG (Miller 1980 amputation warning), NPWT delayed-grafting modification (van der Walt ~100% take), CHAHOVA Charles + Homan's + VLNT, full urologic application with Singh / Modolin / Salako / Wisenbaugh / Torio-Padron data, four evolving combined excisional-physiologic alternatives.
- **[Debulking Scrotoplasty](docs/04-surgical-techniques/04e-genital-reconstruction/debulking-scrotoplasty.mdx)** — most common GL excisional approach (46.4% of GL surgeries, 10% complications per Guiotto SR), Torio-Padron integrated CDP model (6% revision), the &lt; 50%-diseased-skin threshold, etiology-stratified recurrence (50% MLL, 2% filarial, 9% giant scrotal), Wisenbaugh 1.3 → 7.7 QoL with weight-loss-plan requirement.
- **[Excision + Flap Reconstruction (GL)](docs/04-surgical-techniques/04e-genital-reconstruction/excision-flap-reconstruction-lymphedema.mdx)** — second-most-common (39.1%) but highest-complication (54.2%) GL surgery. Full flap catalog organized into local/perineal (Halperin perirectal-lymphatic-preserving, Yormuk U-shaped, Mendel bilateral scrotal for penile coverage), regional pedicled (pudendal-thigh, ALT with Guiotto composite + fascia lata, gracilis with Kayikçioğlu short variant, MCFAP, TFL lymphatic-absorption, IPAP propeller), and lymphatic flaps (SCIP-LFT, 3R).
- **[Complex Decongestive Therapy (CDT)](docs/04-surgical-techniques/04e-genital-reconstruction/complex-decongestive-therapy.mdx)** — 2024 ACS Lymphedema Summit consensus, four core pillars, two-phase model, Torio-Padron integrated perioperative concept (6% complication rate with no flaps/grafts needed), Lu MRL-guided treatment algorithm, adjuncts (IPC per Forner-Cordero non-inferiority RCT, NPCDs per 2026 AVF/AVLS position statement).
- **[Lymphaticovenous Anastomosis (LVA)](docs/04-surgical-techniques/04e-genital-reconstruction/lymphaticovenous-anastomosis.mdx)** — Hara ultrasound + Yoshimatsu milestone-swirl Stage-III expansion, NECST classification, Rodriguez-Yamamoto 6-step technique, EEA / ESA / SEA configurations with Kwon SEA superiority, genital-specific techniques (Mukenge spermatic-cord LVA, Yamamoto multi-site LVA, Hara & Mihara GAL algorithm), Boccardo 5-yr patency data, Kang 2026 hemodynamic critique, **prophylactic LYMPHA** (Boccardo 15-yr 2.5% vs 45% LE incidence, Hinson 69% risk reduction meta-analysis) with explicit urologic translation to PLND.
- **[Vascularized Lymph Node Transfer (VLNT)](docs/04-surgical-techniques/04e-genital-reconstruction/vascularized-lymph-node-transfer.mdx)** — four mechanisms (Maruccia neolymphangiogenesis, HEV-mediated pump, immune restoration, hyaluronidase fibrosis reduction), six donor-site comparison, four genital-specific techniques (Ehrl free lateral-thoracic curative algorithm with 0% recurrence at 49 mo, Phan submental, SCIP-LFT/3R, Abdelfattah pedicled VLNT + LVA), reverse lymphatic mapping (Pons ICG, Broyles SPECT/CT), Hamdi 60%→18% seroma learning curve.

### New 04l (male cosmetic) atlas pages

- **[V-I Penoscrotal Reconfiguration (Bagnara)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/v-i-penoscrotal-reconfiguration.mdx)** — El-Koutby grading, flap-free V-incision + dartos-band release + I-closure protocol, Bagnara 2024 n=21 outcomes (0% complications, 0% redo, 81% Likert 4/5).
- **[Xu Longitudinal Penoplasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/xu-longitudinal-penoplasty.mdx)** — four-step protocol (degloving / longitudinal incision / tunica-to-dartos fixation / closure), Alter principle and cross-technique parallels (Casale, Yang, Borsellino), longitudinal-vs-Z-plasty trade-offs, Xu n=41 outcomes.
- **[Reduction Scrotoplasty + Z-Plasty (Combined)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/reduction-scrotoplasty-zplasty-combined.mdx)** — third Thomas & Navia pathway for coexistent laxity + webbing; integrated incision design with T-junction vascular-safety considerations; application variants (scrotal MLL in obesity per Machol, concurrent IPP per Miranda-Sousa).
- **[Scrotal BoNT/A Injection ("Scrotox")](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/scrotal-botox.mdx)** — off-label aesthetic dartos relaxation with Gibson 2002 pharmacology (α-1 noradrenergic, myosin-phosphatase-mediated thermosensitivity), four genital BoNT/A applications, Mehdizadeh 2026 off-label-aesthetic SR (94% satisfaction), Breikaa rat-fertility safety signal with required counseling.

### New 03g clinical-conditions pages

- **[Genital Lymphedema](docs/clinical-conditions/03g-genital-scrotal/genital-lymphedema.mdx)** — renamed from `scrotal-lymphedema.mdx` and broadened in scope. Epidemiology (filariasis, prostate / gynecologic / pediatric / OIL-MLL), full primary vs secondary etiology including Crohn's ano-genital granulomatosis, pathophysiology, ISL / GLS / Ehrl / Lu-MRL staging, full conservative management (CDT, PCDs, ketoprofen with Tian LTB₄ mechanism, immunomodulators, antifilarials, PATCH-trial penicillin prophylaxis), weight management with BLOOM, all excisional approaches, and the full physiologic-reconstruction spectrum (LVA / VLNT / Yamamoto 3R / Abdelfattah / Ciudad CHASCIP / Yoshimatsu LYST), with a synthesized stage-by-stage algorithm.
- **[Giant Penoscrotal Lymphedema](docs/clinical-conditions/03g-genital-scrotal/giant-penoscrotal-lymphedema.mdx)** — end-stage ISL III deep-dive: epidemiology, etiology, pathophysiology (Th1/Th17 filarial, Wolbachia, dartos hyperplasia in obesity MLL), histopathology with Stewart-Treves risk, five classification systems, clinical presentation with extreme resected-weight cases (up to 61 kg / 134 lbs), differential emphasizing sarcoma exclusion, imaging (US per ACR, ICG with Klein 2026 posterior-scrotum-drainage finding, MRL per Lu algorithm), full surgical spectrum, and the four physiologic-reconstruction pillars synthesized into an expertise-driven algorithm.

### Expanded existing 04l pages

- [Reduction Scrotoplasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/reduction-scrotoplasty.mdx) — vertical-midline stepwise operative protocol, Bal local-anesthesia evidence (100% success / 92% would repeat), Rezaee 2022 NSQIP risk-factor table (n=12,917, 4.1% 30-day event rate), CPT 55175/55180 coding.
- [Penoscrotal-Web Correction (Z-plasty)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/penoscrotal-web-correction.mdx) — Z-plasty geometry table (Roggendorf 1982 angle/lengthening/reorientation), stepwise operative protocol, variations including Chen & Song five-flap, Qiu 2019 flap-necrosis risk factors, CPT 55180.
- [V-Y Advancement Plasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/v-y-plasty-male.mdx) — broadened from male-cosmetic-only to **three-context** framework (dorsal penopubic SLD, ventral penoscrotal webbing, scrotal reconstruction); added Andrades 2005 geometric foundation, Rapp 2005 tissue-expanded V-Y scrotoplasty, Kim 2014 reverse Y-V for paraffin lipogranuloma.

### Expanded foundations flap pages

- [EPAP flap](docs/01-foundations/surgical-principles/flaps/epap.mdx) — full external-pudendal-artery anatomy (SEPA / DEPA / inferior EPA, Carrera three-territory model, Jin perineal perforators), three EPAP innovations over traditional scrotal flaps, the broader EPA family (STEPA cadaveric, SEPAP per Kim 2023, DEPAP per Kim 2025, Mayer 1991, Lee 2020 KDPIF keystone), penile-resurfacing comparison vs STSG / ALT / SCIP.
- [Posterior thigh flap](docs/01-foundations/surgical-principles/flaps/posterior-thigh.mdx) — Hurwitz / Achauer / Rubin / Windhofer / Friedman-Reece chronology, dual IGA-descending-branch + PFA-perforator anatomy with Pan-Taylor angiosomes, PFCN innervation, Friedman-Reece full outcome table (96.3% survival), Hurwitz bilateral-deepithelialized dead-space obliteration, six modifications (Ordenana WPGTPF, Chrelias G-PPF, Myers bilateral V-Y, Komuro U-shape, Li free third-perforator, Fukunaga venous-supercharged freestyle).
- [IGAP / SGAP / gluteal-fold flap](docs/01-foundations/surgical-principles/flaps/igap-gluteal-fold.mdx) — four-part disambiguation of SGAP (above piriformis) / IGAP (below piriformis) / gluteal-fold-and-infragluteal-perforator (direct cutaneous descending IGA, preserving the descending branch for future flaps) / gluteal turnover flap; Tuinder sc-GAP and Rad LSGAP variants; Gould n=194 IGAP 0% loss; Benedict IGAP-vs-VRAM equivalence; Johal V-IGAP 70% return to sexual activity; **BIOPEX-2 RCT** showing reduced presacral abscess (22% → 9%, p=0.02) for gluteal turnover flap.
- [MCFAP flap](docs/01-foundations/surgical-principles/flaps/mcfap.mdx) — nomenclature disambiguation (MCFAP vs gracilis perforator vs upper-medial-thigh freestyle vs TMG/TUG), full MCFA + gracilis-pedicle anatomy (Tomaszewski 4,351-limb meta-analysis, Peek 43-cadaver perforator data with the constant intramuscular anastomosis extending the flap to 27 cm), three operative variants, six clinical applications, MCFAP-vs-TMG-vs-PAP head-to-head with Borrelli SR (PAP 0.6% vs TUG 5.0% vascular complications), combined/chimeric configurations (Ciudad TUGPAP, Sharp PAP+bilateral gracilis, Weinstein bilobed gracilis).
- [Island groin flap (SCIA-axial)](docs/01-foundations/surgical-principles/flaps/island-groin.mdx) — McGregor & Jackson 1972 axial-pattern introduction → Daniel & Taylor 1973 first-ever microsurgical free transfer → Koshima 2004 SCIP refinement → Goh & Hong 2015 "thinnest available" 210-flap series; full SCIA anatomy with Yoshimatsu deep-branch / transverse-branch landmark; Sahai & Singh 30-yr scrotal protocol; composite / chimeric configurations (osteocutaneous, Chao C-C/M-C/O-C, Yamamoto quadruple-component, SCIP+SIEA/DIEP); Scaglioni 2023 SCIP+LVA novel lymph-flow-through technique.

### New foundations flap stubs

Added five **stub pages** for flaps referenced in the scrotal-reconstruction literature but missing from the foundations catalog (later expanded above): [island-groin](docs/01-foundations/surgical-principles/flaps/island-groin.mdx), [MCFAP](docs/01-foundations/surgical-principles/flaps/mcfap.mdx), [IGAP / gluteal-fold](docs/01-foundations/surgical-principles/flaps/igap-gluteal-fold.mdx), [posterior thigh](docs/01-foundations/surgical-principles/flaps/posterior-thigh.mdx), [EPAP](docs/01-foundations/surgical-principles/flaps/epap.mdx). All five indexed in [flaps-gu-reconstruction.mdx](docs/01-foundations/surgical-principles/flaps-gu-reconstruction.mdx).

### Scrotal-reconstruction DB restructuring

The scrotal-reconstruction DB was substantially restructured:

- **Renamed column** "Indications" → "Best for / indications" on scrotal-primary-closure page (alignment with site-wide standardization).
- **Skin grafting** — two rows (STSG, FTSG) collapsed to a single "Scrotal Skin Grafting (STSG / FTSG)" row.
- **Thigh pouch** — two rows (temporary, definitive) collapsed to a single row covering all three paradigms (Okwudili, Staniorski, Hiawatha).
- **Aesthetic procedures** — all four aesthetic rows (reduction scrotoplasty, penoscrotal-web Z-plasty, Bagnara V-I, Borsellino raphe) **moved from scrotal DB to male cosmetic DB**; Aesthetic badge color removed from scrotal DB.
- **Duplicate Penoscrotal-Web Z-Plasty** dropped from Surgical Lengthening (canonical Scrotal Aesthetic version retained).
- **Flap reconstruction** — eight flap rows (6 Pedicled Flap + 2 Lymphatic Flap) collapsed to a single "Scrotal Flap Reconstruction (all flap families)" row under a unified Flap Reconstruction domain.
- **NPWT row** removed (the technique is covered in the scrotal-reconstruction hub and foundations wound-healing-adjuncts page).
- **Testicular prosthesis** — four rows (saline, silicone, intravaginal at orchiectomy, pediatric) collapsed to a single row.
- **New Lymphedema Surgery domain** added with **10 rows**: CDT, LVA, VLNT, modified Charles, SCIP-LFT/3R, CHASCIP, Abdelfattah complete functional lymphatic-system transfer, LYST, SAPL, BLOOM.
- **Combined / Salvage** — Ehrl giant penoscrotal lymphedema row renamed and re-pointed to the new giant-penoscrotal-lymphedema page; VCA row re-pointed to the new genitourinary-vca page.

### Penile DB additions

- Added Genitourinary VCA row under Staged / Salvage so both treatment databases surface the GUVCA option.

### Male cosmetic DB additions

- Bagnara V-I, Borsellino raphe, Reduction Scrotoplasty + Z-Plasty (combined), Scrotal BoNT/A ("Scrotox"), Xu longitudinal-incision-with-penoscrotal-angle-reconstruction rows added under Scrotal Aesthetic.

### Verification

`npm run lint:links` clean across **988 files**; `npm run build` clean; `npm run typecheck` clean.

---

## 2026-05-10 — 04e penile-reconstruction atlas overhaul + site-wide best-for standardization

Major 04e build-out (~ 25 new dedicated atlas pages), completing the hub-and-spoke fistula expansion for the remaining 04h both-genders types, and standardizing the `bestFor` / "Best for / indication" column across 11 additional treatment databases. Build clean across **967 files** (`npm run lint:links`, `npm run typecheck`, `npm run build` all pass).

### 04h both-genders fistula hub-and-spoke expansion

- **[Vesicocutaneous Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/both-genders/vesicocutaneous.mdx)** — three-stage framework (conservative catheter / VAC / transurethral cystorrhaphy / percutaneous catheter management → fistulectomy + multilayer closure → tissue interposition with omental, VRAM, rectus femoris, gracilis, perivesical fat, latissimus + serratus free flap), pelvic-fracture EBR special considerations, radiation-induced (Zhang 75% vs 10.8% irradiated failure), neurogenic-bladder (Raup 81% diversion), Watanabe sunitinib withdrawal closure.
- **[Post-Kidney-Transplant Urinary Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/both-genders/post-kidney-transplant.mdx)** — three-stage framework (acute stabilization → PCN ± antegrade stent with the **Goldstein 87% vs 13% failure-rate datum** / 8 Fr ureteral catheter / Foley alone → definitive surgery), full technique catalog (re-UNC, native UU / PU with robotic data, Boari flap ± psoas hitch with Boonjindasup / Kroczak / Pike data, direct pyelovesicostomy, pyelo-pyelostomy salvage, pedicled omental wrap for recurrent fistulae, ileal conduit, transplant nephrectomy), outcomes-summary table, special considerations (nephrostomy-first, immunosuppression management, sepsis damage control, conduit ladder).
- **[Ureteroarterial Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureteroarterial.mdx)** — three-stage framework (stabilization with stent-in-situ tamponade → endovascular covered stent-graft ± IIA exclusion ± coil embolization → open arterial ligation + extra-anatomic bypass for contamination / infection / failed endo / pre-existing graft), hybrid approach, post-repair urologic management (PCN, stent removal, ligation, nephrectomy), special considerations (ileal conduit 14.3% graft infection, prior aortoiliac, metallic stent risk, long-term surveillance), outcomes-comparison table.
- **Both-genders DB** — all eight rows collapsed to single-line indication strings (pyeloenteric, nephropleural, ureterocolonic, colovesical / enterovesical, vesicocutaneous, post-transplant, ureteroarterial, fecal diversion).

### 04e penile reconstruction — major atlas build-out

#### Integrated workflow

- **[Buried Penis Repair](docs/04-surgical-techniques/04e-genital-reconstruction/buried-penis-repair.mdx)** — fully written from stub. PAS-axis-driven decision framework, six repair components (penile liberation + degloving, escutcheonectomy, skin resurfacing options, scrotoplasty, panniculectomy, staged Kulkarni urethroplasty for concurrent stricture), escutcheon-harvested STSG and FTSG techniques (Strother / Kovell, Monn / Mellon), bolster fixation (standard, Rook eggcrate-foam, fibrin sealant), STSG-vs-FTSG comparative outcomes (Gül 2026), outpatient vs inpatient pathways, full outcomes table, complications, preoperative optimization (BMI 12.7×, MFI 6.4×), brief pediatric section.

#### New dedicated component atlas pages

- **[Panniculectomy](docs/04-surgical-techniques/04e-genital-reconstruction/panniculectomy.mdx)** — four urologic indications (AABP PAS-A2, kidney transplant facilitation, SUI improvement, urostomy revision), three incision patterns (traditional transverse, fleur-de-lis, Figler modified trapezoid), operative steps, ciNPT wound management, complications, BMI / frailty / pannus-weight risk factors, LRT-PAN two-team choreography (Ngaage), CPT 15830 coding.
- **[Escutcheonectomy](docs/04-surgical-techniques/04e-genital-reconstruction/escutcheonectomy.mdx)** — anatomy vs panniculectomy distinction, PAS axis P driver, transverse curvilinear / modified-trapezoid incision, **anchoring fixation to rectus fascia / pubic periosteum**, dual role as STSG / FTSG donor, Baumgarten 2019 IPP-concurrent application, "why isolated escutcheonectomy fails" framing.
- **[Penile Skin Grafting](docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-grafting.mdx)** — cross-cutting workhorse covering STSG vs FTSG, donor-site options (thigh / escutcheon / pannus), harvest, mesh-vs-sheet, **on-stretch / pharmacologic-erection application** (Iblher PGE1 + tadalafil), four bolster techniques (traditional / Rook eggcrate-foam / NPWT with Lee 2025 + 8.3% take meta-analysis / TODGA / fibrin), indication catalog (AABP, Fournier's, lymphedema, glansectomy, HS, foreign-body granuloma, trauma), contracture management, outcomes from Plamadeala n = 204 + 3 cm length gain.
- **[Primary Closure ± Z-Plasty](docs/04-surgical-techniques/04e-genital-reconstruction/penile-primary-closure.mdx)** — on-stretch rationale, indications (Santucci Stage 1, concealed penis, penoscrotal webbing, chordee, hypospadias revision), Tausch decision algorithm (primary → Byar's → STSG), Alter / Ehrlich subdermis-to-tunica-albuginea anchoring as the dominant durability predictor, Z-plasty variants (penoscrotal, lateral, serial, double-opposing, Mokhless lengthening), Álvarez Vega 2025 100-patient outcomes (98% primary healing).

#### Scrotal-flap shaft techniques (each as its own dedicated page)

- **[Bipedicled Anterior Scrotal Flap (Fakin)](docs/04-surgical-techniques/04e-genital-reconstruction/bipedicled-anterior-scrotal-flap.mdx)** — n = 43 siliconoma cohort, 100% flap survival, 4.37 / 5 satisfaction.
- **[Modified Bipedicle Scrotal Tunnel Flap (Murányi)](docs/04-surgical-techniques/04e-genital-reconstruction/muranyi-scrotal-tunnel-flap.mdx)** — n = 49, two defining innovations (subcutaneous tunnel pull-through + inverted-V ventral closure replacing the necrosis-prone T-junction), Clavien-Dindo breakdown.
- **[Modified Bilateral Butterfly Scrotal Flap (Yao)](docs/04-surgical-techniques/04e-genital-reconstruction/yao-butterfly-scrotal-flap.mdx)** — only series with documented significant penile-length gain (n = 7, p < 0.05); dual independent anterior-scrotal-artery pedicles; end-to-end ventral midline avoids T-junction.
- **[Staged Bipedicled Scrotal Flap (Pribaz / McLaughlin)](docs/04-surgical-techniques/04e-genital-reconstruction/staged-scrotal-flap.mdx)** — two-stage burial-then-unburial; defining indication is contaminated / actively infected wound; Lumbiganon 83.3% complication-free two-stage vs 43.5% single-stage; Zucchi variant n = 10 median VAS 97 / 100.
- **[Ventral Slit Scrotal Flap (VSSF, Westerman / Tausch)](docs/04-surgical-techniques/04e-genital-reconstruction/ventral-slit-scrotal-flap.mdx)** — only AABP technique with 100% same-day discharge and 0% perioperative complications; Pariser Category I; **20% recurrence vs 3.9% in escutcheonectomy + STSG** counsels patients on the trade-off.
- **[Total Anterior Scrotal Flap (Zhao)](docs/04-surgical-techniques/04e-genital-reconstruction/total-anterior-scrotal-flap.mdx)** — only scrotal-flap technique integrating suspensory-ligament division with maximal-area coverage; triple-territory (bilateral anterior + central posterior) vascular supply; **100% deep and superficial sensation recovery** at mean 2.3-y follow-up.
- **[Reverse Bilateral Anterior Scrotal Artery Flap (Gao)](docs/04-surgical-techniques/04e-genital-reconstruction/reverse-anterior-scrotal-flap.mdx)** — only published reverse-flow scrotal flap; defining narrow indication is compromised proximal scrotal-root pedicle; Tanaka / Tajima all-or-nothing venous outflow; Torii venous-drainage mechanisms; Dhar delay-phenomenon choke-vessel conversion; single 10-y complication-free case.
- **[Sensate EPAP Hemi-Scrotal Flap (Tsukuura)](docs/04-surgical-techniques/04e-genital-reconstruction/epap-hemi-scrotal-flap.mdx)** — first true perforator-flap principles applied to scrotal penile reconstruction (perforator isolation + named anterior-scrotal-nerve preservation); single-hemiscrotum harvest with septum preservation; eliminates dyspareunia / stretching of fasciocutaneous-pedicle designs.

#### Tissue substitutes consolidation

- **[Penile Grafting With Tissue Substitutes](docs/04-surgical-techniques/04e-genital-reconstruction/penile-tissue-substitutes.mdx)** — single page consolidating Integra (Liguori, Jaskille, Ludolph, Valdatta, Payne), Matriderm (**Crane 2026 n = 36, 92.1% take — largest substrate evidence**; Kang Flex + NPWT), AlloDerm / Epiflex / porcine pericardium, tissue expanders (Harris, Kajbafzadeh, Mir-Hanna, Mathews), NPWT meta-analytic + Iblher penile data, Falcone RAFFF forearm donor-site comparative table, emerging substrates (amniotic, SIS-ECM, fish skin, ovine forestomach), comprehensive comparison + decision algorithm. Four redundant DB rows consolidated.

#### Glans / penile cancer

- **[Glans Resurfacing](docs/04-surgical-techniques/04e-genital-reconstruction/glans-resurfacing.mdx)** — fully built from stub. Three variants (TGR / PGR / CSGR); NCCN / EAU-ASCO 2023 strong recommendation; 20% occult-invasion-detection rationale; full 11-step technique with **TODGA vs quilting**; Elst 2025 multicenter n = 550 → 5-y CSS 99% despite 29% local recurrence; Falcone comparative IIEF-15 −6% vs WLE −23% vs glansectomy −24%; OMG section folded in (Albaghdady fenestrated, Pandey multi-indication, Beamer buccal belt, Favre dorsal onlay; Barbagli donor-site morbidity; OMG vs STSG comparison; LS-specific Kulkarni rationale; emerging tissue-engineered / EV / organoid directions).
- **[Glansectomy With STSG](docs/04-surgical-techniques/04e-genital-reconstruction/glansectomy-stsg.mdx)** — invasive cT1–T2 SCC confined to glans; standard-vs-salvage plane (over vs under Buck's, corporal-apex transection); FSE accuracy (Yunis 95.4%); Parnham n = 177, Tang n = 410, Pang 2026 SR n = 327 outcome tables; Roussel-vs-Elst debate on local-recurrence impact on survival; comparative IIEF-15 24% decline vs glans resurfacing 6%.
- **[Glanuloplasty With Flaps (umbrella)](docs/04-surgical-techniques/04e-genital-reconstruction/glanuloplasty-flaps.mdx)** + four split technique pages:
  - **[Inverted Urethral Flap (Belinky / Chavarriaga)](docs/04-surgical-techniques/04e-genital-reconstruction/inverted-urethral-flap.mdx)** — Chavarriaga n = 74, 6-y OS 86.5% / RFS 90.5%, IIEF-5 17.3, ICIQ-MLUTS 1.7, EQ-5D-3L 84.6%; 0% meatal stenosis vs 8.1% STSG; AJCC 8th-edition staging note; NCCN-vs-EAU-ASCO surveillance comparison.
  - **[Gulino Everted Urethral Flap](docs/04-surgical-techniques/04e-genital-reconstruction/gulino-everted-urethral-flap.mdx)** — n = 14; **100% thermal + tactile sensation** (best documented of any neoglans technique); eversion-vs-inversion distinction producing 0% vs 10% ventral curvature.
  - **[Scrotal Flap Glanuloplasty (Mazza / Cheliz)](docs/04-surgical-techniques/04e-genital-reconstruction/mazza-scrotal-flap-glanuloplasty.mdx)** — n = 34, mean 73.2 mo (longest follow-up of any neoglans series); **0% retraction** but 20.5% potency and 17.6% depilation; Gil-Vernet depilation protocol; modern single-stage / sensate alternatives.
  - **[Rectus Abdominis Myofascial Neoglans (Shaeer)](docs/04-surgical-techniques/04e-genital-reconstruction/shaeer-rectus-myofascial-neoglans.mdx)** — only neoglans technique using muscle / fascia rather than epithelial tissue; DIEA pedicle; corona built from muscle bulk by tucking; phalloplasty-tip / prosthesis-support context.

#### Trauma / replantation

- **[Microsurgical Penile / Glans Replantation](docs/04-surgical-techniques/04e-genital-reconstruction/penile-replantation.mdx)** — ACS 2025 Best Practices (two-bag preservation, 8 h glans / 16 h complete-penis viability, urgent microsurgical transfer); Wang / Luo 9-step protocol with optional IEPA repair (Lohasammakul) to prevent shaft skin necrosis; microscopic glans replantation (Jin JoVE); microsurgical-vs-macroscopic outcomes; Ching bipedicled-scrotal-flap salvage; leech (Banihani / Mousa / Mineo) and HBO (Landström / Zhong) adjuncts; van der Merwe penile allotransplant alternative. New **"Trauma / Replantation"** domain badge added to the 04e penile DB; "Penile / Glans Amputation" cross-link section added to [Genitoscrotal Trauma](docs/special-populations/05a-trauma-emergencies/genital-scrotal-trauma.mdx).

#### 04e penile DB consolidation

- Renamed the umbrella buried-penis row → **"Buried Penis Repair (overview)"**
- Deleted "Escutcheon-Derived FTSG for AABP + LS" (covered in escutcheonectomy + skin-grafting pages)
- Deleted standalone "STSG — Penile Shaft" and "FTSG — Penile Shaft" rows (superseded by unified Penile Skin Grafting row)
- Consolidated four tissue-substitute rows into single Penile Grafting With Tissue Substitutes row
- Consolidated two Bipedicled Anterior Scrotal Flap rows (general + siliconoma indication) into single Fakin row
- Deleted Wide Local Excision shaft tumor, Meatoplasty / Meatotomy Adjunct, Staged Skin Replacement after LS, Adjacent-Tissue Transfer / Advancement Flaps rows
- Removed orphaned "Tissue Expansion" badge color

### Site-wide DB best-for column standardization

Added concise one-line `bestFor` / "Best for / indication" indication strings across **11 additional treatment databases** (continuing the pattern established in the 04h fistula DBs):

| DB | Rows | Notes |
|---|---|---|
| 04b bladder-reconstruction | 18 | `notes` → `bestFor` |
| 04i tissue-transfer | (header rename) | existing Indication column |
| 04e penile | 23 | `notes` → `bestFor` |
| 04e vulvar | 30 | `notes` → `bestFor` |
| 04e scrotal | 24 | `notes` → `bestFor` |
| 04k feminizing GAS | 17 | `notes` → `bestFor` |
| 04k masculinizing GAS | 23 | `notes` → `bestFor` |
| 04k non-binary / nullification | 10 | `notes` → `bestFor` |
| 04l male-cosmetic | 16 | Rows lacked indication column; added |
| 04j ED | 13 | Indication column added alongside existing Tier / Invasiveness |
| 04j priapism | 10 | Role column repurposed as Best for / indication |

**Excluded by design** (per project rule that taxonomic catalogs do not need an indication column): 04m BPH / LUTS (technique-vs-flow comparison), foundations tool / instruments, foundations tool / biomaterials, and foundations / pharmacology indices.

### Verification

`npm run lint:links` — 967 files, 0 broken `/docs/` links.
`npm run typecheck` — passes.
`npm run build` — passes.

---

## 2026-05-09 (third pass) — 04h fistula repair atlas overhaul + foundations HBOT

Major restructuring session: collapsed redundant DB rows, built dedicated atlas pages for the major RUF / RVF techniques, consolidated cross-cutting topics, and added a comprehensive HBOT page in foundations.

### Female fistula DB consolidation

- **VVF / VUF / UretVF / UVF rows simplified.** Renamed `notes` → `bestFor` column ("Best for / indication") with concise indication strings. Beefed up Management section on [Ureterovaginal Fistula clinical page](docs/03-clinical-conditions/03f-fistulas/in-females/ureterovaginal.mdx) (Approach Selection table + Postoperative care subsection) and collapsed five UretVF rows to one row pointing at `#management`. Collapsed four VUF rows to a single "Vesicouterine Fistula Repair" row pointing at the existing comprehensive clinical page. Collapsed UVF row name to "Urethrovaginal Fistula Repair," with new dedicated [UVF Repair atlas page](docs/04-surgical-techniques/04h-fistula-repair/female/urethrovaginal-fistula-repair.mdx) covering eight surgical techniques.

### RVF — new dedicated atlas pages

- **[ERAF ± Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/eraf.mdx)** — full ASCRS framework, technique with optional de Parades muscular plication, when / how to add overlapping sphincteroplasty (Khanduja 1999 100% stool/flatus elimination, 70% perfect continence), Sonoda / Jones / de Parades / Corte / Li 2025 outcomes. Two ERAF rows merged.
- **[Episioproctotomy](docs/04-surgical-techniques/04h-fistula-repair/female/episioproctotomy.mdx)** — definition (conversion to fourth-degree laceration + layered repair), 10-step technique, Hull 2007/2011 + El-Gazzaz + Rahman outcomes (78–100%, 50%→8% incontinence reduction, 92% near-perfect continence, superior fecal/sexual function vs ERAF), cloaca subgroup 100%.
- **[Nonoperative RVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/nonoperative-rvf-management.mdx)** — ASCRS 2022 + AGA + ACG 2025 framework: conservative wound care (52–66% obstetric closure), draining seton, Crohn's medical therapy (infliximab ACCENT II, ada/usteki/vedo, immunomodulators, calcineurin as last resort, seton + biologic 46% vs 13%), fecal diversion, fibrin glue / plug not recommended, vaginal-estrogen and microbiome adjuncts. Four RVF rows merged.
- **[Transabdominal RVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/transabdominal-rvf-repair.mdx)** — five techniques (resection + coloanal anastomosis, DCAA / Turnbull-Cutait, sleeve excision, lap omentoplasty, APR), Corte 2015 multivariate predictors (major procedure OR 6.4, diverting stoma OR 3.5, early surgery OR 2.3), full APR section (indications, technique with myocutaneous-flap closure for irradiated fields, 30–38% perineal-wound rate post-XRT, Zhong 2017 QoL, AGA shared-decision-making, Zelga radiation, Sapci Crohn's). Two transabdominal rows merged.
- **[Anal Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/anal-sphincteroplasty.mdx)** — placed in fistula section per request; full overlapping technique, end-to-end vs overlap evidence, short → very-long-term continence trajectory (85% → 10–14% at 5 yr → near baseline at 18 yr), sphincteroplasty-vs-SNM data (Emile 2025; 7-fold US volume drop 2009–2015).
- **Obstetric domain rows deleted** from the female fistula DB (same operative ladder as VVF — kept clinical-conditions obstetric page).

### Male fistula DB — dedicated RUF atlas pages

- **[Transperineal Gracilis for RUF](docs/04-surgical-techniques/04h-fistula-repair/male/transperineal-gracilis-ruf.mdx)** — gold-standard: rationale (Park 2022 8% vs 50% recurrence), 7-step technique, Sbizzera / Vanni / Ghoniem / Wexner / Guo / Park outcomes, Garoufalia 2023 meta-analysis 79.4%, radiation impact (~100% non-radiated → ~84% radiated, 31% permanent diversion), satisfaction 9/10, Khouri 2024 87% concurrent posterior urethroplasty.
- **[ERAF for RUF](docs/04-surgical-techniques/04h-fistula-repair/male/eraf-ruf.mdx)** — kept separate from RVF ERAF page (different anatomic position, etiology, sphincter-vs-urethral comparator): high-pressure-side principle, transanal step-by-step, al-Ali 1997 posterior transsphincteric variant (100%, 11/11), Garofalo / Joshi / Dreznik / Keller outcomes, head-to-head vs gracilis.
- **[York-Mason Repair](docs/04-surgical-techniques/04h-fistula-repair/male/york-mason.mdx)** — Mason 1970 history, Utah 40-yr Middleton/Renschler/Hadley experience, 8-step technique with color-coded sphincter-layer marking sutures, three modifications (gluteal fat graft McKibben 94%, dartos flap Dafnis 2024 100% at 70 mo, modified Montsouris), aggregate **0% fecal incontinence and 0% anal stenosis** despite deliberate sphincter division.
- **[Conservative Management of RUF](docs/04-surgical-techniques/04h-fistula-repair/male/conservative-ruf-management.mdx)** — Thomas 2010 fecaluria-driven algorithm, Keller 2015 algorithm, Roberts 87.5–100% prevention via intraoperative recognition + 2-layer repair + omental, fibrin sealant / fulguration / HBOT adjuncts (Marguet 0/4 standalone failure for radiated RUF), Venkatesan long-term-without-repair, permanent dual diversion as definitive management (Linder 86%/93%, Martins "legitimate primary option, not a failure"). Two conservative rows merged.
- **[Robotic Transabdominal RUF / RVF Repair](docs/04-surgical-techniques/04h-fistula-repair/male/robotic-transabdominal-ruf-rvf.mdx)** — shared atlas covering both fistula types (same operation, urinary closure differs): salvage prostatectomy section, four interposition options including Hwang 2023 perivesical fat, three technical variants, Medina 2022 / Sayegh 2023 / Gözen / Sotelo / Mundy & Andrich outcomes. Both DB rows repointed.

### Cross-cutting shared pages

- **[Transanal Minimally Invasive Repair (RVF / RUF)](docs/04-surgical-techniques/04h-fistula-repair/transanal-minimally-invasive-repair.mdx)** — shared 04h-root page covering MITAR / TAMIS / R-TAMIS / TEM / TEO with the comparative table that's the value (MITAR 100% RUF, TEM 92% RVF, TEO/TEM 25% RUF Serra-Aracil cautionary note). Embedded R-TAMIS RUF operative video paralleling Hebert 2021. Female and male DB rows repointed.
- **[Fecal Diversion](docs/04-surgical-techniques/04h-fistula-repair/fecal-diversion.mdx)** — shared atlas covering RVF / RUF / entero-urinary / Fournier's / refractory FI; loop ileostomy vs colostomy vs end colostomy vs Flexi-Seal trade-offs (Arndt 2026 OR 3.15 readmission, dehydration 60% vs 11%). New row added to female / male / both-genders DBs.

### Both-Genders DB collapse

- Collapsed the 26-row both-genders DB to **8 type-level rows** (Pyeloenteric, Nephropleural, Ureterocolonic, Colovesical/Enterovesical, Vesicocutaneous, Post-Kidney-Transplant, Ureteroarterial + Fecal Diversion). Each row's `bestFor` summarizes the full first-line / definitive / salvage ladder and links to the dedicated treatment article.

### Foundations — new HBOT atlas page

- **[Hyperbaric Oxygen Therapy](docs/01-foundations/surgical-principles/hyperbaric-oxygen-therapy.mdx)** — comprehensive foundations atlas covering mechanism (Henry/Dalton/Fick, Marx 8–9× neoangiogenesis, HIF-1 stabilization), standard protocols, and ten applications: radiation hemorrhagic cystitis (RICH-ART Level 1, 5-yr follow-up — 55% complete remission, 37% lower healthcare cost, 53% lower mortality), Fournier's gangrene (Toppen 2024 78% mortality reduction), complex fistula repair (Hammad 2026 — recurrence 5.9% vs 26.5% after stoma reversal), hypospadias reoperations (Bush & Snodgrass — graft failure 6% vs 28%), radiation-induced vaginal injury (Möring 2025 79% responders), IC/BPS (van Ophoven), ED (Hadanny positive non-surgical / Chiles negative post-RP RCT), radiation proctitis (ASCRS 1B; HOT2 negative), preoperative tissue conditioning (Boet 2020 SR), mesh complications. Adverse-effect table, contraindications, cancer-safety data, cost analysis, evidence-hierarchy summary, key takeaways. Wound-healing-adjuncts page tightened with summary + cross-link.

Verification: `npm run lint:links` passes (936 files); `npm run typecheck` passes; `npm run build` passes.

---

## 2026-05-09 — Style cleanup after site audit

### Style / hygiene

- **Removed disabled Docusaurus sample blog content.** Deleted the stock demo blog posts, sample author/tag files, and plushie image. The blog plugin was already disabled in `docusaurus.config.ts`, so this removes dormant template content without changing site navigation.
- **Cleaned editorial placeholders.** Removed image-placeholder comments from [Lone Star Retractor System](docs/01-foundations/tools/instruments/retractors/lone-star.mdx) and [Turner-Warwick Ryder Needle Holder](docs/01-foundations/tools/instruments/needle-holders/turner-warwick-ryder.mdx); rewrote the conversational draft note in [Gelman Urethral Sound](docs/01-foundations/tools/instruments/sounds-bougies/gelman.mdx); changed the pharmacology index wording from "placeholder page" to "template page."
- **Neutralized strange / overemphatic wording.** Replaced nonessential uses of "dramatic," "extraordinary," and "breakthrough" with more clinical phrasing across anatomy, trauma, fistula, catheter, urinary diversion, bladder reconstruction, urethral flap, BNC/VUAS, incontinence, penile prosthesis, cosmetic genital surgery, and history pages. Legitimate medical terms and article/reference titles were preserved.

Verification: `npm run typecheck` passes; `npm run build` passes; `npm run lint:links` passes; `git diff --check` passes. Full `npm run lint` remains blocked by pre-existing citation/orphan findings from the audit.

---

## 2026-05-09 (later) — 04h Both-Genders Fistula treatment-atlas section + female redundancy cleanup

### 04h fistula repair

- **New "Both-Genders Fistula Repair" section.** Dedicated treatment-atlas section paralleling Female and Male — landing page [`both-genders-fistula.mdx`](docs/04-surgical-techniques/04h-fistula-repair/both-genders-fistula.mdx) with decision-framework table + GenericDatabase (27 techniques across 7 fistula types), plus seven dedicated technique pages under hidden `both-genders/` category: [Pyeloenteric](docs/04-surgical-techniques/04h-fistula-repair/both-genders/pyeloenteric.mdx), [Nephropleural](docs/04-surgical-techniques/04h-fistula-repair/both-genders/nephropleural.mdx), [Ureterocolonic](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureterocolonic.mdx), [Colovesical/Enterovesical](docs/04-surgical-techniques/04h-fistula-repair/both-genders/colovesical-enterovesical.mdx), [Vesicocutaneous](docs/04-surgical-techniques/04h-fistula-repair/both-genders/vesicocutaneous.mdx), [Post-Kidney-Transplant](docs/04-surgical-techniques/04h-fistula-repair/both-genders/post-kidney-transplant.mdx), [Ureteroarterial](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureteroarterial.mdx). 04h `index.mdx` updated to surface the new section under Decision Framework & Treatment Database.
- **Female fistula redundancy cleanup.** Deleted `female/robotic-vvf-repair.mdx` (a "platform overview" that duplicated the dedicated [O'Conor](docs/04-surgical-techniques/04h-fistula-repair/female/oconor-vvf-repair.mdx) and [Extravesical](docs/04-surgical-techniques/04h-fistula-repair/female/extravesical-vvf-repair.mdx) robotic atlas pages). Database row in [`female-fistula.mdx`](docs/04-surgical-techniques/04h-fistula-repair/female-fistula.mdx) and "See Also" link in [`vaginal-fistula-flaps.mdx`](docs/04-surgical-techniques/04h-fistula-repair/vaginal-fistula-flaps.mdx) removed.

Verification: `npm run lint:links` passes; `npm run typecheck` passes; `npm run build` passes.

---

## 2026-05-09 — Resources cleanup + 04b/04c/04d/04h fistula and channel build-out + robotics

### Resources

- **Cleanup.** Filler removed from resources index, podcasts, patient resources, textbooks, websites, hidden-curriculum index/overview (deleted RVU-anecdote, "no MBA" stance, the "If you can't quote your numbers, you can't lead" section). Reordered websites so Professional Societies appears first. Textbooks: every card converted to a clickable link surfacing the Springer / PDF source.
- **Site-wide admonition eradication.** Stripped every `:::tip / :::note / :::warning / :::info / :::caution` block across **123 files**; titles preserved as bolded inline lead.
- **Billing & Coding restructure.** Tabs (CPT / ICD-10 / Modifiers / External Resources). ~120 new codes covering upper-tract reconstruction, bladder reconstruction & diversion, BNC/VUAS, vaginal recon & GAS, hypospadias / penile reconstruction, BPH, mesh / IPP / congenital / gender-incongruence / trauma / recurrent UTI codes.

### Cosmetic / Podcasts

- 04l female cosmetic database → static markdown table with a "Best for / indication" column.
- Podcasts "Contributing" section deleted.

### 04b — Continent catheterizable channels

- Yang-Monti Channel (incl. Double Monti, Casale spiral, Tapered, sigmoid / gastric variants).
- Tubularized Bladder Flap (Casale/Rink, Peard intussusception, Yachia rectus-strands, Stief-Becker Lich-Gregoir, Klauber-Cendron, Casella-Ost hybrid).
- Hemi-Kock Continent Stoma (mesentery stripping; Marlex-collar / metal-staple legacy → absorbable-Polysorb era; Herschorn 2022 n=109; valve-failure salvage).
- Indiana Augmentation Cystoplasty (IAC) — Khavari/Boone n=34, 100% continence at 31 mo; Redshaw cecocystoplasty vs tunneled-channel comparison (13% vs 50% secondary procedures).
- Cutaneous Vesicostomy (Blocksom + Lapides + permanent vesicostomy + bladder-neck-closure-with-continent-vesicostomy "last resort"; Benchekroun hydraulic-valve historical entry).
- 04b CCC principles page cross-linked to the new Parastomal Hernia page.

### 04c — Urinary diversion

- 04c diversion DB gained a "Best for / indication" column.
- New canonical Parastomal Hernia After Urinary Diversion page — conflicting prophylactic-mesh RCTs (Liedberg / PUBMIC / MSKCC), Tanaka oblique-passage technique (no mesh; PSH 19.6% → 3.5%), Sugarbaker / keyhole / sandwich / 3-D mesh repair, Maskal 2024 RCT (no significant difference at 2 yr), MIS-vs-open data, robotic-specific outcomes (Xu, Dewulf), continent-cutaneous-diversion PSH (Helal, Stout). Indexed from 04c and 04b.

### 04d — Upper-tract reconstruction

- Balloon Dilation (pooled 89%/54% data; length / vascular / multi-stricture failure predictors).
- Yang-Monti Ileal Ureter (Ali-El-Dein 2021 n=36; eGFR \<40 contraindication; double / triple Monti; onlay variant).
- Reconfigured Colon Ureteral Substitute (Pope/Koch 1996 → Lazica 2012 long-term; retroperitoneal access; safe in renal insufficiency / post-radiation).
- Pyelovesicostomy (Kennelly 1973 → Kim 2020 robotic; transplant + pelvic-ectopic-kidney indications; SPBG salvage).
- Simple (Benign) Nephrectomy (BAUS "benign nephrectomy" reframing; XGP / TB / ADPKD per KDIGO 2025; why benign is harder than radical).
- Transvaginal Ureteral Reimplantation (single-port robotic vNOTES; Kaouk SP, Hebert single-port, Laydner cadaver retroperitoneal NOTES, Crivellaro SARA).
- Existing UAS revision page un-hidden and expanded with hybrid Bricker/Wallace (Can 2024), Allium metallic stent (Gao 2021), expanded ICG-prevention section (63% decision-change rate, 61% perfusion discordance). 04c diversion principles cross-links to it.
- 04d DB `notes` column → `bestFor`. Deleted Lingual Mucosal Graft and solo Psoas Hitch rows.

### Foundations / robotics

- New vNOTES & Robotic vNOTES page covering platforms (da Vinci SP, Hominis), technique, indications, ACOG / RCOG guidance.

### 04h — Female fistula repair (full VVF atlas build-out)

Every row in the female-fistula database that previously slugged to the clinical-conditions page was renamed and repointed to a dedicated atlas page:

- Conservative VVF Management (replaces "Foley Catheter Drainage" — Bodner-Adler selection-bias caveat; Barone 2015 RCT 7-day non-inferiority).
- Endoscopic VVF Management (Bugbee fulguration, Ho:YAG laser, tissue adhesives, transurethral NOTES, transvesicoscopic, V-NOTES, lap / robotic / LESS).
- Transvaginal Latzko Repair (Latzko 1942 principle; Luo & Shen 100% in n=108 apical; Cardenas-Trowers separate fascial closure; Pushkar radiation-induced 48% primary / 80% cumulative).
- Transvaginal Sims-Simon Multilayered Closure (Sims 1845–49 / Simon 1860s–70s; Mörgeli & Tunn 2021 100% in 47 with median OR 40 min; Shaker RCT — no significant difference for trim vs no-trim).
- Martius Flap for VVF — VVF-specific page distinct from the foundations Martius. Rothenberger 2025 cadaveric mapping (right labium / lateral approach safer); Kapriniotis 2024 individualization; Lee 2013 long-term donor-site morbidity.
- O'Conor (Transabdominal Transvesical) VVF Repair — Nesrallah 100% (n=29); modified O'Conor (Dalela) 100% (n=26); Tavares 2026 robotic SR n=206 = 97% / 2.9% recurrence; transvesical-vs-extravesical equivalence.
- Extravesical Transabdominal VVF Repair — Miklos & Moore 1999 / 15-yr 98% without flap; statistically equivalent to transvesical (RR 0.98, 95% CI 0.94–1.02); modifications (LESS, rainbow-shaped peritoneal flap Yang 2025, Dayan-Schwartz 12-step, early extravesical Giusti).
- Robotic VVF Repair (platform overview) — ERUS 2020 consensus, Dayan-Schwartz 12-step extravesical (incl. post-oncologic chemo+immunotherapy patient), Sundaram-Hemal / Bora / Nóbrega / Occhino-Linder stepwise techniques, V-Loc barbed-suture practice, "one-stop" concurrent procedures (Boari, Burch, ureteral reimplant), complex/recurrent VVF data (Chandna n=33 = 93.9%).
- Vaginal Fistula — Interposition Flap Options umbrella catalog. Now also includes a dedicated **Native Vaginal-Wall Flaps** section (Shoukry rectangular reinforcement; Wang lateral transfer; Tang annular single-layer; Sayegh vaginal-cuff for robotic; Latzko-as-vaginal-flap), the **Labia Majora Fasciocutaneous flap** (vaginal-wall-deficit cases), the **Full-Thickness Martius graft with skin paddle** (large obstetric fistulae), and a full **Vaginal Advancement Flap (VAF) for RVF** section (VAF vs RAF — Ruffolo SR Crohn's data; Nosti +pedicled-flap zero-failure result; Li 2025 RAF; ASCRS 2022 guidance). Plus omental / rainbow peritoneal / sigmoid epiploicae / gracilis / VRAM / Singapore / TachoSil / SIS / PRP / amniotic / buccal. Flap-vs-no-flap controversy, flap-selection algorithm by clinical scenario, comparative summary.

Verification: `npm run lint:links` passes (~915 files); `npm run typecheck` passes; `npm run build` passes.

---

## 2026-05-08 — 04ab BNC/VUAS consolidation + 04b bladder-reconstruction build-out

- **04ab database consolidation:** collapsed three first-line VUAS endoscopic-incision rows (holmium / cold-knife / DVIU) into one TUIBNC row; deleted DVIU+MMC and DCB rows (DCB now under balloon dilation); deleted RBNR, Extraperitoneal Robotic, and Robotic Transperineal Urethral Advancement rows (subsumed by Primary Re-Anastomosis and Combined Abdominoperineal pages). Both BNC and VUAS databases switched from a long-form "Notes" column to a `bestFor` column ("Best for / indication") with concise indication strings. Removed Young-Dees-Leadbetter, Kropp, and Pippi-Salle outlet procedures and their pages.
- **New 04ab atlas pages:** TUITMR, Y-V Plasty (robotic + open), T-Plasty, Subtrigonal Inlay (BMG family), Tanagho Flap, Transvesical Approaches (RTV-BNR + TvRARP + Avallone subtrigonal), Primary Re-Anastomosis (open retropubic + open transperineal + robotic retropubic + robotic transvesical), Combined Abdominoperineal / Pull-Through (open + combined-robotic), Robotic Bladder Flap Posterior Urethroplasty (Zhao 2022), Salvage Prostatectomy reconstructive (moved from VUAS to BNC), BMG Endourethroplasty, focused Dorsal Onlay BMG for BNC/VUAS (Shahrour, with two operative videos).
- **VUAS algorithm:** added Lee 2025 robotic VUAS reconstruction algorithm (caliber + EUS involvement) attributed to Naser-Tavakolian and Lee, *Transl Androl Urol* 2025;14(8):2405–2418, doi:10.21037/tau-24-503.
- **04b bladder-reconstruction build-out:** dedicated pages for Ileocystoplasty, Ileocecocystoplasty (Mainz Pouch I + CCIC + hand-assist laparoscopic), Sigmoid Cystoplasty (Goodwin cup-patch + Hayashi 13.1-yr data + SCLU note), Autoaugmentation (Cartwright-Snow + Perovic rectus-backing + Lima nonsecretory + balloon-conformer + MacNeily-vs-Hansen durability debate), Ureterocystoplasty (Bellinger + Husmann selection + Gosalbez TUU + Kajbafzadeh teapot + Landau equivalence to ileum), Gastrocystoplasty (HDS, hypochloremic alkalosis, malignancy, current consensus against routine use), SCLU (Buson experimental + Gonzalez ALPP / intact-mucosa / no-CCC prerequisites + AUS synergy + hourglass mitigation), Ileovesicostomy (Schwartz/McGuire bladder-chimney + Leng dramatic complication reduction + 54% reoperation + Casale continent variant), Appendicovesicostomy / Mitrofanoff (gold-standard CCC + VQZ/VQ/VR/Kurzrock tip-preservation + adult-vs-pediatric outcomes + bladder-exstrophy 93% continence + split-appendix Mitrofanoff+MACE).
- **04c urinary diversion:** new Simple Cystectomy (benign disease) page under Complex / Salvage; new Supratrigonal Cystectomy page under 04b; both linked from IC/BPS.
- **Cross-database link audit:** added slugs to duplicate rows referring to suprapubic catheter, balloon dilation, indwelling catheter, Foley/Coudé/Council/Penrose so duplicates point at dedicated pages.
- **Instruments:** new Ski / J-Hook Needle page (operative video at 3:07); cross-linked from Dorsal Onlay BMG technique step.
- **Peyronie's-at-implant:** added Balzano *Can J Urol* 2022 curvature-direction algorithm and Brock 2006 intracorporeal-incision lineage to the IPP-with-adjunctive-straightening page; expanded TEP detail.

---

## 2026-05-07 — Prolapse atlas pilot + BNC build-outs

Heavy single-session arc on `main`. Three workstreams: prolapse pilot rollout (column shortening + pagination chain), prolapse procedure build-outs, and BNC endoscopic-treatment trio.

### Prolapse pilot — layout and pagination

- Database column shortening: header trimmed to **"Best For"**, every cell rewritten to a 15–25 word indication phrase, **Approach column removed**. The trailing column now sits much narrower.
- **Pagination chained in database row order** via `pagination_prev` / `pagination_next` frontmatter on every prolapse atlas page. Clicking Next at the bottom of any procedure page steps through the database in order, ignoring the apical / anterior / posterior-enterocele / obliterative-pessary subdir grouping. Order: Pessaries → Lifestyle → Anterior Colporrhaphy → Kelly → Paravaginal → Michigan Four-Wall → Posterior Colporrhaphy → Perineorrhaphy → SSLF → USLS → McCall → SS Hysteropexy → Manchester → ICG → VH → Supracervical Hysterectomy → Sacrocolpopexy → Sacrohysteropexy → Pectopexy → LLS → TVM → Moschcowitz → Halban → Colpocleisis. Pilot scoped to 04g for now; replicable across other treatment-atlas sections once validated.

### Prolapse merges and deletions

- **McCall vaginal + abdominal merged** into a single canonical [McCall Culdoplasty](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/vaginal-mccall-culdoplasty.mdx) (slug `/mccall-culdoplasty`). Same anatomic operation, two routes, identical principles. Inbound links and database row collapsed.
- **Le Fort + Total Colpocleisis merged** into [Colpocleisis (Le Fort and Total)](docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/colpocleisis-total.mdx) (slug `/colpocleisis`). Le Fort stub deleted; database collapsed to a single row; cross-links updated in apical-prolapse, geriatric-urology, and the prolapse decision matrix.
- **Deleted**: CRISP technique, Raz transvaginal enterocele repair (both stubs without built-out content); pagination chain rewired to skip them.

### Prolapse procedure build-outs

- **Sacrospinous hysteropexy** — full atlas page covering technique (suture placement ≥ 2 cm medial to ischial spine), SAVE-U 5-yr 87% composite success vs 76% VH+USLS, SUPeR mesh-augmented arm, Enklaar 2023 RCT vs Manchester (77% vs 87%), gluteal-pain S3–S4 mechanism, anterior-recurrence mode, ACOG PB 214 framing.
- **Manchester-Fothergill** — Donald 1888 / Fothergill 1908 history, AUGS/IUGA 2020 definition, technique (cervical amputation + cardinal/USL plication, Sturmdorf reconstruction), Enklaar 2023 RCT superiority (87.3% vs 77%, 0% reoperation), BSUG database confirmation, cervical stenosis ~1%, completed-childbearing requirement, cost data (−€1,458 vs hysteropexy), cervical-elongation indication.
- **Iliococcygeus fascia suspension** — Inmon 1963 / Meeks 1994 history, prespinous suture-placement anatomy (1–2 cm anterior / medial to ischial spine), Serati 5-yr (84%) and 10-yr (74%) cure data, Maher 2001 vs SSLF matched comparison, Suh 2018 hysteropexy failure data (48% advanced uterine prolapse), Milani 2014 vs SCP.
- **Vaginal hysterectomy** — ACOG CO 701 framing (preferred MIS route), feasibility (no absolute contraindications), step-by-step technique with anterior cul-de-sac entry adjuncts, intraoperative aids (vasopressin −130 mL, sealing devices), morcellation in 11%, opportunistic salpingectomy guidance, comparative outcomes vs abdominal and laparoscopic (NSQIP 2026, Danish Database 2020), bladder-injury risk factors (prior CS OR 4.01, uterus ≥ 500 g OR 2.88), perioperative care.
- **Sacrocolpopexy** — Type-1 lightweight polypropylene mesh, open vs lap vs robotic comparison, robotic step-by-step (Giannini standardized suturing pattern with 0% mesh exposure, peritoneal tunneling), suture-attachment options (PDS / barbed / anchors), single- vs multi-port comparison, learning curve (efficiency 20–30 cases, proficiency ~78), mesh-exposure data (3.5% MIS, 10.5% CARE 7-yr), concomitant supracervical hysterectomy preference (mesh erosion 3.8% total vs 0.36% supracervical), Burch / sling for de novo SUI (44% → 24% with Burch), expedited recovery evidence.
- **New page — Sacrohysteropexy** — uterine-preserving SCP variant; technique with broad-ligament avascular plane, mesh configurations, LAVA RCT non-inferiority vs sacrospinous hysteropexy, 7-yr Izett-Kay vs VH+USLS, mesh exposure 0.4%, pregnancy outcomes, suture-only mesh-free alternative. Slotted into pagination chain between sacrocolpopexy and pectopexy.
- **Pectopexy** — Banerjee-Noé technique (Cooper's-ligament fixation), mesh configurations (T, inverted T, DynaMesh, Y), mesh-free variants (LNMCP cerclage, Salman's modification), LESS and robotic variants, learning curve (~12 cases), 10-yr durability data (Noé 2026 n = 832, 94.9% apical re-fixation), comparison vs sacrocolpopexy (34 min shorter, less bowel dysfunction).
- **Moschcowitz procedure** — 1912 history, abdominal technique with concentric purse-strings, ureteral safety landmark, Cruikshank 1999 RCT showing McCall superiority for enterocele prophylaxis (94% vs 70%), Halban orientation distinction, contemporary role as sacrocolpopexy adjunct.
- **Halban culdoplasty** — sagittal-suture technique with critical Moschcowitz distinction, Halban vs Moschcowitz vs McCall comparison table, lower-ureteral-risk rationale, lack of apical support, current niche role.
- **New page — Laparoscopic Lateral Suspension (LLS)** — Dubuisson technique with retroperitoneal mesh tunneling, mesh-erosion risk factors (Type 3 mesh OR 13.0, smoking OR 10.4, posterior mesh 5×), comparison vs sacrocolpopexy (43 min shorter, comparable outcomes), modifications (LLS-ULFS, robotic), 92.9% apical anatomical success. Slot into pagination chain between pectopexy and TVM. Embedded YouTube surgical demonstration.

### BNC atlas (04ab) — endoscopic treatment trio

- Replaced malformed `tuit-triamcinolone.mdx` stub with new comprehensive [Transurethral Incision of BNC (TUIBNC)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transurethral-incision-bnc.mdx) page. Coverage: Nealon / Ramirez bilateral 3 & 9 o'clock standardized technique, comparative outcomes (Nealon 82% / 94%, Ramirez, Rosenbaum, Abramowitz, Quarta), failure risk factors (≥ 2 prior procedures, smoking, radiation), SUI counseling and AUS placement timing, and full **Mitomycin-C vs corticosteroid adjunct comparison** with the Pang 2021 meta-analysis, the TURNS 7% serious-AE safety flag (cystectomy), Zhang 2021 / Sun 2022 repeat-triamcinolone protocols, and Nealon counterpoint that incision technique alone may drive most success.
- New page — [Transurethral Bladder Neck Resection (TURBN)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transurethral-bladder-neck-resection.mdx). AUA 2023 equivalence to incision, technique with anatomic safety boundaries (sphincter / orifices), Rosenbaum 2021 head-to-head data confirming no outcome difference vs incision, Zhang 2021 92.9% in highly recurrent BNC with repeat triamcinolone, Pfalzgraf 2017 practice-pattern heterogeneity, escalation pathway.
- New page — [Balloon Dilation for BNC](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/balloon-dilation-bnc.mdx). Standalone Ramchandani 1994 (59% / 0% incontinence), preparatory step before incision / resection (Nealon protocol; Sun 2023 day-surgery columnar balloon + holmium laser), drug-coated balloon evidence (Berg 2025 60% recurrence reduction, HR 0.40), comparison table across approaches, complication framing.

### Verification

`npm run lint:links` passed across 877 files; `npm run typecheck` passed; `npm run build` passed; stub count stable; stats regenerated.

---

## 2026-05-06 — Native tissue apical prolapse atlas fill: SSLF + USLS

- Built out `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-ligament-fixation.mdx` from a stub into a full SSLF atlas article. Scope: ACOG / AUGS guideline framing; Amreich / Richter / Morley-DeLancey history; sacrospinous ligament and coccygeus-SSL anatomy; right posterior vaginal approach; suture-passing devices; double-vs-loop suture evidence; OPTIMAL 2- and 5-year outcomes; SSLF vs USLS, sacrocolpopexy, and sacrospinous hysteropexy; complications including buttock pain and pudendal entrapment; anterior compartment recurrence mechanism; operative pearls; 21 references.
- Built out `docs/04-surgical-techniques/04g-prolapse-repair/apical/uterosacral-ligament-suspension.mdx` from a stub into a full USLS atlas article. Scope: ACOG / AUGS guideline framing; USL anatomy and ureter-distance table; intraperitoneal Shull-type technique; extraperitoneal, laparoscopic / robotic, and vNOTES variants; McCall culdoplasty comparison; OPTIMAL, 10-year high-USLS, and laparoscopic meta-analysis outcomes; USLS vs SSLF, sacrocolpopexy, and vaginal mesh hysteropexy; ureteral obstruction prevention; prognostic factors; operative pearls; 34 references.
- Cleaned pasted-source artifacts during conversion: removed `undefined` figure placeholders, prompt-tail text, smashed comparison tables, malformed p-value fragments, and duplicate guideline blocks. Converted source references to the site anchor pattern and kept cross-links to the apical prolapse hub, SSLF / USLS sibling pages, sacrospinous hysteropexy, and sacrocolpopexy.
- Updated `CLAUDE.md` into the current compact handoff for the apical prolapse batch; `src/data/stats.json` was regenerated after rebasing on the latest `origin/main`.
- Verification before rebase: focused citation-anchor checks passed for both pages; `npm run lint:links` passed across 852 files; `npm run status` passed with 5 stubs; `npm run typecheck` passed; `npm run build` passed; `git diff --check` passed. Full `npm run lint` still stops on pre-existing unrelated citation issues in older 04a / 04f / 04l files, not these pages.

---

## 2026-05-05 — Prolapse atlas buildout + Notes → Best for column rollout

Long single-day arc on branch `claude/wizardly-hofstadter-daeb68`. Two parallel work streams: **04g Prolapse Repair stub-fill marathon** (8 pages built from stub) and **column-structure rollout** ("Best for / indication" replacing Notes) across four key 04f databases.

### Arc 1 — PTNS / iTNM / AUS revision deep-dives

- **[PTNS](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx) rebuilt** — 21 DOI-linked refs covering mechanism (C-fiber recruitment, saphenous co-activation), technique parameters (20 Hz / 200 μs / 0.5–9 mA / 30 min × 12 wk), SUmiT pivotal RCT (54.5% vs 20.9%, p &lt; 0.001), Wang 2020 meta (68% pooled), 5-row comparison vs sham / antimuscarinics / SNM / BoNT / PFMT, fecal-incontinence section anchored on negative CONFIDeNT and NOTABLE sham-controlled RCTs, contraindications, TTNS section.
- **New [iTNM dedicated page](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/implantable-tibial-nerve-stimulation.mdx)** — 17 DOI-linked refs. eCoin (Valencia) — fully implanted, primary-battery, suprafascial, automatic low-duty-cycle stimulation (pivotal extension 78% UUI / 22% dry at 96 wk). Revi (BlueWind) — leadless battery-free subfascial implant powered by external ankle wearable (OASIS 3-yr 79% / 95% satisfaction, no device-related SAEs). TITAN 2 Medtronic 12-mo. Amundsen 2025 SNM-vs-iTNM meta (71.3% vs 71.8% — no trial phase required). Protect PNS pIPG. OAB-UUI database iTNM links repointed from PTNS slug to new page; database notes expanded with per-device evidence anchors.
- **[AUS revision arc expanded](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx)** — 7-strategy revision matrix (downsizing / repositioning / tandem / transcorporal / PRB modification / SIS wrap / complete vs partial replacement); preoperative-evaluation algorithm; staged erosion-salvage with **Rozanski 2014 in-situ-urethroplasty** (38% vs 85% stricture, p = 0.047, OR 4.2 for stricture if reapproximation without urethroplasty); 4-step sequential salvage paradigm ending in PUL or diversion. 18 new DOI-linked refs (Cousin, Linder mechanical, Findlay, Kaiho 2024 review, Simhan 3.5-cm cuff, Eswara revision techniques, DiMarco tandem cuff, Magera tandem-transcorporal, Guralnick transcorporal, Moser transcorporeal-after-radiation, Averbeck 6th ICI, Trost SIS wrap, Rozanski 2014, Linder 2014 reimplantation, Lai 2012 complex revision, Raj 2005 secondary AUS, Van Dyke 2021 PUL, Maurer 2019 distal-double-cuff vs transcorporal).

### Arc 2 — Notes → Best for / indication column rollout

User-locked column convention applied across the highest-yield 04f databases (audited case-by-case per the Notes-column 3-part rule — drop or replace when every row has a per-device page and other columns already triage). Each row's evidence-heavy Notes content compressed to a single-phrase indication / best-for cue; per-device pages retain the depth.

| Database | Rows converted | Pattern |
|---|---|---|
| [Female SUI database](docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx) | 17 | GenericDatabase: rename `notes` → `bestFor`, header → "Best for / indication" |
| [Male SUI database](docs/04-surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database.mdx) | 20 | Same |
| [OAB-UUI database](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx) | 16 | Same |
| [04a Male urethroplasty database](docs/04-surgical-techniques/04a-urethral-reconstruction/male-urethroplasty.mdx) | 38 | TechniqueDatabase has built-in `indication` field that renders as "Best For" column; passed `hideNotes` to suppress evidence dumps |

Female urethroplasty was already in this format. **Deferred** with documented reasoning — 04h fistula databases (female + male) and 04e genital recon (penile / scrotal / vulvar): Notes there carry technique-specific clinical context tied to fistula type / reconstruction scenario, not duplicated decision support; compression would lose useful context.

### Arc 3 — 04g Prolapse Repair stub-fill marathon

Eight prolapse-atlas stubs converted to full deep-dives:

| Page | Refs | Headline anchors |
|---|---|---|
| [Prolapse pessaries](docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/prolapse-pessaries.mdx) | 12 | ACOG PB 214; IUGA 2025 chapter; Cochrane Bugge 2020; **van der Vaart 2022 *JAMA* surgery-vs-pessary RCT — noninferiority NOT met** (76.3% vs 81.5%; 24–49% discontinue at 12–24 mo); TOPSY self-management RCT; Sansone 2022 PRO meta. Tables for support-vs-space-filling pessary types, fitting by stage, symptom-improvement breakdown, follow-up cadence, and special populations. |
| [Lifestyle modifications for POP (new page)](docs/04-surgical-techniques/04g-prolapse-repair/lifestyle-modifications.mdx) | 9 | ACOG PB 214; **PEOPLE meta (Fitz 2023)** with the four key ORs (obesity 1.44, constipation 1.77, heavy lifting 1.86, chronic cough 1.52); Hadizadeh 2026 bariatric meta (32 prospective studies / 5,299 pts); IUC 2025 lifestyle chapter; POPPY + PREVPROL PFMT RCTs; "the Knack" instead of blanket exercise avoidance; modifiable-risk-factor summary table. Database row repointed. |
| [Anterior colporrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/anterior/anterior-colporrhaphy.mdx) | 19 | Christmann-Schmid 2026 Cochrane (vs biological graft RR 1.53; vs TVM RR 3.21); ACOG PB 214; **Altman 2011 *NEJM*** mesh-vs-AC RCT; **Eilber 2013 Medicare 10-yr — concomitant apical 11.6% vs isolated AC 20.2% reoperation**; DAC technique (Graefe 2023); Šumak 98.5% satisfaction despite anatomic recurrence; Wei OPUS prophylactic-MUS trial. |
| [Kelly plication](docs/04-surgical-techniques/04g-prolapse-repair/anterior/kelly-plication.mdx) | 13 | **Glazener 2017 Cochrane** (anterior repair vs Burch — RR 2.29 failure / **RR 8.87 reoperation**); Imamura 2019 *BMJ* NMA; **Bergman 1995 5-yr RCT** (Kelly **37%** vs Burch **82%**); Park-Miller 1988; Beck 1991 25-yr / 519-case series. Framed as historical with explicit guideline positioning. |
| [Paravaginal repair](docs/04-surgical-techniques/04g-prolapse-repair/anterior/vaginal-paravaginal-repair.mdx) (merged) | 30 | **Two pages merged into one approach-agnostic article** at new slug `/paravaginal-repair` (transvaginal / open abdominal / laparoscopic / robotic + lattice variant). Richardson 1981 landmark; Cochrane Yeung 2024 + Maher 2016; Menefee 2011 / Minassian 2014 / Cai 2025 RCTs vs AC; **Colombo 1996 RCT — Burch 100% vs paravaginal 61%** for SUI; **Rude 2021 lattice technique** dedicated subsection (n = 109, 11% recurrence at 12 mo, 19% transient retention) + Huang 2022 modified cross-stitch + Kalis 2020 trans-obturator. **`posterior-enterocele/lattice-technique.mdx` deleted**; Vercel redirects added for both old slugs; database collapsed 2 rows → 1. |
| [Michigan four-wall SSLF](docs/04-surgical-techniques/04g-prolapse-repair/anterior/michigan-four-wall.mdx) | 8 | Kearney-DeLancey 2003 (apex at hysterectomy scar in only 9%); **Larson 2013 — 90% satisfaction at 8 yr in 453 pts** (57% had prior failed surgery; 86% support at or above hymen); Paraiso 1996 (37% anterior recurrence as the central problem); **Teilmann-Jørgensen 2026 Danish nationwide cohort — SSLF reoperation 30.7%, aHR 42.7 vs SCP**; OPTIMAL 2018; Menefee 2024 *JAMA Surg* apical-suspension RCT. Database row updated. |
| [Posterior colporrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/posterior-colporrhaphy.mdx) | 20 | **Mowat 2018 Cochrane — transvaginal RR 4.12 better than transanal**; Grimes 2019 SR; **ACOG PB 214 no-levatorplasty rule**; Paraiso 2006 RCT (colporrhaphy 86% vs graft 54%); Abramov 2005 midline-vs-site-specific (86% vs 67%); **Nüssler 2022 Swedish registry n = 32,086** (11% / 15% reoperation at 5 / 10 yr); FIGO 2020; ACG 2021; PC-vs-STARR (Gluck 2023); PC-vs-LVMR (Abdelnaby 2021). |
| [Perineorrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/perineorrhaphy.mdx) | 24 | **Kanter 2015 SGS survey** ("commonly performed yet poorly understood"); **DeLancey perineal-complex-triad 2024 + 3D MRI 2025** (urogenital hiatus 68% larger in POP); Mothes 2023 (29.5% GH reduction sustained); **Sutkin 2020 OPTIMAL secondary analysis — concomitant posterior repair did NOT improve surgical success**; **Handa 2019 — HR 9.0 for GH ≥ 3.5 cm**; **Cervantes 2026 — perineoplasty urinary retention 30.2% vs 19.1%**; Shakhaliev 2024 ongoing RCT (NCT05422209). |

### Editorial conventions reaffirmed

- **"Best for / indication" column rollout pattern** — applied case-by-case via the Notes-column 3-part rule. GenericDatabase: rename `notes` → `bestFor`, header → "Best for / indication". TechniqueDatabase: use built-in `indication` field with `hideNotes`. Don't blanket-roll to fistula / genital recon — Notes there carry technique-specific clinical context, not duplicated decision support.
- **Page merge discipline** — when two stub pages describe overlapping techniques (vaginal-paravaginal-repair + lattice-technique), merge into a single approach-agnostic article with the dominant variant as a dedicated subsection. `git rm` the redundant file, add Vercel redirect, repoint inbound links via `grep -rln "<old-slug>"`, collapse database rows to one.
- **Lattice / cross-stitch placement decision** — Rude 2021 lattice technique is conceptually a hybrid central+lateral repair (combines AC midline plication + paravaginal lateral fixation). Single-surgeon / 109-pt / 12-month evidence base doesn't yet warrant a standalone deep-dive. Best home: dedicated subsection within the paravaginal-repair page, alongside Huang 2022 modified cross-stitch and Kalis 2020 trans-obturator variants.
- **POP atlas deep-dive pattern** (locked) — every prolapse-atlas page has: (1) anatomic / mechanistic framing, (2) indication thresholds (POP-Q stage, GH size), (3) step-by-step technique, (4) variations table, (5) outcomes / functional outcomes / complications, (6) head-to-head vs adjacent procedures, (7) guideline summary, (8) See Also.
- **Honest "evidence does not support" framing** — for procedures where guideline / RCT data are mixed or negative (perineorrhaphy not proven to prevent recurrence, Kelly plication inferior to Burch, paravaginal not noninferior to AC, mesh ordered off market, lattice unproven long-term), frame the page around what the evidence does and does not show. Don't oversell.
- **OPTIMAL secondary analysis (Sutkin 2020)** is the foundational reference for the perineorrhaphy / posterior-repair-on-apical-suspension question — concomitant posterior repair did NOT improve surgical success at the apex.

### Lint state

`npm run lint:links` clean across 867 files at every commit point.

---

## 2026-05-05 — Urinary diversion + female urethroplasty restructure (10 new 04c pages, 9 female 04a builds + free-graft/BMG-Martius/tissue-engineered consolidations + database overhaul)

Two parallel arcs in a single long session: completing the **urinary-diversion per-device atlas** and overhauling the **female urethroplasty atlas + database**. Branch `claude/angry-jackson-f34f11`. **Commit-and-push-after-every-change cadence preserved.**

### Arc 1 — Urinary diversion: complete the per-device atlas

Ten new / rebuilt dedicated atlas pages under [04c-urinary-diversion/](docs/04-surgical-techniques/04c-urinary-diversion):

| Page | Refs | Headline anchors |
|---|---|---|
| [le-bag.mdx](docs/04-surgical-techniques/04c-urinary-diversion/le-bag.mdx) | 11 | Light & Engelmann 1986 ileocolonic neobladder; Vara/Shanberg 1992 urethral-cecal modification; Bejany/Politano 1993 trigone-like ureteral placement; Cleveland Clinic 1996 stapled construction; **Chen 2009 RCT** showing significantly worse nocturnal continence (48.5% vs 76.3%) due to lower compliance; B-Bladder (Baniel 2004) as the most refined modification. |
| [mansoura-neobladder.mdx](docs/04-surgical-techniques/04c-urinary-diversion/mansoura-neobladder.mdx) | 18 | Abol-Enein & Ghoneim 1994 SLET origin; **450-pt landmark series (2001) — 93.3%/80% day/night continence, 96.2% upper-tract preservation, 3% reflux**; **Osman 2009 RCT — SLET 0% vs T-limb 29% reflux (p=0.01)**; Wiesner 2007 long-term Mainz I comparison; pioneering female neobladder series (Ali-el-Dein); SLET versatility across continent cutaneous / catheterizable channel / ileal ureter / pediatric. |
| [kock-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/kock-pouch.mdx) | 33 | Nils Kock 1969 (fecal) / 1975 (urinary) origin; Skinner USC 250 → 531 → 802 patients; Mansoura urethral Kock evolution (Ghoneim 1987 → 1992); Elmajian 295-pt orthotopic; Copenhagen 166-pt long-term (5-yr stones 34%, B12 33%); Carr/Webster 53% revision rate; Arai polyester-collar erosion mechanism; 1998 T-pouch as direct evolutionary successor. |
| [mainz-pouch-i.mdx](docs/04-surgical-techniques/04c-urinary-diversion/mainz-pouch-i.mdx) | 21 | Thüroff/Hohenfellner 1983 detubularized ileocecal reservoir; **Wiesner 800+ pt CCUD experience (largest worldwide; 92.8% continence at 7.6 yr)**; **Wiesner 401-pt appendix-vs-nipple (92% vs 82% continence; 10% vs 20% stones)**; **Wiesner 458-pt ST-vs-SLET ureteral comparison (SLET 3.1% vs ST 13.9% obstruction in dilated ureters)**; Stein 70-pt pediatric / neurogenic 9.3-yr; Pfitzenmaier 9-yr metabolic safety. |
| [mainz-pouch-ii.mdx](docs/04-surgical-techniques/04c-urinary-diversion/mainz-pouch-ii.mdx) | 26 | Fisch/Hohenfellner 1991 detubularized rectosigmoid pouch — voids per rectum via native anal sphincter, no stoma / appliance / CIC; D'Elia 10-yr Mainz; Hadži-Djokić 220-pt largest series; Pahernik 38-pt pediatric / exstrophy 9.3-yr; Bastian QoL; Obek metabolic-mortality cohort; Kälble 2011 2.58% secondary-malignancy signal. Mandatory anal-sphincter competence + lifelong colonoscopic surveillance. |
| [florida-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/florida-pouch.mdx) | 13 | Lockhart/Pow-Sang/Persky USF 1986 detubularized right-colon reservoir with doubly plicated distal ileum + **direct nontunneled mucosa-to-mucosa ureteral reimplantation** (4.9% obstruction vs 13.3% tunneled; 7% reflux clinically insignificant); 179-pt cohort 93.3–97.2% continence; lowest reoperation rate (6–6.5%) of any major continent cutaneous diversion; Florida Pouch II conversion variant 58% metabolic complications. |
| [penn-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/penn-pouch.mdx) | 6 | University of Pennsylvania mid-1980s ileocecal reservoir using the intussuscepted ileocecal valve (stapled, historically reinforced with Marlex collar). Largely historical — supplanted by detubularized alternatives due to dessusception, foreign-body, and cecal-hyperactivity concerns. **Database row corrected** — prior notes incorrectly described it as appendix-based. |
| [double-t-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/double-t-pouch.mdx) | 13 | Stein/Skinner USC 2001 cutaneous adaptation of orthotopic T Pouch — applies SLET flap valve at both ends. Bochner pig-model validation (tunnel ≥2:1 ratio); Marino 2002 100%-continence 18-pt cutaneous series; Hemi-T (Kurzrock 2003) and PGIMER Yang-Monti modifications; **landmark USC-STAR RCT (n=484) showed orthotopic T-mechanism did NOT prevent renal-function decline vs Studer at 3 yr (p=0.35) and was associated with more secondary surgeries — fundamentally challenging the antireflux rationale**. |
| [colon-shuffle.mdx](docs/04-surgical-techniques/04c-urinary-diversion/colon-shuffle.mdx) | 12 | **Renamed from "Colostomy Shuffle"** per user instruction (prior name was a misnomer). Meijer/NKI-AVL 2015 modified incontinent colon-conduit diversion; 21-pt NKI-AVL series (90% prior radiation; 0% anastomotic leak / fecal peritonitis); Hebert 2026 multi-institutional 179-pt CCUD; Cotter 2017 NBA-vs-anastomosis comparison; Hagemans 2020 colon-vs-ileal exenteration data; Davis-Noble 1992 predecessor; Carter double-barreled-wet-colostomy comparison. Vercel redirect from old slug. |

**Database cleanup** in [04c-urinary-diversion/index.mdx](docs/04-surgical-techniques/04c-urinary-diversion/index.mdx):

- Dropped **Right Colon Pouch** (generic — subsumed by Indiana / Florida / Mainz I) and **Penn Pouch** (historical, sparse data) rows; pages remain reachable via cross-links.
- Dropped **Notes column entirely** — every row now has a per-device page, so notes had become redundant and drift-prone. Database is now a clean tap-target index with Diversion + Family columns only — matches the BPH and male-cosmetic Notes-column-drop pattern.

### Arc 2 — Female urethroplasty: per-device buildouts

Nine female urethral-reconstruction pages converted from stub to deep-dive:

| Page | Refs | Headline anchors |
|---|---|---|
| [dorsal-vaginal-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/dorsal-vaginal-flap.mdx) | 10 | Tsivian-Sidi origin; Petrou 2012 (n=11; Qmax 7.3→21.8 mL/s; no SUI); Mittal meatal-sparing modification; Simonato/Romero-Maroto pedicled-flap variants; Katiyar 2021 prospective dorsal-vs-ventral RCT (91% comparable success); Higuchi 2026 head-to-head with DOBMGU (87.5% vs 57.1%). |
| [labia-minora-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/labia-minora-flap.mdx) | 8 | Xu 2009 transpubic tubularized series (n=8); Xu 2013 multi-technique cohort (93.2% anatomical / 90.9% functional success across 44 pts); Radwan 2013 labia-minora-tube + TOT; Osman SR pooled 91% flap vs 80% graft vs 47% dilation; Jiang 2017 pediatric pelvic-fracture UVF; Bouchard 2025; Jena 2025 free-graft (n=204) contrast. |
| [bladder-wall-flap-urethroplasty.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/bladder-wall-flap-urethroplasty.mdx) | 9 | Covers all six named variants — Tanagho anterior bladder tube, Nayyar U-shaped (n=3, 100% continence), Pippi Salle anterior bladder-flap urethral lengthening, Mitsui flipped tube, Elkins anterior-bladder-wall advancement (obstetric VVF), Patidar 22-pt anterior+posterior series (82% socially dry / 68% complete continence). Salvage / last-resort framing. |
| [circular-bmg-female.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/circular-bmg-female.mdx) | 13 | Önol 2011 (n=2 — only published series); Aybek-Zumrutbas combined modification (Gülpınar 2021 100% in 14 pts); Jefferson 2025 combined dorsal+ventral inlay; AUA 2023 + Li 2026 / Ortac 2025 metas showing 92–95% single-surface alternatives. Honest framing as rarely-used salvage. |
| [vaginal-flap-bmg-combined.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/vaginal-flap-bmg-combined.mdx) | 11 | Reframed from stub as a **reconstructive principle** covering five distinct configurations: BMG with periurethral-fascia-flap reinforcement (Berdondini 2024 ventral onlay 98%); Martius-reinforced ventral BMG (Önol 2011); sequential VFU → BMG salvage (Blaivas 2012); segmental flap + graft for pan-urethral disease; combined dorsal BMG + ventral vaginal flap (Jefferson 2025). Kumar 2025 BMG-vs-vaginal-graft equivalence meta + Higuchi 2026 head-to-head. |
| [staged-bmg-female.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/staged-bmg-female.mdx) | 16 | Frames the technique honestly as a conceptual extrapolation from male principles (no female-specific series in print). Anchored on Palminteri 2002, Kozinn 2013 (n=91 multistage; 18.7% stage-1 revision; 90% overall), Patel 2016 LS-recurrence-in-graft caveat, Warner 2015 showing single-stage BMG outperforms staged Johanson — plus female alternatives that typically obviate staging. |
| [primary-end-to-end-female.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/primary-end-to-end-female.mdx) | 16 | **Patel 2017 BJU Int SR (n=158 female PFUI across 51 articles)** — primary anastomotic repair via vaginal approach as soon as hemodynamically stable is optimal, with significantly lower incontinence and vaginal stenosis vs delayed repair. Dorairajan pediatric same-day; Black 2006 long-term LUTS; Xu 2013 EPA cohort; male template (Morey SIU/ICUD 93.8%, Koraitim posterior, Nilsen Scandinavian RCT); ACS 2025 Best Practices. |
| [vaginal-wall-tubularization.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/vaginal-wall-tubularization.mdx) | 12 | Blaivas trilogy (1989 n=10 → 1996 n=49 → **Flisser/Blaivas 2003 n=74 — largest female urethral-reconstruction experience in print: 93% anatomical / 87% continence**). Hallmark three-layer construct (neourethra → Martius flap → fascial pubovaginal sling). Orandi-type lateral-pedicle variants (Simonato, Romero-Maroto), Hajebrahimi U-shaped hybrid, Blaivas 2012 long-term recurrence signal. |
| [urethral-prolapse-repair.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/urethral-prolapse-repair.mdx) | 12 | **New treatment-atlas page** distinct from the [clinical-conditions article](docs/03-clinical-conditions/03b-voiding-outlet/urethral-prolapse.mdx) — focuses on indications for surgery, conservative management, pediatric reduction under GA (Holbrook), four-quadrant excisional technique (Shurtleff / Pfeuti), historical / abandoned techniques, outcomes, complications, treatment algorithm. |

### Arc 3 — Female urethroplasty consolidations

- **Free graft pages merged by placement, not donor source** — eight rows → five. The dorsal-onlay article is now donor-source-agnostic, explicitly covering BMG (default), labial mucosa (Jena 2025 n=204; 93.5%), lingual mucosa (Simonato 2006, Goel 2014 lingual-vs-labial equivalence), and vaginal free graft (Borchert 2022; ~80%) within a single Graft Materials section. Deleted (with redirects to female-dorsal-onlay-urethroplasty): `dorsal-onlay-labial-mucosa.mdx`, `lingual-mucosal-graft-female.mdx`, `vaginal-free-graft.mdx`.
- **BMG + Martius merged into ventral onlay** — Martius-reinforced ventral BMG was a configuration of the ventral-onlay technique, not a distinct procedure. Folded into the ventral-onlay article as a "Martius-Reinforced Variant" subsection (Önol 2011 sling-erosion data + Malde diverticulectomy analog). Standalone `bmg-martius-combined.mdx` deleted with redirect.
- **Bladder-flap-tubularized merged into bladder-wall-flap** — duplicate row in F6 Urethral Loss eliminated; bladder-wall-flap page now covers all variants. `bladder-flap-tubularized.mdx` deleted with redirect.
- **Tissue-engineered consolidated to foundations** — both the male `tissue-engineered-oral-mucosa.mdx` and female `tissue-engineered-female.mdx` atlas pages deleted with redirects to a new canonical foundations article: [Tissue-Engineered Grafts & Bioscaffolds](docs/01-foundations/surgical-principles/grafts/tissue-engineered.mdx) (27 refs covering acellular bioscaffolds, cell-seeded scaffolds, TEOMG / MukoCell, and next-generation tech). Female "Emerging / Investigational" category dropped entirely from CATEGORY_ORDER.
- **Mandal/Nikolavsky ventral-inlay clarification** — the [female-ventral-inlay-bmg](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-ventral-inlay-bmg.mdx) article was restructured to clarify that Mandal/Gaur/Kumaraswamy "VIBMGU" and Sterling/Nikolavsky "transurethral ventral inlay BMG" are the same technique developed independently by two groups (operative steps identical; differences confined to catheter duration and emphasized indication).

### Arc 4 — Female urethroplasty database overhaul

- **F1–F8 prefix dropped** on female categories ("Endoscopic / Minimally Invasive", "Flap Urethroplasty", etc.); **1–8 prefix dropped on male categories for symmetry**. CATEGORY_ORDER in TechniqueDatabase.tsx remains the authoritative ordering source.
- **Eponym + Notes columns dropped** from the female database; replaced with a single concise **"Best For" indication column** capturing the decision-relevant clinical hook in a one-phrase tag (e.g., "Mid-urethral stricture, healthy vagina"; "Acute female PFUI"; "Total urethral loss"; "Salvage for obliterative disease (rarely needed)"). Male database is unchanged (still renders Technique / Eponym / Location / Notes).
- **TechniqueDatabase component enhanced** — added `indication?: string` field; added `hideEponym?: boolean` and `hideNotes?: boolean` props; render the "Best For" column when any row has indication; colSpan in category-header rows now computed from active columns; search includes indication.
- **Sidebar_position values renumbered 1–18** so page-level ordering mirrors the database row order (DVIU → distal urethrectomy → flaps → free grafts → combined → urethral loss → other). Previously some pages sat at 50–53 with duplicates at 12 — leftover placeholder values from when pages were originally built.
- **Decision Framework links** repointed to the new merged pages (combined ventral-onlay-with-Martius variant; combined-vaginal-flap+BMG for failed prior urethroplasty).

### Editorial conventions reaffirmed this session

- **Per-device pattern locked for urinary diversion** — every row in the diversion database now has a dedicated atlas page (`landing-IS-the-database` pattern). Notes-column-drop 3-part rule (every row has a per-device page; other columns triage; notes redundant with per-device page) applied successfully.
- **Per-device pattern locked for female urethroplasty** — every row in the female database has a dedicated atlas page. Eponym/notes drop pattern inverted: instead of dropping notes entirely (the BPH / male-cosmetic / urinary-diversion approach), added an Indication column that's smaller, more decision-relevant, and easier to keep in sync.
- **Free-graft organization by placement, not donor source** — when multiple donor sources (BMG, labial, lingual, vaginal) share the same operative technique (placement), they belong in one canonical page with donor-source as a Graft Materials subsection — not as separate per-donor pages.
- **Atlas-page-vs-clinical-conditions-page split for treatment-focused articles** — when a clinical-conditions page already covers the disease comprehensively, the atlas page should focus narrowly on **treatment** (indications, technique, outcomes, complications) and explicitly cross-link to the clinical page for pathophysiology / presentation / diagnosis. New urethral-prolapse-repair atlas page is the locked example.
- **Landing-page rename rule** — when a procedure is renamed (Colostomy Shuffle → Colon Shuffle), `git mv` the file, update slug to canonical form, add Vercel redirect, and `grep -rln "<old-slug>"` to verify no remaining references.
- **TechniqueDatabase component flexibility** — the `hideEponym` / `hideNotes` props allow each tab (male / female) to choose its own column structure without affecting the other. Future: a similar `hideLocation` extension or a fully configurable columns array if the tabbed pattern expands.

### Build / lint state

`npm run lint:links` clean across 866 files; `npm run typecheck` clean; production build (`npx docusaurus build --locale en`) clean. Live dev preview verified — female db renders 2 cols × 19 rows (Technique + Best For); male db unchanged at 4 cols.

---

## 2026-05-05 — ED + Peyronie's atlas / pharmacology buildout (5 new 04j pages + Peyronie's pharmacology hub from 25 → 76 refs + database compression)

**Five new canonical 04j pages:**

- [psychosexual-therapy.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/psychosexual-therapy.mdx) (17 refs) — cross-cutting canonical for sensate focus / CBT / MBI / PLISSIT / sex education / couples therapy. Cochrane 2007 + Frühauf 2013 meta + Qiangzhao 2026 NMA. Linked from ED database, Peyronie's, women's-health sexual-dysfunction, SPS / PDD.
- [penile-arterial-revascularization.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-arterial-revascularization.mdx) (23 refs) — Michal 1973 origin + Dabaja 2014 + Manning 1998 + Cookson 1993 + Kawanishi 2004 + Kayıgil 2012 + Zuckerman 2012 PFUI cohort + Schönhofen 2021 / Mohan 2025 endovascular. **IEA → dorsal penile artery (Michal II)** is the contemporary standard donor; saphenous vein is NOT (corrected the prior database row).
- [stem-cell-therapy-ed.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/stem-cell-therapy-ed.mdx) (19 refs) — AUA 2018 investigational; Hinojosa-Gonzalez 2024 NMA; Phase-I evidence (Haahr 2018 / Bieri 2020 / Ji 2025).
- [venous-ligation.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/venous-ligation.mdx) (17 refs) — AUA 2018 NOT recommended; modern direction is embolization-first or combined (Allaire 2021/2025; Hoppe 2026 multicenter registry).

**Peyronie's pharmacology hub** [peyronies-disease-agents.mdx](docs/01-foundations/pharmacology/sexual-medicine-andrology/peyronies-disease-agents.mdx) grew from ~ 25 refs to **76 refs**:

- Pentoxifylline section (refs 26–32) — Smith 2011 calcified-plaque 91.9% as strongest niche signal.
- CoQ10 section (refs 33–40) — Safarinejad 2010 RCT with explicit data-integrity admonition.
- Vitamin E section (refs 41–48) — AUA Statement #6 Grade B; Miller 2005 high-dose mortality signal.
- Tamoxifen section (refs 49–60) — AUA Statement #6 Grade C; Ilg 2019 PDE5i synergy preclinical only; ~ 20% AE-discontinuation rate in men.
- Potaba section (refs 61–68) — Weidner 2005 RCT; strongest signal is curvature-progression PREVENTION.
- Xiaflex / CCH expansion (refs 69–76) — Lipshultz 2015 subgroup; Masterson 2020 + Cocci 2018 + Cahill & Trost 2025 predictors; Goldstein 2020 calcification subgroup; Yafi 2018 head-to-head vs surgery; Wymer 2019 cost-effectiveness; Sukumar 2020 NY State practice-impact.

**Database compression — atlas-wide pattern now LOCKED across 4 atlases (male-cosmetic, female-cosmetic, ED, Peyronie's):**

- ED database: 4 prosthesis rows collapsed into one "Penile Implant"; ICI rows merged; PDE5 / MUSE / TRT repointed to pharmacology hubs; Notes column dropped; bare-name rule applied. 13 rows total.
- Peyronie's database: Notes column dropped; bare-name rule applied. 28 rows total. Vitamin E / Tamoxifen / Potaba / investigational-IL rows repointed to canonical pharmacology hub.

Three-column atlas format (Treatment + Tier badge + Invasiveness) is now the locked structure when every row has a canonical destination.

**Lint state:** `npm run lint:links` clean across 851 files; `npm run lint:citations` clean.

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
- New page [g-spot-amplification.mdx](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/g-spot-amplification.mdx) (11 refs). Puppo & Gruenwald 2012 anatomic-existence-debate as the central caveat; ACOG 2020 + FIGO 2025 not-medically-indicated; Clarke 2026 anterior-vaginal-wall PRP-vs-saline RCT (closest proxy — 69.2% vs 34.6% at 6 mo); adjacent vaginal-augmentation literature (Yi 2026 / Lai 2023 MAFT / Menkes 2021 / Bensmail 2025 / CIVIT Leylek 2025). Cosmetic-vs-therapeutic counseling distinction. Database row repointed from null slug to canonical page.
- New page [microfat-nanofat-grafting.mdx](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/microfat-nanofat-grafting.mdx) (24 refs). Therapeutic regenerative-medicine page covering GSM / VVA / refractory VLS. Tonnard 2013 founding nanofat description + Menkes 2021 (microfat labia + nanofat vagina; stable 18 mo) + Casarotti & Tremolada 2020 MFAT (no relapse at 36 mo) + Lai 2023 MAFT histologic anchor + Gutierrez-Ontalvilla 2022/2025 VLS RCT data + Wang 2020 fat-embolism case (dominant safety concern). Explicit therapeutic-vs-cosmetic distinction. With this addition every female-cosmetic database row now has a per-device page.

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
