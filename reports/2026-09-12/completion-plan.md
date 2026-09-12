# Complete the whole-site review

The user explicitly requested completion after the previous release stopped at 121 full-text reads. A publication batch is not completion of this task. Continue through context compactions and successful deployments until the remaining source-reading and substantive review queues have been worked through.

## Completion criteria

- Every documentation file has an actual full-text read recorded against its current content hash. Read imported clinical content/data when a page delegates its content to a component. Inventory, searching and citation metadata do not count as reading.
- Clinical recommendations, major numerical claims, drug/device instructions and relevant current high-impact evidence are checked against primary sources. Correct contradictions and erroneous citations; distinguish investigational, historical and low-certainty claims. Record inaccessible sources and any remaining uncertainty explicitly rather than claiming certainty.
- Review source pages outside the docs tree, clinical data, figure text and navigation for content consistency. Keep the existing public last-updated presentation.
- Reconcile the supplied OpenEvidence survey by actual clinical impact and primary-source verification. Do not add studies merely to increase the count.
- Rebuild the complete page ledger, run appropriate validation, then commit/push under standing authorization and verify production. A successful build or a full browser sweep does not replace clinical review.

## Current ownership

- `auth_handoff`: completed all 95 pharmacology MDX reads and scoped corrections; next all 231 tools pages, recorded in `tools.json/md`. Coordinate any shared imported-data edits.
- `operative_review`: remaining surgical-technique families except 04h; original 98 urethral/upper-tract, 21 bladder-neck, 19 bladder and 25 diversion pages now saved. Continue 04e genital reconstruction, then remaining families.
- `workflow_readiness`: completed all 73 clinical-condition and 46 special-population reads and scoped corrections; all 44 fistula originals now read; all15perioperative pages now corrected and read; current full-source task is ESVS2025vascular-trauma guidance.
- Root: other foundations, remaining evaluation, History/imported biographies, resources, journal club, source pages/data, central ledger, cross-domain review and publication.

The eleventh batch revises three documentation pages and records 625 current full MDX reads. Lint/typecheck/tests/build pass (132.32 MB); three routes, reference interactions and mobile tables pass. Publication verification pending. Continue after publication without another user message. Current primary-source reading and access limits are in the vascular/exposure release record; tools, genital and adjacent anatomy reviews are proceeding independently. Page reading is not clinical clearance. See [RESUME-HERE.md](../../RESUME-HERE.md).

## Retained preferences

Quarterly evidence maintenance; Epic paused; Clinic and quiz removed; History discreet; handouts recoverable but excluded from deployment; no verbose public evidence banner. Preserve unrelated `world-cup-next-week-pacific.ics`.
