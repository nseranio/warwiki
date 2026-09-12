# Cochrane traditional slings — complete public figure inventory and first-half visual inspection

Date: September 12, 2026. Source: Saraswat et al., 2020, DOI `10.1002/14651858.CD001754.pub5`, PMC7027385. Source HTML: `/tmp/tools-PMC7027385.html`.

## Inventory and actual scope

- The supplied HTML contains **206 figure elements, with 206 unique public asset URLs**: four main figures and 202 analysis graphics. This includes the later comparison sets and should not be reduced to the four main figure labels.
- All **206 assets were retrieved successfully** from the explicit `cdn.ncbi.nlm.nih.gov` URLs in the source. Every response had an actual JPEG/PNG image signature; no HTML error page was counted as an image.
- Complete mapping of source order, figure ID, displayed analysis label, caption, URL, native HTML dimensions, local path, HTTP status, bytes and SHA-256: `/tmp/warwiki-sling-figures/inventory.json`.
- **All 103 first-half actual images were displayed at original resolution with `view_image` and visually inspected**: ordinals **001–103 inclusive**. Source ordering differs from numerical figure-ID ordering. The first is `CD001754-fig-0001` (PRISMA), the last is `CD001754-fig-0081` (analysis10.9, IIQ score). These comprise all four main figures and 99 forest-plot/analysis graphics.
- Exact inspection record: `/tmp/warwiki-sling-figures/first-half-inspection.json`. Display batches were 001–004, 005–012, 013–020, 021–028, 029–040, 041–052, 053–064, 065–076, 077–088, and 089–103. No assigned image was skipped.
- Ordinals104–206 were assigned separately to `sling_study_tables`; use that agent's report for its actual reading scope rather than attributing its reads to this agent.
- The public forest plots are small native images, generally 566 pixels wide. The opened full-figure page for figure0078 offers the same native asset, not a higher-resolution alternative. Claims concern these actual supplied assets; not unpublished vector originals.
- This work does not constitute original-trial, linked-protocol or whole-review reading by this agent. Text cross-checks were narrowly targeted to the relevant outcome paragraphs, in addition to the separately documented complete final120,000-character text segment.

## Findings

### Main figures and evidence scope

1. PRISMA clinical diagram: 582 screened records; 167 full-text reports assessed; 50 reports/38 studies excluded; 115 reports/34 studies in qualitative synthesis, plus two reports of ongoing studies. It labels the quantitative synthesis as **93 reports/19 studies**. It separately identifies the **unincorporated January23,2019 search**, with 28 screened records and four eligible reports (ten-year follow-up, near-duplicate abstract, two new ongoing studies). Distinguish reports, unique studies and later unincorporated records; never imply 115 independent trials.
2. Economic diagram: 465 records,461 excluded,4 reports representing3 studies in the brief economic commentary. This is not a new randomized clinical comparison.
3. Risk-of-bias bar chart and study grid agree that allocation concealment and blinding are mostly unclear. High attrition-risk rows include Demirci2001, Fischer2001 and Wadie2005. Similar-loss labels in some small trials do not establish absence of informative attrition.

### Effect measures and applicability

- Several primary continence outcomes use **odds ratios**, whereas adverse events and some satisfaction outcomes use **risk ratios**. For example, analysis7.2 shows OR1.70(1.22–2.37), analysis9.2 OR0.67(0.44–1.02), analysis9.3 OR2.22(1.07–4.61). Targeted narrative checks confirm these are also labeled OR in the text. They must not be copied as risk ratios or absolute improvements.
- Analysis7.3 (ordinal010) gives **237 sling plus244 colposuspension participants=481**, OR1.55(1.06–2.27). The corresponding narrative says **n=190**. This is an unresolved sample-size discrepancy; use original reports before reusing the narrative count.
- Analyses7.2/7.3 are dominated by SISTEr/Albo; smaller traditional-sling trials include historical materials. Analysis9.3's long-term continence result is one trial, **31/61 versus20/63**, rather than a pooled modern-material superiority finding.
- Analysis7.21 reports voiding dysfunction after three months, RR6.08(3.10–11.95). Analysis7.22 (ordinal090) is the sparse longer-term counterpart, **7/224 versus1/229**, RR7.16(0.89–57.69); the latter interval crosses1. Do not equate the two horizons or treat the long-term point estimate as certain.
- Historical time/stay estimates are highly heterogeneous: analysis7.11 hospital stay I²98%; analysis9.13 operative duration I²99%; analysis9.14 stay I²88%. Fixed-effect diamonds are visible despite this heterogeneity. These are unsuitable as precise contemporary patient recovery predictions.
- Analysis9.27 and9.28 contain Wadie alone, with differing arm denominators39/24; the source study table itself warns of denominator changes. Both confidence intervals include no difference.
- Comparison11 keeps different named material/technique comparisons separate; there is **no universal pooled ranking**. Labels distinguish fascia/Pelvicol, standard/short fascia, autologous dermis/cadaveric fascia lata, rectus fascia/Gore-Tex, Vypro/Ultrapro/Prolene light, and vaginal-wall versus other constructs. The visible results cannot support equivalence or superiority across all autologous, xenograft and synthetic slings as broad classes.

### Substantive internal discrepancies

1. **Shin arm reversal:** analysis11.2 (ordinal053, figure0083) identifies autologous dermal graft patch versus cadaveric fascia lata and displays **25/33 versus19/24**, OR0.82(0.23–2.92). Analysis11.5 (ordinal056, figure0086) uses the same named comparison but displays **19/24 versus25/33**, OR1.22(0.34–4.32). This reverses the arms/effect direction. Both estimates are imprecise; do not resolve by guessing or use as evidence of a material advantage.
2. **Pad-weight versus pad-count mismatch:** analysis11.10 (ordinal061, figure0091) is captioned quantified leakage/mean urine weight, but shows Okulu means **0.65,0.20,0.83**. The study table identifies these as **number of pads used** at48months, whereas corresponding24-hour urine weights are **2.3,1.3,2.4g**. The narrative also calls analysis11.10 urine weight. This is a substantive outcome-label/data mismatch; no corrected meta-analysis was performed.
3. **Hospital-stay units:** analysis6.4 (ordinal085, figure0019) labels hospital stay **hours**, displays20 versus7 and MD13.00(5.00–21.00). Its narrative explicitly says **13days longer**. Historical source verification is required; do not export a unit as resolved.
4. **Header-only graphics:** actual assets for analysis6.3 (ordinal084, figure0018) and10.2 (ordinal096, figure0074) contain the review/comparison/outcome headings without a visible effect table or forest plot. They were actually opened and inspected; do not invent numerical results from these graphics. The corresponding text can be assessed separately.

### Checked and not flagged

The neighboring mini-sling bladder-perforation and urgency graphics require careful visual association. An initial impression of a duplicate value was independently checked and dismissed: urgency analysis10.6 (ordinal100) is **5/35 versus1/35, RR5.00(0.62–40.64)**, consistent with the text and counterpart17.6. Bladder perforation is1/35 versus0/35, RR3.00(0.13–71.22). **No urgency figure error is asserted.**

## Practical implication

Keep the review as an important historical synthesis with transparent search cutoff, material heterogeneity and limited certainty. Preserve the identified table/figure discrepancies internally; they are reasons to avoid overprecise data reuse, not permission to fabricate corrections or discard the entire review. No newer clinical recommendation or material ranking was generated from the figures alone.
