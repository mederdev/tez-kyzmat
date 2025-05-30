import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import axios from 'axios';

type AuthMethod = 'phone' | 'whatsapp';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (identifier: string, code: string, method: AuthMethod) => Promise<void>;
  register: (identifier: string, code: string, method: AuthMethod) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'tez-kyzmat-user';
const TOKEN_STORAGE_KEY = 'tez-kyzmat-token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  });

  // Set up axios interceptor for authentication
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return () => {
      delete axios.defaults.headers.common['Authorization'];
    };
  }, []);

  const login = async (identifier: string, code: string, method: AuthMethod) => {
    try {
      // Here you would make an API call to verify the code and get user data
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        phone: identifier,
        isAdmin: identifier === '+996700000000', // Example admin check
      };
      
      setUser(mockUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (identifier: string, code: string, method: AuthMethod) => {
    try {
      // Here you would make an API call to create a new user
      // For now, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        phone: identifier,
      };
      
      setUser(mockUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Clear any invalid user data on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        JSON.parse(savedUser);
      }
    } catch (error) {
      console.error('Invalid user data in localStorage:', error);
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
        login, 
        register,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 