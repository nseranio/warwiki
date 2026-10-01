# AUA/SUO NMIBC 2026 — guideline check

Source: supplied `reports/audit-v2/sources-local/dl-2026-10-01/aua-suo-nmibc-2026.txt`; full guideline, 2026 amendment, approved August 2026. Review is guideline-specific, not whole-page clinical clearance.

## Pages edited and corrections

| Page | Claim → fix | Guideline location |
|---|---|---|
| `docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx` | 2024 amendment citation → verified 2026 amendment. Generic small-tumor fulguration → established low-grade Ta, papillary recurrence ≤1 cm; tissue evaluation for flat/sessile lesions or suspicious cytology. Added biomarkers-do-not-replace-cystoscopy recommendation and attributed NBI option with unproven recurrence reduction. Preserved laser examples and office BLC study results. | Statements 9 (Strong/B), 33 (Conditional/C), 37 (Expert Opinion); fulguration safeguards in discussion p.34. |
| `docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx` | Generic “entire urothelium” → entire urethra and bladder, with tumor size/location/configuration/number and mucosal documentation. Added explicit AUA BLC/NBI strengths beside retained EAU/NCCN evidence qualifications. | Statements 1 (Clinical Principle), 32 (Moderate/B), 33 (Conditional/C). |
| `docs/01-foundations/tools/instruments/endoscopy/resectoscope.mdx` | EAU/NCCN-only repeat-resection comparison → separately attributed AUA incomplete-resection, optional high-grade Ta and recommended T1 repeat resection; six-week timing and muscularis-propria requirement specified. Added primary resection/documentation citation, withholding of planned immediate chemotherapy for suspected perforation/extensive resection, and BLC/NBI strengths. | Statements 1–2 (Clinical Principles), 12 (Strong/B), 14 (Conditional/C), 16 (Strong/B), 17 (Moderate/B), 32–33. |
| `docs/02-evaluation/laboratory-studies/urine-studies.mdx` | EAU-only cytology schedule → separate AUA schedules: first cystoscopy within 3–4 months; after negative first surveillance, intermediate-risk cystoscopy/cytology every 3–6 months for two years, 6–12 months in years 3–4, then annually; high-risk every 3–4 months, then six months in years 3–4, then annually. Added low-risk normal-cystoscopy cytology/marker restriction and no biomarker substitution. Retained EAU intermediate-risk low-grade cytology difference and lifelong high-risk follow-up. | Statements 9 (Strong/B), 10, 34, 38–39 (Expert Opinion). |
| `docs/01-foundations/pharmacology/intraoperative-adjuncts/visualization-agents/index.mdx` | EAU-only positive-cytology evaluation → separately stated AUA upper-tract evaluation, random bladder/prostatic-urethral biopsies and available BLC for NMIBC history with normal cystoscopy and positive high-grade cytology. Added BLC-at-TURBT recommendation. Secondary-only false-positive warning → primary citation, including **recent** intravesical BCG or chemotherapy. | Statements 4 (Expert Opinion), 32 (Moderate/B); discussion pp.14–15, 31–32. |
| `docs/04-surgical-techniques/04b-bladder-reconstruction/bladder-augmentation.mdx` | Any recurrence after BCG or contracted bladder → scoped oncologic cystectomy indications: fit patients with high-grade T1 after one induction; high-risk persistent/recurrent disease within 12 months after two inductions or maintenance. Low/intermediate-risk Ta receives bladder-sparing treatment first. Removed unqualified 60–80% recurrence/10–20% progression estimates lacking population, endpoint and follow-up; retained oncologic assessment and EAU reference 35. | Statements 5 (Moderate/C), 26 (Moderate/B), 28 (Moderate/C), 30 (Clinical Principle). No augmentation or contracted-bladder recommendation in this source. |

## Pages confirmed without change

Full current pages read; applicability confirmed without assigning new support to claims outside this guideline:

- `docs/04-surgical-techniques/04a-urethral-reconstruction/urethrectomy.mdx`: Statements 4/15/24 concern retained-bladder evaluation or prostatic-urethral resection. They do not settle cystectomy urethrectomy, neobladder margins or post-cystectomy urethral CIS/BCG outcomes.
- `docs/05-special-populations/05d-cancer-survivorship/index.mdx`: diversion, post-cystectomy renal/B12 care, radiation injury and sexual rehabilitation are outside this source.
- `docs/02-evaluation/imaging/ct-urogram.mdx`: Statement 3 addresses known bladder cancer; Statements 36/40 address intact-bladder NMIBC surveillance. Existing AUA/SUFU 2025 microhematuria imaging tiers remain separately attributed.

Discovery also screened MRI, renal surveillance, resection-loop and IC/BPS intravesical-agent excerpts. No further source-settled correction found; these are not additional full-page confirmations. No standalone microscopic-hematuria page was found. Its relevant claims reside in urine-studies, the cystoscope pages and CT urography.

## Citations and DOI check

Clark PE, Holzbeierlein J, Chang SS, et al. *2026 Updates to the Diagnosis and Treatment of Non-muscle Invasive Bladder Cancer: AUA/SUO Guideline.* J Urol. Published online September 4, 2026. DOI [10.1097/JU.0000000000005280](https://doi.org/10.1097/JU.0000000000005280).

- Required command: `python3 scripts/audit/pubmed.py doi 10.1097/JU.0000000000005280` → **PMID 42689553; Clark, 2026; title matched**.
- Citation locations: flexible ref26 (replaces 2024 amendment); rigid ref25; resectoscope ref23; urine-studies ref51; visualization-agents ref40; augmentation ref48. Each distinguishes the journal update from the corresponding full guideline and names the relevant statements. No other DOI added.

## Settled, open and decisions

- **Settled:** current AUA statement numbering/strengths; repeat-resection selection and timing; immediate-instillation safety condition; office-fulguration safeguards; BLC/NBI recommendations; cytology schedules; narrowly defined post-BCG oncologic cystectomy indications. Microhematuria's intermediate-risk marker exception agrees with the discussion on p.19.
- **Open:** augmentation candidacy for a disease-free bladder contracted after BCG; independent verification of EAU 2022 augmentation ref35 and its former risk estimates. This guideline does not address that reconstructive indication. Device specifications, energy choices, doses/labels, individual-study numbers and prior source-access limitations are not re-cleared.
- **User decision — recommendation:** retain multidisciplinary oncologic assessment before augmentation; obtain a source addressing disease-free post-BCG contracture before defining augmentation-versus-cystectomy candidacy.

## Verification

All nine pages recorded `checked` with `audit.py record`; prior notes preserved and new notes explicitly limited to this guideline. Focused source/diff review completed. `npm run lint:citations` and `npm run lint:links` passed. No build, commit or push performed.
