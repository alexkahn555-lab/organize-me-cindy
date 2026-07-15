# Visual Direction: Organize Me VA

This document governs every generated image on this site and every dispatch that wires one in. It was produced against the locked facts in the Phase 0 brief and the current token system in `tailwind.config.ts`. Where anything conflicts with this document, this document and `tailwind.config.ts` win.

## 1. North star

Every asset must feel calm, warm, established, and unashamed: the visual register of a practitioner who has seen every kind of home in 31 years and judges none of them. We are explicitly not polished-modern-agency, not trendy, and not clinical.

## 2. Stale-doc note

`docs/DESIGN.md` describes a retired identity built on the Fraunces typeface and a clay accent. That identity no longer exists anywhere in the codebase. Do not generate, prompt, or review against it. The current truth is the sage and Newsreader system defined in `tailwind.config.ts` and restated below. If DESIGN.md and this document disagree, this document wins. DESIGN.md should eventually be deleted or rewritten; until then, treat it as historical only.

## 3. Tokens in language

For generation prompts, the palette translates as follows. Paper `#F7F4EE` is warm cream: a near-white with a faint ivory cast, like good uncoated paper stock. Surface `#E2D9C4` is soft warm sand, the tone of aged linen or oat. Ink `#2C2A26` is deep warm charcoal, a near-black with brown in it, never a cold blue-black. Muted `#6B6760` is warm stone gray with a taupe lean. Sage `#5E7461` is muted sage green, a dusty botanical green with gray mixed in. Sage-deep `#45584A` is shadowed forest-sage, the darkest green in the system.

Type is Newsreader for display, an editorial serif that reads literary and unhurried, and Inter at 18px for body, plain and highly legible. Sage is the sole accent. There is no second accent color, no clay, and no Fraunces anywhere in this system. Any generated asset that introduces a color outside this palette fails review.

## 4. Illustration style rule

**The rule: every illustration is quiet hand-drawn editorial line work in a single thin, slightly irregular sage-deep line on warm cream, with at most one soft fill rendered as a low-opacity wash of that same line color, a small off-center composition, and most of the canvas left empty.**

The research behind this is consistent across categories. What makes illustration read as established rather than cheap is visible human authorship (a line with slight natural wobble, the mark of a hand), severe palette restraint (one color, which quiet-luxury brands like Jil Sander and The Row treat as the primary signal of confidence), abstraction over literal depiction, physical texture like paper grain, and negative space treated as a statement of assurance rather than emptiness. Grief-adjacent services that get this right, like Lantern, deliberately commissioned imperfect human illustration precisely to avoid feeling, in their founder's words, cold and Silicon Valley-like. The current design-industry turn that Landor calls anti-AI crafting confirms the same instinct: hand marks, grain, and analog surfaces now read as the signal of a real maker, while flawless flatness reads as generated.

Three concrete DOs:

- DO draw a single continuous thin line in sage-deep that wanders slightly, in the spirit of a magazine spot illustration or a mid-century Penguin cover device: one small idea, rendered with visible hand pressure, floating off-center in generous cream.
- DO use at most one soft fill, expressed as the line color at low opacity so it reads as a quiet tinted wash with a faintly rough, torn-paper edge, in the whisper-quiet register of a Matisse cut-out, never crisp vector-perfect boundaries. Keeping the fill a tint of the line rather than a separate green is what lets the whole set be re-themed from one color (see section 7, asset 2).
- DO leave 60 to 80 percent of every composition empty. The empty cream field is the brand's confidence and the visitor's breathing room, the same move quiet-luxury identities use in place of a shouted logo.

Three concrete DON'Ts:

- DON'T use flat vector figures with rubbery oversized limbs, tiny heads, and coral-purple palettes. This is the Corporate Memphis / Alegria style that Facebook popularized and that Slack has since publicly disowned; it is the visual signature of a venture-funded startup, the exact opposite of a 31-year practice, and it depicts people, which we never do anyway.
- DON'T use uniform-stroke geometric icon-set line work with perfectly rounded caps and mathematically even curves. It reads as a SaaS feature grid: generic, clinical, and authorless.
- DON'T use glossy gradients, 3D blobs, chrome, bloom, or any airbrushed AI sheen. Perfect gradients and telltale smoothness are exactly what audiences now read as machine-generated, and they fight the matte paper palette. Everything ships matte.

For this specific audience there is one more layer. Women 45 to 70 navigating downsizing, estates, divorce, and hoarding are shame-sensitive, and the clinical research on hoarding stigma is blunt: shame and fear of judgment are the primary barriers, and the family members involved carry their own shame. Visually, anxiety goes down with soft curves over sharp angles, low contrast over drama, warmth over sterility, and imagery that never depicts or dramatizes the problem itself. Clinical detachment (medical stock aesthetics, cold grays, diagrammatic precision) signals judgment by inspection; luxury exclusion (high-gloss minimalism, fashion-editorial coldness) signals judgment by taste. We sit deliberately between them: warm, human, modest, sure of itself.

