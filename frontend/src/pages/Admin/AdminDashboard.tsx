import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/globals.css';
import { getBlogPosts, deleteBlogPost, togglePublishBlogPost, getComments, approveComment, deleteComment } from '../../api/client';
import type { BlogPost, Comment } from '../../api/client';

type Tab = 'posts' | 'comments';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth
  useEffect(() => {
    const isAuth = localStorage.getItem('satoris_admin');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch posts (include all for admin - both published and drafts)
  useEffect(() => {
    getBlogPosts({ all: true, limit: 100 })
      .then(res => setPosts(res.data.posts))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch all comments
  useEffect(() => {
    getComments({})
      .then(res => setComments(res.data))
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('satoris_admin');
    navigate('/admin');
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteBlogPost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleTogglePublish = async (id: number) => {
    try {
      const res = await togglePublishBlogPost(id);
      setPosts(posts.map(p => p.id === id ? { ...p, is_published: res.data.is_published } : p));
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleApproveComment = async (id: number) => {
    try {
      await approveComment(id);
      setComments(comments.map(c => c.id === id ? { ...c, is_approved: !c.is_approved } : c));
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteComment(id);
      setComments(comments.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (isLoading) {
    return <div style={{ padding: 'var(--space-16)', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: 'var(--space-4) var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <h1 style={{ fontSize: 'var(--text-xl)', color: '#FF9100', margin: 0 }}>Satoris Admin</h1>
            <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>View Site</Link>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: 'var(--space-2) var(--space-4)', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          <button
            onClick={() => setActiveTab('posts')}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: activeTab === 'posts' ? '#FF9100' : '#fff',
              color: activeTab === 'posts' ? '#fff' : '#374151',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: activeTab === 'comments' ? '#FF9100' : '#fff',
              color: activeTab === 'comments' ? '#fff' : '#374151',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Comments ({comments.filter(c => !c.is_approved).length} pending)
          </button>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: 'var(--space-4)', textAlign: 'left', fontWeight: 600 }}>Title</th>
                    <th style={{ padding: 'var(--space-4)', textAlign: 'left', fontWeight: 600 }}>Category</th>
                    <th style={{ padding: 'var(--space-4)', textAlign: 'left', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: 'var(--space-4)', textAlign: 'right', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: 'var(--space-4)' }}>{post.title}</td>
                      <td style={{ padding: 'var(--space-4)' }}>{post.category}</td>
                      <td style={{ padding: 'var(--space-4)' }}>
                        <span style={{
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: '4px',
                          fontSize: 'var(--text-sm)',
                          background: post.is_published ? '#dcfce7' : '#fef3c7',
                          color: post.is_published ? '#166534' : '#92400e'
                        }}>
                          {post.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-4)', textAlign: 'right' }}>
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          style={{ marginRight: 'var(--space-2)', padding: 'var(--space-2)', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          {post.is_published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          style={{ padding: 'var(--space-2)', background: '#fee', border: 'none', borderRadius: '4px', color: '#dc2626', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {comments.map(comment => (
                <div key={comment.id} style={{ background: '#fff', padding: 'var(--space-4)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <div>
                      <strong>{comment.author_name}</strong>
                      <span style={{ color: '#6b7280', marginLeft: 'var(--space-2)' }}>{comment.author_email}</span>
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>{comment.created_at}</span>
                  </div>
                  <p style={{ marginBottom: 'var(--space-3)', color: '#374151' }}>{comment.content}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <span style={{
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: '4px',
                      fontSize: 'var(--text-sm)',
                      background: comment.is_approved ? '#dcfce7' : '#fef3c7',
                      color: comment.is_approved ? '#166534' : '#92400e'
                    }}>
                      {comment.is_approved ? 'Approved' : 'Pending'}
                    </span>
                    {!comment.is_approved && (
                      <button
                        onClick={() => handleApproveComment(comment.id)}
                        style={{ padding: 'var(--space-2)', background: '#dcfce7', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      style={{ padding: 'var(--space-2)', background: '#fee', border: 'none', borderRadius: '4px', color: '#dc2626', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p style={{ textAlign: 'center', color: '#9ca3af' }}>No comments yet</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
