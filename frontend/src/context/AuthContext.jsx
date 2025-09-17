import { createContext, useContext, useState, useCallback } from 'react';
import { auth as authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('token') ? true : null);

  const login = useCallback(async (credentials) => {
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      setUser(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const { data } = await authService.register(userData);
      localStorage.setItem('token', data.token);
      setUser(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};