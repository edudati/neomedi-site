import { useState, useEffect } from 'react';
import { CreatePatientFormData } from '../types/patient.types';
import { useCompanies } from '../hooks/useCompanies';

interface AddPatientModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CreatePatientFormData) => Promise<void>;
  loading: boolean;
}

export const AddPatientModal = ({ 
  show, 
  onHide, 
  onSubmit, 
  loading 
}: AddPatientModalProps) => {
  const { companies, loading: companiesLoading } = useCompanies();
  
  const [formData, setFormData] = useState<CreatePatientFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company_id: ''
  });

  const [errors, setErrors] = useState<Partial<CreatePatientFormData>>({});

  // Auto-selecionar empresa se houver apenas uma
  useEffect(() => {
    if (companies.length === 1 && !formData.company_id) {
      setFormData(prev => ({
        ...prev,
        company_id: companies[0].id
      }));
    }
  }, [companies, formData.company_id]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreatePatientFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!formData.company_id.trim()) {
      newErrors.company_id = 'Empresa é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', password: '', confirmPassword: '', company_id: '' });
      setErrors({});
      onHide();
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof CreatePatientFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-person-plus me-2"></i>
              Adicionar Paciente
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              disabled={loading}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome do Paciente *
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Digite o nome completo"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email do Paciente *
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Digite o email do paciente"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                <div className="form-text">
                  Email que será usado para login do paciente
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha Temporária *
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Digite uma senha temporária"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                <div className="form-text">
                  Senha temporária que o paciente poderá alterar posteriormente
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Confirme a senha temporária"
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="company_id" className="form-label">
                  Empresa *
                </label>
                {companiesLoading ? (
                  <div className="form-control">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                    Carregando empresas...
                  </div>
                ) : companies.length === 0 ? (
                  <div className="alert alert-warning py-2 mb-0">
                    <small>Nenhuma empresa encontrada. Você precisa ter pelo menos uma empresa cadastrada.</small>
                  </div>
                ) : companies.length === 1 ? (
                  <div className="form-control bg-light">
                    <small className="text-muted">
                      <i className="bi bi-building me-1"></i>
                      {companies[0].name}
                    </small>
                    <input
                      type="hidden"
                      name="company_id"
                      value={companies[0].id}
                    />
                  </div>
                ) : (
                  <select
                    className={`form-select ${errors.company_id ? 'is-invalid' : ''}`}
                    id="company_id"
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Selecione uma empresa</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.company_id && <div className="invalid-feedback">{errors.company_id}</div>}
                <div className="form-text">
                  Empresa à qual o paciente pertence
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
                disabled={loading}
              >
                Cancelar
              </button>
                              <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || companiesLoading || companies.length === 0 || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.company_id}
                >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Adicionando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-2"></i>
                    Adicionar Paciente
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 