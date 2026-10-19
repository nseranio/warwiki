export type Area = 'female-sui' | 'oab' | 'prolapse' | 'male-sui' | 'bph' | 'stricture' | 'sexual-medicine' | 'fistula' | 'bowel' | 'infection' | 'diversion' | 'perioperative';
export type Verdict = 'positive' | 'negative' | 'mixed' | 'noninferior' | 'inconclusive' | 'descriptive';
export type ResultRole = 'primary' | 'key-secondary' | 'secondary' | 'exploratory' | 'descriptive';
export type ReportKind = 'primary' | 'updated' | 'final-os' | 'pro' | 'biomarker' | 'secondary' | 'post-hoc' | 'correction' | 'abstract';
export type RelationType = 'builds-on' | 'confirms' | 'conflicts' | 'supersedes' | 'parallel' | 'extends';

export interface Effect {
  type: 'HR' | 'RR' | 'OR' | 'difference' | 'none';
  value?: number;
  ci?: [number, number];
  ciLevel?: string;
  p?: string;
}
export interface Result {
  endpoint: string;
  role: ResultRole;
  measure: string;
  values?: Record<string, string>;
  effect?: Effect;
  met?: boolean | 'not-tested' | null;
  note?: string;
  locator: string;
}
export interface Harm {
  label: string;
  values?: Record<string, string>;
  locator: string;
  note?: string;
}
export interface Fact {
  label: string;
  value?: string;
  values?: Record<string, string>;
  locator: string;
  note?: string;
}
export interface Report {
  id: string;
  kind: ReportKind;
  label: string;
  published: string;
  dateApprox?: boolean;
  dateLocator?: string;
  cutoff: string | null;
  citation: string;
  doi: string | null;
  pmid: string | null;
  noDoi?: string;
  followUp: string;
  followUpLocator?: string;
  results: Result[];
  harms: Harm[];
  delivery: Fact[];
  source: {file: string | null; checked: string; level?: 'full-text' | 'abstract'};
}
export interface Relation {
  type: RelationType;
  target: string;
  note: string;
}
export interface Trial {
  id: string;
  name: string;
  aliases: string[];
  nct: string | null;
  registry?: string;
  area: Area[];
  decisions: {id: string; lane: string}[];
  question: string;
  design: {
    phase: string;
    randomized: boolean;
    blinding: string;
    type: 'superiority' | 'noninferiority' | 'single-arm' | 'cohort' | 'diagnostic';
    n: number;
    arms: {key: string; label: string; n?: number; role: 'experimental' | 'control' | 'single'}[];
    population?: string;
    description?: string;
    locator?: string;
  };
  verdict: Verdict;
  verdictNote: string;
  /** Bottom line shown first on the trial page and on decision timelines: what was compared (agents named) and what it showed. */
  takeaway: string;
  reports: Report[];
  relations: Relation[];
  page: string | null;
  status: {sourceRead: 'full-text' | 'abstract' | 'none'; claimsChecked: string | null; clinicalReview: {by: string; date: string} | null};
  legacy?: Record<string, unknown>;
}
export interface Decision {
  id: string;
  area: Area;
  title: string;
  question: string;
  page: string | null;
  lanes: {id: string; label: string}[];
  compare: string[];
}
export interface Event {
  id: string;
  date: string;
  dateApprox?: boolean;
  kind: 'regulatory' | 'guideline' | 'practice';
  body: string;
  title: string;
  decisions: string[];
  trials: string[];
  url?: string;
  privateLocator?: string;
  checked: string;
  version?: string;
  statement?: string;
}
