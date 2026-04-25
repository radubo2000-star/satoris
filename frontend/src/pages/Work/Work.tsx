import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/globals.css';
import '../../styles/sections.css';

const projectsData = [
  {
    id: 1,
    name: 'Târg de Crăciun Dalles 2025',
    category: 'Event',
    description: 'Event Concept, Event Management & Implementation, Research, Print Design',
    image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png',
    slug: 'targ-de-craciun-dalles-2025',
  },
  {
    id: 2,
    name: 'Softy',
    category: 'Branding',
    description: 'Research, Branding, Packaging, Ad Design, PPC Management',
    image: 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Softy_Img_1.jpg',
    slug: 'softy',
  },
  {
    id: 3,
    name: 'Cela Jewelry',
    category: 'Digital',
    description: 'Ecommerce, Website Development, PPC Campaigns, SEO',
    image: 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Cela_Img_1.jpg',
    slug: 'cela',
  },
  {
    id: 4,
    name: 'Omi',
    category: 'Digital',
    description: 'Digital Audit, Market Research, User Experience',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
    slug: 'omi',
  },
  {
    id: 5,
    name: 'Holarnia',
    category: 'Branding',
    description: 'Packaging, Branding, Email Marketing, Affiliate Management',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg',
    slug: 'holarnia',
  },
  {
    id: 6,
    name: 'Exhibition Blueprint',
    category: 'Event',
    description: 'Event Management, Expo Strategy, Print Design, Content Strategy',
    image: 'https://satoris.ro/wp-content/uploads/2023/10/blurred-background-people-shopping-market-fair-sunny-day-blur-background-with-bokeh-1-300x200.jpg',
    slug: 'exhibition-blueprint',
  },
];

const categories = ['All', 'Branding', 'Digital', 'Event'];

function Work() {
  const { slug } = useParams<{ slug: string }>();
  const [filter, setFilter] = useState('All');
  
  // If there's a slug, find the project
  const currentProject = slug ? projectsData.find(p => p.slug === slug) : null;
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  // Project card with 3D tilt effect
  function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e: any) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotate({ x: y * 15, y: -x * 15 });
    };
    
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        whileHover={{ scale: 1.02 }}
        onClick={() => {}}
        style={{ perspective: '1000px', cursor: 'pointer' }}
      >
        <motion.div
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ borderRadius: '12px', overflow: 'hidden', background: '#1a1a2e' }}
        >
          <img src={project.image} alt={project.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
          <div style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ color: '#FF9100', marginBottom: 'var(--space-1)' }}>{project.name}</h3>
            <p style={{ color: '#9ca3af', fontSize: 'var(--text-sm)' }}>{project.category}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }
  
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

      {/* Single Project View */}
      {currentProject && (
        <section className="section" style={{ paddingTop: 'var(--space-10)' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', color: '#FF9100', marginBottom: 'var(--space-6)', textDecoration: 'none' }}>
              ← Back to All Projects
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={currentProject.image} 
                alt={currentProject.name} 
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: 'var(--space-6)' }} 
              />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: '#FF9100', marginBottom: 'var(--space-2)' }}>{currentProject.name}</h2>
              <p style={{ color: '#555', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>{currentProject.category}</p>
              <p style={{ color: '#374151', lineHeight: 1.8 }}>{currentProject.description}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Only show filter and grid if no single project */}
      {!slug && (
      <section className="section">
        <div className="container">
          {/* Filter with animation */}
          <motion.div 
            style={{ 
              display: 'flex', 
              gap: 'var(--space-3)', 
              justifyContent: 'center', 
              marginBottom: 'var(--space-10)', 
              flexWrap: 'wrap' 
            }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: '8px',
                  border: filter === cat ? 'none' : '2px solid #e5e7eb',
                  background: filter === cat ? '#FF9100' : '#fff',
                  color: filter === cat ? '#fff' : '#374151',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid with animation */}
          <motion.div 
            layout
            className="projects-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      )}
    </div>
  );
}

export default Work;