import Image from 'next/image';
import type { ProjectImage } from '@/lib/content/schema';
import { thumbOf } from '@/lib/content/thumb';
import type { Locale } from '@/lib/i18n';

export const IMAGE_SIZE = { desktop: { width: 1600, height: 1000 }, mobile: { width: 780, height: 1688 } } as const;

export function pickCover(images: ProjectImage[]): ProjectImage {
  return images.find((image) => image.viewport === 'desktop') ?? images[0];
}

export function ProjectCover({
  image,
  locale,
  sizes,
  priority = false,
  thumb = false,
}: {
  image: ProjectImage;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  thumb?: boolean;
}) {
  const mobile = image.viewport === 'mobile';
  const src = `/${thumb ? thumbOf(image.src) : image.src}`;
  return (
    <div className="aspect-16/10 overflow-hidden rounded-md border border-border bg-surface">
      {mobile ? (
        <div className="flex h-full items-start justify-center pt-6">
          <Image
            src={src}
            alt={image.alt[locale]}
            {...IMAGE_SIZE.mobile}
            unoptimized
            sizes="320px"
            priority={priority}
            className="w-[38%] rounded-md border border-border shadow-[0_0_0_6px_var(--surface)]"
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={image.alt[locale]}
          {...IMAGE_SIZE.desktop}
          unoptimized
          sizes={sizes}
          priority={priority}
          className="size-full object-cover object-left-top"
        />
      )}
    </div>
  );
}
