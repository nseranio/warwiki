# OPEN: notes

## Sources opened

| Report | Identifier | What was read | Level |
|---|---|---|---|
| Primary (Goulao 2020, Eur Urol) | DOI 10.1016/j.eururo.2020.06.003, PMID 32636099 | Accepted manuscript (CC BY-NC-ND), `eurUrol_OPENdraft_13_NoTrack.pdf`, from https://aura.abdn.ac.uk/bitstreams/29a5c02a-4dce-4b3c-9228-c3803de089f7/download (Aberdeen AURA; 28 pages, all text, Tables 1-4 and supplementary tables 1-3). Locators are "AM PDF p" (page of that PDF). The typeset journal pages were not available, so journal page numbers are not given. PubMed abstract (efetch) matches the manuscript abstract. `source.file` is null (downloaded to a scratch folder, not kept). | full-text |
| NIHR HTA monograph (Pickard 2020) | DOI 10.3310/hta24610, PMID 33228846, PMC7750862 | PMC page: abstract, plain-language summary and reference list only. The full monograph (Bookshelf NBK564461) returned a reCAPTCHA page, journalslibrary.nihr.ac.uk returned 403, and Europe PMC full-text XML returned 500; not retried. | abstract |
| Cost-effectiveness (Shen 2021, BMC Urol) | DOI 10.1186/s12894-021-00836-1, PMID 33941140, PMC8094457 | Open-access full text via Europe PMC XML (abstract, methods, Tables 1-4, discussion). | full-text |
| AUA Urethral Stricture Disease guideline (published 2016, amended 2023) | local `reports/audit-v2/sources-local/aua-urethral-stricture-2023-unabridged.txt` (statement 11a/11b, discussion lines ~905-995) and `aua-stricture-amendment-2023.txt` (J Urol 2023;210(1):64-71, DOI 10.1097/JU.0000000000003482) | statements, discussion and references | local guideline copy |
| EAU Guidelines on Urethral Strictures 2026 | local `reports/audit-v2/sources-local/eau-urethral-strictures-2026.txt` (sections 6.2.1.a.2, 6.2.1.c.5, 6.2.1, 6.2.2.b) | text and recommendation table | local guideline copy |

DOIs and bibliographic details of all three reports and the AUA amendment were checked against Crossref and PubMed (authors, year, journal, volume, issue, pages). Online dates: Eur Urol epub 2020-07-04 (PubMed ArticleDate); HTA Crossref/PMC give month only (2020 Nov), so the file uses 2020-11-01 with `dateApprox`; BMC Urol 2021-05-03. Registry: ISRCTN98009168 (no NCT number, so `nct` is null and `registry` is set); the registry page itself was not opened.

## Reports considered and left out

