export interface PatientUser {
  [key: string]: any;
}

export interface PatientAddress {
  [key: string]: any;
}

export interface Patient {
  notes: string;
  user_id: string;
  user: PatientUser;
  created_at: string;
  updated_at: string;
  address: PatientAddress;
}

export interface CreatePatientRequest {
  name: string;
  firebase_token: string;
  company_id: string;
}

export interface CreatePatientFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  company_id: string;
}

export interface CreatePatientResponse {
  success: boolean;
  message: string;
  client_id: string;
  client_data: {
    [key: string]: any;
  };
}

export interface PatientsListParams {
  skip?: number;
  limit?: number;
}

export interface PatientsListResponse extends Array<Patient> {} 