# Cost and Value draft: urethroplasty surveillance and PFUI

## 1. Target pages and placement

- `docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx`: insert `## Cost and Value` after the complete `## Follow-Up` section (including `### Patient-Reported Outcomes`) and before `## Practice Patterns and Guideline Adherence`.
- `docs/05-special-populations/05a-trauma-emergencies/pfui.mdx`: insert `### Cost and Value` at the end of `## Acute Management`, after `### Primary Endoscopic Realignment (PER)` and before `## Delayed Definitive Reconstruction`.

## 2. Section text, ready to paste

### Male Urethral Stricture

## Cost and Value

Risk-stratified follow-up was less costly in a US decision analysis based on Medicare reimbursement rates (published 2013): modeled five-year costs after excision and primary anastomosis were $430 per patient versus $2,827 with routine close surveillance.<sup>[[48]](#ref48)</sup> First-year surveillance costs varied across published protocols: a literature review with cost analysis using 2013 US Centers for Medicare and Medicaid Services physician fees found ranges of $205 to $1,784 after anterior urethroplasty and $404 to $961 after posterior surgery.<sup>[[49]](#ref49)</sup>

For costs of urethroplasty versus repeated endoscopic treatment, see [DVIU and Urethral Dilation](/docs/surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu#cost-and-value).

### Pelvic Fracture Urethral Injury (PFUI)

### Cost and Value

Suprapubic tube placement followed by delayed urethroplasty cost less than primary endoscopic realignment (PER) in a US decision analysis using hospital and operating-room costs and Medicare reimbursement rates (published 2017): average treatment costs were $9,743 versus $11,043 per patient, respectively.<sup>[[72]](#ref72)</sup> In that model, PER was preferred only when its success rate reached at least 40%.<sup>[[72]](#ref72)</sup>

PER was preferred over suprapubic tube placement in a separate decision model of five management strategies over two years (published 2017); the least-cost pathway used PER followed by one DVIU and urethroplasty after failure, with an average cost-effectiveness of $17,493 per unobstructed voider.<sup>[[73]](#ref73)</sup>

## 3. New reference lines

### Male Urethral Stricture (last existing reference: 47)

<a id="ref48"></a>48. Belsante MJ, Zhao LC, Hudak SJ, Lotan Y, Morey AF. "Cost-effectiveness of risk stratified followup after urethral reconstruction: a decision analysis." *J Urol.* 2013;190(4):1292-1297. doi:[10.1016/j.juro.2013.04.024](https://doi.org/10.1016/j.juro.2013.04.024)

<a id="ref49"></a>49. Zaid UB, Hawkins M, Wilson L, et al. "The cost of surveillance after urethroplasty." *Urology.* 2015;85(5):1195-1199. doi:[10.1016/j.urology.2014.12.047](https://doi.org/10.1016/j.urology.2014.12.047)

### Pelvic Fracture Urethral Injury (last existing reference: 71)

72. <a id="ref72"></a>Tausch TJ, Lotan Y, Zhao L, Morey AF. "Decision Analysis Model Comparing Cost of Management Strategies for Pelvic Fracture Urethral Injuries." *Urol Pract.* 2017;4(4):285-289. doi:[10.1016/j.urpr.2016.07.004](https://doi.org/10.1016/j.urpr.2016.07.004)

73. <a id="ref73"></a>Johnsen NV, Penson DF, Reynolds WS, Milam DF, Dmochowski RR, Kaufman MR. "Cost-effective management of pelvic fracture urethral injuries." *World J Urol.* 2017;35(10):1617-1623. doi:[10.1007/s00345-017-2022-8](https://doi.org/10.1007/s00345-017-2022-8)

## 4. Edits to existing text

None. Neither target page contains a cost sentence to move. The one-line DVIU pointer is included in the new Male Urethral Stricture section.

## 5. Source table

| Draft sentence | PMID | Supporting abstract quote |
|---|---:|---|
| Stricture: five-year risk-stratified versus close follow-up cost | [23583856](https://pubmed.ncbi.nlm.nih.gov/23583856/) | “The 5-year cost of a symptom based, risk stratified followup protocol is $430 per patient vs $2,827 per patient” |
| Stricture: first-year anterior and posterior surveillance cost ranges | [25819624](https://pubmed.ncbi.nlm.nih.gov/25819624/) | “first-year follow-up cost of anterior urethral surgery ranged from $205 to $1784” and “posterior ... from $404 to $961” |
| PFUI: SPT versus PER average treatment cost | [37592686](https://pubmed.ncbi.nlm.nih.gov/37592686/) | “$11,043 vs $9,743 for suprapubic tube with elective bulbomembranous urethroplasty” |
| PFUI: PER success threshold | [37592686](https://pubmed.ncbi.nlm.nih.gov/37592686/) | “For primary endoscopic realignment to be preferred, a success rate of 40% or better would be necessary.” |
| PFUI: five-strategy, two-year PER model and average cost-effectiveness | [28229209](https://pubmed.ncbi.nlm.nih.gov/28229209/) | “PER was preferred over SPT placement in all iterations” and “$17,493 per unobstructed voider” |

## 6. Notes

- Surveillance evidence is thin: exactly two relevant cost analyses were found. Belsante is a decision model; Zaid is a literature-derived protocol cost analysis, not a trial-based economic evaluation. Neither establishes comparative clinical outcomes of surveillance schedules.
- PFUI evidence is thin: two relevant, non-trial decision models were found. Their conclusions conflict. Tausch used institutional hospital and operating-room costs plus Medicare reimbursement rates; Johnsen modeled total medical costs and did not state a payer perspective or price year in the abstract. The section omits these unstated elements.
- No price year is reported in the Belsante, Tausch or Johnsen abstracts; the sections use publication year. Zaid explicitly uses 2013 CMS physician fees.
- No maker affiliation or manufacturer funding statement was identified in the accessible PubMed records. No industry label is added to the section.
- Retraction/erratum check remains incomplete: the requested NCBI EFetch XML call failed with DNS resolution error, and PubMed HTML/search results showed no retraction or expression-of-concern label for the four cited PMIDs. PubMed lists a comment on Belsante (PMID 23871931) and an editorial comment on Zaid (PMID 25819625); neither is an erratum. Re-run EFetch before application and report any `ErratumIn`, `RetractionIn`, or `ExpressionOfConcernIn`.
- Crossref DOI resolution remains incomplete: all four requested Crossref calls returned HTTP `000` because `api.crossref.org` could not be resolved in this session. PubMed and publisher records display all four DOI-to-title matches. Re-run Crossref and `npm run refs:new` once the draft is applied; do not treat this draft as passing those gates.
- Considered and rejected: the OPEN randomized trial economic evaluation, Wright, Rourke, Greenwell and the Quebec model concern urethroplasty versus endoscopic treatment, already covered on DVIU. Leddy et al. (PMID 26019971) and Owen et al. (PMID 41068516) report PFUI clinical outcomes without an economic evaluation. The TURNS prospective cohort (PFUI page ref 10) reports obstruction and treatment rates, not costs. Urethroplasty practice surveys and narrative economic reviews were excluded.
