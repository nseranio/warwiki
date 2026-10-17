import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ArticleListener, { chunkText, spokenRec } from './index';

describe('default device audio', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('speechSynthesis', {speak: vi.fn(), cancel: vi.fn(), pause: vi.fn(), resume: vi.fn()});
    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text: string;
      constructor(text: string) { this.text = text; }
    });
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it('reads article content without requesting paid cloud audio, and stops device speech', () => {
    render(<><ArticleListener /><article><div className="markdown"><h1>Repair</h1><p>Clinical article content.</p><h2>References</h2><p>Do not read this reference.</p></div></article></>);
    fireEvent.click(screen.getByRole('button', {name: 'Listen to this article'}));
    expect(fetch).not.toHaveBeenCalled();
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    const spoken = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0];
    expect(spoken.text).toContain('Clinical article content.');
    expect(spoken.text).not.toContain('Do not read this reference.');
    fireEvent.click(screen.getByRole('button', {name: 'Stop'}));
    expect(screen.getByRole('button', {name: 'Listen to this article'})).toBeInTheDocument();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });
});

describe('what the listener reads', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('speechSynthesis', {speak: vi.fn(), cancel: vi.fn(), pause: vi.fn(), resume: vi.fn()});
    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text: string;
      constructor(text: string) { this.text = text; }
    });
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  function spokenText(article: React.ReactElement): string {
    render(<><ArticleListener />{article}</>);
    fireEvent.click(screen.getByRole('button', {name: 'Listen to this article'}));
    return vi.mocked(window.speechSynthesis.speak).mock.calls.map((call) => call[0].text).join(' ');
  }

  it('skips See Also, Videos, Podcasts, databases, footnotes and link-card grids', () => {
    const text = spokenText(<article><div className="markdown">
      <h1>Urethroplasty</h1><p>Body text stays.</p>
      <div className="td-wrapper"><select><option>Filter option</option></select><p>Database row</p></div>
      <h2>See Also</h2><ul><li>Linked page</li></ul>
      <h2>Videos</h2><div className="vc-grid"><p>Video title</p></div>
      <h2>Podcasts</h2><div className="web-grid"><p>Episode title</p></div>
      <section className="footnotes"><ol><li>Footnote reference</li></ol></section>
    </div></article>);
    expect(text).toContain('Body text stays.');
    for (const hidden of ['Filter option', 'Database row', 'Linked page', 'Video title', 'Episode title', 'Footnote reference']) {
      expect(text).not.toContain(hidden);
    }
  });

  it('reads a table row by row with its headers, and ends list items with a stop', () => {
    const text = spokenText(<article><div className="markdown">
      <h1>Grafts</h1>
      <table><thead><tr><th>Graft</th><th>Take</th></tr></thead><tbody><tr><td>Buccal</td><td>Reliable</td></tr></tbody></table>
      <ul><li>First item</li><li>Second item</li></ul>
    </div></article>);
    expect(text).toContain('Buccal; Take: Reliable.');
    expect(text).toContain('First item. Second item.');
  });

  it('speaks a recommendation badge as a short aside', () => {
    expect(spokenRec('AUA · Strong · B')).toBe('(AUA strong recommendation, grade B)');
    expect(spokenRec('Guideline')).toBe('');
  });
});

describe('chunk ramp', () => {
  it('opens with a short chunk and grows toward the maximum', () => {
    const sentence = 'The bulbar urethra is the commonest site of stricture in adult men. ';
    const chunks = chunkText(sentence.repeat(120));
    expect(chunks[0].length).toBeLessThanOrEqual(350);
    expect(chunks[1].length).toBeLessThanOrEqual(1200);
    expect(chunks[1].length).toBeGreaterThan(chunks[0].length);
    expect(Math.max(...chunks.map((c) => c.length))).toBeLessThanOrEqual(3500);
    expect(chunks.join(' ')).toBe(sentence.repeat(120).trim());
  });

  it('keeps a long opening sentence whole rather than cutting it', () => {
    const long = `${'word '.repeat(100).trim()}.`;
    expect(chunkText(`${long} Short tail.`)[0]).toBe(long);
  });

  it('never splits decimals or section numbers', () => {
    const text = 'Median survival was 40.4 months (P < 0.001). See §6.7.15 for details! Done?';
    expect(chunkText(text)).toEqual([text]);
    const chunks = chunkText(`${'word '.repeat(60).trim()} 40.4 months. Next was 0.001. Then §6.7.15 applies.`, 3500, [300]);
    const joined = chunks.join(' ');
    expect(joined).toContain('40.4 months');
    expect(joined).toContain('0.001');
    expect(joined).toContain('§6.7.15');
    expect(joined).not.toMatch(/\d\. \d/);
  });
});
