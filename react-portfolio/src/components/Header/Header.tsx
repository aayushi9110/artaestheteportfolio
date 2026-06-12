import { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const STUCK_BREAKPOINT = 1100;
const TRADE_TOOLTIP_TEXT = 'For designers, architects, and realtors furnishing on behalf of a client.';
const LIGHT_LOGO_DISABLED_PATHS = ['/process'];
const LIGHT_LOGO_DISABLED_PREFIXES: string[] = [];

type LightLogoRuleInput = {
  normalizedPathname: string;
  isSubPage: boolean;
  isStuck: boolean;
};

const shouldUseLightLogoMark = ({
  normalizedPathname,
  isSubPage,
  isStuck,
}: LightLogoRuleInput) => {
  if (!isSubPage || isStuck) return false;
  if (LIGHT_LOGO_DISABLED_PATHS.includes(normalizedPathname)) return false;
  if (LIGHT_LOGO_DISABLED_PREFIXES.some((prefix) => normalizedPathname.startsWith(prefix))) return false;
  return true;
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const search = location.search;
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const isHomePage = normalizedPathname === '/';
  const isBookPage = normalizedPathname === '/book';
  const isTradeProgramView = isBookPage && new URLSearchParams(search).get('audience') === 'trade';
  const shouldForceStuck = isHomePage || isBookPage;
  const [isStuck, setIsStuck] = useState(() => shouldForceStuck || window.innerWidth <= STUCK_BREAKPOINT || window.scrollY > 50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSubPage = normalizedPathname !== '/';
  const isHowWeWorkPage = normalizedPathname === '/process';
  const isServiceDetailPage = normalizedPathname.startsWith('/service/');
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
  const darkLogoSrc = '/images/logos/artAesthete.png?v=2';
  const lightLogoSrc = '/images/logos/artAesthetewh.png?v=2';
  const useLightLogoMark = shouldUseLightLogoMark({
    normalizedPathname,
    isSubPage,
    isStuck,
  });
  const logoSrc = useLightLogoMark ? lightLogoSrc : darkLogoSrc;

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

  const goToTradeProgram = () => {
    closeMobileMenu();

    if (normalizedPathname === '/book' && isTradeProgramView) {
      scrollToTop();
      return;
    }

    navigate('/book?audience=trade');
    window.requestAnimationFrame(() => {
      scrollToTop();
    });
  };

  return (
    <>
      <nav id="nav" className={`${isStuck ? 'stuck' : ''} ${isSubPage ? 'subpage' : ''} ${isHowWeWorkPage ? 'process-page' : ''} ${isServiceDetailPage ? 'service-page' : ''}`.trim()}>
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
        {!isBookPage ? (
          <button className={`n-book ${isBookActive ? 'active' : ''}`.trim()} onClick={() => goTo('/book')}>
            <span>Book Consultation</span>
          </button>
        ) : (
          <div className="n-book-wrap n-book-wrap-trade">
            <button
              className={`n-book-icon ${isTradeProgramView ? 'active' : ''}`.trim()}
              onClick={goToTradeProgram}
              aria-describedby="trade-program-tooltip"
              aria-label="Trade Program"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="2.6" />
                <circle cx="6" cy="12" r="2.6" />
                <circle cx="18" cy="19" r="2.6" />
                <path d="M8.35 10.95 15.55 6.9" />
                <path d="M8.35 13.05 15.55 17.1" />
              </svg>
            </button>
            <span className="n-book-tooltip" id="trade-program-tooltip" role="tooltip">
              {TRADE_TOOLTIP_TEXT}
            </span>
          </div>
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
          {isBookPage && <button className={isTradeProgramView ? 'active' : ''} onClick={goToTradeProgram}>Trade Program</button>}
          <button onClick={closeMobileMenu}>✕</button>
        </div>
      )}
    </>
  );
};

export default Header;
