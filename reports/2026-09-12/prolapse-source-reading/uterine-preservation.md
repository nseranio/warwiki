# Uterine preservation and supracervical hysterectomy source review

Date: 2026-09-12. Reviewer: Codex subagent `/root/sling_study_tables`. This is a bounded source and page audit, not clinician sign-off or a claim that every cited original trial was read.

## Page scope and edit ownership

Both original pages were read completely, including every reference, before source selection:

- `docs/04-surgical-techniques/04g-prolapse-repair/prolapse-repair-principles.mdx`: 12,171 characters, SHA256 `3ead49f4f1fac4041d7420f3a804bfbd0018728acdeb14131b21848148b99961`. No edits by this agent; `/root/sling_source_read` owns its revision.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/supracervical-hysterectomy.mdx`: original 7,832 characters, SHA256 `fb8223d51e273fcf490398ffa84ddd59bfefbda40cfff6e606b46c1e81d1cbc6`. This was the only repository file edited by this agent.
- Full original backups, including the complete original bibliographies, are in `/tmp/warwiki-uterine-preservation-next/` under `prolapse-repair-principles-original.mdx` and `supracervical-hysterectomy-original.mdx`.
- Final SCH page read completely: 11,513 characters, SHA256 `afa69ca4c3bef4aec19834e39fabec4122330a5748c0948be04fc37c3a2856a5`. All six final references are used. The original video card remains immediately before References; its complete audiovisual content was not reviewed here. No anatomical diagram was embedded on this page.
- `git diff --check` passed for this page. Parent owns integration, lint, typecheck, build, ledger, publication and live validation.

## Corrections implemented in SCH

Removed a fabricated/misattributed 814-patient Mayo comparison, universal exposure and five-year recurrence ranges, a claim that US specialists universally prefer SCH, and the mischaracterization of a route-comparison cohort as a prospective hysterectomy-type comparison. Replaced them with four explicitly identified comparative sources, preserving their different endpoints and follow-up designs.

Removed the unsupported fixed 1–2 cm endocervical thermal-ablation instruction, mandatory permanent-monofilament fixation rule, and guarantee that peritoneal closure prevents bowel obstruction. Sacrocolpopexy dissection and fixation now link to the dedicated technique page. Corrected the blanket claim that power morcellation is no longer used. Clarified screening according to age/history, unresolved bleeding evaluation, possible later stump treatment, and the lack of demonstrated functional superiority from cervical retention. Removed the unsupported uniform 5% spotting estimate and automatic reassurance that bleeding is self-limited.

Public metadata uses `evidenceUpdated` and a narrow `evidenceNote`; no `reviewer` or clinical `lastReviewed` was added. No verbose public evidence banner was restored.

## Uterine-preservation sources

### Ruffolo 2025 — DOI 10.1016/j.maturitas.2025.108755

**Actual read:** complete official PubMed abstract, publication identity and indexed metadata at <https://pubmed.ncbi.nlm.nih.gov/41135410/>. **Not read:** full main, detailed study tables, figures, risk-of-bias assessments or supplements.

The comparison is vaginal **native-tissue** hysteropexy versus vaginal hysterectomy, not mesh hysteropexy or hysterectomy type at SCP. Sixteen studies include 2,544 women (1,180 hysteropexy; 1,364 hysterectomy). The reported pooled estimates do not show significant differences in apical recurrence, global anatomical success, subjective success or reoperation; the confidence intervals do not establish equivalence. Hysterectomy involved longer operations, more blood loss and longer hospitalization. This source cannot support the principles page's generalized claim of reduced **mesh erosion** with uterine preservation. Do not assign a uniform follow-up duration or infer the certainty of each endpoint without the inaccessible main.

Publisher URLs attempted: <https://www.sciencedirect.com/science/article/pii/S0378512225005638> and <https://www.maturitas.org/article/S0378-5122(25)00563-8/fulltext>. Publisher/Elsevier retrieval returned 403. Exact machine responses are in the access logs listed below. Browser retrieval was unavailable; no login or paywall was bypassed.

### Brennand 2025 HUPPS — DOI 10.1016/j.ajog.2024.10.021

**Actual read:** complete official abstract at <https://www.em-consulte.com/article/1740290/hysterectomy-versus-uterine-preservation-for-pelvi>; identity also matched PMID 39428029. **Not read:** complete main, main tables/figures, or supplements. A search-indexed rehost exposed isolated manuscript sections; those are not credited as a full read or used to fill unsupported details.

This was a nonrandomized prospective cohort in which patients chose uterine preservation or hysterectomy: 321 women, 151 versus 170. At one year, apical descent to at least half the total vaginal length occurred in 7.5% versus 17.2%; propensity-weighted adjusted RR 0.35 (95% CI 0.15–0.83). The association does not establish causality or durability. Anatomical/composite outcomes favored preservation, but functional outcomes did not clearly differ. This is native-tissue minimally invasive surgery, not evidence for a cervical-preservation rule at mesh SCP.

ScienceDirect <https://www.sciencedirect.com/science/article/pii/S0002937824010792> and AJOG <https://www.ajog.org/article/S0002-9378(24)01079-2/pdf> returned 403. The observed EM-consulte link <https://www.em-consulte.com/showarticlefile/1740290/main.pdf> returned HTTP 200 with zero bytes, not a PDF. Search-indexed supplement references suggest two eFigures, four eTables and three appendices, but the package was not obtained and that inventory remains provisional.

### Oegema 2026 SAVE U ten-year follow-up — DOI 10.1007/s00192-026-06822-1

**Actual read:** complete publisher HTML narrative, all references/disclosures, and all nine PDF pages' extracted text, including the complete three main tables. HTML: <https://link.springer.com/article/10.1007/s00192-026-06822-1>. PDF: <https://link.springer.com/content/pdf/10.1007/s00192-026-06822-1.pdf>. The web reader exposed the full article; local requests returned challenge HTML. No hash of a successfully retrieved original PDF is claimed.

**Not read:** actual Figure 1 image and the supplemental DOCX. Image/caption text is not visual inspection. The web screenshot tool returned only textual references in this runtime, not an inspectable image. Direct image and DOCX retrieval returned 3,038-byte challenge HTML; the supposed local DOCX was invalid.

The original randomized cohort contained 208 women; 93 returned at ten years (44 sacrospinous hysteropexy; 49 vaginal hysterectomy/uterosacral suspension), with 89 examinations. The primary apical composite occurred in 3/44 versus 7/49; reported risk difference −6.6 percentage points (95% CI −19.9 to 6.7). Attrition, complete-case analysis and incorporation of earlier failures limit inference; nonsignificance is not equivalence. The finding does not generalize to every uterine-preserving operation.

**Internal source discrepancies:** composite-success Table 2 reports difference 17.6 with CI −2.0 to 37.2, while the narrative repeats a different CI. Repeat-POP-operation counts 2/44 versus 9/49 correspond to 4.5% versus 18.4%; the narrative prints 17.4%. Several other Table 2 percentages disagree with their displayed counts. Reported risk differences use Agresti–Coull methods and are not errors merely because they differ from raw percentage subtraction. Avoid copying contradictory estimates.

Observed supplement URL: <https://media.springernature.com/original/springer-static/esm/art%3A10.1007%2Fs00192-026-06822-1/MediaObjects/192_2026_6822_MOESM1_ESM.docx>.

## SCH comparative sources

### Nassif 2022 — DOI 10.1097/AOG.0000000000004901

**Actual read:** complete official abstract at <https://pubmed.ncbi.nlm.nih.gov/35926201/>; **complete one-page actual supplemental PDF** and its text. Full main, main study tables/figures and detailed bias appraisal were not accessible. ResearchGate displayed a request-full-text page, not an available author manuscript.

The abstract reports 19 studies, **10,572** women (4,285 SCH; 6,287 TH), pooled erosion OR 0.26 (95% CI 0.18–0.38). Its 0.36% and 3.8% are median point prevalences across studies, not two universal absolute risks. The main is required to audit study-level material, ascertainment and adjustment. The one-page supplement contains search headings and database counts only; it cannot replace the main or verify its pooled calculations.

Supplement: <https://cdn-links.lww.com/permalink/aog/c/aog_140_3_2022_07_05_nassif_22-673_sdc1.pdf>. Local PDF 45,061 bytes, SHA256 `f358ccef233f33b5e55a4f49772d9cf15e08fcbb48ac405b25642a308b838374`; text SHA256 `694033a97f77930649ee2aa5b4be2e99873918c92dd6705234dee1fedf8396a3`. Actual page inspected at `/tmp/warwiki-uterine-preservation-next/Nassif-supplement-page1.png`.

### Dallas 2022 — DOI 10.1097/JU.0000000000002262

**Actual read:** complete MEDLINE abstract from the locally saved Europe PMC metadata; matched primary journal page. **Not read:** full main, original tables/figures or supplements. Official PDF <https://www.auajournals.org/doi/pdf/10.1097/JU.0000000000002262> returned 403, and the official page states no access. No accessible author PDF was found.

California administrative cohort: 12,189 MISC operations, 8,398 concomitant hysterectomies (3,371 SCH; 5,027 TH). Outcome is mesh-complication **reoperation**, not all vaginal exposures. SCH/TH rates were 0.7%/3.1% at approximately three-year mean follow-up; adjusted OR for TH 4.20 (95% CI 2.72–6.50). The observed association cannot establish that cervical removal caused every excess event. The four-year subgroup should not be presented as whole-cohort fixed-time risk.

### Kikuchi 2023 — DOI 10.1007/s00192-022-05263-w

**Actual read:** complete official abstract and accessible reference/appendix inventory at <https://link.springer.com/article/10.1007/s00192-022-05263-w>. Full main is explicitly subscription-restricted. **Not read:** full main, three actual figures, detailed main tables or two DOCX supplements. The page also identifies an appendix coding table; it was not opened/read here.

MarketScan cohort: 3,463 women with at least two-year follow-up (910 SCH; 1,243 TH; 1,310 no hysterectomy). Prolapse reoperation and coded mesh outcomes were not significantly different for SCH versus TH; 0.9% of SCH patients later underwent a cervical procedure. This supports distinguishing low coded event rates from absence of exposure on serial standardized examinations, and from proof of equivalence.

### Glass Clark 2024 — DOI 10.1007/s00192-023-05658-3

**Actual read:** complete official abstract and accessible references at <https://link.springer.com/article/10.1007/s00192-023-05658-3>. Full main is explicitly subscription-restricted. **Not read:** main methods/results/discussion, detailed tables or actual Figure 1. No independent supplement was identified in the accessible page.

Premier cohort: 17,111 women; two-year coded exposure 47/6,708 SCH versus 65/10,403 TH, with no significant difference. Prolapse reoperation was 1.4% in each group. Coding-based ascertainment and baseline differences preclude a universal biological conclusion. Do not present the abstract's inverse association with obesity as a protective intervention or treatment recommendation.

## Lethaby 2012 Cochrane — DOI 10.1002/14651858.CD004993.pub3

**Complete source read achieved:** <https://pmc.ncbi.nlm.nih.gov/articles/PMC13006861/>. All **123,041 Unicode characters** of extracted article text were read in the following non-overlapping, untruncated Python slices: `[0:15000]`, `[15000:30000]`, `[30000:45000]`, `[45000:62000]`, `[62000:82000]`, `[82000:102000]`, `[102000:123041]`. Beginning: journal/title/author material. End: complete additional references through Zekam 2003 and the Wiley provider footer. This includes the full narrative, summary-of-findings table, all data-analysis tables, all nine included-study tables, excluded/awaiting-study tables, all references, search appendix, history, author contributions and disclosures.

HTML 354,712 bytes SHA256 `3352c06ae8909dc0c71cec45071921f2f7692f676e2e4e678a5eac8aff78d6d2`; extracted text 124,216 UTF-8 bytes SHA256 `35fc684edcf1b2cd19ad1620d4fab606f48dbc1d6720cc58d65fcf332a1e59da`.

**All 29 actual image assets visually read:** two bias graphics and 27 analysis forest plots, ordinals 01–29, IDs `CD004993-fig-0001` through `CD004993-fig-0029`. Complete URL/path/caption/byte/hash inventory: `/tmp/warwiki-uterine-preservation-next/lethaby-figures/inventory.json`. Every download had a valid JPEG signature. No independent external supplemental attachment was identified; the source's search appendix is inside the main and was read. Reading a Cochrane study table does not count as reading the original trial publication.

Clinical interpretation: nine trials, 1,553 women, mostly benign bleeding/fibroid indications; several excluded symptomatic prolapse. The evidence search ended July 2011. It does not establish better urinary, bowel or sexual function with retained cervix, and shows increased ongoing cyclic bleeding. It is not an SCP hysterectomy-choice trial package. Blinding was generally absent and many endpoints were underpowered. Nine-year data arise from one trial with substantial attrition. Zero-study rows are not evidence of zero events. Cancer safety cannot be established from absent trials or inadequate follow-up.

**Source-level audit observations:** narrative counts understate the number of contributing studies for short-term SUI (actual plot/table 5), incomplete emptying (4), and urgency (2). The narrative's laparoscopic length-of-stay CI is misprinted as entirely negative; Table/plot 1.20 correctly has −0.62 to +0.22. Physical-domain QoL CI is −2.18 to 1.14 in plot/table, not the narrative's −21.8. General QoL MD is 0.35 in plot/table, not the narrative's 0.30. Short/long stool-incontinence plots repeat the same Thakar counts (1/81 vs 2/85); originals would be needed to resolve that apparent timepoint duplication. Summary-of-findings cells retain publication placeholders. None of these uncertain secondary estimates was propagated into the page.

## FDA primary guidance

Complete safety-communication page read, including patient/provider recommendations, containment limitations and FDA actions: <https://www.fda.gov/medical-devices/safety-communications/update-perform-only-contained-morcellation-when-laparoscopic-power-morcellation-appropriate-fda>. Page issued December 29, 2020; checked September 12, 2026. No external linked device-labeling document is claimed read. It directly contradicts the original blanket power-morcellation ban. The page now follows its selection and containment restrictions and avoids implying that containment abolishes dissemination risk.

## Original bibliography preserved and reconciled

| Original SCH reference | Disposition and exact limitation |
|---|---|
| 1. Tan-Kim 2011 robotic/laparoscopic comparison, supplied DOI `10.1097/SPV.0b013e3182000a0d` | Removed from SCH. Correct DOI for the named article is `10.1097/SPV.0b013e3181fa44cf`, PMID 22453672. Complete official abstract read: a retrospective 104-patient route comparison, not SCH versus TH. The originally supplied DOI was not validated. Do not substitute the separate Tan-Kim mesh-risk article silently. Original full main not read here. |
| 2. Nygaard 2013 E-CARE, DOI `10.1001/jama.2013.4919` | Removed from the hysterectomy-comparison claim. Parent/peer are reading this independently; no personal full-read credit here. Trial randomization concerned concomitant Burch, not hysterectomy type. Original reference retained in backup/register. |
| 3. Berner 2014, DOI `10.1016/j.jmig.2013.10.011` | Identity and full official abstract verified, PMID 24177452. Prospective observational study of pelvic pain/satisfaction in 113 premenopausal women, not a randomized cervical-ablation comparison. Does not support the fixed ablation depth or uniform 5% spotting claim in the accessible abstract. Full main not read. Removed from SCH. |
| 4. Claimed Linder 2018, DOI `10.1097/SPV.0000000000000451` | DOI belongs to Bradley's uterosacral-suspension suture cohort, not the cited Linder paper. Correct Linder identity: 2017;23(1):13–16, DOI `10.1097/SPV.0000000000000326`, PMID 27636221. Complete abstract read: 132 robotic SCPs using absorbable fixation, not an 814-patient SCH/TH comparison. Removed from SCH. Neither complete original main was read here. |
| 5. Brubaker 2008 CARE two-year study, DOI `10.1097/AOG.0b013e3181778d2a` | Removed from the fabricated five-year SCH/TH recurrence estimate. Its stated follow-up is two years and randomized comparison is Burch versus no Burch. Parent owns any separate source-read credit. |
| 6. Lethaby 2012 | Retained as final reference 5, now supported by the complete main and all actual graphics described above. |

All original principles references are likewise preserved verbatim in its original backup and the accompanying JSON register. The principles owner received source limitations and correction recommendations directly; this agent did not edit that page.

## Access record and remaining gaps

Local logs: `access.json`, `alternative-access.json`, `em-saveu-access.json`, `more-access.json`, `supporting-access.json` in `/tmp/warwiki-uterine-preservation-next/`. Successful HTTP status alone was not treated as access: empty responses and HTML challenges were rejected as papers/images. Exact failed original paths are retained in these logs. Browser entry returned “No browser is available”; no repeated account/sign-in attempts were made.

Remaining: Ruffolo main/package; Brennand main/package; SAVE U actual Figure 1 and supplemental DOCX; Nassif main/graphics/tables; Dallas main/package; Kikuchi main/tables/graphics/supplements/coding appendix; Glass Clark main/tables/figure; complete original Tan-Kim/Berner/Linder articles if those become necessary for another page. Abstract-based corrections are deliberately recorded as such and do not close these source gaps.
