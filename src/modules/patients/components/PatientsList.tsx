import { Patient } from '../types/patient.types';

interface PatientsListProps {
  patients: Patient[];
  loading: boolean;
  selectedPatientId: string | null;
  onPatientSelect: (patientId: string) => void;
}

export const PatientsList = ({ 
  patients, 
  loading, 
  selectedPatientId, 
  onPatientSelect 
}: PatientsListProps) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (patients.length === 0 && !loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
        <i className="bi bi-people display-4 mb-3"></i>
        <h5>Nenhum paciente encontrado</h5>
        <p className="text-center">Adicione seu primeiro paciente para começar</p>
      </div>
    );
  }

  return (
    <div className="list-group list-group-flush">
      {patients.map((patient) => (
        <button
          key={patient.user_id}
          className={`list-group-item list-group-item-action d-flex align-items-center gap-3 ${
            selectedPatientId === patient.user_id ? 'active' : ''
          }`}
          onClick={() => onPatientSelect(patient.user_id)}
        >
          <div className="flex-shrink-0">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" 
                 style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-person-fill"></i>
            </div>
          </div>
          <div className="flex-grow-1 text-start">
            <h6 className="mb-1">
              {patient.user?.name || patient.user?.email || 'Paciente sem nome'}
            </h6>
            <small className="text-muted">
              {patient.notes ? patient.notes.substring(0, 50) + '...' : 'Sem observações'}
            </small>
          </div>
          <div className="flex-shrink-0">
            <small className="text-muted">
              {new Date(patient.created_at).toLocaleDateString('pt-BR')}
            </small>
          </div>
        </button>
      ))}
    </div>
  );
}; 