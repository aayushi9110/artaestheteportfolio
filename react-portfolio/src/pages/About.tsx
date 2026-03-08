const About = () => {
  return (
    <div id="pg-about" className="pg">
      <div className="ab-hero">
        <div className="ab-hero-c">
          <button className="page-back" onClick={() => window.history.back()}>
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
              <div style={{marginTop: '28px'}}>
                <button className="btn-dk" onClick={() => {}}>Work With Us</button>
              </div>
            </div>
            <div className="ab-intro-img rr">
              <img src="/images/studio-about.jpg" alt="Studio"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
