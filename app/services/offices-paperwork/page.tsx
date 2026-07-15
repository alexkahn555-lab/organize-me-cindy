import type { Metadata } from 'next';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import Section from '@/components/Section';
import { getService } from '@/lib/services';
import { serviceJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';

// The fourth and last static service route. A filing- and records-focused page:
// hero, the four kinds of paperwork we sort, the three-step process, a
// supporting image with a statement, then the close. Copy for the hero and the
// metadata comes from lib/services.ts; the rest is page-specific.

const service = getService('offices-paperwork')!;

export const metadata: Metadata = {
  title: `${service.title} | ${site.wordmark}`,
  description: service.intro,
};

// The four kinds of paperwork we sort, shown as a quiet card index.
const cards = [
  {
    title: 'Financial documents',
    line: 'Statements, tax records, receipts, and account paperwork, sorted and easy to reach.',
  },
  {
    title: 'Legal papers',
    line: 'Estate documents, policies, contracts, and the sensitive files you need to keep safe.',
  },
  {
    title: 'Family and household records',
    line: 'Medical forms, school papers, manuals, and the documents that run a home.',
  },
  {
    title: 'Photos and keepsakes',
    line: 'Family photos and mementos, organized and preserved in order instead of sitting in boxes.',
  },
];

// Three steps, in the same terse voice as the rest of the process bands.
const steps = [
  {
    numeral: '1',
    title: 'We sort what you keep',
    line: 'We start with the records and keepsakes that actually matter, from financial and legal to family paperwork and photos.',
  },
  {
    numeral: '2',
    title: 'We build the system',
    line: 'Color-coded files, labeled binders, and chronological order, built around how you live and work.',
  },
  {
    numeral: '3',
    title: 'You keep it going',
    line: 'Simple enough to maintain on your own, so any document or memory turns up in seconds.',
  },
];

// The hollow circle and its hover/focus fill. The step <li> is the group and
// is keyboard-focusable, so the fill doubles as the visible focus state.
const CIRCLE =
  'flex h-14 w-14 items-center justify-center rounded-full border border-sage font-display text-2xl leading-none text-sage-deep transition-colors duration-150 ease-out group-hover:border-sage-deep group-hover:bg-sage-deep group-hover:text-paper group-focus-visible:border-sage-deep group-focus-visible:bg-sage-deep group-focus-visible:text-paper';

export default function OfficesPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />

      {/* Hero. Two columns: headline left, the office image letterboxed on
          paper (fit=contain) so the whole frame shows rather than a crop. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:py-24">
          <div className="min-w-0">
            <p className="mb-5 font-display text-[0.9375rem] italic text-sage-deep">
              {service.title}
            </p>
            <Heading as="h1" size="display" className="max-w-[18ch]">
              Paperwork, filed and finally easy to find.
            </Heading>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted">
              {service.intro}
            </p>
            <div className="mt-9">
              <Button href="/contact">Talk with Cindy</Button>
            </div>
          </div>
          <PhotoFrame
            slug="ai-service-offices"
            label="The office"
            alt="An organized home office with a desk, filing cabinet, and labeled file boxes"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="3/2"
            fit="contain"
            className="min-w-0 bg-paper"
          />
        </div>
      </section>

      {/* What gets sorted: the four kinds of paperwork, a quiet card index. */}
      <Section
        width="content"
        background="surface"
        padding="lg"
        heading="What gets sorted"
        headingClassName="text-[clamp(1.75rem,2.8vw,2.5rem)]"
        intro="We organize the paperwork and keepsakes that support your life and your peace of mind."
        introClassName="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted"
      >
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{card.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {card.line}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works: three numbered steps, the same circle treatment as the
          rest of the site's process bands. */}
      <Section
        width="content"
        background="paper"
        padding="lg"
        heading="How it works"
        headingClassName="text-[clamp(1.75rem,2.8vw,2.5rem)]"
      >
        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-0">
          {steps.map((step, i) => (
            <li
              key={step.numeral}
              tabIndex={0}
              className={`group outline-none ${
                i > 0 ? 'sm:border-l sm:border-line sm:pl-7' : ''
              } ${i < steps.length - 1 ? 'sm:pr-7' : ''}`}
            >
              <span aria-hidden="true" className={CIRCLE}>
                {step.numeral}
              </span>
              <h3 className="mt-6 font-display text-xl text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {step.line}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Supporting image and statement. Two columns: the filing image at cover
          on the left, the calm-system statement on the right. */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <PhotoFrame
            slug="ai-filing-binders"
            label="Filing"
            alt="Organized binders and labeled file folders on a shelf"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="4/3"
            className="min-w-0"
          />
          <div className="min-w-0">
            <Heading
              as="h2"
              size="section"
              className="text-[clamp(1.625rem,2.4vw,2.125rem)]"
            >
              A calm system makes the important things easy to reach.
            </Heading>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              No more digging or second-guessing. You will know where everything
              is, and keeping it that way stays easy long after we are done.
            </p>
          </div>
        </div>
      </section>

      <Section
        width="prose"
        background="paper"
        padding="lg"
        center
        heading="Ready to find things again?"
        intro="Tell us what the paperwork looks like today, and we will build a system that feels clear and easy to keep."
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
      </Section>
    </article>
  );
}
