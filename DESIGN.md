# Design

## Stack

Hugo + Hugo Blox Builder (blox-tailwind v0.3.1), Tailwind CSS, block-based landing pages. Deployed on Netlify from GitHub (`uzzielperez/uzzielperezai`). Custom code lives in `layouts/partials/blocks/` (custom blocks), `layouts/shortcodes/` (aurora, blackhole WebGL), and `assets/media/`.

## Theme

System-driven light/dark with a user toggle (`appearance.mode: system`). Both themes must stay WCAG AA. Homepage hero is a dark section over a warm photo backdrop.

## Color

- Theme palette: Hugo Blox `emerald` primary.
- Custom visualizations use OKLCH, tinted neutrals (never pure #000/#fff), and a restrained-to-committed strategy: warm paper neutrals plus a small set of particle-track hues:
  - Track cyan: `oklch(0.72 0.11 220)`
  - Track magenta: `oklch(0.65 0.16 350)`
  - Track amber: `oklch(0.75 0.13 75)`
- In dark mode the same hues brighten slightly (lightness +0.06) against a near-black tinted surface.

## Typography

Hugo Blox default stack (Inter-based sans). Hierarchy through scale and weight, ratio at least 1.25 between steps. Body line length capped near 70ch. Custom sections may use tabular numerals for quantified outcomes.

## Motion

Ease-out exponential curves only; no bounce. SVG path draw-in and hover reveals must respect `prefers-reduced-motion` (fall back to static, fully-drawn state). Never animate layout properties.

## Components

- Landing pages assemble Hugo Blox blocks (`resume-biography-3`, `markdown`, `collection`) plus custom blocks in `layouts/partials/blocks/`.
- `skills-tracks` custom block: an event-display-inspired SVG where each skill area is a particle track fanning out from a vertex, milestones are hits, and each track terminates in a quantified outcome. Static-readable without JS.
- Avoid: side-stripe borders, gradient text, glassmorphism, identical card grids, hero-metric templates.
