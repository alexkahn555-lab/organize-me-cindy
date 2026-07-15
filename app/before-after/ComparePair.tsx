'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Hairline from '@/components/Hairline';
import PhotoFrame, { type PhotoRatio } from '@/components/PhotoFrame';
import { images } from '@/lib/media';

// One project's before/after media. Three presentations, one component:
// - md+ with motion allowed: the drag slider (sage rule, circular grip,
//   BEFORE/AFTER corner labels). The grip is a real slider control, so the
//   comparison is fully keyboard-operable: arrows, Home, End.
// - below md: the stacked pair, per the mobile render.
// - prefers-reduced-motion: the stacked pair at every width. A drag wipe is
//   exactly the kind of motion that setting asks us not to play.
//
// A slug that resolves in lib/media.ts renders its photo in both the slider
// layer and the stacked frame; anything unresolved stays the CLIENT PHOTO
// plate, so an unconfirmed pair cannot ship an image.

interface ComparePairProps {
  room: string;
  beforeSlug: string;
  afterSlug: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** object-position per side, when the cover crop needs steering. */
  beforePosition?: string;
  afterPosition?: string;
  /**
   * Frame ratio for the pair, matched to the sources' orientation. The same
   * value drives the desktop slider container and both stacked frames, so
   * every presentation crops identically.
   */
  ratio?: PhotoRatio;
}

const CORNER_LABEL =
  'pointer-events-none absolute top-4 text-xs font-medium uppercase tracking-[0.18em]';
// Each plate label centers in its own half of the frame, like the reference,
// so the wipe never slices a label at the resting position.
const PLATE_LABEL =
  'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs uppercase tracking-[0.14em] text-muted';

function StackedPair({
  room,
  beforeSlug,
  afterSlug,
  beforeAlt,
  afterAlt,
  beforePosition,
  afterPosition,
  ratio = '4/3',
}: ComparePairProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        Before
      </p>
      <PhotoFrame
        slug={beforeSlug}
        label="Client photo"
        alt={beforeAlt}
        position={beforePosition}
        sizes="(min-width: 1200px) 1152px, 100vw"
        ratio={ratio}
        className="mt-3"
      />
      <Hairline tone="sage" className="my-7" />
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        After
      </p>
      <PhotoFrame
        slug={afterSlug}
        label="Client photo"
        alt={afterAlt}
        position={afterPosition}
        sizes="(min-width: 1200px) 1152px, 100vw"
        ratio={ratio}
        className="mt-3"
      />
      <span className="sr-only">Before and after photos: {room}</span>
    </div>
  );
}

// Corner labels sit on a small paper chip once a photo is underneath, so
// BEFORE/AFTER stay readable at any exposure. Over the placeholder plate the
// chip is dropped and the label reads as plain muted text, as before.
function cornerLabelClass(hasImage: boolean, side: 'left' | 'right') {
  const edge = side === 'left' ? 'left-5' : 'right-5';
  return `${CORNER_LABEL} ${edge} ${
    hasImage ? 'rounded-[4px] bg-paper/90 px-2 py-1 text-ink' : 'text-muted'
  }`;
}

function Slider({
  room,
  beforeSlug,
  afterSlug,
  beforeAlt,
  afterAlt,
  beforePosition,
  afterPosition,
  ratio = '4/3',
}: ComparePairProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const before = images[beforeSlug];
  const after = images[afterSlug];

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      setPos(0);
    } else if (e.key === 'End') {
      setPos(100);
    } else {
      return;
    }
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="relative touch-none overflow-hidden rounded-[8px] shadow-sm"
      style={{ aspectRatio: ratio }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* Before: the base layer. */}
      <div
        className="absolute inset-0 bg-surface"
        data-photo-slot={beforeSlug}
      >
        {before ? (
          <Image
            src={before.srcWebp}
            alt={beforeAlt ?? ''}
            fill
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="object-cover"
            style={beforePosition ? { objectPosition: beforePosition } : undefined}
          />
        ) : (
          <span className={PLATE_LABEL} style={{ left: '25%' }}>
            Client photo
          </span>
        )}
        <span className={cornerLabelClass(Boolean(before), 'left')}>Before</span>
      </div>
      {/* After: clipped to the right of the rule. */}
      <div
        className="absolute inset-0 bg-paper"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        data-photo-slot={afterSlug}
      >
        {after ? (
          <Image
            src={after.srcWebp}
            alt={afterAlt ?? ''}
            fill
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="object-cover"
            style={afterPosition ? { objectPosition: afterPosition } : undefined}
          />
        ) : (
          <span className={PLATE_LABEL} style={{ left: '75%' }}>
            Client photo
          </span>
        )}
        <span className={cornerLabelClass(Boolean(after), 'right')}>After</span>
      </div>
      {/* The rule and its grip. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-sage"
        style={{ left: `${pos}%` }}
      />
      <button
        type="button"
        role="slider"
        aria-label={`Compare before and after: ${room}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} percent after`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full border-2 border-paper bg-sage-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
        style={{ left: `${pos}%` }}
      />
    </div>
  );
}

export default function ComparePair(props: ComparePairProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mql.matches);
    sync();
    mql.addEventListener('change', sync);
    return () => mql.removeEventListener('change', sync);
  }, []);

  if (reduced) return <StackedPair {...props} />;

  return (
    <>
      <div className="hidden md:block">
        <Slider {...props} />
      </div>
      <div className="md:hidden">
        <StackedPair {...props} />
      </div>
    </>
  );
}
