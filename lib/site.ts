// Single source of truth for brand, contact, and service-area strings.
// Components must import from here, never hardcode these values.
// Canonical facts live in CLAUDE.md; update both together.

export const site = {
  wordmark: 'Organize Me VA',
  legalName: 'Organize Me LLC',
  foundedYear: 1995,
  phoneDisplay: '(571) 212-9299',
  phoneHref: 'tel:5712129299',
  // Email is not ready yet. UI must handle null and never render a fake mailto.
  email: null as string | null,
  serviceArea: 'Virginia, Maryland, and DC',
  serviceAreaNote:
    'Travel depends on the size of the job and is decided after the first consultation.',
  bondedInsured: true,
  consultationNote:
    '[PLACEHOLDER: free consultation format, confirm with Cindy]',
} as const;

// Computed so it never goes stale. Never hardcode a years-in-business number.
export const yearsInBusiness = () =>
  new Date().getFullYear() - site.foundedYear;

// Canonical site origin, used by the sitemap, robots, and structured data.
export const siteUrl = process.env.SITE_URL ?? 'https://organizemeva.com';
