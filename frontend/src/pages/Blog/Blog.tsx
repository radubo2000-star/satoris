import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/globals.css';
import '../../styles/sections.css';
import { getBlogPosts, getTags } from '../../api/client';
import type { BlogPost, Tag } from '../../api/client';

// Custom debounce hook
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
  
  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get unique categories from posts
  const categories = ['All', ...new Set(posts.map(p => p.category).filter(Boolean))];

  // Fetch tags
  useEffect(() => {
    getTags()
      .then(res => setTags(res.data))
      .catch(console.error);
  }, []);

  // Fetch posts with filters
  const fetchPosts = useCallback(async (extraParams: { published?: boolean } = {}) => {
    setIsLoading(true);
    try {
      const params: { category?: string; tag?: string; search?: string; published?: boolean } = extraParams;
      
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
      <section className="hero" style={{ minHeight: '40vh' }}>
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
          
          {/* Search Bar */}
          <motion.div 
            style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: 'var(--space-3) var(--space-4)',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: 'var(--text-base)',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
            />
          </motion.div>
          
          {/* Category Filter */}
          <motion.div 
            style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
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

          {/* Tags Cloud */}
          {tags.length > 0 && (
            <motion.div 
              style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.slug)}
                  style={{
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: '15px',
                    border: '1px solid',
                    borderColor: selectedTag === tag.slug ? '#FF9100' : '#e5e7eb',
                    background: selectedTag === tag.slug ? '#FF9100' : 'transparent',
                    color: selectedTag === tag.slug ? '#fff' : '#6b7280',
                    fontSize: 'var(--text-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  #{tag.name}
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
              <p>Loading...</p>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
              <p style={{ color: '#6b7280' }}>No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                  style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', cursor: 'pointer' }}
                >
                  <Link to={'/blog/' + post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: 'var(--space-6)' }}>
                      <span style={{ fontSize: 'var(--text-sm)', color: '#FF9100', fontWeight: 600 }}>{post.category}</span>
                      <h3 style={{ margin: 'var(--space-2) 0', color: '#1a1a2e' }}>{post.title}</h3>
                      <p style={{ color: '#6b7280', marginBottom: 'var(--space-4)' }}>{post.excerpt}</p>
                      <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>{post.created_at}</span>
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
