# Independent source review: Cochrane incisional NPWT, 2022

Reviewed September 12, 2026 by the tools-review agent. No wound-page edits were made for this assignment. This is a source assessment, not clinical clearance of all NPWT uses.

## Source and actual access

Norman et al., *Negative pressure wound therapy for surgical wounds healing by primary closure*, Cochrane 2022;4:CD009261, **DOI [10.1002/14651858.CD009261.pub7](https://doi.org/10.1002/14651858.CD009261.pub7)**, [PMC9040710](https://pmc.ncbi.nlm.nih.gov/articles/PMC9040710/), PMID35471497. The literature search was January 6–7, 2021; publication in 2022 does not make this evidence current through 2022 or 2026.

The complete published XML text was actually read: front matter and abstracts; entire 149,501-character body; entire 508,706-character back matter; all six appendices (including search strategies, bias criteria, non-pooled findings and economic analyses); all 178 XML table elements, including individual study characteristics and risk-of-bias assessments; included/excluded/awaiting/ongoing-study lists; protocol changes, author contributions, funding, conflicts and all 387 reference entries. Truncated tool output was recovered in separate overlapping reads. This is a full read of the review and its study-extraction tables, **not** independent full reads of its hundreds of cited publications or registry records.

The PMC/Europe PMC assets contained readable Figure 2 but only 100×100 thumbnails for the other 15 graphics. The [authors' University of Manchester archived PDF](https://pure.manchester.ac.uk/ws/files/216688427/NPWT_surgical_wounds_primary_closure.pdf) resolved this limit. Its cover describes an accepted author manuscript; the enclosed pages identify the 2022 pub7 review. All **16 graphics** were viewed at readable resolution: risk-of-bias matrix (PDF pages14–15), study flow (19–20), bias graph (23), funnel plot (25), and all 12 forest plots, including continuations (204–214). These correspond to article pages11–12,16–17,20,22,201–211. The entire PDF was not separately reread after reading the complete published XML. There are no separate supplementary-material elements in the XML; the Europe PMC supplementary download contains only image versions, not an additional appendix or supplement. No inaccessible supplement was counted as read.

Reproducible local source files (temporary cache, not deployed):

- `/tmp/wound8-PMC9040710.xml`, SHA256 `3fbf4f647417d8d8e2cd1ca570eb7a49d73c1b9081df5f6779b0a2322531a526`.
- `/tmp/wound8-PMC9040710-{front,body,back}.txt` and `/tmp/wound8-npwt2022.html`.
- `/tmp/tools-npwt-manchester2022.pdf`, SHA256 `5cde899269f94353577c6f4a308dd45ed5e847967c23d9fdfede0a3d29eb11c0`; extracted text with the same stem.
- `/tmp/tools-npwt-pdf-figures/page-{14,15,19,20,23,25,204..214}.png`.
- `/tmp/tools-npwt-epmc-supp`: archive retrieved from `https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9040710/supplementaryFiles`.

## Findings suitable for the site

The review included **62 RCTs and 13,340 participants**, plus six economic studies. Its intended population is **primarily closed surgical incisions without pre-existing infection**, not open wounds healing by secondary intention, skin-graft bolsters, flap viability or a general treatment for all reconstructive wounds. Caesarean and orthopaedic studies contribute much of the evidence; direct evidence for particular GU reconstructions is limited.

| Outcome | Published result | Meaning |
| --- | --- | --- |
| Surgical-site infection | 44 studies,11,403 participants;496/5716 versus668/5687; RR0.73 (95%CI0.63–0.85), moderate certainty | NPWT probably reduces SSI on average across the studied closed-incision settings. Absolute benefit depends on baseline risk. |
| Wound dehiscence | 23 studies,8724 participants;290/4378 versus303/4346; RR0.97 (0.82–1.16), moderate certainty | Probably little or no difference; do not claim reduced wound separation. |
| Mortality | 11 studies,6384 participants; RR0.78 (0.47–1.30), low certainty | A survival benefit is not established. |
| Reoperation | 18 studies,6272 reported participants; RR1.13 (0.91–1.41), low certainty | No demonstrated reduction; outcome definitions and a denominator concern below require caution. |
| Readmission | 15 studies,5853 participants; RR0.98 (0.70–1.38), low certainty | No demonstrated reduction. |
| Skin blistering | 11 studies,5015 participants; RR3.55 (1.43–8.77), low certainty;I²74% | NPWT may increase skin blistering; effect varies substantially. |

The prespecified sensitivity analysis retaining trials at low risk for randomization, concealment and assessor blinding still found an SSI effect: **RR0.81 (0.67–0.97),8 studies/5809 participants**. This supports restrained use of the overall finding despite weaknesses in individual study records. Dehiscence sensitivity analysis remained inconclusive, **RR1.01 (0.71–1.42)**. Economic findings differ by indication, health system and underlying trial; there is no universal cost-saving result. The review does not establish an optimal brand, pressure, duration, or superiority of one NPWT device over another.

Suggested concise clinical wording: “For primarily closed surgical incisions, a 2022 Cochrane review found that incisional NPWT probably reduces surgical-site infection, but probably makes little or no difference to dehiscence. Skin blistering may increase. Consider baseline wound risk and procedure-specific evidence; these findings do not establish benefit for open wounds, graft take or flap survival.”

## Source-internal discrepancies requiring restraint

These are reasons to avoid copying every source number uncritically. They are not a reanalysis of the review and do not establish that its overall SSI/dehiscence findings are invalid.

1. **Exploratory superficial/deep SSI denominators:** forest Analysis1.4 uses Gillespie2021 **70/75 versus93/99**, while its total-SSI and deep-SSI analyses use randomized denominators **1017/1018**. The former denominators match all-SSI case counts, not all participants. The superficial and deep plots also use Hussamy2017 denominators **37/41**, whereas total SSI uses **222/219**. Do not promote the exploratory pooled superficial-versus-deep results to a clinical distinction. The review itself rates these exploratory findings very low certainty. Original trials were not independently reread to repair the meta-analysis.
2. **Wihbey reoperation denominator:** Analysis1.7 uses **180/181** despite the review's other outcome analyses using **80/81** and its trial characteristics reporting166 randomized. No corrected pooled estimate was generated.
3. **Masden2012 population description:** the review's summary and study-characteristics row describes radial-forearm flap/graft dressings, inconsistent with the [original primary abstract](https://pubmed.ncbi.nlm.nih.gov/22549748/), which was independently read in full from `/tmp/wound8-masden2012.xml`. That abstract reports81 analyzed patients (44NPWT/37dry),74 lower-extremity wound closures, treatment over incisions at surgery completion, infection6.8%/13.5% and dehiscence36.4%/29.7%, neither statistically significant. The review forest counts (infection3/44 versus5/37;dehiscence16/44 versus11/37) agree with that abstract. This appears to be descriptive extraction contamination, **not proof the original trial was an ineligible graft trial**. Original full manuscript not accessed.
4. **Lozano-Balderas2017 eligibility tension:** its included-study description gives VAC until granulation, then closure, despite the review's exclusion of delayed-primary-closure treatment. The trial is included in the overall SSI pool. Its original manuscript was not independently reviewed here; this remains an unresolved source issue. It is excluded from the low-bias sensitivity set.
5. **Absolute SSI interval:** the Summary-of-Findings row reports117/1000 baseline and31 fewer with an interval of10–43 fewer. RR0.63–0.85 applied to117/1000 yields approximately18–43 fewer, not10–43. Use the verified relative effect and avoid copying the inconsistent absolute interval.
6. **Subgroup heterogeneity:** the narrative prints an impossible contamination-subgroup I²329%; the complete Analysis1.3 plot gives **49.2%**, with subgroup-difference P0.12. Do not reproduce the narrative figure or claim a proven between-contamination-group difference.
7. **Pleger/Hasselmann table conflicts:** Pleger total-SSI counts1/58 versus10/71 conflict with an appendix's superficial counts5/58 versus28/71 and deep0/58 versus2/71 without a clear common timepoint explanation. Hasselmann2019b's paired-study1/19 versus5/19 all-SSI result is called superficial in its table but appears under deep SSI in the appendix. Do not use these isolated entries as definitive procedure-specific estimates without original-source reconciliation.
8. **Other non-adopted discrepancies:** low-bias dehiscence sensitivity text says5395 although stated arms2666+2629 equal5295; main Heard economic prose gives GBP20.65/QALY whereas its source table/appendix gives AUD42,340/QALY; CHEERS “all>80%” contradicts the79.2% table entry; some study dates/arm counts appear copied from other trials. The WHIST reoperation pool uses broadly defined further surgery rather than only wound-related reoperation, as the review acknowledges. These details should not be imported into clinical prose without checking their original sources.

No independent rerun of the meta-analysis, original-trial data audit or complete post-2021 literature update was performed in this source assignment. The remaining whole-site review continues separately.
