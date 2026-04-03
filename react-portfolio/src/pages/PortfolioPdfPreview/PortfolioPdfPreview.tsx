import { useMemo, useState } from 'react';
import { PROJECTS, RESOURCES } from '../../data/appData.ts';
import { CONTENT } from '../../data/contentData.ts';
import './PortfolioPdfPreview.css';

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

const pickTopProjects = (): ProjectEntry[] => {
  const entries = Object.entries(PROJECTS).map(([id, project]) => ({ id, ...project })) as ProjectEntry[];

  return entries
    .filter((project) => project.storyType === 'interior' && project.isSelectedForPdf)
    .sort((a, b) => {
      if (a.homeVisibilityPriority !== b.homeVisibilityPriority) {
        return a.homeVisibilityPriority - b.homeVisibilityPriority;
      }
      return a.title.localeCompare(b.title);
    });
};

const getTopFourImages = (project: ProjectEntry): { url: string; caption: string }[] => {
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

const PortfolioPdfPreview = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const homeContent = CONTENT.home;
  const aboutContent = CONTENT.about;
  const pdfContent = CONTENT.pdf;

  const renderMetricValue = (value: string) => {
    const hasPlus = value.endsWith('+');
    const baseValue = hasPlus ? value.slice(0, -1) : value;

    return (
      <>
        {baseValue}
        {hasPlus ? <span className="home-stat-plus">+</span> : null}
      </>
    );
  };

  const renderBrandMark = (positionClass: 'logo-home-left' | 'logo-header-right' | 'logo-footer-left', tone: 'dark' | 'light' = 'dark') => (
    <div className={`pdf-brand ${positionClass} ${tone === 'light' ? 'brand-light' : 'brand-dark'}`}>
      <img className="n-logo-mark" src={tone === 'light' ? '/images/logos/artAesthetewh.png' : '/images/logos/artAesthete.png'} alt={CONTENT.brand.logoAlt} />
      <span className="brand-wordmark">
        Art <span>Aesthete <span className="byaayushi">By Aayushi</span></span>
      </span>
    </div>
  );
  const projects = useMemo(() => pickTopProjects(), []);
  const aboutStoryParagraphs = aboutContent.storyParagraphs;

  const handleGeneratePdf = async () => {
    const exportRoot = document.getElementById('pdf-export-root');
    if (!exportRoot || isGenerating) {
      return;
    }

    exportRoot.classList.add('is-exporting');
    setGenerationError(null);
    setIsGenerating(true);
    try {
      const { default: html2pdf } = await import('html2pdf.js');

      await html2pdf()
        .set({
          filename: pdfContent.fileName,
          margin: [0, 0, 0, 0],
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#f2f0ec' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
          pagebreak: { mode: ['css', 'legacy'] },
        } as any)
        .from(exportRoot)
        .save();
    } catch (error) {
      // Surface failures that previously looked like a no-op when html2pdf/image capture fails.
      console.error('Failed to generate PDF:', error);
      setGenerationError('PDF generation failed. Please refresh and try again.');
    } finally {
      exportRoot.classList.remove('is-exporting');
      setIsGenerating(false);
    }
  };

  return (
    <div className="pdf-preview-shell">
      <header className="pdf-preview-toolbar">
        <div>
          <p>{pdfContent.toolbarHint}</p>
        </div>
        <button className="pdf-generate-button" onClick={handleGeneratePdf} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate PDF'}
        </button>
      </header>
      {generationError ? <p className="pdf-generation-error">{generationError}</p> : null}

      <div id="pdf-export-root" className="pdf-document">
        <section className="pdf-page home-page">
          {renderBrandMark('logo-home-left', 'light')}
          <div className="home-overlay" />
          <img className="home-bg" src={RESOURCES.home.heroImageUrl} alt="Art Aesthete home hero" />
          <div className="home-content">
            <p className="home-punch">{homeContent.punchline}</p>
            <h1>
              {homeContent.heroTitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="subtitle">{homeContent.heroDescription}</p>

            <div className="home-stats">
              <div>
                <strong>{renderMetricValue(homeContent.stats[0].value)}</strong>
                <span>{homeContent.stats[0].label}</span>
              </div>
              <div>
                <strong>{renderMetricValue(homeContent.stats[1].value)}</strong>
                <span>{homeContent.stats[1].label}</span>
              </div>
              <div>
                <strong>{renderMetricValue(homeContent.stats[2].value)}</strong>
                <span>{homeContent.stats[2].label}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pdf-page about-page">
          {renderBrandMark('logo-header-right', 'light')}
          <div className="about-grid">
            <div className="about-copy">
              <h2>{aboutContent.heading}</h2>
              {aboutStoryParagraphs.map((paragraph) => (
                <p className="about-text" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about-portrait-wrap">
              <img className="about-portrait" src={RESOURCES.about.profileImageUrl} alt="Aayushi Shah" />
            </div>
          </div>
          {renderBrandMark('logo-footer-left')}
          <a className="footer-url" href={`https://${CONTENT.brand.siteUrl}`} target="_blank" rel="noopener noreferrer">{CONTENT.brand.siteUrl}</a>
        </section>

        <section className="pdf-page toc-page">
          {renderBrandMark('logo-header-right', 'light')}
          <header className="page-header">
            <div>
                <p className="kicker">Portfolio Flow</p>
                <h2>Table of Contents (1)</h2>
                {/* <p className="location"></p> */}
            </div>
          </header>
          <div className="toc-layout">
            <div className="toc-timeline" role="list" aria-label="Portfolio project contents">
              {projects.slice(0, 7).map((project, index) => {
                const projectNumber = String(index + 1).padStart(2, '0');
                const isLeftAligned = index % 2 === 0;

                return (
                  <article
                    key={`toc-${project.id}`}
                    className={`toc-item ${isLeftAligned ? 'toc-item-left' : 'toc-item-right'}`}
                    role="listitem"
                  >
                    <div className="toc-marker" aria-hidden="true">
                      <span />
                    </div>
                    <div className="toc-card">
                      <p className="toc-item-label">Project {projectNumber}</p>
                      <h3>{project.title}</h3>
                      <p className="toc-item-location">{project.location}</p>
                    </div>
                    
                  </article>
                );
              })}
            </div>
          </div>
          {renderBrandMark('logo-footer-left')}
          <a className="footer-url" href={`https://${CONTENT.brand.siteUrl}`} target="_blank" rel="noopener noreferrer">{CONTENT.brand.siteUrl}</a>
        </section>

        {projects.length > 7 && (
          <section className="pdf-page toc-page">
            {renderBrandMark('logo-header-right', 'light')}
            <header className="page-header">
              <div>
                  <p className="kicker">Portfolio Flow</p>
                  <h2>Table of Contents (2)</h2>
                  {/* <p className="location"></p> */}
              </div>
            </header>
            <div className="toc-layout">
              <div className="toc-timeline" role="list" aria-label="Portfolio project contents continued">
                {projects.slice(7).map((project, index) => {
                  const projectNumber = String(index + 8).padStart(2, '0');
                  const isLeftAligned = index % 2 === 0;

                  return (
                    <article
                      key={`toc-${project.id}`}
                      className={`toc-item ${isLeftAligned ? 'toc-item-left' : 'toc-item-right'}`}
                      role="listitem"
                    >
                      <div className="toc-marker" aria-hidden="true">
                        <span />
                      </div>
                      <div className="toc-card">
                        <p className="toc-item-label">Project {projectNumber}</p>
                        <h3>{project.title}</h3>
                        <p className="toc-item-location">{project.location}</p>
                      </div>
                      
                    </article>
                  );
                })}
              </div>
            </div>
            {renderBrandMark('logo-footer-left')}
            <a className="footer-url" href={`https://${CONTENT.brand.siteUrl}`} target="_blank" rel="noopener noreferrer">{CONTENT.brand.siteUrl}</a>
          </section>
        )}

        {projects.map((project, index) => {
          const images = getTopFourImages(project);

          return (
            <section key={project.id} className="pdf-page case-study-page">
              {renderBrandMark('logo-header-right', 'light')}
              <header className="page-header">
                <div>
                  <p className="kicker">{pdfContent.caseStudyLabelPrefix} {index + 1}</p>
                  <h2>{project.title}</h2>
                  <p className="location">
                    <span className="location-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false" role="presentation">
                        <path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    </span>
                    {project.location}
                  </p>
                </div>
                <div className="chips header-chips">
                  {project.tagLabels.slice(0, 5).map((tag) => (
                    <span key={`${project.id}-${tag}`} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <p className="overview-title">{project.overviewTitle}</p>
              <p className="overview-text">{project.overviewTextPrimary}</p>
              <p className="overview-text secondary">{project.overviewTextSecondary}</p>

              <div className="image-grid">
                {images.map((image, imageIndex) => (
                  <figure key={`${project.id}-${imageIndex}`} className={`image-card image-${imageIndex + 1}`}>
                    <img src={image.url} alt={`${project.title} ${imageIndex + 1}`} loading="lazy" />
                    <figcaption>{image.caption || `Project view ${imageIndex + 1}`}</figcaption>
                  </figure>
                ))}
              </div>
              {renderBrandMark('logo-footer-left')}
              <a className="footer-url" href={`https://${CONTENT.brand.siteUrl}`} target="_blank" rel="noopener noreferrer">{CONTENT.brand.siteUrl}</a>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioPdfPreview;
