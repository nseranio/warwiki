# IMPROVE source and consistency notes

## Reports opened and used

| Report | Source opened | Read level | Bibliography check |
|---|---|---|---|
| Rahn et al., *JAMA* 2023;330(7):615-625, DOI 10.1001/jama.2023.12317, PMID 37581673 | [JAMA full text](https://jamanetwork.com/journals/jama/fullarticle/2808329); [PubMed record](https://pubmed.ncbi.nlm.nih.gov/37581673/) | Full text | PubMed and publisher agree on authors, year, journal, volume, issue, pages, DOI and PMID. No local article copy identified. |
| Rahn et al., *Am J Obstet Gynecol* 2024;231(2):263.e1-263.e10, DOI 10.1016/j.ajog.2024.04.042, PMID 38710269 | [PubMed record and abstract](https://pubmed.ncbi.nlm.nih.gov/38710269/) | Abstract | PubMed confirms authors, 2024-05-04 online date, journal, volume, issue, pages, DOI and PMID. [Publisher PDF](https://www.ajog.org/article/S0002-9378%2824%2900568-4/pdf) could not be fetched. No local article copy identified. |

The local `reports/audit-v2/sources-local` DOI search found audit logs mentioning the paper, but no article text or PDF. Filename searches in `~/Documents/Medicine` and `~/Downloads` found no matching Rahn or IMPROVE copy. PMC article pages presented a browser check, so the accessible JAMA publisher full text was used for the primary report. DOI redirects were inaccessible through the web tool; PubMed and publisher records supplied the metadata checks.

## Reports considered but left out

- Rahn et al., "Effects of Preoperative Intravaginal Estrogen on Pelvic Floor Disorder Symptoms in Postmenopausal Women with Pelvic Organ Prolapse," *Am J Obstet Gynecol.* 2023;229(3):309.e1-309.e10, DOI 10.1016/j.ajog.2023.05.023, PMID 37244454: a preoperative symptom ancillary analysis. The PMC page challenged the browser, the publisher page blocked access, and the PubMed page did not return readable content. Search snippets alone were not treated as an opened report. Its findings were not entered into the trial file or appraisal.
- Rahn et al., "Design of a Randomized Clinical Trial of Perioperative Vaginal Estrogen Versus Placebo with Transvaginal Native Tissue Apical Prolapse Repair," *Female Pelvic Med Reconstr Surg.* 2021;27(1):e227-e233, DOI 10.1097/SPV.0000000000000899: protocol/design paper, without surgical outcomes; the primary report provides the implemented methods. The PMC page challenged the browser.
- No guideline or regulatory section was added to the page: the guideline material encountered addresses prolapse or GSM generally, rather than a recommendation citing or resting on IMPROVE. No FDA approval or clearance was checked for this trial's perioperative use.

## Disagreements and source details

- **Old Journal Club record, `n: 206`:** 206 were enrolled; 199 were randomized (102 estrogen, 97 placebo), and 186 were operated and analyzed (93 per arm). JAMA full text, Results/Study Population and Figure 2. The old record did not distinguish these denominators.
- **Old Journal Club bottom line, “Debunks routine perioperative vaginal estrogen as a way to strengthen a native-tissue prolapse repair”:** the prespecified primary endpoint did not show benefit, but its adjusted HR was 1.97 with a wide 95% CI of 0.92–4.22. The trial supports “no demonstrated improvement in repair success,” not a precise exclusion of any possible benefit or harm. JAMA full text, Results/Primary Outcome and Limitations.
- **WARWIKI `docs/01-foundations/pharmacology/hormonal-therapies/preoperative-hormonal-priming.mdx`, 12-month results table, “Failure components | Anatomic recurrence was the most common component, often partial apical descent without prolapse beyond the hymen or symptoms”:** the JAMA report identifies anatomical recurrence as the most common primary failure component, but discusses the predominance of partial, asymptomatic apical descent in **one per-protocol analysis**, not as a breakdown of all primary-analysis failures. JAMA full text, Results/Primary Outcome and Discussion. The page should keep that distinction if revised.
- **Primary article's own discrepancy:** JAMA Table 2 gives placebo suture exposure as 15/87 (17%) after month 6, while the article prose says 15/97 (17%); 15/97 is 15.5%. The trial file follows the table's explicit assessment denominator. JAMA full text, Table 2 and Results/Adverse Events.
- No other confirmed source disagreement was found on the WARWIKI pages returned by the exact `IMPROVE` search. The separate `IMPROVE-multi` blood-pressure trial was excluded from this comparison.

## Verification limits

- The 36-month report was read at abstract level only; its complications and detailed component failures were not entered. The 164/186 follow-up count and the cross-use of vaginal estrogen after protocol treatment came from that abstract.
- The primary report's 19% and 9% are time-to-event model estimates. They are not 20/93 and 10/93. Numerical percentages attached to raw counts in the data and page were recalculated from their stated denominators.
- The report's atrophy questionnaire was not validated, and its adjusted −0.87-point effect represents a difference in **change** in a baseline-bothersome subgroup, not subtraction of the two 12-month scores.
