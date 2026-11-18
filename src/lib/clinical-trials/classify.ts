/**
 * Automated disease-setting tags, text signals and the scope gate for the
 * WARWIKI finder. Tags and signals only decide where a study is listed and
 * which words the registry uses; exclusions need a source-bound annotation.
 */
import type {SettingTag, TextSignal} from './types.ts';

export interface ClassifyInput {
  titles: string[];
  conditions: string[];
  keywords: string[];
  eligibility?: string;
}

/** Inclusion part of the eligibility text (before "Exclusion Criteria"). */
export function inclusionText(text?: string): string {
  if (!text) return '';
  const idx = text.search(/exclusion criteria/i);
  return idx > 0 ? text.slice(0, idx) : text;
}

const TAGS: [SettingTag, RegExp][] = [
  ['oab', /overactive bladder|\bOAB\b|urg(e|ency)[\s-]*(urinary[\s-]*)?incontinence|urinary urgency|detrusor overactivity|\bUUI\b/i],
  ['sui', /stress[\s-]*(urinary[\s-]*)?incontinence|\bSUI\b|post[\s-]*prostatectomy[\s-]*incontinence|intrinsic sphincter|artificial urinary sphincter|male sling|mid[\s-]*urethral sling/i],
  ['neurogenic', /neurogenic|spinal cord injur|multiple sclerosis|spina bifida|parkinson/i],
  ['retention', /urinary retention|underactive bladder|detrusor underactivity|incomplete emptying/i],
  ['stricture', /urethral strictur|urethral stenosis|urethroplasty|meatal stenosis|urethral narrowing/i],
  ['prolapse', /prolapse|cystocele|rectocele|enterocele|sacrocolpopexy|colpopexy|hysteropexy|\bPOP\b/i],
];

export function warwikiTags(input: ClassifyInput): SettingTag[] {
  const primary = [...input.titles, ...input.conditions, ...input.keywords];
  const tags = new Set<SettingTag>();
  for (const [tag, re] of TAGS) if (primary.some(p => re.test(p))) tags.add(tag);
  // "Mixed urinary incontinence" belongs to both urgency and stress listings.
  if (primary.some(p => /mixed[\s-]*(urinary[\s-]*)?incontinence/i.test(p))) {
    tags.add('oab');
    tags.add('sui');
  }
  if (!tags.size && input.eligibility) {
    const inc = inclusionText(input.eligibility);
    for (const [tag, re] of TAGS) if (re.test(inc)) tags.add(tag);
  }
  return [...tags];
}

/** Words the inclusion text uses. Displayed, never used to exclude. */
export function textSignals(input: ClassifyInput): TextSignal[] {
  const inc = [inclusionText(input.eligibility), ...input.titles].join('\n');
  const s = new Set<TextSignal>();
  if (/\b(women|female|females)\b/i.test(inc)) s.add('female');
  if (/\b(men|male|males)\b/i.test(inc)) s.add('male');
  if (/neurogenic|spinal cord injur|multiple sclerosis/i.test(inc)) s.add('neurogenic');
  if (/(anticholinergic|antimuscarinic|beta[\s-]*3|mirabegron|vibegron|OAB medication)/i.test(inc)) s.add('priorMeds');
  if (/botulinum|onabotulinum|botox|sacral neuro|\bSNM\b|tibial nerve|\bPTNS\b/i.test(inc)) s.add('thirdLine');
  if (/prostatectomy/i.test(inc)) s.add('postProstatectomy');
  if (/\bsling\b|artificial urinary sphincter|\bAUS\b|bulking/i.test(inc)) s.add('priorAntiIncontinence');
  if (/radiation|radiotherapy|brachytherapy/i.test(inc)) s.add('radiation');
  if (/uter(us|ine)[\s-]*(preserv|spar|in situ)|hysteropexy|intact uterus/i.test(inc)) s.add('uterus');
  if (/hysterectomy|post[\s-]*hysterectomy|vault prolapse/i.test(inc)) s.add('hysterectomy');
  if (/lichen sclerosus|\bBXO\b|balanitis xerotica/i.test(inc)) s.add('lichen');
  if (/(prior|previous|failed)[^.\n]{0,40}urethroplasty/i.test(inc)) s.add('priorUrethroplasty');
  if (/recurren|persistent|refractory/i.test(inc)) s.add('recurrent');
  return [...s];
}

/* ---------- Scope gate ---------- */

const FUNCTIONAL = /incontinen|overactive|bladder|urethr|prolapse|pelvic floor|pelvic organ|cystitis|prostatitis|pelvic pain|erectile|peyronie|penile|penis|hypogonad|testosterone|prostatic hyperplasia|\bBPH\b|lower urinary tract|\bLUTS\b|nocturia|retention|voiding|ureter|ureteropelvic|hydronephrosis|fistula|diversion|neobladder|stoma|conduit|gender|vaginoplasty|phalloplasty|metoidioplasty|genitourinary syndrome|vaginal atrophy|vulvovaginal|urinary tract infection|\bUTI\b|(urethral|bladder|ureteral|renal|genital|penile|genitourinary)[\s-]*(injur|trauma)|hypospadias|epispadias|lichen sclerosus|retroperitoneal fibrosis|sexual|ejaculat|priapism|outlet obstruction|urinary/i;
const ONCOLOGY = /cancer|carcinoma|neoplas|tumou?r|malignan|oncolog|sarcoma|seminoma|metasta|lymphoma|leukemia|myeloma/i;
const STONES = /stone|lithiasis|nephrolith|urolith|calcul|lithotripsy|ureteroscop/i;
const FERTILITY = /infertil|azoosperm|oligosperm|vasectomy|sperm|semen|\bIVF\b|in vitro fertili|varicocele/i;

/**
 * Why a retrieved study falls outside WARWIKI's scope (reconstructive, functional
 * and urogynecology; adults), or null when it is in scope.
 */
export function outOfScope(title: string, acronym: string | undefined, conditions: string[], ages?: string[]): string | null {
  const head = [title, acronym ?? '', ...conditions.slice(0, 2)].join(' | ');
  if (ages?.length && !ages.includes('ADULT') && !ages.includes('OLDER_ADULT')) return 'children only';
  if (STONES.test(head)) return 'stones and endourology';
  if (FERTILITY.test(head)) return 'infertility';
  if (ONCOLOGY.test(head) && !FUNCTIONAL.test(title)) return 'oncology';
  if (!FUNCTIONAL.test(head)) return 'not urologic';
  return null;
}
