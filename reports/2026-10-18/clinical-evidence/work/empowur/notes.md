# EMPOWUR notes

## Sources opened

| Source | Identifier | Where | Level |
|---|---|---|---|
| Staskin 2020, J Urol 204(2):316-324 (primary) | doi 10.1097/JU.0000000000000807, PMID 32068484 | PubMed abstract and Crossref metadata. Full text is on auajournals.org (not opened: AUA bars AI use of its site; the resolver returned 403). No PMC copy and no local copy. | abstract only |
| Staskin 2021, J Urol 205(5):1421-1429 (52-week extension) | doi 10.1097/JU.0000000000001574, PMID 33356445 | PubMed abstract. Open access at the publisher but hosted on auajournals.org, so not opened. | abstract only |
| Varano 2021, Drugs Aging 38(2):137-146 (age 65 and 75 subpopulations) | doi 10.1007/s40266-020-00829-z, PMID 33469832 | PMC7882560 (open full text via NCBI efetch) | full text |
| Frankel 2021, Int J Clin Pract 75(5):e13937 (patient-reported outcomes) | doi 10.1111/ijcp.13937, PMID 33332699 | PMC8244055 | full text |
| Staskin 2022, Int J Clin Pract 2022:6475014 (OAB dry and wet) | doi 10.1155/2022/6475014, PMID 35685566 | PMC9159226 | full text |
| ClinicalTrials.gov NCT03492281 (EMPOWUR) | API v2 JSON | protocol, participant flow, baseline, 15 outcome measures with analyses, adverse events | registry results |
| ClinicalTrials.gov NCT03583372 (extension) | API v2 JSON | participant flow, outcomes 1-5, adverse events | registry results |
| GEMTESA label, revised 02/2025 | local file `reports/audit-v2/sources-local/pdfs-2026-10-06/label-gemtesa-vibegron.txt` | sections 1, 6.1, 14.1 (Table 3 of Study 3003) | label |
| AUA/SUFU OAB guideline 2024 | local `aua-oab-2024-unabridged.txt` | statement 16 and its discussion (EMPOWUR is its reference 154) | guideline |
| EAU male LUTS guideline, March 2026 | local `eau-male-luts-2026.txt` | section 5.2.4 text and recommendation | guideline |
| EAU female LUTS guideline, March 2026 | local `eau-non-neurogenic-female-luts-2026.txt` | section 4.1.4.b beta-3 agonists | read, not cited (does not cite EMPOWUR; refs 185 and 187 are other studies) |
| FDA Drugs@FDA, NDA 213006 | accessdata.fda.gov overview page | original approval 12/23/2020; supplement 11 (12/18/2024) "Efficacy-New Indication" | approval date |

DOIs, volumes, pages and author lists were checked against Crossref and PubMed (all five citations match). NCT numbers were taken from the registry and the PubMed data bank field.

## Evidence level and what is not in the trial file as full-text

- `status.sourceRead` is `abstract` because the primary report's full text could not be opened. Every primary-report number comes from the abstract, except these, which come from other documents and are located as such in the file: the 95% CIs and exact P values for the primary and key secondary endpoints, the arm-level n, the sex-adjusted responder percentages, and the 100%-reduction endpoint (all ClinicalTrials.gov NCT03492281 results); volume voided per micturition (label Table 3, matching registry 23.5 versus 2.2 mL); and the harms other than discontinuation and hypertension (Varano 2021 Table 3, registry adverse events). A reviewer with the NEJM-style PDF should recheck these against the paper (labels: PDF page or table).
- `met: true` for the primary and key secondary results rests on the abstract (co-primary P < 0.001 and P < 0.0001, key secondaries P < 0.01) and the registry analyses.
- Report `source.file` is null for all reports (no local copies). The extension is abstract-only in the file; its denominators (152/120, 125/91) and adverse-event counts come from the NCT03583372 registry results.
- Primary-report published date 2020-02-18 and extension 2020-12-28 are the PubMed electronic dates (`dateLocator` records this).

## Reports considered and left out

