import { authAPI } from '../services/api';

// Check if user is authenticated by verifying token with backend
export const isAuthenticated = async () => {
  try {
    const response = await authAPI.getMe();
    return response.data.success;
  } catch {
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
