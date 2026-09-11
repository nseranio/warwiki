import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EvidenceStatus from './EvidenceStatus';

describe('evidence provenance', () => {
  it('does not turn a targeted update into a full clinical review', () => {
    render(<EvidenceStatus evidenceUpdated="2026-09-11" evidenceNote="AUA risk surveillance" />);
    expect(screen.getByText(/Targeted source update/)).toBeInTheDocument();
    expect(screen.queryByText('Clinical review recorded:')).not.toBeInTheDocument();
  });
  it('displays separately recorded clinical review', () => {
    render(<EvidenceStatus lastReviewed="2026-05-23" reviewer="NS" />);
    expect(screen.getByText(/May 23, 2026/)).toHaveTextContent('NS');
  });
  it('does not display invalid or absent dates', () => {
    const {container}=render(<EvidenceStatus evidenceUpdated="2026-02-30" />);
    expect(container).toBeEmptyDOMElement();
  });
});
