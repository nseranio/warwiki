# SUPeR notes (2026-10-18)

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| Primary, JAMA 2019 | DOI 10.1001/jama.2019.12812, PMID 31529008 | PMC6749543 (abstract and key points only; no body in PMC); publisher page `jamanetwork.com/journals/jama/fullarticle/2749873` read through WebFetch (two passes, a summarizing fetch tool, not raw text) | recorded `full-text`, see caveat 1 |
| JAMA erratum | DOI 10.1001/jama.2021.0535, PMID 33591329 | PubMed and PMC7887652 records (title only; no erratum text available); the publisher page states the correction date and that Results, tables and figures were corrected | `abstract` |
| 5-year, AJOG 2021 | DOI 10.1016/j.ajog.2021.03.012, PMID 33716071 | PMC8328912, NIH author manuscript, full text via NCBI efetch | `full-text` (manuscript, no page numbers; locators are tables and sections) |
| Risk factors, AJOG 2023 | DOI 10.1016/j.ajog.2022.07.048, PMID 35931131 | PMC9790026, NIH author manuscript, full text | `full-text` |
| Design, FPMRS 2016 | DOI 10.1097/SPV.0000000000000270, PMID 27054798 | PMC4919185, NIH author manuscript, full text (Tables 1 to 3) | `full-text` |
| 10-year, JAMA Surg 2026 | DOI 10.1001/jamasurg.2026.2263, PMID 42340704 | PubMed abstract (PMC13294817 is embargoed, release 2027-06-24) | `abstract` |
| AUGS Clinical Practice Statement 2025 | DOI 10.1097/SPV.0000000000001667 | Local copy `reports/audit-v2/sources-local/augs-2026-09/the-role-of-uterine-preservation-at-the-time-of-pelvic-organ.txt` (Table 2; recommendation 1; SUPeR paragraph) | full text |
| FDA | fda.gov Urogynecologic Surgical Mesh Implants page (April 16, 2019 order) | WebFetch and fda.gov search result | page text |
| Registry | ClinicalTrials.gov NCT01802281 | API (n=183, enrollment 2013-04, completed 2025-03) | registry |

All `source.file` values are null (nothing was read from a local file for the trial reports). DOIs and PMIDs were resolved on Crossref and PubMed; authors, years, volume and pages match PubMed. DOI 10.1001/jama.2019.12812 has 12 PubMed authors, 10.1016/j.ajog.2021.03.012 has 11.

## Caveats on what could not be opened or verified

1. **Primary JAMA 2019 report.** The PDF and the publisher HTML are behind Cloudflare for scripted requests (not bypassed); the Unpaywall PDF link also returned a challenge page. PMC holds only the abstract. The Results, Table 2 and Table 3 values were read from the publisher HTML through the WebFetch summarizer. The headline numbers were obtained in two independent passes and agree with the abstract and with the 5-year report's 1-, 2- and 3-year rows (13/86 vs 21/85, 19/79 vs 28/83, 24/78 vs 33/80). The following values rest on the summarized publisher text only and should be rechecked against the PDF at the claim gate: PGI-I 70/78 vs 67/75; PFDI change −79.8 vs −80.1; dyspareunia 9/93 vs 2/90; pelvic pain 6/88 vs 9/87; adverse-event denominators 88/87; sling counts 29/88, 31/87, 12/88, 13/87; masked at 36 months 131/173; mesh exposure 7/88; midurethral sling exposure 0/41 vs 2/44.
2. **Erratum.** The February 16, 2021 JAMA erratum corrects "data in the Results section, including in the tables and figures." Its text is not available. The PMC abstract (pre-correction) says hazard ratio 0.62 (95% CI 0.38–1.02) and 36-month failure 26% vs 38%; the publisher page (post-correction) says 0.61 (0.37–1.02) and 24% vs 36%. The file uses the corrected values. Other corrected values (if any) in the JAMA tables may differ from what I read; PMC also still shows the old Key Points ("0.62").
3. **Internal inconsistency on the publisher page** (fetch tool report, unverified): the abstract says 169 (97%) completed 3-year follow-up while the Results text said 153 attended the 36-month visit. The file uses the abstract figure only for `followUp`.
4. **Source rounding that does not match its own fractions** (counts used, source percentages in notes): 68/76 "90%" (89.5%), 18/88 "21%" (20.5%), 10/87 "12%" (11.5%), 9/86 "11%" (10.5%, count only used), 131/173 "75%" (75.7%).
5. **10-year paper** is abstract-level; no table values, no adverse event counts, no hysteropexy-specific complication numbers.
6. Published dates: design report (PubMed entry 2016-04-08) and 10-year report (PubMed entry 2026-06-24) are approximate (`dateApprox`).
7. The risk-factor report is a per-protocol (N=173) planned secondary analysis; its three results are marked `exploratory`.

## Reports considered and left out

