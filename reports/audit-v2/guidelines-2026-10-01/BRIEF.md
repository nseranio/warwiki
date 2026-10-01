# Guideline check, October 1, 2026 (Codex brief)

You are checking WARWIKI pages (repo `/Users/joyboy/Documents/WARWIKI/warwiki`) against ONE primary guideline the user just supplied. The guideline's extracted text is named in your task line and sits in `reports/audit-v2/sources-local/dl-2026-10-01/` (gitignored; the original PDFs are in `~/Downloads` if you need table layout: `pdftotext -layout -f N -l N` or `pdftoppm`).

Read first: `AUDIT.md` (per-page procedure), `STYLE.md` (wording for anything you add), `reports/2026-09-20/content-preservation-policy.md` (correct errors narrowly; never strip useful content).

## Task

1. **Find the pages.** Start from the page hints in your task line, then `rg -il` across `docs/` for the guideline's name, first author, year, and its key topics. Include pages that state a claim this guideline settles even if they do not cite it.
2. **Compare.** For each page, check every claim the guideline can settle: statement numbers, recommendation strength and evidence grade, thresholds, doses, timing, imaging choices, wording of what the guideline actually says. Correct errors narrowly. Where a page cites a secondary source for something this guideline states, add the guideline as a citation beside it.
3. **Cite correctly.** Use the guideline's own "to cite" line or journal citation (edition, year, amendment year). Keep the site citation pattern: inline `<sup>[[N]](#refN)</sup>`, reference `<a id="refN"></a>N. ...` with DOI link; GAS pages use footnotes. Keep numbering contiguous. **Never type a DOI from memory**: confirm every DOI you add with `python3 scripts/audit/pubmed.py doi <doi>` (first author and year must match).
4. **Conflicts.** When this guideline disagrees with another guideline the page cites (EAU, ACS, older AUA), state both, attributed. Do not silently replace one with the other.
5. **Record.** For each page you edited or confirmed: `python3 scripts/audit/audit.py record <path> checked "<what this guideline verified or corrected; what remains open>"`.

## Limits

- **Scope.** WARWIKI covers reconstructive, functional and prosthetic urology and urogynecology. For the oncology guidelines (NCCN penile and bladder, AUA NMIBC, UTUC, localized and salvage prostate cancer) check and cite only what bears on pages the site already has: reconstructive consequences (urethrectomy, diversion, glans and penile reconstruction, distal ureterectomy and reimplantation, post-prostatectomy and post-radiation incontinence, ED, fistula, radiation injury, survivorship). Do not add oncologic treatment sections or new pages.
- **Copyright.** Never quote more than a short phrase. NCCN text and algorithms must not be reproduced; cite them as "National Comprehensive Cancer Network. NCCN Clinical Practice Guidelines in Oncology: <Topic>. Version X.2026. <date>." (no DOI).
- **No new facts** that the guideline or a verified paper does not support. No manufacturer marketing data.
- Do not commit, build, push, pkill, or run `git` commands that write. Do not touch files outside `docs/` and `reports/audit-v2/` (status.json via audit.py, plus your report). Leave the working tree for the next guideline run.
- Run `npm run lint:citations` and `npm run lint:links` at the end and fix what you broke.

## Report

Write `reports/audit-v2/guidelines-2026-10-01/<guideline-file-stem>.md` with:

- pages edited (path) and pages confirmed without change
- each correction: claim -> fix -> guideline location (statement number or page)
- citations added, with the DOI check result
- items now settled, items still open
- decisions for the user (one line each, with your recommendation)

Keep the report short; facts, not narrative.
