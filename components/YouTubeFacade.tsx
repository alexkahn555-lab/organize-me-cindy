'use client';

import { useState } from 'react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);
  // Prefer the high-res poster; fall back to hqdefault if the video has none.
  const [posterSrc, setPosterSrc] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={posterSrc}
              alt={title}
              fill
              sizes="(max-width: 720px) 100vw, 720px"
              className="object-cover"
              onError={() =>
                setPosterSrc(
                  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                )
              }
            />
            <div className="absolute inset-0 bg-black/20" />
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label={`Play ${title}`}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage transition-colors group-hover:bg-sage-deep">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-7 w-7 translate-x-0.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
