import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const servicesData = [
  // PR & Digital
  {
    category: 'PR & Digital',
    title: 'PR & Digital',
    description: 'We turn your brand\'s story into an unforgettable narrative, shaping perception and driving results through strategic storytelling.',
    features: ['Media Relations', 'Press Releases', 'Crisis Communications', 'Brand Positioning', 'Corporate Communications']
  },
  {
    category: 'PR & Digital',
    title: 'Financial PR & IR',
    description: 'Specialized PR for financial markets, investor relations, and corporate communications that builds trust with stakeholders.',
    features: ['Investor Relations', 'Financial Communications', 'Annual Reports', 'ESG Communications', 'IPO Support']
  },
  {
    category: 'PR & Digital',
    title: 'SEO',
    description: 'Search engine optimization that increases visibility and drives organic traffic to your digital presence.',
    features: ['Technical SEO', 'Content Optimization', 'Link Building', 'Local SEO', 'Analytics']
  },
  {
    category: 'PR & Digital',
    title: 'Content Creation',
    description: 'Compelling content that resonates with your audience and drives meaningful connections.',
    features: ['Copywriting', 'Video Production', 'Photography', 'Graphic Design', 'Brand Content']
  },
  {
    category: 'PR & Digital',
    title: 'Social Media Management',
    description: 'Strategic social media presence that engages your audience and builds lasting community relationships.',
    features: ['Strategy', 'Community Management', 'Paid Social', 'Influencer Marketing', 'Analytics']
  },
  // Digital Marketing
  {
    category: 'Digital Marketing',
    title: 'Website Design',
    description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click.',
    features: ['UI/UX Design', 'Responsive Design', 'Custom Development', 'E-commerce', 'Landing Pages']
  },
  {
    category: 'Digital Marketing',
    title: 'User Experience',
    description: 'Creating intuitive user journeys that delight customers and drive conversion.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Journey Mapping']
  },
  {
    category: 'Digital Marketing',
    title: 'App Design',
    description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.',
    features: ['Mobile UX', 'iOS Design', 'Android Design', 'PWA', 'App Store Optimization']
  },
  // Creative & Design
  {
    category: 'Creative & Design',
    title: 'Creative & Design',
    description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies.',
    features: ['Brand Identity', 'Visual Design', 'Packaging Design', 'Print Design', 'Art Direction']
  },
  // Technology
  {
    category: 'Technology',
    title: 'Website Development',
    description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs.',
    features: ['Custom Code', 'CMS Development', 'API Integration', 'Performance', 'Security']
  },
  {
    category: 'Technology',
    title: 'SMS Promo Machine',
    description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns.',
    features: ['Campaign Management', 'Automation', 'Personalization', 'Analytics', 'Integration']
  },
  {
    category: 'Technology',
    title: 'App Development',
    description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality.',
    features: ['iOS Development', 'Android Development', 'Cross-platform', 'API Backend', 'Maintenance']
  },
  {
    category: 'Technology',
    title: 'Ecommerce',
    description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm.',
    features: ['Store Setup', 'Payment Integration', 'Inventory Management', 'Shipping', 'Security']
  },
  // Events
  {
    category: 'Events',
    title: 'Events',
    description: 'From memorable corporate gatherings to immersive product launches, our event marketing expertise brings your brand to life.',
    features: ['Corporate Events', 'Product Launches', 'Conferences', 'Team Building', 'Virtual Events']
  },
  {
    category: 'Events',
    title: 'Content Creation',
    description: 'Crafting compelling stories, visuals and engaging content that resonate with and capture attention of your audience.',
    features: ['Event Coverage', 'Live Streaming', 'Highlight Videos', 'Photography', 'Social Content']
  },
  {
    category: 'Events',
    title: 'Social Media Management',
    description: 'Strategic social media presence that engages your audience and builds lasting community relationships.',
    features: ['Event Promotion', 'Live Updates', 'User Generated Content', 'Post-event Engagement', 'Analytics']
  },
];

const categories = ['All', 'PR & Digital', 'Digital Marketing', 'Creative & Design', 'Technology', 'Events'];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  const filteredServices = selectedCategory === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <div className="services-page">
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
            Comprehensive services to unlock your business potential
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ background: '#fafafa' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filteredServices.map((service, index) => {
              const isExpanded = expandedService === `${service.category}-${service.title}`;
              return (
                <motion.div
                  key={`${service.category}-${service.title}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setExpandedService(isExpanded ? null : `${service.category}-${service.title}`)}
                  style={{ 
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: isExpanded ? '0 8px 24px rgba(255,145,0,0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s'
                  }}
                >
                  <div style={{ 
                    padding: 'var(--space-6)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ flex: 1 }}>
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
                        fontSize: 'var(--text-2xl)', 
                        marginTop: 'var(--space-2)' 
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        background: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 8L10 13L15 8" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ padding: '0 var(--space-6) var(--space-6)', borderTop: '1px solid #f3f4f6' }}
                    >
                      <p style={{ 
                        color: '#6b7280', 
                        fontSize: 'var(--text-base)',
                        lineHeight: 1.6,
                        marginTop: 'var(--space-4)'
                      }}>
                        {service.description}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 'var(--space-2)',
                        marginTop: 'var(--space-4)' 
                      }}>
                        {service.features.map((feature, i) => (
                          <span
                            key={i}
                            style={{
                              padding: 'var(--space-2) var(--space-3)',
                              background: '#f3f4f6',
                              borderRadius: '20px',
                              fontSize: 'var(--text-sm)',
                              color: '#374151'
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
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