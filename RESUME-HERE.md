# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The fifth September 12 continuation batch changes **43 documentation files**. Lint, typecheck, 32 component tests, 50 maintenance tests and production build pass: **135.37 MB**, all 99,608 compiled links/assets and 730 data links valid. All43 changed documentation routes and four interaction checks passed. Published as `27356a32` with exact-commit CI34686563312, Vercel success and six passing live checks. The sixth batch is underway. See the [current release record](reports/2026-09-12/fifth-continuation-release.md).

## Review coverage and next work

The central ledger contains **1,186 documentation files**: **518** full reads against current hashes, **490** scoped updates, 21 checked, 25 unresolved and 650 unreviewed. No complete clinical clearance is asserted. All 95 pharmacology, 73 clinical-condition, 46 special-population and 38 evaluation pages have reading records. Tools coverage is 56/231; fistula techniques 31/44; diversion 25/25.

- `auth_handoff`: continue remaining tools. Fifth batch includes implant/adjunct/neuromodulation and Bulkamid labeling corrections. Broader retained historical paper and supplement gaps remain explicit.
- `operative_review`: all 25 diversion pages are logged. Next 04e genital reconstruction, starting penile-tissue-substitutes: correct dermal anatomy and infected-bed restrictions, and avoid unsupported NPWT-setting superiority. Continue other surgical families except 04h; operative AUS broader review remains unresolved.
- `workflow_readiness`: continue remaining 13/44 fistula pages, starting Turnbull–Cutait, dartos and PATIO. Read-only findings already identify pooled-cohort and prevention-versus-repair attribution problems; implement and document precise corrections.
- Root: oral donor and antisepsis/gloving corrections are in this batch, with independent checks and explicit complete/partial source records. Finish accessible Cochrane hand-preparation and PICASSO supplement gaps, then other foundations, imported History biographies/data, resources, journal club, source pages and clinical data.

Each publication batch is a checkpoint within the continuing task. Read source text and accessible primary reports; log inaccessible full papers and unread figures/supplements. Do not turn a full MDX read or passing site checks into clinical certification.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 135.37 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
