import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { AuthResponse } from '../types/auth.types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (firebaseToken: string) => authService.login(firebaseToken),
    onSuccess: (data: AuthResponse) => {
      if (data.success) {
        // Login successful
        console.log('Login successful:', data);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (firebaseToken: string) => authService.signUp(firebaseToken),
    onSuccess: (data: AuthResponse) => {
      if (data.success) {
        // Sign up successful
        console.log('Sign up successful:', data);
      }
    },
    onError: (error) => {
      console.error('Sign up failed:', error);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authService.refreshAccessToken(refreshToken),
    onSuccess: (data: AuthResponse) => {
      if (data.success) {
        // Token refresh successful
        console.log('Token refresh successful');
      }
    },
    onError: (error) => {
      console.error('Token refresh failed:', error);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};