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
/**
 * Patient anatomy / sex a handout applies to. Drives the gallery's audience
 * facet. 'all' is the default for sex-neutral sheets.
 */
export type HandoutAudience = 'all' | 'female' | 'male';

export interface PatientHandout {
  /** filename stem — resolves to /handouts/<slug>.pdf and /img/handouts/<slug>.png */
  slug: string;
  title: string;
  category: string;
  /** Finer grouping within the category (see HANDOUT_SUBCATEGORY_ORDER). */
  subcategory: string;
  /**
   * Patient anatomy / sex the handout is relevant to, for the gallery's
   * audience facet. Omit (defaults to 'all') for sex-neutral sheets; set
   * 'female' or 'male' only when the condition or procedure is anatomy-locked.
   * The 'Women' filter shows {female, all}; 'Men' shows {male, all}.
   */
  audience?: HandoutAudience;
  description: string;
  pages: number;
  /**
   * Language codes that have a translated PDF + thumbnail available.
   * English ('en') is always implied. Add a code here once the localized
   * assets exist (see handoutPdfPath / handoutThumbPath for the file naming).
   */
  languages?: string[];
}

/**
 * A language offered in the handout gallery's language switcher.
 * `label` is the language's own (native) name; `englishLabel` is shown small
 * beneath it. `dir: 'rtl'` flags right-to-left scripts (Arabic).
 */
export interface HandoutLanguage {
  code: string;
  label: string;
  englishLabel: string;
  dir?: 'rtl';
}

/** English is always the base/fallback language. */
export const DEFAULT_LANGUAGE = 'en';

/**
 * Languages the switcher offers, in display order. English is first.
 * A tab activates for a given handout only when that handout lists the code in
 * its `languages` array AND the localized assets are committed; otherwise the
 * card falls back to English with a "translation coming soon" note.
 */
export const HANDOUT_LANGUAGES: HandoutLanguage[] = [
  {code: 'en', label: 'English', englishLabel: 'English'},
  {code: 'es', label: 'Español', englishLabel: 'Spanish'},
  {code: 'zh', label: '简体中文', englishLabel: 'Mandarin'},
  {code: 'vi', label: 'Tiếng Việt', englishLabel: 'Vietnamese'},
  {code: 'ko', label: '한국어', englishLabel: 'Korean'},
  {code: 'tl', label: 'Tagalog', englishLabel: 'Tagalog'},
  {code: 'ar', label: 'العربية', englishLabel: 'Arabic', dir: 'rtl'},
  {code: 'ru', label: 'Русский', englishLabel: 'Russian'},
  {code: 'fr', label: 'Français', englishLabel: 'French'},
  {code: 'ja', label: '日本語', englishLabel: 'Japanese'},
];

/**
 * Audience facets offered by the gallery, in display order. The first ('all')
 * applies no filter; 'female' / 'male' show their sex-specific sheets plus the
 * sex-neutral ('all') ones.
 */
export const HANDOUT_AUDIENCES: {value: HandoutAudience; label: string}[] = [
  {value: 'all', label: 'All audiences'},
  {value: 'female', label: 'Women'},
  {value: 'male', label: 'Men'},
];

/** A handout's audience, defaulting to 'all' when unset. */
export function handoutAudience(h: PatientHandout): HandoutAudience {
  return h.audience ?? 'all';
}

/**
 * True if the handout should show under the selected audience facet. 'all'
 * matches everything; 'female'/'male' match their own sheets plus sex-neutral.
 */
export function handoutMatchesAudience(
  h: PatientHandout,
  facet: HandoutAudience,
): boolean {
  if (facet === 'all') return true;
  const a = handoutAudience(h);
  return a === facet || a === 'all';
}

/** True if the handout has localized assets for the given language code. */
export function handoutHasLanguage(h: PatientHandout, code: string): boolean {
  if (code === DEFAULT_LANGUAGE) return true;
  return (h.languages ?? []).includes(code);
}

/**
 * Path to a handout PDF for a language. English keeps the base name
 * (`/handouts/<slug>.pdf`); other languages use a code suffix
 * (`/handouts/<slug>.<code>.pdf`).
 */
export function handoutPdfPath(slug: string, code: string): string {
  return code === DEFAULT_LANGUAGE
    ? `/handouts/${slug}.pdf`
    : `/handouts/${slug}.${code}.pdf`;
}

/**
 * Page-1 thumbnail path for a language (JPEG; mirrors handoutPdfPath naming).
 * English keeps `<slug>.jpg`; other languages use `<slug>.<code>.jpg`.
 */
export function handoutThumbPath(slug: string, code: string): string {
  return code === DEFAULT_LANGUAGE
    ? `/img/handouts/${slug}.jpg`
    : `/img/handouts/${slug}.${code}.jpg`;
}

export const HANDOUT_CATEGORY_ORDER: string[] = [
  'Conditions & Symptoms',
  'Tests & Imaging',
  'Conservative & Self-Care',
  'Medications',
  'Office Procedures',
  'Procedures & Surgery',
];

