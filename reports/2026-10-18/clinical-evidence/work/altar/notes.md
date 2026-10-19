# ALTAR notes (checked 2026-10-18)

## Sources opened

| Source | Identifier | Where | Level |
|---|---|---|---|
| Harding 2022, BMJ 376:e068229 (primary) | doi 10.1136/bmj-2021-0068229; PMID 35264408; PMC8905684 | PMC full text (read online; no local file; locators are sections and tables because the PMC HTML has no PDF pages) | full text |
| Harding 2022, Health Technol Assess 26(23) | doi 10.3310/QOIZ6538; PMID 35535708 | Europe PMC abstract (PubMed record). NIHR Journals Library page returns 403 to curl and WebFetch; no open copy found | abstract only |
| Hodgkinson 2026, PLoS Pathog 22(3):e1014081 | doi 10.1371/journal.ppat.1014081; PMID 41875198; PMC13029678 | PMC full text | full text |
| AUA/CUA/SUFU recurrent uncomplicated UTI guideline (2019, confirmed 2022, amended 2025) | local | `reports/audit-v2/sources-local/aua-rutI-2025-unabridged.txt` (statement 15 and rationale, PDF page 34) | full text |
| EAU Urological Infections, limited update March 2026 | local | `reports/audit-v2/sources-local/eau-urological-infections-2026.txt` (3.5.3.c.9 on p. 24; evidence summary p. 25; recommendation table p. 26) | full text |
| NICE NG112 (published 31 Oct 2018, last updated 12 Dec 2024) | web | nice.org.uk/guidance/ng112 Recommendations, Summary of the evidence and Update information pages (opened with curl; WebFetch returned 403) | full text |
| Crossref / PubMed | all DOIs and PMIDs above | author, year, journal, volume, pages and dates checked | metadata |

DOI check: the BMJ article's correct DOI is `10.1136/bmj-2021-0068229` (double zero). `10.1136/bmj-2021-068229` (the old Journal Club record) returns 404 at doi.org and Crossref.

## Reports in the file

1. `altar-2022` BMJ primary (full text).
2. `altar-2022-hta` NIHR HTA monograph (abstract only; published 2022-05, day unknown so `dateApprox`). Only the qualitative cost-effectiveness statement is recorded; the abstract gives no cost or QALY values. The monograph's remaining content (full economic model, qualitative study, detailed resistance tables) was not read.
3. `altar-2026-hodgkinson` PLOS Pathogens laboratory secondary analysis (full text), kind `biomarker`. Published 2026-03-24 per PMC and Crossref (PubMed lists 2026 Mar 22).

## Considered and left out

- BMJ supplementary appendix (harc068229.ww.pdf; supplementary tables S1 to S10): not opened.
- ALTAR protocol (Forbes 2018, Trials, doi 10.1186/s13063-018-2998-4): not opened; the BMJ methods were enough.
- DOOR analysis conference abstract (Sherwood, Open Forum Infect Dis 2022, doi 10.1093/ofid/ofac492.1859): a meeting abstract, not opened.
- Spencer 2025, J Med Microbiol (trimethoprim resistance allele growth advantage in ALTAR isolates): cited by Hodgkinson, laboratory study, not opened.
- Keogh 2024, BJU Int commentary on vitamin C after ALTAR: commentary, not opened.
- NICE evidence review B PDF: 404; the NICE "Summary of the evidence" page was read instead. It describes two studies (very low quality evidence) and does not name ALTAR, so the page does not say NICE cites ALTAR; it states recommendation 1.2.8 only.
- Hodgkinson's formaldehyde detection rate in ALTAR urines: the abstract says 85% of urines from methenamine users, the Results say more than 0.7 micromolar in 49% of samples from the 65 methenamine participants. The two statements conflict, so no detection rate was recorded.
- Hodgkinson's incidence rate ratio of 1.55 for ALTAR differs from the BMJ's adjusted 1.52 (95% CI 1.16 to 1.98); the file and page use the BMJ figure only.

