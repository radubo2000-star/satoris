import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const serviceCategories = [
  {
    title: 'Strategy',
    description: "Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it's the key to unlocking your brand's full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.",
    services: [
      { name: 'Social Media Strategy', desc: "Crafting a tailored roadmap for your brand's social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence" },
      { name: 'Platform Strategy', desc: "Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively" },
      { name: 'Digital Audit', desc: "A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth" },
      { name: 'Market Research', desc: "Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success" },
      { name: 'Communication Strategy', desc: "Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external" },
      { name: 'Content Strategy', desc: "Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections" },
    ],
  },
  {
    title: 'Branding & Design',
    description: "Our branding crafts narratives that resonate, transforming your identity into an unforgettable story.",
    services: [
      { name: 'Branding', desc: "Our branding crafts narratives that resonate, transforming your identity into an unforgettable story." },
      { name: 'Website Design', desc: "Our websites are more than pages; they're canvases of expression and user-friendliness into every click" },
      { name: 'User Experience', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
      { name: 'App Design', desc: "In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate." },
      { name: 'Creative & Design', desc: "We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies." },
    ],
  },
  {
    title: 'Technology',
    description: "We're passionate enthusiasts of technology. We firmly believe that technology isn't just a tool; it's a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows",
    services: [
      { name: 'Website Development', desc: "Our websites are more than pixels; they're the result of in-house web development expertise, tailored to your unique needs, either if it is a custom code build or an open platform" },
      { name: 'SMS Promo Machine', desc: "Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns" },
      { name: 'App Development', desc: "Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality" },
      { name: 'Ecommerce', desc: "From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm" },
    ],
  },
  {
    title: 'Events',
    description: "At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide, we have honed our craft to perfection.",
    services: [
      { name: 'Custom Events', desc: "For any occasion that demands excellence, our custom events deliver tailored solutions that exceed expectations" },
      { name: 'Conventions', desc: "Crafting immersive convention experiences that engage attendees and convey your brand's essence" },
      { name: 'Exhibitions', desc: "Captivating exhibitions that tell your brand's story and leave a lasting impression on attendees" },
      { name: 'Teambuilding', desc: "Building stronger, more cohesive teams through dynamic, meaningful and engaging teambuilding experiences" },
      { name: 'Product Launch', desc: "Launching your product with flair and precision, from concept to grand unveiling" },
      { name: 'Partner Meetups', desc: "Strengthening partnerships and fostering collaboration through meticulously planned meetups" },
    ],
  },
  {
    title: 'Marketing',
    description: "Marketing isn't just a service; it's the heartbeat of your brand's journey. At Satoris Communication Studio, we view marketing as the engine that propels your brand forward.",
    services: [
      { name: 'Content Creation', desc: "Crafting compelling stories, visuals and engaging content that resonate with and capture attention of your audience and drive meaningful connections" },
      { name: 'Social Media Management', desc: "From content creation to engagement, our social media management ensures your brand shines in the digital spotlight" },
      { name: 'SEO', desc: "Boosting your online visibility and search rankings with our SEO strategies that drive organic growth" },
      { name: 'Affiliate Management', desc: "Optimizing affiliate programs to expand your reach and drive results, all under expert management" },
      { name: 'Email Marketing', desc: "Engaging your audience directly through personalized and effective email campaigns that convert" },
    ],
  },
  {
    title: 'Financial PR',
    description: "We specialise in Financial PR, where every word and message matters, we understand the nuances of financial communication.",
    services: [
      { name: 'Relationship Management', desc: "Building and nurturing strong, lasting relationships that are the foundation of successful financial communication" },
      { name: 'Investor Relations', desc: "Crafting strategic and transparent communication that fosters investor trust and confidence in your financial journey" },
      { name: 'Financial PR', desc: "Our goal is to take the burden of this often tedious and complex task off your shoulders, passing it on to a dedicated key manager who ensures seamless communication across different departments and countries." },
    ],
  },
];

function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  return (
    <div className="services-page">
      {/* Hero with Image */}
      <section style={{ position: 'relative', height: '50vh', minHeight: '400px' }}>
        <img 
          src="https://satoris.ro/wp-content/uploads/2023/09/services_hero.jpg"
          alt="Services"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(135deg, rgba(26,26,46,0.9) 0%, rgba(45,45,68,0.7) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="hero-content" style={{ textAlign: 'center', maxWidth: '800px', padding: 'var(--space-8)' }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: '#FF9100', marginBottom: 'var(--space-4)' }}
            >
              We're here to help you
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: '#fff' }}
            >
              Grow & stand out from the crowd
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Categories - Similar to Original */}
      {serviceCategories.map((category, catIndex) => (
        <section 
          key={catIndex} 
          className="section"
          id={category.title.toLowerCase().replace('&', '').replace(' ', '-')}
          style={{ background: catIndex % 2 === 0 ? '#fafafa' : '#fff' }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: 'var(--space-8)' }}
            >
              <h2 style={{ 
                color: '#FF9100', 
                fontSize: 'var(--text-4xl)', 
                marginBottom: 'var(--space-4)',
                textTransform: 'lowercase'
              }}>
                {category.title}
              </h2>
              <p style={{ 
                fontSize: 'var(--text-xl)', 
                lineHeight: 1.8, 
                color: 'var(--color-gray)',
                maxWidth: '900px'
              }}>
                {category.description}
              </p>
            </motion.div>

            <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
              {category.services.map((service, servIndex) => (
                <motion.div
                  key={servIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: servIndex * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(255,145,0,0.15)' }}
                  onClick={() => setExpandedService(expandedService === servIndex ? null : servIndex)}
                  style={{
                    padding: 'var(--space-6)',
                    background: expandedService === servIndex ? '#fff7ed' : '#fff',
                    borderRadius: '12px',
                    boxShadow: expandedService === servIndex ? '0 8px 24px rgba(255,145,0,0.2)' : '0 4px 6px -1px rgba(0,0,0,0.1)',
                    border: expandedService === servIndex ? '2px solid #FF9100' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ 
                    fontSize: 'var(--text-lg)', 
                    marginBottom: 'var(--space-3)',
                    color: '#FF9100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {service.name}
                    <motion.span
                      animate={{ rotate: expandedService === servIndex ? 180 : 0 }}
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      ▼
                    </motion.span>
                  </h3>
                  <AnimatePresence>
                    {expandedService === servIndex && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-base)', 
                          color: 'var(--color-gray)',
                          lineHeight: 1.7,
                          marginTop: 'var(--space-3)'
                        }}>
                          {service.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {expandedService !== servIndex && (
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: '#9ca3af'
                    }}>
                      Click to expand
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section" style={{ background: '#1a1a2e', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)', color: '#FF9100' }}>let's talk</h2>
            <p style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-8)', color: '#a1a1aa' }}>
              Your digital presence is about to take off
            </p>
            <a 
              href="/contact" 
              className="btn"
              style={{ 
                display: 'inline-block',
                padding: '1rem 2.5rem', 
                fontSize: 'var(--text-lg)',
                background: '#FF9100',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none'
              }}
            >
              Contact us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;