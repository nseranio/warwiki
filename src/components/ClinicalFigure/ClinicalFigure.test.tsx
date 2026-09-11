import React from 'react';
import {afterEach, beforeAll, describe, expect, it} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {renderToStaticMarkup} from 'react-dom/server';
import ClinicalFigure from './index';
import {figures, findFigure} from '../../data/figures';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function() {this.setAttribute('open', '');};
});
afterEach(cleanup);
const figure = figures['graft-placement'];

describe('clinical figures', () => {
  it('matches local original and hashed images, leaving unrelated and external images alone', () => {
    expect(findFigure('/img/diagrams/graft-placement.svg')).toBe(figure);
    expect(findFigure('/prefix/assets/images/graft-placement-a01c3456789def.svg?x=1')).toBe(figure);
    expect(findFigure('/img/logo.svg')).toBeUndefined();
    expect(findFigure('https://other.example/img/diagrams/graft-placement.svg')).toBeUndefined();
    expect(findFigure('/assets/images/graft-placement-wrong.svg')).toBeUndefined();
  });
  it('provides the text equivalent, access limits and honest review status', () => {
    render(<ClinicalFigure figure={figure} src={figure.asset} alt="Existing article alt" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Existing article alt');
    const toggle = screen.getByRole('button', {name:/Read description/});
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(figure.textEquivalent)).toBeVisible();
    expect(screen.getByText(/No named clinician has signed off/)).toBeVisible();
    expect(screen.getByRole('link', {name:/Barbagli:/})).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/15745501/');
  });
  it('opens an accessible dialog, allows full-size viewing, and restores focus after Escape', () => {
    render(<ClinicalFigure figure={figure} src={figure.asset} />);
    const opener = screen.getByRole('button', {name:/Enlarge/});
    opener.focus(); fireEvent.click(opener);
    const dialog = screen.getByRole('dialog', {name:figure.title});
    expect(screen.getByRole('button', {name:'Close enlarged figure'})).toHaveFocus();
    fireEvent.click(screen.getByRole('button', {name:'Full size'}));
    expect(screen.getByRole('button', {name:'Fit to screen'})).toHaveAttribute('aria-pressed', 'true');
    fireEvent(dialog, new Event('cancel', {bubbles:true}));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });
  it('preserves a valid paragraph tree for SSR Markdown images', () => {
    const markup = renderToStaticMarkup(<p><ClinicalFigure figure={figure} src={figure.asset} /></p>);
    expect(markup).not.toMatch(/<(?:figure|div|details|dialog)\b/);
    const container = document.createElement('div');container.innerHTML = markup;
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild?.tagName).toBe('P');
  });
});
