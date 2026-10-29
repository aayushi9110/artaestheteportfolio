# Testing & Pre-Deploy Verification

The site autodeploys on push. Nothing between `git push` and "live" checks that the
site still renders — which is how a broken build stayed up until somebody reported it.
This suite is that check.

**Run this before every push:**

```bash
npm run verify
```

It typechecks, runs all 309 tests, builds, then drives a real Chrome over every route of
the built site and fails loudly if anything is blank, throws, logs an error, or 404s an
asset. Exit code is `1` on any failure, so it gates CI and git hooks.

Takes about **2m**: ~55s of tests, a pre-render build, then 21 live browser checks
(15 desktop + 6 mobile).

```
✗ Home (/) [desktop]
      marker ".hero" never appeared (blank or crashed render)
      uncaught error: Cannot read properties of undefined

  DO NOT DEPLOY.
```

---

**Current state:** 13 test files, 309 tests, all passing. Verified stable across three
consecutive full runs, and verified to actually *fail* — a deliberately corrupted bundle
was caught on every route with exit code 1.

---

## The four layers

| # | Layer | Command | Time | Catches |
|---|-------|---------|------|---------|
| 1 | Typecheck | `npm run typecheck` | ~3s | Type errors, unused imports, bad props |
| 2 | Data, assets & hydration | `npm run test:unit` | ~5s | Missing images, dead data references, PDF drift, non-deterministic SSR |
| 3 | Components & pages | `npm run test:components` / `npm run test:pages` | ~6s / ~50s | Broken logic, form validation, routing, redirects |
| 4 | **Live smoke test** | `npm run test:smoke` | ~50s | **Blank pages, runtime crashes, 404 assets, missing shell** |

Layer 4 is the one that would have caught the outage. Layers 1–3 are fast feedback
while you work; layer 4 is the gate.

---

## Every command

### The gate

```bash
npm run verify              # typecheck → all tests → build → smoke (desktop + mobile)
```

### Individual layers

```bash
npm run typecheck           # tsc --noEmit
npm test                    # all vitest tests (no browser)
npm run test:watch          # vitest in watch mode while developing
npm run test:coverage       # coverage report → coverage/
npm run test:unit           # tests/unit    — data, assets, PDF parity
npm run test:components     # tests/components — Header, Footer, Cursor, Loader
npm run test:pages          # tests/pages   — routing, Portfolio, CaseStudy, Book
```

### Individual files

```bash
npx vitest run tests/unit/data-integrity.test.ts
npx vitest run tests/unit/case-study-data.test.ts
npx vitest run tests/unit/pdf-parity.test.tsx
npx vitest run tests/unit/hydration.test.tsx
npx vitest run tests/components/Header.test.tsx
npx vitest run tests/components/Footer.test.tsx
npx vitest run tests/components/Cursor.test.tsx
npx vitest run tests/components/Loader.test.tsx
npx vitest run tests/pages/routing.test.tsx
npx vitest run tests/pages/Portfolio.test.tsx
npx vitest run tests/pages/CaseStudy.test.tsx
npx vitest run tests/pages/Book.test.tsx
npx vitest run tests/pages/Book.validation.test.tsx
```

Narrow further with `-t`: `npx vitest run tests/components/Header.test.tsx -t "logo"`.

### Smoke test

```bash
npm run test:smoke               # build, then check every route at 1440x900
npm run test:smoke:mobile        # the above, plus primary routes at 390x844
npm run test:live -- https://yoursite.com   # check a site that is ALREADY deployed
npx tsx tests/smoke/smoke.mts --headed      # watch the browser do it
npx tsx tests/smoke/smoke.mts --port 5000   # non-default preview port
```

`npm run test:live` skips the build and points at any URL. **Run it against production
right after an autodeploy finishes** — that is the check that was missing.

---

## What each file covers

### `tests/unit/data-integrity.test.ts` — 16 tests
The cheapest insurance in the suite. Walks every image URL in `PROJECTS` and
`RESOURCES` and confirms the file actually exists under `public/`. Renaming an image
without updating `caseStudyData.ts` fails here in seconds instead of on the live site.

Also checks: image paths are absolute (a relative path breaks on nested routes like
`/interior-story/x`); no two projects share a hero image; required project fields are
non-empty; `storyType` is valid; `homeVisibilityPriority` is a positive integer;
at most 10 interior projects carry `isSelectedForPdf`; project ids are URL-safe.

