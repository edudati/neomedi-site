export interface JWTDecoded {
  email: string;
  name: string;
  user_uid: string;
  role: string;
  exp?: number;
  iat?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  email_verified: boolean;
  is_active: boolean;
  created_at: string;
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