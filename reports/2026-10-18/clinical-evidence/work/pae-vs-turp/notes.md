# Notes: pae-vs-turp (St Gallen PAE trial, Abt et al.)

## Sources opened

| Report | Identifier | What was read | Where |
|---|---|---|---|
| Abt 2018, BMJ 361:k2338 (primary) | DOI 10.1136/bmj.k2338, PMID 29921613, PMC6006990 | Full text (PMC XML, all sections and Tables 1 and 2; figures not viewable, so figure-only values are not used) | Text saved at `reports/audit-v2/sources-local/trials-2026-10-19/pae-bmj2018-pmc.txt` (used as `source.file`). A PDF could not be downloaded (bmj.com, Europe PMC and PMC PDF endpoints returned 403 or 404). |
| Abt 2021, Eur Urol 80:34-42 (2-year) | DOI 10.1016/j.eururo.2021.02.008, PMID 33612376 | Full text (open access) read in the browser pane at europeanurology.com/article/S0302-2838(21)00092-0/fulltext, including Table 1, Results, Discussion; PubMed abstract also read | `source.file` is null (read online). Supplementary Tables 1 to 3 not opened. Direct downloads (curl, WebFetch) returned 403. |
| Müllhaupt 2024, Eur Urol Focus 10:788-795 (5-year) | DOI 10.1016/j.euf.2024.03.001, PMID 38531756 | Abstract only (paywalled; publisher abstract page and PubMed) | `source.level` abstract. The 5-year full text was not opened. |
| Abt 2019, BJU Int 124:134-144 (post hoc outcome prediction) | DOI 10.1111/bju.14632, PMID 30499637 | PubMed abstract only | `source.level` abstract. |
| AUA BPH guideline 2026 | local `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt` | Statements 51 to 53 and the text around them (pp 43 to 45), references 390 to 393 | Used in "Guidelines and approvals". |
| EAU Non-neurogenic Male LUTS 2026 | local `reports/audit-v2/sources-local/eau-male-luts-2026.txt` | Section 5.3.4.b, summary of evidence and recommendations (p 52), references 527 and 533 | Used in "Guidelines and approvals" and for the 5-year retreatment figure. |

DOIs and PMIDs were matched to the PubMed records (authors, journal, volume, pages, year) through NCBI E-utilities and the PMC ID converter; the 2021 and 2024 details also match the AUA and EAU reference lists.

## Judgments worth a second look

- Verdict is `inconclusive`: the primary report states noninferiority "could not be shown" (difference 1.54 points, upper limit 4.52 against a 3-point margin). The point estimate was inside the margin, so `noninferior` and `negative` both overstate it.
- Arm sizes of 51 (PAE) and 52 (TURP) are derived, not printed: 48 and 51 analyzed plus 2 + 1 PAE-allocated exclusions (2 refused, 1 vascular failure) and 1 TURP-allocated refusal. The CONSORT figure itself could not be viewed. Results are per protocol (48 and 51).
- Result signs: 2018 differences are PAE change minus TURP change (Qmax -10.15, PVR +113.62 as printed). The 2021 and 2024 reports print postvoid residual, MRI volume, detrusor pressure and IPSS quality-of-life as improvements with the difference in favor of TURP, so those are recorded as TURP minus PAE and the `measure` text says so.
- The 2021 and 2024 comparisons are protocol-defined secondary endpoints tested for superiority; I recorded them as `secondary` with no `met`. The 2021 last-observation-carried-forward IPSS analysis is `exploratory`.
- The 5-year "42% of PAE patients had TURP" figure is not in the abstract. It is taken from the EAU guideline text (section 5.3.4.b) and recorded as a delivery Fact with that locator; the page attributes it to the EAU guideline. It equals 20/48 (41.7%), the figure the existing PAE page and the BPH index page use. Verify against the 5-year full text when available.
- Relations are empty on purpose: no listed trial has a stated builds-on, confirms or conflicts connection. WATER shares the lane (the page mentions it in "In conversation").
- Dose-area product is printed "Gy/cm2" in Table 2 of the BMJ report; the file writes Gy·cm² and notes the printed unit.
- The 2021 report is internally inconsistent on TURP-arm further surgery: Results give 5 patients (10%) with additional surgical procedures; the Discussion gives 7.8%. The file uses the Results figure (5 of 51).

