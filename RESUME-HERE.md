# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The seventh September12 batch changes **49 documentation files**:23substantive revisions and26additional formatting-only repairs. All31broken warning boxes across30files now render through supported directive syntax, and a build guard prevents recurrence. Lint/typecheck,32component tests,51maintenance tests and production build pass: **133.92MB**,98,795compiled links/assets and730data links. All53browser checks pass; publication verification is pending. See the [current release record](reports/2026-09-12/seventh-continuation-release.md).

## Review coverage and next work

The ledger contains **1,186 documentation files**: **575** full current reads, **545** scoped updates,21checked,26unresolved and594unreviewed. No complete clinical clearance is asserted. All95pharmacology,73clinical-condition,46special-population and38evaluation pages have reading records. Tools72/231; all44fistula originals read/corrected within source-access limits; non-fistula surgical ledgers180current records, including15genital pages. The15-page perioperative ledger has3original reads and12unread entries; corrections are not yet saved.

- `auth_handoff`: six urinary-catheter pages complete, including full main COMPARE/MultICath reads. Next six ureteral-stent/drainage originals read; full CIRSE2026 main/tables/reference text read. Correct source errors and reconcile EAU before use. Remain read-only until seventh publication freeze lifts.
- `operative_review`: six scrotal pages complete. Independent full revised graft-page check found no blocking introduced issue. Next CDT/debulking/lymphedema; CDT original read, research underway. Broader operative AUS review remains unresolved.
- `workflow_readiness`: all44fistula pages corrected/logged. Next15perioperative pages, starting antithrombotic/PE/steroids. HI-PEITHO2026full manuscript is being read; recent major surgery exclusion limits postoperative generalization. Drafts in temporary files during publication freeze.
- Root: all five remaining graft pages corrected, full final text read and peer-checked. Six main manuscripts and deKemp supplements read; precise gaps in [alternative-graft review](reports/2026-09-12/alternative-graft-review.md). Next remaining foundations/principles/anatomy, resources/History/imported content, clinical data and OpenEvidence reconciliation.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 133.92 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
