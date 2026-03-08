const Portfolio = () => {
  return (
    <div id="pg-portfolio" className="pg">
      <div className="gall-hero">
        <div className="gall-hero-c">
          <span className="sec-label gold">Our Work</span>
          <h1>Portfolio</h1>
        </div>
      </div>
      <div className="gall-body">
        <div className="gall-tabs">
          <button className="gtab act">Interiors</button>
          <button className="gtab">Fine Art</button>
        </div>
        <div className="gall-section on">
          <div className="gall-grid int">
            {/* Portfolio items would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;