# CLAUDE.md — build rules for this repo

You are the orchestrator for the Organize Me VA website. Read PLAN.md,
DESIGN.md, and CONTENT.md before building anything. Those three files hold the
locked decisions. Do not re-litigate them. If something is genuinely undecided,
make one decision and note it, do not present options.

// review: docs/PLAN.md, docs/DESIGN.md, and docs/CONTENT.md predate the
// four-category restructure and the canonical facts below. Where they conflict,
// this file wins until they are rewritten.

## Canonical business facts

- Client: Cindy Garlick, professional organizer, in business since 1995.
- Site wordmark: "Organize Me VA". Legal name: "Organize Me LLC" (used in
  copyright).
- Service area, human-facing: "Virginia, Maryland, and DC". Do NOT promise a
  city radius or list cities. Travel willingness depends on job size and is
  decided after the first consultation.
- Bonded and insured.
- Phone: (571) 212-9299 (tel 5712129299), reused from the old site.
- Email: not ready yet. Use a placeholder and do NOT render a fake mailto
  anywhere.
- Entry point: a free consultation. Exact format is TBD with Cindy; keep one
  editable line for it, marked placeholder.
- Services are four categories, ordered, Hoarding and Moving lead:
  1 Hoarding & Estate Clearing, 2 Moving & Relocation, 3 Home Organizing,
  4 Offices & Paperwork. Full definitions live in lib/services.ts; that file is
  the source of service content. Do not duplicate the copy here.
- Content rules: one testimonial only, on the hoarding page. No tips content.
  Going Green is folded into process, not a service. Never show a price. Voice
  "we", people served are "clients" (placeholder term, Cindy unsure).

## Site config

lib/site.ts is the single source of truth for brand, contact, and service-area
strings: wordmark, legal name, founded year, phone, email, service area, travel
note, and the consultation line. Components import from it and never hardcode
those strings. Years in business is computed with yearsInBusiness(), never
hardcoded, so it cannot go stale.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS, Vercel via GitHub auto-deploy.
Windows and PowerShell local environment. Use next/font, next/image.

## The one rule that prevents broken builds

One task per prompt. One file or one component at a time. Large multi-step
prompts reliably cause blank-page and build failures in this setup. After every
change, run `npm run build` and confirm it passes before committing. Commit in
small, single-purpose commits.

`npm run build` also runs the media-integrity guard (scripts/check-media.mjs,
via the prebuild hook). It fails the build if code references a slug missing
from lib/media.ts or if a manifest entry's file is missing from public/media/,
because `next build` alone stays green over missing images. Intentional
placeholder slots are allowlisted inside the script. Run `npm run check:media`
to check alone.

## Orchestration with Codex

You are the lead. You hold the plan, decide task breakdown, review output, run
the build, handle git, and deploy. Codex is a worker reached through the
codex-as-mcp server. Codex never touches git, architecture, or decisions.

Do directly, yourself:
- Scaffold, design tokens, root layout, navigation, footer, contact form,
  anything needing repo-wide context or design judgment, and all review.

Hand to Codex as single-purpose specs:
- The image pipeline script.
- The before/after gallery component.
- The service page template.
- The YouTube facade component.

Per Codex task: write a tight spec naming the exact file path and the exact
expected output, dispatch it, review the returned diff against the spec, run the
build, fix anything broken, then commit. Do not batch multiple tasks into one
dispatch.

Use Codex when work is repetitive or parallelizable or to offload token-heavy
generation. For one-off small work, just write it yourself. Do not force the
orchestration where it adds overhead without benefit.

## Copy voice (matches the client and AK Solutions standard)

Warm, plain, emotionally specific. Complete sentences. No buzzwords, no filler,
no em-dashes, no sentence fragments. Voice is "we" for client-facing copy.
People served are "clients". Sell relief and calm before listing rooms. Do not
state a fact that is not in the canonical facts above or in lib/services.ts;
anything unknown ships as [PLACEHOLDER: ...].

## Design tokens

CTA buttons are sage-deep (#45584A) with paper text. Sage (#5E7461) is the
brand accent, used for large text, borders, hover states, and non-text accents
only; small text in the accent color uses sage-deep for contrast. Background is
warm cream (#F7F4EE). Display font Newsreader, body font Inter, base body size
18px for the older audience. One primary button style site-wide. Clay (#C06A4B)
and Fraunces are AK Solutions' identity, are retired from this site, and must
not be reintroduced.

// review: docs/DESIGN.md still describes the old Fraunces and clay identity
// and needs a rewrite to match this section.

## Media

Recovered assets live in /public/media-raw/ (58 unique sources, manifest.json).
The image pipeline converts them to WebP and AVIF responsive sizes and emits a
typed media manifest used by components. Never stretch a small image to full
width. The 30 full-res sources carry hero and full-width slots. Videos are the
14 in videos.json, rendered through the YouTube facade, framed in the gallery,
never full-bleed.

// review: the tips page is retired under the content rules above. Recovered
// videos survive only where a service page or the work gallery uses them.

## Conversion rules from the research brief

Hero states outcome, geography, one trust cue, one CTA. A consultation CTA
appears in the first viewport and after the first proof cluster. Every content
page then closes on a CTA band, and that band is the final conversion point;
there is no separate footer button, which would only repeat the same offer a few
hundred pixels below itself, inside the same viewport.
Before/after proof is the primary sales device on the home page. Trust strip
(bonded and insured, service area, review source) sits directly under the hero.

// review: "review source" in the trust strip predates the one-testimonial rule.
// Confirm what the third trust cue should say before the content dispatch.

## SEO

Per-page metadata. ProfessionalService and LocalBusiness JSON-LD. Sitemap and
robots. On cutover, add 301 redirects from old WordPress URLs to preserve
ranking.

// Decided: no service-area landing pages; GBP is the local lever.

## Definition of done per page

Builds clean, responsive at 380px and up, Lighthouse performance and
accessibility both green, all images served through next/image, all CTAs wired,
no em-dashes in copy.
