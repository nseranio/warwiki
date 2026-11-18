/**
 * Versioned retrieval definitions for the WARWIKI finder. Change QUERY_VERSION
 * whenever a query changes, so every snapshot records which queries produced it.
 */
import type {ClassifyInput} from './classify.ts';
import type {DeepState, PoolId} from './types.ts';

export const QUERY_VERSION = '2026-11-18.w2';

/** Studies in these overall statuses are retrieved; closed studies are reached by direct NCT lookup. */
export const RETRIEVED_STATUSES = ['RECRUITING', 'NOT_YET_RECRUITING', 'ENROLLING_BY_INVITATION', 'ACTIVE_NOT_RECRUITING', 'SUSPENDED'];

export interface RegistryQuery {
  id: string;
  pools: PoolId[];
  basket?: boolean;
  label: string;
  params: Record<string, string>;
}

const common = {
  'query.locn': 'United States',
  'filter.overallStatus': RETRIEVED_STATUSES.join(','),
};

export const QUERIES: RegistryQuery[] = [
  {id: 'continence', pools: ['continence'], label: 'Incontinence and bladder function',
    params: {...common, 'query.cond': 'stress urinary incontinence OR urge incontinence OR overactive bladder OR mixed urinary incontinence OR neurogenic bladder OR neurogenic detrusor overactivity OR nocturia OR urinary retention OR underactive bladder OR post-prostatectomy incontinence'}},
  {id: 'pain', pools: ['pain'], label: 'Bladder and pelvic pain',
    params: {...common, 'query.cond': 'interstitial cystitis OR bladder pain syndrome OR chronic prostatitis OR chronic pelvic pain syndrome OR pelvic floor dysfunction'}},
  {id: 'urogyn', pools: ['urogyn'], label: 'Prolapse and urogynecology',
    params: {...common, 'query.cond': 'pelvic organ prolapse OR genitourinary syndrome of menopause OR vaginal atrophy OR vesicovaginal fistula OR urinary fistula OR recurrent urinary tract infection'}},
  {id: 'stricture', pools: ['stricture'], label: 'Urethral stricture and urethral reconstruction',
    params: {...common, 'query.cond': 'urethral stricture OR urethral stenosis OR urethroplasty OR hypospadias OR lichen sclerosus'}},
  {id: 'upper', pools: ['upper'], label: 'Upper tract, trauma, radiation injury and diversion',
    params: {...common, 'query.cond': 'ureteral stricture OR ureteral obstruction OR ureteropelvic junction obstruction OR retroperitoneal fibrosis OR radiation cystitis OR hemorrhagic cystitis OR urinary diversion OR ureteral injury OR bladder injury OR urethral injury OR renal trauma'}},
  {id: 'bph', pools: ['bph'], label: 'BPH and male lower urinary tract symptoms',
    params: {...common, 'query.cond': 'benign prostatic hyperplasia OR lower urinary tract symptoms OR bladder outlet obstruction'}},
  {id: 'sexual', pools: ['sexual'], label: 'Sexual health',
    params: {...common, 'query.cond': 'erectile dysfunction OR peyronie disease OR penile prosthesis OR hypogonadism OR female sexual dysfunction'}},
  {id: 'gas', pools: ['gas'], label: 'Gender-affirming surgery',
    params: {...common, 'query.cond': 'gender affirming surgery OR gender dysphoria OR vaginoplasty OR phalloplasty OR metoidioplasty'}},
];

export const POOL_LABELS: Record<PoolId, string> = {
  continence: 'Incontinence',
  pain: 'Bladder & pelvic pain',
  urogyn: 'Prolapse & urogyn',
  stricture: 'Urethral stricture',
  upper: 'Upper tract & trauma',
  bph: 'BPH & LUTS',
  sexual: 'Sexual health',
  gas: 'Gender-affirming',
};

export const POOL_ORDER: PoolId[] = ['continence', 'urogyn', 'stricture', 'pain', 'bph', 'upper', 'sexual', 'gas'];

/** Disease states with detailed, source-bound cohort filters, by pool. */
export const DEEP_STATES: Partial<Record<PoolId, DeepState[]>> = {
  continence: ['oab', 'sui'],
  urogyn: ['prolapse'],
  stricture: ['stricture'],
};

const POOL_TEXT: Record<PoolId, RegExp> = {
  continence: /incontinen|overactive|\bOAB\b|neurogenic|nocturia|retention|underactive|detrusor|urgency/i,
  pain: /cystitis|bladder pain|prostatitis|pelvic pain|pelvic floor/i,
  urogyn: /prolapse|genitourinary syndrome|vaginal atrophy|vulvovaginal|fistula|urinary tract infection|\bUTI\b|cystocele|rectocele/i,
  stricture: /urethr|hypospadias|lichen sclerosus/i,
  upper: /ureter|ureteropelvic|hydronephrosis|retroperitoneal fibrosis|radiation cystitis|hemorrhagic cystitis|diversion|neobladder|conduit|(urethral|bladder|ureteral|renal|genitourinary)[\s-]*(injur|trauma)/i,
  bph: /prostatic hyperplasia|\bBPH\b|lower urinary tract|\bLUTS\b|outlet obstruction|prostate enlargement/i,
  sexual: /erectile|peyronie|penile|hypogonad|testosterone|sexual/i,
  gas: /gender|vaginoplasty|phalloplasty|metoidioplasty|transgender/i,
};

export interface PoolHint {
  pool?: PoolId;
  basket?: boolean;
}

/**
 * Pools for a study. A pool hit is kept when the study's own titles, conditions
 * or keywords name that topic; if none of the hinted pools is named (registry
 * synonym expansion), the hinted pools are kept as retrieved.
 */
export function classifyPools(hints: PoolHint[], input: ClassifyInput): PoolId[] {
  const text = [...input.titles, ...input.conditions, ...input.keywords];
  const hinted = [...new Set(hints.filter(h => h.pool).map(h => h.pool as PoolId))];
  const named = hinted.filter(p => text.some(t => POOL_TEXT[p].test(t)));
  const out = new Set<PoolId>(named.length ? named : hinted);
  return POOL_ORDER.filter(p => out.has(p));
}