## 5. Anti-drift constraint block

The following block must be embedded verbatim, inline, in every single generation prompt, with no paraphrase and no abbreviation. It travels with every prompt, every time, including regenerations and variant runs. A prompt without it is invalid.

> Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction of physical spaces or of objects being organized. No people. No text, lettering, numbers, or watermarks baked into the image. Nothing that could be mistaken for a photograph of real client work or a before-and-after. Warm, human, and calm, never glossy, never clinical, never trendy flat vector.

## 6. Hoarding tier note

The Hoarding & Estate Clearing surface carries `tone: 'calm'` and `suppressClutterEffects: true` in `lib/services.ts`, stays on the paper background throughout, widens vertical rhythm, and holds the site's only testimonial. It exists for the most vulnerable visitor on the site, frequently the overwhelmed adult child of a parent who hoards, and the research on hoarding stigma says this person is primed to detect judgment in anything.

That means any asset placed on this surface is held to a stricter standard than the rest of the set. It must be the most abstract of all the illustrations: nothing that could be decoded as piles, boxes, clutter, mess, or chaos, and no dense, frantic, or scribbled mark-making even in service of a resolution narrative. It must be the lowest contrast and the softest of the set: no sharp angles anywhere, the gentlest curves in the family. It must carry warmth and dignity, not drama; the story it tells is a quiet easing, never an exposure and never a before-and-after arc. If an asset for this surface feels merely as restrained as its siblings, it is not restrained enough. When in doubt, ship this page with no illustration at all; the single-column paper layout is already correct.

## 7. Per-asset direction

**1. Hero / ambient texture (decorative layer).** An abstract warm-cream field with a faint sage undertone, soft directional light, and fine uncoated-paper or linen grain, built to sit behind or beside Newsreader headings on service-page headers and section backgrounds without ever competing with them. Its entire job is to make the paper background feel like a material instead of a hex value. It does not replace Cindy's real hero photograph on the homepage under any circumstances. Contrast stays extremely low; if a visitor consciously notices it, it is too loud.

**2. Category illustrations, four (decorative layer, fills the `Section` media slot).** One each for Hoarding & Estate Clearing, Moving & Relocation, Home Organizing, and Offices & Paperwork. These are the load-bearing illustrations: supplied as the `media` prop, each restores the two-column service layout in `components/Section.tsx` exactly the way a real photograph will later, which is why they must be unmistakably ornamental line art that no visitor could read as depicted work. All four share the section 4 style rule and a single motif language of a line finding calm. Delivered as SVG driven by a single `currentColor`: the line is `currentColor` at full strength and the one optional soft fill is that same `currentColor` at low opacity, which on cream reads as the muted-sage wash the style rule calls for. Because the fill is a tint of the line color rather than a second token, one color themes the entire set and the single-`currentColor` promise actually holds. The hoarding illustration is governed by section 6 and is the most abstract and most human of the four.

**3. Process-step illustrations, four (decorative layer, fills the `Section` media slot).** Consultation, plan, hands-on organizing, systems that hold. Same family as the category set but simpler: one gesture each, smaller compositions, even more empty space. The style is locked by this document; the content is pending until the start-to-finish process is confirmed with the client, so the motifs in the prompts below are provisional and must be re-checked against the confirmed process before integration.

**4. OG / social share image (meta layer).** The one asset in the system allowed to carry type: the Newsreader wordmark "Organize Me VA" and a quiet founding line, sage on cream, calm and spacious, 1200x630. Decision: we do not ask the generator to render type. Generators cannot set Newsreader and baked-in AI lettering is a named failure mode, so the branded text exception is exercised at the composite stage, not the generation stage. We generate a textless background from the hero-texture family with the left two-thirds held clear, then set the wordmark and the line "Calm, practical help since 1995" in real Newsreader in a controlled composite (Figma or an HTML-to-image step), and export the final WebP. The line names the founding year rather than a running count, so the asset never goes stale and never needs a re-export; the business began in 1995, per `lib/site.ts`. No photograph of client work, ever.

**5. Section dividers / ambient texture (decorative layer).** Quiet organic grain or a soft tonal drift between paper and surface tones, used to add depth between the wide full-bleed bands. Even quieter than the hero texture: these are felt, not seen. Wide, short bands; no shapes, no focal points.

