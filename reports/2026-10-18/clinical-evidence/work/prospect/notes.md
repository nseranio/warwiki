# PROSPECT: notes

## Sources opened

| Report | Identifier | What was read | Level |
|---|---|---|---|
| Glazener 2017 Lancet (primary) | DOI 10.1016/S0140-6736(16)31596-3; PMID 28010989 | `/Users/joyboy/Documents/WARWIKI/warwiki/reports/surgical-genealogy/urps-work/knownfor/cache/https___www_womens_health_org_nz_wp_content_uploads_2016_12_Prospect_study_2016_published_Lancet_pdf` (text of the open-access online-first PDF, 12 printed pages; read in full). Crossref confirmed authors (16), volume 389, issue 10067, pages 381-392. | full-text |
| Reid 2023 IUJ (4- and 6-year) | DOI 10.1007/s00192-022-05308-0; PMID 36018353; PMC9834125 | Europe PMC full-text XML (text and Tables 1 to 5) | full-text |
| Reid 2021 BJOG (complications, 2,632 women) | DOI 10.1111/1471-0528.16897; PMID 34473896; PMC9292877 | Europe PMC full-text XML: abstract, Methods, Results and Discussion text. Tables 2 to 4 and the supplementary tables were not in the XML, so per-group numerators and denominators are not available; percentages come from the abstract and Results prose. | full-text (tables not readable) |
| Yeung 2024 Cochrane (used in "In conversation") | DOI 10.1002/14651858.CD012079.pub2; PMID 38477494 | Europe PMC abstract only; authors checked in Crossref | abstract |
| Local guideline copies searched for a PROSPECT citation | `reports/audit-v2/sources-local/nice-ng123-ui-pop-women.txt`; `pdfs-2026-10-09/pelvic-organ-prolapse-acog-practice-bulletin-number-214.txt`; `eau-non-neurogenic-female-luts-2026.txt`; other `aua-*`/`eau-*` copies | none cites PROSPECT (the EAU file cites Glazener's Cochrane review on anterior repair for incontinence only) | text search |

Every DOI above resolved on Crossref with matching authors, journal, volume, issue and pages; PMIDs came from Europe PMC. No source could not be opened. The Springer page for the IUJ report redirected to a cookie handshake, so the PMC full text was used instead. Page locators for the Lancet report are the printed page numbers of the online-first PDF (1 to 12), not the journal pages 381 to 392. Registry: ISRCTN60695184 (no NCT number, so `nct` is null and `registry` carries the ISRCTN).

## Reports considered and left out

- Glazener 2020 BJOG, repeat anterior or posterior repair (mesh inlay or kit versus native tissue; DOI 10.1111/1471-0528.16197, PMID 32141709): a separate randomized comparison in women having repeat surgery. Only the abstract was seen (POP-SS 6.6 standard versus 6.1 inlay and 5.9 kit; underpowered), so it is not entered.
- HTA monograph (Glazener 2016, Health Technol Assess 20(95), DOI 10.3310/hta20950, PMID 28052810): full report including cost-effectiveness; abstract only seen, not entered. Its 2-year primary results repeat the Lancet paper.
- PROSPECT upper-compartment trials protocol (Trials 2016, DOI 10.1186/s13063-016-1576-x): protocol for the vault or uterine prolapse trials, not opened.

## Relations

None entered. `altman-mesh` (the mesh-kit versus colporrhaphy trial) is the natural peer, but that paper was not read for this task, so no connection note could be sourced. Other listed trial ids have no direct link to this trial.

## Guidelines and approvals

Section omitted. None of the readable guideline copies (NICE NG123, ACOG/AUGS PB 214, EAU) cites PROSPECT. No FDA approval or clearance is tied to the trial.

## Disagreements with WARWIKI pages

- `docs/01-foundations/tools/biomaterials/biological-grafts/porcine-sis.mdx` line 87: "PROSPECT randomized program (1,348 women followed to 6 years)". The 6-year report retained 65% of the 1,348 randomized women (IUJ 2023, Results, Participants and treatment); the next sentence of that page already says "about 65% response", so only the parenthetical is loose.
- `docs/04-surgical-techniques/04g-prolapse-repair/mesh-complications.mdx` line 73: "4.8% de novo severe (1/21 at 24 months); 13.0% severe overall (3/23 assessed at 24 months; PROSPECT mesh kits)". The percentages match the BJOG 2021 abstract; the denominators 1/21 and 3/23 could not be checked because the BJOG tables were not in the text available (arithmetic is consistent: 1/21 = 4.8%, 3/23 = 13.0%).
- `docs/04-surgical-techniques/04g-prolapse-repair/mesh-graft-augmented-repairs.mdx` line 53: "prolapse symptom scores ... were similar across randomized comparisons" at six years. True at 6 years (mesh trial mean difference 0.85, 95% CI -0.05 to 1.75; Table 1), but the 4-year mesh-trial POP-SS was higher after mesh (mean difference 1.01, 95% CI 0.20 to 1.83; P=0.015; below the 2-point threshold). The page does not mention 4 years, so no conflict unless the 4-year result is added.
- All other PROSPECT statements checked on `mesh-graft-augmented-repairs.mdx` (1,352 randomized, 1,348 analyzed; 51 of 434, 12%; 65% retained; 115/268 [42.9%] versus 144/260 [55.4%]; 22/263 [8.4%]), `mesh-complications.mdx` line 98 (1.4 to 4.8%), `porcine-acellular-collagen.mdx`, `bovine-dermal.mdx` and `bob-freeman.mdx` agree with the sources.

## Disagreements with the old Journal Club record

- `primaryOutcome` "POP-SS at 1-2 years": the primary clinical outcome was POP-SS at 1 year; prolapse-related quality of life (visual analogue scale) was the second primary outcome. Outcomes were also measured at 6 months and 2 years.
- "Neither mesh nor biologic graft improved patient-reported outcomes or anatomy": correct for symptoms and quality of life; for POP-Q the leading edge beyond the hymen was numerically more frequent after augmentation (14% versus 16% mesh; 16% versus 18% graft; not significant).
- "mesh exposure rate (~12%, higher for apical)": the 12% (51/434) is any mesh complication within 2 years among women who received synthetic mesh by any route, including concomitant vault, uterine and continence mesh; it is not an exposure rate. The trials enrolled anterior and posterior repairs only, and the paper reports no apical subgroup, so "higher for apical" has no source here.
- "key evidence behind the retreat from transvaginal mesh": not a statement in any source read.
- n 1,352 is the randomized number; 1,348 were analyzed. Design (two pragmatic parallel-group randomized trials) and DOI are correct.

## Other points for the reviewer

- The Lancet and IUJ papers give slightly different adjusted mean differences for the same time points (1-year mesh trial POP-SS 0.00 in the Lancet versus 0.04 in IUJ Table 1; 2-year 0.32 versus 0.38), reflecting different models. The trial file uses each report's own values.
- IUJ Table 3 (extreme pain or discomfort, 6 years) prints no denominator for the graft arm and an effect size that does not match its percentages; only the mesh-trial row is entered.
- IUJ Table 4 prints the satisfaction p-value as 0.000 and the effect (1.67) without a direction; entered as P<0.001 with `effect.type` "none".
- Arm sizes in `design.arms` are the analyzed groups (545 standard repair, shared across both trials; 435 mesh; 368 graft; total 1,348); `design.n` is 1,352 randomized.
- `status.claimsChecked` and `clinicalReview` are null as instructed. `npm run lint:trials` logic was run against this file and page in a scratch copy and passed.
