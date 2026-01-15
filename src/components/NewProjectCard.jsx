import './NewProjectCard.css';

function NewProjectCard({ onClick }) {
  return (
    <div className="new-project-card" onClick={onClick}>
      <div className="new-project-content">
        <div className="new-project-icon">+</div>
        <div className="new-project-text">
          <div className="new-project-title">New Project</div>
          <div className="new-project-subtitle">Create another AI agent</div>
        </div>
      </div>
    </div>
  );
}

export default NewProjectCard;
