import { describe, expect, it } from 'vitest';
import { format, getDictionary } from '@/lib/dictionary';

const flatten = (obj: object, prefix = ''): string[] =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null ? flatten(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

const lookup = (dict: object, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => (acc as Record<string, unknown>)[key], dict);

describe('dictionary', () => {
  it('has the same keys in FR and EN, all non-empty', () => {
    const fr = getDictionary('fr');
    const en = getDictionary('en');
    expect(flatten(fr).sort()).toEqual(flatten(en).sort());
    for (const dict of [fr, en]) {
      flatten(dict).forEach((path) => expect(String(lookup(dict, path)).length, path).toBeGreaterThan(0));
    }
  });
});

describe('format', () => {
  it('replaces known placeholders and keeps unknown ones', () => {
    expect(format('Image {i} of {n}', { i: 1, n: 3 })).toBe('Image 1 of 3');
    expect(format('Team of {n}', {})).toBe('Team of {n}');
  });
});
