'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { getServicesOrdered } from '@/lib/services';
import { site } from '@/lib/site';

const serviceLinks = getServicesOrdered().map((s) => ({
  href: `/services/${s.slug}`,
  label: s.navTitle,
}));

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/before-after', label: 'Our Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// A link is current when it is the page, or when the page lives under it, so a
// service page still shows Services as the section you are in.
function isCurrent(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname() ?? '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesItemRef = useRef<HTMLLIElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayCloseRef = useRef<HTMLButtonElement>(null);

  // The Services disclosure opens on click or keyboard only, never on hover, so
  // it behaves identically for touch and under reduced motion.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        servicesTriggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (
        servicesItemRef.current &&
        !servicesItemRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [servicesOpen]);

  // The mobile overlay covers the page, so it locks the body, takes focus, keeps
  // Tab inside itself, and hands focus back to the hamburger when it closes.
  useEffect(() => {
    if (!menuOpen) return;
    overlayCloseRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const overlay = document.getElementById('mobile-nav');
      if (!overlay) return;
      const focusable = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  // Route change closes the overlay. Without this it survives navigation and the
  // visitor lands on the new page with the menu still covering it.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-line bg-paper">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-5"
      >
        <Link
          href="/"
          className="font-display text-xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep"
        >
          {site.wordmark}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-x-8 md:flex">
          <ul className="flex items-center gap-x-8 text-sm text-ink">
            <li>
              <NavLink href="/" current={isCurrent(pathname, '/')}>
                Home
              </NavLink>
            </li>
            <li className="relative" ref={servicesItemRef}>
              <button
                ref={servicesTriggerRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="nav-services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1 border-b-2 pb-1 transition-colors hover:text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep ${
                  isCurrent(pathname, '/services')
                    ? 'border-sage'
                    : 'border-transparent'
                }`}
              >
                Services
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className={`h-4 w-4 ${servicesOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>
              {/* Closed state is visibility:hidden, not display:none, so the fade
                  has something to animate. Visibility still takes the links out of
                  the tab order and the a11y tree. */}
              <ul
                id="nav-services-menu"
                className={`absolute left-0 top-full z-40 mt-3 w-64 rounded-[4px] border border-line-strong bg-paper py-2 shadow-md motion-reduce:transition-none ${
                  servicesOpen
                    ? 'visible opacity-100 [transition:opacity_150ms_ease-out,visibility_0s]'
                    : 'invisible opacity-0 [transition:opacity_150ms_ease-in,visibility_0s_150ms]'
                }`}
              >
                {serviceLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2 transition-colors hover:bg-surface hover:text-sage-deep focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sage-deep"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {primaryLinks.slice(2).map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} current={isCurrent(pathname, l.href)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button href="/contact">Talk with Cindy</Button>
        </div>

        {/* Mobile trigger */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(true)}
          className="p-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-7 w-7"
          >
            <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Mobile overlay: full-screen cream, oversized Newsreader links, the CTA as
          a full-bleed bar, the serving line last. */}
      {/* Open and closed are expressed as display utilities, not the `hidden`
          attribute. Preflight's `[hidden] { display: none }` sits in the base
          layer and loses to the `flex` utility, so a `hidden` overlay stayed
          displayed: a full-screen invisible panel over every mobile page,
          eating every tap. `hidden`/`flex` cannot both apply, so it cannot
          come back. Closed is display:none, which also takes the links out of
          the tab order and the accessibility tree. */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex-col bg-paper md:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-xl text-ink">{site.wordmark}</span>
          <button
            ref={overlayCloseRef}
            type="button"
            onClick={() => {
              setMenuOpen(false);
              hamburgerRef.current?.focus();
            }}
            className="p-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
          >
            <span className="sr-only">Close menu</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-7 w-7"
            >
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-6">
          {primaryLinks.map((l) => {
            const current = isCurrent(pathname, l.href);
            return (
              <li key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  aria-current={current ? 'page' : undefined}
                  className="block py-5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sage-deep"
                >
                  <span
                    className={`font-display text-4xl text-ink ${
                      current
                        ? 'border-b-2 border-sage pb-1'
                        : ''
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div>
          <Link
            href="/contact"
            className="block bg-sage-deep py-5 text-center font-display text-2xl text-paper transition-colors hover:bg-sage focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-paper"
          >
            Talk with Cindy
          </Link>
          <p className="py-4 text-center text-sm text-muted">
            Serving {site.serviceArea}
          </p>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className={`border-b-2 pb-1 transition-colors hover:text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep ${
        current ? 'border-sage' : 'border-transparent'
      }`}
    >
      {children}
    </Link>
  );
}
