import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const teamMembers = [
  {
    name: 'Natalia Pruteanu',
    role: 'Founder, PR, PR FIN, Events',
    image: 'https://satoris.ro/wp-content/uploads/2023/09/c530c303-53e2-423f-8c38-2e4570e1dce3.jpg',
  },
  {
    name: 'Viorica P',
    role: 'Digital, Social, USA based',
    image: 'https://satoris.ro/wp-content/uploads/2023/09/IMG_1042.jpg',
  },
  {
    name: 'Dragos C',
    role: 'TECH, IT, EVENTS, Strategy',
    image: 'https://satoris.ro/wp-content/uploads/2021/09/1524227999864.jpeg',
  },
];

const values = [
  {
    title: 'Creativity & Innovation',
    description: 'Creativity and innovation are the cornerstones of our approach. We continuously push boundaries, break conventions, and pioneer inventive strategies to ensure your brand stands out in a world of possibilities.',
  },
  {
    title: 'Integrity & Trust',
    description: 'To keep it simple, authenticity is a must. To keep it truly authentic, integrity is a must. Simplicity, authenticity and integrity will build trust.',
  },
  {
    title: 'Brand-first Approach',
    description: 'We believe in the power of a brand-first approach, where every strategy, campaign, and event is thoughtfully crafted to reflect and elevate your unique brand essence.',
  },
  {
    title: 'Love Digital',
    description: 'Our unwavering love for all things digital drives our passion for innovative, data-driven solutions that propel your brand to new heights in the digital landscape.',
  },
  {
    title: 'Going the Extra Mile',
    description: "Going the extra mile isn't just a commitment; it's a culture. We thrive on exceeding expectations, delivering unparalleled service, and crafting experiences that leave an indelible mark.",
  },
  {
    title: 'Collaboration',
    description: 'We care about people, team and partners. We believe in teamwork. We support local communities, we support start-ups, we are volunteers.',
  },
];

function About() {
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
    console.log('Join team application:', formData);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Full-stack communication studio
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're a full-stack PR & digital, marketing and events studio based in the center of Bucharest. 
            From strategy to implementation, we're here to help make your brand shine.
          </motion.p>
        </div>
      </section>

      {/* Hero Image */}
      <section style={{ padding: 0 }}>
        <img 
          src="https://satoris.ro/wp-content/uploads/2023/09/margarida-afonso-F01g8NPdOdo-unsplash-2-scaled-e1695293981273.jpg" 
          alt="Satoris Team"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
        />
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>The codes we live by</h2>
          </div>
          <div className="grid grid-3" style={{ marginTop: 'var(--space-10)' }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" style={{ background: 'var(--color-gray-lightest)' }}>
        <div className="container">
          <div className="section-title">
            <h2>SATORIS is its people</h2>
          </div>
          <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-10)' }}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: '0 16px 32px rgba(255,145,0,0.2)' }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ padding: 0, borderRadius: '16px', overflow: 'hidden', background: '#fff', cursor: 'pointer' }}
              >
                <motion.img 
                  src={member.image} 
                  alt={member.name}
                  whileHover={{ scale: 1.05 }}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
                <div style={{ padding: 'var(--space-6)' }}>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>{member.name}</h3>
                  <p style={{ color: '#FF9100', fontWeight: 600 }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Join Satoris team</h2>
            <p>
              Are you a volunteer or student? You will get our support in whatever you wish to learn. 
              Just drop us a line. Are you a specialist wishing to develop? We welcome you!
            </p>
          </div>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="organization"
                placeholder="Business/Organization name"
                value={formData.organization}
                onChange={handleChange}
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
                placeholder="Tell us how we can help"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <button type="submit" className="btn btn-primary" style={{ justifySelf: 'center' }}>
                SEND
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Values We Care About */}
      <section className="section" style={{ background: 'var(--color-gray-lightest)' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: 'var(--space-8)' }}>
            <div>
              <h3>We care about people, team and partners</h3>
              <ul style={{ marginTop: 'var(--space-4)', lineHeight: 2 }}>
                <li>We believe in teamwork</li>
                <li>We support local communities</li>
                <li>We support start-ups</li>
                <li>We are volunteers</li>
              </ul>
            </div>
            <div>
              <h3>Get to know us</h3>
              <p style={{ marginTop: 'var(--space-4)' }}>
                SATORIS is its people. We're a team of passionate professionals dedicated to making your brand shine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

export default About;