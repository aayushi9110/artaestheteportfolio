/**
 * The rebrand's launch checklist, as tests.
 *
 * The rebrand ships in small releases. Each release adds the
 * strings it removes to BANNED_STRINGS, so they cannot creep back in later through
 * copy, a page title, alt text or a meta description.
 *
 * The corpus is what a visitor or crawler actually receives: every pre-rendered
 * route's markup, every route's <title> and meta description (injected into <head>
 * by the prerenderer, so not part of the rendered body), index.html and robots.txt.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { describe, expect, it } from 'vitest';
import AppShell from '../../src/AppShell.tsx';
import { SEO_ROUTES } from '../../src/seo/routes.ts';
import { SERVICES } from '../../src/data/servicesData.ts';

type BannedString = {
  text: string;
  /** The release that removed it, for whoever trips this test later. */
  removedIn: string;
};

const BANNED_STRINGS: BannedString[] = [
  { text: '8–16 weeks', removedIn: 'R0 (en-dash spelling; the hyphenated "8-16 weeks" goes in R1)' },
];

const repoFile = (relativePath: string) => readFileSync(resolve(__dirname, '../..', relativePath), 'utf8');

const renderRoute = (path: string): string =>
  renderToString(
    <StaticRouter location={path}>
      <AppShell />
    </StaticRouter>
  );

/** Undo the entity escaping renderToString applies, so copy matches as written. */
const unescapeHtml = (html: string) =>
  html
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

/**
 * Visible text, as a reader sees it. Tags are dropped without a space so a split
 * logo like `Art<span>Aesthete</span>` reads "ArtAesthete", exactly as on screen.
 */
const visibleText = (html: string) => unescapeHtml(html.replace(/<[^>]+>/g, ''));

const RENDERED = SEO_ROUTES.map((route) => ({ path: route.path, html: renderRoute(route.path) }));

const CORPUS: { source: string; text: string }[] = [
  // Markup catches alt text, aria labels and link targets; visible text catches
  // copy split across elements.
  ...RENDERED.map(({ path, html }) => ({ source: path, text: unescapeHtml(html) })),
  ...RENDERED.map(({ path, html }) => ({ source: `${path} (visible text)`, text: visibleText(html) })),
  ...SEO_ROUTES.map((route) => ({ source: `${route.path} <head>`, text: `${route.title}\n${route.description}` })),
  { source: 'index.html', text: repoFile('index.html') },
  { source: 'public/robots.txt', text: repoFile('public/robots.txt') },
];

const sourcesContaining = (needle: string) =>
  CORPUS.filter((entry) => entry.text.includes(needle)).map((entry) => entry.source);

describe('launch checklist: removed wording stays removed', () => {
  it.each(BANNED_STRINGS)('"$text" appears nowhere (removed in $removedIn)', ({ text }) => {
    expect(sourcesContaining(text)).toEqual([]);
  });
});

describe('services data', () => {
  it('lists the four services in card order', () => {
    expect(SERVICES.map((service) => service.id)).toEqual([
      'design-consult',
      'the-plan',
      'the-furnishing',
      'the-refresh',
    ]);
  });

  it('marks exactly one service "Most popular", and it is The Furnishing', () => {
    expect(SERVICES.filter((service) => service.isMostPopular).map((service) => service.id)).toEqual([
      'the-furnishing',
    ]);
  });

  it('gives every service a path that matches its id', () => {
    for (const service of SERVICES) expect(service.path).toBe(`/service/${service.id}`);
  });
});
