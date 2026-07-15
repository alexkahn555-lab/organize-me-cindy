// The single photo treatment for the whole site. Every image slot goes through
// this component, so a wired image and a placeholder sit in the exact same
// box: 8px radius, warm plate, fixed aspect ratio. Nothing shifts when a slot
// gains its image.
//
// A slot renders its image only when `slug` resolves in lib/media.ts, which
// holds only approved sources. Everything else stays a labelled placeholder.
// Proof slots (before/after chapters, the founder portrait) only ever carry
// confirmed real photography; approved ambience imagery lives in mood slots
// only, and its alt text describes the scene, never client work.
//
// This component never stretches a small source across a wide slot.

import Image from 'next/image';
import { images } from '@/lib/media';

export type PhotoRatio = '4/3' | '3/2' | '3/4' | '16/9' | '16/6' | '1/1';

interface PhotoFrameProps {
  /**
   * The slot's key into lib/media.ts. Unresolved slugs (or none) render the
   * labelled placeholder, so unconfirmed slots cannot ship an image.
   */
  slug?: string | null;
  /** Small-caps placeholder label, e.g. CLIENT PHOTO, FOUNDER PHOTO, BEFORE. */
  label?: string;
  /** Required whenever the slug resolves: what the scene shows. */
  alt?: string;
  /** next/image sizes hint; default assumes a full-width slot. */
  sizes?: string;
  /** object-position for the cover crop, when center slices the subject. */
  position?: string;
  ratio?: PhotoRatio;
  /**
   * How the image sits in the frame. 'cover' (default) fills and crops to the
   * frame; 'contain' shows the whole image, letterboxed against the frame's
   * background. Use 'contain' with a bg-* className to set the letterbox color.
   */
  fit?: 'cover' | 'contain';
  className?: string;
}

export default function PhotoFrame({
  slug,
  label = 'Client photo',
  alt,
  sizes = '100vw',
  position,
  ratio = '4/3',
  fit = 'cover',
  className,
}: PhotoFrameProps) {
  const image = slug ? images[slug] : undefined;

  return (
    // 8px radius and the soft warm plate, identical everywhere. Nothing on this
    // site casts a heavier shadow than this.
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[8px] bg-surface shadow-sm${
        className ? ` ${className}` : ''
      }`}
      style={{ aspectRatio: ratio }}
      data-photo-slot={slug ?? undefined}
    >
      {image ? (
        <Image
          src={image.srcWebp}
          alt={alt ?? ''}
          fill
          sizes={sizes}
          className={fit === 'contain' ? 'object-contain' : 'object-cover'}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <span className="px-4 text-center text-xs uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
      )}
    </div>
  );
}
