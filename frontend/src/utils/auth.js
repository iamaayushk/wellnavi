import { authAPI } from '../services/api';

// Check if user is authenticated by verifying token with backend
export const isAuthenticated = async () => {
  try {
    console.log('🔐 Checking authentication...');
    const response = await authAPI.getMe();
    console.log('🔐 Auth response:', response.data.success);
    return response.data.success;
  } catch (error) {
    console.error('🔐 Auth check failed:', error.message);
    return false;
  }
};

// Get user data from backend using cookie
export const getUser = async () => {
  try {
    const response = await authAPI.getMe();
    if (response.data.success) {
      return response.data.data.user;
    }
    return null;
  } catch {
    return null;
  }
};

// Logout user
export const logout = async () => {
  try {
    // Call backend logout endpoint to clear cookie
    await authAPI.logout();
    return true;
  } catch (err) {
    console.error('Logout error:', err);
    return false;
  }
};
