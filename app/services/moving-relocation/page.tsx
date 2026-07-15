import type { Metadata } from 'next';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import Section from '@/components/Section';
import { getService } from '@/lib/services';
import { serviceJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import ChapterTimeline, { type Chapter } from './ChapterTimeline';

// Static sibling route, same pattern as hoarding: Next prefers this file over
// the [slug] template, which now serves only the remaining two services.

const service = getService('moving-relocation')!;

export const metadata: Metadata = {
  title: `${service.title} | ${site.wordmark}`,
  description: service.intro,
};

// Chapter one and three carry the copy from lib/services.ts. Chapter two is
// fresh: the source file has no moving-week section, so this stays inside the
// facts the intro already states (packing, coordinating with movers, setting
// up the new home).
const chapters: Chapter[] = [
  {
    numeral: '01',
    title: 'Before the move',
    body: service.sections[0].body,
    items: [
      'We decide together what is worth taking.',
      'We donate, recycle, auction, or sell what you are ready to part with.',
      'We pack what remains, labeled by room.',
      'We coordinate with your movers so nothing gets lost in the rush.',
    ],
  },
  {
    numeral: '02',
    title: 'Moving week',
    body: 'Moving week is when a house full of decisions becomes a truck full of boxes. You do not have to direct it. We finish the packing, work with your movers, and keep every box pointed at the room where it belongs in the new home.',
    items: [
      'We finish the packing before the truck arrives.',
      'We work with your movers on moving day.',
      'Every box leaves labeled for the room it is headed to.',
    ],
  },
  {
    numeral: '03',
    title: 'Settling in',
    body: service.sections[1].body,
    items: [
      'We unpack every box, so you are not living out of them for weeks.',
      'We set up each room around how you actually live.',
      'We work on our own or alongside your interior designer.',
    ],
  },
];

export default function MovingPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />

      {/* Hero. Header image beside the heading, matching the hoarding page's
          hero pattern. The AI ambience image sits in the mood slot; alt stays
          minimal here and is finalized in the alt-text pass. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:py-24">
          <div className="min-w-0">
            <Heading as="h1" size="display" className="max-w-[14ch]">
              {service.title}
            </Heading>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted">
              {service.intro}
            </p>
            <div className="mt-9">
              <Button href="/contact">Talk with Cindy</Button>
            </div>
          </div>
          <PhotoFrame
            slug="ai-service-moving"
            label="Moving day"
            alt="A room mid-move with stacked boxes beside a bookshelf"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="3/2"
            className="min-w-0"
          />
        </div>
      </section>

      {/* The three chapters along the timeline spine. The full-width frame
          between chapters two and three breaks the text rhythm on purpose. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-content px-6 pb-20 pt-4 md:pb-28">
          <ChapterTimeline
            chapters={chapters}
            interludeAfter={1}
            interlude={
              <PhotoFrame
                slug="ai-band-moving-settled"
                label="Client living room"
                alt="Stacked moving boxes and a rolled rug by a sunlit window"
                sizes="(min-width: 1200px) 1152px, 100vw"
                position="50% 40%"
                ratio="16/6"
              />
            }
          />
        </div>
      </section>

      <Section
        width="prose"
        background="surface"
        padding="lg"
        center
        heading="Start the next chapter calm."
        intro="Tell us when you are moving and where. We will map the steps from here to a finished home."
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
    </article>
  );
}
