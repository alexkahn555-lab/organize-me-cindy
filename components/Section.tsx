import type { ReactNode } from 'react';
import Heading, { type HeadingSize } from './Heading';

// Background and the vertical-rhythm (padding) scale live here so section spacing
// is set in one place. The scale is a deliberate ramp: page heroes (`header`) are
// the tallest, feature sections (`lg`) next, content sections (`base`) shortest,
// so the page has a clear hero-versus-section hierarchy.
const backgroundClasses = {
  paper: 'bg-paper',
  surface: 'bg-surface',
  ink: 'bg-ink',
} as const;

const paddingClasses = {
  base: 'py-16 md:py-24',
  lg: 'py-20 md:py-28',
  header: 'py-24 md:py-36',
  headerCompact: 'py-16 md:py-20',
  story: 'py-16 md:py-24',
  flush: 'py-6',
} as const;

// `content` is the full page measure. `prose` is the single-column fallback for
// a composition whose image slot is empty: a centered column that lands around
// 60 to 65 characters, so the section reads as deliberate rather than as a
// two-column layout missing its right half.
// Sized against the 18px body copy, which is the text being read. Measured, not
// assumed: a CSS `ch` is the width of the "0" glyph and runs wider than an
// average character, so a nominal 65ch set 73 characters to the line. This
// lands body copy at roughly 63.
const widthClasses = {
  content: 'max-w-content',
  prose: 'max-w-[37rem]',
} as const;

const DEFAULT_INTRO_CLASS = 'mt-6 text-lg leading-relaxed text-muted';

// One editorial eyebrow treatment for the whole site: a small display italic in
// sage-deep, the second-style accent the rest of the type does not use.
// sage-deep, not sage: at this size the eyebrow is small text and needs AA on
// the surface background too.
const EYEBROW_CLASS = 'font-display text-[0.9375rem] italic text-sage-deep';

type Width = keyof typeof widthClasses;

interface SectionBaseProps {
  children?: ReactNode;
  background?: keyof typeof backgroundClasses;
  padding?: keyof typeof paddingClasses;
  /** Center the entire inner content (heading + body), e.g. for CTAs. */
  center?: boolean;
  /** Extra classes on the inner container. */
  className?: string;
  /** Optional eyebrow label above the heading. */
  eyebrow?: ReactNode;
  /** Optional heading, rendered through the Heading primitive. */
  heading?: ReactNode;
  headingAs?: 'h1' | 'h2';
  headingSize?: HeadingSize;
  headingClassName?: string;
  /** Optional intro paragraph below the heading. */
  intro?: ReactNode;
  introClassName?: string;
  /** Center just the heading block while content below stays left-aligned. */
  headerAlign?: 'left' | 'center';
  /** `split` puts the heading block in a left rail and content on the right. */
  variant?: 'stack' | 'split';
  /**
   * Paper grain over the band. Offices page only, and only on a `surface` band.
   * The reference tile ships as a 2.4MB PNG of an almost featureless tan field;
   * at 3% opacity none of it survives except the page weight, so the grain is
   * generated instead.
   */
  grain?: boolean;
}

// fractalNoise at one octave, inlined. Roughly 300 bytes against the tile's 2.4MB.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/**
 * `width` is only optional when there is a `media` image to fill the second
 * column. A section without one is carrying its content at the full page
 * measure, and that measure is wrong for running text: it has to say whether it
 * is a `content` band (a grid, a gallery, a card index) or a `prose` band (a
 * centred reading column). Leaving it to a default is what let a text band
 * silently render at the full measure, so the type no longer offers the choice.
 *
 * The default cannot simply be flipped to `prose`: most sections on the site are
 * grids and galleries that need the full measure, and defaulting them to a
 * reading column collapses them to 37rem.
 */
type SectionProps = SectionBaseProps &
  (
    | {
        /**
         * Image for a two-column image-and-text composition. Present, the
         * section is two columns and `width` defaults to the page measure.
         */
        media: ReactNode;
        width?: Width;
      }
    | {
        /** No image, so the section is single-column and must state its measure. */
        media?: undefined;
        width: Width;
      }
  );

export default function Section({
  children,
  background = 'paper',
  padding = 'base',
  center = false,
  className,
  eyebrow,
  heading,
  headingAs = 'h2',
  headingSize = 'section',
  headingClassName,
  intro,
  introClassName,
  headerAlign = 'left',
  variant = 'stack',
  grain = false,
  media,
  width = 'content',
}: SectionProps) {
  const eyebrowMargin = headingSize === 'display' ? 'mb-5' : 'mb-4';
  const hasHeader = Boolean(eyebrow || heading || intro);

  const headerInner = hasHeader ? (
    <>
      {eyebrow && <p className={`${eyebrowMargin} ${EYEBROW_CLASS}`}>{eyebrow}</p>}
      {heading && (
        <Heading as={headingAs} size={headingSize} className={headingClassName}>
          {heading}
        </Heading>
      )}
      {intro && <p className={introClassName ?? DEFAULT_INTRO_CLASS}>{intro}</p>}
    </>
  ) : null;

  let body: ReactNode;
  if (media) {
    body = (
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="min-w-0">
          {headerInner}
          {children}
        </div>
        <div className="min-w-0">{media}</div>
      </div>
    );
  } else if (variant === 'split') {
    body = (
      <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        <div>{headerInner}</div>
        <div>{children}</div>
      </div>
    );
  } else {
    body = (
      <>
        {hasHeader &&
          (headerAlign === 'center' ? (
            <div className="text-center">{headerInner}</div>
          ) : (
            headerInner
          ))}
        {children}
      </>
    );
  }

  return (
    <section className={`relative ${backgroundClasses[background]}`}>
      {grain && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: GRAIN_URL }}
        />
      )}
      <div
        className={`relative mx-auto ${widthClasses[width]} px-6 ${paddingClasses[padding]}${
          center ? ' text-center' : ''
        }${className ? ` ${className}` : ''}`}
      >
        {body}
      </div>
    </section>
  );
}
