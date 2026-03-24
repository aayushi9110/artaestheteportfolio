import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESOURCES } from '../../data/appData.ts';
import './About.css';

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
          <span className="sec-label gold">My Story</span>
          <h1>Built on beauty, <br/><em>driven by instinct</em></h1>
          <div className="ab-stats">
            <div className="ab-stat">
              <span className="ab-stat-num">78<span className="ab-stat-plus">+</span></span>
              <span className="ab-stat-label">Projects Completed</span>
            </div>
            <div className="ab-stat-divider" aria-hidden="true" />
            <div className="ab-stat">
              <span className="ab-stat-num">104<span className="ab-stat-plus">+</span></span>
              <span className="ab-stat-label">Spaces Styled</span>
            </div>
            <div className="ab-stat-divider" aria-hidden="true" />
            <div className="ab-stat">
              <span className="ab-stat-num">80<span className="ab-stat-plus">+</span></span>
              <span className="ab-stat-label">Art Pieces Commissioned</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-intro">
            <div className="ab-intro-txt reveal">
              <span className="sec-label">The Beginning</span>
              <h2>Most spaces are filled.<br/><em>Few are felt</em></h2> 
              <p>Hi, I am Aayushi Shah. I set out to find rooms that felt honest — spaces that didn't pretend to be something they weren't.</p>
              <p>Most people decorate their homes. I believe you should curate them.There's a difference — and once you see it, you can't unsee it. A decorated room fills space. A curated one commands it. It stops you in the doorway. It makes guests go quiet for a second before they say "wow." That's the power of art placed with intention, and it's what Art Aesthete was built to create.I didn't start this business because it seemed like a good idea. I started it because I couldn't stop doing it — walking into spaces and seeing exactly what was missing, what piece would unlock the whole room. Art and interiors aren't separate disciplines to me. They never were.</p>
              <p>Art Aesthete exists for the homeowner who's done settling for "fine" — and is ready for a space that actually moves them.</p>
              <div style={{marginTop: '28px'}}>
                <button className="btn-dk" onClick={() => navigate('/book')}>
                  <span>Work With Us</span>
                </button>
              </div>
            </div>
            <div className="ab-intro-img ab-intro-img-portrait rr">
              <img
                className="ab-intro-photo"
                src={RESOURCES.about.profileImageUrl}
                alt="Studio"
              />
            </div>
          </div>

          <div className="ab-timeline reveal">
            <span className="sec-label">The Journey</span>
            <h2>Chapter by <em>chapter</em></h2>
            <div className="tl">
              <div className="tl-item">
                <div className="tl-yr">2018</div>
                <div className="tl-content">
                  <h4>The Spark</h4>
                  <p>It didn't start with a business plan. It started with a feeling — walking into a room and knowing, instantly, that one right piece of art would change everything. That instinct never went away. So eventually, I stopped ignoring it and built something around it.</p>
                  <span className="tl-tag">Art Commisions</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2019</div>
                <div className="tl-content">
                  <h4>The Struggle</h4>
                  <p> I left Mumbai with a suitcase, a sharp eye, and an obsession I couldn't explain to anyone. America was loud, fast, and completely indifferent to my dreams — and that was exactly the education I needed. Every rejection, every room I studied, every space I couldn't afford but walked through anyway, was quietly shaping the way I see. The struggle didn't break my vision. It built it.</p>
                  <span className="tl-tag">One Suitcase. One Obsession</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2020</div>
                <div className="tl-content">
                  <h4>The First Room</h4>
                  <p>While studying for my Masters in Design, I worked closely with realtors and home owners to refresh their homes and bring their personality into their spaces.</p>
                  <span className="tl-tag">Est.San Francisco, CA</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2021</div>
                <div className="tl-content">
                  <h4>Interior Enters The Story</h4>
                  <p>A client's blank dining room became the catalyst. I worked with some renowned brands in USA to find a piece that changed the entire energy of the home. Interior Design became a core service — and a defining one..</p>
                  <span className="tl-tag">Interior Consultations </span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2024</div>
                <div className="tl-content">
                  <h4>The Signature </h4>
                  <p>Years of moving through different worlds — Mumbai's layered, maximalist energy and America's clean, intentional restraint — gave me something no design school could: a perspective that lives between two aesthetics. I stopped trying to fit into one school of thought and started trusting the tension between them. Bold choices. Considered placement. Spaces that feel collected over a lifetime, not assembled overnight. That contrast became the Art Aesthete signature..</p>
                  <span className="tl-tag">Two Worlds. One Eye</span>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-yr">2026</div>
                <div className="tl-content">
                  <h4>Still Listening</h4>
                  <p>New York was the next chapter — and it arrived with its own kind of gravity. I embedded myself in the city, working closely with major brands in corporate settings to deliver beautiful, curated homes to real people. That experience sharpened everything — the scale, the standard, the understanding that great design isn't a luxury, it's a language. Art Aesthete is now growing from that foundation, and the most ambitious chapters are still ahead..</p>
                  <span className="tl-tag">From Instinct to Legacy.</span>
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

          {/* Team section is intentionally hidden for now. Re-enable this block when the team grows. */}
          {/*
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
          */}
        </div>
      </div>

      <div className="cta-strip" style={{ marginTop: 0 }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Curious about working together?</h2>
          <p>Tell us about your project and I'll be in touch within 24 hours.</p>
        </div>
        <button className="btn-lt" style={{ position: 'relative', zIndex: 1 }} onClick={() => navigate('/book')}>
          <span>Start a Conversation</span>
        </button>
      </div>
    </div>
  );
};

export default About;
