# FiiRST-2 2025: main paper and analysis attachments

Reviewed 2026-09-12 by root. [da Luz et al., JAMA Network Open](https://doi.org/10.1001/jamanetworkopen.2025.32702), PMID 40982282, PMC12455389. Entire 57,487-character primary XML text, both tables/footnotes, all 36 references and disclosures read. All three actual main graphics inspected from the EuropePMC media archive. The December 2025 [correction](https://doi.org/10.1001/jamanetworkopen.2025.53844), PMC12717616, was fully read: it adds an author and does not correct the numerical/label issues below.

Downloaded all four publisher supplements through EuropePMC. Root fully read the 21-page SAP (s002), all nine pages of results supplement (s003; four eTables and all four actual graph pages 6–9), and the complete one-page data statement (s004). The 88-page protocol (s001) is independently assigned to the operative reviewer; see its separate report when complete. No claim here that root read that protocol. SAP Appendix 1's final page contains only a List of TLFs heading, not the external TLF document. No patient-level data or code audited; data statement says data not available.

217 patients randomized (107/110); 137 received a study pack and entered the modified intention-to-treat analysis (66/71), with 80 untreated patients excluded. Do not call this a 137-patient randomized trial without that qualification. Each of the first two intervention packs contained 4 g fibrinogen concentrate and 2000 IU PCC, replacing four plasma units; both groups received red cells, and a platelet dose in pack two. Controls could receive fibrinogen rescue and intervention patients plasma after pack two. Recent anticoagulant use was excluded: this is not a reversal trial.

Primary 24-hour allogeneic blood-product use averaged 20.8 versus 23.8 units, ratio 0.87, one-sided 97.5% CI 0–1.19, P=.20. Stopped for futility with conditional power below 25%; no superiority, noninferiority, equivalence or survival advantage established. Thromboembolic events were 14/66 versus 10/71, and day-28 deaths 9/66 versus 15/71; estimates are imprecise. Do not present nonsignificance as equal safety.

SAP distinguishes ITT by allocation from mITT by actual treatment if mismatches occur, restricts both to receipt/consent, and defines a platelet dose as four ABP units. Holm adjustment applies to three selected secondary outcomes only; other secondary analyses are exploratory. No outcome imputation has an explicit SOFA last-observation exception. Survival-conditioned blood-product analyses cannot establish causal benefit. SAP v1.0 is dated April 26, 2023, after last follow-up March 25 and within the broadly stated analysis period; do not assert it was locked before enrollment.

## Source errors not to reproduce

- Main GCS direction is reversed; fibrinogen and hemoglobin units are erroneous in places, including 1.5 mg/dL instead of g/L and a hemoglobin IQR printed in g/dL at an incompatible magnitude. Do not derive clinical dosing thresholds from these typos.
- Narrative 54 hypotensive patients actually matches the shock-index row, not table systolic pressure at or below 90 mm Hg (34). A death percentage 16.6% conflicts with 9/66=13.6%; PCC is elsewhere mislabeled in grams rather than IU. Narrative references 16/17 called observational evidence actually refer to FARES-II protocol/statistical design.
- Figure 1 arithmetic 439 screened minus 221 excluded is 218, not 217; its prior-transfusion inequality differs from the main text. No reconciliation was available.
- Figure 2 depicts boxplots despite prose describing confidence intervals. Figure 3 has increasing rows labeled number at risk, apparently cumulative deaths, duplicated under the thromboembolic panel. They are not trustworthy at-risk counts and were not copied.
- Results eTable 4 per-protocol denominators are 65/60, but its 24-hour death percentages use original mITT denominators. Supplement graphs do not adequately label error bars or per-timepoint available samples; avoid extracting new effects.

The durable source-access inventory and final MDX review must keep these limitations visible in the maintainer log while the public page presents only verified, clinically useful findings.

## Source fingerprints

| Local source | SHA-256 |
| --- | --- |
| `vascular11-fiirst2.xml` | `e4511c29351bfc0e9c84a9a21025c68af7de5ae4630fefac3015234e043d2e97` |
| `vascular11-fiirst2-correction.xml` | `6d3636d0ea39eae9fe33c5632e9b28aed588d72fbe9c6ce27e6bfe0b8339f5e3` |
| `jamanetwopen-e2532702-s002.pdf` | `168df269193387bb749a562738c677f9c085d5a0744ec3cb5d28a10c7c8f7a3f` |
| `jamanetwopen-e2532702-s003.pdf` | `1ecf18a338516c04f2effa84bf1307979d17c7ea7fabfae8010efaa2bb5c4090` |
| `jamanetwopen-e2532702-s004.pdf` | `e76051662341091a8c485195bf5836d915c70a3075e8f1c42208c80f32ac62b9` |
