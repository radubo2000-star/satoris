import API_BASE from '../../../api/base';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CRUDList.css';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  is_published: boolean;
  created_at: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(API_BASE + '/blog?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`${API_BASE}/blog/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`${API_BASE}/blog/${post.id}/publish`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(posts.map(p => p.id === post.id ? { ...p, is_published: data.is_published } : p));
      }
    } catch (err) {
      console.error('Toggle publish failed:', err);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'published') return matchesSearch && post.is_published;
    if (filter === 'draft') return matchesSearch && !post.is_published;
    return matchesSearch;
  });

  if (isLoading) return <div className="crud-loading"><div className="spinner"></div></div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Blog Posts</h1>
          <p>Manage your blog articles</p>
        </div>
        <Link to="/admin/blog/new" className="btn-primary">+ New Post</Link>
      </div>

      <div className="crud-toolbar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'published' ? 'active' : ''} onClick={() => setFilter('published')}>Published</button>
          <button className={filter === 'draft' ? 'active' : ''} onClick={() => setFilter('draft')}>Drafts</button>
        </div>
      </div>

      <div className="crud-table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td className="title-cell">
                  <span className="post-title">{post.title}</span>
                  <span className="post-slug">/{post.slug}</span>
                </td>
                <td>{post.author}</td>
                <td><span className="category-badge">{post.category}</span></td>
                <td>
                  <span className={`status-badge ${post.is_published ? 'published' : 'draft'}`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <Link to={`/admin/blog/${post.id}`} className="btn-icon" title="Edit">✏️</Link>
                  <button className="btn-icon" onClick={() => handleTogglePublish(post)} title={post.is_published ? 'Unpublish' : 'Publish'}>
                    {post.is_published ? '📄' : '🚀'}
                  </button>
                  <button className="btn-icon danger" onClick={() => handleDelete(post.id)} title="Delete">🗑️</button>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr><td colSpan={6} className="empty-state">No posts found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;