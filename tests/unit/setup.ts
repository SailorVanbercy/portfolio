import '@testing-library/jest-dom/vitest';

// Mirror next.config.ts (trailingSlash: true) so next/link renders the same hrefs as the build.
process.env.__NEXT_TRAILING_SLASH = 'true';
