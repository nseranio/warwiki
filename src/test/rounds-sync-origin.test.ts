import {describe, expect, it, vi} from 'vitest';
import type {IncomingMessage} from 'node:http';

vi.mock('@vercel/blob', () => ({head: vi.fn(), put: vi.fn(), BlobNotFoundError: class extends Error {}}));
import {allowedOrigin} from '../../api/rounds-sync';

const req = (headers: Record<string, string>) => ({headers} as unknown as IncomingMessage);

describe('rounds-sync allowedOrigin', () => {
  it('accepts the two sites as cross-origin callers', () => {
    expect(allowedOrigin(req({origin: 'https://whitwiki.org'}))).toBe('https://whitwiki.org');
    expect(allowedOrigin(req({origin: 'https://warwiki.org'}))).toBe('https://warwiki.org');
    expect(allowedOrigin(req({origin: 'https://warwiki-git-x.vercel.app'}))).toBe('https://warwiki-git-x.vercel.app');
  });
  it('rejects other origins and plain http', () => {
    expect(allowedOrigin(req({origin: 'https://evil.example'}))).toBeNull();
    expect(allowedOrigin(req({origin: 'http://warwiki.org'}))).toBeNull();
  });
  it('accepts a same-origin GET with no Origin header (browsers omit it)', () => {
    expect(allowedOrigin(req({host: 'warwiki.org', 'sec-fetch-site': 'same-origin'}))).toBe('https://warwiki.org');
    expect(allowedOrigin(req({host: 'localhost:3000', 'sec-fetch-site': 'same-origin'}))).toBe('http://localhost');
  });
  it('still rejects a missing Origin without the same-origin marker or from another host', () => {
    expect(allowedOrigin(req({host: 'warwiki.org'}))).toBeNull();
    expect(allowedOrigin(req({host: 'warwiki.org', 'sec-fetch-site': 'cross-site'}))).toBeNull();
    expect(allowedOrigin(req({host: 'evil.example', 'sec-fetch-site': 'same-origin'}))).toBeNull();
  });
});
