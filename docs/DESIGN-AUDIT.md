# DESIGN-AUDIT.md — current design system, as implemented

Investigation only. No code was changed. Every value below was read from the
actual source, not from DESIGN.md, and cross-checked against full-page
screenshots captured at 1440px and 390px (see `docs/audit-shots/`). Where the
code differs from DESIGN.md, the code is reported and the divergence is noted.

Files read in full: `app/globals.css`, `tailwind.config.ts`, every file in
`components/`, every page under `app/` (including `app/services/[slug]/page.tsx`
and `app/api/contact/route.ts`), `lib/media.ts`, `lib/services.ts`,
`app/layout.tsx`.

Screenshots captured (Playwright MCP was available): home, services, our-work,
about, testimonials, contact — each at `-1440.png` and `-390.png` under
`docs/audit-shots/`.

---

## 1. Color tokens as actually implemented

Defined twice, in agreement: as CSS variables in `app/globals.css:5-15` and as
Tailwind theme colors in `tailwind.config.ts:7-17`. The two sets match the
DESIGN.md table exactly.

| Token | Hex | Tailwind class root | Where used (representative) |
|-------|-----|--------------------|------------------------------|
| `--paper` | `#F7F4EE` | `paper` | `body` bg (`globals.css:19`); card bg on inner pages (`bg-paper` on tips/testimonials/contact aside/about trust box); button text on clay (`text-paper`); nav/footer bg |
| `--surface` | `#EFEADF` | `surface` | alternating section bg (`bg-surface`) on every page; card bg in BeforeAfterCard (`components/BeforeAfterCard.tsx:46`) and Gallery figure (`components/Gallery.tsx:101`); footer + trust strip bg |
| `--ink` | `#2C2A26` | `ink` | primary text everywhere (`text-ink`); hero bg (`bg-ink`, `app/page.tsx:80`); featured testimonial band bg (`app/page.tsx`); lightbox scrim via `bg-ink/90`; label chips `bg-ink/60` |
| `--muted` | `#6B6760` | `muted` | secondary text, captions, paragraphs (`text-muted` — pervasive) |
| `--sage` | `#5E7461` | `sage` | eyebrows (`text-sage`), links/hover, secondary button border/text, list bullets (`bg-sage`, service detail `:58`), brand word in logo |
| `--sage-deep` | `#45584A` | `sage-deep` | link hover (`hover:text-sage-deep`), "Learn more" hover |
| `--clay` | `#C06A4B` | `clay` | primary CTA bg (`components/Button.tsx:20`), form required asterisks (`text-clay`), error text, focus outline |
| `--clay-deep` | `#A6573B` | `clay-deep` | primary CTA hover (`hover:bg-clay-deep`) |
| `--line` | `#DED7C8` | `line` | all hairlines/dividers/borders (`border-line`, `divide-line`), before/after image gutter (`bg-line`, `BeforeAfterCard.tsx:53`) |

**Hardcoded colors that bypass the tokens:**
- `components/YouTubeFacade.tsx` — the dim poster overlay uses `bg-black/20`
  (line ~43) and the play-triangle SVG uses `fill="white"` (line ~54). These are
  the only two genuinely off-token color literals in the codebase; `black` should
  be `ink` and `white` should be `paper`.
- Everything else that looks like a literal is a token-with-opacity
  (`bg-ink/60`, `bg-paper/10`, `bg-sage/15`, `text-paper/70`, `bg-ink/90`),
  which is token-based and fine.

**Assessment:** color is the most disciplined part of the system. Nine tokens,
defined once per layer, essentially zero off-palette drift.

---

## 2. Typography as implemented

**Families and loading.** Loaded via `next/font/google` in `app/layout.tsx:7-17`:
- Display: **Fraunces**, bound to `--font-display`, `display: 'swap'`.
- Body: **Inter**, bound to `--font-body`, `display: 'swap'`.
Mapped in `tailwind.config.ts:18-21` (`font-display`, `font-body`) and applied
in `app/globals.css`: `body` → `var(--font-body)` (`:21`); `h1,h2,h3` →
`var(--font-display)`, **`font-weight: 500`**, **`line-height: 1.1`** (`:24-28`).
No third font. No weight or optical-size axis is requested from Fraunces beyond
the single 500 default.

