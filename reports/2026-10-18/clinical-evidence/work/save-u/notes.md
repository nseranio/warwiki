# SAVE-U notes

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| Detollenaere 2015, BMJ 351:h3717 (primary, 12 months) | DOI 10.1136/bmj.h3717, PMID 26206451, PMC4512203 | Europe PMC full-text XML (open access), tables and text | full text |
| Schulten 2019, BMJ 366:l5149 (5-year observational follow-up) | DOI 10.1136/bmj.l5149, PMID 31506252, PMC6734519 | Europe PMC full-text XML (open access) | full text |
| Oegema 2026, Int Urogynecol J (10-year) | DOI 10.1007/s00192-026-06822-1, PMID 42593503 | PubMed abstract via E-utilities | abstract only |
| Chang 2025, AUGS Clinical Practice Statement, Urogynecology 31(5):482-495 | DOI 10.1097/SPV.0000000000001667 | local copy `reports/audit-v2/sources-local/augs-2026-09/the-role-of-uterine-preservation-at-the-time-of-pelvic-organ.txt` (Table 2 and text) | full text |
| NICE NG123 | local `reports/audit-v2/sources-local/nice-ng123-ui-pop-women.txt` | read recommendations 1.8.8 to 1.8.13 and the committee discussion | not used (see below) |

Limits: the 10-year paper (Springer, open access CC BY) could not be opened. link.springer.com returns a bot challenge (Client Challenge) to curl and a cookie-authorization redirect to WebFetch, doi.org redirects there, and the paper is not in PMC or Europe PMC full text. Only the PubMed abstract was read, so the 10-year Result rows carry `met: null`, no harms, and no denominators beyond those in the abstract (3/44, 7/49; posterior failure given only as percentages). No local PDF copy exists in `/Users/joyboy/Downloads`, `/Users/joyboy/Documents/Medicine` or `sources-local` (searched by DOI text and file name). The three trial reports have `source.file: null` because they were read online; the 2015 and 2019 locators are table and section names (PMC text has no PDF page numbers).

DOIs, volumes, pages and author lists of all four references were checked against Crossref and PubMed (the 10-year paper has no volume or pages yet; it is cited as published online August 13, 2026).

## Reports considered and left out

- Detollenaere 2016, J Sex Med (PMID 26805940; sexual function secondary analysis, DOI 10.1016/j.jsxm.2015.12.006): not opened. The 12-month and 5-year reports already give PISQ-12 results.
- Schulten 2022, Am J Obstet Gynecol (PMID 35439530, DOI 10.1016/j.ajog.2022.04.017; risk factors for recurrence in the SAVE-U cohort): post hoc risk-factor analysis, not opened, does not change the comparison.
- Detollenaere 2011 BMC Women's Health (PMID 21324143) and 2014 (PMID 25231240): protocol papers, not opened.
- NICE NG123 (2019): its recommendations on sacrospinous hysteropexy do not cite SAVE-U (the committee text says no evidence compared the procedures and refers to very limited evidence), so no guideline entry was written. No EAU or AUA/SUFU document under `sources-local` covers uterine prolapse surgery. No FDA statement applies.

## Relations

