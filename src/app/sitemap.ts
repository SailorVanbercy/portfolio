import type { MetadataRoute } from 'next';
import { SITE_URL, allLocalizedPaths } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return allLocalizedPaths().map((path) => ({ url: `${SITE_URL}${path}` }));
}
