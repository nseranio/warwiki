# Notes: scandinavian-urethroplasty

## Sources opened

| Source | Identifier | Path or URL | Level |
|---|---|---|---|
| Primary report, Nilsen 2022, Eur Urol 81(4):375-382 | DOI 10.1016/j.eururo.2021.12.017; PMID 35012771 | /Users/joyboy/Zotero/storage/59XR6BDR/Nilsen et al. - 2022 - To Transect or Not Transect Results from the Scandinavian Urethroplasty Study, A Multicentre Random.pdf (8 pages; journal page = PDF page + 374). Tables 4 and 5 checked visually (signs and risk-difference directions). | full text |
| Clinical trial update, Holm 2026, Eur Urol Focus 12(3):316-318 | DOI 10.1016/j.euf.2026.05.007; PMID 42168014 | /Users/joyboy/Downloads/Revised-Sources-2026-10-11/10-Holm-Scandinavian-Urethroplasty-2026.pdf (byte-identical to the copy in Requested-Sources-2026-10-11; 3 pages) | full text |
| Registry record | NCT02321670 | https://clinicaltrials.gov/api/v2/studies/NCT02321670 (registered primary outcomes: IIEF-5 change and penile complications by study questionnaire, up to one year; secondary: failure and complications; enrollment 151 actual) | registry |
| DOI/PMID metadata | both DOIs | Crossref (authors, volume, issue, pages, year) and PubMed esummary/efetch (PMIDs 35012771, 42168014; primary e-published 2022-01-08) | metadata |
| AUA Urethral Stricture Disease guideline (2016, amended 2023) | n/a | /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-urethral-stricture-2023-unabridged.txt (statement 7; the discussion paragraph after it cites reference 106 = Nilsen 2022) | local copy |
| EAU Urethral Strictures guidelines, 2026 limited update | n/a | /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/eau-urethral-strictures-2026.txt (section 6.3.2.b.1.b, evidence summary and recommendations following 6.3.2.c; reference 332 = Nilsen 2022) | local copy |

No source could not be opened. The supplementary material of the primary report (PCQ wording, study schedule figure and the operative video) was not read; only the in-text description of the PCQ and Figure 1 caption were used.

## Reports considered and left out

- Riechardt S. Editorial, Eur Urol 2022;81:383-384 (doi 10.1016/j.eururo.2022.01.010), a comment on the trial; not opened and not a trial report.
- Ortac M. Letter, Eur Urol 2022;82(2):e50 (doi 10.1016/j.eururo.2022.03.035); not opened, correspondence.
- J Urol 2022;208(2):466-468 (doi 10.1097/JU.0000000000002771), a commentary linked in PubMed; not opened.
- No other secondary or post-hoc analysis of the trial was found in PubMed (search "Scandinavian urethroplasty study" returned only the primary report, the Holm update and the Ortac letter).
- VeSpAR (randomized tEPA versus vessel-sparing EPA) is a separate trial, not a report of this one, and has no trial id on the site list, so no relation was added.

## Judgment calls

- Arm roles: the paper does not label an experimental arm. BMG (non-transecting) is coded `exp` and tEPA `ctl` because tEPA is described as the traditional standard. The published risk differences are tEPA minus BMG; they are kept in the published direction and the `measure` text says so (percentage points = published proportion x 100).
- Primary endpoint 1 was prespecified as an odds ratio; the report gives risk differences and chi-square p values only, so effect type `difference` is used and the odds ratio is not invented. `met: true` rests on the unadjusted p = 0.02 against the trial's null hypothesis of no difference; `met: false` for IIEF-5 (p = 0.14 at 12 months).
- Verdict `mixed`: one primary endpoint favored BMG, the other did not differ, and the trial reached half its planned enrollment.
- The 2026 Holm report restates the 12-month data despite its title ("Long-term outcomes"); it is recorded as kind `secondary` (clinical trial update), not `updated`, because it has no later cutoff. Its own Discussion says long-term follow-up (minimum 6 years) will be invited "soon".
- 12-month and 3-month PCQ denominators are not printed in the primary report (only n and percentages), so the file keeps the printed "n (%)" strings. Percentages are consistent with about 70 tEPA and 74 BMG responders at 12 months (144 total) but those splits were not stated and are not used.
- Operative time, graft size, graft harvest site, surgeon numbers and experience were not reported in the main text, and are omitted.

## Disagreements between the two reports

1. Wound infection: primary Table 7 and text report 3/75 (4.0%) wound infections in the tEPA arm at catheter removal (grade II in two, IIIa in one). Holm 2026 section 3.2 says "None of the patients developed a wound infection." The page and file follow the primary report.
2. Recurrence percentages: primary report 9 (12.0%) tEPA and 10 (13.2%) BMG (19/147 = 12.9% overall; data on 147 patients). Holm 2026 gives 12.2% and 13.0% (12.9% overall) with no denominators. These match 9/74 and 10/77 (patients operated as assigned), which is arithmetic by the reviewer, not stated in either paper.
3. Changed erection direction at 12 months, tEPA: primary Table 4 "4 (5.7)"; Holm Table 1 "5 (5.7)". The primary report is used (4/70 = 5.7%; 5/70 would be 7.1%).
4. The primary report's Table 3 and text give median stricture length 10 mm; Holm 2026 says "10 mm (7-15 mm)" overall. Consistent.

