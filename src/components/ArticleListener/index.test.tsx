import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ArticleListener from './index';

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
