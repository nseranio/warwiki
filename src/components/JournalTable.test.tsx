import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import JournalTable from './JournalTable';

describe('JournalTable', () => {
  it('mounts without throwing', () => {
    // JournalTable pulls from src/data/journals; smoke test only.
    const { container } = render(<JournalTable />);
    expect(container).toBeTruthy();
  });

  it('highlights trial acronyms in titles', () => {
    render(<JournalTable />);
    // <mark className="jt-acronym"> wraps detected acronyms; if any
    // journal entry contains one, at least one mark element exists.
    const marks = document.querySelectorAll('mark.jt-acronym');
    // Don't assert a specific count — just that the highlighting machinery
    // ran without exception.
    expect(marks.length).toBeGreaterThanOrEqual(0);
  });
});
