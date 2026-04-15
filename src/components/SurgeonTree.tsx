import React, { useState, useMemo, useEffect } from 'react';
import { DYNASTIES, SURGEONS_BY_ID, buildTree, dynastiesBySubspecialty, type TreeNode, type Surgeon, type Subspecialty } from '../data/surgeons';

const PAGE_BASE = '/docs/roots/surgeons/';

// ── Recursive vertical text node ─────────────────────────
function TreeNodeComp({
  node,
  dynastyColor,
  depth,
}: {
  node: TreeNode;
  dynastyColor: string;
  depth: number;
}) {
  const s = node.surgeon;
  const hasChildren = node.children.length > 0;

  return (
    <div className="vt-node">
      {/* Name row */}
      <div className="vt-row">
        {/* Indent guides */}
        {Array.from({ length: depth }).map((_, i) => (
          <div key={i} className="vt-indent" />
        ))}
        {/* Connector elbow */}
        {depth > 0 && (
          <div className="vt-elbow" style={{ borderColor: dynastyColor + '80' }} />
        )}
        <a
          href={`${PAGE_BASE}${s.id}`}
          className={`vt-name${depth === 0 ? ' vt-name--root' : ''}`}
          style={depth === 0 ? { color: dynastyColor } : undefined}
        >
          {s.countryFlag && <span className="vt-flag">{s.countryFlag}</span>}
          {s.name}
        </a>
      </div>

      {/* Children */}
      {hasChildren && (
        <div className="vt-children">
          {node.children.map(child => (
            <TreeNodeComp
              key={child.surgeon.id}
              node={child}
              dynastyColor={dynastyColor}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────
export default function SurgeonTree({ subspecialty }: { subspecialty?: Subspecialty } = {}) {
  const dynasties = useMemo(
    () => (subspecialty ? dynastiesBySubspecialty(subspecialty) : DYNASTIES),
    [subspecialty],
  );
  const [activeDynasty, setActiveDynasty] = useState(dynasties[0]?.id ?? '');

  // Reset selection when the available dynasties change (e.g., subspecialty toggle)
  useEffect(() => {
    if (dynasties.length && !dynasties.some(d => d.id === activeDynasty)) {
      setActiveDynasty(dynasties[0].id);
    }
  }, [dynasties, activeDynasty]);

  if (dynasties.length === 0) {
    return (
      <div className="vt-wrapper">
        <div className="vt-empty">
          No surgical lineages have been added for this subspecialty yet. Check back soon.
        </div>
      </div>
    );
  }

  const dynasty = dynasties.find(d => d.id === activeDynasty) ?? dynasties[0];
  const tree = buildTree(dynasty.rootId);

  return (
    <div className="vt-wrapper">
      {/* Compact dynasty selector */}
      <div className="sl-dynasty-bar">
        <span className="sl-dynasty-label">School:</span>
        <div className="sl-dynasty-tabs">
          {dynasties.map(d => (
            <button
              key={d.id}
              className={`sl-dynasty-tab${dynasty.id === d.id ? ' sl-dynasty-tab--active' : ''}`}
              style={dynasty.id === d.id ? { background: d.color, borderColor: d.color } : undefined}
              onClick={() => setActiveDynasty(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="vt-tree">
        <TreeNodeComp node={tree} dynastyColor={dynasty.color} depth={0} />
      </div>

      <p className="sl-tree-hint">Names link to individual surgeon profiles</p>
    </div>
  );
}
