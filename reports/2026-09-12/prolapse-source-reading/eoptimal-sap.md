# E-OPTIMAL 2018 statistical analysis plan — complete bounded read

Reviewed September 12, 2026 by `/root/sling_study_tables`. No repository edits.

## Exact source scope

The complete 75-page publisher supplement `/tmp/warwiki-prolapse-principles/joi180030supp2_prod.pdf` was read through all 107,915 Unicode characters of its extracted text, including both addenda, title/contents, all analysis methods, the entire efficacy/safety definition table, every potential-display table shell and footnote, the sole Brown 1992 citation, and the final “Attachments: None.” PDF pages 1–2 are Addendum 2 dated June 5, 2017; pages 3–4 are Addendum 1 dated August 5, 2016; pages 5–75 are SAP version 1 dated June 29, 2016, printed pages 1–71.

PDF: 529,926 bytes, SHA256 `a16b3c9b83a157b59cecb052876d3652c86407923b93d57bf22e1b0d46c0b5ef`.

Text: 108,010 UTF-8 bytes, SHA256 `98812c50ee444fa65675bec64cbb22d60c6438a18a9be4c51ccba065543271db`.

Untruncated read intervals: `[0:15000]`, `[15000:24500]`, `[24500:34000]`, `[34000:44500]`, `[44500:55000]`, `[55000:65000]`, `[65000:75500]`, `[75500:86500]`, `[86500:97000]`, `[97000:107915]`. An attempted 15,000–31,000 output was truncated and is not counted; the replacement reads cover it completely. Beginning fragment is the Pelvic Floor Disorder / Statistical Analysis Plan Addendum 2 cover. End fragment is printed page 71, “16 ATTACHMENTS / None,” followed by the final page footer/formfeed.

Actual PDF renderings inspected: pages 1, 2, 3, 4, 14, 17, 21, 22, 23, 24, 25, 26, 29, 46, 51, 58, 59 and 75. These include the complete actual study flowchart (PDF14), the entire multi-page definition table (PDF21–26), both complete addenda, and selected blank table shells, not an assertion that every page image was inspected. The remaining table contents were read in full extracted text. All actual page paths and image hashes are in the JSON companion and `/tmp/warwiki-eoptimal-sap-pages/`.

The available PDF was recovered by the other reviewer from its actual publisher signed link; its original access logs remain in `/tmp/warwiki-prolapse-principles/optimal-jama-signed-access.json`. Stable asset path: https://cdn.jamanetwork.com/ama/content_public/journal/jama/936930/joi180030supp2_prod.pdf . A plain link may require the publisher’s current signed URL. This reader does not claim a fresh download. Main manuscript, outcomes supplement and separate protocol reads belong to the other reviewers. Brown’s original 1992 paper, participant-level data and analysis code were not read.

## Findings affecting interpretation

1. **This is extended follow-up of the factorial OPTIMAL randomization, not a new randomized comparison of prolapse operations.** Original surgical assignment was ULS versus SSLF, crossed with perioperative behavioral therapy/pelvic muscle training versus usual care. The extension added a separate randomized enrollment/retention video intervention. The actual flowchart connects the four existing operative/PMT groups to that enrollment intervention and years 3–5 follow-up. Do not count the extension’s video randomization as re-randomization of surgery.

2. **Denominators differ by cohort and purpose.** The SAP describes 439 originally consented, 408 PMT-randomized and 374 surgically randomized women; 315 attended the original two-year visit, 304 underwent enrollment-strategy randomization, and 285 consented to extended follow-up. Nine centers continued because the Naval Medical Center did not participate in the extension. Projected sample sizes such as 218 five-year participants, 109 per arm or 167 needed for a modelled hazard ratio are power assumptions, not observed outcomes. The blank SAE shells retain 188/186 from original surgical assignment and must not be used as five-year complete-case denominators.

3. **Primary surgical failure is time to ANY composite component.** Components are C > −2/3 of total vaginal length; any Aa/Ba/Ap/Bp > 0; bothersome bulge on PFDI question 4 or 5 with any degree of bother; or retreatment with surgery/pessary for POP. PMT anatomic failure excludes the bothersome-bulge component but includes retreatment. The apical criterion is more stringent than simply prolapse beyond the hymen and is different from the baseline original-trial criterion C ≥ −1/2 TVL. Do not relabel the reported cumulative composite as reoperation, symptomatic failure, or current five-year examination prevalence.

