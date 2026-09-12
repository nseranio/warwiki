# FiiRST-2: independent complete protocol review

Reviewed 2026-09-12 by operative reviewer. This is a primary-source review supporting the vascular-exposure audit, not patient-level validation or clinical sign-off. No MDX was edited.

Primary publication: [da Luz et al., JAMA Network Open 2025](https://doi.org/10.1001/jamanetworkopen.2025.32702), PMID 40982282, [PMC12455389](https://pmc.ncbi.nlm.nih.gov/articles/PMC12455389/). Root's separate [main-paper/SAP report](fiirst2-main-source-review.md) records their independent scope and result checks.

## Exact access

- Independently read **all 88 PDF pages** of Supplement 1, protocol version 3.0, dated June 11, 2022: every narrative section, all 11 numbered tables with footnotes, all 100 references, and all six appendices. Text output truncations at the abbreviation page and final references were repaired with complete rereads.
- Independently inspected actual rendered Figure 1 on page 29; all numbered tables on pages 10, 36–37, 39, 42, 47–48, 51, 58–59 and 65; dosing/statistical pages 40 and 64; and **every actual appendix page 83–88**, including the consent decision diagram. The PDF image inventory contains one embedded raster image, the page-29 flowchart; the remaining inspected tables/diagrams are vector/text. This is not a claim that all 88 page images were inspected.
- Independently read the complete current main **abstract and Methods** from root's primary XML cache to compare intervention, outcome and protocol-change wording. Root independently read the rest of the paper, its correction and Supplements 2–4; that scope is not claimed here.
- The supplied protocol contains **one version**, not a series of original and amended versions. No earlier protocol, amendment log, historical registration record, patient-level data or analysis code was available in this assignment. The outline also says final protocol December 1, 2020, but the actual document repeatedly carries version 3.0/June 11, 2022. Its generic amendment procedure is not an amendment history.

Local protocol: `/tmp/vascular11-fiirst2-media/jamanetwopen-e2532702-s001.pdf`; complete extracted text beside it. Per-page text: `/tmp/operative-fiirst2-pages.json`. Inspected renders: `/tmp/operative-fiirst2/protocol-p{page}.png`.

Protocol PDF SHA-256: `2f0a9a82574a1799ac7e5d13a93c0f2f4b950ff285f4f330a2cd24f936957763`.

Main XML selected-section source SHA-256: `e4511c29351bfc0e9c84a9a21025c68af7de5ae4630fefac3015234e043d2e97`.

## Consequential interpretation checks

1. **A combined early replacement strategy.** Each of the first two intervention packs, if needed, contained 4 g fibrinogen concentrate (FC) plus 2000 IU four-factor PCC, replacing four frozen-plasma units in each control pack. Both arms received red cells; the second pack contained a platelet dose. This is neither PCC monotherapy nor a comparison with withholding coagulation-factor support. Two complete intervention packs would supply 8 g FC and 4000 IU PCC; 4 g/2000 IU is the per-pack amount, not necessarily the entire treatment course. Protocol pages 29, 33–42 and Appendix 3 support this distinction.

2. **Rescue and later treatment matter.** Controls could receive FC for low fibrinogen or the site's viscoelastic/clinical criteria. Additional FC was also possible in the intervention arm after completion of the required early pack. Plasma was permitted in the intervention arm from pack three, and subsequent treatment followed local protocols, then laboratory-guided management after hemorrhage control. The study does not establish an admission-long plasma-free strategy or compare FC with no FC.

3. **The primary count has a structural limitation.** It counts red cells, plasma and platelets, **not FC/PCC**, and counts one therapeutic platelet dose as **four units**, whether pooled or apheresis. Replacing early plasma directly affects that composite. It is not a measure of all donor exposures, total infused product volume, total hemostatic treatment or blood loss. The protocol separately prespecifies a count excluding the first two packs' plasma units. The primary clock is hospital arrival; protocol text allows completion of a second pack begun within the first 24 hours. Do not silently substitute a randomization-based clock or assume every component necessarily finished before hour 24.

4. **Superiority, not equivalence.** The chosen sample-size scenario assumes mean 15 versus 10 units, 80% power, one-sided alpha .025 and a null rate ratio of 1; planned 297 evaluable patients were inflated to 350. Negative-binomial modeling compares intervention/control mean counts. A passing reference to what might happen under a hypothetical noninferiority design on page 31 does not turn this into such a trial. Planned futility/conditional-power stopping also does not establish equivalence, noninferiority, survival benefit or equal safety. The actual early stop and imprecise observed results are documented in root's main report.

5. **Postrandomization restrictions are explicit.** Protocol pages 65–66 restrict its labeled ITT population to patients receiving study treatment and permitted to contribute data; its primary mITT population is classified by the first treatment pack actually received if allocation and treatment differ. A patient receiving a different second pack remains classified by the first. This should not be presented as an unrestricted all-randomized ITT analysis. Consent refusal and inability to contact a surrogate are distinct: pages 72 and 88 allow data collection for certain incapacitated/deceased patients without an approachable surrogate, while refusals can exclude further data. Without records, the actual effect of each consent pathway cannot be audited.

6. **Safety ascertainment is limited.** Clinical personnel administering resuscitation were unblinded; patients/outcome assessment were masked through labeling and record abstraction. Imaging for thrombosis was performed when clinically indicated, not universal screening. Follow-up was at most 28 days. Treatment-emergent events exclude preexisting injuries unless they worsen after treatment. Absence of a statistically significant between-group difference cannot support a zero-risk or equivalent-safety statement. Historical protocol assertions of little added risk or superior safety are hypotheses/rationale, not trial results.

7. **Restricted trauma population.** Estimated age over 16, MHP activation within the first hospital hour and injury within three hours were required; recent anticoagulant use, heparin-induced thrombocytopenia, pregnancy, bleeding disorders and penetrating brain injury with GCS 3 were among exclusions. Prehospital and prerandomization hospital red-cell limits were specified separately. This is not an anticoagulant-reversal trial, and its regimen should not be generalized directly to elective GU bleeding.

8. **Version chronology remains unresolved.** Main Methods says the protocol did not change after enrollment, whereas the supplied document is labeled version 3.0/June 2022 and enrollment began April 2021. This warrants a documented access limitation, not a fabricated amendment history or an accusation of outcome switching. The earlier versions/change log would be required to reconcile that statement. Root separately documents the later SAP date.

9. **Funding and dosing scope.** Page 24 states Octapharma funded medical writing, data management, statistics, monitoring and the independent monitoring committee alongside public/defense funding. That role should be reconciled with publication disclosures, not omitted from an evidence assessment. The protocol's specific product concentrations, preparation volumes and infusion rates are historical study instructions; they are not verified current IFUs or a universal dosing protocol.

## Source defects not to reproduce

- Appendix 4 calls its middle column a target but mixes target-looking and trigger-looking inequalities; Appendix 5 gives values such as fibrinogen above 2 g/L or INR below 1.5 beside factor/plasma treatment. They are not a reliable ready-made list of treatment triggers. Do not convert these rows into giving fibrinogen for an already high concentration or red cells above a hemoglobin target.
- The multiple-organ-failure definition on page 57 instead describes a sepsis-related SOFA change; the SOFA table contains overlapping boundaries and malformed renal units. Its GCS direction is nevertheless clear: normal 15 deteriorates toward lower scores. The main Methods/figure statement that higher GCS means greater disability is wrong.
- Page 56's DVT parenthesis includes arteries. That must not become a definition of venous thrombosis on the site.
- Selected sample-size Table 11 scenario 3 uses the intended null ratio 1. A different scenario lists 1.2 despite the footnote; do not use that inconsistent row to invent a noninferiority margin.
- Site counts vary between outline/narrative, and Table 2 duplicates a Vancouver row with differing packs. Use the actual paper's enrolled-center count and distinguish local protocol variation.
- A page-27 mention of 29-day mortality conflicts with the otherwise 28-day outcome; an outline reference to ARDS-free days is not a basis to invent a reported endpoint.
- Several rationale citations do not match their descriptions: page 21 calls reference 77 a cardiac PCC trial, although its title concerns fibrinogen in aortic surgery; references 65/66 concern platelet proteomics/red-cell biology rather than the claimed plasma-factor variability. These title-level discrepancies were identified from the complete bibliography; the antecedent articles were not independently fully reviewed here.
- Planned analyses within groups defined by observed massive transfusion or survival are vulnerable to postrandomization selection; they should not be promoted as causal responder-subgroup evidence.

No additional blocker was found to a brief, qualified statement that FiiRST-2 failed to establish superiority of the early combined concentrate strategy. The protocol cannot repair the main paper's numerical/graph errors, establish equivalent safety or authorize routine empiric PCC use.
