import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div>
          <Link to="/" className="n-logo ft-logo">
            Art <span>Aesthete</span>
          </Link>
          <p className="ft-about">
            A design studio dedicated to the art of living — where every room is a canvas and every object tells a story.
          </p>
          <div className="ft-social">
            <a href="#" className="ft-soc">Ig</a>
            <a href="#" className="ft-soc">Pt</a>
            <a href="#" className="ft-soc">Li</a>
          </div>
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
            <li><a href="#">New York · London</a></li>
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