import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

const Unauthorized = () => {
  return (
    <AuthLayout title="Acesso Negado" isLoginPage={false}>
      <div className="text-center">
        <div className="mb-4">
          <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
        </div>
        
        <h2 className="text-danger mb-3">Acesso Negado</h2>
        
        <p className="text-muted mb-4">
          Você não tem permissão para acessar esta página.
          <br />
          Entre em contato com o administrador se acredita que isso é um erro.
        </p>
        
        <div className="d-grid gap-2">
          <Link to="/dashboard" className="btn btn-primary">
            Voltar ao Dashboard
          </Link>
          
          <Link to="/login" className="btn btn-outline-secondary">
            Fazer Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Unauthorized;