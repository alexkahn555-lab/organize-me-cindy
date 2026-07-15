import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import PullQuote from '@/components/PullQuote';
import { getService } from '@/lib/services';
import { serviceJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import { pairs } from '@/lib/our-work';
import styles from './hoarding.module.css';

// This static route owns /services/hoarding-estate-clearing; Next prefers it
// over the [slug] template, which still serves the other three services. The
// page is deliberately quieter than the rest of the site: no eyebrow, no
// alternating band rhythm, the narrowest reading column on the site, and no
// motion at all (see hoarding.module.css).

const service = getService('hoarding-estate-clearing')!;

// The mid-page proof beat: one real project from the shared Our Work catalog,
// looked up by slug (pair-5, the buried upstairs landing cleared).
const proofPair = pairs.find(
  (p) => p.beforeSlug === 'pair-5-landing-room-before',
)!;

const PROOF_LABEL =
  'pointer-events-none absolute top-3 rounded-[4px] bg-paper/90 px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] shadow-sm';

export const metadata: Metadata = {
  title: `${service.title} | ${site.wordmark}`,
  description: service.intro,
};

export default function HoardingPage() {
  return (
    <article className={styles.still} data-suppress-clutter-effects="true">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />

      {/* Hero. Clearing-out day: the truck at the curb, the job hauled away.
          The reassurance that this is done without judgment sits right below. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:py-24">
          <div className="min-w-0">
            <Heading as="h1" size="display" className="max-w-[12ch]">
              Packed up and out.
            </Heading>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted">
              We handle the whole job, from the first bag to the final truckload.
            </p>
          </div>
          <PhotoFrame
            slug="ai-hoarding-hero"
            label="Clearing-out day"
            alt="A junk truck at the curb on clearing day, a worker loading a tidy row of trash bags outside a suburban house"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="3/2"
            className="min-w-0"
          />
        </div>
      </section>

      {/* Reassurance. The emotional core, moved directly under the hero: this
          is a hard chapter, and we meet it without judgment. Copy unchanged. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[40rem] px-6 pb-16 md:pb-24">
          <Heading
            as="h2"
            size="section"
            className="max-w-[16ch] text-[clamp(1.625rem,2.4vw,2.125rem)]"
          >
            Help without judgment, at your pace.
          </Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {service.intro}
          </p>
          <div className="mt-9">
            <Button href="/contact">Talk with Cindy first</Button>
          </div>
        </div>
      </section>

      {/* The promise, inside a thin sage keyline on the cream-deep band. */}
      <section className="bg-surface">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <PullQuote
            keyline
            className="mx-auto max-w-[52rem]"
            footnote={`Bonded and insured. Working with families since ${site.foundedYear}.`}
          >
            &ldquo;We work at your pace, and nothing leaves without your
            say-so.&rdquo;
          </PullQuote>
        </div>
      </section>

      {/* One real project as proof: a buried upstairs landing, cleared. The
          pair comes from the shared Our Work catalog; the after is an honest
          cleaned recreation of the same landing (see _PLACEMENT.md), presented
          the same caption-free way as on the Our Work page. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[52rem] px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="relative min-w-0">
              <PhotoFrame
                slug={proofPair.beforeSlug}
                label="Client photo"
                alt={proofPair.beforeAlt}
                position={proofPair.beforePosition}
                sizes="(min-width: 768px) 24rem, 50vw"
                ratio="4/3"
              />
              <span className={`${PROOF_LABEL} left-3 text-ink`}>Before</span>
            </div>
            <div className="relative min-w-0">
              <PhotoFrame
                slug={proofPair.afterSlug}
                label="Client photo"
                alt={proofPair.afterAlt}
                position={proofPair.afterPosition}
                sizes="(min-width: 768px) 24rem, 50vw"
                ratio="4/3"
              />
              <span className={`${PROOF_LABEL} right-3 text-sage-deep`}>After</span>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/before-after"
              className="text-base text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
            >
              See more of our work
            </Link>
          </div>
        </div>
      </section>

      {/* The story, in the narrowest text column on the site. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[40rem] px-6 py-16 md:py-24">
          {service.sections.map((section, i) => (
            <div key={section.id} className={i > 0 ? 'mt-14' : undefined}>
              <Heading
                as="h2"
                size="section"
                className="text-[clamp(1.625rem,2.4vw,2.125rem)]"
              >
                {section.title}
              </Heading>
              <p className="mt-5 leading-relaxed text-ink">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* A soft close. No urgency, no countdown of any kind. */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[40rem] px-6 py-16 text-center md:py-20">
          <Heading as="h2" size="section">
            Whenever you are ready.
          </Heading>
          <p className="mx-auto mt-6 max-w-[32rem] text-lg leading-relaxed text-muted">
            A first conversation is just that. You talk, we listen, and nothing
            happens until you want it to.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button href="/contact">Talk with Cindy first</Button>
            <a
              href={site.phoneHref}
              className="text-base text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
