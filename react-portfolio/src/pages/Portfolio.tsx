import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'interiors' | 'fineart'>('interiors');

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
    <div id="pg-portfolio" className="pg on">
      <div className="gall-hero">
        <div className="gall-hero-img"></div>
        <div className="gall-hero-c">
          <button className="page-back" onClick={() => navigate('/')}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5H2M2 5L6 1M2 5l4 4"/>
            </svg> Back
          </button>
          <span className="sec-label gold">Selected Works</span>
          <h1>A curated collection<br/>of <em>spaces & stories</em></h1>
        </div>
      </div>
      <div className="gall-body">
        <div className="gall-tabs">
          <button className={`gtab ${tab === 'interiors' ? 'act' : ''}`} onClick={() => setTab('interiors')}>All Interiors</button>
          <button className={`gtab ${tab === 'fineart' ? 'act' : ''}`} onClick={() => setTab('fineart')}>Fine Art Gallery</button>
        </div>

        <div className={`gall-section ${tab === 'interiors' ? 'on' : ''}`}>
          <div className="gall-grid int">
            <div className="gi" onClick={() => navigate('/case-study/amber')}><div className="gi-img"><img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Interior Design · New York</span><span className="gi-title">The Amber Salon</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi" onClick={() => navigate('/case-study/nordic')}><div className="gi-img"><img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Interior Design · London</span><span className="gi-title">Warm Nordic Study</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi" onClick={() => navigate('/case-study/terra')}><div className="gi-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Virtual Design · California</span><span className="gi-title">Terracotta Living</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi" onClick={() => navigate('/case-study/linen')}><div className="gi-img"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Interior Design · Paris</span><span className="gi-title">Linen & Oak</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi" onClick={() => navigate('/case-study/amber')}><div className="gi-img"><img src="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Interior Design · Dubai</span><span className="gi-title">The Sand Suite</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi" onClick={() => navigate('/case-study/terra')}><div className="gi-img"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Virtual Design · Sydney</span><span className="gi-title">Coastal Calm Living Room</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
          </div>
        </div>

        <div className={`gall-section ${tab === 'fineart' ? 'on' : ''}`}>
          <div className="gall-grid art">
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Oil on Linen</span><span className="gi-title">Earth Tones Series I</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Mixed Media</span><span className="gi-title">Sienna Abstract II</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Ceramic Sculpture</span><span className="gi-title">Clay Forms</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Watercolour</span><span className="gi-title">Rust & Ochre</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1502601425829-3e2c6d25f17c?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Textile · Commissioned</span><span className="gi-title">Woven Landscape</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Photography · Limited Ed.</span><span className="gi-title">Still, Morning</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Acrylic on Canvas</span><span className="gi-title">Burnt Edge Study</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
            <div className="gi"><div className="gi-img"><img src="https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=700&q=80" alt=""/></div><div className="gi-ov"><span className="gi-cat">Bronze Sculpture</span><span className="gi-title">Form No. 7</span><div className="gi-arr"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg></div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;