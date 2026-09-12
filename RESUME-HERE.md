# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The third September 12 continuation batch changes **54 documentation files** and is live as **`d0b2abed`**. [GitHub CI 34683687370](https://github.com/nseranio/warwiki/actions/runs/34683687370), exact-commit Vercel deployment and direct production checks passed. See the [current release record](reports/2026-09-12/third-continuation-release.md).

The batch passes full source lint, typecheck, 32 component tests, 50 maintenance tests and final production build: **136.90 MB**, all 100,389 compiled links/assets and 730 data links valid. All 54 changed documentation routes and four interaction checks passed. Publication is verified; the next source-review batch is in progress.

## Review coverage and next work

The [central ledger](reports/2026-09-11/full-site-review/README.md) contains all **1,186 documentation files**; at publication **457** have full reading recorded against current hashes and **425** have scoped updates. No complete clinical clearance is asserted. All 95 pharmacology, 73 clinical-condition, 46 special-population and 38 evaluation pages have full reads. Current tools coverage is 30/231 and fistula-technique coverage 16/44.

- `auth_handoff`: all 231 tools pages, recorded in `tools.json/md`. Finishing seven previously read instrument/index pages, then remaining instruments. The stapler hub has the specific 2026 recall and donor-renal-artery clip contraindication published; further substantive corrections are underway.
- `operative_review`: remaining 04c reservoirs (Indiana, Florida, Mainz I next), then other surgical families except 04h. Fifteen diversion pages were saved at publication, alongside 98 urethral/upper-tract, 21 bladder-neck and 19 bladder pages.
- `workflow_readiness`: remaining 28/44 fistula-technique pages, beginning ureteroarterial and vesicocutaneous; narrowly align clinical companions when sources expose residual errors.
- Root: assessment tools, male examination, nutrition and electrolytes are now fully read, corrected, checked and published. Next the penile/preputial flap and graft foundations pages: both original MDX files fully read and pending records appended, clinical corrections not yet saved. Check graft trials mislabeled as flap trials, failed superiority called equivalence, misattributed recurrence cohorts, and generalized comparisons. McAninch's 1993 abstract actually uses Buck's-conduit wording; Carney/McAninch 2002 distinguishes Buck's supporting fascia from the dartos vascular pedicle. Do not blindly replace one with the other or infer a deep dorsal artery pedicle.
- Other foundations, imported History biographies/data, resources, journal club, source pages and clinical data still need actual reads and substantive review. Targeted companion corrections do not clear whole pages. Root retains perioperative care/anatomy/surgical principles/skills.

Agents are actively editing the next correction batch. Do not overwrite their source files or confuse them with the published release. Exact source access, outstanding full-paper gaps and hashes are kept in domain ledgers.

## Evidence and saved material

Evidence maintenance is **quarterly: March, June, September, December**, next December 2026. Technical link checks stay monthly. The existing automation was updated; do not duplicate it.

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md): still incomplete. Previously verified NeuroSAFE PROOF awaits survivorship integration; other GenderCOS/NEUROGED/SPIRIT items need exact recorded follow-up.
- [Epic roadmap](EPIC-ROADMAP.md): Epic stays paused until the user resumes it.
- DOI metadata collection completed the original 10,956-DOI snapshot (10,887 found). Current title signals match 10,757 of 10,909 current DOIs. PMID cache covers 243 identifiers (242 found); low-overlap flags require investigation, not automatic replacement. These scans do not count as clinical or full-paper review.

## Publication and efficiency

Standing authorization: validate, commit/push completed changes to `main/origin/main`, then verify CI, Vercel and live content. Sign-ins are complete. Group related changes to limit deployments. Keep temporary source PDFs and large research downloads outside the repository.

Earlier cleanup removed 41 obsolete Vercel deployments. Retention is 30 days with a minimum of 10; preserve production, aliases and a known-good rollback. Local build size has fallen from 566 MB to 136.9 MB. **The account meter has not been confirmed below 10 GB.** No paid upgrade was made. Authoring-only changes skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Clinic and quiz stay removed. History stays discreet. Handouts stay recoverable but excluded from builds. Keep public metadata to ordinary page last-updated; detailed review notes stay internal. Never invent clinical sign-off.
