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
];
