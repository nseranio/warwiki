// ─────────────────────────────────────────────────────────
//  WARWIKI — Unified surgical lineage
//  Merges the curated profiles in surgeons.ts with two fellowship lineages:
//  GURS, adapted from Lee Zhao's Reconstructive Urology Fellowship Family
//  Tree (gurs-lineage.generated.json, scripts/genealogy/build-lineage.js),
//  and URPS, from WARWIKI's own research (urps-lineage.generated.json,
//  scripts/genealogy/build-urps-lineage.js).
//
//  Precedence: a profile's own mentorId wins; then a profile that lists the
//  person in traineeIds; then the fellowship-tree mentor. Every person has
//  at most one parent, so nobody appears twice in a tree. A fellowship-tree
//  mentor from the other subspecialty is kept as crossMentorId rather than
//  as the parent, so each subspecialty's schools stay within its own tab.
// ─────────────────────────────────────────────────────────

import { SURGEONS, DYNASTIES, getSubspecialty, type Surgeon, type Subspecialty, type Dynasty } from './surgeons';
import lineageData from './gurs-lineage.generated.json';
import urpsLineageData from './urps-lineage.generated.json';
import corrections from './lineage-corrections.json';

export interface LineageFellow {
  name: string;
  mentor?: string;
  coMentor?: string;
  year?: number;
  intl?: boolean;
  position?: string;
  /** Fellowship program, when known (URPS). */
  program?: string;
}

export interface LineageNode {
  id: string;
  name: string;
  subspecialty: Subspecialty;
  /** Profile path under /docs/roots/surgeons/, when a profile page exists. */
  path?: string;
  surgeon?: Surgeon;
  mentorId?: string;
  coMentorId?: string;
  /** Fellowship completion year (fellowship tree). */
  year?: number;
  /** Latest confirmed position (fellowship tree). */
  position?: string;
  /** Fellowship program (URPS tree), shown when no mentor is recorded. */
  program?: string;
  /** Fellowship mentor from the other subspecialty's tree (not used as the parent). */
  crossMentorId?: string;
}

export const LINEAGE_SOURCE = {
  url: lineageData.source,
  compiledBy: lineageData.compiledBy,
  retrieved: lineageData.retrieved,
};

const DATASETS: { sub: Subspecialty; fellows: LineageFellow[] }[] = [
  { sub: 'GURS', fellows: lineageData.fellows as LineageFellow[] },
  { sub: 'URPS', fellows: urpsLineageData.fellows as LineageFellow[] },
];
const FELLOWS = DATASETS.flatMap(d => d.fellows);

