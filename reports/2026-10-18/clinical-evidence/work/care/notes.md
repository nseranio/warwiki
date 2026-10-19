# CARE notes (checked 2026-10-18)

## Sources opened

| Report | DOI / PMID | Source | Level |
|---|---|---|---|
| Brubaker 2006 (primary, NEJM) | 10.1056/NEJMoa054208 / 16611949 | PubMed abstract (corrected). NEJM page and PDF return 403; not on PMC; no local copy (grep of `sources-local`, `~/Documents/Medicine`, `~/Downloads`). Details of design, endpoints and masking taken from the 2008 two-year paper (full text) | abstract |
| Visco 2008 (Int Urogynecol J) | 10.1007/s00192-007-0498-2 / 18185903 | PMC2597273 author manuscript | full-text |
| Brubaker 2008 (Obstet Gynecol, 2-year) | 10.1097/AOG.0b013e3181778d2a / 18591307 | PMC2614233 author manuscript (uncorrected) plus current PubMed abstract (corrected) | full-text |
| Cundiff 2008 (AJOG, erosion) | 10.1016/j.ajog.2008.07.029 / 18976976 | PMC2859033 author manuscript | full-text |
| Nygaard 2013 (JAMA, E-CARE) | 10.1001/jama.2013.4919 / 23677313 | PMC3747840 author manuscript plus PubMed abstract | full-text |
| Design paper, Brubaker 2003 (Control Clin Trials) | 14500059 | PubMed abstract only | not used as a report |
| Errata: NEJM 2016;374:2297-8 (10.1056/NEJMx160015, PMID 27276579); Obstet Gynecol 2016;127:968-9 (10.1097/AOG.0000000000001428, PMID 28605357) | Crossref and PubMed records only | cited as references 4 and 5; their text could not be opened (NEJM 403; LWW paywalled) |

DOIs and page ranges for the five reports and both errata were resolved on Crossref (titles, journals, volumes, pages and author lists match). NCT00065845 (CARE) taken from the 2008 papers; E-CARE is NCT00099372 (JAMA paper).

Guidelines read locally: `reports/audit-v2/sources-local/aua-sui-2023-unabridged.txt` (statement 19; supporting text cites CARE as ref 103) and `eau-non-neurogenic-female-luts-2026.txt` (sections 4.7.3.b and 4.7.5; CARE is ref 669, the urodynamic analysis ref 638). `nice-ng123-ui-pop-women.txt` recommendation 1.8.3 ("Do not offer surgery to prevent incontinence in women having surgery for prolapse who do not have incontinence") does not cite CARE in the recommendation document, so it is omitted from the page. No FDA action applies.

## Reports considered and left out

