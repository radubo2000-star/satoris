import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/globals.css';
import '../../styles/sections.css';
import { getBlogPosts, getTags } from '../../api/client';
import type { BlogPost, Tag } from '../../api/client';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];

  useEffect(() => {
    getTags()
      .then(res => setTags(res.data))
      .catch(console.error);
  }, []);

  const fetchPosts = useCallback(async (extraParams: { published?: boolean } = {}) => {
    setIsLoading(true);
    try {
      const params: { category?: string; tag?: string; search?: string; published?: boolean } = {};
      
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (selectedTag) {
        params.tag = selectedTag;
      }
      if (debouncedSearch) {
        params.search = debouncedSearch;
      }

      const res = await getBlogPosts(params);
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedTag, debouncedSearch]);

  useEffect(() => {
    fetchPosts({ published: true });
  }, [fetchPosts]);

  const handleTagClick = (tagSlug: string) => {
    setSelectedTag(selectedTag === tagSlug ? null : tagSlug);
  };

  return (
    <div className="blog-page">
      {/* Hero Section - Simplified like satoris.ro */}
      <section className="hero" style={{ 
        minHeight: 'auto', 
        padding: '80px 0 60px',
        background: '#fff'
      }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              color: '#1a1a2e',
              fontSize: 'var(--text-4xl)',
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: 'var(--space-3)'
            }}
          >
            Satoris Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: '#71717a',
              fontSize: 'var(--text-lg)',
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            Sharing the wisdom - learning everyday is a must.
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section style={{ background: '#fafafa', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          {/* Search Bar - Minimal */}
          <motion.div 
            style={{ marginBottom: '40px', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              placeholder="Caută articole..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '14px 20px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '15px',
                fontFamily: "'Montserrat', sans-serif",
                outline: 'none',
                background: '#fff',
                color: '#1a1a2e'
              }}
            />
          </motion.div>
          
          {/* Category Filter - Horizontal tabs like satoris */}
          <motion.div 
            style={{ display: 'flex', gap: '0', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: '10px 24px',
                  border: 'none',
                  borderBottom: selectedCategory === cat ? '2px solid #FF9100' : '2px solid transparent',
                  background: 'transparent',
                  color: selectedCategory === cat ? '#FF9100' : '#71717a',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: "'Montserrat', sans-serif",
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Tags Cloud */}
          {tags.length > 0 && (
            <motion.div 
              style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '50px', flexWrap: 'wrap' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.slug)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: selectedTag === tag.slug ? '#FF9100' : '#d1d5db',
                    background: selectedTag === tag.slug ? '#FF9100' : '#fff',
                    color: selectedTag === tag.slug ? '#fff' : '#71717a',
                    fontSize: '12px',
                    fontFamily: "'Montserrat', sans-serif",
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  #{tag.name}
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#71717a', fontFamily: "'Montserrat', sans-serif" }}>Se încarcă...</p>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#71717a', fontFamily: "'Montserrat', sans-serif" }}>Nu există articole.</p>
            </div>
          ) : (
            /* Blog Posts Grid - satoris style */
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '30px' 
            }}>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  style={{ 
                    borderRadius: '4px', 
                    overflow: 'hidden', 
                    background: '#fff', 
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}
                >
                  <Link to={'/blog/' + post.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '24px' }}>
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#FF9100', 
                        fontWeight: 600,
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {post.category}
                      </span>
                      <h3 style={{ 
                        margin: '12px 0', 
                        color: '#1a1a2e',
                        fontSize: '20px',
                        fontWeight: 700,
                        fontFamily: "'Montserrat', sans-serif",
                        lineHeight: 1.4
                      }}>
                        {post.title}
                      </h3>
                      <p style={{ 
                        color: '#71717a', 
                        marginBottom: '16px',
                        fontSize: '14px',
                        fontFamily: "'Montserrat', sans-serif",
                        lineHeight: 1.6
                      }}>
                        {post.excerpt}
                      </p>
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#a1a1aa',
                        fontFamily: "'Montserrat', sans-serif"
                      }}>
                        {post.created_at}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