## Disagreements and checks on other WARWIKI pages (no pages edited)

- `docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/excision-primary-anastomosis.mdx`: "Recurrence ... was 12.9% overall at 12 months: 12.2% after transecting EPA (74 operated) versus 13.0% after BMG (77 operated)" cited to the primary report as well as Holm. The primary report gives 12.0% (9 of 75) and 13.2% (10 of 76) by randomized group, with 147 patients contributing recurrence data; the 12.2%/13.0% figures come from Holm 2026, which does not state "74 operated" and "77 operated" as denominators (the 74 and 77 are the operated-as-assigned counts in the primary report). The same sentence appears in `non-transecting-bulbar.mdx` (bullet on the Scandinavian study, cited to both reports) and `jordan-vessel-sparing-epa.mdx` ("12.2% after tEPA (74 operated) and 13.0% after BMG (77 operated)"). Locators: primary PDF p4 section 3.3; Holm PDF p2 section 3.2.
- Same page: "reduced glans stiffness ... 13/70 (19%) after transecting EPA versus 5/74 (6.8%) after BMG, and perceived erect penile shortening by 18/70 (26%) versus 4/74 (5.4%)". The percentages match primary Table 4 (PDF p4), but the 70 and 74 denominators are not printed in either report (inferred from the 144 completers and the percentages).
- Same page: "Postoperative scrotal/perineal hematoma ... 18/75 (24%) ... 3/76 (3.9%)": matches primary Table 7 (PDF p5). "median stricture length was 1 cm in each arm": matches Table 3 (10 mm in each arm).
- `male-urethroplasty-incisions-approaches.mdx`: "shortening in 26% versus 5.4% and reduced glans stiffness in 19% versus 6.8% at 12 months; recurrence requiring retreatment was 12.2% versus 13.0%": matches Holm Table 1 and section 3.2 (the primary report's recurrence figures are 12.0% and 13.2%).
- `urethral-stricture.mdx` ("transecting EPA produced more patient-reported penile complaints ... particularly shortening and reduced glans filling"; IIEF-5 did not differ), `urethral-reconstruction-principles.mdx` (151 patients, 75/76, p = 0.02, 12.9% overall recurrence), `female/primary-end-to-end-female.mdx` (glans filling p = 0.03, shortening p = 0.001, 12.9%) and `ntaau.mdx`, `joshi-step-msanta.mdx` (citation only): consistent with the source.
- `ntaau.mdx` describes the population as "unreconstructed bulbar strictures"; the trial excluded previous open urethroplasty (Table 1) and did not state "unreconstructed". Minor wording.
- No page states the trial's co-primary endpoints, the planned sample of 300 or the early stop; `urethral-reconstruction-principles.mdx` states recurrence "was 12.9% at 12 months" (recurrence data were available for 147 patients, 19 events).

## Disagreements with the old Journal Club record

- "Primary outcome: Stricture recurrence": wrong. The primary endpoints were penile complications (PCQ) and IIEF-5 change; recurrence was a secondary endpoint (primary PDF p2 section 2; registry).
- "Recurrence was similar (~12.9%)": 12.9% is the overall figure (19/147); by arm 12.0% and 13.2% (primary) or 12.2% and 13.0% (Holm 2026).
- "EPA caused significantly more penile complications - reduced glans filling and perceived penile shortening": correct for 12 months (glans filling p = 0.03, shortening p = 0.001); the old record omits that IIEF-5 did not differ (12 months p = 0.14), that the PCQ is not validated, that enrollment stopped at 151 of 300 planned, and the 3-month ejaculation and direction differences that were gone by 12 months.
- "BMG (non-transecting) is a less morbid alternative": not a conclusion of the trial. The authors recommend avoiding transection of the corpus spongiosum if possible and informing patients. BMG had less perineal hematoma (3.9% versus 24%) but 34% reported in-hospital oral discomfort after harvest.
- Population: "Men with short (<=2 cm) bulbar strictures" omits the age range (18-70) and the exclusion of previous open urethroplasty.
- n = 151, journal, year, authors (Nilsen et al.) and DOI are correct.

## Could not verify

- Whether the trial's 3- and 12-month PCQ denominators were 69/70 and 71/74 (not printed).
- Direction of the IIEF-5, maximum-flow and residual-volume mean differences (Tables 5 and 6 print an unsigned or ambiguously signed difference); the file records the arm means and states the direction is not given.
- The wording of the PCQ questions beyond the in-text paraphrase (supplementary material not opened).
- The EAU guideline's month of publication (the copy gives only 2026, "presented at the EAU Annual Congress London 2026"); cited as 2026 limited update with the section number.
- The AUA discussion paragraph is unnumbered text under statement 7; whether it is the only AUA text citing the trial was checked only by searching the guideline copy for "Nilsen", "Scandinavian" and reference 106.
