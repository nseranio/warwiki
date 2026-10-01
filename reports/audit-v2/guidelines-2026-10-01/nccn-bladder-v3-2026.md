# NCCN Bladder Cancer Version 3.2026 — October 1, 2026

Source: supplied `reports/audit-v2/sources-local/dl-2026-10-01/nccn-bladder-v3-2026.txt`, dated August 6, 2026. Reconstructive consequences and existing instrument content only. The original PDF pages 34–35 (BL-E 3–4 of 6) were visually checked for table alignment. **23 pages edited; 16 confirmed unchanged.** All 39 checks recorded through `audit.py`; previous notes and unresolved items retained. These are guideline-specific checks, not whole-page clinical clearance.

## Pages edited and citations

| Path | NCCN reference |
|---|---:|
| `docs/04-surgical-techniques/04a-urethral-reconstruction/urethrectomy.mdx` | Updated 26 |
| `docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx` | Added 50 |
| `docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx` | Added 40 |
| `docs/04-surgical-techniques/04c-urinary-diversion/modified-studer-pouch.mdx` | Added 31 |
| `docs/04-surgical-techniques/04c-urinary-diversion/hautmann-neobladder.mdx` | Added 39 |
| `docs/04-surgical-techniques/04c-urinary-diversion/camey-ii-neobladder.mdx` | Added 25 |
| `docs/04-surgical-techniques/04c-urinary-diversion/mansoura-neobladder.mdx` | Added 21 |
| `docs/04-surgical-techniques/04c-urinary-diversion/vip-neobladder.mdx` | Added 20 |
| `docs/04-surgical-techniques/04c-urinary-diversion/sigmoid-neobladder.mdx` | Added 8 |
| `docs/04-surgical-techniques/04c-urinary-diversion/le-bag.mdx` | Added 11 |
| `docs/04-surgical-techniques/04c-urinary-diversion/simple-cystectomy.mdx` | Added 19 |
| `docs/02-evaluation/laboratory-studies/renal-function-metabolic-surveillance.mdx` | Added 35 |
| `docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-b12.mdx` | Added 31 |
| `docs/01-foundations/pharmacology/urinary-diversion-specific/vitamin-b12-supplementation.mdx` | Added 26 |
| `docs/02-evaluation/laboratory-studies/urine-studies.mdx` | Added 50 |
| `docs/05-special-populations/05d-cancer-survivorship/index.mdx` | Added 62 |
| `docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx` | Updated 10 |
| `docs/01-foundations/tools/instruments/endoscopy/resectoscope.mdx` | Updated 7 |
| `docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx` | Added 36 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx` | Added 56 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx` | Added 27 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/ileal-ureter.mdx` | Added 27 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/ureteroureterostomy.mdx` | Added 25 |

All 23 entries cite: **National Comprehensive Cancer Network. NCCN Clinical Practice Guidelines in Oncology: Bladder Cancer. Version 3.2026. August 6, 2026.** DOI check: **not applicable**; NCCN has no DOI. No paper DOI added. Urethrectomy's superseded 2024 Insights reference was replaced by the supplied full guideline. The existing Djaladat DOI `10.1016/j.juro.2012.08.024` was checked with `pubmed.py doi`: matched Djaladat 2012, PMID 23083874; its abstract supports the retained disease-feature associations.

## Corrections and direct-source confirmations

