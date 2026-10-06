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

## Third sample, dose and guideline checks (October 5; paused for Codex credits)

- **Third sample** (seed 20261006, 26 of 30 pages completed): **0.85 serious accuracy errors per page** (95% CI 0.33–1.36), 12/26 pages affected, down from 1.57 and 1.37. One page (skin-graft vaginoplasty) carried 6 of the 22. Fixes published.
- **Dose check** (980 doses never checked): 16 of 38 batches done; 181 edits published. Most attach the supporting label or guideline citation. About 15 correct the dose itself:
  - gentamicin 7 mg/kg for pyelonephritis, not the bladder-only 5 mg/kg;
  - levofloxacin 500 mg daily for 28 days in chronic bacterial prostatitis;
  - nitrofurantoin regimen by formulation;
  - dalteparin reversal window;
  - EXPAREL 133 mg for adductor canal block;
  - pentosan titration to 75 mg.
- **Guideline-statement check** (all 2,351 statements attributed to a guideline body or regulator): 17 of 89 batches done; 72 edits published (scope, strength and label indication).
- **Claim gate:** doses and guideline statements are now gated kinds. 1,892 not-yet-checked dose and guideline claims are in the baseline.

**Resume (when Codex credits return):**
1. In `reports/audit-v2/sources-local/{dose-check,guideline-check,residual-sample-3}/`, delete `STOP` and set every `"failed"` page in `state.json` back to `"pending"` with `"tries": 0`.
   - Most failures were not credit-related: `~/.codex/config.toml` was switched at 12:05 to `gpt-6.1-sol`, which the ChatGPT login rejects.
   - The orchestrator now pins `gpt-6-sol` (`--model` overrides).
2. Rerun each run with the same command:
   - dose and guideline: `orchestrate.py --work <dir> --claims --effort high --tier default`;
   - residual-sample-3: `--pages <dir>/pages.json --full-brief --effort ultra`.
3. Publish with `REVIEW_WORK=<dir> apply.py list`, Claude review, then `cycle.sh`.
4. Then: cross-page consistency (`npm run consistency:same-source` plus Codex triage).
5. Last, after the cleanup: patient handouts, SmartPhrases and WARWIKI decks.

## Results after resuming (October 5, night)

All three paused runs finished and are published, each batch after Claude review, lint (claim gate and duplicate-reference check) and build.

| Run | Batches | Verified edits | Notes |
|---|---|---|---|
| Dose check | 38/38 | 518 (337 tonight) | 1 vetoed (it dropped the labeled 2.5 mg once-daily tadalafil ED dose); 15 claims source-needed |
| Guideline-statement check | 89/89 | 443 (371 tonight) | Mostly population, strength and FDA-indication scope; 41 claims source-needed |
| Third residual sample | 30/30 pages | 48 tonight | See below |
| Cross-page consistency | 19 Codex triage batches | 18 | 575 same-source clusters, 282 people candidates |

**Third sample, final (seed 20261006, 30 pages):**

| | Sample 1 | Sample 2 | Sample 3 |
|---|---|---|---|
| Serious accuracy errors per page | 1.57 (95% CI 1.0–2.1) | 1.37 (0.94–1.79) | **0.83 (0.31–1.36)** |
| Pages with at least one | 22/30 | 21/30 | 13/30 |

- **Counting rule:** Claude classified all 59 confirmed high-severity findings. 25 are accuracy errors: a wrong, misattributed or overstated statement, including a number attached to the wrong population, endpoint or time point. Omissions and findings whose original wording the verifier judged accurate are excluded.
- **Skin-graft vaginoplasty:** one page carried 7 of the 25. Without it the rate is 0.62.
- **Earlier figure:** the 0.85 reported at the pause covered 26 pages. Claude's reclassification of the same 26 gives 21 rather than 22. The classification is in `sources-local/residual-sample-3/high-confirmed.json`.