Only `super` is listed (parallel; same hysterectomy plus uterosacral suspension control, mesh-augmented hysteropexy per the old Journal Club record; neither SUPeR paper was opened). A relation to `sam` is not valid in this direction (SAM is later, so SAM's file should carry `builds-on` -> `save-u`; the 5-year paper confirms the Manchester-versus-hysteropexy trial NTR 6978 was starting, and the JAMA 2023 SAM paper shares authors Schulten and van Eijndhoven). `optimal` was not linked: the 2015 paper's discussion mentions a trial of uterosacral versus sacrospinous vault suspension but I did not confirm it is OPTIMAL.

## Disagreements with the old Journal Club record

- Citation mix-up: the record cites "Detollenaere et al. (5-yr Schulten)", year 2015, with DOI 10.1136/bmj.l5149. That DOI is the 2019 5-year report (Schulten). The 2015 primary report is 10.1136/bmj.h3717.
- "Hysteropexy was noninferior, with similar apical recurrence at 1 and 5 years": at 12 months apical failure was 0/102 versus 4/100 (noninferior); at 5 years apical failure was 1/102 (1%) versus 8/102 (7.8%), difference -6.7 points (95% CI -12.8 to -0.7), i.e. lower after hysteropexy, not "similar" (time-to-event analysis showed no difference).
- "Faster return to work": not reported. The 2015 paper reports recovery index-10 scores that did not differ at weeks 1, 2, 4 and 6, and hospital stay of 3 days in both arms (Table 4, Table 6). Operating time was shorter (59 versus 72 minutes), as the record says. Blood loss did not differ (202 versus 209 mL).
- n = 208 and population are correct. "Primary outcome: recurrent apical prolapse (with bother) to 5 years" omits "or repeat surgery" and that the primary timepoint of the original trial was 12 months.

## Disagreements and checks on other WARWIKI pages

Pages searched: `grep -rln "SAVE-U" docs`. Findings against sources:

- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-hysteropexy.mdx`, five-year paragraph (line 56): 1/102, 8/102 (7.8%), difference -6.7 (-12.8 to -0.7), composite 89/102 versus 77/102, anterior 41/102 versus 36/101, beyond-hymen 6/102 versus 8/101: all agree with Schulten 2019 Table 2 (Table 2, Results). No disagreement. The same paragraph's ten-year posterior denominators 5/43 and 24/46 cannot be checked from the abstract (percentages 11.6% and 52.2% and the difference agree).
- Same page (line 25) and lines 33 to 39: eligibility, posterior approach, two permanent sutures at least 2 cm from the ischial spine, right-sided fixation: agree with Detollenaere 2015 Methods.
- `apical-prolapse.mdx` line 103: "original trial randomized 208; extended primary endpoint available for 93 (44; 49), with 89 examinations": 44 + 49 = 93 matches the abstract; "89 examinations" is not in the abstract (unverifiable here). Rest agrees with the abstract.
- `vaginal-hysterectomy.mdx` line 15, `uterosacral-ligament-suspension.mdx` line 27, `04g-prolapse-repair/index.mdx` line 42, `prolapse-repair-principles.mdx` line 68, `pelvic-organ-prolapse.mdx` lines 289 to 293: 3/44, 7/49 and -6.6 (-19.9 to 6.7) agree with the abstract. "Prespecified endpoint" and "only 93/208 had long-term follow-up" are consistent with the abstract (93 = 44 + 49).
- Nothing on these pages cites the 12-month report's secondary findings (operating time, buttock pain 9/103, retention 15/103); the hysteropexy page's buttock-pain section cites SAM only.
- Source-to-source difference: the AUGS 2025 statement (text on SSHP) reports that Dietz et al found apical recurrence of 3% after hysterectomy with uterosacral suspension versus 27% after hysteropexy; the SAVE-U 2015 paper reports 7/34 (21%) versus 1/31 (3%). The page avoids the numbers.

## Arithmetic and printing notes

- Schulten 2019 Table 2 prints composite success for hysterectomy (LOCF) as 77/102 (76%); 77/102 is 75.5% (75.49). The source's printed 76% (and the abstract's "87% v 76%") is kept in the file and the page.
- 2015 Table 1 baseline stage distribution is for 100 and 103 patients in the overall-stage row; the page uses only the uterine point C stage rows (103 and 105).
- The 2015 Table 4 lists surgeon rows without denominators; the file gives counts only (3 and 19 residents).
- The 2015 Table 3 gives the hysterectomy denominator as 100 (intention-to-treat last observation carried forward) for the primary outcome and 102 for repeat surgery rows; both printed as in the source. The "hysterectomy after hysteropexy by 12 months" row uses the source's 2/100.
- Percent values were recounted against numerators and denominators; every printed percentage matches rounding except the 77/102 item above.
- Effect rows are percentage-point risk differences (hysteropexy minus hysterectomy), as printed in the source with Agresti-Coull intervals. The 5-year `met: true` on the primary row follows the 7-point margin (upper limit -0.7); the 5-year paper does not restate the margin.

## Not verified

- 10-year paper beyond the abstract: methods, attrition reasons, harms, and the sample size analysis.
- Whether the SUPeR and SAM pages will describe themselves as the page's one-line comparison says; those trials were not opened.
