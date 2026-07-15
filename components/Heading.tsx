import type { ElementType, ReactNode } from 'react';

// The display type scale lives here so section and page headings come from one
// place. `display` is the page/hero heading size; `section` is the in-page h2 size.
// Display carries the heavier weight and tighter tracking for a more confident,
// editorial feel; color is inherited (ink on light, set per-use on dark).
// Display headings are balanced so a two-line title splits evenly instead of
// stranding a last word, which is what left "Clearing" and "Relocation" alone on
// their own line. Browsers without text-wrap: balance ignore it and wrap as
// before, so there is nothing to fall back to.
const sizeClasses = {
  display:
    'text-balance text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.02em]',
  section: 'text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.015em]',
} as const;

export type HeadingSize = keyof typeof sizeClasses;

interface HeadingProps {
  children: ReactNode;
  /** Semantic tag. Display styling comes from `size`, not the tag. */
  as?: ElementType;
  size?: HeadingSize;
  /** Extra classes for per-use needs like max-width, a bottom margin, or color. */
  className?: string;
}

export default function Heading({
  children,
  as: Tag = 'h2',
  size = 'section',
  className,
}: HeadingProps) {
  return (
    <Tag
      className={`font-display ${sizeClasses[size]}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </Tag>
  );
}
