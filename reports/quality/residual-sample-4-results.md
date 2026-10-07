# Residual sample 4: results (October 7, 2026)

Preregistered in [residual-sample-4-protocol.md](residual-sample-4-protocol.md) before review (`bbf67661`). Draw: [residual-sample-4.json](residual-sample-4.json). Classification: [residual-sample-4-classification.json](residual-sample-4-classification.json). Statistics: `python3 scripts/quality/residual_stats.py reports/quality/residual-sample-4-classification.json`. Raw findings and verdicts: `reports/audit-v2/sources-local/quality/residual-sample-4/` (ignored).

## Measured result

Revision `509f5ccd`; frame of 1,083 eligible clinical and foundational pages (sections 01–05, hubs included); simple random sample of 60 pages (seed 20261007); every page reviewed and verified (none dropped or replaced).

| Measure | Estimate | 95% interval |
|---|---|---|
| Serious factual errors per page | **1.37** (82 errors) | 0.97–1.76 (t, finite-population corrected) |
| Pages with at least one serious factual error | **38/60 (63%)** | 50%–75% (exact) |
| Consequential omissions and missing newer guidance per page | 1.22 (73) | 0.91–1.52 |
| Combined serious defects per page | 2.58 | 2.05–3.11 |

This is the detected rate under this method at this revision for eligible clinical/foundational pages. It is not whole-website accuracy, and detection is imperfect.

## Review and counting

Codex reviewers (`residual-brief.md`, ultra reasoning, forbidden to open audit records) raised 817 findings on the 60 pages (165 high, 417 medium, 235 low); Codex verifiers confirmed 163 high findings (agree 74, modify 86, no_edit 3; 2 rejected) on 49 pages. Claude classified the 163 under the preregistered rule: 82 serious factual errors; 73 omissions or missing newer guidance (reported separately); 5 duplicates of an error already counted on the same page; 3 about a linked page rather than the sampled page.

Where the 82 are: Treatment Atlas 40 (22 pages sampled), Foundations 36 (32 pages), Evaluation 3, Special Populations 2, Clinical Conditions 1. By type (keyword grouping, approximate): qualitative anatomy, operative technique and guidance scope about 35; number attached to the wrong denominator, endpoint, arm or population about 32; misattributed citation or study about 15. Concentrations: Cecil–Culp (5), manual modeling of penile prostheses (5), feminizing surgery (6), biomaterials hub (6), Yao butterfly flap (4), urethral diverticulum repair (4).

## Comparison with earlier samples (descriptive only)

| Sample | Date | Pages | Serious errors per page | Pages affected |
|---|---|---|---|---|
| 1 | Oct 4 | 30 | 1.57 | 22/30 |
| 2 | Oct 5 | 30 | 1.37 | 21/30 |
| 3 | Oct 5–6 | 30 | 0.83 | 13/30 |
| 4 | Oct 7 | 60 | 1.37 | 38/60 |

Not a trend. Sample 4 used a stricter, record-everything brief that barred reviewers from audit material, a frame that adds hub pages, and twice the sample size; samples 1–3 pre-date about 1,000 later corrections. The higher detection here more likely reflects the method than new errors; sample 3's lower figure was a 30-page estimate with a wide interval (0.31–1.36), which overlaps this one.

## Negative audit

11 of 60 pages had no confirmed high finding. Five of them, drawn with seed 20261007 ([residual-sample-4-negatives.json](residual-sample-4-negatives.json)), were rechecked by a Claude reviewer (about 55 claims checked against opened sources): **0 serious factual errors found**. Noted: two consequential omissions (ACOG's &lt;0.5 cm threshold beside NICE's &lt;1 cm² on the polypropylene page; incomplete blade-compatibility lists on the scalpel-handle page), one mild inference stated as a finding (scalpel handles, Wu 2009), an internal tension on the Heaney stitch page (second tie on the uterine pedicle versus "non-vascular pedicles"), and nine claims that could not be checked at source (NIH ODS vitamin D sheet blocked; KDIGO and ASMBS sources not opened; manufacturer pages blocked). Five pages is a small check; it found no evidence that the reviewer missed serious errors on clean pages, and it does not bound the miss rate.

## What the result says about the controls

- The claim gate and the October 6–7 rechecks targeted numbers, doses, guideline statements and contraindications. The residual errors are dominated by content those controls do not extract: anatomy, operative steps, technique attribution, eponym history and the scope of guidance, plus numbers inside long technique tables.
- Technique pages built from several small series accumulate attribution drift (rows citing the wrong series, figures from one cohort assigned to another).
- More passes of the same number-focused check will not move this rate much. The next repair effort should be full-page, source-grounded review of technique and anatomy content, starting with the Treatment Atlas.

## Not yet done

- Repairs: findings were recorded before any edit; the agreed edits will be applied and rechecked separately, and those pages then no longer represent the untouched site.
