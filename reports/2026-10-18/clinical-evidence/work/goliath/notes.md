# GOLIATH notes

## Limit on sources (read this first)

None of the three GOLIATH reports could be opened as full text. They are not open access (Unpaywall: closed), no copy is in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`, and europeanurology.com, sciencedirect.com and auajournals.org returned HTTP 403 (Cloudflare challenge; not bypassed). The Chrome extension did not respond. Every report therefore has `source.level: abstract`, `source.file: null`, and `status.sourceRead: abstract`. Numbers that are not in an abstract come from the sources below, and each locator says which. All three reports have PubMed abstracts that I read in full (efetch XML).

If the owner can supply the three PDFs (Eur Urol 2014;65:931 Tables 2-4; J Urol 2015;193:570; Eur Urol 2016;69:94), the 6-month IPSS/Qmax difference and confidence interval, the 12-month Qmax and complication data, and the adverse-event tables should be replaced with the papers' own values (the registry and conference numbers below may differ in rounding or analysis population).

## Sources opened

| Source | How read | Used for |
|---|---|---|
| Bachmann 2014, Eur Urol 65:931, doi 10.1016/j.eururo.2013.10.040, PMID 24331152 | PubMed abstract (efetch) + Crossref metadata | primary report: design, noninferiority conclusions, p<0.001 recovery, early reintervention p=0.025 |
| Bachmann 2015, J Urol 193:570, doi 10.1016/j.juro.2014.09.001, PMID 25219699 | PubMed abstract + Crossref | 291/281/269 flow, 12-month noninferiority, 84.6% vs 80.5%, 4 vs 4 incontinence |
| Thomas 2016, Eur Urol 69:94, doi 10.1016/j.eururo.2015.07.054, PMID 26283011 | PubMed abstract + Crossref | margin 3, 136/133 treated, 83.6% vs 78.9%, sustained noninferiority, OABq statement |
| ClinicalTrials.gov NCT01218672 (API v2 JSON, posted results 2020-09-03) | full record | eligibility, participant flow (139/142 randomized), 6-month IPSS/Qmax/complication-free means, 24-month IPSS/OABq/IIEF-5, retreatment by interval, adverse events (mean follow-up 23.3 months), sponsor |
| AUA BPH guideline 2026 (local `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt`, printed p34-35) | local text | statement 39 and strength; 24-month IPSS 6.9 vs 5.9 (MD 1.0, CI -0.5 to 2.5) and Qmax 21.6 vs 22.9 (MD -1.3, CI -4.0 to 1.4) |
| EAU Non-neurogenic male LUTS 2026 (local `eau-male-luts-2026.txt`, section 5.3.3.b) | local text | recommendation (Strong), LE 1b statement, citation of Thomas 2016 as the only 180 W RCT vs TURP |
| Elhilali MM, Elkoushy MA. Transl Androl Urol 2016;5(3):388-392, doi 10.21037/tau.2016.03.09 (PMC4893504) | open full text (editorial) | TURP arm 58.6% monopolar / 41.4% bipolar; 10 vs 3 reoperations after month 6; half of prostates under 48 mL |
| Urology Times, Aug 21 2014 (Binder), EAU congress report | web page | 12-month IPSS 7.0 vs 5.7 (MD 1.3, 95% CI 0.1-2.7), Qmax 23.0 vs 24.7, p=0.415, 130/127 with 1-year functional data |
| American Medical Systems infographic GL-01410 (March 2015), manufacturer | PDF from bostonscientific.com | 6-month medians (catheterization 22.0 vs 46.7 h, stable health 26.0 vs 52.8 h, stay 49.3 vs 78.2 h); 12-month means; blinded adjudication of adverse events |
| EMJ Urology Supplement Oct 2016 (sponsored), Chughtai review PMC5730738, Ajib CUAJ 2018 | read, not used for values | cross-checks only (see below) |

## Reports considered and left out

- Kaplan S. "Re:" letter, J Urol 2015;194:480 (doi 10.1016/j.juro.2015.04.046): a commentary on the 6-month report, not a trial report.
- UK subanalysis of GOLIATH (shown in the sponsored EMJ supplement): not a stand-alone publication that I opened.
- No other GOLIATH publication (health economics, quality of life) was found in PubMed or Europe PMC under the GOLIATH search.

## Values to treat with care

- 6-month IPSS, Qmax and complication-free values are the registry's primary and secondary outcome results; the paper's own table (and the paper's confidence interval for the 6-month IPSS difference) was not read. The registry's 24-month IPSS (6.9 vs 5.9) matches the AUA text, which supports the registry's data.
- Registry "freedom from complications" (87.3% vs 83.3% at 180 days) is plausibly the paper's 6-month figure but is not stated in the abstract. Registry complication definition is quoted as the registry gives it.
- Registry adverse events are participant counts for serious and other events over mean 23.3 months; categories are not defined further and serious/other are not additive.
- Retreatment totals (14 vs 10) are my sums of the registry's three interval counts; the registry does not say whether a patient can appear in more than one interval.
- 12-month IPSS and Qmax come from a conference report and a manufacturer infographic, which agree with each other (7.0 vs 5.7; 23.0 vs 24.7) but are not the J Urol table.
- Recovery medians come only from the manufacturer infographic; the abstract confirms direction and p<0.001. The registry gives a different length-of-stay measure (mean 65.5 vs 97.8 h, recovery-room entry to discharge).
- The early-reintervention percentages (9.8% after TURP vs 2.9% after laser within 30 days) appear in a sponsored supplement only; I left the percentages out and kept the abstract's "three times higher, p=0.025".
- 12-month "adverse events requiring surgical or invasive intervention 12.4% vs 15.0%" (Urology Times) is left out.
- Enrollment dates conflict between sources: Urology Times says April to September 2011; the infographic says April 2011 to September 2012; the registry gives start April 2011 and primary completion October 2014. The page says only "from April 2011".
- Chughtai et al. (PMC5730738) state that 47.8% (laser) and 53.4% (TURP) of patients were free of treatment-related adverse events in the 6-month report. That conflicts with the registry's 87.3% and 83.3% complication-free values and may be a different definition (any adverse event versus the complication definition); not used and not resolved. This is the first number to check once the 2014 paper is available.
- I did not report the monopolar/bipolar split or the incidental cancer yield from the trial report; the split comes from the editorial.

## WARWIKI pages that cite GOLIATH

Only `docs/04-surgical-techniques/04m-bph-male-luts/greenlight-pvp.mdx` (lines 10, 53, 61-68, 113, 180, 193, 204, 210, refs 12-14). Compared with the sources above, no sentence disagrees:

- "randomized 281 men ... 29 centers in 9 European countries", "not blinded" and the anticoagulant/antiplatelet exclusion (3 to 5 days, low-dose aspirin allowed) match the abstracts and the registry eligibility text.
- 12-month "prostate volume, PSA and PVR ... did not differ" and 24-month complication-free 83.6% vs 78.9% match the abstracts; early reintervention three times higher after TURP (p=0.025) matches the 6-month abstract.
- Line 53/204 (prostates up to 100 g) matches the registry (100 g or less by TRUS).
- The page's AUA 2026 and EAU 2026 statements match the local guideline texts.
- The page states the EAU recommendation range as 30 to 80 mL for the 180 W laser; same as the EAU text.

Possible additions, not discrepancies: the page does not mention the second-year reoperation trend (10 laser vs 3 TURP reoperations after month 6, per the editorial), and its line 113 reoperation discussion cites the 120 W HPS trial and registries but not GOLIATH's own retreatment counts (registry: 14/136 vs 10/133 through 24 months).

## Not verifiable

- 6-month paper's own mean difference, confidence interval, Qmax test and complication numerators.
- Age limit, prostate-volume and exclusion rules are registry text; the paper's eligibility table was not read (EMJ separately lists exclusion of patients over 80, which conflicts with the registry age range of 40 to 80 only if the paper says otherwise; I used the registry's 40 to 80).
- FDA clearance for the XPS system was not added: no FDA document I opened ties it to GOLIATH.
