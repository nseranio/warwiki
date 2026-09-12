# Twelfth continuation release — September 12, 2026

## Scope

Nine documentation pages revised: Martius flap; bony and presacral anatomy; rectus fascia and fascia lata; CHASCIP and BLOOM; penile primary closure; and local flaps for LS sequelae. The ledger records **634 full current MDX reads, 607 scoped updates, 21 checked, 11 unresolved and 547 unreviewed files** across 1,186 documentation files. This is not completion of the whole-site clinical review.

The changes correct anatomical contradictions, unsafe fixation guarantees, graft/flap and adult/pediatric conflations, comparative claims from uncontrolled reports, and outcome denominators. Martius interposition is selective, with donor symptoms and fistula/continence outcomes separated. Genital techniques retain their named-procedure descriptions while removing unverified operative details. LS surgery addresses selected anatomical consequences alongside continuing disease treatment.

Sources and limits:

- [Martius review](martius-source-review.md) and [VVF systematic review](vvf-systematic-review-source-review.md): complete mains, actual graphics, selected ASCRS scope and unavailable supplements distinguished. Cochrane protocol is not outcome evidence.
- [Pelvic anatomy review](pelvic-support-anatomy-review.md): exact Hain/Celentano/Zurcher main/figure scope, selected ACS diagnostic guidance, anatomical-abstract limits and narrow 2026 chordoma abstract integration.
- [Genital closure/LS review](genital-closure-ls-source-review.md): complete Kirtschig published abridged guideline, 127 references and five actual figures; complete Ho/Gelman main and seven actual figures. Separate AWMF package remains unread.
- [CHASCIP/BLOOM source record](chascip-bloom-source-preparation.md): full named-technique methods remain inaccessible; major-review inconsistencies and actual supplementary-figure review recorded.
- [Autologous graft records](../2026-09-11/full-site-review/tools.json): full E-SISTEr main/figures, original SISTEr access limits, donor morbidity and graft-identity corrections. Downloading a Cochrane review did not constitute a full read.

Root completed final page reads and integrated reviewer drafts. The three reviewers stopped with account usage-limit errors; they are not still working. Their unfinished assignments remain queued rather than credited.

## Validation

Lint, typecheck, **32 component tests and 51 maintenance tests** pass. Production build: **132.02 MB**, 2,569 files, 1,191 HTML pages. All **97,679 compiled internal links/assets and 722 data links** pass. Existing reference-density advisories remain; these technical checks do not establish clinical correctness.

Initial browser validation found a real citation-preview overflow after desktop-to-mobile resizing. The shared component now removes hidden previews from layout and dismisses them on resize. Added a focused browser regression covering hover, resize, keyboard focus, clipping and dismissal. The rebuilt site passes all nine route/content/citation-anchor checks, desktop/mobile overflow checks and table scrolling. Eighteen actual screenshots were inspected; the focused keyboard/resize/dismissal regression passes. See [browser results](twelfth-browser-validation.json). A separate case-sensitive text assertion was corrected from “straddle” to the page’s actual “Straddle”; that was a test expectation, not a missing paragraph.

## Publication

Validated locally; commit/push and exact-commit CI/Vercel/live verification follow. Temporary source PDFs and graphics remain outside the repository. Keep the unrelated calendar file untouched.

Evidence cadence stays quarterly; Epic stays paused. Clinic/quiz remain removed, History discreet, handouts recoverable and excluded from deployment. Local build size is separate from Vercel's account storage meter, which has not been reconfirmed below 10 GB. The prior deployment-retention and main-only/report-skip controls remain in place.

## Continue

Work through the remaining page queues and full-source gaps in [RESUME-HERE.md](../../RESUME-HERE.md). The complete site has not been certified up to date or error-free.
