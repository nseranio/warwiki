# Audit workflow release — September 20, 2026

## Scope

Changed the recommended lead from Terra/Medium to **GPT-5.6 Sol/High**, configured the existing **Continue WARWIKI audit** task accordingly, and updated its existing continuation heartbeat without changing its daily schedule or muted notification preference. The heartbeat now uses the real `RESUME-HERE.md`, one-writer control, shared-source clusters and claim-level completion rules. This is a workflow recommendation, not a proven medical benchmark or a guaranteed credit saving.

Saved [the workflow](audit-workflow.md), [compact continuation prompt](../2026-09-19/efficient-continuation-prompt.md), [structured record template](audit-batch-template.json), record consistency checker and regression tests. The existing ledger now consumes validated claim-batch records while retaining all prior source work. Its new disposition field separates a partial claim audit from a page read/scoped update. The checker cannot prove clinical truth or completeness.

Created [the deferred OpenEvidence register](open-evidence-refresh-queue.md), led by female SUI/MUI and OAB, followed by the user's common practice topics. No OpenEvidence query was run. Finish the existing audit first; Epic remains paused.

## Actual audit progress

The [OAB pilot](sol-high-oab-pilot.md) read the current article and checked five bounded claim groups, with exact source-access limits. Focused review corrected the pilot's overstatement of prior guideline-read scope and a site wording discrepancy in FUTURE: **1,103 randomized, 1,099 analyzed after four exclusions**. Direct primary-report flow/results citations were added. No practical sections, references or media were removed. Underlying guideline snippets, an older FDA label and the RF abstract still leave explicit source work unfinished. This is not full-page clinical clearance.

The two glans-page drafts made concurrently by the other task had no fresh primary-source verification. They are preserved exactly in [this patch](glans-drafts-pending-source-review.json), with [draft and patch hashes](glans-drafts-pending-source-review.json). The active site inputs were returned to published content; the patch remains reviewable/reapplicable. Do not blindly apply it. These proposals are the next bounded source-review assignment.

Ledger after the OAB correction: **1,186 pages; 698 recorded full current-page reads; 671 scoped updates; 20 checked; 12 unresolved; 120 restored pending review; 363 unreviewed. Zero complete clinical clearances.** New claim dispositions: one partial, 1,185 not yet represented in the new claim-batch format. The latter count does not discard historical source reviews or mean all earlier work must be repeated.

## Validation and publication

- Eight audit-record regression tests pass, including stale hashes, missing source locators false completion with unresolved claims, inconsistent completion flags and abstract-only closure.
- OAB structured record validates against its current final page hash; ledger regeneration succeeds.
- Lint, typecheck, 32 unit tests and 58 maintenance tests pass.
- Production build and compiled-link checks pass: 2,563 files, 131.11 MB (200 MB limit).
- Desktop/mobile OAB checks pass; both screenshots were visually inspected. No overflow or page errors.
- All 46 newly introduced authoring links resolve locally; historical changelog/handbook references to removed files were not treated as new broken links.
- Exact-commit CI/Vercel/live verification is pending until this content commit is pushed; publication results will be appended below.

The unrelated calendar file is preserved. No Vercel deployments were deleted, no plan changed and no usage credits redeemed in this release. The saved quarterly evidence cadence and monthly technical link cadence are unchanged.