// ── Name matching ────────────────────────────────────────
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function nameTokens(name: string): string[] {
  return fold(name)
    .replace(/\b(jr|sr|md)\b\.?|\b(ii|iii|iv)\b/g, ' ')
    .replace(/[^a-z\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
}

/** "first last" ignoring middle names and initials. */
function shortKey(name: string): string {
  const t = nameTokens(name);
  return t.length ? `${t[0]} ${t[t.length - 1]}` : '';
}

/** "f last" for nickname tolerance (Steven / Steve). */
function initialKey(name: string): string {
  const t = nameTokens(name);
  return t.length ? `${t[0][0]} ${t[t.length - 1]}` : '';
}

function slugify(name: string): string {
  return nameTokens(name).join('-');
}

function uniqueIndex<T>(items: T[], key: (t: T) => string): Map<string, T> {
  const seen = new Map<string, T | null>();
  for (const it of items) {
    const k = key(it);
    if (!k) continue;
    seen.set(k, seen.has(k) ? null : it);
  }
  return new Map([...seen].filter(([, v]) => v !== null) as [string, T][]);
}

const byShort = uniqueIndex(SURGEONS, s => shortKey(s.name));
const byInitial = uniqueIndex(SURGEONS, s => initialKey(s.name));
const fellowInitialCounts = new Map<string, number>();
for (const f of FELLOWS) fellowInitialCounts.set(initialKey(f.name), (fellowInitialCounts.get(initialKey(f.name)) ?? 0) + 1);

function matchSurgeon(fellowName: string): Surgeon | undefined {
  const exact = byShort.get(shortKey(fellowName));
  if (exact) return exact;
  const k = initialKey(fellowName);
  return fellowInitialCounts.get(k) === 1 ? byInitial.get(k) : undefined;
}

// ── Build nodes ──────────────────────────────────────────
const nodes = new Map<string, LineageNode>();
// Fellow name -> node id, per subspecialty (the same name can be two people, one in each tree).
const fellowIdByName: Record<Subspecialty, Map<string, string>> = { GURS: new Map(), URPS: new Map() };

for (const s of SURGEONS) {
  nodes.set(s.id, { id: s.id, name: s.name, subspecialty: getSubspecialty(s), path: s.path, surgeon: s });
}

for (const { sub, fellows } of DATASETS) {
  for (const f of fellows) {
    const s = matchSurgeon(f.name);
    let node = s && (sub === 'GURS' || getSubspecialty(s) === sub || !fellowIdByName.GURS.has(f.name)) ? nodes.get(s.id)! : undefined;
    if (!node) {
      let id = slugify(f.name);
      while (nodes.has(id)) id += `-${sub.toLowerCase()}`;
      node = { id, name: f.name, subspecialty: sub };
      nodes.set(id, node);
    }
    if (f.year && !node.year) node.year = f.year;
    if (f.position && !node.position) node.position = f.position;
    if (f.program && !node.program) node.program = f.program;
    fellowIdByName[sub].set(f.name, node.id);
  }
}

/** Resolve a fellowship-tree mentor name: same tree first, then any profile, then the other tree. */
function resolveMentor(name: string, sub: Subspecialty): string | undefined {
  const other: Subspecialty = sub === 'GURS' ? 'URPS' : 'GURS';
  return fellowIdByName[sub].get(name) ?? matchSurgeon(name)?.id ?? fellowIdByName[other].get(name);
}

// Documented corrections to the fellowship-tree year and position.
for (const [id, c] of Object.entries(corrections as Record<string, { year?: number; position?: string }>)) {
  const node = nodes.get(id);
  if (!node || id.startsWith('_')) continue;
  if (c.year) node.year = c.year;
  if (c.position) node.position = c.position;
}

// Parent precedence: own mentorId → listed in a profile's traineeIds → fellowship tree.
const listedBy = new Map<string, string>();
for (const s of SURGEONS) for (const t of s.traineeIds ?? []) if (!listedBy.has(t)) listedBy.set(t, s.id);

for (const node of nodes.values()) {
  node.mentorId = node.surgeon?.mentorId ?? listedBy.get(node.id);
}
for (const { sub, fellows } of DATASETS) {
  for (const f of fellows) {
    const node = nodes.get(fellowIdByName[sub].get(f.name)!)!;
    if (!node.mentorId && f.mentor) {
      const m = resolveMentor(f.mentor, sub);
      if (m && nodes.get(m)!.subspecialty === node.subspecialty) node.mentorId = m;
      else if (m && m !== node.id) node.crossMentorId = m;
    }
    if (f.coMentor) {
      const co = resolveMentor(f.coMentor, sub);
      if (co && co !== node.mentorId && co !== node.id && nodes.get(co)!.subspecialty === node.subspecialty) node.coMentorId = co;
    }
  }
}

// Break any cycle the merge could create.
for (const node of nodes.values()) {
  const seen = new Set<string>([node.id]);
  let cur = node.mentorId ? nodes.get(node.mentorId) : undefined;
  while (cur) {
    if (seen.has(cur.id)) { node.mentorId = undefined; break; }
    seen.add(cur.id);
    cur = cur.mentorId ? nodes.get(cur.mentorId) : undefined;
  }
}

// ── Display: profiled surgeons only ──────────────────────
// While true, the tree, directory and trainee lists show only surgeons with a
// profile page. Each one hangs under its nearest profiled ancestor, so lines
// stay connected. The full lineage data is kept; set to false to show everyone.
export const PROFILES_ONLY = true;

const isVisible = (n: LineageNode) => !PROFILES_ONLY || Boolean(n.path);

/** Nearest visible ancestor (the mentor itself when it is visible). */
function visibleMentorId(node: LineageNode): string | undefined {
  let cur = node.mentorId ? nodes.get(node.mentorId) : undefined;
  while (cur && !isVisible(cur)) cur = cur.mentorId ? nodes.get(cur.mentorId) : undefined;
  return cur?.id;
}

/** True when ancestorId is on the full (unfiltered) mentor chain above node. */
function descendsFrom(node: LineageNode, ancestorId: string): boolean {
  let cur = node.mentorId ? nodes.get(node.mentorId) : undefined;
  while (cur) {
    if (cur.id === ancestorId) return true;
    cur = cur.mentorId ? nodes.get(cur.mentorId) : undefined;
  }
  return false;
}

// ── Children, ordered: curated traineeIds first, then by fellowship year ──
const children = new Map<string, LineageNode[]>();
for (const node of nodes.values()) {
  if (!isVisible(node)) continue;
  const parent = visibleMentorId(node);
  if (!parent) continue;
  const list = children.get(parent) ?? [];
  list.push(node);
  children.set(parent, list);
}
for (const [id, list] of children) {
  const curated = nodes.get(id)?.surgeon?.traineeIds ?? [];
  const rank = (n: LineageNode) => {
    const i = curated.indexOf(n.id);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  list.sort((a, b) => rank(a) - rank(b) || (a.year ?? 9999) - (b.year ?? 9999) || a.name.localeCompare(b.name));
}

export const LINEAGE: LineageNode[] = [...nodes.values()];
export const LINEAGE_BY_ID = nodes;

export function childrenOf(id: string): LineageNode[] {
  return children.get(id) ?? [];
}

export function lineageBySubspecialty(sub: Subspecialty): LineageNode[] {
  return LINEAGE.filter(n => n.subspecialty === sub && isVisible(n));
}

export interface LineageTree {
  node: LineageNode;
  children: LineageTree[];
  size: number;
}

export function buildLineageTree(id: string, seen = new Set<string>()): LineageTree {
  seen.add(id);
  const kids = childrenOf(id).filter(c => !seen.has(c.id)).map(c => buildLineageTree(c.id, seen));
  return { node: nodes.get(id)!, children: kids, size: 1 + kids.reduce((n, k) => n + k.size, 0) };
}

/**
 * Schools shown as tabs: the curated dynasties, plus one "Other lineages"
 * entry gathering any remaining root that has trainees.
 */
export function lineageSchools(sub: Subspecialty): { dynasty: Dynasty; rootIds: string[] }[] {
  const visible = lineageBySubspecialty(sub);
  const topLevel = visible.filter(n => !visibleMentorId(n));
  // A school whose founder is hidden starts from its highest visible members.
  const rootsOf = (rootId: string) => {
    const root = nodes.get(rootId)!;
    return isVisible(root) ? [rootId] : topLevel.filter(n => descendsFrom(n, rootId)).map(n => n.id);
  };
  const curated = DYNASTIES
    .filter(d => (d.subspecialty ?? 'GURS') === sub && nodes.has(d.rootId))
    .map(d => ({ dynasty: d, rootIds: rootsOf(d.rootId) }))
    // Skip a school that would show a single surgeon.
    .filter(s => s.rootIds.reduce((n, id) => n + buildLineageTree(id).size, 0) > 1);
  const covered = new Set(curated.flatMap(s => s.rootIds));
  const others = topLevel
    .filter(n => !covered.has(n.id) && childrenOf(n.id).length > 0)
    .sort((a, b) => buildLineageTree(b.id).size - buildLineageTree(a.id).size);
  const schools = curated.map(s => ({ dynasty: s.dynasty, rootIds: s.rootIds }));
  if (others.length) {
    schools.push({
      dynasty: { id: `other-${sub.toLowerCase()}`, label: 'Other lineages', rootId: others[0].id, color: '#64748b', subspecialty: sub },
      rootIds: others.map(n => n.id),
    });
  }
  return schools;
}
