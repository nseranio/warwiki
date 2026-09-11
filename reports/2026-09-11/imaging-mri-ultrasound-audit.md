# MRI and ultrasound source/claim audit — September 11, 2026

## Scope and result

Rebuilt the existing MRI and ultrasound reference pages after reading their full inherited text and checking the current applicable guidance and selected original studies. MRI is now 218 lines with 14 linked references; ultrasound is 194 lines with 13 linked references. Both retain their existing routes and all 102 historical heading targets, including removed subsection titles, using explicit IDs or compatibility anchors. This preserves old external bookmarks without retaining misleading prose.

The frontmatter records a **targeted source audit**, not independent clinician signoff or a systematic review. These are indication/reporting references, not scanner prescriptions or supervised procedure training. No CTU, RUG/VCUG, MAG3, renal pharmacology, or Epic content was modified in this task.

## Material corrections

| Area | Previous problem | Result |
|---|---|---|
| PFUI MRI | Fixed gap/angle thresholds dictated pubectomy or an abdominal approach; MRI was universally more accurate by a fixed number of millimeters; static appearance implied functional bladder-neck competence | MRI is an ancillary posterior-urethral study; report anatomy and uncertainty with RUG/VCUG/endoscopy. Small-series accuracy is explicitly limited |
| Female diverticulum MRI | Near-infallibility, signal proving or excluding carcinoma, a fixed diverticular-neck rule for continence surgery | Characterization and surgical planning retained; diagnostic discrepancies and missed cancers in the original Chung series are visible; no scan-only tissue diagnosis or procedure selection |
| Prolapse MRI | Routine preoperative imaging; a single descent table applied across different compartments; an unsupported levator grade drove mesh choice | Examination and symptoms lead; selective defecography, coached evacuation, explicit reference line/phase, and separate rectocele versus anorectal-descent reporting |
| VVF and mesh MRI | Fixed millimeter rules for route/flap/stent; normal imaging implied exclusion of complications | Problem-specific MRI with examination, endoscopy, operative history, and tissue context; no imaging-only route selection |
| Peyronie's MRI | Routine MRI; unsupported signal-based oral treatment claims; an unsafe intraurethral Trimix instruction | Routine MRI removed from the pathway; clinical/selected ultrasound assessment and dedicated ED/Peyronie's pages |
| VI-RADS | Universal percentage risk table and reconstruction “clearance” | Brief scope-appropriate explanation of five-point muscle-invasion likelihood and pathology limits |
| MRU/contrast | Automatic gadolinium half-dose in renal impairment; indiscriminate modality hierarchy; F+15/F−15 equivalence | Static-fluid versus excretory MRU distinguished; question-specific imaging, noninterchangeable named diuretic protocols, current ACR agent-specific NSF guidance |
| MRI implants | No meaningful device-system safety assessment | Exact active generator/lead/retained component identification and current MR conditions; uncertain or unmet conditions go through formal MR service assessment |
| SUG fibrosis | A universal four-grade named algorithm equated ultrasound with histological depth and prescribed surgery | Descriptive appearance/distensibility; direct Nash biopsy discrepancy evidence and EAU uncertainty; no automatic operation from depth or circumference |
| SUG technique/outcomes | Fixed catheter/balloon/fluid instructions, automatic extra centimeter of surgical margin, unsupported universal accuracy percentages | Supervised gentle acquisition principles, contextual measurement, small-cohort design/sample information, no fixed instrument or graft-sizing prescription |
| Renal ultrasound | Fabricated adult SFU/ESUR AP-diameter ladder; dilatation equated with obstruction; universal annual surveillance/MAG3 rules | Clinical and renal-function context; selective MAG3/CTU/MRU; AUA NLUTD risk-specific imaging intervals |
| PVR/pelvic floor | Universal PVR and mobility thresholds, hiatal size implying surgery, mesh ultrasound as an exclusion test | No universal significant female PVR threshold; exact maneuver and clinical correlation; Dietz 25-cm² proposal presented with its modest sensitivity/specificity |
| Endoanal/penile studies | Endorectal ultrasound for Peyronie's; routine pre-urethroplasty penile duplex; pre-existing ED used to justify vascular sacrifice | Dedicated anal-sphincter indications, 2026 IUGA resource-sensitive imaging pathway, selective ED duplex and preserved vascular caution |

## Primary evidence checked

