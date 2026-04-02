import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECTS } from '../src/pages/CaseStudy/caseStudyData.ts';

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
        <header class="page-header">
          <div>
            <p class="kicker">Case Study ${index + 1}</p>
            <h2>${esc(project.title)}</h2>
            <p class="location">${esc(project.location)}</p>
          </div>
          <p class="story-type">${project.storyType === 'interior' ? 'Interior Design' : 'Fine Art'}</p>
        </header>

        <p class="overview-title">${esc(project.overviewTitle)}</p>
        <p class="overview-text">${esc(project.overviewTextPrimary)}</p>
        <p class="overview-text secondary">${esc(project.overviewTextSecondary)}</p>

        <div class="chips">${tags}</div>

        <div class="image-grid">${imageMarkup}</div>
      </section>
    `;
  })
  .join('');

const generatedDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Art Aesthete Portfolio - Top 10 Case Studies</title>
    <style>
      @page {
        size: A4 landscape;
        margin: 11mm;
      }

      :root {
        --ink: #1f2522;
        --muted: #55615c;
        --paper: #f2f0ec;
        --accent: #8a5a3c;
        --accent-soft: #d8c2af;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: "Georgia", "Times New Roman", serif;
        color: var(--ink);
        background: var(--paper);
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .cover-page,
      .case-study-page {
        min-height: calc(210mm - 22mm);
        padding: 14mm;
        background: linear-gradient(160deg, #f7f3ed 0%, #ece6de 65%, #e4dacd 100%);
        border: 1px solid #d8cfc2;
        page-break-after: always;
        position: relative;
        overflow: hidden;
      }

      .cover-page::before,
      .case-study-page::before {
        content: "";
        position: absolute;
        inset: 8mm;
        border: 1px solid rgba(138, 90, 60, 0.25);
        pointer-events: none;
      }

      .cover-inner {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100%;
      }

      .brand {
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--muted);
        font-size: 11px;
        margin-bottom: 16mm;
      }

      h1 {
        font-size: 44px;
        line-height: 1.07;
        margin: 0;
        max-width: 520px;
        font-weight: 500;
      }

      .subtitle {
        margin-top: 10mm;
        font-size: 15px;
        color: #36413d;
        max-width: 540px;
        line-height: 1.45;
      }

      .cover-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: var(--muted);
        border-top: 1px solid #ccb9a8;
        padding-top: 6mm;
      }

      .page-header {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 8mm;
      }

      .kicker {
        text-transform: uppercase;
        letter-spacing: 0.09em;
        font-size: 10px;
        color: var(--muted);
        margin: 0 0 2mm;
      }

      h2 {
        margin: 0;
        font-size: 29px;
        line-height: 1.15;
        max-width: 440px;
      }

      .location {
        margin: 3mm 0 0;
        color: #34403b;
        font-size: 13px;
      }

      .story-type {
        margin: 0;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #6f7c76;
      }

      .overview-title {
        margin: 7mm 0 4mm;
        font-weight: 600;
        font-size: 17px;
        line-height: 1.35;
        max-width: 92%;
      }

      .overview-text {
        margin: 0 0 3mm;
        color: #2b3531;
        font-size: 13px;
        line-height: 1.55;
      }

      .secondary {
        color: #47534e;
      }

      .chips {
        display: flex;
        gap: 2mm;
        flex-wrap: wrap;
        margin: 5mm 0 7mm;
      }

      .chip {
        border: 1px solid #c8b49f;
        background: rgba(255, 255, 255, 0.56);
        color: #39453f;
        font-size: 10px;
        padding: 1.5mm 2.5mm;
        border-radius: 999px;
      }

      .image-grid {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        grid-template-rows: 52mm 36mm;
        gap: 4mm;
      }

      .image-card {
        margin: 0;
        background: #fefcf9;
        display: flex;
        flex-direction: column;
      }

      .image-1 {
        grid-row: 1 / span 2;
      }

      .image-card img {
        width: 100%;
        height: 100%;
        min-height: 0;
        object-fit: cover;
        flex: 1;
      }

      .image-card figcaption {
        border-top: 1px solid #d8cfc3;
        font-size: 10px;
        color: #4c5953;
        padding: 2.2mm 2.8mm;
      }
    </style>
  </head>
  <body>
    <section class="cover-page">
      <div class="cover-inner">
        <div>
          <p class="brand">Art Aesthete</p>
          <h1>Portfolio Selection</h1>
          <p class="subtitle">
            Curated PDF portfolio with the top 10 case studies and 3 key visuals per project.
            Crafted for quick recruiter review while preserving the tone and visual language of the website.
          </p>
        </div>

        <div class="cover-footer">
          <span>Aayushi Shah</span>
          <span>${esc(generatedDate)}</span>
        </div>
      </div>
    </section>

    ${caseStudySections}
  </body>
</html>`;

const outputPath = resolve(process.cwd(), 'dist', 'portfolio-top10-source.html');
writeFileSync(outputPath, html, 'utf8');

console.log(`Generated HTML: ${outputPath}`);
console.log(`Case studies included: ${topTenProjects.map((p) => p.id).join(', ')}`);