**Weights actually in use:** only **400** (default body) and **500**
(`font-weight:500` on all headings; `font-medium` on buttons, nav-ish labels,
form labels, names). There is **no 600/700 anywhere**, and Fraunces is never used
above 500 and never in italic. The type has almost no weight contrast.

**Distinct sizes in use (Tailwind → rem):**
- `text-[clamp(2.5rem,5vw,4rem)]` — every page **h1** (home hero `app/page.tsx`;
  about `:26`; services `:27`; service detail `:35`; contact `:18`; tips `:74`;
  testimonials `:44`).
- `text-[clamp(1.75rem,3vw,2.5rem)]` — every section **h2** (home, services,
  service detail, tips, testimonials CTAs, etc.).
- `text-2xl` (1.5rem) — one-offs: testimonials "Worked with Cindy recently?"
  (`:103`), contact success message (`ContactForm.tsx:63`).
- `text-xl` (1.25rem) — h3 service-card titles (services `:77`, tips `:95`),
  footer/nav brand wordmark, our-work room subheads.
- `text-lg` (1.125rem) — hero/section sublines and intros (`text-lg leading-relaxed`),
  step titles, featured testimonial sits larger via its own clamp.
- `text-base` (1rem) — testimonial quote bodies, **about body copy**
  (`text-base leading-relaxed`, `about/page.tsx`), FAQ summary text.
- `text-sm` (0.875rem) — nav links, buttons, all captions, form fields/labels,
  trust strip, "Learn more", muted helper text. This is the workhorse size.
- `text-xs` (0.75rem) — footer fine print, before/after "Before/After" chips,
  trust micro-text.

**Line-height / letter-spacing:**
- Headings: `1.1` globally (`globals.css:27`); the home hero overrides to
  `leading-[1.08]` — a second, near-identical heading line-height for one element.
- Body: `leading-relaxed` (1.625) in most prose; otherwise default 1.5. The
  DESIGN.md spec of **body `1.0625rem` / line-height `1.7` is not implemented** —
  code uses `text-base` (1rem) / `leading-relaxed`.
- Letter-spacing appears in exactly two places: eyebrows
  `uppercase tracking-[0.18em]` (sage, `text-sm`) and the before/after chips
  `tracking-[0.12em]`.

**Effective type scale:** two fluid heading steps (≤4rem, ≤2.5rem) plus a
fixed ladder 1.5 / 1.25 / 1.125 / 1 / 0.875 / 0.75rem. The top of the scale is
modest (4rem max hero, 2.5rem max section) and the whole system leans on
`text-sm`. Display and body are correctly separated (Fraunces on headings via
the global rule, Inter on everything else), but the display font does no
expressive work — single weight, no italic, no large editorial sizes.

---

## 3. Spacing and layout

**Container.** Uniform: `mx-auto max-w-content` (= 1200px, `tailwind.config.ts:22-24`)
with `px-6` (24px) side padding on every section, every page. Consistent.

**Vertical rhythm (the inconsistent part).** Section padding is ad hoc and splits
by page family:
- Hero: `py-28 md:py-40` (112 / 160px) — home hero only.
- Home content sections: `py-20` (80px) throughout `app/page.tsx`.
- Inner-page sections (services, service detail, contact, tips, testimonials,
  our-work, about): mostly `py-16` (64px), with page headers `py-16 md:py-24`
  (64 / 96px).
- Some headers shrink to `py-12 md:py-16` (testimonials header `:40`, our-work
  header `before-after/page.tsx:29`).

So the home page breathes at 80px while every other page breathes at 64px, and
headers use a third value. There is no single spacing token; the rhythm is
hand-set per section.

**Gaps (also inconsistent):** `gap-4` (home services grid), `gap-6` (home recent
work, testimonials, before/after grids), `gap-8` (services grid, tips grid),
`gap-10` / `gap-12` / `gap-16` (two-column hero and contact layouts). Five
different gap values across similar grids.