- [McAninch 1988](https://doi.org/10.1016/S0022-5347(17)42391-3): 17 patients; operative comparison in 7 and full-depth biopsies in 5. Preliminary findings do not justify a universal four-grade intervention algorithm.
- [Nash 1995](https://doi.org/10.1016/S0022-5347(01)67231-8): 123 paired examinations, 101 patients, 110 strictures. Histological depth prediction was unreliable in the 36 patients with full-depth biopsies. This directly contradicts the inherited depth-accuracy claim.
- [Morey 2000](https://doi.org/10.1016/S0022-5347(05)67696-3): sonographic staging review/chart experience, corrected from the inherited wrong year/identity; distensibility and complicated anterior disease context retained.
- [Oh 2010](https://doi.org/10.1016/j.juro.2009.10.016): prospective 25-man posterior-stenosis imaging comparison; supports adjunctive MRI, without a universal length correction.
- [Chung 2010](https://doi.org/10.1016/j.juro.2010.02.016): 10 discrepancies among 41 operated patients with MRI, including two missed intradiverticular cancers. Corrected DOI ending `.016`, not `.012`.
- [Dwarkasing 2011](https://doi.org/10.2214/AJR.10.6144): MRI diverticulum/differential diagnosis series; useful morphology does not establish universal perfect sensitivity.
- [Dietz 2008](https://doi.org/10.1002/uog.5355): retrospective 544-woman tertiary-clinic dataset; Valsalva area >25 cm² proposed, with sensitivity 0.55/specificity 0.77 for symptomatic prolapse. Corrected PubMed identity 18470963.
- [Dietz 2007](https://doi.org/10.1002/uog.3951): specialized tomographic levator assessment; no generic gap-to-treatment rule.

The selected studies were checked through the published indexed abstracts and source metadata; complete operative supplements and all raw imaging datasets were not reviewed. Thirteen unique DOI identities in these two pages were independently resolved through Europe PMC; `imaging-source-check.json` records exact lookup URLs, identities, and linked-notice metadata. Identity resolution is not a comprehensive correction/retraction clearance.

## Guidance checked

- [EAU urethral stricture diagnostic evaluation, 2026](https://uroweb.org/guidelines/urethral-strictures/chapter/diagnostic-evaluation): RUG/VCUG, adjunctive MRI, and explicit uncertainty about the clinical relevance of preoperative spongiofibrosis degree.
- [EAU female LUTS diagnosis](https://uroweb.org/guidelines/non-neurogenic-female-luts/chapter/diagnosis) and [disease management](https://uroweb.org/guidelines/non-neurogenic-female-luts/chapter/disease-management): PVR, urethral diverticulum, and fistula indications/limitations.
- [NICE NG123](https://www.nice.org.uk/guidance/ng123/chapter/recommendations): selective imaging, clinical prolapse assessment, mesh-complication testing. The direct page sometimes returned access denial; the indexed official recommendation excerpts were inspected rather than treating a failed fetch as confirmation of every paragraph.
- [ACR pelvic-floor criteria](https://acsearch.acr.org/docs/3083064/Narrative/) and [2024 hydronephrosis criteria](https://doi.org/10.1016/j.jacr.2024.02.020): scenario-dependent modality selection.
- [ESUR/ESGAR pelvic-floor MRI consensus](https://doi.org/10.1007/s00330-016-4471-7): full accessible article inspected, including acquisition, PCL and compartment-specific measurements; universal scanner settings and grading tables removed.
- [ACR contrast manual](https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/Clinical/Contrast-Manual/ACR-Manual-on-Contrast-Media.pdf): official downloaded PDF is **2026**, despite stale landing-page text; renal/NSF and pregnancy chapters inspected.
- [ACR MR safety manual](https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/Clinical/Radiology-Safety/Manual-on-MR-Safety.pdf): official downloaded PDF contains 2026 copyright/revision history but its extracted cover still says 2024. Article cites the current downloadable manual and inspection date, with 2026 revisions, rather than pretending this artifact is internally consistent. Implant identification/conditional-use/risk-assessment sections inspected.
- [AUA/SUFU NLUTD](https://www.auanet.org/documents/Guidelines/PDF/NLUTD.pdf): stable low-/moderate-/high-risk surveillance distinction.
- [EAU ED](https://uroweb.org/guidelines/sexual-and-reproductive-health/chapter/management-of-erectile-dysfunction) and [penile curvature](https://uroweb.org/guidelines/sexual-and-reproductive-health/chapter/penile-curvature): selected duplex, response limitations, and no routine Peyronie's MRI.
- [IUGA OASI 2026](https://doi.org/10.1007/s00192-026-06642-3): accessible full text inspected for endoanal/transperineal imaging pathway; no claim that the entire OASI guideline is newly incorporated into clinical pages.
- [Original VI-RADS framework](https://doi.org/10.1016/j.eururo.2018.04.029) and [MRU technical paper](https://doi.org/10.1148/rg.281075077): limited sequence/modality framing, not expanded oncology or scanner-dose protocols.

## Validation

- Citation check: 1,187 files, no issues.
- Internal-link check: 1,187 files, no broken `/docs/` targets; corrected the initially mistyped VVF route.
- Evidence registry: all 14 studies and 7 core pathway bindings valid.
- TypeScript check: passes after the concurrent ClinicalFigure declaration fix.
- Docusaurus `compileToJSX` (including its required heading-ID preprocessor): both pages compile; all 60 MRI and 42 ultrasound historical IDs verified in compiled output; no duplicate source IDs.
- `git diff --check`: passes.
- Final integrated production build belongs to root. No GUI, visible browser, or app interaction occurred.

A first direct low-level processor invocation omitted Docusaurus's heading-ID preprocessor and rejected `{#id}` syntax; the actual `compileToJSX` loader path passes. This was a verification-harness issue, not a source workaround.

## Remaining review limits

A clinician/radiologist should still review complete pages, local scanner and device protocols, detailed procedural technique, and patient-specific applications. This pass deliberately removes unsupported universality; it does not validate every nearby clinical, imaging, or drug-hub article. In particular, the dedicated penile Doppler and anal-sphincter procedure pages retain their own separate review scope.
