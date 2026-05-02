import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import API_BASE from '../../api/base';
import './AdminLayout.css';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user from localStorage (set by ProtectedRoute)
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <AdminHeader onLogout={handleLogout} />
      <main className="admin-content">
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
};

export default AdminLayout;
