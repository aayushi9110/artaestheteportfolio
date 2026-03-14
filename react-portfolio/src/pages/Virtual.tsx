import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Virtual = () => {
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
    <div id="pg-virtual" className="pg on">
      <div className="vc-hero">
        <div className="vc-hero-c">
          <button className="page-back" onClick={() => navigate('/')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
            </svg> Back
          </button>
          <span className="sec-label gold">Virtual Consultation</span>
          <h1>E-Design for every room,<br/><em>beautifully delivered</em></h1>
          <p>Complete, professional interior design — wherever you are in the world. Here is exactly what you receive.</p>
        </div>
      </div>
      <div className="vc-body">
        <div className="vc-intro">
          <div className="vc-intro-txt reveal">
            <span className="sec-label">The Experience</span>
            <h2>Design without<br/><em>boundaries</em></h2>
            <p>Our virtual consultation service was built for clients who deserve world-class design regardless of location. Using digital tools, we deliver the same depth, care, and craft as an in-person project.</p>
            <p>Every virtual project is fully bespoke. You receive a comprehensive suite of deliverables, a dedicated designer, and ongoing support throughout the process. No template. No compromise.</p>
            <div style={{ marginTop: '28px' }}><button className="btn-dk" onClick={() => navigate('/book')}><span>Get Started</span></button></div>
          </div>
          <div className="vc-intro-img rr"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" alt="Virtual Design"/></div>
        </div>

        <div className="vc-del-hdr reveal">
          <span className="sec-label" style={{ justifyContent: 'center' }}>Core Deliverables</span>
          <h2>Everything your space <em>needs</em></h2>
          <p>Every virtual project includes a complete set of professional deliverables — curated, considered, and designed to transform your space.</p>
        </div>

        <div className="vc-del-grid">
          <div className="vd reveal"><div className="vd-n">01</div><span className="vd-ico">M</span><h3>Moodboard & Concept Direction</h3><p>A curated visual direction that sets the tone for your entire project — your creative north star.</p><ul><li>Color palette & keywords</li><li>Material & texture inspiration</li><li>Style references & furniture moodboard</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.07s' }}><div className="vd-n">02</div><span className="vd-ico">P</span><h3>Floor Plan & Space Planning</h3><p>Clear spatial guidance — 2 to 3 furniture layout options with traffic flow and zoning recommendations.</p><ul><li>Measured floor plan (client provides dims)</li><li>Furniture layout variations</li><li>Zoning & flow suggestions</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.14s' }}><div className="vd-n">03</div><span className="vd-ico">F</span><h3>Furniture & Decor Selection</h3><p>A shoppable, curated list delivered as a visual board, PDF, or clickable spreadsheet.</p><ul><li>Furniture, lighting, rugs</li><li>Artwork & decor accents</li><li>Plants & storage solutions</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.21s' }}><div className="vd-n">04</div><span className="vd-ico">C</span><h3>Color Palette & Paint Guide</h3><p>Every color chosen with intention — removing decision fatigue completely.</p><ul><li>Wall & trim color options</li><li>Finish recommendations</li><li>Accent colour suggestions</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.28s' }}><div className="vd-n">05</div><span className="vd-ico">T</span><h3>Materials & Finishes Guide</h3><p>Essential for kitchens, bathrooms, and any renovation where surfaces define everything.</p><ul><li>Tile, countertop & hardware</li><li>Flooring & fixture selections</li><li>Texture & finish guide</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.35s' }}><div className="vd-n">06</div><span className="vd-ico">B</span><h3>Shopping List & Budget Tracker</h3><p>A fully organized document — item name, price, link, quantity, and budget vs. premium alternatives.</p><ul><li>Direct purchase links</li><li>Total project budget view</li><li>Alternatives at every price point</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.42s' }}><div className="vd-n">07</div><span className="vd-ico">I</span><h3>Installation Guide</h3><p>A complete roadmap to execute the vision with full confidence — step by step, room by room.</p><ul><li>Furniture placement guide</li><li>Art & curtain hanging heights</li><li>Shelf & surface styling tips</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.49s' }}><div className="vd-n">08</div><span className="vd-ico">S</span><h3>Styling Tips & Final Touches</h3><p>The small but powerful finishing layer — how to layer, balance, and photograph your space.</p><ul><li>Surface & shelf styling</li><li>Texture layering guide</li><li>Photography advice</li></ul></div>
          <div className="vd reveal" style={{ transitionDelay: '.56s' }}><div className="vd-n">09</div><span className="vd-ico">V</span><h3>Virtual Meetings & Support</h3><p>Structured touchpoints from brief to final walkthrough — always a human, never a template.</p><ul><li>Initial consultation call</li><li>Design presentation + revision round</li><li>Final walkthrough call</li></ul></div>
        </div>

        <div className="addons-sec reveal">
          <div className="addons-inner">
            <span className="sec-label gold">Premium Add-Ons</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,3vw,2.7rem)', fontWeight: 300, color: 'var(--cream)', marginTop: '14px', marginBottom: '44px' }}>Elevate your project <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>further</em></h2>
            <div className="addons-grid">
              <div className="ao"><span className="ao-ico">3D</span><h4>3D Renderings</h4><p>Photorealistic room renders and before/after mockups — brings the vision to life before a single purchase.</p></div>
              <div className="ao"><span className="ao-ico">VR</span><h4>3D Walkthrough Video</h4><p>An immersive video tour of your designed space — perfect for decision-making and sharing.</p></div>
              <div className="ao"><span className="ao-ico">ART</span><h4>Custom Artwork Curation</h4><p>We source and commission original paintings, prints, and sculptures chosen for your specific space.</p></div>
              <div className="ao"><span className="ao-ico">BSP</span><h4>Custom Furniture Sourcing</h4><p>Bespoke, one-of-a-kind pieces made to your exact dimensions and finish — a space that can't be replicated.</p></div>
              <div className="ao"><span className="ao-ico">SE</span><h4>Seasonal Styling Updates</h4><p>Refresh your space with the seasons — new textiles, accents, and arrangements to keep it feeling alive.</p></div>
              <div className="ao"><span className="ao-ico">RE</span><h4>Virtual Staging (Real Estate)</h4><p>Digital staging for property listings — beautifully furnished spaces that sell faster and for more.</p></div>
            </div>
          </div>
        </div>

        <div className="vc-pkgs reveal">
          <span className="sec-label">Packages</span>
          <h2>Simple, transparent <em>pricing</em></h2>
          <div className="pkg-grid">
            <div className="pkg"><div className="pkg-name">Essential</div><div className="pkg-desc">For one room, beautifully resolved.</div><ul className="pkg-incl"><li>Moodboard & concept direction</li><li>Color palette & paint guide</li><li>Furniture & decor selection</li><li>Shopping list</li><li>1 consultation + 1 presentation</li></ul><button className="pkg-cta" onClick={() => navigate('/book')}>Get started →</button></div>
            <div className="pkg feat"><div className="pkg-badge">Most Popular</div><div className="pkg-name">Signature</div><div className="pkg-desc">The complete virtual design experience.</div><ul className="pkg-incl"><li>Everything in Essential</li><li>Floor plan & space planning</li><li>Materials & finishes guide</li><li>Budget tracker</li><li>Installation & styling guide</li><li>2 calls + 1 revision round</li></ul><button className="pkg-cta" onClick={() => navigate('/book')}>Get started →</button></div>
            <div className="pkg"><div className="pkg-name">Full Home</div><div className="pkg-desc">E-design for every room in your home.</div><ul className="pkg-incl"><li>Everything in Signature</li><li>Multiple rooms</li><li>3D mockups included</li><li>Ongoing support add-on</li><li>Final walkthrough call</li></ul><button className="pkg-cta" onClick={() => navigate('/book')}>Get started →</button></div>
          </div>
        </div>
      </div>

      <div className="cta-strip"><div style={{ position: 'relative', zIndex: 1 }}><h2>Ready to begin your virtual project?</h2><p>We'll have your first moodboard within a week.</p></div><button className="btn-lt" onClick={() => navigate('/book')} style={{ position: 'relative', zIndex: 1 }}><span>Book a Consultation</span></button></div>
    </div>
  );
};

export default Virtual;