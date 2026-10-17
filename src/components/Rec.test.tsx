import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import Rec, {recLabel} from './Rec';

afterEach(cleanup);

describe('guideline recommendation detail', () => {
  it.each([
    ['(AUA 2024: Strong Recommendation, Grade A)', 'AUA · Strong · A'],
    ['(Moderate Recommendation; Evidence Level: Grade B)', 'Moderate · B'],
    ['(EAU weak recommendation)', 'EAU · Weak'],
    ['(Expert Opinion)', 'Expert opinion'],
    ['(Clinical Principle)', 'Clinical principle'],
    ['(NCCN category 2A)', 'NCCN · Category 2A'],
  ])('preserves the published recommendation system for %s', (detail, label) => {
    expect(recLabel(detail)).toBe(label);
  });

  it('reveals the complete original detail on activation and collapses it again', () => {
    render(<Rec>(AUA 2024 statement 12, <em>Strong Recommendation</em>; Evidence Level: Grade A)</Rec>);
    const button = screen.getByRole('button', {name: 'AUA · Strong · A'});
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('note')).toHaveTextContent('AUA 2024 statement 12, Strong Recommendation; Evidence Level: Grade A');
    fireEvent.click(button);
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });
});
