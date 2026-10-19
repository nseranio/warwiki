# ChEETAh notes (checked 2026-10-18/19)

## Sources opened

| Item | Identifier | Where read | Level |
|---|---|---|---|
| Primary report, Lancet 2022;400(10365):1767-1776 | DOI 10.1016/S0140-6736(22)01884-0; PMID 36328045 | thelancet.com full text (open access, CC BY) in the browser pane, plus Figures 1 and 3 viewed as images (gr1_lrg.jpg, gr3_lrg.jpg). No local copy: curl and WebFetch were blocked (403) on thelancet.com, sciencedirect.com and the University of Birmingham repository PDF; PMC does not hold it. `source.file` is null. | full text |
| Department of Error, Lancet 2023;401:1078 | DOI-less page PIIS0140-6736(23)00628-1 | thelancet.com | full text (one line: the members list of the NIHR Unit was updated; no data changed) |
| Cost-effectiveness analysis, Lancet Glob Health 2024;12(2):e235-e242 | DOI 10.1016/S2214-109X(23)00538-7; PMID 38245114 | thelancet.com full text (open access) in the browser pane; PubMed abstract XML | full text |
| Enz et al., J Hosp Infect 2026;172:115-128 (Table II, statement 10; funding and conflict statements; text on ChEETAh) | DOI 10.1016/j.jhin.2026.03.025 | journalofhospitalinfection.com full text (open access) | full text |
| Registry | NCT03980652, NCT03700749 | clinicaltrials.gov API (titles only) | registry record |
| Protocol, Trials 2022;23:204 | PMC8905008 | page text searched for NCT numbers only | not used for data |
| Crossref and PubMed records | DOIs above | api.crossref.org, eutils | citation checks (authors, year, journal, volume, pages) |

