// ─────────────────────────────────────────────────────────
//  WARWIKI — Unified surgical lineage
//  Merges the curated profiles in surgeons.ts with the GURS fellowship
//  lineage adapted from Lee Zhao's Reconstructive Urology Fellowship
//  Family Tree (gurs-lineage.generated.json, built by
//  scripts/genealogy/build-lineage.js).
//
//  Precedence: a profile's own mentorId wins; then a profile that lists the
//  person in traineeIds; then the fellowship-tree mentor. Every person has
//  at most one parent, so nobody appears twice in a tree.
// ─────────────────────────────────────────────────────────

import { SURGEONS, DYNASTIES, getSubspecialty, type Surgeon, type Subspecialty, type Dynasty } from './surgeons';
import lineageData from './gurs-lineage.generated.json';

export interface LineageFellow {
  name: string;
  mentor?: string;
  coMentor?: string;
  year?: number;
  intl?: boolean;
  position?: string;
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
}

export const LINEAGE_SOURCE = {
  url: lineageData.source,
  compiledBy: lineageData.compiledBy,
  retrieved: lineageData.retrieved,
};

const FELLOWS = lineageData.fellows as LineageFellow[];

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
const fellowIdByName = new Map<string, string>();

for (const s of SURGEONS) {
  nodes.set(s.id, { id: s.id, name: s.name, subspecialty: getSubspecialty(s), path: s.path, surgeon: s });
}

for (const f of FELLOWS) {
  const s = matchSurgeon(f.name);
  let node = s ? nodes.get(s.id)! : undefined;
  if (!node) {
    let id = slugify(f.name);
    while (nodes.has(id)) id += '-gurs';
    node = { id, name: f.name, subspecialty: 'GURS' };
    nodes.set(id, node);
  }
  if (f.year) node.year = f.year;
  if (f.position) node.position = f.position;
  fellowIdByName.set(f.name, node.id);
}

// Parent precedence: own mentorId → listed in a profile's traineeIds → fellowship tree.
const listedBy = new Map<string, string>();
for (const s of SURGEONS) for (const t of s.traineeIds ?? []) if (!listedBy.has(t)) listedBy.set(t, s.id);

for (const node of nodes.values()) {
  node.mentorId = node.surgeon?.mentorId ?? listedBy.get(node.id);
}
for (const f of FELLOWS) {
  const node = nodes.get(fellowIdByName.get(f.name)!)!;
  if (!node.mentorId && f.mentor) node.mentorId = fellowIdByName.get(f.mentor);
  if (f.coMentor) {
    const co = fellowIdByName.get(f.coMentor);
    if (co && co !== node.mentorId) node.coMentorId = co;
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

// ── Children, ordered: curated traineeIds first, then by fellowship year ──
const children = new Map<string, LineageNode[]>();
for (const node of nodes.values()) {
  if (!node.mentorId) continue;
  const list = children.get(node.mentorId) ?? [];
  list.push(node);
  children.set(node.mentorId, list);
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
  return LINEAGE.filter(n => n.subspecialty === sub);
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
  const curated = DYNASTIES.filter(d => (d.subspecialty ?? 'GURS') === sub && nodes.has(d.rootId));
  const covered = new Set(curated.map(d => d.rootId));
  const others = lineageBySubspecialty(sub)
    .filter(n => !n.mentorId && !covered.has(n.id) && childrenOf(n.id).length > 0)
    .sort((a, b) => buildLineageTree(b.id).size - buildLineageTree(a.id).size);
  const schools = curated.map(d => ({ dynasty: d, rootIds: [d.rootId] }));
  if (others.length) {
    schools.push({
      dynasty: { id: `other-${sub.toLowerCase()}`, label: 'Other lineages', rootId: others[0].id, color: '#64748b', subspecialty: sub },
      rootIds: others.map(n => n.id),
    });
  }
  return schools;
}
