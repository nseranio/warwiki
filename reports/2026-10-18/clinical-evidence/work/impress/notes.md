# IMPRESS: notes (checked 2026-10-18)

Output: `impress.json` (passes a copy of `scripts/check-clinical-evidence.mjs` run against a scratch tree) and `impress.mdx` (ten references, numbered in order of first use, all markers resolve; primary DOI on the page).

## Sources opened

| Source | Where | Level |
|---|---|---|
| Gelbard 2013, J Urol 190(1):199-207, doi 10.1016/j.juro.2013.01.087, PMID 23376148 | PubMed efetch XML (title, authors, pages, full abstract); Crossref (volume, pages, print date July 2013); Unpaywall says closed access, Europe PMC "subscription required" | abstract only. Journal full text could not be opened. |
| XIAFLEX US prescribing information, revised 4/2026 | local: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/pdfs-2026-10-06/label-xiaflex.txt` (sections 2.2, 4, 5, 6.2, 14.2, Medication Guide) | full text |
| AUA Peyronie's disease guideline (Nehra 2015, approved April 2015), doi 10.1016/j.juro.2015.05.098 | local: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/dl-2026-09-26/Peyronies-Disease.txt` and `/Users/joyboy/Downloads/Peyronies-Disease.pdf` (statements 8 and 9 and discussion, printed pp 12-14; its discussion summarizes the IMPRESS full text) | full text of the guideline |
| EAU Guidelines on Sexual and Reproductive Health, limited update March 2026 | downloaded to the scratchpad from `https://d56bochluxqnz.cloudfront.net/documents/full-guideline/EAU-Guidelines-on-Sexual-and-Reproductive-Health-2026.pdf` (section 8.2.3.a.4, PDF pp 81, 82, 84) | full text; not among the local source copies |
| FDA supplement approval letter, BLA 125338/61, signed 12/06/2013 | `https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2013/125338Orig1s0061ltr.pdf` (fetched with WebFetch; the PDF was read with pdftotext from the saved binary) | full text |
| ClinicalTrials.gov NCT01221597 (AUX-CC-803) and NCT01221623 (AUX-CC-804) | API v2 JSON (eligibility, arms, outcomes, participant flow, sites, sponsor) | full record |
| Lipshultz 2015, BJU Int 116(4):650-656, doi 10.1111/bju.13096, PMID 25711400 | PubMed abstract; Crossref (online 2015-05-18) | abstract |
| Hellstrom 2017, Urology 106:237.e9-e14, doi 10.1016/j.urology.2017.05.004, PMID 28502596 | PubMed abstract; Crossref | abstract |
| Goldstein 2020, J Urol 203(6):1191-1197, doi 10.1097/JU.0000000000000743, PMID 31922462 | PubMed abstract; Crossref | abstract |
| Ziegelmann 2023, Urology 175:126-131, doi 10.1016/j.urology.2023.02.019, PMID 36863600 | PubMed abstract; Crossref | abstract |

All five reports in the trial file have `source.file: null` and `source.level: abstract`, and `status.sourceRead` is `abstract`, because no report's full text was read.

## What in the file does not come from the abstracts (flag for the claim gate)

The abstract of the primary report gives only the pooled post hoc results. The prespecified per-trial results and most harms come from other documents I read in full:

- The four `primary` results (curvature and PDQ bother in IMPRESS I and II, with CIs, P thresholds and `met: true`) come from the FDA label section 14.2, Tables 10 and 11. Label "Study 1" and "Study 2" are IMPRESS I and II: group sizes (199/104 and 202/107 in the efficacy population) and baseline curvature (48.8/49.0 and 51.3/49.6) match the AUA guideline's IMPRESS I and II figures, and the allocation 277/140 and 274/141 matches both the registry participant flow and the abstract's 417 and 415. Locators name the label. The label gives only P < 0.01 and P < 0.05, not exact P values.
- Pooled absolute difference of 7.7 degrees: stated in the AUA guideline (p13); the abstract gives the two means (−17.0, −9.3), which subtract to the same value.
- Pooled bother difference of −1.0 is my subtraction of −2.8 and −1.8 (the abstract gives the P value 0.0037).
- Pooled IIEF overall satisfaction (5.6 to 6.6 versus 5.6 to 6.0) is from the AUA guideline p13.
- Harms Table 5 percentages, severe hematoma (33/551, 6.0%) and popping (73/551, 13.2%): FDA label 6.2. The three corporal ruptures: abstract; denominator 551 from label 6.2 and the AUA guideline. Six serious events (3 rupture, 3 hematoma, with their management) and the intercourse timing of the ruptures: AUA guideline p14. Rupture across all studies (5/1044 etc.): label.
- Completion (477/551, 251/281) is the sum of the two registry participant-flow records. Efficacy population 612/832 and 401/211 are from the label (199 + 202 and 104 + 107).
- `design.n` is the number randomized (832 = 417 + 415); arm counts 551 and 281 are the numbers dosed (label Table 9, the same men).
- Eligibility and washout details on the page come from the registry record text.

## Checks and small points

