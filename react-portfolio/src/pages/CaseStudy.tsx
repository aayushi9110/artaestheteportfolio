import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Deliverable = {
  icon: string;
  text: string;
};

type Project = {
  title: string;
  location: string;
  tags: string[];
  heroBg: string;
  before: string;
  after: string;
  overviewHeading: string;
  overviewP1: string;
  overviewP2: string;
  deliverables: Deliverable[];
  images: string[];
  captions: string[];
};

const PROJECTS: Record<string, Project> = {
  amber: {
    title: 'The Amber Salon',
    location: 'New York, NY - Virtual Design',
    tags: ['Interior Design', 'Virtual Consultation', 'Living Room'],
    heroBg: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    overviewHeading: 'A Manhattan apartment, transformed from sterile to soulful',
    overviewP1: 'Our client had lived in her West Village apartment for three years and still did not feel at home. The bones were beautiful - high ceilings, north-facing light - but the furniture was placeholder and the walls had never quite been decided. She came to Art Aesthete for a virtual redesign.',
    overviewP2: 'The challenge was warmth. Manhattan apartments can feel clinical if the materials do not work hard. We introduced amber plaster tones, layered natural textiles, and anchored the room with an oversized linen sofa and a commissioned oil painting from a Brooklyn artist.',
    deliverables: [
      { icon: '01', text: 'Moodboard & Concept Direction' },
      { icon: '02', text: 'Floor Plan & Furniture Layout' },
      { icon: '03', text: 'Full Furniture & Decor Selections' },
      { icon: '04', text: 'Custom Color Palette & Paint Guide' },
      { icon: '05', text: 'Shopping List with Direct Links' },
      { icon: '06', text: 'Room-by-Room Installation Guide' }
    ],
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80'
    ],
    captions: ['Living room - final install', 'Detail: linen sofa & throw', 'Art placement - north wall', 'Reading corner at dusk', 'Entryway styling']
  },
  terra: {
    title: 'Terracotta Living - Coastal Calm',
    location: 'Malibu, California - Virtual Design',
    tags: ['Interior Design', 'Virtual Consultation', 'Living Room', 'Bedroom'],
    heroBg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    overviewHeading: 'A Malibu home asking to breathe with the landscape',
    overviewP1: 'A young family relocating from New York needed their Malibu rental to feel like a home - not a holiday house. The brief was warmth without weight, colour without clash, and furnishings that could live with sand and sun.',
    overviewP2: 'We built the palette around terracotta, warm white, and bleached oak. Every piece was chosen for ease and beauty equally - materials that would age gracefully, look effortless, and survive a Californian summer.',
    deliverables: [
      { icon: '01', text: 'Full Moodboard - Coastal Warmth Direction' },
      { icon: '02', text: 'Multi-Room Floor Plans' },
      { icon: '03', text: 'Furniture Selections - 3 Rooms' },
      { icon: '04', text: 'Color Palette & Paint Specs' },
      { icon: '05', text: 'Materials Guide - Textiles & Flooring' },
      { icon: '06', text: 'Full Installation & Styling Guide' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80'
    ],
    captions: ['Living room - final', 'Dining area styling', 'Art wall detail', 'Master bedroom', 'Outdoor living extension']
  },
  nordic: {
    title: 'Warm Nordic Study',
    location: 'Mayfair, London - In-Person',
    tags: ['Interior Design', 'Home Office', 'In-Person'],
    heroBg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    overviewHeading: 'A Mayfair study redesigned around thought and stillness',
    overviewP1: 'A literary agent working from home needed a study that felt like a room worth working in. The original space was functional but uninspiring - flat colours, uninspired shelving, a desk facing a blank wall.',
    overviewP2: 'We rebuilt it with intention: smoked oak shelving, a bespoke reading chair in cognac leather, a textile print commission, and a palette that shifts from pale ash in the morning to amber warmth by evening.',
    deliverables: [
      { icon: '01', text: 'Moodboard - Warm Nordic Concept' },
      { icon: '02', text: 'Full Space Plan & Shelving Design' },
      { icon: '03', text: 'Bespoke Furniture Sourcing' },
      { icon: '04', text: 'Color & Material Palette' },
      { icon: '05', text: 'Art Commission Coordination' },
      { icon: '06', text: 'Installation Management' }
    ],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
    ],
    captions: ['Study - full view', 'Shelving detail', 'Reading corner', 'Desk at the window', 'Art placement']
  },
  linen: {
    title: 'Linen & Oak',
    location: 'Paris, France - In-Person',
    tags: ['Interior Design', 'Living Room', 'Dining', 'In-Person'],
    heroBg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    overviewHeading: 'A Parisian apartment returned to its quiet confidence',
    overviewP1: 'The apartment had good bones but an identity crisis - too modern for the Haussmann building, too sparse for the clients\' love of layered living. The result felt neither one thing nor another.',
    overviewP2: 'We anchored the space with aged oak, undyed linen, and an edited collection of European antiques. The rooms now feel collected over generations - not designed in an afternoon.',
    deliverables: [
      { icon: '01', text: 'Quiet European Luxury Concept Board' },
      { icon: '02', text: 'Open-Plan Floor Plan & Zoning' },
      { icon: '03', text: 'Furniture Mix - Antique + Contemporary' },
      { icon: '04', text: 'Custom Plaster Color Guide' },
      { icon: '05', text: 'Art Curation - Original Works' },
      { icon: '06', text: 'Installation Management' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
    ],
    captions: ['Living room - morning light', 'Dining area', 'Bookcase wall', 'Master bedroom detail', 'Entrance hall']
  },
  earth: {
    title: 'Earth Tones Series',
    location: 'Gallery Commission - New York',
    tags: ['Fine Art', 'Oil on Linen', 'Commissioned'],
    heroBg: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    overviewHeading: 'A series of five oils commissioned for a Chelsea loft',
    overviewP1: 'A collector approached Art Aesthete to commission an original series for their newly redesigned loft. The brief: warm, earthy, abstract - art that would anchor each room without dominating it.',
    overviewP2: 'We collaborated with painter Rosa Medina on a five-piece series in oil on Belgian linen, each work echoing the apartment palette to create one continuous visual thread.',
    deliverables: [
      { icon: '01', text: 'Artist Brief & Concept Development' },
      { icon: '02', text: 'Palette Alignment with Interior' },
      { icon: '03', text: 'Series of Original Oil Paintings' },
      { icon: '04', text: 'Framing & Hanging Coordination' },
      { icon: '05', text: 'Art Documentation Photography' },
      { icon: '06', text: 'Certificate of Authenticity' }
    ],
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80'
    ],
    captions: ['Earth Tones I', 'Earth Tones II', 'Clay Forms companion', 'In situ - living room', 'Texture detail']
  },
  sienna: {
    title: 'Sienna Abstract',
    location: 'Mixed Media - London Commission',
    tags: ['Fine Art', 'Mixed Media', 'Commission'],
    heroBg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    overviewHeading: 'A large-format commission for a Mayfair dining room',
    overviewP1: 'The brief was simple and difficult in equal measure: a single artwork large enough to own the dining room wall, and personal enough to feel like it had always been there.',
    overviewP2: 'The final 200x140 mixed media work combines raw pigment, plaster, and drawn mark, resulting in something between painting and wall sculpture.',
    deliverables: [
      { icon: '01', text: 'Artist Briefing & Scope Definition' },
      { icon: '02', text: 'Pigment & Material Palette Curation' },
      { icon: '03', text: 'Original Large-Format Commission' },
      { icon: '04', text: 'Framing, Glazing & Hanging' },
      { icon: '05', text: 'Art Documentation' },
      { icon: '06', text: 'Provenance & Certificate' }
    ],
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
    ],
    captions: ['Sienna Abstract - full view', 'Pigment detail', 'In situ - dining room', 'Mark making detail', 'Final installation']
  },
  clay: {
    title: 'Clay Forms',
    location: 'Ceramic Sculpture - Brooklyn Studio',
    tags: ['Fine Art', 'Ceramic', 'Sculptural'],
    heroBg: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1400&q=80',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
    overviewHeading: 'A series of handmade ceramics placed across projects',
    overviewP1: 'Clay Forms began as a single commission - three sculptural vessels for a Brooklyn brownstone living room. The response led to a larger collaboration with ceramicist Yuki Nakamura.',
    overviewP2: 'Each piece is hand-formed and wood-fired, finished in ash glaze, terracotta slip, and raw clay. No two pieces are identical.',
    deliverables: [
      { icon: '01', text: 'Ceramicist Brief & Scale Reference' },
      { icon: '02', text: 'Glaze & Finish Curation' },
      { icon: '03', text: 'Series of Handmade Sculptural Vessels' },
      { icon: '04', text: 'Custom Plinths & Placement Design' },
      { icon: '05', text: 'Still Life Photography' }
    ],
    images: [
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
    ],
    captions: ['Clay Forms - hero shot', 'Vessel detail', 'In situ - brownstone', 'Scale and placement', 'Series overview']
  }
};

