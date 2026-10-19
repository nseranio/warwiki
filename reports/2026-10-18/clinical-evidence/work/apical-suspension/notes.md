# apical-suspension (ASPIRe): notes

## Sources opened

- Primary report, full text: Menefee SA et al., JAMA Surg 2024;159(8):845-855, doi 10.1001/jamasurg.2024.1206, PMID 38776067. Local PDF `/Users/joyboy/Downloads/jamasurgery_menefee_2024_oi_240026_1723061378.18838.pdf` (11 pages, the version "Corrected on July 10, 2024", Figure 2 color labels). Read in full; Supplements 1-2 (eTables 1-12, protocol, SAP) not available, so values quoted from eTables in the main text (retreatment, failure reasons, dyspareunia, conversions) are cited to the main-text page. A second copy of the text exists at `reports/audit-v2/sources-local/pdfs-2026-10-06/menefee-2024-jama-surg-aspire.txt` (not used).
- PubMed efetch XML (abstract level) for PMID 39922444 (Andy 2025, body image; doi 10.1016/j.ajog.2025.01.042, AJOG 233(3):182.e1-182.e12, epub 2025-02-06) and PMID 41213491 (Erekson 2026, frailty; doi 10.1016/j.ajog.2025.11.002, AJOG 234(3):689-729, epub 2025-11-08). Authors, volume, issue, pages and DOIs confirmed against Crossref (page range 689-729 is as Crossref and PubMed print it). Both abstract only.
- Crossref and PubMed for the primary report: volume, issue, pages, online date 2024-05-22 (PubMed entrez/pubmed date), DOI resolves. PubMed lists an erratum (JAMA Surg 2024;159(8):960, doi 10.1001/jamasurg.2024.2789), the July 10, 2024 Figure 2 label correction already incorporated in the PDF read; a commentary is JAMA Surg 2024;159(8):855, doi 10.1001/jamasurg.2024.1207 (not read).
- Registry: NCT02676973 (matches the paper).
- Guideline copies searched for a citation of ASPIRe: AWMF S3 015-006 Descensus genitalis v6.0 (March 2026; no Menefee 2024 or JAMA Surg 2024 reference), NICE NG123 (2019, predates), ACOG PB 214 (2019, predates), AUGS uterine-preservation statement (Urogynecology 2025; no ASPIRe reference). None cites the trial, so the page has no "Guidelines and approvals" section. The FDA's April 2019 halt on transvaginal mesh kits is stated in the trial report and used only there (not cited to fda.gov, which was not opened).

## Reports considered and left out

- Design paper (Menefee SA et al., Female Pelvic Med Reconstr Surg 2020;26(7):415-424, doi 10.1097/SPV.0000000000000803, PMID 31860566): protocol only, no results; not opened.
- Patient Perspectives in Adverse Event Reporting substudy (Sung VW et al., Am J Obstet Gynecol 2024;231(2):268.e1-268.e16, doi 10.1016/j.ajog.2024.04.043, PMID 38710268): abstract read; clinician and patient severity grading agreed poorly (kappa 0.24); not a surgical-decision result, so left out. PPAR design paper (PMID 32487881) not opened.
- JAMA Surg erratum and commentary: not results.
- ClinicalTrials.gov lists an extension to 10 years; no results posted that I opened, so no long-term report is included.

## Judgement calls

- `design.n` is 376 randomized; arm `n` values are treated participants (123 native tissue, 121 sacrocolpopexy, 116 mesh = 360) because the main text gives no per-arm randomized counts (they are in the CONSORT supplement). The arm sizes therefore do not sum to `design.n`; the population sentence says so.
- Arm keys are `scp`, `tvm`, `ntr` (three arms); native tissue has role `control`.
- Verdict `mixed`: the trial met two of three primary hypotheses (sacrocolpopexy superior to native tissue; mesh noninferior to sacrocolpopexy) and missed the third (mesh superior to native tissue, adjusted alpha 0.01).
- The three primary comparisons are separate `primary` results with `met` set per the prespecified alpha (0.01, 0.03). The noninferiority HR carries no `ci` (the paper reports only the upper one-sided 97% limit, 1.65).
- Relations: `optimal` (the native-tissue arm allowed the two operations OPTIMAL compared; the trial itself was not opened) and `super` (ASPIRe's discussion cites SUPeR's Uphold results; SUPeR not opened). Both typed `parallel`.
- Secondary reports are abstract-level; their results use roles `secondary` so no `met` is required.

