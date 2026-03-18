import { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const STUCK_BREAKPOINT = 1100;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isBookPage = pathname === '/book';
  const [isStuck, setIsStuck] = useState(() => isBookPage || window.innerWidth <= STUCK_BREAKPOINT || window.scrollY > 50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSubPage = location.pathname !== '/';
  const isHomeActive = pathname === '/';
  const isPortfolioActive =
    pathname === '/portfolio' ||
    pathname.startsWith('/interior-story/') ||
    pathname.startsWith('/fine-art-story/') ||
    pathname.startsWith('/case-study/') ||
    pathname.startsWith('/project/');
  const isProcessActive = pathname === '/process';
  const isAboutActive = pathname === '/about';
  const isVirtualActive = pathname === '/virtual';
  const isBookActive = pathname === '/book';
  const logoSrc = isSubPage && !isStuck ? '/images/logos/artAesthetewh.png' : '/images/logos/artAesthete.png';

  useEffect(() => {
    if (isBookPage) {
      setIsStuck(true);
      return;
    }

    const updateStuckState = () => {
      const shouldStickForViewport = window.innerWidth <= STUCK_BREAKPOINT;
      setIsStuck(shouldStickForViewport || window.scrollY > 50);
    };

    updateStuckState();
    window.addEventListener('scroll', updateStuckState);
    window.addEventListener('resize', updateStuckState);

    return () => {
      window.removeEventListener('scroll', updateStuckState);
      window.removeEventListener('resize', updateStuckState);
    };
  }, [isBookPage]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const goTo = (path: string) => {
    closeMobileMenu();

    if (pathname === path) {
      scrollToTop();
      return;
    }

    navigate(path);
    window.requestAnimationFrame(() => {
      scrollToTop();
    });
  };

  return (
    <>
      <nav id="nav" className={`${isStuck ? 'stuck' : ''} ${isSubPage ? 'subpage' : ''}`.trim()}>
        <Link to="/" className={`n-logo ${isHomeActive ? 'active' : ''}`.trim()} onClick={() => goTo('/')}> 
          <img className="n-logo-mark" src={logoSrc} alt="Logo" style={{height: '32px', marginRight: '8px', verticalAlign: 'middle'}} />
          Art 
          <span>Aesthete
            <span className='byaayushi'> By Aayushi</span>
          </span>
          
        </Link>
        <ul className="n-links">
          <li><Link to="/portfolio" className={isPortfolioActive ? 'active' : ''} onClick={() => goTo('/portfolio')}>Portfolio</Link></li>
          <li><Link to="/process" className={isProcessActive ? 'active' : ''} onClick={() => goTo('/process')}>Process</Link></li>
          <li><Link to="/about" className={isAboutActive ? 'active' : ''} onClick={() => goTo('/about')}>About</Link></li>
          <li><Link to="/virtual" className={isVirtualActive ? 'active' : ''} onClick={() => goTo('/virtual')}>Virtual Consult</Link></li>
        </ul>
        {!isBookPage && (
          <button className={`n-book ${isBookActive ? 'active' : ''}`.trim()} onClick={() => goTo('/book')}>
            <span>Book Consultation</span>
          </button>
        )}
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
          <Link to="/" className={isHomeActive ? 'active' : ''} onClick={() => goTo('/')}>Home</Link>
          <Link to="/portfolio" className={isPortfolioActive ? 'active' : ''} onClick={() => goTo('/portfolio')}>Portfolio</Link>
          <Link to="/process" className={isProcessActive ? 'active' : ''} onClick={() => goTo('/process')}>Process</Link>
          <Link to="/about" className={isAboutActive ? 'active' : ''} onClick={() => goTo('/about')}>About</Link>
          <Link to="/virtual" className={isVirtualActive ? 'active' : ''} onClick={() => goTo('/virtual')}>Virtual Consult</Link>
          {!isBookPage && <button className={isBookActive ? 'active' : ''} onClick={() => goTo('/book')}>Book Consultation</button>}
          <button onClick={closeMobileMenu}>✕</button>
        </div>
      )}
    </>
  );
};

export default Header;