- Napoe et al., Int Urogynecol J 2023 (reoperation after mesh hysteropexy; PMID 36449027): AUGS cites it for a 6/91 (6.6%) hysterectomy-after-hysteropexy figure; not opened.
- Bradley et al., Urogynecology 2023 (genital hiatus after hysterectomy with USLS; PMID 36701331): subgroup analysis of one arm; not opened.
- Lockhart et al., Int Urogynecol J 2026 (MRI parameters; PMID 42217015) and Lukacz et al., Obstet Gynecol 2020 (sexual activity at 1 year after POP surgery, PFDN pooled; PMID 32769645): not primarily SUPeR reports; not opened.
- ACOG Practice Bulletin 214 (local copy) and NICE NG123 (local copy): both predate the JAMA report and do not cite it, so they are not in the guideline section.

## Disagreements with WARWIKI pages

- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-hysteropexy.mdx` line 70: "The interval-censored primary analysis favored mesh hysteropexy (adjusted hazard ratio 0.58, 95% CI 0.36–0.94)". The 0.58 analysis is the 5-year report, which the authors describe as a secondary objective with descriptive P values and no multiplicity adjustment (AJOG 2021, Statistical Analysis). The trial's primary analysis was at 36 months: adjusted hazard ratio 0.61 (95% CI 0.37–1.02; P = .06), not significant (JAMA 2019 abstract, as corrected February 2021). The page also omits the 3-year result and the 8% mesh exposure; "postmenopausal women with prolapse beyond the hymen" is a shorthand for amenorrheic women aged 21+ (design report, Methods B).
- `apical-prolapse.mdx` line 105, `pelvic-organ-prolapse.mdx` line 308 and `mesh-graft-augmented-repairs.mdx` line 45: the 10-year numbers (35/88 vs 46/87; aHR 0.64, 95% CI 0.41–1.00; 112/175, 64%) agree with the JAMA Surg 2026 abstract. None gives the primary 3-year result, so a reader sees only the favorable later reports.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-hysteropexy.mdx` line 70 and the 5-year numbers (29/79 vs 42/78; 37% vs 54%) agree with AJOG 2021 Table 2.
- The AUGS statement (local copy) says the 5-year SUPeR analysis involved "193 patients"; the trial randomized 183 (175 analyzed). Not a WARWIKI page but relevant if the page quotes it.

## Disagreements with the old Journal Club record

- `primaryOutcome: Time to composite treatment failure (to 5 years)`: the JAMA 2019 primary analysis was at 3 years (36-month estimate; failure modeled through 48 months). The 5-year analysis is AJOG 2021.
- `result: Mesh hysteropexy had a lower treatment-failure rate ... over 5 years`: that is the AJOG 2021 result (37% vs 54%, aHR 0.58). The JAMA 2019 paper found 24% vs 36% at 36 months, aHR 0.61 (0.37–1.02), P = .06, not significant, and the authors called it inconclusive.
- `bottomLine: ... outperformed hysterectomy + USLS for durability`: overstates the JAMA report; the 10-year report (aHR 0.64, CI upper bound 1.00, P = .05) says the expected extra durability in years 6 to 10 was not seen.
- Name: the registered title is "Study of Uterine Prolapse Procedures Randomized Trial"; the old name drops "Trial".
- `caveat: ... different question ... and different mesh` (ASPIRe): not verified. I did not open the ASPIRe mesh details; the site's mesh-graft page says ASPIRe used Uphold LITE. The trial file relation to `apical-suspension` states only what the ASPIRe abstract and the SUPeR design paper support (same network, same composite failure definition, vault prolapse after hysterectomy).
- `journal: JAMA, year: 2019, n: 183, mesh exposure ~8%, DOI`: correct. Authors "Nager et al.": correct.

## Decisions to review

