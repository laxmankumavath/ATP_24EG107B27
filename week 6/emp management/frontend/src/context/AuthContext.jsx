import { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.registerUser(userData);
      if (response.success) {
        return { success: true, message: response.data.message };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.loginUser(credentials);
      if (response.success) {
        // Store user info in localStorage or state
        setUser({
          email: credentials.email,
          // Add more user info if returned from backend
        });
        setIsAuthenticated(true);
        // Store token if needed (it's in HttpOnly cookie)
        localStorage.setItem('userEmail', credentials.email);
        return { success: true, message: response.data.message };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userEmail');
    setError(null);
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUser({ email: userEmail });
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    error,
    register,
    login,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
