'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { images } from '@/lib/media';

export interface BeforeAfterCardProps {
  beforeSlug: string;
  afterSlug: string;
  caption: string;
}

export default function BeforeAfterCard({
  beforeSlug,
  afterSlug,
  caption,
}: BeforeAfterCardProps) {
  const [open, setOpen] = useState(false);
  const before = images[beforeSlug];
  const after = images[afterSlug];

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  if (!before || !after) return null;

  // After carries the sage-deep fill, so the eye lands on the result. Before is
  // a neutral outline that recedes. The scrim behind Before is what keeps paper
  // text legible over an unpredictable photo.
  const pair = [
    { img: before, label: 'Before', chip: 'border-paper/70 bg-ink/40 text-paper' },
    { img: after, label: 'After', chip: 'border-sage-deep bg-sage-deep text-paper' },
  ] as const;

  return (
    <>
      <article className="overflow-hidden rounded-lg bg-surface">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View larger: ${caption}`}
          className="w-full cursor-zoom-in text-left"
        >
          <div className="grid grid-cols-2 gap-px bg-line">
            {pair.map(({ img, label, chip }) => (
              <div key={label} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.srcWebp}
                  alt={`${label}: ${caption}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                  className="object-cover transition-transform duration-200 ease-out hover:scale-[1.03]"
                />
                <span
                  className={`absolute left-2 top-2 rounded-full border px-2.5 py-0.5 text-xs font-medium ${chip}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </button>
        <p className="px-4 py-3 text-sm leading-relaxed text-muted">{caption}</p>
      </article>

      {/* Lightbox — TODO Phase 4: upgrade to a drag-to-compare slider */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Before and after: ${caption}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            autoFocus
            aria-label="Close lightbox"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {pair.map(({ img, label, chip }) => (
                <div key={label} className="relative overflow-hidden rounded-md">
                  <Image
                    src={img.srcWebp}
                    alt={`${label}: ${caption}`}
                    width={img.width}
                    height={img.height}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    className="block"
                    priority
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-sm font-medium ${chip}`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-paper/70">{caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
