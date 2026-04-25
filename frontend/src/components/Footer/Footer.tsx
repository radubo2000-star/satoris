import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/work', label: 'Work' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">SATORIS</span>
              <span className="logo-subtitle">PR & Digital</span>
            </Link>
            <p className="footer-tagline">
              We're a full-stack PR & marketing studio. From strategy to implementation, 
              we're here to help make your brand become visible & digital.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <strong>Address:</strong><br />
                70-84 Ion Mihalache Bd, b.45, S1<br />
                Bucharest, RO
              </li>
              <li>
                <strong>Phone:</strong><br />
                +4 0723257755
              </li>
              <li>
                <strong>Hours:</strong><br />
                Mon-Fri 9am-6pm
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Sign up for free marketing tips, inspirations, and more.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" required />
              <button type="submit" className="btn btn-primary">Sign Me Up</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear}. Satoris PR&Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;