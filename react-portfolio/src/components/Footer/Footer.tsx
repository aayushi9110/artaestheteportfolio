import { Link } from 'react-router-dom';
import './Footer.css';

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    handle: '@yourinstagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: '#',
    handle: '@yourpinterest',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M12 3.5c-4.2 0-7 2.9-7 6.5 0 2.5 1.4 4.4 3.5 5.1" />
        <path d="M10.4 20.2l1.2-4.6" />
        <path d="M10.8 13.2c.7 1 1.8 1.5 3.1 1.5 2.8 0 4.7-2.4 4.7-5.4 0-3.2-2.6-5.8-6.4-5.8-4.5 0-7.3 3.1-7.3 6.6 0 1.5.6 2.9 1.8 3.6" />
        <path d="M12.6 8.2c1.1 0 1.9.8 1.9 2 0 1.9-1 3.4-2.4 3.4-1 0-1.7-.8-1.5-1.9l.5-2.1c.2-.8.8-1.4 1.5-1.4z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    handle: 'in/yourlinkedin',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.8 8.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM5.2 9.8h3.2v8.9H5.2V9.8Zm5.1 0h3v1.2h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2 3.9 4.7v4.6h-3.2v-4.1c0-1 0-2.3-1.5-2.3s-1.7 1.1-1.7 2.2v4.2h-3.2V9.8Z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="ft">
      <div className="ft-social">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.href} className="ft-soc" aria-label={link.name}>
            <span className="ft-soc-icon">{link.icon}</span>
            <span className="ft-soc-copy">
              <strong>{link.name}</strong>
              <span>{link.handle}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="ft-grid">
        <div>
          <Link to="/" className="n-logo ft-logo">
            <img src="/images/logos/artAesthetewh.png" alt="Logo" style={{height: '32px', marginRight: '8px', verticalAlign: 'middle'}} />
            Art <span>Aesthete</span>
          </Link>
          <p className="ft-about">
            A design studio dedicated to the art of living — where every room is a canvas and every object tells a story.
          </p>
        </div>
        <div className="ft-col">
          <h5>Studio</h5>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/about">Our Team</Link></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <h5>Services</h5>
          <ul>
            <li><Link to="/process">Interior Design</Link></li>
            <li><Link to="/virtual">Virtual Consultation</Link></li>
            <li><Link to="/portfolio">Fine Art Curation</Link></li>
            <li><Link to="/book">Book Consultation</Link></li>
          </ul>
        </div>
        <div className="ft-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="#">hello@artaesthete.co</a></li>
            <li><a href="#">+1 212 555 0142</a></li>
            <li><a href="#">New Jersey · New York</a></li>
          </ul>
        </div>
      </div>
      <div className="ft-bot">
        <p>© 2026 <span>Art Aesthete</span>. All rights reserved.</p>
        <p>Privacy · Terms</p>
      </div>
    </footer>
  );
};

export default Footer;
