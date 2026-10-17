import './Rec.css';
import {Children, isValidElement, useState, type ReactNode} from 'react';

/**
 * Guideline recommendation detail shown as a compact badge ("AUA · Strong · B").
 * Tapping the badge reveals the full parenthetical (statement number, strength,
 * evidence grade, page code). Authors keep the parenthetical text inside the tag,
 * so the source and the claim gate see exactly the original words.
 */

function text(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(text).join('');
  if (isValidElement(node)) return text((node.props as {children?: ReactNode}).children);
  return Children.toArray(node).map(text).join('');
}

export function recLabel(raw: string): string {
  const t = raw.replace(/^\s*\(|\)\s*$/g, '');
  const org = /\b(AUA|NCCN|EAU|ASCO|AAES|ESE|ASTRO|SUO)\b/.exec(t)?.[1];
  let strength = '';
  const s = /\b(Strong|Moderate|Conditional|Weak)\b(?:\s+Recommendation)?/i.exec(t);
  if (/Expert Opinion/i.test(t)) strength = 'Expert opinion';
  else if (/Clinical Principle/i.test(t)) strength = 'Clinical principle';
  else if (/category\s+(1|2A|2B|3)/i.test(t)) strength = `Category ${/category\s+(1|2A|2B|3)/i.exec(t)![1].toUpperCase()}`;
  else if (s) strength = s[1][0].toUpperCase() + s[1].slice(1).toLowerCase();
  const grade = /Grade\s+([ABC])\b/.exec(t)?.[1];
  const parts = [org, strength || (org ? '' : 'Guideline'), grade].filter(Boolean);
  return parts.join(' · ') || 'Guideline';
}

export default function Rec({children}: {children?: ReactNode}) {
  const [open, setOpen] = useState(false);
  const full = text(children).replace(/^\s*\(|\)\s*$/g, '').trim();
  return <span className="wk-rec">
    <button type="button" className="wk-rec-chip" aria-expanded={open} title={full} onClick={() => setOpen(value => !value)}>
      {recLabel(full)}
    </button>
    {open && <span className="wk-rec-full" role="note">{full}</span>}
  </span>;
}
