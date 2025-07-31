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
  user_id: string;
  company_id: string;
}

export interface SocialMedia {
  [key: string]: any;
}

export type Gender = 'male' | 'female' | 'other' | 'undisclosed';

export interface User {
  id: string;
  name: string;
  phone: string;
  birth_date: string;
  gender: Gender;
  is_active: boolean;
  is_verified: boolean;
  has_access: boolean;
  role: string;
  social_media: SocialMedia;
  auth_user_id: number;
  email: string;
  profile_picture_url: string;
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
  birth_date?: string;
  gender?: Gender;
  is_active?: boolean;
  is_verified?: boolean;
  has_access?: boolean;
  role?: string;
  social_media?: SocialMedia;
  suspended_at?: string;
}

export interface UpdateAddressRequest {
  street?: string;
  number?: string;
  complement?: string;
  neighbourhood?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  user_id?: string;
  company_id?: string;
}