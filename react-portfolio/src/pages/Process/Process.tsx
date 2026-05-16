import { Link, useNavigate } from 'react-router-dom';
import './Process.css';

const Process = () => {
  const navigate = useNavigate();

  return (
    <div id="pg-process" className="pg on">
      <div className="how-hero">
        <button className="page-back" onClick={() => navigate('/')}>
          <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
          </svg>
          Back
        </button>
        <span className="sec-label gold">How We Work</span>
        <h1>Services built around your <em>timeline</em>.</h1>
        <p>Choose the level of support you need, from strategic planning to full turnkey delivery.</p>
      </div>
      <div className="how-body">
        <div className="how-grid">
          <article className="how-card">
            <div className="how-index">01</div>
            <h3>The Plan</h3>
            <p>Space planning, furniture layout, and a complete sourcing roadmap for owners who want to execute on their own.</p>
            <div className="how-meta">Two-week delivery</div>
            <Link to="/service/the-plan" className="how-link">View details →</Link>
          </article>

          <article className="how-card">
            <div className="how-index">02</div>
            <h3>The Furnishing</h3>
            <p>Full turnkey furnishing from layout and sourcing to procurement, install day, and final styling.</p>
            <div className="how-meta">Six to ten weeks</div>
            <Link to="/service/the-furnishing" className="how-link">View details →</Link>
          </article>

          <article className="how-card">
            <div className="how-index">03</div>
            <h3>The Refresh</h3>
            <p>A fast redesign layer for finished homes with upgraded textiles, lighting, art, and accessories.</p>
            <div className="how-meta">One-week turnaround</div>
            <Link to="/service/the-refresh" className="how-link">View details →</Link>
          </article>

          <article className="how-card">
            <div className="how-index">04</div>
            <h3>The Trade Program</h3>
            <p>For architects, designers, and realtors who need furnished outcomes quickly under white-label or co-branded execution.</p>
            <div className="how-meta">By introduction</div>
            <Link to="/service/the-trade-program" className="how-link">View details →</Link>
          </article>
        </div>

        <div className="how-cta">
          <h2>Not sure where to start?</h2>
          <p>Take the quiz and we will guide you to the right service for your space.</p>
          <button className="btn-lt" type="button" onClick={() => navigate('/book')}>
            <span>Take the Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Process;