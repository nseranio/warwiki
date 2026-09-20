# Content restoration — September 20, 2026

## Why this recovery was needed

The September 19–20 audit repeatedly replaced useful pages with short notices or orientations because the reviewer had not completed source adjudication. That was an editorial error, not evidence that all removed information was false. The user specifically identified Lone Star and clarified that manufacturer instructions and practical surgical teaching must remain useful parts of WARWIKI.

The [144-page inventory](content-removal-inventory.md) compared checkpoint `9e36335a` with `2e959bbb`: 135 restoration candidates, five selective restorations and four narrow changes to preserve. A concurrent uncommitted mouth-retractor reduction was caught by the new guard and also repaired, bringing the recovery to **141 pages**. The separate audit task was instructed to stop concurrent edits and follow the new policy. Recovery is content-specific; no Git-wide rollback was performed. Prior clinical corrections and deliberately withdrawn erroneous diagrams remain intact. User-directed Clinic/quiz removal and handout exclusion remain unchanged.

## Recovered content

- **120 pages:** recovered prior anatomy, flap, operative, suture and instrument material, with an exact [restoration manifest](content-restoration-manifest.json). Source-specific corrections carried forward are documented in [the correction review](restoration-correction-review.md).
- **16 retractor pages:** restored useful descriptions, configurations, selection, setup, handling and related resources. Manufacturer instructions and product catalogs support the relevant facts. See [Lone Star](lone-star-restoration.md), [five frame retractors](frame-retractor-restoration.md) and [handheld, illuminated and mouth retractors](hand-retractor-restoration.md).
- **Five selective pages:** restored barbed-suture, hysteropexy, deinfibulation and mesh/graft content while retaining established corrections. See [selective restoration](selective-content-restoration.md).
- Four other narrow changes were preserved: foundations landing, glans reconstruction, vulvar descriptor and Manchester-Fothergill.

Restoration does not certify every recovered claim. Complete source review of the corpus remains unfinished; restoring existing material is tracked separately from new reading and verification. Historical source-review records remain available and attributable.

## Preventing recurrence

The [content-preservation policy](content-preservation-policy.md) is now linked from AGENTS, CLAUDE, the maintenance runbook, completion plan and efficient continuation prompt. It distinguishes manufacturer facts, anatomical/technical teaching and clinical outcome claims, and requires narrow corrections instead of wholesale deletion because a source has not been re-read. A new lint check rejects the specific public blanket-removal notices that caused this regression. It does not purport to detect every possible truncation or certify clinical accuracy.

The generated ledger now ingests durable post-checkpoint records rather than losing reviews embedded only in its prior generated output. Restored pages have a separate pending-review disposition; the audit cannot gain completion credit by replacing a substantive page with a checked stub.

## Validation and publication

Local lint, typecheck, 32 unit tests, 58 maintenance tests, production build and whitespace checks pass. The six new content-preservation tests include the actual Lone Star regression and legitimate clinical/manufacturer examples. Reference-density advisories remain a review queue, not build failures or proof that a page is false.

Build output: **131.11 MB / 2,563 files**, below the 200 MB budget. Compiled validation covers 1,191 HTML pages, 97,224 local links/assets and 720 data-link literals. All **141 restored routes** pass [rendered-content availability checks](content-restoration-route-checks.json). This is a technical check, not 141 fresh clinical reads. All **10 representative desktop/mobile checks** pass for Lone Star, Bookwalter, Lighted Retractors, Mouth Retractors and Barbed Sutures: content, citations, scrolling and runtime checks. Six screenshots were actually inspected; see [browser verification](content-restoration-browser.md).

Ledger: **1,186 pages; 698 full current-page reads; 670 scoped updates, 21 checked, 12 unresolved, 120 restored pending review, 363 unreviewed; no complete clinical clearance.** Historical source reviews remain reusable with attribution. The local output size is not the Vercel account-storage meter.

Published content commit **`96816311f0c77534385d4f96b2f1e71f48d54127`** to `origin/main`. Exact-commit [GitHub CI 35514689423](https://github.com/nseranio/warwiki/actions/runs/35514689423) and [Vercel deployment](https://vercel.com/nseranios-projects/warwiki/EwJjaX4JeyQSLdejQpinGHsTjpL2) succeeded.

All **141 production article bodies** match the validated local build's normalized article text exactly, including Lone Star's restored setup and video section. See [production verification](content-restoration-publication.json). The initial verification helper assumed directory-index HTML paths; it was corrected to use the build's `.html` output and the final complete check passed. No site defect resulted from that checker-path issue.

The recovery is published; the broader page-by-page clinical audit remains open. Continue from [RESUME-HERE](../../RESUME-HERE.md), preserving practical content and source-access distinctions. No Vercel account-storage-meter remeasurement or additional deployment deletion was performed in this repair.
