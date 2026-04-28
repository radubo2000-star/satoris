import React, { useState } from 'react';
import '../CRUDList.css';

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

const OrdersList: React.FC = () => {
  const [orders] = useState<Order[]>([]);

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Orders</h1>
          <p>E-commerce order management</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state-card">
          <span className="empty-icon">📦</span>
          <h3>No orders yet</h3>
          <p>Orders will appear here when customers make purchases</p>
        </div>
      ) : (
        <div className="crud-table-container">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name}<br /><span className="text-muted">{order.customer_email}</span></td>
                  <td>${order.total.toFixed(2)}</td>
                  <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button className="btn-icon">👁️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .empty-state-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 60px; text-align: center; }
        .empty-icon { font-size: 3rem; display: block; margin-bottom: 16px; }
        .empty-state-card h3 { margin: 0 0 8px; color: #111827; }
        .empty-state-card p { color: #6b7280; margin: 0; }
        .text-muted { font-size: 0.75rem; color: #9ca3af; }
        .status-badge.pending { background: #fef3c7; color: #d97706; }
        .status-badge.processing { background: #dbeafe; color: #1d4ed8; }
        .status-badge.completed { background: #dcfce7; color: #16a34a; }
        .status-badge.cancelled { background: #fee2e2; color: #dc2626; }
      `}</style>
    </div>
  );
};

export default OrdersList;