# AUA/SUO UTUC 2023 guideline check — October 1, 2026

Source: supplied `sources-local/dl-2026-10-01/aua-suo-utuc-2023.txt`, AUA Board approval April 2023. Locations below use printed guideline pages. Full current MDX reads and focused source/diff review completed. This is a guideline-specific check, not whole-page source clearance.

## Pages edited

- Reimplantation: `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx`
- Boari/psoas: `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx`
- Ureteroureterostomy: `docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/ureteroureterostomy.mdx`
- Stricture: `docs/03-clinical-conditions/03e-upper-tract/ureteral-stricture.mdx`
- CTU: `docs/02-evaluation/imaging/ct-urogram.mdx`
- Flexible scope: `docs/01-foundations/tools/instruments/endoscopy/flexible-ureteroscope.mdx`
- Semi-rigid scope: `docs/01-foundations/tools/instruments/endoscopy/semi-rigid-ureteroscope.mdx`
- Access sheath: `docs/01-foundations/tools/biomaterials/ureteral-stents/ureteral-access-sheath.mdx`
- Collins knife: `docs/01-foundations/tools/instruments/endoscopy/collins-knife.mdx`
- Survivorship: `docs/05-special-populations/05d-cancer-survivorship/index.mdx`

## Corrections and primary-source attribution

| Page | Claim → fix | Guideline location |
|---|---|---|
| Reimplantation | Generic distal-tumor indication → specify surgically eligible HR/unfavorable-LR disease endoscopically confined to lower ureter, functional renal unit; distal ureterectomy/reimplantation preferred. | 21, Expert Opinion; p25 |
| Reimplantation | Generic repair principles → UTUC-specific complete intramural ureter/orifice excision and watertight closure; endoscopic extent, bladder assessment, both frozen margins and no spillage. | 22, Strong/B; pp25–26; 20 discussion, p25 |
| Reimplantation | Perioperative instillation omitted → AUA single dose for eligible segmental/distal ureterectomy, explicitly alongside NCCN's with-or-without option. | 23, Strong/A; pp26–27; NCCN v3.2026 MS-45 |
| Boari/psoas | Malignancy indication/bladder suitability supported by other sources → add AUA attribution for bladder capacity/function assessment and tension-free adjuncts; no new reach/dimension rule. | 20 discussion, p25 |
| Ureteroureterostomy | Proximal frozen margin only; “consider” HR lymphadenectomy → both margins; perform HR lymphadenectomy. | Ureterectomy discussion, p25; 25, Strong/B, p27 |
| Ureteroureterostomy | Broad kidney-sparing/equivalence wording → typical small-unifocal ≤1 cm tumor/≤2 cm resection selection, retrospective selection caveat; distinguish AUA RNU/SU options from NCCN's generally RNU approach to HG mid-ureter tumors. | 20, Strong/B and discussion, pp24–25; NCCN MS-45 |
| CTU | “May require” URS and unqualified contrast alternatives → suspected-UTUC cystoscopy/delayed contrast imaging, CT/MR/retrograde alternatives, URS/lesion biopsy/selective washing and rare exceptions. Add AUA beside matching 92%/95% accuracy figures; retain EAU diagnostic trigger separately. | 1, Strong/B; 2, Strong/C; pp10–11 |
| Stricture | Filling defect “UTUC until proven otherwise” → raises concern; biopsy plus selective washing with exceptions, safe/pre-stented access and unsafe-URS alternatives. | 2, Strong/C; 4, Expert Opinion; 5, Conditional/C; pp10–13 |
| Flexible scope | Generic diagnostic/ablation/instillation wording → exact AUA diagnostic components, risk groups and optional chemotherapy/BCG eligibility; retain EAU attribution. | 2, Strong/C; 13, Strong/B; 14/16, Conditional/C; 17, Expert Opinion; pp10–11,20–23 |
| Flexible/semi-rigid scopes | EAU-only early repeat examination → retain EAU ≤8 weeks (weak), add AUA within 3 months; flexible page also identifies kidney-sparing cystoscopy/endoscopy at 1–3 months. Semi-rigid diagnostic biopsy gains selective washing. | 2; 15/32–33, Expert Opinion; pp10,22,34–36 |
| Flexible scope/access sheath | Generic difficult-access advice → UTUC gentle/pre-stented access and limited aggressive sheath dilation; safe optional sheath use with direct ureter inspection before insertion. | 4, Expert Opinion, p13; 15 discussion, p22 |
| Collins knife | Transurethral cuff detachment described without closure requirement → complete distal/intramural/orifice excision and formal watertight closure; retain named techniques and Allard result. | 22, Strong/B and discussion, p26 |
| Survivorship | General renal/stress/lifestyle domains → add UTUC-specific nephrology-referral consideration and stress, smoking, exercise and diet advice. | 37–38, Expert Opinion; pp37–38 |

## Confirmed without change

- `docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/ileal-ureter.mdx`: bowel reconstruction mentioned on p25; ileal indications/technique/outcomes are not settled by this source. Existing NCCN citation retained.
- `docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/renal-autotransplantation.mdx`: EAU low-risk kidney-preservation context is compatible with AUA 13; AUA does not endorse autotransplantation.
- `docs/04-surgical-techniques/04a-urethral-reconstruction/urethrectomy.mdx`: statements 3/34 do not settle existing cystectomy/urethrectomy/neobladder claims or post-cystectomy recurrence treatment.
- `docs/01-foundations/tools/biomaterials/ureteral-stents/nephrostomy-tube.mdx`: tumor/access planning agrees with statement 11 discussion, p19; urgent decompression remains available.

No standalone distal-ureterectomy/reimplant page exists; the reimplantation hub carries the relevant corrections. Search hits confined to NMIBC, microhematuria, post-cystectomy surveillance or bibliography were excluded from UTUC edits.

## Citation check

`python3 scripts/audit/pubmed.py doi 10.1097/JU.0000000000003480` returned **PMID 37096584**, **Coleman JA**, **2023**, *J Urol.* **209(6):1071–1081**, matching the guideline journal citation.

New Coleman references: reimplantation **57**, Boari/psoas **28**, CTU **23**, semi-rigid scope **20**, access sheath **29**, Collins knife **19**, survivorship **63**. Existing references verified/reused: flexible scope **13**, stricture **47**, ureteroureterostomy **20**. No other DOI was added.

## Settled and open

- Settled: source-specific diagnostic/access recommendations, reconstruction selection and margins/closure, HR lymphadenectomy, early repeat timing, perioperative instillation distinction and UTUC survivorship advice. Both AUA/EAU diagnostic/timing positions and AUA/NCCN selection/instillation positions remain attributed.
- Open: prior study outcomes, device IFUs, stent durations, benign reconstruction thresholds and detailed techniques; Boari refs4/6/9/20; ileal onlay/nephropexy/antireflux limits; autotransplantation/pyelovesicostomy; ureteroureterostomy tumor-ligation/ureterocalicostomy technical attribution; flexible-scope NCCN source/version; non-UTUC survivorship sources. Prior notes were preserved in all 14 `audit.py record … checked` entries.

## Decisions for the user

- Recommend retaining both attributed guideline positions instead of merging them into one diagnostic, surveillance or perioperative rule.
- Recommend keeping distal-ureterectomy guidance in the existing reimplantation hub; no new oncology page is needed for this check.

Validation: `npm run lint:citations` and `npm run lint:links` passed across 1,206 files. No build, commit or push performed.
