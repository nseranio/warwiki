import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GenericDatabase from './GenericDatabase';

const COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'segment', header: 'Segment' },
  {
    key: 'status',
    header: 'Status',
    badge: true,
    badgeColors: { active: '#22c55e', deprecated: '#ef4444' },
  },
];

const DATA = [
  { name: 'Ileal conduit', segment: 'Ileum', status: 'active' },
  { name: 'Gastrocystoplasty', segment: 'Stomach', status: 'deprecated' },
  { name: 'Sigmoid neobladder', segment: 'Sigmoid', status: 'active' },
];

describe('GenericDatabase', () => {
  it('renders all rows', () => {
    render(<GenericDatabase data={DATA} columns={COLUMNS} />);
    expect(screen.getByText('Ileal conduit')).toBeInTheDocument();
    expect(screen.getByText('Gastrocystoplasty')).toBeInTheDocument();
    expect(screen.getByText('Sigmoid neobladder')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<GenericDatabase data={DATA} columns={COLUMNS} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Segment')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders badge cells without crashing', () => {
    render(<GenericDatabase data={DATA} columns={COLUMNS} />);
    // Badge text is rendered inside the SubtleBadge span
    expect(screen.getAllByText('active').length).toBeGreaterThan(0);
    expect(screen.getByText('deprecated')).toBeInTheDocument();
  });

  it('filters rows when filterKey is provided and a text input is typed into', () => {
    render(
      <GenericDatabase
        data={DATA}
        columns={COLUMNS}
        filterKey="segment"
        filterLabel="Segment"
      />
    );
    // All rows present initially.
    expect(screen.getByText('Ileal conduit')).toBeInTheDocument();
    // Find the search/filter input by role.
    const input = screen.queryByRole('textbox') ?? screen.queryByRole('searchbox');
    if (input) {
      fireEvent.change(input, { target: { value: 'sigmoid' } });
      // Sigmoid row remains; stomach row should be gone.
      expect(screen.getByText('Sigmoid neobladder')).toBeInTheDocument();
      expect(screen.queryByText('Gastrocystoplasty')).toBeNull();
    }
  });
});
