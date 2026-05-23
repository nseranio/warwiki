import React, { useState } from 'react';

/**
 * DecisionTree — a small radio-button-driven, deterministic decision tree
 * for operative algorithms. The tree spec is JSON-shaped; every leaf is a
 * `result` with optional rationale and citation links back into WARWIKI.
 *
 * Designed for the algorithms currently buried in comparison tables:
 * segment selection in reoperative bowel harvest, urethroplasty technique
 * choice, NLUTD management ladder, etc.
 *
 * Usage in MDX:
 *
 *   import DecisionTree from '@site/src/components/DecisionTree';
 *   import { reoperativeBowelTree } from '@site/src/data/decisionTrees/reoperative-bowel';
 *
 *   <DecisionTree tree={reoperativeBowelTree} />
 */

export type DecisionNode = {
  question: string;
  options: Array<{
    label: string;
    next: DecisionNode | DecisionResult;
  }>;
};

export type DecisionResult = {
  result: string;
  rationale?: string;
  citations?: Array<{ label: string; href: string }>;
};

function isResult(node: DecisionNode | DecisionResult): node is DecisionResult {
  return (node as DecisionResult).result !== undefined;
}

export default function DecisionTree({ tree }: { tree: DecisionNode }) {
  const [path, setPath] = useState<Array<{ q: string; a: string }>>([]);
  const [current, setCurrent] = useState<DecisionNode | DecisionResult>(tree);

  function choose(option: { label: string; next: DecisionNode | DecisionResult }) {
    if (!isResult(current)) {
      setPath([...path, { q: current.question, a: option.label }]);
    }
    setCurrent(option.next);
  }

  function reset() {
    setPath([]);
    setCurrent(tree);
  }

  return (
    <div
      style={{
        border: '1px solid var(--warwiki-border)',
        borderRadius: 8,
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        background: 'var(--warwiki-bg-subtle)',
      }}
    >
      {path.length > 0 && (
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--ifm-color-emphasis-700)',
            marginBottom: '0.75rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px dashed var(--warwiki-border)',
          }}
        >
          {path.map((p, i) => (
            <div key={i}>
              <strong>{p.q}</strong> → {p.a}
            </div>
          ))}
        </div>
      )}

      {isResult(current) ? (
        <div>
          <div
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--ifm-color-primary)',
              marginBottom: '0.4rem',
            }}
          >
            → {current.result}
          </div>
          {current.rationale && (
            <p style={{ margin: '0.4rem 0 0.6rem', fontSize: '0.92rem' }}>
              {current.rationale}
            </p>
          )}
          {current.citations && current.citations.length > 0 && (
            <div style={{ fontSize: '0.85rem' }}>
              <strong>See:</strong>{' '}
              {current.citations.map((c, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ', '}
                  <a href={c.href}>{c.label}</a>
                </React.Fragment>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '0.8rem',
              padding: '0.35rem 0.8rem',
              fontSize: '0.82rem',
              background: 'transparent',
              border: '1px solid var(--warwiki-border)',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            ← Start over
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '0.7rem',
            }}
          >
            {current.question}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {current.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choose(opt)}
                style={{
                  textAlign: 'left',
                  padding: '0.55rem 0.85rem',
                  background: 'white',
                  border: '1px solid var(--warwiki-border)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.92rem',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
                  e.currentTarget.style.background = 'var(--warwiki-note-bg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--warwiki-border)';
                  e.currentTarget.style.background = 'white';
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
