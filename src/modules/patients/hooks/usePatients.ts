import { useState, useEffect } from 'react';
import { patientService } from '../services/patientService';
import { firebaseService } from '../services/firebaseService';
import { Patient, CreatePatientRequest, CreatePatientFormData } from '../types/patient.types';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (err) {
      setError('Erro ao carregar pacientes');
      console.error('Erro ao buscar pacientes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (formData: CreatePatientFormData) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Criar usuário no Firebase
      const firebaseUser = await firebaseService.createUser(formData.email, formData.password);
      
      // 2. Criar paciente na API usando o token do Firebase
      const patientData: CreatePatientRequest = {
        name: formData.name,
        firebase_token: firebaseUser.token,
        company_id: formData.company_id
      };
      
      const response = await patientService.createPatient(patientData);
      await fetchPatients(); // Recarrega a lista
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao criar paciente';
      setError(errorMessage);
      console.error('Erro ao criar paciente:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient
  };
}; 