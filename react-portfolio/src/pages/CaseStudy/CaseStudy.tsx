import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECTS } from './caseStudyData.ts';
import './CaseStudy.css';

type CaseStudyProps = {
  showInteriorView?: boolean;
};

const CaseStudy = ({ showInteriorView = true }: CaseStudyProps) => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const project = PROJECTS[id || ''] || PROJECTS.amber;
  const [comparePosition, setComparePosition] = useState(50);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal, .rl, .rr, .rs').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [id]);

  useEffect(() => {
    setComparePosition(50);
    setActiveImageIndex(0);
    setExpandedImageIndex(null);
    setIsCarouselHovered(false);
    setHasInteracted(false);
  }, [id]);

  useEffect(() => {
    if (!showInteriorView) {
      return;
    }

    if (hasInteracted) {
      setIsAutoSliding(false);
      return;
    }

    const steps = [18, 82, 26, 74, 50];
    let stepIndex = 0;
    const stepIntervalMs = 1700;
    let intervalId: number | undefined;

    setIsAutoSliding(true);

    const startTimeout = window.setTimeout(() => {
      setComparePosition(steps[stepIndex]);
      stepIndex = (stepIndex + 1) % steps.length;

      intervalId = window.setInterval(() => {
        setComparePosition(steps[stepIndex]);
        stepIndex = (stepIndex + 1) % steps.length;
      }, stepIntervalMs);
    }, 1100);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [id, hasInteracted, showInteriorView]);

  const markInteracted = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsAutoSliding(false);
    }
  };

  const handleCompareChange = (value: number) => {
    markInteracted();
    setComparePosition(value);
  };

  const totalImages = project.galleryImageUrls.length;

  useEffect(() => {
    if (totalImages <= 1 || isCarouselHovered || expandedImageIndex !== null) {
      return;
    }

    const autoRotateId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, 3000);

    return () => window.clearInterval(autoRotateId);
  }, [id, totalImages, isCarouselHovered, expandedImageIndex]);

  useEffect(() => {
    if (expandedImageIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedImageIndex]);

  const goToImage = (index: number) => {
    if (index < 0 || index >= totalImages) {
      return;
    }
    setActiveImageIndex(index);
  };

  const showPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <div id="pg-case-study" className="pg on">
      <div className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: `url(${project.heroImageUrl})` }}></div>
        <div className="cs-hero-c">
          <button className="page-back" onClick={() => navigate('/portfolio')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> Back to Portfolio
          </button>
          <h1>{project.title}</h1>
          <div className="cs-tagLabels">
            {project.tagLabels.map((tag) => <span key={tag} className="cs-tag">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="cs-body">
        {showInteriorView && (<div className="cs-loc">{project.location}</div>)}
        {showInteriorView && (
          <div className="cs-ba">
            <div className={`cs-ba-compare ${isAutoSliding ? 'auto-sliding' : ''}`}>
              <img className="cs-ba-img" src={project.afterImageUrl} alt="After" />
              <div className="cs-ba-after" style={{ width: `${comparePosition}%` }}>
                <img className="cs-ba-img" src={project.beforeImageUrl} alt="Before" />
              </div>

              <div className="cs-ba-divider" style={{ left: `${comparePosition}%` }} aria-hidden="true">
                <span className="cs-ba-handle">↔</span>
              </div>

              <div className="cs-ba-lbl cs-ba-lbl-left">Before</div>
              <div className="cs-ba-lbl cs-ba-lbl-right">After</div>

              <input
                className="cs-ba-range"
                type="range"
                min={0}
                max={100}
                value={comparePosition}
                onChange={(e) => handleCompareChange(Number(e.target.value))}
                onPointerDown={markInteracted}
                onKeyDown={markInteracted}
                aria-label="Before and after comparison slider"
              />
            </div>
          </div>
        )}
        <div className="cs-overview reveal">
          <div className="cs-overview-txt">
            <span className="sec-label">Project Overview</span>
            <h3>{project.overviewTitle}</h3>
            <p>{project.overviewTextPrimary}</p>
            <p>{project.overviewTextSecondary}</p>
          </div>
          {showInteriorView && (
            <div className="cs-deliverableItems">
              <span className="sec-label">Deliverables</span>
              <h3>What we provided</h3>
              <ul className="cs-dl-list">
                {project.deliverableItems.map((item) => (
                  <li key={item.text}><span className="dl-ico">{item.icon}</span>{item.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="cs-gallery reveal">
          {showInteriorView && ( <span className="sec-label">Final Result</span> )}
          {showInteriorView && ( <h3>The finished space</h3> )}
          {!showInteriorView && ( <h3>The finished Artwork</h3> )}
          <div className="cs-carousel">
            <div
              className="cs-carousel-frame"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              {project.galleryImageUrls.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className={`cs-carousel-slide ${activeImageIndex === i ? 'active' : ''}`.trim()}
                  aria-hidden={activeImageIndex !== i}
                >
                  <img
                    className="cs-carousel-image"
                    src={img}
                    alt={`${project.title} - final result ${i + 1}`}
                    onClick={() => setExpandedImageIndex(i)}
                  />
                  <div className="cs-carousel-overlay">
                    <span>{project.galleryCaptions[i] || ''}</span>
                  </div>
                </div>
              ))}
              <button
                className="cs-carousel-nav cs-carousel-prev"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showPrevImage();
                }}
                aria-label="Show previous final result image"
              >
                ‹
              </button>
              <button
                className="cs-carousel-nav cs-carousel-next"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showNextImage();
                }}
                aria-label="Show next final result image"
              >
                ›
              </button>
            </div>

            <div className="cs-carousel-thumbs" aria-label="Final result thumbnails">
              {project.galleryImageUrls.map((img, i) => (
                <button
                  key={`thumb-${img}-${i}`}
                  className={`cs-carousel-thumb ${activeImageIndex === i ? 'active' : ''}`.trim()}
                  onClick={() => goToImage(i)}
                  aria-label={`Show final result thumbnail ${i + 1}`}
                  aria-current={activeImageIndex === i ? 'true' : undefined}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
        {expandedImageIndex !== null && (
          <div className="cs-lightbox" onClick={() => setExpandedImageIndex(null)}>
            <button
              className="cs-lightbox-close"
              aria-label="Close expanded image"
              onClick={() => setExpandedImageIndex(null)}
            >
              ✕
            </button>
            <img
              className="cs-lightbox-image"
              src={project.galleryImageUrls[expandedImageIndex]}
              alt={`${project.title} - expanded final result ${expandedImageIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="cs-lightbox-cap" onClick={(e) => e.stopPropagation()}>
              {project.galleryCaptions[expandedImageIndex] || ''}
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', padding: '72px 0 20px' }}>
          <p style={{ fontWeight: 300, fontSize: '.88rem', color: 'var(--taupe)', marginBottom: '24px' }}>Inspired by this project?</p>
          <button className="btn-tr" onClick={() => navigate('/book')}><span>Start Your Project</span></button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;