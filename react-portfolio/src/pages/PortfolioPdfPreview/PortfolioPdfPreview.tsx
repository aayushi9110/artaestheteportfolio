import { useMemo, useState } from 'react';
import { PROJECTS } from '../../data/appData.ts';
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

  const projects = useMemo(() => pickTopProjects(), []);
  const generatedDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  const handleGeneratePdf = async () => {
    const exportRoot = document.getElementById('pdf-export-root');
    if (!exportRoot || isGenerating) {
      return;
    }

    setIsGenerating(true);
    try {
      const { default: html2pdf } = await import('html2pdf.js');

      await html2pdf()
        .set({
          filename: 'Art-Aesthete-Portfolio-Top10.pdf',
          margin: [8, 8, 8, 8],
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#f2f0ec' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        })
        .from(exportRoot)
        .save();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pdf-preview-shell">
      <header className="pdf-preview-toolbar">
        <div>
          <p className="pdf-preview-kicker">Portfolio PDF Preview</p>
          <h1>Top 10 Interior Case Studies</h1>
          <p>Review this endpoint and click Generate PDF to download from browser.</p>
        </div>
        <button className="pdf-generate-button" onClick={handleGeneratePdf} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate PDF'}
        </button>
      </header>

      <div id="pdf-export-root" className="pdf-document">
        <section className="pdf-page cover-page">
          <div className="cover-inner">
            <div>
              <p className="brand">Art Aesthete</p>
              <h2>Portfolio Selection</h2>
              <p className="subtitle">
                Curated PDF portfolio with the top 10 interior case studies and 3 key visuals per project.
              </p>
            </div>
            <div className="cover-footer">
              <span>Aayushi Shah</span>
              <span>{generatedDate}</span>
            </div>
          </div>
        </section>

        {projects.map((project, index) => {
          const images = getTopThreeImages(project);

          return (
            <section key={project.id} className="pdf-page case-study-page">
              <header className="page-header">
                <div>
                  <p className="kicker">Case Study {index + 1}</p>
                  <h3>{project.title}</h3>
                  <p className="location">{project.location}</p>
                </div>
                <p className="story-type">Interior Design</p>
              </header>

              <p className="overview-title">{project.overviewTitle}</p>
              <p className="overview-text">{project.overviewTextPrimary}</p>
              <p className="overview-text secondary">{project.overviewTextSecondary}</p>

              <div className="chips">
                {project.tagLabels.slice(0, 5).map((tag) => (
                  <span key={`${project.id}-${tag}`} className="chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="image-grid">
                {images.map((image, imageIndex) => (
                  <figure key={`${project.id}-${image.url}`} className={`image-card image-${imageIndex + 1}`}>
                    <img src={image.url} alt={`${project.title} ${imageIndex + 1}`} loading="lazy" />
                    <figcaption>{image.caption || `Project view ${imageIndex + 1}`}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioPdfPreview;
