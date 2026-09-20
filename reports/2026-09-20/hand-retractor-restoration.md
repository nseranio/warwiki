# Handheld and adjacent retractor restoration — September 20, 2026

## Scope and method

Restored nine useful instrument articles after the user identified inappropriate blanket removal of manufacturer information and practical teaching. All nine current placeholder pages and all nine pre-removal pages from `4dcc7b78^` were read completely. Each replacement was then read completely. This is a targeted restoration and source check, not whole-site clinical clearance or clinician sign-off.

Manufacturer catalogs and IFUs are appropriate sources for configurations, compatibility, setup and device warnings. Established handling principles can be explained as surgical teaching without a randomized trial. Clinical outcomes and comparative superiority require separate evidence; unsupported claims were corrected specifically instead of deleting the surrounding article. Product dimensions are identified as model examples, not universal specifications.

All pages retain their routes, have substantive design/application/handling content, and use narrow `evidenceUpdated` / `evidenceNote` metadata. No `lastReviewed` or clinician reviewer was invented. No images or videos existed in the nine historical source pages. Useful related-page links and selected previous references remain.

## Page changes

Paths below are under `docs/01-foundations/tools/instruments/retractors/`.

| Page | Restored content and specific corrections |
|---|---|
| `army-navy.mdx` | Double-ended design, wound-edge exposure, selection and assistant technique; Pilling catalog example. Removed unsupported universal tray/prevalence and military-history assertions. Instrument progression is a practical heuristic, not a mandatory sequence. |
| `deaver.mdx` | Curved-blade configurations, abdominal/pelvic uses and pressure precautions. Removed invented universal safe psoas positioning, fixed release intervals and application of other retractors' neuropathy rates to Deaver use. |
| `malleable.mdx` | Ribbon shaping, selection, positioning, inspection and instrument accounting. Corrected the dangerous implication that a metal blade is an electrical or thermal insulator. Materials, clamp compatibility and lifespan are model dependent. |
| `breisky.mdx` | Curved vaginal blade, manufacturer sizes, exposure and handling in vaginal reconstruction. Corrected universal right-angle/deepest-blade assertions and unreliable biographical details. |
| `langenbeck.mdx` | Standard/mini patterns, targeted soft-tissue exposure and handling. Distinguished the retractor from a periosteal elevator and the Kocher-Langenbeck acetabular approach; omitted borrowed nerve-injury rates and exposure-area claims. |
| `graves.mdx` | Bivalve design, sizes, examination setup and comfort-oriented selection. Replaced age/parity stereotypes with anatomy and tolerance. Lubrication is qualified by specimen/laboratory and model instructions; ordinary uncoated instruments are not assumed appropriate for electrosurgery. |
| `heaney-retractor.mdx` | Expanded the original short article with Heaney/Heaney-Simon model examples, vaginal applications and practical handling. Avoided treating all Heaney blades as shorter than Breisky blades. |
| `lighted-retractors.mdx` | Integrated and add-on illumination, example configurations, LightMat placement/heat precautions and practical limitations. Corrected universal “cool”/safe-light assumptions, cordless generalizations and unproven outcome benefits. |
| `collins.mdx` | Collin abdominal frame, actual blade/spread examples, assembly checks and exposure. Distinguished vaginal Collin patterns; removed universal mechanism claims and unsupported clinical superiority/risk ranking. |

## Source access and limits

The exact source links are retained in each article's References section.

- **Manufacturer product descriptions/specifications read:** Teleflex/Pilling Army-Navy 164715, Breisky P15933 and Heaney-Simon 212305; SURTEX Deaver, Langenbeck and Mini-Langenbeck; BOSS ribbon 18-0922; CooperSurgical Euro-Med Graves and ONETRAC LX. ONETRAC LX supports configurations only: its separately linked IFU was not read or represented as reviewed.
- **Scoped catalog reads:** KLS Martin malleable 15-963 entries and Collin 15-824/15-826 entries/replacement components. Aesculap OB/GYN catalog printed pages **705–707** were read and their rendered page images inspected, covering Heaney and Breisky designs. This was not a complete read of the 90-page catalog. The Aesculap catalog corroborates the current B. Braun EL865R listing.
- **Complete IFU text reads:** CooperSurgical Vaginal Reusable Specula 34158-IFU Rev A, all **4 pages**; BOSS LightMat UA2550 Rev C (July 30, 2024), all **2 pages**; BOSS Reusable Surgical Instruments L-CH003 Rev J (December 12, 2025), all **3 pages**. Full text was available through the browser retrieval despite some direct-download failures. The LightMat attachment illustration was **not visually adjudicated**; the article does not claim otherwise. Manufacturer links remain available for the actual model instructions.
- **Scoped safety section:** Medtronic PlasmaBlade X warnings on energized contact with metal instruments support correcting the malleable blade's supposed insulation. No marketing outcome claims were adopted.
- **Clinical reading:** relevant accessible sections of Bates et al., *The Challenging Pelvic Examination* (2011), support practical examination advice; this was not a complete paper/package review and its historical screening schedule was not used. The Francis et al. LightMat paper's **complete abstract** was read, not its full text. It remains an example of reported use, not proof of comparative benefit.

