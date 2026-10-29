/**
 * The portfolio PDF is produced by TWO independent implementations of the same
 * rules — src/pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx (what you review
 * in the browser) and scripts/generatePortfolioPdf.mts (what actually becomes the
 * PDF). They can silently drift apart, so the thing you approve is not the thing
 * you send.
 *
 * These tests run BOTH and compare their real output.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import PortfolioPdfPreview from '../../src/pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx';
import { PROJECTS } from '../../src/pages/CaseStudy/caseStudyData.ts';
import { CONTENT } from '../../src/data/contentData.ts';
import { RESOURCES } from '../../src/data/appData.ts';

const repoRoot = resolve(__dirname, '../..');
const generatedHtmlPath = resolve(repoRoot, 'dist/portfolio-top10-source.html');

let generatedHtml = '';

/** Titles in document order, read back out of the generator's HTML. */
const titlesFromGeneratedHtml = (html: string): string[] => {
  const sections = html.split('class="case-study-page"').slice(1);
  return sections
    .map((section) => section.match(/<h2>([^<]*)<\/h2>/)?.[1] ?? '')
    .filter(Boolean)
    .map((title) => title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
};

/** Titles in document order, read back out of the rendered React preview. */
const titlesFromPreview = (): string[] => {
  const { container } = render(<PortfolioPdfPreview />);
  return Array.from(container.querySelectorAll('.case-study-page h2')).map(
    (node) => node.textContent?.trim() ?? ''
  );
};

describe('portfolio PDF: preview page vs. generator script', () => {
  beforeAll(() => {
    // Runs the real generator the same way `npm run generate:portfolio-html` does.
    execFileSync('npx', ['tsx', 'scripts/generatePortfolioPdf.mts'], {
      cwd: repoRoot,
      stdio: 'pipe',
      timeout: 120_000,
    });
    expect(existsSync(generatedHtmlPath)).toBe(true);
    generatedHtml = readFileSync(generatedHtmlPath, 'utf8');
  });

  it('selects the same projects in the same order', () => {
    expect(titlesFromGeneratedHtml(generatedHtml)).toEqual(titlesFromPreview());
  });

  it('includes every interior project flagged isSelectedForPdf, and nothing else', () => {
    const expected = Object.values(PROJECTS)
      .filter((project) => project.storyType === 'interior' && project.isSelectedForPdf)
      .map((project) => project.title)
      .sort();

    expect([...titlesFromGeneratedHtml(generatedHtml)].sort()).toEqual(expected);
  });

  it('orders by homeVisibilityPriority, tie-broken by title', () => {
    const expected = Object.values(PROJECTS)
      .filter((project) => project.storyType === 'interior' && project.isSelectedForPdf)
      .sort((a, b) =>
        a.homeVisibilityPriority !== b.homeVisibilityPriority
          ? a.homeVisibilityPriority - b.homeVisibilityPriority
          : a.title.localeCompare(b.title)
      )
      .map((project) => project.title);

    expect(titlesFromGeneratedHtml(generatedHtml)).toEqual(expected);
  });

  it('references only images that exist on disk', () => {
    const referenced = [...generatedHtml.matchAll(/src="(\/images\/[^"]+)"/g)].map((match) => match[1]);
    expect(referenced.length).toBeGreaterThan(0);

    const missing = [...new Set(referenced)].filter(
      (url) => !existsSync(resolve(repoRoot, 'public', decodeURIComponent(url).replace(/^\//, '')))
    );
    expect(missing).toEqual([]);
  });

  it('escapes copy instead of injecting raw HTML', () => {
    // esc() in the generator must neutralise angle brackets from the data layer.
    expect(generatedHtml).not.toMatch(/<h2><script/i);
    expect(generatedHtml).toMatch(/<!doctype html>/i);
  });
});

describe('portfolio PDF: preview page contract', () => {
  it('renders the export root the PDF button serialises', () => {
    const { container } = render(<PortfolioPdfPreview />);
    expect(container.querySelector('#pdf-export-root')).not.toBeNull();
  });

  it('renders a case-study page per selected project plus the fixed front matter', () => {
    const { container } = render(<PortfolioPdfPreview />);
    const selectedCount = Object.values(PROJECTS).filter(
      (project) => project.storyType === 'interior' && project.isSelectedForPdf
    ).length;

    expect(container.querySelectorAll('.case-study-page')).toHaveLength(selectedCount);
    expect(container.querySelector('.home-page')).not.toBeNull();
    expect(container.querySelector('.about-page')).not.toBeNull();
    expect(container.querySelectorAll('.toc-page').length).toBeGreaterThanOrEqual(1);
  });

  it('paginates the table of contents past 7 projects', () => {
    const { container } = render(<PortfolioPdfPreview />);
    const selectedCount = Object.values(PROJECTS).filter(
      (project) => project.storyType === 'interior' && project.isSelectedForPdf
    ).length;
    const expectedTocPages = selectedCount > 7 ? 2 : 1;

    expect(container.querySelectorAll('.toc-page')).toHaveLength(expectedTocPages);
  });

  it('depends on exactly three home stats — fewer would crash the preview', () => {
    // PortfolioPdfPreview.tsx indexes stats[0..2] directly with no guard, so this
    // is a load-bearing assumption about CONTENT, not a style preference.
    expect(CONTENT.home.stats).toHaveLength(3);
  });

  it('has the brand assets both renderers hardcode', () => {
    for (const url of [RESOURCES.home.heroImageUrl, RESOURCES.about.profileImageUrl]) {
      expect(existsSync(resolve(repoRoot, 'public', url.replace(/^\//, '')))).toBe(true);
    }
  });
});
