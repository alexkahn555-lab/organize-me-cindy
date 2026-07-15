'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// A room in the gallery walk: a PhotoFrame child with a museum-label caption
// beneath it. The caption fades in and rises 6px, once, when the room enters
// the viewport.
//
// The caption is VISIBLE by default and only hidden after hydration, and only
// when motion is allowed. So captions are always visible for reduced-motion
// visitors and when JavaScript never arrives, and the animation is purely an
// enhancement on top.

interface RoomFigureProps {
  children: ReactNode;
  /** The caps line, e.g. "The kitchen". Rendered uppercase and letter-spaced. */
  caps: string;
  /** The muted Inter subline under the caps line. */
  subline: string;
  className?: string;
  captionAlign?: 'left' | 'center';
  /** Extra classes on the figcaption, e.g. to keep a full-bleed room's label
      on the content grid. */
  captionClassName?: string;
}

export default function RoomFigure({
  children,
  caps,
  subline,
  className,
  captionAlign = 'left',
  captionClassName,
}: RoomFigureProps) {
  const ref = useRef<HTMLElement>(null);
  // 'visible' (SSR, no-JS, reduced motion) -> 'pending' -> 'revealed', once.
  const [phase, setPhase] = useState<'visible' | 'pending' | 'revealed'>(
    'visible',
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    setPhase('pending');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPhase('revealed');
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={className}>
      {children}
      <figcaption
        className={`mt-5 ${
          captionAlign === 'center' ? 'text-center' : ''
        } transition-[opacity,transform] duration-300 ease-out ${
          phase === 'pending'
            ? 'translate-y-[6px] opacity-0'
            : 'translate-y-0 opacity-100'
        }${captionClassName ? ` ${captionClassName}` : ''}`}
      >
        {/* Small caps in the accent color take sage-deep, not sage: at this
            size the label is small text and must clear AA on paper. */}
        <span className="block text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-sage-deep">
          {caps}
        </span>
        <span className="mt-1.5 block text-base leading-relaxed text-muted">
          {subline}
        </span>
      </figcaption>
    </figure>
  );
}
