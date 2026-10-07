import Image from 'next/image';
import type { ProjectImage } from '@/lib/content/schema';
import type { Locale } from '@/lib/i18n';

const DESKTOP_SIZE = { width: 1600, height: 1000 } as const;

export function pickCover(images: ProjectImage[]): ProjectImage {
  return images.find((image) => image.viewport === 'desktop') ?? images[0];
}

export function ProjectCover({
  image,
  locale,
  sizes,
  priority = false,
}: {
  image: ProjectImage;
  locale: Locale;
  sizes: string;
  priority?: boolean;
}) {
  const mobile = image.viewport === 'mobile';
  return (
    <div
      className={`aspect-[16/10] overflow-hidden rounded-md border border-border bg-surface ${mobile ? 'grid place-items-center p-4' : ''}`}
    >
      <Image
        src={`/${image.src}`}
        alt={image.alt[locale]}
        {...DESKTOP_SIZE}
        sizes={sizes}
        unoptimized
        priority={priority}
        className={mobile ? 'h-full w-auto object-contain' : 'size-full object-cover object-top'}
      />
    </div>
  );
}
