import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { patientService } from "../../../../patients/services/patientService";
import type { Patient } from "../../../../patients/types/patient.types";
import styles from "../index.module.css";

const RecordsPatientDetails = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect executado, ID da URL:', id);
    
    const fetchClientData = async () => {
      try {
        if (!id) {
          throw new Error('ID do cliente não encontrado na URL');
        }
        
        console.log('Chamando patientService.getPatient com ID:', id);
        const data = await patientService.getPatient(id);
        console.log('Dados recebidos:', data);
        setClientData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  if (loading) return <div className={styles.patientDetails}>Carregando...</div>;
  if (error) return <div className={styles.patientDetails}>Erro: {error}</div>;

  return (
    <div className={styles.patientDetails}>
      <h4>Detalhes do Paciente</h4>
      <pre>{JSON.stringify(clientData, null, 2)}</pre>
    </div>
  );
};

export default RecordsPatientDetails;
