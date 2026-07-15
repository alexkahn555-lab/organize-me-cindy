import type { ReactNode } from 'react';

// Newsreader italic, the display face's second voice. Used for the hoarding
// promise block and nothing else casual: this is not a general emphasis style.
// The keyline is a 1px sage box, which is legal for a non-text accent at any
// size. There is no text shadow (the render has one; it is a render artifact).

interface PullQuoteProps {
  children: ReactNode;
  /** A muted fact line under the quote, inside the same keyline. */
  footnote?: ReactNode;
  /** Draw the sage keyline box around the quote. */
  keyline?: boolean;
  className?: string;
}

export default function PullQuote({
  children,
  footnote,
  keyline = false,
  className,
}: PullQuoteProps) {
  return (
    <figure
      className={`${
        keyline ? 'border border-sage px-6 py-12 sm:px-12 sm:py-16' : ''
      } text-center${className ? ` ${className}` : ''}`}
    >
      <blockquote>
        <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] italic leading-snug text-ink">
          {children}
        </p>
      </blockquote>
      {footnote && (
        <figcaption className="mt-6 text-sm text-muted">{footnote}</figcaption>
      )}
    </figure>
  );
}
