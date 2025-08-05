import { useState } from "react";
import styles from "./CreatePatientModal.module.css";
import type { CreatePatientFormData } from "../../../../patients/types/patient.types";
import { useCompanyInfo } from "../../../hooks/useCompanyInfo";

interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePatientFormData) => Promise<void>;
  loading: boolean;
}

const CreatePatientModal = ({ isOpen, onClose, onSubmit, loading }: CreatePatientModalProps) => {
  const { companyId, isLoading: companyLoading } = useCompanyInfo();
  
  const [formData, setFormData] = useState<CreatePatientFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company_id: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    if (!companyId) {
      newErrors.company = "Erro ao carregar informações da empresa";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Usar o companyId do hook em vez do formData
      const dataToSubmit = {
        ...formData,
        company_id: companyId || ""
      };
      
      await onSubmit(dataToSubmit);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        company_id: ""
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
    }
  };

  const handleInputChange = (field: keyof CreatePatientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Adicionar Novo Paciente</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Nome *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? styles.error : ""}
              disabled={loading}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? styles.error : ""}
              disabled={loading}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Senha *</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={errors.password ? styles.error : ""}
              disabled={loading}
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirmar Senha *</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? styles.error : ""}
              disabled={loading}
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
          </div>

          {errors.company && <span className={styles.errorText}>{errors.company}</span>}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={loading || companyLoading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading || companyLoading || !companyId}>
              {loading ? "Criando..." : companyLoading ? "Carregando..." : "Criar Paciente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatientModal;