# OPTIMAL: working notes (2026-10-18/19)

## Sources opened

| Report | Identifier | What was read | Level |
|---|---|---|---|
| Primary, Barber 2014 | DOI 10.1001/jama.2014.1719, PMID 24618964 | Local PMC author manuscript PDF `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/pdfs-2026-10-06/barber-2014-jama-optimal.pdf` (full text, Tables 1-4, Figure 1 text). This is the March 2014 manuscript and carries the UNCORRECTED POP-Q outcomes. Corrected outcome values were read on the JAMA publisher page `https://jamanetwork.com/journals/jama/fullarticle/1840237` through WebFetch (the page text is summarized by the fetch tool, which could not return tables verbatim and read only the first 100,000 of 120,090 characters). | full-text |
| Correction, 2015 | DOI 10.1001/jama.2015.4817, PMID 26057298 (PubMed ErratumIn of the primary) | JAMA notice page `https://jamanetwork.com/journals/jama/fullarticle/2319146` via WebFetch (summary only: cause, audit, "primary outcome of surgical failure changed for 16 of 307 participants", conclusions unaffected). The correction PDF with the list of revised numbers was not opened (jamanetwork.com returns 403 to curl). Crossref and PubMed confirm title, JAMA 2015;313(22):2287, 9 June 2015. | abstract level (notice summary) |
| E-OPTIMAL, Jelovsek 2018 | DOI 10.1001/jama.2018.2827, PMID 29677302 | Local owner PDF `/Users/joyboy/Downloads/jama_jelovsek_2018_oi_180030.pdf` (full text, Tables 1-3, Figures 2-3 text, limitations). | full-text |
| Registry | ClinicalTrials.gov NCT00597935 (API, outcome measures module) | Used only to cross-check the corrected success counts: ULS 45/73 + 55/82 = 100/155 and SSLF 47/72 + 47/77 = 94/149, matching the corrected JAMA abstract. | cross-check |
| OPUS, Wei 2012 | DOI 10.1056/NEJMoa1111967, PMID 22716974 | PubMed abstract (for the relation note and the In conversation sentence only). | abstract |

Citation metadata (authors, year, journal, volume, pages) was checked on Crossref and PubMed for the three OPTIMAL reports. Dates: primary 2014-03-12 (Crossref issued date; Crossref record created 2014-03-11), correction 2015-06-09, E-OPTIMAL 2018-04-17. Data cutoffs are not stated as dates in either report, so `cutoff` is null.

## Numbers that rest on a single, summarized read (check against the journal PDF)

The corrected POP-Q-derived values come only from the JAMA corrected full text as returned by WebFetch, in three separate extractions that agreed with each other and with the registry counts and with other WARWIKI pages:

- Surgical success 100/155 (64.5%) versus 94/149 (63.1%), adjusted OR 1.1 (0.7-1.7), unadjusted difference 1.4 points (-9.4 to 12.2). The P value 0.84 was read from the corrected outcomes table only once.
- BPMT anatomic failure 37/153 (24.2%) versus 42/164 (25.6%), adjusted OR 0.9 (0.6-1.6), P 0.82. In the fetched table this row appeared under the ULS/SSLF column heads; its counts equal the BPMT/usual-care split in the uncorrected manuscript (26/78+19/77=45/155 and 22/86+27/80=49/166), and the fetched text attributes 37/153 and 42/164 to BPMT versus usual care. I recorded it as the behavioral comparison.
- Apical descent 16/155 (10.3%) versus 21/152 (13.8%); anterior wall beyond the hymen 20/155 and 20/153 (kept in the file only through the apical-descent note, not as a separate result); interaction values (usual care 4.9% versus 15.6%, aOR 0.3, 0.1-0.8; BPMT 16.2% versus 12.0%, aOR 1.4, 0.6-3.7). The two interaction cells reconcile with the overall counts.
- Bothersome bulge (25/151, 30/154, aOR 0.8, 0.5-1.5, P 0.49) and retreatment (8/161, 8/155, aOR 0.9, 0.3-2.6, P 0.81) are identical in the uncorrected manuscript Table 2 and the corrected text.

Values not touched by the correction (adverse events, Urinary Distress Inventory, Pelvic Organ Prolapse Distress Inventory, baseline table, technique, adherence) were taken from the author manuscript; the corrected abstract and text agree with the manuscript on serious adverse events (31/188 versus 31/186, OR 0.9, 0.5-1.6), neurologic pain (6.9% versus 12.4%, P 0.049), persistent pain (1 versus 8), the UDI/POPDI means and CIs, and the 5 (3.2%) ureteral obstruction sentence. The adverse-event table that is Table 3 in the manuscript is a supplement table (eTable 8) in the corrected journal version, so the harm locators cite the manuscript.

Not found: the operative time, blood loss and length-of-stay values (eTable 4 of the supplement); the page says only that they did not differ significantly. Supplement and per-arm adverse event tables of the journal version were not opened.

## Internal inconsistencies in the sources (recorded, not resolved)

