# Quality program checkpoint

Started October 6, 2026 from revision `2f256438` (plan: [error-reduction-plan.md](../2026-10-06/error-reduction-plan.md)). Claude coordinates and writes; Codex (`gpt-6-sol`, `codex-cli 0.157.1`) reviews. Pre-existing dirty files (`reports/audit-v2/reference-check.md`, untracked planning, Lighthouse and Anki folders) were left untouched.

| Milestone | State |
|---|---|
| 1. Trustworthy controls (gate and pipeline repair) | Implemented October 6: [gate-migration.md](gate-migration.md). Codex adversarial review of the patch: see that file. |
| 2. Inventory, calibration, baseline | Coverage matrix drafted: [coverage-matrix.md](coverage-matrix.md). Detector calibration on seeded mutations and the 60-page probability sample: not started. |
| 3. Source-group review and repair | Calibration pilot done October 6 (below). Next queue: remaining legacy high-risk claims (`gate.py pending --legacy --kind dose`). |
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

## Calibration pilot (October 6): 81 legacy `rejection-only` dose claims, 43 pages

Runs (ignored folders): `quality/pilot-rejection-dose-a` (first check), then final-text rechecks `-final`, `-final2`, `-final3`. One reviewer and one verifier, `gpt-6-sol`, high effort; about 5–17 minutes and 200–430 thousand Codex tokens per 30-claim job; whole pilot about 80 minutes of wall time.

- First pass: 11 supported, 70 findings; the verifier confirmed 69. Most were citation placement on supported claims (a paragraph-level citation moved onto the sentence or row), which the checker had labelled `error`. The checker brief now separates `attribution` (supported) from `accuracy`; counted under the plan's rule, these are not serious errors.
- Content corrections applied (about 20 of 81 claims, roughly 1 in 4): dexamethasone PONV dose wording (Gan 2020: 4–8 mg IV); local-anesthetic ceilings scoped to the Iowa protocol; cord-block volume attributed to the CUA report; ESE stress-dose schedule distinguished from the page's lower-intensity approach; Cystistat regimen per the leaflet (4–12 weekly); RUG balloon and syringe rows restated as published technique; VCUG fill per the Cystografin label (25–300 mL); copper RDA by pregnancy/lactation and ASMBS IV duration conditional on normalization; IPP block restated to the trial's agents; post-IPP sildenafil replaced with the Wang RCT; bladder-repair leak-test volume removed; methylene-blue fill number removed; potassium-cystectomy context added.
- Final-text rechecks found errors that the first pass and its verifier had passed: dabigatran CrCl &lt;50 row narrowed to 30–&lt;50 mL/min (PAUSE excluded CrCl &lt;30; high); Kim 2023 denominator (69 patients, not transfers); Zhang 2021 endpoint ("92.9% treatment success", not "patent outlets"), fixed in the sentence and the table row; radiation row labels (salvage radiotherapy vs prior pelvic radiation). This supports the two-check design for high-risk claims.
- Gate state after the pilot: 82 claims schema 2 verified; 3 `legacy-disputed` closed by edits; open items in [open-findings.md](open-findings.md).
- Lesson: `apply.py apply` needs `apply.py list` first, and pages touched by an earlier run of the same batch need that run's `touched.json` carried over.
