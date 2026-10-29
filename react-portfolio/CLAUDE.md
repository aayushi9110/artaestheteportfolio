# Art Aesthete — Portfolio Site

Marketing and portfolio site for an interior-design + fine-art studio. React 18 + TypeScript,
built with Vite 7, routed with React Router 6. No backend in this repo: the only network call is
the booking form POST to an external API Gateway endpoint.

The same case-study data drives three surfaces — the live site, an in-browser PDF preview route,
and a Node script that emits print-ready HTML. Changing the data changes all three.

## Commands

```bash
npm run dev                      # Vite dev server
npm run dev:pdf                  # dev server opened straight to /portfolio-pdf-preview
npm run build                    # tsc --noEmit, then vite build  ← the real gate
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
  main.tsx                 StrictMode root
  App.tsx                  router, lazy routes, ScrollToTop, 2s splash
  index.css                design tokens + shared utility classes (see below)
  data/
    appData.ts             RESOURCES (images, logos, testimonials); re-exports PROJECTS
    contentData.ts         CONTENT — site copy as data
  components/<Name>/       Name.tsx + Name.css + index.ts (`export { default } from './Name'`)
  pages/<Name>/            Name.tsx + Name.css (+ colocated *Data.ts)
  types/                   ambient .d.ts (html2pdf)
scripts/
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

## Routing

Routes live in `AppShell` in `App.tsx`. `/case-study/:id` and `/project/:id` are legacy paths kept
alive by `StoryRouteResolver`, which looks up `storyType` and `<Navigate replace>`s to the right
story route — keep them working. `InteriorStory` and `FineArtStory` are thin wrappers over
`CaseStudy`; the fine-art variant passes `showInteriorView={false}` to drop the before/after slider.

`/portfolio-pdf-preview` deliberately renders without `Header`, `Footer`, and `Cursor` (the
`isPdfPreviewRoute` checks in `AppShell`). Anything added to the shell needs the same guard.

New pages are lazy (`const X = lazy(() => import(...))`) and fall back to `<Loader />`.

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

- `src/pages/Portfolio.tsx` is a dead, pre-refactor copy of `src/pages/Portfolio/Portfolio.tsx`
  with placeholder `src: '.'` images. Nothing imports it.
- `Art Aesthete.html` at the repo root is the original static mockup the React app was ported from;
  it is not built or served.
- `index.html` ships Google Analytics with a literal `GA_MEASUREMENT_ID` placeholder.
- `App.tsx` gates the whole app behind a fixed 2-second `setTimeout` splash, so every cold load
  costs two seconds before the router mounts.
- `Portfolio.tsx` shuffles the "All" tab with `Math.random()` in a `useMemo`, so ordering differs
  per mount — intentional, but don't write tests or snapshots against it.
