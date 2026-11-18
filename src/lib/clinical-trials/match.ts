/**
 * Disease-state relevance. Three outcomes for reviewed cohorts (relevant,
 * clarify, excluded) plus 'unreviewed' for registry text only. A hard
 * exclusion needs a current source-bound annotation AND a known input that
 * contradicts it. Missing input is never treated as compatible or incompatible.
 */
import type {
  ClinicalContext, CohortAnnotation, CohortResult, DeepState, IndexStudy, MatchOutcome, OabContext, OabRule,
  ProlapseContext, ProlapseRule, Requirement, StrictureContext, StrictureRule, StudyAnnotation, StudyMatch, SuiContext, SuiRule,
} from './types.ts';

type Part = {kind: 'ok' | 'clarify' | 'exclude'; text: string};
type Partial3 = {outcome: Exclude<MatchOutcome, 'unreviewed'>; reasons: string[]; unknowns: string[]};

const RANK: Record<MatchOutcome, number> = {relevant: 0, clarify: 1, unreviewed: 2, excluded: 3};

function combine(parts: Part[]): Partial3 {
  const reasons = parts.filter(p => p.kind !== 'clarify').map(p => p.text);
  const unknowns = parts.filter(p => p.kind === 'clarify').map(p => p.text);
  const outcome = parts.some(p => p.kind === 'exclude') ? 'excluded' : unknowns.length ? 'clarify' : 'relevant';
  return {outcome, reasons, unknowns};
}

/** A yes/no fact against a required/excluded rule. `known` undefined = not recorded. */
function requirement(parts: Part[], rule: Requirement | undefined, known: boolean | undefined, what: string): void {
  if (!rule || rule === 'allowed') return;
  if (rule === 'checkExcluded') {
    if (known === false) parts.push({kind: 'ok', text: `No ${what}.`});
    else parts.push({kind: 'clarify', text: `Cohort excludes some ${what}, or only recent use (see the quoted criteria): check which and when.`});
    return;
  }
  if (known === undefined) {
    parts.push({kind: 'clarify', text: `Cohort ${rule === 'required' ? 'requires' : 'excludes'} ${what}; not recorded.`});
  } else if (rule === 'required' && !known) {
    parts.push({kind: 'exclude', text: `Cohort requires ${what}; recorded as absent.`});
  } else if (rule === 'excluded' && known) {
    parts.push({kind: 'exclude', text: `Cohort excludes ${what}; recorded as present.`});
  } else {
    parts.push({kind: 'ok', text: rule === 'required' ? `${capital(what)}: present, as the cohort requires.` : `No ${what}, as the cohort requires.`});
  }
}

function choice<T extends string>(parts: Part[], allowed: T[] | T | undefined, value: T | 'unknown', what: string, label: (v: T) => string): void {
  if (!allowed || (Array.isArray(allowed) && !allowed.length)) return;
  const list = Array.isArray(allowed) ? allowed : [allowed];
  const want = list.map(label).join(' or ');
  if (value === 'unknown') parts.push({kind: 'clarify', text: `Cohort requires ${want} ${what}; ${what} not recorded.`});
  else if (!list.includes(value)) parts.push({kind: 'exclude', text: `Cohort requires ${want} ${what}; ${label(value)} recorded.`});
  else parts.push({kind: 'ok', text: `${capital(label(value))} ${what}, as the cohort requires.`});
}

