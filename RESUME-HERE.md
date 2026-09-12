# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The sixth September 12 continuation batch changes **37 documentation files**. Lint, typecheck, 32 component tests, 50 maintenance tests and production build pass: **134.39 MB**, all 99,044 compiled links/assets and 730 data links valid. All 37 changed documentation routes and four interaction checks passed; five desktop/mobile samples were visually inspected. Publication is being completed. See the [current release record](reports/2026-09-12/sixth-continuation-release.md).

## Review coverage and next work

The central ledger contains **1,186 documentation files**: **553** full reads against current hashes, **524** scoped updates, 21 checked, 15 unresolved and 626 unreviewed. No complete clinical clearance is asserted. All 95 pharmacology, 73 clinical-condition, 46 special-population and 38 evaluation pages have reading records. Tools coverage is 66/231; fistula techniques have 42/44 logged original reads, with the final two now read but corrections not yet saved. The non-fistula surgical ledgers contain 174 current records, including all 25 diversion pages and nine genital pages.

- `auth_handoff`: next six urinary-catheter pages have complete original reads and research underway. High-yield 2026 COMPARE/MultICath reusable-catheter evidence requires full-paper review. Correct insertion, balloon, CBI, prophylaxis and surveillance guidance. Notes are temporary until sixth release commit.
- `operative_review`: continue genital reconstruction after nine completed pages. Full ISL2023 consensus and Karian2015 main text/tables read for upcoming lymphedema/scrotal work; figures/source inconsistencies still require attention. Broader operative AUS review remains unresolved.
- `workflow_readiness`: finish York–Mason, TAMIS and vaginal-fistula-flaps corrections, then remaining perioperative workflows by agreement. All 44 fistula originals have now been read; tracked ledger remains 42/44 until the final changes are saved. Known problems include wrong outcome denominators, unsupported zero-FI promises, protocol-versus-completed-review confusion, and wrong tissue/pressure claims.
- Root: skin/STSG/FTSG and the entire graft overview are corrected and independently checked. Completed Cochrane hydrogel/hand/drape and PICASSO published supplement reads; PREPARE main manuscript only. Continue other foundations, imported History biographies/data, resources, journal club, source pages and clinical data. Remaining full-paper/figure/supplement gaps are explicit in source-access reports.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 134.39 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
