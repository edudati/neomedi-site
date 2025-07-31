import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../auth/lib/firebase';

export const firebaseService = {
  // Criar novo usuário no Firebase
  async createUser(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fazer login para obter o token
      const signInResult = await signInWithEmailAndPassword(auth, email, password);
      const token = await signInResult.user.getIdToken();
      
      return {
        uid: user.uid,
        email: user.email,
        token
      };
    } catch (error: any) {
      console.error('Erro ao criar usuário no Firebase:', error);
      throw new Error(this.getFirebaseErrorMessage(error.code));
    }
  },

  // Obter mensagem de erro do Firebase
  getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este email já está sendo usado por outro usuário';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/operation-not-allowed':
        return 'Operação não permitida';
      case 'auth/weak-password':
        return 'Senha muito fraca. Use pelo menos 6 caracteres';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet';
      default:
        return 'Erro ao criar usuário. Tente novamente';
    }
  }
}; 