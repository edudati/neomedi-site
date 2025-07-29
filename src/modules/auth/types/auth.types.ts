export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthUser {
  email: string;
  name: string;
  user_uid: string;
  role: string;
  email_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: AuthUser;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  is_new_user?: boolean;
  access_token?: string;
  refresh_token?: string;
  user?: AuthUser;
  email_verified?: boolean;
  is_active?: boolean;
  created_at?: string;
}

export interface JWTDecoded {
  email: string;
  name: string;
  user_uid: string;
  role: string;
  exp: number;
  iat: number;
}