import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../shared/services/api";
import styles from "../index.module.css";

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

const RecordsSummary = () => {
  const { id } = useParams();
  const [recordData, setRecordData] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('ID do cliente não encontrado na URL');
        }

        const recordResponse = await api.get(`/records/patient/${id}`);
        setRecordData(recordResponse.data);
      } catch (err) {
        if ((err as any).response?.status === 404) {
          setRecordData(null);
        } else {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return null;
  if (!recordData) return null;

  return (
    <div className={styles.patientDetails} style={{ textAlign: 'left' }}>
      {/* Diagnóstico sempre visível */}
      <div className="mb-4">
        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Diagnóstico
        </div>
        <div style={{ color: '#495057' }}>
          {recordData.last_diagnoses || 'Não informado'}
        </div>
      </div>

      {/* Acordeões individuais para cada campo do record */}
      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Medicações
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData.current_medications || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Alergias
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData.allergies || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Hábitos
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData.habits || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Antec. Clínicos
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData.clinical_history || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Antec. Familiares
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData.family_history || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Antec. Cirúrgicos
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData.surgical_history || 'Não informado'}
        </div>
      </details>
    </div>
  );
};

export default RecordsSummary;
