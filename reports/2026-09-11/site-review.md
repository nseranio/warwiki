# WARWIKI: site-wide review and priorities

September 11, 2026. Baseline: substantive content/media work through June 28; the September handoff save was not a new clinical review.

## Overall judgment

WARWIKI already has the useful structure of a specialist reference: foundations, evaluation, clinical conditions, named techniques, special populations, and supporting media. Keep Docusaurus and the static delivery model. The highest-value next investment is **trustworthy, fast clinical retrieval**, especially for the seven practice problems below. More article volume and more elaborate graphics are lower priorities than identifying which recommendation is current, which source supports it, and what applies to the patient in front of the clinician.

This review combines a whole-corpus structural inventory, source-level engineering review, live homepage/search inspection, targeted clinical verification, and a five-diagram visual/source sample. It is **not** a line-by-line clinical sign-off of all 1,186 documentation pages. That distinction matters because the review found actual guideline interpretation and diagram errors that passed the existing lint suite.

## What was measured across the whole site

| Section | Documentation pages | Clinical article pages* | Pages with local figures |
|---|---:|---:|---:|
| Foundations | 446 | 418 | 19 |
| Evaluation | 38 | 33 | 1 |
| Clinical Conditions | 73 | 69 | 4 |
| Treatment Atlas | 451 | 426 | 38 |
| Special Populations | 46 | 37 | 4 |
| Journal Club | 1 | — | 0 |
| History & Lineage | 120 | — | 0 |
| Resources | 11 | — | 0 |
| **Total** | **1,186** | **983** | **66** |

*A reproducible heuristic excludes landing/database pages with `hide_title`, section indexes, and surgeon profiles. It includes instrument and other clinical-support articles. Some unmarked database pages remain in the clinical count. Figures here are local Markdown image embeds; this does not count all possible React illustrations or videos.*

- **981 of 983** clinical article pages lacked a recorded `lastReviewed` date. Missing metadata does not prove a page has never been reviewed; it prevents readers and maintainers from verifying that status.
- **51** had no structured reference anchors/footnotes. Some have plain numbered bibliographies or serve as databases; this is not a claim that all 51 are unsourced. Several long imaging articles fall through the old density check because it only examines a narrow length band.
- About **17,700 structured reference entries** are present across the corpus. These are page-local entries, not globally distinct papers and not a reliability score.
- All detected local Markdown images exist and have nonempty alt text. The separate structural figure scan covers 55 original SVGs; clinical accuracy requires more than asset existence or accessible labels.
- `DecisionTree` and `FreshnessBadge` existed but were not wired into article content. Only two pages recorded clinician review metadata. New `EvidenceStatus` now displays scoped evidence updates separately from recorded clinical reviews.

The exact, regenerable page inventory is `content-inventory.json` (`npm run audit:content`). It includes every source path and triage candidates, not just a sample of attractive pages.

## Fixes made during this review

- Updated targeted functional/reconstructive evidence and corrected inaccurate interpretations in NLUTD, OAB, recurrent UTI/GSM, outlet surgery and reconstruction. The two literature reports list every included study, source/access limitation, and unresolved item.
- Added correction/retraction awareness. A Wallace/Bricker study with an expression of concern is no longer used to present a clean comparative outcome advantage. Revised PHOENIX penile-prosthesis data are flagged rather than carrying forward superseded denominators/rates.
- Corrected POP-Q figure sign/stage errors and the male BOOI threshold/scope, including the diagram generators and consuming captions. See `diagrams-quality.md` for what the sample did and did not establish.
- Repaired nine SVG accessibility headers that prevented the build from detecting image dimensions. The original visible shapes/text and full descriptive narratives are preserved; all 55 SVGs now pass dimension detection.
- Strengthened citation lint to catch a displayed number linking to a different reference and duplicate anchors. This exposed six references collapsed onto `ref37` in the AMAB nullification article; the named-source links were restored. This repair is reference wiring, not a fresh review of every clinical statement on that page.
- Created monthly literature collection and a recurring evidence-editing task, with provenance and failure reporting.
- Removed the quiz, reduced the prominence of History & Lineage, paused public handouts, and removed their PDFs/previews from deployment output while preserving source files.
- Reduced initial video rendering from 1,546 cards to 24; search still covers all videos. Prevented unnecessary report-only/preview deployments and switched default reading audio to device speech.

## Ranked next improvements

