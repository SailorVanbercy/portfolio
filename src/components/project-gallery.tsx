'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ProjectImage } from '@/lib/content/schema';
import { format } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';

export interface GalleryLabels {
  open: string;
  close: string;
  previous: string;
  next: string;
  imageOf: string;
}

const SIZE = { desktop: { width: 1600, height: 1000 }, mobile: { width: 780, height: 1688 } } as const;
const controlClass = 'rounded-full border border-border px-4 py-1.5 text-sm hover:border-fg';

export function ProjectGallery({ images, locale, labels }: { images: ProjectImage[]; locale: Locale; labels: GalleryLabels }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = images.length;
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count));
  const current = index === null ? null : images[index];

  // Open as a native modal (focus trap, Escape, backdrop); jsdom lacks showModal, so fall back to `open`.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }, [index]);

  const close = () => {
    if (dialogRef.current?.open && typeof dialogRef.current.close === 'function') dialogRef.current.close();
    setIndex(null);
  };

  return (
    <>
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${labels.open}: ${image.alt[locale]}`}
              className={`block w-full cursor-zoom-in overflow-hidden rounded-md border border-border bg-surface ${
                image.viewport === 'mobile' ? 'flex aspect-16/10 items-start justify-center pt-6' : ''
              }`}
            >
              <Image
                src={`/${image.src}`}
                alt={image.alt[locale]}
                {...SIZE[image.viewport]}
                unoptimized
                sizes={image.viewport === 'mobile' ? '320px' : '(min-width: 640px) 50vw, 100vw'}
                className={
                  image.viewport === 'mobile'
                    ? 'w-[38%] rounded-md border border-border object-contain'
                    : 'h-auto w-full'
                }
              />
            </button>
            <p className="mt-2 text-sm text-muted">{image.alt[locale]}</p>
          </li>
        ))}
      </ul>

      {current && index !== null && (
        <dialog
          ref={dialogRef}
          aria-label={current.alt[locale]}
          onClose={() => setIndex(null)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
          }}
          className="m-auto max-h-[94dvh] w-[min(96vw,1400px)] max-w-none rounded-lg border border-border bg-bg p-4 text-fg backdrop:bg-black/70 sm:p-6"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm text-muted">{format(labels.imageOf, { i: index + 1, n: count })}</p>
            <button type="button" onClick={close} className={controlClass}>
              {labels.close}
            </button>
          </div>
          <Image
            src={`/${current.src}`}
            alt={current.alt[locale]}
            {...SIZE[current.viewport]}
            unoptimized
            className="mx-auto max-h-[72dvh] w-auto object-contain"
          />
          <p className="mt-3 text-center">{current.alt[locale]}</p>
          {count > 1 && (
            <div className="mt-4 flex justify-between">
              <button type="button" onClick={() => step(-1)} className={controlClass}>
                {labels.previous}
              </button>
              <button type="button" onClick={() => step(1)} className={controlClass}>
                {labels.next}
              </button>
            </div>
          )}
        </dialog>
      )}
    </>
  );
}
