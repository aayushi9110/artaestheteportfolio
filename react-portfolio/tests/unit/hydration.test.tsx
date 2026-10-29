/**
 * Pre-rendering only helps if the markup the server produces is the markup the
 * client would produce. Anything non-deterministic across the two — Math.random,
 * Date.now, a `window` read during render — shows up to a visitor as a hydration
 * error and a visible flash as React throws the server HTML away.
 *
 * Rendering each route twice and diffing is the cheap version of that check; the
 * live smoke test confirms it for real in Chrome.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { describe, expect, it } from 'vitest';
import AppShell from '../../src/AppShell.tsx';
import { SEO_ROUTES } from '../../src/seo/routes.ts';
import { PROJECTS } from '../../src/pages/CaseStudy/caseStudyData.ts';

const renderRoute = (path: string): string =>
  renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <AppShell />
      </StaticRouter>
    </StrictMode>
  );

const PATHS = SEO_ROUTES.map((route) => route.path);

describe('server rendering is deterministic', () => {
  it.each(PATHS)('%s renders identically twice', (path) => {
    expect(renderRoute(path)).toBe(renderRoute(path));
  });
});

describe('server rendering produces real content', () => {
  it.each(PATHS)('%s renders page content, not the loading screen', (path) => {
    const html = renderRoute(path);

    expect(html).not.toMatch(/class="[^"]*\bld-logo\b/);
    expect(html.length).toBeGreaterThan(500);
    expect(html).toContain('<main');
    expect(html).toMatch(/<h1[\s>]/);
  });

  it.each(PATHS)('%s emits crawlable <a href> links', (path) => {
    expect(renderRoute(path)).toMatch(/<a [^>]*href="\//);
  });

  it('renders every project title on its own story page', () => {
    for (const route of SEO_ROUTES) {
      if (!route.projectId) continue;
      const html = renderRoute(route.path);
      // Titles arrive HTML-escaped ("Living & Dining" -> "Living &amp; Dining").
      const title = PROJECTS[route.projectId].title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      expect(html, `${route.path} is missing the project title`).toContain(title);
    }
  });

  it('never pulls the PDF libraries into a pre-rendered route', () => {
    // html2pdf/jspdf/html2canvas touch `window` at import time. The PDF preview is
    // the only route that uses them and it stays lazy and un-pre-rendered.
    for (const path of PATHS) {
      expect(renderRoute(path)).not.toContain('pdf-export-root');
    }
  });
});
