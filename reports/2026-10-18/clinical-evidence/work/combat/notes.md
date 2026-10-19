# CombAT notes (checked 2026-10-18)

## Sources opened

| Source | How read | Level |
|---|---|---|
| Roehrborn 2010, Eur Urol 57:123, doi 10.1016/j.eururo.2009.09.035, PMID 19825505 | PubMed E-utilities abstract (efetch). Publisher page returned 403; Unpaywall: closed; no local PDF found in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads` (filename and `mdfind` search). | abstract |
| Roehrborn 2008, J Urol 179:616, doi 10.1016/j.juro.2007.09.084, PMID 18082216 | PubMed abstract (efetch); closed access | abstract |
| Roehrborn 2011, BJU Int 107:946, doi 10.1111/j.1464-410X.2011.10124.x, PMID 21332630 | PubMed abstract; closed access | abstract |
| Montorsi 2011, BJU Int 107:1426, doi 10.1111/j.1464-410X.2011.10129.x, PMID 21348912 | PubMed abstract; closed access | abstract |
| Siami 2007, Contemp Clin Trials 28:770, doi 10.1016/j.cct.2007.07.008, PMID 17761460 | PubMed abstract (design paper; cited on the page for the two separate primary endpoints, not listed as a report because it has no results) | abstract |
| ClinicalTrials.gov NCT00090103 results (API v2, `https://clinicaltrials.gov/api/v2/studies/NCT00090103`) | Participant flow, baseline, outcome measures and analyses, adverse events, eligibility | registry results (full) |
| JALYN prescribing information, label effective 2026-03-09, DailyMed set id aab9a2d4-5328-40f3-986f-e7753a928bc0 (read through the openFDA label API, `api.fda.gov/drug/label.json`) | Sections 6.1 (adverse reactions, Table 1, cardiac failure) and 14 (CombAT clinical studies) | full section text |
| Drugs@FDA NDA 022460 via `api.fda.gov/drug/drugsfda.json` | Original approval (ORIG-1, AP) dated 2010-06-14. The accessdata.fda.gov page itself returned a 302 and was not opened. | API record |
| AUA, Management of LUTS Attributed to BPH, 2026 (`reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt`) | Statements 24 to 26, CombAT and MTOPS discussion | full text |
| EAU Non-Neurogenic Male LUTS, March 2026 (`reports/audit-v2/sources-local/eau-male-luts-2026.txt`) | Section 5.2.7.a, summary of evidence, recommendation | full text |

Crossref was used to check authors, journal, volume, issue and pages for the four journal reports (all match the citations written). `status.sourceRead` is `abstract`: the full text of none of the CombAT journal reports could be opened.

## What the numbers rest on (read this before the claim gate)

Because the papers were not readable, every number in `combat.json` comes from a registry or label source, each with a locator naming it. The abstracts were used for direction (which comparison was significant) and design. The registry and label describe the same 4-year, 4,844-man trial, but they are not the paper; the values should be rechecked against the Eur Urol and J Urol full texts if the owner can supply them.

- AUR or BPH surgery: the registry's per-arm participants with AUR (35/44/109) and with BPH-related surgery (32/40/82) sum to 67/84/191, which equals the sum of its yearly event counts (29+14+15+9; 27+22+16+19; 40+62+44+45). The totals 67 (4.2%), 84 (5.2%) and 191 (11.9%) are therefore derived. The EAU 2026 text gives an absolute risk reduction of 7.7% versus tamsulosin, which equals 11.9 minus 4.2.
- Relative risks 0.34 (0.26 to 0.45) and 0.80 (0.58 to 1.11) are labelled "Relative Risk Estimate" with a log-rank P in the registry; the paper likely reports them as hazard-based relative risks (the abstract says "relative risk"). I used `effect.type` RR.
- Clinical progression totals (203/289/347) are sums of the registry's yearly first-event counts. The registry's five-component table sums to 203/290/349, so the derived totals may differ from the paper by one or two patients.
- The label (section 14) gives the IPSS and Qmax mean differences with CIs; the registry gives the adjusted means. They agree.
- Withdrawals because of adverse reactions (6% versus 4% and 4%) are from the label and refer to adverse reactions; the registry's 211/185/210 are all-cause adverse-event dropouts. Both are listed as separate harms.
- The 4-year cutoff is not stated in what I read (registry primary completion April 2009), so `cutoff` is null. Publication dates for the Eur Urol and J Urol reports are the print-issue months from Crossref (`dateApprox`); online dates were not available.

