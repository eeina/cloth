'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { supabase } from '@/lib/supabase';
// import type { User } from '@supabase/supabase-js';

// Mock user type for demo
type User = {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication for demo
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in for demo
    if (email === 'admin@elegant.sa' && password === 'admin123') {
      const mockUser = {
        id: '1',
        email: 'admin@elegant.sa',
        user_metadata: {
          first_name: 'Admin',
          last_name: 'User',
        },
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return { data: { user: mockUser }, error: null };
    } else if (email && password) {
      const mockUser = {
        id: '2',
        email: email,
        user_metadata: {
          first_name: 'User',
          last_name: 'Demo',
        },
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return { data: { user: mockUser }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials' } };
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    // Mock sign up for demo
    const mockUser = {
      id: Date.now().toString(),
      email: email,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    return { data: { user: mockUser }, error: null };
  };

  const signOut = async () => {
    // Mock sign out for demo
    setUser(null);
    localStorage.removeItem('mockUser');
    return { error: null };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}