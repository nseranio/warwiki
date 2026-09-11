# MAG3 companion correction audit

Date: September 11, 2026. File: `docs/02-evaluation/imaging/mag3-renal-scintigraphy.mdx`.

This is a targeted correction of unsafe or unsupported ordering, interpretation and intervention rules discovered while rebuilding the CT urogram companion. It is an editorial evidence update, not named clinician sign-off or a systematic review of nuclear medicine. The existing article's title, numbered topic structure, useful comparison tables, ordering/reporting tools and video placement were retained; unsupported detail and misleading citation mappings were removed. Scoped `evidenceUpdated` and `evidenceNote` fields describe the work without resetting clinical review.

## Corrections implemented

| Area | Disposition |
|---|---|
| CT contrast sequencing | Removed the repeated fixed 48-hour transporter-competition rule. The cited standard does not establish it; acute kidney injury or dehydration remains a clinical consideration. |
| Diuretic preparation | Corrected dose, hydration, selective catheterization and protocol choice; separated adult and pediatric practice. |
| Drainage interpretation | Replaced standalone half-time cutoffs and curve labels with contextual interpretation and technical limitations. |
| Relative function | Distinguished relative uptake from clearance and global reserve. Removed percentage-to-treatment ladders. |
| Very low function | Replaced automatic nephrectomy with individualized counseling, supported by a selected retrospective organ-preservation cohort. |
| Serial change | Replaced an unsupported universal 5% rule with a clearly bounded repeatability example. |
| Follow-up | Removed mandatory baseline/annual scans for every stricture, reconstruction, diversion or neurogenic patient. Retained ongoing follow-up tailored to the clinical question. |
| Nephrostomy | Removed the preset clamp/open sequence and clarified that tube status must match the drainage question. |
| Medication handling | Removed blanket ACE inhibitor/ARB and NSAID hold periods; retained specific diclofenac and hydration-related instructions. |
| DMSA | Clarified cortical versus drainage questions and timing of persistent scar assessment. |
| Transplant | Removed definitive curve-to-pathology mapping; identified the supporting study's DTPA tracer and biopsy correlation. |
| Neonates | Distinguished specialist timing decisions from the US product label's established use from 30 days; did not turn lack of labeled neonatal evidence into an absolute contraindication. |

## Source identity and access record

References correspond to the final article's numbering. No conference abstract was presented as a full journal trial.

| Ref | Primary/official source | Access and exact contribution |
|---|---|---|
| 1 | Taylor et al. [SNMMI/EANM adult obstruction standard, 2018](https://doi.org/10.1053/j.semnuclmed.2018.02.010), PMID 29852947, PMC6020824 | Full text read through NCBI article HTML and its public BioC endpoint. Main procedural and interpretation framework. The normal web-tool PMC view intermittently presented CAPTCHA; that did not prevent access to the underlying public full text. |
| 2 | Majd et al. [SNMMI/EANM pediatric diuresis guideline, 2018](https://doi.org/10.2967/jnumed.118.215921), PMID 30275286, PMC6167528 | Full text read through NCBI public BioC. Pediatric protocol, dose, hydration/bladder considerations, sedation and interpretation. |
| 3 | Freitas et al. [Pyeloplasty versus nephrectomy with DRF ≤15%, 2021](https://doi.org/10.1080/21681805.2021.1879929), PMID 33525931 | Published abstract and bibliographic record checked. Retrospective 63-patient cohort: 19 pyeloplasty, 44 nephrectomy. Used to show selected preservation is possible, with no promise of functional recovery or randomized equivalence. Correct pages: 192–196. No inaccessible operative detail was inferred. |
| 4 | Sfakianakis et al. [MAG3-F0 17-year experience, 2009](https://doi.org/10.1053/j.semnuclmed.2008.11.001), PMID 19341836 | Abstract and author-institution publication record checked. Establishes F0 as a clinical protocol; not used to claim universal superiority. Full technical article was not retrieved. |
| 5 | Vali et al. [Pediatric DMSA update, 2022](https://doi.org/10.1007/s40336-022-00484-x) | [Official society PDF](https://snmmi.org/common/Uploaded%20files/Web/Clinical%20Practice/Procedure%20Standards/2021/SNMMI%20EANM%20DMSA%20guideline_final.pdf) read. Supports cortical interpretation and delayed assessment for persistent scars. The file's 2021 hosting directory is not the journal publication date. |
| 6 | Taylor et al. [MAG3 differential-uptake repeatability, 2010](https://doi.org/10.1016/j.urology.2010.03.066), PMID 20708778 | Published abstract checked. 24 men with stable renal function; the seven-percentage-point estimate is explicitly protocol/population specific. |
| 7 | Taylor et al. [Improved camera-based MAG3 clearance method, 1995](https://pubmed.ncbi.nlm.nih.gov/7658232/) | Published abstract checked. A 20-patient method study; supports the need for a validated method and processing/calibration, not reinterpretation of SRF as GFR. Replaces an inaccessible generic adult-standard landing link. |
| 8 | [EAU Neuro-urology guideline, 2026](https://uroweb.org/guidelines/neuro-urology/chapter/the-guideline) | Official full text reviewed during the broader clinical/figure audit. Supports risk-based follow-up; absence of a universal annual MAG3 schedule is described as such rather than a recommendation against indicated renography. |
| 9 | Gupta et al. [Quantitative DTPA transplant parameters, 2014](https://pubmed.ncbi.nlm.nih.gov/24795835/), PMC3999401 | Published abstract and metadata checked through Europe PMC. Pathology analysis: 181 examinations in 127 recipients; repeated examinations are not counted as unique patients. DTPA evidence is explicitly identified. Full-text retrieval attempts were inconsistent, so no unverified technical detail was added. |
| 10 | Jubilant DraxImage [US mertiatide prescribing information](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d497f2a2-8e8d-4372-ba09-f8e6b22d2cf8), revision January 2023 | Official label checked, including sections 1 and 8.4. The established pediatric indication begins at 30 days; safety/effectiveness at younger ages is not established. |

The old bibliography contained reference identities or mappings that did not justify the attached claims. Examples included renal-oncocytoma sestamibi evidence in a DMSA discussion, an anastomotic urethroplasty series attached to functional-imaging surveillance, and legacy renography references standing in for unsupported universal management thresholds. Rather than preserve a misleading reference count, the bibliography was rebuilt around ten sources with explicit roles. This does not imply that every older paper itself was invalid.

## Access limits and remaining review

- Clinical indications and postoperative surveillance remain individualized. This page does not invent a fixed follow-up schedule for every named operation.
- The low-function UPJO study is retrospective and short term; the article preserves that limitation. It does not establish outcomes for every ureteral stricture or obstruction etiology.
- MAG3 clearance calibration, pediatric radiopharmaceutical activity and local imaging protocols should be reviewed by nuclear medicine before using this as a departmental protocol.
- The preserved video was not independently rewatched during this correction pass.
- A named clinician/nuclear-medicine review remains pending; no approval date or reviewer was fabricated.

## Validation

- Citation check: passed for all 1,187 MDX/Markdown content files.
- Source internal-link check: passed for all 1,187 files.
- `git diff --check`: passed.
- Final integrated production build and browser checks are owned by the parent task; no redundant full build was run here.
