import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MetricCard from '../components/MetricCard';
import ProjectCard from '../components/ProjectCard';
import NewProjectCard from '../components/NewProjectCard';
import { projectsAPI, usageAPI } from '../services/api';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usageStats, setUsageStats] = useState({
    totalMessages: 0,
    userMessages: 0,
    assistantMessages: 0,
    todayMessages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
    loadUsageStats();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getProjects();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const loadUsageStats = async () => {
    try {
      const data = await usageAPI.getStats();
      setUsageStats(data);
    } catch (err) {
      console.error('Failed to load usage stats:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setIsSearching(true);
      const data = await projectsAPI.searchProjects(searchQuery);
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadProjects();
  };

  const handleOpenProject = (projectId) => {
    navigate(`/chat/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await projectsAPI.deleteProject(projectId);
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  // Calculate metrics from real data
  const totalAgents = projects.length;

  return (
    <div className="projects-page">
      <Sidebar />
      <div className="projects-content">
        <div className="projects-header">
          <div className="header-text">
            <h1>Project Dashboard</h1>
            <p>Manage and monitor your deployed AI agent projects</p>
          </div>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search chats for projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            {isSearching ? (
              <button type="button" className="clear-search-btn" onClick={handleClearSearch}>
                Clear
              </button>
            ) : (
              <button type="submit" className="search-btn" disabled={loading || !searchQuery.trim()}>
                🔍
              </button>
            )}
          </form>
        </div>

        <div className="metrics-section">
          <MetricCard
            title="TOTAL AGENTS"
            value={totalAgents}
            change={`${projects.length} project${projects.length !== 1 ? 's' : ''}`}
            changeType="neutral"
            icon="🤖"
          />
          <MetricCard
            title="TOTAL MESSAGES"
            value={usageStats.totalMessages}
            change={`${usageStats.todayMessages} today`}
            changeType={usageStats.todayMessages > 0 ? 'positive' : 'neutral'}
            icon="💬"
          />
          <MetricCard
            title="USER MESSAGES"
            value={usageStats.userMessages}
            change={`${usageStats.assistantMessages} responses`}
            changeType="neutral"
            icon="📊"
          />
        </div>

        {loading ? (
          <div className="loading-state">
            {isSearching ? 'Searching projects...' : 'Loading projects...'}
          </div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="projects-grid">
            {projects.length === 0 && isSearching ? (
              <div className="no-results">
                <p>No projects found matching current chats.</p>
                <button className="reset-search-btn" onClick={handleClearSearch}>Clear Search</button>
              </div>
            ) : (
              <>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={handleOpenProject}
                    onDelete={handleDeleteProject}
                  />
                ))}
                {!isSearching && <NewProjectCard onClick={handleCreateProject} />}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
