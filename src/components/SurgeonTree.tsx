import React, { useState } from 'react';
import { DYNASTIES, SURGEONS_BY_ID, buildTree, type TreeNode, type Surgeon } from '../data/surgeons';

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
export default function SurgeonTree() {
  const [activeDynasty, setActiveDynasty] = useState(DYNASTIES[0].id);
  const dynasty = DYNASTIES.find(d => d.id === activeDynasty)!;
  const tree = buildTree(dynasty.rootId);

  return (
    <div className="vt-wrapper">
      {/* Compact dynasty selector */}
      <div className="sl-dynasty-bar">
        <span className="sl-dynasty-label">School:</span>
        <div className="sl-dynasty-tabs">
          {DYNASTIES.map(d => (
            <button
              key={d.id}
              className={`sl-dynasty-tab${activeDynasty === d.id ? ' sl-dynasty-tab--active' : ''}`}
              style={activeDynasty === d.id ? { background: d.color, borderColor: d.color } : undefined}
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
