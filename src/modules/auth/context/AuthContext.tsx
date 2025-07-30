import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { LoginCredentials, SignUpCredentials, AuthResult } from '../types/auth.types';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResult>;
  signUpWithGoogle: () => Promise<AuthResult>;
  handleGoogleAuth: () => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  logout: () => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  clearMessages: () => void;
  initializeAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authStore = useAuthStore();

  console.log('🏗️ AuthProvider - Renderizando com store:', {
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    user: authStore.user
  });

  return (
    <AuthContext.Provider value={authStore}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  console.log('🔗 useAuthContext - isAuthenticated:', context.isAuthenticated);
  console.log('🔗 useAuthContext - isLoading:', context.isLoading);
  console.log('🔗 useAuthContext - user:', context.user);
  
  return context;
}; 