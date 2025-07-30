import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import type { AuthResponse, JWTDecoded, AuthUser } from '../types/auth.types';

const API_BASE_URL = 'http://localhost:8000';

export interface SignUpRequest {
  firebase_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

// Token management utilities
const TOKEN_KEY = 'neomedi_access_token';
const REFRESH_TOKEN_KEY = 'neomedi_refresh_token';

export const tokenStorage = {
  // Store tokens in sessionStorage (cleared when browser closes)
  setTokens(accessToken: string, refreshToken: string) {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  getAccessToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  clearTokens() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }
};

// Utility function to decode JWT and extract user data
export const decodeJWT = (token: string): AuthUser => {
  const decoded = jwtDecode<JWTDecoded>(token);
  return {
    email: decoded.email,
    name: decoded.name,
    user_uid: decoded.user_uid,
    role: decoded.role,
    email_verified: true, // This will come from the response
    is_active: true, // This will come from the response
    created_at: new Date().toISOString() // This will come from the response
  };
};

class AuthService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Set up axios interceptor to include Bearer token
    this.setupAxiosInterceptors();
  }

  private setupAxiosInterceptors() {
    // Request interceptor to add Bearer token
    this.api.interceptors.request.use(
      (config) => {
        const token = tokenStorage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = tokenStorage.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshAccessToken(refreshToken);
              if (response.success) {
                tokenStorage.setTokens(response.access_token!, response.refresh_token!);
                originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
                return this.api(originalRequest);
              }
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            tokenStorage.clearTokens();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async signUp(firebaseToken: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/api/v1/auth/signup', {
        firebase_token: firebaseToken,
      });
      
      // Store tokens if successful
      if (response.data.success && response.data.access_token && response.data.refresh_token) {
        tokenStorage.setTokens(response.data.access_token, response.data.refresh_token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as AuthResponse;
      }
      throw error;
    }
  }

  async login(firebaseToken: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/api/v1/auth/login', {
        firebase_token: firebaseToken,
      });
      
      // Store tokens if successful
      if (response.data.success && response.data.access_token && response.data.refresh_token) {
        tokenStorage.setTokens(response.data.access_token, response.data.refresh_token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as AuthResponse;
      }
      throw error;
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as AuthResponse;
      }
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/api/v1/auth/forgot-password', {
        email: email,
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as AuthResponse;
      }
      throw error;
    }
  }

  logout() {
    tokenStorage.clearTokens();
  }

  isAuthenticated(): boolean {
    const token = tokenStorage.getAccessToken();
    console.log('🔑 Token encontrado:', !!token);
    
    if (!token) return false;
    
    try {
      const decoded = jwtDecode<JWTDecoded>(token);
      const currentTime = Date.now() / 1000;
      const isExpired = decoded.exp <= currentTime + 300; // 5 minutos de margem
      
      console.log('⏰ Token expira em:', new Date(decoded.exp * 1000));
      console.log('⏰ Tempo atual:', new Date(currentTime * 1000));
      console.log('⏰ Está expirado:', isExpired);
      
      return !isExpired;
    } catch (error) {
      console.error('❌ Error decoding JWT token:', error);
      return false;
    }
  }

  // Get current user from JWT token
  getCurrentUser(): AuthUser | null {
    const token = tokenStorage.getAccessToken();
    if (!token) return null;
    
    try {
      return decodeJWT(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}

export const authService = new AuthService(); 