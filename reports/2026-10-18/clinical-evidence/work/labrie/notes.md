# labrie (PORTRET) notes

## Sources opened

- Primary report, Labrie J, et al. N Engl J Med 2013;369:1124-1133, doi 10.1056/NEJMoa1210627, PMID 24047061: full text read at https://www.nejm.org/doi/full/10.1056/NEJMoa1210627 (Browser pane; WebFetch and curl were blocked with 403). Tables 1-4 and Figure 1 were read as the NEJM images (`.../assets/images/large/nejmoa1210627_t1..t4.jpg`, `_f1.jpg`). Every Result, Harm and Fact number comes from the article text or Tables 2-4 and Figure 1; locators are table, figure or section names (no PDF was available, so no page numbers). Crossref confirms volume, issue, pages and online date 2013-09-19; PubMed abstract (efetch) matches the full text. `source.file` is null.
- 12-year follow-up, van Oorschot HFC, Tijsseling D, Labrie J, van der Vaart CH. BJOG 2025;132(6):826-833, doi 10.1111/1471-0528.18092, PMID 39931871, PMC11969909: full text read (Europe PMC XML, CC BY). Online date 2025-02-11 (Crossref). `source.file` is null.
- EAU Guidelines on Non-neurogenic Female LUTS, limited update March 2026: local copy `reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt` (trial described around lines 2549-2552; summary of evidence and recommendations section 4.2.4.a.3.g, lines 2641-2667; reference 325 is the trial).
- Local AUA SUI 2023 (`aua-sui-2023-unabridged.txt`) and NICE NG123 (`nice-ng123-ui-pop-women.txt`) searched for the trial: neither cites it, so neither is in the Guidelines section. AUA Statement 8 (counsel on PFMT among options) was read but does not rest on the trial. auanet.org not opened.
- Validation: `scripts/check-clinical-evidence.mjs` run on a copy of the data folder with the new trial and page added; no errors for `labrie`. Every percentage recounted against its numerator and denominator; every percentage in the page also appears in the trial file.

## Reports considered and left out

- Labrie J, Lagro-Janssen AL, Fischer K, Berghmans LC, van der Vaart CH. Int Urogynecol J 2015;26:329-334, doi 10.1007/s00192-014-2473-z, PMID 25069638 (prediction of surgery after physiotherapy; 97/198 crossed over; age under 55 years OR 2.87). Abstract only; a prognostic-factor cohort within the physiotherapy arm that does not change the trial's comparison.
- Labrie J, Fischer K, van der Vaart CH. Int Urogynecol J 2012 (PMID 22437755, doi 10.1007/s00192-012-1728-9): systematic review of HRQoL after PFMT and sling surgery, not a trial report.
- Protocol, Labrie J, et al. BMC Womens Health 2009;9:24, doi 10.1186/1472-6874-9-24 (PMC2749818): not opened; it also announces a cost-effectiveness analysis, but Europe PMC returned no published cost-effectiveness report for PORTRET.
- NEJM Supplementary Appendix (Tables S1-S3, including 18-month PGI-I), protocol and disclosure PDFs: not opened. 18-month results are therefore not in the file; the sling route split (retropubic versus transobturator) is not given in the main text I read.

## Disagreements with WARWIKI pages and the old record

- No old Journal Club record (new to the site).
- No page under `docs` cites this trial (searched PORTRET, NEJMoa1210627, 24047061, "surgery versus physiotherapy", "van der Vaart"; only the unrelated PEOPLE pessary trial matched). No disagreement to report.
- Related statement, no conflict: `docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx` step 5 ("surgery need not await PFMT failure") is consistent with the 12-year report. The PFMT section there ("about half of women ... satisfied 1 year after starting PFMT") is cited to other sources, not this trial.

## Items to check or note

- Lead said "N Engl J Med 2013;369:1124": correct (369(12):1124-1133).
- 12-year Table 1 prints the responders-only PGI-I difference as -7.5 (-18.5 to 3.6) although the surgery group was higher (87.0% versus 79.5%); the sign and interval appear reversed. The file records the printed values with an explanatory note.
- NEJM abstract says 11.2% of the surgery group crossed over; the text gives "Twenty-two women (11.2%) received additional physiotherapy" without a denominator (22/196 gives 11.2%, 22/215 gives 10.2%). The file keeps the reported 11.2% and "as reported".
- The trial registered in the Netherlands Trial Register (NTR1248); no NCT number, so `nct` is null with `registry` text.
- Arm roles: surgery coded experimental and physiotherapy control (Dutch guideline first-line treatment); the paper does not use those words.
- `relations`: one `confirms` link to `esteem`, based on the 12-year report's own citation of ESTEEM; ESTEEM's question (perioperative therapy added to sling in mixed incontinence) differs, so the note says so.
- The EAU summary-of-evidence statement is rated by level of evidence (1b), not a strength rating; only the two recommendations carry `<Rec>(Strong)</Rec>`.
