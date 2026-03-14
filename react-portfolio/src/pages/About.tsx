import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

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

  return (
    <div id="pg-about" className="pg on">
      <div className="ab-hero">
        <div className="ab-hero-c">
          <button className="page-back" onClick={() => navigate('/')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
            </svg> Back
          </button>
          <span className="sec-label gold">Our Story</span>
          <h1>Built on beauty,<br/><em>driven by instinct</em></h1>
          <p>A decade of designing spaces that feel like discoveries. This is how Art Aesthete came to be.</p>
        </div>
      </div>
      <div className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-intro">
            <div className="ab-intro-txt reveal">
              <span className="sec-label">The Beginning</span>
              <h2>A studio born from<br/><em>restlessness</em></h2>
              <p>Elara Voss didn't set out to start a design studio. She set out to find rooms that felt honest — spaces that didn't pretend to be something they weren't.</p>
              <p>In 2017, from a rented studio in Brooklyn with three clients and an obsession with warm plaster walls, Art Aesthete opened its doors. The name came from a late-night conversation about the difference between someone who appreciates beauty and someone who needs it. Elara needed it.</p>
              <p>Today, Art Aesthete works across three continents — but the ethos has never changed. Every project begins with listening. Really listening. Not to what clients say they want, but to what they feel when they walk into a room they love.</p>
              <div style={{marginTop: '28px'}}>
                <button className="btn-dk" onClick={() => navigate('/book')}>
                  <span>Work With Us</span>
                </button>
              </div>
            </div>
            <div className="ab-intro-img rr">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                alt="Studio"
              />
            </div>
          </div>

          <div className="ab-timeline reveal">
            <span className="sec-label">The Journey</span>
            <h2>Chapter by <em>chapter</em></h2>
            <div className="tl">
              <div className="tl-item">
                <div className="tl-yr">2017</div>
                <div className="tl-content">
                  <h4>The First Room</h4>
                  <p>Art Aesthete opens with a single residential project in Brooklyn — a 420 sq ft apartment transformed into something that felt like a full breath. Word spread quietly, the way good things do.</p>
                  <span className="tl-tag">Est. Brooklyn, NY</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2018</div>
                <div className="tl-content">
                  <h4>Fine Art Enters the Story</h4>
                  <p>A client's blank dining room wall became the catalyst. We commissioned a local artist and placed a piece that changed the entire energy of the home. Fine art curation became a core service — and a defining one.</p>
                  <span className="tl-tag">First art commission</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2019</div>
                <div className="tl-content">
                  <h4>London Calling</h4>
                  <p>A referral from a Manhattan client led to our first international project in Mayfair. We found that beautiful design speaks in every language, every postcode. The London studio followed six months later.</p>
                  <span className="tl-tag">Studio opens · London</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2021</div>
                <div className="tl-content">
                  <h4>Going Virtual, Without Losing Soul</h4>
                  <p>When the world went indoors, Art Aesthete went digital — but refused to go generic. We built a virtual consultation service that delivered every deliverable of an in-person project, beautifully and with the same rigour. It changed who we could reach.</p>
                  <span className="tl-tag">Virtual service launches</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2023</div>
                <div className="tl-content">
                  <h4>The Art Aesthete Identity</h4>
                  <p>We published our first editorial lookbook — a 48-page document on living with intention. It was downloaded 40,000 times. The brand became something clients wore as an identity, not just hired as a service.</p>
                  <span className="tl-tag">Lookbook · 40k downloads</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2026</div>
                <div className="tl-content">
                  <h4>Still Listening</h4>
                  <p>Today, Art Aesthete works across 12 countries, with a team of 8 designers, 3 curators, and an ever-growing network of artists, makers, and craftspeople. Every project still begins the same way — with a conversation.</p>
                  <span className="tl-tag">Present · 12 countries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ab-values reveal">
            <div className="ab-values-inner">
              <span className="sec-label">What We Believe</span>
              <h2>The principles behind<br/><em>every decision</em></h2>
              <div className="val-grid">
                <div className="val-card"><div className="val-n">01</div><h4>Restraint is a skill</h4><p>The most powerful rooms are often the ones with the least in them. We edit ruthlessly — keeping only what earns its place.</p></div>
                <div className="val-card"><div className="val-n">02</div><h4>Materials matter</h4><p>We don't work with fast furniture. Every piece, texture, and finish is chosen for how it will age, not just how it looks on the day.</p></div>
                <div className="val-card"><div className="val-n">03</div><h4>Art changes everything</h4><p>A painting placed with intention can transform a room's entire emotional register. We treat art as architecture.</p></div>
                <div className="val-card"><div className="val-n">04</div><h4>Light is the first material</h4><p>Before colour, before furniture — we design with light. Natural, artificial, bounced, and absorbed. Light shapes how everything else is perceived.</p></div>
                <div className="val-card"><div className="val-n">05</div><h4>Your story, not ours</h4><p>We're not interested in signature styles. We're interested in your signature. Every project looks different because every client is different.</p></div>
                <div className="val-card"><div className="val-n">06</div><h4>Process is craft</h4><p>A beautiful result requires a rigorous process. We're transparent, structured, and honest — because great design doesn't happen by accident.</p></div>
              </div>
            </div>
          </div>

          <div className="ab-team reveal">
            <span className="sec-label">The Team</span>
            <h2>The people behind<br/><em>the spaces</em></h2>
            <div className="team-grid">
              <div className="team-card">
                <div className="team-img">
                  <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80" alt="Elara"/>
                </div>
                <div className="team-info">
                  <h4>Elara Voss</h4>
                  <p>Founder & Creative Director</p>
                  <p className="team-bio">Elara studied architecture at the Bartlett before pivoting entirely to interiors. Her restlessness is the studio's greatest asset — she is never satisfied with the first idea, always searching for the one that's true.</p>
                </div>
              </div>
              <div className="team-card">
                <div className="team-img">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" alt="Mia"/>
                </div>
                <div className="team-info">
                  <h4>Mia Tanaka</h4>
                  <p>Senior Designer & Art Curator</p>
                  <p className="team-bio">Mia brings 12 years of gallery experience to the studio — an eye trained on what makes a piece of art feel inevitable in a space. She sources work from artists across Europe, Asia, and North America.</p>
                </div>
              </div>
              <div className="team-card">
                <div className="team-img">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="James"/>
                </div>
                <div className="team-info">
                  <h4>James Osei</h4>
                  <p>Lead Interior Designer · London</p>
                  <p className="team-bio">James leads all UK and European projects, bringing a material-first approach and a fascination with how craftsmanship and technology intersect. His work has been featured in Wallpaper* and Elle Decoration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-strip" style={{ marginTop: 0 }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Curious about working together?</h2>
          <p>Tell us about your project and we'll be in touch within 24 hours.</p>
        </div>
        <button className="btn-lt" style={{ position: 'relative', zIndex: 1 }} onClick={() => navigate('/book')}>
          <span>Start a Conversation</span>
        </button>
      </div>
    </div>
  );
};

export default About;