Filenames containing spaces are tracked in a `KNOWN_PATHS_WITH_SPACES` allowlist — the
three current ones are grandfathered, a new one fails the test.

### `tests/unit/case-study-data.test.ts` — 6 tests
`PROJECT_DETAIL_METRICS` has an entry for every project and never yields `undefined`
(which would throw on `.map` at render time). Metric definitions have unique labels and
lowercase, non-colliding aliases.

### `tests/unit/pdf-parity.test.tsx` — 10 tests
The portfolio PDF has **two independent implementations** of the same rules:
`PortfolioPdfPreview.tsx` (what you review in the browser) and
`scripts/generatePortfolioPdf.mts` (what becomes the actual PDF). They can drift, so
what you approve stops matching what you send.

This runs the real generator, parses its HTML, renders the real preview component, and
asserts both select **the same projects in the same order**. It also verifies every
image in the generated HTML exists on disk, the TOC paginates past 7 projects, and that
`CONTENT.home.stats` still has exactly 3 entries — the preview indexes `stats[0..2]`
with no guard and would crash on fewer.

### `tests/unit/hydration.test.tsx` — 74 tests
The site is pre-rendered to static HTML at build time and then hydrated, so the markup
the server produces must match what the client would produce. Anything non-deterministic
across the two — `Math.random()`, `Date.now()`, a `window` read during render — shows a
visitor a hydration error and a visible flash as React discards the server HTML.

Renders every route twice and diffs it, and asserts each route emits a `<main>`, exactly
one `<h1>`, crawlable `<a href>` links, real project titles, and never the loading screen
or the PDF libraries. This is the cheap version of the check; the smoke test confirms it
for real in Chrome, where a mismatch surfaces as React error #418/#423.

### `tests/components/Header.test.tsx` — 41 tests
The header has the most conditional logic in the app. Covers trailing-slash
normalisation (`/about/` ≡ `/about`); the Portfolio nav staying active across
`/interior-story/*`, `/fine-art-story/*`, `/case-study/*` and `/project/*`; dark/light
logo switching including the `/process` exception; forced-stuck state on `/` and
`/book`; the ≤1100px breakpoint; the mobile menu; the trade tooltip; and that scroll and
resize listeners are actually removed on unmount.

### `tests/components/Footer.test.tsx` — 17 tests
Every internal footer link is cross-checked against the route manifest in
`tests/routes.ts`, so a link to a route that no longer exists fails here.

### `tests/components/Cursor.test.tsx` — 23 tests
The custom cursor replaces the native one site-wide (`body { cursor: none }`), so if it
breaks the site feels broken. Covers position tracking, `data-cursor` labels with the
`'View'` fallback, the non-Element guard, and listener cleanup.

### `tests/components/Loader.test.tsx` — 10 tests
Render, visibility, and timer cleanup.

### `tests/pages/routing.test.tsx` — 23 tests
Every route in the manifest renders its expected marker. Legacy `/case-study/:id` and
`/project/:id` still redirect to the right story type. `StoryRouteResolver` survives
unknown ids, empty ids and URL-encoded ids.

Includes a guard test that reads `src/App.tsx` as text and asserts every manifest path
literally appears in it — so deleting or renaming a route fails the suite.

### `tests/pages/Portfolio.test.tsx` — 12 tests
Tab filtering by `storyType`; carousel wrap-around at both ends; lightbox open/close.
`Math.random` is stubbed so the shuffle is deterministic, and the real invariant is
asserted: the shuffle is a **permutation** — nothing lost, nothing duplicated.

### `tests/pages/CaseStudy.test.tsx` — 13 tests
Unknown project id falls back to `homeOffices` without crashing; `showInteriorView={false}`
hides the before/after slider for fine-art; gallery length matches the data; a gallery
item with an empty caption (there is one in real data) renders; auto-slide timers are
cleaned up on unmount.

### `tests/pages/Book.test.tsx` (28) + `Book.validation.test.tsx` (36) — 64 tests
The only thing on the site that talks to a backend, so the only thing that can fail
silently for a customer. Covers the happy-path POST (URL, method, headers, body, success
screen), the API-key header, a 500 response, a network rejection, an `AbortError`
timeout, double-submit, and the missing-`VITE_BOOKING_API_URL` case. Validation covers
whitespace-only fields, a battery of invalid/valid emails and phone formats, 5000-char
input, unicode names, and payload trimming.

