import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../auth/context/AuthContext';
import { companyService } from '../../settings/companies/services/company.service';

export const useCompanyInfo = () => {
  const { user } = useAuthContext();

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies-list', user?.user_uid],
    queryFn: () => companyService.getCompanies(),
    enabled: !!user?.user_uid,
    retry: 1
  });

  // Pegar a primeira empresa da lista
  const company = companies?.[0];

  return {
    company,
    companyId: company?.id,
    isLoading,
    error
  };
};