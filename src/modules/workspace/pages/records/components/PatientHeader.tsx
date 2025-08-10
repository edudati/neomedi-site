import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { patientService } from "../../../../patients/services/patientService";
import type { Patient } from "../../../../patients/types/patient.types";
import styles from "../index.module.css";

const PatientHeader = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('ID do cliente não encontrado na URL');
        }
        
        const patientData = await patientService.getPatient(id);
        setClientData(patientData);
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
  if (error) return null;

  return (
    <>
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
    </>
  );
};

export default PatientHeader;
