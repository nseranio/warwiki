# CAPABLe: notes

## Sources opened

| Report | Identifier | Source | Level |
|---|---|---|---|
| Primary (Jelovsek 2019, Lancet Gastroenterol Hepatol 4(9):698-710) | DOI 10.1016/S2468-1253(19)30193-1, PMID 31320277, NCT02008565 | PMC6708078 (NIH author manuscript, read online at pmc.ncbi.nlm.nih.gov); PubMed record and Crossref for citation, dates, pages; PubMed abstract checked against the manuscript | full text (author manuscript) |
| Constipation analysis (Andy 2020, Am J Obstet Gynecol 222(6):590.e1-e8) | DOI 10.1016/j.ajog.2019.11.1256, PMID 31765640 | PMC7242126 (author manuscript); PubMed; Crossref | full text |
| Response predictors (Richter 2020, Am J Gastroenterol 115(1):115-127) | DOI 10.14309/ajg.0000000000000482, PMID 31895722 | PMC7197976 (author manuscript); PubMed; Crossref | full text |

All three `source.file` values are null (read online). No local copy of any CAPABLe paper exists in `reports/audit-v2/sources-local` or in the Downloads and Medicine folders. `/Users/joyboy/Downloads/jama_jelovsek_2018_oi_180030.pdf` is the OPTIMAL 5-year JAMA report, not CAPABLe.

Locators use "PMC author manuscript, Table N" because the HTML manuscript has no journal page numbers. Dates: Lancet online 2019-07-15 (PubMed ArticleDate); Andy online 2019-11-23 (PubMed ArticleDate); Richter online 2020-01-03 (Crossref published-online and PubMed entry date).

Guideline texts read for this trial: ASCRS 2023 fecal incontinence guideline (`reports/audit-v2/sources-local/pdfs-2026-10-10/ASCRS-Fecal-Incontinence-2023.pdf`) and ACOG Practice Bulletin 210 (`/Users/joyboy/Downloads/acog-practice-bulletin-no-210-fecal-incontinence.pdf`). Neither cites CAPABLe (ASCRS cites only Markland 2015 on biofeedback protocol; ACOG 210 predates the paper), so the page has no "Guidelines and approvals" section. One web search for a guideline citing CAPABLe found none. No FDA action rests on the trial.

## Reports considered and left out

- Jelovsek et al., CAPABLe design and methods, Contemp Clin Trials 2015 (PMID 26291917): only the PubMed abstract was opened; it is a protocol paper with no results.
- "Biofeedback or loperamide for faecal incontinence in women - Author's reply," Lancet Gastroenterol Hepatol 2019 (DOI 10.1016/S2468-1253(19)30334-6, PMID 31696824): correspondence, not opened.
- Correlation of digital rectal examination and anorectal manometry with patient-reported outcomes (Int Urogynecol J 2024, PMID 39162808): baseline-data analysis of CAPABLe participants, not opened beyond its reference list.
- Appendix/supplement to the primary paper (NIHMS1535512-supplement-1.pdf): not opened. The manuscript cites it for group-level changes in the two combination comparisons (Appendix p12), per-protocol results (p19, p22), constipation by group (p28) and the multiple-imputation analysis (p18). The trial file therefore gives only the model-estimated differences for the combination comparisons, no arm-level values.

## Disagreements and cautions

### Other WARWIKI pages

Only `docs/03-clinical-conditions/03i-defecatory-disorders/fecal-incontinence.mdx` discusses CAPABLe (line 154; reference 32 at line 351). `geriatric-urology.mdx` matched only on loperamide and biofeedback, not the trial.

- Line 154: "300 women with normal stool consistency randomized to loperamide, anorectal manometry-assisted biofeedback, education, or their combinations". The source has four groups that include an oral placebo: placebo plus education (42), placebo plus biofeedback (84), loperamide plus education (88), loperamide plus biofeedback (86) (manuscript Methods and Results, abstract). The sentence's own comparison, "loperamide and placebo", needs the placebo arms named. Also, 296 (not 300) women contributed to efficacy analyses after four post-randomization exclusions.
- Line 154: the page says only that clinicians should counsel about constipation risk. The source gives constipation in 33/88 (38%) and 44/86 (51%) of the two loperamide groups versus 5/42 (12%) and 19/84 (23%) of the placebo groups, P < 0.001 (Results text). The loperamide row at line 146 cites only FIRM (29% versus 10%).
- Line 146 gives low-dose loperamide as 2 mg once to three times daily; CAPABLe started 2 mg daily and allowed up to four 2 mg capsules daily (Methods, Procedures). Not a contradiction, but the trial dose range is wider.
- Line 154 "the combined intervention versus either component alone" matches the intention-to-treat result (P = 0.09 and 0.33). The per-protocol analyses (P = 0.017 and 0.018) are smaller than the minimally important difference and are not mentioned; this is not an error.

### Old Journal Club record

No number disagrees: n = 300, 24-week St Mark's (Vaizey) change, DOI, journal and year match. Differences of wording only:

- `name`: "Controlling Anal incontinence by Performing Anal exercises with Biofeedback or Loperamide" is the acronym expansion in the PMC manuscript; the published Lancet title and PubMed use "Controlling faecal incontinence in women by performing anal exercises with biofeedback or loperamide: a randomised clinical trial". The page H1 uses the manuscript's expansion and the reference line uses the published title.
- `design: RCT (2x2 factorial)`: allocation was 0.5:1:1:1 across the four cells, so the placebo plus education cell is half the size of the others.
- `result`/`bottomLine`: "All four groups improved" is supported by the manuscript ("all groups demonstrated some improvement"); group-level changes for the four cells are in the appendix, which was not read. "Constipation was reported with loperamide" understates the finding: constipation was the most common adverse event and differed across groups (P < 0.001).

### Internal inconsistencies in the source (worth knowing before the claim gate)

- Table 2 prints adjusted odds ratios for PGI-I (1.2 loperamide; 1.3 biofeedback) and for the post hoc 50% leak reduction (1.0 and 1.4) that cannot be reconciled with the printed proportions (for example 83.7% versus 57.5% gives a crude odds ratio near 3.7, not 1.4). The trial file records the proportions and P values and omits those ratios.
- Table 2 row "Number of Pad-change Leaks per Week" prints loperamide change as "2.8 (-4.0, -1.5)" without a sign; not used.
- The Lancet abstract gives P = 0.092 for loperamide plus biofeedback versus placebo plus biofeedback; the manuscript text gives 0.09. The file uses 0.09.
- The manuscript says "Only one serious adverse event was considered possible related to treatment"; Table 3 also lists one fatal event in the placebo plus biofeedback group. Its relatedness is not stated beyond that sentence.
- The Discussion's adherence figure (33/85 in the combination group) uses 85, the analysis population, not the 86 randomized.
- The manuscript's Table 3 severity counts and p-values were taken from the author manuscript; the version of record in the Lancet could differ in layout, but the abstract figures (groups, estimates, CIs, P values, constipation, serious events) match.

## Not verified

- The Lancet publisher page was not opened; page numbers and Table numbers refer to the PMC manuscript.
- Group-level 24-week St Mark's changes for the four cells, and the 12-week data, are in the unread appendix.
- Allocation concealment details and the full inclusion list (Appendix p1) were not read.
- Whether any current guideline (ACG, AGA, NICE, ESCP, ICI) cites CAPABLe was not established beyond the two local guideline texts and one web search.

## Counts

3 reports, 17 results (12 + 2 + 3), 5 harms, 3 references.
