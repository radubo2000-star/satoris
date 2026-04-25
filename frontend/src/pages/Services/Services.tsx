import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const serviceCategories = [
  {
    title: 'Strategy',
    icon: '🎯',
    description: "Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it's the key to unlocking your brand's full potential.",
    services: [
      { name: 'Social Media Strategy', desc: 'Crafting a tailored roadmap for your brand\'s social media success' },
      { name: 'Platform Strategy', desc: 'Navigating the digital landscape with precision' },
      { name: 'Digital Audit', desc: 'A comprehensive health check for your online presence' },
      { name: 'Market Research', desc: 'Empowering decisions with data-driven insights' },
      { name: 'Communication Strategy', desc: 'Mastering the art of brand conversation' },
      { name: 'Content Strategy', desc: 'Fueling engagement through compelling storytelling' },
    ],
  },
  {
    title: 'Branding & Design',
    icon: '🎨',
    description: "Our branding crafts narratives that resonate, transforming your identity into an unforgettable story.",
    services: [
      { name: 'Branding', desc: 'Crafting narratives that resonate' },
      { name: 'Website Design', desc: "Canvases of expression and user-friendliness" },
      { name: 'User Experience', desc: 'Creating seamless journeys' },
      { name: 'App Design', desc: 'Mobile apps that blend aesthetics with functionality' },
      { name: 'Creative & Design', desc: 'Artistry meets forward-thinking strategies' },
    ],
  },
  {
    title: 'Technology',
    icon: '💻',
    description: "Technology isn't just a tool; it's a powerful accelerator on our journey to success.",
    services: [
      { name: 'Website Development', desc: 'In-house web development expertise' },
      { name: 'SMS Promo Machine', desc: 'In-house SMS marketing tool' },
      { name: 'App Development', desc: 'Tailored mobile solutions' },
      { name: 'Ecommerce', desc: 'Online stores that thrive' },
    ],
  },
  {
    title: 'Digital Marketing',
    icon: '📱',
    description: "Marketing isn't just a service; it's the heartbeat of your brand's journey.",
    services: [
      { name: 'Content Creation', desc: 'Compelling stories and visuals' },
      { name: 'Social Media Management', desc: 'Your brand shines in the digital spotlight' },
      { name: 'SEO', desc: 'Boosting online visibility and search rankings' },
      { name: 'Affiliate Management', desc: 'Optimizing affiliate programs' },
      { name: 'Email Marketing', desc: 'Personalized and effective campaigns' },
    ],
  },
  {
    title: 'Events',
    icon: '🎪',
    description: "We are masters of transforming fleeting moments into enduring memories. With over 15 years of hands-on experience in orchestrating events.",
    services: [
      { name: 'Custom Events', desc: 'Tailored solutions that exceed expectations' },
      { name: 'Conventions', desc: 'Immersive convention experiences' },
      { name: 'Exhibitions', desc: 'Captivating exhibitions that tell your story' },
      { name: 'Teambuilding', desc: 'Dynamic and engaging experiences' },
      { name: 'Product Launch', desc: 'Launching with flair and precision' },
      { name: 'Partner Meetups', desc: 'Strengthening partnerships' },
    ],
  },
  {
    title: 'Financial PR',
    icon: '💰',
    description: "We specialize in Financial PR, where every word and message matters.",
    services: [
      { name: 'Relationship Management', desc: 'Building lasting relationships' },
      { name: 'Investor Relations', desc: 'Strategic and transparent communication' },
      { name: 'Financial PR', desc: 'Seamless communication across departments' },
    ],
  },
];

function Services() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '50vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: '#FF9100' }}
          >
            We're here to help you
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Grow & stand out from the crowd
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section" style={{ background: '#fafafa' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            <h2 style={{ marginBottom: 'var(--space-6)' }}>Strategy</h2>
            <p style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8, color: 'var(--color-gray)' }}>
              Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, 
              we understand that a well-crafted strategy is not just a roadmap; it's the key to unlocking your brand's full potential. We dive deep into the 
              heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ 
                  cursor: 'pointer',
                  border: '1px solid #e4e4e7',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}
                onClick={() => setActiveCategory(activeCategory === index ? -1 : index)}
              >
                <div style={{ 
                  padding: 'var(--space-8)', 
                  background: activeCategory === index ? '#FF9100' : 'transparent',
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', display: 'block' }}>
                    {category.icon}
                  </span>
                  <h3 style={{ 
                    color: activeCategory === index ? '#fff' : 'var(--color-black)',
                    marginBottom: 'var(--space-3)',
                    transition: 'color 0.3s ease'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{ 
                    color: activeCategory === index ? '#fff' : 'var(--color-gray)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.7,
                    transition: 'color 0.3s ease'
                  }}>
                    {category.description}
                  </p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeCategory === index ? 1 : 0,
                    height: activeCategory === index ? 'auto' : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ 
                    padding: 'var(--space-6)', 
                    borderTop: '1px solid #e4e4e7',
                    background: '#fff'
                  }}>
                    {category.services.map((service, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          padding: 'var(--space-4) 0',
                          borderBottom: i < category.services.length - 1 ? '1px solid #f4f4f5' : 'none'
                        }}
                      >
                        <h4 style={{ 
                          fontSize: 'var(--text-base)', 
                          color: 'var(--color-black)',
                          marginBottom: 'var(--space-1)'
                        }}>
                          {service.name}
                        </h4>
                        <p style={{ 
                          fontSize: 'var(--text-sm)', 
                          color: 'var(--color-gray)' 
                        }}>
                          {service.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Detail Section */}
      <section className="section" style={{ background: '#1a1a2e', color: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <span style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', display: 'block' }}>🎪</span>
            <h2 style={{ color: '#FF9100', marginBottom: 'var(--space-6)' }}>Events</h2>
            <p style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8, color: '#a1a1aa', marginBottom: 'var(--space-8)' }}>
              At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into 
              enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from 
              intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide.
            </p>
            <p style={{ fontSize: 'var(--text-lg)', color: '#fff' }}>
              Whether it's a corporate party, product launch, partner meetup, convention, exhibition, or a custom event that defies categorization, 
              our expertise shines through, leaving an indelible mark on every occasion.
            </p>
          </motion.div>

          <div className="grid grid-3" style={{ marginTop: 'var(--space-12)' }}>
            {[
              { title: 'Custom Events', desc: 'Tailored solutions' },
              { title: 'Conventions', desc: 'Immersive experiences' },
              { title: 'Exhibitions', desc: 'Captivating displays' },
              { title: 'Teambuilding', desc: 'Dynamic activities' },
              { title: 'Product Launch', desc: 'Grand unveilings' },
              { title: 'Partner Meetups', desc: 'Relationship building' },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: 'var(--space-6)',
                  background: '#2d2d44',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                }}
              >
                <h4 style={{ color: '#FF9100', marginBottom: 'var(--space-2)' }}>{event.title}</h4>
                <p style={{ color: '#a1a1aa', fontSize: 'var(--text-sm)' }}>{event.desc}</p>
              </motion.div>
            ))}
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

export default Services;