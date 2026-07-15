import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import PhotoFrame from '@/components/PhotoFrame';
import Section from '@/components/Section';
import { getServicesOrdered } from '@/lib/services';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Services | ${site.wordmark}`,
  description: `Professional organizing services for homes across ${site.serviceArea}. Hoarding and estate clearing, moving, home organizing, offices and paperwork.`,
};

// One emotional promise per row. The full service copy lives in
// lib/services.ts; these lines sell the feeling, not the checklist.
const promises: Record<string, string> = {
  'hoarding-estate-clearing':
    'A hard chapter, met with complete understanding and no judgment.',
  'moving-relocation':
    'A new home that feels calm from the very first night.',
  'home-organizing':
    'Rooms that stay calm long after we leave.',
  'offices-paperwork':
    'Paperwork that stops piling up, and files you can find in seconds.',
};

// The second row runs larger and carries the photo slot. That scale is layout
// variety fixed at build time, per the reference render. It is not a hover
// state and nothing animates it.
const FEATURED_SLUG = 'moving-relocation';

// The hover and focus state: the row's resting hairline is overlaid by a 2px
// sage rule, and the arrow slides 4px right, both at 200ms ease-out. The rule
// is an absolutely positioned overlay rather than a border change so the row
// never shifts. Keyboard focus lands the identical state through
// focus-within, keyed off the link's focus-visible.
const ROW_LINK =
  'group block outline-none';
const ROW_ARROW =
  'h-7 w-7 shrink-0 text-sage-deep transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1';

function RowArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={ROW_ARROW}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h19M16 7l7 7-7 7" />
    </svg>
  );
}

function RowRule() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
      <span className="absolute inset-x-0 bottom-0 block h-px bg-line" />
      <span className="absolute inset-x-0 bottom-0 block h-[2px] bg-sage opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />
    </span>
  );
}

export default function ServicesPage() {
  const services = getServicesOrdered();

  return (
    <>
      <Section
        width="content"
        background="paper"
        padding="headerCompact"
        heading="Every room. Every stage of life."
        headingAs="h1"
        headingSize="display"
        headingClassName="max-w-[16ch]"
        intro="Four ways we help, from a single closet to a whole estate. We work at your pace, and we are bonded and insured."
        introClassName="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted"
      />

      {/* The index: full-width editorial rows between hairlines, no cards. */}
      <div className="bg-paper pb-4">
        <ul className="mx-auto max-w-content px-6">
          {services.map((service) => {
            const featured = service.slug === FEATURED_SLUG;
            return (
              <li key={service.slug} className="group relative">
                <Link
                  href={`/services/${service.slug}`}
                  className={ROW_LINK}
                  aria-label={`${service.navTitle}: ${promises[service.slug]}`}
                >
                  {featured ? (
                    /* On mobile the photo stacks above a normal arrowed row,
                       so every row on the phone reads the same way. On md+
                       the text leads, the photo sits mid-row, the arrow
                       holds the right edge. */
                    <div className="grid items-center gap-8 py-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] md:gap-12 md:py-20">
                      <PhotoFrame
                        slug="living-room-apt-progress-01"
                        label="Client home, after the move"
                        alt="A cleared living room wall with a pine hutch, an empty clothing rack, and two small cabinets on open carpet"
                        ratio="4/3"
                        className="min-w-0 md:order-2"
                      />
                      <div className="flex min-w-0 items-center gap-8 md:order-1 md:block">
                        <div className="min-w-0 flex-1">
                          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                            {service.navTitle}
                          </h2>
                          <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-muted">
                            {promises[service.slug]}
                          </p>
                        </div>
                        <span className="md:hidden">
                          <RowArrow />
                        </span>
                      </div>
                      <div className="hidden md:order-3 md:block">
                        <RowArrow />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-8 py-12 md:py-14">
                      <div className="min-w-0 flex-1">
                        <h2 className="font-display text-[clamp(2rem,3.6vw,2.875rem)] leading-[1.08] tracking-[-0.015em] text-ink">
                          {service.navTitle}
                        </h2>
                        <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-muted">
                          {promises[service.slug]}
                        </p>
                      </div>
                      <RowArrow />
                    </div>
                  )}
                </Link>
                <RowRule />
              </li>
            );
          })}
        </ul>
      </div>

      {/* The page's closing conversion band. */}
      <Section
        width="prose"
        background="surface"
        padding="lg"
        center
        heading="Not sure where to start?"
        intro="Most clients are not. Tell us what the house looks like today and we will suggest the first step."
        introClassName="mx-auto mt-6 max-w-[32rem] text-lg leading-relaxed text-muted"
      >
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href="/contact">Talk with Cindy</Button>
          <a
            href={site.phoneHref}
            className="text-base text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </Section>
    </>
  );
}
