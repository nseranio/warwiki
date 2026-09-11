# WARWIKI — audit continuation

Started from the September 11 flight checkpoint; the user has resumed work.

## Already live

- Clinic homepage shortcut, navigation and `/clinic` page removed. `/clinic` returns 404.
- Verbose evidence banner removed; articles retain their ordinary last-updated display.
- Release `6e50cdba` passed CI 34619397550 and deployed successfully. Homepage and an article checked live.
- GitHub and Vercel sign-ins complete; no need to repeat authorization.
- 41 obsolete Vercel deployments deleted; live/rollback/alias references preserved. Storage meter has not been reliably remeasured below the 10 GB allowance.
- Quarterly evidence maintenance prioritizes major guidelines, large trials, Cochrane reviews and practice-impacting findings. Epic remains paused.

## Saved for easy retrieval

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Supplied110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md).
- [Whole-site page ledger](reports/2026-09-11/full-site-review/README.md): explicit reading/source-check scope, errors corrected and unresolved items. This is an ongoing audit of 1,186 documentation pages, not a completed clinical review or guarantee of no errors.
- [Epic roadmap](EPIC-ROADMAP.md), to resume only when requested.

## Continue here

1. The frozen clinical correction commit `7d886c61` now passes exact-source lint, typecheck, production build, compiled links/size and two headless browser tests. Independent pharmacology, clinical and operative diff reviews found no introduced blocking issue. Publishing this checkpoint with the quarterly schedule; verify latest remote CI/Vercel before the next publication.
2. Resume domain ledgers: clinical conditions at UPJ obstruction, then ureteral/fistula/genital/pelvic-pain/defecatory pages; urethral/upper-tract and pharmacology ledgers identify their remaining pages. Do not reread completed pages unnecessarily or count inventory as full-text review.
3. Reconcile the OpenEvidence 110 items against original sources and actual existing coverage. Initial DOI matching found 56 possible already-covered items; this is not verification. Preserve the supplied source verbatim. Do not copy its embedded follow-up questions into site content.
4. Continue reference-identity scan from the saved 2,676-row cache with `python3 reports/2026-09-11/full-site-review/fetch-reference-metadata.py`. It has resumed; avoid starting a duplicate scan. Missing Crossref registration is a signal to investigate, not proof of a false citation. Recompute title signals after completion; the current signal report covers an earlier partial cache.
5. Regenerate the whole-site ledger, validate meaningful corrections, commit/push to main under standing authorization and verify the live deployment. Rerun the monthly external-link workflow after DOI fixes are live; prior failure was two real 404s, not authentication.

## Root reviewer: specific unfinished findings

Root is correcting the following pages in the working tree. These edits are not part of the frozen `7d886c61` validation; finish their source checks, logs and a new build before publication.

- **Intradetrusor Botox procedure:** pediatric row incorrectly uses a universal adult200U regimen; adult maximum360U is outdated; pivotal trial populations and OAB event rates are conflated; SNM comparison may reverse complete-resolution finding. Align to the independently checked pharmacology hub and current manufacturer label. The latter half/bibliography still needs full reading. Source: manufacturer US BOTOX prescribing information and AUA2024 OAB guideline.
- **ProACT device/procedure:** device page cites an AUS paper for ProACT hardware and DOI10.1002/nau.25062 points to an unrelated abobotulinumtoxin study. Laborie acquisition/distribution claim unsupported; current Coloplast page lists ProACT by Uromedica. Iohexol is not inherently iso-osmolar; manufacturer requires correct dilution or isotonic saline. Check full current IFU, contraindications/PVR/radiation/MRI and Gregorian citation mismatch. Procedure calls an indirect observational ATOMS comparison a definitive head-to-head and should be corrected. Full text read on both pages, but not yet logged as reviewed because source correction is unfinished.
  - FDA approval: https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P130018
  - FDA physician IFU: https://www.accessdata.fda.gov/cdrh_docs/pdf13/P130018D.pdf
  - Current distributor/IFU link: https://iu.coloplast.us/products/proact/
  - Current manufacturer: https://www.uromedica-inc.com/clinical-results
  - AUA2024 amendment: https://www.auajournals.org/doi/abs/10.1097/JU.0000000000004088
  - Original indirect meta-analysis: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0225762
- **Renal function/metabolic surveillance:** ref10 DOI10.1007/s00120-020-01190-0 is actually Metze's surgeon-musculoskeletal survey (PMID32270243), not a diversion acid-base paper. Removed-universal22mmol threshold still recurs lower down in the annual table/bone claims. Need consistent repair, avoid guaranteed fracture prevention, check hyperkalemia differential (renal failure omitted), NCCN timing and B12/DEXA assertions. Full source text was read but corrections/source validation remain unfinished.
- **Female sexual dysfunction overview:** Addyi/prasterone/ospemifene corrections saved; bremelanotide safety summary still needs alignment with pharmacology companion. Historical efficacy/epidemiology estimates remain unverified.
- **OpenEvidence high-priority root leads:** MUSA DOI10.1001/jama.2025.4682 has no exact DOI match (may already have title coverage); new HoLEP Cochrane25; GenderCOS masculinizing74/instruments75; ACS GU trauma82/AAST renal94; NeuroSAFE PROOF101; IMvigor011103 (keep reconstructive survivorship scope, not broad cancer-treatment expansion). SPIRIT102 routed to pharmacology; do not infer long-term cancer safety from a short trial.

## Workspace guardrails

Preserve unrelated `world-cup-next-week-pacific.ics`. Source handouts remain recoverable but omitted from builds. Do not recreate Clinic or verbose public evidence banners. Detailed review notes belong in internal metadata/reports. User paused active work for the flight; no new automatic wakeup was requested. The user resumed work after the flight and changed evidence review to quarterly; technical link checks remain monthly.
