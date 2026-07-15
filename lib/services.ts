// Four category services replacing the previous nine room-by-room services.
// All [PLACEHOLDER: ...] strings need real copy before launch. Photo and video
// assignments reuse recovered media slugs and need confirmation with Cindy.

export interface ServicePair {
  beforeSlug: string;
  afterSlug: string;
  caption: string;
}

export interface ServiceSection {
  id: string;
  title: string;
  body: string;
  covers?: string[];
  // A media slug turns this band into a two-column image-and-text composition.
  // Left unset, the band renders as a centered single column, so an empty slot
  // never leaves half the band vacant. Setting it restores two columns.
  imageSlug?: string | null;
}

export interface ServiceTestimonial {
  quote: string;
  attribution: string;
}

export interface ServiceData {
  slug: string;
  order: number;
  navTitle: string;
  title: string;
  intro: string;
  sections: ServiceSection[];
  testimonial?: ServiceTestimonial;
  tone?: 'calm' | 'standard';
  suppressClutterEffects?: boolean;
  videoId?: string | null;
  videoTitle?: string | null;
  // The card image on the services index. Not the hero: these assignments are
  // still unconfirmed, so they are deliberately not promoted to a full-width
  // hero slot.
  imageSlug?: string | null;
  // The hero image on this service's own page. Unset on every service today,
  // so every hero renders as a centered single column instead of a
  // half-vacant composition. Set it and the two-column hero returns.
  heroImageSlug?: string | null;
  pairs?: ServicePair[];
}

