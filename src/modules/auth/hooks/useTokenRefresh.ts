import { useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { authService, tokenStorage } from '../services/authService';

export const useTokenRefresh = () => {
  const { isAuthenticated, user } = useAuthContext();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Limpar intervalo se não estiver autenticado
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      return;
    }

    // Função para refresh do token
    const refreshToken = async () => {
      try {
        const refreshTokenValue = tokenStorage.getRefreshToken();
        if (refreshTokenValue) {
          const response = await authService.refreshAccessToken(refreshTokenValue);
          if (response.success && response.access_token && response.refresh_token) {
            // Tokens atualizados automaticamente pelo authService
            console.log('Token renovado automaticamente');
          } else {
            console.warn('Falha ao renovar token');
          }
        }
      } catch (error) {
        console.error('Erro ao renovar token:', error);
      }
    };

    // Configurar refresh a cada 14 minutos (tokens JWT geralmente expiram em 15-30 min)
    const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutos
    
    refreshIntervalRef.current = setInterval(refreshToken, REFRESH_INTERVAL);

    // Cleanup ao desmontar
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [isAuthenticated, user]);

  return null;
};