import { motion } from 'framer-motion';
import '../../styles/globals.css';
import '../../styles/sections.css';

const serviceCategories = [
  {
    title: 'Strategy',
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
    description: "We specialize in Financial PR, where every word and message matters.",
    services: [
      { name: 'Relationship Management', desc: 'Building lasting relationships' },
      { name: 'Investor Relations', desc: 'Strategic and transparent communication' },
      { name: 'Financial PR', desc: 'Seamless communication across departments' },
    ],
  },
];

function Services() {
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
                textTransform: 'capitalize'
              }}>
                {category.title.toLowerCase()}
              </h2>
              <p style={{ 
                fontSize: 'var(--text-xl)', 
                lineHeight: 1.8, 
                color: 'var(--color-gray)',
                maxWidth: '800px'
              }}>
                {category.description}
              </p>
            </motion.div>

            <div className="grid grid-3">
              {category.services.map((service, servIndex) => (
                <motion.div
                  key={servIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: servIndex * 0.1 }}
                  style={{
                    padding: 'var(--space-6)',
                    background: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h3 style={{ 
                    fontSize: 'var(--text-lg)', 
                    marginBottom: 'var(--space-2)',
                    color: 'var(--color-black)'
                  }}>
                    {service.name}
                  </h3>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--color-gray)',
                    lineHeight: 1.6
                  }}>
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Events Section - Dark Background */}
      <section className="section" style={{ background: '#1a1a2e', color: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-10)' }}
          >
            <h2 style={{ color: '#FF9100', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>Events</h2>
            <p style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8, color: '#a1a1aa' }}>
              At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into 
              enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from 
              intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide.
            </p>
          </motion.div>

          <div className="grid grid-3">
            {[
              { title: 'Custom Events', desc: 'Tailored solutions that exceed expectations' },
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
                whileHover={{ scale: 1.02, y: -5 }}
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
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>let's talk</h2>
            <p style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-8)', color: 'var(--color-gray)' }}>
              Your digital presence is about to take off
            </p>
            <a href="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: 'var(--text-lg)' }}>
              Contact us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;