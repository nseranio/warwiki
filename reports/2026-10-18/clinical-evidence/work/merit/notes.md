# MERIT notes (checked 2026-10-18)

## Sources opened

| Source | Identifier | Where | Level |
|---|---|---|---|
| Hayward 2024, JAMA Intern Med 184(6):619-628 (primary) | doi 10.1001/jamainternmed.2024.0264; PMID 38587819 | Open-access (CC BY) PDF of the full article, fetched from urology.wisc.edu and read with pdftotext: `/private/tmp/claude-501/-Users-joyboy-Documents-WARWIKI-warwiki/9d03f117-3fc6-4067-a0c4-5962e10dc9cb/scratchpad/merit/wisc.pdf` (text in `wisc.txt`, same folder). PDF page n equals journal page En. Supplements (eTables, protocol, SAP) were not available and not read. | full text |
| AUA/CUA/SUFU recurrent uncomplicated UTI guideline (2019, confirmed 2022, amended 2025) | local | `reports/audit-v2/sources-local/aua-rutI-2025-unabridged.txt` (statement 14 and rationale; MERIT is its ref 250) | full text |
| EAU Urological Infections, limited update March 2026 | local | `reports/audit-v2/sources-local/eau-urological-infections-2026.txt` (3.5.3.c.7 D-mannose; recommendation table under 3.5.4; MERIT is its ref 203) | full text |
| Crossref record, PubMed esummary and efetch for the primary report | doi above | online | metadata (authors, journal, volume, issue, pages 619-628, online date April 8, 2024) |

No search of the web turned up a closed-access barrier; no source could not be opened.

## Reports considered and left out

- Franssen M, et al. MERIT protocol, BMJ Open 2021;11(1):e037128 (doi 10.1136/bmjopen-2020-037128, PMID 33441350): protocol, no results; not opened.
- Glogowska M, et al. Impact of recurrent urinary tract infections on women: a qualitative study, Br J Gen Pract 2026 (doi 10.3399/BJGP.2025.0699, PMID 42134906): found as a MERIT-team publication; qualitative, no trial endpoints; not opened.
- The JAMA Intern Med invited commentary and the Oxford PHC trial page: secondary commentary, not reports.
- The primary report states that quality of life, health care utilization, acceptability, central-laboratory microbiology and the process evaluation "will be reported elsewhere". No such trial-results report was found on PubMed (searches on MERIT/mannose and ISRCTN13283516 returned only the primary report and the protocol).

## Guidelines not included

- WikiGuidelines (Nelson 2024, JAMA Netw Open; local `nelson-2024.txt`, Question 7) cites MERIT but states only that evidence is insufficient for a clear recommendation, with no published strength rating, so it is not on the page.
- NICE NG112 (read for ALTAR) does not appear in the local copies for this trial; no NICE statement cites MERIT in a text I read. FDA: D-mannose is a dietary supplement; no approval to report.

## Disagreements with WARWIKI pages

Pages citing MERIT: `docs/05-special-populations/05e-womens-health/recurrent-uti.mdx`, `docs/01-foundations/pharmacology/infection-prophylaxis/non-antibiotic-uti-prevention.mdx`, `docs/01-foundations/pharmacology/infection-prophylaxis/uti-suppressive-prophylactic.mdx`. No old Journal Club record exists. Numbers on `recurrent-uti.mdx` line 148 (598 women, 150/294 [51.0%] versus 161/289 [55.7%], risk difference −5 points, 95% CI −13 to 3) agree with the source (PDF p1, p7 Table 2).

