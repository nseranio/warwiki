# Claim gate schema 2: repair and migration (October 6, 2026)

Starting revision `2f256438`. Code: [gate.py](../../scripts/review/gate.py), [orchestrate.py](../../scripts/review/orchestrate.py), regression tests [test_gate.py](../../scripts/review/tests/test_gate.py) (run in `npm run test:maintenance` via [claim-gate.test.js](../../scripts/tests/claim-gate.test.js)). Machine-readable summary: [gate-migration.json](gate-migration.json). 19 regression tests.

## Weaknesses reproduced at the starting revision

| # | Weakness (plan item) | Reproduced | Repair | Regression test |
|---|---|---|---|---|
| 1 | Gate passed any ledger member, whatever its verdict | Yes: `gate.py stats` showed 361 active `source-needed` units passing (77 high-risk) | Pass depends on status (table below); unknown or open statuses fail | `test_membership_alone_never_passes`, `test_source_needed_high_risk_claim_fails_and_legacy_passes` |
| 2 | Key stripped citations and table header; no source identity | Yes (`norm()` + `key()`) | v2 key binds normalized wording + identity of each cited source (DOI, else PMID, else reference text) + table header + schema version. Renumbering and emphasis/spacing keep the key | `test_citation_swap_invalidates_but_renumbering_and_formatting_do_not`, `test_table_header_change_invalidates` |
| 3 | A rejected correction promoted the original to `ok-verifier` | Yes (`record()`) | A rejection is logged as a check but supports the original only if the verifier states `original_supported: true` with the source and a quote ([verifier brief](../../scripts/review/verifier-brief.md)) | `test_rejected_correction_is_not_support_for_the_original` |
| 4 | Applied edits closed claims by fuzzy overlap (`difflib`, ≥ 60 shared characters) | Yes | Units wholly inside the applied text become `corrected-unconfirmed` (exact normalized containment) and fail until a final-text check; others are new claims and fail anyway | `test_applied_edit_needs_final_text_check_and_no_fuzzy_closure` |
| 5 | `style`/`voice` states counted as verification | Yes | `voice` never supports; `style` becomes `not-applicable`, refused for doses, guideline statements and contraindications | `test_style_cannot_close_a_dose` |
| 6 | Orchestrator treated any existing output file as done; exit codes ignored | Yes (`finish()`) | Exit code 0 plus full validation: exactly one valid status per batch claim, no duplicates or unknown IDs, a source on every `ok`/`error`, a finding for every `error`, a valid verdict for every high/medium or reference finding. Defaults lowered to 1 reviewer and 1 verifier | `test_empty_truncated_partial_or_duplicate_output_is_not_done`, `test_verify_needs_a_verdict_for_every_consequential_finding` |
| 7 | No independent challenge of reviewer `ok` results | Yes | High-risk claims need supporting checks from two different runs; `pending --challenge RATE --seed S` samples passing claims for an independent recheck; checkers never see prior verdicts | `test_high_risk_needs_two_independent_checks` |
| 8 | CI ignored all of `reports/**`, including gate inputs | Yes | CI `paths` now re-include the ledger, exceptions, baseline and audit `verdicts.json`. The Vercel skip script is unchanged on purpose: a ledger-only change does not alter the built site, and the gate runs in CI, not in the Vercel build | (workflow syntax checked by YAML parse) |

Also removed: the `baseline` command (bulk baselining). A failing claim can pass only through `reports/audit-v2/claim-exceptions.json` with an owner, decision and unexpired date (`test_owner_exception_needs_owner_and_unexpired_date`). A check that opened no source is not support (`test_ok_without_opened_source_is_not_support`); a check of a claim edited since batching is stale and ignored (`test_check_of_since_changed_claim_is_stale`).

## Gate statuses

