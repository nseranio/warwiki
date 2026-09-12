# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The twelfth September 12 batch revises **nine documentation pages**: Martius flap, bony/presacral anatomy, rectus/fascia lata grafts, CHASCIP, BLOOM, penile primary closure and LS local flaps. Lint/typecheck, 32 component tests, 51 maintenance tests and production build pass: **132.02 MB**, 97,679 compiled links/assets and 722 data links. All nine browser routes and a citation-preview keyboard/resize regression pass; published as `b9d1533d`, with successful exact-commit CI/Vercel, 11 live checks and the production citation regression. See the [release record](reports/2026-09-12/twelfth-continuation-release.md).

## Review coverage and next work

The ledger contains **1,186 documentation files**: **634** full current reads, **607** scoped updates, 21 checked, 11 unresolved and 547 unreviewed. No complete clinical clearance is asserted. Tools 88/231; all 44 fistula originals read; genital 29 pages. All 15 assigned perioperative pages are corrected and read.

- Root completed final reads and integrated the saved work from all three reviewers. Their sessions stopped with an account usage-limit error; they are **not currently working**. Do not repeatedly retry them or redeem credits without the user's authorization.
- Continue the remaining tools, beginning with bowel-segment grafts; its downloaded source metadata has not been fully reviewed. Complete the accessible Cochrane traditional-sling review, whose full file was downloaded but only selected sections were previously read.
- Continue remaining genital techniques and full-source gaps. The complete Kirtschig 2026 **published abridged article**, all five actual figures and 127 references were read; the separate 34-page AWMF methods report is now fully read. The 124-page long guideline is read through page 16; the 97-page evidence report and remaining actual graphics are pending. See the [package review](reports/2026-09-12/lichen-sclerosus-guideline-package-review.md). Ho/Gelman 2018 main and all seven actual figures are now read.
- Continue remaining foundations, resources/History/imported content, clinical data and OpenEvidence reconciliation. The topical-steroid companion's PRP/laser shorthand needs reconciliation during its next full-source pass.
- Martius and presacral source reports identify complete mains/figures, selected guidelines and inaccessible supplements. CHASCIP/BLOOM full operative methods remain unresolved; the pages no longer infer their unverified details.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 132.02 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
