# Art Aesthete — Portfolio Site

Marketing and portfolio site for an interior-design + fine-art studio. React 18 + TypeScript,
built with Vite 7, routed with React Router 6. No backend in this repo: the only network call is
the booking form POST to an external API Gateway endpoint.

**The site is pre-rendered.** `npm run build` runs `scripts/prerender.mts`, which renders every
public route to its own static HTML file and then hydrates on the client — so crawlers and AI
agents get the real text, links and alt attributes rather than an empty `<div id="root">`.
Anything you add must render on the server: see "Server rendering" below.

The same case-study data drives three surfaces — the live site, an in-browser PDF preview route,
and a Node script that emits print-ready HTML. Changing the data changes all three.

## Commands

```bash
npm run dev                      # Vite dev server (empty root, client-rendered)
npm run dev:pdf                  # dev server opened straight to /portfolio-pdf-preview
npm run build                    # typecheck → client build → SSR build → pre-render  ← the real gate
npm run build:spa                # plain tsc && vite build, no pre-rendering (debugging only)
npm run preview                  # serve dist/
npm run generate:portfolio-html  # dist/portfolio-top10-source.html via scripts/generatePortfolioPdf.mts
npm run generate:portfolio-pdf   # the above + headless Chrome → dist/Art-Aesthete-Portfolio-Top10.pdf
```

### Verification

```bash
npm run verify     # typecheck → 235 tests → build → live browser smoke test (~1m50s)
npm test           # vitest only, no browser (~52s)
npm run test:smoke # build + drive real Chrome over every route
```

**`npm run verify` is the pre-deploy gate — the site autodeploys on push, so run it first.**
See `TESTING.md` for the full layer-by-layer breakdown and how to run each file individually.

`npm run lint` is currently **broken** — ESLint 8 is installed but no `.eslintrc*` exists, so the
script exits 1 with "couldn't find a configuration file". It is deliberately excluded from
`npm run verify`. Don't add an ESLint config as a side effect of another task; if asked
to fix linting, note that ESLint 9 would want a flat `eslint.config.js`.

`generate:portfolio-pdf` hardcodes the macOS Chrome path and port 4173. It is macOS-only by design.

## Layout

```
src/
  main.tsx                 hydrateRoot when #root has children, else createRoot
  App.tsx                  client entry: BrowserRouter + ScrollToTop + AppShell
  AppShell.tsx             the <Routes> tree, shared by the client and the prerenderer
  entry-server.tsx         server renderer (StaticRouter + renderToString)
  seo/
    siteConfig.ts          canonical facts: origin, brand, areaServed
    routes.ts              per-route title/description/image; project routes from PROJECTS
    structuredData.ts      JSON-LD builders
    useDocumentMeta.ts     keeps <head> correct across client-side navigation
  index.css                design tokens + shared utility classes (see below)
  data/
    appData.ts             RESOURCES (images, logos, testimonials); re-exports PROJECTS
    contentData.ts         CONTENT — site copy as data
  components/<Name>/       Name.tsx + Name.css + index.ts (`export { default } from './Name'`)
  pages/<Name>/            Name.tsx + Name.css (+ colocated *Data.ts)
  types/                   ambient .d.ts (html2pdf)
scripts/
  prerender.mts            SSG: renders every route to dist/<route>/index.html,
                           injects per-route <head> + JSON-LD, writes sitemap/llms.txt
  generatePortfolioPdf.mts Node-side PDF HTML generator
  portfolioPdfTemplate.css styles for that generated HTML
tests/
  routes.ts                route manifest shared by the routing tests and the smoke test
  unit/ components/ pages/ vitest + React Testing Library
  smoke/smoke.mts          live Chrome check against a built site
public/images/             all imagery, referenced by absolute `/images/...` paths
```

Tests live in `tests/`, not beside the source, so `tsconfig.json` (`include: ["src"]`) and
therefore `npm run build` stay exactly as they were. Adding a route means adding one entry to
`tests/routes.ts` — the jsdom tests and the smoke test both read it.

