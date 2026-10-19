# ROBUST (ROBUST III family) notes, 2026-10-18

Files: `robust.json` (4 reports, 23 results, 17 harms, 18 delivery facts), `robust.mdx` (7 references). Validator run on a scratch copy of the repo tree: the only errors are relation targets (`open`, and `abc` in the existing rosetta file) that do not exist yet; everything else passes.

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| ROBUST III 1-year (primary) | doi 10.1097/JU.0000000000002346, PMID 34854748 | PMC12721643 full text via Europe PMC XML; PubMed record checked for authors, volume, pages, e-date | full text |
| ROBUST III 2-year | doi 10.1002/bco2.312, PMID 38481667 | PMC10927926 full text via Europe PMC XML; Crossref | full text |
| ROBUST III 3-year | doi 10.1089/end.2024.0718, PMID 40300835 | CC-BY publisher article as hosted on laborie.com (`https://www.laborie.com/wp-content/uploads/2021/11/srikanth-et-al-2025-a-drug-coated-balloon-treatment-for-urethral-stricture-disease-three-year-results-from-the-robust.pdf`, read as text in the scratchpad); PubMed abstract and e-date 2025-06-02. liebertpub.com returned a Cloudflare 403. | full text |
| ROBUST I 5-year | doi 10.1097/JU.0000000000004229, PMID 39213367 | `/Users/joyboy/Downloads/delong-et-al-long-term-outcomes-of-recurrent-bulbar-urethral-stricture-treatment-with-the-optilume-drug-coated-balloon.pdf` (JU Insight plus full article and editorial comments); rendered page 3 to confirm the length criterion is "≤ 2.0 cm" (the text layer drops the symbol) | full text |
| AUA Urethral Stricture Disease guideline (amended 2023) | doi 10.1097/JU.0000000000003482 (amendment article) | `reports/audit-v2/sources-local/aua-urethral-stricture-2023-unabridged.txt` (statement 11b, discussion pp 15–16) and `aua-stricture-amendment-2023.txt` | full text |
| EAU Urethral Strictures limited update 2026 | none | `reports/audit-v2/sources-local/eau-urethral-strictures-2026.txt`, section 6.2.3.d, p 32 | full text |
| FDA summary of safety and effectiveness, P210020 | https://www.accessdata.fda.gov/cdrh_docs/pdf21/P210020B.pdf | PDF text (p 1 for approval date, indication, contraindications; pp 10–22 for ROBUST III design and results); openFDA PMA record confirms decision date 2021-12-03 | full text |

All DOIs resolved on Crossref; authors, journal, volume, issue and pages match the citations. PMIDs for the 2-year and ROBUST I reports came from the Europe PMC DOI search.

## Reports considered and left out

- ROBUST I interim, 2-year and 3-year reports (Can Urol Assoc J 2020, 2021; Res Rep Urol 2022): not opened; the 5-year closeout supersedes them.
- ROBUST II 1-year (Soc Int Urol J 2022): not opened.
- TURNS real-world cohorts, the Metro retrospective series and other off-trial Optilume series: not part of the trial; not opened.
- The OPEN trial: not opened; the relation note and the "In conversation" paragraph rest only on the AUA guideline's description of it.

Choices to review: (1) ROBUST I is a separate single-arm trial (NCT03014726) but is included as a `secondary` report because the old Journal Club record bundled it; its results use only the `exp` key and are all `descriptive`. Drop it if the family should be ROBUST III only. (2) The 1-year IPSS and Qmax results are `descriptive` because the report gives group means without a between-group test, although its abstract names them key secondary endpoints. (3) The 2- and 3-year freedom-from-reintervention results are `key-secondary` with `met: true`: the papers state the difference is significant (2-year log-rank p<0.0001 and a CI) but there is no prespecified threshold for the cross-time comparison.

## Disagreements with other WARWIKI pages

1. `docs/04-surgical-techniques/drug-coated-balloon.mdx` line 188 and `docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/drug-coated-balloon.mdx` line 31: "hematuria 9/79 versus 0/48, dysuria 5/79 versus 0/48, UTI 5/79 versus 1/48" (cited to the IFU). The published 1-year report says hematuria and dysuria were each 11.4% versus 2.1% (PMC12721643, Safety Results), i.e. 1/48 in controls, and does not give a UTI split. The FDA SSED text gives related hematuria 11.4%, dysuria 6.3% and UTI 6.3% (p 19), but its Table 13 lists related hematuria 3/79 and dysuria 5/79. Not wrong against the SSED, but it differs from the paper; the pages should say which source and whether the events are adjudicated-related or all-cause.
2. `docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx` line 305: three-year 71.9% "potentially inflated by censoring participants who had treatment failure without a repeat procedure". The 3-year paper (PDF p 2, Statistics) says treatment failures were discontinued and imputed as failures for IPSS, Qmax and PVR; it does not describe how failures without a repeat procedure were censored in the Kaplan–Meier analysis. I could not find the censoring claim in the source.
3. `docs/01-foundations/pharmacology/dermatologic-topical-urethral/drug-coated-balloon-therapy.mdx` line 43: "43% with >1 prior dilation" for ROBUST I. The 5-year report gives a mean of 1.7 prior endoscopic treatments (range 1–4 required) and no such percentage; not verifiable from the 5-year paper.
4. `docs/04-surgical-techniques/drug-coated-balloon.mdx` line 85 gives "+4.78 mL/s" Qmax difference and a "59.6%, lower 90% bound 49.9%, p = 0.051" responder result; neither is in the 1-year paper, but both are in the FDA SSED (efficacy section after Table 15; Qmax difference +4.78 mL/s, responder 59.6% with 90% CI 49.9–69.3%, p=0.051), so they agree with that source. Not added to the trial file (not in the primary report).
5. Wording of AUA statement 11b: the full guideline reads "Surgeons may offer urethral dilation or direct visual internal urethrotomy, combined with drug-coated balloons" while the J Urol amendment article prints "Surgeons may perform urethral dilation, or direct visual internal urethrotomy, combined with drug-coated balloons". Strength and grade are identical (Conditional; Grade B). The page uses the guideline wording; the WARWIKI pages that say "may offer" agree with it.

