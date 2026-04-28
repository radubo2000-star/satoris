import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  user: {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
  onMenuClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="header-right">
        <div className="header-notifications">
          <button className="notification-btn">
            <span>🔔</span>
            <span className="notification-badge">3</span>
          </button>
        </div>

        <div className="header-user" ref={dropdownRef}>
          <button className="user-dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="user-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
            <span className="user-name-display">{user.name}</span>
            <span className="dropdown-arrow">▼</span>
          </button>

          {dropdownOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-header">
                <span className="dropdown-name">{user.name}</span>
                <span className="dropdown-email">{user.email}</span>
                <span className="dropdown-role">{user.role}</span>
              </div>
              <div className="dropdown-divider"></div>
              <a href="/admin/profile" className="dropdown-item">
                <span>👤</span> Profile
              </a>
              <a href="/admin/settings" className="dropdown-item">
                <span>⚙️</span> Settings
              </a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={onLogout}>
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;