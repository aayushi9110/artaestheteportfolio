import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isStuck, setIsStuck] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // @ts-ignore - location will be used for active link styling
  const _location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const goTo = (path: string) => {
    closeMobileMenu();
    navigate(path);
  };

  return (
    <>
      <nav id="nav" className={isStuck ? 'stuck' : ''}>
        <Link to="/" className="n-logo" onClick={() => goTo('/')}> 
          <img src="/images/logos/artAesthete.png" alt="Logo" style={{height: '32px', marginRight: '8px', verticalAlign: 'middle'}} />
          Art 
          <span>Aesthete
            <span className='byaayushi'> By Aayushi</span>
          </span>
          
        </Link>
        <ul className="n-links">
          <li><Link to="/portfolio" onClick={() => goTo('/portfolio')}>Portfolio</Link></li>
          <li><Link to="/process" onClick={() => goTo('/process')}>Process</Link></li>
          <li><Link to="/about" onClick={() => goTo('/about')}>About</Link></li>
          <li><Link to="/virtual" onClick={() => goTo('/virtual')}>Virtual Consult</Link></li>
        </ul>
        <button className="n-book" onClick={() => goTo('/book')}>
          <span>Book Consultation</span>
        </button>
        <button
          className="n-ham"
          id="ham"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className="shadow-top"></div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && ( 
        <div id="mob-nav">
          <Link to="/" onClick={() => goTo('/')}>Home</Link>
          <Link to="/portfolio" onClick={() => goTo('/portfolio')}>Portfolio</Link>
          <Link to="/process" onClick={() => goTo('/process')}>Process</Link>
          <Link to="/about" onClick={() => goTo('/about')}>About</Link>
          <Link to="/virtual" onClick={() => goTo('/virtual')}>Virtual Consult</Link>
          <button onClick={() => goTo('/book')}>Book Consultation</button>
          <button onClick={closeMobileMenu}>✕</button>
        </div>
      )}
    </>
  );
};

export default Header;