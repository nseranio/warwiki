# PREPARE protocol and analysis-plan source review

Reviewed 2026-09-12 by the independent tools/pharmacology reviewer. This is an internal source-access and interpretation record, not clinical clearance of the frailty article or a reanalysis of trial data.

## Source and actual read extent

Primary publication: McIsaac et al., *Home-Based Prehabilitation for Older Surgical Patients With Frailty*, JAMA Surgery, online December 3, 2025; 2026;161:113–123. DOI [10.1001/jamasurg.2025.5288](https://jamanetwork.com/journals/jamasurgery/fullarticle/2841757). Supplement 1 is the publisher's “Trial Protocol” attachment, link 62 on that page. The collaborating reviewer retrieved its signed publisher download; the unsigned CDN URL returned 403. The expiring download links are cached in `/tmp/workflow-prepare-links.json` and are not reproduced here.

**The entire 136-page supplement was read**, including all 336,361 characters of extracted text in contiguous, untruncated chunks, with the following coverage:

| Physical PDF pages | Content actually read |
| --- | --- |
| 1 | Supplement contents |
| 2–69 | Complete original protocol v1.0, November 26, 2019: main text, tables, all 123 bibliography entries, adverse-event appendix, preliminary cohort material, economic analysis, timeline, and every questionnaire/data-collection form |
| 70–108 | Complete final protocol v1.7, August 28, 2023: main text, document history, tables, all 123 bibliography entries and adverse-event appendix |
| 109–110 | Complete protocol amendment summary, including version dates and REB approval dates |
| 111–134 | Complete embedded 24-page final SAP v2, October 31, 2024: all sections, tables, flow diagrams, signatures, and 25 bibliography entries |
| 135–136 | SAP change-summary cover and complete change table |

All 12 pages containing embedded raster graphics were visually inspected: **39, 46, 51–55, 57, 62, 112, 120 and 126**. These include the preliminary WHODAS graph; WHODAS, CFS, EQ-5D, AD8, DASI, Katz and CNST forms; signatures; the planned study flow; and the blank CONSORT template. An additional **27 pages** were rendered and visually read to check table alignment, inequalities and amendment details: **14, 20, 23, 40, 43, 47–50, 86–87, 91–93, 96–97, 109–111, 118–119, 122, 124, 127–128, 131 and 136**. Thus all table text was read and 39 physical pages were also visually inspected; this does not claim visual inspection of every narrative PDF page.

Local source: `/tmp/workflow-prepare-s1.pdf`, 4,742,163 bytes, SHA-256 `ea26026d3a8d5512fdf930d15c52f389ddc469a9c9d1306141393856863a4695`. Extracted text: `/tmp/workflow-prepare-s1.txt`, SHA-256 `e250cc39cc1c87638935fa7ab598a1f217b346de8900a2ed17aa6db2962f43c8`. Rendered pages: `/tmp/tools-prepare-s1-pages/`.

This read does **not** include the individual papers cited by these protocols, intermediate protocols in full, raw trial data, or an independent full read of separate Supplements 2–4. The workflow reviewer owns the separate SAP/results-supplement review. I additionally read the publisher's abstract, Figure 1 caption, displayed main tables and Methods through outcome definitions to reconcile the analysis-population question; I did not independently read the entire main article in this task.

## Findings relevant to the site

1. **Both primary outcomes were planned originally.** Original v1.0 §4.9 explicitly names disability and complications as coprimary outcomes, despite less consistent synopsis/objective wording. Do not describe complications as a newly promoted primary outcome based on the synopsis alone.
2. **The final SAP separates the populations.** Sections 6.3 and 9.2.1 retain randomized participants for WHODAS, including nonsurgical participants measured at day 114 after randomization; deaths receive the worst score. POMS is restricted to participants undergoing surgery. The main Figure 1 caption explicitly distinguishes 847 retained randomized participants for disability from 705 operated participants for complications. The current site's separate population framing is supported; these denominators should not be interchanged.
3. **Adherence analysis was planned, but its threshold varied by document.** Original v1.0 §5.3 uses greater than 75%; final protocol v1.7 §5.3 says greater than 80%, with §4.15 describing 29/36 adherence points. Final SAP §§9.2.2, 10.5 and 11.3 returns to greater than 75% and specifies at least three weeks of intervention enrollment. The final four weeks supply the adherence score, with available weeks used when shorter. This is documented evolution, not evidence that adherence itself was randomized. The site's selection-bias qualification remains necessary.
4. **Use the final outcome definitions and effect scale.** The SAP excludes the POMS pain domain from the primary complication composite, retains hospital death, and uses mixed-effects logistic regression reporting odds ratios. Earlier protocols specify robust Poisson relative risks. Primary intervals are 97.5%, with a Bonferroni-adjusted two-sided alpha of .025; ordinary secondary outcomes use 95% intervals. Do not label the published OR as a risk ratio or infer a severity-specific benefit from the composite.
5. **The enrollment target changed transparently.** Protocol v1.7 increased 750 to 850 because delays and cancellations created more day-84 participants. The amendment summary records August 28, 2023 version date and October 26, 2023 REB approval. The SAP supplies revised nonadherence/attrition assumptions and a five-point WHODAS target informed by later surgical-patient literature, compared with the earlier eight-point target. These are design assumptions, not observed benefits.
6. **The intervention and comparator require scope.** The trial tests coached home exercise plus nutritional advice. The control received activity and healthy-eating guidance. It does not establish that all supervised or procedure-specific prehabilitation programs are ineffective, and does not justify an automatic delay of needed surgery for a fixed exercise course.

## Internal inconsistencies and extraction issues

- The final SAP change table removes consent method from models, but §11.1 retains a stale consent-method term; the final change summary also removes step count as a secondary outcome while earlier sections still list its analysis. Follow the documented final changes and published methods, not an isolated retained sentence.
- The SAP's October 31 change record states that changes preceded outcome analyses; signatures are dated November 12 and 25. The article abstract gives October 3–December 5, 2024 as the broader analysis period. This review cannot resolve the exact sequence of data cleaning, masked work and outcome analysis; it does not assert an undisclosed outcome-driven change.
- Planned center counts differ between documents (14 in the protocol, 11 in the SAP); the publication reports 13 actual centers. Use the actual trial report for enrolled-center counts.
- Visual checks show **≥60, CFS ≥4, expected stay ≥2 days**, and subgroup boundaries **≥75 and ≥5** where extraction sometimes omitted the equality bar. These are extraction artifacts, not verified threshold errors in the PDFs.
- The original POMS form includes pain and a creatinine field ambiguously worded as greater than 30% of the preoperative level. It is a historical trial form, not a current diagnostic or treatment algorithm to copy into WARWIKI or Epic. Likewise, research adverse-event contact instructions are not emergency clinical advice.
- Several original/final bibliography anchors are offset or otherwise imperfect. This operation reads their identities but does not independently validate each cited work. No historical reference table or preliminary cohort percentage was promoted into a new clinical recommendation.

## Editorial disposition

The current PREPARE block in `docs/01-foundations/perioperative-care/preoperative-assessment/frailty.mdx` was read as a targeted companion check. Its lack of overall benefit, distinct complication denominator, and caution about adherence selection are consistent with this review. No blocking correction was identified in that block. The separate workflow review records actual enrollment/consent flow and results-supplement denominator discrepancies. No MDX or central-ledger file was edited for this source task.
