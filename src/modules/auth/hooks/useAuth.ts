import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService, tokenStorage, decodeJWT } from '../services/authService';
import type { AuthResponse, AuthUser } from '../types/authTypes';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Firebase auth state changed:', user);
      setUser(user);
      
      // Check if we have valid JWT tokens
      if (authService.isAuthenticated()) {
        console.log('JWT tokens found, extracting user data...');
        // Extract user data from JWT token
        const currentUser = authService.getCurrentUser();
        console.log('Current user from JWT:', currentUser);
        if (currentUser) {
          setAuthUser(currentUser);
        }
        setLoading(false);
      } else {
        console.log('No JWT tokens found');
        // No tokens, not authenticated
        setAuthUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await authService.signUp(idToken);
      
      if (response.success && response.access_token) {
        // Extract user data from JWT token
        const userData = decodeJWT(response.access_token);
        // Update with response data
        userData.email_verified = response.email_verified;
        userData.is_active = response.is_active;
        userData.created_at = response.created_at;
        
        setAuthUser(userData);
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      return { 
        success: false, 
        message: error.message || 'Erro ao criar conta' 
      };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const response = await authService.login(idToken);
      
      if (response.success && response.access_token) {
        // Extract user data from JWT token
        const userData = decodeJWT(response.access_token);
        // Update with response data
        userData.email_verified = response.email_verified;
        userData.is_active = response.is_active;
        userData.created_at = response.created_at;
        
        setAuthUser(userData);
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer login' 
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      
      // Primeiro tenta fazer signup
      let response = await authService.signUp(idToken);
      
      if (!response.success) {
        // Se não é novo usuário, tenta fazer login
        response = await authService.login(idToken);
      }
      
      if (response.success && response.access_token) {
        // Extract user data from JWT token
        const userData = decodeJWT(response.access_token);
        // Update with response data
        userData.email_verified = response.email_verified;
        userData.is_active = response.is_active;
        userData.created_at = response.created_at;
        
        setAuthUser(userData);
        return { 
          success: true, 
          message: response.message 
        };
      } else {
        return { 
          success: false, 
          message: response.message 
        };
      }
    } catch (error: any) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer login com Google' 
      };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      authService.logout(); // Clear JWT tokens
      setAuthUser(null);
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer logout' 
      };
    }
  };

  return {
    user,
    authUser,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };
}; 