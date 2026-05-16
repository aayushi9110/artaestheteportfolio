import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceDetails.css';

const TheRefresh = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'included' | 'investment' | 'fit' | 'faq'>('overview');

  return (
    <div id="pg-service-detail" className="pg on">
      <div className="service-detail-container">
        <button className="service-back-btn" onClick={() => navigate(-1)}>
          <svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
          </svg>
          Back
        </button>

        <section className="sd-hero">
          <div className="sd-hero-content">
            <h1>You already moved in. You're not in love. Let's fix it.</h1>
            <p className="sd-subhead">A second wind for finished homes — textiles, lighting, art, and styling, restyled in a single install day.</p>
          </div>
        </section>

        <section className="sd-body">
          <div className="sd-body-content">
            <p>The bones are there. The sofa stays. So does the dining table. But the rooms feel flat — like a furniture catalog without the editor's pass.</p>
            <p>The Refresh is the editor's pass. We come in, edit what's there, swap what isn't working, and add what's missing — usually textiles, lighting, art, drapery, and the styling details that separate "moved in" from "finished."</p>

            <div className="sd-tabs" role="tablist" aria-label="The Refresh sections">
              <button className={`sd-tab ${activeTab === 'overview' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`sd-tab ${activeTab === 'included' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('included')}>Included</button>
              <button className={`sd-tab ${activeTab === 'investment' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('investment')}>Timeline and Investment</button>
              <button className={`sd-tab ${activeTab === 'fit' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('fit')}>Fit Check</button>
              <button className={`sd-tab ${activeTab === 'faq' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('faq')}>FAQ</button>
            </div>

            <div className="sd-section sd-panel">
              {activeTab === 'overview' && (
                <>
                  <h2>What The Refresh does</h2>
                  <p>We keep the strong foundation and transform the mood. This is a strategic edit, not a total reset.</p>
                  <ul className="sd-list">
                    <li>We keep what works and re-style it intentionally</li>
                    <li>We replace what blocks visual flow or comfort</li>
                    <li>We layer in textiles, lighting, art, drapery, and styling accents</li>
                  </ul>
                </>
              )}

              {activeTab === 'included' && (
                <>
                  <h2>What's included</h2>
                  <ul className="sd-list">
                    <li>A 90-minute walk-through site visit</li>
                    <li>A restyle plan — what stays, what swaps, what's new</li>
                    <li>Sourcing through trade accounts for any new pieces</li>
                    <li>One install day with full styling</li>
                    <li>A two-week post-install polish window</li>
                  </ul>
                </>
              )}

              {activeTab === 'investment' && (
                <>
                  <h2>Timeline and investment</h2>
                  <p><strong>Timeline:</strong> One week from walk-through to install day.</p>
                  <ul className="sd-list">
                    <li>Studio or 1BR </li>
                    <li>2BR </li>
                    <li>3BR or larger</li>
                  </ul>
                  <p>Cost of new pieces is separate; we estimate the additional spend in the plan.</p>
                </>
              )}

              {activeTab === 'fit' && (
                <>
                  <h2>Right for you if</h2>
                  <ul className="sd-list">
                    <li>You moved in six-plus months ago and the rooms still feel unresolved</li>
                    <li>You bought big pieces yourself and now they don't talk to each other</li>
                    <li>You're getting ready to sell and want the photos to look magazine-good</li>
                    <li>You're empty-nesting, divorcing, expecting, or just bored of the current chapter</li>
                  </ul>
                  <h3 style={{ marginTop: '14px' }}>What it isn't</h3>
                  <p>A full refurnishing. If the bones aren't right, you want The Furnishing.</p>
                </>
              )}

              {activeTab === 'faq' && (
                <>
                  <h2>FAQ</h2>
                  <div className="sd-faq-stack">
                    <details className="sd-faq-toggle" open>
                      <summary>How much do I need to spend on new pieces?</summary>
                      <p>Most Refreshes land between $5K and $25K. We tell you the realistic range after the walk-through.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Can I credit this toward a future Furnishing?</summary>
                      <p>Yes — 50% of The Refresh fee credits toward a Furnishing within 12 months.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Will you tell me to throw something out?</summary>
                      <p>If something has to go, we'll tell you. We're polite about it.</p>
                    </details>
                  </div>
                </>
              )}
            </div>

            <div className="sd-cta-section">
              <button className="btn-dk" onClick={() => navigate('/book')}>
                <span>Book a Refresh walk-through →</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TheRefresh;