1. `non-antibiotic-uti-prevention.mdx` line 146: "MERIT ... enrolled women between infections". The report enrolled women with a record of recurrent UTI regardless of current symptoms; 142 of 595 answering (23.9%) reported current UTI symptoms at baseline (PDF p6, Table 1 continued). Suggest "enrolled women with a history of recurrent UTI".
2. `non-antibiotic-uti-prevention.mdx` line 143 and `uti-suppressive-prophylactic.mdx` line 65: "among 583 with primary-outcome data, 150/294 versus 161/289" is correct (294 + 289 = 583; PDF p1 and p4). Same lines: "similar results across pre-/postmenopausal subgroups" matches PDF p4 (eTable 3).
3. `non-antibiotic-uti-prevention.mdx` line 143 lists "no significant difference in ... antibiotic use". The source reports a significant difference in one antibiotic outcome: days of prescribed antibiotics, adjusted median difference −3.00 (95% CI −4.40 to −1.60; P < .001; PDF p8, Table 3), which the authors attribute to a few heavy users and which disappeared in a post hoc analysis excluding 12 outliers (0.00, 95% CI −1.40 to 1.40; PDF p4). Antibiotic courses (IRR 0.88, 0.69 to 1.12) and defined daily dose did not differ. The abstract itself says no significant difference in any secondary outcome, which conflicts with Table 3.
4. `non-antibiotic-uti-prevention.mdx` line 154: "MERIT found no excess serious adverse events". There were 28 serious adverse events, 20 with D-mannose and 8 with placebo, none judged related (PDF p4). No test of the imbalance is reported; "none related" is the source's statement. Same line: "diarrhea is the most common adverse event" is cited to both MERIT and Cochrane; MERIT's text read does not report diarrhea or any adverse-event type, so that clause cannot rest on MERIT.
5. `uti-suppressive-prophylactic.mdx` line 65 and 177 describe MERIT as "the largest and most rigorous data point"; the source does not say this, only that the placebo-controlled design is a strength (PDF p9). Not a numeric disagreement.
6. `recurrent-uti.mdx` line 296 and the other pages cite pages 619–628 and volume 184(6): correct. `uti-suppressive-prophylactic.mdx` ref 12 and `non-antibiotic-uti-prevention.mdx` ref 16 add "(MERIT)" inside the quoted title; the published title does not contain it.

## Discrepancies inside the primary report and in guidelines

- Withdrawals: Results text (PDF p4) gives 69 (D-mannose) and 65 (placebo); Figure 1 (PDF p7) gives 64 and 64. Both are recorded as a delivery Fact in the trial file.
- The abstract says "598 women eligible" and "583 (97.5%)" with outcome data; the Results text gives 294 (97.0%) and 289 (98.0%) per arm. All consistent (583/598 = 97.5%).
- The AUA 2025 rationale (ref 250 paragraph) gives "microbiological recurrence (RR 0.90; 95% CI 0.60 to 1.33)" for MERIT; in the source that RR is for resistant uropathogens cultured during infection (41/294 versus 45/289; PDF p4), not microbiological recurrence, and the AUA also labels the incidence rate ratio of 0.88 (0.72 to 1.08) "UTI-related symptoms" when it is the number of clinically suspected UTIs. The page quotes only the AUA's RR 0.92 (0.80 to 1.05), which matches.
- The EAU 2026 text describes the primary outcome as "cystitis" throughout where the source says "UTI"; the quote on the page follows the EAU wording for its statement.
- Percentages in the report for menopause (63.1%) and current symptoms (23.9%) use the number answering, not 598; the page says so.

## Limits and choices

- Supplementary material (eTables 2-8, SAP, protocol) was not read; the post hoc outlier analysis (eTable 7) is reported from the main text only.
- `cutoff` is null: the report gives no data cutoff, only recruitment dates (March 28, 2019 to January 31, 2020) and 6-month follow-up per participant.
- The primary result's `effect` is the unadjusted risk difference stated in the abstract (−5 points, 95% CI −13 to 3; P = .26); the adjusted RR (0.92; 0.80 to 1.05; P = .22) is in the note. Percentages derived by me from counts (arm initiation 97.0% and 95.9%) are labelled as calculated in the file.
- `relations` is empty: ALTAR (methenamine versus antibiotics, open-label, secondary care) shares the decision lane and is linked in the In conversation paragraph in prose; no listed trial tests D-mannose or uses it as a control, so no typed relation fits.
- `met: false` on the primary and key secondary follows the trial's hypothesis (reduction in the proportion with a further medically attended UTI; powered for a 50% relative reduction); the trial did not state a noninferiority margin.
- The earlier D-mannose trials (Kranjčec 2014, Porru 2014) are described only as the MERIT report summarizes them (PDF p5-6); I did not open them, so they are not cited as references on the page.
- The old Journal Club record does not exist for this trial.
- No site (including auanet.org) was opened for the AUA text; the local copy was used.

## Counts

1 report, 10 results, 2 harms, 6 delivery facts, 3 references.
