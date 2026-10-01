# AUA/ASTRO localized prostate cancer 2026 guideline check — October 1, 2026

Source: supplied `sources-local/dl-2026-10-01/aua-astro-localized-prostate-2026.txt`, *Clinically Localized Prostate Cancer: AUA/ASTRO Guideline (2022; amended 2026)*, AUA Board approval February 2026. Locations below are printed guideline pages. Selected MDX pages were read in full; focused clinical source/diff review completed. This is a guideline-specific check, not whole-page source clearance.

## Pages edited

- `docs/03-clinical-conditions/03a-storage-incontinence/sui-male.mdx`
- `docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx`
- `docs/01-foundations/anatomy-physiology/genitalia/prostate-seminal-vesicle.mdx`
- `docs/02-evaluation/history-physical/assessment-tools.mdx`
- `docs/05-special-populations/05d-cancer-survivorship/index.mdx`

## Corrections and primary-source attribution

| Page | Claim → fix | Guideline location |
|---|---|---|
| Male SUI | Nerve sparing “shown to improve” continence → attribute the AUA/GURS/SUFU 2024 review specifically to bilateral neurovascular bundle preservation; use association wording. Add AUA/ASTRO's oncologic suitability, favorable but variable continence association and absence of nerve-sparing versus non-nerve-sparing RCTs. Preserve the separate Cochrane Retzius-sparing findings. | 20, Moderate/B; pp21–22. Existing IPT 2024 Statement 1 discussion cross-checked. |
| ED | “27–61%” ED across prostatectomy/radiation/brachytherapy/HIFU cited to Shoji → separate guideline sexual-risk/baseline-function counseling from Shoji's selected 92-man focal-HIFU cohort without severe baseline ED: 36% severe ED (IIEF-5 ≤7) at 12 months. The guideline supplies no incidence range. | 9, Clinical Principle and discussion, pp15–16; existing Shoji ref27, PMID 36359396 abstract. |
| Prostate anatomy | Anatomical distribution, surgical candidacy and EAU seminal-vesicle-tip outcome shared a citation bundle → separate the claims; add AUA/ASTRO nerve-sparing recommendation, baseline sexual-function priorities, MRI-alone limitation and partial/unilateral options. Retain the EAU seminal-tip RCT finding separately. | 20, Moderate/B; pp21–22. |
| Assessment tools | EPIC and other tools described without this primary guideline's use context → add baseline and longitudinal functional assessment; attribute EPIC-26/EPIC-CP, SHIM/IIEF and ICSmaleSF/ICIQ to the discussion. No scoring threshold changed. | 9/45, Clinical Principles; discussion pp16,31. |
| Survivorship | Generic treatment-effect counseling and screening/referral workflow → add localized-prostate attribution for urinary/sexual/bowel risks alongside cancer risk, life expectancy, comorbidity, pre-existing conditions and preferences; baseline assessment, post-treatment PSA/symptom assessment, routine functional queries and support/referral options. | 9, Clinical Principle, pp15–16; 45–46, Clinical Principles, pp31–32. |

## Confirmed without change

No conflicting claim settled by this guideline was identified on these pages. “Confirmed” is limited to this source comparison; procedural efficacy, device details and rehabilitation regimens remain dependent on their existing dedicated sources.

- `docs/04-surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database.mdx`
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx`
- `docs/01-foundations/tools/biomaterials/prosthetics/artificial-urinary-sphincter.mdx`
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/male-urethral-slings.mdx`
- `docs/04-surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction.mdx`
- `docs/01-foundations/pharmacology/sexual-medicine-andrology/pde5-inhibitors.mdx`
- `docs/04-surgical-techniques/04j-sexual-dysfunction/pde5-inhibitors.mdx`
- `docs/04-surgical-techniques/04j-sexual-dysfunction/ved.mdx`
- `docs/03-clinical-conditions/03f-fistulas/in-males/rectourethral.mdx`
- `docs/04-surgical-techniques/04h-fistula-repair/male-fistula.mdx`
- `docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx`
- `docs/03-clinical-conditions/03b-voiding-outlet/posterior-urethral-stenosis.mdx`
- `docs/03-clinical-conditions/03b-voiding-outlet/vesicourethral-anastomotic-stenosis.mdx`
- `docs/03-clinical-conditions/03b-voiding-outlet/bladder-neck-stenosis.mdx`
- `docs/01-foundations/surgical-principles/radiation-tissue-effects.mdx`
- `docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bladder-neck-reconstruction-principles.mdx`
- `docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc.mdx`
- `docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/vuas.mdx`
- `docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/index.mdx` (navigation/context only)
- `docs/01-foundations/anatomy-physiology/genitalia/penis-anatomy-physiology.mdx`
- `docs/01-foundations/anatomy-physiology/pelvis-support/pelvic-neuroanatomy.mdx`
- `docs/01-foundations/anatomy-physiology/pelvis-support/retropubic-anatomy.mdx`

Radiation cystitis is covered in `radiation-tissue-effects.mdx` and the survivorship hub; no standalone page exists. Rehabilitation is covered in the ED/PDE5/VED pages. Searches for guideline name, Eastham, amendment year and functional topics found no existing localized-prostate guideline citation. Incidental oncology/bibliography hits were excluded; no oncology section or new clinical page was created.

## Citation checks

- `python3 scripts/audit/pubmed.py doi 10.1097/JU.0000000000005060` → **PMID 41988960**, **Eastham JA**, **2026**, *J Urol.* **216(1):2–11**, matching the amendment journal citation. New references: male SUI **20**, ED **40**, prostate anatomy **20**, assessment tools **67**, survivorship **64**. Each reference identifies the full guideline as 2022, amended 2026, approved February 2026.
- Existing Shoji DOI `10.3390/biomedicines10112876` rechecked with the same command → **PMID 36359396**, **Shoji S**, **2022**, *Biomedicines.* **10(11):2876**. Abstract verifies the corrected HIFU population, denominator, endpoint and time point. Existing ref27 reused; this DOI was not newly added.

## Settled and open

- Settled: source-specific functional-risk counseling, baseline/longitudinal instruments, nerve-sparing recommendation and evidence limits, follow-up/support attribution, and the ED HIFU citation/population mismatch. No disagreement with an existing guideline was identified in these clauses; AUA/GURS/SUFU and EAU attribution remains separate.
- Open: AUS/slings and radiation-related device outcomes; PDE5/VED rehabilitation efficacy, timing and doses; RUF repair, radiation-cystitis/HBOT treatment, post-radiation stricture reconstruction, VUAS/BNC management and detailed anatomy/technique. This guideline does not settle them. Earlier MASTER/ICSM/Princeton-IV, original-series, IFU, NCCN/ACS/ASCO and other source-access questions remain in their prior notes.
- Recorded **27** guideline-specific `audit.py record … checked` entries (5 edited, 22 unchanged), preserving every prior note and open item. The navigation entry records a context check only.

## Decisions for the user

- Recommend retaining dedicated IPT, ED, stricture and radiation-cystitis guidance for reconstruction and rehabilitation; do not infer treatment regimens from this oncology guideline.
- Recommend keeping counseling, symptom assessment and referral guidance in the existing pages; no new oncology page is needed.

Validation: `npm run lint:citations` and `npm run lint:links` passed across 1,206 files; `git diff --check` passed. No build, commit, push or deployment performed. Unrelated working-tree changes retained.
