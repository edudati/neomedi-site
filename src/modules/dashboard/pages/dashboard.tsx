import React from 'react';
import { useAuthContext } from '../../auth/context/AuthContext';
import AdminDashboard from '../views/adminDashboard';
import PatientDashboard from '../views/patientDashboard';
import ProfessionalDashboard from '../views/professionalDashboard';
import SupportDashboard from '../views/supportDashboard';
import SuperDashboard from '../views/superDashboard';
import ManagerDashboard from '../views/managerDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuthContext();

  // Renderizar dashboard baseado no role do usuário
  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'admin':
        // Admin usa o novo layout - renderizar diretamente
        return <AdminDashboard />;
      case 'client':
        // Paciente usa o novo layout - renderizar diretamente
        return <PatientDashboard />;
      case 'professional':
        // Profissional da saúde usa o novo layout - renderizar diretamente
        return <ProfessionalDashboard />;
      case 'assistant':
        // Suporte usa o novo layout - renderizar diretamente
        return <SupportDashboard />;
      case 'super':
        return <SuperDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      default:
        return (
          <div className="alert alert-danger">
            <h4>Acesso não autorizado</h4>
            <p>Seu perfil não tem permissão para acessar esta área.</p>
          </div>
        );
    }
  };

  // Se for admin, client, professional ou assistant, renderizar o novo layout diretamente
  if (['admin', 'client', 'professional', 'assistant'].includes(user?.role || '')) {
    return renderDashboardByRole();
  }

  // Para outros roles (super, manager), usar a estrutura antiga com container
  return (
    <div className="container py-4">
      {/* Dashboard Content */}
      <div className="card">
        <div className="card-header">
          <h1 className="h3 mb-0">Dashboard</h1>
          <p className="text-muted mb-0">
            Bem-vindo, {user?.name} ({user?.role})
          </p>
        </div>
        <div className="card-body">
          {renderDashboardByRole()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