- Burgio 2007 (AJOG 197:647, 1-year bladder symptoms), Grimes 2014 (E-CARE posterior compartment and bowel), Jelovsek 2014 (de novo SUI prediction model), Bradley 2007/2008, Handa 2007 (sexual function), Richter 2007, Whitehead 2007, Rostaminia 2020 and Davenport 2018 (other CARE secondary analyses): not opened; none changes the Burch-versus-no-Burch decision. The 2025 MICRO trial (Mou, South Med J) is a separate trial.
- Design paper (Brubaker 2003): abstract only; supplies no results.
- The primary NEJM full text, its Table 3 and the two 2016 corrections were not read. The primary report is therefore recorded at abstract level (`status.sourceRead: abstract`, `met: true` justified by the abstract's statement that enrollment stopped at the first interim analysis for significantly less stress incontinence with Burch, restated in the Visco and Brubaker 2008 full texts).

## Disagreements and cautions

### Old Journal Club record

- Record gives "23.8% vs 44.1% by symptoms; ~33.6% vs 57.4% by composite". The 23.8%/44.1% pair is the superseded original composite; the corrected 3-month composite is 33.6% versus 57.4% (PubMed abstract marks it "[Corrected]"). The abstract gives no "by symptoms" split, so no symptom-only 3-month percentage is carried into the file. (The 2008 manuscript Table 1 lists 3-month symptom rates of 19.0% versus 39.7%, but that table is the uncorrected manuscript with imputation and different denominators, so it was not used.)
- Record name "Colpopexy and Urinary Reduction Efforts": correct. Record "Long-term (Nygaard 2013)" and caveat that durability falls over 7 years: supported (anatomic failure 27%/22%, composite 48%/34% at year 7, intervals include zero).
- Record `n: 322`, `design: RCT`, journal and DOI: correct.
- Record bottom line "meaningfully lowers de novo stress incontinence in continent women": the trial endpoint is a composite (symptoms, stress test, treatment), not de novo symptomatic leakage alone; the file states the composite.

### WARWIKI pages (not edited)

All numbers below were checked against the sources above; none disagree.

- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/burch-colposuspension.mdx` (line 76 region): 322 women, 33.6% versus 57.4% corrected composite, 23.8%/44.1% superseded. Consistent. The page's phrase "after correction of stress-test coding" could not be verified because the NEJM correction text was not accessible.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrocolpopexy.mdx` (lines 96, 110, 136): E-CARE 27% versus 22% anatomic, 48% versus 34% composite, 215 entered and 126 completed 7 years, erosion 10.5% (6.8 to 16.1), CARE composite 33.6% versus 57.4%. Consistent.
- `docs/04-surgical-techniques/04g-prolapse-repair/prolapse-repair-principles.mdx` (line 90) and `mesh-complications.mdx` (lines 71, 75, 86): 57.4% to 33.6%; 10.5% at 7 years; 11/215 (5.1%) with surgery for mesh complications. Consistent.
- `docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx` (line 322): 12/313, 6% (pessary) to 30% (speculum), 58% versus 38% (P = 0.04), 32% versus 21% (P = 0.19). Consistent with Visco abstract and Table 5.
- `docs/01-foundations/tools/biomaterials/synthetic-meshes/polypropylene.mdx` (line 40): 10.5% (6.8 to 16.1), 126/215 (59%). Consistent.
- Surgeon pages (`linda-brubaker.mdx`, `anthony-visco.mdx`, `halina-zyczynski.mdx`) describe CARE correctly.

### Source-internal discrepancies (not copied to the page)

- E-CARE eligible denominator: abstract says 215/233 (92%); main text and Figure 1 say 215/231 (93%). The file and page use 231 and record the 233 in the delivery fact note.
- E-CARE abstract (PubMed) prints the SUI difference interval as "-0.268 to 0.030"; Table 2 gives (-0.268, -0.030). The file uses Table 2. The JAMA erratum (2013;310:1076) replaced the median time to SUI failure in the uncorrected manuscript (131.3 versus 40.2 months, per a previous site audit: 3.11 versus 0.94 years); neither time-to-failure value is used.
- Cundiff 2008: the Comment says "20 of 302 (6%)"; Results and Table 2 give 20 of 322. The file uses 20/322.
- Brubaker 2008 manuscript Table 1 (uncorrected) shows 24-month composite 32.0% versus 45.2% (P = .026) and the JAMA 2013 introduction repeats those; the corrected PubMed abstract gives 41.8% versus 57.9% (P = .020). The file uses the corrected pair. Bothersome SUI (11.6% versus 25.2%), the urge endpoint and Table 4 counts come from the uncorrected manuscript; they do not depend on the stress-test component, but the correction text was not read.
- EAU 2026 evidence text (section 4.7.4.e.1) reports "34% versus 49%" de novo SUI (RR 0.69) from two abstract trials with n = 180 and 187; these are not the CARE figures (33.6% versus 57.4% at 3 months).
- The EAU recommendation not to offer concomitant anti-incontinence surgery at abdominal prolapse surgery (women without symptomatic or occult SUI) runs opposite to CARE's authors' conclusion (Brubaker 2008 proposes recommending prophylactic Burch to stress-continent women with a mobile urethra). The page states both without ranking.

## Could not verify or open

- NEJM primary full text (403); NEJM erratum text (403); Obstetrics and Gynecology correction text (paywalled; 402).
- PMC manuscripts are author versions, so locators are table and section names, not journal page numbers; page numbers for `source.file` are null because all reading was online.
- Whether the 2016 corrections changed any figure other than the stress incontinence composites (3-month and 24-month) is unknown.
- ClinicalTrials.gov record not opened (NCT numbers taken from the papers).

## Full-text update, October 19

Sources read in full: Brubaker 2006 NEJM (`CARE-Brubaker-2006-NEJM.pdf`, 10 pages; this copy is the version updated June 9, 2016, so its text and tables carry the corrected values) and the NEJM correction of June 9, 2016 (`CARE-NEJM-Correction-2016.pdf`, p2297). The separate Obstetrics and Gynecology 2016 correction (reference 5) and the Brubaker et al. letter at NEJM p2295 were not supplied and remain unread.

### Changed in `care.json`

- Primary report `care-2006`: `source.level` full-text, checked 2026-10-19, `status.sourceRead` full-text. Locators are now journal pages and tables (pp1559-1565).
- Primary result now has arm denominators (49/146 vs 89/155), the adjusted OR 0.40 (95% CI 0.24-0.66), the prespecified interim stopping levels (0.0042 first, 0.019 second) and whether met (met: true; P < 0.001 against 0.0042), the plan of 480 women for a 10-point difference, and the missing-data handling (11 and 10 undeterminable; three ITT sensitivity analyses significant).
- Corrected: the urge result was labeled "Urge incontinence frequency". Table 3 shows it is the composite urge outcome (50/153 vs 58/151); true urge incontinence is a bothersome-symptom row (10/147 vs 18/151, P = 0.18). Relabeled, denominators added.
- Corrected: baseline description in Limitations ("94% white, mean age 62 +/- 10") came from the 2008 two-year paper; Table 1 of the primary gives age 62.4 +/- 9.7 vs 60.3 +/- 10.6 and white 96.2% vs 89.7%. Page now uses Table 1.
- Corrected: control arm label capitalization only.
- Added (9 results): symptom, stress-test and treatment components, bothersome stress, MESA stress and urge scores, treatment for urge outcome, no-leakage-on-reduction subgroup (47.9% vs 22.9%, data not shown in the paper), exclusion of baseline stress symptoms (54.8% vs 30.4%). Four harms with denominators (SAE to 3 months 23/157 vs 24/165; plausibly related 7/157 vs 5/165; urologic/gynecologic 5 vs 5; retention 1 vs 1) and 13 delivery facts (operative time 190 vs 170 min, blood loss 265 vs 192 mL, paravaginal repair planned 30 vs 31, hysterectomy 29.0% vs 28.0%, baseline stress test and PFDI data, masking breaks, flow numbers).
- New report `care-2016-correction` (kind correction, doi 10.1056/NEJMx160015, PMID 27276579, full text read, no results). The correction text confirms the cause (a coding error related to the urinary stress test) and lists: composite 23.8/44.1 -> 33.6/57.4; Table 3 stress-test component 7/148 (4.7) and 14/162 (8.6), P = 0.14 -> 30/144 (20.8) and 65/160 (40.6), P < 0.001; treatment for urge outcome 2/153 (1.3), 5/152 (3.3), P = 0.27 -> 5/156 (3.2), 9/164 (5.5), P = 0.45; OR 0.41 (0.24-0.70) -> 0.40 (0.24-0.66); a no-leakage-on-reduction figure 38.2 -> 20.8 changed to 47.9 -> 22.9; the baseline-symptom exclusion figure 19.8 vs 41.3 -> 30.4 vs 54.8; the final Results paragraph (1-year data) omitted. This answers the earlier open question: the correction changed more than the two composite percentages. Earlier notes said it was unknown whether other figures changed.
- Visco 2008 exploratory result: note added that it predates the correction.
- Takeaway: "urge incontinence" replaced by "urge symptoms" (41 words). Verdict and verdictNote unchanged and confirmed.

### Changed on the page

Design (exclusion by urethrovesical mobility, sealed envelopes, interim plan), Results (denominators, OR, components, subgroup, correction details, urge outcome naming), Surgery and treatment delivery (Burch technique, operative time, blood loss, paravaginal repair, hysterectomy, stage), Adverse events (3-month SAEs), Limitations (primary-report demographics, 19.2% baseline leakage, masking breaks, generalizability statement). The erosion paper's 83/322 concurrent hysterectomy and 228/322 prior hysterectomy figures were removed from page prose in favor of the primary report's Table 1 and text values, because of the disagreements below (the JSON keeps the erosion paper's values in its own report).

### Disagreements the full text reveals

- Primary Results text says 70.1% had prior hysterectomy; Table 1 gives 112/156 (71.8%) and 116/165 (70.3%) (228/321 = 71.0%, 228/322 = 70.8%, as in Cundiff 2008). Internal to the paper.
- Concurrent hysterectomy: primary reports 29.0% (Burch) and 28.0% (control), P = 1.00 (about 92 of 322); Cundiff 2008 reports 83/322 (25.8%). The two cannot both be right for the same denominator. Not resolved; the page uses the primary and the JSON keeps Cundiff's value in the erosion report. Anyone using the erosion odds ratio for hysterectomy (4.9) should know the count is the erosion paper's.
- Visco 2008 (pre-correction) gives postoperative stress incontinence with a negative reduction test as 38% (no Burch) and 21% (Burch); the corrected primary gives 47.9% and 22.9% for the same group (data not shown). The two likely use different endpoint construction or the uncorrected coding; the Visco figures, and the sentence in `docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx` (line 322: 58% vs 38%, 32% vs 21%), may be affected by the correction. Not edited. Visco's 12/313 without reduction vs the primary's Table 2 3/153 + 9/159 = 12/312.
- Urge result naming: the abstract's "frequency of urge incontinence (32.7% vs 38.4%)" is the composite urge outcome in Table 3. Pages that call this "urge incontinence" should say urge outcome or urge symptoms. Not found on other WARWIKI pages in a grep of CARE mentions.
- Methods list urge symptoms among the primary outcomes, but the null hypothesis concerns stress incontinence only; the file keeps urge as `secondary` so the quick-hit does not show "Not met" for an endpoint without a superiority target.
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/burch-colposuspension.mdx` says the 2016 correction changed the composite "after correction of stress-test coding": confirmed by the correction text. Its numbers (33.6% vs 57.4%) match. Other WARWIKI pages checked earlier (sacrocolpopexy, prolapse-repair-principles, mesh-complications, polypropylene) are consistent with the full text.

### Still not read

NEJM p2295 letter by Brubaker et al.; Obstetrics and Gynecology 2016 correction text; ClinicalTrials.gov record.