4. **The time-to-event plan accommodates interval censoring and anatomic/symptom variability.** Exact dates were to be used when known; anatomic failures between annual examinations were interval-censored. Accelerated failure-time frailty models were planned. Participants without failure were censored at the last documented success. If some components were missing and all observed components were negative, the composite was missing at that visit; one observed failure sufficed. Random/non-informative censoring is an assumption, not proof against attrition bias. Death censoring was acknowledged as imperfect but expected to have small impact.

5. **The June 2017 addendum overrides the original SAP’s POPDI imputation text.** The initial SAP proposed Brown-method imputation of POPDI after POP retreatment for consistency with OPTIMAL, even though the E-OPTIMAL protocol had not required it. Addendum 2 explicitly withdrew that plan as unnecessarily complex and preferred the unimputed scores. Therefore do not describe final POPDI estimates as Brown-imputed; do not apply superseded paragraphs 7.4, 9.3 or 9.4 without reading the addendum.

6. **The August 2016 trajectory addendum is exploratory and was specified before unmasking.** It planned examination of symptom/anatomic changes at 6 months and years 1–5, including improvement after a failure, symptom-anatomy relationships and between-group trajectories. Post-retreatment measures are treated as missing specifically for this natural-history analysis. That exclusion should not be confused with the subsequent decision to retain observed POPDI for the primary PMT analysis. It supports the site's explanation that crossing a composite criterion need not mean persistent bothersome failure thereafter; it does not itself supply the final result counts.

7. **Model adjustment follows the factorial design, and nonsignificance is not equivalence.** The plan generally tests surgery-by-PMT interaction, adjusts for relevant randomization stratification factors and considers surgeon/site random effects when needed. Secondary analyses are exploratory; p-values and confidence intervals are descriptive, and no multiplicity adjustment was planned. Power calculations target a large difference; a statistically inconclusive surgical comparison cannot establish identical outcomes or rule out smaller differences.

8. **Extension safety surveillance has specific limits.** Paragraph 10.2 says adverse events were not formally collected for E-OPTIMAL, while annual examinations/history did capture specified issues such as suture exposure, mesh exposure, granulation, retreatment and symptoms. Consequently there is no basis for declaring comprehensive five-year safety equivalence or absence of all complications. Mesh events can involve the concomitant incontinence mesh; these are not mesh-based apical prolapse procedures.

## Source-internal inconsistencies and legacy text

These were verified in the complete text, with actual PDF checks where noted. They should be recorded internally rather than copied into clinical teaching or portrayed as demonstrated errors in the executed statistical analysis.

- Printed p7 retains “2-year follow-up” in retreatment criterion despite the extension; the formal definition table on pp17–18 explicitly defines years 3–5 retreatment. Most potential-display shells still end at 24 months and are unfilled planning templates, not observed five-year results.
- Printed p19 gives the same broad “overall surgical failure” definition in rows labelled time to anatomic recurrence and time to symptomatic recurrence, although the named outcomes are distinct. Actual PDF23 confirms this duplication. Prefer the main manuscript’s reported endpoints and the explicit primary definitions, not this ambiguous duplicated row.
- Printed p14 has a misplaced subsection heading and says surgery randomization was stratified by site, conflicting with the detailed sections naming surgeon and concomitant hysterectomy for surgery and site for PMT. Do not use that sentence to overwrite the detailed randomization description.
- Printed p20 UDI row says change to “6 years,” inconsistent with its own five-year column and the overall design; actual PDF24 confirms the legacy typo.
- Printed p13 POP-Q data queries include “If Ba and Bp are positive, C nor D can be negative.” Actual PDF17 confirms this wording. This must not become a site clinical POP-Q validity rule: anterior/posterior prolapse does not universally require the apex/cervix to have crossed the hymen. The SAP is a record of a planned query process, not an authoritative replacement for POP-Q definitions or proof of how data were changed.
- The possible-display SAE tables place original-arm denominators 188/186 into otherwise blank shells; the first of these is even within the PMT block. Actual PDF51/75 confirms the headers. No event rates can be inferred.
- The final “changes to analyses planned in the protocol: No applicable” predates both addenda and cannot erase them.

## Integration recommendation

No new MDX edit is required solely from this SAP if the current principles page already labels cumulative composite failure, explains persistent symptom improvement and the distinction from retreatment, qualifies attrition/uncertainty, and avoids asserting superiority or equivalence. Add this complete supplemental read to the source record alongside the independent main, outcomes-supplement and protocol reads. This report provides supplemental-method verification, not clinical sign-off of a whole page or of the site.
