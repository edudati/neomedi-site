import React from 'react';
import { PatientDashboardLayout } from '../components';

const PatientDashboard: React.FC = () => {
  // Conteúdo do header específico do paciente
  const headerContent = (
    <div className="d-flex align-items-center justify-content-between w-100">
      <h1 className="h5 mb-0">Meu Painel - Paciente</h1>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-primary btn-sm">
          <i className="bi bi-calendar me-1"></i>
          Agendar
        </button>
      </div>
    </div>
  );

  // Conteúdo da sidebar para pacientes
  const sidebarContent = (
    <div className="d-flex flex-column h-100">
      <div className="mb-4">
        <h6 className="text-muted text-uppercase small mb-3">Menu do Paciente</h6>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#dashboard">
              <i className="bi bi-house me-2"></i>
              Meu Painel
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#consultas">
              <i className="bi bi-calendar-check me-2"></i>
              Minhas Consultas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#prontuario">
              <i className="bi bi-file-earmark-text me-2"></i>
              Meu Prontuário
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#exames">
              <i className="bi bi-clipboard2-pulse me-2"></i>
              Meus Exames
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#prescricoes">
              <i className="bi bi-prescription me-2"></i>
              Prescrições
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#perfil">
              <i className="bi bi-person me-2"></i>
              Meu Perfil
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  // Conteúdo do dashboard para pacientes
  const dashboardContent = (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Próxima Consulta</h5>
              <p className="card-text display-6">15/01</p>
              <small className="text-muted">Dr. Silva - Cardiologia</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Consultas Realizadas</h5>
              <p className="card-text display-6">12</p>
              <small className="text-muted">Este ano</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Exames Pendentes</h5>
              <p className="card-text display-6">3</p>
              <small className="text-muted">Para realizar</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Prescrições Ativas</h5>
              <p className="card-text display-6">5</p>
              <small className="text-muted">Medicamentos</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Conteúdo do footer
  const footerContent = (
    <div className="text-center text-muted">
      <small>&copy; 2024 Sistema de Gestão - Medicina Integrativa</small>
    </div>
  );

  return (
    <PatientDashboardLayout
      headerContent={headerContent}
      sidebarContent={sidebarContent}
      dashboardContent={dashboardContent}
      footerContent={footerContent}
    />
  );
};

export default PatientDashboard;