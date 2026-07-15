import type { Metadata } from 'next';
import Heading from '@/components/Heading';
import Hairline from '@/components/Hairline';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Terms of Use | ${site.wordmark}`,
  description: `Terms of use for the ${site.wordmark} website.`,
};

// Structure-only shell. Real terms copy requires legal review before launch.
export default function TermsPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[42rem] px-6 py-16 md:py-20">
        <Heading as="h1" size="display">
          Terms of Use
        </Heading>
        <Hairline className="mt-10" />
        <div className="mt-10 space-y-5 leading-relaxed text-ink">
          <p>[PLACEHOLDER: terms copy, legal review before launch]</p>
        </div>
      </div>
    </section>
  );
}
