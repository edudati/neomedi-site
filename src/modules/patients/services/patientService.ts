import { api } from '../../shared/services/api';
import { 
  Patient, 
  CreatePatientRequest, 
  CreatePatientResponse, 
  PatientsListParams 
} from '../types/patient.types';

export const patientService = {
  // Listar pacientes
  async getPatients(params: PatientsListParams = {}): Promise<Patient[]> {
    const { skip = 0, limit = 100 } = params;
    const response = await api.get(`/clients/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Buscar paciente específico
  async getPatient(clientId: string): Promise<Patient> {
    const response = await api.get(`/clients/${clientId}`);
    return response.data;
  },

  // Criar novo paciente
  async createPatient(data: CreatePatientRequest): Promise<CreatePatientResponse> {
    const response = await api.post('/clients/', data);
    return response.data;
  }
}; 