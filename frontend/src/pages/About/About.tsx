import { motion } from 'framer-motion';
import '../../styles/globals.css';
import '../../styles/sections.css';

function About() {
  return (
    <div className="about-page">
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Celebrating Success Through Unforgettable Events.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Satoris Events in a nutshell</h2>
          </div>
          
          <div className="grid grid-3" style={{ marginTop: 'var(--space-10)' }}>
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Experience</h3>
              <p>20 years hands-on delivery in RO & MD</p>
            </motion.div>
            
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>One partner, zero drama</h3>
              <p>AV, staging, staffing, branded merch, national & international</p>
            </motion.div>
            
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Event Diversity</h3>
              <p>Exhibitions, conferences, product launches, teambuildings, parties</p>
            </motion.div>
          </div>

          <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--space-6)' }}>Implementation is our superpower</h2>
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-gray)', marginBottom: 'var(--space-8)' }}>
              At SATORIS PR & DIGITAL, we believe that every business is one-of-a-kind, deserving of solutions as unique as they are. 
              That's why we specialize in crafting personalized experiences tailored to your needs. We are Bucharest-based, 
              delivering MICE & exhibitions across Romania and Moldova — ready for expanding into other locations on request.
            </p>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
              Implementation first. Creative, PR, and Digital to amplify.
            </p>
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
            <h2>Send your brief get a budget range in 48h</h2>
            <a href="/contact" className="btn">Contact</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;