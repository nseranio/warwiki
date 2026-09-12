# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The thirteenth September 12 batch revises **five linked LS/pharmacology pages**, completes the separate 124/34/97-page guideline package, and integrates high-impact trial/cohort evidence with exact source-access limits. Lint/typecheck/build and five desktop/mobile browser checks pass; build **132.05 MB**, 97,693 compiled links/assets and 722 data links. Commit `f1052805` passed CI and Vercel deployment; all seven live checks pass. See the [thirteenth release record](reports/2026-09-12/thirteenth-continuation-release.md). Prior batch `b9d1533d` was fully verified live.

## Review coverage and next work

The ledger contains **1,186 documentation files**: **634** full current reads, **607** scoped updates, 21 checked, 11 unresolved and 547 unreviewed. No complete clinical clearance is asserted. Tools 88/231; all 44 fistula originals read; genital 29 pages. All 15 assigned perioperative pages are corrected and read.

- Root completed final reads and integrated the saved work from all three reviewers. Their sessions stopped with an account usage-limit error; they are **not currently working**. Do not repeatedly retry them or redeem credits without the user's authorization.
- Continue the remaining tools, beginning with bowel-segment grafts; its downloaded source metadata has not been fully reviewed. Complete the accessible Cochrane traditional-sling review, whose full file was downloaded but only selected sections were previously read.
- Continue remaining genital techniques and full-source gaps. The complete Kirtschig 2026 **published abridged article**, all five actual figures and 127 references were read; the separate 34-page AWMF methods report is now fully read. The complete 124-page long guideline, 460 numbered references and all six actual figures are now read; the separate 97-page evidence report, including all actual forest plots, is also fully read. See the [package review](reports/2026-09-12/lichen-sclerosus-guideline-package-review.md). Ho/Gelman 2018 main and all seven actual figures are now read.
- Continue remaining foundations, resources/History/imported content, clinical data and OpenEvidence reconciliation. The five LS/pharmacology companions are now reconciled; see the [new source record](reports/2026-09-12/lichen-sclerosus-topical-source-review.md) for complete originals and remaining Hecken/Adams main-paper and other access gaps.
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

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 132.05 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