/**
 * Subcategories within the top-level categories, in display order. Cards are
 * grouped category → subcategory → grid so patients can scan to the area that
 * matches their condition. Only subcategories with at least one handout render.
 * (When a category has just one subgroup, the component omits its header.)
 */
export const HANDOUT_SUBCATEGORY_ORDER: string[] = [
  // Conditions & Symptoms
  'Leakage & Overactive Bladder',
  'Bladder Pain, Infection & Blood in Urine',
  'Prostate & Urinary Flow',
  'Pelvic Floor & Prolapse',
  'Bowel & Anorectal',
  'Sexual Health & Other',
  "Men's Genital & Reconstructive",
  // Tests & Imaging
  'Bladder & Urethra Imaging',
  'Scope & Bladder-Function Tests',
  'Kidney & Ureter Tests',
  // Conservative & Self-Care
  'Bladder & Pelvic-Floor Training',
  'Vaginal Health & Devices',
  'Self-Catheterization',
  'ED & Penile Therapies',
  // Medications
  'Overactive Bladder Medicines',
  'Prostate & Urinary Flow Medicines',
  'Erectile Dysfunction Medicines',
  'Testosterone Therapy',
  // Office Procedures
  'Injections (Botox & Bulking)',
  'Nerve Stimulation for OAB',
  // Procedures & Surgery
  'Urinary Leakage (Incontinence)',
  'Prolapse Surgery',
  'Pelvic Floor & Perineal Repair',
  'Urethral Narrowing & Stricture',
  'Prostate (BPH) Procedures',
  'Kidney & Ureter Reconstruction',
  'Urinary Diversion',
  'Erections & Penile Conditions',
  'Catheters & Grafts',
  'Cosmetic & Other',
];

