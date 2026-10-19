# Rezūm II (id `rezum`): sources and notes

Counts: 7 reports, 30 results, 24 harms, 11 delivery facts, 14 references.

## Sources opened

Full text read:
- McVary 2021 final 5-year report, J Urol 206(3):715-724, DOI 10.1097/JU.0000000000001778, PMID 33872051. Read as the journal reprint ("JU Insight", post-author-corrections) hosted by Boston Scientific: https://www.bostonscientific.com/content/dam/bph/images/promo/URO-1013102-AA-McVary-Rezum-Final-5-Year-Paper-FINAL.pdf. Local copy used for `source.file`: `/private/tmp/claude-501/-Users-joyboy-Documents-WARWIKI-warwiki/9d03f117-3fc6-4067-a0c4-5962e10dc9cb/scratchpad/rz/p5.pdf` (scratchpad, may not persist; re-download from the URL). Locators use the journal's printed page numbers (715-724). Figures 1 to 3 were viewed as images.
- McVary 2021 Sex Med 9(6):100454, DOI 10.1016/j.esxm.2021.100454, PMID 34731779: PMC8766265 (open access), read in full.
- Kang 2020 Cochrane review CD013251.pub2 (PMC7093307): read summary, risk-of-bias and effects sections.
- Boston Scientific Rezūm directions for use, Canada, 51344625-01 Rev. A (local: `/Users/joyboy/Downloads/51344625-01A_RezumCanada_IFU_en_s.pdf`), pivotal-study summary on pp5-6: Tables 3, 4, 5, adverse-event narrative, subsequent treatments.
- ClinicalTrials.gov NCT01912339 results record (API v2): participant flow, primary IPSS and safety outcomes with 95% CIs, responders, adverse-event module, eligibility criteria.
- FDA 510(k) K150786 (accessdata.fda.gov pdf15; decision letter, corrected letter dated 2016-09-12 which "corrects our substantially equivalent letter of August 27, 2015"; summary section 1.10.3 cites Rezūm II 136/61), K250584 (pdf25; June 11, 2025; 30-150 cm3). K160417 and K180237 indications checked (same 30-80 cm3 wording).
- AUA BPH guideline 2026, local `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt` (statement 46 and supporting text, pp40-41). EAU male LUTS 2026, local `eau-male-luts-2026.txt`, section 5.3.4.c.1 (WVTT is under "Alternative ablative techniques under investigation"; no graded recommendation).

Abstract only (publisher full text blocked: auajournals.org and sciencedirect.com returned 403/Cloudflare; no PMC or Unpaywall copy):
- McVary 2016 J Urol 195(5):1529-1538, DOI 10.1016/j.juro.2015.10.181, PMID 26614889 (primary report). The primary report's numbers come from its PubMed abstract, the ClinicalTrials.gov results record, the Cochrane review and the 5-year paper's methods; `status.sourceRead` is therefore `abstract`.
- McVary 2016 J Sex Med 13(6):924-933, PMID 27129767.
- Roehrborn 2017 J Urol 197(6):1507-1516, PMID 27993667 (2-year).
- McVary 2018 Urology 111:1-9, PMID 29122620 (3-year).
- McVary 2019 Urology 126:171-179, PMID 30677455 (4-year).

All DOIs, volumes, pages and author lists checked against Crossref and PubMed. Report dates are PubMed entry dates (`dateApprox: true`) except Sex Med 2021 (online 2021-10-30).

## Source handling flagged for the gate

