import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, onLogout }) => {
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/blog', label: 'Blog', icon: '📝' },
    { path: '/admin/services', label: 'Services', icon: '🛠️' },
    { path: '/admin/projects', label: 'Projects', icon: '📁' },
    { path: '/admin/comments', label: 'Comments', icon: '💬' },
    { path: '/admin/products', label: 'Products', icon: '🛒' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' },
    { path: '/admin/users', label: 'Users', icon: '👥', adminOnly: true },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const filteredLinks = adminLinks.filter(link => !link.adminOnly || user.role === 'admin');

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Satoris Admin</h2>
        <button className="sidebar-close" onClick={onClose}>×</button>
      </div>
      
      <div className="sidebar-user">
        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {filteredLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <span>🚪</span> Logout
        </button>
        <a href="/" target="_blank" className="view-site-link">
          <span>🌐</span> View Site
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;