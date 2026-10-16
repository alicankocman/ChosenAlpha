# Chosenalpha

Build a cinematic, interactive one-page launch website for ChosenAlpha, founded by Alican Koçman (Founder & CEO).

Create a mysterious premium experience with a black background, electric-purple lighting, a glowing 3D alpha symbol, and cinematic soundless animations.

INTERACTION IS THE MAIN FEATURE:

Initial screen: Show a glowing alpha symbol with the text "TAP TO BREAK THE SILENCE".

When the user clicks the symbol, trigger a dramatic glass-shattering animation. The symbol cracks apart into animated fragments with a purple energy burst and particles.

Transition smoothly to a second screen revealing:

"SOMETHING BIG IS COMING."

"We're building something worth waiting for."

"CHOSENALPHA — COMING SOON"

"Founded by Alican Koçman · Founder & CEO"

Add a subtle "STAY TUNED" message and a replay animation button.

Use React, TypeScript, Tailwind CSS, and lightweight CSS/SVG animations. Simulate the shattering effect with performant visual layers rather than expensive 3D libraries. Make the interaction work on both desktop and mobile, with reduced-motion support.

Keep the entire experience on one page. No forms, backend, extra sections, or paid services. Make it visually extraordinary, mysterious, polished, and responsive.

Implement the actual click interaction; do not create a static mockup. Build the complete experience now.

## Tech stack

- React 19 + TypeScript
- TanStack Start (SSR) + TanStack Router
- Vite 8, Tailwind CSS 4, shadcn/ui components
- Nitro for production server builds

## Development

Requires Node.js 22.12+ and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
cp .env.example .env   # Windows: copy .env.example .env
# Set VITE_WEB3FORMS_ACCESS_KEY in .env (from https://web3forms.com)
npm install
npm run dev        # http://localhost:8080
```

Other scripts:

```sh
npm run build      # production build (output in dist/)
npm run preview    # preview the production build
npm test           # run the test suite
npm run lint       # eslint
```

## SEO

All metadata lives in `src/lib/seo.ts`. Routes call `buildSeoHead()` for title, description, canonical and Open Graph / Twitter cards; the root route adds the site-wide tags (icons, manifest, theme colour, Organization + WebSite JSON-LD). Static assets in `public/`: `robots.txt`, `sitemap.xml`, `site.webmanifest`, `og-image.png` (1200×630), `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.

The canonical origin defaults to `https://www.chosenalpha.com`; override it with `VITE_SITE_URL` (e.g. for a staging host). Update `lastmod` in `sitemap.xml` and the URL in `robots.txt` if the domain changes.

## Forms

The waitlist and contact forms submit to [Web3Forms](https://web3forms.com). Set `VITE_WEB3FORMS_ACCESS_KEY` in `.env` (see `.env.example`). `.env` is gitignored and must not be committed. On your host (Vercel, Cloudflare, etc.), add the same variable in the deployment environment settings.
