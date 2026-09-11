import React from 'react';
import {render, screen, cleanup, within} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import EvidenceTable from './EvidenceTable';
import {evidenceRegistry, getPathwayEvidence} from '../data/evidence';

afterEach(cleanup);
describe('EvidenceTable', () => {
  it.each(Object.keys(evidenceRegistry.pathways))('renders %s with source details and uncertainty', pathwayId => {
    render(<EvidenceTable pathwayId={pathwayId}/>);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/do not record a clinician review/)).toBeInTheDocument();
    const {records} = getPathwayEvidence(pathwayId);
    expect(screen.getAllByRole('row')).toHaveLength(records.length + 1);
    for (const record of records) {
      expect(screen.getByRole('link', {name: record.label})).toHaveAttribute('href', record.source.url);
      expect(screen.getByText(record.sampleSize.analysis)).toBeInTheDocument();
      for (const endpoint of record.endpoints) expect(screen.getByText(endpoint.uncertainty)).toBeInTheDocument();
    }
  });
  it('exposes the known sildenafil correction beside the clinical result', () => {
    render(<EvidenceTable pathwayId="ed"/>);
    const row = screen.getByRole('link', {name: 'Sildenafil pivotal trials · 1998'}).closest('tr')!;
    expect(within(row).getAllByText(/Correction notice recorded/).length).toBeGreaterThan(0);
    expect(within(row).getByRole('link', {name: 'Notice record'})).toHaveAttribute('href', expect.stringContaining('pubmed'));
  });
  it('does not silently hide an unknown pathway', () => {
    expect(() => getPathwayEvidence('unknown')).toThrow('Unknown evidence pathway');
  });
});
