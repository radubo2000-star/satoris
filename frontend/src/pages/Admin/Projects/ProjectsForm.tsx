import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API_BASE from '../../../api/base';
import '../CRUDForm.css';

interface Project {
  id?: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
}

const ProjectsForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [formData, setFormData] = useState<Project>({
    name: '',
    slug: '',
    category: '',
    description: '',
    image: '',
    is_featured: false,
    is_active: true
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchProject(parseInt(id));
    }
  }, [id]);

  const fetchProject = async (projectId: number) => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`${API_BASE}/projects/${projectId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (err) {
      console.error('Failed to fetch project:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (isFetching) return <div className="loading">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('admin_token');
    const url = isEdit ? `${API_BASE}/projects` : `${API_BASE}/projects`;
    const method = isEdit ? 'PUT' : 'POST';
    
    // For PUT, include ID in body
    const body = isEdit && id ? { ...formData, id: parseInt(id) } : formData;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        navigate('/admin/projects');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save project');
      }
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crud-form-page">
      <div className="form-header">
        <Link to="/admin/projects" className="back-link">← Back to Projects</Link>
        <h1>{isEdit ? 'Edit Project' : 'New Project'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-grid">
          <div className="form-main">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                placeholder="Project name"
                required
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="project-slug"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description..."
                rows={4}
              />
            </div>
          </div>

          <div className="form-sidebar">
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="">Select category</option>
                <option value="Branding">Branding</option>
                <option value="Digital">Digital</option>
                <option value="Events">Events</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
                Featured
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                Active
              </label>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.created_at || ''}
                onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectsForm;