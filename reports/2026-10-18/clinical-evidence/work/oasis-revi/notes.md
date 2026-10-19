# oasis-revi notes (checked 2026-10-18)

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| Primary, Neurourol Urodyn 2024;43(7):1491-1503 | doi 10.1002/nau.25477, PMID 38634481 | Publisher PDF (CC BY-NC-ND) via the Radboud repository, https://repository.ubn.ru.nl/handle/2066/309638 (Wiley returned 403/Cloudflare). Locators use journal page numbers (PDF page = journal page minus 1489). PubMed abstract also read. | full-text |
| 24-month, J Urol 2025;213(3):323-332 | doi 10.1097/JU.0000000000004328, PMID 39585851, PMC12708047 | Europe PMC full-text XML (no page numbers, so locators are section/table names; PMC PDF blocked) | full-text |
| QoL analysis, Int Urogynecol J 2026;37(8):2451-2461 | doi 10.1007/s00192-026-06538-2, PMID 41729249, PMC13486121 | Europe PMC full-text XML | full-text |
| 36-month, J Urol 2026;216(2):219-229 | doi 10.1097/JU.0000000000005062, PMID 41973947, PMC13361951 | Europe PMC full-text XML | full-text |
| FDA De Novo summary DEN220073 | https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN220073.pdf | read (pp 18-26); decision date 08/16/2023 from the FDA De Novo database entry (accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?id=DEN220073) | full-text |

All four DOIs and PMIDs resolved on Crossref and PubMed; authors, year, journal, volume and pages match the citations. Electronic publication dates for the 24-month (2024-11-25) and 36-month (2026-04-13) reports come from Europe PMC; Crossref lists only the print month. `source.file` is null for every report (read online or from a temporary download).

Guideline copies searched: `aua-oab-2024-unabridged.txt`, `eau-non-neurogenic-female-luts-2026.txt`, `eau-neuro-urology-2026.txt`, `nice-ng123-ui-pop-women.txt`. None cites OASIS. The AUA/SUFU 2024 text discusses implantable tibial stimulators (pp 31-32), citing only the 2018 RENOVA pilot (36 patients) and eCoin, and states that no recommendation specific to these systems is provided; it carries no strength to quote, so the page's Guidelines section holds the FDA action only.

## Reports considered and left out

- Heesakkers 2018 Neurourol Urodyn 37(3):1060 and Te Dorsthorst 2020 J Urol 204:545 (3-year pilot, PMID 32271689): the earlier RENOVA iStim feasibility studies; different cohort and not opened.
- Amundsen 2025 Adv Ther 42:10 (SNM and implantable tibial meta-analysis, PMC11782405): pooled analysis, not an OASIS report; not opened.
- Amundsen 2026 J Med Econ 29:1292 (cost-utility) and Timmermans 2026 World J Urol 44:647 (review): not trial reports.
- Supplementary tables ST1-ST6 (jurology.com) were not opened; the LOCF denominator (69.5%) is therefore unverified.
- The manufacturer's surgical technique guide (G02-CLU-0131) is not on disk; the page's operative detail comes from the primary and 36-month reports only. No operative time is reported in any OASIS report.
- ClinicalTrials.gov record not opened; NCT03596671 is printed in the primary report.

## Discrepancies with the old Journal Club record

- `primaryOutcome` "sustained to 2-3 years": the primary endpoint was the 6-month intention-to-treat responder rate (76.4% against a 50% performance goal). The record's result sentence describes the 24-month report.
- `doi` 10.1097/JU.0000000000004328 is the 24-month report. The primary report is 10.1002/nau.25477 (Neurourol Urodyn 2024).
- `year` 2024 / `journal` J Urol: the 24-month report appeared online 2024-11-25 and in print March 2025 (J Urol 2025;213(3)).
- `bottomLine` "usable without prior failure of conservative therapy": true of the FDA label, but participants were required to have an inadequate response to conservative treatment and drugs (primary report p1493; 24- and 36-month reports).
- The 24-month figures (77/97, 54/97, 88/91) and "no serious device- or procedure-related adverse events" match the source.

## Disagreements between WARWIKI pages and the sources

