# Gender-affirming surgery: Cost and Value draft

## Target page and placement

- **Home:** `docs/05-special-populations/05c-gender-affirming/overview.mdx`. Insert `## Cost and Value` after `### Limits of Current Data` (the last subsection of `## Outcome Data Sources and Registries`) and before `## Postoperative Considerations`.
- **Context only; no new section:** `docs/04-surgical-techniques/04k-gender-affirming-surgery/index.mdx`, `feminizing-surgery.mdx`, and `masculinizing-surgery.mdx`. No comparative economic evaluation was found for their vaginoplasty or phalloplasty technique choices. No pointer sentence is proposed.

## Section text

## Cost and Value

Coverage for medically necessary gender-affirming services, including hormones and surgery, added QALYs at additional cost in a US societal-perspective Markov model (2013 US dollars; 5- and 10-year horizons). The incremental cost-effectiveness ratio was $9,314 per QALY gained with coverage versus no health benefits, and coverage was cost-effective in 85% of simulations at a willingness-to-pay threshold of $100,000 per QALY; modeled budget impact was $0.016 per member per month.<sup>[[36]](#ref36)</sup>

Top surgery had lower cost and more QALYs than no surgery in a 20-year Markov model of adults in Ontario seeking the procedure (Ontario public-payer perspective; 2024 Canadian dollars): incremental cost was −CA$2,857 and incremental effectiveness was 0.59 QALY. In probabilistic analysis, top surgery was cost-effective in 58% of simulations at a threshold of CA$50,000 per QALY.<sup>[[37]](#ref37)</sup>

Observed spending on gender-affirming hormones and surgeries in US commercial insurance claims was $0.06 per member per month in 2019, in a claims cost analysis covering 1993–2019 (published 2022).<sup>[[38]](#ref38)</sup> In a separate 2,176-person US primary-care survey, 94.4% reported at least one barrier to surgery, most often cost.[^1]

---

## New reference lines

The overview currently ends with footnote `[^35]` and has no `## References` heading. Add the following anchor references after the existing footnote definitions under a new `## References` heading, so the requested superscript citation syntax resolves without changing the existing footnotes.

<a id="ref36"></a>36. Padula WV, Heru S, Campbell JD. "Societal implications of health insurance coverage for medically necessary services in the U.S. transgender population: a cost-effectiveness analysis." *J Gen Intern Med.* 2016;31(4):394–401. doi:[10.1007/s11606-015-3529-6](https://doi.org/10.1007/s11606-015-3529-6)

<a id="ref37"></a>37. Valiquette CR, Morgan J, Rae S, et al. "Gender-Affirming Care in a Public Health Payer System: A Cost-Utility Analysis of Top Surgery." *Plast Reconstr Surg.* 2026;157(6):1093–1103. doi:[10.1097/PRS.0000000000012619](https://doi.org/10.1097/PRS.0000000000012619)

<a id="ref38"></a>38. Baker K, Restar A. "Utilization and Costs of Gender-Affirming Care in a Commercially Insured Transgender Population." *J Law Med Ethics.* 2022;50(3):456–470. doi:[10.1017/jme.2022.87](https://doi.org/10.1017/jme.2022.87)

## Edits to existing text

- **Move, retaining its existing `[^1]` citation:** Old paragraph in `## Outcomes and Safety`: `In the same 2,176-person survey, 94.4% reported at least one barrier to accessing GAS, most often cost. This describes that recruited cohort and is not a population-wide access estimate.[^1]` → remove that paragraph there and use the final sentence in the new section above. The source's setting and design replace the commentary sentence.
- No cost-evidence sentence is moved from the atlas pages. The `feminizing-surgery.mdx` table mentions distance, cost and transport as self-care feasibility factors, rather than reporting an economic result.

## Source table

| Section claim | PMID | Supporting quote |
|---|---:|---|
| US coverage model, $9,314/QALY, 85%, $100,000 threshold, $0.016 PMPM | 26481647 | Abstract: “Markov model with 5- and 10-year time horizons from a U.S. societal perspective ... (USD 2013).” Abstract: “incremental cost-effectiveness ratio (ICER) of $9314/QALY.” Abstract: “cost-effective in 85% of simulations.” |
| Ontario top surgery, −CA$2,857 and 0.59 QALY; 58% at CA$50,000/QALY | 41247176 | Abstract: “Ontario public payer perspective, with costs reported in 2024 Canadian dollars.” Abstract: “incremental cost -$2857, incremental effectiveness 0.59 QALY.” Abstract: “cost-effective in 58%.” |
| US claims, $0.06 PMPM in 2019 | 36398652 | Abstract: “almost three decades of commercial insurance claims.” **Number is in open full text, not abstract:** “the budget impact of gender-affirming care in 2019 was $0.73 per year, or $0.06 per member per month.” |
| US survey, 2,176 people and 94.4% reporting a barrier | 40965883 | Abstract: “The study cohort of 2176 patients.” Abstract: “Most patients (2054 [94.4%]) encountered a barrier to GAS, with the most common being cost.” |

## Notes

- No trial-based economic evaluation of genital technique choices was found. The two models address coverage of a broad care package and top surgery versus no surgery, respectively; neither compares penile inversion, peritoneal or intestinal vaginoplasty, nor metoidioplasty, phalloplasty or flap choices. The atlas pages therefore have fewer than two relevant economic studies each and receive no section.
- Valiquette 2026 is a journal article, not the earlier conference abstract; its printed version is 2026. Its model concerns top surgery, which the overview lists, and is not a genital-surgery model.
- Baker and Restar 2022 reports observed payer spending, not an incremental cost-effectiveness estimate. Its $0.06 figure is verified in the publisher's open full text; the PubMed abstract gives no monetary result. The manuscript does not state a price year for that figure, so the section says “published 2022.”
- Considered and rejected: Kim et al. 2024 (PMID 38117049) compares regional inpatient hospitalization costs, not clinical options. Chu et al. 2025 (PMID 38618736) compares genital and chest inpatient costs, not alternative surgical pathways. Downing et al. 2022 (PMID 35793109) centers on out-of-pocket costs, which STYLE.md §15 keeps off site. Padula and Baker 2017 (PMID 28708447) is a narrative review. The 2024 Ontario top-surgery conference abstract is superseded by Valiquette 2026.
- PubMed and publisher records reviewed show no manufacturer affiliation or named manufacturer funding for the cited studies. No industry tie is asserted.
- **Verification still required before applying:** local PubMed script, NCBI efetch XML and Crossref API calls all failed because this environment cannot resolve their hosts (curl exit 6). Thus `Retracted Publication`, `RetractionIn`, `ExpressionOfConcernIn`, `ErratumIn` and Crossref DOI resolution could not be checked to the requested standard; no clean retraction/erratum status is claimed. Recheck PMIDs 26481647, 41247176, 36398652 and reused survey PMID 40965883, plus their DOIs, on a networked runner, then run `npm run refs:new` after applying. PubMed pages and publisher full text corroborate the article metadata and results, but do not substitute for those gates.
- The existing overview uses Markdown footnotes rather than anchor references. The moved survey sentence retains `[^1]` so other existing `[^1]` citations remain valid; the three new studies use the requested `<sup>[[N]](#refN)</sup>` format. Reviewer should confirm the mixed rendering in MDX.
