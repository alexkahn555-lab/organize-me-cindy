'use client';

import { useState } from 'react';
import Image from 'next/image';

// Lite YouTube embed. The grid ships nine of these, and loading nine real
// iframes on view would pull megabytes of YouTube script before anyone presses
// play. So each tile is just a thumbnail and a play button until it is clicked;
// only then does the iframe mount and autoplay. The thumbnail comes from
// i.ytimg.com, the host already allowed in next.config.mjs.

interface LiteVideoProps {
  id: string;
  /** Used for the button's accessible name; not shown, the grid has no captions. */
  title: string;
}

export default function LiteVideo({ id, title }: LiteVideoProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[8px] bg-ink shadow-sm">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 shadow-md transition-transform duration-150 ease-out group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="ml-0.5 h-6 w-6 fill-sage-deep"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