### `tests/smoke/smoke.mts` — live browser check
For every route, in a real Chrome against the real build:

- the document returns < 400
- a route-specific marker element appears (proves it rendered, not white-screened)
- `#root` has children (independent blank-page guard)
- no uncaught exceptions, no `console.error`
- no request returns ≥ 400 (catches a renamed image or a missing chunk)
- no `<img>` finished loading with `naturalWidth === 0`
- header and footer are present — and *absent* on `/portfolio-pdf-preview`, which is
  intentionally bare
- legacy URLs land on the expected path

Analytics, Google Fonts and favicon noise is filtered out so the signal stays clean.

---

## Adding a route

Add it to `tests/routes.ts` — one entry, with a CSS `marker` that proves the page
rendered. Both the jsdom routing tests and the live smoke test read that file, so the
new route is covered in both places automatically.

```ts
{ path: '/studio', name: 'Studio', marker: '.studio-hero', expectText: 'Our studio' }
```

---

## Deploy checklist

**Before you push**

```bash
npm run verify
```

**After the autodeploy finishes**

```bash
npm run test:live -- https://your-production-url.com
```

Same checks, against what customers actually see. Catches anything environment-specific
that a local build cannot: a bad base path, missing env vars, a CDN serving stale or
missing assets.

To make this impossible to forget, add a pre-push hook:

```bash
printf '#!/bin/sh\nnpm run verify\n' > .git/hooks/pre-push && chmod +x .git/hooks/pre-push
```

---

## Known gaps

Found while building this suite. None are fixed — they are documented by tests that
assert current behaviour, so you decide when to address them.

1. **No 404 route.** `src/App.tsx` has no catch-all `<Route path="*">`. An unknown URL
   renders the header and footer with an empty page body — not an error, just a blank
   middle. Covered by a test named so the gap is obvious.
2. **Duplicate home priority.** `homeOffices` and `mumbaiBedroomTwo` both have
   `homeVisibilityPriority: 8`. `Home.tsx` sorts on priority alone, so the tie resolves
   by data-file order, while `generatePortfolioPdf.mts` tie-breaks by title — the home
   grid and the PDF can order that pair differently. Give one a distinct priority.
3. **`rel="noopener noreferrer"`.** Footer social links use `rel="noreferrer"` only.
   Harmless in modern browsers, worth tightening.
4. **`npm run lint` is broken.** ESLint 8 is installed with no config file, so the
   script exits 1. It is deliberately *not* part of `npm run verify` — adding a config
   is a separate decision.
5. **The 2s splash.** `App.tsx` blocks the router behind a fixed `setTimeout`, so every
   smoke check pays 2 seconds. Removing it would cut the smoke run roughly in half.

---

## Troubleshooting

**`browserType.launch: Chromium distribution 'chrome' is not found`**
The smoke test drives your installed Google Chrome rather than downloading a browser.
Install Chrome, or run `npx playwright install chromium` and drop `channel: 'chrome'`
from `tests/smoke/smoke.mts`.

**`vite preview exited early` / port in use**
Something is already on 4173. Use `npx tsx tests/smoke/smoke.mts --port 4180`.

**A smoke check fails but the page looks fine in your browser**
Look at the reported reason — it is usually a `console error` or a 404 for an asset that
the page degrades past visually. Reproduce with `--headed`.

**Tests hang after a `CaseStudy` change**
That page uses `setInterval`/`setTimeout` for auto-slide. Any test touching it must
`vi.useRealTimers()` in `afterEach`.

**A route renders blank or logs React error #418 / #423 after a deploy**
That is a hydration mismatch — almost always the hosting rewrite rule serving the wrong
pre-rendered document for a path. See `DEPLOYMENT.md`; it is the first thing to check.

**Tests pass alone but fail in the full suite**
Worker starvation, not a real bug. `tests/setup.ts` sets RTL's `asyncUtilTimeout` to 8s
and `vitest.config.ts` caps `maxForks` to 4 for exactly this reason — don't remove either
without re-running the suite three times.

**A Book test is slow**
`userEvent.setup({ delay: null })` is required in those files; the default awaits between
every simulated keystroke. For large inputs use `fireEvent.change` rather than
`user.type`. Ignoring this took the suite from 52s to 189s.
