import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CRUDList.css';

const ProductsList: React.FC = () => {
  const [products] = useState<any[]>([]);

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Products</h1>
          <p>E-commerce product management</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">+ New Product</Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state-card">
          <span className="empty-icon">🛒</span>
          <h3>No products yet</h3>
          <p>Start adding products for your e-commerce store</p>
          <Link to="/admin/products/new" className="btn-primary">Add First Product</Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {/* Product card content */}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .empty-state-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 60px; text-align: center; }
        .empty-icon { font-size: 3rem; display: block; margin-bottom: 16px; }
        .empty-state-card h3 { margin: 0 0 8px; color: #111827; }
        .empty-state-card p { color: #6b7280; margin: 0 0 24px; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .product-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default ProductsList;