- Newman 2023, Urogynecology 29:48 (EMPOWUR women subgroup; abstract only on PubMed, cited by the AUA/SUFU guideline): no open full text; subgroup consistent with the whole trial per the guideline, but not opened here.
- Frankel 2022, Ther Clin Risk Manag 18:171-182 (PMC8901416) and Kennelly 2022 Adv Ther (PMID 34921665, meaningfulness of symptom reduction): review and secondary interpretive analyses, not needed for the headline results.
- Plain-language summaries (J Comp Eff Res 2023, Ther Adv Urol 2025), the COMPOSUR design paper (BMC Urol 2023) and the Bayesian synthesis (LUTS 2026): not trial reports.
- COURAGE (J Urol 2024): has its own trial file; used only as a relation target (label states Study 3005 is a 24-week placebo-controlled trial in men with OAB on BPH therapy; the identification of "COURAGE" with Study 3005 rests on the site's trial list, not on a document I opened).

## Disagreements with other WARWIKI pages

Searched `docs/` for EMPOWUR and vibegron. EMPOWUR numbers appear only on `docs/01-foundations/pharmacology/storage-oab/beta3-agonists.mdx` (lines 75-83, 133-139, 162). Checked against the abstract, label, registry and Varano Table 3:

- All checked values agree: micturitions -1.8 versus -1.3; urge incontinence -2.0 versus -1.4 (P < 0.0001); hypertension 1.7% versus 1.7%; urinary tract infection 5.0%; headache 4.0%; nasopharyngitis 2.8%; dry mouth 1.7% versus 0.9%; adverse-event discontinuation 1.7% versus 3.3%; extension 6.6% UTI, 5.5% headache, 4.8% nasopharyngitis, discontinuation 1.5% versus 3.4% (registry 4/273 and 8/232); 506 extension patients.
- Line 79, "Volume per void: Significantly greater increase (P<0.001)": the label gives P < 0.0001 (+23 mL versus +2 mL; difference 21 mL, 95% CI 14 to 28). Minor.
- Line 83, "506 EMPOWUR completers entered active treatment": placebo completers were re-randomized 1:1 to vibegron or tolterodine and the extension also had a tolterodine arm; 505 were treated. Not wrong, but the extension comparator (tolterodine) is not mentioned.
- No other page states an EMPOWUR number.

## Disagreements with the old Journal Club record (`src/data/trials.ts`)

- `result` says P < 0.001 for both endpoints; the urge incontinence P value is < 0.0001 (micturitions < 0.001).
- `result` says tolerability was "sustained over the 52-week extension"; the extension had no placebo arm and compared vibegron with tolterodine, and its safety set was 273 vibegron and 232 tolterodine patients.
- `population` omits that up to 25% of patients had OAB dry and that men were capped at 15% (85% women); the urge incontinence endpoint was analyzed only in OAB wet patients.
- `primaryOutcome` is correct but "urgency-incontinence episodes" is OAB wet only. `n` 1,518, journal, year, DOI, and tolterodine ER as active control are correct. `bottomLine` ("few anticholinergic effects") is supported only as lower dry mouth versus tolterodine (1.7% versus 6.5%).

## Discrepancies between sources (kept in the file notes)

- Registry lists 215 locations; Varano 2021 reports 199 sites. The page uses 199.
- Registry adverse-event disposition: 8/547 (vibegron), 6/540, 13/431 withdrew for adverse events; the abstract gives 1.7%, 1.1% and 3.3%. The file uses the abstract.
- Tolterodine urinary tract infections: 24 in the registry, 25 in Varano Table 3 (used).
- Registry enrollment count is 1,530; 1,518 were randomized (abstract, Frankel 2021, participant flow).

## Not verified

- Full-text content of Staskin 2020 and 2021 (design details, sample-size assumptions, whether both co-primary endpoints were required to be met, subgroup tables, the supplement).
- Which published report first gave the 100% urge incontinence resolution endpoint for the 12-week study (registry only).
- FDA indication text at the 2020 approval (the page cites only the current label for the indication wording and Drugs@FDA for the approval date).

Counts: 5 reports, 26 results, 18 harms, 11 references. Sources not opened: auajournals.org full texts of the primary and extension reports.

## Full-text update, October 19

Source: Staskin 2020 (J Urol 204(2):316-324), full text supplied by the owner (`pdfs-2026-10-19/EMPOWUR-Staskin-2020.pdf`, read in full including Tables 1 and 2, the editorial comments and the authors' reply). Figures 1 to 3 are images with no extractable numbers. The 52-week extension report was not supplied and stays at abstract level. `status.sourceRead` is now `full-text`; the primary report's `source.level` is `full-text`, `checked` 2026-10-19.

### Corrected (8)

- Week-12 patient counts: the file labelled 492/475/378 (micturitions) as the full analysis set and 383/372/286 (urge incontinence) as the incontinence set. These are patients with week-12 data. The analysis sets are 526/520/417 (FAS, Table 1) and 403/405/319 (FAS-I; total 1,127). Notes on both co-primaries and urgency fixed.
- Volume voided per micturition: now the paper's values, +23.5 versus +2.2 mL (tolterodine +15.5), difference 21.2 mL (95% CI 14.3 to 28.1; P<0.0001); previously rounded label values (+23, +2, 21, 14 to 28).
- 75% urge incontinence responders: values now the paper's unadjusted 52.4%, 36.8% and 47.6% (P<0.0001). The file had the registry's sex-adjusted 49.3%, 32.8%, 42.2% and difference 16.5 (9.7 to 23.4); the paper does not print the difference, so the effect is `none` and the registry figures sit in the note and the page, attributed to the registry.
- Discontinuation for adverse events: counts 9/545 (1.7%), 6/540 (1.1%), 14/430 (3.3%) from Table 2 (file had percentages only; the registry disposition counts 8/547, 6/540, 13/431 differ and are not used).
- Hypertension: all arms now as counts, 9/545, 9/540, 11/430 (Table 2); the tolterodine UTI, dry mouth, retention and SAE counts in the file already matched Table 2.
- Enrollment dates: the page said enrollment ran March 2018 to February 2019. The paper says randomization began March 26, 2018 and the last patient completed 12 weeks on January 7, 2019; the February 2019 end appears to be a registry date. Page now uses the paper's dates.
- Population: `design.population` said "mean age of 60"; the paper gives medians (61, 63, 61 by arm; Table 1), 85.2% women and 42.9% aged 65 or older. Updated; locators changed from abstract and registry to Results, Table 1, Figs. 2 and 3 where the paper has the number.
- Verdict note reworded: tolterodine versus placebo was a supportive comparison with nominal P values; vibegron was not compared with tolterodine.

### Added (11 new entries plus note-level detail)

- Results: tolterodine versus placebo for urgency (difference −0.4, 95% CI −0.9 to 0.0, P=0.0648) and volume (13.3 mL, 95% CI 5.9 to 20.7, P<0.001); onset from week 2; vibegron numerically greater than tolterodine on every primary and key secondary endpoint; similar response in patients with prior OAB drugs (supplementary table 2, not seen); power assumptions in the notes (0.60 and 0.51 differences).
- Harms (5 new entries): any AE, AE of clinical interest, blood pressure increased, tachycardia, headache (with nasopharyngitis, diarrhea, nausea in the note), plus related-SAE and death details and discontinuation causes.
- Delivery (6 new): study periods and double-dummy design, stratification, enrollment and sites, analysis sets, sample size, baseline values (11.5 micturitions, 8.1 urgency episodes, 150.5 mL, 3.5 urge incontinence episodes), statistical handling (MMRM, CMH, multiple imputation, hierarchy, nominal P for supportive comparisons).
- Page: design (washout, run-in, hierarchy, power), baseline, the added results and the expanded adverse events paragraph.

### Left on registry or other sources

The 100% urge incontinence reduction endpoint (25.3% versus 19.0%), randomized arm counts (547/540/431), completers by arm, screened count (3,149), country list, the detailed exclusion list and the UTI/other registry data are not in the paper's text (Fig. 1 is an image); locators still name the registry or Varano 2021. The paper's inclusion text states only the 3,000 mL urine-output exclusion.

### Disagreements with other WARWIKI pages

None new. `docs/01-foundations/pharmacology/storage-oab/beta3-agonists.mdx` line 79 ("Volume per void: P<0.001") differs from the paper (P<0.0001 for vibegron versus placebo; P<0.001 is the tolterodine comparison). The same page's "506 EMPOWUR completers entered active treatment" is the extension report, not this paper. Hypertension in people 65 and older: the authors' reply reports 3.1% placebo, 1.2% vibegron, 2.9% tolterodine, matching Varano 2021 as used.