**6. Brand motif / favicon (brand layer).** An abstract order-emerging-from-disorder mark: a single unbroken stroke opening from a small inward coil into one smooth outward curve, one gesture, legible at 16px. This asset is authored directly as a clean monoline SVG vector so it stays crisp at favicon size and works in ink-on-paper and sage-on-paper; any generated image is reference only. Reusable as a loading state and a quiet watermark.

The ambient video loop remains cut. No moving-image asset exists in this system.

---

# Generation prompts

Rules for this section. The three texture assets (hero texture, OG background, dividers) are the ones actually run through an image generator: generate at the largest available size, then downscale and export as WebP. The line-art assets (the four category illustrations, the four process illustrations, and the brand mark) ship as SVG authored directly as vector paths, because sparse hand-drawn linework with most of the canvas empty is the category image generators handle worst and a generate-then-trace pass tends to produce unusable results. The prompts below are retained for the line-art assets as reference and mood only; a generated raster may be used as loose visual reference for the hand-authoring, never traced blindly. Every prompt embeds the anti-drift block verbatim and must be pasted whole. In every shipped line-art SVG the stroke is `currentColor` and the one optional fill is `currentColor` at low opacity. Generated files land in the gitignored staging folder first; only optimized keepers move to `/public/` under the `decor-`, `illustration-`, and `brand-` prefixes.

## Prompt 1: Hero / ambient texture

Format: WebP raster (generate large, export as WebP). Filename: `decor-hero-texture.webp`, variants as `decor-hero-texture-02.webp` etc. Plugs into: service-page headers and section backgrounds behind or beside text. Never replaces the homepage photograph.

```
Abstract minimal background texture. A field of warm cream, the tone of good
uncoated ivory paper, with one faint diffuse breath of muted gray-sage green low
in the frame. Soft directional daylight from the upper left, as if falling across
a paper surface. Fine, subtle grain of uncoated paper and linen fiber. Extremely
low contrast, matte finish, vast negative space, no focal object, no shapes, no
gradient bands, nothing glossy. Still, quiet, warm, editorial. High resolution.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompt 2: Category illustration, Hoarding & Estate Clearing

Format: SVG, authored directly (line = `currentColor`, optional fill = `currentColor` low-opacity). Filename: `illustration-hoarding.svg`. Plugs into: the `media` prop of the Hoarding & Estate Clearing service sections, restoring the two-column layout. Governed by the stricter section 6 standard. Prompt is reference and mood only.

```
Quiet hand-drawn editorial spot illustration. One continuous thin ink line in
deep forest-sage green on a warm cream paper background. The line begins as a
small, soft, loosely rounded coil, unhurried and gentle, and slowly eases into a
single long open horizon curve that lifts slightly at its end. No sharp angles
anywhere, no dense or frantic marks, no scribble energy, the softest and calmest
possible gesture. The line has slight natural hand wobble. At most one very soft
fill in a low-opacity tint of the same green with a faintly rough edge. Small
composition placed off-center, at least three quarters of the canvas left as empty
cream. Subtle uncoated paper grain, matte, warm, dignified, tender.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompt 3: Category illustration, Moving & Relocation

Format: SVG, authored directly (line = `currentColor`, optional fill = `currentColor` low-opacity). Filename: `illustration-moving.svg`. Plugs into: the `media` prop of the Moving & Relocation service sections. Prompt is reference and mood only.

```
Quiet hand-drawn editorial spot illustration. A single thin ink line in deep
forest-sage green traveling from left to right across a warm cream paper
background, folding gently twice along the way like a calm path, with a small
solid tint dot at its origin and a slightly larger one at its destination.
The line has slight natural hand wobble and even, unhurried pacing. At most one
soft low-opacity tint fill with a faintly rough edge. Small off-center composition,
generous empty cream space around it. Subtle uncoated paper grain, matte, warm,
steady, reassuring. In the spirit of a restrained magazine spot illustration.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompt 4: Category illustration, Home Organizing

Format: SVG, authored directly (line = `currentColor`, optional fill = `currentColor` low-opacity). Filename: `illustration-home.svg`. Plugs into: the `media` prop of the Home Organizing service sections. Prompt is reference and mood only. Note: keep this motif visibly distinct from the hoarding coil-into-curve so the two do not read as interchangeable.

```
Quiet hand-drawn editorial spot illustration. A loose constellation of short,
thin, curved ink strokes in deep forest-sage green drifting inward and settling
into three calm nested arcs, like breath slowing, on a warm cream paper
background. Each stroke has slight natural hand wobble. At most one soft
low-opacity tint fill with a faintly rough edge behind the arcs. Small off-center
composition with generous empty cream space. Subtle uncoated paper grain, matte,
warm, settled, gentle. Restrained mid-century editorial spot illustration spirit.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompt 5: Category illustration, Offices & Paperwork

