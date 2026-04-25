import { color, motion } from 'framer-motion';
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="contact-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: 'var(--space-10)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#22c55e', margin: '0 auto var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontSize: '40px', color: '#fff' }}>✓</span>
          </motion.div>
          <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>Thank you!</h2>
          <p style={{ color: '#6b7280', marginBottom: 'var(--space-6)' }}>We will get back to you within 24 hours.</p>
          <button onClick={() => setIsSubmitted(false)} className="btn btn-outline">Send another message</button>
        </motion.div>
      </div>
    );
  }

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: 'var(--space-4)',
    border: focusedField === fieldName ? '2px solid #FF9100' : '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: 'var(--text-base)',
    background: '#fff',
    transition: 'all 0.3s',
    outline: 'none',
    boxShadow: focusedField === fieldName ? '0 4px 12px rgba(255,145,0,0.15)' : 'none',
  });

  return (
    <div className="contact-page">
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: '#FF9100',fontFamily: 'Montserrat', marginBottom: 'var(--space-4)' }}
          >
            Want To Work Together?
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 'var(--text-sm)', fontFamily: 'Montserrat', marginBottom: 'var(--space-4)' }}
          >
            Contact us, and let's discover how we can help your organization become even greater.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 'var(--space-12)' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Satoris PR & Digital</h2>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: '#FF9100', marginBottom: 'var(--space-2)' }}>Contact Info</h4>
                <p>
                  70-84 I. Mihalache Bd, Bl45, ent. 2, fl.1, ap.1<br />
                  District 1, Bucharest, Romania<br />
                  <a href="tel:+40723257755" style={{ color: '#FF9100' }}>+4 0723 25 77 55</a><br />
                  Mon-Fri 9am-5pm<br />
                  <a href="mailto:hello@satoris.ro" style={{ color: '#FF9100' }}>hello@satoris.ro</a>
                </p>
              </div>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: '#FF9100', marginBottom: 'var(--space-2)' }}>New Business</h4>
                <p>
                  <a href="mailto:natalia@satoris.ro" style={{ color: '#FF9100' }}>natalia@satoris.ro</a><br />
                  <a href="tel:+40723257755" style={{ color: '#FF9100' }}>+40 723 25 77 55</a>
                </p>
              </div>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: '#FF9100', marginBottom: 'var(--space-2)' }}>Other Inquiries</h4>
                <p>
                  <a href="mailto:info@satoris.ro" style={{ color: '#FF9100' }}>info@satoris.ro</a>
                </p>
              </div>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ color: '#FF9100', marginBottom: 'var(--space-2)' }}>Join the team</h4>
                <p>
                  <a href="mailto:team@satoris.ro" style={{ color: '#FF9100' }}>team@satoris.ro</a>
                </p>
              </div>

              <div>
                <h4 style={{ color: '#FF9100', marginBottom: 'var(--space-2)' }}>Press</h4>
                <p>
                  <a href="mailto:press@satoris.ro" style={{ color: '#FF9100' }}>press@satoris.ro</a><br />
                  <a href="tel:+40723257755" style={{ color: '#FF9100' }}>+4 0723 25 77 55</a>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: '#fafafa', padding: 'var(--space-8)', borderRadius: '16px' }}
            >
              <h3 style={{ marginBottom: 'var(--space-6)' }}>Prefer we call you?</h3>
              <p style={{ marginBottom: 'var(--space-6)', color: '#6b7280' }}>
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
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={inputStyle('firstName')}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={inputStyle('lastName')}
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number*"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={inputStyle('phone')}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={inputStyle('email')}
                />
                <input
                  type="text"
                  name="organization"
                  placeholder="Business/Organization name*"
                  value={formData.organization}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('organization')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={inputStyle('organization')}
                />
                <input
                  type="url"
                  name="website"
                  placeholder="Website URL"
                  value={formData.website}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('website')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('website')}
                />
                <textarea
                  name="message"
                  placeholder="Tell us how we can help*"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  style={{ ...inputStyle('message'), resize: 'vertical' }}
                />
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  style={{ justifySelf: 'center', padding: 'var(--space-4) var(--space-10)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
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

export default Contact;