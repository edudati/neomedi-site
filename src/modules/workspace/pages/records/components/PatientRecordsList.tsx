import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../shared/services/api";

interface RecordItem {
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

interface PatientRecordsListProps {
  onRefresh?: (refreshFn: () => void) => void;
}

const PatientRecordsList = ({ onRefresh }: PatientRecordsListProps) => {
  const { id: patientId } = useParams();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      console.log('🔍 Buscando records para patient_id:', patientId);
      // GET /records/patient/{patient_id}?skip=0&limit=100
      const response = await api.get(`/records/patient/${patientId}?skip=0&limit=100`);
      setRecords(response.data);
      console.log('📋 Records do paciente:', response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar prontuários');
      console.error('Erro ao buscar records:', err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Expor função de refresh para o componente pai
  useEffect(() => {
    if (onRefresh) {
      onRefresh(fetchRecords);
    }
  }, [onRefresh, fetchRecords]);

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
        <h5>Erro ao carregar prontuários</h5>
        <p>{error}</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center m-4">
        <i className="bi bi-file-earmark-text text-muted" style={{ fontSize: '3rem' }}></i>
        <h5 className="text-muted mt-3">Nenhum prontuário encontrado</h5>
        <p className="text-muted">Este paciente ainda não possui prontuários.</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Prontuários do Paciente</h4>
        <span className="badge bg-primary">{records.length} prontuário(s)</span>
      </div>

      <div className="row">
        {records.map((record) => (
          <div key={record.id} className="col-12 mb-3">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Prontuário - {new Date(record.created_at).toLocaleDateString('pt-BR')}
                </h6>
                <div>
                  {record.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  {record.last_diagnoses && (
                    <div className="col-md-6 mb-2">
                      <strong>Último Diagnóstico:</strong>
                      <p className="text-muted small mb-1">{record.last_diagnoses}</p>
                    </div>
                  )}
                  {record.current_medications && (
                    <div className="col-md-6 mb-2">
                      <strong>Medicações Atuais:</strong>
                      <p className="text-muted small mb-1">{record.current_medications}</p>
                    </div>
                  )}
                  {record.allergies && (
                    <div className="col-md-6 mb-2">
                      <strong>Alergias:</strong>
                      <p className="text-muted small mb-1">{record.allergies}</p>
                    </div>
                  )}
                  {record.habits && (
                    <div className="col-md-6 mb-2">
                      <strong>Hábitos:</strong>
                      <p className="text-muted small mb-1">{record.habits}</p>
                    </div>
                  )}
                </div>
                <div className="text-end">
                  <small className="text-muted">
                    Atualizado em {new Date(record.updated_at).toLocaleDateString('pt-BR')}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRecordsList;