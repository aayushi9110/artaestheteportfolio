import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceDetails.css';

const ThePlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'included' | 'scope' | 'fit' | 'faq'>('included');

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
            <h1>A real plan. You do the shopping.</h1>
            <p className="sd-subhead">For owners who want a designer's eye but enjoy the hunt — or who want to spread the spend over time.</p>
          </div>
        </section>

        <section className="sd-body">
          <div className="sd-body-content">
            <p>Some people love sourcing. The hours on 1stDibs. The swatches in the mail. The Saturday at the D&D Building. If that's you, The Plan is the right way to work together.</p>
            <p>You get the architecture of the room — drawn, scaled, sourced, ready to execute. We just don't pull out the credit card for you.</p>

            <div className="sd-tabs" role="tablist" aria-label="The Plan sections">
              <button className={`sd-tab ${activeTab === 'included' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('included')}>What's Included</button>
              <button className={`sd-tab ${activeTab === 'scope' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('scope')}>Scope</button>
              <button className={`sd-tab ${activeTab === 'fit' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('fit')}>Fit Check</button>
              <button className={`sd-tab ${activeTab === 'faq' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('faq')}>FAQ</button>
            </div>

            <div className="sd-section sd-panel">
              {activeTab === 'included' && (
                <>
                  <h2>What's included</h2>
                  <ul className="sd-list">
                    <li>A measured site visit and a 90-minute discovery call</li>
                    <li>A scaled floor plan with every piece of furniture in place</li>
                    <li>A lighting plan — ambient, task, accent, and decorative</li>
                    <li>A palette direction — walls, woods, metals, textiles</li>
                    <li>A complete sourcing list — every piece, every brand, every link, every price, every alternate</li>
                    <li>One 30-minute review call once you've started ordering</li>
                  </ul>
                </>
              )}

              {activeTab === 'scope' && (
                <>
                  <h2>Scope and timeline</h2>
                  <p>We don't place orders. We don't track deliveries. We don't show up on install day. That's The Furnishing.</p>
                  <p><strong>Timeline:</strong> Two weeks from discovery to delivered plan.</p>
                  <h3 style={{ marginTop: '14px' }}>Designed for</h3>
                  <ul className="sd-list">
                    <li>Studio or 1BR</li>
                    <li>2BR</li>
                    <li>3BR or larger</li>
                  </ul>
                </>
              )}

              {activeTab === 'fit' && (
                <>
                  <h2>Fit check</h2>
                  <h3>Right for you if</h3>
                  <ul className="sd-list">
                    <li>You have the time and you actually enjoy the process</li>
                    <li>You want to phase your spending over six months or longer</li>
                    <li>You've furnished one apartment already and want to do this one right</li>
                  </ul>
                  <h3 style={{ marginTop: '14px' }}>Probably not right if</h3>
                  <ul className="sd-list">
                    <li>You haven't slept since closing</li>
                    <li>The thought of comparing eight rug options makes you want to lie down</li>
                  </ul>
                </>
              )}

              {activeTab === 'faq' && (
                <>
                  <h2>FAQ</h2>
                  <div className="sd-faq-stack">
                    <details className="sd-faq-toggle" open>
                      <summary>Can I upgrade to The Furnishing later?</summary>
                      <p>Yes. The Plan fee credits 100% toward The Furnishing if you upgrade within 60 days.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Will you tell me the exact product, or just "something like this"?</summary>
                      <p>The exact product. Brand, SKU, color, and lead time. If you swap something out, we'll suggest two alternates.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Do I have to use the brands you suggest?</summary>
                      <p>No. The list is a starting point. You can deviate freely — we just won't be there to course-correct.</p>
                    </details>
                  </div>
                </>
              )}
            </div>

            <div className="sd-cta-section">
              <button className="btn-dk" onClick={() => navigate('/book')}>
                <span>Start with The Plan →</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThePlan;
