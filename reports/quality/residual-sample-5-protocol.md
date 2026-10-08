# Residual sample 5: preregistered protocol (October 8, 2026)

Diagnostic sample after the full-page review phase (chunks 1–4, about 5,130 edits on 525 pages). Fixed before any review. Draw: [residual-sample-5.json](residual-sample-5.json) (`scripts/quality/draw_sample.py --n 60 --seed 20261008 --exclude reports/quality/residual-sample-4.json`), revision `bc0eacf1`.

**Frame.** Sample 4's frame (every MDX page in sections 01–05, hubs included) minus the 60 sample-4 pages, which were repaired with knowledge of their findings: 1,023 pages. Of these, 527 were in this phase's review scope ([page-review-scope.json](page-review-scope.json)) and 496 were not.

**Design.** Simple random sample of 60 without replacement, inclusion probability 60/1,023. The draw contains 19 in-scope and 41 out-of-scope pages (expected about 31 and 29; the imbalance is chance and is reported, not corrected by redrawing).

**Review, counting rule and outputs.** Identical to [sample 4](residual-sample-4-protocol.md): Codex full-page review with `residual-brief.md`, ultra effort, `--reviewers 2 --verifiers 1`; findings recorded before any repair; the same serious-error definition; mean errors per page with a finite-population-corrected t interval; pages affected with an exact interval; omissions separately; a 5-page audit of negatives.

**Additional pre-specified analyses.**
1. Per-stratum means (in scope, out of scope) with t intervals. With 19 in-scope pages, the in-scope interval will be wide.
2. A post-stratified site-wide mean weighting the stratum means by their frame sizes (527 and 496), alongside the unweighted estimate.
3. Comparison with sample 4 (1.37 per page, 95% CI 0.97–1.76) is descriptive: the frames differ by the 60 sample-4 pages, and detection is imperfect.

**What this cannot show.** The out-of-scope stratum also changed during October 6–7 (legacy high-risk queue), so a stratum difference is not a clean estimate of the page-review effect.
