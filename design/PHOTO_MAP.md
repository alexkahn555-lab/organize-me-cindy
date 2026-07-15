# QA pass — punch list and photo drop-in map

QA pass across all 13 routes (2026-07-14): screenshots at 1440 and 390
compared against the reference PNGs, interaction states captured (mobile nav
open, contact field focus, contact success, services row hover, before/after
slider and stacked), reduced-motion emulated on every animated page, full
keyboard tab-through, semantics audit, source greps, production build. No
visual or behavioral deltas required code changes. Verified results:

- Reduced motion: every animated page lands in its final state (home headline
  and trust rule, moving spine at 100%, home-organizing captions visible,
  about underline drawn, before/after stacked). Hoarding page has zero
  animated or transitioned elements at any motion setting.
- Keyboard: 15 to 26 tab stops per page, every stop shows a visible
  focus-visible indicator.
- Semantics: exactly one h1 per page, no heading-level skips, header/nav/
  main/footer landmarks everywhere, every form control labeled.
- Contrast at rendered sizes: muted 6.44:1 on paper and 5.04:1 on surface;
  sage-deep 6.96:1 / 5.44:1; button text 6.96:1. All clear AA. The About
  caps eyebrow uses sage on paper (4.61:1), legal on paper only.
- Greps: no em-dashes in rendered copy (two live only in code comments), no
  render brand names, no "Austin".
- `npm run build` passes clean; /sandbox 404s in production by design.

## Punch list (needs Cindy or a later pass, not fixable in code)

1. `[PLACEHOLDER]` strings render publicly and are waiting on Cindy: the
   consultation format line (home CTA band, FAQ), the hoarding testimonial
   attribution, both before/after timeframes, one FAQ answer (home during
   session), and the privacy and terms body copy (legal review).
2. The FAQ closing button still reads "Request a free consultation", the
   only button left with the old CTA copy; everywhere else says "Talk with
   Cindy". Kept verbatim under the preserve-FAQ-copy rule; confirm at the
   copy pass.
3. About headline hardcodes "Thirty years" per the page spec; it is 31 by
   `yearsInBusiness()` and will keep drifting.
4. `components/BeforeAfterCard.tsx`, `components/Gallery.tsx`, and
   `components/YouTubeFacade.tsx` are now unused (the before/after rebuild
   replaced them). The two Kelly video pairs and each service's recovered
   video/pairs data in `lib/services.ts` have no surface; decide where
   recovered videos live, or delete the dead components.
5. Email is still null in `lib/site.ts` (correctly never rendered) and the
   Calendly link was dropped from contact; both wait on real values.
6. PhotoFrame resolves slugs through `lib/media.ts`. Approved ambience
   imagery filled seven mood slots on 2026-07-14 (table below); proof slots
   ship as placeholders until client photos are confirmed per pair.

## Photo map (every slot, by page)

Mood slots wired with approved ambience imagery (alt text describes the
scene, never client work):

| Page | Media slug | Ratio | Notes |
|---|---|---|---|
| / (home) | `ambience-living-room` | 16/9 | Hero; ratio changed from 4/3 with the wiring, approved |
| /services/hoarding-estate-clearing | `ambience-window-light` | 3/2 | Empty bright room, per the mood-only brief |
| /services/moving-relocation | `ambience-moving-boxes` | 16/6 | `position="50% 66%"` keeps every visible box label whole |
| /services/home-organizing | `ambience-kitchen` | 16/6 | Full-bleed shelf band |
| /services/home-organizing | `ambience-linen-closet` | 3/2 | Portrait source; center crop keeps both bin labels |
| /services/offices-paperwork | `ambience-archive-boxes` | 3/4 | Landscape into portrait; box columns survive |
| /contact | `ambience-writing-nook` | 4/3 | Native-ratio fit |

Gallery pairs, confirmed by physical identifiers (2026-07-14). LAUNCH
BLOCKER: these sources are AI-processed stand-ins for the client's photos,
approved for the draft only; replace with originals before launch (full
notice at the top of `app/before-after/page.tsx`):

| Page | Media slugs | Ratio | Notes |
|---|---|---|---|
| /before-after ch. 1 | `project-01-before` / `-after` | 2/1 slider, 3/2 stacked | The kitchen; both crops steered to `50% 42%` |
| /before-after ch. 2 | `project-02-before` / `-after` | 2/1 slider, 3/2 stacked | The living room |

Still placeholders (waiting on confirmed client photos, or ruled out):

| Page | Slot slug | Label shown | Ratio | Notes |
|---|---|---|---|---|
| / (home) | `home-proof-closet-before` / `-after` | Before / After | 4/3 | Proof pair 1 |
| / (home) | `home-proof-garage-before` / `-after` | Before / After | 4/3 | Proof pair 2 |
| /services | `services-index-moving` | Client home, after the move | 4/3 | Featured Moving row |
| /services/home-organizing | `ho-garage` | The garage | 16/9 | Only ambience candidate had gibberish bin labels; stays empty |
| /before-after | `ba-office-before` / `-after` | Client photo | 2/1 slider, 3/2 stacked | Chapter 3; awaiting a confirmed pair |
| /about | `founder-portrait` | Founder photo | 3/4 | Real photo only, never generated |

To wire a proof slot: add the confirmed image through
`scripts/build-media.mjs` so it lands in `lib/media.ts`, pass its slug and an
honest `alt` to the PhotoFrame, and for the before/after sliders give each
panel layer in `app/before-after/ComparePair.tsx` a `next/image` fill (marked
PLACEHOLDER PASS in that file).
