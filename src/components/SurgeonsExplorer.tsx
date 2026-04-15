import React, { useState } from 'react';
import SurgeonTree from './SurgeonTree';
import SurgeonDirectory from './SurgeonDirectory';
import { SUBSPECIALTIES, surgeonsBySubspecialty, type Subspecialty } from '../data/surgeons';

export default function SurgeonsExplorer({
  defaultSubspecialty = 'GURS',
}: {
  defaultSubspecialty?: Subspecialty;
} = {}) {
  const [sub, setSub] = useState<Subspecialty>(defaultSubspecialty);

  return (
    <div className="se-wrapper">
      <div className="se-tabs" role="tablist" aria-label="Reconstructive subspecialty">
        {SUBSPECIALTIES.map(s => {
          const active = sub === s.id;
          const count = surgeonsBySubspecialty(s.id).length;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              className={`se-tab${active ? ' se-tab--active' : ''}`}
              style={active ? { borderColor: s.color, color: s.color } : undefined}
              onClick={() => setSub(s.id)}
            >
              <span className="se-tab-label">{s.label}</span>
              <span className="se-tab-desc">{s.fullName}</span>
              <span className="se-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <section className="se-section">
        <h2 className="se-section-title">Lineage Tree</h2>
        <SurgeonTree subspecialty={sub} />
      </section>

      <section className="se-section">
        <h2 className="se-section-title">Directory</h2>
        <SurgeonDirectory subspecialty={sub} />
      </section>
    </div>
  );
}
