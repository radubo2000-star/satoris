import { useState, useEffect } from 'react';
import API_BASE from '../../../api/base';
import './Analytics.css';

interface PageView {
  page_path: string;
  views: number;
  last_viewed: string;
}

interface DayViews {
  date: string;
  views: number;
}

const Analytics: React.FC = () => {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [dayViews, setDayViews] = useState<DayViews[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_BASE}/analytics/summary`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPageViews(data.top_pages || []);
        setDayViews(data.daily_views || []);
        setTotalViews(data.total_views || 0);
        setTodayViews(data.today_views || 0);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Track your website traffic and page views.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ '--accent-color': '#6366f1' } as React.CSSProperties}>
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <span className="stat-value">{totalViews.toLocaleString()}</span>
            <span className="stat-label">Total Views</span>
          </div>
        </div>
        <div className="stat-card" style={{ '--accent-color': '#10b981' } as React.CSSProperties}>
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-value">{todayViews.toLocaleString()}</span>
            <span className="stat-label">Today's Views</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Top Pages</h3>
            <span className="card-badge">Views</span>
          </div>
          <div className="card-content">
            {pageViews.length > 0 ? (
              <ul className="top-pages-list">
                {pageViews.slice(0, 10).map((page, index) => (
                  <li key={index} className="top-page-item">
                    <span className="page-rank">#{index + 1}</span>
                    <span className="page-path">{page.page_path || '/'}</span>
                    <span className="page-views">{page.views} views</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No page views yet. Navigate around your site!</div>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Daily Views</h3>
            <span className="card-badge">Last 7 days</span>
          </div>
          <div className="card-content">
            {dayViews.length > 0 ? (
              <ul className="activity-list">
                {dayViews.map((day, index) => (
                  <li key={index} className="activity-item">
                    <span className="activity-icon">📅</span>
                    <div className="activity-content">
                      <span className="activity-description">{day.date}</span>
                      <span className="activity-time">{day.views} views</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No data yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;