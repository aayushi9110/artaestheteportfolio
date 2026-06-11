import { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const STUCK_BREAKPOINT = 1100;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const isHomePage = normalizedPathname === '/';
  const isBookPage = normalizedPathname === '/book';
  const shouldForceStuck = isHomePage || isBookPage;
  const [isStuck, setIsStuck] = useState(() => shouldForceStuck || window.innerWidth <= STUCK_BREAKPOINT || window.scrollY > 50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSubPage = normalizedPathname !== '/';
  const isHowWeWorkPage = normalizedPathname === '/process';
  const isHomeActive = normalizedPathname === '/';
  const isPortfolioActive =
    normalizedPathname === '/portfolio' ||
    normalizedPathname.startsWith('/interior-story/') ||
    normalizedPathname.startsWith('/fine-art-story/') ||
    normalizedPathname.startsWith('/case-study/') ||
    normalizedPathname.startsWith('/project/');
  const isProcessActive = normalizedPathname === '/process';
  const isAboutActive = normalizedPathname === '/about';
  const isBookActive = normalizedPathname === '/book';
  const useLightLogoMark = isSubPage && !isStuck && !isHowWeWorkPage;
  const logoSrc = useLightLogoMark ? '/images/logos/artAesthetewh.png' : '/images/logos/artAesthete.png';

  useEffect(() => {
    if (shouldForceStuck) {
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
  }, [shouldForceStuck]);

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
      <nav id="nav" className={`${isStuck ? 'stuck' : ''} ${isSubPage ? 'subpage' : ''} ${isHowWeWorkPage ? 'process-page' : ''}`.trim()}>
        <Link to="/" className={`n-logo ${isHomeActive ? 'active' : ''}`.trim()} onClick={() => goTo('/')}> 
          <img className="n-logo-mark" src={logoSrc} alt="Logo" style={{height: '32px', marginRight: '8px', verticalAlign: 'middle'}} />
          Art 
          <span>Aesthete
            <span className='byaayushi'> By Aayushi</span>
          </span>
          
        </Link>
        <ul className="n-links">
          <li><Link to="/portfolio" className={isPortfolioActive ? 'active' : ''} onClick={() => goTo('/portfolio')}>Portfolio</Link></li>
          <li><Link to="/process" className={isProcessActive ? 'active' : ''} onClick={() => goTo('/process')}>How We Work</Link></li>
          <li><Link to="/about" className={isAboutActive ? 'active' : ''} onClick={() => goTo('/about')}>About</Link></li>
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
          <Link to="/process" className={isProcessActive ? 'active' : ''} onClick={() => goTo('/process')}>How We Work</Link>
          <Link to="/about" className={isAboutActive ? 'active' : ''} onClick={() => goTo('/about')}>About</Link>
          {!isBookPage && <button className={isBookActive ? 'active' : ''} onClick={() => goTo('/book')}>Book Consultation</button>}
          <button onClick={closeMobileMenu}>✕</button>
        </div>
      )}
    </>
  );
};

export default Header;
