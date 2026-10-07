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

## Legacy high-risk recheck: pharmacology (October 6)

562 dose, guideline and contraindication claims on 73 pharmacology pages that had never been verified under schema 2 (`quality/legacy-hr-pharmacology`, two final-text rounds). Two reviewers, one verifier; about 85 minutes.

- First pass: 497 supported, 37 errors, 26 unverifiable (kept as `legacy-source-needed`), 2 style. Verifier: 40 agree, 7 modify, 5 no_edit, 2 reject.
- 51 corrections published (`2e2e2534`) on 29 pages, among them: levofloxacin chronic bacterial prostatitis 500 mg (label; the 500–750 mg range belongs to acute prostatitis); fluconazole-resistant *C. glabrata* regimens split by cystitis and pyelonephritis (IDSA 2016); Myrbetriq volume per void (+18 to +24 mL, week 12; the 12.8 mL value was the 25 mg arm); mirabegron pediatric granules from 11 kg; Botox OAB and NDO labeled populations; methylprednisolone contrast premedication timing; vitamin K dosing attributed per source (ACCP, NCCN, AHA/ASA); ESC VKA reversal timing; Lyrica PHN escalation condition; Addyi labeled population (women younger than 65); Xiaflex labeled for adult men.
- Final-text rounds confirmed every corrected claim (42/45, then 7/7); round 1 found three more problems in corrected text.
- Open: belladonna/opium suppository strength (abstract 15/30 mg vs methods 16.2/30 mg; PMC full text blocked) and Fortacin US approval status (EMA source only). See [open-findings.md](open-findings.md).
- Engineering gap confirmed again: `GenericDatabase` cells cannot carry citation markers, so supported database rows keep drawing attribution findings.

## Supplied sources check (October 6)

469 claims on 115 pages that cite documents the owner supplied on October 6 (41 PDFs: trials, guidelines, ACOG opinions, device IFUs and manuals, drug labels; `pdfs-2026-10-06/`, ignored). Batches carried `local_sources` pointers so reviewers read the supplied full text (`quality/newsources-2026-10-06`, three final-text rounds).

- First pass: 434 supported, 24 errors, 8 unverifiable; access mostly label/IFU (232) and full text (131). 62 corrections published (`f2dd898b`) on 42 pages.
- Final-text rounds again found errors introduced or left by first-round edits (AMS 800 fill 24 then 20 mL; SSLF perioperative pain row; ProACT "reduced bladder compliance"; Rezum catheter-duration denominators).
- Closed open findings: COBRRA eligibility and UKKA hyperkalaemia rows. New open findings: three-step composite satisfaction range, ITNS 96-week denominators ([open-findings.md](open-findings.md)).
- Lesson: a source mapping by name alone attaches manuals to research papers (for example "Titan" also matched implant studies and the TITAN 2 tibial-nerve trial); device and label documents are attached only to reference lines that are themselves IFUs, labels, manuals or regulatory summaries.

## Legacy high-risk recheck: Foundations (non-pharmacology) and Evaluation (October 6)

278 claims on 121 pages (`quality/legacy-hr-01-02`, four final-text rounds). First pass: 243 supported, 6 errors, 18 unverifiable, 11 style. 20 corrections published (`fdcc5fd5`): EXPAREL adductor-canal admixture; NICE refeeding thiamine timing; ADA inpatient glucose targets by population; vNOTES operative time and blood-loss denominators; AUSCO 12-month outcomes timed from activation; AUA early SUI surgery window (six months); ATOMS radiotherapy continence row. Two pages (probe/grooved director, male SUI database) used plain `[N]` markers with no reference anchors, so the gate had bound their claims to "missing" sources; both now use house citation style and were fully rechecked. A scan found no other page with that pattern.

## Legacy high-risk recheck: Clinical Conditions and Special Populations (October 6)

307 claims on 89 pages (`quality/legacy-hr-03-05`, two final-text rounds). First pass: 275 supported, 15 errors, 9 unverifiable, 8 style; 9 verifier rejects were redundant citation markers. 20 corrections on 12 pages published (`527133f6`), including the AUA severe post-prostatectomy SUI threshold, IUGA recurrent OASI population, AUA/SUFU NLUTD statements 6–7 scope, the diphenoxylate-atropine label dose, ACOG PB 210 surgical options by sphincter status and the ACS Zone II hematoma context.

- Reviewer disagreement resolved from the source: round 1 changed the severe SUI threshold to "≥5 PPD"; the final-text round proposed ">5". The AUA 2024 IPT guideline defines severe incontinence as "5 plus pads per day" in its definitions section and uses ">5" only when describing which sling studies excluded severe cases. Claude vetoed the reversion; a third check with the local guideline text confirmed "≥5".
- Extraction gap example: the corrected AUA/SUFU statement 7 sentence ("calls for risk stratification ... (statement 7, Clinical Principle)") is not extracted by the gate because the strength label sits more than 80 characters after "AUA/SUFU". Qualitative guideline sentences remain outside the claim gate (coverage matrix gap 1).
