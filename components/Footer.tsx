import Link from 'next/link';
import { site } from '@/lib/site';

const siteLinks = [
  // No /services index page exists; point Services at the first service page.
  { href: '/services/hoarding-estate-clearing', label: 'Services' },
  { href: '/before-after', label: 'Our Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

const linkClass =
  'transition-colors hover:text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep';

export default function Footer() {
  return (
    // The top edge is a sage rule, not a hairline. It is what separates the
    // footer from the page rather than reading as one more section divider.
    <footer className="border-t border-sage bg-surface">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-16">
          <div>
            <p className="font-display text-2xl text-ink">{site.wordmark}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Calm, organized homes across {site.serviceArea}.
            </p>
          </div>

          <nav aria-label="Site" className="text-sm text-ink">
            <ul className="space-y-3">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* No consultation button here. Every page already closes on a CTA band,
              so a footer button would repeat the same offer inside the same
              viewport. The phone number is the footer's contact path. */}
          <div className="space-y-3 text-sm text-muted">
            <p>Since {site.foundedYear}</p>
            <p>Bonded and insured</p>
            <p>Serving {site.serviceArea}</p>
            <p className="text-ink">
              <a href={site.phoneHref} className={linkClass}>
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 text-xs text-muted">
          <nav aria-label="Help and legal" className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} {site.legalName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
