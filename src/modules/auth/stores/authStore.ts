import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService } from '../services/authService';
import type { AuthState, AuthUser, LoginCredentials, SignUpCredentials, AuthResult } from '../types/auth.types';

interface AuthStore extends AuthState {
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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,

  initializeAuth: () => {
    console.log('🔄 Zustand set chamado com: { isLoading: true }');
    set({ isLoading: true });
    
    console.log('🔍 Inicializando autenticação...');
    
    // Apenas verificar JWT tokens (sem Firebase Auth)
    const currentUser = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();
    
    console.log('👤 Usuário JWT:', currentUser);
    console.log('🔐 JWT válido:', isAuth);
    
    if (currentUser && isAuth) {
      console.log('✅ Usuário autenticado (JWT), definindo estado...');
      const newState = {
        user: currentUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        successMessage: null
      };
      console.log('🔄 Zustand set chamado com:', newState);
      set(newState);
    } else {
      console.log('❌ JWT inválido ou inexistente, limpando estado...');
      // Limpar tokens se inválidos
      authService.logout();
      const newState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        successMessage: null
      };
      console.log('🔄 Zustand set chamado com:', newState);
      set(newState);
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

      if (apiResponse.success) {
        let userData = apiResponse.user;
        if (!userData && apiResponse.access_token) {
          try {
            userData = authService.getCurrentUser();
          } catch (error) {
            console.error('Erro ao decodificar JWT:', error);
          }
        }

        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            successMessage: apiResponse.message || 'Login realizado com sucesso!'
          });

          return {
            success: true,
            message: apiResponse.message || 'Login realizado com sucesso!',
            user: userData
          };
        } else {
          set({
            isLoading: false,
            error: 'Erro ao obter dados do usuário'
          });

          return {
            success: false,
            message: 'Erro ao obter dados do usuário'
          };
        }
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

      if (apiResponse.success) {
        // Se a API não enviou o user, usar os dados do JWT
        let userData = apiResponse.user;
        if (!userData && apiResponse.access_token) {
          try {
            userData = authService.getCurrentUser();
          } catch (error) {
            console.error('❌ Erro ao decodificar JWT (Google):', error);
          }
        }

        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            successMessage: apiResponse.message || 'Login com Google realizado com sucesso!'
          });

          return {
            success: true,
            message: apiResponse.message || 'Login com Google realizado com sucesso!',
            user: userData
          };
        } else {
          set({
            isLoading: false,
            error: 'Erro ao obter dados do usuário'
          });

          return {
            success: false,
            message: 'Erro ao obter dados do usuário'
          };
        }
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

  handleGoogleAuth: async (): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const firebaseUserCredential = await signInWithPopup(auth, provider);
      const firebaseToken = await firebaseUserCredential.user.getIdToken();

      // Usar a mesma lógica do login normal
      const apiResponse = await authService.login(firebaseToken);

      if (apiResponse.success) {
        let userData = apiResponse.user;
        if (!userData && apiResponse.access_token) {
          try {
            userData = authService.getCurrentUser();
          } catch (error) {
            console.error('Erro ao decodificar JWT:', error);
          }
        }

        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            successMessage: apiResponse.message || 'Login com Google realizado com sucesso!'
          });

          return {
            success: true,
            message: apiResponse.message || 'Login com Google realizado com sucesso!',
            user: userData
          };
        } else {
          set({
            isLoading: false,
            error: 'Erro ao obter dados do usuário'
          });

          return {
            success: false,
            message: 'Erro ao obter dados do usuário'
          };
        }
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
      let errorMessage = 'Erro ao processar autenticação com Google';
      
      // Tratar erros específicos do Firebase
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelado pelo usuário';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup bloqueado pelo navegador. Permita popups para este site.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Login cancelado';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
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
    // Limpar tokens e estado (sem Firebase Auth)
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
         }),
     {
       name: 'auth-store',
       storage: {
         getItem: (name) => {
           const value = sessionStorage.getItem(name);
           return value ? JSON.parse(value) : null;
         },
         setItem: (name, value) => {
           sessionStorage.setItem(name, JSON.stringify(value));
         },
         removeItem: (name) => {
           sessionStorage.removeItem(name);
         }
       },
       partialize: (state) => ({
         user: state.user,
         isAuthenticated: state.isAuthenticated
       })
     }
   )
 ); 