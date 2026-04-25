import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

// Services organized by category with sub-items
const servicesData = [
  {
    category: 'Strategy',
    title: 'strategy',
    description: 'Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it\'s the key to unlocking your brand\'s full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.',
    items: [
      { title: 'social Media strategy', description: 'Crafting a tailored roadmap for your brand\'s social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence' },
      { title: 'platform strategy', description: 'Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively' },
      { title: 'digital audit', description: 'A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth' },
      { title: 'market research', description: 'Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success' },
      { title: 'Communication Strategy', description: 'Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external' },
      { title: 'content strategy', description: 'Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections' },
    ]
  },
  {
    category: 'Branding',
    title: 'branding',
    description: 'Our branding crafts narratives that resonate, transforming your identity into an unforgettable story.',
    items: []
  },
  {
    category: 'Marketing',
    title: 'marketing',
    description: 'Marketing isn\'t just a service; it\'s the heartbeat of your brand\'s journey. At Satoris Communication Studio, we view marketing as the engine that propels your brand forward. Our strategic marketing expertise serves as the compass guiding your path to success.',
    items: []
  },
  {
    category: 'PR & Digital',
    title: 'PR & Digital',
    description: 'We turn your brand\'s story into an unforgettable narrative, shaping perception and driving results through strategic storytelling.',
    items: [
      { title: 'SEO', description: 'Boosting your online visibility and search rankings with our SEO strategies that drive organic growth' },
      { title: 'Affiliate Management', description: 'Optimizing affiliate programs to expand your reach and drive results, all under expert management' },
      { title: 'Email Marketing', description: 'Engaging your audience directly through personalized and effective email campaigns that convert' },
      { title: 'Social Media Management', description: 'From content creation to engagement, our social media management ensures your brand shines in the digital spotlight' },
    ]
  },
  {
    category: 'Digital Marketing',
    title: 'Digital Marketing',
    description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click',
    items: [
      { title: 'website design', description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click' },
      { title: 'user experience', description: 'Creating intuitive user journeys that delight customers and drive conversion.' },
      { title: 'app design', description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.' },
    ]
  },
  {
    category: 'Creative & Design',
    title: 'creative & design',
    description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies. Explore our array of services designed to elevate your brand, captivate your audience, and redefine industry standards',
    items: []
  },
  {
    category: 'Technology',
    title: 'technology',
    description: 'We\'re passionate enthusiasts of technology. We firmly believe that technology isn\'t just a tool; it\'s a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows',
    items: [
      { title: 'website development', description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs' },
      { title: 'SMS promo Machine', description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns' },
      { title: 'app development', description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality' },
      { title: 'ecommerce', description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm' },
    ]
  },
  {
    category: 'Events',
    title: 'Events',
    description: 'At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide, we have honed our craft to perfection.',
    items: [
      { title: 'Custom Events', description: 'For any occasion that demands excellence, our custom events deliver tailored solutions that exceed expectations' },
      { title: 'Conventions', description: 'Crafting immersive convention experiences that engage attendees and convey your brand\'s essence' },
      { title: 'Exhibitions', description: 'Captivating exhibitions that tell your brand\'s story and leave a lasting impression on attendees' },
      { title: 'Teambuilding', description: 'Building stronger, more cohesive teams through dynamic, meaningful and engaging teambuilding experiences' },
      { title: 'Product Launch', description: 'Launching your product with flair and precision, from concept to grand unveiling' },
      { title: 'Partner Meetups', description: 'Strengthening partnerships and fostering collaboration through meticulously planned meetups' },
    ]
  },
  {
    category: 'Financial PR',
    title: 'Financial PR',
    description: 'Building credibility through strategic financial communications and media relations.',
    items: [
      { title: 'Relationship Management', description: 'Building and nurturing strong, lasting relationships that are the foundation of successful financial communication' },
      { title: 'Investor Relations', description: 'Crafting strategic and transparent communication that fosters investor trust and confidence in your financial journey' },
      { title: 'Financial PR', description: 'Building credibility through strategic financial communications and media relations.' },
    ]
  },
];

const categories = ['All', 'Strategy', 'Branding', 'Marketing', 'PR & Digital', 'Digital Marketing', 'Creative & Design', 'Technology', 'Events', 'Financial PR'];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
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
        </div>
      </section>

      {/* Filter */}
      <section style={{ background: '#dad8da', padding: 'var(--space-6) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedItem(null);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: selectedCategory === cat ? 'none' : '1px solid #32373c',
                  background: selectedCategory === cat ? '#00a99d' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : '#32373c',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Alternating Layout */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {filteredServices.map((service, index) => {
            const isReversed = index % 2 === 1; // Alternate layout
            
            return (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: isReversed ? '1fr 2fr' : '2fr 1fr',
                  gap: 'var(--space-6)',
                  marginBottom: 'var(--space-12)',
                  paddingBottom: 'var(--space-12)',
                  borderBottom: '1px solid #e5e5e5'
                }}
              >
                {/* Main Column - Category Description */}
                <div style={{ 
                  padding: isReversed ? '0 0 0 var(--space-6)' : '0 var(--space-6) 0 0',
                  borderRight: isReversed ? 'none' : '1px solid #e5e5e5',
                  borderLeft: isReversed ? '1px solid #e5e5e5' : 'none',
                }}>
                  <span style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: '#00a99d', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {service.category}
                  </span>
                  <h2 style={{ 
                    fontSize: 'var(--text-2xl)', 
                    color: '#32373c',
                    fontWeight: 600,
                    marginTop: 'var(--space-2)',
                    textTransform: 'capitalize'
                  }}>
                    {service.title}
                  </h2>
                  <p style={{ 
                    color: '#666', 
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.7,
                    marginTop: 'var(--space-4)'
                  }}>
                    {service.description}
                  </p>
                </div>

                {/* Sub-items Column */}
                <div>
                  {service.items.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      {service.items.map((item, i) => {
                        const isExpanded = expandedItem === `${service.category}-${item.title}`;
                        return (
                          <div
                            key={i}
                            onClick={() => setExpandedItem(isExpanded ? null : `${service.category}-${item.title}`)}
                            style={{ 
                              cursor: 'pointer',
                              borderBottom: '1px solid #e5e5e5',
                              paddingBottom: 'var(--space-3)'
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <h3 style={{ 
                                fontSize: 'var(--text-base)', 
                                color: '#32373c',
                                fontWeight: 600,
                                textTransform: 'capitalize'
                              }}>
                                {item.title}
                              </h3>
                              <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 16 16" 
                                fill="none"
                                style={{ 
                                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s'
                                }}
                              >
                                <path d="M4 6L8 10L12 6" stroke="#32373c" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            {isExpanded && (
                              <p style={{ 
                                color: '#666', 
                                fontSize: 'var(--text-sm)',
                                lineHeight: 1.6,
                                marginTop: 'var(--space-2)'
                              }}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>
                      No sub-services available
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#32373c', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 'var(--space-4)', fontSize: 'var(--text-3xl)' }}>
            let's create together
          </h2>
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
        </div>
      </section>
    </div>
  );
}

export default Services;