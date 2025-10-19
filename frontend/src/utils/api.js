import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  verifyOTP: (otpData) => api.post('/auth/verify-otp', otpData),
  login: (credentials) => api.post('/auth/login', credentials),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (resetData) => api.post('/auth/reset-password', resetData),
  getProfile: () => api.get('/auth/profile'),
};

// Expense API
export const expenseAPI = {
  getExpenses: (params = {}) => api.get('/expenses', { params }),
  getExpense: (id) => api.get(`/expenses/${id}`),
  createExpense: (expenseData) => api.post('/expenses', expenseData),
  updateExpense: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  getExpenseStats: (params = {}) => api.get('/expenses/stats', { params }),
};

// Reports API
export const reportsAPI = {
  getSummary: (params = {}) => api.get('/reports/summary', { params }),
  getTrends: (params = {}) => api.get('/reports/trends', { params }),
  getInsights: (params = {}) => api.get('/reports/insights', { params }),
  downloadCSV: (params = {}) => api.get('/reports/detailed.csv', { 
    params,
    responseType: 'blob'
  }),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
