import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact | ${site.wordmark}`,
  description: `Send Cindy a note about your space. Professional organizing across ${site.serviceArea}, bonded and insured. Free consultation, reply within one business day.`,
};

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-content items-start gap-12 px-6 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-16 md:py-20">
        {/* The note's opening: warm copy and a quiet photo. */}
        <div className="min-w-0">
          <Heading as="h1" size="display" className="max-w-[14ch]">
            Tell us a little about your space.
          </Heading>
          <p className="mt-7 max-w-[32rem] text-lg leading-relaxed text-muted">
            Whatever state the room is in, you will not surprise us and you
            will not be judged. A few lines is plenty.
          </p>
          <p className="mt-4 max-w-[32rem] text-lg leading-relaxed text-muted">
            We read every note and reply within one business day. If calling
            is easier, we are at{' '}
            <a
              href={site.phoneHref}
              className="text-sage-deep underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
          <PhotoFrame
            slug="ambience-writing-nook"
            label="The writing desk"
            alt="A writing desk by a window with an open notebook, a pen, and a small vase"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="4/3"
            className="mt-10"
          />
          <p className="mt-6 max-w-[32rem] text-sm leading-relaxed text-muted">
            Serving {site.serviceArea}. {site.serviceAreaNote}
          </p>
        </div>

        {/* The form, on its cream-deep panel. */}
        <div className="min-w-0 rounded-[8px] bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
