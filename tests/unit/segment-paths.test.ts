import { describe, expect, it } from 'vitest';
import { flattenSegmentPath } from '../../scripts/segment-paths';

describe('flattenSegmentPath', () => {
  it('flattens a nested segment file into the dot-separated name the client requests', () => {
    expect(flattenSegmentPath('__next.$d$locale/__PAGE__.txt')).toBe('__next.$d$locale.__PAGE__.txt');
    expect(flattenSegmentPath('__next.$d$locale/$d$section/__PAGE__.txt')).toBe('__next.$d$locale.$d$section.__PAGE__.txt');
  });

  it('returns null for files that are not inside a nested segment directory', () => {
    expect(flattenSegmentPath('__next._tree.txt')).toBeNull();
    expect(flattenSegmentPath('index.html')).toBeNull();
  });
});
