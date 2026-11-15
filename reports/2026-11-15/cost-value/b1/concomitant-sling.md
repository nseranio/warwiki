# Concomitant sling at prolapse repair: cost and value draft

## Target page and placement

- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx`
- Append the paragraph below at the end of the existing `## Cost and Value` section, after the paragraph beginning “Against other operations” and before `## Complications`. Do not add another heading.

## Section text

For women without symptomatic SUI undergoing vaginal prolapse repair, the OPUS trial's 1-year within-trial analysis from the societal perspective (337 women, published 2023) found that a concurrent midurethral sling cost $18,170 versus $15,700 without a sling and had an ICER of $309,620 per QALY gained with concurrent sling versus no sling, above the study's cited willingness-to-pay range of $50,000 to $150,000 per QALY.<sup>[[54]](#ref54)</sup> A 1-year decision model of vaginal prolapse repair using 2020 US dollars from Medicare fees and published costs (published 2022) put staged surgery at $1,051.70 per patient, selective sling placement after a positive prolapse-reduced cough stress test at $1,093.75, and universal sling placement at $1,125.54; selective placement had the highest health utility and an ICER of $2,664 per QALY gained with selective versus staged placement.<sup>[[29]](#ref29)</sup> A 1-year decision tree using 2022 Medicare reimbursements from the third-party payer perspective (published 2024) found staged sling placement had lower costs and higher utility for women without preoperative SUI after either minimally invasive sacrocolpopexy or vaginal native-tissue apical suspension, while concomitant placement was cost-effective for occult SUI at the stated $100,000-per-QALY threshold.<sup>[[55]](#ref55)</sup> For abdominal sacrocolpopexy, a 1-year decision model using 2010 Medicare reimbursement rates (published 2013) estimated $2,867 per QALY gained with universal concurrent sling versus sacrocolpopexy alone with a deferred sling option; preoperative urodynamics to select sling recipients were more costly and less effective than universal placement.<sup>[[56]](#ref56)</sup>

## New reference lines

<a id="ref54"></a>54. Wang R, Tulikangas P, Sappenfield EC. "Cost Effectiveness of Concurrent Midurethral Sling at the Time of Prolapse Repair: Results From a Randomized Controlled Trial." *Urogynecology (Phila).* 2023;29(5):461-468. doi:[10.1097/SPV.0000000000001306](https://doi.org/10.1097/SPV.0000000000001306)

<a id="ref55"></a>55. Sassani JC, Giugale LE, Lavelle ES, Shepherd JP. "Cost-Utility Analysis of Midurethral Sling Timing Among Women Undergoing Prolapse Surgery." *Urogynecology (Phila).* 2024;30(1):65-72. doi:[10.1097/SPV.0000000000001384](https://doi.org/10.1097/SPV.0000000000001384)

<a id="ref56"></a>56. Richardson ML, Elliott CS, Shaw JG, Comiter CV, Chen B, Sokol ER. "To Sling or Not to Sling at Time of Abdominal Sacrocolpopexy: A Cost-Effectiveness Analysis." *J Urol.* 2013;190(4):1306-1312. doi:[10.1016/j.juro.2013.03.046](https://doi.org/10.1016/j.juro.2013.03.046)

## Edits to existing text

Move the Mou 2022 cost finding from the `## Concomitant Sling at Prolapse Repair` strategy table into the new paragraph. Replace this exact row:

```mdx
| **Selective prophylactic sling** | Occult SUI with positive reduced cough stress test | One-year retropubic-sling model: selective prophylaxis was cost-effective; staged surgery had the lowest cost<sup>[[29]](#ref29)</sup> |
```

with:

```mdx
| **Selective prophylactic sling** | Occult SUI with positive reduced cough stress test | Withholds prophylactic sling after a negative prolapse-reduced cough stress test<sup>[[29]](#ref29)</sup> |
```

## Source table

Each quoted excerpt is from the PubMed abstract and is under 25 words.

| Section sentence | PMID | Supporting abstract excerpt(s) |
|---|---:|---|
| OPUS within-trial analysis | [36701323](https://pubmed.ncbi.nlm.nih.gov/36701323/) | “The incremental cost-effectiveness ratio for prophylactic sling was $309,620/QALY.” |
| Selective, staged, universal vaginal repair model | [35644248](https://pubmed.ncbi.nlm.nih.gov/35644248/) | “an incremental cost-effectiveness ratio of $2664 per quality adjusted life-years” |
| Timing by SUI status and route | [37493280](https://pubmed.ncbi.nlm.nih.gov/37493280/) | “staged MUS was the dominant strategy for both surgical routes with higher utility and lower costs.” |
| Abdominal sacrocolpopexy model | [23524201](https://pubmed.ncbi.nlm.nih.gov/23524201/) | “an incremental cost per quality adjusted life-year gained of $2,867 compared to abdominal sacrocolpopexy alone.” |

## Notes

- PubMed abstracts and bibliographic records confirmed all four studies. Mou 2022 is already reference 29; the page's last reference is 53.
- Wang 2023 reports a 24% cost-effectiveness probability without a specific threshold for that probability, so it is omitted from the section.
- Sassani 2024 reports a $21,114-$96,536 per-QALY ICER range pooled across occult and overt SUI scenarios; the range is omitted because the paragraph concerns continent women.
- The PubMed script, E-utilities XML retraction/erratum check, and Crossref DOI API checks could not run: this shell cannot resolve `eutils.ncbi.nlm.nih.gov` or `api.crossref.org`. No retraction or erratum notice surfaced in accessible PubMed pages or search records, but formal status remains unverified. Recheck all four PMIDs for `Retracted Publication`, `RetractionIn`, `ExpressionOfConcernIn`, and `ErratumIn`, resolve all four cited DOIs on Crossref, and run `npm run refs:new` after applying the draft.
- No manufacturer affiliation or manufacturer funding statement was identified in the available PubMed records; the E-utilities affiliation and conflict-of-interest check remains incomplete.
- Considered and rejected: Cadish and Gregory 2023 (PMID 36808926), an editorial commenting on the sling economics rather than an economic evaluation.
