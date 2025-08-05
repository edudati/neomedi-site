import { useAuthContext } from '../../auth/context/AuthContext';

export const useWorkspace = () => {
  const authContext = useAuthContext();
  
  return {
    ...authContext,
    // Adicione métodos específicos do workspace aqui se necessário
  };
}; 