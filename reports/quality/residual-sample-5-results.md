# Residual sample 5: results (October 8, 2026)

Preregistered in [residual-sample-5-protocol.md](residual-sample-5-protocol.md) (`40aa442f`) before any review. 60 pages drawn from 1,023 (sample 4's frame minus its 60 pages). Codex full-page review, residual brief, ultra effort, 2 reviewers and 1 verifier. Classification: [residual-sample-5-classification.json](residual-sample-5-classification.json); statistics: `python3 scripts/quality/residual_stats.py reports/quality/residual-sample-5-classification.json`.

## Headline

| Measure | Sample 5 (after the page-review phase) | Sample 4 (before) |
|---|---|---|
| Serious factual errors per page | **1.15** (95% CI 0.75–1.55) | 1.37 (0.97–1.76) |
| Pages with at least one | 31/60, 52% (exact CI 38–65%) | 38/60, 63% (50–75%) |
| Consequential omissions per page | 1.12 (0.84–1.40) | 1.22 |
| Combined serious defects per page | 2.27 (1.70–2.84) | 2.59 |
| Negative audit (5 pages without confirmed high findings) | 0 serious errors | 0 |

142 high-severity findings were confirmed by the verifiers; 58 were omissions or currency gaps, 4 were excluded (source internally inconsistent, unnamed endpoint, layout, citation support for correct anatomy), and 2 were duplicates on the same page, leaving 69 serious errors on 31 pages.

## By stratum (pre-specified)

| Stratum | Pages sampled / frame | Serious errors per page | Pages affected |
|---|---|---|---|
| In the October 7–8 full-page review | 19 / 527 | 0.89 (0.21–1.58) | 9/19 |
| Not in that review | 41 / 496 | 1.27 (0.76–1.78) | 22/41 |
| Post-stratified site-wide estimate | | 1.07 (0.67–1.48) | |

The draw under-sampled reviewed pages (19 against about 31 expected); the post-stratified estimate corrects for that. Of the 17 errors on reviewed pages, 14 sat in text that predates the review (missed by it) and 3 in sentences changed during it.

By section: Foundations 27 errors on 30 pages; Treatment Atlas 15 on 16; Special Populations 15 on 5 (female sexual dysfunction, feminizing procedures, autonomic dysreflexia); Clinical Conditions 10 on 6; Evaluation 2 on 3.

## What the errors are

Mostly qualitative, as in sample 4: guidance scope (dilation offered after failed DVIU against AUA 11a; the unvalidated 60-degree curvature cut-off used as a firm boundary; original sliding presented as a current Peyronie's option against an EAU strong recommendation), endpoints, denominators and time windows (LAVA apical composite failure, priapism odds-ratio intervals, US Transgender Survey figures, a vasectomy pain denominator), device specifications (0.038-inch S-curve wire, AMS 800 cuff deflation before instrumentation, the Glean sensor caliber), and drug or label facts (bremelanotide receptor and dose limit, Artiss excluded from hemostasis).

## Caveats

- 49 of the 60 pages were also edited by the concurrent trust-the-reader caveat pass while the review ran. 138 of the 142 confirmed findings quote text identical in the frozen revision and the current file, so the effect on the count is negligible.
- Detection is imperfect; these are detected-error rates under one method. The stratum difference is not a clean effect estimate: the out-of-scope stratum also changed October 6–7.
- Interval overlap with sample 4 is large; the change is consistent with a modest reduction, not proof of one.

## Implication

The full-page review lowered the error rate on reviewed pages but did not exhaust it (about one serious error per page remains, mostly missed rather than introduced). The highest remaining rates are on pages outside that review: pharmacology, Special Populations and Clinical Conditions. Repairs for the 60 sampled pages follow (487 agreed edits, 6 scope vetoes).
