# Altman (Nordic TVM) source and consistency notes

## Sources opened

| Item | Source opened | Access | Use |
|---|---|---|---|
| Altman et al., *N Engl J Med* 2011;364(19):1826-1836, DOI 10.1056/NEJMoa1009521, PMID 21561348 | [Publisher full text](https://www.nejm.org/doi/full/10.1056/NEJMoa1009521), [publisher PDF indexed text](https://www.nejm.org/doi/pdf/10.1056/NEJMoa1009521?articleTools=true), [PubMed record](https://pubmed.ncbi.nlm.nih.gov/21561348/) | Full text online; no local owner copy located | Primary report; Methods, Figure 1, Tables 2–4, Results and Discussion. Bibliographic fields checked against publisher and PubMed. |
| Ek et al., *Neurourol Urodyn* 2010;29(4):527-531, DOI 10.1002/nau.20811, PMID 19731311 | [PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/19731311/) | Abstract only online | Randomized urodynamic substudy of 50 participants (23 mesh, 27 colporrhaphy); no quantitative pressure effect in the abstract. Online date 2009-09-03 from [OpenAlex](https://openalex.org/W2084584373); issue date April 2010 from PubMed. |
| Correction, *N Engl J Med* 2013;368(4):394, DOI 10.1056/NEJMx130001 | [Publisher full text](https://www.nejm.org/doi/full/10.1056/NEJMx130001) | Full text online | Corrected manufacturer involvement wording, without changing trial outcomes. |
| ACOG/AUGS Practice Bulletin 214, 2019, DOI 10.1097/AOG.0000000000003519, PMID 31651832 | `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/pdfs-2026-10-09/pelvic-organ-prolapse-acog-practice-bulletin-number-214.txt`; [PubMed bibliographic record](https://pubmed.ncbi.nlm.nih.gov/31651832/) | Full text local guideline copy | Level A conclusion on anterior mesh versus native tissue, summary of recommendations. It cites the Cochrane randomized-trial synthesis rather than Altman directly. |
| NICE NG123, 2019 recommendation version | `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/nice-ng123-ui-pop-women.txt` | Full text local guideline copy | Read recommendations 1.8.20–1.8.22 and IPG599 cross-reference; omitted from page because no recommendation strength grade is published in this copy. |
| FDA urogynecologic mesh activities | [Official FDA page](https://www.fda.gov/medical-devices/urogynecologic-surgical-mesh-implants/fdas-activities-urogynecologic-surgical-mesh) | Official online record | April 16, 2019 order. The remaining applications were for Uphold LITE, Xenform, and Restorelle DirectFix Anterior; the order was not a Prolift-specific withdrawal. |

No matching primary-report PDF or text was found by DOI, author, or trial name in the owner's `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine`, or `/Users/joyboy/Downloads` searches. Direct shell retrieval of the NEJM PDF failed on DNS resolution; the publisher full-text page and indexed PDF tables were available through web access. The NEJM supplementary appendix and protocol were not read, so technique details beyond the article are not asserted.

## Reports considered and left out

- Ek et al., "Clinical efficacy of a trocar-guided mesh kit for repairing lateral defects," DOI 10.1007/s00192-012-1833-9, PMID 22707003: [abstract opened](https://pubmed.ncbi.nlm.nih.gov/22707003/). This 99-patient subgroup reported fewer persistent lateral defects with mesh but similar overall UDI change. It is a narrow anatomy subgroup rather than a longer-term update or a practice-changing endpoint, so it is not in the family file.
- Elmér et al., "Risk factors for mesh complications," DOI 10.1002/nau.22231, PMID 22517125: [abstract opened](https://pubmed.ncbi.nlm.nih.gov/22517125/). The record is linked to the separate NCT00402844 prospective mesh cohort, not the NCT00566917 randomized trial.
- Elmér et al. 2009 Nordic Prolift cohort and Altman et al. 2009 sexual-function cohort: identified in [a full-text document reproducing the papers](https://radar.assets.avrotros.nl/editorial/Documenten/Technical_File_Isolve_TEM.pdf), pages 104–121. Both concern the earlier NCT00402844 single-arm cohort, so neither belongs to this randomized trial family.
- Rudnicki et al. three-year collagen-coated mesh follow-up, DOI 10.1111/1471-0528.13628, PMID 26420345: [PubMed abstract opened](https://pubmed.ncbi.nlm.nih.gov/26420345/). This is a distinct randomized trial (different device and enrollment), not an Altman follow-up.
- No later patient follow-up report from NCT00566917 was identified. The primary report's outcome horizon remains one year.

## Disagreements with existing WARWIKI content

- `docs/03-clinical-conditions/03c-pelvic-support/anterior-compartment.mdx:128`: “new SUI (12.3% versus 6.3%)”. The primary report's **Results: Outcome Measures** gives 22/179 (12.3%) versus 11/176, displayed as 6.2% in the body; its abstract instead prints 6.3%. The exact control fraction is 6.25%, so these displays reflect different one-decimal tie-rounding conventions. This page follows the abstract.
- `docs/04-surgical-techniques/04g-prolapse-repair/anterior/anterior-colporrhaphy.mdx:98` and `:113`: “6.3% in the native-tissue arm versus 12.3% in the mesh arm” and “More new SUI (12.3% versus 6.3%, p = 0.05)”. These follow the abstract's 6.3% rather than the primary report body's 6.2% for 11/176; neither changes the underlying count.
- The remaining Altman-specific statements found on those two pages, including composite success, anatomic success, blood loss, bladder perforation, and 6/186 mesh-exposure reinterventions, agree with the primary report at the displayed precision. No other `docs` page named Altman or the trial DOI in the site search.

## Old Journal Club record

- The trial name there ends “for Cystocele”; the published title ends “for Pelvic-Organ Prolapse” (publisher title and DOI 10.1056/NEJMoa1009521).
- “De novo SUI (12.3% vs 6.3%)” follows the abstract, while the full-text body prints 22/179 (12.3%) versus 11/176 (6.2%) (**Results: Outcome Measures**). The control fraction is exactly 6.25%, so the difference is rounding at a tie.
- “Anatomically more durable” implies long-term durability. The paper demonstrates better one-year anatomy (153/186 [82.3%] versus 87/183 [47.5%], **Table 2**) and does not report a longer-term randomized outcome.
- “The trocar-guided transvaginal mesh kits studied were withdrawn from the US market by FDA order in 2019” conflates the studied Prolift kit with the three remaining products targeted in the [2019 FDA order](https://www.fda.gov/medical-devices/urogynecologic-surgical-mesh-implants/fdas-activities-urogynecologic-surgical-mesh). A UK government [mesh timeline](https://www.immdsreview.org.uk/downloads/Annexes/Annex-D-Pelvic-Mesh-Timeline.pdf) records Ethicon's decision to discontinue Prolift in May 2012. The old record's broader statement that transvaginal POP mesh products stopped US sale in 2019 is correct for the category.
- The statement that this trial was “part of the evidence trail leading to the FDA withdrawal” is a causal attribution not established by the trial or the FDA order reviewed here; the FDA describes a later PMA review and the required 36-month effectiveness and safety comparison.

## Unverified or limited

- The publisher abstract prints 6.3% for control-arm new stress incontinence, while the body explicitly says 11/176 (6.2%). Since 11/176 is exactly 6.25%, either display can result from a conventional rounding rule. The files consistently use the body's 6.2%.
- The urodynamic substudy full text was unavailable; its pressure finding and sample sizes come from the PubMed abstract. No numerical pressure change or confidence interval was inferred.
- Details of trocar passage, dissection, and perioperative antibiotic regimen that appear only in the NEJM supplement were not verified from the primary report used here.
- This is source acquisition and draft appraisal. `claimsChecked` and `clinicalReview` remain null.
