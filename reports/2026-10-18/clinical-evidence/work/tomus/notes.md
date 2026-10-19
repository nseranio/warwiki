# TOMUS source and consistency notes

## Sources opened

The relevant methods, results, and discussion sections were read in publisher or PubMed Central full-text search renderings; the PubMed records were checked for author order, journal, year, volume, pages, DOI, and PMID. The direct article landing pages intermittently returned a browser challenge, so the online search rendering supplied the text. No owner PDF or source-local article text matching the primary DOI or TOMUS title was found. All four `source.file` values are therefore `null`.

| Report | Full-text source read | Identifier check | Access |
|---|---|---|---|
| Richter 2010, primary | [NEJM full text](https://www.nejm.org/doi/full/10.1056/NEJMoa0912658); [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC2962585/) | [PubMed 20479459](https://pubmed.ncbi.nlm.nih.gov/20479459/); DOI 10.1056/NEJMoa0912658 | Full text via indexed publisher/PMC rendering |
| Brubaker 2011, adverse events | [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC3205289/) | [PubMed 21925636](https://pubmed.ncbi.nlm.nih.gov/21925636/); DOI 10.1016/j.ajog.2011.07.011 | Full text; PMC article opened directly |
| Albo 2012, 24-month outcomes | [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC4367868/) | [PubMed 23083653](https://pubmed.ncbi.nlm.nih.gov/23083653/); DOI 10.1016/j.juro.2012.07.103 | Full text via indexed PMC rendering |
| Kenton 2015 issue, five-year extension | [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC4272663/) | [PubMed 25158274](https://pubmed.ncbi.nlm.nih.gov/25158274/); DOI 10.1016/j.juro.2014.08.089 | Full text via indexed PMC rendering |

Guideline: `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-sui-2023-unabridged.txt`, 2023 amendment, statement 13 on text lines 964–969 and its TOMUS discussion on lines 1067–1077. This is the source of the sole guideline sentence; the AUA website was not opened.

The primary report's online date is May 17, 2010. The 24-month efficacy report appeared online October 22, 2012, and the five-year report August 23, 2014 (2015 journal issue). The 2011 adverse-event report's exact online day was not confirmed; the JSON uses its November 2011 issue as an approximate date and marks `dateApprox: true`.

## Reports considered and left out

- The TOMUS design/methodology report (Albo and the Urinary Incontinence Treatment Network, *J Appl Res.* 2008;8(1):1–13; [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3999832/)) was read for protocol context but omitted from `reports` because it predates outcomes and adds no separate efficacy or harm estimate. It confirms surgeon certification and predefined transobturator technique.
- TOMUS secondary analyses of baseline urodynamic predictors, concomitant surgery, cystoscopy findings, and sexual function were located but not included because the four selected reports address the primary route comparison, operative morbidity, and five-year outcomes. No result from these analyses was imported into the JSON or page.
- A separate Finnish five-year TVT versus TVT-O randomized study (PMID 24508070) is not TOMUS and was excluded from this trial family.

## Reconciliation with existing WARWIKI pages

The TOMUS passages in `docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx`, `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx`, `retropubic-midurethral-sling.mdx`, `transobturator-midurethral-sling.mdx`, and `docs/01-foundations/tools/instruments/urethral-specialty/midurethral-sling-trocars.mdx` give the source's 12-month composites (80.8% versus 77.7%; 62.2% versus 55.8%) and distinguish the 12-month objective equivalence finding. The stated 5-year cohort figures (404/597; 51.3% versus 43.4%) also match. No numerical contradiction was found in those passages.

One timing distinction is worth preserving when editing elsewhere: `female-slings-suspensions.mdx` and `retropubic-midurethral-sling.mdx` correctly give **8/298 (2.7%)** retropubic voiding-dysfunction interventions at **12 months** (Richter 2010, Table 2); the dedicated 24-month harms report gives **9/298 (3.0%)** for surgery, catheter use, or both (Brubaker 2011, Table 1). These are different definitions and follow-up windows, not a discrepancy.

`docs/07-roots/surgeons/a-g/ann-gormley.mdx` describes a leadership role in TOMUS. The selected reports identify Gormley among investigators but do not independently establish that role; it was not repeated here. No conflicting source statement was found.

## Old Journal Club record

- Its trial size, primary DOI, comparison, 12-month objective-equivalence finding, and failure to establish subjective equivalence agree with the primary report (Richter 2010, abstract and Figure 2).
- “Objective success ~80% in both arms” is imprecise: the source reports **80.8% retropubic versus 77.7% transobturator** (Richter 2010, Figure 2).
- “Route is chosen by patient anatomy and risk tolerance rather than efficacy” overstates the evidence. Objective equivalence was demonstrated only at 12 months; subjective equivalence was not, and neither composite met equivalence at 24 months (Albo 2012, Figure 2).
- The “small durability edge” caveat needs the five-year design and uncertainty: in the selected observational extension, success was **51.3% versus 43.4%**, difference **7.9 points (95% CI −1.4 to 17.2)**, with 404/597 women enrolled and a changed success definition (Kenton 2015, abstract and Figures 2–3). Its confidence interval includes zero.

## Unresolved and modeling notes

- The schema has no `equivalence` design type; `noninferiority` is used as the nearest allowed type, while `design.description`, the result notes, and the page state that this was a **two-sided equivalence** trial with a ±12-point margin.
- The paper reports success percentages as estimates with confidence intervals, not as success numerators over each randomized arm. Their denominators cannot be reconstructed from the rounded estimates. Every fraction printed for enrollment or harms was recomputed from its numerator and denominator.
- The five-year paper alternates “erosion” and “exposure” for seven new mesh findings in its abstract and discussion. The structured harm uses “new mesh findings”; organ erosion versus vaginal exposure could not be resolved from the accessible rendering.
- No FDA approval or clearance claim was included; none was checked against FDA records for this page.