## Reports considered and left out

- Müllhaupt G, et al. In-hospital cost analysis of PAE compared with TURP, BJU Int 2019;123:1055-1060 (post hoc). Not opened.
- Müllhaupt G, et al. Ejaculatory disorders after PAE: reassessment of two prospective trials, World J Urol 2020;38:2595-2599. Pools this trial with a second one; not opened. The ejaculation figures used here come from the 2018 and 2021 reports.
- Abt D, et al. Trial protocol, BMC Urol 2014;14:94. Not opened.
- Other PAE versus TURP trials (Gao 2014, Carnevale 2016, Radwan) and the Cochrane review belong to separate records.

## WARWIKI pages that cite this trial, and disagreements

Pages citing it: `docs/04-surgical-techniques/04m-bph-male-luts/prostate-artery-embolization.mdx` (Abt 2018 as ref 31, Abt 2021 as ref 17, post hoc as ref 21, 5-year as ref 25), `docs/04-surgical-techniques/04m-bph-male-luts/index.mdx` (5-year as ref 17), and `docs/01-foundations/anatomy-physiology/genitalia/prostate-seminal-vesicle.mdx` (5-year as ref 33). `bladder-outlet-obstruction.mdx` and `turp.mdx` do not cite it.

Disagreements and items to recheck (no other file was edited):

1. `prostate-artery-embolization.mdx`, table "Comparison with TURP", row "Retreatment at 2 yr": TURP column says "Not reported". The 2021 report (Results, "Dropouts and re-treatments") gives other surgical procedures in 5 of 51 TURP patients (10%) versus 1 PAE patient (2%) in addition to the 10 PAE-to-TURP conversions, and 2 TURP patients (4.3%) on antimuscarinics at 24 months. (The Discussion states 7.8% for TURP; the source disagrees with itself.)
2. Same table, row "IPSS improvement (12 mo) -9 to -13 versus -12 to -15": the Abt trial reports IPSS at 12 weeks (-9.23 versus -10.77, BMJ abstract) and 24 months (-9.21 versus -12.09, Eur Urol abstract). A 12-month Abt value is not in the text read (it appears only in a figure). The row label cannot be checked against this trial.
3. Same page, text after the table: "TURP was superior for IPSS (difference 2.88, p = 0.047)" matches the 2021 abstract, but the page does not say that this was a protocol-defined secondary comparison without correction for multiple testing and that the primary endpoint (12 weeks) did not establish noninferiority. This is an omission, not a numeric conflict.
4. All other numbers checked agree with the sources: 2-year Qmax +3.9 versus +10.23 mL/s, PVR 62.1 versus 204.0 mL, volume 10.66 versus 30.20 mL, adverse events 43 versus 78 (p = 0.005), 10 PAE patients (21%) to TURP, procedure time 122.2 min, fluoroscopy 50.8 min, hospital stay 2.2 versus 4.2 days, and the 5-year IPSS 7.8 versus 11.6, Qmax 3.6 versus 9.3, PVR 28 versus 220, 18/48 and 38/51 at 60 months (abstract and EAU text). `index.mdx` line 117 (9/48 PAE patients with a baseline indwelling catheter) matches BMJ Table 1.
5. `prostate-artery-embolization.mdx` states AUA 2026 and EAU 2026 positions; both match the local guideline copies (AUA statement 51, Conditional Recommendation, Evidence Level Grade B; EAU Weak and Strong recommendations, PAE "under investigation").

## Not verified or not opened

- 5-year full text (paywalled), 2021 supplementary tables, CONSORT figure of the 2018 report, and the BJU Int 2019 full text. 5-year values are abstract-level; the post hoc results have `met` unset and role `exploratory`.
- No FDA statement was added: no FDA approval or clearance specific to PAE for BPH was read on fda.gov or accessdata.fda.gov, and the section was kept to guideline statements.
- The trial file's `status.claimsChecked` and `clinicalReview` remain null.

## Counts

4 reports, 25 results, 14 harms, 13 delivery facts (file); 6 references (page).
