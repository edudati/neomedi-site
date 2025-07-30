import React from 'react';
import { DashboardLayout } from '../components';

const AdminDashboard: React.FC = () => {
  // Conteúdo do header específico do admin (dentro da área do dashboard)
  const headerContent = (
    <div className="d-flex align-items-center justify-content-between w-100">
      <h1 className="h5 mb-0">Dashboard Administrativo</h1>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-primary btn-sm">
          <i className="bi bi-gear me-1"></i>
          Config
        </button>
      </div>
    </div>
  );

  // Conteúdo da sidebar
  const sidebarContent = (
    <div className="d-flex flex-column h-100">
      <div className="mb-4">
        <h6 className="text-muted text-uppercase small mb-3">Menu Principal</h6>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#dashboard">
              <i className="bi bi-house me-2"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#usuarios">
              <i className="bi bi-people me-2"></i>
              Usuários
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#clinicas">
              <i className="bi bi-building me-2"></i>
              Clínicas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#relatorios">
              <i className="bi bi-graph-up me-2"></i>
              Relatórios
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#configuracoes">
              <i className="bi bi-gear me-2"></i>
              Configurações
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  // Conteúdo do dashboard
  const dashboardContent = (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total de Usuários</h5>
              <p className="card-text display-6">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Clínicas Ativas</h5>
              <p className="card-text display-6">56</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Consultas Hoje</h5>
              <p className="card-text display-6">89</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Receita Mensal</h5>
              <p className="card-text display-6">R$ 45.6k</p>
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
    <DashboardLayout
      headerContent={headerContent}
      sidebarContent={sidebarContent}
      dashboardContent={dashboardContent}
      footerContent={footerContent}
    />
  );
};

export default AdminDashboard;

