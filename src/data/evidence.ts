import rawRegistry from './evidence-registry.json';

export interface EvidenceRecord {
  id: string;
  label: string;
  source: {title: string; authors: string; year: number; doi: string; url: string};
  design: string;
  population: string;
  sampleSize: {randomized: number | null; analysis: string};
  comparison: string;
  endpoints: {name: string; timepoint: string; result: string; uncertainty: string}[];
  followUp: string;
  limitations: string[];
  applicability: string;
  access: {level: string; url: string; checkedAt: string};
  correction: {status: string; checkedAt: string; note: string; url?: string};
}

export interface EvidenceRegistry {
  schemaVersion: number;
  scope: string;
  pathways: Record<string, {label: string; docPath: string; recordIds: string[]}>;
  records: EvidenceRecord[];
}

// The maintenance checker validates the JSON before a production build.
export const evidenceRegistry: EvidenceRegistry = rawRegistry;

export function getPathwayEvidence(pathwayId: string): {
  label: string; records: EvidenceRecord[];
} {
  const pathway = evidenceRegistry.pathways[pathwayId];
  if (!pathway) throw new Error(`Unknown evidence pathway: ${pathwayId}`);
  const records = pathway.recordIds.map(id => {
    const record = evidenceRegistry.records.find(item => item.id === id);
    if (!record) throw new Error(`Missing evidence record: ${id}`);
    return record;
  });
  return {label: pathway.label, records};
}
