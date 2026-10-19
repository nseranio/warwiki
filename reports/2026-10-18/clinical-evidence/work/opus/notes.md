# OPUS source and consistency notes

## Reports opened and included

1. **Wei JT, et al., 2012, primary randomized report.** Full text read through the indexed [PMC article](https://pmc.ncbi.nlm.nih.gov/articles/PMC3433843/) (especially Methods, Results, Tables 2 and 4, and Figure 1); no local source file was found. DOI [10.1056/NEJMoa1111967](https://doi.org/10.1056/NEJMoa1111967); PMID [22716974](https://pubmed.ncbi.nlm.nih.gov/22716974/). PubMed confirms authors, *N Engl J Med*, 2012;366(25):2358-2367 and June 21 publication.
2. **Jelovsek JE, et al., 2014, OPUS-derived risk model.** Full text read through the indexed [PMC article](https://pmc.ncbi.nlm.nih.gov/articles/PMC3906626/) (Methods, Results, Figures 1–4); no local source file was found. DOI [10.1097/AOG.0000000000000094](https://doi.org/10.1097/AOG.0000000000000094); PMID [24402598](https://pubmed.ncbi.nlm.nih.gov/24402598/). PubMed confirms authors, *Obstet Gynecol*, 2014;123(2 Pt 1):279-287. PubMed identifies the February 2014 issue; the exact online publication day was not verified, so the trial file marks its February 1 timeline date approximate.

The source search covered `reports/audit-v2/sources-local` text files, filenames in `/Users/joyboy/Documents/Medicine` and `/Users/joyboy/Downloads`, and online full text. No owner-held OPUS report PDF or text was identified. The PMC pages returned a browser challenge when opened directly in the web tool, but the indexed full-text search returned the article methods, results and tables used here. The report `source.file` fields are therefore null, with `source.level` set to `full-text`.

## Guidelines opened

- Local AUA/SUFU 2023 SUI unabridged copy: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-sui-2023-unabridged.txt`, statement 19 and discussion on printed pages 23–24. The copy cites Wei as reference 104. No `auanet.org` page was opened.
- Local ACOG/AUGS Practice Bulletin 214: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/pdfs-2026-10-09/pelvic-organ-prolapse-acog-practice-bulletin-number-214.txt`, recommendations on printed page e136, under Level B. DOI [10.1097/AOG.0000000000003519](https://doi.org/10.1097/AOG.0000000000003519), PMID [31651832](https://pubmed.ncbi.nlm.nih.gov/31651832/).
- Local EAU 2026 female LUTS guideline: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, sections 4.7.4–4.7.5 and reference 639 (Wei). The cited recommendation strengths are printed as `Strong`.
- [NICE NG123 recommendations](https://www.nice.org.uk/guidance/ng123/chapter/recommendations), published 2019, recommendations 1.8.3–1.8.4. NICE conveys strength through its recommendation verbs rather than a letter grade; the page badges preserve `Do not offer` and `Explain`.

## Reports considered and left out

- [Wei et al., *Clin Trials* 2009, OPUS design and methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC2878478/): full-text methods report opened, but it predates outcomes and adds no separate efficacy or harm estimate beyond the primary paper.
- [Nager et al., 2014, sham-incision blinding analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC4346086/): considered; it evaluates masking rather than a new clinical treatment endpoint.
- [Concomitant anterior-repair secondary analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC5995601/) and [pooled sexual-function analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC7483870/): considered; both combine OPUS with other trials and answer different questions.
- Searches did not identify a randomized OPUS report extending the sling-versus-sham outcome beyond 12 months. The SUPeR five-year sling analysis is a different trial and was not filed as OPUS follow-up.

## Disagreements and unresolved details

- **Old Journal Club record:** Its `name` is the acronym expansion, not the primary paper's published title. Its outcome values, randomized sample, comparison and approximate 12-month NNT match the primary paper. The short `primaryOutcome` wording omits that the 3-month endpoint is a composite including treatment and that 12-month incontinence is measured despite interval treatment (Wei 2012, Methods: Study Outcomes; Table 2). No numerical discrepancy was found.
- **Primary paper itself:** The PubMed/PMC abstract states major bleeding complications as 3.1%, while full-text Table 4 lists 5/164 (3.0% to one decimal). The trial file and page use the table's count, denominator and rounding.
- **WARWIKI pages searched for `OPUS`:** `docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx` (line 332), `docs/04-surgical-techniques/04g-prolapse-repair/anterior/anterior-colporrhaphy.mdx` (lines 142 and 146), and `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx` (line 236). Their OPUS-specific numbers and statements agree with Wei 2012, Tables 2 and 4, and the Methods; no page-level source disagreement was found. The AUA/SUFU *guideline copy*, outside those site pages, describes the 27.3% versus 43.0% OPUS composite as SUI; Wei 2012 defines it more broadly as stress, urge or mixed incontinence (Methods: Study Outcomes; Table 2). The appraisal uses the paper's definition.
- The full text reports `327/337` one-year follow-up completion but only `287/337` evaluable 12-month primary-outcome data (Wei 2012, Figure 1 and Results: Study Population). The latter distinction is retained in the trial file and page.
- No FDA approval or clearance statement was added because none was needed to describe OPUS and no OPUS-specific FDA action was verified.
