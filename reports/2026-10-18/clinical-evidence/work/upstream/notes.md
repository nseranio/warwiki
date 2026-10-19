# UPSTREAM: notes

Files: `upstream.json` (5 reports, 25 results, 7 harms, 11 delivery facts), `upstream.mdx` (7 references). The JSON validates with `scripts/check-clinical-evidence.mjs` run against a scratch copy of the repo containing both files (53 trial families, no errors). Percentages recounted against numerators and denominators; every reference marker resolves and is numbered in order of first use.

## Lead correction

The lead names "Lewis AL, Young GJ ... Eur Urol 2020". The peer-reviewed primary report is Drake MJ, Lewis AL, Young GJ, et al., Eur Urol 2020;78(5):701-710 (the WARWIKI pages already cite it that way). Lewis AL, Young GJ, Selman LE, et al. is the full NIHR HTA monograph (HTA 2020;24(42)), filed as a `secondary` report. The only Lewis/Young Eur Urol Focus paper found is the 2019 baseline report (left out below).

## Sources opened

| Report | Identifier | What I read | Where |
|---|---|---|---|
| Drake 2020 (primary) | doi 10.1016/j.eururo.2020.06.004, PMID 32616406 | Abstract only (Europe PMC record). Publisher page returns 403; not in PMC. | https://europepmc.org (REST search record) |
| Lewis 2020 HTA | doi 10.3310/hta24420, PMID 32902375 | Full text, 154-page PDF (methods, results, economics, discussion, appendices) | https://njl-admin.nihr.ac.uk/document/download/2033831, saved at `/private/tmp/claude-501/up/hta2020.pdf` (scratch; copy it if the path is to be kept). Locators are PDF page numbers (not printed page numbers; printed page = PDF page minus 30 in the body). |
| Young 2022 | doi 10.1016/j.euf.2021.11.010, PMID 34922898, PMC9705260 | Full text (PMC, CC BY-NC-ND) | https://pmc.ncbi.nlm.nih.gov/articles/PMC9705260/ ; locators are section/table names |
| Clout 2025 EUF | doi 10.1016/j.euf.2025.02.004, PMID 40082152 | Abstract only (Europe PMC); Elsevier full text not open | |
| Clout 2025 HTA | doi 10.3310/slpt4675, PMID 40619891, PMC12278039 | Abstract only. PMC efetch withholds the body at the publisher's request; journalslibrary.nihr.ac.uk returns 403; NCBI Bookshelf and Europe PMC books show a reCAPTCHA page (not bypassed). | |
| AUA BPH guideline 2026 | local `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt` | Statement 4 (p2) and supporting text (pp15-16) | |
| EAU Male LUTS 2026 | local `reports/audit-v2/sources-local/eau-male-luts-2026.txt` | Section 4.12.1 (summary of evidence, recommendations, text citing UPSTREAM [111], [114]) | |

Bibliographic details (authors, volume, issue, pages, dates) checked against Crossref and Europe PMC for all five reports.

## `status` and source levels

`status.sourceRead` is `abstract` because the primary Eur Urol report was read at abstract level; every number in the primary report's `results` also appears, identically, in the HTA full text (Tables 9, 11 and 15). The takeaway rests only on abstract-stated facts (margin 1 point, IPSS difference and interval, 38% versus 36%). `met` for the two primary-report endpoints is set from statements in the abstract (noninferiority shown; surgery not reduced). The two 5-year endpoints have `met: null` because the abstract states neither a 5-year margin nor a conclusion.

## Reports considered and left out

- Lewis AL, et al. Eur Urol Focus 2019;5:340-350 (baseline results and diagnostic findings): baseline data only; baseline numbers are taken from the HTA tables instead. Not opened.
- Bailey K, et al. Trials 2015 (protocol) and Young GJ, et al. Trials 2017 (statistical analysis plan): methods are covered by the HTA text. Not opened.
- Selman LE, et al. Neurourol Urodyn 2021 (qualitative decision-making): the HTA gives the qualitative summary. Not opened.
- Quality-control and bladder-diary papers (Aiello et al. 2020 and others): not opened.

## Disagreements with WARWIKI pages (no pages edited)

Pages that discuss the trial: `docs/02-evaluation/ancillary-tests/urodynamics.mdx`, `docs/03-clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction.mdx`, `docs/07-roots/surgeons/a-g/marcus-drake.mdx`. No old Journal Club record exists.

