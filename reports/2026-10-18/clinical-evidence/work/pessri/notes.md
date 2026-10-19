# PESSRI source and reconciliation notes

## Sources opened

- **Primary report:** Cundiff GW, Amundsen CL, Bent AE, et al., *Am J Obstet Gynecol.* 2007;196(4):405.e1-405.e8. DOI [10.1016/j.ajog.2007.02.018](https://doi.org/10.1016/j.ajog.2007.02.018); PMID [17403437](https://pubmed.ncbi.nlm.nih.gov/17403437/). PubMed abstract opened and read: https://pubmed.ncbi.nlm.nih.gov/17403437/ . **Source level: abstract.** PubMed verifies authors, title, year, journal, volume, issue, electronic pages, DOI and PMID. The publisher's indexed Materials and Methods and Results excerpts at https://www.sciencedirect.com/science/article/pii/S0002937807002529 supplied stage II eligibility and the initial sequence allocation (71 ring, 63 Gellhorn), but the article page itself returned HTTP 403. These excerpts were not counted as full-text access.
- **Guideline:** ACOG/AUGS Practice Bulletin 214, *Obstet Gynecol.* 2019;134(5):e126-e142. DOI [10.1097/AOG.0000000000003519](https://doi.org/10.1097/AOG.0000000000003519); PMID [31651832](https://pubmed.ncbi.nlm.nih.gov/31651832/). Full local text read at `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/pdfs-2026-10-09/pelvic-organ-prolapse-acog-practice-bulletin-number-214.txt`, specifically journal e129 and Summary of Recommendations and Conclusions; PubMed verified bibliographic metadata. Its Level B pessary recommendation appears in the summary, and reference 37 is PESSRI.

## Access and selection

- No PESSRI paper text or author-named PDF was found in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine`, or `/Users/joyboy/Downloads`. The owner source search found audit logs and guideline references, not the primary article.
- The open Zenodo record https://zenodo.org/records/896561 links to `article.pdf` at https://zenodo.org/records/896561/files/article.pdf . The PDF endpoint failed in the web reader with a Unicode decoding error; direct shell retrieval failed DNS resolution. Its existence does not count as a full-text read. An owner-accessible download of this PDF is the clear next source for page-level PFDI/PFIQ scores, crossover completion, fitting methods, harms, and any formal outcome threshold.
- PubMed and the publisher identify the issue as April 2007. An exact online publication day was not verified, so `published` uses `2007-04-01` with `dateApprox: true`.
- Searches found no separate long-term or secondary PESSRI cohort report to include. The later 2011 one-year retrospective pessary cohort, 2023 pessary-versus-surgery randomized trial, and 2024 collapsible-pessary study concern different populations or interventions; they are not PESSRI reports. Their search records were considered but no results imported.
- The abstract gives no numerical questionnaire scores, between-device effect size, confidence interval, prespecified equivalence margin, or device-specific harms. `met` is therefore null for each candidate primary endpoint. `type: superiority` is the schema's comparative-trial classification; a formal superiority hypothesis could not be verified. The abstract calls the devices “equivalent,” but no formal equivalence test was available to establish `verdict: noninferior`.
- `relations` is empty: none of the permitted trial IDs is a direct PESSRI follow-up or a trial testing the same device-selection question.

## Reconciliation with WARWIKI

- `docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/prolapse-pessaries.mdx`, line 49: “134 women ... used a ring with support and a Gellhorn pessary for 3 months each” can imply that all 134 completed both periods. The primary abstract says 134 enrolled, but three-month data were collected for only 94 ring periods and 99 Gellhorn periods (PubMed abstract, Study design and Results). The rest of that paragraph—the median POP-Q stage III, 94/99 available period counts, improvement in PFDI/PFIQ, and no clinically significant difference—agrees with the abstract.
- `docs/07-roots/surgeons/a-g/geoffrey-cundiff.mdx`, line 35: its description of PESSRI as a randomized crossover trial of ring versus Gellhorn symptom relief and life impact agrees with the abstract.
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/continence-pessary.mdx`, line 18: its contrast between continence pessaries and prolapse ring/Gellhorn devices is outside the PESSRI outcome comparison; no conflicting PESSRI number was found.

## Old Journal Club record

- The record's `n: 134`, crossover design, three-month *planned* use of each device, journal/year, and DOI agree with the abstract. Its population phrase “fitted with a pessary” is stronger than the reported enrollment criterion, women presenting with symptomatic POP; fitting occurred during the trial.
- “Both ... relieved prolapse symptoms comparably” tracks the reported absence of a clinically significant difference, but the record's advice to “fit by anatomy and patient comfort rather than presumed efficacy” is a practice extrapolation not tested by this randomized comparison. The record also treats “symptom relief and quality-of-life / satisfaction scores” as a primary outcome; the accessible abstract names these measures but does not identify a prespecified primary endpoint or equivalence margin.
- No unverified numerical claim from the old record was copied into the new files.

## Verification remaining

- Read the full PESSRI PDF before clinical review. Confirm the endpoint hierarchy, statistical hypothesis, paired completion count, quantitative scores and effect estimates, adverse events, fitting/crossover technique, and any washout or carryover handling. The page and trial file are explicitly marked abstract-level until that work is done.
- No percentage was used in the trial file or page, so there is no numerator/denominator percentage to recalculate. The denominator distinction that matters here is 134 enrolled versus 94 and 99 device-period data sets.
