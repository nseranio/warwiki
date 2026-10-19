# Ward–Hilton source and consistency notes

Checked for this draft on 2026-10-18. The repo was read only; only the three files in this scratch directory were written. `claimsChecked` and `clinicalReview` remain unset.

## Reports opened and included

| Report | Identifier and source read | Access |
|---|---|---|
| Six-month primary report | DOI 10.1136/bmj.325.7355.67; PMID 12114234; [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC117136/) | Full text, online; `source.file: null`. PubMed/PMC citation: Ward K, Hilton P, UK and Ireland TVT Trial Group; *BMJ* 2002;325(7355):67. |
| Two-year update | DOI 10.1016/j.ajog.2003.07.029; PMID 14981369; [PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/14981369/) | Abstract, online; `source.file: null`. PubMed citation: Ward KL, Hilton P, UK and Ireland TVT Trial Group; *Am J Obstet Gynecol* 2004;190(2):324–331. Publisher full text was access blocked, so its complication tables and exact cure numerators were not extracted. |
| Five-year extension | DOI 10.1111/j.1471-0528.2007.01548.x; PMID 17970791; [full report PDF](https://slingthemesh.co.uk/wp-content/uploads/2018/10/ward_et_al-2008-bjog_3a_an_international_journal_of_obstetrics_gynaecology-1.pdf) | Full text, online; `source.file: null`. PubMed/publisher citation: Ward KL, Hilton P, UK and Ireland TVT Trial Group; *BJOG* 2008;115(2):226–233. Published online 2007-10-26 and in the 2008 volume. |

The EAU 2026 [Non-neurogenic Female LUTS guideline](https://uroweb.org/guidelines/non-neurogenic-female-luts/chapter/disease-management) was read in the owner's local copy, `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, sections 4.2.4.c.2.a and 4.2.4.c.2.b. It cites the two-year report in its bibliography (reference 95), and its colposuspension discussion reproduces the five-year prolapse comparison. The published strength for the stated colposuspension and midurethral-sling recommendations is “Strong.” No FDA claim was added.

## Reports considered and left out

- The separate article “Five Year Follow-Up Comparing Tension-Free Vaginal Tape and Colposuspension” (PMC2075574) is an observational series, not this randomized trial family.
- The 2000 TVT two-centre follow-up cited by Ward and Hilton preceded this comparison and is not a report from its randomized cohort.
- Trial-group meeting abstracts on quality of life or urodynamics were not added: the peer-reviewed primary and follow-up reports cover the decision-relevant endpoints, and no separate abstract text was used for a new claim.

## Disagreements with the old Journal Club record

- “TVT was as effective as colposuspension” and “established … equivalent” overstate the randomized primary report. Its six-month combined objective cure was 115/175 (66%) versus 97/169 (57%), P=0.099, reported 95% CI for the difference −4.7 to 21.3 percentage points; the authors explicitly said recruitment was too small to assume equivalence (*BMJ* Discussion, “Complications” and opening paragraphs).
- “Durability held at long-term follow-up” omits the five-year missing-data problem. Pad tests were available for 72/175 TVT and 49/169 colposuspension assignments; observed negative tests were 58/72 (81%) and 44/49 (90%), P=0.21. The last-observation-carried-forward analysis was 131/175 (75%) and 117/169 (69%); the report says conclusions depend heavily on missing-data assumptions (*BJOG* pp 227–229, Figure 1 and Table 2; p 232 Discussion).
- The old `primaryOutcome` combines the six-month primary endpoint with long-term follow-up. The six-month endpoint required both negative pad testing and negative cystometric stress testing; the two- and five-year reports used negative one-hour pad testing alone (*BMJ* Primary outcome measure; *AJOG* abstract; *BJOG* p 227, Outcome measures).
- The record's claim that this single trial made the sling the worldwide default is a historical interpretation not tested by the trial. Its authors reported adoption before the long-term update (*BJOG* p 226, Introduction).
- The old record's randomized total of 344, multicentre design, journal/year/DOI, first-surgery population and shorter operative/recovery times agree with the primary source (*BMJ* Abstract, Methods and Table 2).

## WARWIKI page consistency

- `/Users/joyboy/Documents/WARWIKI/warwiki/docs/04-surgical-techniques/04f-incontinence-procedures/procedures/burch-colposuspension.mdx`, evidence table and reference 25: its 5-year pad-test values (44/49 versus 58/72), P=0.21, 121/344 availability, prolapse finding and late tape-complication summary agree with the five-year report (*BJOG* pp 227–229, Tables 1–2; pp 231–232, Tables 5–6). No numerical or factual disagreement found.
- `/Users/joyboy/Documents/WARWIKI/warwiki/docs/04-surgical-techniques/04f-incontinence-procedures/procedures/historical-bladder-neck-suspensions.mdx` names the UK and Ireland TVT trial as a later comparison; no numerical or factual disagreement found (trial identity in *BMJ* title and Methods).

## Unverified points

- The two-year article body was not available. Its abstract supports the rounded 63% and 51% intention-to-treat cure values and OR 1.67 (95% CI 1.09–2.58), but does not supply cure numerators or a prespecified test threshold. Consequently its structured `met` is null and no two-year surgical harms were entered.
- No trial registration number or dated data cutoff was verified in the three reports. They are left null rather than inferred.
- The primary article does not name the colposuspension incision or explicitly call its operation Burch in the methods, so the structured comparator is “colposuspension.”
- The five-year report's Table 6 prints 4/170 repeat stress-incontinence operations as 2.3%; direct calculation is 2.35%, which rounds to 2.4% to one decimal. The page and trial file retain the numerator/denominator without that disputed percentage.
