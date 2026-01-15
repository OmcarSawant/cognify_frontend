import './ProjectCard.css';

function ProjectCard({ project, onOpen, onDelete }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '#28a745';
      case 'idle':
        return '#ffc107';
      case 'draft':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1h ago';
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const status = 'active'; // Default status - can be extended later
  const statusColor = getStatusColor(status);

  return (
    <div className="project-card">
      <div className="project-image">
        <div className="project-image-placeholder">
          {project.name?.charAt(0).toUpperCase() || 'P'}
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.name}</h3>
        <p className="project-description">{project.description || 'No description'}</p>
        <div className="project-meta">
          <div className="project-status">
            <span className="status-dot" style={{ backgroundColor: statusColor }}></span>
            <span className="status-text">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            <span className="status-separator">•</span>
            <span className="last-updated">Last updated {formatDate(project.createdAt)}</span>
          </div>
        </div>
        <div className="project-actions">
          <button className="action-btn open-btn" onClick={() => onOpen(project.id)}>
            <span>Open</span>
            <span className="action-icon">↗</span>
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(project.id)}>
            <span>Delete</span>
            <span className="action-icon">🗑</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
