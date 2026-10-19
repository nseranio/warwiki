# MTOPS notes (2026-10-18)

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| McConnell 2003, NEJM 349:2387 (primary) | doi 10.1056/NEJMoa030656; PMID 14681504 | Unofficial scanned copy of the NEJM PDF on farm.ucl.ac.be (Université catholique de Louvain course site), fetched with WebFetch and saved by the tool to `/Users/joyboy/.claude/projects/-Users-joyboy-Documents-WARWIKI-warwiki/9d03f117-3fc6-4067-a0c4-5962e10dc9cb/tool-results/webfetch-1792414446085-5ldb1e.pdf`; text extracted with pdftotext, Table 3 read from a rendered page image (rotated table). nejm.org returned 403; no copy in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or Downloads. | Full text (12 pages, journal pp2387-2398) |
| Kaplan 2006, J Urol 175:217 (volume 25 mL or more) | doi 10.1016/S0022-5347(05)00041-8; PMID 16406915 | PubMed efetch abstract | Abstract |
| Kaplan 2011, J Urol 185:1369 (finasteride by volume, post hoc) | doi 10.1016/j.juro.2010.11.060; PMID 21334655 | PMC3677556 author manuscript (Europe PMC / PMC efetch XML), all tables read | Full text |
| Fwu 2013, J Urol 190:187 (quality of life) | doi 10.1016/j.juro.2013.01.061; PMID 23357210 | PubMed abstract | Abstract |
| Fwu 2014, J Urol 191:1828 (sexual function) | doi 10.1016/j.juro.2013.12.014; PMID 24342143 | PubMed abstract | Abstract |
| Kaplan 2016, J Urol 195:1825 (time course of adverse experiences) | doi 10.1016/j.juro.2015.11.065; PMID 26678956 | PubMed abstract | Abstract |

All six DOIs resolved on Crossref and every PMID on PubMed (E-utilities) with matching authors, year, journal, volume and pages. The four abstract-level secondary reports (2006, 2013, 2014, 2016) have no numbers in their abstracts, so their results carry qualitative notes and no `values`; Kaplan 2011 was read in full.

Guidelines read from local copies (not cited as sources for trial numbers): `reports/audit-v2/sources-local/aua-bph-2026-goueli.txt` (AUA 2026 Part II, J Urol 2026;216(2):152-160, doi 10.1097/JU.0000000000005098; Combination Therapy statement and rationale citing MTOPS), `aua-bph-2026-unabridged.txt` (full guideline, statement 24 and MTOPS rationale; used to confirm the statement wording and Moderate Recommendation, Grade B), `eau-male-luts-2026.txt` (EAU March 2026, section 5.2.7.a, level of evidence 1b, Strong). No FDA entry: no FDA action specific to doxazosin plus finasteride was read, so the approvals half of the section is omitted. ClinicalTrials.gov NCT00021814 resolved through the v2 API.

## Reports considered and left out

All appeared in the PubMed MTOPS list; none was opened beyond its title.
- Bautista 2003, Control Clin Trials 24:224 (study design paper). The primary report's Methods were enough; not opened.
- Crawford 2006, J Urol 175:1422 (baseline predictors of progression in the placebo arm); Kaplan 2008, J Urol 180:1030 (prostate volume reduction by baseline size); Macoska 2019 (transition-zone fibrosis); Torkko 2015 (prostate inflammation markers); Sathianathen 2018 (finasteride and bladder cancer); Welk 2023 (LUTS reduction and mortality); Choi 2024 (tissue gene expression). Mechanistic, prognostic or off-topic for the surgeon-facing decision; not opened.
- MTOPS-cohort comparisons with minimally invasive therapy (McVary 2018 and Gupta 2018 water vapor therapy, Roehrborn 2022 prostatic urethral lift, Long 2025 and Han 2026 Rezum): they borrow the MTOPS arms as a comparator cohort rather than report MTOPS; not opened. They could be added as relations if the Rezum or other BPH trials get pages.
- Olesovsky 2016, Greco 2008, Klotz 2007 and similar reviews: secondary sources.

## Disagreements and cautions

### Within the sources

