export interface CompanyAddress {
  [key: string]: any;
}

export interface Company {
  id: string;
  name: string;
  legal_name: string;
  legal_id: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_visible: boolean;
  is_public: boolean;
  user_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  address: CompanyAddress | null;
}

export type CompanyResponse = Company;
export type CompanyListResponse = Company[];

export interface UpdateCompanyRequest {
  name?: string;
  legal_name?: string;
  legal_id?: string;
  email?: string;
  phone?: string;
  is_active?: boolean;
  is_visible?: boolean;
  is_public?: boolean;
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
}

// Tipos para criação de nova empresa
export interface CreateCompanyAddress {
  street: string;
  number: string;
  complement: string;
  neighbourhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CreateCompanyRequest {
  name: string;
  description: string;
  email: string;
  phone: string;
  social_media: Record<string, any>;
  is_virtual: boolean;
  is_active: boolean;
  address: CreateCompanyAddress;
}

export interface CreateCompanyResponse {
  name: string;
  description: string;
  email: string;
  phone: string;
  social_media: Record<string, any>;
  is_virtual: boolean;
  is_active: boolean;
  id: string;
  user_id: string;
  address: Record<string, any>;
} 