import API_BASE from '../../../api/base';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CRUDList.css';

interface Project {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  is_featured: boolean;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_BASE + '/projects');
      if (response.ok) {
        setProjects(await response.json());
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="crud-loading"><div className="spinner"></div></div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary">+ New Project</Link>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image" style={{ backgroundImage: project.image ? `url(${project.image})` : undefined }}>
              {!project.image && <span>🖼️</span>}
            </div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <span className="category-badge">{project.category}</span>
              {project.is_featured && <span className="featured-badge">Featured</span>}
            </div>
            <div className="project-actions">
              <Link to={`/admin/projects/${project.id}`} className="btn-icon">✏️</Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .project-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .project-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .project-image {
          height: 160px;
          background: #f3f4f6;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }
        .project-info { padding: 16px; }
        .project-info h3 { margin: 0 0 8px; font-size: 1rem; color: #111827; }
        .project-actions { padding: 8px 16px 16px; display: flex; gap: 8px; }
        .featured-badge { background: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px; font-size: 0.625rem; font-weight: 600; margin-left: 8px; text-transform: uppercase; }
      `}</style>
    </div>
  );
};

export default ProjectsList;