const CaseStudy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const project = PROJECTS[id || ''] || PROJECTS.amber;

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

  return (
    <div id="pg-case-study" className="pg on">
      <div className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: `url(${project.heroBg})` }}></div>
        <div className="cs-hero-c">
          <button className="page-back" onClick={() => navigate('/portfolio')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> Back to Portfolio
          </button>
          <div className="cs-loc">{project.location}</div>
          <h1>{project.title}</h1>
          <div className="cs-tags">
            {project.tags.map((tag) => <span key={tag} className="cs-tag">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="cs-body">
        <div className="cs-ba">
          <div className="cs-ba-panel"><img src={project.before} alt="Before"/><div className="cs-ba-lbl">Before</div></div>
          <div className="cs-ba-panel"><img src={project.after} alt="After"/><div className="cs-ba-lbl">After</div></div>
        </div>
        <div className="cs-overview reveal">
          <div className="cs-overview-txt">
            <span className="sec-label">Project Overview</span>
            <h3>{project.overviewHeading}</h3>
            <p>{project.overviewP1}</p>
            <p>{project.overviewP2}</p>
          </div>
          <div className="cs-deliverables">
            <span className="sec-label">Deliverables</span>
            <h3>What we provided</h3>
            <ul className="cs-dl-list">
              {project.deliverables.map((item) => (
                <li key={item.text}><span className="dl-ico">{item.icon}</span>{item.text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cs-gallery reveal">
          <span className="sec-label">Final Result</span>
          <h3>The finished space</h3>
          <div className="cs-gall-grid">
            {project.images.map((img, i) => (
              <div className="cg-item" key={`${img}-${i}`}>
                <img src={img} alt=""/>
                <div className="cg-cap"><span>{project.captions[i] || ''}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '72px 0 20px' }}>
          <p style={{ fontWeight: 300, fontSize: '.88rem', color: 'var(--taupe)', marginBottom: '24px' }}>Inspired by this project?</p>
          <button className="btn-tr" onClick={() => navigate('/book')}><span>Start Your Project</span></button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;