No other number on the pages I grepped (ROBUST in `docs/`: DCB pages, DVIU, pharmacology, instruments, history, surgeon profiles) disagrees with the sources: 74.6% (50/67) and 26.8% (11/41), difference 44.4 (27.6–61.1), 83.2% versus 21.7%, 71.9% at 3 years, 27/56 (48%), ROBUST I 71.7%, 58% (25/43), 17/22 versus 8/21, and the semen detection rates all match.

## Disagreements with the old Journal Club record

- Year and DOI: the record is dated 2023 with doi 10.1089/end.2024.0718 as the main paper. That DOI is the J Endourol 3-year report (Srikanth, published online 2025-06-02). The primary report is the 1-year J Urol paper (Elliott, 2021-12 online, 2022;207:866).
- Authors "DeLong / Elliott et al." do not match either: primary first author Elliott; 3-year first author Srikanth; ROBUST I first author DeLong.
- Journal "J Urol / J Endourol" and design "RCT (ROBUST III) + single-arm follow-up": the 3-year follow-up is of the randomized DCB arm, while the 5-year single-arm data are a different trial (ROBUST I).
- Population "anterior/bulbar": ROBUST III enrolled anterior strictures (92.1% bulbar; penile 8/79 DCB, 2/47 control); only the AUA recommendation is bulbar-only.
- Numbers (74.6% 50/67, 26.8% 11/41, 83.2% versus 21.7%, 71.9% at 3 years, 71.7% at 5 years) all verified. The 3-year abstract itself says 71%; 71.9% is in the full text (Efficacy; Discussion).

## Inconsistencies inside the sources (not resolved; the file follows the text or table cited in each locator)

- 1-year report: abstract defines anatomical success as "≥14Fr by cystoscopy or calibration"; Methods and Table 2 footnote use a 16 Fr flexible cystoscope or 14 Fr catheter. The 2-year paper uses the 14 Fr wording. The file and page follow Methods. Table 2's footnote calls the p value "1-sided" while Methods say 2-sided 0.05; the SSED says a two-sample continuity-corrected chi-square (p 22). The SSED also gives a complete-case difference of 47.8%.
- Control-arm 1-year freedom from repeat intervention is 21.7% in the 1-year paper (with DCB 83.2%) but 23.6% in the 2- and 3-year papers; the 2-year paper's Table 3 gives DCB 86.9% at 1 year and 78.5% at 2 years versus 77.8% in its text. The later papers do not explain the change. The file records each report's own number.
- 3-year paper text: "yielding a 50% difference between groups" (71.9% minus 23.6% is 48.3).
- Serious AEs: paper 10.1% DCB (8/79) and 16.7% control; SSED Table 11 gives 9/79 (11.4%) and 10 events.
- Hematuria related to treatment: 11.4% (1-year, 3-year), 13.9% (2-year); dysuria 11.4% (1-year, all-cause comparison), 6.3% (2-year), 7.6% (3-year).
- 2-year paper: "15 treatment failures" and a 30 Fr majority; 3-year paper: 20 failures; ROBUST III 1-year baseline "3.6 prior treatments" is the pooled mean (Table 1 means 3.2 DCB, 4.3 control including one patient with 53 prior dilations).
- ROBUST I: functional success by balloon size is 38% (8/21) and 77% (17/22) in Results and Table 4 narrative, but 25% and 76% in the Discussion; the file uses Results. Abstract P<.001 versus Results P<.0001 for IPSS. The figure 1 accountability diagram shows 29 evaluable at 5 years while Table 2 uses 43 evaluable for functional success (different denominators).

## Could not verify or left out

- 2-year and 3-year reports have no PDF page numbers in the file (read as PMC XML and a publisher PDF); locators use section and table names, with PDF pages for the 3-year paper and journal pages for ROBUST I.
- Crossover cohort: only ">75% free from reintervention at 1 year" is stated in text; the exact value is read only from Figure 3, which I did not extract.
- FDA indication wording was corroborated by the PMA database page (WebFetch summary, not used for any number); all FDA numbers and wording come from the SSED PDF text.
- Plasma and urine paclitaxel concentrations from the pharmacokinetic cohort were left out of the file.
- The relation to `open` assumes that trial id is the UK OPEN trial; check when its file exists.
