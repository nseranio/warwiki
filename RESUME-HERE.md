# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The eleventh September 12 batch revises **three documentation pages**: vascular management, exposure and pelvic vascular anatomy. Lint/typecheck, 32 component tests, 51 maintenance tests and production build pass: **132.32 MB**, 97,856 compiled links/assets and 722 data links. Three routes, reference anchors and mobile tables pass; six screenshots inspected. Published as `3b2dee90`; exact-commit CI/Vercel and five live checks passed. Details in the [current release record](reports/2026-09-12/eleventh-continuation-release.md).

## Review coverage and next work

The ledger contains **1,186 documentation files**: **625** full current reads, **598** scoped updates, 21 checked, 11 unresolved and 556 unreviewed. No complete clinical clearance is asserted. Tools 86/231; all 44 fistula originals read; genital 25 pages. All 15 assigned perioperative pages are corrected and read.

- `auth_handoff`: exposure and both 2026 whole-blood trials completed; next bowel-segment and fascia graft pages. Publication freeze has ended; source-supported graft corrections are in progress.
- `operative_review`: complete UK-REBOA, PROCOAG supplements and FiiRST-2 protocol; original Cochrane damage-control review/currentness also complete; next genital techniques. CHASCIP/BLOOM revisions and source limits are being saved for the next batch.
- `workflow_readiness`: complete ESVS main and selected WHO treatment/annex scope; independently reviewed pelvic vascular anatomy and final obstetric branch. Next presacral and bony pelvic anatomy; originals read, significant corrections/source work pending.
- Root: eleventh batch verified live; current Martius-flap source review corrects pedicle contradictions, donor morbidity and subgroup denominators. Continue remaining foundations, resources/History/imported content, clinical data and OpenEvidence reconciliation.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 132.32 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
