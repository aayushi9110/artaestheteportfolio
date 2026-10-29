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

## The Amplify rewrite rule — this must be changed by hand

Amplify rewrite rules live in the **Amplify Console**, not in this repo, so a deploy will
not update them. The app is almost certainly still on the default SPA rule:

```json
{ "source": "/<*>", "target": "/index.html", "status": "200" }
```

That rule is now wrong. A `200` rewrite intercepts **every** path, so `/about` is served
`dist/index.html` — the pre-rendered *home* page — instead of `dist/about/index.html`.
Visitors then get home-page markup hydrating under the `/about` route: React logs a
hydration error, throws the server HTML away and re-renders, and crawlers read the wrong
page entirely.

**Set this instead** — Amplify Console › your app › Hosting › *Rewrites and redirects*
› Manage redirects › Open text editor, and replace the rules with:

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

Two things matter here:

- **`404-200`** means "only when the requested path does not exist". Existing files and
  directory indexes are served as-is, so `/about` resolves `dist/about/index.html`.
  This is the whole fix.
- **`/app-shell.html`**, not `/index.html`, is the fallback. An unknown path then boots an
  empty React root and client-renders, rather than hydrating the home page's markup under
  a different URL (the same mismatch as above). It is marked `noindex`.

### Verify it took effect, right after the deploy

```bash
# must return the About page's title, NOT "Art Aesthete — Interior Design & Fine Art Studio"
curl -s https://www.byaayushi.com/about | grep -o '<title>[^<]*</title>'

# full automated check of every route against production
cd react-portfolio && npm run test:live -- https://www.byaayushi.com
```

`npm run test:live` drives real Chrome over every route and fails on blank pages, console
errors (including hydration mismatches), and 404 assets. If the rewrite rule is wrong,
this is what tells you.

### If `404-200` does not resolve directory indexes

Amplify should serve `about/index.html` for `/about`. If `curl` shows otherwise, add an
explicit rule *above* the catch-all for each directory route:

```json
{ "source": "/about", "target": "/about/index.html", "status": "200" }
```

`npm run build` prints every route it generated, which is the list you would need.

## Pre-deploy gate

```bash
cd react-portfolio && npm run verify
```

Typecheck → 309 tests → pre-render build → live Chrome smoke test over every route.
See `TESTING.md`. **The site autodeploys on push, so run this first.**

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
