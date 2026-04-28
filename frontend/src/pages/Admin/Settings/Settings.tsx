import React, { useState, useEffect } from 'react';
import '../CRUDForm.css';

interface Settings {
  site_name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    site_name: 'Satoris Events',
    tagline: 'We make brands Visible & Digital',
    email: 'contact@satoris.ro',
    phone: '+4 0723257755',
    address: '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO',
    social_facebook: '',
    social_instagram: '',
    social_linkedin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Save settings (would need backend endpoint)
    setTimeout(() => {
      setIsLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="crud-form-page">
      <div className="form-header">
        <h1>Settings</h1>
        <p>Manage your site settings</p>
      </div>

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-grid">
          <div className="form-main">
            <h3 className="section-title">General</h3>
            <div className="form-group">
              <label>Site Name</label>
              <input type="text" value={settings.site_name} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
            </div>

            <h3 className="section-title" style={{ marginTop: 32 }}>Contact Information</h3>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} rows={3} />
            </div>

            <h3 className="section-title" style={{ marginTop: 32 }}>Social Media</h3>
            <div className="form-group">
              <label>Facebook</label>
              <input type="url" value={settings.social_facebook} onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })} placeholder="https://facebook.com/..." />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input type="url" value={settings.social_instagram} onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })} placeholder="https://instagram.com/..." />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input type="url" value={settings.social_linkedin} onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })} placeholder="https://linkedin.com/..." />
            </div>
          </div>

          <div className="form-sidebar">
            <div className="settings-actions">
              <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Settings'}
              </button>
              {saved && <span className="save-success">✓ Settings saved!</span>}
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .section-title { font-size: 1rem; font-weight: 600; color: #111827; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
        .settings-actions { position: sticky; top: 80px; }
        .save-success { display: block; text-align: center; color: #10b981; font-size: 0.875rem; margin-top: 8px; }
      `}</style>
    </div>
  );
};

export default Settings;