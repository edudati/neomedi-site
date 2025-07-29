import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../services/authService';
import type { SignUpFormData } from '../schemas/authSchemas';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  const signUp = async (data: SignUpFormData) => {
    try {
      // 1. Criar usuário no Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // 2. Obter o token do Firebase
      const firebaseToken = await userCredential.user.getIdToken();

      // 3. Enviar o token para nossa API
      const response = await authService.signUp(firebaseToken);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      console.error('Erro no processo de signup:', error);
      throw error;
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseToken = await userCredential.user.getIdToken();
      
      const response = await authService.signUp(firebaseToken);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      console.error('Erro no signup com Google:', error);
      throw error;
    }
  };

  // Função inteligente para Google que decide entre login e signup
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseToken = await userCredential.user.getIdToken();
      
      // Tentar fazer signup primeiro
      const signUpResponse = await authService.signUp(firebaseToken);
      
      if (signUpResponse.success) {
        // Signup bem-sucedido - usuário novo
        return signUpResponse;
      } else if (signUpResponse.message?.includes('já existe') || signUpResponse.message?.includes('already exists')) {
        // Usuário já existe, tentar login
        const loginResponse = await authService.login(firebaseToken);
        
        if (loginResponse.success) {
          return loginResponse;
        } else {
          throw new Error(loginResponse.message || 'Erro ao fazer login');
        }
      } else {
        // Outro erro no signup
        throw new Error(signUpResponse.message || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro no processo de autenticação com Google:', error);
      throw error;
    }
  };

  return {
    ...context,
    signUp,
    signUpWithGoogle,
    handleGoogleAuth,
  };
}; 