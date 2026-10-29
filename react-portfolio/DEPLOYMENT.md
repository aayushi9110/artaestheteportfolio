# Deployment & Hosting

The site autodeploys from `master` to AWS Amplify. `amplify.yml` runs `npm ci` and
`npm run build` in `react-portfolio/` and publishes `react-portfolio/dist`.

`npm run build` is now a **static site generator** (`scripts/prerender.mts`), not a plain
`vite build`. It emits one real HTML file per route:

```
dist/index.html                              /            (pre-rendered)
dist/about/index.html                        /about        (pre-rendered)
dist/service/the-plan/index.html             …             (pre-rendered)
dist/interior-story/<projectId>/index.html   one per interior project
dist/fine-art-story/<projectId>/index.html   one per fine-art project
dist/case-study/<id>/index.html              canonical soft redirect to the story page
dist/project/<id>/index.html                 canonical soft redirect to the story page
dist/portfolio-pdf-preview/index.html        empty-root shell, noindex (client-only)
dist/app-shell.html                          empty-root shell — the SPA fallback target
dist/robots.txt  dist/sitemap.xml  dist/llms.txt
```

## The Amplify rewrite rule

Amplify rewrite rules live in the **Amplify Console**, not in this repo, so no deploy will
change them.

### What is configured today (verified in the console)

| Source | Target | Type |
| --- | --- | --- |
| `https://byaayushi.com` | `https://www.byaayushi.com` | 302 (redirect) |
| `/<*>` | `/index.html` | 404-200 (rewrite) |

**This works.** The important part is `404-200`, which means "only when the requested path
does not exist". Existing files and directory indexes are served as-is, so `/about`
resolves `dist/about/index.html` and the pre-rendered HTML reaches crawlers intact. The
live site has been confirmed serving full pre-rendered HTML on `/`, `/about`, `/portfolio`
and the other routes.

A plain `200` rewrite would **not** work: it intercepts every path, so `/about` would be
served `dist/index.html` — the pre-rendered *home* page — and visitors would get home-page
markup hydrating under the `/about` route. If anyone ever changes the type from `404-200`
to `200`, that is the symptom.

### Recommended change: point the fallback at `/app-shell.html`

Keep the type as `404-200` and change only the target:

```json
[
  {
    "source": "/<*>",
    "target": "/app-shell.html",
    "status": "404-200",
    "condition": null
  }
]
```

Amplify Console > your app > Hosting > *Rewrites and redirects* > Manage redirects.
Leave the apex-to-www 302 rule in place.

Why: the fallback only fires for paths that have no pre-rendered file — an unknown URL, or
`/portfolio-pdf-preview`. With the target at `/index.html`, those paths receive the home
page's markup and React then hydrates a different route over it, which it reports as a
mismatch and recovers from by discarding the server HTML (a brief flash, and console
errors). `dist/app-shell.html` is the same document with an empty `#root` and a `noindex`
tag, so those paths client-render cleanly instead.

This is a polish fix, not an outage fix — the site is correct either way for every
pre-rendered route.

### Verify

```bash
# must print the About page title, not the home page's
curl -s https://www.byaayushi.com/about | grep -o "<title>[^<]*"

# full automated check of every route against production
cd react-portfolio && npm run test:live -- https://www.byaayushi.com
```

`npm run test:live` drives real Chrome over every route and fails on blank pages, console
errors (including hydration mismatches) and 404 assets.

## Pre-deploy gate

```bash
cd react-portfolio && npm run verify
```

Typecheck → 309 tests → pre-render build → live Chrome smoke test over every route.
See `TESTING.md`. **The site autodeploys on push, so run this first.**

## Custom headers

`customHttp.yml` at the **repo root** sets `Content-Type` with `charset=utf-8` for
`robots.txt`, `llms.txt` and `sitemap.xml`. Without it Amplify served `robots.txt` with no
charset and its one non-ASCII character reached crawlers mangled.

Amplify reads this file from the repository root on each build; there are no custom headers
configured in the console, so nothing is being overridden. If a deploy ever shows the
headers missing, check whether Amplify is resolving the file against `react-portfolio/`
(the app root this build `cd`s into) instead, and move it there.

Verify after a deploy:

```bash
curl -sI https://www.byaayushi.com/robots.txt | grep -i content-type
# expect: content-type: text/plain; charset=utf-8
```

## Analytics

`index.html` injects Google Analytics only when `VITE_GA_ID` is set. Set it in Amplify
Console › Environment variables (it was previously a literal `GA_MEASUREMENT_ID`
placeholder, so analytics was never recording).

## Secrets

`.env` and `.env.local` are no longer tracked in git (`.gitignore` covers them, and they
were removed from the index with `git rm --cached`). Note that **every `VITE_*` variable is
inlined into the public JS bundle** — none of them are secret. `VITE_BOOKING_API_KEY` is
visible to anyone who views source, so the booking endpoint must be authorised
server-side in `lambda/booking-submit` / API Gateway rather than trusting that key.
