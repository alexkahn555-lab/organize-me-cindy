import type { Metadata } from 'next';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `FAQ | ${site.wordmark}`,
  description: `Answers to common questions about professional organizing across ${site.serviceArea}.`,
};

interface FaqEntry {
  q: string;
  a: string;
}

// Answers marked [PLACEHOLDER: ...] need Cindy's confirmation. Only answers
// backed by the canonical facts are emitted in the FAQPage structured data.
const faqs: FaqEntry[] = [
  {
    q: 'What areas do you serve?',
    a: `We serve ${site.serviceArea}. ${site.serviceAreaNote}`,
  },
  {
    q: 'How much does it cost?',
    a: 'We price by quote after a free consultation, based on the size and scope of the job.',
  },
  {
    q: 'Are you bonded and insured?',
    a: 'Yes. We are bonded and insured.',
  },
  {
    q: 'What happens to the things that leave my home?',
    a: 'Whatever leaves the space, we donate, recycle, auction, or sell.',
  },
  {
    q: 'How do we get started?',
    a: `The first step is a free consultation. ${site.consultationNote}`,
  },
  {
    q: 'Do I need to be home during the session?',
    a: '[PLACEHOLDER: whether clients need to be present during sessions, confirm with Cindy]',
  },
];

const isRealAnswer = (a: string) => !a.includes('[PLACEHOLDER');

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs
    .filter((f) => isRealAnswer(f.a))
    .map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

export default function FaqPage() {
  return (
    <section className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-[42rem] px-6 py-16 md:py-20">
        <p className="mb-4 font-display text-[0.9375rem] italic text-sage-deep">
          Common questions
        </p>
        <Heading as="h1" size="display">
          Frequently asked questions
        </Heading>

        <dl className="mt-12">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`py-8 ${i > 0 ? 'border-t border-line' : 'pt-0'}`}
            >
              <dt className="font-display text-xl text-ink">{faq.q}</dt>
              <dd className="mt-3 leading-relaxed text-muted">{faq.a}</dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-line pt-12 text-center">
          <Heading as="h2" size="section" className="text-[clamp(1.625rem,2.4vw,2.125rem)]">
            Ready to get started?
          </Heading>
          <p className="mx-auto mt-4 max-w-md text-muted">
            A free consultation is the first step.
          </p>
          <div className="mt-8">
            <Button href="/contact">Request a free consultation</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
