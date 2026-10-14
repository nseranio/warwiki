# Daniel D. Eun surgical genealogy profile — October 14, 2026

## Sources and fact ledger

| Profile fact | Verification |
| --- | --- |
| Professional name, MD, current clinical professor of urology, Thomas Jefferson University/Sidney Kimmel Medical College | [Jefferson faculty page](https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/departments/urology/faculty/eun.html), accessed October 2026. The faculty listing and Philadelphia office establish the United States as his career base for the node's country and flag. |
| Current directors' roles: International Urology Program Development and Advanced Robotic Urologic Oncology and Reconstructive Surgery fellowship | [Jefferson faculty page](https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/departments/urology/faculty/eun.html), accessed October 2026. |
| Medical school: Lewis Katz School of Medicine at Temple University, MD 2001 | [Jefferson faculty page](https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/departments/urology/faculty/eun.html), accessed October 2026. |
| Surgery internship: University of Pennsylvania, 2002 | [Jefferson faculty page](https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/departments/urology/faculty/eun.html), accessed October 2026. |
| Urology residency and robotic urologic oncology fellowship: Henry Ford Hospital/Vattikuti Urology Institute | [Jefferson faculty page](https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/departments/urology/faculty/eun.html), accessed October 2026. The listing gives 2008 for residency and 2007 for fellowship; the page avoids a chronological inference from these dates. [North American Robotic Urology Society biography](https://narus.us/faculty-og/daniel-eun/) independently confirms both programs and calls the fellowship 18 months. |
| Career move: Temple to Thomas Jefferson University in July 2025 | [North American Robotic Urology Society biography](https://narus.us/faculty-og/daniel-eun/), accessed October 2026. Older [Temple Health material](https://www.templehealth.org/about/news/in-the-media/dr-daniel-eun-leads-webinar-on-robotic-reconstructive-surgery-of-the-upper-urinary-tract-as-part-of-leadership-series-with-philadelphia-international-medicine) identifies his former Temple roles. The node and profile use the current Jefferson appointment. |

The entry remains in its existing general GURS lineage section. The owner specifically identified Eun's impact on reconstruction outside GURS; moving him to a school or assigning a lineage relationship would imply a relationship not verified by the consulted sources.

## WARWIKI-cited contributions and Crossref checks

Each DOI was queried at `https://api.crossref.org/works/<doi>` on October 14, 2026. The title, first author, publication year, journal, and Eun's authorship were confirmed against the returned record.

| DOI and Crossref check | WARWIKI citation page linked in profile |
| --- | --- |
| [10.1016/j.eururo.2014.08.057](https://api.crossref.org/works/10.1016/j.eururo.2014.08.057) — *Use of Indocyanine Green During Robot-assisted Ureteral Reconstructions*; Lee; 2015; *European Urology*; Eun listed | [Indocyanine Green (ICG)](/docs/foundations/pharmacology/intraoperative-adjuncts/visualization-agents/icg) |
| [10.1016/j.juro.2017.06.097](https://api.crossref.org/works/10.1016/j.juro.2017.06.097) — *Robotic Ureteroplasty with Buccal Mucosa Graft for the Management of Complex Ureteral Strictures*; Lee; 2017; *Journal of Urology*; Eun listed | [Buccal Mucosa Graft Ureteroplasty](/docs/surgical-techniques/04d-upper-tract-reconstruction/bmg-onlay-ureter) |
| [10.1016/j.urology.2017.12.005](https://api.crossref.org/works/10.1016/j.urology.2017.12.005) — *Robotic Appendiceal Interposition With Right Lower Pole Calycostomy, Downward Nephropexy, and Psoas Hitch for the Management of an Iatrogenic Near-complete Ureteral Avulsion*; Gn; 2018; *Urology*; Eun listed | [Downward Nephropexy](/docs/surgical-techniques/04d-upper-tract-reconstruction/downward-nephropexy) |
| [10.1016/j.eururo.2025.04.026](https://api.crossref.org/works/10.1016/j.eururo.2025.04.026) — *Robotic Transvesical Bladder Neck Reconstruction: A Novel Approach to Managing Vesicourethral Anastomotic Stenosis*; Lee; 2025; *European Urology*; Eun listed | [Transvesical Approaches](/docs/surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transvesical-approaches) |

Two further WARWIKI-cited candidate works were also Crossref-checked but left out of the short profile: [10.1089/end.2024.0342](https://api.crossref.org/works/10.1089/end.2024.0342), *Robotic Multiport Buccal Mucosa Graft Ureteroplasty: Tips and Tricks*, Chao, 2025, *Journal of Endourology*, Eun listed, cited on [BMG Ureteroplasty](/docs/surgical-techniques/04d-upper-tract-reconstruction/bmg-onlay-ureter); and [10.1089/end.2023.0020](https://api.crossref.org/works/10.1089/end.2023.0020), *Outcomes of Robotic Simple Prostatectomy After Prior Failed Endoscopic Treatment of Benign Prostatic Hyperplasia*, Lee, 2023, *Journal of Endourology*, Eun listed, cited on [Simple Prostatectomy](/docs/surgical-techniques/04m-bph-male-luts/simple-prostatectomy).

## Links and omissions

- Added `path: 'a-g/daniel-eun'` to the existing node; the profile has four verified clinical page links. No other profile content changed.
- No photo was added. The image URL exposed by the [Jefferson faculty page](https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/departments/urology/faculty/eun.html) returned HTTP 404 when checked, so it did not meet the HTTP 200/image-content-type requirement.
- No mentor or trainee edge was added. [TURNS's Ziho Lee biography](https://www.turnsresearch.org/members/index.php?s=ziho-lee-md) establishes Lee's Temple fellowship; Jefferson/NARUS establish Eun's program leadership, but the consulted sources do not explicitly state an individual Eun–Lee training relationship. Coauthorship alone was not treated as training evidence.
- Eun was not listed on the [TURNS members page](https://www.turnsresearch.org/members/index.php) when checked. The page does list Ziho Lee. No TURNS membership was claimed for Eun.
- The source record did not explicitly name Eun's own fellowship mentor. The profile names the institution and program, with no inferred mentor.
- Both `gen-profile-lineage.js` and `gen-surgeon-citations.js` completed in a write-intercepted dry run, producing valid in-memory `daniel-eun.json` payloads (lineage: Daniel D. Eun, zero trainees; citations: seven matched papers). The generated JSON files were not persisted because their paths are outside the owner's explicit edit allowance. The orchestrator's prebuild will create them.

## Checks

- `npm run lint:links` — pass; 1,374 files, no broken `/docs/` links. The first run found two links that used filesystem subdirectories instead of the pages' explicit slugs; both were corrected and the check was rerun.
- `npm run lint:orphans` — pass; 533 hidden-category pages, all linked.
- `git diff --check` — pass.
- `npm run build` was not run, per the owner/orchestrator instruction.
