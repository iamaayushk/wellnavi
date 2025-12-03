import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Check if user is authenticated by verifying token with backend
export const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      withCredentials: true
    });
    return response.data.success;
  } catch (error) {
    return false;
  }
};

// Get user data from localStorage
export const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

// Logout user
export const logout = async () => {
  try {
    // Call backend logout endpoint to clear cookie
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    
    // Clear localStorage
    localStorage.removeItem('user');
    
    return true;
  } catch (err) {
    console.error('Logout error:', err);
    // Clear localStorage anyway
    localStorage.removeItem('user');
    return false;
  }
};
