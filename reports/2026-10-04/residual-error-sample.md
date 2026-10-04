# Residual-error sample after the second review (October 4, 2026)

**Question:** after the full-site second review (high reasoning), how many serious errors remain per page?

## Method

- **Sample:** 30 pages drawn at random (seed 20261004), stratified by audit tier: tier 1 had 1 page, tier 2 had 4, tier 3 had 17 and tier 4 had 8. Page list: `reports/audit-v2/sources-local/residual-sample/pages.json`.
- **Review:** Codex reviewed every page with the full brief at ultra reasoning, and Codex verifiers tried to refute each finding (`scripts/review/orchestrate.py --work ... --pages ... --full-brief --effort ultra`).
- **Claude check:** Claude read all confirmed high-severity accuracy findings. Ten were checked against their PubMed abstracts, plus the current page text, and every one checked was a real error.
- **Fixes:** the 209 verified edits were published (`4459ee95`).

## Result

| Measure | Value |
|---|---|
| Findings | 246 (high 75 confirmed) |
| High-severity accuracy errors per page | **1.57** (95% CI 1.0–2.1) |
| Pages with at least one high-severity accuracy error | 22/30 |
| Pages with any high-severity finding | 26/30 |
| Range per page | 0 to 7 (suspensory ligament division had 7) |
| Cost | about 220,000 Codex tokens per page (review plus verification), against about 155,000 in the main run |

Extrapolated to about 1,036 pages, roughly 1,000–2,200 serious accuracy errors remained after the second review.

## What the errors are

Almost all are the same class the first pass found: a correct paper with the wrong subgroup, endpoint, denominator or time point.

- **Wrong endpoint:**
  - stretched length reported as flaccid length (Li 2006);
  - a composite "scope passage or Qmax > 15" reported as patency;
  - an eight-week secondary endpoint reported as the primary.
- **Mixed cohort attributed to one operation:**
  - Panfilov's 88 patients, of whom 31 had ligament release;
  - a 14.6% pooled augmentation complication rate shown as a ligament-division rate;
  - a 9.7% instability rate from a combined-procedure arm.
- **Selected denominator hidden:** Goddard's 98% came from 70/233 patients reached by phone.
- **Two endpoints merged into one range:** Nie 2009's fistula 1.5% and obstruction 4.7%. The pilot found this on the technique page, but the copy on the condition page was never fixed.
- **Fewer, but more consequential:**
  - a wrong gracilis pedicle description;
  - an over-absolute Johanson stage-1 instruction;
  - the Optilume penile indication labelled off-label;
  - a midodrine label instruction softened.

## Interpretation

Detection is not saturating: a second, more thorough pass on already-reviewed pages still found about 1.6 serious errors per page. Page-level review alone is unlikely to converge cheaply. The dominant error class is mechanical (a numeric claim detached from its population, endpoint, denominator or time point), so it can be targeted claim by claim.