Import a component through its folder (`from './components/Header'`), never the file.
Relative `.ts`/`.tsx` extensions are written explicitly in imports here — `allowImportingTsExtensions`
is on; match the surrounding file.

## Case-study data is the source of truth

`src/pages/CaseStudy/caseStudyData.ts` exports `PROJECTS: Record<string, Project>` (ids like
`homeOffices`, `cuppertinoHome`, `orangeSeriesPainting`). `src/data/appData.ts` re-exports it so
pages import from `data/appData.ts` rather than reaching into the CaseStudy folder.

Three flags on each `Project` decide where it appears:

| Field | Effect |
| --- | --- |
| `storyType` | `'interior'` → `/interior-story/:id`, `'fine-art'` → `/fine-art-story/:id`; also splits the Portfolio tabs |
| `isSelectedForHome` + `homeVisibilityPriority` | selects and orders the home "Selected Works" grid (lower = earlier; `99` parks a project) |
| `isSelectedForPdf` | selects the interior projects in the portfolio PDF |

To feature, reorder, or retire a project, edit these fields — do not reorder JSX or duplicate copy
into a page.

### Keep the two PDF renderers in sync

`src/pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx` (browser preview) and
`scripts/generatePortfolioPdf.mts` (Node generator) implement the **same** selection, sorting, and
image-picking logic twice, against the same `PROJECTS`/`RESOURCES`/`CONTENT`. A change to one
almost always belongs in the other. Their styles are separate on purpose:
`PortfolioPdfPreview.css` for the preview, `scripts/portfolioPdfTemplate.css` for the output.

## Server rendering

`AppShell.tsx` holds the `<Routes>` tree and is rendered by **both** `App.tsx`
(`BrowserRouter`, in the browser) and `entry-server.tsx` (`StaticRouter`, at build time).
Keep those two trees identical or hydration breaks.

Rules that follow from being pre-rendered:

- **Content routes are imported eagerly** in `AppShell.tsx`. A `lazy()` content route would
  hydrate as `<Loader />` over pre-rendered markup and mismatch. Only
  `/portfolio-pdf-preview` stays lazy — it pulls in jspdf/html2canvas/html2pdf and touches
  `window` at import time, so it must never enter the server bundle, and it is excluded
  from pre-rendering (it gets an empty-root `noindex` shell instead).
- **Never read `window`, `document`, `localStorage` or `matchMedia` during render** or at
  module top level — only inside `useEffect` or an event handler. `Header.tsx` initialises
  `isStuck` from `shouldForceStuck` and computes the real viewport state in its effect for
  exactly this reason.
- **Never render anything non-deterministic.** `Math.random()`, `Date.now()` and
  `new Date()` differ between build and browser. `Portfolio.tsx` renders the stable data
  order first and shuffles in a `useEffect` after mount.
- **Don't gate content behind state that starts empty.** Tab panels in
  `src/pages/ServiceDetails/` stay in the DOM with `hidden={activeTab !== '…'}` plus
  `.sd-tabpanel { display: contents }`, so every tab's copy is in the static HTML.
- Adding a route means adding it to `src/seo/routes.ts` (title, description, OG image) and
  to `tests/routes.ts`. The prerenderer, sitemap.xml and llms.txt all read the former.

See `DEPLOYMENT.md` for the Amplify rewrite rule this requires — the default SPA rewrite
breaks pre-rendering.

## Routing

Routes live in `AppShell.tsx`. `/case-study/:id` and `/project/:id` are legacy paths kept
alive by `StoryRouteResolver`, which looks up `storyType` and `<Navigate replace>`s to the right
story route — keep them working. `InteriorStory` and `FineArtStory` are thin wrappers over
`CaseStudy`; the fine-art variant passes `showInteriorView={false}` to drop the before/after slider.

`/portfolio-pdf-preview` deliberately renders without `Header`, `Footer`, and `Cursor` (the
`isPdfPreviewRoute` checks in `AppShell`). Anything added to the shell needs the same guard.

