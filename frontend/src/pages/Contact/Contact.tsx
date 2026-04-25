import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    website: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Thank you! We will get back to you within 24 hours.');
  };

  return (
    <div className="contact-page">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            want to work together?
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact us, and let's discover how we can help your organization become even greater.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 'var(--space-12)' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Satoris PR & Digital</h2>
              
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Contact Info</h4>
                <p>
                  70-84 I. Mihalache Bd, Bl45, ent. 2, fl.1, ap.1<br />
                  District 1, Bucharest, Romania<br />
                  <a href="tel:+40723257755" style={{ color: 'var(--color-primary)' }}>+4 0723 25 77 55</a><br />
                  Mon-Fri 9am-5pm<br />
                  <a href="mailto:hello@satoris.ro" style={{ color: 'var(--color-primary)' }}>hello@satoris.ro</a>
                </p>
              </div>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>New Business</h4>
                <p>
                  <a href="mailto:natalia@satoris.ro" style={{ color: 'var(--color-primary)' }}>natalia@satoris.ro</a><br />
                  +40 723 25 77 55
                </p>
              </div>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Other Inquiries</h4>
                <p>
                  <a href="mailto:info@satoris.ro" style={{ color: 'var(--color-primary)' }}>info@satoris.ro</a>
                </p>
              </div>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Join the team</h4>
                <p>
                  <a href="mailto:team@satoris.ro" style={{ color: 'var(--color-primary)' }}>team@satoris.ro</a>
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Press</h4>
                <p>
                  <a href="mailto:press@satoris.ro" style={{ color: 'var(--color-primary)' }}>press@satoris.ro</a><br />
                  +4 0723 25 77 55
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'var(--color-gray-lightest)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ marginBottom: 'var(--space-6)' }}>Prefer we call you?</h3>
              <p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-gray)' }}>
                Fill out your details here and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name*"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number*"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="organization"
                  placeholder="Business/Organization name*"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="url"
                  name="website"
                  placeholder="Website URL"
                  value={formData.website}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <textarea
                  name="message"
                  placeholder="Tell us how we can help*"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
                <button type="submit" className="btn btn-primary" style={{ justifySelf: 'center' }}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>let's talk</h2>
            <p>Your digital presence is about to take off</p>
            <a href="/contact" className="btn">Contact us</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid var(--color-gray-lighter)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--text-base)',
  fontFamily: 'var(--font-primary)',
};

export default Contact;