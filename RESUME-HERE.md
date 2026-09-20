# WARWIKI — resume after the content-preservation recovery

**Current checkpoint: September 20, 2026.** Read the [restoration release record](reports/2026-09-20/content-restoration-release.md) and [content-preservation policy](reports/2026-09-20/content-preservation-policy.md) first. The user rejected the blanket deletion of manufacturer information and practical teaching. That approach is superseded.

Recovered **141 pages**: 120 prior-content restorations with narrow correction carry-forward, 16 retractor restorations and five selective operative/suture restorations. The [inventory](reports/2026-09-20/content-removal-inventory.md) and [change records](reports/2026-09-20/content-restoration-release.md) identify the exact scope. Genuine corrections and intentionally withdrawn erroneous diagrams remain. A concurrent mouth-retractor reduction was also caught and repaired; the separate audit task was told to stop simultaneous edits.

Manufacturer IFUs/catalogs can support specifications, assembly, intended use and warnings. Anatomy texts, atlases, technical papers, operative videos and established teaching can support anatomy and practical technique. Prefer major trials/guidelines/Cochrane reviews for treatment recommendations and new practice-changing updates. **An unfinished source review or absence of an RCT does not justify emptying a page.** Correct particular errors, preserve useful content and keep source gaps in internal records.

**Published:** content `96816311` passed exact-commit GitHub CI/Vercel and all 141 live article-body comparisons. Full validation and source limitations are in the release record.

## Current audit coverage

The reproducible [ledger](reports/2026-09-11/full-site-review/page-ledger.json) lists **1,186 pages**: 698 with recorded full current-page reading; 670 scoped updates, 21 checked, 12 unresolved, **120 restored pending review**, and 363 unreviewed. Zero complete clinical clearances are asserted. The recovered material did not receive automatic new reading or source-review credit. Actual source reading remains distinct from full MDX reading.

The 120 restored pages were checked against 94 prior reports; 11 needed narrow factual corrections. Twenty-one separately restored instrument/operative/suture pages have current full MDX reading recorded, with exact source-access limits in their reports. None of this certifies the entire site.

## Next action

1. Confirm no other task is editing this checkout. Check Git status; preserve unrelated `world-cup-next-week-pacific.ics`.
2. Use the [efficient continuation prompt](reports/2026-09-19/efficient-continuation-prompt.md), now corrected to preserve practical content. Work in small coherent batches from the current ledger, starting with the remaining instrument pages and their manufacturer/technical sources. Reuse saved source audits with attribution.
3. Read the complete selected pages; verify the consequential claims with the appropriate source type. Keep useful existing material while addressing source gaps. No generic public audit/removal placeholders.
4. Update durable source records and regenerate the ledger with `reports/2026-09-11/full-site-review/build-ledger.py`; never hand-edit generated totals or store new evidence solely in the generated ledger.
5. Validate and publish completed batches under the standing main-branch authorization; group changes to avoid excessive Vercel builds. Check exact-commit CI/Vercel and live content. The release record has the latest publication status.

## Retained preferences

Evidence maintenance stays quarterly; technical link checks monthly. Epic remains paused with [EPIC-ROADMAP.md](EPIC-ROADMAP.md) available. Clinic and quiz stay removed, History discreet, handouts recoverable but excluded from deployment. Preserve the normal page-last-updated display. Keep manufacturer facts distinct from unsupported marketing superiority claims. Maintain practical sections, related links and media; videos remain immediately before references.

Current local production output is **131.11 MB**, below the 200 MB budget. This is not Vercel's account-storage meter. The previous 41-deployment cleanup remains historical; new deletion requires checking production, aliases and a known-good rollback.
