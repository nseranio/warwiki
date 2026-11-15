# Cost and value: site-wide rollout plan (November 15, 2026)

Convention: STYLE.md section 15. Done so far: the pilot (5 pages, `cf43bc3b`) and Tier A (8 decision groups on 12 pages, `8f3f3a2a`). Pipeline fixes (`8397bf3f`): the claim gate now treats currency amounts, per-QALY ratios and ICERs as number claims, and `npm run refs:new` blocks unresolved DOIs, retractions and expressions of concern.

## How the list was made

`scan.py` (in this folder) queried PubMed for every treatment, evaluation, condition, pharmacology and device page on both sites: page title AND (cost-effectiveness OR cost-utility OR economic evaluation OR cost analysis OR cost-benefit OR cost-minimization OR budget impact), plus the subset mentioning randomization. 807 WARWIKI and 117 WHITWIKI pages; raw output in `inventory.tsv`. Title queries are noisy (generic titles such as "Complications" or "Imaging" match thousands of unrelated papers; specific ones such as "Intradetrusor OnabotulinumtoxinA" undercount), so the ranking below is by judgment of the published cost literature on each page's decision, with the counts as a cross-check. Anchor studies are named where known; each batch confirms them on PubMed before writing.

Pages with no cost literature get no section and no "no evidence" sentence.

## WARWIKI

### Batch B1: trial-based or several independent analyses on a live decision (about 20 pages)

| Rank | Decision group | Pages | Anchor evidence |
|---|---|---|---|
| 1 | Surgery for BPH | BPH condition page, TURP, HoLEP, GreenLight PVP, Rezum, PAE, simple prostatectomy, Aquablation | UNBLOCS (ThuVARP vs TURP) economic evaluation; NICE and US models of minimally invasive therapies |
| 2 | Concomitant sling at prolapse surgery | Female Slings hub (Concomitant Sling section), POP overview | OPUS-based models (Richardson 2013), Wang 2023 trial-based analysis, Sassani 2024; Mou 2022 already on the hub |
| 3 | Urinary diversion approach | Intracorporeal Urinary Diversion, Ileal Conduit, Diversion Principles | iROC trial cost analysis (trial page exists), robotic vs open cystectomy cost studies |
| 4 | Fecal incontinence therapies | Fecal Incontinence (condition) | SNM models (van Wunnik 2012, Brosa 2008, de Miguel Valencia 2023), PTNS-first (Hounsome 2018) |
| 5 | Uterine preservation | Vaginal Hysterectomy, vaginal hysteropexy pages, Apical Prolapse | SUPeR economic evaluation (Harvie 2026), Wallace 2024 Markov, Chang 2021 |
| 6 | Intermittent catheter type | Intermittent Catheters, SCI page pointer | Hydrophilic vs uncoated models (NICE, SCI models; most manufacturer-funded, labeled) |
| 7 | OAB drug therapy | Antimuscarinics, beta-3 agonists, Urgency Incontinence and OAB, Nocturia (desmopressin) | US and UK models (mostly manufacturer-funded, labeled) |
| 8 | Perioperative choices in reconstruction | VTE Prophylaxis, Alvimopan/ileus, Tranexamic Acid, Bowel Preparation | Extended VTE prophylaxis models after pelvic surgery; alvimopan trial cost analyses |

### Batch B2: moderate evidence (about 20 pages)

| Rank | Decision group | Pages | Notes |
|---|---|---|---|
| 9 | ED treatment ladder | Erectile Dysfunction (Procedures), Inflatable Penile Prosthesis | IPP vs injections and PDE5 models |
| 10 | Peyronie's treatment | Peyronie's Treatment Algorithm | Collagenase vs plication cost analyses |
| 11 | Ureteral stricture | Ureteral Stricture, metal long-term stents, Pyeloplasty | Metal vs polymer stent exchange costs; robotic vs laparoscopic pyeloplasty hospital costs |
| 12 | Neurogenic LUTD | SCI, MS, Spina Bifida | Catheter strategies, augmentation vs toxin |
| 13 | Bulking agents | Urethral Bulking Agents, Bulkamid | Bulking vs sling models (Kunkle 2015, others) |
| 14 | Containment | Absorbent Products, condom catheters | Many descriptive cost studies |
| 15 | Parastomal hernia | Parastomal Hernia | Prophylactic mesh trials with cost outcomes |
| 16 | Radiation cystitis | Hyperbaric Oxygen Therapy | HBO cost analyses |
| 17 | After urethroplasty | Urethral Stricture (follow-up), PFUI | Belsante 2013, Zaid 2015 surveillance models; Johnsen 2017 |
| 18 | Gender-affirming care coverage | Gender-Affirming Surgery overview | Padula 2016 US cost-effectiveness of coverage |
| 19 | Obstetric fistula | Obstetric Fistula, Female Fistula Repair | Cost-effectiveness of repair in low-resource settings |

### Tier C (only if asked)

Nutrition laboratory pages, sutures and sealants, flaps and grafts, imaging basics, trauma pages, women's cancer screening pages, IC/BPS agents, vaginal laser, colpocleisis, DSD and transitional care. The counts there reflect general-medicine literature, not reconstructive decisions.

## WHITWIKI (about 35 pages)

First step: add section 15 to WHITWIKI's STYLE.md (its sections run to 14), port `check_new_refs.py` and the gate's COST pattern to its scripts, and run its own widening of existing cost sentences.

| Rank | Decision group | Pages | Anchor evidence |
|---|---|---|---|
| 1 | MRI-first diagnosis | Prostate MRI, Prostate Biopsy, Detection and Staging | PROMIS cost-effectiveness (Faria 2018), STHLM3-MRI, transperineal vs transrectal biopsy costs |
| 2 | PSMA PET staging | PSMA PET | proPSMA cost analysis (de Feria Cardet 2021) |
| 3 | Low-risk prostate cancer | Active Surveillance, Localized Prostate Cancer | ProtecT economic analyses; surveillance vs treatment models |
| 4 | Radical cystectomy and MIBC | Radical Cystectomy, MIBC | iROC and RAZOR costs; trimodality therapy vs cystectomy models |
| 5 | NMIBC | TURBT, NMIBC, BCG, Intravesical Therapy | PHOTO blue-light trial economics; BCG and chemotherapy models; surveillance intervals |
| 6 | Advanced prostate systemic therapy | mHSPC, CRPC, Androgen Receptor Pathway Inhibitors, Radiopharmaceuticals, PSMA RLT | STAMPEDE docetaxel and abiraterone economics; VISION-based models |
| 7 | Kidney | Partial Nephrectomy, Renal Ablation, Renal Mass Biopsy, Metastatic RCC | Ablation vs partial nephrectomy models; IO combination models |
| 8 | Prostate radiation and focal therapy | Prostate Radiation Delivery, Focal Therapy | Hypofractionation and SBRT costs |
| 9 | Biomarkers | Prostate Biomarkers, Bladder Biomarkers | 4Kscore, PHI, SelectMDx models |
| 10 | Survivorship and perioperative | ADT Effects (bone agents), VTE Prevention, Perioperative pages | Denosumab models; extended prophylaxis |
| 11 | Testis | Stage I management, RPLND | Surveillance vs adjuvant therapy models |

## Size and pacing

About 40 more WARWIKI pages and 35 WHITWIKI pages, in roughly nine batches of eight decision groups. Per CLAUDE.md, Codex does the bulk research and drafting from the Tier A brief (`BRIEF.md` pattern: drafts only, every figure from the abstract or open full text, retraction and DOI checks, industry ties stated); Claude reviews each draft, runs the gate rounds and commits each batch separately.