1. `urodynamics.mdx` line 349 (table row "UPSTREAM five-year follow-up (2025)"): "**Five-year non-inferiority was not established** because of uncertainty around the symptom estimate." The EUF 2025 and HTA 2025 abstracts report the IPSS difference 0.41 (95% CI -1.10 to 1.93) and no difference in surgery (OR 0.96, 0.71-1.28) but state no 5-year noninferiority conclusion or margin. The upper limit does exceed the 18-month margin of 1 point, so the statement is arithmetically plausible but unverified; needs the full text (locator: abstracts only).
2. Same row: "Questionnaires were returned by only about half of each arm; routine data were available for 801/820." Matches the EUF abstract (211/427 = 49.4%; 204/393 = 51.9%; 801/820 = 97.7%). The HTA 2025 abstract gives 211/427 (49.4%) and 205/363 (56.5%), a different routine-care denominator; the two reports disagree with each other.
3. `urodynamics.mdx` line 400: "In exploratory UPSTREAM analyses cited by EAU, surgery helped more in men with IPSS above 16, age under 74, Qmax below 10 mL/s, BOOI above 47.6 and BCI above 123." The paper behind the EAU citation (Young GJ et al., Eur Urol Focus 2022;8:1331, PMC9705260, Results 3.2) gives Qmax **below 9.8 mL/s**; the EAU text prints "< 10 mL/s". The sentence's citations (refs 26, 27, 45) omit the Young 2022 paper: ref 27 is the 5-year report and ref 45 is the ICS-'BPH' study, neither of which contains these thresholds.
4. `urodynamics.mdx` ref 27 title reads "...Randomised Evaluation of Assessment Methods Non-inferiority RCT"; the published title is "Five-year Follow-up of the Urodynamics for Prostate Surgery Trial; Randomised Evaluation of Assessment Methods-A Noninferiority Randomised Controlled Trial of Urodynamics" (Crossref/Europe PMC). Volume 11 issue 4 pp618-624 correct.
5. `urodynamics.mdx` ref 29 links Bookshelf `NBK615940`; Europe PMC lists the HTA 2025 report as `NBK615930`. I could not open either (reCAPTCHA). The HTA is Vol. 29, No. 26 (stated in the abstract).
6. `bladder-outlet-obstruction.mdx` line 349: "routine urodynamics in uncomplicated men did not reduce surgery or improve symptoms in UPSTREAM." Consistent with the abstract (surgery 38% versus 36%; IPSS noninferior, not better). UPSTREAM did not restrict enrollment to "uncomplicated" LUTS; "uncomplicated" is the authors' conclusion wording. The exclusions were catheter dependence, relevant neurologic disease, cancer treatment, prior prostate surgery and unfitness for surgery. Low priority.
7. `marcus-drake.mdx` line 33: "Led a 26-hospital randomized trial": consistent (corresponding and senior author of the HTA; first author of the Eur Urol report; 26 hospitals confirmed).

## Internal inconsistencies in the sources (how I handled them)

- HTA Scientific summary prints acute urinary retention as 29/289 (routine care) versus 13/424 (urodynamics); Table 15 lists 29 and 13 *events* among 389 and 424 men with data. The file reports "29 episodes" and "13 episodes" and carries no denominators.
- Nocturia odds ratio: Table 18 gives OR 0.66 (0.44-0.99), p = 0.042; the Scientific summary and results summary give p = 0.010 and describe it as possibly a chance finding. I used Table 18 values.
- HTA p62 text gives n = 116 for the urodynamics arm in the surgery-improvement sentence; Table 12 gives 137 (and 137 + 116 = 253, the stated total). I used Table 12.
- Table 4 gives a routine-care Qmax IQR upper bound of 58.30 mL/s (probably a typo); not used.
- CONSORT (PDF p50) says 353 (83%) of 427 received urodynamics; Table 6 says 353/421 (84%) after excluding unknowns. I used Table 6 and the CONSORT breakdown of reasons.
- Differences between the HTA 2020 and Eur Urol 2020 abstract: none found for the primary and surgery results; adverse event counts (428; 234 versus 194) agree.

## Not verified or left out

- Cutoff dates: the HTA states the database closed "on the 20 August" with the analysis finished in October 2018; the year is implied, so `cutoff` is null for all reports.
- HTA 2025 publication day not verified (July 2025 per Crossref/PubMed; `dateApprox` set).
- No numbers were taken from AI summaries. The 5-year HTA and EUF values come from the abstracts as printed by Europe PMC.
- FDA approvals: not applicable (a testing pathway). NICE CG97 was not read, so no NICE statement appears under guidelines.
- The HTA nocturia, sexual-function and satisfaction tables are secondary; only a few are in the file.

