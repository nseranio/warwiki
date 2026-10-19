# Task: claim-check one Clinical Evidence trial for the WARWIKI claim gate

Read `/Users/joyboy/Documents/WARWIKI/warwiki/scripts/review/claim-checker-brief.md` and follow it exactly (status values, `access`, `quote`, error findings with exact `edit.old`/`edit.new`, the trial-data section). This replaces the Codex reviewer for one trial; the output files are checked by a validator, so their format must be exact.

Your trial's batches are listed below (each is `WORK/batches/<slug>.json`; every claim has an `id`, its `page` (the trial JSON or the trial MDX page), the text, refs and `local_sources`). Efficiency matters: the trial's full texts are on disk. Read each report's local text once (`report.source.file` in `src/data/clinical-evidence/trials/<id>.json`; for a PDF the `.txt` beside it, or `pdftotext -layout`), then check every claim against it. Go online only for a claim whose source is not on disk (guideline lines: local copies in `reports/audit-v2/sources-local/*.txt`; never auanet.org).

For EACH slug write two files (JSON Lines, one object per line, nothing else):
- `WORK/status/<slug>.status.jsonl`: exactly one line per claim id in that batch: `{"claim_id","status","source_opened","access","quote"}` (`quote` required for ok and error).
- `WORK/findings/<slug>.jsonl`: one line per `error` claim (`{"page","claim_id","category","severity","finding","evidence","edit":{"old","new"},"confidence"}`); write an empty file when there are none.

Rules: never invent a number; every quote is verbatim from text you read; a value supported only by a different report of the same trial is an error of attribution (say which report). Do not edit the site files and do not start other agents. Finish with one line: counts of ok, error, unverifiable per slug.
