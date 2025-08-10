import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../shared/services/api";

interface RecordData {
  id: string;
  allergies: string;
  clinical_history: string;
  current_medications: string;
  family_history: string;
  habits: string;
  last_diagnoses: string;
  surgical_history: string;
  tags: string[];
  patient_id: string;
  company_id: string;
  professional_id: string;
  created_at: string;
  updated_at: string;
}

interface CenterPaneHeaderProps {
  onRefresh?: (refreshFn: () => void) => void;
  onAddRecord?: () => void;
  onRecordStatusChange?: (hasRecord: boolean) => void;
  visitsCount?: number;
}

const CenterPaneHeader = ({ onRefresh, onAddRecord, onRecordStatusChange, visitsCount = 0 }: CenterPaneHeaderProps) => {
  const { id: patientId } = useParams();
  const [recordData, setRecordData] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecord = useCallback(async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      console.log('🔍 Buscando record para patient_id:', patientId);
      const response = await api.get(`/records/patient/${patientId}`);
      setRecordData(response.data);
      onRecordStatusChange?.(true);
      console.log('📋 Record do paciente:', response.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setRecordData(null);
        onRecordStatusChange?.(false);
      } else {
        setError(err instanceof Error ? err.message : 'Erro ao carregar prontuário');
      }
      console.error('Erro ao buscar record:', err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  useEffect(() => {
    if (onRefresh) {
      onRefresh(fetchRecord);
    }
  }, [onRefresh, fetchRecord]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3">
        <h5>Erro ao carregar prontuário</h5>
        <p>{error}</p>
      </div>
    );
  }

  if (!recordData) {
    return (
      <div className="text-center m-4">
        <i className="bi bi-file-earmark-text text-muted" style={{ fontSize: '3rem' }}></i>
        <h5 className="text-muted mt-3">Paciente sem prontuário</h5>
        <button 
          className="btn btn-primary mt-2" 
          style={{ fontSize: '0.875rem' }}
          onClick={onAddRecord}
        >
          Iniciar prontuário
        </button>
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h6 className="mb-0">Histórico de Atendimentos ({visitsCount})</h6>
        <div>
          {recordData.tags.map((tag, index) => (
            <span key={index} className="badge bg-primary me-1" style={{ fontSize: '0.6rem' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>



      <div className="text-end mt-1">
        <small className="text-muted" style={{ fontSize: '0.65rem' }}>
          Criado em {new Date(recordData.created_at).toLocaleDateString('pt-BR')} | 
          Atualizado em {new Date(recordData.updated_at).toLocaleDateString('pt-BR')}
        </small>
      </div>
    </div>
  );
};

export default CenterPaneHeader;