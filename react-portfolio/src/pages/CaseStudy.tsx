import { useParams } from 'react-router-dom';

const CaseStudy = () => {
  const { id } = useParams();

  return (
    <div id="pg-case-study" className="pg">
      <div className="cs-hero">
        <div className="cs-hero-c">
          <span className="sec-label">Case Study</span>
          <h1>Project {id}</h1>
        </div>
      </div>
      <div className="cs-body">
        {/* Case study content */}
      </div>
    </div>
  );
};

export default CaseStudy;