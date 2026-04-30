import API_BASE from './base';

// Track page views (no auth needed - should work for all visitors)
export async function trackPageView(pagePath?: string) {
  try {
    await fetch(`${API_BASE}/analytics/page-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page_path: pagePath || window.location.pathname })
    });
  } catch (e) {
    // Silently fail - analytics shouldn't break the app
  }
}

// Track JS errors (no auth needed)
export async function trackError(message: string, stack?: string) {
  try {
    await fetch(`${API_BASE}/analytics/error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, stack })
    });
  } catch (e) {
    // Silently fail
  }
}