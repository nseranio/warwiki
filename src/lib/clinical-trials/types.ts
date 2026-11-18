/**
 * Reconstructive & Functional Urology Trial Finder data model (WARWIKI).
 *
 * Five separate concepts are kept apart on purpose:
 *   overall study status (registry, whole study)
 *   site status (registry, one location; can be missing or disagree)
 *   cohort opening (unknown unless a source-specific confirmation exists)
 *   slot availability (never inferred from the registry)
 *   patient eligibility (study-team decision; the finder only gives relevance)
 */

export type RegistryStatus =
  | 'RECRUITING'
  | 'NOT_YET_RECRUITING'
  | 'ENROLLING_BY_INVITATION'
  | 'ACTIVE_NOT_RECRUITING'
  | 'SUSPENDED'
  | 'TEMPORARILY_NOT_AVAILABLE'
  | 'COMPLETED'
  | 'TERMINATED'
  | 'WITHDRAWN'
  | 'WITHHELD'
  | 'UNKNOWN'
  | string;

/** Registry date as published: `YYYY-MM-DD` or `YYYY-MM` (precision kept), plus ACTUAL/ESTIMATED. */
export interface RegistryDate {
  d: string;
  t?: string;
}

export type PoolId = 'continence' | 'pain' | 'urogyn' | 'stricture' | 'upper' | 'bph' | 'sexual' | 'gas';

/** Disease-setting tags derived from registry text (automated; never clinician review). */
export type SettingTag = 'oab' | 'sui' | 'neurogenic' | 'retention' | 'stricture' | 'prolapse';

/** Words the registry text uses; displayed as "registry text mentions", never used to exclude. */
export type TextSignal = 'female' | 'male' | 'neurogenic' | 'priorMeds' | 'thirdLine' | 'postProstatectomy' | 'priorAntiIncontinence' | 'radiation' | 'uterus' | 'hysterectomy' | 'lichen' | 'priorUrethroplasty' | 'recurrent';

export interface IndexSite {
  /** Facility name as registered. */
  f: string;
  c?: string;
  /** State abbreviation (or name if not a US state). */
  s?: string;
  z?: string;
  /** Site status; absent when the registry gives none. */
  st?: RegistryStatus;
  la?: number;
  lo?: number;
  /** Geocode note: 'zip' = coordinates from the site's ZIP centroid; 'bad' = registry point disagrees with the site's ZIP, distance withheld. */
  g?: 'zip' | 'bad';
  /** Site principal investigators named in the registry. */
  pi?: string[];
}

export interface IndexIntervention {
  n: string;
  ty?: string;
  o?: string[];
}

export interface IndexStudy {
  id: string;
  t: string;
  acr?: string;
  /** Other identifiers (cooperative-group numbers, sponsor protocol numbers). */
  ids?: string[];
  ph?: string[];
  type: string;
  pp?: string;
  st: RegistryStatus;
  upd?: RegistryDate;
  ver?: string;
  start?: RegistryDate;
  cond: string[];
  kw?: string[];
  iv: IndexIntervention[];
  sp?: string;
  pools: PoolId[];
  tags: SettingTag[];
  sig: TextSignal[];
  /** sha256 (first 16 hex) of the registry eligibility text exactly as retrieved. */
  eh?: string;
  sites: IndexSite[];
  nonUs?: number;
  /** Registry age groups (CHILD, ADULT, OLDER_ADULT). */
  ages?: string[];
  /** Overall officials (study chairs/PIs) named in the registry. */
  off?: string[];
  /** Has a central (study-level) contact. */
  cc?: boolean;
}

export interface PoolFile {
  schema: 1;
  version: string;
  pool: PoolId;
  studies: IndexStudy[];
}

export interface PoolManifestEntry {
  file: string;
  studies: number;
  sites: number;
  queries: {id: string; totalCount: number; retrieved: number}[];
}

export interface Manifest {
  schema: 1;
  version: string;
  queryVersion: string;
  source: {name: string; api: string; apiVersion?: string; dataTimestamp?: string};
  startedAt: string;
  refreshedAt: string;
  staleAfterHours: number;
  pools: Record<PoolId, PoolManifestEntry>;
  totals: {studies: number; sites: number};
  annotationChecks: {nct: string; cohort: string; state: 'current' | 'criteriaChanged' | 'passageMissing' | 'notInSnapshot'}[];
  limits: string[];
}

export interface Contact {
  name?: string;
  role?: string;
  phone?: string;
  ext?: string;
  email?: string;
}

export interface DetailSite extends IndexSite {
  country?: string;
  contacts?: Contact[];
}

