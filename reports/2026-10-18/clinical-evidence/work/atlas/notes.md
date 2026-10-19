# ATLAS source and reconciliation notes

## Sources opened

- **Fitting analysis:** Nager CW et al., DOI [10.1007/s00192-009-0866-1](https://doi.org/10.1007/s00192-009-0866-1), PMID [19533009](https://pubmed.ncbi.nlm.nih.gov/19533009/). [Publisher full text](https://link.springer.com/article/10.1007/s00192-009-0866-1) read, including fitting protocol, Tables 1–3, and Results. Publisher confirms online publication June 16, 2009.
- **Primary report:** Richter HE et al., DOI [10.1097/AOG.0b013e3181d055d4](https://doi.org/10.1097/AOG.0b013e3181d055d4), PMID [20177294](https://pubmed.ncbi.nlm.nih.gov/20177294/). [PMC full text](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2914312/) read, including Methods, Tables 1–3, Results, and Discussion. No local ATLAS report was found by DOI/title search under `reports/audit-v2/sources-local` or by likely author/acronym file names under `Documents/Medicine` and `Downloads`.
- **Pelvic symptom analysis:** Kenton K et al., DOI [10.1097/SPV.0b013e31824a021d](https://doi.org/10.1097/SPV.0b013e31824a021d), PMID [22453323](https://pubmed.ncbi.nlm.nih.gov/22453323/). PubMed abstract read. PMC full-text retrieval encountered a browser challenge; only the abstract-level, qualitative comparison is entered in the trial file.
- **Predictor analysis:** Schaffer J et al., DOI [10.1097/AOG.0b013e31825a6de7](https://doi.org/10.1097/AOG.0b013e31825a6de7), PMID [22914396](https://pubmed.ncbi.nlm.nih.gov/22914396/). [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC3427534/) read, including Methods, Tables 1–3, and Results.
- **Guideline:** EAU, *Management of Non-neurogenic Female Lower Urinary Tract Symptoms*, limited update March 2026, local full-text copy `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, section 4.2.4.a.3.e and summary/recommendation section 4.2.4.a.3.g. Its pessary comparison relies on a cited evidence review; its PFMT first-line recommendation is rated `Strong`. The AUA 2023 SUI guideline copy was also checked but does not cite the ATLAS primary report; no AUA statement was put on the page.

Publisher and PubMed/PMC records established authors, titles, journals, volumes, issues, pages, DOI, and PMID. DOI resolver/Crossref pages were attempted but were unavailable through the browsing tool. The exact online publication days for the primary and two 2012 reports were not verified; their `published` dates use the first day of their indexed issue month with `dateApprox: true`. The primary paper itself reports both the three-month endpoints and the 12-month outcomes, so there is no separate long-term report in this file.

## Reports considered and left out

- Richter et al., *Clinical Trials* 2007 methods paper: design protocol, without outcome data; the primary report supplies the methods needed here.
- ATLAS sexual-function secondary analysis: a distinct patient-reported domain, but not needed to interpret the trial's primary comparison or the pessary/PFMT treatment choice; full text was not read.
- Borello-France et al., *Physical Therapy* 2013 adherence analysis (PMID 23431210): its abstract was identified, but its adherence questionnaire findings are ancillary to the randomized treatment comparison; the primary report supplies treatment-continuation figures. Full text was not read.

## Reconciliation and unresolved details

- The primary paper's Table 3 column header interchanges the behavioral and pessary `N` labels. The enrollment paragraph, Table 1, and the outcome fractions establish behavioral `N=146`, pessary `N=149`, combination `N=150` analyzed (151 randomized, one subsequently excluded). Values in the trial file use those consistent denominators.
- The earlier Nager fitting report calls 445 women randomized, while the primary report says 446 randomized and 445 analyzed after one exclusion. The trial file follows the primary report's flow; the fitting result uses its own recorded-fit denominator of 255 among 266 assigned to pessary-containing arms.
- The primary paper's Methods describes six PFDI stress-subscale items, while Table 3 footnote 3 says seven. The appraisal avoids an item count.
- For the three-month diary response, Table 3 prints `68/146 (46.7%)`; arithmetic gives `46.6%` to one decimal. The JSON uses the fraction and recomputed percentage.
- For three-month behavioral-versus-pessary satisfaction, the primary abstract prints `P=0.02`; the Results and Table 3 footnote 8 print `P=0.03`. The JSON and page use `0.03` and keep this disagreement explicit here.
- Adverse-event denominators for discharge and yeast infection were not given with the reported percentages. No denominators were inferred.
- No numeric effect confidence interval was reported for the primary behavioral-versus-pessary risk differences. The JSON differences are direct subtractions of the displayed proportions; no interval was invented.

## Existing WARWIKI pages and old record

- The only clinical page found discussing this ATLAS trial is `/Users/joyboy/Documents/WARWIKI/warwiki/docs/04-surgical-techniques/04f-incontinence-procedures/procedures/continence-pessary.mdx`, Efficacy table, line 64. Its trial counts, symptom endpoint, diary fraction, 12-month significance statement, satisfaction, withdrawal, fitting failures, and combination conclusion agree with the primary report (Methods, Tables 1–3, Results). **No source disagreement found on that page.** Searches for the DOI, formal trial title, and ATLAS-specific pessary/behavioral wording found no other clinical page.
- The old Journal Club record says “Behavioral therapy beat the pessary on patient-reported outcomes at 3 months.” This overstates the primary PGI-I comparison: 72/146 (49.3%) versus 59/149 (39.6%), `P=0.09`, did not meet the prespecified threshold; only the no-bothersome-symptoms primary endpoint favored behavioral therapy (Table 3). The diary response also did not significantly differ (Table 3).
- The old bottom line says pelvic-floor training “edges the pessary early on” and combination “adds little.” The primary paper demonstrates superiority on symptom bother and satisfaction, not on PGI-I or diary response, and its combination test failed superiority over both single treatments. Failure of superiority does not quantify how little an add-on contributes (Methods, Statistical Analysis; Table 3).
- The old record says differences “washed out by 12 months.” The precise finding is that no between-group differences were statistically significant at 12 months in the intention-to-treat analysis, with treatment continuation down to 45% for pessary and 57% for pelvic-floor exercises (Table 3; Discussion).
