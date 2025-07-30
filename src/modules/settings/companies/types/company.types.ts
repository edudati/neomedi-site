export interface CompanyAddress {
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

export interface Company {
  id: string;
  user_id: string;
  name: string;
  legal_name: string;
  legal_id: string;
  email: string;
  phone: string;
  address_id: string | null;
  is_active: boolean;
  is_deleted: boolean;
  is_visible: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  address?: CompanyAddress;
}

export type CompanyResponse = Company;

export interface UpdateCompanyRequest {
  name?: string;
  legal_name?: string;
  legal_id?: string;
  email?: string;
  phone?: string;
  address_id?: string;
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