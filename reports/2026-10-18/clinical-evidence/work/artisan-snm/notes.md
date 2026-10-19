# ARTISAN-SNM notes (2026-10-18)

## Sources opened

| Source | Identifier | Where read | Level |
|---|---|---|---|
| McCrery 2020, J Urol 203(1):185-192 (primary, 6 months) | DOI 10.1097/JU.0000000000000458, PMID 31347955 | PubMed abstract (eutils XML) plus Crossref metadata; publisher page auajournals.org returned 403, Unpaywall shows closed access, no repository copy found (Erasmus, Corewell, Maastricht pages list only the DOI link) | abstract only |
| Benson 2020, Neurourol Urodyn 39(5):1482-1488 (1 year) | DOI 10.1002/nau.24376, PMID 32339339, PMC7384085 | Europe PMC full text | full text |
| Geynisman-Tan 2021, Neurourol Urodyn 40(1):549-554 (satisfaction) | DOI 10.1002/nau.24596, PMID 33326643 | PubMed abstract (not open access) | abstract |
| Pezzella 2021, Neurourol Urodyn 40(2):714-721 (2 years) | DOI 10.1002/nau.24615, PMID 33508155, PMC7986436 | Europe PMC full text | full text |
| FDA Summary of Safety and Effectiveness Data, PMA P180046 (approved 2019-11-13) | https://www.accessdata.fda.gov/cdrh_docs/pdf18/P180046B.pdf | downloaded, pdftotext | full text |
| ClinicalTrials.gov NCT03327948 | API v2 record | eligibility, primary outcome time frame, sponsor | registry |

Authors, volume, issue, pages and dates for all four papers were checked against Crossref and PubMed (the first online date for the primary report is 2019-07-26 per PubMed; Crossref issue date is 2020-01). The status field says `abstract` because the primary report was not read in full. No local copy exists in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or Downloads (only an Axonics MRI guideline PDF).

How the primary report's numbers were filled in: the abstract supplies n=129, 90% responders, 5.6 to 1.3 episodes per day, the 34-point ICIQ-OABqol gain and "no serious device related adverse events". The FDA SSED analyzes the same 6-month data (data lock 2019-01-18) and supplies the prespecified test (one-sided binomial against 50%, null rejected, 116/129 = 89.9%, 95% CI 83.4% to 94.5%), the SD-based table, enrollment (153 enrolled, 129 implanted; 15 US sites with 97 implanted, 5 Western European sites with 32), and the device- and procedure-related adverse-event tables. Those SSED-derived values sit in `note`, `locator` and two delivery/harm rows that name the SSED as the locator; the claim gate binds them to the primary DOI, so a reviewer holding the full J Urol text should confirm them. `met: true` for the primary result rests on the SSED statement, not on the abstract.

## Reports considered and left out

- RELAX-OAB (Bluewind/Axonics European study, 3-month, 12-month and 2-year reports; PMIDs 29315785, 30592526, 32243625): a different study of the same device, not a report of this trial.
- Expert Rev Med Devices 2021 review (PMID 34187274) and the NICE medtech guidance: reviews, not trial reports.
- No 3-, 4- or 5-year ARTISAN-SNM report exists in PubMed or on a web search (searched 2026-10-18).
- Fecal incontinence sub-outcomes (CCF-FIS 9.3 to 3.9 at 1 year, 3.7 at 2 years in 42 patients; satisfaction among self-identified patients) are in the 1- and 2-year papers but not in the file or page; add them if a bowel cross-reference is wanted.

## Design choices

