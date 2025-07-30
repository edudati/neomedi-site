export interface AuthUser {
  id: number;
  email: string;
  firebase_uid: string;
  display_name: string;
  email_verified: boolean;
  picture: string | null;
}

export interface UserAddress {
  id: string;
  street: string;
  number: string;
  complement: string | null;
  neighbourhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

export interface User {
  id: string;
  auth_user_id: number;
  name: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  role: string;
  is_deleted: boolean;
  suspended_at: string | null;
  created_at: string;
  updated_at: string;
  auth_user: AuthUser;
  address: UserAddress | null;
}

export type UserResponse = User;

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
}

export interface UpdateAddressRequest {
  street?: string;
  number?: string;
  complement?: string;
  neighbourhood?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}