import React from 'react';
import {fireEvent, render, screen, cleanup} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import ClinicQuickAccess from './ClinicQuickAccess';
import {clinicFavoritesKey, parseClinicFavorites, filterClinicPathways} from '../data/clinic-pathways';

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);
describe('clinic retrieval', () => {
  it('finds abbreviations, saves a topic across visits and shows an honest empty state', () => {
    const view = render(<ClinicQuickAccess />);
    fireEvent.change(screen.getByRole('searchbox'), {target: {value: 'rUTI'}});
    expect(screen.getByRole('status')).toHaveTextContent('1 topic');
    fireEvent.click(screen.getByRole('button', {name: 'Save Recurrent urinary tract infection in women'}));
    expect(parseClinicFavorites(window.localStorage.getItem(clinicFavoritesKey))).toEqual(['recurrent-uti']);
    view.unmount();
    render(<ClinicQuickAccess />);
    fireEvent.click(screen.getByRole('checkbox', {name: 'Saved topics'}));
    expect(screen.getByRole('status')).toHaveTextContent('1 topic');
    fireEvent.change(screen.getByRole('searchbox'), {target: {value: 'BPH'}});
    expect(screen.getByText(/No matching topics/)).toBeInTheDocument();
  });
  it('keeps short abbreviations and male/female queries distinct while supporting longer prefixes', () => {
    expect(filterClinicPathways('ED').map(item => item.id)).toEqual(['erectile-dysfunction']);
    expect(filterClinicPathways('male SUI').map(item => item.id)).toEqual(['male-incontinence']);
    expect(filterClinicPathways('female-SUI').map(item => item.id)).toEqual(['female-incontinence']);
    expect(filterClinicPathways('prolaps').map(item => item.id)).toEqual(['prolapse']);
    expect(filterClinicPathways('rUTI').map(item => item.id)).toEqual(['recurrent-uti']);
  });
  it('recovers from malformed storage and ignores stale or foreign IDs', () => {
    expect(parseClinicFavorites('{broken')).toEqual([]);
    expect(parseClinicFavorites('{"recurrent-uti":true}')).toEqual([]);
    expect(parseClinicFavorites('["bph", "bph", "unknown", 123]')).toEqual(['bph']);
  });
});
