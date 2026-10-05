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

## Follow-up: claim-level number check and second sample (October 4, evening)

**Number check:** `scripts/review/claims.py` extracted every cited sentence or table row containing a statistic (11,788 claims on 1,036 pages). For each one, a Codex checker using `claim-checker-brief.md` at high reasoning opened the source and tested value, population, endpoint, time point, denominator and attribution. A separate Codex verifier then tried to refute each proposed fix, and Claude reviewed the high-severity fixes before publishing (`orchestrate.py --claims`).

| Number check | Count |
|---|---|
| Claims checked (every claim got a status) | 11,788 |
| Correct | 8,746 (74%) |
| Error | 2,798 (24%) |
| Unverifiable (source not openable) | 244 (2%) |
| Verified edits published | 2,745 on 710 pages (high 1,295, medium 1,450) |
| Verifier rejections | about 1% |

**Second sample:** 30 new random pages (seed 20261005, none from the first sample), reviewed with the same ultra-reasoning method.

| | Sample 1 (after second review) | Sample 2 (after number check) |
|---|---|---|
| High-severity accuracy errors per page | 1.57 (95% CI 1.0–2.1) | 1.37 (95% CI 0.94–1.79) |
| Pages with at least one | 22/30 | 21/30 |
| Of which numeric (wrong number, population, endpoint, denominator, time point) | about 38 of 47 | about 19 of 41 |

**Interpretation:**
- Numeric misattribution, the error class the number check targeted, roughly halved: from about 1.3 to about 0.6 per page.
- The headline rate fell less because the thorough reviewer now reports more non-numeric issues. These include operative-technique nuance (Mayo scissors in mature scar, the Heaney fixation stitch on vascular pedicles, Breisky use during laparoscopy), guideline scope or strength, and over-absolute statements. Many are judgment calls rather than factual errors.
- Some numeric errors survived the single number-check pass (for example the penile-fracture 3.9% pooled estimate and the Allaire combined-surgery cohort), so one pass is not exhaustive.
- Agents occasionally disagree: the MASTER risk-difference sign was judged one way on one page and the other way on another. The trial's Results text settles it (−3.6, sling minus AUS), and both pages now agree.
- Both samples' fixes are published (`4459ee95`, `792c17f7`).

**Implication:** another full AI pass costs about the same and yields fewer clear factual errors per token. The remaining rate is near the floor of what automated review defines consistently. Better value now:
- a pre-publication gate, so new or rewritten pages get the number check and page review before going live;
- a quarterly 30-page sample to track the rate;
- named clinician review of the highest-traffic pages for the judgment-type issues AI review cannot settle.

## Claim-level pass and pre-publication gate (October 4–5)

- **Gate:** `scripts/review/gate.py` and `npm run lint:claims` (part of `npm run lint` and CI).
  - Every sentence or table row stating a statistic or an absolute (always, never, contraindicated, eliminates, no risk, first-line, gold standard and similar, excluding negated hedges) must have an entry in `reports/audit-v2/claims-ledger.json` or appear in the shrinking baseline.
  - New or edited claims fail lint until checked.
  - The check workflow: `gate.py pending <files>` → `orchestrate.py --work <dir> --claims` (Codex checker, then Codex verifier) → `REVIEW_WORK=<dir> apply.py list`, Claude review, then `cycle.sh`, which records the verified claims in the ledger.
- **Pass on the 9,592 claims never checked at claim level:**
  - 5,199 numbers cited only by their paragraph or table;
  - 1,810 numbers with no nearby citation;
  - about 2,400 absolutes.

  Codex checked each one against the opened source and recorded the supporting quote:

  | Verdict | Claims |
  |---|---|
  | Error | 4,804 |
  | Ok | 4,344 |
  | Style (operative teaching) | 343 |
  | Unverifiable | 101 |

  4,231 verified edits went out on 788 pages (high 947), and 334 checker errors were rejected by the verifier. Most medium edits attach the supporting citation to the sentence or row itself. Unsourced numbers were replaced with sourced figures or removed, and absolutes were matched to the source's strength.
- **Ledger state:**

  | Status | Claims |
  |---|---|
  | Verified ok | 12,986 |
  | Fixed after verification | 6,638 |
  | Ok after verifier review | 348 |
  | Operative style | 343 |
  | Source needed | 300 |
  | Baseline awaiting a decision | 230 |
- **Open items:**
  - [sources-needed.md](sources-needed.md): references the checks could not obtain;
  - [claims-needing-decision.md](claims-needing-decision.md): 225 flagged claims the verifier would not settle automatically.