`docs/01-foundations/tools/biomaterials/neuromodulation-devices/revi-system.mdx`
- "The current Revi System was evaluated in the OASIS pivotal study, which was published under the earlier RENOVA name." The primary report says results with the device were previously published as RENOVA iStim, which refers to the pilot; the OASIS reports are titled BlueWind System / Revi (primary report abstract, p1491).
- "282 people screened, 151 women implanted. Most had failed conservative therapy." The report says 282 consented (p1495), and the methods require an inadequate response to conservative treatment and pharmacologic treatment (p1493); the 24- and 36-month reports say all participants had failed previous therapies.
- "98 participants were not taking OAB medication" (cited to the technique guide). FDA DEN220073 p20 gives 49 taking and 101 not taking OAB medication; the primary report gives 53 (35%) taking at baseline (p1501); the QoL report gives 32.7%. The sources disagree with each other. The 89% versus 70% responder split matches FDA p20.

`docs/04-surgical-techniques/04f-incontinence-procedures/procedures/implantable-tibial-nerve-stimulation.mdx`
- Line 41 and the Revi FDA status line speak of "FDA-cleared" labeling and cite K240037; the pivotal-study route was De Novo DEN220073 (decision 08/16/2023). K240037 was not opened here.
- All other OASIS numbers on this page (76.4% with CI 68.7-82.6%, 78.4% post hoc, 77/97, 88/91, 3/151 by 24 months, 90 with 36-month diaries at 79%, 83/87, 74/90) match the sources. The 36-month report counts 5/151 explants, which the page does not mention.

`oab-uui-database.mdx` and `neuromodulation.mdx`: figures (79% of 97 at 24 months, 151 implanted, 77/97) match the source.

## Inconsistencies inside the source papers (not resolved)

- Dry at 6 months is printed "37.8% (54/144)" in the primary report (p1496); 54/144 is 37.5% and 54/143 is 37.8%. The file carries only the 12-month dry rate, 69/139 (50%, 49.6% exact).
- Journal Table 2 footnote compares all secondary endpoints with a 50% performance goal; FDA Table 8 lists 45% for the urgency and frequency endpoint.
- Adverse-event totals differ between reports: 297 (to 12 months) and 117 (12-24 months) in the 24-month report versus 303 and 121 in the 36-month report; 414 over 24 months in the QoL report.
- Table 2 of the 24-month report has device 4 mild and 3 moderate and procedure 7 mild and 10 moderate events through 12 months, which does not map cleanly onto the primary report's 6 device-related and 16 procedure-related events; the 36-month Table 4 (5 mild + 1 moderate device; 7 mild + 9 moderate procedure) does. The file uses the primary report's counts.
- Third explant: the 24-month report says a nonresponder requested explantation in year 2; the 36-month report lists later explants for painful stimulation (753 and 1,230 days) and foot fusion surgery (1,233 days), giving 5, not 6. The page notes that the reasons differ.
- The same LOCF responder rate (69.5%) is given for the 24-month and 36-month reports.
- 36-month report: abstract says 119/140 (85%) consented to the extension, the Insight box 121/140 (86%); 119 + 27 discontinued does not equal the 90 who completed.
- 24-month report text gives age 59.6 for the 24-month cohort, Table 1 gives 59.8; the QoL report also gives 59.8.
- QoL report: symptom-severity scores in text (30.6 at 12 months, 31.5 at 24) differ from Table 3 (31.0, 31.0); nonresponders at 24 months are 20.6% in text and 21.6% in Figure 3. Its completer-based HRQL response (83.1%, 85.4%) differs from the primary report's intention-to-treat 83.6% and 84.6%.
- Primary report: "FDA approval for use with both genders" while only women were studied; FDA contraindicates men with BPH or other lower urinary tract obstruction.

## Could not verify

- Supplementary tables (eligibility, LOCF table ST6, endpoint list) of the J Urol reports.
- The 95% interval 68.7% to 82.6% for the primary endpoint appears in the FDA summary (p19, Table 7), not in the journal text; it is carried in the result note with that locator.
- Ethics/IRB details and enrollment dates (not printed in the text read).