| Status | Gate | Counts as verified |
|---|---|---|
| `verified-supported` | Pass with ≥ 1 supporting check on record (source, quote, access above metadata); high-risk needs 2 runs | Yes |
| `verified-corrected` | Pass: verifier agreement plus a final-text check | Yes |
| `not-applicable` | Pass only for non-numeric, non-high-risk wording (operative teaching) | No (not a factual claim) |
| `source-needed` | Fail (new or changed claim without a source) | No |
| `corrected-unconfirmed`, `flagged` (confirmed finding), absent | Fail | No |
| `legacy-*` | Pass while the claim, its sources and header are unchanged | No |

## Migration result

The schema 1 ledger (25,370 entries) is preserved verbatim in `reports/audit-v2/claims-ledger-v1.json`. Every one of the 24,498 current claim units found a schema 1 record; each was given a v2 binding to its current wording, sources and header, with a legacy status. **No claim was relabelled as verified.**

| Legacy status (from schema 1) | All units | High-risk |
|---|---|---|
| `legacy-supported` (`ok` with a named source) | 14,559 | 3,397 |
| `legacy-fuzzy-fixed` (`fixed`, closed by fuzzy match) | 8,515 | 1,674 |
| `legacy-rejection-only` (`ok-verifier`) | 491 | 102 |
| `legacy-source-needed` | 361 | 77 |
| `legacy-not-applicable` (`style`) | 352 | 39 |
| `legacy-voice` | 220 | 10 |

`legacy-supported` keeps the schema 1 source note and quote, but its binding was reconstructed at migration (the checked wording matched; the cited sources at check time were not recorded), so it is reported separately from schema 2 verification. Current verified (schema 2) count: 0.

## Consequences for the workflow

- After `apply.py apply`, rewritten claims fail the gate until rechecked: `gate.py pending <touched files> --out <dir>`, `orchestrate.py --work <dir> --claims --reviewers 1 --verifiers 1`, `gate.py record <dir>`. `cycle.sh` records the run; `publish_batch.sh` still refuses to publish while the gate fails.
- Any edit to a legacy claim's wording, cited source or table header makes it a new claim needing schema 2 verification.
- Queue order for legacy work: high-risk `legacy-rejection-only` and `legacy-fuzzy-fixed` doses and guideline statements, then `legacy-source-needed` high-risk claims (source requests), then a challenge sample of `legacy-supported`.

## Codex adversarial review of the patch (October 6)

Codex (`gpt-6-sol`, high effort, read-only) reviewed the first version and reported 12 defects. Fixed: confirmed findings (agree/modify/no_edit, high or medium) now flag the claim; new `source-needed` claims fail regardless of risk; `style` closes only non-numeric, non-high-risk wording; `ok` needs a named source, a quote and access above metadata-only, and a ledger status without a supporting check fails; the binding adds the section heading (the same regimen under cystitis and pyelonephritis on the antifungals page now has two bindings), direct source URLs in the claim, and cell-level table normalization; `record()` refuses duplicate claim IDs, records nothing from a batch missing any status, and skips findings whose 120-character prefix is ambiguous unless the verdict carries `claim_id`; `pending` refuses to reuse a run folder; exceptions need a decision and a valid date.

Declined or deferred, with reasons: (1) a later `unverifiable` result does not erase an earlier supporting check that quoted the source (inaccessibility is not adverse evidence; it is logged in the claim's check history). (2) Copying a run folder under a new name to fake a second check is operator misuse, not a gate defect; independence rests on separate `pending` runs. (3) Reference lines keep their binding when the DOI is unchanged but the bibliographic text is edited (citation formatting fixes would otherwise invalidate thousands of claims); a different DOI, PMID or unresolvable text breaks it. (4) Imported data, component content and multiline claims (plan item 7) remain open: see [coverage-matrix.md](coverage-matrix.md).

Operational consequence: because `lint:claims` checks the whole site, a confirmed finding that is not applied (for example `no_edit`, waiting on full text) fails CI until it is corrected, rechecked, vetoed in `applied.json` (`skip`/`veto` status) or given an owner exception.
