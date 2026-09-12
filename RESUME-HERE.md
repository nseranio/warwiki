# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The eighth September 12 batch revises **21 documentation pages** across wounds/HBOT, radiation, drainage devices, genital lymphedema and perioperative care. Lint/typecheck, 32 component tests, 51 maintenance tests and production build pass: **133.29 MB**, 98,467 compiled links/assets and 730 data links. All 25 browser checks pass. Publication is pending in the [current release record](reports/2026-09-12/eighth-continuation-release.md).

## Review coverage and next work

The ledger contains **1,186 documentation files**: **594** full current reads, **566** scoped updates, 21 checked, 19 unresolved and 580 unreviewed. No complete clinical clearance is asserted. Tools 78/231; all 44 fistula originals read; genital 19 pages. The frozen perioperative record includes seven corrected pages and ERAS original read; remaining original reads have been completed separately and await merger after publication.

- `auth_handoff`: six ureteral-stent/drainage pages complete. Complete Cochrane NPWT/HBOT reviews and hydrogel source review saved, with graphic and original-trial limits. Resume remaining tools after publication.
- `operative_review`: four genital lymphedema pages and radiation effects complete. Continue LVA/VLNT and remaining genital techniques; source research underway. Broader operative AUS review remains unresolved.
- `workflow_readiness`: seven perioperative pages corrected. All 15 assigned originals now read; complete remaining eight corrections, beginning ERAS, anesthesia and positioning. Avoid applying a specialty guideline's GLP-1 table as a universal anesthesia rule.
- Root: wound/HBOT pages final-read and independently checked; three Cochrane source reports saved. Radiation independently checked. Bowel handling/injury and reoperative harvest originals fully read; source checking and corrections are next. Remaining foundations/anatomy, resources/History/imported content, clinical data and OpenEvidence reconciliation follow.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 133.29 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
