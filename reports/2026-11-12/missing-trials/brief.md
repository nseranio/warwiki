# Task: write one WARWIKI Clinical Evidence trial file and its appraisal page

WARWIKI (repo, read only: /Users/joyboy/Documents/WARWIKI/warwiki) is a reference for reconstructive and functional urology and urogynecology, written for surgeons. Its Clinical Evidence section (modeled on its sister site WHITWIKI) has one structured trial file plus one full appraisal page per trial; this trial is new to the section. Your working directory is a scratch folder; the ONLY files you may create are the three OUTPUT files named at the end, plus saved full text as described under Sources.

## Read first

1. `src/data/clinical-evidence/SCHEMA.md` (trial file fields; every rule there applies) and `src/data/clinical-evidence/TEMPLATE.md` (page structure).
2. `STYLE.md` sections 4 (evidence wording), 11 and 12 (no relevance lists, scope lines, rebuttals of unstated claims or process notes).
3. The format exemplars from WHITWIKI (an oncology trial, so ignore its content): `/Users/joyboy/Documents/WHITWIKI/whitwiki/src/data/evidence/trials/niagara.json` and `/Users/joyboy/Documents/WHITWIKI/whitwiki/docs/clinical-evidence/studies/niagara.mdx`. WARWIKI's file uses `area` where WHITWIKI uses `cancer`, and its pages import `TrialBottomLine` too (see TEMPLATE.md). Do not copy the exemplar's `legacy` or `dateSource` fields.
4. `src/data/clinical-evidence/decisions.json` (decision points and lanes).

## Inputs (below)

TRIAL ID, its assigned `area` and `decisions` (use them exactly), the LEAD (names the trial, its primary report and later reports, and why it matters; written by another agent: it may be wrong, so never copy a number, date, NCT number, acronym or claim from it without finding it in the source; if the primary report it names is a different study from the trial named, say so in notes.md and stop), and OTHER TRIAL IDS (the only allowed `relations` targets: trials in the library or being added in this run).

## Time

Work efficiently: about 30 to 45 minutes. If a publisher page or search hangs or blocks you, move on to the abstract and record the limit in NOTES rather than retrying.

## Sources: read the papers, not summaries

1. **Local copies first.** `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/trials-2026-11-12/` holds, for each primary and later report named in the LEAD, `<doi slug>.txt` (Crossref record, PubMed abstract and, when PubMed Central has it, the open full text) and `index.json` (which DOIs have full text). The slug is the DOI lowercased with every run of non-alphanumeric characters replaced by `_` (e.g. `10_1016_j_eururo_2012_10_016`); reports without a DOI are `pmid_<PMID>.txt`. Then search the owner's copies: `grep -ril "<DOI>" /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local --include=*.txt -l | head`, then by acronym or first author and year, and file names in `/Users/joyboy/Documents/Medicine` and `/Users/joyboy/Downloads` (`find ... -iname "*<author>*"`); for a PDF run `pdftotext -layout FILE -`.
2. **Open full text online** when the primary report is not in full text on disk: the publisher's open-access page, PubMed Central or Europe PMC, or the authors' institutional repository. Never use third-party uploads (course folders, file-sharing or shadow-library sites), and never open auanet.org (the AUA bars AI use of its site; use the local AUA guideline copies in `reports/audit-v2/sources-local/aua-*.txt`). When you read a full text online, save its text (title, methods, results, tables; plain text) as `<doi slug>.fulltext.txt` in the trials-2026-11-12 folder, starting with a line `=== FULL TEXT (<URL>, read 2026-11-12) ===`, and point that report's `source.file` at it so the claim checkers read the same text. Save the article's own words (as extracted, e.g. `curl` plus `pdftotext -layout`, or the page text), never a summary, digest or your own transcription; if you cannot save verbatim text, save nothing and use the abstract-level facts only. A file holding only a Crossref record (no abstract or text) supports nothing: do not cite numbers from it.
3. Include the primary report and the later reports a reader needs (long-term follow-up such as E-SISTEr, E-OPTIMAL or the ROSETTA 2-year report; key secondary analyses that changed practice). Only include a report whose text you read. Resolve every DOI and PMID on doi.org/Crossref/PubMed and check authors, year, journal, volume and pages before writing the citation.
4. `report.source.file`: the absolute path of the local file you read for that report (one of the files above, an owner copy, or your saved `.fulltext.txt`); null only when you read it online and could not save verbatim text. `source.level`: `full-text` or `abstract`. `source.checked`: `2026-11-12`. `status.sourceRead` is the best level you read for the primary report; `claimsChecked` and `clinicalReview` stay null.
5. Every Result, Harm and delivery Fact needs a `locator` (PDF page, table or figure, or "PubMed abstract, Results"). Values come from the source with their denominators where the source gives them. `met` follows the trial's own prespecified threshold (noninferiority margin, primary hypothesis); `met: null` only when you read the abstract alone and it does not say. Use `effect.type` `difference` for a risk difference or mean difference and say which in `measure`.
6. Not every study is a randomized superiority trial: use `design.type` `single-arm`, `cohort` or `diagnostic` and `randomized: false` where true; for a meta-analysis use `cohort`, `randomized: false`, `phase: "meta-analysis"`, `n` = total patients, and arms for the pooled comparison. Verdict `descriptive` suits single-arm and registry studies. Abstract-only pages stay short (250 to 450 body words); full-text pages 450 to 900.

