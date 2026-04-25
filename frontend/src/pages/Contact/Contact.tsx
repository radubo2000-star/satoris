import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's make things happen together!
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-12)' }}>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Get in Touch</h2>
              
              {submitted ? (
                <div style={{ 
                  padding: 'var(--space-8)', 
                  background: 'var(--color-success)', 
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--color-white)',
                  textAlign: 'center'
                }}>
                  <h3>Thank you!</h3>
                  <p>Your message has been sent. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 500 }}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid var(--color-gray-lighter)', 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-base)'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 500 }}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid var(--color-gray-lighter)', 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-base)'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 500 }}>Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid var(--color-gray-lighter)', 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-base)'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label htmlFor="subject" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 500 }}>Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid var(--color-gray-lighter)', 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-base)',
                        background: 'var(--color-white)'
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="event">Event Inquiry</option>
                      <option value="pr">PR & Communication</option>
                      <option value="digital">Digital Services</option>
                      <option value="branding">Branding</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 500 }}>Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid var(--color-gray-lighter)', 
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-base)',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Contact Information</h2>
              
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Address</h3>
                <p>
                  70-84 Ion Mihalache Bd, b.45, S1<br />
                  Bucharest, RO
                </p>
              </div>
              
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Phone</h3>
                <p>+4 0723257755</p>
              </div>
              
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Email</h3>
                <p>contact@satoris.ro</p>
              </div>
              
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Hours</h3>
                <p>Mon-Fri 9am-6pm</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;