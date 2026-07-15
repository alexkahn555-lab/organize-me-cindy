import Link from 'next/link';
import Heading from '@/components/Heading';

// The gentle 404. A heading, one warm sentence, a way home. Nothing else.
export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[42rem] px-6 py-24 text-center md:py-36">
        <Heading as="h1" size="display">
          We couldn&rsquo;t find that page.
        </Heading>
        <p className="mx-auto mt-6 max-w-[28rem] text-lg leading-relaxed text-muted">
          These things happen, even to the organized.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block text-base text-sage-deep underline underline-offset-4 hover:text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