export interface StudyDetail {
  schema: 1;
  /** Set only on live registry checks; snapshot detail files carry no timestamps so unchanged studies do not churn. */
  retrievedAt?: string;
  id: string;
  briefTitle: string;
  officialTitle?: string;
  acronym?: string;
  ids?: string[];
  summary?: string;
  status: {
    overall: RegistryStatus;
    whyStopped?: string;
    verified?: string;
    lastUpdatePosted?: RegistryDate;
    firstPosted?: RegistryDate;
    start?: RegistryDate;
    primaryCompletion?: RegistryDate;
    completion?: RegistryDate;
  };
  design: {type: string; phases?: string[]; allocation?: string; model?: string; purpose?: string; masking?: string; enrollment?: {count?: number; type?: string}};
  conditions: string[];
  keywords?: string[];
  arms?: {label: string; type?: string; description?: string; interventions?: string[]}[];
  interventions: {type?: string; name: string; description?: string; otherNames?: string[]}[];
  eligibility: {text?: string; sex?: string; minimumAge?: string; maximumAge?: string; healthyVolunteers?: boolean};
  eh?: string;
  sponsor?: string;
  collaborators?: string[];
  officials?: {name?: string; affiliation?: string; role?: string}[];
  central?: Contact[];
  sites: DetailSite[];
  /** Snapshot files: contacts by site key (facility|city|zip); `sites` is rebuilt from the index. */
  siteContacts?: Record<string, {contacts?: Contact[]; country?: string}>;
  nonUs?: number;
  documents?: {label: string; url: string}[];
}

/* ---------- Clinical context (kept in memory only; never persisted or put in a URL) ---------- */

export type Unknown = 'unknown';

export interface OabContext {
  etiology: 'idiopathic' | 'neurogenic' | Unknown;
  sex: 'female' | 'male' | Unknown;
  /** Highest treatment line already tried. */
  line: 'none' | 'behavioral' | 'medication' | 'thirdLine' | Unknown;
}

export interface SuiContext {
  sex: 'female' | 'male' | Unknown;
  /** Prior anti-incontinence surgery (sling, AUS, bulking, colposuspension). */
  priorSurgery: 'none' | 'prior' | Unknown;
  /** Prior pelvic radiation. */
  radiation: 'no' | 'yes' | Unknown;
}

export interface StrictureContext {
  location: 'meatal' | 'penile' | 'bulbar' | 'posterior' | Unknown;
  /** Most invasive prior treatment. */
  prior: 'none' | 'endoscopic' | 'urethroplasty' | Unknown;
  lichen: 'no' | 'yes' | Unknown;
}

export interface ProlapseContext {
  compartment: 'anterior' | 'apical' | 'posterior' | Unknown;
  uterus: 'present' | 'absent' | Unknown;
  priorRepair: 'none' | 'prior' | Unknown;
  stage: '1' | '2' | '3' | '4' | Unknown;
}

export type DeepState = 'oab' | 'sui' | 'stricture' | 'prolapse';

export interface ClinicalContext {
  pool: PoolId | 'all';
  state?: DeepState | 'any';
  oab?: OabContext;
  sui?: SuiContext;
  stricture?: StrictureContext;
  prolapse?: ProlapseContext;
}

/* ---------- Source-bound cohort annotations ---------- */

/** required: the cohort needs it; excluded: the cohort rules it out; allowed: either. */
/** checkExcluded: the cohort excludes part of it, or only recent use; never a hard exclusion. */
export type Requirement = 'required' | 'excluded' | 'allowed' | 'checkExcluded';

export interface OabRule {
  etiology?: 'idiopathic' | 'neurogenic';
  sex?: 'female' | 'male';
  /** Failure or intolerance of OAB medication. */
  medsFailed?: Requirement;
  /** Prior botulinum toxin, sacral neuromodulation or tibial nerve stimulation. */
  thirdLine?: Requirement;
}

export interface SuiRule {
  sex?: 'female' | 'male';
  priorSurgery?: Requirement;
  radiation?: Requirement;
}

export interface StrictureRule {
  locations?: ('meatal' | 'penile' | 'bulbar' | 'posterior')[];
  priorUrethroplasty?: Requirement;
  priorEndoscopic?: Requirement;
  lichen?: Requirement;
}

export interface ProlapseRule {
  compartments?: ('anterior' | 'apical' | 'posterior')[];
  /** required: uterus present; excluded: post-hysterectomy only. */
  uterus?: Requirement;
  priorRepair?: Requirement;
  minStage?: number;
}

export interface CohortAnnotation {
  label: string;
  /** What this cohort is, in plain words. */
  description: string;
  oab?: OabRule;
  sui?: SuiRule;
  stricture?: StrictureRule;
  prolapse?: ProlapseRule;
  /** Exact passage(s) from the registry eligibility text that support the rule. */
  passages: string[];
  /** Registry section the passage comes from. */
  section: string;
  /** Free text the registry gives about this cohort's own enrollment, if any. Default: unconfirmed. */
  openingNote?: string;
}

export interface StudyAnnotation {
  nct: string;
  /** Eligibility-text hash the annotation was checked against. */
  eh: string;
  /** Registry last-update-posted date of the record that was read. */
  sourceUpdate: string;
  reviewStatus: 'editor-checked' | 'clinician-reviewed';
  reviewer: string;
  reviewedOn: string;
  cohorts: CohortAnnotation[];
  /** Disease states the registry text places the study in but its eligibility text rules out. */
  notFor?: {state: DeepState; reason: string; passage: string}[];
  notes?: string[];
}

export type MatchOutcome = 'relevant' | 'clarify' | 'excluded' | 'unreviewed';

export interface CohortResult {
  label: string;
  description: string;
  outcome: Exclude<MatchOutcome, 'unreviewed'>;
  reasons: string[];
  unknowns: string[];
}

export interface StudyMatch {
  outcome: MatchOutcome;
  /** Annotation applied; false when absent or no longer current. */
  annotated: boolean;
  annotationState?: 'current' | 'criteriaChanged';
  reasons: string[];
  unknowns: string[];
  cohorts: CohortResult[];
}
