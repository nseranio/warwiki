# PINNACLE notes

## Sources opened

| Source | Where | Level |
|---|---|---|
| Kaplan 2023, J Urol 210(3):500-509, doi 10.1097/JU.0000000000003568, PMID 37555604 | PMC12721621 via Europe PMC full-text XML (CC BY-NC-ND; no local copy; `source.file` null). Citation checked against Crossref and PubMed (authors, year, volume, issue, pages match). Online date 2023-08-09 (PMC epub). | full text |
| Kaplan 2024, Prostate Cancer Prostatic Dis 27(3):531-536, doi 10.1038/s41391-024-00833-z, PMID 38684918 | PMC11319191 via Europe PMC (CC BY 4.0). Crossref and PubMed match; online 2024-04-29. | full text |
| FDA SSED P220029 (approval notice June 30, 2023) | https://www.accessdata.fda.gov/cdrh_docs/pdf22/P220029B.pdf, read as PDF text | full text |
| Optilume BPH IFU 1124-004 rA | /Users/joyboy/Downloads/1124-004-rA-Optilume-BPH-Catheter-System-IFU-US.pdf (section 12, Summary of Clinical Studies) | full text; used to cross-check the SSED, not cited |
| AUA BPH guideline 2026, statement 50 and rationale | /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt (lines 250-251, 2955-3030) | full text |
| EAU Non-Neurogenic Male LUTS, March 2026, section 5.3.5.c.2 | .../sources-local/eau-male-luts-2026.txt (lines 3365, 3408-3430) | full text |
| ClinicalTrials.gov NCT04131907 | API title check only | registry record |

No local copy of the J Urol PDF exists under sources-local, Downloads or Medicine.

## Reports in the file

1. `pinnacle-2023` primary (12-month sham-controlled).
2. `pinnacle-2024` updated (2-year, Optilume BPH arm only).

## Considered and left out

- Copelan 2025, J Sex Med, doi 10.1093/jsxmed/qdae206 (PMID 39829245), PINNACLE sexual function and semen analysis: publisher full text is paywalled; the abstract has no numbers beyond baseline ED 56% versus 54.2% (P = .83) and "not different from sham at 3, 6, or 12 months", so no result could be recorded. Not opened beyond the abstract.
- EVEREST-I (1-year, 2-year, 4-year; PMID 33833379, doi 10.1007/s00345-023-04473-1, doi 10.5489/cuaj.8737) and SUMMIT: separate single-arm studies, not PINNACLE reports. The 1-year paper was not read; the 4-year CUAJ article is not open in PMC.
- Conference abstracts (CUA/NSAUA) and reviews of PINNACLE.
- No PINNACLE report beyond 2 years was found in Europe PMC (searched "PINNACLE Optilume" and 3-/5-year terms). The 2-year paper says annual follow-up continues to 5 years.

## Discrepancies inside the sources

- Primary paper, Efficacy paragraph: responders "66/96 [76.6%]". 66/96 = 68.75%. The FDA SSED gives 66/96 (68.8%) at 3 months (Table 16) and 72/94 (76.6%) at 12 months (Table 17). The file uses 72/94.
- The journal methods do not mention the 25% super-superiority margin; the Results mention it only as "significance was not maintained ... (P = .18)". The margin-adjusted difference (+1.4, 95% CI -1.6 to 4.5, P = 0.178) comes from the SSED/IFU, not the paper. The result note and locator say so.
- Qmax: SSED Table 18 gives Optilume minus sham as sham minus Optilume (-4.2, CI -7.6 to -0.8); the file reverses the sign (4.2; 0.8 to 7.6) and says so. The 12-month Qmax in the abstract (+10.3 mL/s, +125%) is the paired analysis (n = 82); the ITT-style secondary comparison is +9.7 versus +5.5 mL/s.
- 2-year paper Table 3 shows IIEF-EF means at 6 and 12 months (19.3, 18.8) and MSHQ baseline (7.5) that differ from the primary paper's Table 3 (17.3, 17.1, 7.6) for the same participants. The file uses the primary paper's values for 12 months and the 2-year paper only for baseline and 2 years.
- 2-year paper: enrollment "February 2020 to September 2022" versus January 2020 to September 2021 in the primary paper and SSED; mean age 65.4 in the text versus 64.5 in Table 1; mean IPSS change "-12.0" in the Discussion versus -12.1 in Table 2; Qmax "116.8%" improvement versus 8.7 to 19.0 (+118% by the table means). The file uses the table values and quotes 116.8% only as the paper's own figure.
- SSED first lists treatment-related UTI at 11.2% (11/98); the primary paper lists 14/98 (14%) regardless of relatedness. Both are in the file with their labels.

