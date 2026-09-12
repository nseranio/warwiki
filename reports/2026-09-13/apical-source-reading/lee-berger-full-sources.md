# Apical source-gap closure — Lee 2025 and Berger 2024

Completed 2026-09-13. Read-only source review; no clinical sign-off. Both complete mains, all six tables, all 52 reference entries and both actual figure assets are read. Two Berger supplements remain unread.

## Exact scope

### Lee 2025: Effectiveness of Obliterative Surgery in Managing Advanced Apical Prolapse in Elderly Women: A 20-Years of Single Surgeon’s Experience
[Original full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC12072326/); DOI 10.3390/jcm14093101.
- Complete text: 44,268 characters / 44,455 bytes. Read ranges (half-open): [[0, 15000], [15000, 30000], [30000, 44268]].
- Text SHA-256: `094743390126075cd22468d2d5e67a0aa31577f3986f8cb58d539cb403bbdf41`; HTML SHA-256: `0a0b2d1633c55ff447949ff43cfcbea008892eb8f5db55b9176073c83fda4797`.
- Three complete tables, all 24 references, disclosures, and actual Figure 1 read. Actual image: `/tmp/warwiki-apical-extra-sources/PMC12072326-fig1.jpg` (SHA-256 `eb4669f15954398777bd9c4d509e8930e5e250c242954c4e0df207c02abe72a8`).
- Supplement status: No supplement identified in complete main; data available on request is not a supplied supplement.

### Berger 2024: Longitudinal Reoperation Risk After Apical Prolapse Procedures in Women Aged 65 Years and Older
[Original full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC10994006/); DOI 10.1097/AOG.0000000000005511.
- Complete text: 35,146 characters / 35,620 bytes. Read ranges (half-open): [[0, 12000], [12000, 24000], [24000, 35146]].
- Text SHA-256: `1d86748a910e43c140f7caed2c265e7fa3739ca09673ef1e5dcb209767c75a61`; HTML SHA-256: `20d0ca176f723973753885c462740d4787399b5c3f3410660130edf5b1791b9b`.
- Three complete tables, all 28 references, disclosures, and actual Figure 1 read. Actual image: `/tmp/warwiki-apical-extra-sources/PMC10994006-fig1.jpg` (SHA-256 `c4de4bd8e656b8015e1575529cd0ebaa8add100da331165ceaaff4f9b82ce965`).
- Supplement status: Both observed PMC binaries returned 1817-byte text/html challenge responses despite HTTP 200; renamed response.html. Publisher/DOI searches did not reveal usable actual supplementary links. Main Appendix 1 pointer is placeholder http://links.lww.com/xxx. Bounded access attempt stopped.

## Lee: implications and source problems

- Single-center, single-surgeon retrospective accrual January 2006–February 2025: 83 planned procedures, two converted to vaginal hysterectomy because adequate exposure could not be obtained, and 81 completed Le Fort colpocleisis. Twenty years describes accrual/experience, not standardized 20-year patient follow-up.
- 96.3% success corresponds to three reported recurrences among 81 completed procedures. Duration and completeness of objective follow-up are insufficiently specified for a fixed-time risk estimate. No vaginal wall beyond the hymen and POP-Q stage <=1 are internally conflated although these definitions differ.
- 98.4% satisfaction is 63/64 questionnaire respondents, with 17/81 missing. Questions were simplified/unvalidated; clinic/telephone and potentially family/caregiver responses were accepted. Do not apply this percentage to all operated patients.
- Operative times decreased after a visually chosen first-20-case division (median 127.5 versus 77 minutes, 20 versus 61 procedures). Actual scatterplot has no fitted learning-curve/change-point model or confidence interval. This is not a validated minimum number for proficiency; calendar-era and case-mix confounding remain.
- Discussion reverses the cited PEOPLE randomized trial by asserting pessary noninferiority was met. Parent has already read the primary PEOPLE report, which did not meet its prespecified noninferiority criterion; do not copy Lee’s secondary summary.
- Transient events were reported in 17/81 (21%). The report does not prove negligible risks for all frail patients. Permanent loss of all sexual activity is an overstatement; distinguish vaginal penetration. No universal concomitant sling indication follows.
- Other internal inconsistencies: success-definition mismatch, operative mean/median wording, satisfaction cause attributed differently in results and discussion, eight comorbidity groups followed by nine names, and hemoglobin units inappropriate for the reported values. These are source-reporting issues, not grounds to invent corrected data.
- Priority: source-gap closure, not a new practice-changing study. Keep current NICE/major cohort interpretation; no added operative precision or universal success claim.

