# SIMS source and consistency notes

Checked against the source material on 2026-10-18. The trial file and appraisal page are drafts; `claimsChecked` and `clinicalReview` remain null.

## Sources opened

| Source | Access and scope |
|---|---|
| Abdel-Fattah et al., *N Engl J Med* 2022;386(13):1230-1243. DOI [10.1056/NEJMoa2111815](https://doi.org/10.1056/NEJMoa2111815), PMID [35353961](https://pubmed.ncbi.nlm.nih.gov/35353961/) | Publisher [full article](https://www.nejm.org/doi/full/10.1056/NEJMoa2111815) and [PDF](https://www.nejm.org/doi/pdf/10.1056/NEJMoa2111815?articleTools=true) text accessed through the web search index, including Methods, Tables 1-4, Figure 1, Results and Discussion. Direct open returned HTTP 403. No local copy found. `source.file: null`. |
| Abdel-Fattah et al., *Health Technol Assess* 2022;26(47):1-190. DOI [10.3310/BTSA6148](https://doi.org/10.3310/BTSA6148), PMID [36520097](https://pubmed.ncbi.nlm.nih.gov/36520097/) | [NIHR scientific summary PDF](https://www.ncbi.nlm.nih.gov/books/NBK587581/pdf/Bookshelf_NBK587581.pdf) opened directly; full report's [operative Table 6 and selected chapters](https://www.ncbi.nlm.nih.gov/books/NBK587586/pdf/Bookshelf_NBK587586.pdf) accessed through indexed text. Direct open of the full PDF returned a browser check. No local copy found. `source.file: null`. The report expands the same trial's clinical and economic analysis, with no later clinical cutoff. |
| AUA/SUFU, *Surgical Treatment of Female Stress Urinary Incontinence*, 2023 amendment | Local full guideline: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-sui-2023-unabridged.txt`, statement 13 and reference 79. The site at auanet.org was not opened. |
| EAU, *Guidelines on Non-neurogenic Female LUTS*, limited update March 2026 | Local full guideline: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, PDF pp 54-55 (text lines 3206-3305), reference 392. |
| NICE NG123, 2019 | [Recommendation 1.5.11](https://www.nice.org.uk/guidance/ng123/chapter/Recommendations) opened for chronology. It predates SIMS and does not cite or rest on this report, so it is absent from the trial page's guideline section. |

The primary report was published online March 30, 2022, and the HTA report in December 2022. Author lists, journal, volume, issue, pages, DOI and PMID were cross-checked with the publisher, PubMed and the University of Edinburgh publication record. No data-cutoff date was identified in either report, so both `cutoff` fields are null.

## Reports considered and left out

- The 2017 SIMS protocol (*BMJ Open* 7:e015111) establishes design, not a clinical outcome report; the outcome reports supersede it for this page.
- No published 10-year follow-up of ISRCTN93264234 was identified. The HTA report states that follow-up is planned; the page stops at 36 months.
- The 2024 ICS abstract titled “Single-Incision Mini-Slings for Stress Urinary Incontinence in Women: 5 years of follow up” did not establish that it reports the ISRCTN93264234 randomized cohort and is not included.
- The Altis 36-month multicenter study (PMID 37555436), Mini RISD, and other mini-sling trials enroll different cohorts and are separate trial families.

## Differences from the old Journal Club record

| Old wording | Source finding |
|---|---|
| `n: 596` without a qualifier | **600 randomized**; four post-randomization exclusions left **596** in the analyzed cohort (NEJM Figure 1; HTA scientific summary p v). |
| “similar ... reoperation rates” | Any further surgical treatment was **24/276 (8.7%) vs 12/261 (4.6%)**; further surgery for SUI was **7/276 (2.5%) vs 3/261 (1.1%)** (NEJM p 1237, Table 4 and Safety; HTA scientific summary p vi). The comparison is imprecise, not proof of similar rates. |
| “no excess mesh exposure” | Mesh exposure was **9/276 (3.3%) vs 5/261 (1.9%)**, risk difference **1.3 percentage points** (95% CI −1.7 to 4.4); the trial was underpowered for uncommon harms (NEJM p 1237, Table 4 and Discussion). |
| “the mini-sling, done under local anesthesia” | Local anesthesia with or without sedation was used in **201/276 (72.8%)**, versus **16/261 (6.1%)** with standard slings (NEJM p 1235, Table 2). |

The old record's 15-month noninferiority conclusion, 36-month success percentages, and dyspareunia subgroup numerator/denominator agree with the source. Its “first sling” population description is consistent with the exclusion of previous SUI surgery.

## Differences on existing WARWIKI pages

| Page and wording | Source finding |
|---|---|
| `docs/01-foundations/tools/instruments/urethral-specialty/midurethral-sling-trocars.mdx`: “In the SIMS RCT (596 women)” | **600 were randomized**; **596 remained after exclusions**. The unqualified parenthetical can be read as the randomized sample (NEJM p 1233, Figure 1). Its quoted efficacy and harm values agree with the source. |
| `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx`: “Contemporary SIMS trials show shorter operative time” in a row citing SIMS | In SIMS itself, mean time was **39.2 vs 41.3 minutes**, adjusted difference **−2.2 minutes** (95% CI −5.9 to 1.6); this trial did not establish a shorter operative time (NEJM p 1235, Table 2; HTA scientific summary p vi). The row also cites a separate meta-analysis, which may support a pooled claim. |
| `docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx`: “Shorter procedure” for single-incision mini-slings | The direct SIMS comparison showed **39.2 vs 41.3 minutes**, adjusted difference **−2.2 minutes** (95% CI −5.9 to 1.6), so a shorter procedure was not established by this trial (NEJM p 1235, Table 2). |

The remaining trial-specific claims in `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/single-incision-mini-sling.mdx`, `docs/01-foundations/tools/biomaterials/synthetic-meshes/polypropylene.mdx`, and the cited passages of `female-slings-suspensions.mdx` match the checked report values. The existing statement that 15- and 36-month outcomes met the 10-point margin is supported by the HTA scientific summary p v.

## Unverified or bounded points

- Direct publisher/NIHR PDF downloads were blocked by the web interface; the primary publisher article and selected full HTA sections were read through indexed text, while the HTA scientific summary was opened as a PDF. The full 190-page HTA volume was not reviewed page by page.
- The adverse-event differences are descriptive secondary findings. The trial was not powered to exclude meaningful differences in uncommon mesh complications.
- No FDA approval or clearance claim is made. NICE's older restriction is deliberately excluded from this trial-linked guideline section.
