import type { Metadata } from 'next';
import Button from '@/components/Button';
import Hairline from '@/components/Hairline';
import Heading from '@/components/Heading';
import PhotoFrame from '@/components/PhotoFrame';
import { trustFacts } from '@/components/TrustLine';
import { site } from '@/lib/site';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: `About Cindy | ${site.wordmark}`,
  description: `Meet Cindy Garlick, professional organizer serving ${site.serviceArea} since ${site.foundedYear}. Bonded and insured, with a warm, no-judgment approach to every home.`,
};

// The letter. First person is deliberate here: this is the one page where
// Cindy speaks as herself rather than as "we". The phrases worth keeping from
// the old bio survive in her voice: no judgment, love them through the
// project, to maintain it you have to live it, the charity partnerships.
const letter = [
  `I have been organizing homes and offices around ${site.serviceArea} since ${site.foundedYear}, and the first thing I learned is that a cluttered room is never really about the stuff. Life gets heavy sometimes, and the house keeps the record. My job starts with understanding that, not judging it.`,
  'My rule on every project is no judgment, and my saying is love them through the project. I mean both. We sort together, we let go of what no longer serves you, and we build systems you can actually keep, because to maintain it you have to live it.',
  'You are letting a stranger into your home, and I never forget what that takes. We are bonded and insured, we treat every project with discretion, and what you part with goes to charities that put it back to use. Thank you for trusting us with your home. It is an honor every time.',
];

export default function AboutPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-content items-start gap-12 px-6 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16 md:py-24">
        <div className="min-w-0">
          {/* The one caps eyebrow on the entire site. Sage is legal here:
              13px caps on paper clear AA at 4.6:1; this treatment must not
              be repeated on any surface band, where it would not. */}
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.22em] text-sage">
            Since {site.foundedYear}
          </p>
          <Heading as="h1" size="display" className="mt-5 max-w-[16ch]">
            Thirty years of helping people feel at home again.
          </Heading>
          <p className="mt-6 font-display text-[1.375rem] leading-[1.5] text-muted">
            A note from{' '}
            <span className="relative inline-block">
              Cindy
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-[2px] w-full bg-sage ${styles.draw}`}
              />
            </span>
            , the founder, on why we do this work.
          </p>

          <div className="mt-10 max-w-[36rem] space-y-6">
            {letter.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
            <p className="font-display text-xl italic text-ink">
              Warmly, Cindy
            </p>
          </div>

          <div className="mt-10">
            <Button href="/contact">Talk with Cindy</Button>
          </div>

          {/* The quiet fact row, between hairlines. Same three facts as the
              site-wide trust strip, stated once. */}
          <div className="mt-12 max-w-[36rem]">
            <Hairline />
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4 text-sm text-muted">
              {trustFacts().map((fact, i) => (
                <span key={fact} className="flex items-center gap-x-4">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-line">
                      &middot;
                    </span>
                  )}
                  {fact}
                </span>
              ))}
            </p>
            <Hairline />
          </div>
        </div>

        <PhotoFrame
          slug="founder-cindy-portrait"
          label="Founder photo"
          alt="Portrait of Cindy Garlick, professional organizer"
          ratio="3/4"
          className="min-w-0"
        />
      </div>
    </section>
  );
}