- Manuscript Results text says ureteral obstruction in "5 (3.2%)" ULS women; Table 3 gives 6 (3.2%) (suture removed 5, stent 1). The file and page use the table (6/188); 5/188 would be 2.7%.
- E-OPTIMAL text gives repeat surgery 8.5% versus 4.6%; Table 3 gives 10/118 (8.5%) versus 5/110 (4.5%). The file uses the table.
- E-OPTIMAL Key Points say anatomic failure 48% (BPMT) versus 49.5% (usual care); the abstract and results text give 45.6% versus 47.2%. The file uses the abstract.
- Manuscript abstract reported 154 denominators and 157 in text for ULS success; superseded by the correction.

## Derived figures in the page and file

- 100 minus 64.5 and 100 minus 63.1 (35.5% and 36.9%) as the 2-year failure complements, used only in the Results comparison with the extension's modeled 2-year failure.
- 304 = 155 + 149 women with 2-year success data.
- 100 of 374 prior hysterectomy = 48 + 52.

## Reports considered and left out

- Secondary analyses not opened: Sutkin 2020 (posterior repair and 24-month outcomes), Siff 2020 (immediate postoperative POP-Q measures and 2-year failure; resting genital hiatus), the 2-year quality of life, sexual function and body image report (ref. 9 of Jelovsek 2018), and other OPTIMAL ancillary papers. None was opened, so none is included. Sutkin and Siff are cited on `docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/perineorrhaphy.mdx`.
- Guidelines: no guideline copy that I could read states a graded recommendation resting on OPTIMAL. The AWMF S3 descensus genitalis guideline (015-006, March 2026; `reports/audit-v2/sources-local/dl-2026-09-26/awmf-015-006-descensus-genitalis.txt`, section 6.2) cites Barber 2014 (its ref. 218) only in background text ("no significant anatomic or functional differences between vaginal fixation to the sacrouterine ligaments and sacrospinous fixation"), not as a graded Empfehlung. NICE NG123, the AUGS statements in `augs-2026-09/` and the other local guideline copies do not cite OPTIMAL. The Guidelines and approvals section is therefore omitted. No FDA approval applies.
- Relations: only `parallel` to `opus`. ASPIRe (`apical-suspension`) and SAVE-U/SAM were not linked because I did not read their reports in this task.

## Disagreements with WARWIKI pages and the old Journal Club record

Old record (`src/data/trials.ts`, id `optimal`): corrected 2-year success (100/155, 94/149, adjusted OR 1.1, 0.7-1.7), the E-OPTIMAL figures (61.5%, 70.3%, -8.8, -24.2 to 6.6), n 374, population and comparison all agree with the sources. The record's wording "did not establish equivalence" is not stated in either paper (not copied into the page). Its `design: RCT (2x2 factorial)` is consistent.

Site pages (none edited):

1. `docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx` line 253: "The original trial enrolled women undergoing surgery for both apical prolapse and SUI, all with a midurethral sling". The trial text says all but 3 of 374 (99%) had a retropubic TVT (manuscript p8). `anterior-compartment.mdx` has "all but three" correctly.
2. `docs/04-surgical-techniques/04g-prolapse-repair/anterior/michigan-four-wall.mdx` line 107: buttock pain at 4-6 weeks "10.5% after SSLF versus 4.6% after uterosacral suspension" (cited to an OPTIMAL secondary analysis, ref 13). The primary report gives persistent neurologic pain at the 4-6 week visit in 8/186 (4.3%) SSLF versus 1/188 (0.5%) ULS (manuscript p9, Table 3). The secondary analysis was not opened, so I cannot say which is wrong; the definitions may differ.
3. `docs/04-surgical-techniques/04g-prolapse-repair/prolapse-repair-principles.mdx`, `pelvic-organ-prolapse.mdx` and `uterosacral-ligament-suspension.mdx` describe 285 of 374 entering E-OPTIMAL; the paper says 309 were eligible and 285 enrolled (244 completed). Not wrong, but the eligible denominator is omitted.
4. `docs/04-surgical-techniques/04g-prolapse-repair/index.mdx` line 68 calls the E-OPTIMAL percentages "modeled first composite failure", consistent with the paper; no disagreement. The E-OPTIMAL 5-year retreatment figures (11.9% versus 8.1%) are not on the pages I searched.
5. All other numbers I compared (sacrospinous-ligament-fixation.mdx table: 94/149, 100/155, 20/153, 20/155, 8/155, 8/161, 31/186, 31/188, 23/186, 13/188, 6/188, 0/186; uterosacral-ligament-suspension.mdx pain and ureteral rows; apical-prolapse.mdx difference 1.4 points, CI -9.4 to 12.2) agree with the sources.

## Not verified

- The correction's full list of revised numbers and the corrected journal tables verbatim (see above).
- Surgeon-experience details beyond 31 surgeons at 9 sites; the page does not claim more.
- `lint:trials` was run on a copy in the scratchpad (stub files for the other trial ids, current decisions.json); it reported no error for `optimal`. The full `npm run lint:claims` and the build were not run (output files only).
