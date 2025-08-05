import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useWorkspace } from '../hooks/useWorkspace';
import '../styles/workspace.css';

const WorkspaceLayout = () => {
  const { isAuthenticated, isLoading } = useWorkspace();

  // Adicionar classe no body para prevenir scroll
  useEffect(() => {
    document.body.classList.add('workspace-active');
    return () => {
      document.body.classList.remove('workspace-active');
    };
  }, []);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderizar nada (será redirecionado pelo ProtectedRoute)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="workspace-layout">
      <Outlet />
    </div>
  );
};

export default WorkspaceLayout; 