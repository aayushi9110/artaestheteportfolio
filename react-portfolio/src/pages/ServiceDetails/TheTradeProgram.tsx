import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceDetails.css';

const TheTradeProgram = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'included' | 'pricing' | 'faq'>('overview');

  return (
    <div id="pg-service-detail" className="pg on">
      <div className="service-detail-container">
        <button className="service-back-btn" onClick={() => navigate(-1)}>
          <svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5H2M2 5L6 1M2 5l4 4" />
          </svg>
          Back
        </button>

        <section className="sd-hero">
          <div className="sd-hero-content">
            <h1>You finished the renovation. Let us finish the rooms.</h1>
            <p className="sd-subhead">Furnishing partnerships for architects, interior designers, and realtors in NYC.</p>
          </div>
        </section>

        <section className="sd-body">
          <div className="sd-body-content">
            <p>You know the moment. The dust settles. The client hugs you. Then: what now?</p>
            <p>You've spent eighteen months on the millwork. You don't want the next nine on a sectional.</p>
            <p>The Trade Program is the handoff. We furnish your finished project — white-label, co-branded, or quietly behind the scenes — on a six-week clock, at trade pricing, with your client relationship intact.</p>

            <div className="sd-tabs" role="tablist" aria-label="The Trade Program sections">
              <button className={`sd-tab ${activeTab === 'overview' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`sd-tab ${activeTab === 'models' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('models')}>Work Models</button>
              <button className={`sd-tab ${activeTab === 'included' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('included')}>Included</button>
              <button className={`sd-tab ${activeTab === 'pricing' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('pricing')}>Pricing</button>
              <button className={`sd-tab ${activeTab === 'faq' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('faq')}>FAQ</button>
            </div>

            <div className="sd-section sd-panel">
              {activeTab === 'overview' && (
                <>
                  <h2>What this solves</h2>
                  <p>When construction ends, furnishing often becomes the long tail. The Trade Program compresses that phase into a six-week delivery lane while keeping your client experience intact.</p>
                </>
              )}

              {activeTab === 'models' && (
                <>
                  <h2>Three ways to work together</h2>
                  <ul className="sd-list">
                    <li><strong>01 — White-label.</strong> We're invisible. Your client sees only your firm. We furnish under your brand, your processes, your reveal. You bill the client; we invoice you at net trade. Best for firms that want to add furnishing as a service line without hiring for it.</li>
                    <li><strong>02 — Co-branded.</strong> We work alongside you, named on the project. Your firm leads architecture and interiors; we lead FF&E. Best for design firms who want a trusted furnishing partner without the back-office load.</li>
                    <li><strong>03 — Referral.</strong> You hand the client off. We take it from there. You receive 10–15% commission on our design fee, paid at install. Best for architects and realtors who don't want furnishing on the books at all.</li>
                  </ul>
                </>
              )}

              {activeTab === 'included' && (
                <>
                  <h2>What you get, regardless of which</h2>
                  <ul className="sd-list">
                    <li>A six-week project window from kickoff to install</li>
                    <li>Direct trade access to 30+ catalogs and vintage dealers</li>
                    <li>A signed scope at every phase, so nothing surprises you</li>
                    <li>Your client treated like our own — same care, same hours, same install team</li>
                    <li>A no-poach clause: we don't pursue your client's future work without your introduction</li>
                  </ul>
                </>
              )}

              {activeTab === 'pricing' && (
                <>
                  <h2>Pricing</h2>
                  <p>Trade pricing varies by program. The conversation takes 20 minutes. We're discreet about it.</p>
                </>
              )}

              {activeTab === 'faq' && (
                <>
                  <h2>FAQ</h2>
                  <div className="sd-faq-stack">
                    <details className="sd-faq-toggle">
                      <summary>What's your conflict-of-interest policy?</summary>
                      <p>We don't sell competing services to your client during or after the project without your introduction. Written into every Trade agreement.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Can you take a project on one week's notice?</summary>
                      <p>Sometimes, depending on capacity. We'd rather pass than under-deliver — slot availability is honest.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Do you sign NDAs?</summary>
                      <p>Yes. As a default, not an exception.</p>
                    </details>
                  </div>
                </>
              )}
            </div>

            <div className="sd-cta-section">
              <button className="btn-dk" onClick={() => navigate('/book')}>
                <span>Book a 20-min intro call →</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TheTradeProgram;
