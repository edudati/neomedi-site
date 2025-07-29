import React from 'react';
import { SupportDashboardLayout } from '../components';

const SupportDashboard: React.FC = () => {
  // Conteúdo do header específico do suporte
  const headerContent = (
    <div className="d-flex align-items-center justify-content-between w-100">
      <h1 className="h5 mb-0">Painel de Suporte</h1>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-warning btn-sm">
          <i className="bi bi-headset me-1"></i>
          Atender
        </button>
      </div>
    </div>
  );

  // Conteúdo da sidebar para suporte
  const sidebarContent = (
    <div className="d-flex flex-column h-100">
      <div className="mb-4">
        <h6 className="text-muted text-uppercase small mb-3">Menu de Suporte</h6>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#dashboard">
              <i className="bi bi-house me-2"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#tickets">
              <i className="bi bi-ticket-detailed me-2"></i>
              Tickets
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#chamados">
              <i className="bi bi-telephone me-2"></i>
              Chamados
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#usuarios">
              <i className="bi bi-people me-2"></i>
              Usuários
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#sistema">
              <i className="bi bi-gear me-2"></i>
              Sistema
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#relatorios">
              <i className="bi bi-graph-up me-2"></i>
              Relatórios
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#base-conhecimento">
              <i className="bi bi-book me-2"></i>
              Base de Conhecimento
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  // Conteúdo do dashboard para suporte
  const dashboardContent = (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tickets Abertos</h5>
              <p className="card-text display-6">12</p>
              <small className="text-muted">Pendentes</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Chamados Hoje</h5>
              <p className="card-text display-6">8</p>
              <small className="text-muted">Atendidos</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tempo Médio</h5>
              <p className="card-text display-6">15min</p>
              <small className="text-muted">Resolução</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Satisfação</h5>
              <p className="card-text display-6">4.8</p>
              <small className="text-muted">/ 5.0</small>
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
    <SupportDashboardLayout
      headerContent={headerContent}
      sidebarContent={sidebarContent}
      dashboardContent={dashboardContent}
      footerContent={footerContent}
    />
  );
};

export default SupportDashboard;