# WARWIKI — continue the whole-site review

**The requested review is still active. Continue after each publication batch.** The user specifically challenged the previous partial stop and asked for actual full-text/source checks across the entire site. Read the [completion plan](reports/2026-09-12/completion-plan.md).

## Current work and publication

The second September 12 continuation batch changes **111 documentation files**. The [current release record](reports/2026-09-12/second-continuation-release.md) tracks final checks and publication; **the currently confirmed live site remains `c4d3f30a` until that new record reports otherwise**. Prior batch CI 34676588480 and Vercel passed.

The new batch passes full source lint, typecheck, 32 component tests, 50 maintenance tests and final production build: **137.95 MB**, all100,904 compiled links/assets and730 data links valid. All111 changed pages pass browser checks plus search/figure interaction tests. Commit/push and CI/Vercel/production verification are next; read the current release record for the latest result.

## Review coverage and next work

The [central ledger](reports/2026-09-11/full-site-review/README.md) contains all **1,186 documentation files**; **396** have full reading recorded against current hashes and **372** have scoped updates. No complete clinical clearance is asserted. Current source reads include 95/95 pharmacology, 73/73 clinical conditions, 46/46 special populations, 144/451 surgical techniques and 36/38 evaluation pages.

- `auth_handoff`: all 231 foundation/tools MDX pages next, starting with energy/device safety; new `tools.json/md`. Coordinate shared-data edits.
- `operative_review`: 04c diversion index/remaining reservoirs, then other surgical families except04h. Original98 urethral/upper-tract,21 bladder-neck,19 bladder and4 diversion reads are saved. Independent bladder, nutrition and female-exam change reviews are recorded.
- `workflow_readiness`: all44 pages of04h-fistula-repair next. Clinical/special-population scope reports stay available for unresolved companion/source issues.
- Root: assessment-tools original399lines has been fully read but is **not yet corrected or added to the ledger**. Work in `/tmp/warwiki-assessment-*` includes complete34DOI metadata/available-abstract checks, full standing-cough-test stratification paper and MsFLASH short-form paper, and initial instrument/PISQ/ICS source retrieval. Correct MSIGS definitions, screening-score misuse, FSFI-6 pain domain, FSDS versus FSDS-R, PROMIS/PISQ and pad/urethral-satisfaction generalizations. The male examination page has **not yet been fully read**.
- Other foundations, imported History biographies/data, resources, journal club, source pages and clinical data need actual reads and substantive review. Targeted companion corrections do not clear whole pages. Root retains perioperative care/anatomy/surgical principles/skills.
- Root companion pending: penile-preputial flap page incorrectly calls Buck fascia the main McAninch pedicle; verified source says dartos conduit. Its onlay/tube13%/58% figures belong to the1998 66-patient report(7/54 vs7/12), not the original1993 paper. Perioperative nutrition/electrolyte pages also require full reads and thiamine/refeeding alignment.

During final release validation all agents are researching read-only. Root will release the freeze once the commit is saved, then continue work without stopping at deployment. Do not overwrite another agent's working source or mistake it for the published release.

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
