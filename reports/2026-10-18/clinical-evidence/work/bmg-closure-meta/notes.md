# bmg-closure-meta notes (2026-10-18/19)

## Sources opened

- Primary: Güler Y. Arab J Urol 2023;21(1):18-30 (online 18 July 2022). DOI 10.1080/2090598X.2022.2097613, PMID 36818369, PMC9930765. Full text via the PubMed Central efetch XML, plus the eight PMC figure images (Figure 2 risk of bias, Figures 3-7 forest plots, which carry the event counts and group sizes used in the trial file; Figure 1 flowchart and Figure 8 funnel plots not used for numbers). Crossref and PubMed confirm author (Yavuz Güler), journal, volume 21, issue 1, pages 18-30, online date 2022-07-18, print date 2023-01-02. `source.file` is null (read online); `source.level` full-text.
- Hwang EC, et al. World J Mens Health 2022;40(1):116-126, DOI 10.5534/wjmh.200175, PMID 33663028: PubMed abstract only (used for the In conversation paragraph).
- Local guideline copies: `reports/audit-v2/sources-local/aua-urethral-stricture-2023-unabridged.txt`, `aua-stricture-amendment-2023.txt`, `eau-urethral-strictures-2026.txt` (searched for harvest-site closure).
- No local copy of the Güler paper existed in `sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`.

## Reports in the file

