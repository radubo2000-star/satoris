import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../api/client';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <img 
                src="https://satoris.ro/wp-content/uploads/2023/09/cropped-logo-nou-25mai-05-scaled-1-600x200.jpg" 
                alt="Satoris PR & Digital"
                style={{ height: '60px', marginBottom: 'var(--space-4)' }}
              />
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
                70-84 Ion Mihalache Bd, b.45, S1, Bucharest,RO
              </li>
              <li>
                +4 0723257755
              </li>
              <li>
                Mon-Fri 9am-6pm
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            {isSubscribed ? (
              <p style={{ color: '#22c55e' }}>Thank you for subscribing!</p>
            ) : (
              <>
                <p>Sign up for free marketing tips, inspirations, and more.</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? '...' : 'Sign Me Up'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Google Maps */}
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d269.5201884610653!2d26.09912557106829!3d44.44970499639249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f208ab307a05%3A0x624562472c18c0db!2sBulevardul%20Ion%20Mihalache%2070-84%2C%20Bucure%C5%9ati!5e0!3m2!1sro!2sro!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Satoris Location"
          />
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear}. Satoris PR&Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;