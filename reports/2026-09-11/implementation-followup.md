# WARWIKI reliability implementation — September 11, 2026

This follow-up implements the approved recommendations after the initial evidence/storage release. Epic is paused; its retrievable plan is [EPIC-ROADMAP.md](../../EPIC-ROADMAP.md). Clinical source edits are scoped evidence updates, not clinician approval of the entire library.

## Implemented

- **Clinic access:** a `/clinic` landing page for female UI, POP, male UI, BPH, male stricture, ED and female recurrent UTI; assessment/treatment/companion links, abbreviation filtering and browser-local saved topics. Homepage shortcuts and a compact Library menu improve retrieval without another account system.
- **Search:** whole-query clinical abbreviations expand before the existing search request; specific longer queries and filters are preserved.
- **Seven core pathways:** consistent concise openings and 14 source-checked structured evidence comparisons. Records distinguish population, design, denominators, endpoint, follow-up, uncertainty, access and correction status. They are a foundation for later clinician review, not an Epic template library.
- **All 55 original figures:** regenerated from matching source generators, explicit provenance, orientation/scope, text equivalents, clinician-review status and accessible click-to-enlarge. Every figure was rendered and visually inspected. Several unsupported thresholds, outcomes and anatomy labels were corrected. Detailed limitations and individual dispositions are in [diagrams-quality.md](diagrams-quality.md).
- **Imaging:** claim-focused rewrites of CTU and RUG/VCUG, plus MRI, ultrasound and MAG3 companion corrections. Removed unsupported automatic scan-to-operation rules, fixed contrast cautions, separated anatomy from functional diagnosis, and connected actionable statements to sources.
- **Renal/stone guidance:** differentiated uric-acid dissolution from prevention and AUA/EAU cystine targets; corrected calcium-phosphate/citrate exceptions, potassium-citrate label restrictions, diversion acidosis interpretation and vitamin-C claims. Removed an unverified historical chlorpromazine dose. The metabolic-surveillance companion's creatinine-direction error and incorrect bibliography title were also corrected.
- **OASI:** integrated the July 10 IUGA guideline into the injury and repair pages; distinguished partial/full-thickness primary EAS repair, separate IAS repair and selected early secondary repair from chronic reconstruction. The schematic caption no longer implies a universal preferred repair. [IUGA guideline](https://doi.org/10.1007/s00192-026-06642-3)
- **Dependencies:** Docusaurus 3.10.2, current compatible build/test/image tools, reproducible lockfile and Node 24 LTS. Audit findings fell from 63 to 17; the remaining high findings trace to two unresolved upstream `image-size` advisories and their Docusaurus ancestors. A file-signature guard rejects affected image formats before the build; this is mitigation, not an upstream fix. See [dependency-upgrade-results.md](dependency-upgrade-results.md).
- **Publication checks:** compiled HTML and data-driven links/anchors are checked after handout omission; every production build enforces a 200 MB output limit. Original handouts remain recoverable in source but do not deploy by default. Local build copies and assistant worktrees are explicitly excluded from CLI uploads.
- **Reference/media maintenance:** reproducible inventories flag conflicting DOI titles, unlinked bibliographies, duplicate topics and short technique pages. Removed the density check's upper-length blind spot. A fresh YouTube metadata comparison queues new/changed/unavailable videos for review; it does not publish them or treat them as clinical evidence.

## Evidence checks and limits

Primary sources included the 2026 ACR contrast manual, AUA/EAU guidance, SNMMI/EANM diuretic-renography guidance, KDIGO and peer-reviewed primary studies linked directly in the updated pages. A dated evidence note records the actual scope. Bibliography identity checking is not full-text validation; absence of a linked correction notice is not proof no correction exists.

The whole-corpus structural audit covers 1,186 source documents. It does not establish clinical validity of every historical recommendation. Broader clinician review remains especially important before any material is reused in patient-care documentation. Historical outcome estimates outside the scoped changes remain queued rather than stamped with a new review date.

## Operational items requiring sign-in later

1. **Vercel stored builds:** the user authorized deletion of obsolete deployments. Current CLI credentials expired and the one official silent refresh failed. No old deployment was deleted. Resume with sign-in, inventory aliases/deployments, retain the actual live release and known-good rollback, remove obsolete unaliased builds, and verify measured storage. A smaller new build does not erase old stored deployments.
2. **GitHub schedules:** the existing sign-in lacks `workflow` scope. Prepared commits `5ede68bb` and `682dda8f` are on local `codex/monthly-workflows`; apply both to current main after authorization, publish and manually verify the jobs. The active local monthly Codex editor can use the already-published collector script meanwhile; it requires this computer and app to be available.
3. **User screen preference:** browser/sign-in interactions were paused while the user watches a show. Background code, research and headless checks continued. No new Epic work should begin until requested.

## Validation

- Production build passes: **139,552,607 bytes (139.55 MB)** across 2,572 files, **75.35% smaller** than the measured 566,081,841-byte baseline. The 200 MB budget passes. These are local output bytes, not Vercel billed storage.
- Compiled validation passes: **1,192 HTML pages, 102,789 local links/assets and 746 data-link destinations**, zero failures.
- Full source lint, TypeScript, **38 component/API tests, 42 maintenance tests**, and whitespace checks pass.
- **Four headless browser tests pass:** clinic search/saved topics/reload/no horizontal overflow at 375 and 1280 pixels, the actual expanded rUTI request to the search service, and compiled figure enlargement/Escape/focus restoration. Phone/desktop Clinic and homepage screenshots were visually inspected. Search responses were intercepted in that focused test; it verifies query transformation, not live index completeness.
- All 55 figure renders, generator parity, intrinsic dimensions and text bounds were checked separately.
- The initial integrated build exposed unsupported custom-heading syntax under the site's v4 mode; explicit anchor elements replaced it. One initial browser assertion expected an abbreviated title although the UI correctly used its full name; the test was corrected. Both final runs pass.

Publication outcome is recorded after pushing; a local successful build is not itself a live deployment.
