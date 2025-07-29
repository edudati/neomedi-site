import { useAuthContext } from '../../auth/context/AuthContext'
import { LogoutButton } from '../../auth/components/LogoutButton'
import SuperDashboard from '../views/superDashboard'
import AdminDashboard from '../views/adminDashboard'
import ManagerDashboard from '../views/managerDashboard'
import ProfessionalDashboard from '../views/professionalDashboard'
import AssistantDashboard from '../views/assistantDashboard'
import ClientDashboard from '../views/clientDashboard'

const Dashboard = () => {
  const { user } = useAuthContext()

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'super':
        return <SuperDashboard />
      case 'admin':
      case 'manager':
        // Admin e manager compartilham a mesma view
        return <AdminDashboard />
      case 'professional':
        return <ProfessionalDashboard />
      case 'assistant':
        return <AssistantDashboard />
      case 'client':
        return <ClientDashboard />
      default:
        return <div className="alert alert-danger">Acesso não autorizado</div>
    }
  }

  return (
    <div className="container py-4">
      {/* Header com informações do usuário e logout */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">
            Bem-vindo, {user?.name} ({user?.role})
          </p>
        </div>
        <LogoutButton variant="button" className="btn-sm">
          <i className="fas fa-sign-out-alt me-2"></i>
          Sair
        </LogoutButton>
      </div>

      {/* Dashboard Content */}
      <div className="card">
        <div className="card-body">
          {renderDashboardByRole()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
