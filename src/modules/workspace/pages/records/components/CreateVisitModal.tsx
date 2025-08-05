import { useState } from "react";
import styles from "./CreateVisitModal.module.css";
import { useCompanyInfo } from "../../../hooks/useCompanyInfo";
import { useAuthContext } from "../../../../auth/context/AuthContext";

interface CreateVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVisitFormData) => Promise<void>;
  loading: boolean;
  patientId: string;
}

interface CreateVisitFormData {
  company_id: string;
  current_illness_history: string;
  diagnostic_hypothesis: string;
  main_complaint: string;
  past_history: string;
  physical_exam: string;
  prescription: string;
  procedures: string;
  professional_id?: string;
  patient_id: string;
}

const CreateVisitModal = ({ isOpen, onClose, onSubmit, loading, patientId }: CreateVisitModalProps) => {
  const { companyId, isLoading: companyLoading } = useCompanyInfo();
  const { user } = useAuthContext();
  
  // Debug logs
  console.log('CreateVisitModal Debug:', {
    companyId,
    companyLoading,
    userId: user?.user_uid,
    user: user
  });
  
  const [formData, setFormData] = useState<CreateVisitFormData>({
    company_id: "",
    current_illness_history: "",
    diagnostic_hypothesis: "",
    main_complaint: "",
    past_history: "",
    physical_exam: "",
    prescription: "",
    procedures: "",
    patient_id: patientId
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.main_complaint.trim()) {
      newErrors.main_complaint = "Queixa principal é obrigatória";
    }

    if (!formData.current_illness_history.trim()) {
      newErrors.current_illness_history = "História da doença atual é obrigatória";
    }

    if (!formData.physical_exam.trim()) {
      newErrors.physical_exam = "Exame físico é obrigatório";
    }

    if (!companyId) {
      newErrors.company = "Erro ao carregar informações da empresa";
    }

    // professional_id agora é opcional, não precisa validar

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

         try {
       const dataToSubmit = {
         ...formData,
         company_id: companyId || "",
         // Garantir que todos os campos obrigatórios tenham pelo menos string vazia
         current_illness_history: formData.current_illness_history || "",
         diagnostic_hypothesis: formData.diagnostic_hypothesis || "",
         main_complaint: formData.main_complaint || "",
         past_history: formData.past_history || "",
         physical_exam: formData.physical_exam || "",
         prescription: formData.prescription || "",
         procedures: formData.procedures || "",
         patient_id: formData.patient_id || ""
         // professional_id removido - agora é opcional
       };
      
      await onSubmit(dataToSubmit);
      setFormData({
        company_id: "",
        current_illness_history: "",
        diagnostic_hypothesis: "",
        main_complaint: "",
        past_history: "",
        physical_exam: "",
        prescription: "",
        procedures: "",
                          patient_id: patientId
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Erro ao criar atendimento:", error);
    }
  };

  const handleInputChange = (field: keyof CreateVisitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Novo Atendimento</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="main_complaint">Queixa Principal *</label>
            <textarea
              id="main_complaint"
              value={formData.main_complaint}
              onChange={(e) => handleInputChange("main_complaint", e.target.value)}
              className={errors.main_complaint ? styles.error : ""}
              disabled={loading}
              rows={3}
            />
            {errors.main_complaint && <span className={styles.errorText}>{errors.main_complaint}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="current_illness_history">História da Doença Atual *</label>
            <textarea
              id="current_illness_history"
              value={formData.current_illness_history}
              onChange={(e) => handleInputChange("current_illness_history", e.target.value)}
              className={errors.current_illness_history ? styles.error : ""}
              disabled={loading}
              rows={4}
            />
            {errors.current_illness_history && <span className={styles.errorText}>{errors.current_illness_history}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="past_history">História Pregressa</label>
            <textarea
              id="past_history"
              value={formData.past_history}
              onChange={(e) => handleInputChange("past_history", e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="physical_exam">Exame Físico *</label>
            <textarea
              id="physical_exam"
              value={formData.physical_exam}
              onChange={(e) => handleInputChange("physical_exam", e.target.value)}
              className={errors.physical_exam ? styles.error : ""}
              disabled={loading}
              rows={4}
            />
            {errors.physical_exam && <span className={styles.errorText}>{errors.physical_exam}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="diagnostic_hypothesis">Hipótese Diagnóstica</label>
            <input
              id="diagnostic_hypothesis"
              type="text"
              value={formData.diagnostic_hypothesis}
              onChange={(e) => handleInputChange("diagnostic_hypothesis", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="prescription">Prescrição</label>
            <textarea
              id="prescription"
              value={formData.prescription}
              onChange={(e) => handleInputChange("prescription", e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="procedures">Procedimentos</label>
            <textarea
              id="procedures"
              value={formData.procedures}
              onChange={(e) => handleInputChange("procedures", e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>

          {errors.company && <span className={styles.errorText}>{errors.company}</span>}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={loading || companyLoading}>
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading || companyLoading || !companyId}
              title={`CompanyId: ${companyId}`}
            >
              {loading ? "Criando..." : companyLoading ? "Carregando..." : "Criar Atendimento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVisitModal; 