import type { Metadata } from 'next';
import Heading from '@/components/Heading';
import Hairline from '@/components/Hairline';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.wordmark}`,
  description: `How ${site.wordmark} handles personal information.`,
};

// Structure-only shell. Real policy copy requires legal review before launch.
export default function PrivacyPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[42rem] px-6 py-16 md:py-20">
        <Heading as="h1" size="display">
          Privacy Policy
        </Heading>
        <Hairline className="mt-10" />
        <div className="mt-10 space-y-5 leading-relaxed text-ink">
          <p>[PLACEHOLDER: privacy policy copy, legal review before launch]</p>
        </div>
      </div>
    </section>
  );
}
