import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const servicesData = [
  // PR & Digital
  { category: 'PR & Digital', title: 'PR & Digital', description: 'We turn your brand\'s story into an unforgettable narrative, shaping perception and driving results through strategic storytelling.' },
  { category: 'PR & Digital', title: 'Financial PR & IR', description: 'Specialized PR for financial markets, investor relations, and corporate communications that builds trust with stakeholders.' },
  { category: 'PR & Digital', title: 'SEO', description: 'Search engine optimization that increases visibility and drives organic traffic to your digital presence.' },
  { category: 'PR & Digital', title: 'Content Creation', description: 'Compelling content that resonates with your audience and drives meaningful connections.' },
  { category: 'PR & Digital', title: 'Social Media Management', description: 'Strategic social media presence that engages your audience and builds lasting community relationships.' },
  // Digital Marketing
  { category: 'Digital Marketing', title: 'website design', description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click.' },
  { category: 'Digital Marketing', title: 'user experience', description: 'Creating intuitive user journeys that delight customers and drive conversion.' },
  { category: 'Digital Marketing', title: 'app design', description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality.' },
  // Creative & Design
  { category: 'Creative & Design', title: 'Creative & Design', description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies.' },
  // Technology
  { category: 'Technology', title: 'website development', description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise.' },
  { category: 'Technology', title: 'SMS promo Machine', description: 'Take control of your SMS marketing with our in-house SMS Promo Machine.' },
  { category: 'Technology', title: 'app development', description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes reality.' },
  { category: 'Technology', title: 'ecommerce', description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive.' },
  // Events
  { category: 'Events', title: 'Events', description: 'From memorable corporate gatherings to immersive product launches, our event marketing expertise brings your brand to life.' },
  { category: 'Events', title: 'Content Creation', description: 'Crafting compelling stories, visuals and engaging content that resonate with your audience.' },
  { category: 'Events', title: 'social Media Management', description: 'Strategic social media presence that engages your audience and builds lasting community relationships.' },
];

const categories = ['All', 'PR & Digital', 'Digital Marketing', 'Creative & Design', 'Technology', 'Events'];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredServices = selectedCategory === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Services
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unlock your business potential with our comprehensive services
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section">
        <div className="container">
          <motion.div 
            style={{ 
              display: 'flex', 
              gap: 'var(--space-3)', 
              justifyContent: 'center', 
              marginBottom: 'var(--space-12)', 
              flexWrap: 'wrap' 
            }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: '8px',
                  border: selectedCategory === cat ? 'none' : '2px solid #e5e7eb',
                  background: selectedCategory === cat ? '#FF9100' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#374151',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            layout
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: 'var(--space-6)' 
            }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={`${service.category}-${service.title}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(255,145,0,0.15)' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ 
                  padding: 'var(--space-6)', 
                  borderRadius: '12px', 
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  cursor: 'pointer'
                }}
              >
                <span style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: '#FF9100', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {service.category}
                </span>
                <h3 style={{ 
                  fontSize: 'var(--text-xl)', 
                  marginTop: 'var(--space-2)',
                  marginBottom: 'var(--space-3)' 
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.6 
                }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>let's create together</h2>
            <p>Your vision, our expertise - let's build something extraordinary</p>
            <a href="/contact" className="btn">Get in touch</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;