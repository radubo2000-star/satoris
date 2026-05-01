import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/globals.css';
import '../../styles/sections.css';
import { getBlogPostBySlug, addComment } from '../../api/client';
import type { BlogPost, Comment } from '../../api/client';
import LetsTalk from '../../components/LetsTalk/LetsTalk';

function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ author_name: '', author_email: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentMessage, setCommentMessage] = useState('');

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      getBlogPostBySlug(slug)
        .then(res => {
          setPost(res.data);
          setComments(res.data.comments || []);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    
    setIsSubmitting(true);
    try {
      const res = await addComment({
        blog_post_id: post.id,
        ...commentForm
      });
      setCommentMessage(res.data.message);
      setCommentForm({ author_name: '', author_email: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      setCommentMessage('Error submitting comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <p>Post not found</p>
        <Link to="/blog" style={{ color: '#FF9100' }}>Back to Blog</Link>
      </div>
    );
  }

  // Helper to render tags (handle both string[] and object[] formats)
  const renderTags = () => {
    if (!post.tags || post.tags.length === 0) return null;
    
    return (
      <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ fontWeight: 600, marginBottom: 'var(--space-3)' }}>Tags:</p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {post.tags.map((tag, index) => {
            // Handle both string tags and object tags
            const tagName = typeof tag === 'string' ? tag : (tag as { name?: string }).name || (tag as { slug?: string }).slug || '';
            const tagKey = typeof tag === 'string' ? tag : (tag as { id?: number }).id?.toString() || index.toString();
            return (
              <span
                key={tagKey}
                style={{
                  padding: 'var(--space-1) var(--space-3)',
                  background: '#f3f4f6',
                  borderRadius: '15px',
                  fontSize: 'var(--text-sm)',
                  color: '#6b7280'
                }}
              >
                #{tagName}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="blog-post-page">
      {/* Hero */}
      <section className="hero" style={{ minHeight: '30vh', height: 'auto', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link to="/blog" style={{ color: '#FF9100', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-4)' }}>
            ← Back to Blog
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}
          >
            {post.title}
          </motion.h1>
          <p style={{ color: '#6b7280' }}>
            {post.category} • {post.author} • {post.created_at}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section style={{ padding: 0 }}>
          <img 
            src={post.image} 
            alt={post.title} 
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </section>
      )}

      {/* Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: '#374151' }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
          </motion.div>

          {renderTags()}
        </div>
      </section>

      {/* Comments Section */}
      <section className="section" style={{ background: '#f9fafb' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Comments ({comments.length})</h2>

          {/* Comment Form */}
          <div style={{ background: '#fff', padding: 'var(--space-6)', borderRadius: '12px', marginBottom: 'var(--space-8)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Leave a Comment</h3>
            
            {commentMessage && (
              <p style={{ 
                padding: 'var(--space-3)', 
                background: commentMessage.includes('Error') ? '#fee' : '#efe', 
                color: commentMessage.includes('Error') ? '#c33' : '#363',
                borderRadius: '8px',
                marginBottom: 'var(--space-4)'
              }}>
                {commentMessage}
              </p>
            )}

            <form onSubmit={handleCommentSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={commentForm.author_name}
                  onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                  required
                  style={{ padding: 'var(--space-3)', border: '2px solid #e5e7eb', borderRadius: '8px' }}
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={commentForm.author_email}
                  onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                  required
                  style={{ padding: 'var(--space-3)', border: '2px solid #e5e7eb', borderRadius: '8px' }}
                />
              </div>
              <textarea
                placeholder="Your Comment *"
                value={commentForm.content}
                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                required
                rows={4}
                style={{ padding: 'var(--space-3)', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'vertical' }}
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  background: '#FF9100',
                  color: '#fff',
                  padding: 'var(--space-3) var(--space-6)',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Comment'}
              </button>
            </form>
          </div>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {comments.map(comment => (
                <div 
                  key={comment.id} 
                  style={{ 
                    background: '#fff', 
                    padding: 'var(--space-4)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <strong style={{ color: '#1a1a2e' }}>{comment.author_name}</strong>
                    <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>{comment.created_at}</span>
                  </div>
                  <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#9ca3af', textAlign: 'center' }}>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>

      <>
        <LetsTalk />
      </>
    </div>
  );
}

export default BlogPostDetail;