Local searches found no copy of the report: no match for the DOI or "ChEETAh" in `reports/audit-v2/sources-local` text files (other than the site's reference registry and review logs for `surgical-gloving.mdx`), and no matching file name in `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`. No local guideline copy (AUA, ASHP, EAU, NICE under `sources-local`) mentions glove or instrument change.

## Reports in the file

1. `cheetah-2022` primary (full text).
2. `cheetah-2024-economic` model-based cost-effectiveness analysis (full text). Published date is the February 2024 issue date with `dateApprox`; the article page shows no online date.

## Reports considered and left out

- Department of Error (March 2023): authorship list only; not a `correction` report because no value changed.
- Study protocol (Trials 2022;23:204): design only, no results.
- Omar O, Research Square preprint (bias-minimization strategies in the first 10,000 patients): preprint, not opened.
- Eur Urol 2023 letter (Vetterlein et al.), J Am Coll Surg 2024 evidence-based review (Ferreira et al.): commentary, not opened.
- Supplementary appendix (4.16 MB PDF): not opened, so subgroup tables (appendix pp 25, 32), the cluster tables and the per-country results are not in the file.

## Disagreements and discrepancies

### Within the source (recorded, not resolved)

- Intervention SSI rate: the abstract prints 931/5,789 (16.0%); the Results text and Figure 3 print 16.1%. 931/5,789 is 16.08%. The file uses 16.1%.
- Registry number: the primary report prints NCT03700749, which is FALCON's record. ChEETAh is NCT03980652 (clinicaltrials.gov title "Cheetah - Sterile Glove and Clean Instrument Change at the Time of Wound Closure to Reduce Surgical Site Infection"; the cost-effectiveness paper and the protocol give NCT03980652). The file uses NCT03980652.
- Figure 3, 50%-target sensitivity row: the control group reads 1200/5241 (19.2%), but 1200/5241 is 22.9%. The row is not in the file.
- Best-case and worst-case scenarios: the Methods text says best-case recoded missing outcomes as SSI "yes" and worst-case as SSI "no", the reverse of the labels. Figure 3 numerators (best-case equals the primary numerators; worst-case adds events) fit the labels. The added denominators (80 control, 42 intervention) are not the 389 and 355 excluded patients. The file labels the rows "as labeled in Figure 3" and does not describe the recoding direction.
- Intervention adherence: 6,044/6,144 is 98.37%; the report prints 98.3%. The file uses 98.4% with the printed value in the note.
- Reoperation, current practice: 157/6,674 is 2.35%; Table 3 prints 2.3%. The file uses 2.4% with the printed value in the note.
- Minimization-only adjusted risk ratio 0.66 (0.60–0.73) in Figure 3 versus 0.87 in the primary model; the crude ratio of the two proportions is about 0.85. The file records both as printed.
- Cost-effectiveness paper: modeled intervention-group SSI 17.6% versus 19.7% (absolute risk reduction 2.10, 95% CI 2.07–2.84, as printed), unlike the trial's 16.1% versus 18.9%. It also gives an intraclass correlation of 0.06 for ChEETAh, while the primary report's sample size assumed 0.01.
- Group author name: the Lancet article says "NIHR Global Research Health Unit on Global Surgery"; the 2024 paper says "NIHR Global Health Research Unit on Global Surgery". Each citation uses the form printed on its own article (PubMed's CollectiveName matches).
- The Results state recruitment ended 8 months ahead of the projected completion date (clusters) and 3 months before the projected date (participants); the page uses only the first.
- Enz et al. print the intervention rate as 931 (16.0%) of 5,789 and name Ademuyiwa as first author of the trial; the Lancet article is under the group name.

### WARWIKI pages that mention the trial

Only `docs/01-foundations/perioperative-care/intraoperative-care/surgical-gloving.mdx` (lines about 60-68, reference 15). Checked against the source:

- "81 hospitals in seven low- and middle-income countries", "13,301 patients", "clean-contaminated, contaminated or dirty": agree.
- "931/5,789 (16.1%) ... 1,280/6,768 (18.9%); adjusted RR 0.87 (95% CI 0.79–0.95)": agree (Results text, Figure 3).
- "The cohort included 679 urologic operations": agrees (Table 1: 386 + 293).
- "Almost all operations were open; clean surgery and cesarean delivery were excluded": agrees (97.8% open).
- "WHO 2018 made no recommendation on it before ChEETAh": agrees with the report's Introduction; "Enz recommends this change as part of a bundle in general surgery": agrees with statement 10 (IA, Change practice, 90% consensus).
- "the scrub team changed gloves": the report says operating surgeons, assistant surgeons and scrub staff changed gloves; the page's wording is narrower than the source but not wrong in number.
- No other page in `docs/` contains "ChEETAh" or a glove-and-instrument-change statement.

### OLD JOURNAL CLUB RECORD

- `result` "931/5,789 (16.0%)": the Results text and Figure 3 give 16.1% (abstract 16.0%).
- `authors` "NIHR Global Health Unit on Global Surgery": the Lancet article is under "NIHR Global Research Health Unit on Global Surgery".
- `n` 13,301, "12,557 patients with outcome data" (6,768 + 5,789), 18.9%, adjusted RR 0.87, P = 0.0032, "without detected subgroup heterogeneity", seven countries, DOI: agree.
- "7 low- and middle-income countries" and "Routine change of sterile gloves + instruments": agree. `domain` and `design` ("Pragmatic cluster RCT") agree.

## Things not verified

- Subgroup effect estimates and interaction P values, per-country results, cluster-level characteristics (appendix not opened).
- Online publication date of the 2024 cost-effectiveness paper.
- Current WHO, CDC and NICE positions: the primary report states all three made no recommendation before the trial; their current texts were not read, so no guideline statement beyond Enz 2026 appears in "Guidelines and approvals". WHO, CDC and NICE texts could be checked for a post-2022 update.
- Enz 2026 funding: it states Mölnlycke Health Care provided funding, research support and medical writing; ChEETAh lists Mölnlycke Healthcare among funders and donated gloves. Both facts are on the page.
- FDA: no approval or clearance applies to the intervention; none cited.
- `npm run lint:trials` was run on a scratch copy of the repo's clinical-evidence folder (same script) with only this trial added; no cheetah error. The full repo lint was not run (no other file was edited).