**Cross-page consistency:**
- **Method:** `npm run consistency:same-source` and `consistency:people` built the candidate lists. Codex triaged them, one agent per batch (brief and runner: `sources-local/consistency-2026-10-05/`), and Claude checked each proposal against PubMed, Crossref or the primary source before publishing (`c19c0372`).
- **Spot check:** Claude also reviewed the 38 clusters whose pages give disjoint sample sizes. All were subgroups or arms, not contradictions.

**Claim gate:**
- The baseline was rebuilt from 2,843 entries to 13 claims; most old entries were keys for sentences rewritten since October 4.
- The 13 remaining claims (7 dose, 2 guideline, 4 number) were then checked in `sources-local/gate-2026-10-05/`: 2 correct, 11 errors, 7 verified edits published (`0a60f08f`), including the label tadalafil once-daily regimen. No baseline claims remain; every gated claim is in the ledger.
- 56 new source-needed claims are listed at the end of [sources-needed.md](sources-needed.md).

**Next:** handouts, SmartPhrases and the WARWIKI Anki decks, only on the user's go-ahead.

## Reliability pass after the cleanup (October 5, late night)

The goal was to reduce errors and raise consistency without new user-supplied sources. Every batch went through Claude review of the verified sheet, DOI resolution for new references, lint (claim gate, duplicate references, card length) and build before it was pushed.

| Step | Method | Result |
|---|---|---|
| Retractions | `scripts/refs/retractions.py`: Crossref `updates` filter (includes Retraction Watch) on every cited DOI | 4 retractions/withdrawals, 1 expression of concern; 4 already labelled; the Sereno 2010 claim removed (`78269f00`) |
| Corrections and errata | Codex read the 155 papers with correction notices | No quoted clinical figure changed; 6 reference lines updated (`ad647b96`) |
| DOI discovery | Crossref match on 377 journal references without a DOI | 5 high-confidence DOIs added; the remaining matches were not confident enough to apply |
| Wrong-citation sweep | `scripts/consistency/citation_targets.py` (named study versus cited reference), Codex check, Claude verify | 43 candidates, 11 marker fixes (`659c4334`) |
| Cross-model sample | Claude reviewed the 30 third-sample pages already fixed by Codex; Codex verified | **0.30 further serious errors per page**; 25 edits (`0e94fa13`, `cfa50890`) |
| Open second-review findings | Codex final-editor pass on the 136 October 4 leads | 69 verified edits on 52 pages |
| Hub pages | 368 claims on `index.mdx` pages (previously outside every check); full ultra review of the seven largest hubs | 203 edits; `lint:claims` now gates hub pages (`a65b12ac`) |
| Risk-targeted ultra review | 150 pages ranked by numeric density, named studies, study-table rows, October 2–4 churn and section; full Codex ultra review with adversarial verifiers | 1,455 verified edits on 150 pages (510 high, 937 medium) in nine batches |
| Claude cross-check of the risk review | 20 top-ranked pages after that review | **0 high-severity findings**; 9 Codex-verified minor edits (`1283c705`) |

**Notes:**
- **Risk ranking:** the ranking correlated only weakly with errors in the three residual samples, so it was used as a priority order, not as a predictor. Most edits on these pages narrowed overclaims, restored the population, endpoint or denominator behind a number, separated guideline strength from text, or added a recent trial or guideline that changes the counseling.
- **Cross-check:** 0 high findings on 20 pages is consistent with fewer than about 0.15 remaining serious errors per page on reviewed high-risk pages (rule of three). It is not a site-wide rate; a fourth random residual sample would measure that.
- **Not done:** sources the user must supply remain in `sources-needed.md` and `needed-from-user.md`. About a quarter of correction notices could not be opened.
- **Commit and model:** final risk-review commit `58c69ac9`. `~/.codex/config.toml` still names `gpt-6.1-sol`; the orchestrator pins `gpt-6-sol`.
