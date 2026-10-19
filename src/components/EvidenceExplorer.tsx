import {useEffect, useRef, useState} from 'react';
import groups from '../data/clinical-evidence/timeline-groups.json';
import {trialById} from '../data/clinical-evidence';
import EvidenceTimeline from './EvidenceTimeline';
import TrialsLibrary from './TrialsLibrary';

type Group = {id: string; label: string; items: [string, string][]};
type View = 'trial' | 'decision';

const timelineGroups = groups as Group[];
const views: {id: View; label: string}[] = [{id: 'decision', label: 'By decision'}, {id: 'trial', label: 'By trial'}];

/** Clinical Evidence landing page, ported from WHITWIKI (October 18): By decision (timelines) and By trial (library),
 *  one area filter shared by both views. The view and area live in the URL (?view=trial&area=oab) so a filtered view
 *  can be shared. Old Journal Club links (/docs/journal-club#trial-<id>, used by the Anki decks) redirect here and
 *  are sent on to the trial's page. */
export default function EvidenceExplorer() {
  const [view, setView] = useState<View>('decision');
  const [area, setArea] = useState('all');
  const [jump, setJump] = useState<string | null>(null);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const legacy = hash.match(/^trial-(.+)$/);
    const target = legacy ? trialById(legacy[1]) : undefined;
    if (target?.page) {
      window.location.replace(target.page);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'trial') setView('trial');
    const value = params.get('area');
    if (value && timelineGroups.some(group => group.id === value)) setArea(value);
    if (hash) setJump(hash);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    view === 'trial' ? url.searchParams.set('view', 'trial') : url.searchParams.delete('view');
    area === 'all' ? url.searchParams.delete('area') : url.searchParams.set('area', area);
    window.history.replaceState(null, '', url.toString());
  }, [view, area]);

  useEffect(() => {
    const button = row.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
    if (button && row.current) row.current.scrollLeft = button.offsetLeft - row.current.offsetLeft - 16;
  }, [area]);

  // Scroll to a decision timeline once its view has rendered (from "See timeline" or a #decision link).
  useEffect(() => {
    if (!jump || view !== 'decision') return;
    const target = document.getElementById(jump);
    if (target) target.scrollIntoView({block: 'start'});
    setJump(null);
  }, [jump, view, area]);

  const showTimeline = (decision: string) => {
    const owner = timelineGroups.find(group => group.items.some(([id]) => id === decision));
    if (owner && area !== 'all' && owner.id !== area) setArea(owner.id);
    setView('decision');
    setJump(decision);
  };

  const shown = timelineGroups.filter(group => area === 'all' || group.id === area);
  return <div className="wk-ev-tlb">
    <div className="wk-ev-evx-views" role="tablist" aria-label="View">
      {views.map(item => <button type="button" role="tab" key={item.id} aria-selected={view === item.id}
        onClick={() => setView(item.id)}>{item.label}</button>)}
    </div>
    <div ref={row} className="wk-ev-tlb-filter" role="group" aria-label="Show area">
      {[{id: 'all', label: 'All'}, ...timelineGroups].map(group => <button type="button" key={group.id}
        aria-pressed={area === group.id} onClick={() => setArea(group.id)}>{group.label}</button>)}
    </div>
    {view === 'trial'
      ? <TrialsLibrary area={area} onShowTimeline={showTimeline} />
      : <>
        <p className="wk-ev-evx-note">Trials and approvals in date order, grouped by the clinical decision they inform.</p>
        {shown.map(group => <section key={group.id} className="wk-ev-tlb-group" aria-labelledby={`tl-${group.id}`}>
          <h2 id={`tl-${group.id}`}>{group.label}</h2>
          {group.items.map(([decision, question]) => <div key={decision} className="wk-ev-tlb-decision">
            <h3 id={decision}>{question}</h3>
            <EvidenceTimeline decision={decision} />
          </div>)}
        </section>)}
      </>}
  </div>;
}
