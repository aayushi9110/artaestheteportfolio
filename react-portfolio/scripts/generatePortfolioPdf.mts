import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECTS } from '../src/pages/CaseStudy/caseStudyData.ts';
import { RESOURCES } from '../src/data/appData.ts';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const stylesPath = resolve(scriptDir, 'portfolioPdfTemplate.css');
const pdfStyles = readFileSync(stylesPath, 'utf8');

type ProjectEntry = {
  id: string;
  title: string;
  location: string;
  storyType: 'interior' | 'fine-art';
  overviewTitle: string;
  overviewTextPrimary: string;
  overviewTextSecondary: string;
  tagLabels: string[];
  heroImageUrl: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  galleryItems: { url: string; caption: string }[];
  homeVisibilityPriority: number;
  isSelectedForHome: boolean;
};

const projectEntries = Object.entries(PROJECTS).map(([id, project]) => ({
  id,
  ...project,
})) as ProjectEntry[];

const topTenProjects = projectEntries
  .filter((project) => project.storyType === 'interior')
  .sort((a, b) => {
    if (a.homeVisibilityPriority !== b.homeVisibilityPriority) {
      return a.homeVisibilityPriority - b.homeVisibilityPriority;
    }

    if (a.isSelectedForHome !== b.isSelectedForHome) {
      return a.isSelectedForHome ? -1 : 1;
    }

    return a.title.localeCompare(b.title);
  })
  .slice(0, 10);

const imageCandidates = (project: ProjectEntry): { url: string; caption: string }[] => {
  const selected = [
    { url: project.afterImageUrl, caption: 'After view' },
    { url: project.beforeImageUrl, caption: 'Before view' },
    { url: project.heroImageUrl, caption: 'Featured view' },
  ];

  for (const item of project.galleryItems) {
    if (selected.length >= 6) {
      break;
    }
    selected.push(item);
  }

  const unique = new Map<string, { url: string; caption: string }>();
  for (const item of selected) {
    if (!item.url || unique.has(item.url)) {
      continue;
    }
    unique.set(item.url, item);
  }

  return Array.from(unique.values()).slice(0, 3);
};

const esc = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const HOME_HERO_IMAGE_URL = RESOURCES.home.heroImageUrl;
const ABOUT_PROFILE_IMAGE_URL = RESOURCES.about.profileImageUrl;
const LOGO_DARK_URL = '/images/logos/artAesthete.png';

const renderBrandMark = (positionClass: 'logo-home-left' | 'logo-header-right' | 'logo-footer-left', tone: 'dark' | 'light' = 'dark'): string => {
  const toneClass = tone === 'light' ? 'brand-light' : 'brand-dark';

  return `
    <div class="pdf-brand ${positionClass} ${toneClass}">
      <img class="n-logo-mark" src="${esc(LOGO_DARK_URL)}" alt="Art Aesthete logo" />
      <span class="brand-wordmark">Art <span>Aesthete <span class="byaayushi">By Aayushi</span></span></span>
    </div>
  `;
};

const caseStudySections = topTenProjects
  .map((project, index) => {
    const images = imageCandidates(project);
    const tags = project.tagLabels.slice(0, 5).map((tag) => `<span class="chip">${esc(tag)}</span>`).join('');

    const imageMarkup = images
      .map(
        (image, imageIndex) => `
          <figure class="image-card image-${imageIndex + 1}">
            <img src="${esc(image.url)}" alt="${esc(project.title)} image ${imageIndex + 1}" />
            <figcaption>${esc(image.caption || `Project view ${imageIndex + 1}`)}</figcaption>
          </figure>
        `
      )
      .join('');

    return `
      <section class="case-study-page" id="case-study-${esc(project.id)}">
        ${renderBrandMark('logo-header-right')}
        <header class="page-header">
          <div>
            <p class="kicker">Case Study ${index + 1}</p>
            <h2>${esc(project.title)}</h2>
            <p class="location">${esc(project.location)}</p>
          </div>
        </header>

        <p class="overview-title">${esc(project.overviewTitle)}</p>
        <p class="overview-text">${esc(project.overviewTextPrimary)}</p>
        <p class="overview-text secondary">${esc(project.overviewTextSecondary)}</p>

        <div class="chips">${tags}</div>

        <div class="image-grid">${imageMarkup}</div>
        ${renderBrandMark('logo-footer-left')}
      </section>
    `;
  })
  .join('');

const generatedDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const aboutStoryParagraphs = [
  'Hi, I am Aayushi Shah. I set out to find rooms that felt honest - spaces that did not pretend to be something they were not.',
  'Most people decorate their homes. I believe you should curate them. A decorated room fills space. A curated one commands it.',
  'Art Aesthete exists for the homeowner who is done settling for fine and is ready for a space that actually moves them.',
];

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Art Aesthete Portfolio - Top 10 Case Studies</title>
    <style>${pdfStyles}</style>
  </head>
  <body>
    <section class="home-page">
      ${renderBrandMark('logo-home-left', 'light')}
      <div class="home-overlay"></div>
      <img class="home-bg" src="${esc(HOME_HERO_IMAGE_URL)}" alt="Art Aesthete home hero" />
      <div class="home-content">
        <p class="home-punch">Your space, your story, beautifully told</p>
        <h1>
          <span>Where Spaces</span>
          <span>Become</span>
          <span>Living Art</span>
        </h1>
        <p class="subtitle">
          We design interiors that feel as extraordinary as the people who inhabit them.
          Every detail is intentional. Every room tells a story.
        </p>
        <div class="home-stats">
          <div><strong>78+</strong><span>Projects Completed</span></div>
          <div><strong>104+</strong><span>Spaces Styled</span></div>
          <div><strong>80+</strong><span>Art Pieces Commissioned</span></div>
        </div>
      </div>
    </section>

    <section class="about-page">
      ${renderBrandMark('logo-header-right')}
      <div class="about-grid">
        <div class="about-copy">
          <p class="kicker">My Story</p>
          <h2>Built on beauty,<br/>driven by instinct</h2>
          <p class="about-lead">Most spaces are filled. Few are felt.</p>
          ${aboutStoryParagraphs.map((paragraph) => `<p class="about-text">${esc(paragraph)}</p>`).join('')}
        </div>
        <div class="about-portrait-wrap">
          <img class="about-portrait" src="${esc(ABOUT_PROFILE_IMAGE_URL)}" alt="Aayushi Shah" />
        </div>
      </div>
      ${renderBrandMark('logo-footer-left')}
    </section>

    ${caseStudySections}
  </body>
</html>`;

const outputPath = resolve(process.cwd(), 'dist', 'portfolio-top10-source.html');
writeFileSync(outputPath, html, 'utf8');

console.log(`Generated HTML: ${outputPath}`);
console.log(`Case studies included: ${topTenProjects.map((p) => p.id).join(', ')}`);
