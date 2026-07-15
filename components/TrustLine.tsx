import { site, yearsInBusiness } from '@/lib/site';

// Three cues as text between two hairlines. No icons: the leaf, shield, and pin
// in the mobile reference are a render deviation, and an icon strip is the exact
// template tell this rebuild exists to remove.
//
// The third cue is the service area, not a review source. The site carries one
// testimonial, on the hoarding page, so a "real client reviews" cue would be
// promising a proof cluster that does not exist.

export default function TrustLine() {
  const cues = [
    `Since ${site.foundedYear}`,
    'Bonded and insured',
    `Serving ${site.serviceArea}`,
  ];

  return (
    <div className="border-y border-line bg-paper">
      <p className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-5 text-center text-sm text-muted">
        {cues.map((cue, i) => (
          <span key={cue} className="flex items-center gap-x-4">
            {i > 0 && (
              <span aria-hidden="true" className="text-line">
                &middot;
              </span>
            )}
            {cue}
          </span>
        ))}
      </p>
    </div>
  );
}

// Used by the About fact row and the footer fact block, which state the same
// three facts in a different arrangement.
export const trustFacts = () => [
  `Since ${site.foundedYear}`,
  'Bonded and insured',
  `Serving ${site.serviceArea}`,
];

export const yearsPhrase = () => `${yearsInBusiness()} years`;