- `design.n` = 129 implanted (registry "actual enrollment" is also 129; the FDA review says 153 enrolled). Reason for the 24 not implanted is not given in anything read.
- The registry lists the primary outcome with a 2-year time frame, while the PMA and the first publication treat the 6-month as-treated responder rate as primary. The page states both; the file uses the 6-month rate as the primary result.
- Follow-up reports (1 and 2 years) list the responder rate as `descriptive` because neither reports a hypothesis test; the 1-year paper calls it the primary efficacy outcome. The 2-year paper names the completers analysis as its primary method (93%, 113/121; the count 113 comes from Figure 3B). The 82% and 37% figures there are percentages of the 113 responders, not of all implanted patients.
- Arm key is `single` (role `single`).
- One relation only: `builds-on` insite (the 1-year paper explicitly contrasts its responder analysis, lead-migration and site-pain rates with InSite). The ROSETTA comparison appears only in the page prose.
- No guideline statements: none of the local AUA OAB 2024, AUA/SUFU NLUTD 2021, EAU non-neurogenic female LUTS 2026, EAU neuro-urology 2026 or NICE NG123 copies cites ARTISAN-SNM or Axonics outcomes, so the guideline bullet is omitted; only the FDA approval (SSED p1, "Date of FDA Notice of Approval: November 13, 2019") is listed. Suggest an events.json entry (kind regulatory, body FDA, date 2019-11-13, decision oab-third-line, trial artisan-snm, url the accessdata.fda.gov PMA page https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P180046, which refused automated fetches, or the SSED PDF used here).

## Disagreements with WARWIKI pages

Pages searched: `grep -rln ARTISAN docs`. Only the following discuss the trial.

1. `docs/01-foundations/tools/biomaterials/neuromodulation-devices/axonics-snm.mdx`, line 12: "Early European experience (RELAX-OAB) preceded the US pivotal study (ARTISAN-SNM)". ARTISAN-SNM was not US-only: 32 of the 129 implanted patients were at five Western European sites (FDA SSED p33). Minor wording.
2. Same page, table row "One year": "all participants able to recharge their device". The 1-year paper reports 100% of the 124 patients available at the visit (PMC7384085, Results, Recharging experience; Figure 5B), not all 129.
3. All other ARTISAN numbers on that page match the sources: 129 participants, 98% women, nine prior-trial patients, about 90% / 89% / 93% of 121 completers / 88% of 129, 5.6 to 1.3 / 1.4 / 1.0, 34-point gain, 94% and 96% acceptability, 82% and 37% of 113 responders, 14 surgical interventions in 11 patients, 68.5% / 25.8% / 2.4% satisfaction, 9 of 14 late responders, 4.4-year historical battery life, sponsor statement.
4. `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx` (ref 16 cited for the 4.4-year historical battery life) and `docs/07-roots/surgeons/h-r/kimberly-kenton.mdx` (68.5% of 124 very satisfied): both agree with the sources. No other page in `docs` names ARTISAN (the Pezzella hits in the botulinum pages are a different 2025 paper).

## Disagreements with the old Journal Club record

- `authors: 'Pezzella / McCrery'`: the primary 6-month report is McCrery R, Lane F, Benson K, et al.; Pezzella is first author of the 2-year report.
- `design: 'Prospective multicenter trial'`: it is a single-arm, unblinded pivotal (IDE) study; FDA reports 153 enrolled and 129 implanted, with 20 sites (15 US, 5 Western European).
- `n: 129`: matches the implanted population only.
- `result` (90% responders, 5.6 to 1.3, 34-point gain, no serious device-related events) matches the abstract. The "clinically meaningful 34-point" wording and the "bottomLine" battery comparison ("~15 years rather than ~4-5") rest on the abstract's 4.4-year historical figure and the manufacturer's at-least-15-year design life; neither is a measured result of the trial, and the page labels the 15 years as the manufacturer's rating.

## Could not verify

- Full text of the primary J Urol report (paywalled, 403 from auajournals.org, no repository copy): Methods detail (surgeon experience, exact sample-size rationale, per-site recruitment, antibiotic protocol), Table of baseline characteristics (Table S1 of the 1-year paper is a supplement), and every primary-report number beyond the abstract and the SSED.
- Full text of the satisfaction secondary analysis (abstract only).
- Reason that 24 of 153 enrolled patients were not implanted.
- FDA PMA database page (pma.cfm?id=P180046) returned a wait page to automated requests; the approval date and indication were taken from the SSED PDF.
