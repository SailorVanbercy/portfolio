const THUMB_SUFFIX = '.thumb.webp';

/** Card thumbnails (800px wide) live next to the full screenshot with a `.thumb.webp` suffix. */
export function thumbOf(src: string): string {
  return src.replace(/\.(webp|png|jpg)$/, THUMB_SUFFIX);
}
