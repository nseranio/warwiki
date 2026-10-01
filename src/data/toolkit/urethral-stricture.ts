import type { ToolkitItem } from './types';

const CONDITION = 'docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx';
const HUB = 'docs/04-surgical-techniques/04a-urethral-reconstruction/male-urethroplasty.mdx';
const EPA = 'docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/excision-primary-anastomosis.mdx';
const GRAFT = 'docs/04-surgical-techniques/04a-urethral-reconstruction/graft/dorsal-onlay-omg.mdx';
const DVIU = 'docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu.mdx';
const NOTICE = 'Template: a structure to complete, not a record. Replace every *** and choose one option in each [ ].';
const UPDATED = '2026-10-01';

export const STRICTURE_TOOLKIT: ToolkitItem[] = [
  {
    id: 'stricture-clinic-note', kind: 'clinic-note', topic: 'Urethral stricture',
    title: 'Stricture evaluation module',
    summary: 'History, anatomic workup, prior procedures and treatment selection for adult urethral stricture.',
    pages: [CONDITION, HUB], sources: [], updated: UPDATED,
    body: `${NOTICE}

Presenting symptoms, duration and effect on daily life: ***. Stream, straining, spraying, incomplete emptying, retention, infections and hematuria: ***.
Suspected cause: [instrumentation / trauma / inflammatory disease / prior surgery / radiation / unknown / other: ***]. Prior dilation, urethrotomy, urethroplasty or catheter placement, with dates and response: ***.
Current drainage: [spontaneous voiding / urethral catheter / suprapubic tube / intermittent catheterization / other: ***]. Sexual function and patient goals: ***.
Examination: meatus and genital skin ***; perineum ***; relevant scars or inflammatory findings ***.
Tests reviewed: flow and postvoid residual ***; urinalysis or culture ***; retrograde urethrogram ***; voiding study ***; cystoscopy ***. Stricture site, length, caliber and degree of spongiofibrosis as supported by tests: ***.
Assessment: [anterior / posterior / recurrent / complex] stricture at ***. Important modifiers: ***.
Options discussed: [observation / dilation / internal urethrotomy / drug-coated balloon when eligible / anastomotic urethroplasty / graft urethroplasty / staged repair / perineal urethrostomy / drainage / other: ***]. Expected durability and tradeoffs for this anatomy: ***.
Chosen plan, rationale, questions and follow-up: ***.`,
  },
  {
    id: 'stricture-urethroplasty-counseling', kind: 'counseling', topic: 'Urethral stricture',
    title: 'Urethroplasty counseling',
    summary: 'Anastomotic, graft or staged reconstruction with recurrence, sexual and graft-site risks.',
    pages: [CONDITION, HUB, EPA, GRAFT], sources: [
      { figure: '90–99% in selected series', page: EPA, anchor: 'transecting-vs-non-transecting-vessel-sparing-epa' },
      { figure: 'up to 20% at medium-term follow-up', page: GRAFT, anchor: 'outcomes' },
      { figure: '12.9% in each arm at one year', page: EPA, anchor: 'epa-vs-other-urethroplasty-techniques' },
    ], updated: UPDATED,
    body: `${NOTICE}

Anatomy reviewed with the patient: site ***; length ***; prior treatment ***. Proposed repair: [anastomotic / oral-mucosa graft / staged / other: ***] because ***.
Purpose: widen the narrowed segment to improve emptying. For selected short bulbar strictures, excision and primary anastomosis has reported success of 90–99% in selected series. Bulbar dorsal oral-mucosa graft reports describe recurrence up to 20% at medium-term follow-up. These estimates use different patients and definitions and do not predict this repair's result. In a short-bulbar randomized comparison, recurrence was 12.9% in each arm at one year; the trial did not establish equal long-term durability. Location, length, prior procedures, radiation and tissue health affecting this patient: ***.
Procedure and recovery discussed: incision and graft site if used ***; catheter and imaging plan ***; follow-up with symptoms, flow and further evaluation when indicated ***.
Risks discussed: bleeding, infection, wound problems, urine leak or fistula, recurrent narrowing, persistent urinary symptoms, incontinence, altered ejaculation or erections, penile shortening or curvature, perineal numbness or pain, and additional treatment. If oral mucosa is harvested: mouth pain, numbness, tightness and eating difficulty. Risks specific to this repair: ***.
Alternatives: endoscopic treatment, drug-coated balloon when eligible, perineal urethrostomy, chronic drainage, or observation when appropriate. Patient priorities and questions: ***. Decision: ***.`,
  },
  {
    id: 'stricture-endoscopic-counseling', kind: 'counseling', topic: 'Urethral stricture',
    title: 'Endoscopic stricture treatment counseling',
    summary: 'Dilation, internal urethrotomy or eligible drug-coated balloon treatment and recurrence planning.',
    pages: [CONDITION, HUB, DVIU], sources: [
      { figure: '35-70% long-term success', page: DVIU, anchor: 'guideline-position' },
      { figure: 'more than 80% failure', page: DVIU, anchor: 'guideline-position' },
      { figure: '83.2% versus 21.7% free of reintervention at one year', page: DVIU, anchor: 'adjunctive-pharmacology' },
    ], updated: UPDATED,
    body: `${NOTICE}

Stricture anatomy and prior treatments: ***. Proposed [dilation / internal urethrotomy / drug-coated balloon] and reason: ***.
The narrowed segment is opened through the urethra. The AUA summary reports 35-70% long-term success for selected short strictures after dilation or urethrotomy; results are best for the shortest first-time bulbar strictures. For a recurrent anterior stricture, the page reports more than 80% failure after another endoscopic procedure in many settings, favoring discussion of reconstruction. In ROBUST III, the drug-coated balloon group had 83.2% versus 21.7% free of reintervention at one year after standard dilation or urethrotomy; that trial studied recurrent anterior strictures and did not compare the balloon with urethroplasty. Eligibility and uncertainty for this patient: ***.
Catheter and follow-up plan: ***. Self-dilation, if considered, and its burden: ***.
Risks discussed: bleeding, infection, discomfort, false passage or injury, retention, recurrence, and need for urethroplasty or another treatment. Device-specific warnings and reproductive precautions if a drug-coated balloon is chosen: ***.
Alternatives: observation, urethroplasty, perineal urethrostomy or long-term drainage. Patient questions and choice: ***.`,
  },
  {
    id: 'stricture-bmg-op-note', kind: 'op-note', topic: 'Urethral stricture',
    title: 'Oral-mucosa graft urethroplasty',
    summary: 'Operative note structure for graft harvest, urethral onlay or inlay and drainage.',
    pages: [HUB, GRAFT], sources: [], updated: UPDATED,
    body: `${NOTICE}

Preoperative diagnosis: ***
Postoperative diagnosis: ***
Procedures: urethroplasty with [dorsal onlay / ventral onlay / inlay / augmented anastomosis / other: ***] oral-mucosa graft; graft harvest from ***; cystourethroscopy ***
Anesthesia and positioning: ***
Indication, alternatives and consent: ***

Findings: stricture site and length ***; urethral plate ***; spongiofibrosis ***; proximal urethra and bladder ***; donor site ***.
Procedure details: A urine and antibiotic plan was confirmed: ***. The patient was placed in [high lithotomy / low lithotomy / supine] with pressure points padded; the operative and oral donor fields were separately prepared and draped. A [perineal / penile / combined] incision was made, and dissection proceeded through the soft tissues to the corpus spongiosum. The urethra was exposed and mobilized [circumferentially / unilaterally while preserving the opposite vascular attachment / without circumferential mobilization] according to the chosen route.
The narrowed segment was localized by [cystoscopy / calibrated sound / imaging / other: ***]. A urethrotomy was made on the [dorsal / ventral] surface and extended into healthy proximal and distal lumen. The length and quality of the opened plate are recorded above. [For augmented anastomosis, the nearly obliterated segment was excised and the remaining plate or spongiosum reapproximated without tension before adding the graft / No segment was excised].
At the [cheek / lip / tongue] donor site, the duct opening was identified and protected. A graft matching the measured defect was marked, infiltrated with [local anesthetic / saline / other: ***], and sharply elevated in a plane superficial to muscle. Hemostasis was obtained. The donor bed was [closed with absorbable suture / left open after hemostasis], and the graft was thinned of excess submucosa and kept moist until placement.
[Dorsal onlay: the graft was spread on the tunica of the corpora cavernosa, secured at the proximal and distal ends and quilted to its vascular bed; the urethral edges were sewn to the graft margins without twisting. / Ventral onlay: the graft was secured to the ventral urethrotomy margins and covered by reapproximated spongiosum or local vascularized tissue. / Inlay: the urethral plate was incised at the selected site, the graft quilted into the plate, and its edges anastomosed to healthy urethral mucosa.] Proximal and distal continuity and caliber were checked by [cystoscopy / calibration / other: ***]; findings are above.
A [urethral catheter / urethral catheter and suprapubic tube / other: ***] was placed under vision or over a guidewire, with intravesical position confirmed by ***. The graft edges and repair were checked for tension and hemostasis. The wound was irrigated, soft-tissue coverage was restored with [absorbable suture / other: ***], and the skin and donor site were dressed: ***.

Estimated blood loss: ***
Specimens: ***
Drains: ***
Complications: ***
Disposition, catheter imaging, oral care and follow-up plan: ***.`,
  },
  {
    id: 'stricture-urethroplasty-instructions', kind: 'patient-instructions', topic: 'Urethral stricture',
    title: 'After urethroplasty',
    summary: 'Plain-language catheter, incision, graft-site and return-precaution instructions.',
    pages: [HUB], sources: [], updated: UPDATED,
    body: `${NOTICE}

Your repair and graft site, if any: ***. The catheter protects the repair while it heals. Secure it to your leg, keep the bag below bladder level and the tubing free of kinks, wash hands before handling it, and empty the bag as taught. Do not pull on or remove the catheter. A little leakage around it can happen with bladder spasms; call if leakage increases or the bag stops collecting urine. Your catheter removal and imaging appointments: ***.
Keep the incision clean and dry and check it daily for spreading redness or drainage. Showering, soaking and dressing changes: ***. Walking is encouraged as tolerated; your limits on lifting, cycling or straddling, driving, work and sexual activity are ***. Take pain medicine and any prescribed bladder-spasm medicine as directed: ***. Avoid straining with the bowel plan: ***.
If tissue was taken from the mouth, choose [soft foods / usual diet as tolerated] and use the rinse plan ***. Mild soreness and cheek tightness can occur. Call for mouth bleeding that does not stop with gentle pressure, worsening swelling or trouble taking fluids.
Call the care team if the catheter stops draining, falls out, or there is new or increasing leakage around it; also call for fever, increasing wound redness or drainage, swelling, or worsening pain. Seek urgent help if you feel very unwell, cannot get urine to drain, or develop trouble swallowing or breathing.
Follow-up date and contact number: ***.`,
  },
  {
    id: 'stricture-dviu-op-note', kind: 'op-note', topic: 'Urethral stricture',
    title: 'Endoscopic stricture treatment',
    summary: 'Procedure note for guidewire-directed dilation, urethrotomy or eligible drug-coated balloon use.',
    pages: [CONDITION, DVIU], sources: [], updated: UPDATED,
    body: `${NOTICE}

Preoperative diagnosis: Urethral stricture at ***
Postoperative diagnosis: ***
Procedure: cystourethroscopy with [sequential dilation / direct-vision internal urethrotomy / drug-coated balloon dilation / other: ***]
Device, manufacturer, lot and size if used: ***
Anesthesia and position: ***
Indication: Symptoms, anatomy, prior procedures and treatment goal: ***. Alternatives included observation, reconstruction, perineal urethrostomy and drainage. Recurrence, bleeding, infection, false passage, sphincter or adjacent-tissue injury, retention and need for later reconstruction were discussed. For a drug-coated balloon, eligibility, paclitaxel warnings and reproductive precautions were reviewed: ***. Consent: ***.

Findings:
Meatus and urethra outside the narrowing: ***
Stricture site, length and caliber: ***
Sphincter and proximal urethra: ***
Bladder and ureteral orifices: ***
Final lumen and any injury: ***

Procedure details: Urine testing, antibiotic plan and anticoagulant plan were confirmed: ***. The patient was placed in [lithotomy / supine] with pressure points padded and the genital field prepared and draped. The [cystoscope / urethrotome] was introduced under direct vision. The narrowing was identified without forcing the instrument through it. A soft guidewire was advanced across the scar into the bladder under vision and [cystoscopic / fluoroscopic] confirmation, then retained as a safety rail.
[Dilation: sequential dilators or a standard balloon were advanced over the wire with controlled increments, monitoring resistance and position, until the selected lumen was reached; the instruments were removed without losing the safety wire. / Internal urethrotomy: the urethrotome was advanced to the distal scar, the incision was made under direct vision at the chosen [dorsal / other: ***] scar plane into healthy proximal lumen, and the instrument advanced only after the passage was open. / Drug-coated balloon: after the access lesion was prepared according to the current device instructions, the selected balloon was placed across the measured scar under [endoscopic / fluoroscopic] confirmation, inflated for the product-specified interval and pressure, then deflated and removed without dragging it through tissue; drug-handling and pregnancy precautions were followed.] Actual instruments, sizes, site, incision or inflation details: ***.
The proximal urethra and bladder were then inspected through the opened lumen, with actual findings above. Hemostasis and the integrity of the treated segment were assessed. A [urethral catheter / suprapubic tube / no drain] was placed [over the wire / under vision / by other method: ***], with position and drainage confirmed by ***. The catheter size and removal plan are ***.

Estimated blood loss: ***
Specimens: ***
Drains: ***
Complications: ***

Disposition and plan: [Home / Observation / Other: ***]. Voiding trial or catheter removal: ***. Self-dilation plan, if chosen: ***. Reassessment with symptoms, flow and residual: ***.`,
  },
];
