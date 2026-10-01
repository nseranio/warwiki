import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { type Subspecialty } from '../data/surgeons';
import { buildLineageTree, lineageSchools, type LineageTree } from '../data/lineage';

const PAGE_BASE = '/docs/roots/surgeons/';

// ── Recursive collapsible node ───────────────────────────
function TreeNodeComp({
  tree,
  dynastyColor,
  depth,
  expanded,
  toggle,
}: {
  tree: LineageTree;
  dynastyColor: string;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
}) {
  const n = tree.node;
  const hasChildren = tree.children.length > 0;
  const open = hasChildren && expanded.has(n.id);
  const flag = n.surgeon?.countryFlag;

  return (
    <div className="vt-node">
      <div className="vt-row">
        {Array.from({ length: depth }).map((_, i) => (
          <div key={i} className="vt-indent" />
        ))}
        {depth > 0 && <div className="vt-elbow" style={{ borderColor: dynastyColor + '80' }} />}
        {hasChildren ? (
          <button
            type="button"
            className="vt-toggle"
            aria-expanded={open}
            aria-label={`${open ? 'Collapse' : 'Expand'} trainees of ${n.name}`}
            onClick={() => toggle(n.id)}
          >
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="vt-toggle vt-toggle--leaf" aria-hidden="true" />
        )}
        {n.path ? (
          <a
            href={`${PAGE_BASE}${n.path}`}
            className={`vt-name${depth === 0 ? ' vt-name--root' : ''}`}
            style={depth === 0 ? { color: dynastyColor } : undefined}
          >
            {flag && <span className="vt-flag">{flag}</span>}
            {n.name}
          </a>
        ) : (
          <span className={`vt-name vt-name--plain${depth === 0 ? ' vt-name--root' : ''}`}>{n.name}</span>
        )}
        {n.year && <span className="vt-year">{n.year}</span>}
        {hasChildren && !open && <span className="vt-count">+{tree.size - 1}</span>}
      </div>

      {open && (
        <div className="vt-children">
          {tree.children.map(child => (
            <TreeNodeComp
              key={child.node.id}
              tree={child}
              dynastyColor={dynastyColor}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function collectParents(tree: LineageTree, out: string[] = []): string[] {
  if (tree.children.length) {
    out.push(tree.node.id);
    tree.children.forEach(c => collectParents(c, out));
  }
  return out;
}

// ── Main component ────────────────────────────────────────
export default function SurgeonTree({ subspecialty = 'GURS' }: { subspecialty?: Subspecialty } = {}) {
  const schools = useMemo(() => lineageSchools(subspecialty), [subspecialty]);
  const [activeId, setActiveId] = useState(schools[0]?.dynasty.id ?? '');

  useEffect(() => {
    if (schools.length && !schools.some(s => s.dynasty.id === activeId)) {
      setActiveId(schools[0].dynasty.id);
    }
  }, [schools, activeId]);

  const school = schools.find(s => s.dynasty.id === activeId) ?? schools[0];
  const trees = useMemo(() => (school ? school.rootIds.map(id => buildLineageTree(id)) : []), [school]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Each school opens with its root(s) expanded, so first-generation trainees show.
  useEffect(() => {
    setExpanded(new Set(trees.map(t => t.node.id)));
  }, [trees]);

  const toggle = useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (!school) {
    return (
      <div className="vt-wrapper">
        <div className="vt-empty">No lineages have been mapped for this subspecialty.</div>
      </div>
    );
  }

  const total = trees.reduce((n, t) => n + t.size, 0);
  const allParents = trees.flatMap(t => collectParents(t));
  const allOpen = allParents.every(id => expanded.has(id));

  return (
    <div className="vt-wrapper">
      <div className="sl-dynasty-bar">
        <span className="sl-dynasty-label">School:</span>
        <div className="sl-dynasty-tabs">
          {schools.map(({ dynasty: d }) => (
            <button
              key={d.id}
              className={`sl-dynasty-tab${school.dynasty.id === d.id ? ' sl-dynasty-tab--active' : ''}`}
              style={school.dynasty.id === d.id ? { background: d.color, borderColor: d.color } : undefined}
              onClick={() => setActiveId(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="vt-toolbar">
        <span className="vt-total">{total} surgeons</span>
        <button
          type="button"
          className="vt-expand-all"
          onClick={() => setExpanded(new Set(allOpen ? trees.map(t => t.node.id) : allParents))}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="vt-tree">
        {trees.map(t => (
          <TreeNodeComp
            key={t.node.id}
            tree={t}
            dynastyColor={school.dynasty.color}
            depth={0}
            expanded={expanded}
            toggle={toggle}
          />
        ))}
      </div>

      <p className="sl-tree-hint">Years are fellowship completion. Linked names have a profile page.</p>
    </div>
  );
}
