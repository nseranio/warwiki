# SAM trial notes (2026-10-18)

## Sources opened
- Primary report, Enklaar et al., JAMA 2023;330(7):626-635, doi 10.1001/jama.2023.13140, PMID 37581670: FULL TEXT read as the PMC HTML copy (https://pmc.ncbi.nlm.nih.gov/articles/PMC10427949/), including Tables 1 to 3 and the Discussion. No local file (none in reports/audit-v2/sources-local, ~/Documents/Medicine, ~/Downloads or ~/Zotero). The JAMA publisher page (jamanetwork.com) is bot-blocked for direct download; WebFetch summaries of it matched the PMC tables on every number. Crossref (title, authors, volume, pages, issue date 2023-08-15, abstract) cross-checked. `source.file` is null.
- Supplements (eAppendix with the full technique description, eTables 1 to 7) were not opened: POP-Q by compartment, questionnaire scores, operative time, concomitant procedures and loss-to-follow-up details come only from the main text and the PLOS One report. Figure 2 (flow) is an image and was not read.
- Economic evaluation, Schulten et al., PLoS One 2025;20(11):e0336030, doi 10.1371/journal.pone.0336030, PMID 41201997: FULL TEXT (open access PDF, 12 pages), locators are PDF pages.
- Sexual function, Stoter et al., Am J Obstet Gynecol 2026;234(4):1112-1120, doi 10.1016/j.ajog.2025.12.035, PMID 41419154: ABSTRACT only (Europe PMC record); the journal page was not opened. Published online 2025-12-17 (Crossref created date), volume date April 2026. `met` is null for its primary equivalence result for that reason.
- AUGS clinical practice statement, Chang et al., Urogynecology (Phila) 2025;31(5):482-495, doi 10.1097/SPV.0000000000001667: local full text `reports/audit-v2/sources-local/augs-2026-09/the-role-of-uterine-preservation-at-the-time-of-pelvic-organ.txt` (Table 2 grades; Cervical pathology text cites SAM as its ref 21).
- NICE NG123 (local `nice-ng123-ui-pop-women.txt`, recs 1.8.10 and 1.8.11 offer Manchester repair and sacrospinous hysteropexy): published 2019, before SAM, and does not cite it, so left out of the Guidelines section.
- Registry: NTR 6978 (TrialRegister.nl) from the JAMA abstract and PLOS One; no NCT number.

## Reports considered and left out
- SAM protocol, Enklaar/Schulten et al., BMC Womens Health 2019 (PMC6444578): design report, no results; not opened.
- JAMA correction (doi 10.1001/jama.2023.17655, group authorship), JAMA letters (Ye 2023, doi 10.1001/jama.2023.21795) and the authors' reply (10.1001/jama.2023.21798), Nager editorial: not result reports; not opened.
- Tan 2024 (BSUG database, Manchester versus hysteropexy) and meta-analyses: different studies.
- No 5-year SAM report was found; the PLOS One report says extended follow-up is being collected.
- 2026 global consensus statements cited on WARWIKI pages (Gupta et al.; Stoter U-POP) were not opened, so no statement from them is on the page.

## Disagreements with WARWIKI pages
I checked docs/04-surgical-techniques/04g-prolapse-repair/{index,prolapse-repair-principles}.mdx, apical/{manchester-fothergill,sacrospinous-hysteropexy,sacrohysteropexy}.mdx, 03-clinical-conditions/03c-pelvic-support/apical-prolapse.mdx and 01-foundations/anatomy-physiology/genitalia/cervix.mdx. Every SAM number on them matches the source (172/197 and 151/196, 434 randomized and 393 analyzed, 2/212 cervical stenosis, 4/164 abnormal histology with 1 CIN2, 4 severe or persistent buttock pain with 3 suture removals, 82.1% versus 80.0% PGI-I, PISQ-IR 0.09 (0.01 to 0.17) with margin 0.31, de novo dyspareunia 5% versus 13%, 101 and 99 sexually active). Points to be aware of, none a clear error:
- manchester-fothergill.mdx (Outcomes vs Sacrospinous Hysteropexy and Complications): "more posterior POP-Q stage >=2 findings" after Manchester. Table 2 labels the row "stage >2" while footnote c and the Discussion say stage 2 or higher; the source is internally ambiguous. The posterior beyond-hymen figures quoted there (3/195 versus 4/196) are correct.
- manchester-fothergill.mdx line 74: de novo dyspareunia "without a statistically significant between-group difference" follows the abstract; the abstract's own interval (0.1% to 16.5%) excludes zero, so the abstract is internally inconsistent. The page repeats the abstract's wording, not the interval.
- sacrospinous-hysteropexy.mdx line 80: "4 had severe or persistent buttock pain requiring treatment" is right for the text, but Table 3 lists 5/207 (2.3%) buttock pain requiring extra visits or treatment (4 with treatment).
- Source of the 4/164 histology figure: SAM text says "abnormal cervical histology findings, including 1 CIN2" (164 of the Manchester specimens examined); the AUGS 2025 statement paraphrases it as CIN in 4/164 (2.4%). The trial pages state SAM correctly.

## Disagreements with the old Journal Club record
- "The Manchester procedure met noninferiority and outperformed sacrospinous hysteropexy": wrong framing. The tested hypothesis was that sacrospinous hysteropexy is noninferior to the Manchester procedure; it failed (lower CI limit -17.8 versus a -9 point margin), and the authors conclude hysteropexy is inferior on the composite.
- "fewer apical failures/retreatments": the difference was driven by prolapse beyond the hymen in any compartment (86.7% versus 95.9% free), mainly anterior (20/196 versus 5/195). Apical beyond hymen 2/196 versus 0/195 (P 0.48); absence of reintervention 94.0% versus 97.0% (P 0.14) was not significant. Repeat surgery in an operated compartment was 9/207 versus none.
- n 393 is the as-randomized analysis population; 434 were randomized (217 per group, 430 after exclusions).
- "bottomLine ... reviving interest": editorial wording not found in the source. The DOI, journal, year and first author are correct.

## Source inconsistencies kept as published
- Noninferiority P for the as-randomized analysis: 0.63 (Abstract) versus 0.65 (Results text); per-protocol 0.62. File and page quote 0.65 and name the abstract value.
- Table 1 uses 215 per group (after exclusions) while the abstract and flow use 217.
- Table 3: serious adverse events 9 (4.7%) and 11 (5.1%) with column totals 207 and 213 (9/207 = 4.3%, 11/213 = 5.2%); buttock pain 5/207 (2.3%) computes to 2.4%; death row shows "1/207 (0.05)" (typographical, 0.5% elsewhere); the CISC/Foley rows use denominators 36 and 23 that do not match the retention row. Only the first two are in the trial file, as published; the catheter breakdown was left out.
- PLOS One text QALYs 1.67 versus 1.68 (P 0.346, generalized linear model) versus Table 5 total 1.69 versus 1.70 (P 0.42, t-test); file uses the abstract and notes the table.
- PLOS One Table 3 catheter-type numbers differ slightly from JAMA Table 3 (e.g. 24 versus 25 CISC); not used.
- Two Manchester participants lost to follow-up after retreatment: Figure 2 footnote says they were analyzed as not meeting the composite, then says they "did meet the criterion" (for retreatment); the page states they were counted as not meeting the composite.

## Could not verify
- Per-arm operative time, concomitant procedures and anesthesia from the JAMA eTable 4/eAppendix (not opened); operative time and blood loss come from PLOS One Table 3.
- Abstract-only: all numbers from the Stoter 2026 report; whether the abstract's "no significant difference" for de novo dyspareunia in sexually active women is consistent with its 95% CI (0.1% to 16.5%).
- Exact online date of the JAMA paper: Crossref and PMC give issue date 2023-08-15 (Europe PMC lists 2023-08-01); 2023-08-15 used.
- No FDA action applies; no guideline copy other than AUGS 2025 cites SAM.