1. Primary abstract versus text: the abstract lists P<0.001 for finasteride on acute retention and on invasive therapy; the Results text and Figure 2A give P=0.009 for finasteride versus placebo on acute retention (invasive therapy P<0.001). The file uses the text (NEJM PDF p5-7).
2. Primary text versus Table 3 for maximal flow: the text gives "mean improvement" at year 4 of 4.0 (doxazosin), 3.2 (finasteride) and 5.1 mL per second (combination) without a placebo value; Table 3 gives median year-4 changes of +1.4 (placebo), +2.5, +2.2 and +3.7. The file reports the Table 3 medians in `values` and the text figures in the note. Symptom score is analogous: text means 4.9, 6.6, 5.6, 7.4 versus Table 3 medians -4.0, -6.0, -5.0, -7.0 (both are in the file).
3. Kaplan 2011: Table 3 gives P=0.367 for finasteride versus placebo below 30 mL; the abstract and text give P=0.441. The file uses 0.367 with a note. The finasteride arm is 281 men in Tables 1 and 2 and 280 in Table 3.
4. ClinicalTrials.gov NCT00021814 shows actual enrollment 3,407 and a start date of 1995-12; the paper reports 3,047 men and enrollment 1993 to 1998. The file follows the paper.
5. The primary report states a mean follow-up of 4.5 years in the full-scale study and 6.0 years in the pilot; the adverse-event table is as of September 30, 2002. No overall data cutoff date is given, so `cutoff` is null.
6. AUA 2026 unabridged text (rationale under statement 24) describes MTOPS as a 4-year trial that enrolled men with an IPSS of 8 or more, prostate volume of 30 cc or more and Qmax of 15 mL per second or less, and says clinical outcomes were "similar between combination therapy and finasteride". The paper gives mean follow-up of 4.5 years, an AUA symptom score of 8 to 35 (8 to 30 in the full-scale study), Qmax 4 to 15 mL per second with voided volume of at least 125 mL, no minimum prostate volume, and combination was better than finasteride for overall progression (P<0.001) though not for retention or invasive therapy. The page does not repeat the guideline's description.

### WARWIKI pages

Pages searched: `grep -rln "MTOPS"` and "doxazosin" across `docs`. Every MTOPS number on these pages matches the paper (3,047 men; mean 4.5 years; 39%, 34% and 66% risk reductions; only finasteride and combination reduced retention and invasive therapy; the volume subgroup statements). Minor items:
- `/Users/joyboy/Documents/WARWIKI/warwiki/docs/01-foundations/pharmacology/voiding-outlet/5-alpha-reductase-inhibitors.mdx`, reference 7: "Long-term doxazosin, finasteride and combination therapy: MTOPS" is an abbreviated title, not the published title ("The long-term effect of doxazosin, finasteride, and combination therapy on the clinical progression of benign prostatic hyperplasia"); the DOI is right. Same page, volume sentence: the finding for under 25 mL is from the abstract of Kaplan 2006 (doxazosin alone was as good as combination), consistent with the file.
- `/Users/joyboy/Documents/WARWIKI/warwiki/docs/01-foundations/pharmacology/voiding-outlet/alpha-blockers.mdx` ("Relative reductions in the composite ... 39% ... 34% ... 66%"; "Finasteride and combination therapy, but not doxazosin alone, reduced acute retention and invasive treatment"), `/Users/joyboy/Documents/WARWIKI/warwiki/docs/03-clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction.mdx` (table row for alpha blocker + 5-ARI; "MTOPS · 2003" timeline) and `/Users/joyboy/Documents/WARWIKI/warwiki/src/data/evidence-registry.json` (`mtops-2003`: 4.5, 2.7, 2.9, 1.5 per 100 person-years) agree with the source. Registry "Men at least 50 years with symptomatic BPH and reduced urinary flow" is consistent with eligibility.
- `/Users/joyboy/Documents/WARWIKI/warwiki/docs/07-roots/surgeons/h-r/steven-kaplan.mdx`: "MTOPS prostate-volume analysis (2006). Led an MTOPS analysis relating baseline prostate volume to outcomes" matches Kaplan 2006 (first author).

### Old Journal Club record

No number conflicts: n 3,047, NEJM 2003, doi 10.1056/NEJMoa030656, 66% reduction with combination, acute retention and surgery reduced by the 5-ARI (finasteride and combination). Differences in framing, not corrected on the site: (a) the old text says the combination was best "in men with larger prostates"; the trial enrolled men with no minimum prostate size (median 31.0 mL), and the volume-stratified benefit comes from later analyses (Kaplan 2006: combination no better than doxazosin below 25 mL); (b) "Combination therapy ... outperforming either agent alone" applies to overall progression and symptom score; for retention and invasive therapy the combination and finasteride alone were similar and doxazosin did not reduce them; (c) the old record carries no PMID; the correct PMID is 14681504 (12944571, which a first lookup returned, is a different NEJM paper, Grossman 2003 on neoadjuvant cystectomy, and is not used).

## Could not verify or open

- Official NEJM page (403). The primary text comes from an unofficial scan of the version of record; page numbers in locators are journal pages 2387 to 2398 (PDF p1 = journal p2387).
- Four secondary reports are abstract-level only (Kaplan 2006, Fwu 2013, Fwu 2014, Kaplan 2016) and their abstracts give no counts or effect sizes, so none are in the file. Kaplan 2011 is full text.
- No MTOPS-specific FDA action found; omitted.
- The EAU statement about 1-year MTOPS results (read in `eau-male-luts-2026.txt`) cites reference 66 (McConnell 2003) for one-year data; the primary report does not present separate 1-year efficacy analyses except Table 3 year-1 rows, so that statement is attributed to EAU on the page, not to the trial.
