import { useState, useEffect } from 'react';
import { companyService } from '../../settings/companies/services/company.service';
import { Company } from '../../settings/companies/types/company.types';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await companyService.getCompanies();
      setCompanies(data);
    } catch (err) {
      setError('Erro ao carregar empresas');
      console.error('Erro ao buscar empresas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    companies,
    loading,
    error,
    fetchCompanies
  };
}; 