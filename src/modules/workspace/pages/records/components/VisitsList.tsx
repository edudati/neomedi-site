import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { visitService, Visit } from "../services/visitService";

interface VisitsListProps {
  onRefresh?: (refreshFn: () => void) => void;
}

const VisitsList = ({ onRefresh }: VisitsListProps) => {
  const { id: patientId } = useParams();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisits = useCallback(async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      console.log('🔍 Patient ID:', patientId);
      
      const response = await visitService.getVisitsByPatient(patientId);
      setVisits(response);
      console.log('📋 Visitas encontradas:', response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar visitas');
      console.error('Erro ao buscar visitas:', err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  useEffect(() => {
    if (onRefresh) {
      onRefresh(fetchVisits);
    }
  }, [onRefresh, fetchVisits]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-2" style={{ fontSize: '0.7rem' }}>
        <h6 className="mb-1">Erro ao carregar visitas</h6>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="text-center m-3">
        <i className="bi bi-calendar-x text-muted" style={{ fontSize: '2rem' }}></i>
        <h6 className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>Nenhuma visita encontrada</h6>
        <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>Este paciente ainda não possui atendimentos registrados.</p>
      </div>
    );
  }

  return (
    <div className="visits-list">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
          Histórico de Atendimentos ({visits.length})
        </h6>
      </div>
      
      <div className="visits-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {visits.map((visit, index) => (
          <div key={visit.id} className="card border-0 shadow-sm mb-2" style={{ fontSize: '0.7rem' }}>
            <div className="card-header py-1" style={{ backgroundColor: '#e3f2fd' }}>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                  Atendimento #{visits.length - index}
                </h6>
                <small className="text-muted">{formatDate(visit.created_at)}</small>
              </div>
            </div>
            <div className="card-body py-2">
              <div className="row g-2">
                <div className="col-12">
                  <strong>Queixa Principal:</strong>
                  <p className="mb-1" style={{ fontSize: '0.65rem', color: '#495057' }}>
                    {visit.main_complaint || 'Não informado'}
                  </p>
                </div>
                
                <div className="col-12">
                  <strong>História da Doença Atual:</strong>
                  <p className="mb-1" style={{ fontSize: '0.65rem', color: '#495057' }}>
                    {visit.current_illness_history || 'Não informado'}
                  </p>
                </div>
                
                <div className="col-12">
                  <strong>Exame Físico:</strong>
                  <p className="mb-1" style={{ fontSize: '0.65rem', color: '#495057' }}>
                    {visit.physical_exam || 'Não informado'}
                  </p>
                </div>
                
                {visit.diagnostic_hypothesis && (
                  <div className="col-12">
                    <strong>Hipótese Diagnóstica:</strong>
                    <p className="mb-1" style={{ fontSize: '0.65rem', color: '#495057' }}>
                      {visit.diagnostic_hypothesis}
                    </p>
                  </div>
                )}
                
                {visit.prescription && (
                  <div className="col-12">
                    <strong>Prescrição:</strong>
                    <p className="mb-1" style={{ fontSize: '0.65rem', color: '#495057' }}>
                      {visit.prescription}
                    </p>
                  </div>
                )}
                
                {visit.procedures && (
                  <div className="col-12">
                    <strong>Procedimentos:</strong>
                    <p className="mb-1" style={{ fontSize: '0.65rem', color: '#495057' }}>
                      {visit.procedures}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitsList; 