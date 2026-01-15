import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/projects" />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/projects" />} />
      <Route path="/projects" element={token ? <Projects /> : <Navigate to="/login" />} />
      <Route path="/projects/new" element={token ? <CreateProject /> : <Navigate to="/login" />} />
      <Route path="/chat/:projectId" element={token ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/" element={<Navigate to={token ? "/projects" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
