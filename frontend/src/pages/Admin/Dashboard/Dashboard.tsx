import API_BASE from '../../../api/base';

import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface Stats {
  total_visits: number;
  today_visits: number;
  total_users: number;
  total_blog_posts: number;
  published_posts: number;
  pending_comments: number;
  total_projects: number;
  recent_activities: Array<{
    id: number;
    action: string;
    entity_type: string;
    description: string;
    created_at: string;
  }>;
}

interface TopPage {
  [key: string]: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [topPages, setTopPages] = useState<TopPage>({});
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('admin_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const [statsRes, pagesRes, errorsRes] = await Promise.all([
        fetch(API_BASE + '/dashboard/stats', { headers }),
        fetch(API_BASE + '/dashboard/top-pages', { headers }),
        fetch(API_BASE + '/dashboard/errors?limit=5', { headers })
      ]);

      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      if (pagesRes.ok) {
        setTopPages(await pagesRes.json());
      }
      if (errorsRes.ok) {
        setErrors(await errorsRes.json());
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Visits', value: stats?.total_visits || 0, icon: '👁️', color: '#6366f1' },
    { label: "Today's Visits", value: stats?.today_visits || 0, icon: '📈', color: '#10b981' },
    { label: 'Blog Posts', value: stats?.published_posts || 0, icon: '📝', color: '#8b5cf6' },
    { label: 'Pending Comments', value: stats?.pending_comments || 0, icon: '💬', color: '#f59e0b' },
    { label: 'Projects', value: stats?.total_projects || 0, icon: '📁', color: '#06b6d4' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your site.</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--accent-color': stat.color } as React.CSSProperties}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-value">{stat.value.toLocaleString()}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Top Pages</h3>
            <span className="card-badge">Analytics</span>
          </div>
          <div className="card-content">
            {Object.keys(topPages).length > 0 ? (
              <ul className="top-pages-list">
                {Object.entries(topPages).slice(0, 5).map(([path, views], index) => (
                  <li key={index} className="top-page-item">
                    <span className="page-rank">#{index + 1}</span>
                    <span className="page-path">{path}</span>
                    <span className="page-views">{views} views</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No page views yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <span className="card-badge">Live</span>
          </div>
          <div className="card-content">
            {stats?.recent_activities && stats.recent_activities.length > 0 ? (
              <ul className="activity-list">
                {stats.recent_activities.slice(0, 8).map((activity) => (
                  <li key={activity.id} className="activity-item">
                    <span className="activity-icon">
                      {activity.action === 'login' ? '🔑' : 
                       activity.action === 'register' ? '👤' :
                       activity.action === 'error' ? '❌' : '📝'}
                    </span>
                    <div className="activity-content">
                      <span className="activity-description">{activity.description}</span>
                      <span className="activity-time">
                        {new Date(activity.created_at).toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No recent activity</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Errors</h3>
            <span className="card-badge error">Errors</span>
          </div>
          <div className="card-content">
            {errors.length > 0 ? (
              <ul className="errors-list">
                {errors.map((error) => (
                  <li key={error.id} className="error-item">
                    <span className="error-icon">⚠️</span>
                    <div className="error-content">
                      <span className="error-message">{error.description}</span>
                      <span className="error-time">
                        {new Date(error.created_at).toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state success">No errors recorded</p>
            )}
          </div>
        </div>

        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card-content">
            <div className="actions-grid">
              <a href="/admin/blog/new" className="action-btn">
                <span>➕</span> New Post
              </a>
              <a href="/admin/projects" className="action-btn">
                <span>📁</span> Manage Projects
              </a>
              <a href="/admin/comments" className="action-btn">
                <span>💬</span> Review Comments
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;