## Berger: implications and source problems

- Retrospective CMS 5% Limited Data Set study of women >=65; index procedures in 2011–2018, follow-up through 2019. Restricted to discharge on day 0 or 1 and >=12 months continuous postoperative fee-for-service coverage. Excluded cancer and other concomitant abdominal/pelvic-specialty procedures. Results cannot represent all inpatient/high-acuity prolapse surgery.
- Main/abstract report N=4098, but arm counts 1034 SCP +717 USLS +1529 SSLF +809 colpocleisis sum to 4089, matching Table 1 caption. Do not silently correct the discrepancy or imply its cause.
- Groups differed substantially: median age 79 for colpocleisis versus 70–72 for other approaches, comorbidities, hysterectomy and sling use. Codes include uterine-preserving equivalents and cannot distinguish hysteropexy from vault repair. Associations do not establish comparative causal superiority.
- Table 2 seven-year POP reoperation estimates: colpocleisis 2.9%, SCP 7.3%, USLS 7.7%, SSLF 9.9%. Any reoperation: 7.3%, 12.5%, 10.4%, 15.0%, respectively. Complication reoperation: 5.3%, 8.2%, 6.4%, 8.2%. These are surgery endpoints, not anatomic recurrence, all complications or patient-reported success.
- Death and insurance exit were censored for Kaplan–Meier estimates; this is not a competing-risk estimate accounting for death. Only 962 (reported 23.5%) had >=7 years of follow-up. No number-at-risk table is in the actual figure.
- Methods/Table 3 specify multivariable logistic regression with odds ratios; results call it Cox regression. Preserve Table 3 adjusted OR 0.48 (95% CI 0.32–0.72) for colpocleisis versus SCP, not hazard ratio. USLS 0.81 (0.57–1.15), SSLF 1.15 (0.88–1.50) versus SCP are not statistically different. Exact model implementation remains unresolved without supplemental methods.
- Actual Figure 1 has three panels (any, complication, and POP reoperation) although caption names recurrent prolapse alone; colored curves qualitatively agree with tabulated endpoints. No exact CIs or counts are supplied by the image. Suppressed one-year colpocleisis POP cell does not mean zero.
- Additional limitations: Table 3 exclusion footnote and model denominator relation are unclear; raw/overall versus curve-derived totals cannot simply be added; source p-value/model nomenclature errors should not be copied. Two supplementary PDFs remain unread.

## Colpocleisis page peer check

Read the entire current MDX (16,490 characters; 16,516 bytes; SHA-256 `3764dfe03a51eadd41b32d310d56d684d313d5310dec0e2ce53fe997526b7263`).
No new mismatch requiring an edit. Existing page distinguishes selected cohorts, penetration from other sexuality, recurrence from reoperation, and individualized hysterectomy/sling choices. Neither Lee nor Berger is currently cited; retain the current higher-priority sources. Optional Berger observational context belongs in the parent apical overview with its population and endpoint qualifications. No diagram import; two videos remain unviewed.

## Access gaps

- Observed but unread: https://pmc.ncbi.nlm.nih.gov/articles/instance/10994006/bin/NIHMS1952766-supplement-Supplemental_Digital_Content_1.pdf
- Observed but unread: https://pmc.ncbi.nlm.nih.gov/articles/instance/10994006/bin/NIHMS1952766-supplement-Supplemental_Digital_Content_2.pdf

Both returned HTML challenge content, not PDFs; response files are correctly suffixed `-response.html`. Official publisher/DOI discovery attempts did not expose usable supplementary links. Original access logs preserve the initially requested filenames; the report records the subsequent renaming. No access challenge was bypassed.

Machine-readable scope, hashes, exact boundary fragments, and findings: `/tmp/warwiki-apical-extra-source-review.json`. No site files were changed.
