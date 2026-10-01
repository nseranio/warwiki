import type { ToolkitItem } from './types';

const BOTOX = 'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx';
const SNM = 'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx';
const PTNS = 'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx';
const NOTICE = 'Template: a structure to complete, not a record. Replace every *** and choose one option in each [ ].';
const UPDATED = '2026-10-01';

export const OAB_TOOLKIT: ToolkitItem[] = [
  {
    id: 'oab-clinic-note', kind: 'clinic-note', topic: 'OAB',
    title: 'Urgency and overactive bladder visit module',
    summary: 'History, diary, reversible factors and stepwise plan for urgency, leakage and nocturia.',
    pages: [BOTOX, SNM, PTNS], sources: [], updated: UPDATED,
    body: `${NOTICE}

Main complaint and goal: ***. Urgency, urgency leakage, frequency and nocturia: ***. Onset, bother and protection used: ***.
Stress leakage or pain symptoms: ***. Emptying symptoms, retention and infections: ***. Fluid, caffeine and alcohol history: ***. Bowel habits, sleep and leg swelling: ***.
Prior behavioral, medication and procedure treatments, dates, response and adverse effects: ***. Relevant neurologic disease, pregnancy status, medicines and prior surgery: ***.
Diary reviewed: ***. Urinalysis or culture: ***. Postvoid residual and reason checked: ***. Examination and additional tests: ***.
Assessment: [overactive bladder / urgency incontinence / mixed leakage / nocturnal polyuria / other: ***]. Factors requiring separate evaluation: ***.
Options discussed: [bladder training / pelvic floor therapy / medication / tibial nerve stimulation / bladder botulinum toxin / sacral neuromodulation / other: ***]. Treatment preference, risks and limitations reviewed: ***.
Plan and measurable follow-up goal: ***. Reassessment date: ***.`,
  },
  {
    id: 'oab-botox-counseling', kind: 'counseling', topic: 'OAB',
    title: 'Bladder botulinum toxin counseling',
    summary: 'Injection benefit, repeat treatment, infection and temporary catheterization risks.',
    pages: [BOTOX], sources: [
      { figure: '2.65 fewer daily leakage episodes versus 0.87 with placebo', page: BOTOX, anchor: 'efficacy-summary' },
      { figure: '22.9% versus 6.5% completely dry', page: BOTOX, anchor: 'efficacy-summary' },
      { figure: '18% versus 6% urinary infection within 12 weeks', page: BOTOX, anchor: 'adverse-effects' },
      { figure: '6.5% versus 0.4% started intermittent catheterization', page: BOTOX, anchor: 'adverse-effects' },
    ], updated: UPDATED,
    body: `${NOTICE}

Symptoms and goals: ***. The proposed treatment is onabotulinumtoxinA injected into the bladder muscle through a cystoscope, in [office / operating room] setting. It targets urgency and urgency leakage; stress leakage needs separate treatment.
For idiopathic OAB treated with the labeled dose, a pivotal trial found 2.65 fewer daily leakage episodes versus 0.87 with placebo, and 22.9% versus 6.5% completely dry. These are group results, not a promise of dryness. Benefit develops after treatment and often wears off after months; repeat injection may be considered when symptoms return. Expected benefit for this patient: ***.
In pooled label trials, 18% versus 6% urinary infection within 12 weeks was reported, using trial definitions. Over the treatment cycle, 6.5% versus 0.4% started intermittent catheterization for incomplete emptying or retention. These rates are for idiopathic OAB and should not be applied to a different dose or neurogenic population. Other risks discussed: blood in urine, discomfort, no benefit, and rare toxin spread causing generalized weakness or swallowing or breathing difficulty. Baseline emptying, infection history and ability to self-catheterize were reviewed: ***.
Urine test, antibiotic and anesthesia plan: ***. Post-treatment emptying check and contact plan: ***.
Alternatives: bladder training, medications, tibial nerve stimulation, sacral neuromodulation, or observation. Patient questions and choice: ***.`,
  },
  {
    id: 'oab-snm-counseling', kind: 'counseling', topic: 'OAB',
    title: 'Sacral neuromodulation counseling',
    summary: 'Test phase, implant decisions, programming, MRI conditions and revision risks.',
    pages: [SNM], sources: [
      { figure: 'at least 50% improvement in the diary variable', page: SNM, anchor: 'test-phase' },
      { figure: 'about 68% for urgency incontinence at five years', page: SNM, anchor: 'urinary-indications' },
      { figure: 'roughly 30-40% by three to four years', page: SNM, anchor: 'complications' },
    ], updated: UPDATED,
    body: `${NOTICE}

Indication and treatment goal: ***. Sacral neuromodulation uses a lead near a sacral nerve to change bladder signaling. Proposed test approach: [temporary office wire / staged tined lead / other: ***]. A baseline diary is compared with one kept during stimulation. Permanent implantation is usually considered after at least 50% improvement in the diary variable selected in advance; the trial schedule and target for this patient: ***. A poor test can sometimes reflect lead movement or an inadequate test window and should be reviewed before ruling out treatment.
In a prospective worldwide study, success was about 68% for urgency incontinence at five years. Success was defined by the study and does not mean every patient became dry. If the test is useful, a stimulator can be placed under the skin. Device type, charging needs, programming and replacement expectations: ***. Device-specific MRI conditions must be checked before a scan.
Risks discussed: discomfort, wound infection, lead movement, uncomfortable stimulation, loss of benefit, device failure, further programming, revision or removal. EAU guidance cites surgical revision in roughly 30-40% by three to four years in older device cohorts; risk changes with device and follow-up. Test restrictions and care of external equipment: ***.
Alternatives: behavioral treatment, medication, tibial nerve stimulation, bladder botulinum toxin or observation. Patient questions and decision: ***.`,
  },
  {
    id: 'oab-botox-op-note', kind: 'op-note', topic: 'OAB',
    title: 'Cystoscopy with intradetrusor onabotulinumtoxinA',
    summary: 'Procedure note structure for injection dose, pattern, findings and immediate plan.',
    pages: [BOTOX], sources: [], updated: UPDATED,
    body: `${NOTICE}

Preoperative diagnosis: ***
Postoperative diagnosis: ***
Procedure: cystourethroscopy and intradetrusor onabotulinumtoxinA injection
Anesthesia: [intravesical local / sedation / general / other: ***]
Product, lot, dose, dilution, injection sites and total volume: ***
Indication, alternatives and consent: ***

Findings: urethra ***; bladder mucosa ***; trabeculation ***; stones or other lesions ***; ureteral orifices ***.
Procedure details: Urine status and the [perioperative antibiotic / no antibiotic] plan were reviewed: ***. The patient was placed in [dorsal lithotomy / other: ***], pressure points padded, and the perineum prepared and draped. [Intravesical local anesthetic was instilled and allowed to dwell for *** / anesthesia was provided as above]. A [flexible / rigid] cystoscope was passed under direct vision. The bladder was filled only enough for clear inspection, and the urethra, mucosa, ureteral orifices and any unexpected lesions were systematically surveyed; actual findings are recorded above.
The product name, lot, expiration, ordered dose, dilution and prior toxin exposure were verified: ***. OnabotulinumtoxinA was gently reconstituted per the current label in [preservative-free saline / other approved diluent: ***] and the needle and tubing were primed. Under direct view, the injection needle was advanced into detrusor at the selected depth ***. Small aliquots were placed across the [posterior and lateral bladder body with the trigone spared / selected body and trigonal sites] in a distributed pattern, avoiding the ureteral orifices and visible vessels. The number of sites, volume per site, total volume and total delivered dose are recorded above; no dose is presumed by this template.
After the final injection, the needle was [flushed to deliver the remaining dose / withdrawn without a flush according to the product setup: ***]. The injection field and ureteral orifices were inspected again for bleeding or other injury, with findings recorded above. The bladder was [drained / left partly filled for a voiding check]. A catheter was [not needed / placed for *** because ***]. The patient was observed and the emptying and retention plan was reviewed: ***.

Estimated blood loss: ***
Specimens: ***
Drains: ***
Complications: ***
Disposition, retention precautions and postvoid-residual follow-up: ***.`,
  },
  {
    id: 'oab-botox-instructions', kind: 'patient-instructions', topic: 'OAB',
    title: 'After bladder botulinum toxin injection',
    summary: 'Plain-language instructions for urinary symptoms, infection, retention and follow-up.',
    pages: [BOTOX], sources: [], updated: UPDATED,
    body: `${NOTICE}

Your bladder was treated with onabotulinumtoxinA on ***. Benefit can build over the next [*** days / *** weeks] and later wear off; record changes in urgency and leakage for the follow-up visit. Continue or change your bladder medicine only as directed: ***.
Mild burning or a small amount of blood in the urine can occur after the scope and should improve. Drink your usual amount unless your team gave a different fluid plan: ***. Take any prescribed medicine as directed: ***. Your activity and bathing plan after [local anesthesia / sedation / general anesthesia] is ***.
Watch for difficulty emptying, a weaker stream, repeated small voids or a painful full bladder. Call *** for an emptying check if these occur. If you cannot pass urine, seek urgent care. [You were taught intermittent catheterization; use it on the schedule *** / A catheter is in place; keep the bag below the bladder, avoid kinks and return for removal on *** / No catheter is planned].
Call for fever, worsening burning, cloudy urine, increasing blood or clots, or feeling unwell. Seek emergency care for trouble swallowing, speaking or breathing, or new widespread muscle weakness.
Follow-up emptying check, symptom review and contact number: ***.`,
  },
  {
    id: 'oab-ptns-counseling', kind: 'counseling', topic: 'OAB',
    title: 'Percutaneous tibial nerve stimulation counseling',
    summary: 'Clinic-based ankle stimulation, expected response, maintenance and practical limits.',
    pages: [PTNS], sources: [
      { figure: '54.5% reported moderate or marked improvement versus 20.9% with sham', page: PTNS, anchor: 'efficacy-for-overactive-bladder' },
      { figure: '68% pooled success', page: PTNS, anchor: 'efficacy-for-overactive-bladder' },
    ], updated: UPDATED,
    body: `${NOTICE}

Symptoms and target for treatment: ***. Percutaneous tibial nerve stimulation uses a small needle near the ankle and a surface electrode to stimulate the tibial nerve during supervised clinic sessions. A series of visits and later maintenance treatments may be needed; travel, time and treatment access were reviewed: ***.
In the sham-controlled SUmiT study, 54.5% reported moderate or marked improvement versus 20.9% with sham at the trial assessment. A separate synthesis found 68% pooled success, but studies used differing definitions and follow-up. These are improvement measures, not complete-dryness rates. A diary or symptom measure will show whether this patient benefits: ***.
Risks are usually local and include brief needle discomfort, bruising, skin irritation or tingling; benefit may be absent or fade without maintenance. Screening for pacemaker or defibrillator, pregnancy, bleeding tendency, nerve injury and skin concerns was reviewed according to the selected device's instructions: ***. Treatment schedule and stop or maintenance decision: ***.
Alternatives include bladder training, medication, bladder botulinum toxin, sacral neuromodulation and observation. Patient priorities, questions and choice: ***.`,
  },
];
