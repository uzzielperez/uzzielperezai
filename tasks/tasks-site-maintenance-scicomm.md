## Relevant Files

- `netlify.toml` - Pins build environment settings; will be updated to use Node.js 22+ (Pagefind runs via `npx`).
- `config/_default/hugo.yaml` - Hugo site configuration that may impact routing and section rendering.
- `config/_default/params.yaml` - Theme/site params that can affect which sections render and whether pages appear blank.
- `config/_default/menus.yaml` - Navigation entries; often the reason a link points to a page/section that has no content.
- `content/_index.md` - Homepage content and blocks; can appear “empty” if blocks are misconfigured.
- `content/post/_index.md` - Blog list page; currently very short and may be rendering an empty list depending on config.
- `content/projects.md` - Projects landing page; candidate for “empty page” issues if it only contains front matter.
- `content/experience.md` - Experience landing page; candidate for “empty page” issues.
- `layouts/` - Custom templates/overrides; a misconfigured layout can cause sections to render empty.
- `static/` and/or `assets/` - Where we’ll place JS/CSS assets for interactive animations (e.g., Three.js black hole).
- `content/science-communication/_index.md` (new) - New section landing page for science communication.
- `content/science-communication/*/index.md` (new) - New posts/pages that can embed animations.
- `layouts/shortcodes/blackhole.html` (new) - Hugo shortcode to embed the black hole animation in Markdown.
- `assets/js/blackhole.js` or `static/js/blackhole.js` (new) - Animation implementation (adapted from your React + Three.js example).

### Notes

- This repo builds with Hugo and uses `npx pagefind` on Netlify, so the **Node version** matters even though the site is primarily Go/Hugo.
- “Empty pages” can come from (a) content that is only front matter, (b) menus pointing at sections with no list/leaf pages, or (c) layout overrides.
- If you want to keep the exact React component API you pasted, we’ll need a bundling story (Vite/ESBuild) or we can convert it to a Hugo shortcode + vanilla Three.js module.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`.

Example:
- `- [x] 1.0 Pin Node.js version` → `- [x] 1.0 Pin Node.js version` (after completing)

Update the file after completing each task.

## Tasks

- [x] 0.0 Create feature branch
- [x] 1.0 Fix Node.js version warning by pinning Node.js 22+ for builds/agent runners
- [x] 2.0 Identify and fix “empty pages” (content/front matter, menus, and/or layouts)
- [x] 3.0 Add a new “Science Communication” section (blog-style) with a landing page and initial post structure
- [x] 4.0 Add animation embedding support (shortcodes + JS assets) and ship a Black Hole demo embed
- [x] 5.0 Verify local + Netlify build output (Hugo build, Pagefind index, and no blank routes)