One report (the meta-analysis). No follow-up reports exist. `relations` is empty: no listed trial id has a real connection (the pooled Soave, Wong and Rourke trials are not on the site's trial list).

## Left out

- Aulia K, et al. Open Access Maced J Med Sci 2022;10:614 (DOI 10.3889/oamjms.2022.10650): a separate meta-analysis of five RCTs that EAU 2026 cites; not opened (not needed for this page), so not cited.
- Individual pooled trials (Soave 2018, Wong 2014, Rourke 2012 and others): not opened; their numbers appear only as read from Güler's forest plots.
- Hwang 2022 full text: abstract only.

## Guidelines

The Guidelines and approvals section is omitted. AUA Urethral Stricture 2023 (PDF p. 19 narrative under Statement 19) says the donor site "may safely be left open to heal by secondary intention or closed primarily" and cites Rourke 2012 and Hwang 2022 (a five-RCT meta-analysis), not Güler. EAU Urethral Strictures 2026 section 9.5 gives no clear recommendation and cites Aulia 2022, Soave 2018 and Wong 2014, not Güler. Neither rests on this paper. No FDA item applies.

## Discrepancies inside the source (Güler 2023)

The report's text and its forest plots disagree; the trial file uses the forest plots (they carry counts and give internally consistent intervals) and says so in each row note.

- Oral pain, total: text says SMD -0.20, 95% CI -0.26 to 0.01, p=0.006 (called "not significant"), and after sensitivity analysis -0.20 (-0.41 to 0.01), p=0.30; Figure 5 shows -0.20 (-0.41 to 0.01), p=0.06, I² 64%, all seven trials (552 versus 525 assessments). The text's corrected value (heterogeneity "lost", I² 38%) is not shown in a figure.
- Perioral numbness, total: text RR 0.91 (0.76-1.08), p=0.28, I² 13%; Figure 4 RR 0.88 (0.72-1.08), p=0.23, I² 0%, 99/314 versus 104/300.
- Alteration of salivation, total: text "SMD 1.05 (0.61-2.10), p=0.87"; Figure 6 RR 1.05 (0.82-1.35), p=0.69, I² 7%, 75/237 versus 68/232. The text interval equals the month-6 Soave subgroup interval.
- Diet tolerance, total: text RR 0.96 (0.90-1.02), p=0.21, I² 38%; Figure 7 RR 1.01 (0.95-1.08), p=0.74, I² 48%, 321/532 versus 330/500.
- Mouth opening total (RR 0.89, 0.76-1.03, p=0.11, I² 57%) and the month-6 subgroup (RR 0.59, 0.36-0.97, p=0.04) agree between text and Figure 3.
- Closure technique: text says continuous closure in 3 studies but cites 4 references [20,21,23,25]; with 2 interrupted and 1 not stated the counts reach 6 or 7. The page says "most trials".
- Inclusion criteria say over 18 years; Table 1 and Results give an age range of 17 to 72 years.
- Gulani 2019 is described in its own title as "a comparative study" and used lingual mucosa; it is nonetheless pooled as one of the seven RCTs. Four trials used quasi-randomization (text [19-22]; Figure 2A shows high risk for sequence generation in the same four).
- Methods list six primary outcomes (liquid and solid tolerance separate); Results report them as one combined diet outcome.
- Table 1 sums: nonclosure 15+21+72+16+18+24+25 = 191, closure 15+21+63+16+16+26+25 = 182, total 373, matching the abstract. Arm sizes in the file come from this sum (Table 1).
- Events in Figures 3, 4, 6 and 7 are counted per time-point subgroup, so patients are counted more than once in the "total" rows; the file notes say so.
- Source text typos: "One reviewers independently identified"; reference 11 cited for the Cochrane risk-of-bias tool (it is Barbagli 2005).

## Disagreements with WARWIKI pages

Searched `docs/` for Güler, the DOI, nonclosure/non-closure and secondary-intention wording.

- `docs/01-foundations/surgical-principles/grafts/buccal-mucosa.mdx` line 42: "included seven studies, four using quasi-random allocation and one involving lingual grafts. It suggested less early pain with nonclosure" agrees with the source. Reference 21 gives `2023;21(1):18` (no end page; the pages are 18-30). Line 40 and the Hwang line (three RCTs in the main analysis, two quasi-randomized in sensitivity analysis) could not be checked: only the Hwang abstract was read (abstract says five studies, 346 randomized patients, 260 completed).
- Pages citing Soave 2018 for "noninferior for oral pain" (`dorsal-onlay-omg.mdx` line 80, `bmg-onlay-ureter.mdx` lines 107 and 217, `mouth-retractors.mdx` line 100, `oral-cavity.mdx` line 75, `buccal-mucosa.mdx` line 40) were not checked against Soave (not opened). Güler's Figure 2A rates Soave low risk for sequence generation and allocation concealment but high risk for participant blinding, outcome blinding and attrition; it is the largest trial (135 of 373 patients).
- No page states a number from Güler that disagrees with the source.

## Disagreements with the old Journal Club record (`src/data/trials.ts` line 823)

- Authors "Güler et al.": single author (Yavuz Güler). Year 2022 is the online year; the issue is 2023 (the site page uses 2023).
- n=373, 7 RCTs: agrees. "Systematic review & meta-analysis (of RCTs)": four of the seven used quasi-randomization and one harvested lingual, not buccal, mucosa.
- "Non-closure was better for early (day 0-1) pain and for difficulty opening the mouth at 6 months; no meaningful difference at other timepoints or overall": agrees with the abstract. The 6-month result is carried by one trial (Soave 14/41 versus 24/42; the other two trials 1/25 versus 2/25 and 0/24 versus 0/26) and the author says more studies are needed.
- "Settles a recurring intraoperative question with pooled randomized data": overstated. All seven trials were high risk for blinded outcome assessment, four were quasi-randomized, the donor sites were mixed, and the report's own conclusion is that nonclosure "may be recommended" for early pain only.
- Old "primary outcome: pain, numbness, difficulty with mouth opening": the report lists six primary outcomes including salivation change and liquid and solid diet tolerance.

## Could not verify

- Per-trial follow-up and per-trial suture and hemostasis details (Table 1 text extracted from XML is flattened, so row-to-column assignment is ambiguous); the page makes only statements the report's running text supports.
- The Hwang review's design details beyond its abstract.
- No PDF page numbers: locators use PMC figure and section labels.
