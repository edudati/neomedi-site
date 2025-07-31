import { useState } from 'react';
import { usePatients, usePatientDetails } from '../hooks';
import { PatientsList, PatientDetails, AddPatientModal } from '../components';
import { CreatePatientFormData } from '../types/patient.types';

export const Patients = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const { patients, loading, error, createPatient } = usePatients();
  const { patient, loading: detailsLoading, error: detailsError } = usePatientDetails(selectedPatientId);

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleAddPatient = async (data: CreatePatientFormData) => {
    await createPatient(data);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        {/* Lista de Pacientes */}
        <div className="col-md-4 col-lg-3 border-end bg-light">
          <div className="d-flex flex-column h-100">
            {/* Header da Lista */}
            <div className="p-3 border-bottom bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">
                  <i className="bi bi-people me-2"></i>
                  Pacientes
                </h5>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowAddModal(true)}
                  disabled={loading}
                >
                  <i className="bi bi-person-plus me-1"></i>
                  Adicionar
                </button>
              </div>
                             {error && patients.length === 0 && (
                 <div className="alert alert-danger py-2 mb-0" role="alert">
                   <small>{error}</small>
                 </div>
               )}
            </div>

            {/* Lista */}
            <div className="flex-grow-1 overflow-auto">
              <PatientsList
                patients={patients}
                loading={loading}
                selectedPatientId={selectedPatientId}
                onPatientSelect={handlePatientSelect}
              />
            </div>
          </div>
        </div>

        {/* Detalhes do Paciente */}
        <div className="col-md-8 col-lg-9">
          <div className="h-100 overflow-auto">
            <PatientDetails
              patient={patient}
              loading={detailsLoading}
              error={detailsError}
            />
          </div>
        </div>
      </div>

      {/* Modal para Adicionar Paciente */}
      <AddPatientModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
        loading={loading}
      />
    </div>
  );
}; 