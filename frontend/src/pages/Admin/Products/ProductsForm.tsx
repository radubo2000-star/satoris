import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../CRUDForm.css';

const ProductsForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    name: '', slug: '', description: '', price: 0, category: '', stock: 0, image: '', is_active: true
  });

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/products');
  };

  return (
    <div className="crud-form-page">
      <div className="form-header">
        <Link to="/admin/products" className="back-link">← Back to Products</Link>
        <h1>{isEdit ? 'Edit Product' : 'New Product'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-grid">
          <div className="form-main">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} placeholder="Product name" required />
            </div>
            <div className="form-group">
              <label>Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="product-slug" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Product description..." rows={4} />
            </div>
          </div>
          <div className="form-sidebar">
            <div className="form-group">
              <label>Price</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="">Select category</option>
                <option value="Events">Events</option>
                <option value="Digital">Digital</option>
                <option value="Merchandise">Merchandise</option>
              </select>
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })} min="0" />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="form-group checkbox-group">
              <label><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} /> Active</label>
            </div>
            <button type="submit" className="btn-primary btn-full">{isEdit ? 'Update Product' : 'Create Product'}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;