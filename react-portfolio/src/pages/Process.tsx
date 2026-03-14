import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Process = () => {
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
    <div id="pg-process" className="pg on">
      <div className="proc-hero">
        <div className="proc-hero-c">
          <button className="page-back" onClick={() => navigate('/')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
            </svg> Back
          </button>
          <span className="sec-label gold">How We Work</span>
          <h1>From first call<br/>to <em>final reveal</em></h1>
          <p>A transparent, structured process — because great design doesn't happen by accident.</p>
        </div>
      </div>
      <div className="proc-body">
        <div className="proc-steps-full">
          <div className="psf reveal">
            <div className="psf-num">I<div className="psf-dot"></div></div>
            <div className="psf-inner">
              <h3>Discovery Call</h3>
              <p>Every project begins with a real conversation. We explore your story, lifestyle, aspirations for the space, and the feelings you want it to evoke. This is where we listen — really listen.</p>
              <div className="psf-dels">
                <div className="psf-del">45-minute initial consultation</div>
                <div className="psf-del">Detailed style questionnaire</div>
                <div className="psf-del">Budget & scope alignment</div>
                <div className="psf-del">Project brief creation</div>
                <div className="psf-del">Site visit or virtual walkthrough</div>
                <div className="psf-del">Timeline & deliverables outline</div>
              </div>
            </div>
          </div>

          <div className="psf reveal">
            <div className="psf-num">II<div className="psf-dot"></div></div>
            <div className="psf-inner">
              <h3>Concept & Creative Direction</h3>
              <p>We translate your brief into a full visual and spatial language. Moodboards, palettes, and material stories are assembled into a coherent creative direction — your project's north star.</p>
              <div className="psf-dels">
                <div className="psf-del">Moodboard & concept board</div>
                <div className="psf-del">Color palette & finishes guide</div>
                <div className="psf-del">Material & texture selection</div>
                <div className="psf-del">Style keywords & references</div>
                <div className="psf-del">Furniture & décor direction</div>
                <div className="psf-del">Art & object curation begins</div>
              </div>
            </div>
          </div>

          <div className="psf reveal">
            <div className="psf-num">III<div className="psf-dot"></div></div>
            <div className="psf-inner">
              <h3>Space Planning & Design Development</h3>
              <p>We move from concept into concrete plans. Floor plans, furniture layouts, and lighting strategies are developed — ensuring beauty and function work in full harmony.</p>
              <div className="psf-dels">
                <div className="psf-del">Measured floor plan</div>
                <div className="psf-del">2-3 furniture layout options</div>
                <div className="psf-del">Traffic flow & zoning</div>
                <div className="psf-del">Lighting design</div>
                <div className="psf-del">Full furniture selections</div>
                <div className="psf-del">3D mockups (if selected)</div>
              </div>
            </div>
          </div>

          <div className="psf reveal">
            <div className="psf-num">IV<div className="psf-dot"></div></div>
            <div className="psf-inner">
              <h3>Presentation & Refinement</h3>
              <p>We present every element in a formal design presentation — walking you through each decision and the reasoning behind it. Revisions are welcomed; we refine until the design feels undeniably right.</p>
              <div className="psf-dels">
                <div className="psf-del">Full design presentation call</div>
                <div className="psf-del">Revision rounds included</div>
                <div className="psf-del">Shopping list & budget tracker</div>
                <div className="psf-del">Budget vs. premium options</div>
                <div className="psf-del">Final sign-off</div>
                <div className="psf-del">Sourcing & procurement support</div>
              </div>
            </div>
          </div>

          <div className="psf reveal">
            <div className="psf-num">V<div className="psf-dot"></div></div>
            <div className="psf-inner">
              <h3>Delivery, Styling & Final Reveal</h3>
              <p>You receive everything needed to bring the space to life — with complete guidance at every step. For virtual projects, a detailed installation guide. For in-person projects, we're there for the reveal.</p>
              <div className="psf-dels">
                <div className="psf-del">Installation guide & room-by-room styling</div>
                <div className="psf-del">Furniture placement map</div>
                <div className="psf-del">Art hanging heights & placement</div>
                <div className="psf-del">Styling tips & final touches</div>
                <div className="psf-del">Final walkthrough call</div>
                <div className="psf-del">Post-project support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="proc-what reveal">
          <div className="proc-what-inner">
            <span className="sec-label gold">Our Services</span>
            <h2>Choose how we <em>work together</em></h2>
            <div className="proc-svc-grid">
              <div className="svc-card">
                <div className="svc-n">01</div>
                <div className="svc-ico">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3>Interior Design</h3>
                <p>Full-service in-person design for residential and commercial spaces.</p>
                <div className="mode-pills"><span className="mp">In-Person</span><span className="mp">Site Visit</span></div>
                <button className="svc-lnk" onClick={() => navigate('/book')}>Book now →</button>
              </div>

              <div className="svc-card">
                <div className="svc-n">02</div>
                <div className="svc-ico">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
                <h3>Virtual Consultation</h3>
                <p>Complete design packages delivered online, anywhere in the world.</p>
                <div className="mode-pills"><span className="mp">Video Call</span><span className="mp">Global</span></div>
                <button className="svc-lnk" onClick={() => navigate('/virtual')}>Learn more →</button>
              </div>

              <div className="svc-card">
                <div className="svc-n">03</div>
                <div className="svc-ico">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="1"/>
                    <path d="M3 9h18M9 21V9"/>
                  </svg>
                </div>
                <h3>Fine Art Curation</h3>
                <p>Original art sourced, commissioned, and placed with intention.</p>
                <div className="mode-pills"><span className="mp">Commission</span><span className="mp">Placement</span></div>
                <button className="svc-lnk" onClick={() => navigate('/portfolio')}>View gallery →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-strip">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Ready to begin?</h2>
          <p>Let's start with a conversation about your space.</p>
        </div>
        <button className="btn-lt" style={{ position: 'relative', zIndex: 1 }} onClick={() => navigate('/book')}>
          <span>Book a Consultation</span>
        </button>
      </div>
    </div>
  );
};

export default Process;