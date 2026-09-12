# Independent full-source review: Cochrane laparoscopic entry

Reviewed 2026-09-12 by operative_review. Source: Ahmad et al., *Laparoscopic entry techniques*, Cochrane 2019; CD006583, DOI [10.1002/14651858.CD006583.pub5](https://doi.org/10.1002/14651858.CD006583.pub5), PMID 30657163, [PMC6353066](https://pmc.ncbi.nlm.nih.gov/articles/PMC6353066/).

## Exact access and read scope

The complete cached PMC article was read, not only its abstract or search results. The article-only text contains 362,131 characters in 2,600 numbered lines. All 21 contiguous chunks in `/tmp/entry10-cochrane-chunks.json` were displayed and read without relying on keyword screening: lines 1–102, 103–186, 187–333, 334–436, 437–586, 587–828, 829–993, 994–1048, 1049–1158, 1159–1333, 1334–1429, 1430–1551, 1552–1664, 1665–1779, 1780–1904, 1905–2019, 2020–2122, 2123–2236, 2237–2391, 2392–2512 and 2513–2600.

This covers abstract, plain-language summary, all five summary-of-findings tables, full main text, all nine comparison/analysis groups, included-study descriptions and risk-of-bias tables (63 records representing 57 trials), all 21 excluded-study entries, two awaiting-classification and three ongoing-study entries, five search appendices, protocol deviations, feedback and replies, history, declarations/support and complete bibliography.

All **58 actual image assets** were downloaded from the PMC article's linked image URLs, validated as JPEGs and individually displayed at original detail: all eight main figures and 50 analysis graphics. The image manifest records the source URL, local path and byte count for each image. This includes flow and bias graphics and all available forest plots; figures were inspected directly, not inferred from captions. Root's original HTML cache was available despite the browser returning a bot-check page during a fresh PMC request.

- HTML cache: `/tmp/access10-entry-cochrane-html.html`; SHA-256 `9758f543435a7f4503ca0a9bbb6131f427b32995afcdcfd776080efcafa95fa1`.
- Complete article text: `/tmp/entry10-cochrane-clean.txt`; SHA-256 `c9bce58b057f57b340d8f5bcee04417057c2199820d2f2b97e4b7bff298dfab3`.
- Image manifest: `/tmp/entry10-cochrane-media/manifest.json`; SHA-256 `fad89953eea57be51ad363054d8c8b92dd3ea6bccbb9959f9bb6260ca2dfc19d`.

**Limits:** this is a full read of the Cochrane review, not independent full-paper reading or re-analysis of its 57 underlying trials. It does not establish current 2026 evidence alone: the review searched through 25 January 2018. No clinician sign-off or full clinical validation is implied.

## Findings that can guide the site

- The review includes 57 trials and 9,865 participants. Many recruited selected low-risk populations, but not every trial excluded previous surgery or obesity. Preserve that qualification.
- Direct trocar versus Veress reduced failed entry: OR 0.24 (95% CI 0.17–0.34), eight trials/3,185 participants, moderate certainty. The plotted totals are 20/1,557 versus 104/1,628. This is an odds ratio, and fewer failures do not establish superiority for rare major injury.
- Vascular injury in the review includes abdominal-wall as well as major vessels. Direct trocar versus Veress vascular OR 0.59 (0.18–1.96), six trials/1,603; visceral OR 2.02 (0.21–19.42), five trials/1,519. Both are very uncertain. Excluding the bariatric trial changes the vascular estimate; that sensitivity analysis is not a universal selection rule.
- Direct trocar reduced extraperitoneal insufflation, OR 0.19 (0.14–0.26), nine trials/3,564, and omental injury, OR 0.34 (0.19–0.60), four trials/1,673; these outcomes are distinct from major vascular or bowel injury.
- Optical comparisons are underpowered for rare injury. The review did not report failed-entry outcomes for optical versus Veress; do not manufacture that benefit.
- Radially expanding versus standard trocar primary-site bleeding favored the expanding device in the primary model, OR 0.31 (0.15–0.62), but significance was lost using Mantel–Haenszel/random-effects sensitivity analysis. It is not robust proof of universal device superiority.
- The wall-lifting comparison used 150 patients and defined failure as a single failed needle attempt. Its OR 4.44 (2.16–9.13) should not be interpreted as definitive failure to complete surgery or a prohibition on every tailored lifting maneuver.
- No randomized evidence in this review compared disposable versus reusable instruments, Trendelenburg versus supine entry, or volume versus pressure as a placement guide. Those practical recommendations need separate sources.
- The authors' feedback response explicitly distinguishes absence of statistically detectable differences from equivalence/noninferiority. Avoid “equally safe.”

## Source inconsistencies checked against tables and actual plots

These are limitations of the source, not new errors in the current conservative site summary. Avoid copying the affected fine-grained statistics without reconciliation.

1. **Open versus Veress denominator:** abstract/main narrative uses 915 for vascular/visceral comparisons, but Figures 4–5 and Analyses 1.2–1.3 show 621 in the four Veress comparisons, plus 294 in one open-versus-direct comparison, totaling 915 for open versus all closed techniques. Shared open participants in Angioli were split. Do not label all 915 Veress comparators.
2. **Failed entry comparison:** open versus Veress is OR 0.48 (0.14–1.60), three comparisons/571, I² 75%; open versus all closed is 0.45 (0.14–1.42), four comparisons/865, I² 63%. An SOF heterogeneity value differs. These are not interchangeable estimates.
3. **SOF absolute vascular risk:** the open-versus-Veress table gives an open estimate of 3/1,000 beside a control rate of 2/1,000 and OR 0.14. Those values do not reconcile arithmetically. The displayed absolute estimate should not be reproduced.
4. **Open sensitivity narratives:** extraperitoneal-insufflation passages contain conflicting participant totals/effect interpretation; an omental sensitivity CI crosses one despite the discussion describing an enduring effect. Prefer the qualified overall evidence conclusion.
5. **Primary versus secondary ports and units:** Hamade 2007's included-study table describes secondary ports although pooled in a primary cutting/blunt group. Venkatesh 2007 contains 56 patients but 165 trocar insertions; that is not 165 independent patients. Do not translate pooled port-level estimates into patient risk without addressing clustering.
6. **Köstü pressure trial:** study details describe the main trocar after Veress whereas the narrative calls secondary access. Some pressure/compression analysis titles and axis directions disagree with the entered arms. Summing distinct complication rows creates repeated observations, not 129 or 132 unique participants from this 65-patient trial. Do not use those totals as a cohort size.
7. **Study-label transcription:** Cogliandolo's intervention table swaps the open/Hasson and closed/Veress labels. The actual comparison and the operative definitions should govern.
8. **Flow and counting details:** the figure's exclusion-reason breakdown differs from excluded-study tables; multiarm-trial counts vary across sections. Retain the headline 57-trial count without using inconsistent secondary accounting.
9. **SILS endpoint labels:** some narrative headings use trocar infection for failed-entry or hernia paragraphs; analyses 8.3 and 8.5 identify the actual endpoints.

The review also warns that arm totals across unrelated studies (for example 10/1,086 Veress versus 0/376 open) are **not a direct comparison**. Do not turn them into a causal risk ratio.

## Application to revised WARWIKI page

The rewritten laparoscopic-access page uses a restrained qualitative Cochrane summary and does not reproduce the discordant detailed denominators, aggregate-arm risk comparison, rare-event equivalence, or universal technique ranking. No Cochrane-derived blocking error was identified in the revised page. Independent bounded review of that page is recorded separately in `laparoscopic-access-peer-review.md`.
