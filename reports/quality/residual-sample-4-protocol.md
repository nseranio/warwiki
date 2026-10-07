# Residual sample 4: preregistered protocol (October 7, 2026)

Fixed before any review. Draw: [residual-sample-4.json](residual-sample-4.json) (`scripts/quality/draw_sample.py --n 60 --seed 20261007`), revision `509f5ccd`.

**Frame.** Every MDX page in sections 01–05 (Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations), hub index pages included: 1,083 pages. Excluded: surgeon profiles, History & Lineage (07), Resources (08), handouts, Anki, SmartPhrases. The estimate is **eligible clinical/foundational-page prevalence**, not whole-website accuracy.

**Design.** Simple random sample of 60 pages without replacement, equal inclusion probability 60/1,083 = 0.0554. Every selected page stays in the denominator; none is replaced or dropped.

**Review.** Codex, full page review with `scripts/review/residual-brief.md` (the standard reviewer brief plus an instruction not to open `reports/`, the claim ledger, audit status or git history), ultra reasoning as in samples 1–3; adversarial Codex verifiers then try to refute each high or medium finding. Findings are recorded before any repair. Command: `orchestrate.py --work reports/audit-v2/sources-local/quality/residual-sample-4 --pages <pages.json> --page-brief residual --effort ultra --reviewers 2 --verifiers 1`.

**Counting rule (unchanged from samples 1–3).** A serious factual error is a confirmed high-severity finding (verifier agree/modify/no_edit) that Claude classifies as a wrong, misattributed or overstated statement, including a number attached to the wrong population, endpoint, denominator or time point. Excluded from that count: omissions (reported separately), findings whose original wording the verifier judged accurate, citation placement on supported content, style and wording. Duplicate occurrences of one error on one page count once; the same error on two sampled pages counts on each.

**Outputs.**
1. Serious factual errors per page: mean with a t interval using the finite-population correction √(1 − 60/1,083); pages are the clusters.
2. Pages with at least one serious factual error: proportion with an exact (Clopper–Pearson) 95% interval; the finite-population correction is reported alongside.
3. Consequential omissions per page, separately, and combined serious defects.
4. Unknown status: pages where a consequential claim could not be checked are reported as "not fully assessed" and are never counted as clean.
5. An audit of negatives: Claude rechecks a random 5 of the pages with no high findings for missed serious errors and reports what it finds.

**What this cannot show.** Detection is imperfect (samples 1–3 showed non-saturating detection), so all figures are detected-error rates under this method. Samples 1–3 used a frame without hubs and pre-date about 1,000 later corrections; comparisons are descriptive, not a controlled trend.
