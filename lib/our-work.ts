// Shared Our Work catalog data. Both the Our Work page (app/before-after) and
// the home page teaser (app/page) read from here, so the two can never drift
// apart again. A new pair, after, or video slots in once, here.
//
// Every slug resolves in lib/media.ts (built from public/media-raw). Alt text is
// factual before/after for these real client photos. Captions are intentionally
// absent: the gallery is caption-free by design.

export interface Pair {
  beforeSlug: string;
  afterSlug: string;
  beforeAlt: string;
  afterAlt: string;
  // object-position steer, used where one side is portrait in the shared 4/3
  // frame so the cover crop keeps the subject.
  beforePosition?: string;
  afterPosition?: string;
}

export const pairs: Pair[] = [
  {
    beforeSlug: 'pair-1-kitchen-before',
    afterSlug: 'pair-1-kitchen-after',
    beforeAlt: 'A kitchen buried under boxes, papers, and food packaging',
    afterAlt: 'The same kitchen cleared, with clean counters and an open floor',
    afterPosition: '50% 42%',
  },
  {
    beforeSlug: 'pair-2-living-room-before',
    afterSlug: 'pair-2-living-room-after',
    beforeAlt: 'A living room piled high with boxes, bags, and packaged food',
    afterAlt: 'The same living room emptied, with clear carpet and a media cabinet',
  },
  {
    beforeSlug: 'pair-3-apartment-before',
    afterSlug: 'pair-3-apartment-after',
    beforeAlt: 'An apartment living room cluttered with boxes, bins, and bags',
    afterAlt: 'The same apartment room cleared to open carpet by the patio door',
    beforePosition: '50% 45%',
  },
  {
    beforeSlug: 'pair-4-porch-hoard-before',
    afterSlug: 'pair-4-porch-hoard-after',
    beforeAlt: 'A screened porch filled with trash bags and cardboard boxes',
    afterAlt: 'The same screened porch cleared to an open floor',
  },
  {
    beforeSlug: 'pair-5-landing-room-before',
    afterSlug: 'pair-5-landing-room-after',
    beforeAlt: 'An upstairs landing buried in boxes and trash up to the stairs',
    afterAlt: 'The same landing and hallway cleared, with open carpet',
  },
];

export interface After {
  slug: string;
  alt: string;
}

export const squareAfters: After[] = [
  { slug: 'after-1-garage', alt: 'An organized garage with bikes hung and a pegboard of tools' },
  { slug: 'after-2-closet', alt: 'A walk-in closet with color-sorted clothes and shelved sweaters' },
  { slug: 'after-3-kitchen', alt: 'A clean white kitchen with a granite bar and stools' },
];

export const officeAfter: After = {
  slug: 'after-4-office',
  alt: 'A finished home office lined with books above a tidy desk',
};

// Nine videos, in the order fixed by organize-me-final/_PLACEMENT.md.
export const videos: { id: string; title: string }[] = [
  { id: 'dlrpifltujc', title: "Make Your Closet Your Own – Redesigning Kelly's Closet" },
  { id: 'MJChJ6hPplM', title: "It is Not Your Mama's Closet Anymore" },
  { id: 'aputNGPglDw', title: 'Upgrading your Closets with a Personal Touch' },
  { id: '45OTTkBE7V0', title: 'Give Your Bathroom a Face-Lift' },
  { id: 'kJBFpL0hnyE', title: 'Organizing Storage Units – First Steps' },
  { id: 'kn4DIoiBU6A', title: 'How to get a well-organized Pantry' },
  { id: 'n80MXdzLZ6w', title: 'How to Organize your Office' },
  { id: 'iWcGrSyaM98', title: 'Spotless kitchen' },
  { id: 'BI3IOauptgs', title: 'Organized Garage' },
];
