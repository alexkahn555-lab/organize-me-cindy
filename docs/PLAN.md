# PLAN.md — Organize Me with Cindy rebuild

Client: Cindy, residential professional organizer, Washington DC Metro and
Northern Virginia. Bonded and insured. Phone 571-212-9299.
Builder: AK Solutions. Family-discounted build in exchange for portfolio
rights and referrals.

Constraint that shaped this plan: no WordPress login and no original files.
All media was recovered from the public site by crawler (see recover-media.py).
Recovered: 58 unique source images (30 usable at full width up to 3264x2448,
16 mid, 12 small) and 14 live YouTube videos. That is the entire asset base.

## Strategy (from research brief)

Positioning is warm, local, and visibly proven. Sell relief and calm before
listing tasks. Before-and-after work is the centerpiece, not supporting
content. Consultation-first journey. Trust markers (bonded and insured,
reviews, real photos) appear early and repeat.

Three non-negotiables baked into every page:
1. Before/after proof is the primary sales device.
2. Hero states outcome, geography, one trust cue, and one CTA.
3. A consultation CTA appears in the first viewport, after the first proof
   cluster, and in the footer.

## Sitemap

- Home
- Services (room and life-event categories, each tied to its recovered video)
- Before & After (categorized gallery, the centerpiece)
- About (Cindy's story, warmth, bonded and insured, affiliations if any)
- Testimonials (specific, scannable proof blocks)
- Contact (qualification form primary, intro-call scheduler secondary)
- Tips (migrate existing posts; holds several videos; SEO value)
- Service-area pages: Washington DC, Alexandria, Arlington, Fairfax,
  McLean, Vienna, Falls Church (Phase 5, templated geo pages)

## Tech decisions (locked)

- Next.js 14 App Router, TypeScript, Tailwind CSS, deployed on Vercel via
  GitHub auto-deploy.
- Images: next/image. Pipeline converts recovered originals to WebP and AVIF
  with responsive sizes. Source of truth is a typed media manifest.
- Video: lightweight YouTube facade component (load the iframe only on click)
  so the 14 embeds do not slow the page. Frame them in the gallery, never
  full-bleed hero video.
- Contact form: Next.js Route Handler posting to Resend. Fields: name, email,
  city or ZIP, room types (multi-select), timeline, optional message and photo.
- Scheduling: Calendly intro-call link as the secondary CTA only.
- SEO: per-page metadata, ProfessionalService and LocalBusiness JSON-LD,
  service-area pages, sitemap, robots.

## Design direction

Calm and trustworthy, not luxury-concierge and not legacy-busy. Warm cream
background, warm charcoal text, calm sage green as the brand color, terracotta
as the CTA accent so buttons convert. Display serif plus clean sans. Full
tokens in DESIGN.md. Generous whitespace. Standardized image crops with
captions. Real project and founder photography only, no stock.

## Phases

Phase 0 — Media recovery. DONE. media-raw/ recovered, manifest.json and
videos.json written. Drop media-raw/ into the repo at /public/media-raw/.

Phase 1 — Planning docs. This file plus DESIGN.md, CONTENT.md, CLAUDE.md.
Lock decisions before any code.

Phase 2 — Scaffold and design system. Claude Code does this directly:
Next.js 14 app, design tokens, root layout, nav, footer, contact form wired
to Resend, calendar link. Deploy a skeleton to Vercel early for a live review
URL.

Phase 3 — Components via Codex, reviewed by Claude Code:
- Image pipeline script: media-raw to optimized WebP/AVIF plus typed manifest.
- Before/after gallery component (categorized, captioned, side-by-side pairs,
  optional lightbox).
- Service page template (one template, rendered for each category).
- YouTube facade component.

Phase 4 — Content population. Build Home, Services, Before & After, About,
Testimonials, Contact, Tips from CONTENT.md. Fold in video facades and the
before/after video pairs (bedroom, bathroom, seasonal closet).

Phase 5 — Local SEO layer. Service-area pages for the seven geographies,
metadata, JSON-LD, sitemap. Write Cindy a one-page Google Business Profile
setup and review-request guide, since GBP is the strongest local lead surface.

Phase 6 — QA and launch. Lighthouse pass, responsive checks, contact-form
delivery test, 301 redirects from old WordPress URLs to preserve ranking,
domain cutover.

## Open items needing Cindy

- Who controls the "Pam Willenz" YouTube channel hosting all 14 videos. If not
  hers, the downloaded archive becomes the long-term source.
- Confirm bonded and insured details and any NAPO or CPO affiliation to display.
- Confirm the seven service-area geographies match where she actually works.
- New founder photo and a few fresh current-project shots for the worst of the
  12 small legacy images.
