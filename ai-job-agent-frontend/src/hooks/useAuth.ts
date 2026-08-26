'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
    error: null,
  });

  // Fetch Current Session User
  const fetchUser = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.get('/auth/me');
      const user: User = response.data.data;
      
      setState({
        user,
        loading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (err: any) {
      setState({
        user: null,
        loading: false,
        isAuthenticated: false,
        error: err?.response?.data?.message || 'Failed to authenticate user',
      });
    }
  }, []);

  // Logout User
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setState({
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user: state.user,
    loading: state.loading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    refetchUser: fetchUser,
    logout,
  };
};