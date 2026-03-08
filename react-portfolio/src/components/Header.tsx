import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isStuck, setIsStuck] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    // Navigate using React Router
  };

  return (
    <>
      <nav id="nav" className={isStuck ? 'stuck' : ''}>
        <Link to="/" className="n-logo" onClick={() => goTo('/')}>
          Art <span>Aesthete</span>
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