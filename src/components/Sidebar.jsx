import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/projects', label: 'All Projects', icon: '📊' },
    { path: '/docs', label: 'Documentation', icon: '📄' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <>
      {/* Hamburger Menu */}
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">C</div>
          </div>
          <div className="logo-text">
            <div className="logo-title">Cognify</div>
            <div className="logo-subtitle">AI Agent Platform</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)} // Close on navigate
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="create-project-btn" onClick={() => {
            navigate('/projects/new');
            setIsOpen(false);
          }}>
            <span className="btn-icon">+</span>
            Create Project
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">→</span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
