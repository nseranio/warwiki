# Task: add missing reports to one existing WARWIKI trial family

WARWIKI (repo, read only: `/Users/joyboy/Documents/WARWIKI/warwiki`) is a reference for reconstructive and functional urology and urogynecology, written for surgeons. Its Clinical Evidence library has one structured trial file (`src/data/clinical-evidence/trials/<id>.json`) and one appraisal page (`docs/06-clinical-evidence/studies/<id>.mdx`) per trial family. The family named below is missing one or two published reports (listed under REPORTS TO ADD). Add them. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named at the end, plus saved source text described under Sources.

## Read first

1. The current trial file and page for TRIAL ID (paths above), `src/data/clinical-evidence/SCHEMA.md`, `src/data/clinical-evidence/TEMPLATE.md` and `scripts/check-clinical-evidence.mjs`.
2. `STYLE.md` sections 4, 11 and 12 (facts only: no relevance lists, scope lines, rebuttals of unstated claims, process notes or hedges).

## Sources

1. Local copies first: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/trials-2026-11-12/<doi slug>.txt` (slug = DOI lowercased, every run of non-alphanumeric characters replaced by `_`) holds the Crossref record, PubMed abstract and, when PubMed Central has it, the open full text. Also search the owner's copies: `grep -ril "<DOI>" /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local --include=*.txt -l | head`.
2. If the report is not in full text on disk, look for an open full text online: publisher open-access page, PubMed Central or Europe PMC, or the authors' institutional repository. Never use third-party uploads, and never open auanet.org. When you read a full text online, save the article's own words (copy the text as extracted, e.g. `curl` plus `pdftotext -layout`, or the page text) as `<doi slug>.fulltext.txt` in the trials-2026-11-12 folder, starting with a line `=== FULL TEXT (<URL>, read 2026-11-12) ===`. Never save a summary, digest or your own transcription: checkers reject them and every claim resting on one is cut. If you cannot save verbatim text, save nothing and use the abstract.
3. Check authors, year, journal, volume and pages of each new citation against the local Crossref/PubMed record.

## What to change

- Trial file: add each report to `reports` in date order with every SCHEMA field (`source` `{file (the absolute path of the local text you read, including a saved `.fulltext.txt`), level, checked: "2026-11-12"}`, `published`, `cutoff` only if stated, results with locators and `met` where it is a primary or key-secondary analysis, harms with denominators where reported). If the added report is the primary report and the file currently starts at a later report, make the new report the primary (`role` per SCHEMA) and recheck `verdict`, `verdictNote` and `takeaway` (at most 45 words) against it; otherwise leave those fields unless the new report changes what the takeaway must say (a later final analysis may be added in a clause). Keep every existing field and value that you do not need to change; do not reformat untouched parts.
- Page: add the report's results to `## Results` (and `## Adverse events` or `## Design` where it adds facts) in one to four sentences each, every sentence with a number cited; add the reference at the end of `## References` with the next number (or renumber if you must insert in first-citation order: then update every marker). Keep all other wording unchanged. Numbers in prose equal the trial file.
- Do not edit any other page. In notes.md list other WARWIKI pages (`grep -rln "<acronym>" docs`) whose statements disagree with the new report.

## Check your work

Parse the JSON, recount every percentage, confirm every reference is cited and every marker resolves, and diff your files against the originals to confirm only intended changes.

## OUTPUT

- `OUT_DIR/<id>.json` and `OUT_DIR/<id>.mdx`: the complete updated files.
- `OUT_DIR/notes.md`: sources opened (DOI, local path or URL, full text or abstract), what you changed, disagreements on other pages, anything you could not verify.

Finish by printing the number of reports added, results added and references added.
