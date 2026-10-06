# Quality program checkpoint

Started October 6, 2026 from revision `2f256438` (plan: [error-reduction-plan.md](../2026-10-06/error-reduction-plan.md)). Claude coordinates and writes; Codex (`gpt-6-sol`, `codex-cli 0.157.1`) reviews. Pre-existing dirty files (`reports/audit-v2/reference-check.md`, untracked planning, Lighthouse and Anki folders) were left untouched.

| Milestone | State |
|---|---|
| 1. Trustworthy controls (gate and pipeline repair) | Implemented October 6: [gate-migration.md](gate-migration.md). Codex adversarial review of the patch: see that file. |
| 2. Inventory, calibration, baseline | Coverage matrix drafted: [coverage-matrix.md](coverage-matrix.md). Detector calibration on seeded mutations and the 60-page probability sample: not started. |
| 3. Source-group review and repair | Not started. First queue: legacy high-risk claims (`gate.py pending --legacy --kind dose`). |
| 4. Engineering, media and operations | Not started (cross-browser, search benchmark, link inventory, API review, retraction-cache freshness). |
| 5. Independent residual measurement | Not started. Historical samples (1.57, 1.37, 0.83 serious errors per page) predate current HEAD and are not a current rate. |

Nothing in this program certifies the site. "Zero detected in N pages at revision X under method Y" is the strongest claim the data can support.

## Next-session commands

```bash
python3 scripts/review/gate.py stats
python3 scripts/review/gate.py pending --legacy --kind dose --out reports/audit-v2/sources-local/quality/legacy-dose
nohup python3 scripts/review/orchestrate.py --work reports/audit-v2/sources-local/quality/legacy-dose --claims --reviewers 1 --verifiers 1 --effort high --tier default > reports/audit-v2/sources-local/quality/legacy-dose/orchestrator.out 2>&1 &
python3 scripts/review/gate.py record reports/audit-v2/sources-local/quality/legacy-dose
```

High-risk claims need two independent supporting checks, so a legacy dose claim needs two runs (run names must differ) before it counts as `verified-supported`.