- The 4-year report's harms (Table 3 adverse events, serious events, 9/188 retreatment-seeking) come from the Boston Scientific directions for use (data through 2019-02-09), not from the 4-year journal paper, which I could not open. The locators say so. A reviewer may prefer to move them out of the 4-year report or drop them.
- Primary-report values that are not in the abstract: IPSS group CIs, 106/136 and 21/61 responders, and the 1/136 composite safety endpoint (ClinicalTrials.gov); the mean difference −6.9 (CI −9.06 to −4.74), grade III-V events 7/136 versus 0/61 and the grade I-II and catheter risk ratios (Cochrane review's extraction and calculation); catheterization 122/135 versus 12/61 (directions for use Table 5). Each locator names the source.
- `met: true` for the primary safety endpoint rests on the registry (1/136, 95% CI 0-4.6%, goal 12% or less) and the FDA summary's statement that the device was safe.
- Registry exclusion criteria quoted on the page (prior prostate intervention, penile implant or urethral stent, retention in prior 6 months, stricture or bladder neck contracture, neurogenic bladder, prostate or bladder cancer) come from the registry record, not the paper.
- The Cochrane review's sample (195 efficacy) differs from the ITT 136/61.
- Blinding label: registry says single (participant) masking; the directions for use call the trial double-blinded; the Cochrane review judged the urologists unblindable. I used "participant-blinded".
- Not used: the 2020 Boston Scientific AUA-abstract summary of the 5-year data (URO-791601-AA), which carries different interim numbers (IPSS 10.4 points, 46% QoL, 49% Qmax); the Boston Scientific 5-year infographic (downloaded, not read).

## Reports considered and left out

- The AUA guideline also cites Woo 2018 (large-prostate, ≥80 cc, separate prospective trial) and McVary Miller 2021/2022 (prostate volume ≥80 cm3 analysis): different populations, not part of Rezūm II.
- Dixon 2015 Urology (feasibility) and Dixon 2016 Res Rep Urol (pilot, 65 patients) are earlier single-arm studies, not the pivotal trial.
- Elterman 2021 Can J Urol (cross-trial comparison with L.I.F.T.) and the registry and meta-analytic literature: cross-trial analyses, not reports of this trial.
- McVary 2018 J Sex Med (ref 12 of the 5-year paper, "Is sexual function better preserved after WVTT or medical therapy?") compares with a different trial's medical-therapy data.

## Disagreements with the old Journal Club record

- "Preserved sexual function" and bottom line "while preserving ejaculation": the 5-year paper reports no device-related sexual dysfunction or sustained de novo erectile dysfunction, but its own adverse-event data and the directions for use list decreased ejaculatory volume (3.7% treatment arm, 7.5% crossover in the 5-year paper; 5% through 4 years in the manufacturer's table, 33% resolved) and anejaculation (3%, none resolved), plus worsening erectile dysfunction (2%). "Preserving ejaculation" overstates the data; "no sustained de novo erectile dysfunction" matches the source.
- "Rezūm (WAVE)": WAVE is the EAU's name for the technique (convective water vapour energy ablation); the trial's name in the sources is Rezūm II (Rezum II pivotal study). No other discrepancy: IPSS 11.2 versus 4.3 (p < 0.0001), n = 197, IPSS ≥ 13, prostate 30-80 cc, 4.4% surgical retreatment at 5 years, and DOI 10.1016/j.juro.2015.10.181 match. The old record omits peak flow ≤ 15 mL/s in the population. The follow-up claim "durable to 5 years" is uncontrolled treatment-arm data after sham crossover at 3 months.

## Disagreements and checks on other WARWIKI pages

Pages searched: `grep -rln "Rezūm\|Rezum" docs`. Statements checked against the sources read; most agree. Differences:

1. `docs/04-surgical-techniques/04m-bph-male-luts/aquablation.mdx`, line 172: "the Akgul review reported surgical reintervention of 13.6% for UroLift and 11.1% for Rezūm at 5 years". In the Rezūm II 5-year report, surgical retreatment was 4.4% (journal p720, Figure 3) and 11.1% was the share who started BPH medication (p721, Figure 3). The 11.1% is a medication-initiation figure, so labelling it surgical reintervention misstates the pivotal trial (the Akgul review itself was not opened). The same page's table (line 204, "11.1% at 5 yr (Akgul review); 4.4% at 5 yr (pivotal trial, EAU 2026)") sets the two side by side without saying the 11.1% is medication.
2. `docs/04-surgical-techniques/04m-bph-male-luts/rezum-water-vapor-therapy.mdx`:
   - Efficacy table: Qmax "44% improvement" and BPH Impact Index "48%" at 5 years are the abstract's figures; the 5-year paper's Results text gives 49% (14.0 ± 5.4 mL/s from 9.9 ± 2.2) and 45% (2.2 ± 1.4). The paper disagrees with itself (journal p715 versus p720).
   - "IPSS ~50% at 3 months" and "BPH Impact Index ~50% at 3 months" cite refs I could not match to a stated 3-month value: the 5-year paper gives IPSS 22.0 to 10.6 (change −11.3 ± 7.6, per-protocol), quality of life 4.4 to 2.3 and a BPHII peak decrease of 51% at 6 months. Check "~50%" for BPHII at 3 months against the 3-year report (not opened).
   - "Mean 208 calories" per injection, "103 °C" and 9 seconds: 103 °C and 9 seconds confirmed (J Sex Med abstract; 5-year paper p717); the 5-year paper states "540 calories/ml H2O", and I found no source for 208 calories among those read.
   - Five-year symptom estimates "include 77 of the 136 men originally assigned": the paper evaluates 77 of the 135 treated men (CONSORT, journal p719); 136 were randomized to treatment, 135 treated.
   - "Four of the six treatment-arm subjects later retreated surgically had obstructive median tissue left untreated" agrees (journal p720-721).
   - Pivotal catheterization (90.4%, 19.7%, 3.4 and 0.9 days, 68%) and adverse-event percentages through 4 years agree with the directions for use Tables 3 and 5.
3. `docs/04-surgical-techniques/04m-bph-male-luts/urolift-pul.mdx` line 158 and `optilume-bph.mdx` line 127: "−11.3 at 3 mo (pivotal treatment arm)" is the per-protocol change (5-year paper journal p720; −11.2 ± 7.6 is the ITT change in the primary abstract), and "+5.6 mL/s at 12 mo" matches 9.9 to 15.5 (p720). Both agree with the source; only the −11.2/−11.3 difference is worth knowing.
4. `docs/04-surgical-techniques/04m-bph-male-luts/index.mdx` lines 265, 318 and `bladder-outlet-obstruction.mdx` line 420: "decision August 27, 2015" for K150786 agrees with the FDA letter, which is a corrected letter dated September 12, 2016 that references the August 27, 2015 decision.
5. `docs/01-foundations/tools/biomaterials/adjunct-specialty/rezum.mdx` line 38: "Among 77 original-treatment participants analyzed at five years (of 136 randomized and 135 treated)" agrees with the source; its IPSS "about 48%" agrees.
6. `docs/04-surgical-techniques/04m-bph-male-luts/aquablation.mdx` line 204: "−11.6 (121 paired at 12 mo)" cites the 3-year report, which I could not open; the 5-year CONSORT shows 121 treatment-arm men analyzed at 12 months, consistent with the n.

## Other observations

- The 5-year paper's "JU Insight" box calls 57% "attrition at 5 years"; the Discussion says 57% of the treatment arm was evaluated at 5 years (62% in L.I.F.T.). I used "77 of 135 (57%) evaluated".
- The registry's adverse-event module (66 other and 18 serious events in 136 treated men; mean follow-up 16.4 months) covers all events regardless of relatedness and was not used.
- The 3-year abstract states "IPSS improvement of 160% compared with control subjects at 3 months", a definition I could not interpret; not used.
- Intention-to-treat IPSS: the abstract's −11.2 ± 7.6 versus −4.3 ± 6.9; the 5-year paper's treatment-arm −11.3 ± 7.6 is per-protocol (134).
- FDA clearance dates for K160417 (2016-03-17), K180237 (2018-02-27), K191505 (2019-08-02), K190093 (2019-03-25) and K262460 (2026-09-03) come from the openFDA 510(k) API only; they are not on the page. The page cites K150786 and K250584, each read as a PDF on accessdata.fda.gov.
- The page's EAU bullet does not use a `<Rec>` badge because the EAU text gives no graded recommendation for WVTT.
