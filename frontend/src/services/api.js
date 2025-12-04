import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// Health APIs
export const healthAPI = {
  addHealthData: (healthData) => api.post('/health/data', healthData),
  getTodayHealthData: () => api.get('/health/data/today'),
  getHealthData: (params) => api.get('/health/data', { params }),
  getHealthTips: () => api.get('/health/tips'),
};

// Symptom APIs
export const symptomAPI = {
  analyzeSymptoms: (symptomData) => api.post('/symptoms/analyze', symptomData),
  getSymptomHistory: () => api.get('/symptoms/history'),
};

// Chat APIs
export const chatAPI = {
  sendMessage: (messageData) => api.post('/chat/health-assistant', messageData),
};

// Doctor APIs
export const doctorAPI = {
  getDoctors: (params) => api.get('/doctors', { params }),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
  bookAppointment: (appointmentData) => api.post('/appointments', appointmentData),
};

// Dashboard APIs
export const dashboardAPI = {
  getDashboardData: () => api.get('/dashboard'),
  getHealthMetrics: () => api.get('/dashboard/metrics'),
};

// Export API URL for direct fetch calls if needed
export const getApiUrl = (endpoint) => `${API_URL}${endpoint}`;

export default api;
