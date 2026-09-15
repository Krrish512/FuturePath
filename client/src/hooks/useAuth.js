import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const TOKEN_KEY = 'futurepath_token';
const USER_KEY = 'futurepath_user';

export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY) || null;
  });

  const [loading, setLoading] = useState(false);

  // Persist user and token to localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [user, token]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      if (res.success) {
        setToken(res.token);
        setUser(res.user);
        // Store token so api.js can use it immediately
        localStorage.setItem(TOKEN_KEY, res.token);
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await api.register(data);
      if (res.success) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem(TOKEN_KEY, res.token);
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user && !!token;

  return {
    user,
    token,
    loading,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
  };
}