export const PATIENT_HANDOUTS: PatientHandout[] = [
  {
    slug: 'overactive-bladder',
    title: 'Overactive Bladder (OAB)',
    category: 'Conditions & Symptoms',
    subcategory: 'Leakage & Overactive Bladder',
    pages: 2,
    description:
      'Understanding sudden urges, frequent trips, night-time urination, and urge leaks — what causes OAB, how it is diagnosed, and the step-by-step treatments from lifestyle to Botox and nerve stimulation.',
  },
  {
    slug: 'stress-urinary-incontinence-female',
    title: 'Stress Urinary Incontinence (Female)',
    category: 'Conditions & Symptoms',
    subcategory: 'Leakage & Overactive Bladder',
    audience: 'female',
    pages: 2,
    description:
      'Leaking with coughing, laughing, lifting, or exercise from weakened support under the urethra — the female-specific options from pelvic-floor exercises to a pessary, bulking injection, or mid-urethral sling.',
  },
  {
    slug: 'stress-urinary-incontinence-male',
    title: 'Stress Urinary Incontinence (Male)',
    category: 'Conditions & Symptoms',
    subcategory: 'Leakage & Overactive Bladder',
    audience: 'male',
    pages: 2,
    description:
      'Leaking after prostate surgery or radiation from a weakened sphincter — how it usually improves over the first year, and the options (pelvic-floor exercises, male sling, ProACT adjustable balloons, artificial urinary sphincter).',
  },
  {
    slug: 'interstitial-cystitis-bps',
    title: 'Interstitial Cystitis / Bladder Pain Syndrome',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder Pain, Infection & Blood in Urine',
    pages: 2,
    description:
      'Ongoing bladder or pelvic pain with urgency that is not an infection — what it is, how it is diagnosed, identifying flare triggers, and the combined treatments (self-care, pelvic-floor therapy, medicines, instillations).',
  },
  {
    slug: 'urinary-tract-infections',
    title: 'Urinary Tract Infections (UTIs)',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder Pain, Infection & Blood in Urine',
    pages: 2,
    description:
      'What a bladder vs. kidney infection is, how UTIs are treated, when antibiotics are (and are not) needed, and how to prevent repeats — including vaginal estrogen after menopause.',
  },
  {
    slug: 'asymptomatic-bacteriuria',
    title: 'Asymptomatic Bacteriuria',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder Pain, Infection & Blood in Urine',
    pages: 2,
    description:
      'Bacteria found in the urine when you feel completely fine — why this usually should NOT be treated with antibiotics, the few exceptions (pregnancy, before some procedures), and what symptoms to watch for.',
  },
  {
    slug: 'asymptomatic-microscopic-hematuria',
    title: 'Asymptomatic Microscopic Hematuria',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder Pain, Infection & Blood in Urine',
    pages: 2,
    description:
      'Tiny amounts of blood in the urine found on a test, with no symptoms — what causes it, the risk-based check (imaging and a bladder look), and what happens next. Most causes are not serious.',
  },
  {
    slug: 'nocturia',
    title: 'Nocturia',
    category: 'Conditions & Symptoms',
    subcategory: 'Prostate & Urinary Flow',
    pages: 2,
    description:
      'Waking at night to urinate — the three main causes (making too much urine at night, a bladder that holds less, disturbed sleep), why a bladder diary is the key first step, and how each cause is treated.',
  },
  {
    slug: 'benign-prostatic-hyperplasia',
    title: 'Enlarged Prostate (BPH)',
    category: 'Conditions & Symptoms',
    subcategory: 'Prostate & Urinary Flow',
    audience: 'male',
    pages: 2,
    description:
      'A common, non-cancerous enlarged prostate that causes urine-flow and frequency symptoms — what causes it, how it is evaluated, and the treatment ladder from lifestyle to medicines to minimally invasive or surgical options.',
  },
  {
    slug: 'pelvic-organ-prolapse',
    title: 'Pelvic Organ Prolapse',
    category: 'Conditions & Symptoms',
    subcategory: 'Pelvic Floor & Prolapse',
    audience: 'female',
    pages: 2,
    description:
      'When pelvic organs drop and cause a vaginal bulge or pressure — the types, what causes it, and the options from watchful waiting and pelvic-floor exercises to a pessary or surgery. Common and not dangerous.',
  },
  {
    slug: 'musculoskeletal-pelvic-pain',
    title: 'Musculoskeletal Pelvic Pain',
    category: 'Conditions & Symptoms',
    subcategory: 'Pelvic Floor & Prolapse',
    pages: 2,
    description:
      'Pelvic pain coming from tight, overactive muscles and nerves rather than the bladder or organs — real and treatable even when scans are normal, with pelvic-floor physical therapy as the cornerstone.',
  },
  {
    slug: 'accidental-bowel-leakage',
    title: 'Accidental Bowel Leakage (Fecal Incontinence)',
    category: 'Conditions & Symptoms',
    subcategory: 'Bowel & Anorectal',
    pages: 2,
    description:
      'Losing control of gas or stool — common and treatable. What causes it and the step-by-step options from firming the stool and biofeedback to nerve stimulation or sphincter repair.',
  },
  {
    slug: 'constipation',
    title: 'Constipation',
    category: 'Conditions & Symptoms',
    subcategory: 'Bowel & Anorectal',
    pages: 2,
    description:
      'Why constipation matters for pelvic health (straining worsens prolapse and leakage) and how to fix it — fiber, fluids, toileting habits, gentle laxatives, and pelvic-floor therapy for outlet-type constipation.',
  },
  {
    slug: 'female-sexual-dysfunction',
    title: 'Female Sexual Dysfunction',
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    audience: 'female',
    pages: 2,
    description:
      'Common, often treatable concerns about desire, arousal, orgasm, or pain with sex — the physical, hormonal, and emotional causes, and treatments from lubricants and vaginal estrogen to pelvic-floor therapy and counseling.',
  },
  {
    slug: 'urethral-diverticulum',
    title: 'Urethral Diverticulum',
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    audience: 'female',
    pages: 2,
    description:
      'A small pocket off the urethra that collects urine — the classic "3 Ds" (dribbling, burning, pain with sex) and recurrent infections, how MRI maps it, and surgical removal (diverticulectomy) when it is bothersome.',
  },
  {
    slug: 'fistulas-genitourinary-rectovaginal',
    title: 'Fistulas: Genitourinary and Rectovaginal',
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    audience: 'female',
    pages: 2,
    description:
      'An abnormal connection causing constant urine leakage (genitourinary) or gas/stool through the vagina (rectovaginal) — the causes, how it is found, and repair (often with a tissue flap), plus why timing matters.',
  },
  {
    slug: 'erectile-dysfunction',
    title: 'Erectile Dysfunction (ED)',
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    audience: 'male',
    pages: 2,
    description:
      'Trouble getting or keeping an erection — common, highly treatable, and often an early warning sign of heart disease. The causes, the evaluation, and the treatment ladder from lifestyle and pills to devices, injections, and implants.',
  },
  {
    slug: 'peyronies-disease',
    title: "Peyronie's Disease",
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    audience: 'male',
    pages: 2,
    description:
      'Scar tissue that bends the penis — the active vs. stable phases, how it is diagnosed, and phase-based treatment from traction and plaque injections to straightening surgery. Common, not cancer, and treatable.',
  },
  {
    slug: 'acquired-buried-penis',
    title: 'Acquired Buried Penis & Repair',
    category: 'Conditions & Symptoms',
    subcategory: "Men's Genital & Reconstructive",
    audience: 'male',
    pages: 2,
    description:
      'When the penis becomes hidden beneath belly/scrotal skin and fat in adults — the causes (weight, scarring, lichen sclerosus, lymphedema) and the reconstructive repair (release, skin graft, fat-pad removal).',
  },
  {
    slug: 'rectourethral-fistula',
    title: 'Rectourethral Fistula (in Men)',
    category: 'Conditions & Symptoms',
    subcategory: "Men's Genital & Reconstructive",
    audience: 'male',
    pages: 2,
    description:
      'An abnormal connection between the rectum and the urethra (gas/stool in the urine), usually after prostate cancer treatment — how it is found and the staged repair (divert, then repair with a tissue flap).',
  },
  {
    slug: 'pubosymphyseal-fistula',
    title: 'Pubosymphyseal Fistula',
    category: 'Conditions & Symptoms',
    subcategory: "Men's Genital & Reconstructive",
    audience: 'male',
    pages: 2,
    description:
      'When urine erodes into the pubic bone (with bone infection), causing severe pubic pain — usually years after prostate radiation; how MRI makes the diagnosis and why treatment removes infected bone and reroutes urine.',
  },
  {
    slug: 'retrograde-urethrogram',
    title: 'Retrograde Urethrogram (RUG)',
    category: 'Tests & Imaging',
    subcategory: 'Bladder & Urethra Imaging',
    pages: 2,
    description:
      'An X-ray that maps the urethra using a contrast dye — what the test is, how to prepare, and what to expect during and after.',
  },
  {
    slug: 'voiding-cystourethrogram',
    title: 'Voiding Cystourethrogram (VCUG)',
    category: 'Tests & Imaging',
    subcategory: 'Bladder & Urethra Imaging',
    pages: 2,
    description:
      'An X-ray of the bladder and urethra during filling and urinating — written to work whether or not the patient already has a catheter or suprapubic tube.',
  },
  {
    slug: 'cystoscopy',
    title: 'Cystoscopy',
    category: 'Tests & Imaging',
    subcategory: 'Scope & Bladder-Function Tests',
    pages: 2,
    description:
      'A look inside the bladder and urethra with a thin camera — flexible (awake, in the office) or rigid (asleep, in the operating room): how to prepare and what to expect during and after.',
  },
  {
    slug: 'cystogram',
    title: 'Cystogram',
    category: 'Tests & Imaging',
    subcategory: 'Bladder & Urethra Imaging',
    pages: 2,
    description:
      'An X-ray of the bladder filled with contrast dye to check that a repair has healed or to look for a leak, fistula, or reflux — written to work whether or not the patient already has a catheter or suprapubic tube.',
  },
  {
    slug: 'urodynamics',
    title: 'Urodynamics',
    category: 'Tests & Imaging',
    subcategory: 'Scope & Bladder-Function Tests',
    pages: 2,
    description:
      'A group of tests that measure how the bladder fills and empties using small catheters — what the test is, how to prepare, and what to expect during and after.',
  },
  {
    slug: 'ambulatory-urodynamics',
    title: 'Ambulatory Urodynamics (Catheter-Free)',
    category: 'Tests & Imaging',
    subcategory: 'Scope & Bladder-Function Tests',
    pages: 2,
    description:
      'A newer, catheter-free bladder test: a small wireless sensor records bladder pressure during normal daily activity for more lifelike readings — how it works and what to expect.',
  },
  {
    slug: 'ureteral-evaluation-under-anesthesia',
    title: 'Ureteral Evaluation Under Anesthesia',
    category: 'Tests & Imaging',
    subcategory: 'Kidney & Ureter Tests',
    pages: 2,
    description:
      'A detailed exam to map a narrowing of the ureter while asleep — any combination of ureteroscopy, retrograde and antegrade pyelogram, and cystography — to plan the right repair.',
  },
  {
    slug: 'suprapubic-catheter-placement',
    title: 'Suprapubic Catheter Placement',
    category: 'Procedures & Surgery',
    subcategory: 'Catheters & Grafts',
    pages: 2,
    description:
      'Placing a catheter that drains the bladder through the lower belly — preparation, the procedure (local, sedation, or general anesthesia), and aftercare.',
  },
  {
    slug: 'buccal-mucosa-graft',
    title: 'Buccal Mucosa (Cheek) Graft',
    category: 'Procedures & Surgery',
    subcategory: 'Catheters & Grafts',
    pages: 2,
    description:
      'The cheek-graft (donor-site) part of a urethral or ureteral repair — why the cheek lining is used, what happens during surgery, and how the mouth heals afterward.',
  },
  {
    slug: 'artificial-urinary-sphincter',
    title: 'Artificial Urinary Sphincter (AUS)',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
    pages: 2,
    description:
      'An implanted device that restores bladder control after leakage (often after prostate surgery) — how it works, preparing for surgery, the ~6-week wait before activation, and the medical-alert rule for catheters.',
  },
  {
    slug: 'inflatable-penile-prosthesis',
    title: 'Inflatable Penile Prosthesis (IPP)',
    category: 'Procedures & Surgery',
    subcategory: 'Erections & Penile Conditions',
    audience: 'male',
    pages: 2,
    description:
      'An implanted device for erectile dysfunction not relieved by other treatments — how it works, preparing for surgery, what it does and does not change, and activation plus daily cycling afterward.',
  },
  {
    slug: 'malleable-penile-implant',
    title: 'Malleable Penile Implant',
    category: 'Procedures & Surgery',
    subcategory: 'Erections & Penile Conditions',
    audience: 'male',
    pages: 2,
    description:
      'The bendable (semi-rigid) penile implant for erectile dysfunction — how it works (bend up to use, down to conceal), preparing for surgery, what it does and does not change, and recovery.',
  },
  {
    slug: 'male-urethral-sling',
    title: 'Male Urethral Sling',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
    audience: 'male',
    pages: 2,
    description:
      'A mesh sling placed under the urethra for mild-to-moderate urine leakage after prostate surgery — how it works (nothing to operate), preparing for surgery, recovery, and how it compares with the artificial sphincter.',
  },
  {
    slug: 'urethroplasty',
    title: 'Urethroplasty (Urethral Repair)',
    category: 'Procedures & Surgery',
    subcategory: 'Urethral Narrowing & Stricture',
    pages: 2,
    description:
      'Surgery to repair a narrowing (stricture) of the urethra — written to flex across approaches (penile, perineal, with or without a cheek graft): how it works, preparing, the catheter and healing X-ray, and recovery.',
  },
  {
    slug: 'penile-plication',
    title: 'Penile Plication',
    category: 'Procedures & Surgery',
    subcategory: 'Erections & Penile Conditions',
    audience: 'male',
    pages: 2,
    description:
      'Surgery to straighten the penis in Peyronie\'s disease by stitching the longer side — the simplest option (some shortening, lowest new-ED risk): how it works, preparing, and recovery.',
  },
  {
    slug: 'plaque-incision-grafting',
    title: 'Plaque Incision and Grafting',
    category: 'Procedures & Surgery',
    subcategory: 'Erections & Penile Conditions',
    audience: 'male',
    pages: 2,
    description:
      'Straightening surgery for Peyronie\'s disease that releases the scar on the short side and patches it with a graft — preserves length for severe or complex curves (higher new-ED risk): how it works, preparing, and recovery.',
  },
  {
    slug: 'perineal-urethrostomy',
    title: 'Perineal Urethrostomy',
    category: 'Procedures & Surgery',
    subcategory: 'Urethral Narrowing & Stricture',
    audience: 'male',
    pages: 2,
    description:
      'A durable option when the urethra is too narrowed or damaged to repair — a new, permanent opening for urine in the perineum (you urinate sitting down): how it works, preparing, and recovery.',
  },
  {
    slug: 'pyeloplasty',
    title: 'Pyeloplasty',
    category: 'Procedures & Surgery',
    subcategory: 'Kidney & Ureter Reconstruction',
    pages: 2,
    description:
      'Surgery to fix a blockage where the kidney drains into the ureter (UPJ obstruction) — usually keyhole (robotic/laparoscopic): how it works, preparing, the internal stent, and recovery.',
  },
  {
    slug: 'optilume-urethral-stricture',
    title: 'Optilume Drug-Coated Balloon (Urethral Stricture)',
    category: 'Procedures & Surgery',
    subcategory: 'Urethral Narrowing & Stricture',
    audience: 'male',
    pages: 2,
    description:
      'A minimally invasive, no-incision treatment for a recurring urethral narrowing — a balloon widens the scar and delivers medicine to help keep it from re-narrowing: how it works, preparing, and recovery.',
  },
  {
    slug: 'endoscopic-urethroplasty',
    title: 'Endoscopic Urethroplasty (TUITMR)',
    category: 'Procedures & Surgery',
    subcategory: 'Urethral Narrowing & Stricture',
    audience: 'male',
    pages: 2,
    description:
      'A no-incision repair of a scar at the bladder neck or after prostate surgery — the scar is opened through a scope and covered with healthy lining so it heals open: how it works, preparing, and recovery.',
  },
  {
    slug: 'ureteral-reconstruction',
    title: 'Ureteral Reconstruction',
    category: 'Procedures & Surgery',
    subcategory: 'Kidney & Ureter Reconstruction',
    pages: 2,
    description:
      'Surgery to repair a blocked or narrowed ureter — written to flex across approaches (rejoining the ends, a cheek graft, or a piece of intestine) over an internal stent: how it works, preparing, and recovery.',
  },
  {
    slug: 'urinary-diversion-overview',
    title: 'Urinary Diversion — Comparing Your Options',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Diversion',
    pages: 2,
    description:
      'A decision-aid comparing the three ways to drain urine after the bladder is removed or no longer works — bag (ileal conduit) vs. urinating through the urethra (neobladder) vs. catheterizing a stoma (Indiana pouch): how daily life differs and questions to ask.',
  },
  {
    slug: 'ileal-conduit',
    title: 'Ileal Conduit',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Diversion',
    pages: 2,
    description:
      'The simplest, most common urinary diversion — a short piece of bowel drains urine to a stoma on the belly, into a bag you empty and change: how it works, preparing, stoma marking, and daily care.',
  },
  {
    slug: 'orthotopic-neobladder',
    title: 'Orthotopic Neobladder',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Diversion',
    pages: 2,
    description:
      'A new bladder built from bowel and connected to the urethra so you urinate the natural way (no bag) — how it works, preparing, the catheter and healing X-ray, timed voiding day and night, and possible self-catheterization.',
  },
  {
    slug: 'continent-cutaneous-diversion',
    title: 'Continent Cutaneous Diversion (Indiana Pouch)',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Diversion',
    pages: 2,
    description:
      'An internal pouch from bowel with a small leak-proof opening (often the navel) that you empty with a catheter several times a day — no bag: how it works, preparing, catheterizing and flushing, and the urgent "can\'t catheterize" warning.',
  },

  // ---- Conservative & Self-Care ----
  {
    slug: 'pelvic-floor-exercises-bladder-training',
    title: 'Pelvic-Floor Exercises & Bladder Training',
    category: 'Conservative & Self-Care',
    subcategory: 'Bladder & Pelvic-Floor Training',
    pages: 2,
    description:
      'Safe, free, proven first-line care for leaks and urgency — how to find and exercise the right muscles, a simple daily routine, and bladder training to wait longer between trips.',
  },
  {
    slug: 'vaginal-estrogen-therapy',
    title: 'Vaginal Estrogen Therapy',
    category: 'Conservative & Self-Care',
    subcategory: 'Vaginal Health & Devices',
    audience: 'female',
    pages: 2,
    description:
      'Low-dose, local estrogen (cream, tablet, or ring) for menopause-related dryness, painful sex, and urinary symptoms — how it works, how to use it, its safety, and why little is absorbed into the body.',
  },
  {
    slug: 'vaginal-pessaries',
    title: 'Vaginal Pessaries',
    category: 'Conservative & Self-Care',
    subcategory: 'Vaginal Health & Devices',
    audience: 'female',
    pages: 2,
    description:
      'A removable vaginal device that supports prolapse (and some help stress leakage) without surgery — how it is fitted, how to care for it, and what to expect. Often a comfortable long-term option.',
  },
  {
    slug: 'vaginal-lubricants-moisturizers',
    title: 'Vaginal Lubricants & Moisturizers',
    category: 'Conservative & Self-Care',
    subcategory: 'Vaginal Health & Devices',
    audience: 'female',
    pages: 2,
    description:
      'Hormone-free relief for vaginal dryness — the difference between lubricants (for sex) and moisturizers (used regularly), how to choose a type (water/silicone/oil-based), and how they pair with vaginal estrogen.',
  },
  {
    slug: 'intermittent-self-catheterization',
    title: 'Intermittent Self-Catheterization (ISC)',
    category: 'Conservative & Self-Care',
    subcategory: 'Self-Catheterization',
    pages: 2,
    description:
      'Emptying the bladder yourself with a thin catheter a few times a day when it will not empty on its own — why it protects the kidneys, the clean-technique steps, and how it beats a permanent catheter.',
  },
  {
    slug: 'intracavernosal-injections',
    title: 'Intracavernosal Injections (ICI) for ED',
    category: 'Conservative & Self-Care',
    subcategory: 'ED & Penile Therapies',
    audience: 'male',
    pages: 2,
    description:
      'A self-injected treatment for erectile dysfunction when pills do not work — how it works, the first dose set in the office, safe technique, and the urgent priapism (erection over 4 hours) warning.',
  },
  {
    slug: 'vacuum-erection-device',
    title: 'Vacuum Erection Device (VED)',
    category: 'Conservative & Self-Care',
    subcategory: 'ED & Penile Therapies',
    audience: 'male',
    pages: 2,
    description:
      'A non-drug "penis pump" that draws blood in to create an erection, held by a base ring — for ED and penile rehabilitation after prostate surgery; how to use it and the 30-minute ring rule.',
  },
  {
    slug: 'penile-traction-therapy',
    title: 'Penile Traction Therapy',
    category: 'Conservative & Self-Care',
    subcategory: 'ED & Penile Therapies',
    audience: 'male',
    pages: 2,
    description:
      'A wearable device that gently stretches the penis over months to reduce Peyronie\'s curvature and help preserve length — how it works, safe use, and realistic (gradual, modest) expectations.',
  },

  // ---- Medications ----
  {
    slug: 'anticholinergics',
    title: 'Anticholinergics (for Overactive Bladder)',
    category: 'Medications',
    subcategory: 'Overactive Bladder Medicines',
    pages: 2,
    description:
      'Pills that calm an overactive bladder (oxybutynin, solifenacin, tolterodine, others) — how they work, how to take them, the dry-mouth/constipation effects, and the cognitive caution in older adults.',
  },
  {
    slug: 'beta-3-agonists',
    title: 'Beta-3 Agonists (for Overactive Bladder)',
    category: 'Medications',
    subcategory: 'Overactive Bladder Medicines',
    pages: 2,
    description:
      'Newer overactive-bladder pills (mirabegron, vibegron) that relax the bladder with far less dry mouth than anticholinergics — how they work, who they suit, and the blood-pressure point with mirabegron.',
  },
  {
    slug: 'alpha-blockers',
    title: 'Alpha Blockers (for Prostate / Urinary Flow)',
    category: 'Medications',
    subcategory: 'Prostate & Urinary Flow Medicines',
    pages: 2,
    description:
      'The usual first medicine for an enlarged prostate (tamsulosin, alfuzosin, silodosin, others) — fast relief of urine-flow symptoms, dizziness and retrograde-ejaculation effects, and the cataract-surgery (IFIS) warning.',
  },
  {
    slug: '5-alpha-reductase-inhibitors',
    title: '5-Alpha-Reductase Inhibitors',
    category: 'Medications',
    subcategory: 'Prostate & Urinary Flow Medicines',
    audience: 'male',
    pages: 2,
    description:
      'Pills that gradually shrink an enlarged prostate (finasteride, dutasteride) over 3–6 months, lowering retention and surgery risk — plus the key point that they halve the PSA test and the pregnancy-handling caution.',
  },
  {
    slug: 'pde5-inhibitors',
    title: 'PDE5 Inhibitors (ED & Prostate Pills)',
    category: 'Medications',
    subcategory: 'Erectile Dysfunction Medicines',
    audience: 'male',
    pages: 2,
    description:
      'Pills for erectile dysfunction (sildenafil, tadalafil, others; tadalafil also for prostate symptoms) — how they work with arousal, as-needed vs. daily, and the critical "never with nitrates" safety rule.',
  },
  {
    slug: 'testosterone-replacement-therapy',
    title: 'Testosterone Replacement Therapy (Men)',
    category: 'Medications',
    subcategory: 'Testosterone Therapy',
    audience: 'male',
    pages: 2,
    description:
      'Treatment for confirmed low testosterone with symptoms (gel, injection, patch, or pellets) — who it is for, the forms, required monitoring (blood count, prostate), and that it lowers fertility.',
  },

  // ---- Office Procedures ----
  {
    slug: 'bladder-botox',
    title: 'Bladder Botox (for Bladder Control)',
    category: 'Office Procedures',
    subcategory: 'Injections (Botox & Bulking)',
    pages: 2,
    description:
      'Injections that relax an overactive bladder muscle to ease urgency, frequency, and urge leakage when other treatments fall short — a quick office procedure; the main trade-off is possible temporary self-catheterization.',
  },
  {
    slug: 'urethral-bulking',
    title: 'Urethral Bulking',
    category: 'Office Procedures',
    subcategory: 'Injections (Botox & Bulking)',
    pages: 2,
    description:
      'A quick, no-incision office injection that helps the urethra seal to reduce stress urine leakage — less durable than a sling but low-risk and repeatable; how it works, preparing, and recovery.',
  },
  {
    slug: 'percutaneous-tibial-nerve-stimulation',
    title: 'Percutaneous Tibial Nerve Stimulation (PTNS)',
    category: 'Office Procedures',
    subcategory: 'Nerve Stimulation for OAB',
    pages: 2,
    description:
      'A drug-free office treatment for overactive bladder using gentle nerve stimulation at the ankle — painless ~30-minute sessions, typically weekly for 12 weeks then maintenance.',
  },
  {
    slug: 'sacral-neuromodulation',
    title: 'Sacral Neuromodulation',
    category: 'Office Procedures',
    subcategory: 'Nerve Stimulation for OAB',
    pages: 2,
    description:
      'An implanted "bladder/bowel pacemaker" for overactive bladder, non-obstructive retention, or bowel leakage — with a test phase first so you try it before committing to the permanent implant.',
  },
  {
    slug: 'implantable-tibial-nerve-stimulation',
    title: 'Implantable Tibial Nerve Stimulation (ITNS)',
    category: 'Office Procedures',
    subcategory: 'Nerve Stimulation for OAB',
    pages: 2,
    description:
      'A small device implanted near the ankle that calms an overactive bladder — the at-home version of PTNS, with no weekly office visits. How the short outpatient implant works, the two device types (automatic vs. ankle-band powered), and what to expect.',
  },

  // ---- Procedures & Surgery: Prostate (BPH) ----
  {
    slug: 'turp',
    title: 'TURP (Transurethral Resection of the Prostate)',
    category: 'Procedures & Surgery',
    subcategory: 'Prostate (BPH) Procedures',
    audience: 'male',
    pages: 2,
    description:
      'The long-standing standard surgery for an enlarged prostate — the obstructing inner tissue is removed through a scope (no incision); strong, durable flow improvement, with dry (retrograde) ejaculation the common after-effect.',
  },
  {
    slug: 'holep',
    title: 'HoLEP (Holmium Laser Enucleation)',
    category: 'Procedures & Surgery',
    subcategory: 'Prostate (BPH) Procedures',
    audience: 'male',
    pages: 2,
    description:
      'Laser removal of the entire inner prostate through a scope — works for any prostate size (including very large), with low bleeding and durable results; how it works, preparing, and recovery.',
  },
  {
    slug: 'aquablation',
    title: 'Aquablation (Waterjet Prostate Surgery)',
    category: 'Procedures & Surgery',
    subcategory: 'Prostate (BPH) Procedures',
    audience: 'male',
    pages: 2,
    description:
      'A heat-free, ultrasound-guided waterjet that precisely removes obstructing prostate tissue through the urethra — flow results like TURP with a better chance of preserving ejaculation; how it works and recovery.',
  },
  {
    slug: 'simple-prostatectomy',
    title: 'Simple Prostatectomy',
    category: 'Procedures & Surgery',
    subcategory: 'Prostate (BPH) Procedures',
    audience: 'male',
    pages: 2,
    description:
      'Surgery for a very large enlarged prostate (BPH) — removing the bulky inner tissue through the abdomen (open or robotic); how it differs from the cancer operation, when it is used, and recovery.',
  },

  // ---- Procedures & Surgery (urogyn) ----
  {
    slug: 'mid-urethral-sling',
    title: 'Mid-Urethral Sling (for SUI)',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
    audience: 'female',
    pages: 2,
    description:
      'The most common surgery for female stress incontinence — a mesh tape supporting the mid-urethra, quick and outpatient with nothing to operate afterward; the mesh facts and an own-tissue alternative.',
  },
  {
    slug: 'proact-adjustable-balloons',
    title: 'ProACT Adjustable Balloons (Male)',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
    audience: 'male',
    pages: 2,
    description:
      'Two adjustable silicone balloons placed beside the urethra to reduce leakage after prostate surgery — minimally invasive, reversible, and fine-tuned in the office through a scrotal port. Best for mild-to-moderate, non-radiated stress incontinence.',
  },
  {
    slug: 'act-adjustable-balloons',
    title: 'ACT Adjustable Balloons (Female)',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
    audience: 'female',
    pages: 2,
    description:
      'Two adjustable silicone balloons placed beside the urethra for female stress incontinence — minimally invasive, reversible, and fine-tuned in the office through a labial port. Often considered for recurrent leakage or a weak sphincter; availability varies by country.',
  },
  {
    slug: 'colpocleisis',
    title: 'Colpocleisis (Vaginal Closure Surgery)',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    audience: 'female',
    pages: 2,
    description:
      'A simple, very durable prolapse repair that closes most of the vaginal canal — ideal when a low-stress fix is wanted; the key trade-off is that vaginal intercourse is no longer possible.',
  },
  {
    slug: 'sacrocolpopexy',
    title: 'Sacrocolpopexy',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    audience: 'female',
    pages: 2,
    description:
      'The most durable repair for top-of-vagina prolapse — abdominal mesh anchors the vaginal top to the sacrum, usually by keyhole surgery; how it works, the mesh facts, preparing, and recovery.',
  },
  {
    slug: 'vaginal-hysterectomy-prolapse',
    title: 'Vaginal Hysterectomy (for Prolapse)',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    audience: 'female',
    pages: 2,
    description:
      'Removing the uterus through the vagina (no abdominal incision) with a suspension of the vaginal top — how it works, the uterus-sparing alternative, preparing, and recovery.',
  },
  {
    slug: 'vaginal-prolapse-repair-graft',
    title: 'Vaginal Prolapse Repair Using Mesh / Graft',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    audience: 'female',
    pages: 2,
    description:
      'Reinforcing a vaginal prolapse repair with a biological graft or, selectively, mesh — with an honest account of the transvaginal-mesh safety history and the questions to ask before choosing.',
  },
  {
    slug: 'vaginal-suspension',
    title: 'Vaginal Suspension Surgery',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    audience: 'female',
    pages: 2,
    description:
      'A mesh-free lift of the top of the vagina using your own ligaments (USLS or SSLF), done through the vagina — how it works, how it compares with sacrocolpopexy, preparing, and recovery.',
  },
  {
    slug: 'perineal-tears-3rd-4th-degree',
    title: 'Third- and Fourth-Degree Perineal Tears',
    category: 'Procedures & Surgery',
    subcategory: 'Pelvic Floor & Perineal Repair',
    audience: 'female',
    pages: 2,
    description:
      'Severe childbirth tears involving the anal sphincter (OASIS) — how they are repaired and, importantly, how to heal well: stool softeners, wound care, pelvic-floor therapy, and follow-up.',
  },
  {
    slug: 'cosmetic-gynecology',
    title: 'Cosmetic Gynecology',
    category: 'Procedures & Surgery',
    subcategory: 'Cosmetic & Other',
    audience: 'female',
    pages: 2,
    description:
      'Balanced facts on elective genital procedures — labiaplasty vs. heavily marketed "vaginal rejuvenation" laser/energy devices (not FDA-approved, with warnings) — and how to set realistic, safe expectations.',
  },
  {
    slug: 'surgical-considerations-before-pop-repair',
    title: 'Choices Before Prolapse Repair Surgery',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    audience: 'female',
    pages: 2,
    description:
      'The key decisions before pelvic organ prolapse surgery — repair vs. closure, vaginal vs. abdominal route, keeping the uterus, support material, and treating hidden leakage — plus questions to ask.',
  },
];