## Disagreements with WARWIKI pages

- `/Users/joyboy/Documents/WARWIKI/warwiki/docs/04-surgical-techniques/04m-bph-male-luts/aquablation.mdx` (comparison sentence citing the Akgul review): "2.5% for Optilume BPH at 2 years". The 2-year PINNACLE report gives surgical reintervention 3/100 (3%) (Discussion). The same page's table gives 3/100. `greenlight-pvp.mdx` line 184 also says "2.5% at 2 yr". Akgul was not opened; the 2.5% does not appear in the PINNACLE papers.
- `optilume-bph.mdx` (Trial entry criteria and Limitations) and `urolift-pul.mdx` line 160 ("Excluded in trials") state that median-lobe-dominant BPH was excluded. The primary paper's exclusion list does not mention median lobe; the 2-year paper excludes intravesical prostatic protrusion above 1 cm, and 28.0% (28/100) versus 33.3% (16/48) of participants had some protrusion (mean 5.1 and 5.3 mm). `aquablation.mdx` line 203 states this correctly. The wording "no obstructing median lobe" is the AUA 2026 recommendation's eligibility, not the trial's.
- `optilume-bph.mdx` sentence on crossover: "Twenty sham participants crossed over to active treatment before 12 months" is correct (SSED p 16 of 46). The page's Efficacy table lists "Sexual function ... preserved" for the sham column as "-"; the paper does report sham sexual scores (Table 3). Not an error.
- `optilume-bph.mdx` PINNACLE table row "Symptomatic responder (>= 30% IPSS change, no retreatment) ... 67.5% (56/83 ...)" matches the 2-year paper. The row "IPSS reduction ... -12.1 ± 8.0 (paired n = 74; IPSS 23.0 -> 11.0)" matches Table 2.
- `optilume-bph.mdx` states the 12-month versus 3-month comparison "did not meet that endpoint (difference +1.4 points, 95% CI -1.6 to 4.5, p = 0.178)": matches the SSED.
- `bladder-outlet-obstruction.mdx` line 308: "(P = .178)" matches the SSED; the journal rounds to .18.
- No other number on the pages searched (`itind.mdx`, `urolift-pul.mdx`, `drug-coated-balloon.mdx`, biomaterials `optilume-bph.mdx`, `balloon-dilator.mdx`) disagrees with the sources I read. The biomaterials page's semen-detection counts and the IFU sizing/technique figures were not re-verified here.

## Disagreements with the old Journal Club record

- `population: Men >=50 y`: the trial enrolled men 50 to 80 years old (the FDA indication is 50 years or older).
- `primaryOutcome` and `result` (11.5 versus 8.0, p = 0.178, Qmax 9.7 versus 5.5) match the sources; the 9.7 versus 5.5 Qmax figures are the ITT secondary comparison, and the same record's Qmax is not the paired +10.3 mL/s.
- `result`: "secondary endpoints were not formally tested" is stated by the FDA summary and IFU, not by the journal article, which gives nominal P values.
- `caveat`: "approval leaned on a post hoc comparison with literature sham controls": the SSED reports this post hoc analysis and also states the effectiveness conclusion rests on the randomized study; it does not describe approval as resting on the post hoc analysis alone.
- `n: 148`, `journal`, `year` and DOI are correct.

## Could not verify or left open

- Journal page numbers for locators (read from PMC XML, which has no page breaks); locators cite sections and tables.
- A DOI for the AUA 2026 guideline (none found on Crossref); reference 5 is cited without one, as other WARWIKI pages do.
- The FDA indication, contraindications and label counseling were taken from the SSED only for the indication; the label (P220029C) and IFU were not cited on the page.
- No EAU or AUA statement was found that explicitly grades the evidence from PINNACLE beyond AUA statement 50.
