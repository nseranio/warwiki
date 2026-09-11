import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoLibrary from './VideoLibrary';

vi.mock('@site/src/data/videos', () => ({
  VIDEOS: Array.from({length: 55}, (_, index) => ({
    id: `video-${index}`, title: `Operative video ${index}`, channel: 'Teaching channel',
    playlist: 'Reconstruction', topic: index < 30 ? 'Urethra' : 'Bladder',
  })),
}));

describe('video library progressive rendering', () => {
  it('renders a small initial list while searching all videos, including unloaded results', () => {
    render(<VideoLibrary />);
    expect(screen.getAllByRole('button', {name: /^Play:/})).toHaveLength(24);
    fireEvent.click(screen.getByRole('button', {name: 'Show 24 more videos'}));
    expect(screen.getAllByRole('button', {name: /^Play:/})).toHaveLength(48);
    fireEvent.change(screen.getByRole('searchbox'), {target: {value: 'Operative video 54'}});
    expect(screen.getAllByRole('button', {name: /^Play:/})).toHaveLength(1);
    expect(screen.getByText('Operative video 54')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), {target: {value: ''}});
    expect(screen.getAllByRole('button', {name: /^Play:/})).toHaveLength(24);
  });
});
