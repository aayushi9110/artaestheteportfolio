import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceDetails.css';

const TheFurnishing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'process' | 'included' | 'packages' | 'addons' | 'faq'>('process');

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
            <h1>Empty rooms to finished home. </h1>
            <p className="sd-subhead">Full turnkey furnishing for newly-renovated condos, co-ops, and brownstones in Manhattan and Brooklyn.</p>
          </div>
        </section>

        <section className="sd-body">
          <div className="sd-body-content">
            <p>This is the studio's main work, and it's what we do best. From the day you hand over the keys to the day you host your first dinner, we run the whole thing — plan, source, procure, install, style. You make decisions when they're real decisions. Everything else, we handle.</p>

            <div className="sd-tabs" role="tablist" aria-label="The Furnishing sections">
              <button className={`sd-tab ${activeTab === 'process' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('process')}>Process</button>
              <button className={`sd-tab ${activeTab === 'included' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('included')}>Included</button>
              <button className={`sd-tab ${activeTab === 'packages' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('packages')}>Packages</button>
              <button className={`sd-tab ${activeTab === 'addons' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('addons')}>Add-ons</button>
              <button className={`sd-tab ${activeTab === 'faq' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('faq')}>FAQ</button>
            </div>

            <div className="sd-section sd-panel">
              {activeTab === 'process' && (
                <>
                  <h2>The process, six phases</h2>
                  <ul className="sd-list">
                    <li><strong>01 — Discovery.</strong> A site visit, a long conversation, a floor plan you can read. (Week 1)</li>
                    <li><strong>02 — Plan.</strong> Layout, lighting, palette. Three directions, one chosen. (Week 2)</li>
                    <li><strong>03 — Source.</strong> Trade catalogs and vintage dealers. You see every option, we narrow to your shortlist. (Weeks 2–4)</li>
                    <li><strong>04 — Procure.</strong> Orders placed, lead times tracked, deliveries routed to a receiving warehouse. (Weeks 3–8)</li>
                    <li><strong>05 — Install.</strong> One choreographed day. Furniture in, art hung, drapery installed, room styled. (Weeks 8–10)</li>
                    <li><strong>06 — Polish.</strong> A two-week reveal window. Anything off, we fix. (Weeks 10–12)</li>
                  </ul>
                </>
              )}

              {activeTab === 'included' && (
                <>
                  <h2>What's included</h2>
                  <ul className="sd-list">
                    <li>Discovery call and on-site visit</li>
                    <li>Complete floor plan, lighting plan, and palette direction</li>
                    <li>Three concept routes, one chosen — two revision rounds included</li>
                    <li>Sourcing through trade accounts and the vintage dealers we trust</li>
                    <li>Procurement, receiving warehouse coordination, delivery routing</li>
                    <li>Install day with movers, art hangers, drapery installers, and one of us on the ground</li>
                    <li>Final styling pass</li>
                    <li>Two-week post-install fix window</li>
                  </ul>
                </>
              )}

              {activeTab === 'packages' && (
                <>
                  <h2>Packages</h2>
                  <div className="sd-table-wrapper">
                    <table className="sd-table">
                      <thead>
                        <tr>
                          <th>Package</th>
                          <th>Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Studio</td>
                          <td>5–6 weeks</td>
                        </tr>
                        <tr>
                          <td>1-Bedroom</td>
                          <td>6–8 weeks</td>
                        </tr>
                        <tr>
                          <td>2-Bedroom</td>
                          <td>8–10 weeks</td>
                        </tr>
                        <tr>
                          <td>3-Bedroom</td>
                          <td>10–12 weeks</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === 'addons' && (
                <>
                  <h2>Add-ons</h2>
                  <ul className="sd-list">
                    <li>Art curation</li>
                    <li>Styling day</li>
                  </ul>
                </>
              )}

              {activeTab === 'faq' && (
                <>
                  <h2>FAQ</h2>
                  <div className="sd-faq-stack">
                    <details className="sd-faq-toggle" open>
                      <summary>How many projects do you take at once?</summary>
                      <p>One or two. That's why timelines hold.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Can I see things before I commit?</summary>
                      <p>Yes. Every piece is presented with images, dimensions, and price before it's ordered. Nothing gets bought without your sign-off.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>What if I hate something after install?</summary>
                      <p>Two revision rounds are included during design. After install, the two-week polish window covers any swap, restyle, or replacement that didn't translate from the renderings.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Do you work outside NYC?</summary>
                      <p>Yes, depends case-by-case.</p>
                    </details>
                    <details className="sd-faq-toggle">
                      <summary>Can I pause and finish the apartment over time?</summary>
                      <p>Yes — we can phase the work by room. If that's the plan, The Plan is the right entry point.</p>
                    </details>
                  </div>
                </>
              )}
            </div>

            <div className="sd-cta-section">
              <div className="sd-cta-buttons">
                <button className="btn-dk" onClick={() => navigate('/book')}>
                  <span>Take the Furnishing Quiz →</span>
                </button>
                <button className="btn-tr" onClick={() => navigate('/book')}>
                  <span>Book a 20-min intro call →</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TheFurnishing;