- `verdict: inconclusive` follows the primary report (P = .06, wide interval; authors' conclusion). The later reports are noted in `verdictNote`.
- Roles for the 5-year and 10-year composite are `secondary`, with no `met`, because the 5-year analysis is described as a secondary objective with descriptive P values; the 10-year paper is abstract-level.
- Relations: `builds-on` OPTIMAL (design paper Methods E and reference 13); `parallel` SAVE-U and ASPIRe, each with a note naming the actual connection. These targets are not yet in `src/data/clinical-evidence/trials/`, so the repo validator reports them as missing until those files are added.
- Guidelines: only the AUGS 2025 statement discusses SUPeR; its recommendation text is cited with its published strength. The FDA entry is a regulatory action naming the trial's device, not an approval.
- Validator run in a scratch mirror: the only errors were the three missing relation targets (plus the existing `rosetta` to `abc` one).

## Full-text update, October 19

Sources read in full: the saved PMC page of the JAMA 2019 report (`html/super-2019-source.html`, PMC6749543, author manuscript text with Tables 1 to 3), Supplement 1 (protocol, amendments, SAP draft) and Supplement 2 (eFigures 1 to 6, eTables 1 to 5, eligibility, certification), and the saved PMC page of the 2021 erratum (`html/super-2021-correction-source.html`, one paragraph). The 5-year AJOG text was re-read from PMC8328912 (NCBI efetch) to check the 3-year row.

**Critical limitation: the supplied JAMA page is the pre-erratum text.** It says "This article has been corrected" but prints the uncorrected primary result (adjusted HR 0.62, 95% CI 0.38-1.02; 36-month failure 26% [15-35] versus 38% [25-49]; cumulative failure at 36 months 26/79 versus 34/81; at 12 and 24 months 15/86 versus 22/85 and 21/80 versus 29/83). Supplement 2 (eFigures 4 and 5) is also pre-erratum (HR 0.65 unadjusted, 0.63 all randomized). The erratum text itself lists no values. The file keeps the corrected headline values from the earlier publisher-page read (HR 0.61, 95% CI 0.37-1.02; 24% [14-33] versus 36% [24-47]); these could NOT be confirmed verbatim in any supplied text. What is confirmed verbatim: the post-erratum 3-year row (24/78 versus 33/80, risk difference -10, 95% CI -25 to 4) and the 12- and 24-month rows (13/86 versus 21/85; 19/79 versus 28/83) in AJOG 2021 Table 2. Action for the owner: supply the corrected JAMA PDF (or the publisher page text after February 2021), then recheck the six primary-result values (HR, CI, both incidences and their CIs) and the Figure 2 hazard-rate figures. Table 2 and Table 3 values other than the cumulative-failure rows were taken from the pre-erratum page; the 5-year report agrees with the ones it restates (anterior repair 79/88 versus 62/87, mesh exposure 8% unchanged, operative time), but a changed Table 2 cell cannot be excluded.

**Corrected (4):**
- Observed-failure result relabeled "cumulative at the 36-month visit" (permanent-failure, time-to-event row of Table 2/3, not a status-at-visit rate); the status-at-visit rates are 16/78 versus 21/78 in the pre-erratum Table 3 and are not used.
- PGI-I and PFDI effects changed from `none` to differences with intervals (0, -9 to 10, P 0.93 unadjusted; 0.3, -16.3 to 16.9, P 0.97); noted that the planned adjusted PGI-I model did not converge.
- Mesh-exposure comparator changed from "0%" to "not applicable"; the note now carries the exact CI (3.3-15.7%) and sling-exposure counts.
- Erratum report raised from `abstract` to `full-text`; it states only that Results data, tables and figures were corrected.

**Added (about 35):** prespecified alpha .047 (interim .009) with `met: false` explained; proportional-hazards violation and hazard pattern; failure-type breakdown at 36 months; secondary results (Ba, total vaginal length, PISQ-IR, dyspareunia among sexually active); harms (sling exposure, SUI, urgency, fecal incontinence, transfusion, return to OR, ICU, UTI, retention, bladder injury, constipation, uterine pathology); delivery facts (baseline characteristics, posterior repair, blood loss, catheter at discharge, hospital stay, in-hospital Dindo, masking by arm, randomization detail, sample-size error); scope of the erratum.

**Disagreements and inconsistencies found:**
- JAMA Key Points and abstract (pre-erratum) give HR 0.62 and 26% versus 38%; the corrected abstract on the publisher page gives 0.61 and 24% versus 36% (unverified here). Any WARWIKI page quoting 0.62 or 26%/38% predates the erratum; PubMed and PMC abstracts still carry the uncorrected values.
- The JAMA Results state 153 women attended the 36-month visit while the abstract says 169 (97%) completed 3-year follow-up (the latter counts those still in the study). Both are kept as printed.
- New or worsening stress incontinence in the hysterectomy arm is 12/87 at 3 years (JAMA Table 2) but 10/87 at 5 years (AJOG Table 2); counts of cumulative events should not fall, so one of the two cells may be a corrected or reclassified value. Not resolved.
- Ureteral kinking is 6/87 (7%) in JAMA Table 2 (analyzed women) and 7/90 (8%) in eTable 4 (all treated); suture exposure 18/87 versus 17/90 and granulation tissue 10/87 versus 10/90 differ the same way (analyzed versus all treated). Table 2 values are used in the file.
- eTable 4 lists hysteropexy mesh exposure as 12 events in 7 participants (7/93, 8%); Table 2 gives 7/88 (8%).
- The JAMA Key Points say "175 postmenopausal women"; the file keeps the protocol wording (amenorrheic for at least 1 year, 98% postmenopausal in Table 1).
- The Supplement 1 SAP draft (2012) planned an interim alpha of about 0.003; the published analysis used .009 with final alpha .047. The file uses the published values.
- WARWIKI page `sacrospinous-hysteropexy.mdx` (see earlier notes) still presents the 5-year HR 0.58 as the primary analysis; the full text confirms the primary analysis was the 3-year one (P = .06, alpha .047) and that all other analyses, including the 5-year one, were exploratory or supportive with descriptive CIs and P values.
