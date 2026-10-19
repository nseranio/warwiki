# bulking-vs-tvt: notes

Trial: Helsinki randomized noninferiority trial of polyacrylamide hydrogel (Bulkamid) versus retropubic TVT, NCT02538991. Files: `bulking-vs-tvt.json`, `bulking-vs-tvt.mdx`. The copy of `scripts/check-clinical-evidence.mjs` run against a scratch copy of the data folder plus these two files passes. Reference markers 1 to 7 are in order of first use and all resolve.

## Lead correction

The lead says "Eur Urol 2022". No such report exists. The reports are J Urol 2020 (primary, 1 year), J Urol 2022 (3 years) and NEJM Evid 2025 (5 years). The Itkonen Freitas author search on PubMed (eutils) returned only four trial papers: the J Urol 2020 and 2022 reports and the two Int Urogynecol J quality-of-life papers. The 5-year paper turned up by DOI search.

## Sources opened

| Report | ID | What I read | Level |
|---|---|---|---|
| Primary, J Urol 2020;203(2):372-378 | DOI 10.1097/JU.0000000000000517, PMID 31479396 | PubMed abstract (eutils efetch XML). Publisher page returned HTTP 402; Unpaywall shows no open copy; no local copy under `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine`, `/Users/joyboy/Downloads` or `/Users/joyboy/Desktop` (only Bulkamid brochure and IFU PDFs, not read). | abstract |
| 1-year QoL, Int Urogynecol J 2021;32(3):595-601 | DOI 10.1007/s00192-020-04618-5, PMID 33275162, PMC7902559 | Full text via Europe PMC REST fullTextXML | full text (online) |
| 3-year, J Urol 2022;208(3):658-667 | DOI 10.1097/JU.0000000000002720, PMID 35942796, PMC12721665 | Full text via Europe PMC REST fullTextXML | full text (online) |
| 3-year QoL, Int Urogynecol J 2023;34(12):2977-2984 | DOI 10.1007/s00192-023-05626-x, PMID 37672047, PMC10756861 | Full text via Europe PMC REST fullTextXML | full text (online) |
| 5-year, NEJM Evid 2025;4(5):EVIDoa2400216 | DOI 10.1056/EVIDoa2400216, PMID 40261117 | PubMed abstract. evidence.nejm.org returned HTTP 403; Unpaywall shows closed. | abstract |

All five DOIs and PMIDs resolved; authors, journal, volume, pages and online dates were checked on Crossref and PubMed. Publication dates in the file: primary 2019-09-04 (PubMed entrez date; Crossref record created 2019-09-03; issue date February 2020); QoL 1-year 2020-12-04 (Crossref online); 3-year 2022-08-09 (the article states "published August 9, 2022"); QoL 3-year 2023-09-06 (Crossref online); 5-year 2025-04-22 (Crossref and PubMed).

Other sources: ClinicalTrials.gov API record for NCT02538991 (read for registry facts only, not used for any number on the page); local guideline copies `reports/audit-v2/sources-local/aua-sui-2023-unabridged.txt` (statement 12, bulking agents discussion, references 92 and 93), `eau-non-neurogenic-female-luts-2026.txt` (section 4.2.4.c.2.c, reference 372, summary of evidence and recommendations for urethral bulking agents), `nice-ng123-ui-pop-women.txt`.

## Limits of what was read

