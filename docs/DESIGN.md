# DESIGN.md — design system

Goal: calm, warm, trustworthy, credible. The visitor is about to let a stranger
into their home and touch their belongings, so the site must feel safe and
human, not luxury-concierge and not a busy legacy template.

## Color tokens

Define these as CSS variables and map them in tailwind.config.

| Token            | Hex      | Use                                            |
|------------------|----------|------------------------------------------------|
| --paper          | #F7F4EE  | Page background, warm cream                     |
| --surface        | #EFEADF  | Cards, alternating sections                     |
| --ink            | #2C2A26  | Primary text, warm near-black                   |
| --muted          | #6B6760  | Secondary text, captions                        |
| --sage           | #5E7461  | Brand color, headings accents, links           |
| --sage-deep      | #45584A  | Hover, borders                                  |
| --clay           | #C06A4B  | Primary CTA buttons, terracotta, high contrast  |
| --clay-deep      | #A6573B  | CTA hover                                       |
| --line           | #DED7C8  | Hairlines, dividers                             |

CTA buttons are clay, never sage. Sage is the calm brand field; clay is the
action color so it stands out. One primary CTA style site-wide.

## Typography

- Display: Fraunces. Headings, hero, section titles. Warm, editorial, human.
- Body: Inter. Paragraphs, navigation, forms, captions. Highly legible, calm.
- Load both via next/font. No third font.

Scale (clamp for fluid sizing):
- Hero h1: clamp(2.5rem, 5vw, 4rem), Fraunces, weight 500.
- Section h2: clamp(1.75rem, 3vw, 2.5rem), Fraunces.
- Body: 1.0625rem, Inter, line-height 1.7.
- Caption and labels: 0.875rem, Inter, --muted.

## Layout

- Max content width 1200px, generous side padding, lots of vertical breathing
  room. Calm beats dense for this audience.
- Sections alternate --paper and --surface for gentle rhythm.
- Before/after cards use a single consistent aspect ratio (4:3 matches the
  recovered camera originals) so the grid stays clean.
- Captions sit below each pair: room, place, challenge, intervention, outcome.
- Trust strip directly under the hero: bonded and insured, service area, review
  source. Repeat key trust cues in the footer.

## Imagery rules

- Use real recovered project photos and real founder photography only.
- Standardize crops to 4:3. Never stretch a small image to full width.
- The 30 full-res sources carry full-width and hero placements.
- The 16 mid images go in framed cards.
- The 12 small images go in tight thumbnails or get replaced by fresh shots.
- The final "after" image of each project deserves the most prominent slot.

## Components to standardize

- Button (primary clay, secondary outline-sage).
- Section wrapper with eyebrow label, title, body.
- BeforeAfterCard (pair, caption, optional lightbox).
- YouTubeFacade (poster image plus play, loads iframe on click).
- TrustStrip.
- TestimonialCard (quote, name, room, city).
- ConsultationCTA (reused in hero, mid-page, footer).
