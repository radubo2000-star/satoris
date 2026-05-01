import API_BASE from '../../../api/base';

import React, { useState, useEffect } from 'react';
import '../CRUDList.css';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'user';
  is_active: boolean;
  is_primary: boolean;
  created_at: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [generatingPassword, setGeneratingPassword] = useState(false);

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
    setNewUser({ ...newUser, password });
    setGeneratingPassword(true);
    setTimeout(() => setGeneratingPassword(false), 2000);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(API_BASE + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        setShowAddModal(false);
        setNewUser({ name: '', email: '', password: '', role: 'user' });
        fetchUsers();
      }
    } catch (err) { console.error('Failed to add user:', err); }
  };

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
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>+ Add User</button>
      </div>

      <div className="crud-table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Primary</th>
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
                    disabled={user.is_primary}
                    className="role-select"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
                <td>
                  {user.is_primary && <span className="status-badge published">Primary</span>}
                </td>
                <td>
                  <span className={`status-badge ${user.is_active ? 'published' : 'draft'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  {!user.is_primary && user.id !== currentUserId && (
                    <button className="btn-icon danger" onClick={() => handleDelete(user.id)} title="Delete">🗑️</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div style={{display: 'flex', gap: '8px'}}>
                  <input type="text" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required style={{flex: 1}} />
                  <button type="button" className="btn-secondary" onClick={generatePassword}>
                    {generatingPassword ? '✓ Copied!' : 'Generate'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .role-select { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.8125rem; background: #fff; cursor: pointer; }
        .role-select:disabled { opacity: 0.5; cursor: not-allowed; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: white; padding: 24px; border-radius: 12px; width: 100%; max-width: 400px; }
        .modal h2 { margin-bottom: 20px; }
        .modal .form-group { margin-bottom: 16px; }
        .modal .form-group label { display: block; margin-bottom: 6px; font-weight: 500; }
        .modal .form-group input, .modal .form-group select { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; }
        .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px; }
        .btn-secondary { padding: 10px 16px; background: #f3f4f6; border: none; border-radius: 6px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default UsersList;