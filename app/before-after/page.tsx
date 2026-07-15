import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import Section from '@/components/Section';
import { site } from '@/lib/site';
import { pairs, squareAfters, officeAfter, videos } from '@/lib/our-work';
import LiteVideo from './LiteVideo';

export const metadata: Metadata = {
  title: `Our Work | ${site.wordmark}`,
  description: `Before and after projects from homes across ${site.serviceArea}. Real client rooms, photographed and shared with permission.`,
};

// Section header: a centered display title with a hairline rule running out to
// each margin.
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      <Heading
        as="h2"
        size="section"
        className="text-center text-[clamp(1.5rem,2.6vw,2.125rem)]"
      >
        {children}
      </Heading>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}

const CORNER_LABEL =
  'pointer-events-none absolute top-3 rounded-[4px] bg-paper/90 px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] shadow-sm';

export default function OurWorkPage() {
  return (
    <>
      <Section
        width="content"
        background="paper"
        padding="headerCompact"
        heading="Our work, room by room."
        headingAs="h1"
        headingSize="display"
        headingClassName="max-w-[16ch]"
        intro="Every project here is a real client home, photographed and shared with permission."
        introClassName="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted"
      />

      {/* 1 — Before and after pairs, side by side. */}
      <section className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto max-w-content px-6">
          <SectionHeading>Before &amp; after</SectionHeading>
          <div className="mt-12 space-y-10 md:mt-16 md:space-y-16">
            {pairs.map((pair) => (
              <div key={pair.beforeSlug} className="grid grid-cols-2 gap-3 md:gap-5">
                <div className="relative min-w-0">
                  <PhotoFrame
                    slug={pair.beforeSlug}
                    label="Client photo"
                    alt={pair.beforeAlt}
                    position={pair.beforePosition}
                    sizes="(min-width: 768px) 45vw, 50vw"
                    ratio="4/3"
                  />
                  <span className={`${CORNER_LABEL} left-3 text-ink`}>Before</span>
                </div>
                <div className="relative min-w-0">
                  <PhotoFrame
                    slug={pair.afterSlug}
                    label="Client photo"
                    alt={pair.afterAlt}
                    position={pair.afterPosition}
                    sizes="(min-width: 768px) 45vw, 50vw"
                    ratio="4/3"
                  />
                  <span className={`${CORNER_LABEL} right-3 text-sage-deep`}>After</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Standalone finished spaces: three square tiles, then a wide band. */}
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-content px-6">
          <SectionHeading>Finished spaces</SectionHeading>
          <div className="mt-12 grid grid-cols-3 gap-3 md:mt-16 md:gap-5">
            {squareAfters.map((tile) => (
              <PhotoFrame
                key={tile.slug}
                slug={tile.slug}
                label="Client photo"
                alt={tile.alt}
                sizes="(min-width: 1200px) 384px, 33vw"
                ratio="1/1"
              />
            ))}
          </div>
          <div className="mt-3 md:mt-5">
            <PhotoFrame
              slug={officeAfter.slug}
              label="Client photo"
              alt={officeAfter.alt}
              sizes="(min-width: 1200px) 1152px, 100vw"
              ratio="16/6"
            />
          </div>
        </div>
      </section>

      {/* 3 — Video row: nine lite-embeds in a 3x3 grid. */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-content px-6">
          <SectionHeading>On video</SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
            {videos.map((video) => (
              <LiteVideo key={video.id} id={video.id} title={video.title} />
            ))}
          </div>
        </div>
      </section>

      <Section
        width="prose"
        background="surface"
        padding="lg"
        center
        heading="Your room could be next."
        intro="Tell us which one you keep closing the door on. That is usually the right place to start."
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
