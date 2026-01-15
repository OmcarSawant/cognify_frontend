import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { projectsAPI } from '../services/api';
import { agentTemplates } from '../constants/agentTemplates';
import './CreateProject.css';

function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTemplates, setShowTemplates] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Project name is required');
      return;
    }

    try {
      setLoading(true);
      await projectsAPI.createProject(name, description, systemPrompt);
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = async (template) => {
    try {
      setLoading(true);
      setError('');
      await projectsAPI.createProject(
        template.title,
        template.description,
        template.systemPrompt
      );
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
      setLoading(false);
    }
  };

  const handleStartBlank = () => {
    setShowTemplates(false);
  };

  const handleBackToTemplates = () => {
    setShowTemplates(true);
    setName('');
    setDescription('');
    setSystemPrompt('');
  };

  return (
    <div className="create-project-page">
      <Sidebar />
      <div className="create-project-content">
        <div className="create-project-header">
          <h1>Create New Project</h1>
          <p>Choose a template or start from scratch</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showTemplates ? (
          <>
            {/* Template Gallery */}
            <div className="template-section">
              <div className="template-section-header">
                <h2>🚀 Agent Templates</h2>
                <p>Get started quickly with pre-configured agents</p>
              </div>

              <div className="template-grid">
                {agentTemplates.map((template) => (
                  <div key={template.id} className="template-card">
                    <div className="template-card-content">
                      <h3>{template.title}</h3>
                      <p>{template.description}</p>
                    </div>
                    <button
                      className="use-template-btn"
                      onClick={() => handleUseTemplate(template)}
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Use Template'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Blank Project Option */}
            <div className="blank-section">
              <div className="blank-divider">
                <span>or</span>
              </div>
              <button
                className="start-blank-btn"
                onClick={handleStartBlank}
                disabled={loading}
              >
                ✨ Start with Blank Agent
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Blank Project Form */}
            <button
              className="back-to-templates-btn"
              onClick={handleBackToTemplates}
              disabled={loading}
            >
              ← Back to Templates
            </button>

            <form className="create-project-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Project Name *</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Customer Support Bot"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your project"
                  rows="3"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="systemPrompt">System Prompt</label>
                <textarea
                  id="systemPrompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Define the AI agent's behavior and instructions..."
                  rows="6"
                  disabled={loading}
                />
                <small>Optional: Customize how your AI agent responds</small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/projects')}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateProject;
