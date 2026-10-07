import { describe, expect, it } from 'vitest';
import { thumbOf } from '@/lib/content/thumb';

describe('thumbOf', () => {
  it('derives the card thumbnail path next to the full image', () => {
    expect(thumbOf('projects/leadboy/01-pipeline.webp')).toBe('projects/leadboy/01-pipeline.thumb.webp');
  });
});
