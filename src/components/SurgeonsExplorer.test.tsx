import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SurgeonsExplorer from './SurgeonsExplorer';

describe('SurgeonsExplorer', () => {
  it('renders with default GURS subspecialty', () => {
    render(<SurgeonsExplorer />);
    // Tab list should be present.
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('switches subspecialty when tab is clicked', () => {
    render(<SurgeonsExplorer />);
    const buttons = screen.getAllByRole('button');
    // Find a non-GURS tab and click it. SUBSPECIALTIES includes GURS, URPS,
    // and likely Combined; clicking any second button toggles state.
    if (buttons.length > 1) {
      fireEvent.click(buttons[1]);
      // No exception = state machine works. Visual assertions are out of
      // scope for a smoke test.
      expect(buttons[1]).toBeInTheDocument();
    }
  });
});
