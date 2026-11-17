import {describe, expect, it, vi} from 'vitest';

vi.mock('@vercel/blob', () => ({head: vi.fn(), put: vi.fn(), BlobNotFoundError: class extends Error {}}));
import {cleanProgress, mergeProgress} from '../../api/rounds-sync';

describe('rounds-sync cleanProgress', () => {
  it('keeps confidence, M&M, chosen answer and flag changes, and drops anything else', () => {
    const out = cleanProgress({q1: {n: 2, right: 1, ivl: 3, at: 10, due: 20, last: 'w', conf: 2, mis: true, pick: 3, flag: false, ft: 15, evil: 'x'}});
    expect(out).toEqual({q1: {n: 2, right: 1, ivl: 3, at: 10, due: 20, ft: 15, last: 'w', flag: false, mis: true, conf: 2, pick: 3}});
  });
  it('rejects out-of-range confidence and answer positions', () => {
    expect(cleanProgress({q1: {at: 1, conf: 7, pick: 9}})).toEqual({q1: {at: 1}});
  });
});

describe('rounds-sync mergeProgress', () => {
  it('keeps answers from both devices instead of overwriting', () => {
    const merged = mergeProgress({a: {at: 5, n: 1}}, {b: {at: 6, n: 1}});
    expect(Object.keys(merged).sort()).toEqual(['a', 'b']);
  });
  it('lets the newer record win, counting a flag change as newer', () => {
    expect(mergeProgress({a: {at: 5, n: 1}}, {a: {at: 5, n: 1, flag: true, ft: 9}}).a.flag).toBe(true);
    expect(mergeProgress({a: {at: 9, n: 2}}, {a: {at: 5, n: 1}}).a.n).toBe(2);
  });
  it('drops records older than a reset and keeps the higher daily count', () => {
    const merged = mergeProgress({a: {at: 5}, _days: {'2026-11-16': 3, at: 5}}, {_reset: {at: 7}, b: {at: 8}, _days: {'2026-11-16': 5, at: 8}});
    expect(merged.a).toBeUndefined();
    expect(merged.b).toEqual({at: 8});
    expect(merged._days['2026-11-16']).toBe(5);
    expect(merged._reset).toEqual({at: 7});
  });
});
