# TOPSY notes

## Sources opened

| Report | Identifier | Source | Level |
|---|---|---|---|
| Primary, 18 months: Hagen S, et al. EClinicalMedicine 2023;66:102326 | DOI 10.1016/j.eclinm.2023.102326; PMID 38078194; PMC10701109 | Europe PMC full-text XML (read online; `source.file` null). Text, Tables 1 to 7 and figure captions read; figures (CONSORT, forest plots) are images and were not read. No page numbers in the XML, so locators cite tables and Results subsections. Crossref and PubMed checked for authors (23), volume, article number and electronic date (2023-11-23). | full text |
| 4-year follow-up: Bugge C, et al. BJOG 2025;132(12):1762-1771 | DOI 10.1111/1471-0528.18333; PMID 40832737; PMC12501713 | PMC BioC full text (CC BY). Text and Tables 1 to 4 read; supporting-information tables and figures (A to G) not available. Crossref: online 2025-08-20, issue 12, pages 1762-1771. | full text |
| HTA monograph (abstract only, see below) | DOI 10.3310/NWTB5403; PMID 38767959 | PubMed abstract | abstract |
| Cost-effectiveness model paper (abstract only, see below) | DOI 10.1016/j.jval.2024.03.004; PMID 38492924 | PubMed abstract | abstract |

Local copies were searched first (`reports/audit-v2/sources-local` text files, `/Users/joyboy/Documents/Medicine`, `/Users/joyboy/Downloads`): no TOPSY full text on disk. Guideline copies checked for TOPSY or pessary self-management: NICE NG123 text, ACOG PB 214 (interim update) text, AWMF descensus genitalis text, AUGS best-practice statement, and the AUGS-SUNA 2023 pessary consensus statement PDF (`/Users/joyboy/Documents/Medicine/Urology/URPS/AUGS/vaginal_pessary_use_and_management_for_pelvic.2.pdf`).

## Reports considered and left out

- HTA monograph (Bugge C, et al. Health Technol Assess 2024;28(23):1-121, DOI 10.3310/NWTB5403, PMID 38767959): the full report with the process evaluation; only the abstract was read, and its trial numbers repeat the EClinicalMedicine report. It gives the probability of cost-effectiveness as 80.81% and 32 serious adverse events (17 and 14 in the abstract; the journal abstract says 31). Left out as an unread full text.
- Manoukian S, et al. Value Health 2024;27(7):889-896 (DOI 10.1016/j.jval.2024.03.004, PMID 38492924): abstract only. Adds a decision-analytic extension to 5 years (incremental net benefit £4221, probability of cost-effectiveness 69.7%). Left out as an economic modeling secondary read at abstract level.
- Process evaluation (BMC Med 2025, PMID 41350999), protocol (Trials 2020, PMC7542756; DOI 10.1186/s13063-020-04738-9), intervention development (Trials 2022, PMID 36064727), willingness-to-self-manage survey (Int Urogynecol J 2024, PMID 38953998) and the BMJ 2024 editorial summary (PMID 38663924): no outcome data a surgeon needs beyond the two included reports; not opened.

## Guidelines and approvals section omitted

No guideline text I could read cites TOPSY or rests on it. The AUGS-SUNA 2023 consensus statement (published before TOPSY) and NICE NG123 (2019) discuss self-managing pessary users but predate the trial. The TOPSY authors state that the UK Clinical Guideline for best practice in vaginal pessary use (2021) recommends offering self-management to willing and suitable women; I did not read that guideline (BJOG reference list shows a newer entry, PMID 42324994, also not opened). No FDA action applies (pessaries are an existing device class; no clearance statement tied to the trial was sought).

## Disagreements with WARWIKI pages

Pages that cite TOPSY: `docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/prolapse-pessaries.mdx` (line 83, refs 10 and 20) and `docs/04-surgical-techniques/04g-prolapse-repair/prolapse-repair-principles.mdx` (line 23, refs 18 and 22). Other grep hits for "topsy" (autopsy) are unrelated.

No number on either page disagrees with the sources. Points to be aware of:

1. `prolapse-repair-principles.mdx` line 23: "the adjusted clinic-care minus self-management difference in this measure was 3.01 percentage points (95% CI −0.58 to 6.61)" at 4 years. The BJOG text gives "AMD 3.01" and labels adjusted differences SM minus CBC elsewhere (Table 1) but reports a positive value with the lower rate in the SM group (17.91% versus 21.97%, Table 2); the sign convention for this outcome is therefore the page's reading (and mine), not stated in the paper. The 18-month figure is stated as SM minus CBC (−3.83). Also called "percentage points": the unit is the difference in mean percentage of applicable complication types.
2. `prolapse-pessaries.mdx` line 83: "17.9% for self-management versus 22.0% for clinic-based care in the results table" matches Table 2 (17.91 and 21.97). The BJOG abstract prints 17.7% for self-management; the page's note about the table is correct. The page's statement that "many clinic-care participants also removed their devices themselves" is a loose paraphrase: the paper says 55 clinic-care women reported removing their pessary at 18 months (27 of them had received self-management training) and that nearly 40% of clinic-care women inserted the pessary themselves at least once.
3. `prolapse-pessaries.mdx` line 83: the 18-month QoL statement and the 16.7% (142) versus 22.0% (152) complication figures match Table 3; the 4-year statements match the BJOG text. No disagreement.

There is no old Journal Club record for TOPSY.

## Discrepancies inside the sources

- EClinicalMedicine abstract: 31 serious adverse events (17 SM, 14 CBC). HTA abstract: 32 (17 and 14). The text gives 17/169 and 14/171 (31 total). The file uses 17/169 and 14/171.
- EClinicalMedicine Results: "Sixteen (9.4%) and 26 (15.2%) participants ... discontinued pessary use". 16/169 is 9.5%; the file gives the n/N only.
- EClinicalMedicine Discussion says 91.5% and 86.2% intended to continue after 18 months; Results give 130/138 (94.2%) and 131/148 (88.5%). The file uses the Results values.
- BJOG abstract: complication percentage "SM 17.7%"; text and Table 2: 17.91%. File uses 17.91%. The abstract also writes "AMD 3.01" without a stated sign.
- EClinicalMedicine Table 4 lists the PISQ-IR adjusted mean difference as 0.34 (−7.19 to 9.87) for means of 2.9 and 2.8 on a 1 to 5 scale, which cannot be right; omitted from the file. Table 3 as printed in the main-text rendering garbled the "difficulty removing pessary" clinic-care cell; the supplementary-table copy (12/149, 8.1%) was used.
- PFIQ-7 4-year equivalence test p = 0.0108 is reported with t(184) = 2.317 as testing a 20-point difference; the report does not say whether it was prespecified, so it is recorded as `exploratory`.

## Not verified or limited

- Forest plots and the CONSORT figure (images) were not read; Fig. 2 sensitivity analysis values are therefore not in the file beyond the text.
- 4-year supplementary tables (responder versus non-responder comparisons, EQ-5D, resource use) not accessible.
- The 4-year primary-outcome status of the economic endpoint: the abstract lists both PFIQ-7 and incremental net benefit as primary; `met` for the economic result uses the paper's criterion (positive net benefit), and the confidence intervals are not given for the 4-year value (standard error only).
- Verdict `mixed`: the clinical primary endpoint did not show superiority, the economic primary endpoint was positive by its stated criterion (95% CI crossing zero at 18 months).
- `relations` left empty: no other site trial has a direct connection beyond sharing the pessary lane (PESSRI compares device types).
