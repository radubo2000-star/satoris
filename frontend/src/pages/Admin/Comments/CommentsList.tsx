import React, { useState, useEffect } from 'react';
import API_BASE from '../../../api/base';
import '../CRUDList.css';

interface Comment {
  id: number;
  blog_post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

const CommentsList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    const token = localStorage.getItem('admin_token');
    let url = '/api/comments';
    if (filter === 'approved') url += '?approved=true';
    if (filter === 'pending') url += '?approved=false';
    
    try {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) setComments(await response.json());
    } catch (err) { console.error('Failed to fetch comments:', err); }
    finally { setIsLoading(false); }
  };

  const handleApprove = async (id: number) => {
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${API_BASE}/comments/${id}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}` } });
      setComments(comments.map(c => c.id === id ? { ...c, is_approved: !c.is_approved } : c));
    } catch (err) { console.error('Failed to approve:', err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this comment?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${API_BASE}/comments/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setComments(comments.filter(c => c.id !== id));
    } catch (err) { console.error('Failed to delete:', err); }
  };

  const getPostTitle = (postId: number) => {
    const titles: Record<number, string> = { 1: 'Târg de Crăciun', 2: 'Exhibition Success', 3: 'Omi Digital', 4: 'Holandria Branding' };
    return titles[postId] || `Post #${postId}`;
  };

  if (isLoading) return <div className="crud-loading"><div className="spinner"></div></div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Comments</h1>
          <p>Manage blog comments</p>
        </div>
      </div>

      <div className="filter-buttons" style={{ marginBottom: 20 }}>
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'approved' ? 'active' : ''} onClick={() => setFilter('approved')}>Approved</button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <span className="comment-author">{comment.author_name}</span>
              <span className="comment-email">{comment.author_email}</span>
              <span className={`status-badge ${comment.is_approved ? 'published' : 'draft'}`}>
                {comment.is_approved ? 'Approved' : 'Pending'}
              </span>
            </div>
            <p className="comment-content">{comment.content}</p>
            <div className="comment-footer">
              <span className="comment-post">On: {getPostTitle(comment.blog_post_id)}</span>
              <span className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <div className="comment-actions">
              <button className="btn-icon" onClick={() => handleApprove(comment.id)} title={comment.is_approved ? 'Reject' : 'Approve'}>
                {comment.is_approved ? '❌' : '✅'}
              </button>
              <button className="btn-icon danger" onClick={() => handleDelete(comment.id)} title="Delete">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .comments-list { display: flex; flex-direction: column; gap: 16px; }
        .comment-item { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
        .comment-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .comment-author { font-weight: 600; color: #111827; }
        .comment-email { font-size: 0.8125rem; color: #6b7280; }
        .comment-content { color: #374151; font-size: 0.9375rem; line-height: 1.6; margin: 0 0 12px; }
        .comment-footer { display: flex; gap: 16px; font-size: 0.75rem; color: #9ca3af; }
        .comment-actions { display: flex; gap: 8px; margin-top: 12px; }
      `}</style>
    </div>
  );
};

export default CommentsList;