## Full-text update, October 19

Sources read in full (folder `reports/audit-v2/sources-local/pdfs-2026-10-19/`): `UPSTREAM-Drake-2020-Accepted-Manuscript.pdf` (author accepted manuscript of the Eur Urol 2020 primary report; locators are PDF pages, which are manuscript pages plus one), `UPSTREAM-Drake-2020-Tables.pdf` (Tables 1 to 4) and `UPSTREAM-Drake-2020-Figure-1-CONSORT.pdf`; `UPSTREAM-Clout-5-Year-2025-EUF.pdf` (Eur Urol Focus 2025, version of record; locators are PDF pages) and `UPSTREAM-5-Year-HTA-2025.pdf` (HTA 2025;29(26); locators are printed page and table numbers). Figure 2 of the primary report (`.tif`) could not be decoded here, so its values are not used. The supplements (Supplementary Tables 1 to 6) were not supplied. `source.level` is now `full-text` and `source.checked` is 2026-10-19 for `upstream-2020`, `upstream-2025` and `upstream-2025-hta`; `status.sourceRead` is `full-text`. The statements above in this file that the primary and 5-year reports were read at abstract level are superseded.

### Corrected

1. `upstream-2025` IPSS: `met` null became **false**. The full text states the 1-point margin was retained and that noninferiority "could not be confirmed" given the wide interval (upper limit 1.93). The earlier note that the abstract gave no margin or conclusion no longer applies.
2. `upstream-2025` surgery: `met` null became **false** (the hypothesised reduction did not emerge). Arm-level rates, previously missing, are 180/415 (43%) versus 167/386 (43%), p = 0.763 (Table 3).
3. `upstream-2025-hta` IPSS: role `secondary` became `primary` (it is the Phase II primary outcome) with `met: false`; the HTA states noninferiority could not be confirmed and the study was underpowered to confirm it.
4. `upstream-2025-hta` questionnaire fact: the abstract's routine care figure 205/363 (56.5%) is not comparable with 211/427. Figure 3 shows 205 routine care responses over a denominator of 363, the routine care 18-month cohort (393 minus 28 withdrawals and 2 deaths); the text notes one blank questionnaire, and Table 3 and the Eur Urol Focus paper analyse 204/393 (51.9%). The fact now carries the 204/393 figure with the explanation. The HTA scientific summary states 416 questionnaires received (205 + 211).
5. `upstream-2025-hta` surgery fact: the combined 347/801 is now given by arm (180/415 and 167/386).
6. Design `blinding` text: now "men and hospital staff unblinded; co-applicants blinded to arm throughout recruitment and analysis, junior statistician unblinded for monitoring-committee reporting" (primary report), replacing the HTA 5-year wording about the study manager and administrative staff.
7. Page, Design: the "8,671 screened, 1,482 eligible, 55% of those eligible" sentence is replaced by the CONSORT breakdown (5,910 not eligible, 662 declined, 1,279 not included for an unidentified reason; 820 randomized). The 1,482 comes from the HTA 2020 text and equals 820 + 662, ignoring the 1,279; it is no longer printed.
8. Page, Design: added unfitness for surgery and unwillingness to comply to the exclusions, prior conservative or medical therapy to eligibility, and noninferiority declared when the upper limit was below 1 point.
9. Takeaway: "before surgery for bothersome male LUTS" became "in men with bothersome LUTS considering prostate surgery" (the manuscript's population); numbers unchanged, 43 words.
10. HTA 2025 citation now carries volume and issue (2025;29(26)); date locator updated to the title page ("published July 2025"; no day given).
11. Locators: the abstract locators on the three updated reports were replaced by page, table or section locators.

### Added

- Primary report: per-protocol (12.6 versus 12.8; difference -0.10) and CACE (-0.39, 95% CI -1.70 to 0.92) IPSS analyses; IPSS quality of life (2.7 versus 2.7); prespecified subgroup interactions (none); surgery recommended 196/397 versus 182/378; median time to surgery with IQRs and at least 75% TURP; Qmax overall and about 4 months after surgery (17.2 versus 18.2); ICIQ-MLUTS voiding and incontinence scores; nocturia; ejaculation; the post hoc surgery-by-arm interaction (p < 0.001); the 11 deaths (9 in the urodynamics arm); arm-level SDs and n for the primary IPSS and the adjusted-analysis n (328 versus 313); urodynamics received 353/427 (83%) versus 28/393 (7%); reasons for non-receipt from CONSORT; withdrawals 39 versus 28; the 17.3 versus 12.8 crossover comparison; quality control (erroneous obstruction diagnosis in 5.5% of tests); why surgery rates fell below plan.
- 5-year Eur Urol Focus report: arm-level IPSS (13.68 versus 13.62, n 208 versus 202), quality of life, time to first surgery, ICIQ-MLUTS voiding and incontinence scores, nocturia (58% versus 66%, p = 0.106), ejaculation, painful ejaculation (13% versus 22%, p = 0.034), deaths (28 versus 26; median time to death 35 versus 40 months), response and data-linkage detail, procedure counts and the planned versus observed surgery rates.
- 5-year HTA: 18-month IPSS in 5-year responders (-0.84), sensitivity analyses (per-protocol, multiple imputation), surgery by arm, first surgery by 6-month period, IPSS by surgical status and its interaction (2.26, p = 0.118), the flow-rate subgroup interaction (-4.72, 95% CI -7.86 to -1.58, p = 0.002), adjusted mean costs and QALYs, cost by year, net monetary benefit (-962.62) and 21% probability of cost-effectiveness, ONS deaths, the OPCS code table highlights, urodynamics coverage in routine data (251/415 versus 72/386) and agreement with Phase I case report forms (776/790).
- Page: new 5-year paragraphs (surgery, secondary outcomes, interactions, costs), the journal report's interaction p value, the quality-control finding, the adverse-event attribution, 5-year deaths and the expanded limitations.

### Disagreements and anomalies found in the full texts

1. **Post hoc surgery-by-arm interaction, p value.** The Eur Urol manuscript gives p < 0.001 ("surgery being potentially more beneficial in the Routine Care arm", Figure 2, Supplementary Table 4). The HTA 2020 report (already in the file) gives an interaction difference of 2.93 (95% CI 0.86 to 5.01), p = 0.006, falling to p = 0.283 as treated. Both are shown on the page. The 5-year HTA found the same direction but not significant (2.26, p = 0.118).
2. **Sample size.** The manuscript states 800 men (margin 1, SD 5, 20% attrition, 80% power); the HTA 2020 file states 310 per arm inflated to 388 per arm (776). The page keeps the HTA figures.
3. **Received urodynamics.** Manuscript: 353 (83%) of 427 and 28 (7%) of 393; HTA 2020 Table 6 (in the file): 353/421 (84%) and 360/388 (93%) received the allocated pathway. Different denominators, not a conflict; both are on the page.
4. **Adjusted analysis sample.** The manuscript gives 641 (78%) analysable after baseline adjustment (328 versus 313). The page's earlier 340/329 are the 18-month IPSS counts (Table 2); both are now stated.
5. **Population label.** The manuscript's abstract and conclusion call the findings relevant to "uncomplicated LUTS" and the patient summary says "uncomplicated". Eligibility did not require uncomplicated LUTS. WARWIKI `bladder-outlet-obstruction.mdx` line 349 uses the same wording; low priority.
6. **5-year noninferiority.** `urodynamics.mdx` line 349 states "Five-year non-inferiority was not established because of uncertainty around the symptom estimate"; this is confirmed by the full text. The earlier note that this was unverified is resolved.
7. **Surgery since 18 months.** The Eur Urol Focus paper says an additional "~56" procedures (the symbol is garbled in the extraction) came between 18 months and 5 years (347 minus 291). The HTA gives 66 additional cases in Table 8 and the text, 65 in the scientific summary (454 non-surgical + 281 + 66 = 801). Not used on the page.
8. **ONS versus trial deaths in Phase I.** HTA Table 18: 11 versus 3 deaths in Phase I (ONS); trial records, 9 versus 2. Both are stated in the file.
9. **HTA 2025 table labels.** Tables 21 and 22 label the urodynamics group n = 393 and routine care n = 427, which appear swapped relative to randomization (427 and 393); group n values from those tables are not used. The M653/M662/M672 code names are printed with "necrotising enterocolitis" for NEC; the page says "not elsewhere classified" (the printed text of section 3.5.1 reads "NEC").
10. **Rounded p values.** Manuscript Table 3 gives p = 0.9 and 0.7 for recommended and conducted surgery; HTA 2020 gives 0.872 for the former. Both are consistent.
