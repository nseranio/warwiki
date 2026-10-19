# WATER notes (checked 2026-10-18)

## Sources opened

| Report | Id | Level | Where |
|---|---|---|---|
| Gilling 2018, J Urol 199(5):1252-1261 (primary) | doi 10.1016/j.juro.2017.12.065, PMID 29360529 | abstract only | PubMed record via NCBI eutils; Crossref for bibliographic check. Full text not reachable: auajournals.org returned HTTP 403, Unpaywall lists it closed, no copy in `sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads` (searched by DOI, "aquablation", "gilling"). |
| Plante 2019, BJU Int 123(4):651-660 (subgroups) | doi 10.1111/bju.14426, PMID 29862630 | abstract | PubMed. Wiley full text not open. |
| Gilling 2019, Urology 125:169-173 (1 year) | doi 10.1016/j.urology.2018.12.002, PMID 30552937 | abstract | PubMed. Elsevier full text not open. |
| Gilling 2019, Adv Ther 36(6):1326-1336 (2 years) | doi 10.1007/s12325-019-00952-3, PMID 31028614 | full text | Europe PMC XML, PMC6824383 (CC BY-NC) |
| Gilling 2020, Can J Urol 27(1):10072-10079 (3 years) | PMID 32065861, no DOI | full text | https://mail.canjurol.com/html/free-articles/Cdn_JU27_I1_05_FREE_DrGilling.pdf |
| Gilling 2022, Can J Urol 29(1):10960-10968 (5 years) | PMID 35150215, no DOI | full text | https://mail.canjurol.com/html/free-articles/Cdn_JU29_I1_05_FREE_DrGilling.pdf (CONSORT figure viewed as an image) |
| Oumedjbeur 2023, Can J Urol 30(5):11650-11658 (5 years, 50-80 mL) | PMID 37838991, no DOI | full text | https://www.canjurol.com/html/free-articles/2023/30-05/CJU_V30_I5_06_FREE_DrOumedjbeur.pdf |
| FDA De Novo decision summary DEN170024 (AQUABEAM) | none | full text | https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN170024.pdf and the denovo.cfm?ID=DEN170024 page |
| AUA 2026 BPH guideline, statements 47-48 and text | doi 10.1097/JU.0000000000005099 | full text | local `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt` (lines 236-244, 2824-2945) |
| EAU Non-neurogenic male LUTS 2026, section 5.3.4.a | none | full text | local `reports/audit-v2/sources-local/eau-male-luts-2026.txt` (lines 2957-3060) |

DOIs checked on Crossref: 10.1016/j.juro.2017.12.065, 10.1016/j.urology.2018.12.002, 10.1111/bju.14426, 10.1007/s12325-019-00952-3, 10.1097/JU.0000000000005099 (authors, year, journal, volume, pages match). PMIDs for the three Can J Urol papers checked on PubMed (the journal assigns no DOIs; `noDoi` set).

`report.source.file` is null for every report (all read online). `status.sourceRead` is `abstract` because the primary report was read as an abstract.

## How primary-report values were sourced (please check)

The primary report's full text could not be opened. In the primary report entry:
- Abstract-sourced: 26% vs 42% primary safety endpoint (p=0.0149), noninferiority p<0.0001 for IPSS, anejaculation 10% vs 36% (p=0.0003), total operative time 33 vs 36 min (p=0.2752), resection time 4 vs 27 min (p<0.0001).
- Restated in the 5-year full text (Can J Urol 2022) and used with that locator: 6-month IPSS reduction 16.9 vs 15.1 points, mean difference 1.8, noninferiority margin -4.7, superiority p=0.1346; persistent grade 1 events 7% vs 25% (p=0.0004), grade 2+ 20% vs 23% (p=0.3038); transfusion 1 vs 0 (denominators 116 and 65 from its Figure 1); hospital stay 1.4 days; catheter removal median 1 day; hemostasis methods; zero de novo erectile dysfunction or pad-requiring incontinence.
- From the FDA De Novo summary p12: the 95% CI (-0.4 to 4.0) for the 6-month IPSS difference. The journal's own CI is not in the abstract; if the journal CI differs, replace it.
- Derived by subtraction: safety difference of -16 percentage points (the Plante abstract also states 26% vs 42%).
- Arm sizes 117 and 67 randomized come from Table 1 of the 2-year and 3-year reports; 116 and 65 treated from the 5-year Figure 1 and the FDA summary.

The takeaway uses only abstract-level facts (noninferior IPSS at 6 months; 26% vs 42%).

## Reports considered and left out

- WATER vs WATER II cross-trial comparisons (Nguyen, BJU Int 2020, PMC6972548; Eur Urol Open Sci 2021; Urology 2022; Berjaoui, BJUI Compass 2024): different trial, not WATER-only; not opened.
- Pimentel, Urology 2019 (urodynamics in 66 WATER patients, PMID 30721737): not opened.
- Bach 2022 (single vs multiple passes, pooled WATER and WATER II): pooled, not WATER-only.
- Elterman individual-patient meta-analysis; pooled WATER, WATER II, OPEN WATER analyses: pooled.
- ClinicalTrials.gov NCT02505919 results record (reviewed only for participant flow, 116 and 65 treated): a registry record, not a report.

## Disagreements with other WARWIKI pages

