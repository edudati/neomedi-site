import { Patient } from '../types/patient.types';

interface PatientDetailsProps {
  patient: Patient | null;
  loading: boolean;
  error: string | null;
}

export const PatientDetails = ({ patient, loading, error }: PatientDetailsProps) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-danger">
        <i className="bi bi-exclamation-triangle display-4 mb-3"></i>
        <h5>Erro ao carregar detalhes</h5>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
        <i className="bi bi-person display-4 mb-3"></i>
        <h5>Selecione um paciente</h5>
        <p className="text-center">Escolha um paciente da lista para ver os detalhes</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" 
             style={{ width: '60px', height: '60px' }}>
          <i className="bi bi-person-fill fs-4"></i>
        </div>
        <div>
          <h4 className="mb-1">
            {patient.user?.name || patient.user?.email || 'Paciente sem nome'}
          </h4>
          <p className="text-muted mb-0">ID: {patient.user_id}</p>
        </div>
      </div>

      {/* Informações do usuário */}
      <div className="card mb-4">
        <div className="card-header">
          <h6 className="mb-0">
            <i className="bi bi-person me-2"></i>
            Informações Pessoais
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Nome</label>
              <p className="mb-0">{patient.user?.name || 'Não informado'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Email</label>
              <p className="mb-0">{patient.user?.email || 'Não informado'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Telefone</label>
              <p className="mb-0">{patient.user?.phone || 'Não informado'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Data de Nascimento</label>
              <p className="mb-0">
                {patient.user?.birth_date 
                  ? new Date(patient.user.birth_date).toLocaleDateString('pt-BR')
                  : 'Não informado'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Endereço */}
      {patient.address && Object.keys(patient.address).length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              Endereço
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Rua</label>
                <p className="mb-0">{patient.address.street || 'Não informado'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Número</label>
                <p className="mb-0">{patient.address.number || 'Não informado'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Bairro</label>
                <p className="mb-0">{patient.address.neighborhood || 'Não informado'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Cidade</label>
                <p className="mb-0">{patient.address.city || 'Não informado'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">Estado</label>
                <p className="mb-0">{patient.address.state || 'Não informado'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted">CEP</label>
                <p className="mb-0">{patient.address.zip_code || 'Não informado'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Observações */}
      {patient.notes && (
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="mb-0">
              <i className="bi bi-sticky me-2"></i>
              Observações
            </h6>
          </div>
          <div className="card-body">
            <p className="mb-0">{patient.notes}</p>
          </div>
        </div>
      )}

      {/* Informações do sistema */}
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0">
            <i className="bi bi-info-circle me-2"></i>
            Informações do Sistema
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Data de Criação</label>
              <p className="mb-0">
                {new Date(patient.created_at).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Última Atualização</label>
              <p className="mb-0">
                {new Date(patient.updated_at).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 