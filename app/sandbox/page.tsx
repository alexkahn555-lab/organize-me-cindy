import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Button from '@/components/Button';
import Hairline from '@/components/Hairline';
import PhotoFrame from '@/components/PhotoFrame';
import PullQuote from '@/components/PullQuote';
import TrustLine from '@/components/TrustLine';
import FormField, { Required, checkboxClasses } from '@/components/FormField';

// Development only. The foundation components are reviewed here, at 1440 and at
// 390, before any page work is dispatched. In a production build this route
// 404s, so it never ships and never enters the sitemap.
export default function Sandbox() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <>
      <Section
        width="content"
        background="paper"
        padding="header"
        eyebrow="Foundation"
        heading="Component sandbox"
        headingAs="h1"
        headingSize="display"
        intro="Every shared component, at both breakpoints, on both bands."
      />

      <TrustLine />

      <Section width="content" background="paper" padding="base" heading="Type scale">
        <div className="mt-8 space-y-6">
          <Heading size="display">Display: your home, back to calm.</Heading>
          <Heading size="section">Section: four steps to a calmer home.</Heading>
          <h3 className="font-display text-2xl text-ink">Card title: Home Organizing</h3>
          <p className="text-xs uppercase tracking-[0.14em] text-sage-deep">
            Museum caption &middot; every item has a home
          </p>
          <p className="max-w-[37rem]">
            Body copy at the prose measure. Eighteen pixels, line height 1.7,
            because the reader is likely over fifty and reading this on a laptop
            in a room she wants to feel calmer.
          </p>
          <p className="max-w-[37rem] text-sm text-muted">
            Muted secondary text at the small size, for captions and sublines.
          </p>
        </div>
      </Section>

      <Section width="content" background="surface" padding="base" heading="Buttons and rules">
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/contact">Talk with Cindy</Button>
          <Button href="/before-after" variant="secondary">
            See the work
          </Button>
          <a href="#" className="group inline-flex items-center gap-2 text-sm text-sage-deep">
            Learn more
            <span className="transition-transform duration-150 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
        <div className="mt-10 space-y-6">
          <Hairline />
          <Hairline tone="sage" />
          <Hairline tone="active" />
        </div>
      </Section>

      <Section width="content" background="paper" padding="base" heading="PhotoFrame">
        {/* Every slot is a placeholder in this pass. The labels are what tells
            Cindy which photo each frame is waiting for. */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <PhotoFrame label="Client photo" ratio="4/3" />
          <PhotoFrame label="Founder photo" ratio="3/4" />
          <PhotoFrame label="Before" ratio="4/3" />
        </div>
      </Section>

      <Section width="content" background="surface" padding="lg" grain heading="Paper grain and pull quote">
        <div className="mt-10">
          <PullQuote
            keyline
            footnote="Bonded and insured. Working with families since 1995."
          >
            Nothing leaves without your say-so.
          </PullQuote>
        </div>
        <div className="mt-10 flex gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="group flex flex-col items-center gap-3">
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-sage font-display text-xl text-sage transition-colors duration-150 hover:bg-sage-deep hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
              >
                {n}
              </button>
              <span className="text-sm text-muted">Step {n}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section width="content" background="surface" padding="lg" heading="Form fields">
        <form className="mt-10 max-w-xl space-y-8">
          <FormField
            id="sandbox-name"
            label={
              <>
                Your name
                <Required />
              </>
            }
          >
            {(props) => <input type="text" {...props} />}
          </FormField>

          <FormField id="sandbox-space" label="A sentence about your space">
            {(props) => <textarea rows={2} {...props} />}
          </FormField>

          <FormField id="sandbox-when" label="When are you hoping to start?" error="Please choose a timeframe.">
            {(props) => (
              <select {...props}>
                <option>As soon as possible</option>
                <option>Within the next month</option>
              </select>
            )}
          </FormField>

          <label className="flex items-center gap-3 text-base text-ink">
            <input type="checkbox" defaultChecked className={checkboxClasses} />
            Home Organizing
          </label>
        </form>
      </Section>
    </>
  );
}
