import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { visitService } from "../services/visitService";
import type { Visit } from "../services/visitService";
import styles from "./VisitsList.module.css";

interface VisitsListProps {
  onRefresh?: (refreshFn: () => void) => void;
  hasRecord?: boolean;
  onVisitsCountChange?: (count: number) => void;
}

const VisitsList = ({ onRefresh, hasRecord, onVisitsCountChange }: VisitsListProps) => {
  const { id: patientId } = useParams();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisits = useCallback(async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      setError(null);
      console.log('🔄 VisitsList: Buscando visitas para patientId:', patientId);
      
      const response = await visitService.getVisitsByPatient(patientId);
      setVisits(response);
      onVisitsCountChange?.(response.length);
      console.log('📋 VisitsList: Visitas encontradas:', response.length);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setVisits([]);
      } else {
        setError(err instanceof Error ? err.message : 'Erro ao carregar visitas');
      }
      console.error('❌ VisitsList: Erro ao buscar visitas:', err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  useEffect(() => {
    if (onRefresh) {
      console.log('🔗 VisitsList: Registrando função de refresh');
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

  if (!hasRecord) {
    return null;
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
    <div className="visits-list" style={{ textAlign: 'left' }}>

      <div className="visits-container">
        {visits.map((visit) => (
          <div key={visit.id} className={styles.visitItem} style={{ fontSize: '0.7rem' }}>
            <i className={`bi bi-calendar3 ${styles.calendarIcon}`}></i>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '0.85rem' }}>{formatDate(visit.created_at)}</div>
            <div className={styles.visitContent}>
              <div className={styles.visitSection}>
                <div className={styles.visitTitle}>Queixa Principal</div>
                <div className={styles.visitText}>
                  {visit.main_complaint || 'Não informado'}
                </div>
              </div>
              
              <div className={styles.visitSection}>
                <div className={styles.visitTitle}>História da Doença Atual</div>
                <div className={styles.visitText}>
                  {visit.current_illness_history || 'Não informado'}
                </div>
              </div>
              
              <div className={styles.visitSection}>
                <div className={styles.visitTitle}>Exame Físico</div>
                <div className={styles.visitText}>
                  {visit.physical_exam || 'Não informado'}
                </div>
              </div>
              
              {visit.diagnostic_hypothesis && (
                <div className={styles.visitSection}>
                  <div className={styles.visitTitle}>Hipótese Diagnóstica</div>
                  <div className={styles.visitText}>
                    {visit.diagnostic_hypothesis}
                  </div>
                </div>
              )}
              
              {visit.prescription && (
                <div className={styles.visitSection}>
                  <div className={styles.visitTitle}>Prescrição</div>
                  <div className={styles.visitText}>
                    {visit.prescription}
                  </div>
                </div>
              )}
              
              {visit.procedures && (
                <div className={styles.visitSection}>
                  <div className={styles.visitTitle}>Procedimentos</div>
                  <div className={styles.visitText}>
                    {visit.procedures}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitsList;