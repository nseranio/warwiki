# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The ninth September 12 batch revises **17 documentation pages** across bowel reconstruction, biomaterials, genital lymphatic techniques and perioperative care. Lint/typecheck, 32 component tests, 51 maintenance tests and production build pass: **132.77 MB**, 98,134 compiled links/assets and 722 data links. All 21 browser checks pass. Published as 9cad97d7; exact-commit CI/Vercel and six live checks passed. See the [current release record](reports/2026-09-12/ninth-continuation-release.md).

## Review coverage and next work

The ledger contains **1,186 documentation files**: **614** full current reads, **583** scoped updates, 21 checked, 15 unresolved and 567 unreviewed. No complete clinical clearance is asserted. Tools 83/231; all 44 fistula originals read; genital 23 pages. All 15 assigned perioperative originals are read, 11 corrected and four corrections pending.

- `auth_handoff`: five mesh/biological pages corrected; EssentiAL supplement completely read with unique graphics inspected. Continue three remaining biological pages, then tools.
- `operative_review`: LVA, VLNT, SAPL and 3R corrected and independently checked. Continue `lyst.mdx` and remaining genital techniques. Broader operative AUS review remains unresolved.
- `workflow_readiness`: anesthesia, analgesia, nerve blocks and positioning corrected. Continue ERAS, cardiovascular risk, frailty and risk calculators; primary cardiovascular guideline reading underway.
- Root: four bowel principles rewritten, final-read and independently checked. Major ICG trial main papers and three trial supplements completely read to logged scope; AVOID appendix and other full-source gaps remain. Continue other foundations/principles/anatomy, resources/History/imported content, clinical data and OpenEvidence reconciliation.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 132.77 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
