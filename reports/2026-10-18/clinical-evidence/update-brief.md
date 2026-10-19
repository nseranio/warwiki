# Task: update one WARWIKI trial file and page from newly supplied full texts

The trial's file and page were written from abstracts because the publisher blocked the full text. The owner has now supplied full texts (paths below; each PDF has a `.txt` extraction beside it, or use `pdftotext -layout`). Bring the trial file and page up to full-text standard.

Read first: `src/data/clinical-evidence/SCHEMA.md`, `src/data/clinical-evidence/TEMPLATE.md`, STYLE.md sections 4, 11 and 12, then the current files in OUT_DIR (`<id>.json`, `<id>.mdx`, `notes.md`).

For each report named below:
1. Check every existing Result, Harm, delivery Fact, the takeaway, verdict/verdictNote and every number in the page against the full text. Correct anything that differs (value, denominator, population, endpoint, time point, effect, interval, `met`). Replace abstract/registry locators with full-text locators (journal page, table or figure).
2. Add what the abstract could not give: arm-level values with denominators, the prespecified threshold and whether it was met, key secondary endpoints, harms with denominators, and operative or delivery detail a surgeon needs. Keep the page's structure and voice; do not pad.
3. Set that report's `source.level` to `full-text` and `source.checked` to `2026-10-19`; keep `source.file` as given. Update `status.sourceRead` if the primary report is now full text. `met` may no longer be null for a report read in full.
4. Keep JSON valid, every number in the prose equal to the file, and every reference cited. Never take a number from anything but text you read verbatim.
5. Append to `notes.md` a dated section "Full-text update, October 19": what changed and why, and any disagreement with existing WARWIKI pages that the full text reveals.

The ONLY files you may change are the three in OUT_DIR (write them with the Write or Edit tool). Do not edit anything else and do not start other agents. Finish with one line: what changed (counts of corrected and added items).
