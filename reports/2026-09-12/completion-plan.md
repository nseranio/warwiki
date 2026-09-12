# Complete the whole-site review

The user explicitly requested completion after the previous release stopped at 121 full-text reads. A publication batch is not completion of this task. Continue through context compactions and successful deployments until the remaining source-reading and substantive review queues have been worked through.

## Completion criteria

- Every documentation file has an actual full-text read recorded against its current content hash. Read imported clinical content/data when a page delegates its content to a component. Inventory, searching and citation metadata do not count as reading.
- Clinical recommendations, major numerical claims, drug/device instructions and relevant current high-impact evidence are checked against primary sources. Correct contradictions and erroneous citations; distinguish investigational, historical and low-certainty claims. Record inaccessible sources and any remaining uncertainty explicitly rather than claiming certainty.
- Review source pages outside the docs tree, clinical data, figure text and navigation for content consistency. Keep the existing public last-updated presentation.
- Reconcile the supplied OpenEvidence survey by actual clinical impact and primary-source verification. Do not add studies merely to increase the count.
- Rebuild the complete page ledger, run appropriate validation, then commit/push under standing authorization and verify production. A successful build or a full browser sweep does not replace clinical review.

## Current ownership

- `auth_handoff`: all 95 pharmacology MDX files and pharmacology reports.
- `operative_review`: all 451 surgical-technique files; original domain ledger plus `surgical-rest.json` for other domains.
- `workflow_readiness`: all 73 clinical-condition files and all 46 special-population files; clinical ledger plus `special-populations.json`.
- Root: remaining foundations, evaluation, History, resources, source pages/data, central ledger, cross-domain review and publication.

The surgical workload is largest. Reassign disjoint surgical domains when another agent finishes. Do not overlap source edits without coordination. Agents update their own exact-scope reports; root merges them.

## Retained preferences

Quarterly evidence maintenance; Epic paused; Clinic and quiz removed; History discreet; handouts recoverable but excluded from deployment; no verbose public evidence banner. Preserve unrelated `world-cup-next-week-pacific.ics`.
