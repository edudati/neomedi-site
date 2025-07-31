import { useState, useEffect } from 'react';
import { patientService } from '../services/patientService';
import { Patient } from '../types/patient.types';

export const usePatientDetails = (patientId: string | null) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatientDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatient(id);
      setPatient(data);
    } catch (err) {
      setError('Erro ao carregar detalhes do paciente');
      console.error('Erro ao buscar detalhes do paciente:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientDetails(patientId);
    } else {
      setPatient(null);
    }
  }, [patientId]);

  return {
    patient,
    loading,
    error,
    fetchPatientDetails
  };
}; 