import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

// All services from original - descriptions always visible
const servicesData = [
  // Strategy
  { category: 'Strategy', title: 'strategy', description: 'Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it\'s the key to unlocking your brand\'s full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.' },
  { category: 'Strategy', title: 'social Media strategy', description: 'Crafting a tailored roadmap for your brand\'s social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence' },
  { category: 'Strategy', title: 'platform strategy', description: 'Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively' },
  { category: 'Strategy', title: 'digital audit', description: 'A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth' },
  { category: 'Strategy', title: 'market research', description: 'Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success' },
  { category: 'Strategy', title: 'Communication Strategy', description: 'Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external' },
  { category: 'Strategy', title: 'content strategy', description: 'Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections' },
  
  // Branding
  { category: 'Branding', title: 'branding', description: 'Our branding crafts narratives that resonate, transforming your identity into an unforgettable story.' },
  
  // Marketing
  { category: 'Marketing', title: 'marketing', description: 'Marketing isn\'t just a service; it\'s the heartbeat of your brand\'s journey. At Satoris Communication Studio, we view marketing as the engine that propels your brand forward. Our strategic marketing expertise serves as the compass guiding your path to success. We\'re passionate about crafting marketing solutions that elevate your brand, captivate your audience, and drive results.' },
  
  // PR & Digital
  { category: 'PR & Digital', title: 'SEO', description: 'Boosting your online visibility and search rankings with our SEO strategies that drive organic growth' },
  { category: 'PR & Digital', title: 'Affiliate Management', description: 'Optimizing affiliate programs to expand your reach and drive results, all under expert management' },
  { category: 'PR & Digital', title: 'Email Marketing', description: 'Engaging your audience directly through personalized and effective email campaigns that convert' },
  { category: 'PR & Digital', title: 'Social Media Management', description: 'From content creation to engagement, our social media management ensures your brand shines in the digital spotlight' },
  
  // Digital Marketing
  { category: 'Digital Marketing', title: 'website design', description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click' },
  { category: 'Digital Marketing', title: 'user experience', description: 'Creating intuitive user journeys that delight customers and drive conversion.' },
  { category: 'Digital Marketing', title: 'app design', description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.' },
  
  // Creative & Design
  { category: 'Creative & Design', title: 'creative & design', description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies. Explore our array of services designed to elevate your brand, captivate your audience, and redefine industry standards' },
  
  // Technology
  { category: 'Technology', title: 'technology', description: 'We\'re passionate enthusiasts of technology. We firmly believe that technology isn\'t just a tool; it\'s a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows' },
  { category: 'Technology', title: 'website development', description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs, either if it is a custom code build or an open platform' },
  { category: 'Technology', title: 'SMS promo Machine', description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns' },
  { category: 'Technology', title: 'app development', description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality' },
  { category: 'Technology', title: 'ecommerce', description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm' },
  
  // Events
  { category: 'Events', title: 'Events', description: 'At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide, we have honed our craft to perfection.' },
  { category: 'Events', title: 'Custom Events', description: 'For any occasion that demands excellence, our custom events deliver tailored solutions that exceed expectations' },
  { category: 'Events', title: 'Conventions', description: 'Crafting immersive convention experiences that engage attendees and convey your brand\'s essence' },
  { category: 'Events', title: 'Exhibitions', description: 'Captivating exhibitions that tell your brand\'s story and leave a lasting impression on attendees' },
  { category: 'Events', title: 'Teambuilding', description: 'Building stronger, more cohesive teams through dynamic, meaningful and engaging teambuilding experiences' },
  { category: 'Events', title: 'Product Launch', description: 'Launching your product with flair and precision, from concept to grand unveiling' },
  { category: 'Events', title: 'Partner Meetups', description: 'Strengthening partnerships and fostering collaboration through meticulously planned meetups' },
  
  // Financial PR
  { category: 'Financial PR', title: 'Relationship Management', description: 'Building and nurturing strong, lasting relationships that are the foundation of successful financial communication' },
  { category: 'Financial PR', title: 'Investor Relations', description: 'Crafting strategic and transparent communication that fosters investor trust and confidence in your financial journey' },
  { category: 'Financial PR', title: 'Financial PR', description: 'Building credibility through strategic financial communications and media relations.' },
];

const categories = ['All', 'Strategy', 'Branding', 'Marketing', 'PR & Digital', 'Digital Marketing', 'Creative & Design', 'Technology', 'Events', 'Financial PR'];

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
                  setExpandedService(null);
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

      {/* Services - Simple List Like Original */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {filteredServices.map((service) => {
              const isExpanded = expandedService === `${service.category}-${service.title}`;
              return (
                <div
                  key={`${service.category}-${service.title}`}
                  onClick={() => setExpandedService(isExpanded ? null : `${service.category}-${service.title}`)}
                  style={{ 
                    borderBottom: '1px solid #e5e5e5',
                    cursor: 'pointer'
                  }}
                >
                  {/* Header Row */}
                  <div style={{ 
                    padding: 'var(--space-4) 0', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: 'var(--text-xs)', 
                        color: '#00a99d', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {service.category}
                      </span>
                      <h3 style={{ 
                        fontSize: 'var(--text-lg)', 
                        color: '#32373c',
                        fontWeight: 600,
                        marginTop: '4px'
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                      style={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                      }}
                    >
                      <path d="M6 8L10 12L14 8" stroke="#32373c" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Description - Visible when expanded */}
                  {isExpanded && (
                    <div style={{ paddingBottom: 'var(--space-4)' }}>
                      <p style={{ 
                        color: '#666', 
                        fontSize: 'var(--text-base)',
                        lineHeight: 1.6,
                        maxWidth: '800px'
                      }}>
                        {service.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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