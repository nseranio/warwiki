import type { ToolkitItem } from './types';

const HUB = 'docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx';
const MUS = 'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/retropubic-midurethral-sling.mdx';
const BULKING = 'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/urethral-bulking-agents.mdx';
const TMUS = 'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/transobturator-midurethral-sling.mdx';
const NOTICE = 'Template: a structure to complete, not a record. Replace every *** and choose one option in each [ ].';
const UPDATED = '2026-10-01';

export const FEMALE_SUI_TOOLKIT: ToolkitItem[] = [
  {
    id: 'female-sui-clinic-note', kind: 'clinic-note', topic: 'Female SUI',
    title: 'Stress incontinence visit module',
    summary: 'History, examination, evaluation and assessment plan for stress or mixed leakage.',
    pages: [HUB], sources: [], updated: UPDATED,
    body: `${NOTICE}

Reason for visit: ***
Leakage pattern: [stress / stress-predominant mixed / urgency-predominant mixed / uncertain / other: ***]. Most bothersome component: ***.
Stress triggers: [cough / sneeze / lifting / exercise / standing / intercourse / other: ***]. Onset and course: ***. Frequency, volume, protection and activity limits: ***.
Urgency leakage: [present / absent / uncertain]; warning time and triggers: ***. Daytime frequency, nocturia and emptying symptoms: ***.
Prior treatments, dates and response: ***. Prior pelvic surgery, mesh or radiation: ***. Obstetric, bowel, neurologic and medication history relevant to leakage: ***.
Patient goal and treatment preference: ***.

Examination: pelvic findings ***; cough stress test at bladder volume *** with result ***; urethral mobility ***; prolapse assessment ***.
Testing reviewed: urinalysis ***; postvoid residual ***; diary ***; additional testing and indication ***.
Assessment: [demonstrated stress incontinence / suspected stress incontinence / mixed incontinence / recurrent leakage / other: ***]. Complicating factors: ***.
Options discussed: [pelvic floor therapy / pessary or continence device / urethral bulking / synthetic midurethral sling / autologous fascial sling / colposuspension / observation / other: ***]. Stress and urgency components addressed separately: ***.
Risks, benefits and uncertainty specific to the chosen option: ***. Patient questions and preference: ***.
Plan: ***. Follow-up: ***.`,
  },
  {
    id: 'female-mus-counseling', kind: 'counseling', topic: 'Female SUI',
    title: 'Midurethral sling counseling',
    summary: 'Choice of sling route, expected benefit, mesh issues, voiding effects and alternatives.',
    pages: [HUB, MUS, TMUS], sources: [
      { figure: '80.8% after retropubic versus 77.7% after transobturator sling', page: MUS, anchor: 'outcomes' },
      { figure: '5.0% after retropubic passage versus none in the transobturator group', page: MUS, anchor: 'outcomes' },
      { figure: '2.7% versus 0% required surgery for voiding dysfunction', page: MUS, anchor: 'outcomes' },
      { figure: '6.4% after transobturator versus 1.3% after retropubic passage', page: TMUS, anchor: 'outcomes' },
    ], updated: UPDATED,
    body: `${NOTICE}

Condition and goal: ***. Stress leakage was [demonstrated / suspected]; urgency symptoms were ***.
Proposed treatment: a synthetic polypropylene tape placed beneath the midurethra through [retropubic / transobturator / single-incision] route. Route selection and reason: ***. A sling targets stress leakage; urgency may require separate treatment.
Expected benefit: in TOMUS, the objective composite at one year was 80.8% after retropubic versus 77.7% after transobturator sling. This composite is not complete dryness, and its result cannot guarantee this patient's outcome. Longer-term comparisons favor the retropubic route, with uncertainty about individual risk. Prior surgery, radiation, urgency symptoms and other factors: ***.
Route-specific harms: bladder perforation in TOMUS occurred in 5.0% after retropubic passage versus none in the transobturator group. In the same trial, 2.7% versus 0% required surgery for voiding dysfunction. A pooled comparison found groin or thigh pain in 6.4% after transobturator versus 1.3% after retropubic passage. These rates reflect different studies and endpoints.
Other risks discussed: bleeding, infection, urethral or bowel injury, temporary or lasting difficulty emptying, catheterization or sling release, new or worse urgency, pelvic pain, painful intercourse, mesh exposure or erosion, persistent or recurrent leakage, and further surgery. Route-specific concern for this patient: ***.
Mesh distinction discussed: the stress-incontinence midurethral sling is distinct from transvaginal mesh used for prolapse repair. Questions about permanent mesh: ***.
Alternatives: pelvic floor therapy, pessary or continence device, urethral bulking, autologous fascial sling, colposuspension, and observation. Reasons for selecting or declining them: ***.
Patient understanding, questions and decision: ***.`,
  },
  {
    id: 'female-bulking-counseling', kind: 'counseling', topic: 'Female SUI',
    title: 'Urethral bulking counseling',
    summary: 'Office or operating-room injection, limited durability, repeat treatment and voiding risks.',
    pages: [HUB, BULKING], sources: [
      { figure: '47.2% reported no stress leakage episodes at 12 months', page: BULKING, anchor: 'pivotal-randomized-pahg-versus-collagen-trial' },
      { figure: '74.7% after hydrogel versus 92.7% after TVT', page: BULKING, anchor: 'five-year-randomized-pahg-versus-tvt-trial' },
      { figure: '22.2% after hydrogel and 43.8% after TVT', page: BULKING, anchor: 'five-year-randomized-pahg-versus-tvt-trial' },
    ], updated: UPDATED,
    body: `${NOTICE}

Condition and treatment goal: ***.
Procedure: a bulking agent is injected around the urethra through a cystoscope to improve closure during stress. Agent and setting: ***. It does not treat urgency leakage.
Expected result: in a randomized hydrogel-versus-collagen trial, 47.2% reported no stress leakage episodes at 12 months after hydrogel. In a separate five-year trial, high satisfaction occurred in 74.7% after hydrogel versus 92.7% after TVT; satisfaction does not mean dryness. Recorded perioperative or postoperative complications before crossover were 22.2% after hydrogel and 43.8% after TVT; these include events of varying severity. Repeat injections may be needed. Reasons this approach fits the patient's goals or surgical risk: ***.
Risks discussed: discomfort, transient burning or blood in the urine, urinary infection, temporary difficulty emptying or catheterization, injection-site pain, limited benefit, and repeat treatment. Agent-specific issues: ***.
Alternatives: pelvic floor therapy, pessary or continence device, midurethral sling, autologous sling, colposuspension, observation. Patient preference and questions: ***.
Plan and reassessment: ***.`,
  },
  {
    id: 'female-mus-op-note', kind: 'op-note', topic: 'Female SUI',
    title: 'Midurethral sling placement',
    summary: 'Operative note structure for retropubic or transobturator tape placement and cystoscopy.',
    pages: [HUB, MUS, TMUS], sources: [], updated: UPDATED,
    body: `${NOTICE}

Preoperative diagnosis: ***
Postoperative diagnosis: ***
Procedure: [retropubic / transobturator] midurethral sling; cystourethroscopy; other procedure ***
Implant, manufacturer and lot: ***
Anesthesia: ***
Indication and consent discussion: ***

Findings: pelvic examination ***; bladder ***; urethra ***; trocar injury ***; ureteral efflux ***.
Procedure details: Perioperative antibiotics *** were administered. In dorsal lithotomy, pressure points were padded and the lower abdomen, groins, perineum and vagina were prepared and draped as required by the selected route. A urethral catheter drained the bladder. The anterior vaginal wall over the midurethra was infiltrated with [saline / local anesthetic / other: ***]. A short midline vaginal incision was made, and bilateral paraurethral tunnels were developed toward the [retropubic space / obturator membrane], keeping the vaginal wall intact.
[Retropubic bottom-to-top: two suprapubic exit sites were marked lateral to the midline. With the bladder emptied and displaced by a catheter guide, each trocar was directed from the vaginal tunnel close to the posterior pubic bone through the retropubic space and out the ipsilateral skin site. / Transobturator inside-out: small groin exit incisions were made; with a finger or guide protecting the urethra, each helical passer crossed the obturator membrane from the vaginal tunnel to its ipsilateral groin exit. / Transobturator outside-in: each passer entered from a groin incision, crossed the obturator membrane against the ischiopubic ramus and emerged onto a protecting finger in the vaginal tunnel; the tape was drawn through without twisting.]
Each lateral vaginal sulcus and the trocar path were inspected for buttonholing or exposure. Cystourethroscopy was performed after [each pass / both passes], surveying the bladder including the dome and withdrawing through the urethra to inspect for injury; findings and any corrective repassage are recorded above: ***. [Ureteral efflux was assessed / Efflux assessment was not indicated].
The tape was centered flat under the midurethra without compression, using [a spacer / visual slack / other: ***] to set its position. The protective sheaths were withdrawn while the tape was held in place, and the arms were cut beneath the skin without fixation to the urethra. [A final cystoscopy or filled-bladder stress assessment was performed: *** / No repeat assessment was performed]. After irrigation and hemostasis, the vaginal incision was closed with [absorbable suture: ***], the skin exit sites with [suture / skin adhesive / other: ***], and [packing was placed: *** / no packing was placed]. Dressing: ***. The bladder was [drained / left filled for a voiding trial], and the catheter plan was ***.

Estimated blood loss: ***
Specimens: ***
Drains: ***
Complications: ***
Disposition and follow-up: ***.`,
  },
  {
    id: 'female-sling-instructions', kind: 'patient-instructions', topic: 'Female SUI',
    title: 'After midurethral sling surgery',
    summary: 'Plain-language discharge text with individualized voiding, wound and activity plans.',
    pages: [HUB, MUS], sources: [], updated: UPDATED,
    body: `${NOTICE}

Your procedure was [retropubic / transobturator] midurethral sling placement on ***. Small vaginal spotting, mild burning with the first voids, and soreness at the vaginal and [suprapubic / groin] incisions may occur; they should gradually improve. A weak stream or urgent feeling can occur early, but worsening emptying needs a call.
Before discharge, the bladder plan is [you passed a voiding check / you are leaving with a catheter / you were taught intermittent catheterization]. If a catheter remains, keep the bag below the bladder and tubing free of kinks, wash hands before handling it, and do not pull or remove it yourself. Your emptying check or catheter removal is ***. If taught intermittent catheterization, use the supplies and schedule given to you: ***.
Keep incision sites clean and dry as instructed: ***. Showering and bathing plan: ***. Use pain medicine as prescribed: ***. Prevent straining with fluids, food and the bowel plan: ***. Walking and usual movement may increase as comfortable; your specific limits on lifting, exercise, driving, vaginal insertion and sex are ***.
Call *** for inability to pass urine, a catheter that stops draining, worsening lower abdominal pressure, increasing bleeding, foul drainage, spreading redness, worsening pain, or new leakage that concerns you. Seek urgent care for fever with feeling unwell, heavy bleeding, chest pain or trouble breathing.
Your follow-up date, voiding review and contact number: ***.`,
  },
  {
    id: 'female-bulking-op-note', kind: 'op-note', topic: 'Female SUI',
    title: 'Cystoscopic urethral bulking injection',
    summary: 'Procedure note for product-specific deposits, coaptation and a voiding check.',
    pages: [HUB, BULKING], sources: [], updated: UPDATED,
    body: `${NOTICE}

Preoperative diagnosis: ***
Postoperative diagnosis: ***
Procedure: cystourethroscopy with [transurethral / periurethral] bulking injection
Agent, manufacturer, lot, expiration, session number and total volume: ***
Anesthesia: [urethral local / sedation / general / other: ***]
Indication: Stress leakage pattern and prior treatment: ***. Alternatives discussed included pelvic floor therapy, continence devices, sling surgery, colposuspension and observation. Risks discussed included pain, bleeding, infection, temporary retention or catheterization, agent-specific adverse events, incomplete benefit and repeat injection. Consent: ***.

Findings:
Urethra and bladder: ***
Tissue suitability and prior deposits: ***
Coaptation after injection: ***
Voiding assessment and residual: ***

Procedure details: Urine status, antibiotic plan and anticoagulant plan were reviewed: ***. The patient was positioned in [dorsal lithotomy / other: ***], pressure points padded, and the perineum prepared and draped. The [urethral anesthetic / sedation / general anesthetic] was administered as recorded above. The cystoscope was passed under vision, and the urethra and bladder were inspected; the actual findings are above.
The selected product, lot and delivery system were verified against its current instructions for use. The needle was primed, and the scope withdrawn to the product-specified proximal urethral target. With the scope aligned to avoid unintended deep or superficial placement, the needle was advanced into the [submucosal / product-specified] plane. A deposit was made under direct vision until the urethral wall projected toward the lumen while mucosal perfusion remained visible. The needle was withdrawn before the sheath was rotated. Additional deposits were placed at the selected sites *** in the same plane, with attention to symmetric coaptation and avoidance of intravascular placement or overcorrection. The actual injected volume at each site and total volume are ***.
The delivery system was withdrawn gently without disturbing the deposits. [The bladder was emptied with a soft catheter / The patient voided without catheterization / Other: ***]. Emptying and residual were assessed before discharge; the recorded result is above. An indwelling catheter across fresh deposits was avoided when feasible; the actual retention plan was ***.

Estimated blood loss: ***
Specimens: ***
Drains: ***
Complications: ***

Disposition and plan: [Home after voiding check / Observation / Other: ***]. Retention and infection precautions reviewed: ***. Reassessment of stress versus urgency leakage and need for another session: ***.`,
  },
];
