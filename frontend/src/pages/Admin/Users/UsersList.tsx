import API_BASE from '../../../api/base';

import React, { useState, useEffect } from 'react';
import '../CRUDList.css';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  is_active: boolean;
  created_at: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(API_BASE + '/users', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) setUsers(await response.json());
    } catch (err) { console.error('Failed to fetch users:', err); }
    finally { setIsLoading(false); }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${API_BASE}/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ role: newRole })
      });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as 'admin' | 'user' } : u));
    } catch (err) { console.error('Failed to change role:', err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    const token = localStorage.getItem('admin_token');
    try {
      await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) { console.error('Failed to delete:', err); }
  };

  const currentUserId = JSON.parse(localStorage.getItem('admin_user') || '{}').id;

  if (isLoading) return <div className="crud-loading"><div className="spinner"></div></div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Users</h1>
          <p>Manage user accounts and permissions</p>
        </div>
      </div>

      <div className="crud-table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="title-cell">
                  <span className="post-title">{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={user.id === currentUserId}
                    className="role-select"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <span className={`status-badge ${user.is_active ? 'published' : 'draft'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  {user.id !== currentUserId && (
                    <button className="btn-icon danger" onClick={() => handleDelete(user.id)} title="Delete">🗑️</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .role-select { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.8125rem; background: #fff; cursor: pointer; }
        .role-select:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default UsersList;