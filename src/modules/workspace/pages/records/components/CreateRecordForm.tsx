import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../shared/services/api";
import { useCompanyInfo } from "../../../hooks/useCompanyInfo";

interface CreateRecordFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface CreateRecordData {
  allergies: string;
  clinical_history: string;
  current_medications: string;
  family_history: string;
  habits: string;
  last_diagnoses: string;
  surgical_history: string;
  tags: string;
}

const CreateRecordForm = ({ onClose, onSuccess }: CreateRecordFormProps) => {
  const { id: patientId } = useParams();
  const { companyId } = useCompanyInfo();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateRecordData>({
    allergies: "",
    clinical_history: "",
    current_medications: "",
    family_history: "",
    habits: "",
    last_diagnoses: "",
    surgical_history: "",
    tags: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;

    setLoading(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const recordData = {
        allergies: formData.allergies,
        clinical_history: formData.clinical_history,
        current_medications: formData.current_medications,
        family_history: formData.family_history,
        habits: formData.habits,
        last_diagnoses: formData.last_diagnoses,
        surgical_history: formData.surgical_history,
        tags: tagsArray,
        patient_id: patientId,
        company_id: companyId
      };

      console.log('📤 Dados sendo enviados para API:', recordData);
      console.log('🏥 Company ID:', companyId);
      console.log('🤒 Patient ID:', patientId);

      await api.post('/records/', recordData);
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar prontuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Adicionar Prontuário</h4>
        <button 
          onClick={onClose}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Alergias</label>
            <textarea
              name="allergies"
              className="form-control"
              rows={3}
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Ex: Alergia a penicilina"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Histórico Clínico</label>
            <textarea
              name="clinical_history"
              className="form-control"
              rows={3}
              value={formData.clinical_history}
              onChange={handleChange}
              placeholder="Ex: Paciente com histórico de hipertensão"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Medicações Atuais</label>
            <textarea
              name="current_medications"
              className="form-control"
              rows={3}
              value={formData.current_medications}
              onChange={handleChange}
              placeholder="Ex: Losartana 50mg 1x/dia"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Histórico Familiar</label>
            <textarea
              name="family_history"
              className="form-control"
              rows={3}
              value={formData.family_history}
              onChange={handleChange}
              placeholder="Ex: Pai com diabetes tipo 2"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Hábitos</label>
            <textarea
              name="habits"
              className="form-control"
              rows={3}
              value={formData.habits}
              onChange={handleChange}
              placeholder="Ex: Não fumante, pratica exercícios regularmente"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Último Diagnóstico</label>
            <textarea
              name="last_diagnoses"
              className="form-control"
              rows={3}
              value={formData.last_diagnoses}
              onChange={handleChange}
              placeholder="Ex: Hipertensão arterial sistêmica"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Histórico Cirúrgico</label>
            <textarea
              name="surgical_history"
              className="form-control"
              rows={3}
              value={formData.surgical_history}
              onChange={handleChange}
              placeholder="Ex: Apendicectomia em 2018"
              style={{ backgroundColor: '#fff' }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Tags</label>
            <input
              name="tags"
              type="text"
              className="form-control"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Ex: hipertensao, cardiologia (separado por vírgula)"
              style={{ backgroundColor: '#fff' }}
            />
            <small className="form-text text-muted">
              Separe as tags por vírgula
            </small>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Prontuário'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecordForm;