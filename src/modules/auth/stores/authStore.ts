import { create } from 'zustand';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService } from '../services/authService';
import type { AuthState, AuthUser, LoginCredentials, SignUpCredentials, AuthResult } from '../types/auth.types';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResult>;
  signUpWithGoogle: () => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  logout: () => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  clearMessages: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,

  initializeAuth: () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      set({
        user: currentUser,
        isAuthenticated: true,
      });
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    
    try {
      // 1. Autenticar com Firebase
      const firebaseUserCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // 2. Obter token do Firebase
      const firebaseToken = await firebaseUserCredential.user.getIdToken();

      // 3. Enviar token para sua API
      const apiResponse = await authService.login(firebaseToken);

      if (apiResponse.success && apiResponse.user) {
        set({
          user: apiResponse.user,
          isAuthenticated: true,
          isLoading: false,
          successMessage: apiResponse.message || 'Login realizado com sucesso!'
        });

        return {
          success: true,
          message: apiResponse.message || 'Login realizado com sucesso!',
          user: apiResponse.user
        };
      } else {
        set({
          isLoading: false,
          error: apiResponse.message || 'Erro ao fazer login'
        });

        return {
          success: false,
          message: apiResponse.message || 'Erro ao fazer login'
        };
      }
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      set({
        isLoading: false,
        error: errorMessage
      });

      return {
        success: false,
        message: errorMessage
      };
    }
  },

  loginWithGoogle: async (): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    
    try {
      const provider = new GoogleAuthProvider();
      const firebaseUserCredential = await signInWithPopup(auth, provider);
      const firebaseToken = await firebaseUserCredential.user.getIdToken();

      const apiResponse = await authService.login(firebaseToken);

      if (apiResponse.success && apiResponse.user) {
        set({
          user: apiResponse.user,
          isAuthenticated: true,
          isLoading: false,
          successMessage: apiResponse.message || 'Login com Google realizado com sucesso!'
        });

        return {
          success: true,
          message: apiResponse.message || 'Login com Google realizado com sucesso!',
          user: apiResponse.user
        };
      } else {
        set({
          isLoading: false,
          error: apiResponse.message || 'Erro ao fazer login com Google'
        });

        return {
          success: false,
          message: apiResponse.message || 'Erro ao fazer login com Google'
        };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login com Google';
      
      set({
        isLoading: false,
        error: errorMessage
      });

      return {
        success: false,
        message: errorMessage
      };
    }
  },

  signUp: async (credentials: SignUpCredentials): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    
    try {
      const firebaseUserCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseToken = await firebaseUserCredential.user.getIdToken();

      const apiResponse = await authService.signUp(firebaseToken);

      if (apiResponse.success && apiResponse.user) {
        set({
          user: apiResponse.user,
          isAuthenticated: true,
          isLoading: false,
          successMessage: apiResponse.message || 'Cadastro realizado com sucesso!'
        });

        return {
          success: true,
          message: apiResponse.message || 'Cadastro realizado com sucesso!',
          user: apiResponse.user
        };
      } else {
        set({
          isLoading: false,
          error: apiResponse.message || 'Erro ao fazer cadastro'
        });

        return {
          success: false,
          message: apiResponse.message || 'Erro ao fazer cadastro'
        };
      }
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer cadastro';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email já em uso';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Senha fraca';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      set({
        isLoading: false,
        error: errorMessage
      });

      return {
        success: false,
        message: errorMessage
      };
    }
  },

  signUpWithGoogle: async (): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    
    try {
      const provider = new GoogleAuthProvider();
      const firebaseUserCredential = await signInWithPopup(auth, provider);
      const firebaseToken = await firebaseUserCredential.user.getIdToken();

      const apiResponse = await authService.signUp(firebaseToken);

      if (apiResponse.success && apiResponse.user) {
        set({
          user: apiResponse.user,
          isAuthenticated: true,
          isLoading: false,
          successMessage: apiResponse.message || 'Cadastro com Google realizado com sucesso!'
        });

        return {
          success: true,
          message: apiResponse.message || 'Cadastro com Google realizado com sucesso!',
          user: apiResponse.user
        };
      } else {
        set({
          isLoading: false,
          error: apiResponse.message || 'Erro ao fazer cadastro com Google'
        });

        return {
          success: false,
          message: apiResponse.message || 'Erro ao fazer cadastro com Google'
        };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer cadastro com Google';
      
      set({
        isLoading: false,
        error: errorMessage
      });

      return {
        success: false,
        message: errorMessage
      };
    }
  },

  forgotPassword: async (email: string): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      set({
        isLoading: false,
        successMessage: 'Email de recuperação de senha enviado com sucesso!'
      });
      return {
        success: true,
        message: 'Email de recuperação de senha enviado com sucesso!'
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao enviar email de recuperação de senha';
      set({
        isLoading: false,
        error: errorMessage
      });
      return {
        success: false,
        message: errorMessage
      };
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      successMessage: null
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setSuccessMessage: (message: string | null) => {
    set({ successMessage: message });
  },

  clearMessages: () => {
    set({ error: null, successMessage: null });
  }
})); 