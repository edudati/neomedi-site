import React from 'react';
import { useAuthContext } from '../../auth/context/AuthContext';
import AdminDashboard from '../views/adminDashboard';
import SuperDashboard from '../views/superDashboard';
import ManagerDashboard from '../views/managerDashboard';
import ProfessionalDashboard from '../views/professionalDashboard';
import AssistantDashboard from '../views/assistantDashboard';
import ClientDashboard from '../views/clientDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuthContext();

  // Renderizar dashboard baseado no role do usuário
  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'admin':
        // Admin usa o novo layout - renderizar diretamente
        return <AdminDashboard />;
      case 'super':
        return <SuperDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'professional':
        return <ProfessionalDashboard />;
      case 'assistant':
        return <AssistantDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return (
          <div className="alert alert-danger">
            <h4>Acesso não autorizado</h4>
            <p>Seu perfil não tem permissão para acessar esta área.</p>
          </div>
        );
    }
  };

  // Se for admin, renderizar o novo layout diretamente (sem container adicional)
  if (user?.role === 'admin') {
    return renderDashboardByRole();
  }

  // Para outros roles, usar a estrutura antiga com container
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
