/** Source-bound cohort annotations: freshness checks. */
import type {Manifest, StudyAnnotation, StudyDetail} from './types.ts';

export function normalizeForPassage(text: string): string {
  return text.replace(/\\([\\`*_{}[\]()#+\-.!<>=~|^])/g, '$1').replace(/\s+/g, ' ').trim().toLowerCase();
}

/** An annotation is current only when the eligibility text hash matches and every quoted passage is still in the text. */
export function annotationState(a: StudyAnnotation, detail: Pick<StudyDetail, 'eh' | 'eligibility'> | undefined): Manifest['annotationChecks'][number]['state'] {
  if (!detail) return 'notInSnapshot';
  if (!detail.eh || detail.eh !== a.eh) return 'criteriaChanged';
  const text = normalizeForPassage(detail.eligibility?.text ?? '');
  for (const c of a.cohorts) for (const p of c.passages) if (!text.includes(normalizeForPassage(p))) return 'passageMissing';
  for (const n of a.notFor ?? []) if (!text.includes(normalizeForPassage(n.passage))) return 'passageMissing';
  return 'current';
}

export function checkAnnotations(list: StudyAnnotation[], details: Map<string, Pick<StudyDetail, 'eh' | 'eligibility'>>): Manifest['annotationChecks'] {
  const out: Manifest['annotationChecks'] = [];
  for (const a of list) {
    const state = annotationState(a, details.get(a.nct));
    for (const c of a.cohorts) out.push({nct: a.nct, cohort: c.label, state});
    for (const n of a.notFor ?? []) out.push({nct: a.nct, cohort: `not ${n.state}`, state});
  }
  return out;
}
