import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const projectsData = [
  {
    id: 1,
    name: 'marie',
    category: 'Branding',
    description: 'Event Concept, Event Management & Implementation, Research, Print Design',
    image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png',
  },
  {
    id: 2,
    name: 'softy',
    category: 'Digital',
    description: 'Digital Audit, Market Research, User Experience',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
  },
  {
    id: 3,
    name: 'cela',
    category: 'Branding',
    description: 'Packaging, Branding, Email Marketing, Affiliate Management',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg',
  },
  {
    id: 4,
    name: 'omi',
    category: 'Digital',
    description: 'Digital Audit, Market Research, User Experience',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
  },
];

const categories = ['All', 'Branding', 'Digital', 'Event'];

function Work() {
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="work-page">
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Work
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our portfolio of featured work, where precision meets creativity.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginBottom: 'var(--space-10)', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                  <h3>{project.name}</h3>
                  <p>{project.category}</p>
                  <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', opacity: 0.8 }}>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Work;