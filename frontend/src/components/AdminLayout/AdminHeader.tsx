import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminHeader.css';

interface HeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/analytics', label: 'Analytics' },
    { path: '/admin/blog', label: 'Blog' },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/comments', label: 'Comments' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/orders', label: 'Orders' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  return (
    <header className="admin-header">
      <div className="header-container">
        <Link to="/admin/dashboard" className="logo">
          <span className="logo-text">SATORIS</span>
          <span className="logo-subtitle">Admin</span>
        </Link>

        <nav className={`admin-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {adminLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button className="nav-link logout-btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
