import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECTS, PROJECT_DETAIL_METRICS } from './caseStudyData.ts';
import './CaseStudy.css';

type CaseStudyProps = {
  showInteriorView?: boolean;
};

const CaseStudy = ({ showInteriorView = true }: CaseStudyProps) => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const projectKey = id && PROJECTS[id] ? id : 'homeOffices';
  const project = PROJECTS[projectKey];
  const [comparePosition, setComparePosition] = useState(50);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [carouselPauseUntil, setCarouselPauseUntil] = useState<number>(0);
  const lbTouchStartX = useRef<number | null>(null);

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
    setCarouselPauseUntil(0);
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

  const galleryItems = project.galleryItems;
  const galleryUrls = galleryItems.map((galleryItem) => galleryItem.url);
  const galleryCaptions = galleryItems.map((galleryItem) => galleryItem.caption);
  const totalImages = galleryUrls.length;
  const previousImageIndex = totalImages ? (activeImageIndex - 1 + totalImages) % totalImages : -1;
  const nextImageIndex = totalImages ? (activeImageIndex + 1) % totalImages : -1;
  const isCarouselTemporarilyPaused = carouselPauseUntil > Date.now();

  const filteredProjectDetailMetrics = showInteriorView ? (PROJECT_DETAIL_METRICS[projectKey] ?? []) : [];
  const hasProjectDetailMetrics = filteredProjectDetailMetrics.length > 0;

  useEffect(() => {
    if (totalImages <= 1 || isCarouselHovered || expandedImageIndex !== null || isCarouselTemporarilyPaused) {
      return;
    }

    const autoRotateId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, 3000);

    return () => window.clearInterval(autoRotateId);
  }, [id, totalImages, isCarouselHovered, expandedImageIndex, isCarouselTemporarilyPaused]);

  useEffect(() => {
    if (!isCarouselTemporarilyPaused) {
      return;
    }

    const remainingPauseMs = Math.max(0, carouselPauseUntil - Date.now());
    const resumeTimer = window.setTimeout(() => {
      setCarouselPauseUntil(0);
    }, remainingPauseMs);

    return () => window.clearTimeout(resumeTimer);
  }, [carouselPauseUntil, isCarouselTemporarilyPaused]);

  useEffect(() => {
    if (expandedImageIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedImageIndex(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevExpandedImage();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNextExpandedImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedImageIndex, totalImages]);

  useEffect(() => {
    if (totalImages <= 1 || expandedImageIndex !== null) {
      return;
    }

    const handleCarouselArrowKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const targetTag = target?.tagName.toLowerCase();

      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevImage();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener('keydown', handleCarouselArrowKeys);
    return () => window.removeEventListener('keydown', handleCarouselArrowKeys);
  }, [totalImages, expandedImageIndex]);

  const goToImage = (index: number) => {
    if (index < 0 || index >= totalImages) {
      return;
    }
    setActiveImageIndex(index);
  };

  const goToImageFromThumbnail = (index: number) => {
    goToImage(index);
    setCarouselPauseUntil(Date.now() + 10_000);
  };

  const showPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  const showPrevExpandedImage = () => {
    setExpandedImageIndex((prev) => {
      if (prev === null) {
        return prev;
      }

      const nextIndex = (prev - 1 + totalImages) % totalImages;
      setActiveImageIndex(nextIndex);
      return nextIndex;
    });
  };

  const showNextExpandedImage = () => {
    setExpandedImageIndex((prev) => {
      if (prev === null) {
        return prev;
      }

      const nextIndex = (prev + 1) % totalImages;
      setActiveImageIndex(nextIndex);
      return nextIndex;
    });
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
              <img className="cs-ba-img" src={project.afterImageUrl} alt="After" loading="lazy" />
              <div
                className="cs-ba-after"
                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
              >
                <img className="cs-ba-img" src={project.beforeImageUrl} alt="Before" loading="lazy" />
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
        <div className={`cs-overview reveal ${hasProjectDetailMetrics ? '' : 'no-deliverables'}`.trim()}>
          <div className="cs-overview-txt">
            <span className="sec-label">Project Overview</span>
            <h3>{project.overviewTitle}</h3>
            <p>{project.overviewTextPrimary}</p>
            <p>{project.overviewTextSecondary}</p>
          </div>
          {hasProjectDetailMetrics && (
            <aside className="cs-overview-details" aria-label="Project details">
              <ul className="cs-overview-details-list">
                {filteredProjectDetailMetrics.map((metric) => (
                  <li className="cs-overview-details-item" key={metric.label}>
                    <span className="cs-overview-details-label">{metric.label}</span>
                    <strong className="cs-overview-details-value">{metric.value}</strong>
                  </li>
                ))}
              </ul>
            </aside>
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
              {galleryUrls.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className={`cs-carousel-slide ${activeImageIndex === i ? 'active' : ''}`.trim()}
                  aria-hidden={activeImageIndex !== i}
                >
                  {(i === activeImageIndex || i === previousImageIndex || i === nextImageIndex) && (
                    <img
                      className="cs-carousel-image"
                      src={img}
                      alt={`${project.title} - final result ${i + 1}`}
                      loading={i === activeImageIndex ? 'eager' : 'lazy'}
                      onClick={() => setExpandedImageIndex(i)}
                    />
                  )}
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

            <div className="cs-carousel-caption" aria-live="polite">
              <span>{galleryCaptions[activeImageIndex] || ''}</span>
            </div>

            <div className="cs-carousel-thumbs" aria-label="Final result thumbnails">
              {galleryUrls.map((img, i) => (
                <button
                  key={`thumb-${img}-${i}`}
                  className={`cs-carousel-thumb ${activeImageIndex === i ? 'active' : ''}`.trim()}
                  onClick={() => goToImageFromThumbnail(i)}
                  aria-label={`Show final result thumbnail ${i + 1}`}
                  aria-current={activeImageIndex === i ? 'true' : undefined}
                >
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
        {expandedImageIndex !== null && (
          <div
            className="cs-lightbox"
            onClick={() => setExpandedImageIndex(null)}
            onTouchStart={(e) => { lbTouchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (lbTouchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - lbTouchStartX.current;
              lbTouchStartX.current = null;
              if (Math.abs(dx) < 40) return;
              if (dx < 0) showNextExpandedImage();
              else showPrevExpandedImage();
            }}
          >
            {totalImages > 1 && (
              <>
                <button
                  className="cs-lightbox-nav cs-lightbox-prev"
                  aria-label="Show previous preview image"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrevExpandedImage();
                  }}
                >
                  ‹
                </button>
                <button
                  className="cs-lightbox-nav cs-lightbox-next"
                  aria-label="Show next preview image"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNextExpandedImage();
                  }}
                >
                  ›
                </button>
              </>
            )}
            <button
              className="cs-lightbox-close"
              aria-label="Close expanded image"
              onClick={() => setExpandedImageIndex(null)}
            >
              ✕
            </button>
            <img
              className="cs-lightbox-image"
              src={galleryUrls[expandedImageIndex]}
              alt={`${project.title} - expanded final result ${expandedImageIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="cs-lightbox-cap" onClick={(e) => e.stopPropagation()}>
              {galleryCaptions[expandedImageIndex] || ''}
            </div>
          </div>
        )}
        <div className="cs-cta">
          <p>Inspired by this project?</p>
          <button className="btn-tr" onClick={() => navigate('/book')}><span>Start Your Project</span></button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;