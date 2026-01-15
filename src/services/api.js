import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL + 'api' || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }
};

export const projectsAPI = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  createProject: async (name, description, systemPrompt) => {
    const response = await api.post('/projects', { name, description, systemPrompt });
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
  searchProjects: async (query) => {
    const response = await api.get(`/projects/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
};

export const chatAPI = {
  sendMessage: async (projectId, message) => {
    const response = await api.post('/chat', { projectId, message });
    return response.data;
  },
  getMessages: async (projectId) => {
    const response = await api.get(`/chat/${projectId}/messages`);
    return response.data;
  }
};

export const usageAPI = {
  getStats: async () => {
    const response = await api.get('/usage');
    return response.data;
  }
};

export default api;
