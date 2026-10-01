# AUA/ASTRO/SUO salvage prostate cancer 2024 guideline check — October 1, 2026

Source: supplied `sources-local/dl-2026-10-01/aua-astro-suo-salvage-prostate-2024.txt`, *Salvage Therapy for Prostate Cancer: AUA/ASTRO/SUO Guideline (2024)*, AUA Board approval February 2024. Full guideline and selected MDX pages read; focused clinical source/diff review passed. This is a guideline-specific comparison, not whole-page clinical clearance.

## Pages edited

- `docs/01-foundations/surgical-principles/radiation-tissue-effects.mdx`
- `docs/03-clinical-conditions/03a-storage-incontinence/sui-male.mdx`
- `docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/outlet-continence/salvage-prostatectomy.mdx`
- `docs/05-special-populations/05d-cancer-survivorship/index.mdx`
- `docs/02-evaluation/history-physical/assessment-tools.mdx`

## Claim → update → guideline location

No conflicting rate, threshold, dose or treatment-selection claim was identified that this guideline settles. Five narrow primary-source attribution additions were made; existing teaching, numbers, media and references were retained.

| Page | Existing claim/context → update | Location |
|---|---|---|
| Radiation tissue effects | General functional assessment and radiation harms → add counseling specifically before salvage RT after radical prostatectomy, baseline standardized assessment, and late hemorrhagic cystitis/secondary malignancy risks. | Statement 4, Clinical Principle; discussion pp11–12. |
| Male SUI | Prior/subsequent radiation as a continence risk → add salvage-RT counseling about urinary control, erectile and bowel function, weighed against recurrent-cancer risk, life expectancy, comorbidities and preferences. No SUI incidence added. | Statement 4, Clinical Principle. |
| Reconstructive salvage prostatectomy | Operative-risk counseling supported by salvage cohorts → add guideline discussion of likely greater urinary/sexual/bowel adverse effects after primary RT, and greater incontinence risk with salvage prostatectomy than other local salvage treatments. Explicitly restrict this comparison to recurrent cancer. | Statement 24 discussion, pp22–23; the treatment-selection statement is Moderate/Grade C, not a reconstructive recommendation. |
| Cancer survivorship | Functional screening and support → add salvage-RT-specific risk counseling, standardized baseline assessment and late cystitis/secondary malignancy risks. | Statement 4, Clinical Principle and discussion. |
| Assessment tools | Standardized instruments for localized-prostate treatment/follow-up → add their pretreatment use before post-prostatectomy salvage RT. No score or threshold changed. | Statement 4 discussion, p12. |

## Confirmed without change

No conflicting claim settled by this source was found. Its broad functional-toxicity discussion does not verify the specialized incidence, technique or treatment claims on these pages:

- `docs/03-clinical-conditions/03f-fistulas/in-males/rectourethral.mdx`
- `docs/03-clinical-conditions/03b-voiding-outlet/vesicourethral-anastomotic-stenosis.mdx`
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx`
- `docs/03-clinical-conditions/03f-fistulas/in-males/urethropubic.mdx`
- `docs/04-surgical-techniques/04h-fistula-repair/male/salvage-prostatectomy-usf.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/simple-cystectomy.mdx`
- `docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx`
- `docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx`

Searches covered guideline name, Morgan, 2024 and relevant salvage/radiation/fistula terms. Incidental oncology, bibliography and technique-series hits were excluded. Radiation cystitis has no standalone page; its existing radiation-effects and survivorship sections were checked. The USF salvage-prostatectomy page's 35.4% baseline word decrease triggered a full baseline comparison; this oncology guideline supports no further restoration or protocol change.

## Citations added and DOI checks

The supplied text has no explicit “to cite” line; journal citations were used. `python3 scripts/audit/pubmed.py doi` confirmed first author **Morgan TM**, year **2024**, title and journal location for each DOI:

| Guideline part | DOI → PubMed result | New references |
|---|---|---|
| I | `10.1097/JU.0000000000003892` → PMID **38421253**, *J Urol.* **211(4):509–517** | Radiation effects **28**; male SUI **21**; survivorship **65**; assessment tools **68** |
| III | `10.1097/JU.0000000000003890` → PMID **38421252**, *J Urol.* **211(4):526–532** | Reconstructive salvage prostatectomy **23** |

Part II DOI `10.1097/JU.0000000000003891` also matched PMID **38421243**, Morgan TM, 2024, *J Urol.* **211(4):518–525**; checked for source identity but not added.

## Settled and open

- Settled: source-specific salvage functional-risk counseling, baseline instrument use and oncologic salvage-prostatectomy risk attribution. Statement 4 is a Clinical Principle without an evidence grade; baseline measurement and late cystitis/malignancy risks come from its discussion. No conflict with existing AUA/EAU/NCCN guidance was identified in the checked clauses; their distinct attribution was preserved.
- Open: AUS selection/erosion/failure, RUF and USF incidence/repair, VUAS/stricture management, cystitis treatment/HBOT, diversion choice and reconstruction outcomes. Statement 24's severe urinary-toxicity estimates are composite outcomes and were not converted into SUI, stricture or fistula rates. Statements 23–24 oncologic biopsy/selection requirements were not applied to benign necrosis or fistula extirpation.
- Earlier primary-series, IFU, MASTER, Hoyme/Haas, Khosla/Kirsch, technical and source-access questions remain in prior notes. **13** `audit.py record … checked` entries saved, retaining every prior note; hashes and unrelated records verified.

## Decisions for the user

- Recommend retaining salvage functional counseling in the existing pages and the separate benign reconstructive indication for prostatectomy.
- Recommend using dedicated IPT, stricture, cystitis and original reconstruction sources to resolve the remaining procedure/device questions.

Validation: `npm run lint:citations` and `npm run lint:links` passed across **1,206 files**; `git diff --check` passed. New reference numbering is contiguous. No build, commit, push or deployment performed; unrelated working-tree changes retained.
