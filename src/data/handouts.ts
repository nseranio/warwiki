/**
 * WARWIKI Original Patient Handouts.
 *
 * Plain-language, printable PDFs given to patients before a test or procedure.
 * The master HTML sources live off-repo (~/Desktop/WARWIKI-handouts); each
 * rendered PDF is committed to `static/handouts/<slug>.pdf` and a page-1
 * thumbnail to `static/img/handouts/<slug>.png`.
 *
 * To add a handout: render the PDF + a page-1 thumbnail (see the workflow), then
 * append one entry here. Cards render grouped by category in
 * HANDOUT_CATEGORY_ORDER; rendered by src/components/PatientHandouts.tsx.
 */
export interface PatientHandout {
  /** filename stem — resolves to /handouts/<slug>.pdf and /img/handouts/<slug>.png */
  slug: string;
  title: string;
  category: string;
  description: string;
  pages: number;
}

export const HANDOUT_CATEGORY_ORDER: string[] = [
  'Tests & Imaging',
  'Procedures & Surgery',
];

export const PATIENT_HANDOUTS: PatientHandout[] = [
  {
    slug: 'retrograde-urethrogram',
    title: 'Retrograde Urethrogram (RUG)',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'An X-ray that maps the urethra using a contrast dye — what the test is, how to prepare, and what to expect during and after.',
  },
  {
    slug: 'voiding-cystourethrogram',
    title: 'Voiding Cystourethrogram (VCUG)',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'An X-ray of the bladder and urethra during filling and urinating — written to work whether or not the patient already has a catheter or suprapubic tube.',
  },
  {
    slug: 'cystoscopy',
    title: 'Cystoscopy',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'A look inside the bladder and urethra with a thin camera — flexible (awake, in the office) or rigid (asleep, in the operating room): how to prepare and what to expect during and after.',
  },
  {
    slug: 'cystogram',
    title: 'Cystogram',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'An X-ray of the bladder filled with contrast dye to check that a repair has healed or to look for a leak, fistula, or reflux — written to work whether or not the patient already has a catheter or suprapubic tube.',
  },
  {
    slug: 'urodynamics',
    title: 'Urodynamics',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'A group of tests that measure how the bladder fills and empties using small catheters — what the test is, how to prepare, and what to expect during and after.',
  },
  {
    slug: 'ambulatory-urodynamics',
    title: 'Ambulatory Urodynamics (Catheter-Free)',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'A newer, catheter-free bladder test: a small wireless sensor records bladder pressure during normal daily activity for more lifelike readings — how it works and what to expect.',
  },
  {
    slug: 'ureteral-evaluation-under-anesthesia',
    title: 'Ureteral Evaluation Under Anesthesia',
    category: 'Tests & Imaging',
    pages: 2,
    description:
      'A detailed exam to map a narrowing of the ureter while asleep — any combination of ureteroscopy, retrograde and antegrade pyelogram, and cystography — to plan the right repair.',
  },
  {
    slug: 'suprapubic-catheter-placement',
    title: 'Suprapubic Catheter Placement',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'Placing a catheter that drains the bladder through the lower belly — preparation, the procedure (local, sedation, or general anesthesia), and aftercare.',
  },
  {
    slug: 'buccal-mucosa-graft',
    title: 'Buccal Mucosa (Cheek) Graft',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'The cheek-graft (donor-site) part of a urethral or ureteral repair — why the cheek lining is used, what happens during surgery, and how the mouth heals afterward.',
  },
  {
    slug: 'artificial-urinary-sphincter',
    title: 'Artificial Urinary Sphincter (AUS)',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'An implanted device that restores bladder control after leakage (often after prostate surgery) — how it works, preparing for surgery, the ~6-week wait before activation, and the medical-alert rule for catheters.',
  },
  {
    slug: 'inflatable-penile-prosthesis',
    title: 'Inflatable Penile Prosthesis (IPP)',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'An implanted device for erectile dysfunction not relieved by other treatments — how it works, preparing for surgery, what it does and does not change, and activation plus daily cycling afterward.',
  },
  {
    slug: 'malleable-penile-implant',
    title: 'Malleable Penile Implant',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'The bendable (semi-rigid) penile implant for erectile dysfunction — how it works (bend up to use, down to conceal), preparing for surgery, what it does and does not change, and recovery.',
  },
  {
    slug: 'male-urethral-sling',
    title: 'Male Urethral Sling',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'A mesh sling placed under the urethra for mild-to-moderate urine leakage after prostate surgery — how it works (nothing to operate), preparing for surgery, recovery, and how it compares with the artificial sphincter.',
  },
  {
    slug: 'urethroplasty',
    title: 'Urethroplasty (Urethral Repair)',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'Surgery to repair a narrowing (stricture) of the urethra — written to flex across approaches (penile, perineal, with or without a cheek graft): how it works, preparing, the catheter and healing X-ray, and recovery.',
  },
  {
    slug: 'penile-plication',
    title: 'Penile Plication',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'Surgery to straighten the penis in Peyronie\'s disease by stitching the longer side — the simplest option (some shortening, lowest new-ED risk): how it works, preparing, and recovery.',
  },
  {
    slug: 'plaque-incision-grafting',
    title: 'Plaque Incision and Grafting',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'Straightening surgery for Peyronie\'s disease that releases the scar on the short side and patches it with a graft — preserves length for severe or complex curves (higher new-ED risk): how it works, preparing, and recovery.',
  },
  {
    slug: 'perineal-urethrostomy',
    title: 'Perineal Urethrostomy',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'A durable option when the urethra is too narrowed or damaged to repair — a new, permanent opening for urine in the perineum (you urinate sitting down): how it works, preparing, and recovery.',
  },
  {
    slug: 'pyeloplasty',
    title: 'Pyeloplasty',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'Surgery to fix a blockage where the kidney drains into the ureter (UPJ obstruction) — usually keyhole (robotic/laparoscopic): how it works, preparing, the internal stent, and recovery.',
  },
  {
    slug: 'optilume-urethral-stricture',
    title: 'Optilume Drug-Coated Balloon (Urethral Stricture)',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'A minimally invasive, no-incision treatment for a recurring urethral narrowing — a balloon widens the scar and delivers medicine to help keep it from re-narrowing: how it works, preparing, and recovery.',
  },
  {
    slug: 'endoscopic-urethroplasty',
    title: 'Endoscopic Urethroplasty (TUITMR)',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'A no-incision repair of a scar at the bladder neck or after prostate surgery — the scar is opened through a scope and covered with healthy lining so it heals open: how it works, preparing, and recovery.',
  },
  {
    slug: 'ureteral-reconstruction',
    title: 'Ureteral Reconstruction',
    category: 'Procedures & Surgery',
    pages: 2,
    description:
      'Surgery to repair a blocked or narrowed ureter — written to flex across approaches (rejoining the ends, a cheek graft, or a piece of intestine) over an internal stent: how it works, preparing, and recovery.',
  },
];