## Internal inconsistencies in the primary report (kept as printed)

- Abstract gives P = .01 for sacrocolpopexy versus native tissue; Results text and Table 2 give P = .008. The file uses 0.008.
- Abstract and text give adjusted HR for mesh versus sacrocolpopexy noninferiority as "97% CI, 0-1.65"; Table 2 and Figure 2 give "upper CL 1.65".
- Operation counts (native tissue 134, sacrocolpopexy 113) differ from safety denominators (125, 120, 115) and from the treated arm sizes (123, 121, 116); the conversion denominators (7/129 sacrocolpopexy, 5/121 mesh "cases") also do not reconcile with those. All printed as in the paper, labeled by the quantity they describe.
- Table 2 prints sacrocolpopexy cumulative failure as 38/119 (32%, MITT-NTR, vs native tissue) and 38/121 (31%, full MITT, vs mesh); the file reports the 38/119 figure alongside mesh 37/116 and native tissue 55/123.

## Disagreements with other WARWIKI pages

None are clear numeric errors; the following are wording differences to check:

- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-ligament-fixation.mdx` line 93: "358 contributed to the primary analysis". The CONSORT diagram shows 360 in the primary analysis (123/121/116); 358 is the MITT-NTR population (excludes the 2 switched from sacrocolpopexy to mesh) used for the two superiority comparisons (Table 2). Locator: PDF pp4,7.
- `docs/05-special-populations/05f-lifelong-care/geriatric-urology.mdx` and `docs/01-foundations/perioperative-care/preoperative-assessment/frailty.mdx` quote frailty-substudy numbers beyond the abstract (36-month failure 49% versus 28%; 30-day complications 62/145; 145 analyzed; 7/36 versus 5/85; 20/48 versus 42/97). I read only the abstract (146 participants, aHR 2.1 [1.2-3.6], 19% versus 6%, P = .04), which agrees with those pages; the extra figures are unverified by me.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrocolpopexy.mdx` line 88: "Prior prolapse mesh or grafts and several higher-risk conditions were excluded". Prior mesh/biologic augmentation and prior sacrospinous fixation are in the main text (PDF p2); the other exclusions are in eTable 1 (not available to me).
- All other ASPIRe statements on the pages checked (index.mdx, prolapse-repair-principles.mdx, mesh-graft-augmented-repairs.mdx, apical-prolapse.mdx, pelvic-organ-prolapse.mdx, michigan-four-wall.mdx, uterosacral-ligament-suspension.mdx, vaginal-mccall-culdoplasty.mdx, shawn-menefee.mdx) agree with the source: 376/360; 28%/29%/43%; aHR 0.57 (99% CI 0.33-0.98), P = .008; mesh aHR 0.60 (0.34-1.03); mesh exposure 4/120 and 6/115; UTI 17/120, 43/125, 42/115; retreatment 5/120, 8/118, 3/113 (P = .33); native tissue 110/134 SSLF and 24 USLS; 296 (82%) complete; 294/670 and 181/622 visits; 301/360 final exam; operative time 90 minutes shorter in vaginal arms.

## Discrepancies with the old Journal Club record

- `n: 360` is the number operated; 376 were randomized.
- "Failure 28% / 29% / 43%" are modeled adjusted 36-month probabilities (crude cumulative failure was 32%, 32%, 45%).
- "Mesh complications low (3-5%)" is vaginal mesh exposure only (3% sacrocolpopexy, 5% transvaginal mesh); native-tissue repair had suture exposure in 14% at 12 weeks.
- "Transvaginal mesh noninferior to sacrocolpopexy" holds in the per-protocol population (aHR 1.05, upper limit 1.65, margin 1.93); the record omits that the superiority of mesh to native tissue was met only in the supportive per-protocol analysis.
- Record title "three-arm comparison" and DOI are correct; journal, year and authors agree.

## Could not verify

- Supplements (eTables 2-12, protocol, SAP, eFigures): not accessible, so per-arm randomized counts, eTable 8 secondary rates and exclusion criteria beyond the main text are not independently checked.
- Frailty and body-image reports: abstract only, no locators beyond "abstract".
- PubMed/Crossref reachable; no source failed to open.
