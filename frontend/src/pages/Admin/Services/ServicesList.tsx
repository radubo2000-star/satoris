import API_BASE from '../../../api/base';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CRUDList.css';

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(API_BASE + '/services');
      if (response.ok) {
        setServices(await response.json());
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    const token = localStorage.getItem('admin_token');
    const updated = { ...service, is_active: !service.is_active };
    try {
      await fetch(`${API_BASE}/services/${service.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
      setServices(services.map(s => s.id === service.id ? updated : s));
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (isLoading) return <div className="crud-loading"><div className="spinner"></div></div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Services</h1>
          <p>Manage your service offerings</p>
        </div>
        <Link to="/admin/services/new" className="btn-primary">+ New Service</Link>
      </div>

      <div className="crud-table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Category</th>
              <th>Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td><span className="service-icon">{service.icon}</span></td>
                <td className="title-cell">
                  <span className="post-title">{service.title}</span>
                </td>
                <td><span className="category-badge">{service.category}</span></td>
                <td>{service.sort_order}</td>
                <td>
                  <span className={`status-badge ${service.is_active ? 'published' : 'draft'}`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="actions-cell">
                  <Link to={`/admin/services/${service.id}`} className="btn-icon" title="Edit">✏️</Link>
                  <button className="btn-icon" onClick={() => handleToggleActive(service)} title={service.is_active ? 'Deactivate' : 'Activate'}>
                    {service.is_active ? '⭕' : '✅'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`.service-icon { font-size: 1.5rem; }`}</style>
    </div>
  );
};

export default ServicesList;