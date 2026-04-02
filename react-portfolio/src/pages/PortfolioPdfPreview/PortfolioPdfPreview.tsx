import { useMemo, useState } from 'react';
import { PROJECTS, RESOURCES } from '../../data/appData.ts';
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
};

const pickTopProjects = (): ProjectEntry[] => {
  const entries = Object.entries(PROJECTS).map(([id, project]) => ({ id, ...project })) as ProjectEntry[];

  return entries
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
};

const getTopThreeImages = (project: ProjectEntry): { url: string; caption: string }[] => {
  const selected = [
    { url: project.afterImageUrl, caption: 'After view' },
    { url: project.beforeImageUrl, caption: 'Before view' },
    { url: project.heroImageUrl, caption: 'Featured view' },
    ...project.galleryItems,
  ];

  const unique = new Map<string, { url: string; caption: string }>();
  for (const item of selected) {
    if (!item.url || unique.has(item.url)) {
      continue;
    }
    unique.set(item.url, item);
  }

  return Array.from(unique.values()).slice(0, 3);
};

const PortfolioPdfPreview = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const renderBrandMark = (positionClass: 'logo-home-left' | 'logo-header-right' | 'logo-footer-left', tone: 'dark' | 'light' = 'dark') => (
    <div className={`pdf-brand ${positionClass} ${tone === 'light' ? 'brand-light' : 'brand-dark'}`}>
      <img className="n-logo-mark" src="/images/logos/artAesthete.png" alt="Art Aesthete logo" />
      <span className="brand-wordmark">
        Art <span>Aesthete <span className="byaayushi">By Aayushi</span></span>
      </span>
    </div>
  );
  const projects = useMemo(() => pickTopProjects(), []);
  const aboutStoryParagraphs = useMemo(
    () => [
      'Hi, I am Aayushi Shah. I set out to find rooms that felt honest - spaces that did not pretend to be something they were not.',
      'Most people decorate their homes. I believe you should curate them. A decorated room fills space. A curated one commands it.',
      'Art Aesthete exists for the homeowner who is done settling for fine and is ready for a space that actually moves them.',
    ],
    []
  );

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
          filename: 'Art-Aesthete-Portfolio-Top10.pdf',
          margin: [0, 0, 0, 0],
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#f2f0ec' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
          pagebreak: { mode: ['avoid-all'] },
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
          <p>Review this endpoint and click Generate PDF to download from browser.</p>
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
            <p className="home-punch">Your space, your story, beautifully told</p>
            <h1>
              <span>Where Spaces</span>
              <span>Become</span>
              <span>Living Art</span>
            </h1>
            <p className="subtitle">
              We design interiors that feel as extraordinary as the people who inhabit them.
              Every detail is intentional. Every room tells a story.
            </p>

            <div className="home-stats">
              <div>
                <strong>51<span className="home-stat-plus">+</span></strong>
                <span>Projects Completed</span>
              </div>
              <div>
                <strong>30<span className="home-stat-plus">+</span></strong>
                <span>Spaces Styled</span>
              </div>
              <div>
                <strong>55<span className="home-stat-plus">+</span></strong>
                <span>Art Pieces Commissioned</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pdf-page about-page">
          <div className="about-grid">
            <div className="about-copy">
              <p className="kicker">My Story</p>
              <h2>Built on beauty, driven by instinct</h2>
              <p className="about-lead">Most spaces are filled. Few are felt.</p>
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
          <a className="footer-url" href="https://www.byaayushi.com" target="_blank" rel="noopener noreferrer">www.byaayushi.com</a>
        </section>

        {projects.map((project, index) => {
          const images = getTopThreeImages(project);

          return (
            <section key={project.id} className="pdf-page case-study-page">
              {renderBrandMark('logo-header-right')}
              <header className="page-header">
                <div>
                  <p className="kicker">Project {index + 1}</p>
                  <h2>{project.title}</h2>
                  <p className="location">{project.location}</p>
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
                  <figure key={`${project.id}-${image.url}`} className={`image-card image-${imageIndex + 1}`}>
                    <img src={image.url} alt={`${project.title} ${imageIndex + 1}`} loading="lazy" />
                    <figcaption>{image.caption || `Project view ${imageIndex + 1}`}</figcaption>
                  </figure>
                ))}
              </div>
              {renderBrandMark('logo-footer-left')}
              <a className="footer-url" href="https://www.byaayushi.com" target="_blank" rel="noopener noreferrer">www.byaayushi.com</a>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioPdfPreview;
