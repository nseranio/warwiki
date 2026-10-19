# POPPY notes

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| Hagen 2014 Lancet (primary) | DOI 10.1016/S0140-6736(13)61977-7, PMID 24290404 | Accepted (final peer-reviewed) manuscript, Aberdeen University repository, https://aura.abdn.ac.uk/bitstreams/456fe6b2-7cee-45dc-847e-fd8ea78b1cbf/download (found through Europe PMC's Unpaywall link, hdl.handle.net/2164/3322); read with pdftotext, 37 pages. No local copy existed in sources-local, Medicine or Downloads. The Lancet site returned 403. PubMed abstract (efetch) also read. | full text, but the accepted manuscript, not the typeset article |
| Fenocchi 2023 Int Urogynecol J (record linkage) | DOI 10.1007/s00192-022-05272-9, PMID 35763050, PMC9834099 | Open-access full text through Europe PMC (fullTextXML) | full text |
| EAU Non-neurogenic Female LUTS, limited update March 2026 | local | `reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, sections 4.7.4.a.1 to 4.7.4.a.6 and ref 648 | full text |
| AUGS Best Practice Statement on POP, Urogynecology 2025;31:471-481 | DOI 10.1097/SPV.0000000000001641 (Crossref checked) | `reports/audit-v2/sources-local/augs-2026-09/american-urogynecologic-society-best-practice-statement.txt`, Conservative management and ref 58 | full text |

Resolved on Crossref: Hagen (authors, Lancet 383(9919):796-806, March 2014), Fenocchi (Int Urogynecol J 34(1):239-246, online 28 June 2022), AUGS statement (authors, volume, pages). PubMed lists Hagen's electronic publication date as 28 November 2013 (used as `published`). ClinicalTrials.gov API confirms NCT00476892 as POPPY with secondary ID ISRCTN35911035.

`source.file` is null for both reports (read online). Locators for the primary report cite the PDF page of the accepted manuscript.

## Reports considered and left out

- Dickson 2013, Trials (recruitment methodology reflection, PMID 24228935): no clinical results.
- Hagen 2009 pilot trial (Int Urogynecol J): a pilot that preceded POPPY, not a POPPY report.
- PREVPROL (Hagen 2017 Lancet): a separate trial, not on the site list and not part of this family.
- Cochrane review (Hagen and Stark 2011): not a trial report.
- NICE NG123 (local copy): recommendation 1.7.5 (supervised PFMT of at least 16 weeks as a first option for stage 1 or 2 prolapse) is in the file, but the guideline text on disk does not name POPPY and its rationale says only that "a small amount of evidence" supports training, so no NICE statement is attached to the trial page.
- ACOG Practice Bulletin 214 (local): does not cite POPPY. No AUA/SUFU prolapse guideline exists locally.

## Discrepancies and cautions about the sources

1. The accepted manuscript differs from the published abstract in places. I used published-abstract values where they exist (6-month questionnaire return 377 (84%) in the abstract, versus 381/447 (85%) in the manuscript text and 189 + 199 = 388 in its Figure 1; the abstract also gives trial dates 22 June 2007 to 9 April 2010, the manuscript says recruitment ran September 2007 to February 2010). Only the 12-month return (295/447, 66%) agrees everywhere. All table values (Tables 1 to 5) come from the manuscript and should be rechecked against the typeset Lancet article when it is available.
2. The manuscript prints 71/143 as 49.6%; the quotient is 49.65%. The file keeps the printed 49.6%. The same manuscript text says "77% (365/477) attended for 6-month review" (a typo: the denominator should be 447; I did not use it).
3. The manuscript abstract gives the cost-per-point CI as GBP 50.81 to 286.11; its Results give 51.81 to 286.11. The page and file quote only the point estimate (GBP 86.59).
4. The manuscript's Table 3 labels one POP-SS item "Abdominal pain when standing", while the Results text calls it "lower abdominal heaviness"; the page does not name the item.
5. The Fenocchi abstract gives the control total secondary-care cost as GBP 172,549, whereas its Table 6 gives 172,459. The file records no cost figures for that report, only the authors' conclusion of no clear difference.
6. Fenocchi's outcome combines prolapse, incontinence and pessary-visit procedure codes (OPCS-4 P18, P22-P24, P26, Q07-Q08, Q54, M51-M58, A70, H57); the long-term result is therefore not a prolapse-recurrence or prolapse-surgery rate. Its p value is 0.047 (upper CI bound 0.99). Its "key-secondary" role in the file reflects that the outcome was that report's primary outcome but not a prespecified endpoint of the original trial; adjust if you prefer another role.
7. Fenocchi's intro says 310 trial participants were resident in Scotland, but 293 had linked data; the file uses 293 (65.5% of 447).
8. `met` for the primary endpoint is true on the trial's own test (P = 0.0053 for the prespecified between-group comparison of POP-SS change); the trial was powered for a 2.5-point difference and the observed 1.52 is smaller, which the authors say still exceeds the minimally important change.

## Disagreements with WARWIKI pages and the old record

No old Journal Club record exists. Pages that cite POPPY:

- `docs/04-surgical-techniques/04g-prolapse-repair/lifestyle-modifications.mdx` (line 50, refs 8 and 11): "447 women were randomized and 295 returned 12-month questionnaires; ... adjusted between-group difference 1.52 points" matches the source. The record-linkage sentence (293 Scottish participants, 65/149 versus 76/144, adjusted OR 0.61, 95% CI 0.37 to 0.99) matches Fenocchi; "over 11 years" is a rounding of "up to 10 years 9 months" (Fenocchi's own wording is "up to 11 years" and "more than 10 years"). No disagreement.
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/pelvic-floor-pt.mdx` (line 85, ref 17): "POP-SS reduction 3.77 versus 2.09; adjusted difference 1.52, 95% CI 0.46 to 2.59; 295 of 447 randomized women (66%)" matches the source. No disagreement.
- `docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx` discusses PFMT through NICE and does not cite POPPY; the NICE sentence is consistent with NG123 rec 1.7.5 and rec 1.7.6.

Other grep hits for "POPPY" (colovesical fistula and cystography pages) are unrelated words.

## Not verified or not done

- The typeset Lancet article and its webappendix (the Lancet site blocks automated access); published values were checked only through the PubMed abstract.
- No FDA or regulatory item applies (behavioral intervention).
- `npm run lint:trials` and the claim gate were not run (read-only repo; the three files live in the output folder). Percentages were recounted by script against numerators and denominators; takeaway is 44 words, verdictNote 14, `design.description` 6.
