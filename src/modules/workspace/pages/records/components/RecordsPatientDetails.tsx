import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { patientService } from "../../../../patients/services/patientService";
import { api } from "../../../../shared/services/api";
import type { Patient } from "../../../../patients/types/patient.types";
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

const RecordsPatientDetails = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState<Patient | null>(null);
  const [recordData, setRecordData] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('useEffect executado, ID da URL:', id);
    
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('ID do cliente não encontrado na URL');
        }
        
        console.log('Chamando patientService.getPatient com ID:', id);
        const patientData = await patientService.getPatient(id);
        console.log('Dados do paciente recebidos:', patientData);
        setClientData(patientData);

        console.log('Chamando API para record com ID:', id);
        const recordResponse = await api.get(`/records/patient/${id}`);
        console.log('Dados do record recebidos:', recordResponse.data);
        setRecordData(recordResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const getGenderIcon = (gender?: string) => {
    switch (gender?.toLowerCase()) {
      case 'male':
      case 'masculino':
      case 'm':
        return 'bi-gender-male';
      case 'female':
      case 'feminino':
      case 'f':
        return 'bi-gender-female';
      default:
        return 'bi-gender-ambiguous';
    }
  };

  const formatAge = (birthDate?: string) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  if (loading) return <div className={styles.patientDetails}>Carregando...</div>;
  if (error) return <div className={styles.patientDetails}>Erro: {error}</div>;

  return (
    <div className={styles.patientDetails} style={{ textAlign: 'left' }}>
      {/* Cabeçalho do paciente com ícones */}
      <div 
        className="d-flex align-items-center mb-3 p-2" 
        style={{ 
          cursor: 'pointer', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}
        onClick={handleOpenModal}
      >
        {/* Avatar/Foto do paciente */}
        <div className="me-3">
          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
        </div>
        
        {/* Informações principais */}
        <div className="flex-grow-1">
          <h6 className="mb-1" style={{ fontWeight: 'bold' }}>
            {clientData?.user?.name || 'Nome não informado'}
          </h6>
          <div className="d-flex align-items-center gap-3">
            {/* Data de nascimento */}
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-event me-1" style={{ color: '#6c757d' }}></i>
              <small style={{ color: '#6c757d' }}>
                {clientData?.user?.birth_date ? 
                  `${new Date(clientData.user.birth_date).toLocaleDateString('pt-BR')} (${formatAge(clientData.user.birth_date)} anos)` : 
                  'N/A'
                }
              </small>
            </div>
            
            {/* Gênero */}
            <div className="d-flex align-items-center">
              <i className={`bi ${getGenderIcon(clientData?.user?.gender)} me-1`} style={{ color: '#6c757d' }}></i>
              <small style={{ color: '#6c757d' }}>
                {clientData?.user?.gender || 'N/A'}
              </small>
            </div>
          </div>
        </div>
        
        {/* Ícone de expandir */}
        <div>
          <i className="bi bi-chevron-right" style={{ color: '#6c757d' }}></i>
        </div>
      </div>

      {/* Acordeões individuais para cada campo do record */}
      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Medicações
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData?.current_medications || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Alergias
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData?.allergies || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Hábitos
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData?.habits || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Antec. Clínicos
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData?.clinical_history || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Antec. Familiares
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData?.family_history || 'Não informado'}
        </div>
      </details>

      <details className="mb-2">
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Antec. Cirúrgicos
        </summary>
        <div className="mt-2" style={{ paddingLeft: '1rem' }}>
          {recordData?.surgical_history || 'Não informado'}
        </div>
      </details>

      {/* Modal com detalhes completos do paciente */}
      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalhes do Paciente</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Avatar/Foto */}
                  <div className="col-12 text-center mb-3">
                    <i className="bi bi-person-circle" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
                  </div>
                  
                  {/* Informações pessoais */}
                  <div className="col-12">
                    <h6 className="mb-3">Informações Pessoais</h6>
                    <div className="mb-2">
                      <strong>Nome:</strong> {clientData?.user?.name || 'Não informado'}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {clientData?.user?.email || 'Não informado'}
                    </div>
                    <div className="mb-2">
                      <strong>Telefone:</strong> {clientData?.user?.phone || 'Não informado'}
                    </div>
                    <div className="mb-2">
                      <strong>Data de Nascimento:</strong> {clientData?.user?.birth_date ? new Date(clientData.user.birth_date).toLocaleDateString('pt-BR') : 'Não informado'}
                    </div>
                    <div className="mb-3">
                      <strong>Idade:</strong> {clientData?.user?.birth_date ? `${formatAge(clientData.user.birth_date)} anos` : 'Não informado'}
                    </div>
                  </div>

                  {/* Endereço */}
                  {clientData?.address && (
                    <div className="col-12">
                      <h6 className="mb-3">Endereço</h6>
                      {clientData.address.street && (
                        <div className="mb-1">
                          <strong>Rua:</strong> {clientData.address.street}
                          {clientData.address.number && `, ${clientData.address.number}`}
                          {clientData.address.complement && ` - ${clientData.address.complement}`}
                        </div>
                      )}
                      {clientData.address.neighbourhood && (
                        <div className="mb-1">
                          <strong>Bairro:</strong> {clientData.address.neighbourhood}
                        </div>
                      )}
                      {clientData.address.city && (
                        <div className="mb-1">
                          <strong>Cidade:</strong> {clientData.address.city}
                          {clientData.address.state && ` - ${clientData.address.state}`}
                        </div>
                      )}
                      {clientData.address.zip_code && (
                        <div className="mb-1">
                          <strong>CEP:</strong> {clientData.address.zip_code}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsPatientDetails;
