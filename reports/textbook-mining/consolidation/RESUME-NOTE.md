# Resuming a batch after an interrupted run

A previous run of this batch was cut off by a usage limit partway through
editing (September 30, ~13:00). Before doing anything else:

1. Run `git diff -- <each page in your batch>` from the repo root. Some pages
   have complete, correct edits; some have half-finished edits (for example
   inline citation markers whose reference entries were never added, or a
   sentence started but not finished). `npm run lint:citations` flags the
   broken ones.
2. Keep completed edits that meet the brief (verify any citation you did not
   add yourself with `scripts/audit/pubmed.py`). Finish or revert partial
   edits. Never leave a citation marker without its reference.
3. Look for partial ledgers from the earlier run in
   `reports/textbook-mining/consolidation/verdicts/` and in the scratchpad
   `/private/tmp/claude-501/-Users-joyboy-Documents-WARWIKI-warwiki/75091cab-d491-4957-8ea9-78ff500d22be/scratchpad/`
   (files named after your batch, e.g. `b13/ledger-g2.md`, `c02-partA.md`).
   Reuse their verdicts for pages that were completed.
4. Then process the remaining findings as the brief describes.

**Do not start helper agents.** Work through the batch yourself, page by
page. Helper agents multiplied the load and caused the usage limit to trip.
Write the complete ledger to `verdicts/<batch>.md` covering every finding id
in the batch before you finish.