`docs/04-surgical-techniques/04m-bph-male-luts/aquablation.mdx`:
- Line 73, "Surgical retreatment over 5 years was 5.1% after Aquablation and 1.5% after TURP" (cited to EAU 2026). The 5-year paper (Can J Urol 2022 p10966-10967, Table 2) lists 7/116 (6.0%) Aquablation and 8/65 (12.3%) TURP patients needing additional BPH therapy (medication or surgery). Counting the table's procedures gives 6/116 (5.2%) surgical versus 1/65 (1.5%). The paper does not state a surgical-only percentage; 5.1% appears only in the EAU text. The same 5.1% is repeated in the retreatment table (line 166); the WATER-vs-WATER-II table (Berjaoui, "6/116 treated retreated") matches the paper's 6/116 count.
- Line 55, WATER excluded "catheterization in the 14 days before surgery": not in the exclusion lists of the 2-year, 3-year, 5-year papers or the FDA summary. It is cited to the protocol (ref 38), which I did not open; unverified.
- Line 41, "mean catheter time was 2.0 days in WATER": not found in anything I read (the 5-year paper gives a median of 1 day after surgery in both groups). Probably from the primary full text; unverified.
- Line 28 and `turp.mdx` lines 191, 230: "10% ... at 6 months" anejaculation. The primary abstract gives 10% vs 36% without a time point; the AUA 2026 text places it at 6 months (p. 42, citing the primary report). Consistent, but the abstract itself does not state the time.

Other pages checked and consistent with the sources (no disagreement found): `01-foundations/tools/biomaterials/adjunct-specialty/aquablation.mdx` (116/65, 58/32 at month 60, 15.1 vs 13.2, p=0.2764, 7% vs 25%), `01-foundations/tools/technology/energy-devices.mdx`, `turp.mdx` (65 TURP recipients, IPSS-QoL 4.8 and 1.6), `urolift-pul.mdx`, `itind.mdx`, `greenlight-pvp.mdx` (WATER 12-month IPSS and Qmax values match the 1-year abstract).

## Discrepancies inside or between sources

- FDA De Novo summary (p11) reports the 3-month primary safety endpoint as 29/116 (25.0%) vs 26/65 (40.0%), difference -15.0% (CI -29.2 to -1.0), and persistent retrograde ejaculation in 6 months as 8 (11.3%) vs 16 (36.4%) of men sexually active at both visits. The journal abstract gives 26% vs 42% and anejaculation 10% vs 36%. The file uses the journal figures.
- Total procedure time: abstract and FDA summary 33 vs 36 min (FDA: 32.8 vs 35.5); the 5-year paper says 40 vs 36 min for Aquablation vs TURP ("first instrument introduction to insertion of catheter", p10964). The page uses the abstract.
- 3-year paper: the IPSS difference "0.6 points, 95% CI -3.3 to 2.2" has an ambiguous sign (14.4 vs 13.9 gives 0.5 in Aquablation's favor); the 2-year abstract gives only a CI (-2.1 to 2.6). Neither is entered as a signed effect value; both are in the result notes as printed.
- Oumedjbeur 2023: the abstract says the safety difference (21.0% vs 44.1%, risk difference -23.1%) is at 3 months, the Results text says 6 months; its abstract also calls the retreatment rate "at 6 months" while the body defines it through 5 years. Surgical reintervention "3.1%" and medication "15.6%" in the TURP arm do not correspond to n=34 (1/34 = 2.9%, 5/34 = 14.7%), so the denominator is probably 32 patients with follow-up; stored as printed. The 95% CI for the retreatment difference is printed as [-2.29, -30.4].
- 2-year paper abstract says "181 patients assigned at random"; its Results and Table 1 give 184 randomized and 181 treated (117 and 67 randomized; 116 and 65 treated).
- EAU 2026 text (section 5.3.4.a, 5-year paragraph) gives "mean IPSS decrease was 16.9 and 15.1 points" as the five-year result; those are the 6-month values. The 5-year values are 15.1 and 13.2 (p=0.2764).

## Old Journal Club record

- `n: 181` is the treated group; 184 were randomized (117 and 67). The file uses 184 with the 181 treated stated in the population.
- "5-year data favored Aquablation on durability and sexual side effects in the 50-80 mL subgroup": the overall 5-year IPSS difference was not significant (15.1 vs 13.2, p=0.2764); additional BPH therapy (medication or surgery) was 6.0% vs 12.3%, but surgical procedures alone were 6/116 vs 1/65 (derived from Table 2); the 50-80 mL subgroup (62 vs 34 men) had a larger IPSS reduction (14.1 vs 10.8, p=0.02) and less ejaculatory dysfunction (1.6% vs 23.5%) but was a subgroup. Not "durability" in a single sense.
- "fewer ejaculatory-dysfunction events": supported (anejaculation 10% vs 36% in sexually active men; 7% vs 25% persistent grade 1 events at 3 months).
- Design, population, comparison, primary outcome, DOI: consistent with the sources. The journal is J Urol, 2018.

## Could not verify

- The primary report's full text (see above): CI, secondary endpoints and any harms table beyond the abstract and the 5-year restatement; the exact time point of the 10% vs 36% anejaculation comparison.
- Full texts of the 1-year (Urology) and Plante (BJU Int) reports; both are entered at abstract level.
- Cutoff dates (`cutoff: null` throughout): none stated in the abstracts or papers read.
- Publication dates for the three Can J Urol reports are PubMed entry dates (`dateApprox: true`); the issues are February 2020, February 2022 and October 2023.
- No relations were added: none of the allowed target trial ids shares a genuine link with WATER beyond the lane and area (UroLift, Rezūm and Optilume are sham-controlled device trials).
- FDA: only the 2017 De Novo grant was read from fda.gov pages. Later 510(k) clearances for the AquaBeam system (K202961, K212835, K231024, K241952, K253211 per openFDA) were not opened and are not on the page.
