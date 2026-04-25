import { motion } from 'framer-motion';
import '../../styles/globals.css';
import '../../styles/sections.css';

const servicesData = [
  {
    category: 'Marketing',
    items: [
      'Digital Marketing',
      'Ads',
      'Sales Funnel',
      'Event participation strategy',
      'E-commerce',
      'Branded merch',
      'Stands & Booth Registration',
      'Ticketing',
    ],
  },
  {
    category: 'Implementation & On-Site Management',
    items: [
      'Your agenda, our playbook, no surprises',
    ],
  },
  {
    category: 'PR & Communication',
    items: [
      'Social Media',
      'Pre-buzz',
      'Media Relations',
      'Social Media Exposure',
      'Events PR',
      'KOLs',
      'Post-event coverage',
    ],
  },
  {
    category: 'Exhibitions & Trade Fairs',
    items: [
      'From 9 sqm booths to full pavilions',
    ],
  },
  {
    category: 'Digital',
    items: [
      'Digital for Events',
      'Websites',
      'Landing pages',
      'Email campaigns',
      'Social amplification',
      'Custom Build SMS Solution',
      'Live streaming',
      'Visual Content',
      'Events Tech',
      'AV - Staging',
    ],
  },
  {
    category: 'Concept & Creative',
    items: [
      'Events Concept',
      'Visual Content',
      'Themes, formats, agenda design—built for execution',
    ],
  },
  {
    category: 'Full Service',
    items: [
      'AV - Staging',
      'Stage, sound, lights, effects',
      'Staffing',
      'Interpreters, Hostess',
      'Catering & goody bags',
    ],
  },
  {
    category: 'Go Big',
    items: [
      'International events Participations',
      'Global Events as exhibitor',
      'Trips & Ticketing',
      'International team Buildings & client meetups',
    ],
  },
];

function Services() {
  return (
    <div className="services-page">
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive event and digital solutions tailored to your needs.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{service.category}</h3>
                <ul style={{ marginTop: 'var(--space-4)' }}>
                  {service.items.map((item, i) => (
                    <li key={i} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-gray-lighter)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;