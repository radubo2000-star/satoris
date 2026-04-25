import { motion } from 'framer-motion';
import { useState } from 'react';
import '../../styles/globals.css';
import '../../styles/sections.css';

const blogPostsData = [
  {
    id: 1,
    title: 'Târg de Crăciun Dalles 2025',
    excerpt: 'Event Concept, Event Management & Implementation, Research, Print Design for the Christmas market at Dalles.',
    image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png',
    date: 'December 2025',
    category: 'Events',
  },
  {
    id: 2,
    title: 'Exhibition Success Blueprint: Crafting a Winning Participation Strategy',
    excerpt: 'Event Management, Expo Strategy, Print Design, Content Strategy for successful trade shows.',
    image: 'https://satoris.ro/wp-content/uploads/2023/10/blurred-background-people-shopping-market-fair-sunny-day-blur-background-with-bokeh-1-300x200.jpg',
    date: 'October 2025',
    category: 'Strategy',
  },
  {
    id: 3,
    title: 'Omi',
    excerpt: 'Digital Audit, Market Research, User Experience for Omi brand.',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
    date: 'January 2022',
    category: 'Digital',
  },
  {
    id: 4,
    title: 'Holandria',
    excerpt: 'Packaging, Branding, Email Marketing, Affiliate Management for Holandria.',
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg',
    date: 'January 2022',
    category: 'Branding',
  },
];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(blogPostsData.map(p => p.category))];
  const filteredPosts = selectedCategory === 'All' 
    ? blogPostsData 
    : blogPostsData.filter(p => p.category === selectedCategory);

  return (
    <div className="blog-page">
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blog
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sharing the wisdom - learning everyday is a must.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Latest Articles</h2>
          </div>
          
          {/* Category Filter */}
          <motion.div 
            style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCategory === cat ? '#FF9100' : '#f3f4f6',
                  color: selectedCategory === cat ? '#fff' : '#374151',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', cursor: 'pointer' }}
              >
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-6)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: '#FF9100', fontWeight: 600 }}>{post.category}</span>
                  <h3 style={{ margin: 'var(--space-2) 0' }}>{post.title}</h3>
                  <p style={{ color: '#6b7280', marginBottom: 'var(--space-4)' }}>{post.excerpt}</p>
                  <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>{post.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;