function capital(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const id = <T extends string>(v: T) => v;

export function evaluateOab(rule: OabRule, ctx: OabContext): Partial3 {
  const parts: Part[] = [];
  choice(parts, rule.etiology, ctx.etiology, 'OAB', v => (v === 'neurogenic' ? 'neurogenic' : 'idiopathic'));
  choice(parts, rule.sex, ctx.sex, 'patients', id);
  const meds = ctx.line === 'unknown' ? undefined : ctx.line === 'medication' || ctx.line === 'thirdLine';
  requirement(parts, rule.medsFailed, meds, 'failure or intolerance of OAB medication');
  const third = ctx.line === 'unknown' ? undefined : ctx.line === 'thirdLine';
  requirement(parts, rule.thirdLine, third, 'prior botulinum toxin, sacral neuromodulation or tibial nerve stimulation');
  return combine(parts);
}

export function evaluateSui(rule: SuiRule, ctx: SuiContext): Partial3 {
  const parts: Part[] = [];
  choice(parts, rule.sex, ctx.sex, 'patients', id);
  requirement(parts, rule.priorSurgery, ctx.priorSurgery === 'unknown' ? undefined : ctx.priorSurgery === 'prior', 'prior anti-incontinence surgery');
  requirement(parts, rule.radiation, ctx.radiation === 'unknown' ? undefined : ctx.radiation === 'yes', 'prior pelvic radiation');
  return combine(parts);
}

const LOCATION: Record<string, string> = {meatal: 'meatal', penile: 'penile', bulbar: 'bulbar', posterior: 'posterior (including PFUI)'};

export function evaluateStricture(rule: StrictureRule, ctx: StrictureContext): Partial3 {
  const parts: Part[] = [];
  choice(parts, rule.locations, ctx.location, 'stricture', v => LOCATION[v] ?? v);
  requirement(parts, rule.priorUrethroplasty, ctx.prior === 'unknown' ? undefined : ctx.prior === 'urethroplasty', 'prior urethroplasty');
  // A prior urethroplasty does not say whether endoscopic treatment also happened.
  const endoscopic = ctx.prior === 'endoscopic' ? true : ctx.prior === 'none' ? false : undefined;
  requirement(parts, rule.priorEndoscopic, endoscopic, 'prior dilation or urethrotomy');
  requirement(parts, rule.lichen, ctx.lichen === 'unknown' ? undefined : ctx.lichen === 'yes', 'lichen sclerosus');
  return combine(parts);
}

const COMPARTMENT: Record<string, string> = {anterior: 'anterior', apical: 'apical', posterior: 'posterior'};

export function evaluateProlapse(rule: ProlapseRule, ctx: ProlapseContext): Partial3 {
  const parts: Part[] = [];
  choice(parts, rule.compartments, ctx.compartment, 'prolapse', v => COMPARTMENT[v] ?? v);
  requirement(parts, rule.uterus, ctx.uterus === 'unknown' ? undefined : ctx.uterus === 'present', 'a uterus (no prior hysterectomy)');
  requirement(parts, rule.priorRepair, ctx.priorRepair === 'unknown' ? undefined : ctx.priorRepair === 'prior', 'prior prolapse repair');
  if (rule.minStage) {
    if (ctx.stage === 'unknown') parts.push({kind: 'clarify', text: `Cohort requires POP-Q stage ${rule.minStage} or higher; stage not recorded.`});
    else if (Number(ctx.stage) < rule.minStage) parts.push({kind: 'exclude', text: `Cohort requires POP-Q stage ${rule.minStage} or higher; stage ${ctx.stage} recorded.`});
    else parts.push({kind: 'ok', text: `Stage ${ctx.stage}, within the cohort's stage range.`});
  }
  return combine(parts);
}

const DEFAULTS = {
  oab: {etiology: 'unknown', sex: 'unknown', line: 'unknown'} as OabContext,
  sui: {sex: 'unknown', priorSurgery: 'unknown', radiation: 'unknown'} as SuiContext,
  stricture: {location: 'unknown', prior: 'unknown', lichen: 'unknown'} as StrictureContext,
  prolapse: {compartment: 'unknown', uterus: 'unknown', priorRepair: 'unknown', stage: 'unknown'} as ProlapseContext,
};

function isDeep(state: ClinicalContext['state']): state is DeepState {
  return state === 'oab' || state === 'sui' || state === 'stricture' || state === 'prolapse';
}

function cohortApplies(c: CohortAnnotation, state: DeepState): boolean {
  return !!c[state];
}

function evaluateCohort(c: CohortAnnotation, state: DeepState, ctx: ClinicalContext): Partial3 {
  switch (state) {
    case 'oab': return evaluateOab(c.oab as OabRule, ctx.oab ?? DEFAULTS.oab);
    case 'sui': return evaluateSui(c.sui as SuiRule, ctx.sui ?? DEFAULTS.sui);
    case 'stricture': return evaluateStricture(c.stricture as StrictureRule, ctx.stricture ?? DEFAULTS.stricture);
    case 'prolapse': return evaluateProlapse(c.prolapse as ProlapseRule, ctx.prolapse ?? DEFAULTS.prolapse);
  }
}

/** Is the study listed under this disease state? */
export function inDiseaseState(study: IndexStudy, state: ClinicalContext['state'], annotation?: StudyAnnotation): boolean {
  if (!state || state === 'any') return true;
  if (annotation?.cohorts.some(c => cohortApplies(c, state))) return true;
  if (annotation?.notFor?.some(n => n.state === state)) return true;
  return study.tags.includes(state);
}

export const STATE_NAMES: Record<DeepState, string> = {
  oab: 'overactive bladder or urgency incontinence',
  sui: 'stress urinary incontinence',
  stricture: 'urethral stricture',
  prolapse: 'pelvic organ prolapse',
};

const SIGNAL_TEXT: Record<string, string> = {
  female: 'women',
  male: 'men',
  neurogenic: 'neurogenic bladder',
  priorMeds: 'prior OAB medication',
  thirdLine: 'botulinum toxin, sacral neuromodulation or tibial nerve stimulation',
  postProstatectomy: 'post-prostatectomy incontinence',
  priorAntiIncontinence: 'prior sling or artificial urinary sphincter',
  radiation: 'pelvic radiation',
  uterus: 'uterine preservation',
  hysterectomy: 'prior hysterectomy',
  lichen: 'lichen sclerosus',
  priorUrethroplasty: 'prior urethroplasty',
  recurrent: 'recurrent or persistent disease',
};

export function signalPhrases(study: IndexStudy): string[] {
  return study.sig.map(s => SIGNAL_TEXT[s]).filter(Boolean);
}

/**
 * Evaluate one study for the clinical context.
 * `annotationCurrent` is false when the eligibility text changed since review
 * or a quoted passage is gone; the annotation is then shown but not applied.
 */
export function evaluateStudy(study: IndexStudy, ctx: ClinicalContext, annotation?: StudyAnnotation, annotationCurrent = true): StudyMatch {
  const state = ctx.state;
  const signals = signalPhrases(study);
  const textReason = signals.length ? [`Registry eligibility text mentions ${signals.join(', ')}.`] : [];

  if (!isDeep(state)) return {outcome: 'unreviewed', annotated: false, reasons: textReason, unknowns: [], cohorts: []};

  const current = !!annotation && annotationCurrent && annotation.eh === study.eh;
  const ruledOut = current ? annotation?.notFor?.find(n => n.state === state) : undefined;
  if (ruledOut) return {outcome: 'excluded', annotated: true, annotationState: 'current', reasons: [ruledOut.reason], unknowns: [], cohorts: []};

  const cohorts = annotation?.cohorts.filter(c => cohortApplies(c, state)) ?? [];
  if (!annotation || !cohorts.length) {
    return {
      outcome: 'unreviewed',
      annotated: false,
      reasons: [`Registry text places this study in ${STATE_NAMES[state]}.`, ...textReason],
      unknowns: ['Cohort rules for this study have not been reviewed; read the eligibility criteria.'],
      cohorts: [],
    };
  }
  if (!current) {
    return {
      outcome: 'unreviewed',
      annotated: false,
      annotationState: 'criteriaChanged',
      reasons: textReason,
      unknowns: [`The eligibility text changed after the cohort review of ${annotation.reviewedOn}; cohort rules are not applied until rechecked.`],
      cohorts: [],
    };
  }
  const results: CohortResult[] = cohorts.map(c => ({label: c.label, description: c.description, ...evaluateCohort(c, state, ctx)}));
  const best = results.reduce((a, b) => (RANK[b.outcome] < RANK[a.outcome] ? b : a));
  return {outcome: best.outcome, annotated: true, annotationState: 'current', reasons: best.reasons, unknowns: best.unknowns, cohorts: results};
}

export const OUTCOME_ORDER: MatchOutcome[] = ['relevant', 'clarify', 'unreviewed', 'excluded'];
