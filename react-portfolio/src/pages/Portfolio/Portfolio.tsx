import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../CaseStudy/caseStudyData.ts';
import './Portfolio.css';

type GalleryItem = {
  id: string;
  storyType: 'interior' | 'fine-art';
  imageUrl: string;
  categoryLabel: string;
  title: string;
  summary: string;
};

const allPortfolioItems: GalleryItem[] = Object.entries(PROJECTS).map(([id, project]) => ({
  id,
  storyType: project.storyType,
  imageUrl: project.galleryImageUrls[0],
  categoryLabel: project.tagLabels[0],
  title: project.title,
  summary: project.overviewTextPrimary,
}));

const interiorItems: GalleryItem[] = allPortfolioItems.filter((item) => item.storyType === 'interior');
const fineArtItems: GalleryItem[] = allPortfolioItems.filter((item) => item.storyType === 'fine-art');

const Portfolio = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'interiors' | 'fineart'>('interiors');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const featuredItems = tab === 'interiors' ? interiorItems : fineArtItems;

  const getStoryPath = (item: GalleryItem) => {
    return item.storyType === 'fine-art' ? `/fine-art-story/${item.id}` : `/interior-story/${item.id}`;
  };

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
  }, []);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [tab]);

  useEffect(() => {
    if (isFeaturedHovered || featuredItems.length <= 1) {
      return;
    }
    const id = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [isFeaturedHovered, tab, featuredItems.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeItem]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div id="pg-portfolio" className="pg on">
      <div className="gall-hero">
        <div className="gall-hero-img"></div>
        <div className="gall-hero-c">
          <button className="page-back" onClick={() => navigate('/')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
            </svg> Back
          </button>
          {/* <span className="sec-label gold gall-loc">Selected Works</span> */}
          <h1>A curated collection<br/>of <em>spaces & stories</em></h1>
        </div>
      </div>
      <div className="gall-body">
        <div className="gall-tabs">
          <button className={`gtab ${tab === 'interiors' ? 'act' : ''}`} onClick={() => setTab('interiors')}>All Interiors</button>
          <button className={`gtab ${tab === 'fineart' ? 'act' : ''}`} onClick={() => setTab('fineart')}>Fine Art Gallery</button>
        </div>

        <div
          className="pf-carousel"
          onMouseEnter={() => setIsFeaturedHovered(true)}
          onMouseLeave={() => setIsFeaturedHovered(false)}
        >
          <div
            className="pf-carousel-images"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              setIsFeaturedHovered(true);
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) {
                  setFeaturedIndex((prev) => (prev + 1) % featuredItems.length);
                } else {
                  setFeaturedIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
                }
              }
              touchStartX.current = null;
              setIsFeaturedHovered(false);
            }}
          >
            {featuredItems.map((item, i) => (
              <div
                key={`${item.title}-slide`}
                className={`pf-carousel-slide ${featuredIndex === i ? 'active' : ''}`.trim()}
                aria-hidden={featuredIndex !== i}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="pf-carousel-img"
                  onClick={() => setActiveItem(item)}
                />
              </div>
            ))}
            <button
              className="pf-carousel-nav pf-carousel-prev"
              onClick={() => setFeaturedIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)}
              aria-label="Previous project"
            >‹</button>
            <button
              className="pf-carousel-nav pf-carousel-next"
              onClick={() => setFeaturedIndex((prev) => (prev + 1) % featuredItems.length)}
              aria-label="Next project"
            >›</button>
          </div>

          <div className="pf-carousel-info">
            <div className="pf-carousel-panels">
              {featuredItems.map((item, i) => (
                <div
                  key={`${item.title}-panel`}
                  className={`pf-carousel-panel ${featuredIndex === i ? 'active' : ''}`.trim()}
                  aria-hidden={featuredIndex !== i}
                >
                  <span className="sec-label pf-sec-loc">{item.categoryLabel}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="pf-carousel-actions">
                    <button className="btn-tr" onClick={() => navigate(getStoryPath(item))}>
                      <span>View Case Study</span>
                    </button>
                    <button className="pf-quick-view" onClick={() => setActiveItem(item)}>
                      Quick View
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pf-carousel-footer">
              <div className="pf-carousel-dots">
                {featuredItems.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    className={`pf-carousel-dot ${featuredIndex === i ? 'active' : ''}`.trim()}
                    onClick={() => setFeaturedIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
              <span className="pf-carousel-count">{featuredIndex + 1} / {featuredItems.length}</span>
            </div>
          </div>
        </div>

        <div className={`gall-section ${tab === 'interiors' ? 'on' : ''}`}>
          <div className="gall-grid int">
            {interiorItems.map((item) => (
              <div className="gi" key={`${item.title}-${item.imageUrl}`} onClick={() => setActiveItem(item)}>
                <div className="gi-img"><img src={item.imageUrl} alt={item.title}/></div>
                <div className="gi-ov">
                  <span className="gi-cat">{item.categoryLabel}</span>
                  <span className="gi-title">{item.title}</span>
                  <div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`gall-section ${tab === 'fineart' ? 'on' : ''}`}>
          <div className="gall-grid art">
            {fineArtItems.map((item) => (
              <div className="gi" key={`${item.title}-${item.imageUrl}`} onClick={() => setActiveItem(item)}>
                <div className="gi-img"><img src={item.imageUrl} alt={item.title}/></div>
                <div className="gi-ov">
                  <span className="gi-cat">{item.categoryLabel}</span>
                  <span className="gi-title">{item.title}</span>
                  <div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeItem && (
        <div className="gall-lightbox" onClick={() => setActiveItem(null)}>
          <div className="gall-lightbox-dialog" onClick={(event) => event.stopPropagation()}>
            <button className="gall-lightbox-close" onClick={() => setActiveItem(null)} aria-label="Close image preview">
              ×
            </button>
            <div className="gall-lightbox-img-wrap">
              <img src={activeItem.imageUrl} alt={activeItem.title} className="gall-lightbox-img"/>
            </div>
            <div className="gall-lightbox-meta">
              <span className="gall-lightbox-cat">{activeItem.categoryLabel}</span>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.summary}</p>
              <button
                className="btn-tr"
                onClick={() => {
                  navigate(getStoryPath(activeItem));
                  setActiveItem(null);
                }}
              >
                <span>View Full Case Study</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;