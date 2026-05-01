import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/globals.css';
import '../../styles/sections.css';
import { getBlogPosts, getTags } from '../../api/client';
import type { BlogPost, Tag } from '../../api/client';
import LetsTalk from '../../components/LetsTalk/LetsTalk';

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
  // Always show all categories, regardless of selected filter
  const categories = ['All', 'Events', 'Strategy', 'Digital', 'Branding', 'Marketing', 'Trends', 'Case Study'];

  useEffect(() => {
    getTags()
      .then(res => setTags(res.data))
      .catch(console.error);
  }, []);

  const fetchPosts = useCallback(async (extraParams: { published?: boolean } = {}) => {
    setIsLoading(true);
    try {
      // Build category list from posts or use fixed categories for display
      // Filter posts client-side for now, API returns all published posts
      const params: { category?: string; tag?: string; search?: string; published?: boolean } = { published: true };
      
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
      
      // Handle both API response formats: array or object with posts
      const postsData = Array.isArray(res.data) ? res.data : res.data.posts;
      setPosts(postsData || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
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

  // Blog card with 3D tilt effect like Work page
  function BlogCard({ post, index }: { post: BlogPost; index: number }) {
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
        style={{ perspective: '1000px', cursor: 'pointer' }}
      >
        <motion.div
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          <Link to={'/blog/' + post.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: 'var(--space-4)' }}>
              <span style={{ 
                fontSize: '12px', 
                color: '#FF9100', 
                fontWeight: 600,
                fontFamily: "'Lora', serif",
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {post.category}
              </span>
              <h3 style={{ 
                margin: '12px 0', 
                color: '#FF9100',
                fontSize: '20px',
                fontWeight: 700,
                fontFamily: "'Lora', serif",
                lineHeight: 1.4
              }}>
                {post.title}
              </h3>
              <p style={{ 
                color: '#71717a', 
                marginBottom: '16px',
                fontSize: '14px',
                fontFamily: "'Lora', serif",
                lineHeight: 1.6
              }}>
                {post.excerpt}
              </p>
              <span style={{ 
                fontSize: '12px', 
                color: '#a1a1aa',
                fontFamily: "'Lora', serif"
              }}>
                {post.created_at}
              </span>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section - Simplified like satoris.ro */}
      <section className="hero" style={{ 
        minHeight: 'auto', 
        padding: '20px 0 15px',
        background: '#fff'
      }}>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Satoris Blog
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

      {/* Blog Content */}
      <section style={{ background: '#fafafa', padding: '30px 0' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          {/* Search Bar - Minimal */}
          <motion.div 
            style={{ marginBottom: '12px', textAlign: 'center' }}
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
                fontFamily: "'Lora', serif",
                outline: 'none',
                background: '#fff',
                color: '#FF9100'
              }}
            />
          </motion.div>
          
          {/* Category Filter - Work style */}
          <motion.div 
            style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: '8px',
                  border: selectedCategory === cat ? 'none' : '2px solid #e5e7eb',
                  background: selectedCategory === cat ? '#FF9100' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#374151',
                  fontWeight: 600,
                  fontFamily: "'Lora', serif",
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Tags Cloud - Work style */}
          {tags.length > 0 && (
          <motion.div 
            style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {tags.map(tag => (
              <motion.button
                key={tag.id}
                onClick={() => handleTagClick(tag.slug)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: selectedTag === tag.slug ? 'none' : '2px solid #e5e7eb',
                  background: selectedTag === tag.slug ? '#FF9100' : '#fff',
                  color: selectedTag === tag.slug ? '#fff' : '#374151',
                  fontSize: '12px',
                  fontFamily: "'Lora', serif",
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                #{tag.name}
              </motion.button>
            ))}
          </motion.div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#71717a', fontFamily: "'Lora', serif" }}>Se încarcă...</p>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#71717a', fontFamily: "'Lora', serif" }}>Nu există articole.</p>
            </div>
          ) : (
            /* Blog Posts Grid - Work style with 3D cards */
            <motion.div 
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}
            >
              <AnimatePresence>
                {posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <>
        <LetsTalk />
      </>
    </div>
  );
}

export default Blog;
