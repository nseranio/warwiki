/** Disease-state detail fields for the WARWIKI finder (kept in memory only). */
import React from 'react';
import clsx from 'clsx';
import type {ClinicalContext, DeepState, OabContext, PoolId, ProlapseContext, StrictureContext, SuiContext} from '@site/src/lib/clinical-trials/types';
import {DEEP_STATES, POOL_LABELS} from '@site/src/lib/clinical-trials/pools';
import styles from './styles.module.css';

export type State = DeepState | 'any';

export interface DeepContexts {
  oab: OabContext;
  sui: SuiContext;
  stricture: StrictureContext;
  prolapse: ProlapseContext;
}

export const DEEP_DEFAULTS: DeepContexts = {
  oab: {etiology: 'unknown', sex: 'unknown', line: 'unknown'},
  sui: {sex: 'unknown', priorSurgery: 'unknown', radiation: 'unknown'},
  stricture: {location: 'unknown', prior: 'unknown', lichen: 'unknown'},
  prolapse: {compartment: 'unknown', uterus: 'unknown', priorRepair: 'unknown', stage: 'unknown'},
};

export const STATE_LABELS: Record<State, string> = {
  any: 'Any',
  oab: 'OAB / urgency',
  sui: 'Stress incontinence',
  stricture: 'Urethral stricture',
  prolapse: 'Prolapse',
};

type Opt = {value: string; label: string};
const NR: Opt = {value: 'unknown', label: 'Not recorded'};

export const FIELDS: Record<DeepState, {key: string; label: string; options: Opt[]}[]> = {
  oab: [
    {key: 'etiology', label: 'Type', options: [NR, {value: 'idiopathic', label: 'Idiopathic'}, {value: 'neurogenic', label: 'Neurogenic'}]},
    {key: 'sex', label: 'Sex', options: [NR, {value: 'female', label: 'Female'}, {value: 'male', label: 'Male'}]},
    {key: 'line', label: 'Treatment so far', options: [NR, {value: 'none', label: 'None'}, {value: 'behavioral', label: 'Behavioral only'}, {value: 'medication', label: 'Medication failed or not tolerated'}, {value: 'thirdLine', label: 'Botulinum toxin, SNM or PTNS'}]},
  ],
  sui: [
    {key: 'sex', label: 'Sex', options: [NR, {value: 'female', label: 'Female'}, {value: 'male', label: 'Male'}]},
    {key: 'priorSurgery', label: 'Prior anti-incontinence surgery', options: [NR, {value: 'none', label: 'None'}, {value: 'prior', label: 'Sling, AUS, bulking or colposuspension'}]},
    {key: 'radiation', label: 'Pelvic radiation', options: [NR, {value: 'no', label: 'No'}, {value: 'yes', label: 'Yes'}]},
  ],
  stricture: [
    {key: 'location', label: 'Location', options: [NR, {value: 'meatal', label: 'Meatal'}, {value: 'penile', label: 'Penile'}, {value: 'bulbar', label: 'Bulbar'}, {value: 'posterior', label: 'Posterior (including PFUI)'}]},
    {key: 'prior', label: 'Prior treatment', options: [NR, {value: 'none', label: 'None'}, {value: 'endoscopic', label: 'Dilation or urethrotomy'}, {value: 'urethroplasty', label: 'Urethroplasty'}]},
    {key: 'lichen', label: 'Lichen sclerosus', options: [NR, {value: 'no', label: 'No'}, {value: 'yes', label: 'Yes'}]},
  ],
  prolapse: [
    {key: 'compartment', label: 'Main compartment', options: [NR, {value: 'anterior', label: 'Anterior'}, {value: 'apical', label: 'Apical'}, {value: 'posterior', label: 'Posterior'}]},
    {key: 'stage', label: 'POP-Q stage', options: [NR, {value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}, {value: '4', label: '4'}]},
    {key: 'uterus', label: 'Uterus', options: [NR, {value: 'present', label: 'Present'}, {value: 'absent', label: 'Prior hysterectomy'}]},
    {key: 'priorRepair', label: 'Prior prolapse repair', options: [NR, {value: 'none', label: 'None'}, {value: 'prior', label: 'Yes'}]},
  ],
};

export function statesFor(pool: PoolId | 'all'): DeepState[] {
  return pool === 'all' ? [] : DEEP_STATES[pool] ?? [];
}

/** Short words for the Disease chip, e.g. "female, medication failed". */
export function bits(state: DeepState, deep: DeepContexts): string[] {
  const ctx = deep[state] as unknown as Record<string, string>;
  return FIELDS[state].map(f => {
    const v = ctx[f.key];
    if (!v || v === 'unknown') return null;
    const label = f.options.find(o => o.value === v)?.label ?? v;
    if (f.key === 'stage') return `stage ${v}`;
    if (f.key === 'lichen') return v === 'yes' ? 'lichen sclerosus' : 'no LS';
    if (f.key === 'radiation') return v === 'yes' ? 'radiated' : 'no radiation';
    if (f.key === 'priorSurgery' || f.key === 'priorRepair') return v === 'prior' ? 'prior surgery' : 'no prior surgery';
    if (f.key === 'uterus') return v === 'present' ? 'uterus present' : 'post-hysterectomy';
    return label.toLowerCase();
  }).filter((x): x is string => !!x);
}

export function contextLabel(ctx: ClinicalContext, deep: DeepContexts): string | undefined {
  if (ctx.pool === 'all') return undefined;
  const parts = [POOL_LABELS[ctx.pool]];
  if (ctx.state && ctx.state !== 'any') {
    parts.push(STATE_LABELS[ctx.state]);
    const b = bits(ctx.state, deep);
    parts.push(b.length ? b.join(', ') : 'details not recorded');
  }
  return parts.join(' · ');
}

export function ContextFields({state, deep, onChange}: {state: DeepState; deep: DeepContexts; onChange: (next: DeepContexts) => void}) {
  const ctx = deep[state] as unknown as Record<string, string>;
  return (
    <div className={styles.contextBox}>
      <div className={styles.contextFields}>
        {FIELDS[state].map(f => {
          const id = `tf-${state}-${f.key}`;
          const value = ctx[f.key];
          return (
            <label key={f.key} className={styles.field} htmlFor={id}>
              <span className={styles.fieldLabel}>{f.label}</span>
              <select id={id} className={clsx(styles.select, value !== 'unknown' && styles.selectSet)} value={value}
                onChange={e => onChange({...deep, [state]: {...deep[state], [f.key]: e.target.value}})}>
                {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          );
        })}
      </div>
      <p className={styles.contextNote}>
        {state === 'oab' ? 'Many protocols define refractory OAB by named medications, doses and durations; choose "Medication failed" only after checking them. ' : ''}
        These choices stay on this page; they are not saved, sent or put in links.
      </p>
    </div>
  );
}
