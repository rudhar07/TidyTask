import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const tasks = {
  getAll: (category) => api.get(`/tasks${category ? `?category=${category}` : ''}`),
  create: (taskData) => api.post('/tasks', taskData),
  update: (id, updates) => api.patch(`/tasks/${id}`, updates),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;