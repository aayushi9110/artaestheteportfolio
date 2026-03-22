import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/appData.ts';

type GalleryItem = {
  src: string;
  category: string;
  title: string;
  details: string;
  caseStudyId?: string;
};

const interiorItems: GalleryItem[] = [
  {
    src: '.',
    category: 'Interior Design · New York',
    title: 'The Amber Salon',
    details: 'A warm Manhattan living room transformation focused on layered textures, amber tones, and custom art placement.',
    caseStudyId: 'amber'
  },
  {
    src: '.',
    category: 'Interior Design · London',
    title: 'Warm Nordic Study',
    details: 'A calm and focused study designed with smoked oak shelving, tactile materials, and soft natural light.',
    caseStudyId: 'nordic'
  },
  {
    src: '.',
    category: 'Virtual Design · California',
    title: 'Terracotta Living',
    details: 'A coastal family home layered with terracotta accents, relaxed silhouettes, and durable natural finishes.',
    caseStudyId: 'terra'
  },
  {
    src: '.',
    category: 'Interior Design · Paris',
    title: 'Linen & Oak',
    details: 'A Paris apartment balancing heritage architecture with modern comfort through linen, oak, and subtle contrast.',
    caseStudyId: 'linen'
  },
  {
    src: '.',
    category: 'Interior Design · Dubai',
    title: 'The Sand Suite',
    details: 'A hospitality-inspired suite using tonal stone colors, sculptural lighting, and clean material transitions.',
    caseStudyId: 'sand'
  },
  {
    src: '.',
    category: 'Virtual Design · Sydney',
    title: 'Coastal Calm Living Room',
    details: 'An airy living space designed around flow, sunlight, and a calm palette that supports everyday family routines.',
    caseStudyId: 'coastal'
  }
];

const fineArtItems: GalleryItem[] = [
  {
    src: '.',
    category: 'Oil on Linen',
    title: 'Earth Tones Series I',
    details: 'A grounded abstract composition exploring muted mineral tones and layered brush movement.'
  },
  {
    src: '.',
    category: 'Mixed Media',
    title: 'Sienna Abstract II',
    details: 'Pigment, texture, and mark-making come together in a warm, atmospheric mixed media study.'
  },
  {
    src: '.',
    category: 'Ceramic Sculpture',
    title: 'Clay Forms',
    details: 'Handmade sculptural vessels with organic silhouettes and subtle surface variation.'
  },
  {
    src: '.',
    category: 'Watercolour',
    title: 'Rust & Ochre',
    details: 'A translucent watercolor built from earth pigments and soft atmospheric edges.'
  },
  {
    src: '.',
    category: 'Textile · Commissioned',
    title: 'Woven Landscape',
    details: 'A woven textile artwork commissioned to bring depth and tactility into neutral interiors.'
  },
  {
    src: '.',
    category: 'Photography · Limited Ed.',
    title: 'Still, Morning',
    details: 'A limited edition still-life photograph emphasizing quiet light and tonal composition.'
  },
  {
    src: '.',
    category: 'Acrylic on Canvas',
    title: 'Burnt Edge Study',
    details: 'Acrylic layering and edge contrast create a bold, architectural abstract panel.'
  },
  {
    src: '.',
    category: 'Bronze Sculpture',
    title: 'Form No. 7',
    details: 'A bronze sculpture investigating volume, balance, and directional form in compact scale.'
  }
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'interiors' | 'fineart'>('interiors');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

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
          <span className="sec-label gold">Selected Works</span>
          <h1>A curated collection<br/>of <em>spaces & stories</em></h1>
        </div>
      </div>
      <div className="gall-body">
        <div className="gall-tabs">
          <button className={`gtab ${tab === 'interiors' ? 'act' : ''}`} onClick={() => setTab('interiors')}>All Interiors</button>
          <button className={`gtab ${tab === 'fineart' ? 'act' : ''}`} onClick={() => setTab('fineart')}>Fine Art Gallery</button>
        </div>

        <div className={`gall-section ${tab === 'interiors' ? 'on' : ''}`}>
          <div className="gall-grid int">
            {interiorItems.map((item) => (
              <div
                className="gi"
                key={`${item.title}-${item.caseStudyId || item.src}`}
                onClick={() => {
                  const heroImageUrl = item.caseStudyId ? PROJECTS[item.caseStudyId]?.heroImageUrl : undefined;
                  setActiveItem({ ...item, src: heroImageUrl || item.src });
                }}
              >
                <div className="gi-img">
                  <img src={(item.caseStudyId ? PROJECTS[item.caseStudyId]?.heroImageUrl : undefined) || item.src} alt={item.title}/>
                </div>
                <div className="gi-ov">
                  <span className="gi-cat">{item.category}</span>
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
              <div className="gi" key={`${item.title}-${item.src}`} onClick={() => setActiveItem(item)}>
                <div className="gi-img"><img src={item.src} alt={item.title}/></div>
                <div className="gi-ov">
                  <span className="gi-cat">{item.category}</span>
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
              <img src={activeItem.src} alt={activeItem.title} className="gall-lightbox-img"/>
            </div>
            <div className="gall-lightbox-meta">
              <span className="gall-lightbox-cat">{activeItem.category}</span>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.details}</p>
              {activeItem.caseStudyId && (
                <button
                  className="btn-tr"
                  onClick={() => {
                    navigate(`/case-study/${activeItem.caseStudyId}`);
                    setActiveItem(null);
                  }}
                >
                  <span>View Full Case Study</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;