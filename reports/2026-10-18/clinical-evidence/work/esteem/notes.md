# ESTEEM source and consistency notes

## Reports used

1. **Primary report:** Sung et al., *JAMA* 2019;322(11):1066–1076, DOI [10.1001/jama.2019.12467](https://doi.org/10.1001/jama.2019.12467), PMID [31529007](https://pubmed.ncbi.nlm.nih.gov/31529007/). Opened the [publisher's full text](https://jamanetwork.com/journals/jama/fullarticle/2749872), including Methods, Tables 1–4, Figure 1, and adverse-event text. No local copy of this report was found by DOI/acronym search in `reports/audit-v2/sources-local` or author/acronym filename search in `Documents/Medicine` and `Downloads`. The publisher citation supplies author order, online date, journal, volume, issue, pages, and DOI; PubMed identifies the PMID. `report.source.file` is therefore null.
2. **Corrected planned secondary analysis:** Sung et al., *Obstet Gynecol* 2021;138(2):199–207, DOI [10.1097/AOG.0000000000004444](https://doi.org/10.1097/AOG.0000000000004444), PMID [34237755](https://pubmed.ncbi.nlm.nih.gov/34237755/). Opened the PubMed citation and abstract. PMC's page surfaced in search but its full-text open returned a browser challenge, so the report is marked `abstract` and only abstract-supported findings are used. PubMed confirms author order, journal, year, volume, issue, pages, DOI, PMID, and replacement status. `report.source.file` is null.

## Reports considered and left out

- Sung et al., *Obstet Gynecol* 2020;136(3):482–491, DOI `10.1097/AOG.0000000000003989`, PMID `32769647`: **retracted and replaced** by the 2021 report after missing Valsalva leak point pressures were miscoded in the predictive model. The [retraction/replacement notice](https://pubmed.ncbi.nlm.nih.gov/34293762/) has PMID `34293762`; the [PMC indexed notice](https://pmc.ncbi.nlm.nih.gov/articles/PMC8489382/) explains the error. Its predictors were not carried into the trial file.
- Harvie et al., ESTEEM cost-effectiveness analysis: economic evaluation rather than an additional clinical-outcome cutoff; not needed for the surgical efficacy and complications appraisal. Identified by [PMC record](https://pmc.ncbi.nlm.nih.gov/articles/PMC8633051/) but not opened in full, so it is not a trial report here.
- ESTEEM microbiome, postoperative weight-change, and treatment-protocol reports: mechanistic, cross-trial, or methods analyses without a new randomized clinical endpoint relevant to this page. They were found in publication searches but not opened as trial reports.
- No clinical follow-up beyond the primary 12-month endpoint was located in the publication searches. Long-term sling outcomes should not be inferred from this trial.

## Guideline check

- Read local `reports/audit-v2/sources-local/aua-sui-2023-unabridged.txt` and `reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`. They contain recommendations for conservative management and surgery in stress or mixed urinary incontinence, but no statement located in these copies cites or rests specifically on ESTEEM. The page therefore has no “Guidelines and approvals” section. No FDA claim is made.

## Existing WARWIKI pages

Exact-acronym search found these pages:

- `docs/03-clinical-conditions/03a-storage-incontinence/mixed-incontinence.mdx`, line 138: reports a 13.4-point UDI difference and 35-point clinical-importance threshold, with fewer additional treatments. These agree with the primary report's Table 2, Methods, and Table 3. Its positive CI `1.0–25.9` is the magnitude of the report's signed difference `−25.9 to −1.0`, so no substantive disagreement was found.
- `docs/07-roots/surgeons/h-r/holly-richter.mdx`, line 39: calls the symptom difference small. Consistent with Table 2 and the paper's conclusion.
- `docs/07-roots/surgeons/s-z/vivian-sung.mdx`, line 42: states the randomized comparison accurately. Consistent with Methods.

No number or statement on those pages was found to disagree with the opened primary report. Unrelated lowercase “self-esteem” matches were excluded from this trial search.

## Old Journal Club record

- `n: 480`, the two adjusted mean UDI changes (`−128.1` and `−114.7`), the comparison, journal, year, and DOI agree with the primary report (Results and Table 2).
- “Fewer urgency episodes” agrees with the prespecified exploratory diary result, but the old record did not identify it as exploratory (Table 3).
- “Small additional benefit” needs the primary qualification: the adjusted between-group difference was −13.4 points (95% CI −25.9 to −1.0; P=.04), **below** the prespecified 35-point clinical-importance threshold (Table 2; Methods: Statistical Analysis). The old bottom line omitted that distinction.
- “One of the few trials to study this neglected group head-on” is editorial and was not verified as a comparative publication count.

## Unverified or unresolved

- The primary article does not give a single data-cutoff date; `cutoff` is null.
- The 2021 secondary abstract reports `56/379` as `14.7%`; direct one-decimal rounding gives `14.8%`. The trial file and page retain the fraction only. The corrected report's full tables were not accessible in this pass.
- Percentages for primary-report serious adverse events appear without arm numerators in the abstract/results text; they are quoted as published, with randomized arm denominators given separately. All other percentages used with explicit numerators were recalculated.
