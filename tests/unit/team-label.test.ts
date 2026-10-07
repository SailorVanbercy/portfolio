import { describe, expect, it } from 'vitest';
import { getDictionary } from '@/lib/dictionary';
import { teamLabel } from '@/lib/team';

const dict = getDictionary('fr');

describe('teamLabel', () => {
  it('labels solo projects', () => {
    expect(teamLabel({ solo: true }, dict)).toBe('Projet individuel');
  });
  it('labels a team of known size', () => {
    expect(teamLabel({ solo: false, size: 4 }, dict)).toBe('Équipe de 4');
  });
  it('labels a group project of unknown size without inventing a number', () => {
    expect(teamLabel({ solo: false }, dict)).toBe('Projet de groupe');
  });
});