- Percentages recounted: 612/832 = 73.6%; 477/551 = 86.6%; 251/281 = 89.3%; 6/551 = 1.1%; 3/551 = 0.5%; 33/551 = 6.0%; 73/551 = 13.2%; 5/1044 = 0.5%; 9/1044 = 0.9%; 39/1044 = 3.7%; 49/280 = 17.5%; 204/280 = 72.9% (abstract says 73%).
- The label prints 0.3% for the placebo popping case, but 1/281 is 0.36%; the file gives the count (1/281) without a percentage.
- The label prints different "any adverse reaction" figures in two places (92% versus 61% for at least one reaction in the text; 84.2% versus 36.3% for reactions in at least 1% and above placebo in Table 5). Neither is used in the file or page.
- The AUA guideline's ecchymosis figures (80.0% versus 26.0%) equal the label's hematoma plus ecchymosis rows (65.5 + 14.5; 19.2 + 6.8), so the report appears to have combined them. The page uses the label's separate rows.
- Hellstrom 2017 abstract: the "higher in the <30°" group is the first number of each pair (swelling 21.1% under 30°, 14.5% at 30° or more); the harm is recorded as a note because its groups do not match the trial arms.
- Dates: `published` for the primary report is 2013-07-01 (Crossref print issue; flagged `dateApprox`); PubMed shows acceptance 2013-01-23 and a PubMed entry of 2013-02-05, and Unpaywall lists 2013-01-31, but I did not find a verified online date. Hellstrom 2017, Goldstein 2020 and Ziegelmann 2023 use the first of the Crossref print month (flagged). Lipshultz 2015 uses the Crossref online date.
- NCT: the file has `nct: NCT01221597` and both records in `registry`. The FDA letter names AUX-CC-803 and AUX-CC-804 as the phase 3 Peyronie's trials; the mapping IMPRESS I = AUX-CC-803 follows from the participant-flow numbers (277/140), which equal label Study 1.
- `relations` is empty. RestoreX is the only listed trial on the same condition, and I did not read it; it tests traction, not CCH, and none of the six relation types states the connection accurately.
- EAU PDF page numbers (81, 82, 84) are also the printed page numbers. AUA page numbers are the printed numbers on the guideline document.
- The EAU guideline states that CCH was withdrawn from the European market by its manufacturer; the page reports that as the guideline's statement.

## Reports considered and left out

- Levine 2015, J Sex Med (PMID 25388099): phase 3 open-label study (AUX-CC-802), a different trial.
- Hellstrom 2015, Urology (PMID 26199168): PDQ responsiveness analysis of IMPRESS I and II; psychometric, adds no endpoint a surgeon needs.
- Serefoglu 2017, Urology (PMID 28554517): post hoc structural model of bother and erectile function; same reason.
- Goldstein 2020, Urology 146:145 (PMID 32896582): long-term follow-up by calcification subgroup; I confirmed the identifier only and did not open it.
- Gelbard 2012 phase 2b trial (J Urol) and the Hellstrom 2013 PDQ validation paper (PMID 23376705): not IMPRESS reports.
- The Cochrane review cited on WARWIKI pages: not opened.

## Disagreements with WARWIKI pages (`grep -rln IMPRESS docs`)

No sentence contradicts a number I could read in the sources. Items to check:

1. `docs/03-clinical-conditions/03g-genital-scrotal/peyronies-disease.mdx` line 165 ("IMPRESS I & II (832 randomized; 612 in the label-defined mITT efficacy population): A post hoc pooled analysis found mean curvature improvement of 17.0° (34%) ...") and `docs/07-roots/history/prosthetics-ed.mdx` line 226 ("In the pooled post hoc analysis of the 612-man modified intention-to-treat efficacy population, mean curvature improvement ... was 34%"): the abstract does not state the population of the pooled analysis, and the label's own mITT figures are −35.0% and −33.2% (treated groups). The link between the 34% and the 612 men is not verifiable from what I read.
2. `peyronies-disease.mdx` line 164 cites the Gelbard abstract (ref 26) for the "<15° stop" rule; the abstract does not state it. The registry record and the label do.
3. `docs/07-roots/history/prosthetics-ed.mdx` line 226 says "832 treated adult men"; the label says 832 men were dosed and the abstract says 417 and 415 randomized, so "treated" is consistent but the CCH-treated count is 551.
4. `docs/01-foundations/pharmacology/index.mdx` line 59 and `peyronies-disease-agents.mdx` give "about 8°" net curvature reduction; the AUA guideline states 7.7° (17.0 − 9.3).
5. `docs/04-surgical-techniques/04j-sexual-dysfunction/penile-traction-therapy.mdx` lines 97-99 call a single-arm study "IMPRESS-extension protocol" (García-Gómez 2021); I did not read it, and "extension" is not a term from the IMPRESS reports.
6. The statements on `peyronies-disease-agents.mdx` lines 92 (per-trial −35.0/−17.8 and −33.2/−21.8; −2.8/−1.6 and −2.6/−1.5; CIs), 109 (Ziegelmann 2023 percentages), 115 (Lipshultz subgroups) and the Goldstein 2020 row ( 280 enrolled, 204 completed, 180 at year 5, 4.3°) all match the sources I read.

## Differences from the old Journal Club record

- Record says curvature improved "34% (−17°) vs 18% (−9°) (p<0.0001)" and bother improved significantly: matches the abstract, but those are post hoc pooled figures; the prespecified per-trial results (−35.0 vs −17.8 and −33.2 vs −21.8 percent; bother P < 0.05 in each) are not mentioned.
- "n: 832" is the number randomized and dosed (417 + 415); 612 were in the efficacy population.
- "Stable penile curvature 30–90°" should read stable disease with curvature of 30° to 90°.
- "Corporal rupture ... 3 cases" matches (3 of 551 CCH recipients). Serious events were 6 of 551 (three ruptures, three hematomas).
- "Basis for the AUA recommendation": the guideline calls IMPRESS I and II "the definitive trials" for the protocol, with a Moderate Recommendation, Evidence Strength Grade B; the AUA statement requires intact erectile function and curvature >30° and <90°.
- "The only FDA-approved drug" was not verified by me.

## Could not verify

- Journal full text of Gelbard 2013 (paywalled), its supplementary tables, the exact P values for the per-trial endpoints, and the proportion of men who received all four cycles.
- Sites and countries beyond the registry listing (29 US, 5 Australian sites per record).
- A verified online publication date for the primary report.
