/**
 * Build-time static site generation.
 *
 * Runs the client build and an SSR build, renders every public route to HTML,
 * injects it into the built index.html along with that route's <head> tags and
 * JSON-LD, and writes dist/<route>/index.html. Also emits sitemap.xml and llms.txt.
 *
 * Invoked by `npm run build`, which is the only command AWS Amplify runs.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { PROJECTS } from '../src/pages/CaseStudy/caseStudyData.ts';
import { EXCLUDED_PATHS, SEO_ROUTES, storyPathFor, type RouteSeo } from '../src/seo/routes.ts';
import { SITE, SITE_ORIGIN, absoluteUrl } from '../src/seo/siteConfig.ts';
import {
  breadcrumbLd,
  creativeWorkLd,
  faqLd,
  personLd,
  portfolioCollectionLd,
  professionalServiceLd,
  serviceLd,
} from '../src/seo/structuredData.ts';
import { BOOKING_FAQS } from '../src/pages/Book/bookingData.ts';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const distDir = resolve(repoRoot, 'dist');
const ssrDir = resolve(repoRoot, '.ssr-build');

const run = (args: string[]) =>
  execFileSync('npx', args, { cwd: repoRoot, stdio: 'inherit', timeout: 10 * 60_000 });

const escapeAttr = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** JSON-LD goes inside a <script>, so only `<` needs neutralising. */
const escapeJsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c');

/**
 * Pull Q&A straight out of the rendered page. Deriving FAQPage data from the real
 * markup is the only way to guarantee the structured data matches what a visitor
 * sees — which is exactly what search engines require.
 */
const extractFaqFromHtml = (html: string): { question: string; answer: string }[] => {
  const stripTags = (value: string) =>
    value
      .replace(/<[^>]+>/g, ' ')
      // Numeric entities first (React emits &#x27; for an apostrophe), then named
      // ones, and &amp; last so "&amp;lt;" does not decode twice into "<".
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

  return [...html.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)]
    .map((match) => ({ question: stripTags(match[1]), answer: stripTags(match[2]) }))
    .filter((entry) => entry.question.length > 0 && entry.answer.length > 0);
};

const SERVICE_PATHS = new Set([
  '/service/the-plan',
  '/service/the-furnishing',
  '/service/the-refresh',
  '/service/the-trade-program',
]);

const headTagsFor = (route: RouteSeo, appHtml: string): string => {
  const url = absoluteUrl(route.path);
  const image = absoluteUrl(route.image);

  const blocks: unknown[] = [];
  if (route.path === '/') {
    blocks.push(professionalServiceLd());
  } else if (route.path === '/about') {
    blocks.push(personLd());
    blocks.push(breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]));
  } else if (route.projectId) {
    const work = creativeWorkLd(route.projectId);
    if (work) blocks.push(work);
    blocks.push(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: PROJECTS[route.projectId].title, path: route.path },
      ])
    );
  } else if (route.path === '/book') {
    // /book genuinely renders this Q&A on the page, so the markup is honest.
    const faq = faqLd([...BOOKING_FAQS]);
    if (faq) blocks.push(faq);
  } else if (route.path === '/portfolio') {
    blocks.push(portfolioCollectionLd());
  } else if (SERVICE_PATHS.has(route.path)) {
    blocks.push(serviceLd(route));
    blocks.push(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/process' },
        { name: route.title.split(' — ')[0], path: route.path },
      ])
    );
  }

  // Service pages render their FAQ in <details> elements; reuse whatever is there.
  const pageFaq = faqLd(extractFaqFromHtml(appHtml));
  if (pageFaq && route.path !== '/book') {
    blocks.push(pageFaq);
  }

  const lines = [
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    ...blocks.map((block) => `<script type="application/ld+json">${escapeJsonLd(block)}</script>`),
  ];

  return lines.map((line) => `    ${line}`).join('\n');
};

const outputPathFor = (routePath: string): string =>
  routePath === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, `${routePath.replace(/^\//, '')}/index.html`);

