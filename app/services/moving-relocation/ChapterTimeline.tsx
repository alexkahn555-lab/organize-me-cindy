'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// The moving page's three-chapter timeline. A hairline spine runs down the
// left gutter with a dot per chapter; as the reader scrolls, a sage-deep fill
// grows down the spine to the active chapter and that chapter's dot fills
// solid. Under prefers-reduced-motion the spine renders fully filled and
// static, every dot solid, and nothing listens to scroll.

export interface Chapter {
  numeral: string;
  title: string;
  body: string;
  items: string[];
}

interface ChapterTimelineProps {
  chapters: Chapter[];
  /** Rendered between chapters at this index and the next (0-based). */
  interlude?: ReactNode;
  interludeAfter?: number;
}

// The gutter column the spine runs through. The spine sits at its center.
const GUTTER = 'grid grid-cols-[2.75rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)]';
const SPINE_X = 'left-[1.375rem] md:left-8';

export default function ChapterTimeline({
  chapters,
  interlude,
  interludeAfter = 1,
}: ChapterTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [fillPx, setFillPx] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReduced = () => setReduced(mql.matches);
    syncReduced();
    mql.addEventListener('change', syncReduced);
    return () => mql.removeEventListener('change', syncReduced);
  }, []);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const container = containerRef.current;
      if (!container) return;
      const containerTop = container.getBoundingClientRect().top;
      // A chapter becomes active once its dot rises past the upper-middle of
      // the viewport, where the reader's eye actually is.
      const threshold = window.innerHeight * 0.55;
      let next = 0;
      dotRefs.current.forEach((dot, i) => {
        if (dot && dot.getBoundingClientRect().top < threshold) next = i;
      });
      setActive(next);
      const dot = dotRefs.current[next];
      if (dot) {
        const rect = dot.getBoundingClientRect();
        setFillPx(rect.top - containerTop + rect.height / 2);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  return (
    <div ref={containerRef} className="relative">
      {/* The spine: resting hairline plus the sage-deep fill. */}
      <span
        aria-hidden="true"
        className={`absolute ${SPINE_X} top-0 h-full w-px bg-line`}
      />
      <span
        aria-hidden="true"
        className={`absolute ${SPINE_X} top-0 w-[2px] -translate-x-[0.5px] bg-sage-deep transition-[height] duration-500 ease-out`}
        style={{ height: reduced ? '100%' : `${fillPx}px` }}
      />

      <ol className="relative">
        {chapters.map((chapter, i) => {
          const filled = reduced || i <= active;
          return (
            <li key={chapter.numeral} className={i > 0 ? 'mt-20 md:mt-28' : undefined}>
              <div className={GUTTER}>
                <span />
                <span
                  aria-hidden="true"
                  className="font-display text-[clamp(4rem,8vw,6.25rem)] leading-none text-sage"
                >
                  {chapter.numeral}
                </span>
              </div>
              <div className={`${GUTTER} mt-4 items-center`}>
                <span className="flex justify-center">
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 rounded-full border-2 border-sage-deep transition-colors duration-300 ${
                      filled ? 'bg-sage-deep' : 'bg-paper'
                    }`}
                  />
                </span>
                <h2 className="font-display text-[clamp(2rem,3.6vw,2.875rem)] leading-[1.08] tracking-[-0.015em] text-ink">
                  {chapter.title}
                </h2>
              </div>
              <div className={`${GUTTER} mt-6`}>
                <span />
                <div className="max-w-[38rem]">
                  <p className="leading-relaxed text-ink">{chapter.body}</p>
                  {/* The checklist: an editorial list with hanging numerals,
                      never icon tiles. The numerals are small text, so they
                      take sage-deep for contrast, per the token rules. */}
                  <ol className="mt-8 space-y-4">
                    {chapter.items.map((item, j) => (
                      <li
                        key={item}
                        className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline"
                      >
                        <span
                          aria-hidden="true"
                          className="font-display text-xl text-sage-deep"
                        >
                          {j + 1}
                        </span>
                        <span className="leading-relaxed text-muted">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {interlude && i === interludeAfter && (
                <div className="relative mt-20 md:mt-28">{interlude}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
