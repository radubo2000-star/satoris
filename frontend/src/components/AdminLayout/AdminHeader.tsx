import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Header/Header.css';
// Import site header styles

interface HeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/blog', label: 'Blog' },
    { path: '/admin/services', label: 'Services' },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/comments', label: 'Comments' },
    { path: '/admin/users', label: 'Users' },
  ];

  return (
    <header className="admin-header">
      <div className="header-container">
        <Link to="/admin/dashboard" className="admin-logo">
          <span className="logo-text">SATORIS</span>
          <span className="logo-subtitle">Admin</span>
        </Link>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

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
      </div>
    </header>
  );
};

export default AdminHeader;