import { useCallback } from 'react';
import { notificationService } from '../services/notificationService';

export const useNotification = () => {
  const showSuccess = useCallback((message: string) => {
    notificationService.success(message);
  }, []);

  const showError = useCallback((message: string) => {
    notificationService.error(message);
  }, []);

  const showInfo = useCallback((message: string) => {
    notificationService.info(message);
  }, []);

  const showWarning = useCallback((message: string) => {
    notificationService.warning(message);
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
};