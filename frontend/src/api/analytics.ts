import API_BASE from './base';

// Track page views
export async function trackPageView(pagePath?: string) {
  const token = localStorage.getItem('admin_token');
  try {
    await fetch(`${API_BASE}/analytics/page-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ page_path: pagePath || window.location.pathname })
    });
  } catch (e) {
    // Silently fail - analytics shouldn't break the app
  }
}

// Track JS errors
export async function trackError(message: string, stack?: string) {
  const token = localStorage.getItem('admin_token');
  try {
    await fetch(`${API_BASE}/analytics/error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message, stack })
    });
  } catch (e) {
    // Silently fail
  }
}