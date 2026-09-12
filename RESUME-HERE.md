# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The September 12 continuation batch changes **170 documentation files**. The [release record](reports/2026-09-12/continuation-release.md) tracks exact validation and publication status. **Live site commit is `c4d3f30a`**, with CI 34676588480 and commit-specific Vercel deployment status both successful. Five production pages and the removed `/clinic` route were checked directly. The prior site commit was `b8b60a0e`.

Local validation for the new batch: full lint, typecheck, 32 component tests, 50 maintenance tests and production build passed. Build is **139.22 MB**; all 101,564 compiled local links/assets and 731 data-link literals passed. All 170 changed documentation routes passed browser checks. Browser and publication evidence is saved in the release record.

## Review coverage and next work

The [central ledger](reports/2026-09-11/full-site-review/README.md) contains every one of the **1,186 documentation files**; **293** have full reading recorded against current source hashes and **275** have scoped updates. Full MDX reading and primary-paper reading are recorded separately. No complete clinical clearance is asserted.

- Clinical conditions: all **73/73** read. Continue unresolved source/companion checks from `clinical-conditions.json`.
- Urethral and upper-tract techniques: all **98** in the original domain read; `operative_review` has the remaining surgical families. Next prepared family is bladder-neck reconstruction; all 21 pages were read during the release freeze, with corrections still pending.
- Pharmacology: **71/95** recorded; `auth_handoff` has read additional pain/Botox pages in temporary research files and must integrate them after the freeze. Reassign foundational tools/principles after pharmacology is completed.
- Special populations: **18/46** recorded, including all **17 trauma** pages. `workflow_readiness` has prepared further gender/women/survivorship reads. Correct SOC8 eligibility, registry updates and primary evidence before recording updated hashes.
- Evaluation: **28/38** read. Root next: the seven remaining micronutrient pages, then three assessment/examination pages. Examine the 17 PMID-title flags on male/female examination references.
- Remaining foundations, imported History biographies/data, resources, journal club, source pages and clinical data still need actual reads and substantive review. Targeted corrections do not clear whole pages.
- Root companion pending: penile-preputial flap page incorrectly calls Buck fascia the main McAninch pedicle; verified source says dartos conduit. Its onlay/tube 13%/58% figures belong to the 1998 66-patient report (7/54 vs 7/12), not the original 1993 paper. Coordinate disjoint edits.

The temporary release freeze has been **released**; all three agents resumed tracked corrections after commit. Their new source edits are the next batch. Do not overwrite them or confuse the current working tree with the published release.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to about 139 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
