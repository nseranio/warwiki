# WARWIKI — resume here

The flight checkpoint has been resumed. Evidence maintenance is quarterly (March, June, September, December); next planned cycle December 2026. Technical link checks remain monthly. Existing automation ID is retained; no duplicate monthly review was created.

## Live baseline and current batch

- `5afd0f89` includes the frozen clinical checkpoint `7d886c61` and quarterly schedule. GitHub CI34642415845 succeeded; Vercel deployment `dpl_CXgc6HUc5kZoJBbvZVZTgSgao9vk` is READY and owns production aliases.
- A second correction batch is being finalized in this working tree. Do not call it live until the next commit is built, pushed and verified. Changes cover MUSA/Botox, ProACT comparisons, renal/metabolic surveillance, IC/BPS, sealants, anastomotic urethroplasty, UPJ/ureteral and fistula guidance. See exact scoped changes in the page ledger.
- Local full browser sweep of the baseline visited1,190 pages:1,152 passed and38 failed. The failures were local Vercel analytics404s plus missing homepage/main and empty-search test assumptions. Root/home fixes and stronger browser diagnostics are saved; rerun against the new build before reporting a clean sweep.
- External-link run34642613791 found one apparent missing ACR PDF among200 sampled URLs. The official page still links that PDF and GET succeeds despite intermittent HEAD404. The checker now confirms HEAD404/405/501 with GET and cancels response bodies; true GET404 remains an error. Rerun the published workflow after this fix ships.

## Saved references

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original110-reference survey and scoped reconciliation](reports/2026-09-11/open-evidence/README.md).
- [Whole-site page ledger](reports/2026-09-11/full-site-review/README.md). This is an ongoing audit of1,186 documentation pages. Reading a page, correcting selected claims and verifying every clinical statement are distinct.
- [Epic roadmap](EPIC-ROADMAP.md). Epic remains paused until explicitly resumed; no practice templates or patient data belong in the public repository.

## Next clinical work

1. Continue the clinical-conditions ledger at obstetric fistula (OE41/42), followed by genital, pelvic-pain and defecatory pages. Coordinate the targeted IC/BPS companion corrections with the pharmacology ledger; do not count them as full-page review.
2. Continue urethral/upper-tract ledger at `combined/erickson-dorsal-bmg-ventral-flap.mdx`; do not reread the completed44 pages unnecessarily. Remaining historical estimates are explicitly marked for further checking.
3. Continue pharmacology at the next unread page in its ledger. Eight new sealant/IC pages and targeted companion fixes are part of the current batch.
4. The root Botox/MUSA, ProACT device/procedure and renal-metabolic corrections are complete for their recorded scope. ATOMS, REMEEX and preoperative-labs edits were targeted only. Root ledger records remaining claims; no whole-page clinical clearance was inferred.
5. Reconcile remaining OpenEvidence leads. Presence-only and deferred decisions are copied to the central survey JSON; they are not source verification. High-priority remaining leads include HoLEP Cochrane25, NEUROGED12, GenderCOS74/75, ACS82/AAST94, NeuroSAFE PROOF101 and SPIRIT102. Keep cancer updates within reconstructive/survivorship scope.
6. Resume reference metadata collection from the saved JSONL cache. The current scan is partial. Missing Crossref registration and low title overlap require primary-source investigation; do not automatically replace citations or delete claims. Run `build-reference-title-signals.py` against fresh source and cache when needed.

## Publication and efficiency

Validate source lint, types, unit/maintenance checks, production build/compiled links/size, and meaningful browser checks before publication. Standing authorization is to commit and push completed work to `main/origin/main`, then verify CI, Vercel and live content. No repeat sign-in approval is needed.

41 obsolete Vercel deployments were deleted earlier; live/rollback/alias references were preserved. Retention is30 days with a minimum10 deployments; build output is about140MB versus566MB before. Seven deployments were listed after5afd. The billing meter has not been confirmed below10GB; do not equate deleted builds with immediate meter reset. Report-only updates should skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Quiz and Clinic remain removed. History is discreet. Handouts remain recoverable but excluded from build. Keep public article metadata to the ordinary last-updated display; detailed source-review notes stay internal.