## Reports included

1. Roehrborn 2008 J Urol (2-year IPSS primary endpoint; kind `secondary` because the 4-year clinical-outcome report is the primary report; the trial had separate primary endpoints at 2 and 4 years).
2. Roehrborn 2010 Eur Urol (primary report: 4-year AUR or BPH-related surgery).
3. Roehrborn 2011 BJU Int (post hoc baseline subgroups; informs the prostate-volume and PSA thresholds in guidelines).
4. Montorsi 2011 BJU Int (storage and voiding subscores; combination not better than dutasteride at prostate volume 58 mL or more).

## Reports considered and left out

- Siami 2007 (design paper, no outcomes; cited on the page only).
- Becher 2009 Prostate Cancer Prostatic Dis (2-year storage and voiding), Chung 2009 (2-year Asian subgroup), Chung 2012 Int J Urol (Asian versus Caucasian, long-term), Roehrborn 2012 J Urol (satisfaction), Roehrborn 2014 BJU Int (baseline variables and IPSS), Roehrborn 2011 Eur Urol (prostate biopsy rates): not opened beyond the PubMed listing; they add subgroup or secondary detail without changing the main result.
- CONDUCT (dutasteride plus tamsulosin versus watchful waiting) is a different trial and is not a CombAT report.

## Disagreements with WARWIKI pages

Only `docs/01-foundations/pharmacology/voiding-outlet/5-alpha-reductase-inhibitors.mdx` discusses CombAT (no other page contains the acronym; PARTEM and P-EASY lines in `prostate-artery-embolization.mdx` use dutasteride plus tamsulosin only as a comparator).

- Line 48 (CombAT table row): 4,844 men, IPSS 12 or more, prostate 30 mL or more, PSA 1.5 to 10 ng/mL, 4 years, no placebo arm, combination superior to tamsulosin but not significantly to dutasteride for AUR or surgery. Agrees with the abstract, registry and label. "Reduced overall clinical progression more than either alone" agrees with the abstract.
- Line 84 (cardiac failure 12/1,610 0.7%, 2/1,623 0.1%, 9/1,611 0.6%): agrees with the JALYN label section 6.1.
- Line 50 ("prostate biopsies obtained for PSA changes did not show a higher rate of high-grade cancer with combination therapy"), cited to the AUA guideline: the AUA text says this, but I could not confirm it from the CombAT biopsy paper (Roehrborn 2011 Eur Urol 59:244, abstract not opened).
- Reference 8 on that page ("Roehrborn CG, et al. Four-year CombAT results. Eur Urol. 2010.") has no title words beyond a label and no volume or pages; the DOI is correct (10.1016/j.eururo.2009.09.035). Not a numerical error.

## Disagreements with the old Journal Club record

- DOI, journal, year, authors, name and n (4,844) agree.
- Primary outcome: the record gives only the 4-year AUR or surgery endpoint. The trial also had a separate primary endpoint, change in IPSS at 2 years (Siami 2007 design paper; J Urol 2008 abstract). Not a conflict, an omission.
- Result: "greater sustained symptom improvement" is correct; "not superior to dutasteride alone for the retention/surgery endpoint" is correct (RR 0.80, 95% CI 0.58 to 1.11, P = 0.18). The record omits that combination was significantly superior to both monotherapies for clinical progression and that its IPSS advantage over dutasteride at 4 years was small (-0.96 points).
- Population "men at increased risk of progression" is the investigators' framing; the eligibility criteria are IPSS 12 or more, prostate 30 mL or more, PSA 1.5 to 10 ng/mL, Qmax above 5 and up to 15 mL/s.

## Other items to flag

- EAU 2026 (section 5.2.7.a) attributes "relative risk of AUR reduced by 68%, BPH-related surgery by 71% and symptom deterioration by 41% versus tamsulosin" and "13 patients treated for 4 years" to its reference 297 in the extracted text, but that number points to an Athanasopoulos 2003 alpha-blocker plus anticholinergic trial. The CombAT percentages could not be confirmed from CombAT sources I read and are not used on the page; the registry's yearly counts imply an absolute risk reduction of 7.7% (NNT about 13), which matches the EAU text.
- The AUA 2026 guideline text says CombAT "did not show clinically important differences in symptoms or quality of life between combination therapy and dutasteride alone"; the page attributes this to the AUA review.
- The FDA approval date (June 14, 2010) comes from the openFDA Drugs@FDA record; confirm on the accessdata page if the claim gate requires fda.gov HTML.
