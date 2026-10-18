import {describe, expect, it} from 'vitest';
import {cleanMetaDescription} from './meta-description';

describe('cleanMetaDescription', () => {
  it('removes citation markers', () => {
    expect(cleanMetaDescription('Pelvic surgery is the leading cause.[1] Fistula management varies.[2][3]'))
      .toBe('Pelvic surgery is the leading cause. Fistula management varies.');
    expect(cleanMetaDescription('Lasting more than 4 hours [1, 2] with pain.[[3][4] Synonyms')).toBe('Lasting more than 4 hours with pain. Synonyms');
    expect(cleanMetaDescription('Follow-up was 27 versus 53 months.[[29]')).toBe('Follow-up was 27 versus 53 months.');
  });

  it('keeps bracketed data', () => {
    expect(cleanMetaDescription('29 [25%] versus 24 [20%]')).toBe('29 [25%] versus 24 [20%]');
  });
});
