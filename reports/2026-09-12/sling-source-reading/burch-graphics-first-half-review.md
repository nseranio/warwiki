# Actual Cochrane graphics: ordinals 1–68

Date: 2026-09-12. Reader: `sling_source_read`. This is an actual-image review, separate from the ordinary article-text read at `/tmp/warwiki-open-burch-cochrane-first-half.md`.

## Inventory and access

Parsed every `<figure>` and its `<img>` URL, heading and caption directly from `/tmp/warwiki-burch/PMC6483458.html` and `/tmp/warwiki-burch/PMC6903454.html`. The combined source-ordered inventory has **136 images: 103 open-colposuspension Cochrane 2017 images, followed by 33 laparoscopic-colposuspension Cochrane 2019 images**. There are no article-blob or `graphic` images outside figure elements in either saved HTML; the other images are PMC interface/publisher branding.

All 136 exact HTML-observed image URLs were downloaded successfully to `/tmp/warwiki-burch-figures/assets/`, verified as JPEG, and recorded with path, byte count and SHA-256 in `inventory.json`. URLs were not guessed. These are the **source-native JPEGs linked by the saved PMC HTML**, not a claim that alternative publisher-resolution assets or supplements were inspected.

**Actually visually inspected every ordinal 1–68 inclusive at original detail** through the image-viewing tool. This includes all visible panels, row/column values, legends, axes, confidence intervals and footnotes. No image in this assigned range failed to load or required an unreported crop. No OCR-only reading is claimed. Exact 68-file paths, source IDs and hashes are preserved in `/tmp/warwiki-burch-figures/read-by-sling_source_read.json`.

The first image is the open review's PRISMA diagram; the last is **Analysis 7.9, operative time for open versus laparoscopic colposuspension**. Figure IDs/order do not track analysis numbering monotonically. No image ordinal 69–136 is claimed here; those ranges are assigned to the other readers. No original trial graphics or laparoscopic Cochrane figures were personally read in this particular range.

## Findings requiring editorial attention

1. **Actual recruitment diagram clarifies the denominator.** Image 1 shows 428 records identified/screened, 197 excluded, 231 full-text reports assessed, 77 reports of 63 studies excluded, and 152 reports of **55 studies** in qualitative synthesis. **142 reports of 50 studies** entered quantitative synthesis. One ongoing and one awaiting-classification report are separately mentioned. Thus “55 trials” does not mean 55 contributed to every meta-analysis, or even the quantitative synthesis overall.

2. **Risk of bias is visibly dominated by unclear assessments.** Images 2–3 display all study rows and seven bias domains. Random-sequence generation is better reported than concealment; most other domains are yellow/unclear, with named trials showing high-risk allocation/blinding domains. This is not an all-low-risk evidence base. The graphs do not supply GRADE certainty.

3. **Duplicate Ward urgency data in the same pooled analysis.** Image **40 / Analysis 5.14** includes **Ward 2002 twice**, with identical **7/79 Burch and 3/98 sling** rows: once under urodynamic diagnosis/self-fixing sling and once under symptom diagnosis/self-fixing sling. Both rows have visible weights and contribute to the overall diamond **RR 1.11 (0.67–1.83), n=730**. The repeated 177-participant row means n730 is not a unique-person count. This is an observable internal duplication; do not use this pooled estimate as a clean independent-trial synthesis or silently recalculate a replacement without trial verification. The plot's footnote also specifies that Ward's reported numbers combine urgency and urge incontinence at five years.

4. **The voiding-difficulty pool does not reproduce the original SISTEr patient endpoint.** Image **42 / Analysis 5.16** gives Albo 2007 **0/329 open vs 20/326 sling**, labeled voiding difficulty. The previously read original SISTEr main separately reports **20 revision procedures in 19 sling patients**, and substantially more patients meeting its broader voiding-dysfunction definition. Accordingly, these plotted counts appear to be revision-procedure counts, not numbers of patients with any voiding dysfunction. This explains why the pooled RR0.41 cannot safely become a universal patient-level postoperative-retention statistic. Preserve direct original-trial definitions and patient denominators.

5. **The prolapse pool's dominant row is specifically rectocele.** Image **43 / Analysis 5.17** gives Ward 2002 **31/59 open vs 26/81 sling**, RR1.64 (1.10–2.44), with **93.6%** weight in the full pool. The actual footnote states that the entered numbers are **rectocele at five years**. Its heading “new or recurrent prolapse” and pooled RR1.85 (1.25–2.75) are therefore broader than this dominant component. Do not call that pool symptomatic prolapse, apical prolapse, or a uniform any-compartment endpoint.