| Priority | Work | Why it matters / completion criterion |
|---|---|---|
| **1 — before Epic templates** | Clinician verification of the seven core pathways | Review every actionable threshold, dose, contraindication, diagnostic test, and counseling estimate that would enter a template. Record reviewer/date/source version. A template should not amplify an unverified wiki statement. |
| **1** | Structured evidence records for key claims | Store study identity, source URL, population, design, n, comparison, endpoint, follow-up, absolute outcomes, confidence interval, limitations, source-access level, and correction status once. Generate summaries/tables from that record and link dependent pages/templates. Start with the seven core topics; avoid a disruptive all-site migration. |
| **1** | Complete the clinical diagram audit | Review all 55 SVGs in a deliberate queue. Every diagram needs source, orientation, units, boundary rules, population, schematic/not-to-scale status, version and clinician approval. Fix captions and generator together. Begin with POP-Q, pressure-flow, sling routes, urethral/graft anatomy. |
| **1** | Long imaging-page claim audit | CTU, ultrasound, MRI and RUG/VCUG have extensive prose with largely unlinked bibliographies. Verify indication/contrast/radiation claims and connect individual claims to sources. Do not infer validity from a long reference list at the bottom. |
| **1** | Renal/stone prescribing-claim audit | Methenamine guidance was corrected, but the broader urinary-acidifiers page still needs review of calcium-phosphate stone/alkali rules, bicarbonate duration, vitamin-C ceilings and older adjunct doses. Do not reuse those unreviewed sections in prescribing templates. |
| **1** | Dependency maintenance | The September 11 package audit reports 63 affected packages (4 critical, 37 high, 19 moderate, 3 low), including inherited build/test dependencies. These are package findings, not 63 demonstrated public-site exploits. Review reachability and update the Docusaurus/build/test stack together, then rebuild and check representative pages. Do not apply a forced major-version fix blindly. See `dependency-review.md`. |
| **2** | Standard “At a glance” article opening | Use a brief clinical question, essential assessment, treatment choices, important exclusions, and follow-up. Keep long technique/evidence discussions below. This should be a consistent editorial pattern, not another competing article for the same condition. |
| **2** | Evidence tables with comparable denominators | Define “success,” follow-up and missing data before placing percentages side by side. Separate guideline recommendations, randomized comparisons, uncontrolled series, device labeling, and expert technique preferences visually. |
| **2** | Cleaner navigation and useful search synonyms | At a 1280-pixel desktop viewport the main navbar wraps several items and truncates the brand. Group Video Library, Journal Club and Resources into a compact Library dropdown. Test synonyms such as rUTI/recurrent UTI, LUTS/BPH, and OAB/UUI. Live recurrent-UTI search was functional; broad result counts suggest ranking/quick access is more useful than replacing search. |
| **2** | Quick access to the seven clinic problems | Add a small clinician landing area linking directly to diagnosis, treatment comparison, procedure and follow-up resources. A local-only recent/favorites feature could help; a new account system is unnecessary for this need. |
| **2** | Validate rendered links and mobile behavior | Extend checks to compiled HTML anchors, dynamic database links, and a small representative mobile/desktop browser suite. Source-only link tests deliberately miss some runtime/data-driven structures. |
| **3** | Reference registry and duplicate-topic cleanup | Consolidate DOI/PMID metadata and preserve stable identifiers. Keep drug-class hubs as the source for doses/labels and procedural pages as the source for operative decisions. Audit unusually short named-technique pages for whether a section in the parent would be clearer. |
| **3** | Media maintenance with a review queue | Refresh playlists/podcasts separately from literature. A new video is a teaching resource, not clinical evidence by itself. Preserve the near-References placement convention and device-mechanics/procedure distinction. |

## Changes I would avoid for now

Do not migrate frameworks, add an AI chatbot over unverified content, publish an automatic recommendation from every new abstract, or generate decorative anatomical images for the sake of coverage. These would add work or apparent authority before resolving the actual reliability gaps. The existing SVG/React/static-site approach is capable of high-quality outputs with better data and clinical review.

## Practice-building sequence through October 15

Keep the user's **general new-patient shell + separate HPI and assessment/plan modules**. Use the analogous **operative shell + procedure-specific technique modules**. This is an appropriate design, provided inserting the same data twice and carrying irrelevant sections forward are avoided. These are design recommendations, not an Epic build already delivered.

| Stage | Deliverable |
|---|---|
| September 11–20 | Finish core evidence sign-off and collect representative **de-identified** existing phrases/operative examples plus the local Epic SmartLink/SmartList catalog. |
| September 21–30 | Create the new/return visit shells and HPI/A&P modules for female incontinence, POP, male incontinence, BPH, male stricture, ED, and female recurrent UTI. Establish a consistent private naming/version scheme. |
| October 1–7 | Add the most frequent office/operative reports; map chart facts to verified local Epic fields and decision branches to explicit selections. Keep postoperative orders and documentation distinct. |
| October 8–14 | Validate in the institution's test/training environment using normal, missing-data, atypical and multi-problem cases. Review rendered notes for stale auto-text, contradictions and excessive length. |
| October 15 onward | Start with the small verified stack. Measure time to finish a note, edits after insertion and recurring omissions; extend to the next common WARWIKI topics after real use. |

Autopopulate reliable chart facts with their relevant dates. Use explicit selections for patient-reported symptoms, examination findings, counseling, consent, treatment decisions, and what actually occurred in the operating room. Exact Epic field names/IDs must be verified locally. SmartPhrase insertion does not by itself place orders or validate a clinical event. The source library should retain evidence details, while the final patient note should contain only relevant encounter documentation. Epic's own analysis of note composition illustrates why indiscriminate auto-text can produce longer notes without proportional benefit. [Epic Research](https://media.epic.com/epicresearch/wordpressmedia/pdfs/two-years-after-coding-changes-sought-to-decrease-documentation-notes-remain-bloated.pdf)

Personal operative examples and patient-specific material should be kept in a private workspace outside this public repository. No Epic templates or patient records were created or uploaded in this update.

## Supporting reports

Final local verification passed: production build (including handout exclusion, without the earlier SVG warnings), typecheck, 13 unit tests, maintenance tests, source lint and whitespace checks. Browser checks confirmed paused handouts, absent quiz/archive resource links, video expansion from 24 to 48, full-library VRAM search, and clear evidence labeling at desktop and 390-pixel phone width. This is a representative interface check, not an exhaustive browser test of every page. CI now enforces a 200 MB output budget; deliberate handout restoration requires revisiting that budget.

- `reconstructive-literature.md` — reconstruction/outlet/sexual-medicine evidence and corrections.
- `functional-urogynecology-literature.md` — functional and urogynecologic evidence and corrections.
- `hosting-performance.md` — measured output, the actual deployment-storage limit, and retention/hosting choices.
- `diagrams-quality.md` — diagram sample, verified fixes and remaining clinical review needs.
- `dependency-review.md` — package-audit findings and deployment/development exposure distinctions.
- `maintenance.md` — what runs automatically, what it verifies, and operational limitations.
- `content-inventory.json` and `literature-inbox/` — reproducible inventory and raw screening metadata.
