import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

// All services with full structure from original
const servicesData = [
  // Strategy - Parent with children
  {
    category: 'Strategy',
    title: 'Strategy',
    description: 'Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it\'s the key to unlocking your brand\'s full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.',
    children: [
      { title: 'Social Media strategy', description: 'Crafting a tailored roadmap for your brand\'s social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence' },
      { title: 'Platform strategy', description: 'Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively' },
      { title: 'Digital audit', description: 'A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth' },
      { title: 'Market research', description: 'Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success' },
      { title: 'Communication Strategy', description: 'Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external' },
      { title: 'Content strategy', description: 'Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections' },
    ]
  },
  // Branding
  {
    category: 'Branding',
    title: 'Branding',
    description: 'We craft identities that resonate. Our branding expertise turns abstract concepts into memorable brand experiences that capture hearts and minds.',
    features: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy']
  },
  // PR & Digital
  {
    category: 'PR & Digital',
    title: 'PR & Digital',
    description: 'We turn your brand\'s story into an unforgettable narrative, shaping perception and driving results through strategic storytelling.',
    features: ['Media Relations', 'Press Releases', 'Crisis Communications', 'Brand Positioning', 'Corporate Communications']
  },
  // Digital Marketing
  {
    category: 'Digital Marketing',
    title: 'Website design',
    description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click.',
    features: ['UI/UX Design', 'Responsive Design', 'Custom Development', 'E-commerce', 'Landing Pages']
  },
  {
    category: 'Digital Marketing',
    title: 'User experience',
    description: 'Creating intuitive user journeys that delight customers and drive conversion.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Journey Mapping']
  },
  {
    category: 'Digital Marketing',
    title: 'App design',
    description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.',
    features: ['Mobile UX', 'iOS Design', 'Android Design', 'PWA', 'App Store Optimization']
  },
  // Creative & Design
  {
    category: 'Creative & Design',
    title: 'Creative & Design',
    description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies. Explore our array of services designed to elevate your brand, captivate your audience, and redefine industry standards.',
    features: ['Brand Identity', 'Visual Design', 'Packaging Design', 'Print Design', 'Art Direction']
  },
  // Technology
  {
    category: 'Technology',
    title: 'Technology',
    description: 'We\'re passionate enthusiasts of technology. We firmly believe that technology isn\'t just a tool; it\'s a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows.',
    features: ['Innovation', 'Development', 'Integration', 'Performance', 'Security']
  },
  {
    category: 'Technology',
    title: 'Website development',
    description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs, either if it is a custom code build or an open platform.',
    features: ['Custom Code', 'CMS Development', 'API Integration', 'Performance', 'Security']
  },
  {
    category: 'Technology',
    title: 'SMS promo Machine',
    description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns.',
    features: ['Campaign Management', 'Automation', 'Personalization', 'Analytics', 'Integration']
  },
  {
    category: 'Technology',
    title: 'App development',
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
    title: 'Social Media managment',
    description: 'We blend storytelling with strategy, creating social narratives that resonate and engage. From content creation to community management, we turn followers into advocates.',
    features: ['Strategy', 'Content Creation', 'Community Management', 'Analytics', 'Advocacy']
  },
];

const categories = ['All', 'Strategy', 'Branding', 'PR & Digital', 'Digital Marketing', 'Creative & Design', 'Technology', 'Events'];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
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
            Comprehensive services to unlock your business potential
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ background: '#dad8da', padding: 'var(--space-8) 0' }}>
        <div className="container">
          <motion.div 
            style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedService(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: selectedCategory === cat ? '8px' : '8px',
                  border: selectedCategory === cat ? 'none' : '1px solid #32373c',
                  background: selectedCategory === cat ? '#00a99d' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : '#32373c',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Original Design */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: 'var(--space-6)' }}>
            {filteredServices.map((service, index) => {
              const isExpanded = selectedService === `${service.category}-${service.title}`;
              return (
                <motion.div
                  key={`${service.category}-${service.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedService(isExpanded ? null : `${service.category}-${service.title}`)}
                  style={{ 
                    background: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    minHeight: '120px'
                  }}
                >
                  {/* Header - Like original: title left, arrow right */}
                  <div style={{ 
                    padding: 'var(--space-6)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    borderBottom: isExpanded ? '1px solid #e5e5e5' : 'none'
                  }}>
                    <div style={{ flex: 1, paddingRight: 'var(--space-4)' }}>
                      <span style={{ 
                        fontSize: 'var(--text-xs)', 
                        color: '#00a99d', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}>
                        {service.category}
                      </span>
                      <h3 style={{ 
                        fontSize: 'var(--text-xl)', 
                        marginTop: 'var(--space-2)',
                        color: '#32373c',
                        fontWeight: 600
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        border: '1px solid #ddd',
                        borderRadius: '50%', 
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#32373c" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ padding: 'var(--space-6)' }}
                    >
                      {/* Main Description */}
                      <p style={{ 
                        color: '#32373c', 
                        fontSize: 'var(--text-base)',
                        lineHeight: 1.7,
                        marginBottom: 'var(--space-5)'
                      }}>
                        {service.description}
                      </p>

                      {/* Children (like original sub-items) */}
                      {service.children && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderTop: '1px solid #e5e5e5', paddingTop: 'var(--space-4)' }}>
                          {service.children.map((child, i) => (
                            <div key={i} style={{ paddingLeft: 'var(--space-4)', borderLeft: '3px solid #00a99d' }}>
                              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: '#32373c', marginBottom: 'var(--space-1)' }}>
                                {child.title}
                              </h4>
                              <p style={{ color: '#666', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                                {child.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Features tags */}
                      {service.features && (
                        <div style={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 'var(--space-2)',
                          borderTop: '1px solid #e5e5e5',
                          paddingTop: 'var(--space-4)'
                        }}>
                          {service.features.map((feature, i) => (
                            <span
                              key={i}
                              style={{
                                padding: 'var(--space-2) var(--space-3)',
                                background: '#f5f5f5',
                                borderRadius: '4px',
                                fontSize: 'var(--text-xs)',
                                color: '#32373c',
                                fontWeight: 500
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ background: '#32373c' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ color: '#fff', marginBottom: 'var(--space-4)' }}>let's create together</h2>
            <p style={{ color: '#fff', opacity: 0.8, marginBottom: 'var(--space-6)' }}>
              Your vision, our expertise - let's build something extraordinary
            </p>
            <a href="/contact" className="btn" style={{ background: '#00a99d', color: '#fff', padding: 'var(--space-4) var(--space-8)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;