- The primary (1-year) report and the 5-year report were read at abstract level only. `status.sourceRead` is therefore `abstract`. Every number for those two reports is quoted from the abstract; denominators are not given there and none are invented. The 5-year abstract gives satisfaction as "89 (92.7%)" and "74 (74.7%)"; the denominators 96 and 99 are implied by the percentages and by the 195 attenders and are marked as implied in the file note. In the primary abstract the satisfaction difference and interval are not stated, so that result has `effect.type` `none`.
- Design details (eligibility, randomization, sample size, procedure, operators) come from the 3-year and QoL reports, which describe the same protocol. Details the primary report may add (for example its exact exclusions and analysis populations) are not on the page.
- Registry eligibility (ClinicalTrials.gov): exclusions include BMI above 35, prolapse beyond second degree, anticholinergic or mirabegron use, active malignancy, recurrent UTI. The page uses the papers' wording instead ("clinically significant prolapse and obese women were not included") and does not give the BMI cut-off, because no paper I read states it.
- Reported inconsistencies inside the 3-year paper, kept as printed: the cough stress test interval is 8.6 to 26.9 in the abstract and text but 8.0 to 27.2 in Table 2 (abstract used; noted in the file). The "cough stress and pad test negative" row for hydrogel prints 47 (50.0%), which implies a denominator of 94, not 96; the pad-test-negative rows (53, 56.4% and 76, 83.5%) also imply smaller denominators than 96 and 92; only the 47 (50.0%) row is in the file, with a note). In the 1-year QoL paper the between-group "95% CI" printed in Table 2 does not bracket the group difference, so no interval is quoted from it.
- Randomized count: the primary report and the 1-year QoL paper say 224 women entered (TVT 111, hydrogel 113); the 3-year, 3-year QoL and 5-year reports say 223 randomized (TVT 110, hydrogel 113). The 1-year QoL paper states that one woman accidentally received two randomization envelopes; no paper says explicitly that this accounts for the difference of one. The trial file uses 224 (primary report) with arm counts 113 and 111, and the page states both counts.
- NICE NG123 (recommendation 1.5.3 on intramural bulking agents) does not cite the trial and predates the 2020 report, so it is not in the guideline section. No FDA statement was read, so no approval is listed.

## Reports considered and left out

- Patient choice and outcomes in Finland (PMC12064445, a registry/cohort paper on TVT versus polyacrylamide hydrogel in routine care) appeared in search. It is a separate observational study, not a report of this trial, and I did not open it.
- Conference abstracts and the UroToday and JU Insight summaries: not opened beyond the search listing; summaries are not used as sources.

## Relations

None. No trial on the site shares a clinical connection that I could state in a relation note: the other trials in `sui-primary-surgery` compare slings with colposuspension or one sling route with another, and none uses this trial's result as a rationale. The page links SISTEr and TOMUS in the "In conversation" paragraph only as a contrast in endpoint definition (composite or objective success versus a satisfaction score).

## WARWIKI pages that cite the trial, and disagreements

I searched `docs` for "Itkonen", "polyacrylamide" and "Helsinki". Pages that cite it:

1. `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/urethral-bulking-agents.mdx` (5-year report, ref 4; section "Five-year randomized PAHG versus TVT trial")
2. `docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx` (5-year report, ref 8)
3. `docs/01-foundations/tools/biomaterials/bulking-agents/bulkamid.mdx` (5-year report ref 7; 3-year report ref 8; section "Helsinki Randomized Trial — Five-Year TVT Comparison")

I checked every trial number on these pages against the abstracts and the 3-year full text: 223 randomized, 212 treated, 195 attended; 74/99 (74.7%) versus 89/96 (92.7%); difference 18.0 (95% CI 7.7 to 28.0); medians 90 and 98; complications before crossover 22/99 (22.2%) versus 42/96 (43.8%); 3-year cough stress test 75/96 (78.1%) versus 88/92 (95.7%); 30 crossovers; per-protocol 22/66 (33.3%) versus 74/89 (83.1%). All agree with the sources. Two wording points, not numeric errors:

- `bulkamid.mdx` says the complications 22/99 and 42/96 and satisfaction 74/99 and 89/96 are five-year attendee denominators; the 5-year abstract does not print those denominators (they are implied), and the table header "Assigned PAHG / Assigned TVT" lists "Peri-/postoperative complication before crossover" correctly as before crossover.
- `bulkamid.mdx` line on the three-year per-protocol analysis says "22/66 (33.3%) PAHG recipients versus 74/89 (83.1%) TVT recipients" for "both cough stress and pad tests"; the 3-year paper reports this in the text paragraph on the per-protocol (treatment received) analysis, consistent with the page.

`docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx` mentions polyacrylamide hydrogel but does not cite the trial. Not checked further (no trial-specific numbers there).

No page cites the 2020 primary report, the 2022 3-year report (other than `bulkamid.mdx`), or either quality-of-life paper; the AUA/SUFU and EAU guidelines both cite the primary report, and AUA/SUFU also the 3-year report.

## Things I could not verify

- Primary-report design detail, complication denominators and the satisfaction difference interval (abstract only).
- 5-year Clavien-Dindo grades, reoperations, objective cure and subjective cure (abstract only; nothing quoted).
- The primary report's exact "online" date: PubMed lists 2019-09-04, Crossref created the record 2019-09-03.
