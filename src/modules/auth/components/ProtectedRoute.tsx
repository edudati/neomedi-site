import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('🛡️ ProtectedRoute - isLoading:', isLoading);
  console.log('🛡️ ProtectedRoute - user:', user);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    console.log('🛡️ ProtectedRoute - Mostrando loading...');
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se não está autenticado, redirecionar para login
  if (!isAuthenticated) {
    console.log('🛡️ ProtectedRoute - Não autenticado, redirecionando para login...');
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Se requer role específica e usuário não tem, redirecionar
  if (requiredRole && user?.role !== requiredRole) {
    console.log('🛡️ ProtectedRoute - Role não autorizada, redirecionando...');
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('🛡️ ProtectedRoute - Acesso autorizado, renderizando children...');
  return <>{children}</>;
};