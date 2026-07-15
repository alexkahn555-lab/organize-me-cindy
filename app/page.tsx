import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import Section from '@/components/Section';
import TrustLine from '@/components/TrustLine';
import { services } from '@/lib/services';
import { pairs } from '@/lib/our-work';
import { site } from '@/lib/site';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: `${site.wordmark} | Professional Organizer in ${site.serviceArea}`,
  description: `Calm, organized homes across ${site.serviceArea}. Bonded and insured professional organizing. Request a free consultation.`,
};

// One line per service, short enough to sit on a single row of the index. The
// full copy lives in lib/services.ts and is not duplicated here.
const descriptors: Record<string, string> = {
  'hoarding-estate-clearing':
    'We meet a hard chapter with complete understanding and no judgment.',
  'moving-relocation':
    'We purge and pack before the move, then unpack and set up the new home.',
  'home-organizing':
    'We organize closets, kitchens, and whole homes so the calm holds.',
  'offices-paperwork':
    'We build filing systems that keep paperwork from piling up again.',
};

// The card image per service on the services index. AI ambience images, kept in
// their own map rather than reusing service.imageSlug (those are older recovered
// photos). Every slug here is confirmed present in lib/media.ts.
const cardImages: Record<string, string> = {
  'hoarding-estate-clearing': 'ai-hoarding-hero',
  'moving-relocation': 'ai-service-moving',
  'home-organizing': 'ai-home-organizing-kitchen',
  'offices-paperwork': 'ai-filing-binders',
};

// Honest, neutral alt text for the card images. These are ambience images, so
// the alt names the service and never makes a client-work proof claim.
const cardAlt: Record<string, string> = {
  'hoarding-estate-clearing': 'Hoarding and estate clearing',
  'moving-relocation': 'Moving and relocation',
  'home-organizing': 'Home organizing',
  'offices-paperwork': 'Offices and paperwork',
};

// A small hand-drawn icon per process step, drawn in the sage accent. Minimal
// inline SVGs at a consistent stroke weight, no icon library. Decorative, so
// each is aria-hidden and color comes from the parent via currentColor.
function CalendarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
      <line x1="8" y1="3" x2="8" y2="6" />
      <line x1="16" y1="3" x2="16" y2="6" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8.5 4.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-1.5" />
      <rect x="8.5" y="3" width="7" height="3.5" rx="1" />
      <path d="M8.5 12.5l2 2 3.5-3.5" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 11.5 12 4.5l8.5 7" />
      <path d="M5.5 11v8.5h13V11" />
      <path d="M12 17c-.7-.62-2.9-1.9-2.9-3.5a1.45 1.45 0 0 1 2.9-.6 1.45 1.45 0 0 1 2.9.6c0 1.6-2.2 2.88-2.9 3.5z" />
    </svg>
  );
}

function DrawersIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="10" y1="8" x2="14" y2="8" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  );
}

// A small decorative sprig, the hairline flourish above the steps in the
// reference render. Inline, aria-hidden, color from the parent.
function Sprig({ className }: { className?: string }) {
  return (
    <svg
      width="52"
      height="18"
      viewBox="0 0 52 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 9h18" />
      <path d="M50 9H32" />
      <path d="M26 3c-2.4 2-2.4 6 0 12 2.4-6 2.4-10 0-12z" />
      <path d="M26 7v6" />
    </svg>
  );
}

// The approach, kept as flat sage numerals with a small icon per step. The copy
// (titles and bodies) is unchanged from the numerals-only version.
const steps = [
  {
    number: '1',
    title: 'A free consultation',
    body: 'We listen first. No pressure, and no judgment.',
    icon: <CalendarIcon />,
  },
  {
    number: '2',
    title: 'A realistic plan',
    body: 'We walk the space and propose a sequence, room by room.',
    icon: <ClipboardIcon />,
  },
  {
    number: '3',
    title: 'Hands-on organizing',
    body: 'We sort with you or for you. Nothing leaves without your say.',
    icon: <HouseIcon />,
  },
  {
    number: '4',
    title: 'Systems that hold',
    body: 'Clear labels, a routine you can keep, and a follow-up.',
    icon: <DrawersIcon />,
  },
];

// Before and after is the primary sales device on this page. The teaser pulls
// the two strongest pairs by slug from the shared Our Work catalog, so it can
// never drift out of sync with the Our Work page (and never shows a render).
const teaserBeforeSlugs = ['pair-1-kitchen-before', 'pair-2-living-room-before'];
const teaserPairs = pairs.filter((p) =>
  teaserBeforeSlugs.includes(p.beforeSlug),
);

// The BEFORE / AFTER corner chip, the same treatment as the Our Work page.
const TEASER_LABEL =
  'pointer-events-none absolute top-3 rounded-[4px] bg-paper/90 px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] shadow-sm';

