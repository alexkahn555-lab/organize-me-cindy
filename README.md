# Organize Me with Cindy

New website for Cindy, residential professional organizer, Washington DC Metro
and Northern Virginia. Built by AK Solutions.

## Quick start

```
npm install
npm run dev
```

Open http://localhost:3000

## Where things are

- `CLAUDE.md` — build rules. Claude Code reads this first.
- `docs/PLAN.md` — roadmap and phases.
- `docs/DESIGN.md` — locked design system and tokens.
- `docs/CONTENT.md` — page-by-page content map with media assignments.
- `app/` — App Router pages and layout.
- `components/` — Nav, Footer, TrustStrip, Button.
- `public/media-raw/` — recovered images. Expand organize-me-media.zip here.

## Status

Phase 2 done: design tokens, fonts (Fraunces + Inter), root layout, nav,
footer, trust strip, button. The home page is a placeholder. Real page bodies
are Phase 4, built from docs/CONTENT.md.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS. Deploy on Vercel via GitHub.