**Grid patterns:**
- 3-up cards: `grid sm:grid-cols-2 lg:grid-cols-3` (services `:56`, home services
  `app/page.tsx`).
- 2-up: testimonials (`sm:grid-cols-2`), tips (`sm:grid-cols-2`).
- Home "recent work": `grid sm:grid-cols-3` — jumps **1 → 3 columns** at the
  640px breakpoint with no 2-column stage (visible as three very narrow columns
  just above 640px).
- Two-column hero/body: services `md:grid-cols-2`, about
  `md:grid-cols-[1fr_2fr]`, contact `lg:grid-cols-[2fr_1fr]`.

**Assessment:** layout width is fully consistent; vertical rhythm and gaps are
not. The eye reads an even, slightly monotonous cadence because nearly every
section is the same 64–80px tall block.

---

## 4. Surface detail

- **Borders / hairlines:** a single hairline color `border-line` (#DED7C8).
  Used as `border-b` (nav `Nav.tsx:14`), `border-t` (footer `Footer.tsx:6,28`),
  `border-y` (trust strip `TrustStrip.tsx:10`), and `border border-line` on cards
  (tips `:91`, testimonials `:58`, contact aside `:71`, about trust box `:59`)
  and form fields. One weight, one color — no secondary/contrasting hairline.
- **Radii (inconsistent scale):** `rounded-full` (all buttons, avatar pills,
  play button, lightbox close); `rounded-lg` (8px — cards, images, hero image,
  trust box, dialog); `rounded-md` (6px — form fields `ContactForm.tsx:25`,
  lightbox images); plain `rounded` (4px — before/after "Before/After" chips).
  Four radius steps in use.
- **Shadows:** almost none. Only the services index cards have elevation —
  `shadow-sm` base with `hover:shadow-md` (`services/page.tsx:63`). Home service
  cards use `hover:shadow-md` with **no base shadow**. There is no shadow scale
  and no elevation language; the site is intentionally flat.
- **Dividers:** `divide-y divide-line` on the FAQ accordion (`app/page.tsx`),
  `border-t border-line pt-5/pt-6` on testimonial figcaptions and the footer
  base. A thin sage rule (`border-l-2 border-sage pl-5`) on the about "Based in…"
  block — a one-off treatment used nowhere else.

---

## 5. Interaction and motion

- **Buttons** (`components/Button.tsx:16-21`): `transition-colors`; primary
  `bg-clay → hover:bg-clay-deep`; secondary `border border-sage text-sage →
  hover:bg-sage hover:text-paper`.
- **Links:** `hover:text-sage` (nav, footer phone); `hover:text-sage-deep` (sage
  links, "Learn more").
- **Cards:** `transition-shadow hover:shadow-md`; thumbnails zoom on hover —
  `transition-transform duration-300 hover:scale-[1.03]` (services `:72`, Gallery
  `:115`) or `group-hover:scale-[1.03]`. This shadow-lift + 1.03 image zoom is the
  default Tailwind-starter hover.
- **Focus:** `focus-visible:outline outline-2 outline-offset-2` with
  `outline-clay` (buttons), `outline-sage` (Google-review button), `outline-paper`
  (lightbox close). Form fields: `focus:border-sage focus:outline-none
  focus:ring-1 focus:ring-sage` (`ContactForm.tsx:25`). Focus styling is present
  and reasonable.
- **FAQ chevron:** `rotate-180` on `[open]` via
  `[&[open]>summary>svg]:rotate-180`, `transition-transform duration-200`.
- **Reduced motion:** `globals.css:32-34` kills all animation/transition under
  `prefers-reduced-motion: reduce`.

Motion is tasteful and minimal but entirely conventional — there is no signature
interaction.

---

## 6. Component inventory

| Component | Props / variants | Used by |
|-----------|------------------|---------|
| `Button` (`components/Button.tsx`) | `href`, `children`, `variant: 'primary'\|'secondary'` (default primary). Primary = clay pill; secondary = sage outline. | Nav, Footer, home, services, service detail, about, tips, testimonials. **Not** used by ContactForm or the Google-review link (both reimplement it inline). |
| `Nav` (`Nav.tsx`) | none; internal `links[]` (Services, Our Work, About, Testimonials, Tips) + clay "Free consultation" Button. | root layout |
| `Footer` (`Footer.tsx`) | none. Brand, blurb, phone, CTA Button, trust line, © year. | root layout |
| `TrustStrip` (`TrustStrip.tsx`) | none; internal `cues[]` (bonded/insured, service area, real reviews). | **home and about only** — not on services, service detail, contact, tips, testimonials. DESIGN.md intended it directly under the hero generally. |
| `BeforeAfterCard` (`BeforeAfterCard.tsx`) | `beforeSlug`, `afterSlug`, `caption`; built-in Esc/scroll-lock lightbox; 4:3 paired crop with Before/After chips. | **service detail pages only** (`services/[slug]`). The home page no longer uses it. |
| `YouTubeFacade` (`YouTubeFacade.tsx`) | `videoId`, `title`; poster `maxresdefault → hqdefault` onError fallback; click swaps in iframe. | service detail, tips, testimonials, our-work. |
| `Gallery` (`Gallery.tsx`) | none; hardcoded `categories[]` of `{slug,label}`; lightbox. | **our-work only**. |
| `ContactForm` (`ContactForm.tsx`) | none; controlled fields, posts to `/api/contact`, success/error states. Submit button is a hand-rolled clay pill (lines 184-189) duplicating Button's styles. | contact only. |

**Components specified in DESIGN.md but never built:** a Section wrapper
(eyebrow + title + body), `TestimonialCard`, and `ConsultationCTA`. All three are
inlined and copy-pasted across pages instead (see §10).

---

## 7. Per-page section sequence (exposing the rhythm)

Legend: **E** = small uppercase sage eyebrow, **H** = Fraunces heading, **P** =
muted paragraph. Background in parentheses.

**Home (`app/page.tsx`)** — `home-1440.png`
1. Hero (ink, image @ opacity-40): H + P + clay CTA + phone. Eyebrow is sage on a dark photo and nearly invisible.
2. Trust strip (surface): 3 inline cues.
3. "Cindy's work" (paper): E + H + 3-image row + secondary CTA.
4. "What Cindy organizes" (surface): E + H + 9-card 3-col grid.
5. "How it works" (paper): E + H + 4 numbered steps + clay CTA.
6. Featured testimonial (**ink**): large centered Fraunces quote + "Read all reviews". The one dark, full-width peak.
7. FAQ (paper): E + H + accordion + link.
8. Footer CTA (surface): H + P + CTA + phone + trust line.

**Services (`app/services/page.tsx`)** — `services-1440.png`
1. Hero (paper): two-col E+H+P / 4:3 image. Left column leaves large empty space below the 3-line paragraph.
2. Cards (surface): 9-card 3-col grid. **The "Kitchens and Pantries" card has no image** (null `imageSlug`) and renders as an empty white box in the grid.
3. CTA (paper): H + P + clay CTA.

**Service detail (`app/services/[slug]/page.tsx`)**
1. Header (paper): E + H + P + CTA.
2. "What this covers" (surface): H + sage-bullet list.
3. "See it in action" (paper): H + YouTubeFacade (when `videoId`).
4. "Before and after" (surface): H + BeforeAfterCard grid (when `pairs`).
5. CTA (paper): H + P + CTA + phone.

**Our Work (`app/before-after/page.tsx`)** — `our-work-1440.png`
1. Header (paper): E + H + P.
2. "Before and after videos" (surface): H + 2 video pairs (YouTubeFacade).
3. Gallery (paper): 7 category blocks, each H + 4:3 thumb grid.
4. CTA (surface): H + P + CTA.

**About (`app/about/page.tsx`)** — `about-1440.png`
1. Header (paper): E + H.
2. Trust strip (surface).
3. Story (paper): left rail (founder photo + trust box) / right 6-paragraph column + sage-rule line + CTA. Left rail is far shorter than the text column, leaving a large empty area beneath it.
4. Cover band (surface): full-width 16:6 image.
5. CTA (surface): H + P + CTA + phone.

**Testimonials (`app/testimonials/page.tsx`)** — `testimonials-1440.png`
1. Header (paper): E + H + "In their own words." (a near-duplicate of the heading).
2. Quotes (surface): 2-col cards with initial-in-circle avatars.
3. "See Cindy at work." (paper): H + P + YouTubeFacade.
4. "Worked with Cindy recently?" (surface): card + hand-rolled Google-review button.
5. CTA (paper): H + P + CTA.

**Contact (`app/contact/page.tsx`)** — `contact-1440.png`
1. Header (paper): E + H + P.
2. Form + aside (surface): `2fr/1fr` grid.

**The rhythm problem in one sentence:** of roughly 30 sections across the site,
the overwhelming majority open with the identical *sage eyebrow → Fraunces
heading → muted paragraph* triad at the same two sizes, alternating
paper/surface, at the same 64–80px height. The single deliberate break in this
cadence is the dark featured-testimonial band on the home page, which is exactly
why it reads as the page's one strong moment.

---

## 8. Image rendering (slots → placements)

Slots are defined in `lib/media.ts` (`'full' | 'mid' | 'small'`). How they map:

- **`full` (1920w sources)** — hero backgrounds and large placements: home hero
  `neat-closet05`; home "recent work" `neat-closet05`, `kellys-bedroom`,
  `neat-workroom02`; services hero `neat-bookcases`; most service-card images.
  Correct slot usage in principle.
- **`mid` (many are 960×350 panoramic sliders)** — used in the Gallery 4:3 cells
  and as two service-card images (`final-basement1` 912×677, `home-services`
  800×533). Forcing 960×350 panoramas into `aspect-[4/3]` with `object-cover`
  produces a hard center-crop: e.g. the Gallery "Kitchen" cell
  (`slider-cindy-kitchen02`) renders as a tight crop of a face rather than a
  kitchen (`our-work-1440.png`).
- **`small`** — `garlick-cindy-01` is 240×336 yet is the About founder photo,
  shown in a `w-48 md:max-w-xs` box (up to 320px), i.e. **upscaled past its
  native width** and soft (`about-1440.png`).

**`sizes` usage:** generally present and sane (`fill` + responsive `sizes` on
hero/cards). Two nits: home "recent work" declares
`sizes="…1024px) 50vw, 33vw"` but the grid is `sm:grid-cols-3`, so between 640
and 1024px the slot is ~33vw not 50vw; `BeforeAfterCard` requests `sizes` down to
`200px`, very small for the lightbox-capable thumbnails.

**Weak or low-quality images rendered large (the credibility problem):**
1. **`kellys-bedroom`** is not a clean "after" photo — it is a Before/After
   **video collage** with purple panels, script "Before"/"After" text baked into
   the pixels, and a person in it. It is shown large in home "recent work"
   (labeled "Bedroom") and again as the services **Bedrooms and Kids Rooms** card
   (`home-1440.png`, `services-1440.png`).
2. **`cindy-room-collage`** (Moves card) is a multi-panel video montage thumbnail
   with a face — not a single result photo.
3. **`cindys-about-me-cover`** (About cover band, full-width 16:6) is a low-res
   **video title card** with cursive "Organize Me with Cindy" text baked in;
   it looks pixelated and amateur at full width (`about-1440.png`).
4. **`garlick-cindy-01`** founder photo: an unflattering surprised-expression
   shot, upscaled and soft (`about-1440.png`).
5. **`home-services`** (Consulting card) is an exterior photo of a house — off
   topic for an organizing service card.
6. Gallery `slider-cindy-*` panoramas cropped to faces/strips as in the `mid`
   note above.

Note on the Gallery blanks visible in `our-work-1440.png`/`our-work-390.png`
(empty beige cells under "Home and Professional Offices" and "Bookcases and
Living Spaces"): the underlying WebP/AVIF files **do exist** in `public/media/`
(verified by glob), and the blank cells are consistently the 2nd/3rd image in
each row, so this is a **lazy-load timing artifact in the full-page screenshot**,
not a production-missing-image defect. The forced-crop issue above is the real
image problem.

---

## 9. Responsive behavior

**Breakpoints in use:** `sm` (640), `md` (768), `lg` (1024). No `xl`/`2xl`.
Content caps at 1200px.

- **Nav at 390px (`home-390.png`):** `flex-wrap` lets the logo, five links, and
  the clay button wrap across rows — functional but busy/cramped; there is no
  hamburger/disclosure menu.
- **Home "recent work":** 1→3 column jump at 640px gives three very narrow
  columns just above the breakpoint.
- **Empty space in two-column heroes:**
  - Services hero (`services-1440.png`): the left column (eyebrow + heading +
    3-line paragraph) is much shorter than the right image, leaving a large empty
    block under the text on desktop.
  - About story (`about-1440.png`): the left rail (small founder photo + short
    trust box) is far shorter than the 6-paragraph text column, leaving a big
    empty area beneath the rail.
- Mobile stacking is otherwise clean; the dark testimonial band still reads as
  the peak at 390px. No horizontal overflow observed at 390px.

---

## 10. Inconsistencies and one-off styles

- **Two reimplemented buttons** that bypass `Button`: the ContactForm submit
  (`ContactForm.tsx:184-189`) and the Google-review link
  (`testimonials/page.tsx:112-119`) both hand-roll pill styles. Any change to the
  button system silently skips these.
- **Repeated eyebrow markup**: `text-sm uppercase tracking-[0.18em] text-sage`
  is copy-pasted as the opener of ~12 sections/pages instead of living in a
  shared `Eyebrow`/`Section` component.
- **Two heading line-heights**: global `1.1` vs the hero's `leading-[1.08]`.
- **Vertical rhythm split**: home `py-20` vs inner pages `py-16` vs headers
  `py-16 md:py-24` / `py-12 md:py-16` (no single token).
- **Gap scale**: `gap-4/6/8/10/12/16` across comparable grids.
- **Radius scale**: `rounded` / `rounded-md` / `rounded-lg` / `rounded-full` all
  in play.
- **TrustStrip coverage**: only home + about; missing from services, service
  detail, contact, tips, testimonials despite DESIGN.md placing trust cues under
  the hero generally.
- **Off-token literals**: `bg-black/20` and `fill="white"` in
  `YouTubeFacade.tsx`.
- **One-off ornaments**: the about `border-l-2 border-sage` rule and the
  testimonials initial-in-`bg-sage/15`-circle avatars exist nowhere else.
- **Spec drift vs DESIGN.md**: body type is `1rem/leading-relaxed`, not the
  specified `1.0625rem/1.7`; the `Section`, `TestimonialCard`, and
  `ConsultationCTA` components were never created.
- **`sizes` mismatch** on home recent-work grid (see §8).

---

## 11. How tokenized the system is, and restyle risk

- **Color: fully centralized, low risk.** Nine tokens, one source per layer,
  near-zero off-palette use. A palette refresh in the *same direction* is a
  small, safe edit — but because it is so central, it is also not where the
  visible upgrade comes from.
- **Typography: family-tokenized, scale-scattered, medium friction.** Families
  load cleanly via `next/font`, but every size is an inline utility
  (`text-[clamp(...)]`, `text-sm`, `text-lg`) repeated across ~9 page files
  rather than a `theme.fontSize` scale or a shared heading component. Changing the
  type scale means touching many files.
- **Spacing/section chrome: not tokenized, medium-high friction.** Section
  padding, gaps, and the eyebrow→heading→paragraph block are hand-written in each
  page. There is no `Section` primitive, so re-rhythm-ing or restyling section
  headers is a repetitive cross-file edit.
- **Components: partial.** Button/Nav/Footer/TrustStrip/cards exist, but the most
  repeated unit (section header) and the testimonial/CTA blocks were never
  abstracted.

**Overall restyle risk: moderate, and almost entirely mechanical rather than
architectural.** There is no CSS-specificity war, no `!important`, no inline
style sprawl, no off-palette chaos — so changes are safe to make. The cost is
breadth: type, spacing, and section chrome live as duplicated utilities across
the page files, so a thorough restyle is "edit the same pattern in ~10 places"
(or first extract a `Section`/`Heading` primitive, then restyle once). The
highest-value visual fix — image curation/treatment — is data-and-asset work in
`lib/media.ts` / `lib/services.ts` / `Gallery.tsx`, independent of the token
system and low-risk.

---

## 12. Honest assessment: why it reads as a generic AI template, and the
highest-leverage upgrades

**What currently signals "AI-built template":**
1. **One repeated section formula.** ~12 sections open with the identical small
   sage uppercase eyebrow → Fraunces heading → muted paragraph, at the same two
   sizes, alternating paper/surface, at the same 64–80px height. The cadence
   never varies (§7).
2. **No typographic conviction.** Fraunces is used at a single weight (500), no
   italic, no large editorial sizing; the hero tops out at 4rem and section
   headings at 2.5rem, and the whole UI leans on `text-sm`. There is no
   type contrast to create hierarchy (§2).
3. **Default-Tailwind card behavior.** `rounded-lg` cards with
   `hover:shadow-md` + image `scale-[1.03]` is the starter-kit hover (§5).
4. **Low-credibility imagery shown large.** Purple Before/After video collages
   (`kellys-bedroom`, `cindy-room-collage`), a pixelated video title card on
   About, an upscaled unflattering founder snapshot, an empty kitchen card, and
   panoramas hard-cropped to faces. This is the single biggest thing dragging the
   site down-market (§8).
5. **Flat, detail-free surfaces.** One hairline color, essentially no elevation,
   no texture, mixed radii — nothing that signals craft (§4).
6. **Even, dead rhythm.** Uniform section heights plus large empty space in the
   two-column heroes (services, about) read as "filled a template," not "composed
   a page" (§3, §9).

**Highest-leverage changes, ranked (keeping the cream/sage/clay direction):**

1. **Image curation and treatment — biggest win.** Remove the baked-text video
   stills and weak shots from large slots: drop `kellys-bedroom`,
   `cindy-room-collage`, `cindys-about-me-cover`, and `garlick-cindy-01` from
   prominent placements; fill the null Kitchens card; stop force-cropping 960×350
   panoramas into 4:3. Standardize on genuinely strong full-res "after" photos,
   one consistent focal-crop discipline, and one quiet treatment (consistent
   radius + a restrained gradient/overlay where text sits on image). This alone
   moves the site from "amateur" to "credible."

2. **Establish a real type hierarchy.** Push the hero/section display larger and
   more confident using Fraunces' optical sizes; introduce a second weight or an
   italic for editorial accents; set body to the intended `~1.0625rem` at
   `1.6–1.7` line-height; and stop opening every block with the same eyebrow.
   Centralize the scale into `theme.fontSize` + a `Heading`/`Section` primitive so
   it is set once.

3. **Spacing, restraint, and section variety.** Adopt one vertical-rhythm token
   with a deliberate hero-vs-section hierarchy (not a flat 64–80px everywhere),
   vary a few section layouts, and remove the dead whitespace in the services and
   about two-column heroes (balance the columns or constrain widths). Keep the one
   dark contrast band as the intentional peak — it already works.

4. **Grid discipline.** One consistent gap, equal-height cards, a sane column
   progression (e.g. 2-up at `sm`, 3-up at `lg` — never 1→3), and no empty card
   in a grid.

5. **Surface detail.** Add a small, quiet elevation scale and/or a second surface
   tone and hairline, settle on one or two radii, and add restrained craft
   touches (e.g. serif step numerals, a hairline rule) so surfaces stop reading as
   flat defaults.

Items 1 and 2 carry most of the perceived-quality jump; 3–5 convert it from
"nicer template" to "intentionally designed." All are achievable within the
existing, clean token system and within the current color direction.
