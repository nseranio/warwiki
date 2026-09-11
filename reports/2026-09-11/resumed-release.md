# Resumed WARWIKI release — September 11, 2026

## Scope and clinical review limits

Forty documentation pages corrected since5afd0f89. The cumulative page ledger records121 full source-text reads and113 scoped updated pages among1,186 documentation pages. Full reading, primary-source checks of selected claims and complete clinical verification are different; this does not certify the entire site. MUSA2025 and the2026 Scandinavian urethroplasty follow-up are major new trial additions. IC/BPS CUA2025 recommendations, current drug/device labels, Cochrane certainty and correct study populations anchor the safety and interpretation changes.

Independent change-focused review covered the ten operative diffs and seven root clinical/device/surveillance diffs. Root reviewed pharmacology and clinical-condition additions, with primary spot-checks. One trial-classification issue was corrected: Farias2025 alternated consecutive patients despite abstract wording suggesting randomization. Unchanged historical statements and references retain their explicit unresolved status.

## Technical validation

- Source lint and typecheck passed.
-32 component tests and50 maintenance tests passed.
- Clean production build passed; output139.40MB,2,570 files,1,191HTML documents.
- Compiled internal links/assets/anchors passed.
- Whole-sitemap browser rerun and interactive search checks are in progress; final result not yet recorded.
- Initial baseline sweep:1,190 URLs visited,1,152 passed and38 failed. All console404s traced to Vercel analytics unavailable on localhost; homepage lacked main and empty-search content needed an appropriate assertion. Corrections are in this release. The stronger rerun also captures uncaught JavaScript, failed network requests and resource HTTP errors.

## External links

GitHub run34642613791 sampled200 of the site's external URLs:109 successful,90 soft403/429 responses, one HEAD404 for the ACR MR safety manual. The official ACR page still links that URL; GET returned200 PDF. A HEAD404 is now confirmed with GET (also405/501), and response bodies are cancelled so checks do not download whole35MB manuals. Real GET404 still fails; a publisher403/429 is unresolved, not certified working. A new published workflow run is pending.

## Automation and deployment storage

Quarterly evidence maintenance is live in5afd0f89 and the existing Codex automation: March/June/September/December, next cycleDecember2026. Technical link checks remain monthly. Local automated editing requires the computer/app to be running; missed runs catch up from the last completed review.

No additional deployment deletion was performed in this batch. Earlier authorized cleanup removed41 obsolete builds while preserving production/rollback/alias references. Seven deployments were listed after5afd; retention remains30days with a minimum10 builds. The meter has not been confirmed below10GB. Current build bytes and Vercel accounting are different quantities. Authoring-only edits to the checkpoint, saved prompt and Epic roadmap now skip deployment too.

## Publication

Baseline5afd0f89: CI34642415845 succeeded; Vercel dpl_CXgc6HUc5kZoJBbvZVZTgSgao9vk READY with production aliases. The new40-page batch has not yet been committed/pushed at the time of this record. Update this section after verification.

## Continuing work

Use RESUME-HERE.md and the domain ledgers. Reference metadata collection is paused after6,355 records (6,318 found); it is resumable and incomplete. Low-overlap title signals are investigation leads, not automatic citation errors. The remaining OpenEvidence reconciliation and full-site clinical review are ongoing. Epic remains paused.