New content pages are imported **eagerly** in `AppShell.tsx` so they pre-render and hydrate
cleanly — don't reach for `lazy()` unless the page pulls in a browser-only dependency, in
which case it also needs to be excluded from pre-rendering like `/portfolio-pdf-preview`.

## Styling

Plain CSS, one stylesheet per component/page, imported from its `.tsx`. No CSS modules, no
preprocessor, no utility framework.

- **Tokens** live in `:root` in `src/index.css` (`--cream`, `--terra`, `--bark`, `--dark`,
  `--sage`, `--gold`, …). Use them; don't introduce raw hexes for brand colors.
- **Shared utilities** also live in `index.css`: `.sec-label`, `.reveal` / `.rl` / `.rr` / `.rs`
  (scroll-reveal, activated by adding `.on`), `.btn-dk` / `.btn-tr` / `.btn-lt` / `.btn-ghost`.
- **Breakpoints** are `max-width: 1100px` (tablet) and `max-width: 640px` (phone). A few pages add
  height-based queries for the hero; follow the file you're in rather than inventing a breakpoint.
- Class names are short and page-scoped (`.pi`, `.tc-av-bg`). Match the local idiom.
- `body { cursor: none }` — the custom `Cursor` component draws the pointer, and
  `data-cursor="..."` on any element sets its hover label. Removing that attribute silently falls
  back to "View".

Scroll reveals are wired with `IntersectionObserver` in a page-level `useEffect` that queries
`.reveal, .rl, .rr, .rs` and adds `.on`. Always `observer.disconnect()` in the cleanup.

## Booking form

`src/pages/Book/Book.tsx` posts to `import.meta.env.VITE_BOOKING_API_URL` with an `AbortController`
timeout. Config (`VITE_BOOKING_API_URL`, optional `VITE_BOOKING_API_KEY`,
`VITE_BOOKING_REQUEST_TIMEOUT_MS`) is typed in `src/vite-env.d.ts`; add any new var there too.
Form copy, questions, and FAQs are data in `src/pages/Book/bookingData.ts` — edit those, not JSX.

Note: `.env` and `.env.local` are **committed** and currently identical to `.env.example` (the
API key is empty). Anything secret must not go in them as-is — raise it rather than committing a
real key. The repo's `.gitignore` sits one level up at the git root and ignores only
`node_modules/` and `dist/`.

## Conventions

- Function components with arrow syntax, `export default` at the bottom; props typed with a local
  `type XProps = { ... }`.
- Single quotes, semicolons, 2-space indent (`src/data/appData.ts` uses tabs — leave it as it is).
- Copy, image URLs, and lists belong in a data module (`contentData.ts`, `appData.ts`,
  `bookingData.ts`, `caseStudyData.ts`), not inline in JSX.
- Module-level `const` in SCREAMING_SNAKE for config read once per file
  (`STUCK_BREAKPOINT`, `MARQUEE_ITEMS`, `HOME_HERO_IMAGE_URL`).
- `tsconfig` has `strict`, `noUnusedLocals`, and `noUnusedParameters` on — an unused import fails
  the build.
- Images go in `public/images/<Brand|Topic>/...` and are referenced by absolute path. Prefer
  `.webp` for new large assets, and `loading="lazy"` for anything below the fold.

## Known rough edges

Mention these rather than silently fixing them unless asked:

- `Art Aesthete.html` at the repo root is the original static mockup the React app was ported from;
  it is not built or served.
- `/book?audience=trade` is reached by a `<button>` in `Header.tsx`, not a link. It is a
  same-page view toggle and is deliberately not in the sitemap.
- `Portfolio.tsx` shuffles the "All" tab after mount, so ordering differs per visit —
  intentional, but don't write tests or snapshots against the shuffled order.
- There is still no catch-all 404 route in `AppShell.tsx`; an unknown path renders the shell
  with an empty body.
