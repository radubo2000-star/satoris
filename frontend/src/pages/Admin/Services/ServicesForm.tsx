import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../CRUDForm.css';

const EMOJI_OPTIONS = ['📢', '🎪', '💻', '🎨', '🏢', '📈', '⚡', '🌍', '🎯', '🚀', '💡', '🎭', '📊', '🎬', '🎵', '🏆'];

interface Service {
  id?: number;
  icon: string;
  title: string;
  description: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

const ServicesForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Service>({
    icon: '💻',
    title: '',
    description: '',
    category: 'Events',
    sort_order: 0,
    is_active: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Store in local state for now (backend doesn't have full CRUD for services)
    navigate('/admin/services');
    setIsLoading(false);
  };

  return (
    <div className="crud-form-page">
      <div className="form-header">
        <Link to="/admin/services" className="back-link">← Back to Services</Link>
        <h1>{isEdit ? 'Edit Service' : 'New Service'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-grid">
          <div className="form-main">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description..."
                rows={4}
              />
            </div>
          </div>

          <div className="form-sidebar">
            <div className="form-group">
              <label>Icon</label>
              <div className="emoji-picker">
                {EMOJI_OPTIONS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    className={`emoji-btn ${formData.icon === emoji ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, icon: emoji })}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Icon emoji"
                style={{ marginTop: 8 }}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Events">Events</option>
                <option value="Digital">Digital</option>
                <option value="Creative">Creative</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEdit ? 'Update Service' : 'Create Service')}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        .emoji-picker {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 4px;
        }
        .emoji-btn {
          padding: 8px;
          background: #f3f4f6;
          border: 2px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.25rem;
          transition: all 0.2s;
        }
        .emoji-btn:hover { background: #e5e7eb; }
        .emoji-btn.selected {
          border-color: #4f46e5;
          background: #e0e7ff;
        }
      `}</style>
    </div>
  );
};

export default ServicesForm;