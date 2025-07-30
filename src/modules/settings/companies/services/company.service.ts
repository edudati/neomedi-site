import { api } from '@/modules/shared/services/api';
import { CompanyResponse, UpdateCompanyRequest, UpdateAddressRequest } from '../types/company.types';

export const companyService = {
  async getCompanyByUserId(userId: string): Promise<CompanyResponse> {
    console.log('📡 Fazendo requisição para:', `/companies/user/${userId}`);
    const { data } = await api.get<CompanyResponse>(`/companies/user/${userId}`);
    console.log('📡 Resposta da API:', data);
    return data;
  },

  async updateCompany(companyId: string, companyData: UpdateCompanyRequest): Promise<CompanyResponse> {
    const { data } = await api.put<CompanyResponse>(`/companies/${companyId}`, companyData);
    return data;
  },

  async updateAddress(companyId: string, addressData: UpdateAddressRequest): Promise<CompanyResponse> {
    const { data } = await api.put<CompanyResponse>(`/companies/${companyId}/address`, addressData);
    return data;
  }
}; 