export const services: ServiceData[] = [
  {
    slug: 'hoarding-estate-clearing',
    order: 1,
    navTitle: 'Hoarding & Estate Clearing',
    title: 'Hoarding & Estate Clearing',
    tone: 'calm',
    suppressClutterEffects: true,
    intro:
      'Everyone goes through things in life that can cause someone to shell up and start hoarding. We meet that with complete understanding and no judgment. Our work is helping clients transition into a better chapter and get past a hard time.',
    sections: [
      {
        id: 'estate-downsizing',
        title: 'Estate clearing and downsizing',
        body:
          'We also handle estate clearing and downsizing, and we do a great deal of it. When a home has to be emptied after a loss or a major change, we sort through everything with care and move what can be sold or auctioned into the right hands. As with our hoarding work, clearing a lifetime of belongings often brings a family back together, and what starts as a hard, practical task can become a chance to reconnect.',
      },
    ],
    testimonial: {
      quote: 'This job was life changing. Cindy changed my life.',
      attribution:
        '[PLACEHOLDER: fake first name, client approved photo use, confirm with Cindy]',
    },
    videoId: null,
    videoTitle: null,
    // TODO: confirm photo with Cindy. No recovered photo honestly shows this work.
    imageSlug: null,
    pairs: [],
  },
  {
    slug: 'home-organizing',
    order: 2,
    navTitle: 'Home Organizing',
    title: 'Home Organizing',
    intro:
      'We organize closets, kitchens, and whole homes so every room stays calm long after we leave. Our method is simple: we sort everything into clear categories and give it a place that matches how your household actually lives. That is what makes the systems hold, whether we are working on a single closet or every room in the house.',
    sections: [
      {
        id: 'rooms-of-the-home',
        title: 'Closets, kitchens, and living spaces',
        body:
          'We organize by clear categories and types so a space stays easy to keep up after we leave. In closets, we sort by color and style until it looks like a department store, and we help you purge, donate, or discard what no longer fits your life. In kitchens and pantries, we design the flow around how your family actually cooks, so the things you reach for every day are right where you expect them. Bedrooms become rooms that feel restful instead of cluttered, and we bring the same care to family rooms, playrooms, and toy areas, setting up storage that children can reach and put back on their own, kept age-appropriate as they grow and pleasing to be in rather than just tidy for a day.',
      },
      {
        id: 'garage-basement-storage',
        title: 'Garage, basement, and storage',
        body:
          'Garages, basements, and attics are where clutter tends to pile up out of sight, and we bring them back into order with clear bins, broken-down boxes, and a layout organized by section and by season. Whatever leaves the space, we donate, recycle, auction, or sell.',
      },
      {
        id: 'photos-and-keepsakes',
        title: 'Photos and keepsakes',
        body:
          'We bring order to photos and albums that have collected over the years, sorting them by family, by size, or in date order so the memories are easy to find and enjoy again instead of sitting in boxes.',
      },
    ],
    videoId: 'aputNGPglDw',
    videoTitle: 'Upgrading Your Closets',
    imageSlug: 'neat-closet05',
    // TODO: confirm photo pairs and captions with Cindy.
    pairs: [
      {
        beforeSlug: 'thumb-closet021',
        afterSlug: 'neat-closet05',
        caption: '[PLACEHOLDER: caption]',
      },
      {
        beforeSlug: 'thumb-kitchen03',
        afterSlug: 'spotless-kitchen-too',
        caption: '[PLACEHOLDER: caption]',
      },
      {
        beforeSlug: 'thumb-garage',
        afterSlug: 'final-basement1',
        caption: '[PLACEHOLDER: caption]',
      },
      {
        beforeSlug: 'thumb-storage',
        afterSlug: 'neat-bins',
        caption: '[PLACEHOLDER: caption]',
      },
    ],
  },
  {
    slug: 'moving-relocation',
    order: 3,
    navTitle: 'Moving & Relocation',
    title: 'Moving & Relocation',
    intro:
      'We handle the sorting, packing, and unpacking of a move so your new home feels calm from day one. Before you go, we purge and declutter what you no longer need and coordinate with your movers. When you arrive, we travel to the new home to unpack and set up every room, whether you are downsizing, relocating a senior parent, or simply starting fresh.',
    sections: [
      {
        id: 'before-the-move',
        title: 'Before the move',
        body:
          'Before moving day, we go through the whole home with you and decide what is worth taking and what is not. We donate, recycle, auction, or sell whatever you are ready to part with, and dispose of the true trash. Then we pack what remains and coordinate with your movers so nothing gets lost in the rush.',
      },
      {
        id: 'after-the-move',
        title: 'After the move',
        body:
          'Once you arrive, we come to the new home and unpack every box so you are not living out of them for weeks. We organize each room from the start, placing everything where it makes sense for how you live and making the most of the space you have. We work on our own or alongside your interior designer, so the home comes together as one finished space rather than a series of projects.',
      },
    ],
    videoId: null,
    videoTitle: null,
    // TODO: confirm photo with Cindy. img-0928 was the previous Moves image but the
    // gallery labels it as a home office.
    imageSlug: 'img-0928',
    pairs: [],
  },
  {
    slug: 'offices-paperwork',
    order: 4,
    navTitle: 'Paperwork',
    title: 'Paperwork',
    intro:
      'We sort, simplify, and build calm systems for the records and keepsakes that matter most, from financial and legal documents to family photos and paperwork.',
    sections: [
      {
        id: 'filing-systems',
        title: 'Filing systems',
        body:
          'We build filing systems around the records you actually keep, from financial and legal documents to the personal and family paperwork that runs a household. Using color-coded files, labeled binders, and chronological grouping, we make it easy to find any document in seconds and just as easy to keep filing correctly once we are done.',
      },
    ],
    videoId: 'n80MXdzLZ6w',
    videoTitle: 'Home Office Organizing',
    imageSlug: 'neat-workroom02',
    // TODO: confirm photo pair and caption with Cindy.
    pairs: [
      {
        beforeSlug: 'paperless-office',
        afterSlug: 'slider-cindy-office1',
        caption: '[PLACEHOLDER: caption]',
      },
    ],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesOrdered(): ServiceData[] {
  return [...services].sort((a, b) => a.order - b.order);
}
