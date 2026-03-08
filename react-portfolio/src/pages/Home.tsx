import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Add reveal animations
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

    // Portfolio grid reveal
    const portfolioObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.pi').forEach((el) => {
      portfolioObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      portfolioObserver.disconnect();
    };
  }, []);

  const go = (path: string) => {
    // Navigation handled by React Router
  };

  const fpHome = (filter: string, button: HTMLElement) => {
    // Filter portfolio items
    document.querySelectorAll('.pfb').forEach(btn => btn.classList.remove('act'));
    button.classList.add('act');

    const items = document.querySelectorAll('.pi');
    items.forEach(item => {
      const cat = item.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        (item as HTMLElement).style.display = 'block';
      } else {
        (item as HTMLElement).style.display = 'none';
      }
    });
  };

  const goProject = (id: string) => {
    // Navigate to case study
  };

  return (
    <div id="pg-home" className="pg on">
      <section className="hero">
        <div className="hero-l">
          <span className="hero-punch">Your space, your story, beautifully told</span>
          <h1 className="hero-h1">
            <span className="h1-line"><span>Where Spaces</span></span>
            <span className="h1-line"><span>Become</span></span>
            <span className="h1-line"><span>Living Art</span></span>
          </h1>
          <p className="hero-desc">
            We design interiors that feel as extraordinary as the people who inhabit them — where every detail is intentional, every room a narrative.
          </p>
          <div className="hero-acts">
            <Link to="/portfolio" className="btn-dk"><span>Explore Portfolio</span></Link>
            <Link to="/process" className="btn-ghost">Our Process <span className="circ"><svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></span></Link>
          </div>
          <div className="scroll-cue">
            <div className="sc-line"></div>
            <span className="sc-txt">Scroll</span>
          </div>
        </div>
        <div className="hero-r">
          <div className="h-img-grid">
            <div className="h-img"><img src="/images/hero-image-1.jpg" alt="" className="prlx" data-s=".04"/></div>
            <div className="h-img"><img src="/images/hero-image-2.jpg" alt="" className="prlx" data-s=".07"/></div>
            <div className="h-img"><img src="/images/hero-image-3.jpg" alt="" className="prlx" data-s=".03"/></div>
          </div>
        </div>
      </section>

      <div className="marq">
        <div className="marq-track">
          <span className="marq-item">Interior Design</span>
          <span className="marq-item">Virtual Consultation</span>
          <span className="marq-item">Fine Art Curation</span>
          <span className="marq-item">Color Consultancy</span>
          <span className="marq-item">Space Planning</span>
          <span className="marq-item">E-Design Packages</span>
          <span className="marq-item">Bespoke Styling</span>
          <span className="marq-item">Interior Design</span>
          <span className="marq-item">Virtual Consultation</span>
          <span className="marq-item">Fine Art Curation</span>
          <span className="marq-item">Color Consultancy</span>
          <span className="marq-item">Space Planning</span>
          <span className="marq-item">E-Design Packages</span>
          <span className="marq-item">Bespoke Styling</span>
        </div>
      </div>

      <section className="philosophy" id="about-strip">
        <div className="ph-img rl">
          <img src="/images/studio.jpg" alt="Studio"/>
        </div>
        <div className="ph-content rr">
          <span className="sec-label">Our Philosophy</span>
          <h2>Art is not <em>decoration</em>.<br/>It is conversation.</h2>
          <p>Founded by creative director Elara Voss, Art Aesthete was born from the belief that the spaces we inhabit shape who we are. We bring together painters, architects, and curators under one vision.</p>
          <p>Every project begins not with a brief, but with a story — yours. We listen, we feel, we translate emotion into form, texture, and light. The result is never just a beautiful room. It is a place where you recognise yourself.</p>
          <div style={{marginTop: '32px'}}>
            <Link to="/about" className="btn-ghost">Our Story <span className="circ"><svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></span></Link>
          </div>
        </div>
      </section>

      <section className="port-prev">
        <div className="port-hdr">
          <div>
            <span className="sec-label">Selected Works</span>
            <h2>Spaces & <em>stories</em></h2>
          </div>
          <div className="port-filt">
            <button className="pfb act" onClick={(e) => fpHome('all', e.target as HTMLElement)}>All</button>
            <button className="pfb" onClick={(e) => fpHome('interior', e.target as HTMLElement)}>Interiors</button>
            <button className="pfb" onClick={(e) => fpHome('art', e.target as HTMLElement)}>Fine Art</button>
          </div>
        </div>
        <div className="port-grid" id="hPortGrid">
          <div className="pi" data-cat="interior" data-proj="amber" onClick={() => goProject('amber')}>
            <div className="pi-img">
              <img src="/images/project-1.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Interior Design</span>
              <span className="pi-title">The Amber Salon</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pi" data-cat="art" data-proj="earth" onClick={() => goProject('earth')}>
            <div className="pi-img">
              <img src="/images/project-2.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Fine Art Curation</span>
              <span className="pi-title">Earth Tones Series</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pi" data-cat="interior" data-proj="nordic" onClick={() => goProject('nordic')}>
            <div className="pi-img">
              <img src="/images/project-3.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Interior Design</span>
              <span className="pi-title">Warm Nordic Study</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pi" data-cat="art" data-proj="sienna" onClick={() => goProject('sienna')}>
            <div className="pi-img">
              <img src="/images/project-4.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Fine Art</span>
              <span className="pi-title">Sienna Abstract</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pi" data-cat="interior" data-proj="terra" onClick={() => goProject('terra')}>
            <div className="pi-img">
              <img src="/images/project-5.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Interior Design</span>
              <span className="pi-title">Terracotta Living</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pi" data-cat="art" data-proj="clay" onClick={() => goProject('clay')}>
            <div className="pi-img">
              <img src="/images/project-6.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Fine Art</span>
              <span className="pi-title">Clay Forms</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pi" data-cat="interior" data-proj="linen" onClick={() => goProject('linen')}>
            <div className="pi-img">
              <img src="/images/project-7.jpg" alt=""/>
            </div>
            <div className="pi-ov">
              <span className="pi-cat">Interior Design</span>
              <span className="pi-title">Linen & Oak</span>
              <div className="pi-arr">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div style={{textAlign: 'center', marginTop: '56px'}}>
          <Link to="/portfolio" className="btn-ghost">View Full Portfolio <span className="circ"><svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></span></Link>
        </div>
      </section>

      <section className="svc-prev">
        <div className="svc-hdr">
          <span className="sec-label gold">What We Offer</span>
          <h2>Craft at every <em>scale</em></h2>
        </div>
        <div className="svc-grid">
          <div className="svc-card reveal" data-lbl="View">
            <div className="svc-n">01</div>
            <div className="svc-ico">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3>Interior Design</h3>
            <p>Full-service residential and commercial design — from concept boards to final installation. We craft environments that feel lived-in, luminous, and entirely yours.</p>
            <div className="mode-pills">
              <span className="mp">In-Person</span>
              <span className="mp">Home Visit</span>
              <span className="mp">Full Project</span>
            </div>
            <Link to="/process" className="svc-lnk">Learn more →</Link>
          </div>
          <div className="svc-card reveal" style={{transitionDelay: '0.12s'}} data-lbl="Explore">
            <div className="svc-n">02</div>
            <div className="svc-ico">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <h3>Virtual Consultation</h3>
            <p>World-class design guidance from anywhere on earth — 3D walkthroughs, digital mood boards, and curated shopping lists delivered seamlessly online.</p>
            <div className="mode-pills">
              <span className="mp">Video Call</span>
              <span className="mp">E-Design</span>
              <span className="mp">Global</span>
            </div>
            <Link to="/virtual" className="svc-lnk">See full process →</Link>
          </div>
          <div className="svc-card reveal" style={{transitionDelay: '0.24s'}} data-lbl="Curate">
            <div className="svc-n">03</div>
            <div className="svc-ico">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="1"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <h3>Fine Art Curation</h3>
            <p>We source, commission, and place original artworks — paintings, sculptures, and textile works — that anchor a space with soul and intention.</p>
            <div className="mode-pills">
              <span className="mp">Original Works</span>
              <span className="mp">Commission</span>
              <span className="mp">Placement</span>
            </div>
            <Link to="/portfolio" className="svc-lnk">View art gallery →</Link>
          </div>
        </div>
      </section>

      <section className="testi">
        <span className="sec-label" style={{justifyContent: 'center'}}>Client Words</span>
        <h2>Spaces that <em>speak</em></h2>
        <div className="testi-row">
          <div className="tc reveal">
            <div className="stars">★★★★★</div>
            <blockquote>They didn't just design our home — they gave us a place we finally feel like ourselves in. Every object chosen with care, every corner considered.</blockquote>
            <div className="tc-info">
              <div className="tc-av">
                <img src="/images/testimonial-1.jpg" alt=""/>
              </div>
              <div>
                <div className="tc-name">Isabelle R.</div>
                <div className="tc-loc">Mayfair, London</div>
              </div>
            </div>
          </div>
          <div className="tc reveal" style={{transitionDelay: '0.12s'}}>
            <div className="stars">★★★★★</div>
            <blockquote>The virtual consultation was shockingly thorough. Over a video call, they designed our living room — and the result was more beautiful than we imagined.</blockquote>
            <div className="tc-info">
              <div className="tc-av">
                <img src="/images/testimonial-2.jpg" alt=""/>
              </div>
              <div>
                <div className="tc-name">Marcus T.</div>
                <div className="tc-loc">Tribeca, New York</div>
              </div>
            </div>
          </div>
          <div className="tc reveal" style={{transitionDelay: '0.24s'}}>
            <div className="stars">★★★★★</div>
            <blockquote>They understood exactly what I couldn't articulate. The warmth, the textures, the light — it feels like the house has always been this way.</blockquote>
            <div className="tc-info">
              <div className="tc-av">
                <img src="/images/testimonial-3.jpg" alt=""/>
              </div>
              <div>
                <div className="tc-name">Nadia O.</div>
                <div className="tc-loc">Malibu, California</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-strip">
        <div style={{position: 'relative', zIndex: 1}}>
          <h2>Ready to transform your space?</h2>
          <p>Every remarkable interior begins with a single conversation.</p>
        </div>
        <Link to="/book" className="btn-lt" style={{position: 'relative', zIndex: 1}}>
          <span>Book a Consultation</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