## What to write

**Trial file** (`<id>.json`): every SCHEMA field. `question` one sentence. `takeaway` at most 45 words: what was compared, named, and what the primary report showed (it is shown first on the page and on timelines, and checked as a high-risk claim). `verdictNote` under 20 words. `relations` only to the listed trial ids, each with a note under 25 words stating the actual connection; do not add `parallel` just for sharing a lane. `page`: `/docs/clinical-evidence/studies/<id>`. Per report, `followUp` is a short phrase; when it contains a number, add `followUpLocator` (where the source states it, e.g. `PubMed abstract, Methods`). `design.phase` is always present (`"not stated in abstract"` when the source does not say). `design.description` is a short design label of at most 12 words ("Multicenter, single-blind noninferiority randomized trial"); the population goes in `design.population` (one sentence) and nowhere else. Arm labels are noun phrases that read correctly when joined by " versus ": start every label after the first with a lowercase letter unless it begins with a proper noun or acronym.

**Page** (`<id>.mdx`): follow TEMPLATE.md exactly (frontmatter title and description only; the four component imports; H1 "NAME: Full Descriptive Title"; `<TrialBottomLine id="<id>" />` right under the H1; sections in order). Write for reconstructive surgeons and urogynecologists: what was done, to whom, by whom, with what technique, and what happened, including the operative details and complications a surgeon needs. Numbers in the prose must equal the trial file (same rounding). The opening sentence states the design, population, comparison and headline result once; later sections do not repeat it. "Guidelines and approvals": only statements you read in a guideline copy (AUA/SUFU, EAU, AUGS/ACOG, NICE and others under `reports/audit-v2/sources-local/`, or open guideline documents), each with body, year, the statement in brief, and its published strength inside `<Rec>(…)</Rec>` exactly as worded in the guideline; FDA approvals or clearances only from fda.gov or accessdata.fda.gov. If no guideline you can read cites or rests on the trial, omit that section. References: `<sup>[[N]](#refN)</sup>` markers, numbered in order of first use, `## References` after a `---` line, `<a id="refN"></a>N. Last FM, Last FM, Last FM, et al. "Title." *Journal.* Year;Vol(Issue):Pages. doi:[10.x/y](https://doi.org/10.x/y)`; the primary report's DOI must appear on the page; every reference cited and every marker resolving. MDX: write `&lt;` and `&gt;` in prose and tables; no `{#id}` heading anchors.

Check your work: parse the JSON (`python3 -c "import json;json.load(open('<file>'))"`), recount every percentage against its numerator and denominator, and reread the page against the file.

## Consistency with the rest of WARWIKI

Search the site for pages that discuss this trial (`grep -rln "<ACRONYM>" /Users/joyboy/Documents/WARWIKI/warwiki/docs`). Do not edit them, but in NOTES list every number or statement on those pages that disagrees with the source (page path, the sentence, what the source says, locator). Also list any discrepancy with the LEAD.

## OUTPUT

- `OUT_DIR/<id>.json`: the trial file.
- `OUT_DIR/<id>.mdx`: the page.
- `OUT_DIR/notes.md`: sources opened (DOI or PMID, local path or URL, full text or abstract), reports considered and left out (why), disagreements with WARWIKI pages and the lead, and anything you could not verify.

Finish by printing the number of reports, results, harms and references.
