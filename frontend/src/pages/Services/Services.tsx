import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

// All services - NO children, all flat like original
const servicesData = [
  // Strategy section
  { category: 'Strategy', title: 'strategy', description: 'Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it\'s the key to unlocking your brand\'s full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.' },
  { category: 'Strategy', title: 'social Media strategy', description: 'Crafting a tailored roadmap for your brand\'s social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence' },
  { category: 'Strategy', title: 'platform strategy', description: 'Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively' },
  { category: 'Strategy', title: 'digital audit', description: 'A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth' },
  { category: 'Strategy', title: 'market research', description: 'Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success' },
  { category: 'Strategy', title: 'Communication Strategy', description: 'Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external' },
  { category: 'Strategy', title: 'content strategy', description: 'Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections' },
  
  // Branding
  { category: 'Branding', title: 'branding', description: 'We craft identities that resonate. Our branding expertise turns abstract concepts into memorable brand experiences that capture hearts and minds.' },
  
  // PR & Digital
  { category: 'PR & Digital', title: 'PR & Digital', description: 'We turn your brand\'s story into an unforgettable narrative, shaping perception and driving results through strategic storytelling.' },
  { category: 'PR & Digital', title: 'Financial PR & IR', description: 'Specialized PR for financial markets, investor relations, and corporate communications that builds trust with stakeholders.' },
  { category: 'PR & Digital', title: 'SEO', description: 'Search engine optimization that increases visibility and drives organic traffic to your digital presence.' },
  { category: 'PR & Digital', title: 'Content Creation', description: 'Compelling content that resonates with your audience and drives meaningful connections.' },
  { category: 'PR & Digital', title: 'Social Media Management', description: 'We blend storytelling with strategy, creating social narratives that resonate and engage. From content creation to community management, we turn followers into advocates.' },
  
  // Digital Marketing
  { category: 'Digital Marketing', title: 'website design', description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click' },
  { category: 'Digital Marketing', title: 'user experience', description: 'Creating intuitive user journeys that delight customers and drive conversion.' },
  { category: 'Digital Marketing', title: 'app design', description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.' },
  
  // Creative & Design
  { category: 'Creative & Design', title: 'creative & design', description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies. Explore our array of services designed to elevate your brand, captivate your audience, and redefine industry standards.' },
  
  // Technology
  { category: 'Technology', title: 'technology', description: 'We\'re passionate enthusiasts of technology. We firmly believe that technology isn\'t just a tool; it\'s a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows.' },
  { category: 'Technology', title: 'website development', description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs, either if it is a custom code build or an open platform' },
  { category: 'Technology', title: 'SMS promo Machine', description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns' },
  { category: 'Technology', title: 'app development', description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality' },
  { category: 'Technology', title: 'ecommerce', description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm' },
  
  // Events
  { category: 'Events', title: 'Events', description: 'From memorable corporate gatherings to immersive product launches, our event marketing expertise brings your brand to life.' },
  { category: 'Events', title: 'Content Creation', description: 'Crafting compelling stories, visuals and engaging content that resonate with and capture attention of your audience.' },
  { category: 'Events', title: 'social Media managment', description: 'We blend storytelling with strategy, creating social narratives that resonate and engage. From content creation to community management, we turn followers into advocates.' },
];

const categories = ['All', 'Strategy', 'Branding', 'PR & Digital', 'Digital Marketing', 'Creative & Design', 'Technology', 'Events'];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
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
                  setExpandedService(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: '4px',
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

      {/* Services - Simple Accordion Like Original */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {filteredServices.map((service) => {
              const isExpanded = expandedService === `${service.category}-${service.title}`;
              return (
                <motion.div
                  key={`${service.category}-${service.title}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ 
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Header - Always visible */}
                  <div 
                    onClick={() => setExpandedService(isExpanded ? null : `${service.category}-${service.title}`)}
                    style={{ 
                      padding: 'var(--space-4) var(--space-6)', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: isExpanded ? '#f5f5f5' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                      <span style={{ 
                        fontSize: 'var(--text-xs)', 
                        color: '#00a99d', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        minWidth: '140px'
                      }}>
                        {service.category}
                      </span>
                      <h3 style={{ 
                        fontSize: 'var(--text-lg)', 
                        color: '#32373c',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4L6 8L10 4" stroke="#32373c" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ 
                        padding: 'var(--space-4) var(--space-6) var(--space-5)',
                        borderTop: '1px solid #e5e5e5',
                        background: '#fafafa'
                      }}
                    >
                      <p style={{ 
                        color: '#32373c', 
                        fontSize: 'var(--text-base)',
                        lineHeight: 1.7,
                        maxWidth: '800px'
                      }}>
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#32373c', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ color: '#fff', marginBottom: 'var(--space-4)' }}>let's create together</h2>
            <p style={{ color: '#fff', opacity: 0.8, marginBottom: 'var(--space-6)' }}>
              Your vision, our expertise - let's build something extraordinary
            </p>
            <a href="/contact" style={{ 
              background: '#00a99d', 
              color: '#fff', 
              padding: '14px 32px', 
              borderRadius: '4px', 
              textDecoration: 'none', 
              fontWeight: 600,
              display: 'inline-block'
            }}>
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;