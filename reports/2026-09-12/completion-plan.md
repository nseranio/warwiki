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
- `operative_review`: remaining surgical-technique families except 04h; original 98 urethral/upper-tract, 21 bladder-neck, 19 bladder and four diversion pages read. Continue 04c index and named reservoirs, then remaining families.
- `workflow_readiness`: completed all 73 clinical-condition and 46 special-population reads and scoped corrections; next all 44 pages in `04h-fistula-repair` with a separate ledger.
- Root: other foundations, remaining evaluation, History/imported biographies, resources, journal club, source pages/data, central ledger, cross-domain review and publication.

The current release freeze lasts until root confirms the release commit. Read-only source research can continue during validation. Thereafter resume corrections without waiting for another user message. Do not overlap edits without coordination. Each agent records exact source access, unresolved claims and final source hashes; root merges the domain ledgers. The counts describe page reading, not complete clinical clearance.

## Retained preferences

Quarterly evidence maintenance; Epic paused; Clinic and quiz removed; History discreet; handouts recoverable but excluded from deployment; no verbose public evidence banner. Preserve unrelated `world-cup-next-week-pacific.ics`.
