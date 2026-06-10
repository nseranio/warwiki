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
  /** Finer grouping within the category (see HANDOUT_SUBCATEGORY_ORDER). */
  subcategory: string;
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
  'Bladder & Urinary',
  'Pelvic Floor & Prolapse',
  'Bowel & Anorectal',
  'Sexual Health & Other',
  // Tests & Imaging
  'Bladder & Urethra Imaging',
  'Scope & Bladder-Function Tests',
  'Kidney & Ureter Tests',
  // Conservative & Self-Care
  'Bladder & Pelvic-Floor Training',
  'Vaginal Health & Devices',
  'Self-Catheterization',
  'Erectile Dysfunction',
  // Office Procedures
  'Injections (Botox & Bulking)',
  'Nerve Stimulation for OAB',
  // Procedures & Surgery
  'Urinary Leakage (Incontinence)',
  'Prolapse Surgery',
  'Pelvic Floor & Perineal Repair',
  'Urethral Narrowing & Stricture',
  'Kidney & Ureter Reconstruction',
  'Urinary Diversion',
  'Erections & Penile Conditions',
  'Catheters & Grafts',
  'Cosmetic & Other',
  'Before & After Surgery',
];

export const PATIENT_HANDOUTS: PatientHandout[] = [
  {
    slug: 'overactive-bladder',
    title: 'Overactive Bladder (OAB)',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'Understanding sudden urges, frequent trips, night-time urination, and urge leaks — what causes OAB, how it is diagnosed, and the step-by-step treatments from lifestyle to Botox and nerve stimulation.',
  },
  {
    slug: 'stress-urinary-incontinence-female',
    title: 'Stress Urinary Incontinence (Female)',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'Leaking with coughing, laughing, lifting, or exercise from weakened support under the urethra — the female-specific options from pelvic-floor exercises to a pessary, bulking injection, or mid-urethral sling.',
  },
  {
    slug: 'stress-urinary-incontinence-male',
    title: 'Stress Urinary Incontinence (Male)',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'Leaking after prostate surgery or radiation from a weakened sphincter — how it usually improves over the first year, and the options (pelvic-floor exercises, male sling, artificial urinary sphincter).',
  },
  {
    slug: 'interstitial-cystitis-bps',
    title: 'Interstitial Cystitis / Bladder Pain Syndrome',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'Ongoing bladder or pelvic pain with urgency that is not an infection — what it is, how it is diagnosed, identifying flare triggers, and the combined treatments (self-care, pelvic-floor therapy, medicines, instillations).',
  },
  {
    slug: 'urinary-tract-infections',
    title: 'Urinary Tract Infections (UTIs)',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'What a bladder vs. kidney infection is, how UTIs are treated, when antibiotics are (and are not) needed, and how to prevent repeats — including vaginal estrogen after menopause.',
  },
  {
    slug: 'asymptomatic-bacteriuria',
    title: 'Asymptomatic Bacteriuria',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'Bacteria found in the urine when you feel completely fine — why this usually should NOT be treated with antibiotics, the few exceptions (pregnancy, before some procedures), and what symptoms to watch for.',
  },
  {
    slug: 'asymptomatic-microscopic-hematuria',
    title: 'Asymptomatic Microscopic Hematuria',
    category: 'Conditions & Symptoms',
    subcategory: 'Bladder & Urinary',
    pages: 2,
    description:
      'Tiny amounts of blood in the urine found on a test, with no symptoms — what causes it, the risk-based check (imaging and a bladder look), and what happens next. Most causes are not serious.',
  },
  {
    slug: 'pelvic-organ-prolapse',
    title: 'Pelvic Organ Prolapse',
    category: 'Conditions & Symptoms',
    subcategory: 'Pelvic Floor & Prolapse',
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
    pages: 2,
    description:
      'Common, often treatable concerns about desire, arousal, orgasm, or pain with sex — the physical, hormonal, and emotional causes, and treatments from lubricants and vaginal estrogen to pelvic-floor therapy and counseling.',
  },
  {
    slug: 'urethral-diverticulum',
    title: 'Urethral Diverticulum',
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    pages: 2,
    description:
      'A small pocket off the urethra that collects urine — the classic "3 Ds" (dribbling, burning, pain with sex) and recurrent infections, how MRI maps it, and surgical removal (diverticulectomy) when it is bothersome.',
  },
  {
    slug: 'fistulas-genitourinary-rectovaginal',
    title: 'Fistulas: Genitourinary and Rectovaginal',
    category: 'Conditions & Symptoms',
    subcategory: 'Sexual Health & Other',
    pages: 2,
    description:
      'An abnormal connection causing constant urine leakage (genitourinary) or gas/stool through the vagina (rectovaginal) — the causes, how it is found, and repair (often with a tissue flap), plus why timing matters.',
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
    pages: 2,
    description:
      'An implanted device for erectile dysfunction not relieved by other treatments — how it works, preparing for surgery, what it does and does not change, and activation plus daily cycling afterward.',
  },
  {
    slug: 'malleable-penile-implant',
    title: 'Malleable Penile Implant',
    category: 'Procedures & Surgery',
    subcategory: 'Erections & Penile Conditions',
    pages: 2,
    description:
      'The bendable (semi-rigid) penile implant for erectile dysfunction — how it works (bend up to use, down to conceal), preparing for surgery, what it does and does not change, and recovery.',
  },
  {
    slug: 'male-urethral-sling',
    title: 'Male Urethral Sling',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
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
    pages: 2,
    description:
      'Surgery to straighten the penis in Peyronie\'s disease by stitching the longer side — the simplest option (some shortening, lowest new-ED risk): how it works, preparing, and recovery.',
  },
  {
    slug: 'plaque-incision-grafting',
    title: 'Plaque Incision and Grafting',
    category: 'Procedures & Surgery',
    subcategory: 'Erections & Penile Conditions',
    pages: 2,
    description:
      'Straightening surgery for Peyronie\'s disease that releases the scar on the short side and patches it with a graft — preserves length for severe or complex curves (higher new-ED risk): how it works, preparing, and recovery.',
  },
  {
    slug: 'perineal-urethrostomy',
    title: 'Perineal Urethrostomy',
    category: 'Procedures & Surgery',
    subcategory: 'Urethral Narrowing & Stricture',
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
    pages: 2,
    description:
      'A minimally invasive, no-incision treatment for a recurring urethral narrowing — a balloon widens the scar and delivers medicine to help keep it from re-narrowing: how it works, preparing, and recovery.',
  },
  {
    slug: 'endoscopic-urethroplasty',
    title: 'Endoscopic Urethroplasty (TUITMR)',
    category: 'Procedures & Surgery',
    subcategory: 'Urethral Narrowing & Stricture',
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
    pages: 2,
    description:
      'Low-dose, local estrogen (cream, tablet, or ring) for menopause-related dryness, painful sex, and urinary symptoms — how it works, how to use it, its safety, and why little is absorbed into the body.',
  },
  {
    slug: 'vaginal-pessaries',
    title: 'Vaginal Pessaries',
    category: 'Conservative & Self-Care',
    subcategory: 'Vaginal Health & Devices',
    pages: 2,
    description:
      'A removable vaginal device that supports prolapse (and some help stress leakage) without surgery — how it is fitted, how to care for it, and what to expect. Often a comfortable long-term option.',
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
    subcategory: 'Erectile Dysfunction',
    pages: 2,
    description:
      'A self-injected treatment for erectile dysfunction when pills do not work — how it works, the first dose set in the office, safe technique, and the urgent priapism (erection over 4 hours) warning.',
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

  // ---- Procedures & Surgery (urogyn) ----
  {
    slug: 'mid-urethral-sling',
    title: 'Mid-Urethral Sling (for SUI)',
    category: 'Procedures & Surgery',
    subcategory: 'Urinary Leakage (Incontinence)',
    pages: 2,
    description:
      'The most common surgery for female stress incontinence — a mesh tape supporting the mid-urethra, quick and outpatient with nothing to operate afterward; the mesh facts and an own-tissue alternative.',
  },
  {
    slug: 'colpocleisis',
    title: 'Colpocleisis (Vaginal Closure Surgery)',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    pages: 2,
    description:
      'A simple, very durable prolapse repair that closes most of the vaginal canal — ideal when a low-stress fix is wanted; the key trade-off is that vaginal intercourse is no longer possible.',
  },
  {
    slug: 'sacrocolpopexy',
    title: 'Sacrocolpopexy',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    pages: 2,
    description:
      'The most durable repair for top-of-vagina prolapse — abdominal mesh anchors the vaginal top to the sacrum, usually by keyhole surgery; how it works, the mesh facts, preparing, and recovery.',
  },
  {
    slug: 'vaginal-hysterectomy-prolapse',
    title: 'Vaginal Hysterectomy (for Prolapse)',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    pages: 2,
    description:
      'Removing the uterus through the vagina (no abdominal incision) with a suspension of the vaginal top — how it works, the uterus-sparing alternative, preparing, and recovery.',
  },
  {
    slug: 'vaginal-prolapse-repair-graft',
    title: 'Vaginal Prolapse Repair Using Mesh / Graft',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    pages: 2,
    description:
      'Reinforcing a vaginal prolapse repair with a biological graft or, selectively, mesh — with an honest account of the transvaginal-mesh safety history and the questions to ask before choosing.',
  },
  {
    slug: 'vaginal-suspension',
    title: 'Vaginal Suspension Surgery',
    category: 'Procedures & Surgery',
    subcategory: 'Prolapse Surgery',
    pages: 2,
    description:
      'A mesh-free lift of the top of the vagina using your own ligaments (USLS or SSLF), done through the vagina — how it works, how it compares with sacrocolpopexy, preparing, and recovery.',
  },
  {
    slug: 'perineal-tears-3rd-4th-degree',
    title: 'Third- and Fourth-Degree Perineal Tears',
    category: 'Procedures & Surgery',
    subcategory: 'Pelvic Floor & Perineal Repair',
    pages: 2,
    description:
      'Severe childbirth tears involving the anal sphincter (OASIS) — how they are repaired and, importantly, how to heal well: stool softeners, wound care, pelvic-floor therapy, and follow-up.',
  },
  {
    slug: 'cosmetic-gynecology',
    title: 'Cosmetic Gynecology',
    category: 'Procedures & Surgery',
    subcategory: 'Cosmetic & Other',
    pages: 2,
    description:
      'Balanced facts on elective genital procedures — labiaplasty vs. heavily marketed "vaginal rejuvenation" laser/energy devices (not FDA-approved, with warnings) — and how to set realistic, safe expectations.',
  },
  {
    slug: 'surgery-what-to-expect',
    title: 'Surgery: What to Expect',
    category: 'Procedures & Surgery',
    subcategory: 'Before & After Surgery',
    pages: 2,
    description:
      'A general guide to preparing for and recovering from urologic or pelvic surgery — pre-op steps, anesthesia, the day of surgery, recovery, and when to call. Use alongside your procedure-specific handout.',
  },
  {
    slug: 'surgical-considerations-before-pop-repair',
    title: 'Choices Before Prolapse Repair Surgery',
    category: 'Procedures & Surgery',
    subcategory: 'Before & After Surgery',
    pages: 2,
    description:
      'The key decisions before pelvic organ prolapse surgery — repair vs. closure, vaginal vs. abdominal route, keeping the uterus, support material, and treating hidden leakage — plus questions to ask.',
  },
];
