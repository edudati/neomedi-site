import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuthContext } from './modules/auth/context/AuthContext';
import { ProtectedRoute } from './modules/auth/components/ProtectedRoute';
import { useTokenRefresh } from './modules/auth/hooks/useTokenRefresh';
import { AppLayout } from './modules/shared/components/AppLayout';
import Login from './modules/auth/pages/Login';
import SignUp from './modules/auth/pages/SignUp';
import ForgotPassword from './modules/auth/pages/ForgotPassword';
import Unauthorized from './modules/auth/pages/Unauthorized';
import Dashboard from './modules/dashboard/pages/dashboard';
import { MyProfilePage } from './modules/settings/users/pages/me';
import { CompanyPage } from './modules/settings/companies/pages/company';
import { PlacesPage } from './modules/settings/companies/pages/places';
import { Patients } from './modules/patients';
import { WorkspaceHome, WorkspaceLayout } from './modules/workspace';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { initializeAuth } = useAuthContext();
  
  // Inicializar autenticação e refresh automático
  // useTokenRefresh(); // Comentado temporariamente para debug

  useEffect(() => {
    initializeAuth();
  }, []); // Remover dependência para evitar re-renders

  return (
    <div className="App">
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Rotas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Rota do Workspace */}
        <Route 
          path="/workspace" 
          element={
            <ProtectedRoute>
              <WorkspaceLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<WorkspaceHome />} />
        </Route>

        {/* Rota do perfil */}
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyProfilePage />} />
        </Route>

        {/* Rota da empresa */}
        <Route
          path="/company"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyPage />} />
        </Route>

        {/* Rota dos locais */}
        <Route
          path="/places"
          element={
            <ProtectedRoute requiredRole="professional">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PlacesPage />} />
        </Route>

        {/* Rota dos pacientes */}
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Patients />} />
        </Route>
        
        {/* Rota 404 */}
        <Route path="*" element={<Navigate to="/workspace" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
