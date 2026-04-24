# WARWIKI — Claude Session Reference

This file is for Claude to read at the start of every session. It captures the project architecture, conventions, and component patterns. Session history is in `CHANGELOG.md`; the stub backlog is in `docs/_STATUS.md`.

---

## Current handoff snapshot — April 24, 2026 (surgical-principles reorg + library overhaul)

The latest work has been committed and pushed to `origin/main`. Major changes in this session (commits `2ea103f` → `fd3a771`):

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

- **Subsections 03a–03i:** Storage & Incontinence, Voiding & Outlet, Pelvic Support, NLUTD, Upper Tract, Fistulas, Genital & Scrotal, Pelvic Pain, Defecatory Disorders.
- **03e Upper Tract** — UPJ Obstruction, Ureteral Stricture (renovascular-conditions stub deleted).
- **03f Fistulas** — Females (sidebar position 1) → Males (2) → Both Genders (3); every primary article filled to depth.
- **03g Genital & Scrotal** — male-infertility removed (canonical in Men's Health); Vaginal Cysts & Masses added.
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
| Clinical Conditions | `03-clinical-conditions/` | **9 subsections (03a–03i)**. 03e Upper Tract: renovascular-conditions deleted; UPJO and Ureteral Stricture filled. 03f Fistulas: sidebar reordered Females → Males → Both Genders; every primary article filled. 03g Genital & Scrotal: male-infertility removed; Vaginal Cysts & Masses added. 03h Pelvic Pain: pudendal-neuralgia, myofascial-pelvic-pain, and GSM removed; Chronic Pelvic Pain consolidates the first two. 03i Defecatory Disorders (added 2026-04). |
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


*Last updated: 2026-04-23*