Meaningful historical references were retained as explicitly labeled further reading: Noldus (Deaver/abdominal retraction), Rodrigues (retained ribbon), Cesmebasi (Langenbeck history), and Hinkson/Waring (Collin/cesarean retractors). These papers were **not newly read in full**, and the restoration does not reinstate numerical outcome claims from them. Original citations unrelated to the named instrument, unverified claims, and generic commercial search pages were not automatically reproduced.

## Regression guard and validation

Added `scripts/check-content-preservation.js`, exporting a pure `checkContent` validator, and six tests in `scripts/tests/content-preservation.test.js`. `lint:content-preservation` is part of `npm run lint`. It rejects the actual prior Lone Star blanket-removal notice and narrow variants, while permitting manufacturer teaching, clinical uncertainty, ordinary removal of mesh/devices, history, internal metadata and existing empty stubs. There is no length threshold. This guard supplements the editorial policy; it cannot establish completeness or medical accuracy.

Targeted validation: all nine pages pass citation integrity; the six preservation tests pass; scoped `git diff --check` passes. The final global preservation scan across **1,186 MDX files** correctly flagged a remaining blanket-removal notice on `mouth-retractors.mdx`, outside this subtask's ownership; the parent task was notified to resolve it before release. The parent task owns consolidated lint/build/release checks and ledger updates.

## Addendum — mouth retractors

The parent subsequently assigned `mouth-retractors.mdx` after identifying a concurrent task's uncommitted blanket-removal edit. It is the **16th restored retractor page and 141st affected page** in the parent's expanded inventory, added after the original inventory. Its entire substantive `HEAD` version, replacement notice and final restored page were read. The restoration preserves all ten device-option sections, practical combined setup, harvesting considerations, donor-site context, setup table, three related-page links and all eleven original references. There was no embedded media to recover. Four manufacturer references were added.

Targeted corrections: Denhart's documented lever-operated ratchet replaces the unsupported spring-loaded description; Molt has no asserted inherent stability advantage/disadvantage; the Dingman is not declared the default at high-volume centers; Kilner-Doughty support is model specific. Removed the blanket preference for nasal intubation, universal graft dimensions, unverified SGURS percentage and claimed dominant predictor of buccinator injury. The practical alternatives remain. Donor-site studies no longer imply evidence comparing retractors or a causal benefit of a particular exposure method. Local infiltration remains useful teaching with patient-specific drug/dose planning.

Source scope: manufacturer descriptions/configurations for [Pilling Dingman 070450](https://www.teleflexsurgicalcatalog.com/pilling/product/070450-dingman-mouth-gag-with-blades), [SURTEX Denhart](https://surtex-instruments.com/product/denhart-mouth-gag/), [Kilner-Doughty](https://surtex-instruments.com/product/kilner-doughty-mouth-gag/) and [Molt](https://surtex-instruments.com/product/molt-mouth-gag/) were read; no complete IFU review is asserted. Complete indexed abstracts were read for [Eppley 1997](https://pubmed.ncbi.nlm.nih.gov/9120917/), [Barbagli 2014](https://pubmed.ncbi.nlm.nih.gov/24035880/), [Soave 2018](https://pubmed.ncbi.nlm.nih.gov/29198583/) and [Fabbroni 2005](https://pubmed.ncbi.nlm.nih.gov/15993285/). None is represented as a new complete full-text/package read. The other seven original references remain inherited context and require separate full-source adjudication if used for new clinical assertions. This targeted restoration does not certify the whole BMG literature.

After restoration, the mouth page's citation integrity and scoped whitespace checks pass. All six regression tests and the global **1,186-MDX preservation scan pass**, resolving the earlier notice failure.
