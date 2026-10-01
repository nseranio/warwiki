# AUA Urotrauma 2020 — supplied-guideline check

**Scope:** one supplied guideline; 33 pages edited, 5 confirmed without change. Whole selected pages read; claims checked only where this guideline can settle them. Existing source limitations retained in `status.json`. No build, commit, push or deployment.

**Source:** `reports/audit-v2/sources-local/dl-2026-10-01/aua-urotrauma-2020.txt`; original `~/Downloads/Urotrauma.PDF` (2014, amended April 2017/August 2020). The supplied extraction has a shifted-font encoding; a local readable derivative was used and recommendation pages 1–4 visually checked against the PDF. Source locations below are printed PDF pages. The supplied PDF uses Standard/Recommendation/Option labels; those labels are preserved.

## Pages edited and findings

| Page (repository path) | Claim → correction or confirmation | AUA location |
|---|---|---|
| `docs/05-special-populations/05a-trauma-emergencies/gu-injury-overview.mdx` | No claim correction; 29% pelvic-fracture/gross-hematuria bladder-injury estimate confirmed; reference now links the verified DOI and full amended guideline. | 14a discussion, p12 |
| `docs/05-special-populations/05a-trauma-emergencies/renal-trauma.mdx` | Unspecified hypotension/imaging protocol → SBP <90 mmHg; lower-chest penetrating indication; AUA immediate/delayed images distinguished from ACS selection. Added unstable grade III–V injury with >4 cm hematoma or vascular extravasation intervention criterion. Universal leak-drainage implication → observation for selected stable parenchymal leaks, drainage for complications. Routine ≥48 h repeat imaging separated from prompt symptom-triggered imaging; IVP 10–15 min attributed to AUA. | 1–8; pp8–10 |
| `docs/05-special-populations/05a-trauma-emergencies/bladder-trauma.mdx` | Unqualified imaging trigger → stable-patient indications with AUA grades; conventional fill gains tolerance endpoint and fill/drain films. Unconditional EPB repair during other laparotomy → consider concurrent repair, apply injury type. Added urethral-only drainage after repair with SPT exceptions. Existing ACS/EAU timing, closure and hardware differences retained. | 14a–18; pp12–14 |
| `docs/05-special-populations/05a-trauma-emergencies/trauma-assessment.mdx` | Equivocal-exam-only scrotal US → most blunt injuries suggesting rupture. Generic urethral diversion → SPT preferred for most PFUI with selected stable realignment; delayed ureteral stent pathway scoped to incomplete injury. Added AUA immediate/delayed CT and damage-control drainage, retaining ACS cutaneous ureterostomy. | 3, 9a, 10b, 11a–11b, 19–22, 30a/30c; pp9–17 |
| `docs/05-special-populations/05a-trauma-emergencies/pfui.mdx` | CT-before-RUG citation AUA → ACS. Added SPT Recommendation Grade C, stable realignment Option Grade C/no prolonged attempts, ≥1-year stricture/ED/incontinence surveillance and ORIF/SPT hardware context. | 20b–23; pp14–15 |
| `docs/04-surgical-techniques/04a-urethral-reconstruction/posterior/primary-endoscopic-realignment.mdx` | AUA-cited 15.5 Fr comparative-tract-trauma claim → source-supported flexible/rigid rendezvous setup; series-caliber teaching retained upstream. Added AUA opposition to immediate blunt-straddle repair alongside Peng/WSES views and ≥1-year surveillance. | 20b, 22–25; pp14–16 |
| `docs/04-surgical-techniques/04a-urethral-reconstruction/urethral-reconstruction-principles.mdx` | Universal PFUI pathway/vague AUA standard → male PFUI, SPT preferred for most, selected stable realignment permitted, avoid prolonged attempts. Delayed perineal technique retained; qualified 3–6-month interval remains separately sourced. | 20b/22 discussion; pp14–15 |
| `docs/02-evaluation/imaging/cystography.mdx` | Added primary AUA support for gravity/tolerance filling, passive-fill failure and management. Trauma indications gain stable-patient scope/grades; simple-versus-complex post-repair imaging distinction made explicit beside ACS/EAST pathways. | 14a–17; pp12–14 |
| `docs/02-evaluation/imaging/rug-vcug.mdx` | Prostatic urethra “not reachable on RUG” → contrast may reach posterior urethra/bladder through a patent lumen. Added separately attributed AUA 12 Fr/20 mL trauma protocol; ACS 16 Fr/10–30 mL retained. | 19 discussion, p14 |
| `docs/02-evaluation/imaging/ct-urogram.mdx` | AUA reference upgraded; Statement 9a Grade C scoped to stable trauma with suspected ureteral injury, Statement 19 RUG grade added. Added primary support for cystography/passive-fill distinction; EAU renal five-minute phase retained. | 9a, 14a, 19; pp10–14 |
| `docs/05-special-populations/05a-trauma-emergencies/ureteral-trauma.mdx` | General immediate endoscopic-avulsion repair/ileal ureter → reported options separated from AUA diversion-first advice and repair when diversion fails; bowel/autotransplant deferred acutely. Boari acute EAU view retained beside AUA permission when feasible. Added direct primary imaging/inspection/repair/stenting/damage-control guidance with grades. | 9a–13b; pp10–12 |
| `docs/03-clinical-conditions/03f-fistulas/in-females/ureterovaginal.mdx` | AUA “recommends surgery after failed stent” → initial stent recommended when feasible; further surgery permitted. Added Statement 11c Grade C and six-series denominator context (11–46 patients each). | 11c; pp11–12 |
| `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/index.mdx` | Extensive-loss ladder → ileal/autotransplant options labeled deferred. Location-based repair, direct inspection, temporary drainage and delayed incomplete-injury stenting gain AUA primary citations/grades. | 9b, 10b, 11a–12b; pp11–12 |
| `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/hysterectomy.mdx` | Location-based ureteral repair confirmed; primary AUA citation added only to that sentence. | 12a–12b, p12 |
| `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/cesarean-section.mdx` | Long-defect ileal repair beside immediate/delayed timing → ileal substitution explicitly reserved for delayed reconstruction. | 12a–12b discussion, p12 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/ureteroureterostomy.mdx` | Proximal/distal injury selection confirmed; added AUA primary repair-over-stent and selected distal-repair support beside ACS. | 12a–12b, p12 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx` | Adult tension-free distal-injury repair confirmed; added AUA Recommendation Grade C and psoas/flap primary support. | 12b, p12 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx` | Bladder-mobilization ladder confirmed; added AUA acute adjunct permission and deferred bowel/autotransplant distinction. | 12a–12b discussion, p12 |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/upper-tract-reconstruction-principles.mdx` | Damage-control teaching retained; added primary AUA unstable-patient temporary-drainage/delayed-repair Clinical Principle. | 10b, p11 |
| `docs/03-clinical-conditions/03e-upper-tract/ureteral-stricture.mdx` | Ureteroscopic injury diversion confirmed; added primary AUA citation precisely to stent-failure/nephrostomy clause. | 13a, p12 |
| `docs/05-special-populations/05a-trauma-emergencies/penile-fracture.mdx` | Bilateral fracture mandatory independent trigger → additional urethral-injury risk factor; mandatory AUA signs specified. Added persistent-equivocal-imaging exploration, equal RUG/urethroscopy alternatives, prompt repair at presentation, uncomplicated penetrating-repair qualifications and ≥1-year urethral surveillance. ACS seven-day/EAU 24-hour views retained. | 23–29; pp15–16 |
| `docs/05-special-populations/05a-trauma-emergencies/genital-scrotal-trauma.mdx` | ACS ultrasound/all-penetrating statements explicitly distinguished from AUA “most”; contour/echotexture findings attributed. Solitary-testis flap restriction → flap or graft when primary tunical closure impossible. Added AUA repair, tissue-preservation, prompt replantation/two-bag transport and broader counseling recommendations. | 30a–33; pp16–18 |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-replantation.mdx` | Replantation/transport/counseling confirmed; AUA Clinical Principle and Expert Opinion added beside separately attributed ACS/EAU pathways. | 32–33; pp17–18 |
| `docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-primary-closure.mdx` | Exploration/tunical repair confirmed; primary AUA citations added, with flap-or-graft coverage when albuginea cannot close. | 30a–30c; pp16–17 |
| `docs/04-surgical-techniques/04e-genital-reconstruction/genital-reconstruction-principles.mdx` | Debridement/readiness teaching confirmed; added narrow AUA limited-debridement/viable-skin recommendation. | 31, p17 |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-reconstruction.mdx` | Preserve useful skin/debride nonviable tissue confirmed; AUA primary citation scoped to infection/shearing/burn injury. | 31, p17 |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-grafting.mdx` | Tissue-preserving wound preparation confirmed; narrow AUA primary citation added. | 31, p17 |
| `docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-reconstruction.mdx` | Removal of necrotic tissue with viable-structure preservation confirmed; AUA primary citation added only to that clause. | 31, p17 |
| `docs/05-special-populations/05a-trauma-emergencies/fourniers-gangrene.mdx` | Skin-preserving nonviable-tissue debridement confirmed; primary AUA support added separately from the Tom cohort figures. | 31, p17 |
| `docs/01-foundations/anatomy-physiology/urinary-tract/bladder-anatomy-physiology.mdx` | External IP rupture “generally requires” → repair required; uncomplicated EP drainage, bone-spicule/rectal/vaginal repair and bladder-neck consideration made explicit. Endoscopic conservative exception remains EAU-attributed. | 15–17; pp13–14 |
| `docs/03-clinical-conditions/03f-fistulas/all-patients/vesicocutaneous.mdx` | Prevention implies repair of every injury → injury-specific drainage or repair; added primary AUA imaging/management support in acute-injury context. | 14a–17; pp12–14 |
| `docs/04-surgical-techniques/04h-fistula-repair/all-patients/vesicocutaneous.mdx` | ACS acute-trauma durations retained; added distinct AUA 2–3-week drainage/healing cystogram and complex-versus-simple repair imaging. Chronic VCF is not assigned an acute-trauma protocol. | 15–17 discussion; pp13–14 |
| `docs/05-special-populations/05a-trauma-emergencies/on-table-ivp.mdx` | Contralateral-kidney purpose, limited injury exclusion and retrograde cystography confirmed with primary AUA citation; AUA 2 mL/kg/10–15-minute protocol separated from Morey’s historical 10-minute film. | 3/5a discussion, 9b, 14a; pp9–13 |

## Confirmed without change

- `docs/02-evaluation/imaging/penile-doppler-ultrasound.mdx`: Statement 28 Expert Opinion permits US for equivocal fracture; clear-fracture imaging wording is consistent. ED thresholds, vasoactive doses and other indications not re-audited.
- `docs/04-surgical-techniques/04a-urethral-reconstruction/posterior/core-through-urethrotomy.mdx`: Statements 20b/22 and p8 background confirm SPT Recommendation Grade C, realignment Option Grade C and frequent subsequent instrumentation/reconstruction. Historical technique/outcomes and 2023/EAU claims not re-audited.
- `docs/03-clinical-conditions/03b-voiding-outlet/posterior-urethral-stenosis.mdx`: Statement 22 discussion supports the deferred PFUI reconstructive pathway. Radiation/VUAS selection and outcomes not re-audited.
- `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/radical-hysterectomy-pelvic-lymphadenectomy.mdx`: No contradiction in AUA-settleable urinary-injury principles; operation-specific prevention, oncologic reconstruction, incidence and bladder dysfunction not settled by this source.
- `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/pelvic-tumor-resection.mdx`: No contradiction in AUA-settleable urinary-injury principles; planned oncologic reconstruction is distinct from acute traumatic repair. Operation-specific outcomes and prevention not re-audited.

## Citations and DOI verification

One primary source reused across pages: Morey AF, Broghammer JA, Hollowell CMP, et al. Urotrauma Guideline 2020: AUA Guideline. *J Urol.* 2021;205(1):30–35. [DOI 10.1097/JU.0000000000001408](https://doi.org/10.1097/JU.0000000000001408). Full-guideline references identify the 2014 edition and 2017/2020 amendments.

`python3 scripts/audit/pubmed.py doi 10.1097/JU.0000000000001408` → **PMID 33053308; PASS**: Morey first author, 2021 journal publication, exact title, 205(1):30–35; PubMed confirms the 2020 amendment. DOI was read from existing bibliography, verified before reuse; no other DOI added.

| Page | AUA reference |
|---|---|
| `docs/05-special-populations/05a-trauma-emergencies/gu-injury-overview.mdx` | 3 (existing source; citation/reference strengthened) |
| `docs/05-special-populations/05a-trauma-emergencies/renal-trauma.mdx` | 4 (existing source; citation/reference strengthened) |
| `docs/05-special-populations/05a-trauma-emergencies/bladder-trauma.mdx` | 5 (existing source; citation/reference strengthened) |
| `docs/05-special-populations/05a-trauma-emergencies/trauma-assessment.mdx` | 2 (existing source; citation/reference strengthened) |
| `docs/05-special-populations/05a-trauma-emergencies/pfui.mdx` | 3 (existing source; citation/reference strengthened) |
| `docs/04-surgical-techniques/04a-urethral-reconstruction/posterior/primary-endoscopic-realignment.mdx` | 4 (existing source; citation/reference strengthened) |
| `docs/04-surgical-techniques/04a-urethral-reconstruction/urethral-reconstruction-principles.mdx` | 24 (existing source; citation/reference strengthened) |
| `docs/02-evaluation/imaging/cystography.mdx` | 13 (existing source; citation/reference strengthened) |
| `docs/02-evaluation/imaging/rug-vcug.mdx` | 12 (existing source; citation/reference strengthened) |
| `docs/02-evaluation/imaging/ct-urogram.mdx` | 5 (existing source; citation/reference strengthened) |
| `docs/05-special-populations/05a-trauma-emergencies/ureteral-trauma.mdx` | 17 (added primary source) |
| `docs/03-clinical-conditions/03f-fistulas/in-females/ureterovaginal.mdx` | 3 (existing source; citation/reference strengthened) |
| `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/index.mdx` | 18 (added primary source) |
| `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/hysterectomy.mdx` | 13 (added primary source) |
| `docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/cesarean-section.mdx` | 39 (added primary source) |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/ureteroureterostomy.mdx` | 24 (added primary source) |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx` | 55 (added primary source) |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx` | 26 (added primary source) |
| `docs/04-surgical-techniques/04d-upper-tract-reconstruction/upper-tract-reconstruction-principles.mdx` | 21 (added primary source) |
| `docs/03-clinical-conditions/03e-upper-tract/ureteral-stricture.mdx` | 52 (added primary source) |
| `docs/05-special-populations/05a-trauma-emergencies/penile-fracture.mdx` | 11 (added primary source) |
| `docs/05-special-populations/05a-trauma-emergencies/genital-scrotal-trauma.mdx` | 8 (added primary source) |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-replantation.mdx` | 29 (added primary source) |
| `docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-primary-closure.mdx` | 27 (added primary source) |
| `docs/04-surgical-techniques/04e-genital-reconstruction/genital-reconstruction-principles.mdx` | 22 (added primary source) |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-reconstruction.mdx` | 6 (added primary source) |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-grafting.mdx` | 31 (added primary source) |
| `docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-reconstruction.mdx` | 29 (added primary source) |
| `docs/05-special-populations/05a-trauma-emergencies/fourniers-gangrene.mdx` | 22 (added primary source) |
| `docs/01-foundations/anatomy-physiology/urinary-tract/bladder-anatomy-physiology.mdx` | 38 (added primary source) |
| `docs/03-clinical-conditions/03f-fistulas/all-patients/vesicocutaneous.mdx` | 38 (added primary source) |
| `docs/04-surgical-techniques/04h-fistula-repair/all-patients/vesicocutaneous.mdx` | 13 (added primary source) |
| `docs/05-special-populations/05a-trauma-emergencies/on-table-ivp.mdx` | 17 (added primary source) |

## Settled and still open

- Settled: AUA 2020 renal intervention threshold; stable-leak observation versus complicated-leak drainage; cystography indications/filling/follow-up; ureteral injury diversion/repair scope; UVF permissive surgery; PFUI SPT/realignment grades and ≥1-year surveillance; ≥14 Fr Foley SPT, avoidance of ≤12 Fr tubes and 18G localization; penile/scrotal imaging, repair, tissue preservation and replantation/counseling scope.
- Differences retained with attribution: AUA acute Boari permission versus EAU acute limitation; AUA renal delayed imaging versus ACS selection; AUA/ACS/EAU bladder drainage and post-repair cystography pathways; AUA prompt penile repair versus ACS seven-day/EAU 24-hour statements; AUA versus ACS RUG/scrotal protocols; AUA straddle-injury stance alongside Peng/WSES teaching.
- Still open to other sources: source-specific outcome denominators and historical series; MRI/prognostic thresholds; graft/flap superiority and defect dimensions; operative sutures/drains/scopes; catheter/stent durations; CCH-associated injury; chronic/radiated fistula protocols; pediatric, pregnancy, female-genital, antibiotic/VTE and planned oncologic reconstruction details. This check does not clear those claims.
- Search-only screening excluded navigation, incidental anatomy/instrument hits and named-technique/oncologic claims without a new AUA-settleable assertion. These were not counted as confirmed whole-page reviews.

## Decisions for the user

- Acute Boari flap: retain both guideline positions and use feasibility, physiology and reconstructive expertise to select repair; recommend keeping the attributed distinction.
- Different bladder/penile-trauma timing pathways: retain source-specific recommendations; recommend following the treating trauma/urology service’s documented pathway instead of creating one blended interval.
- No publication decision required in this run; recommend leaving the working tree for the next guideline as instructed.

## Validation

- `npm run lint:citations`: PASS (1,206 files).
- `npm run lint:links`: PASS (1,206 files, no broken `/docs/` links).
- `git diff --check`: PASS.
- `audit.py record <path> checked ...`: 38 records persisted; current hashes verified, previous notes retained.