| Claim → fix or confirmation | Guideline location |
|---|---|
| Urethrectomy cited NCCN Insights v3.2024; instrument references said only “Updated 2026” → exact supplied full-guideline version/date. | Cover |
| Urethrectomy had nonspecific periodic cytology → consider urine cytology every 6–12 months during years 1–2, then as indicated. Wash cytology is also optional, restricted to positive urethral margin, multifocal CIS or prostatic urethral invasion. Added direct source beside secondary citations on urine-studies. | BL-E 3–4/6, footnote f; category 2A |
| Margin eligibility could merge different guideline positions → explicitly retain NCCN's relative contraindications (prostatic-duct CIS, positive urethral margin), AUA's verified-negative-margin requirement and EAU's invasive-urethral-tumor exclusion. Added on urethrectomy and principles. | MS-18; existing AUA Statement 14 / EAU sources retained |
| Principles restricted female organ preservation to young, sexually active women → appropriately selected patients when feasible; retain Djaladat's observational associations with hydronephrosis, palpable mass and positive nodes. Added NCCN beside EAU on urethrectomy. | BL-B 2/4; category 2A |
| Bare annual-B12 statements or EAU/AUA-only sourcing → retain those attributed positions and add NCCN annual testing after the first year, based on clinical judgment. No stopping year inferred: the B12 table cell extends beyond year 10. Applied to monitoring hubs, principles, conduit, Studer, Hautmann and VIP; survivorship links the monitoring hub. | BL-E 3–4/6; MS-17, MS-28; category 2A |
| AUA laboratory cadence could be treated as universal → preserve AUA every 3–6 months for 2–3 years (Expert Opinion), and distinguish NCCN every 3–6 months in year 1, annually in years 2–5, for both NMIBC and MIBC after cystectomy. MIBC imaging's two-year cell does not determine the blood-test interval. | BL-E 3–4/6; category 2A |
| Simple-cystectomy lead required radical cystectomy for any persistent NMIBC or recurrence risk → evaluate malignancy before benign reconstruction and use oncologic principles when cystectomy is for cancer; remove the blanket requirement. | BL-B 2/4; category 2A |
| Resectoscope presented size/multifocality as no universal repeat-TURBT trigger → explicitly attribute that criterion to EAU; NCCN includes papillary-appearing lesions ≥3 cm or multifocal lesions for repeat TURBT within six weeks. | BL-B 1/4; category 2A |
| General neobladder nighttime-leakage/retention/CIC counseling lacked direct NCCN support → add citations on principles, conduit comparison and six named-reservoir pages. Keep duration, delayed dysfunction, detubularization and technique claims separately sourced. | MS-18, descriptive discussion |
| Enhanced cystoscopy relied on other sources → add NCCN for lesion detection and the qualified NBI recurrence discussion on rigid/flexible scopes and resectoscope. Individual-study figures and device specifications remain separate. | BL-B 1/4; MS-5–7 |
| Oncologic ureteral reconstruction cited secondary sources or lacked a direct guideline → cite distal ureterectomy/reimplantation, possible partial-cystectomy reimplantation, ileal replacement after complete ureterectomy and selected low-grade mid-ureter excision/UU. No NCCN endorsement of Boari/psoas-hitch technique inferred. | BL-B 2, 4/4; UTT-3; MS-19, MS-45 |
| Existing location-dependent urethrectomy options needed direct source → cite T2 pendulous versus bulbar surgical options without assigning NCCN a 2-cm segmental-reconstruction cutoff. | BL-B 3/4; category 2A |

## Pages confirmed without change

- `docs/04-surgical-techniques/04c-urinary-diversion/index.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/t-pouch-modification.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/double-t-pouch.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/indiana-pouch.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/kock-pouch.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/right-colon-pouch.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/mainz-pouch-i.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/florida-pouch.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/penn-pouch.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/mainz-pouch-ii.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/ureterosigmoidostomy.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/colon-conduit.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/colon-shuffle.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/cutaneous-ureterostomy.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/intracorporeal-urinary-diversion.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/parastomal-hernia.mdx`

No NCCN-settled contradiction found in their applicable diversion context. This source supplies no named-pouch superiority, operative measurements, candidacy eGFR cutoff, metabolic incidence, alkali/B12 replacement regimen, colorectal surveillance protocol or hernia-repair recommendation.

## Settled, open and decisions

- **Settled:** exact NCCN edition/date; optional high-risk urethral surveillance; source-specific post-cystectomy renal/B12 timing; attributed margin and repeat-TURBT differences; selected organ preservation; existing reconstructive indications and generic neobladder counseling.
- **Still open:** earlier source-access limits; technique/device specifications, historical cohorts and comparative outcomes; non-cystectomy surveillance; separate NCCN Survivorship/gynecologic guidance. No original paper or whole-page clearance inferred from NCCN.
- **User decision:** none required. Recommendation: retain attributed guideline differences and the centralized monitoring hub; no additional oncology sections or pages.

Validation: `npm run lint:citations` and `npm run lint:links` passed across 1,206 files. No build, commit or push performed; edits remain in the working tree.
