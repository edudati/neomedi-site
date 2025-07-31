import { api } from '@/modules/shared/services/api';
import { CompanyListResponse, CompanyResponse, UpdateCompanyRequest, UpdateAddressRequest, CreateCompanyRequest, CreateCompanyResponse } from '../types/company.types';

export const companyService = {
  async getCompanies(): Promise<CompanyListResponse> {
    const { data } = await api.get<CompanyListResponse>('/companies/');
    return data;
  },

  async getCompanyByUserId(userId: string): Promise<CompanyResponse> {
    const { data } = await api.get<CompanyResponse>(`/companies/${userId}`);
    return data;
  },

  async createCompany(companyData: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const { data } = await api.post<CreateCompanyResponse>('/companies/', companyData);
    return data;
  },

  async updateCompany(companyData: UpdateCompanyRequest): Promise<CompanyResponse> {
    const { data } = await api.put<CompanyResponse>('/companies/', companyData);
    return data;
  },

  async updateAddress(addressData: UpdateAddressRequest): Promise<CompanyResponse> {
    const { data } = await api.put<CompanyResponse>('/companies/address', addressData);
    return data;
  }
}; 