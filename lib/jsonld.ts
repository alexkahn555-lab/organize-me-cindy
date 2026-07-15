import { site, siteUrl } from './site';
import type { ServiceData } from './services';

// Structured-data builders. Every value comes from lib/site.ts or
// lib/services.ts. No street address, no email, and no rating or review markup:
// none of those are confirmed facts, and fabricating rating schema is forbidden.

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.wordmark,
    url: siteUrl,
    telephone: site.phoneDisplay,
    areaServed: site.serviceArea,
    foundingDate: String(site.foundedYear),
    description: `Bonded and insured professional organizing across ${site.serviceArea}.`,
  };
}

export function serviceJsonLd(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.navTitle,
    url: `${siteUrl}/services/${service.slug}`,
    areaServed: site.serviceArea,
    provider: {
      '@type': 'ProfessionalService',
      name: site.wordmark,
      url: siteUrl,
      telephone: site.phoneDisplay,
    },
  };
}