const buildSitemap = (routes: RouteSeo[]): string => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${escapeAttr(absoluteUrl(route.path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : route.projectId ? '0.6' : '0.8'}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const buildLlmsTxt = (routes: RouteSeo[]): string => {
  const pageRoutes = routes.filter((route) => !route.projectId);
  const interiorRoutes = routes.filter(
    (route) => route.projectId && PROJECTS[route.projectId].storyType === 'interior'
  );
  const fineArtRoutes = routes.filter(
    (route) => route.projectId && PROJECTS[route.projectId].storyType === 'fine-art'
  );

  const line = (route: RouteSeo) =>
    `- [${route.title.split(' | ')[0].split(' — ')[0]}](${absoluteUrl(route.path)}): ${route.description}`;

  const projectLine = (route: RouteSeo) => {
    const project = PROJECTS[route.projectId!];
    const where = project.location ? ` (${project.location})` : '';
    return `- [${project.title}${where}](${absoluteUrl(route.path)}): ${route.description}`;
  };

  return `# ${SITE.name}

> ${SITE.description}

${SITE.name} is the studio of ${SITE.founder}, covering interior design, furnishing and
commissioned fine art. Projects run from empty to finished in roughly six to ten weeks,
on flat fees with trade pricing.

## Services

- **The Plan** — a design plan you shop yourself: layouts, specifications and sourcing guidance.
- **The Furnishing** — full turnkey furnishing for newly-renovated condos, co-ops and brownstones.
- **The Refresh** — restyling a home you already live in, installed in a single day.
- **The Trade Program** — furnishing partnerships for architects, designers and realtors.
- **Virtual Consultation (E-Design)** — remote design over video, anywhere in the United States.

## Where

${SITE.areaServed.join(', ')}.

## Booking

Enquiries go through [${SITE_ORIGIN}/book](${SITE_ORIGIN}/book). Initial discovery calls are
complimentary and enquiries are answered within 24 hours on weekdays.

## Pages

${pageRoutes.map(line).join('\n')}

## Interior design projects

${interiorRoutes.map(projectLine).join('\n')}

## Fine art

${fineArtRoutes.map(projectLine).join('\n')}
`;
};

const main = async () => {
  console.log('\n[1/5] Type-checking…');
  run(['tsc', '--noEmit']);

  console.log('\n[2/5] Building client bundle…');
  run(['vite', 'build']);

  console.log('\n[3/5] Building server bundle…');
  rmSync(ssrDir, { recursive: true, force: true });
  run(['vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', '.ssr-build']);

  console.log('\n[4/5] Pre-rendering routes…');
  const { render } = (await import(
    pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
  )) as { render: (url: string) => string };

  const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html does not contain the expected empty #root div');
  }

  for (const route of SEO_ROUTES) {
    const appHtml = render(route.path);

    if (/class="[^"]*\bld-logo\b/.test(appHtml)) {
      throw new Error(`${route.path} pre-rendered the loading screen instead of page content`);
    }
    if (appHtml.trim().length < 500) {
      throw new Error(`${route.path} rendered suspiciously little HTML (${appHtml.length} bytes)`);
    }

    const html = template
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escapeAttr(route.title)}</title>\n${headTagsFor(route, appHtml)}`
      )
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outputPath = outputPathFor(route.path);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html, 'utf8');
    console.log(`      ${route.path.padEnd(42)} → ${outputPath.replace(`${repoRoot}/`, '')}`);
  }

  // Legacy /case-study/:id and /project/:id URLs redirect client-side, but a
  // crawler (and the SPA fallback) needs something real at that address. A canonical
  // link plus a meta refresh is a proper soft redirect, and the empty #root hydrates
  // cleanly instead of inheriting the home page's markup.
  let legacyCount = 0;
  for (const [id, project] of Object.entries(PROJECTS)) {
    const target = storyPathFor(id, project);
    for (const prefix of ['/case-study', '/project']) {
      const legacyPath = `${prefix}/${id}`;
      const html = template
        .replace(
          /<title>[\s\S]*?<\/title>/,
          [
            `<title>${escapeAttr(`${project.title} | ${SITE.name}`)}</title>`,
            `    <link rel="canonical" href="${escapeAttr(absoluteUrl(target))}" />`,
            `    <meta http-equiv="refresh" content="0; url=${escapeAttr(target)}" />`,
            `    <meta name="robots" content="noindex, follow" />`,
          ].join('\n')
        )
        .replace(
          '<div id="root"></div>',
          `<div id="root"></div>\n    <noscript><p>This project has moved to <a href="${escapeAttr(target)}">${escapeAttr(project.title)}</a>.</p></noscript>`
        );

      const outputPath = outputPathFor(legacyPath);
      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, html, 'utf8');
      legacyCount += 1;
    }
  }
  console.log(`      ${String(legacyCount).padStart(4)} legacy /case-study and /project aliases → canonical soft redirects`);

  // Routes that are deliberately NOT pre-rendered still need a document, otherwise
  // the host falls back to dist/index.html — the pre-rendered HOME page — and the
  // client hydrates home markup under a different route, which React reports as a
  // hydration mismatch. An empty #root hydrates cleanly as a plain client render.
  const shell = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttr(`${SITE.name} — ${SITE.tagline}`)}</title>\n    <meta name="robots" content="noindex" />`
  );

  writeFileSync(resolve(distDir, 'app-shell.html'), shell, 'utf8');
  for (const excluded of EXCLUDED_PATHS) {
    const outputPath = outputPathFor(excluded);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, shell, 'utf8');
    console.log(`      ${excluded.padEnd(42)} → client-only shell (noindex)`);
  }

  console.log('\n[5/5] Writing sitemap.xml and llms.txt…');
  writeFileSync(resolve(distDir, 'sitemap.xml'), buildSitemap(SEO_ROUTES), 'utf8');
  writeFileSync(resolve(distDir, 'llms.txt'), buildLlmsTxt(SEO_ROUTES), 'utf8');

  rmSync(ssrDir, { recursive: true, force: true });

  console.log(`\n  Pre-rendered ${SEO_ROUTES.length} routes into dist/\n`);
};

main().catch((error) => {
  console.error('\nPrerender failed:', error);
  process.exitCode = 1;
});
