// Workaround for vercel/next.js#92339: on Windows, static export writes RSC segment files
// as nested directories (`__next.$d$locale/__PAGE__.txt`) while the client requests the
// dot-separated name (`__next.$d$locale.__PAGE__.txt`). Linux builds (Vercel) are unaffected.
import { existsSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const SEGMENT_DIR_PREFIX = '__next.';

/** Maps a path relative to a page directory to its flat segment name, or null if not a nested segment file. */
export function flattenSegmentPath(relativePath: string): string | null {
  const parts = relativePath.split(/[\\/]/);
  if (parts.length < 2 || !parts[0].startsWith(SEGMENT_DIR_PREFIX)) return null;
  return parts.join('.');
}

function walkFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walkFiles(full) : [full];
  });
}

/** Moves every nested segment file to its flat name next to the segment directory. Returns the count. */
export function flattenSegmentFiles(outDir: string): number {
  let moved = 0;
  const segmentDirs = new Set<string>();
  for (const file of walkFiles(outDir)) {
    const parts = relative(outDir, file).split(sep);
    const index = parts.findIndex((part) => part.startsWith(SEGMENT_DIR_PREFIX));
    if (index === -1 || index === parts.length - 1) continue;
    const pageDir = join(outDir, ...parts.slice(0, index));
    const flat = flattenSegmentPath(parts.slice(index).join('/'));
    if (!flat) continue;
    renameSync(file, join(pageDir, flat));
    segmentDirs.add(join(pageDir, parts[index]));
    moved += 1;
  }
  segmentDirs.forEach((dir) => existsSync(dir) && rmSync(dir, { recursive: true, force: true }));
  return moved;
}

if (process.argv[1] && process.argv[1].endsWith('segment-paths.ts')) {
  const outDir = join(dirname(process.argv[1]), '..', 'out');
  console.log(`Flattened ${flattenSegmentFiles(outDir)} segment files.`);
}
