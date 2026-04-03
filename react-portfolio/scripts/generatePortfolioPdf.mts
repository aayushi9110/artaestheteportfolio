import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECTS } from '../src/pages/CaseStudy/caseStudyData.ts';
import { RESOURCES } from '../src/data/appData.ts';
import { CONTENT } from '../src/data/contentData.ts';

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
  isSelectedForPdf: boolean;
};

const projectEntries = Object.entries(PROJECTS).map(([id, project]) => ({
  id,
  ...project,
})) as ProjectEntry[];

const topTenProjects = projectEntries
  .filter((project) => project.storyType === 'interior' && project.isSelectedForPdf)
  .sort((a, b) => {
    if (a.homeVisibilityPriority !== b.homeVisibilityPriority) {
      return a.homeVisibilityPriority - b.homeVisibilityPriority;
    }

    return a.title.localeCompare(b.title);
  });

const imageCandidates = (project: ProjectEntry): { url: string; caption: string }[] => {
  const featured = { url: project.heroImageUrl, caption: CONTENT.pdf.imageCaptions.featured };
  const before = { url: project.beforeImageUrl, caption: CONTENT.pdf.imageCaptions.before };
  const after = { url: project.afterImageUrl, caption: CONTENT.pdf.imageCaptions.after };

  const topPool = [featured, ...project.galleryItems].filter(
    (item) => item.url && item.url !== before.url && item.url !== after.url
  );
  const topUnique = new Map<string, { url: string; caption: string }>();
  for (const item of topPool) {
    if (!item.url || topUnique.has(item.url)) {
      continue;
    }
    topUnique.set(item.url, item);
    if (topUnique.size === 2) {
      break;
    }
  }

  const topImages = Array.from(topUnique.values());
  const fallbackTopOne = topImages[0] ?? featured;
  const fallbackTopTwo = topImages[1] ?? fallbackTopOne;

  return [
    topImages[0] ?? fallbackTopOne,
    topImages[1] ?? fallbackTopTwo,
    before.url ? before : fallbackTopOne,
    after.url ? after : fallbackTopTwo,
  ];
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
const LOGO_LIGHT_URL = '/images/logos/artAesthetewh.png';

const renderBrandMark = (positionClass: 'logo-home-left' | 'logo-header-right' | 'logo-footer-left', tone: 'dark' | 'light' = 'dark'): string => {
  const toneClass = tone === 'light' ? 'brand-light' : 'brand-dark';
  const logoUrl = tone === 'light' ? LOGO_LIGHT_URL : LOGO_DARK_URL;

  return `
    <div class="pdf-brand ${positionClass} ${toneClass}">
      <img class="n-logo-mark" src="${esc(logoUrl)}" alt="${esc(CONTENT.brand.logoAlt)}" />
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
        ${renderBrandMark('logo-header-right', 'light')}
        <header class="page-header">
          <div>
            <p class="kicker">${esc(CONTENT.pdf.caseStudyLabelPrefix)} ${index + 1}</p>
            <h2>${esc(project.title)}</h2>
            <p class="location">
              <span class="location-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" role="presentation">
                  <path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
              </span>
              ${esc(project.location)}
            </p>
          </div>
          <div class="chips header-chips">${tags}</div>
        </header>

        <p class="overview-title">${esc(project.overviewTitle)}</p>
        <p class="overview-text">${esc(project.overviewTextPrimary)}</p>
        <p class="overview-text secondary">${esc(project.overviewTextSecondary)}</p>

        <div class="image-grid">${imageMarkup}</div>
        ${renderBrandMark('logo-footer-left')}
        <a class="footer-url" href="https://${esc(CONTENT.brand.siteUrl)}" target="_blank" rel="noopener noreferrer">${esc(CONTENT.brand.siteUrl)}</a>
      </section>
    `;
  })
  .join('');

const generatedDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const homeContent = CONTENT.home;
const aboutContent = CONTENT.about;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Art Aesthete Portfolio - Top 10 Case Studies</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet" />
    <style>${pdfStyles}</style>
  </head>
  <body>
    <section class="home-page">
      ${renderBrandMark('logo-home-left', 'light')}
      <div class="home-overlay"></div>
      <img class="home-bg" src="${esc(HOME_HERO_IMAGE_URL)}" alt="Art Aesthete home hero" />
      <div class="home-content">
        <p class="home-punch">${esc(homeContent.punchline)}</p>
        <h1>
          ${homeContent.heroTitleLines.map((line) => `<span>${esc(line)}</span>`).join('')}
        </h1>
        <p class="subtitle">${esc(homeContent.heroDescription)}</p>
        <div class="home-stats">
          ${homeContent.stats.map((item) => `<div><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="about-page">
      ${renderBrandMark('logo-header-right', 'light')}
      <div class="about-grid">
        <div class="about-copy">
          <p class="kicker">${esc(aboutContent.kicker)}</p>
          ${aboutContent.storyParagraphs.map((paragraph) => `<p class="about-text">${esc(paragraph)}</p>`).join('')}
        </div>
        <div class="about-portrait-wrap">
          <img class="about-portrait" src="${esc(ABOUT_PROFILE_IMAGE_URL)}" alt="Aayushi Shah" />
        </div>
      </div>
      ${renderBrandMark('logo-footer-left')}
      <a class="footer-url" href="https://${esc(CONTENT.brand.siteUrl)}" target="_blank" rel="noopener noreferrer">${esc(CONTENT.brand.siteUrl)}</a>
    </section>

    ${caseStudySections}
  </body>
</html>`;

const outputPath = resolve(process.cwd(), 'dist', 'portfolio-top10-source.html');
writeFileSync(outputPath, html, 'utf8');

console.log(`Generated HTML: ${outputPath}`);
console.log(`Case studies included: ${topTenProjects.map((p) => p.id).join(', ')}`);
