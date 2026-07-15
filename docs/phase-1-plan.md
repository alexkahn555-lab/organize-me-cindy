# Phase 1 — Asset Production Plan (Organize Me VA)

Phase 0 produced `docs/visual-direction.md`, now corrected and ready to commit.
Phase 1 produces the actual asset files. The governing change from the original
sketch is the tool split: the twelve assets do not all come from Higgsfield. They
divide cleanly by what image generators are good and bad at.

## The tool split

**Higgsfield generates (three assets).** The hero texture, the OG background, and
the section dividers are all warm, low-contrast, paper-grain fields. That is
photoreal texture work, exactly what Higgsfield is built for. These run through the
generate-then-optimize pipeline.

**Authored directly as SVG (nine assets).** The four category illustrations, the
four process illustrations, and the brand mark are sparse hand-drawn linework with
most of the canvas empty. This is the category image generators handle worst: they
fill the space, add painterly rendering, and will not hand back clean traceable
vector paths, so a generate-then-trace pass tends to waste a run. These ship as SVG
authored directly as vector paths, with the reference prompts in the direction doc
used only as loose mood reference. Several of the gestures are simple enough (one
line easing into a curve, two arcs leaning together, a line closing into a ring)
that they are faster and cleaner to draw as paths than to generate. Line is
`currentColor`, the one optional fill is `currentColor` at low opacity, so the
whole set re-themes from a single color and drops into the `Section` media slot the
same way a photo will.

This split is why the earlier "generate everything in Higgsfield" idea would have
been frustrating. Textures play to its strength; linework fights it.

## Staging and the integrity guardrail

Create a gitignored staging folder for raw generations: `generated-staging/`. Add
it to `.gitignore` before generating anything. Nothing here is wired to the site;
it is where a dozen throwaway texture variants live while you pick keepers. Raw
generations never touch a real branch.

Processed keepers move into `/public/` under fixed prefixes that make the
content-integrity line a filesystem fact: `decor-` for generated decorative
textures, `illustration-` for the SVG line set, `brand-` for the mark. Nothing
under these prefixes can be confused with a client-photo slug, so a future dispatch
physically cannot drop a generated file into a client-photo slot without it being
obvious. Verified against the current `/public/` listing: no collision.

## Sequence

The order runs cheapest-and-lowest-risk first, so the pipeline is proven before it
carries anything load-bearing.

**Step 1: textures batch (Higgsfield).** Generate hero texture, OG background, and
dividers together in one staging run, since they are one visual family and share
setup. Generate several variants each. Review the raws by eye. Select keepers by
hand. This is the one step that must not be automated.

**Step 2: optimize and stage the texture keepers.** Downscale, export WebP at the
sizes the layout needs, matching the existing Paper Shaders bake pattern. Name them
per the `decor-` convention. Hold in staging.

**Step 3: dry-run integration on the divider.** The divider is the simplest wire-in:
a background between bands, no composite, no data-layer dependency, lowest blast
radius. Run it through the full discipline as a rehearsal: single-purpose branch,
explicit forbidden-file list, `npm run build` as the hard gate, Playwright
screenshot, browser review, hard stop. This proves generate to optimize to
integrate to build to review end to end on the safest possible asset.

**Step 4: hero texture integration.** Same discipline, own branch. Wire it behind
service-page headers and section backgrounds. Confirm it never touches the homepage
hero photo. Confirm contrast stays low enough that it reads as material, not
decoration.

**Step 5: category illustration set (authored SVG).** Draw the four as vector paths
against the style rule and the reference prompts. The hoarding illustration is held
to the stricter section 6 standard and is drawn last and most conservatively; if it
does not clear that bar, the hoarding page ships with no illustration, which is
already a correct layout. Wire the set into the `Section` media slot on a single
branch so the two-column service layouts restore. Watch that the home-organizing
motif and the hoarding motif do not read as interchangeable.

**Step 6: OG card composite.** Take the generated OG background from step 2, set the
Newsreader wordmark and "Calm, practical help since 1995" over the clear left
two-thirds in a controlled composite (Figma or an HTML-to-image step), export the
final `decor-og-card.webp`, wire into metadata. This sits later in the sequence
because the composite adds steps the pure textures do not have.

**Step 7: brand mark (authored SVG).** Draw `brand-mark.svg` as a clean monoline
vector, verify legibility at 16px, wire in as favicon and loading state.

**Deferred: process illustrations.** Style-locked, content-pending. Do not draw or
integrate until the start-to-finish process is confirmed with Cindy, since the four
motifs depend on what the four steps actually are. This is a client dependency, not
a tooling one.

**Cut: video.** No moving-image asset. Unchanged.

## What can start now versus what waits

Ready immediately: the texture batch (step 1), because it needs only the committed
direction doc and the Higgsfield MCP already connected in Claude Code. The authored
SVG line set (steps 5 and 7) can also start immediately, since it needs no
generation at all, only the style rule.

Waiting on a client call: the process illustrations, gated on the confirmed
process.

Recommended first action: commit the corrected `visual-direction.md` to `docs/`,
add `generated-staging/` to `.gitignore`, then run the step 1 texture batch. The
brand mark is a good parallel task to draw by hand while texture variants generate.
