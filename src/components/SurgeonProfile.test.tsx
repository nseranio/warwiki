import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import SurgeonProfile, {KeyPublication, type SurgeonCitation} from './SurgeonProfile';
import {samePublication} from '../utils/surgeon-publications';
import nagerPublications from '../data/surgeon-key-publications/charles-nager.json';
import wessellsPublications from '../data/surgeon-key-publications/hunter-wessells.json';

const publication = {id: 'publication-2', cite: 'Lee Z, Eun DD. "A selected reconstruction paper." Journal. 2015.', doi: '10.1016/example'};
const citations: SurgeonCitation[] = [
  {cite: 'Lee Z, et al. A selected reconstruction paper. Journal. 2015.', doi: '10.1016/EXAMPLE', pages: [{title: 'Ureteroplasty', url: '/docs/ureteroplasty', ref: 'ref2'}]},
  {cite: 'Eun DD. Another paper. Journal. 2018.', doi: '10.1016/other', pages: [{title: 'Another page', url: '/docs/other', ref: 'ref1'}]},
];

describe('surgeon publication display', () => {
  it('keeps the Nager and Wessells bibliographies free of their former duplicate records', () => {
    for (const data of [nagerPublications, wessellsPublications]) {
      data.keyPublications.forEach((paper, i) => {
        expect(data.keyPublications.slice(i + 1).some(other => samePublication(paper, other))).toBe(false);
      });
    }
  });

  it('shows a selected paper once and keeps its citing-page links', () => {
    render(<SurgeonProfile id="daniel-eun" profile={{surgeon: {name: 'Daniel D. Eun'}, position: null, year: null, mentor: null, coMentor: null, school: null, trainees: []}} citations={citations} keyPublications={[publication]}>
      <h2>Key Publications</h2>
      <ol><KeyPublication publication={publication} citations={citations}>An existing description.</KeyPublication></ol>
    </SurgeonProfile>);
    expect(screen.getAllByText(publication.cite)).toHaveLength(1);
    expect(screen.queryByText(citations[0].cite)).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Ureteroplasty'})).toHaveAttribute('href', '/docs/ureteroplasty#ref2');
    expect(screen.getByText(citations[1].cite)).toBeInTheDocument();
  });

  it('also excludes papers already printed in the biography references', () => {
    render(<SurgeonProfile id="test" profile={{surgeon: {name: 'Test'}, position: null, year: null, mentor: null, coMentor: null, school: null, trainees: []}} citations={citations} referencePublications={[publication]} />);
    expect(screen.queryByText(citations[0].cite)).not.toBeInTheDocument();
    expect(screen.getByText(citations[1].cite)).toBeInTheDocument();
  });

  it('matches abbreviated author lists by title but keeps distinct DOI papers apart', () => {
    expect(samePublication({cite: 'Author A. "A long and distinct publication title." Journal. 2020.'}, {cite: 'Author A, et al. A long and distinct publication title. Journal. 2020.'})).toBe(true);
    expect(samePublication(publication, {...publication, doi: '10.1016/different'})).toBe(false);
    expect(samePublication(publication, {...publication, doi: '10.1016/example]'})).toBe(true);
  });

  it('keeps an existing page link when the citation index lacks the full author list', () => {
    render(<ol><KeyPublication publication={{...publication, pages: [{title: 'Existing link', url: '/docs/existing', ref: ''}]}} citations={[]} /></ol>);
    expect(screen.getByRole('link', {name: 'Existing link'})).toHaveAttribute('href', '/docs/existing#');
  });

  it('merges duplicate records in the remaining bibliography and retains both citing pages', () => {
    render(<SurgeonProfile id="test" profile={{surgeon: {name: 'Test'}, position: null, year: null, mentor: null, coMentor: null, school: null, trainees: []}} citations={[
      {...citations[0], doi: '10.1016/example]'},
      {...citations[0], pages: [{title: 'Second citing page', url: '/docs/second', ref: 'ref3'}]},
    ]} />);
    expect(screen.getAllByText(citations[0].cite)).toHaveLength(1);
    expect(screen.getByRole('link', {name: 'doi'})).toHaveAttribute('href', 'https://doi.org/10.1016/example');
    expect(screen.getByRole('link', {name: 'Ureteroplasty'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Second citing page'})).toBeInTheDocument();
  });
});
