import type { Metadata } from 'next';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import Section from '@/components/Section';
import { getService } from '@/lib/services';
import { serviceJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import RoomFigure from './RoomFigure';

// Static sibling route, same pattern as hoarding and moving. Only
// offices-paperwork still renders through the [slug] template.

const service = getService('home-organizing')!;

export const metadata: Metadata = {
  title: `${service.title} | ${site.wordmark}`,
  description: service.intro,
};

const [rooms, garage, keepsakes] = service.sections;

export default function HomeOrganizingPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />

      <Section
        width="content"
        background="paper"
        padding="headerCompact"
        heading={service.title}
        headingAs="h1"
        headingSize="display"
        intro={service.intro}
        introClassName="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted"
      >
        <div className="mt-9">
          <Button href="/contact">Talk with Cindy</Button>
        </div>
      </Section>

      {/* The gallery walk. Three rooms at three deliberately different
          widths: full-bleed, two-thirds with text beside, centered. Captions
          are museum labels; sublines come from the service copy. */}
      <section className="bg-paper pb-20 pt-8 md:pb-28">
        {/* Room one: the kitchen, edge to edge. The caption stays on the
            content grid so the label reads at the page margin. */}
        <RoomFigure
          caps="The kitchen"
          subline="Designed around how your family actually cooks."
          className="w-full"
          captionClassName="mx-auto max-w-content px-6"
        >
          <PhotoFrame
            slug="ai-home-organizing-kitchen"
            label="The kitchen"
            alt="Tidy kitchen with open wood shelves and an island with two stools"
            sizes="100vw"
            position="50% 20%"
            ratio="16/6"
            className="rounded-none"
          />
        </RoomFigure>

        {/* Room two: the hall closet, two-thirds right, text beside it. */}
        <div className="mx-auto mt-20 grid max-w-content items-center gap-10 px-6 md:mt-28 md:grid-cols-3 md:gap-14">
          <div className="min-w-0 md:col-span-1">
            <Heading
              as="h2"
              size="section"
              className="text-[clamp(1.625rem,2.4vw,2.125rem)]"
            >
              {rooms.title}
            </Heading>
            <p className="mt-5 leading-relaxed text-muted">{rooms.body}</p>
          </div>
          <RoomFigure
            caps="The walk-in closet"
            subline="Sorted by type, so getting dressed is easy."
            className="min-w-0 md:col-span-2"
          >
            <PhotoFrame
              slug="ai-home-organizing-garage"
              label="The walk-in closet"
              alt="A cleared walk-in closet with white shelves and hanging rods above brown carpet"
              sizes="(min-width: 768px) 66vw, 100vw"
              position="50% 50%"
              ratio="3/2"
            />
          </RoomFigure>
        </div>

        {/* Room three: the garage, a centered strip. */}
        <div className="mx-auto mt-20 max-w-content px-6 md:mt-28">
          <RoomFigure
            caps="The garage"
            subline="Zones for tools, sports, and seasonal, so everything has a home."
            captionAlign="center"
            className="mx-auto max-w-[46rem]"
          >
            <PhotoFrame
              slug="ai-garage-organized"
              label="The garage"
              alt="An organized garage with bikes hung on the wall, a pegboard of tools, a workbench, and labeled storage bins"
              ratio="16/9"
            />
          </RoomFigure>
          <p className="mx-auto mt-10 max-w-[38rem] text-center leading-relaxed text-muted">
            {garage.body}
          </p>
        </div>
      </section>

      {/* Photos and keepsakes, a quiet reading band. */}
      <Section
        width="prose"
        background="surface"
        padding="base"
        heading={keepsakes.title}
        headingClassName="text-[clamp(1.625rem,2.4vw,2.125rem)]"
      >
        <p className="mt-5 leading-relaxed text-ink">{keepsakes.body}</p>
      </Section>

      <Section
        width="prose"
        background="paper"
        padding="lg"
        center
        heading="Start with one room."
        intro="Tell us which one. A single closet is a fine first project, and the calm tends to spread from there."
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