const faqs = [
  {
    q: 'Do I have to be home while you work?',
    a: 'It is your choice. Some clients want to be there for every decision. Others hand us a key and come home to a finished room. We work either way.',
  },
  {
    q: 'What happens to the things I let go of?',
    a: 'We donate what is usable to local charities and coordinate recycling for the rest. Only true trash is thrown away, and nothing leaves without your say.',
  },
  {
    q: 'Is my home kept private?',
    a: 'Completely. We do not photograph your home without permission, we do not share who we work with, and we treat every house with the discretion we would want for our own.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero. Headline left, photo right, per the reference. The one load
          sequence on the page starts here and ends on the trust rule below. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 pb-16 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:pb-24 md:pt-20">
          <div className="min-w-0">
            <Heading as="h1" size="display">
              <span className={styles.headlineFirst}>Your home,</span>
              <span className={styles.headlineSecond}>back to calm.</span>
            </Heading>
            {/* Deck line: the display face at 22 to 24px, the one step between
                the headline and 18px Inter body. */}
            <p className="mt-7 max-w-[34rem] font-display text-[1.375rem] leading-[1.5] text-muted md:text-[1.5rem]">
              We clear what is in the way, put back what matters, and leave a
              home you can breathe in again.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/contact">Talk with Cindy</Button>
              <a
                href={site.phoneHref}
                className="text-base text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>
          <PhotoFrame
            slug="cindy-hero"
            label="Cindy Garlick"
            alt="Cindy Garlick, professional organizer, standing in a bright, tidy kitchen"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="16/9"
            className="min-w-0"
          />
        </div>
      </section>

      <TrustLine />

      {/* The rule the load sequence draws. It belongs to the hero, not to
          TrustLine, which is shared and stays text-only. */}
      <div className="bg-paper py-8">
        <div
          aria-hidden="true"
          className={`mx-auto h-[2px] w-16 bg-sage ${styles.trustRule}`}
        />
      </div>

      {/* Approach. Heading rail left, four numbered steps right. */}
      <Section
        width="content"
        background="surface"
        padding="lg"
        variant="split"
        eyebrow="How it works"
        heading="Four steps to a calmer home."
        headingClassName="text-[clamp(1.75rem,2.8vw,2.5rem)]"
        intro="We work at your pace and in the order that makes sense for your house. You decide what stays. We handle the rest, and we do not leave a room half finished."
        introClassName="mt-5 text-base leading-relaxed text-muted"
      >
        <Sprig className="mb-8 text-sage" />
        <ol className="divide-y divide-line border-y border-line">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-5 py-6 sm:gap-6">
              <span
                aria-hidden="true"
                className="w-8 shrink-0 font-display text-4xl leading-none text-sage"
              >
                {step.number}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="shrink-0 text-sage">
                    {step.icon}
                  </span>
                  <h3 className="font-display text-xl text-ink">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Proof. The tallest section on the page after the hero. */}
      <Section
        width="content"
        background="paper"
        padding="lg"
        heading="The rooms you keep avoiding, finally calm."
        headingClassName="max-w-[18ch]"
        intro="Every home here belonged to someone who thought it was too far gone. It was not."
        introClassName="mt-6 max-w-[42rem] text-lg leading-relaxed text-muted"
      >
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
          {teaserPairs.map((pair) => (
            <div key={pair.beforeSlug} className="grid grid-cols-2 gap-3">
              <div className="relative min-w-0">
                <PhotoFrame
                  slug={pair.beforeSlug}
                  label="Client photo"
                  alt={pair.beforeAlt}
                  position={pair.beforePosition}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  ratio="4/3"
                />
                <span className={`${TEASER_LABEL} left-3 text-ink`}>Before</span>
              </div>
              <div className="relative min-w-0">
                <PhotoFrame
                  slug={pair.afterSlug}
                  label="Client photo"
                  alt={pair.afterAlt}
                  position={pair.afterPosition}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  ratio="4/3"
                />
                <span className={`${TEASER_LABEL} right-3 text-sage-deep`}>After</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/contact">Talk with Cindy</Button>
          <Link
            href="/before-after"
            className="text-base text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
          >
            See more of the work
          </Link>
        </div>
      </Section>

      {/* Services. An editorial index of rows, not a grid of cards. */}
      <Section
        width="content"
        background="surface"
        padding="base"
        heading="What we organize."
        headingClassName="text-[clamp(1.75rem,2.8vw,2.5rem)]"
      >
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-[8px] border border-line bg-paper p-3 transition-colors duration-150 ease-out hover:border-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep"
              >
                <PhotoFrame
                  slug={cardImages[service.slug]}
                  alt={cardAlt[service.slug]}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  ratio="1/1"
                  className="min-w-0"
                />
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="font-display text-xl text-ink transition-colors duration-150 ease-out group-hover:text-sage-deep">
                    {service.navTitle}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {descriptors[service.slug]}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-sage-deep">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Good to know. Short band, read straight down, no disclosure controls. */}
      <Section
        width="content"
        background="paper"
        padding="base"
        variant="split"
        heading="Good to know before you call."
        headingClassName="text-[clamp(1.75rem,2.8vw,2.5rem)]"
      >
        <dl>
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="border-t border-line py-7 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-xl text-ink">{faq.q}</dt>
              <dd className="mt-2 max-w-[46rem] text-base leading-relaxed text-muted">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
        <Link
          href="/faq"
          className="mt-8 inline-block text-base text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
        >
          Read all the questions
        </Link>
      </Section>

      {/* The page's final conversion point. There is no second CTA in the
          footer below it. */}
      <Section
        width="prose"
        background="surface"
        padding="lg"
        center
        heading="Ready for a calmer home?"
        intro="Tell us which room you have been avoiding. We will take it from there."
        introClassName="mx-auto mt-6 max-w-[34rem] text-lg leading-relaxed text-muted"
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
        <p className="mt-8 text-sm text-muted">{site.consultationNote}</p>
      </Section>
    </>
  );
}
