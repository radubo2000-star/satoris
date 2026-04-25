import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/globals.css';

// Simple admin password (in production, use proper auth)
const ADMIN_PASSWORD = 'satoris2024';

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Set auth token in localStorage
      localStorage.setItem('satoris_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: '#fff', padding: 'var(--space-8)', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>Admin Login</h2>
        
        {error && (
          <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: 'var(--space-4)' }}>{error}</p>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 'var(--space-3)', marginBottom: 'var(--space-4)', border: '2px solid #e5e7eb', borderRadius: '8px' }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: 'var(--space-3)', background: '#FF9100', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