6. **The SISTEr perforation typo is resolved by the plot.** Image **45 / Analysis 5.20** shows **10/329 open vs 2/326 autologous sling**, RR4.95 (1.09–22.44). The narrative's 0.06% sling rate is wrong: 2/326 is about **0.6%**. The MUS subgroup points in the opposite direction, RR0.20 (0.08–0.49); there is no single pooled overall effect across these unlike subgroups.

7. **Medium-term sling confidence interval and overall significance are confirmed.** Image **30 / Analysis 5.2** gives traditional-sling subgroup **RR1.35 (1.11–1.64), 291+301 women**; all-slings overall **RR1.18 (1.01–1.39), 488+531 women**. It supports the text report's correction of the misplaced traditional-sling CI and the abstract's blanket null statement. The Albo row itself is **130/255 vs 101/265**, a specific subjective-incontinence outcome; it is not the original trial's Kaplan–Meier overall success percentage.

8. **Long-term sling row is also a specific reported outcome.** Image **32 / Analysis 5.3** has Albo **158/229 open vs 130/224 sling**, RR1.19 (1.03–1.37). Do not substitute those raw fractions for E-SISTEr's broader Kaplan–Meier continence estimates or treat 453 as its original randomized or five-year-completer cohort.

9. **Short-term objective sling estimate is confirmed.** Image **33 / Analysis 5.6** gives RR**1.21 (0.84–1.75)**, 289+314 women, matching the main/table rather than the abstract's discrepant number. At least one zero-event trial is not estimable. Image **35 / Analysis 5.8** confirms that the long-term objective pool has only Sand and Ward, **64+85 women**, not a three-study objective comparison including Albo.

10. **Repeat-surgery raw percentages against anterior repair need checking.** Image **27 / Analysis 4.17** shows **4/124 open vs 43/147 anterior repair**, pooled RR0.11 (0.04–0.30). These are approximately 3.2% and 29.3%, not the different raw percentages quoted in the narrative. Use the actual figure's count/denominator or avoid the discrepant percentages; a pooled RR is not expected to equal an unweighted ratio exactly, but the raw numerators and denominators are explicit here.

11. **Physical and mental SF-36 observations are pooled together.** Image **67 / Analysis 7.8** combines physical-subscale observations (217+221) and mental-subscale observations (219+221), then labels the combined total 436+442. The same studies/patients contribute multiple subscales, so **878 is not a unique-person denominator** for a single generic health outcome. Do not present the combined MD1.65 as a validated composite quality-of-life scale; keep subscales separate.

12. **Historical morbidity labels require original-study confirmation.** Image **39 / Analysis 5.13** places Albo **156/329 vs 209/326** in a category labeled perioperative surgical complications. Those counts match the original SISTEr broad adverse-event counts. Do not relabel them as procedure-specific surgical injuries or immediate perioperative complications without the original definitions/time window.

13. **Subgroup comparison is not a direct Burch-versus-MMK trial.** Images **9–10 / Analyses 4.19–4.20** are each open surgery versus anterior colporrhaphy, stratified by the open operation. Their Burch/MMK labels can be misread as a direct comparison. These graphics use **odds ratios**, unlike most adjacent risk-ratio plots. The direct Burch/MMK comparison is analysis9, outside this reader's image range.

14. **Heterogeneity and empty cells matter.** Image26 confirms open/anterior prolapse RR2.51 (0.62–10.10), I²67%, rather than a precise established excess. Image37 shows highly heterogeneous historical hospital-stay results and very different sling-material subgroups. Images25,38 and68 show individual effects without a pooled overall estimate. “Not estimable”/empty subgroup rows are not zero effect. The small late laparoscopic comparison in images62/66 remains one trial with different subjective/objective denominators.

## Complete visual coverage by source-order interval

| Ordinals | Actual images inspected |
|---|---|
| 1–3 | PRISMA diagram; risk-of-bias summary bar graph; full study-by-domain risk-of-bias grid |
| 4–8 | Analyses2.1,2.3,2.2,3.1,3.2: conservative/drug comparisons, subjective/objective outcomes and health measure |
| 9–27 | Analyses4.19,4.20,4.1,4.2,4.3,4.7,4.4,4.5,4.6,4.8–4.17: anterior-repair comparisons, efficacy, operative/recovery outcomes and harms |
| 28–45 | Analyses5.1,5.4,5.2,5.5,5.3,5.6–5.8,5.10–5.18,5.20: sling efficacy, recovery and harms, with each material/diagnostic subgroup |
| 46–59 | Analyses6.1–6.14: needle-suspension comparisons, all displayed study rows/subgroups |
| 60–68 | Analyses7.1–7.9: open/laparoscopic subjective/objective outcomes, health status and operative time |

No new modern practice recommendation is derived from these old plots alone. Current guideline selection and source-specific original-trial outcomes remain the appropriate foundation for the site. The source defects above should be preserved in the internal audit, with the affected pooled figures omitted or explicitly qualified in clinical prose.