## Disagreements with WARWIKI pages

No numeric disagreement with the BMJ report was found. Checked: `docs/05-special-populations/05e-womens-health/recurrent-uti.mdx` (lines 134 to 138, 260, 332 to 338), `docs/01-foundations/pharmacology/infection-prophylaxis/non-antibiotic-uti-prevention.mdx` (lines 52 to 73, 268, 286, 327 to 329), `uti-suppressive-prophylactic.mdx` (lines 45, 92, 163, 176), `urinary-diversion-specific/urinary-acidifiers.mdx` (line 66), `infection-prophylaxis/index.mdx` (line 8). All quoted numbers (240 randomized, 205 in the primary analysis, 103 and 102, 1.38 versus 0.89, difference 0.49, margin 1, 46/64 versus 39/70, P = 0.05, 9/45 versus 2/39, P = 0.06, 11/191 isolates from five participants, four methenamine and one nitrofurantoin) match the sources. Points a reviewer may want to consider:

- `recurrent-uti.mdx` line 136 cites only the HTA monograph (ref 25) for the primary-result sentence; the numbers are in the HTA abstract and the BMJ paper, so this is accurate but the BMJ paper (its ref 24) is the primary report.
- `recurrent-uti.mdx` line 136 and `non-antibiotic-uti-prevention.mdx` line 66 describe the 72% versus 56% resistance finding as "during treatment" and "at 6 or 12 months"; the source reports it at the 6- or 12-month visits, and the month-18 multidrug resistance finding (higher with methenamine, 20% versus 5%) points the other way. The non-antibiotic page includes both; `recurrent-uti.mdx` line 136 gives only the first.
- The page `non-antibiotic-uti-prevention.mdx` line 61 says trials studied 6 to 12 months; ALTAR treated for 12 months and followed participants for 6 further months.
- Statements about neurogenic bladder exclusion (non-antibiotic page line 73) and acidification not being tested (urinary-acidifiers line 66; non-antibiotic line 52) agree with the BMJ methods and limitations.

## Disagreements with the old Journal Club record (`src/data/trials.ts`, id `altar`)

- DOI `10.1136/bmj-2021-068229` does not resolve; correct is `10.1136/bmj-2021-0068229`.
- "the antibiotic arm carried more antimicrobial resistance on perineal isolates": true only for resistance to at least one antibiotic at the 6- or 12-month visits (46/64, 72%, versus 39/70, 56%; P = 0.05). At month 18, multidrug resistance in perineal E. coli was higher after methenamine (9/45, 20%, versus 2/39, 5%; P = 0.06). Both findings were exploratory.
- The record omits that the methenamine arm had the higher incidence in every analysis (adjusted IRR 1.52), that all four UTI admissions and six febrile UTIs were in the methenamine arm, and that the primary analysis included 205 of 240 women.
- Record numbers 240, 1.38, 0.89, 12 months, open-label noninferiority: confirmed.

## Could not verify or limits

- HTA monograph full text (403 from the publisher site). Its economic results are limited to the abstract statement.
- Denominators for "therapeutic antibiotics" (67, 56% versus 51, 43%) and for UTI-free proportions (43% versus 54%) are not stated in the BMJ text; the file records them as given.
- The 90% versus 95% level of the confidence interval for the microbiologically confirmed UTI differences is not stated in the text; the file leaves `ciLevel` unset for those two results.
- Per-arm isolate counts for Hodgkinson (10 from four methenamine participants, 1 from one antibiotic participant) are tallied from its Table 1; the paper states the 4 and 1 split by participant.
- Guideline page numbers for the EAU file come from the extracted text (page number sits in the line that ends each page).
- No FDA entry was added: ALTAR did not lead to an approval or clearance, and no fda.gov source tying it to one was read.
- The EAU guideline link on the page (uroweb.org/guidelines/urological-infections) was not opened; the section reference comes from the local copy.
- `npm run lint:trials` was run against a scratch copy of the repository layout (trial file plus page, decisions and timeline files); it passed. `npm run build` was not run.
