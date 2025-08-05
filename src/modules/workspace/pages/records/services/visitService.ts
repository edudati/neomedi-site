import { api } from '../../../../shared/services/api';

export interface CreateVisitRequest {
  company_id: string;
  current_illness_history: string;
  diagnostic_hypothesis: string;
  main_complaint: string;
  past_history: string;
  physical_exam: string;
  prescription: string;
  procedures: string;
  professional_id?: string;
  patient_id: string;
}

export interface Visit {
  company_id: string;
  created_at: string;
  current_illness_history: string;
  diagnostic_hypothesis: string;
  id: string;
  main_complaint: string;
  past_history: string;
  physical_exam: string;
  prescription: string;
  procedures: string;
  professional_id?: string;
  patient_id: string;
  record_id: string;
  updated_at: string;
}

export const visitService = {
  // Criar novo atendimento
  async createVisit(data: CreateVisitRequest): Promise<Visit> {
    console.log("=== VISIT SERVICE DEBUG ===");
    console.log("Endpoint: POST /visits/");
    console.log("Payload enviado:", JSON.stringify(data, null, 2));
    console.log("===========================");
    
    const response = await api.post('/visits/', data);
    return response.data;
  },

  // Buscar atendimentos de um paciente
  async getVisitsByPatient(patientId: string): Promise<Visit[]> {
    console.log('🔍 VisitService: Buscando visitas para patientId:', patientId);
    const response = await api.get(`/visits/patient/${patientId}?limit=50&offset=0`);
    console.log('📋 VisitService: Response da API:', response.data);
    return response.data;
  },



  // Buscar atendimento específico
  async getVisit(visitId: string): Promise<Visit> {
    const response = await api.get(`/visits/${visitId}`);
    return response.data;
  }
}; 