Format: SVG, authored directly (line = `currentColor`, optional fill = `currentColor` low-opacity). Filename: `illustration-offices.svg`. Plugs into: the `media` prop of the Offices & Paperwork service sections. Prompt is reference and mood only.

```
Quiet hand-drawn editorial spot illustration. A small field of short, irregular,
thin vertical ink strokes in deep forest-sage green on the left that resolves
into calm, evenly spaced horizontal strokes on the right, like scattered marks
finding a steady rhythm. Purely abstract mark-making, not depicting any object.
Slight natural hand wobble in every stroke. At most one soft low-opacity tint
fill with a faintly rough edge. Small off-center composition, generous empty warm
cream paper space around it. Subtle uncoated paper grain, matte, warm, orderly
without being rigid. Restrained editorial spot illustration spirit.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompts 6 to 9: Process-step illustrations

Style-locked, content-pending: motifs below are provisional until the start-to-finish process is confirmed with the client. Do not integrate before that confirmation. Format: SVG, authored directly (line = `currentColor`, optional fill = `currentColor` low-opacity). Filenames: `illustration-process-01.svg` through `illustration-process-04.svg`. Plug into: the `media` prop of process sections. Each uses the shared frame below with one motif line swapped in. Prompts are reference and mood only.

Shared frame (paste, then insert one motif sentence where marked):

```
Quiet hand-drawn editorial spot illustration, simpler and smaller than a full
spot: one single gesture. Thin ink line in deep forest-sage green with slight
natural hand wobble on a warm cream paper background. [MOTIF] No fill, or at most
one whisper-soft low-opacity tint of the same green. Tiny off-center composition,
at least four fifths of the canvas left as empty cream. Subtle uncoated paper
grain, matte, warm, calm.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

Provisional motifs:

- `illustration-process-01.svg` (consultation): "Two soft arcs leaning gently toward each other with a small quiet dot resting between them."
- `illustration-process-02.svg` (plan): "A lightly dotted line that becomes a single confident solid line partway across."
- `illustration-process-03.svg` (hands-on organizing): "Three short parallel strokes drawn with an even, unhurried rhythm, the last one just slightly settling lower."
- `illustration-process-04.svg` (systems that hold): "A single line closing into one steady, softly imperfect open ring."

## Prompt 10: OG / social share background

Format: WebP raster, final export 1200x630. Filename: `decor-og-card.webp`. Plugs into: OG and social share metadata. Production decision: the generator produces a textless background only; the Newsreader wordmark "Organize Me VA" and the line "Calm, practical help since 1995" are set in real Newsreader in a controlled composite step afterward, which is where the brand's single text exception is exercised. The line names the founding year, not a running count, so it never goes stale. The prompt itself stays fully inside the anti-drift block.

```
Abstract minimal background for a wide landscape composition. Warm cream field,
the tone of good uncoated ivory paper, with a soft muted gray-sage green tonal
presence rising quietly from the right edge and lower right corner, leaving the
left two thirds of the frame as clear, calm, empty cream. Soft directional light,
fine uncoated paper and linen grain, extremely low contrast, matte, spacious,
still, warm, editorial. No shapes, no focal object, nothing glossy. Wide landscape
format.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompt 11: Section dividers / ambient texture

Format: WebP (or SVG if the trace comes out clean, but WebP is the default). Filenames: `decor-divider-01.webp`, `decor-divider-02.webp`. Plugs into: transitions between wide full-bleed bands.

```
Abstract minimal texture band, very wide and short landscape format. A quiet
organic tonal drift from warm cream, the tone of uncoated ivory paper, into soft
warm sand, the tone of aged linen, with fine natural paper grain throughout.
Extremely low contrast, so subtle it is felt rather than seen. Matte, warm,
still. No shapes, no focal points, no visible gradient banding, nothing glossy.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```

## Prompt 12: Brand motif / favicon

Format: SVG, authored directly as a clean monoline vector. Filename: `brand-mark.svg`. Plugs into: favicon, loading state, quiet watermark. Note: the shipped mark is drawn by hand as vector so it survives 16px rendering; any generated image is reference only.

```
Simple abstract mark, reference concept for a small logo. One single unbroken
thin ink stroke in deep forest-sage green on warm cream paper: the stroke opens
from a small, soft inward coil into one smooth, confident outward curve. One
gesture only, monoline, balanced, calm, readable when very small. Slight natural
hand quality, matte, generous empty space around the mark, centered.

Abstract and ornamental only. No rooms, no furniture, no interiors, no depiction
of physical spaces or of objects being organized. No people. No text, lettering,
numbers, or watermarks baked into the image. Nothing that could be mistaken for a
photograph of real client work or a before-and-after. Warm, human, and calm, never
glossy, never clinical, never trendy flat vector.
```
