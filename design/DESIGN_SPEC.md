# DESIGN_SPEC.md — Organize Me VA UI rebuild

This is the ground truth for every worker on this rebuild. Workers cannot see the
reference images. Everything the images say is written down here. If this file
and a render disagree, this file wins. If this file and `design/ORCHESTRATOR.md`
disagree, the disagreement is listed in "Decisions taken in Phase 0" below and
this file wins.

Read: this file, plus the copy rules in `design/ORCHESTRATOR.md`. Nothing else is
required. Do not read the renders (you can't) and do not invent a fact.

---

## 0. Non-negotiables

- Only the tokens in section 1. No new colors, fonts, packages, or shared
  components. Page-local composition of foundation components is the only
  freedom a page worker has.
- Never a price. Never "Austin". Never an em-dash in rendered copy. Never a fake
  brand name (Tidy House, Tidywell, Kindred Spaces, Cindy Bradley, Cindy Collins,
  Willow & Co, Hearth & Home, Organized for Life, Compassionate Clearing, Orderly
  Spaces, Cindy's Home Edit, Havenly Home, Tidy & Well). The wordmark is
  "Organize Me VA" and it comes from `lib/site.ts`.
- Brand, phone, service area, founded year, and the consultation line come from
  `lib/site.ts`. Service copy comes from `lib/services.ts`. Never hardcode them.
- No icon rows. No boxed form inputs. No card shadow-lift-plus-zoom hovers. No
  dead uniform section heights. No repeated identical eyebrow/heading/paragraph
  block at the same size in every section of a page.
- Every interactive element has a visible keyboard focus state.
- `npm run build` must pass before any commit.

---

## 1. Design system

### Colors (Tailwind names already in `tailwind.config.ts` — use these, do not rename)

| Token in ORCHESTRATOR | Tailwind name | Hex | Use |
|---|---|---|---|
| `--cream` | `paper` | `#F7F4EE` | page background, primary band |
| `--cream-deep` | `surface` | `#E2D9C4` | alternating band, form panel, photo placeholder fill |
| `--ink` | `ink` | `#2C2A26` | body and heading text |
| `--ink-muted` | `muted` | `#5C5851` | secondary text, captions, sublines |
| `--sage` | `sage` | `#5E7461` | accent: large text, rules, borders, hover, non-text accents |
| `--sage-deep` | `sage-deep` | `#45584A` | buttons, focus underline, small accent text |
| `--hairline` | `line` | `#CFC5AC` | rules and dividers |
| (extra, keep) | `line-strong` | `#8A8275` | form control edges; 3:1 minimum per WCAG 1.4.11 |
| (extra, keep) | `error` | `#B4432E` | form errors only |

Measured contrast (verify any new pairing before shipping it):
`muted` on paper 6.44:1, on surface 5.04:1 (both clear AA for normal text).
`sage-deep` on paper 6.96:1. `paper` on `sage-deep` (the button) 6.96:1.
`sage` on surface 3.61:1, which is why `sage` is large-text and non-text only.

Contrast rule that decides sage vs sage-deep: `sage` is only allowed for text at
24px and up, or for non-text (rules, dots, keylines, borders). Any accent text
under 24px uses `sage-deep`. This is why an eyebrow is `sage-deep` and a giant
chapter numeral is `sage`.

Banned: terracotta, orange, clay, neon, decorative gradients, dark page
backgrounds, drop shadows heavier than the photo plate in section 2.

### Type

- Display face: Newsreader (already wired via `next/font/google`, roman + italic,
  CSS var `--font-display`, Tailwind `font-display`).
- Body face: Inter (CSS var `--font-body`, Tailwind `font-body`), 18px base,
  line-height 1.7. Already the body default in `globals.css`.
- The scale lives in `components/Heading.tsx` and must not be duplicated inline:
  - `size="display"` = `clamp(2.75rem, 6vw, 5rem)`, semibold, leading 1.04. Page
    heroes only, one per page.
  - `size="section"` = `clamp(2rem, 3.6vw, 3rem)`, leading 1.1. In-page h2.
- Two more levels exist below that and are set per-use, not in Heading:
  - card / row title: `font-display text-xl` to `text-2xl`, ink.
  - museum caption: Inter, `text-xs`, uppercase, `tracking-[0.14em]`, `sage-deep`.
- Italic Newsreader is reserved for two things: the eyebrow and pull-quotes. It is
  not a general emphasis style.
- Editorial confidence means the display sizes actually differ between hero,
  section, and card level on a page. A page where every heading lands within a few
  pixels of every other heading is a failed page.

### Spacing rhythm

Vertical rhythm comes from `components/Section.tsx` `padding`:
`header` (tallest, page hero) → `lg` (feature band) → `base` (content band) →
`flush` (a band that is only a photo). A page must vary these. Three `base` bands
in a row is the "dead uniform height" failure.

Horizontal measure comes from `Section` `width`:
- `content` = 1200px max. Grids, galleries, card indexes, two-column compositions.
- `prose` = 37rem (~63 characters at 18px). Any band that is running text with no
  image beside it.
`width` is required whenever there is no `media` prop. That is deliberate: a text
band at the full 1200px measure is a bug the type system now refuses to allow.

---

## 2. Foundation components (Phase 1, orchestrator-built)

Workers consume these. Workers do not modify them. If a page seems to need a
change to one, stop and report it rather than forking it locally.

Existing components that stay and are restyled in place, not replaced:
`Section`, `Heading`, `Button`, `Nav`, `Footer`, `TrustStrip`, `ContactForm`
(wiring untouched), `BeforeAfterCard`, `Gallery`, `YouTubeFacade`.

### `Button`
One style site-wide. Soft rectangle, radius 4px (not a pill: every reference is a
rectangle, and the rectangle is what makes the page read as editorial rather than
as a SaaS template). Fill `sage-deep`, text `paper`, Inter, medium weight,
`px-7 py-3`. Hover: fill shifts to `sage`, 150ms color transition, nothing else,
no lift, no scale. Focus-visible: 2px `sage-deep` outline, 2px offset.
Secondary variant exists only where a page genuinely has two actions in one place;
it is a `sage` 1px outline with `sage-deep` text and the same geometry.
Button copy says what happens: "Talk with Cindy", "Send your note",
"Request a free consultation". Never "Learn more" as a primary action.

### `SectionBand`
Not a new component. It is `Section` with `background="paper"` or
`background="surface"`. Band alternation is a page-level decision, listed per page
in section 5. The paper-grain texture is an optional prop on the Offices page only
(see section 6).

### `Hairline`
A 1px `line` rule, full width of its container. Used to separate editorial rows
and to bracket the trust line. The active/hover counterpart is a 2px `sage` rule
in the same position.

### `PhotoFrame`
The single photo treatment for the whole site, used for every image and every
image placeholder.
- 8px radius, `overflow-hidden`.
- Soft photo plate: `shadow-sm` from the Tailwind config (a warm, ink-tinted
  1px/2px pair). Nothing heavier anywhere on the site.
- Aspect ratio is a prop. Defaults per use are given per page.
- Real image path: NOT WIRED in this pass, see section 4. The component records the
  intended slug and draws the placeholder panel.
- Placeholder path: renders a `surface` block at the same aspect ratio with a
  centred label in Inter, `text-xs`, uppercase, `tracking-[0.14em]`, `muted`,
  e.g. `CLIENT PHOTO`, `FOUNDER PHOTO`, `BEFORE`, `AFTER`. No icon, no illustration,
  no fake room imagery, ever.
- The placeholder and the real image occupy the identical box, so dropping in
  Cindy's photo later changes no layout.

### `TrustLine` (restyle of `TrustStrip`)
Text between two hairlines, centred, on `paper`, `text-sm`, `muted`, with a middle
dot separator: `Since 1995 · Bonded and insured · Serving Virginia, Maryland, and DC`.
Years and service area come from `lib/site.ts` (`yearsInBusiness()` / `serviceArea`).
NO ICONS. The leaf/shield/pin icons in home-mobile.png are a render deviation.
This also settles the open question in CLAUDE.md about the third trust cue: it is
the service area, not a review source.

### `FormField`
Underline style, never a box.
- Label: Inter, `text-sm`, sentence case (not caps), `muted` when idle.
- Input: transparent background, no border except a 1px `line-strong` bottom rule,
  `text-lg` ink, generous padding, no radius.
- Focus: bottom rule becomes 2px `sage-deep`; label turns `sage`. Nothing moves,
  nothing floats.
- Error: bottom rule and message in `error`, message linked with
  `aria-describedby`.
- Every field has a real `<label for>`. Placeholder text is never the label.

### `PullQuote`
Newsreader italic, `clamp(1.5rem, 3vw, 2.25rem)`, ink, centred, optional 1px `sage`
keyline box around it with generous internal padding (that is the hoarding promise
block). No text shadow. A muted Inter fact line may sit under the quote inside the
same keyline.

### `Nav`
Desktop: wordmark left in Newsreader; links right in Inter `text-sm`; the current
page carries a 2px `sage` underline; the Services item is the existing click/keyboard
disclosure (never hover-open) and keeps its Escape and outside-click handling; one
`Button` at the far right.
Mobile: hamburger opens a full-screen `paper` overlay per nav-mobile-open.png:
wordmark top-left, close X top-right, five oversized Newsreader links stacked
(`text-4xl` and up) with 1px `line` rules between them, a 2px `sage` underline
under the current page, then a full-bleed `sage-deep` CTA bar ("Talk with Cindy")
running edge to edge, then the serving line in Inter `text-sm` `muted` centred at
the bottom. Overlay traps focus, closes on Escape, and returns focus to the
hamburger.

### `Footer`
Per footer-desktop.png. Top edge is a 1px `sage` rule (not `line` — the sage rule
is what separates the footer from the page). Band is `surface`.
Three columns at desktop, stacked at mobile:
1. Wordmark in Newsreader `text-2xl` + one sentence in Inter `text-sm` `muted`.
2. Link column: Services, Our Work, About, Contact. Inter, one per line.
3. Fact block: `Since 1995`, `Bonded and insured`, `Serving {serviceArea}`, phone as
   a `tel:` link. Inter `text-sm`.
Then a 1px `line` rule and the copyright: `© {current year} Organize Me LLC.`
The year is `new Date().getFullYear()`; the phone is `site.phoneDisplay`, which is
real. The render's 703 number and 2024 copyright are placeholders and are ignored.
Keep the existing FAQ / Privacy / Terms links in the legal row.
No consultation button in the footer: every page already closes on a CTA band.

---

## 3. Motion spec

Global: `globals.css` already collapses all animation and transition under
`prefers-reduced-motion: reduce`, and forces `scroll-behavior: auto`. Every
animation below must therefore be authored so that its *final* state is the state a
reduced-motion visitor sees. Never animate from `opacity: 0` in CSS without a
reduced-motion rule that sets `opacity: 1`, or the content disappears for that
visitor.

| Page | Motion | Duration | Repeats | Reduced-motion state |
|---|---|---|---|---|
| Home | Load sequence: hero headline rises line by line (2 lines, 12px, staggered 90ms) and the sage rule under the trust line draws left to right | ~600ms total | once, on load | Headline at final position, rule fully drawn |
| Services | Row hover/focus: the 1px `line` rule under the row thickens to a 2px `sage` rule and the row arrow slides 4px right | 150ms | on hover/focus | Instant state change, no transition |
| Hoarding | NONE. Zero animation, zero transition on the whole page, including buttons and links. This is deliberate and must carry a code comment saying so: a page about shame does not perform for the visitor. | — | — | Identical |
| Moving | Timeline spine fills `sage-deep` from the top down to the active chapter as the reader scrolls | tied to scroll | continuous | Spine fully filled, static |
| Home Organizing | Museum caption fades in and rises 6px when its photo enters the viewport | 300ms | once per caption | Caption visible, at final position |
| Offices | Numbered circle fills `sage-deep` (hollow → solid, numeral flips to `paper`) on hover/focus | 150ms | on hover/focus | Instant state change |
| Before & After | Slider grip drag reveals the after panel | follows pointer | continuous | Slider is not rendered at all; the stacked pair renders instead |
| About | A 2px `sage` underline draws left to right under the word "Cindy" in the deck line | 400ms | once, on load | Underline fully drawn |
| Contact | None beyond the field focus transition (150ms underline color) | 150ms | on focus | Instant |

Nothing anywhere: no parallax, no scroll-jacking, no image zoom on hover, no card
lift on hover, no shimmer, no marquee.

---

## 4. Photography policy — PLACEHOLDERS ONLY IN THIS PASS

Every image slot on the site renders a `PhotoFrame` placeholder: a `surface` panel
at the slot's aspect ratio, with a small-caps `muted` label saying what the frame is
waiting for (`CLIENT PHOTO`, `FOUNDER PHOTO`, `BEFORE`, `AFTER`). No exceptions,
including the home hero and the founder photo.

Rules for workers:

- Do NOT import, read, or wire `lib/media.ts`. Do not resolve a slug to a file. Do
  not use `next/image` anywhere. `PhotoFrame` is the only way an image slot is
  expressed, and in this pass it draws a panel and nothing else.
- Do NOT invent, generate, or source imagery to fill a slot. Not stock, not AI, not
  a photo borrowed from another page.
- Do NOT construct a before/after pair. Two photos become a pair only when the client
  explicitly confirms them as one. Every before/after chapter therefore ships as two
  labelled placeholders (`BEFORE` / `AFTER`) with `[PLACEHOLDER: ...]` story lines.
  The unconfirmed `pairs` arrays in `lib/services.ts` are NOT a confirmation; they
  were assembled by an earlier session and carry a "confirm with Cindy" TODO. Ignore
  them for rendering.
- DO pass the intended slug to `PhotoFrame`'s `slug` prop where `lib/services.ts`
  names one. It is recorded as a `data-photo-slot` attribute and not resolved. That
  is how the later photo pass knows what each frame was reserved for.
- Every frame needs a label that reads as a note to the client, not as an error.

Photo selection is a separate later pass. `PhotoFrame` keeps the real-image path
documented in its header comment: restoring it changes the inside of one component
and moves no layout on any page, which is why every slot routes through it.

---

## 5. Page specifications

Order top to bottom. Every page ends on a CTA band and that band is the final
conversion point. No footer button.

### 5.1 Home (`app/page.tsx`)

Existing copy is kept (see section 7). The rebuild is structural.

1. **Hero.** Two columns at desktop, `paper`, `padding="header"`.
   Left: hero eyebrow line (Newsreader italic, `sage-deep`, small): the existing
   "Professional Organizing, Virginia, Maryland, and DC". Then the h1 at
   `size="display"`, two lines. Then a deck-line paragraph: Newsreader, `text-2xl`,
   `muted`, NOT Inter, and NOT the same size as body copy anywhere else on the page
   (this is the "editorial deck line" that stops the hero reading like a template).
   Then one `Button` ("Request a free consultation") and, beside it, the phone as a
   plain `sage-deep` link.
   Right: a `PhotoFrame` placeholder, 4:3, label `CINDY, IN A CLIENT HOME`, aligned to
   the hero's optical centre.
   The current implementation is a full-bleed photo with a text scrim over it. That
   goes: the scrim is a gradient, gradients are banned, and the reference hero is a
   two-column editorial composition, not a photo banner. The photo keeps its
   `object-position` crop so Cindy stays in frame.
   Mobile stack per home-mobile.png: wordmark/nav, headline, deck line, full-width
   button, photo, trust line.
2. **Trust line.** `TrustLine`, directly under the hero, between hairlines, on `paper`.
3. **Proof: recent work.** `surface`, `padding="lg"`. Section heading at
   `size="section"`. Three `PhotoFrame` placeholders at 4:3, labelled by category, with
   a caption line under each (Inter `text-sm`, ink). Under the cluster, the second CTA of the page
   (the brief requires a consultation CTA in the first viewport and again after the
   first proof cluster): one `Button`, "See all work" is demoted to a text link with
   a sliding arrow, not a button, because it is not the conversion action.
4. **Services menu.** `paper`, `padding="lg"`. Four services from
   `getServicesOrdered()`. NOT four identical bordered cards with a shadow-lift
   hover: that is the template tell the rebuild exists to remove. Instead, four
   editorial rows in a two-column grid, each row being title (Newsreader `text-2xl`)
   + one-line descriptor (Inter, muted) + arrow, separated by 1px `line` rules, with
   the services-page hover state (rule thickens to `sage`, arrow slides 4px).
5. **Process.** `surface`, `padding="base"`. Four steps. Oversized `sage` Newsreader
   numerals (01–04), title, body. No icons. Vertical 1px `line` dividers between
   columns at desktop, per the approach band in home-desktop.png.
6. **FAQ teaser.** `paper`, `padding="base"`, `variant="split"` (heading in the left
   rail, `<details>` list on the right, `line` dividers). Keep the existing three
   questions and the link to `/faq`. The disclosure chevron is the one icon allowed
   on this page because it is a control affordance, not decoration.
7. **CTA band.** `surface`, `padding="lg"`, centred. Heading, one supporting
   sentence, one `Button`, phone link, and the bonded/insured line.

Bands therefore alternate paper → (trust) → surface → paper → surface → paper →
surface, and the four `padding` values in play are header, lg, base, lg. No two
adjacent bands share a background.

### 5.2 Services index (`app/services/page.tsx`)

1. **Hero.** `paper`, `padding="header"`, `variant="split"`. h1 `size="display"`
   ("Every room. Every stage of life." — existing copy, keep). Intro paragraph.
   No hero photo card with a shadow: the hero is type only, so the rows below carry
   all the visual weight. (Change from the current build, which puts a photo card in
   the hero.)
2. **The four rows.** This is the whole page. Full-width editorial rows on `paper`,
   one per service in `getServicesOrdered()` order (Hoarding, Moving, Home Organizing,
   Offices), separated by 1px `line` rules, each row a link to its service page:
   - Left: service title in Newsreader. Row scale VARIES on purpose: rows 1 and 3 are
     larger (`clamp(2.25rem, 4vw, 3.5rem)`), rows 2 and 4 are smaller
     (`clamp(1.75rem, 2.6vw, 2.5rem)`). One row per screenful should feel like the
     lead. Under the title, a one-line emotional descriptor in Inter `muted` (the
     existing `descriptors` map on the home page has the four lines; reuse them, do
     not rewrite them).
   - Right: an arrow glyph (`→`, `sage-deep`), vertically centred.
   - Two of the four rows also carry a `PhotoFrame` placeholder, inset to the right of
     the text and roughly one-third the row width, with varied crops (one portrait,
     one landscape). Hoarding gets no photo (no honest image exists), and one other
     row goes photoless so the rhythm is not 2-2 alternating.
   - Row height varies with content; a photo row is taller. Uniform row heights are a
     failure.
   - Hover/focus: the rule under the row thickens from 1px `line` to 2px `sage` and
     the arrow slides 4px right, 150ms. Nothing else moves. NOTE: in
     services-desktop.png the hovered row is also physically larger with a photo.
     That is row-scale variety, not part of the hover state. Do not animate size.
   - The whole row is one link target with a visible focus ring.
   Mobile per services-mobile.png: the rows stack tall and full-bleed, one photo
   above the first row, arrows stay right, hairlines between.
3. **CTA band.** `surface`, centred, existing copy ("Not sure where to start?").

### 5.3 Hoarding & Estate Clearing (`/services/hoarding-estate-clearing`)

The most sensitive page on the site. ZERO animation and zero transition, documented
in a code comment. Widest whitespace, narrowest column.

1. **Hero.** `paper`, `padding="header"`. Two columns at desktop.
   Left: h1 `size="display"`, the service title from `lib/services.ts`. The approved
   headline "Help without judgment, at your pace." is used as the deck line under
   the h1, not as the h1, because the h1 must remain the service name for SEO.
   Then the existing `intro` from `lib/services.ts` (keep verbatim). Then one
   `Button` with the soft CTA copy: "Talk with Cindy first."
   Right: a `PhotoFrame` placeholder, 4:3, label `CLIENT PHOTO`. Art direction for
   when Cindy supplies a real one: an empty, calm room with daylight through a
   window. Never a photo of clutter or of a hoarded home.
2. **Body.** `paper`, `padding="lg"`, `width="prose"` (37rem — the narrowest column
   on the site). The two existing sections from `lib/services.ts` ("Bringing families
   back together", "Estate clearing and downsizing"), each an h2 at `size="section"`
   and its body paragraph, verbatim. No lists, no cards, no photos.
3. **Promise block.** `surface`, `padding="lg"`. A `PullQuote` inside a 1px `sage`
   keyline box, centred, spanning most of the measure: Newsreader italic, the
   promise sentence. Under it inside the same keyline, a muted Inter fact line:
   "Bonded and insured. Working with families since 1995." (years via
   `yearsInBusiness()`; the sentence is a fact, not a claim). The promise sentence
   itself is the one line a worker may write fresh here, in the site voice, on the
   theme of the client staying in control of what leaves the house. No text shadow.
   No botanical sprig (the render has one; cut it).
4. **Testimonial.** `paper`, `padding="lg"`. The single testimonial on the entire
   site lives here, from `service.testimonial` in `lib/services.ts`. Newsreader,
   centred, attribution in muted Inter (still a `[PLACEHOLDER: ...]` string; render it
   as-is, do not invent a name).
5. **CTA band.** `paper`, `padding="lg"`, centred, quiet. Heading, one sentence,
   one `Button` ("Talk with Cindy first"), phone link. Note this page's CTA band is
   `paper`, not `surface`: the whole page stays on one background so it reads as calm
   rather than as sectioned.

### 5.4 Moving & Relocation (`/services/moving-relocation`)

1. **Hero.** `paper`, `padding="header"`. Title h1 `size="display"`, existing `intro`
   verbatim, `Button`, and a `PhotoFrame` placeholder to the right (`slug="img-0928"`,
   label `CLIENT PHOTO`).
2. **Chapters.** The signature of this page. A left timeline spine runs the full
   height of the chapter stack: a 1px `line` vertical rule, inset from the left
   margin, with a filled `sage` dot at each chapter's vertical centre. The spine
   fills `sage-deep` from the top down to the active chapter as the reader scrolls.
   Each chapter:
   - An oversized `sage` Newsreader numeral (`01`, `02`, ...) at
     `clamp(3.5rem, 7vw, 6rem)`, sitting above the chapter heading.
   - Chapter heading, Newsreader ink, `size="section"`.
   - Body paragraphs in Inter, at `prose` measure.
   - A `PhotoFrame` placeholder on the right for chapters that have a slot; otherwise the
     chapter is a single column and the spine still runs.
   `lib/services.ts` supplies two sections ("Before the move", "After the move"). A
   third chapter is NOT to be invented. Two chapters, numbered 01 and 02.
   Bands alternate paper / surface per chapter.
3. **CTA band.** `surface`, centred.

### 5.5 Home Organizing (`/services/home-organizing`)

A gallery walk. The page's job is to make the reader want to keep scrolling.

1. **Hero.** `paper`, `padding="header"`. Title, existing `intro`, `Button`,
   a `PhotoFrame` placeholder to the right (`slug="neat-closet05"`, landscape).
2. **Room sections at deliberately varied widths.** Three sections come from
   `lib/services.ts` ("Closets, kitchens, and living spaces", "Garage, basement, and
   storage", "Photos and keepsakes"). Give each a different composition:
   - Section 1: full-bleed photo (breaks the 1200px measure, runs edge to edge),
     museum caption below it, then the body copy at `prose` measure centred beneath.
   - Section 2: two-thirds-width photo on a `surface` band, body copy in a left rail
     beside it.
   - Section 3: a centred, narrower photo (roughly half measure) with the caption and
     body copy centred under it.
   No two sections may share a composition. That variety IS the design.
3. **Museum captions.** Under each photo, per closet-caption-frame.png:
   - Line 1: the room label, Inter, uppercase, `tracking-[0.14em]`, `text-xs`,
     `sage-deep`. Optionally a middle dot and a short phrase in the same style.
   - Line 2: a subline in Inter (NOT serif; the render's serif subline is a
     deviation), `text-sm`, `muted`.
   - Line 3: a 1px `line` rule under the caption block, indented to the photo width.
   - Motion: caption fades in and rises 6px on enter, once.
4. **Video.** The existing `YouTubeFacade` with `aputNGPglDw` / "Upgrading Your
   Closets", framed in a `PhotoFrame`-matching plate, never full-bleed, centred at
   two-thirds measure.
5. **Before and after.** The existing four `pairs` through `BeforeAfterCard`. Captions
   are still `[PLACEHOLDER: caption]` in `lib/services.ts`; render them as-is.
6. **CTA band.** `surface`, centred.

### 5.6 Offices & Paperwork (`/services/offices-paperwork`)

The strictest grid on the site. Everything aligns to a 12-column grid with no
optical fudging. This page is the counterpoint to Home Organizing's looseness.

1. **Hero.** `paper`, `padding="header"`. Title, existing `intro`, `Button`,
   a `PhotoFrame` placeholder right (`slug="neat-workroom02"`).
2. **Tabbed-folder notch divider.** The transition from the hero into the process band
   is a tabbed-folder edge: the `surface` band's top edge carries two or three
   trapezoidal tabs (CSS `clip-path` on a pseudo-element, `surface` colored, sitting
   above the band's top edge). Subtle, warm, and the only ornament on the site.
   `aria-hidden`.
3. **Process band.** `surface` + paper grain (section 6). Eyebrow "Our process"
   (Newsreader italic `sage-deep`), heading, a full-width 1px `line` rule under the
   heading, then three numbered steps in a strict three-column grid with 1px `line`
   vertical dividers between columns:
   - Numeral in a hollow circle: 1px `sage` border, ~56px diameter, numeral in
     Newsreader `sage`.
   - Hover/focus on the step: circle fills `sage-deep`, numeral flips to `paper`,
     150ms.
   - Step title in Newsreader `text-xl`, body in Inter `muted`.
   The step content is written fresh by the worker in the site voice (assess, organize,
   maintain), three steps, one sentence each, since `lib/services.ts` has no process
   copy for this service.
   Right of the grid, or beneath it at mobile, a `PhotoFrame` placeholder
   (`slug="slider-cindy-office1"`).
4. **Filing systems section.** The one existing section from `lib/services.ts`,
   verbatim, on `paper`, at `prose` measure.
5. **Before and after.** The existing single pair through `BeforeAfterCard`.
6. **CTA band.** `surface`, centred.

### 5.7 Before & After (`/before-after`)

Route stays `/before-after`. Nav label stays "Our Work" (existing copy).

1. **Hero.** `paper`, `padding="header"`. h1 `size="display"`, existing copy
   ("Our Work"), existing intro. The approved headline "The work, before and after."
   may be used as the deck line under the h1.
2. **Project chapters.** One project per full-width chapter, `padding="lg"`, bands
   alternating paper / surface. Each chapter:
   - Desktop: a drag-to-compare slider per beforeafter-slider.png. Two panels in one
     `PhotoFrame`-styled box; a vertical 2px `sage` rule at the split; a circular
     `sage-deep` grip (~44px) centred on the rule; `BEFORE` top-left and `AFTER`
     top-right in Inter uppercase `tracking-[0.14em]` `text-xs` `muted`.
   - Keyboard: the grip is a real `<input type="range">` or a focusable element with
     arrow-key handling and an `aria-label`. If it cannot be made keyboard-operable,
     it is bypassed to the stacked view. It is never a mouse-only control.
   - Mobile AND `prefers-reduced-motion`: no slider at all. Render the stacked pair per
     beforeafter-mobile-stacked.png: `BEFORE` label, panel, a 1px `sage` rule, `AFTER`
     label, panel.
   - Under the pair: three short story lines (setup, what we did, how it feels now),
     each its own paragraph, Inter, at `prose` measure. Then a metadata line in Inter
     uppercase `tracking-[0.14em]` `text-xs` `muted`:
     `PROJECT TYPE: {room} · TIMEFRAME: {timeframe}`. Never a price. Never a city.
   - Photos: BOTH panels are `PhotoFrame` placeholders labelled `BEFORE` / `AFTER`, on
     every chapter without exception. Never construct a pair yourself; the `pairs`
     arrays in `lib/services.ts` are unconfirmed and are not rendered. Story lines ship
     as `[PLACEHOLDER: ...]`; do not invent a client story.
3. **Video pairs.** The existing Kelly bedroom and bathroom `YouTubeFacade` pairs stay,
   framed, on a `surface` band, never full-bleed.
4. **Gallery.** The existing `Gallery` component stays, on `paper`.
5. **CTA band.** `surface`, centred, existing copy.

### 5.8 About (`/about`)

1. **Letter layout.** `paper`, `padding="header"`. Two columns.
   Left (roughly 60%): the eyebrow `SINCE 1995` in Inter, uppercase,
   `tracking-[0.14em]`, `text-xs`, `sage-deep`. This is the only letter-spaced-caps
   eyebrow on the site; every other eyebrow is the Newsreader italic style.
   Then the h1 at `size="display"`, two lines. Existing About copy has no such
   headline, so the approved one is used: "Thirty years of helping people feel at
   home again." — but the number must not be hardcoded; render it from
   `yearsInBusiness()` so it cannot go stale, e.g. `{yearsInBusiness()} years of
   helping people feel at home again.` and adjust the sentence to read naturally with
   a numeral.
   Then a deck line in Inter `text-lg` `muted`: "A note from Cindy, on the heart
   behind our work." with a 2px `sage` underline under the word "Cindy" that draws on
   load (400ms, once).
   Then the existing six-paragraph bio, verbatim, at `prose` measure inside the column,
   as letter-style running text.
   Then one `Button`.
   Then a 1px `line` rule, the fact row (`Since 1995 · Bonded and insured · Serving
   Virginia, Maryland, and DC`) in Inter `text-sm`, and a second 1px `line` rule.
   Right (roughly 40%): a `PhotoFrame` placeholder, portrait, top-aligned, running tall
   beside the letter, label `FOUNDER PHOTO` (`slug="garlick-cindy-01"`).
   The existing "bonded and insured" bordered card is removed; the fact row replaces it.
2. **Cover band.** A full-width `PhotoFrame` placeholder band at `padding="flush"`, 16:6
   (`slug="img-0928"`).
3. **CTA band.** `surface`, centred, existing copy.

### 5.9 Contact (`/contact`)

PRESERVE THE EXISTING FORM WIRING. `components/ContactForm.tsx` posts to
`/api/contact` with Turnstile and a honeypot, and `app/api/contact/route.ts` verifies
and sends through Resend. Do not touch the fetch, the state machine, the field names,
the honeypot, or the Turnstile integration. Restyle the markup around them only.

1. **Split note layout.** `paper` page; the form panel sits on `surface`.
   Left column: h1 `size="display"` — existing copy is "Request a free consultation."
   Keep it as the h1 and use the approved "Tell us a little about your space." as the
   deck line beneath. Then the existing two supporting paragraphs. Then the existing
   secondary aside (phone with hours, the Calendly TODO link, the service-area note,
   the privacy line) as running text with hairline separators, not as bordered cards.
   Then one `PhotoFrame` placeholder, 3:2, label `A CALM DESK`.
   Right column: the form on a `surface` panel with generous padding.
2. **Fields.** Underline style per `FormField`. The existing fields stay exactly as
   they are functionally: name, email, city or ZIP, the four service checkboxes, the
   timeline select, the message textarea, honeypot, Turnstile. Restyle:
   - Text inputs and textarea: underline only.
   - Checkboxes: keep the existing real-input-plus-peer-checked tick; restyle the box
     to a 1px `line-strong` square with a `sage-deep` fill when checked. Keep the
     focus-visible outline.
   - Select: keep the native select and the existing custom chevron; underline style.
   - Submit: `Button` styling, copy "Send your note." Disabled state keeps the existing
     Turnstile gating.
3. **Success state.** Replaces the form in place, per contact-success.png: on the
   `surface` panel, a short centred 2px `sage` rule ornament, then "Thank you." in
   Newsreader at `size="section"`, then the promise line in Inter `muted` (the existing
   "Cindy will be in touch within one business day." is kept), then a "Back to home"
   link in `sage-deep` with a real underline. No icons. Generous vertical space.
   The success container gets `role="status"` so a screen reader hears it.

### 5.10 404 (`app/not-found.tsx`, new)

`paper`, centred, `padding="header"`. Newsreader heading, one warm plain sentence, and
two text links (home, contact). No illustration, no big "404" numeral, no humor at the
visitor's expense. One `Button` back to home.

### 5.11 FAQ, Privacy, Terms

These exist (`/faq`, `/privacy`, `/terms`) and are linked from the footer. ORCHESTRATOR
does not list them. They stay. Restyle them to the foundation components (Section,
Heading, prose measure) and do not rewrite their copy. They get no CTA band beyond what
they already have.

---

## 6. Paper grain

Offices page only, on the `surface` process band, at 2 to 3 percent opacity.
Do NOT ship `design/references/paper-grain-texture.png`: it is a 2.4 MB PNG of an
almost featureless warm tan field, and at 3 percent opacity nothing of it survives
except the page weight. Reproduce it as an inline SVG `feTurbulence` noise layer
(fractalNoise, baseFrequency ~0.8, one octave) as a data URI on a pseudo-element,
`opacity: 0.03`, `pointer-events: none`, `aria-hidden`. Same effect, roughly 300 bytes.

---

## 7. Copy: what is preserved, what is written fresh

The copy already in this repo was written deliberately (commit `0daf474`) and is in
voice. It is PRESERVED. Workers do not rewrite it, do not "improve" it, and do not
paraphrase it to fit a layout. If a layout does not fit the copy, the layout changes.

Preserved verbatim:
- All of `lib/services.ts`: intros, section titles, section bodies, the testimonial.
- The home page: hero eyebrow, h1, hero paragraph, the `descriptors` map, the four
  process steps, the three FAQs, the CTA band copy.
- The About bio: all six paragraphs.
- The Contact page: heading, intro, the aside (phone, hours, Calendly TODO, service
  area, privacy line), the form labels, the error message, the success message.
- The services index heading and CTA copy.
- The before/after page heading, intro, and video pair labels.
- Every `[PLACEHOLDER: ...]` string. Render them as-is. They are a signal to Cindy,
  not a bug.

Written fresh by workers (only where no copy exists today):
- The hoarding promise sentence (section 5.3).
- The three Offices process steps (section 5.6).
- Nothing on Before & After: every chapter ships `[PLACEHOLDER: ...]` story lines until
  the client confirms the pairs.
- The About deck line and the 404 copy.
- Museum captions on Home Organizing (room label plus a short subline each).

Approved headlines from ORCHESTRATOR are used only where a page has no existing
headline, and never at the cost of the h1 being the page's real subject:
"Your home, back to calm." / "Help without judgment, at your pace." /
"Thirty years of helping people feel at home again." /
"Tell us a little about your space." / "The work, before and after."
Where a page already has a headline, the approved line becomes the deck line under it.

Voice: warm, plain, emotionally specific. Complete sentences. "We" throughout. People
served are "clients". No buzzwords. No em-dashes. No prices. Sell relief before tasks.

---

## 8. Acceptance criteria (every page, every worker)

- `npm run build` passes.
- Responsive from 380px up. No horizontal scroll at 380px.
- Every image slot is a `PhotoFrame`. No `next/image`, no `lib/media.ts` import.
- Every CTA is wired to `/contact` or `tel:`.
- Semantic heading order: exactly one h1, no skipped levels.
- Every interactive element has a visible focus state and a real accessible name.
- Reduced motion verified: the page is fully readable and complete with animation off.
- No em-dash in the source (`grep -n "—" app components lib` returns nothing).
- No banned pattern: no boxed inputs, no shadow-lift hovers, no 1.03 image zooms, no
  icon strips, no gradients, no new colors or fonts.
- No two adjacent bands share a background, and no page has three consecutive bands at
  the same `padding`.
