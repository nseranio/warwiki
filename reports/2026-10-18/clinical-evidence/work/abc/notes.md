# ABC notes (checked 2026-10-18)

## Sources opened
- Primary: Visco 2012 NEJM, DOI 10.1056/NEJMoa1208872, PMID 23036134. Full text read as the PMC author manuscript PMC3543828 (via NCBI efetch XML and the Figure 1-3 images); Table 1, Table 2 and footnotes read. Not the NEJM page or supplement (Supplementary Appendix not opened; point estimate and CI for the primary between-group difference are not in the main text, only P = 0.81). Authors, volume, pages and dates confirmed on PubMed and Crossref. All locators are to PMC3543828 sections/tables, not NEJM page numbers; `source.file` is null.
- Protocol: Visco 2012 Contemp Clin Trials 33(1):184-196, DOI 10.1016/j.cct.2011.09.019, PMID 22008247. Full text read, PMC3263350 (epub 2011-10-08). Used for injection technique and eligibility details.
- Adherence: Visco 2016 FPMRS 22(1):24-28, DOI 10.1097/SPV.0000000000000215, PMID 26516810, full text PMC4684726.
- Cost-effectiveness: Visco 2016 FPMRS 22(5):311-316, DOI 10.1097/SPV.0000000000000277, PMID 27564385, full text PMC5003321. Its Tables 2 and 3 were not rendered in the extraction; numbers come from the Results text (P values and costs stated there).
- Guideline: `reports/audit-v2/sources-local/aua-oab-2024-unabridged.txt` (statement 24 and its rationale, which cites ABC as ref 219). No local copy of EAU 2026 female LUTS (`eau-non-neurogenic-female-luts-2026.txt`) or NICE NG123 cites ABC (grep for Visco, NEJM page 1803), so no EAU/NICE statements are listed. No FDA statement listed (the 2013 OAB approval does not rest on ABC).
- No local PDF of ABC existed in `sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads` (searched by DOI, name and acronym).
- Not opened: nejm.org, supplementary appendix, FDA pages. No source failed to open.

## Reports considered and left out
- Hendrickson 2021 FPMRS (100 U vs 200 U toxin) and Hendrickson 2022 NAU (predicting toxin outcomes): different cohorts (ROSETTA-era), not ABC reports.
- Pearce 2015 AJOG (urinary microbiome) and Brubaker 2014 IUJ (urinary bacteria): baseline microbiome analyses in UUI cohorts that draw on ABC; not read, no outcome comparison of the two arms. Left out.
- Adherence and cost reports are included as secondary reports with a few headline numbers; the protocol is a report with no results, only delivery facts.

## Dates
`published` for the two 2016 FPMRS reports is the first of the issue month (Crossref has print month only, no online date); the 2012 NEJM report uses the PMC/PubMed epub date 2012-10-04 (NEJM print 2012-11-08).

## Disagreements and judgment calls
- Primary result `effect`: the paper reports only P = 0.81 (reductions 3.4 vs 3.3 per day), so `effect.type` is `none`; `met: false` because the trial's single prespecified test was of a between-arm difference.
- Month-12 off-treatment comparison: report prints "25% vs 38% (P = 0.61)", which looks inconsistent with a significant month-7 difference; kept as printed, flagged in the note. Likely a typographical error in the paper.
- Table 2 gives modified-ITT 126 and 121 in a footnote but the same figures are the as-treated numbers in Figure 1 (126 and 121 treated; safety population 127 and 120 by actual treatment because one toxin-assigned woman got active anticholinergic). Primary-analysis arm counts (241 total) are not split in the text. Harm denominators use the safety population (127 anticholinergic, 120 toxin) exactly as in Table 2. `design.arms.n` uses randomized counts from Figure 1 (127, 122).
- The cost paper's 9-month cost-per-month figures assume continued anticholinergic costs after oral drugs actually stopped; labeled exploratory.
- Relation to `nitti-oab` (parallel) was written without seeing that trial file (not yet present); lint reports "relation target does not exist: nitti-oab" in my scratch validation until that file is added. ROSETTA already points to ABC (builds-on), so the inverse appears automatically.
- Validation: ran `scripts/check-clinical-evidence.mjs` on a scratch copy of the repo plus these two files; the only error was the missing nitti-oab target.

## Disagreements with WARWIKI pages
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx` (ABC subsection, lines 60-69, ref 47): all numbers agree with the source (249 randomized, 241 analyzed, 5.0 baseline, 3.4 vs 3.3 P = 0.81, 13% vs 27% P = 0.003, dry mouth 46% vs 31% P = 0.02, catheter use 0% vs 5% at 2 months P = 0.01 per study criteria Table 2, UTI 13% vs 33% P < 0.001). No disagreement. The "catheter use at 2 months" figure is the per-protocol-criteria row.
- No other page cites ABC with numbers (`grep` for ABC, Visco 2012, 27% vs 13% and the other figures). `docs/06-clinical-evidence/studies/rosetta.mdx` states ABC compared a lower toxin dose with an anticholinergic: correct (100 U).

## Disagreements with the old Journal Club record
- `population`: "(≥5 episodes/day)" is wrong; entry required five or more urgency incontinence episodes per 3-day diary.
- `n: 247` is the number treated; 249 were randomized (247 treated, 241 in the primary analysis).
- "CIC (up to 9%)": 9% (10/111) is the study-criteria catheterization rate at 2 weeks only; the rate at 2 months was 5% and at 6 months 1%; self-catheterization since the previous visit was up to 15% (1 month).
- Dates, dose, 27% vs 13%, 33% vs 13% and 46% vs 31% match the source. "Similar episode reduction": 3.3 vs 3.4 per day (P = 0.81). Design label "double-blind, double-placebo" matches.
- The record's "p=0.003" refers to complete resolution; matches Table 2.

## Not verified
- Primary between-group difference with confidence interval (not in the main text; supplement not opened).
- NEJM page numbers for locators.
- Whether other guideline documents not on disk (AUGS, NICE) cite ABC.
