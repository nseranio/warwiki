# Task: write one WARWIKI Clinical Evidence trial file and its appraisal page

WARWIKI (repo, read only: /Users/joyboy/Documents/WARWIKI/warwiki) is a reference for reconstructive and functional urology and urogynecology, written for surgeons. It is replacing its one-page Journal Club with a Clinical Evidence section modeled on its sister site WHITWIKI: one structured trial file plus one full appraisal page per trial. Your working directory is a scratch folder; the ONLY files you may create are the three OUTPUT files named at the end.

## Read first

1. `src/data/clinical-evidence/SCHEMA.md` (trial file fields; every rule there applies) and `src/data/clinical-evidence/TEMPLATE.md` (page structure).
2. `STYLE.md` sections 4 (evidence wording), 11 and 12 (no relevance lists, scope lines, rebuttals of unstated claims or process notes).
3. The format exemplars from WHITWIKI (an oncology trial, so ignore its content): `/Users/joyboy/Documents/WHITWIKI/whitwiki/src/data/evidence/trials/niagara.json` and `/Users/joyboy/Documents/WHITWIKI/whitwiki/docs/clinical-evidence/studies/niagara.mdx`. WARWIKI's file uses `area` where WHITWIKI uses `cancer`, and its pages import `TrialBottomLine` too (see TEMPLATE.md). Do not copy the exemplar's `legacy` or `dateSource` fields.
4. `src/data/clinical-evidence/decisions.json` (decision points and lanes).

## Inputs (below)

TRIAL ID, its assigned `area` and `decisions` (use them exactly), the OLD JOURNAL CLUB RECORD (a lead written months ago: it may be wrong; never copy a number from it without finding it in the source), and the list of OTHER TRIAL IDS on the site (the only allowed `relations` targets).

## Time

Work efficiently: about 30 to 45 minutes. If a publisher page or search hangs or blocks you, move on to the abstract and record the limit in NOTES rather than retrying.

## Sources: read the papers, not summaries

1. Find each report's full text. Search the owner's local copies first: `grep -ril "<DOI>" /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local --include=*.txt -l | head`, then by acronym or first author and year (`grep -ril "ROSETTA" ... `), and file names in `/Users/joyboy/Documents/Medicine` and `/Users/joyboy/Downloads` (`find ... -iname "*<author>*"`); for a PDF run `pdftotext -layout FILE -`. Otherwise use open full text (PMC, the publisher) and finally the PubMed abstract. Never open auanet.org (the AUA bars AI use of its site); use the local AUA guideline copies in `reports/audit-v2/sources-local/aua-*.txt` instead.
2. Include the primary report and the follow-up reports a reader needs (long-term follow-up such as E-SISTEr, E-OPTIMAL or the ROSETTA 2-year report; key secondary analyses that changed practice). Only include a report you opened. Resolve every DOI and PMID on doi.org/Crossref/PubMed and check authors, year, journal, volume and pages before writing the citation.
3. `report.source.file`: the absolute path of the local file you read for that report, or null when you read it online. `source.level`: `full-text` or `abstract`. `source.checked`: `2026-10-18`. `status.sourceRead` is the best level you read for the primary report; `claimsChecked` and `clinicalReview` stay null.
4. Every Result, Harm and delivery Fact needs a `locator` (PDF page, table or figure, or "abstract"). Values come from the source with their denominators where the source gives them. `met` follows the trial's own prespecified threshold (noninferiority margin, primary hypothesis); `met: null` only when you read the abstract alone. Use `effect.type` `difference` for a risk difference or mean difference and say which in `measure`.
5. Not every study is a randomized superiority trial: use `design.type` `single-arm`, `cohort` or `diagnostic` and `randomized: false` where true; for a meta-analysis use `cohort`, `randomized: false`, `phase: "meta-analysis"`, `n` = total patients, and arms for the pooled comparison. Verdict `descriptive` suits single-arm and registry studies.

## What to write

**Trial file** (`<id>.json`): every SCHEMA field. `question` one sentence. `takeaway` at most 45 words: what was compared, named, and what the primary report showed (it is shown first on the page and on timelines, and checked as a high-risk claim). `verdictNote` under 20 words. `relations` only to the listed trial ids, each with a note under 25 words stating the actual connection; do not add `parallel` just for sharing a lane. `page`: `/docs/clinical-evidence/studies/<id>`. `design.description` is a short design label of at most 12 words ("Multicenter, single-blind noninferiority randomized trial"); the population goes in `design.population` (one sentence) and nowhere else. Arm labels are noun phrases that read correctly when joined by " versus ": start every label after the first with a lowercase letter unless it begins with a proper noun or acronym.

**Page** (`<id>.mdx`): follow TEMPLATE.md exactly (frontmatter title and description only; the four component imports; H1 "NAME: Full Descriptive Title"; `<TrialBottomLine id="<id>" />` right under the H1; sections in order). Write for reconstructive surgeons and urogynecologists: what was done, to whom, by whom, with what technique, and what happened, including the operative details and complications a surgeon needs. Numbers in the prose must equal the trial file (same rounding). The opening sentence states the design, population, comparison and headline result once; later sections do not repeat it. "Guidelines and approvals": only statements you read in a guideline copy (AUA/SUFU, EAU, AUGS/ACOG, NICE and others under `reports/audit-v2/sources-local/`, or open guideline documents), each with body, year, the statement in brief, and its published strength inside `<Rec>(…)</Rec>` exactly as worded in the guideline; FDA approvals or clearances only from fda.gov or accessdata.fda.gov. If no guideline you can read cites or rests on the trial, omit that section. References: `<sup>[[N]](#refN)</sup>` markers, numbered in order of first use, `## References` after a `---` line, `<a id="refN"></a>N. Last FM, Last FM, Last FM, et al. "Title." *Journal.* Year;Vol(Issue):Pages. doi:[10.x/y](https://doi.org/10.x/y)`; the primary report's DOI must appear on the page; every reference cited and every marker resolving. MDX: write `&lt;` and `&gt;` in prose and tables; no `{#id}` heading anchors.

Check your work: parse the JSON (`python3 -c "import json;json.load(open('<file>'))"`), recount every percentage against its numerator and denominator, and reread the page against the file.

## Consistency with the rest of WARWIKI

Search the site for pages that discuss this trial (`grep -rln "<ACRONYM>" /Users/joyboy/Documents/WARWIKI/warwiki/docs`). Do not edit them, but in NOTES list every number or statement on those pages that disagrees with the source (page path, the sentence, what the source says, locator). Also list any discrepancy with the OLD JOURNAL CLUB RECORD.

## OUTPUT

- `OUT_DIR/<id>.json`: the trial file.
- `OUT_DIR/<id>.mdx`: the page.
- `OUT_DIR/notes.md`: sources opened (DOI or PMID, local path or URL, full text or abstract), reports considered and left out (why), disagreements with WARWIKI pages and the old record, and anything you could not verify.

Finish by printing the number of reports, results, harms and references.
