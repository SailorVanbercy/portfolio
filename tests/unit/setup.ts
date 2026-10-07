import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Mirror next.config.ts (trailingSlash: true) so next/link renders the same hrefs as the build.
process.env.__NEXT_TRAILING_SLASH = 'true';

// Vitest runs without globals, so Testing Library cannot register its automatic cleanup.
afterEach(() => cleanup());
