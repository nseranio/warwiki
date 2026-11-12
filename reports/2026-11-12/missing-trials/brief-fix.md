# Task: make one WARWIKI trial file and page match their sources

WARWIKI (repo, read only: `/Users/joyboy/Documents/WARWIKI/warwiki`) is a reference for reconstructive and functional urology and urogynecology. Independent claim checkers read the sources and could not confirm the claims listed under FAILING CLAIMS in the trial file and appraisal page below. Your job is to edit the two files so that every listed claim is either supported by a source on disk or removed. You never add facts.

## Files

- `OUT_DIR/<id>.json` and `OUT_DIR/<id>.mdx`: copies of the current trial file and page. Edit these copies in place. Do not create or edit any other file.

## Sources

Each report in the trial file names its local text in `source.file`, usually `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/trials-2026-11-12/<doi slug>.txt` (Crossref record, PubMed abstract and any open full text; a `.fulltext.txt` beside it holds verbatim full text an author saved). Read the source for each failing claim there first. You may open the same article's open full text online (PubMed Central, Europe PMC, the publisher's open-access page or an institutional repository; never third-party uploads and never auanet.org); if it states the claim, save its verbatim text as `<doi slug>.fulltext.txt` in the trials-2026-11-12 folder (first line `=== FULL TEXT (<URL>, read 2026-11-12) ===`) and point that report's `source.file` at it. Never save a summary. For guideline statements use only the local copies under `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/`. UNAVAILABLE SOURCES below lists reports whose full text could not be found: only what their PubMed abstract says can stay.

## How to fix each failing claim

1. Read the claim, the checker note, and the cited source.
2. If the source states the fact in different words or numbers, correct the claim to the source (same rounding as the source).
3. If the source does not state a part of the claim (a denominator, a CI, a P value, a "primary endpoint" designation, a method), remove that part. In JSON: drop the unsupported key or value (for example remove `ci`, set a denominator-free value such as `"30 (0.7%)"`, or change `role` only when the source names the endpoint's role). Keep `met` only where the source states the endpoint's role and result.
4. If nothing in the claim is supported (a report whose text is not on disk), remove the claim: delete the sentence from the page; in JSON delete the result, harm or delivery item. If every item of a report goes, delete the report from `reports`, its reference from the page (renumber references and every `<sup>` marker in first-citation order) and any mention of it in prose, `takeaway` or `verdictNote`.
5. For a `takeaway` that cites an unsupported later report, delete that clause; the takeaway must still describe the comparison and the primary report's result in at most 45 words.
6. An open error finding listed with a proposed fix: apply the fix only if the source supports it; otherwise rewrite the sentence to what the source says, or remove it.
7. Keep everything else unchanged: wording, order, formatting and every claim not listed. Numbers in prose must equal the trial file.

Also keep each result's `locator` honest: if a kept claim now rests on the PubMed abstract, set its locator to `PubMed abstract, <section>`; set a report's `source.level` to `abstract` and `source.file` to its local abstract file when its full text is not available.

## Check your work

Parse the JSON, confirm every reference is cited and every `<sup>` marker resolves to an `<a id="refN">`, and run `diff` between your copies and the repo versions to confirm only intended changes.

## OUTPUT

- The edited `OUT_DIR/<id>.json` and `OUT_DIR/<id>.mdx`.
- `OUT_DIR/notes.md`: one line per failing claim: what you did (corrected to X, trimmed Y, removed) and the source sentence you relied on.

Finish by printing the number of claims corrected, trimmed and removed.
