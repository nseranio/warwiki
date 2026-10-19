# USC-STAR notes (checked 2026-10-18)

## Sources opened
- Primary: Skinner 2015, J Urol 194(2):433-439, DOI 10.1016/j.juro.2015.03.101, PMID 25823791. PubMed abstract only (efetch XML). Full text could not be opened: auajournals.org, jurology.com, doi.org and ScienceDirect return 403; Unpaywall, Europe PMC, OpenAlex and Semantic Scholar list no open copy; no local copy under reports/audit-v2/sources-local, /Users/joyboy/Documents/Medicine or /Users/joyboy/Downloads. `source.level` is `abstract`, `met` is null on the primary result, and every locator is "abstract".
- Ahmadi 2013, J Urol 189(5):1782-1788, DOI 10.1016/j.juro.2012.11.078, PMID 23159582. PubMed abstract only. Included as a `pro` report (men's mailed questionnaire from the randomized cohort, arms pooled).
- ClinicalTrials.gov NCT01008865 (API record, read in full): used for the registered hypothesis and the registry id.
- Crossref records for both DOIs (authors, pages).
- EAU MIBC guideline page fetched; no readable USC-STAR or T-pouch statement found. No local guideline copy cites the trial (hits for "neobladder" in the local files are incidental). The Guidelines and approvals section is therefore omitted.

## Left out of the file
- Alsyouf 2023 (Urology 172:e1-e2, late T-pouch complication letter), Pichler 2013, Xi 2026 (Front Oncol, network meta-analysis): not trial reports; not opened.
- Any follow-up report beyond 3 years of the randomized comparison: none found in PubMed (search "T-pouch OR USC-STAR AND neobladder").

## Could not verify (full text needed)
Numbers that appear on other WARWIKI pages and are not in the abstract, so they are NOT in the file: 423 patients with baseline data, 260 with 3-year renal data, 124 deaths, 39 without 3-year data, diversion-related reintervention 22% (T-pouch) versus 13% (Studer) with p<0.01, 44 cm detubularized reservoirs, Leadbetter/Bricker anastomoses, the list of reintervention causes (afferent-limb stenosis, stones, ureteral and urethral strictures), and the arm-specific UTI and late-complication figures. Also not captured: the follow-up of the 3-year endpoint's survivors, Clavien grades, operative details, eGFR denominators and CIs. Once the PDF is supplied, replace the three harm notes with n/N values and add the 423/260 denominators and the intervention incidence.

## Disagreements and flags
- Pages (not edited) that use numbers I could not confirm from the abstract (all attributed to Skinner 2015): `docs/04-surgical-techniques/04c-urinary-diversion/t-pouch-modification.mdx` (423/260; 22% vs 13%, p<0.01; 44 cm reservoirs; Leadbetter/Bricker), `modified-studer-pouch.mdx` (423, 260, 124 deaths, 39 without data), `camey-ii-neobladder.mdx`, `double-t-pouch.mdx` (423/260; three-year cumulative incidence of secondary surgery), `bowel-segments.mdx` (237 vs 247 matches the abstract).
- Confirmed from the abstract: 484 randomized (237 T-pouch, 247 Studer), Feb 2002 to Nov 2009, eGFR -6.6 vs -6.4 mL/min/1.73 m2, p=0.35, multivariable p=0.63, "mean eGFR change" wording (the abstract says "decreased by", not "mean"). Pages that call the change the "mean eGFR decline" are consistent with the direction.
- `t-pouch-modification.mdx` lists Ahmadi's questionnaire correctly (68%, 4.5 y, 47%/72%, 22.3%, 62.5%, 9.5%) and the abstract matches; it says "male participants from both USC-STAR arms", which the abstract supports only as patients "enrolled in a clinical trial" randomized to T-pouch or Studer.
- Pages and the old Journal Club record call the pouches "Studer-type refluxing" and the trial "settled the reflux debate"; the abstract's conclusion is narrower (T-pouch did not prevent a moderate eGFR reduction at 3 years). Old record: "484" and "-6.4 vs -6.6" match; "added complexity" and "more secondary surgical procedures" are supported only as "increased diversion-related secondary surgery". The old `design: RCT` is correct; it omitted that the trial was single-center and unmasked.
- Registry versus report: ClinicalTrials.gov lists 529 enrolled (actual) and a primary outcome covering renal function, upper-tract anatomy and need for medical or surgical intervention measured 3 years after the last patient enrolled; the report's primary endpoint is eGFR change from baseline to 3 years among 484 randomized. Not stated on the page.
- Pagination: PubMed gives pp 433-439 (used, matches the site pages); Crossref gives 433-440. Ahmadi authors: Crossref/publisher lists Simma-Chiang as third author; PubMed lists six authors without her; the publisher list is used.
- design.phase is "not applicable" (ClinicalTrials.gov); PubMed labels the publication type phase III.
- `verdict: negative` rests on the abstract: the prespecified comparison favored neither arm on the primary endpoint and the T-pouch had more secondary surgery.
