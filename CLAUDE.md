# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing and portfolio site for an interior-design studio, live at https://www.byaayushi.com.
The brand is moving from "Art Aesthete" to "By Aayushi Studio", shipped in small releases.

**This repository is public.** Internal planning documents, unconfirmed prices and anything else not
meant for the live site stay out of commits; `src/data/servicesData.ts` prices are `null` until
confirmed.

## Repo layout

| Path | What it is |
| --- | --- |
| `react-portfolio/` | The site: React 18 + TypeScript + Vite, pre-rendered to static HTML. **All app work happens here.** It has its own `CLAUDE.md` (architecture, conventions, server-rendering rules), plus `DEPLOYMENT.md` and `TESTING.md`. Read the `CLAUDE.md` before editing anything under it. |
| `lambda/booking-submit/` | The only backend: an API Gateway → Lambda (Node 20, `index.mjs`) → SES mailer for the booking form. Deployed by hand as a zip, not by the site pipeline. Its `README.md` documents the payload contract; `OPERATIONS.md` documents env vars and CORS. |
| `amplify.yml` | Amplify build: `cd react-portfolio && npm ci && npm run build`, publishing `react-portfolio/dist`. |
| `customHttp.yml` | Amplify custom headers (UTF-8 charset for `robots.txt`, `llms.txt`, `sitemap.xml`). It must stay at the repo root. |
| `Art Aesthete.html` | The original static mockup the React app was ported from. It is not built or served. |

There is no root `package.json` workflow; run npm commands from `react-portfolio/`.

## Commands (from `react-portfolio/`)

```bash
npm run dev                 # Vite dev server (client-rendered only, no pre-rendering)
npm run build               # typecheck → client build → SSR build → pre-render every route (scripts/prerender.mts)
npm run lint                # ESLint 8, --max-warnings 0 (not part of verify; run alongside)
npm test                    # all vitest tests, no browser (~55s)
npx vitest run tests/pages/Book.test.tsx             # one file
npx vitest run tests/components/Header.test.tsx -t "logo"   # one test by name
npm run verify              # typecheck → tests → build → real-Chrome smoke test (desktop + mobile). The pre-push gate.
npm run test:live -- https://www.byaayushi.com       # smoke test against production after a deploy
```

## Deployment: things that are not in the code

- **Every push to `master` deploys to production** (AWS Amplify; there is no staging). Run
  `npm run verify` and `npm run lint` before pushing.
- **Redirects and rewrites live only in the Amplify Console.** The SPA fallback is a `404-200`
  rewrite; changing it to `200` would serve the home page on every route. Removing or renaming a
  route needs a 301 rule added in the console, or the old URL falls through to the fallback.
- **CloudFront caches HTML with `s-maxage` of one year.** After a deploy, check
  `curl -sSI https://www.byaayushi.com/<path>` for `age` and `last-modified`, and invalidate if the
  edge is stale. Don't use a browser to judge whether a deploy shipped.
- **Booking email addresses are Lambda env vars** (`SES_FROM_EMAIL`, `SES_TO_EMAIL`,
  `CORS_ALLOW_ORIGIN`) set in the AWS Console (region `us-east-1`). A new address must be
  SES-verified before it's switched in. A frontend change to the booking payload must be matched
  in `lambda/booking-submit/index.mjs` validation, and the Lambda must be deployed first.
- **Every `VITE_*` variable is inlined into the public bundle.** `.env` and `.env.local` are
  git-ignored; only `.env.example` is tracked.

## No-JS readability is a requirement

The site is pre-rendered so crawlers and AI assistants get real HTML. `public/robots.txt`
explicitly allows the AI user agents, and `sitemap.xml` and `llms.txt` are generated from
`src/seo/routes.ts` at build time. Anything that only renders after JavaScript, or a route missing
from `src/seo/routes.ts`, is a regression. Verify pages with `curl` (e.g. grep the built
`dist/<route>/index.html` or the live URL for the `<h1>`), not a headless browser, which runs JS
and hides the problem.

## Stale docs to be aware of

`README.md` predates the current setup. Its S3-sync deploy steps and "replace
`GA_MEASUREMENT_ID`" note are obsolete: deploys go through Amplify, and analytics is injected
only when `VITE_GA_ID` is set. Its pointer to `src/data/contentData.ts` as the single home for
site and PDF copy is still accurate.

`.github/agents/professional-react-ts-express-developer.agent.md` is a generic persona that
recommends Tailwind, Next.js and S3 hosting. None of that applies here: the repo uses plain CSS
per component, Vite with its own pre-renderer, and Amplify.
