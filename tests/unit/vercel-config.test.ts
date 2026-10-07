import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8')) as {
  framework: string;
  outputDirectory?: string;
  redirects: { source: string; destination: string }[];
  headers: { source: string; headers: { key: string; value: string }[] }[];
};

describe('vercel.json', () => {
  it('pins the static export directory so a stale dashboard setting cannot override it', () => {
    // next.config.ts uses output: 'export', which writes the site to out/.
    expect(config.framework).toBe('nextjs');
    expect(config.outputDirectory).toBe('out');
  });

  it('redirects the bare root to the French home', () => {
    expect(config.redirects).toContainEqual(expect.objectContaining({ source: '/', destination: '/fr/' }));
  });

  it('sends baseline security headers on every route', () => {
    const all = config.headers.find((h) => h.source === '/(.*)');
    const keys = all?.headers.map((h) => h.key) ?? [];
    expect(keys).toEqual(
      expect.arrayContaining([
        'X-Content-Type-Options',
        'Referrer-Policy',
        'X-Frame-Options',
        'Permissions-Policy',
        'Strict-Transport-Security',
      ]),
    );
  });
});