- Stephenson 2015 protocol (Trials 16:600, PMC4697334): not opened; the trial design is taken from the primary report.
- Whybrow 2017 (Trials 18:140), recruitment and equipoise qualitative study: not opened; not needed for results.
- Time trade-off utilities (Pharmacoecon Open 2019, PMC6861395): not opened; methods paper for cost-effectiveness.
- Eur Urol correspondence (Bansal et al. and the authors' reply, 2021; PMIDs 33143950, 33218824, 33293080): not opened.
- No long-term follow-up beyond the 24-month symptom outcome and the 24-48 month reintervention follow-up exists as a separate report.
- The HTA monograph is included at abstract level only; its detailed tables could not be read, so nothing beyond the abstract is quoted from it.

## Disagreements and inconsistencies in the sources (not WARWIKI)

- Primary report, internal: the Results text says the 12-24 month flow-rate comparison used 44 versus 63 participants; Table 2 gives 18/93 (19%) versus 13/104 (13%). The file follows Table 2 and notes the text.
- Primary report, internal: the Discussion gives serious adverse events of 10.9% versus 11.3%; Table 4 gives 7/82 (8.5%) versus 10/115 (8.7%). The file and page use Table 4 (the EAU guideline also gives 8.5% and 8.7%).
- Primary report, internal: Results says 1,262 men were identified; supplementary Table 1 totals 1,249 (page uses 1,262, the text figure).
- Primary report, internal: the percentages in the text (63% and 81%) do not match 69/108 and 90/112 (63.9% and 80.4%); they match the monograph's denominators 109 and 113 (63%, 80%). Counts are used instead of percentages.
- Primary report, internal: the sexual-function scale is 1 (very dissatisfied) to 5 (very satisfied) in Methods but reversed in the Table 1 footnote. The file records the direction conflict and the page states only that the groups did not differ.
- HTA monograph abstract: 95% CI for the primary difference is -1.78 to 1.02; the Eur Urol report prints -1.74 to 1.02. Both files keep their own source's value.
- HTA abstract: 109 and 113 allocated; the primary report's tables use 108 and 112 after two post-randomization ineligibility exclusions.
- The primary report abstract (accepted manuscript) says "ICIQ voiding symptom score"; the published PubMed abstract and Methods say the voiding symptom score from the stricture-surgery PROM (Jackson 2011). The page uses the latter.
- AUA guideline discussion (2023): describes OPEN as enrolling men with stricture "<2 cm in length"; the primary report has no length criterion (mean length 2.0 and 1.7 cm, recorded in 130 of 220 men). The same text states recurrence as "39% experienced a recurrence versus 19%", but the paper reports 39 and 19 men (39/112 = 34.8%; 19/108 = 17.6%). The page does not repeat either point.
- EAU 2026 text gives reintervention as 13.8% versus 25.9%; the counts (15/108, 29/112) give 13.9% and 25.9%.

## Disagreements with WARWIKI pages

- `docs/01-foundations/tools/instruments/sounds-bougies/sachse-urethrotome.mdx` line 94: "voiding symptom scores improved similarly over 24 months after cold-knife urethrotomy and urethroplasty". The control arm was urethrotomy generally, not cold knife only: 105 of the 115 men who received an endoscopic procedure had optical cold-knife urethrotomy, 1 hot-knife, 9 dilatation (AM PDF pp25-26, Supplementary Table 2). The same sentence's 222 randomized, 15 versus 29 reinterventions and HR 0.52 (0.31-0.89) match the source.
- `src/data/evidence-registry.json` entry `open-2020`: `followUp: "24 months"` and the reintervention endpoint timepoint "24 months". Symptoms were followed 24 months, but time to reintervention used the full available observation, at least 24 and up to 48 months (AM PDF p8). The `sampleSize.analysis` text "109 assigned urethroplasty and 113 urethrotomy" matches the monograph abstract (the primary tables use 108 and 112).
- `docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx` (lines 322, 356, 368, 422) and `docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu.mdx` (lines 122, 139-150): statements (similar symptom improvement, fewer reinterventions, HR 0.52 with 95% CI 0.31-0.89, higher cost) agree with the sources. The dviu.mdx row "Cost over 24 months ... Urethrotomy appeared more cost-effective" agrees with the BMC Urol analysis. No numeric disagreement found. Both pages cite the monograph (hta24610) for the Eur Urol results as well; the monograph abstract confirms HR 0.52 (0.31-0.89) and the two-versus-five complication figure only.
- `docs/01-foundations/tools/instruments/sounds-bougies/otis-urethrotome.mdx` refs 15 and 16 are duplicate protocol citations (OPEN protocol v1.8) and are not the published trial; not a numeric issue.

## Disagreements with the old Journal Club record

- Journal: "Health Technol Assess / Lancet". The primary report is in European Urology (2020;78(4):572-580); the HTA monograph is the second report. There is no Lancet report that I found.
- Authors "Pickard et al.": Pickard is first author of the HTA monograph and last author of the Eur Urol paper (he died July 24, 2018); the Eur Urol first author is Goulao.
- DOI 10.3310/hta24610 is the monograph, not the primary report (10.1016/j.eururo.2020.06.003).
- "Symptom scores were similar at 24 months": the primary endpoint was the 24-month area-under-the-curve profile, with the mean difference -0.36 (95% CI -1.74 to 1.02).
- "Reintervention was substantially lower": HR 0.52 (0.31-0.89); 15 versus 29 men; this was the trial's main clinical outcome. The old record omits the cost result (urethroplasty about £2,148 dearer, similar QALYs) and the loss of 39 of 108 urethroplasty-arm men from the primary analysis.
- n 222 and the comparison agree with the source.

## Could not verify

- HTA monograph full text (captcha/403/500); only its abstract was read. Surgeon volume, technique standardization, catheter duration, length of stay and other operative detail that the monograph may contain are not on the page.
- Typeset Eur Urol page numbers for tables (AM PDF locators used).
- ISRCTN registry entry and FDA material were not consulted (no FDA statement is relevant).
- The EAU recommendation on repeated DVIU (strong) is quoted from the local guideline copy; its supporting references are [240] and [241] in that document, not OPEN, so the page presents it as a related recommendation, not as resting on OPEN. The AUA statement 11a discussion explicitly cites OPEN.
