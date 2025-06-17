import { useState, useEffect } from 'react';
import { sendCode, verifyLogin, verifyRegister } from '../lib/api/services';
import type { User } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for token and user data in localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setState({
        user: JSON.parse(userData),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const handleSendCode = async (phone: string, method: 'phone' | 'whatsapp') => {
    try {
      const response = await sendCode({ phone, method });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (phone: string, code: string) => {
    try {
      const response = await verifyLogin({ phone, code });
      const { user, token } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (phone: string, code: string, name: string) => {
    try {
      const response = await verifyRegister({ phone, code, name });
      const { user, token } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return {
    ...state,
    sendCode: handleSendCode,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}; 