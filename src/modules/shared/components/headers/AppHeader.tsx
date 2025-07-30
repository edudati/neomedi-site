import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../auth/context/AuthContext';
import { LogoutButton } from '../../../../components/ui/buttons/LogoutButton';
import logo from '../../../../images/logo-full.png';

export const AppHeader = () => {
  const { user } = useAuthContext();

  return (
    <header 
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 py-2"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '4rem',
        zIndex: 1030
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="Neomedi Logo" width="32" height="32" />
          <span className="fw-bold text-primary">Neomedi</span>
        </Link>

        {/* Botão do menu mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ms-4 gap-3">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="bi bi-speedometer2 me-1"></i>
                Painel
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/schedule" className="nav-link">
                <i className="bi bi-calendar-check me-1"></i>
                Agendamento
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/records" className="nav-link">
                <i className="bi bi-file-earmark-text me-1"></i>
                Prontuários
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clients" className="nav-link">
                <i className="bi bi-people me-1"></i>
                Pacientes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/professionals" className="nav-link">
                <i className="bi bi-person-video3 me-1"></i>
                Profissionais
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className="bi bi-gear me-1"></i>
                Gestão
              </Link>
            </li>
          </ul>

          {/* Ações rápidas */}
          <div className="d-flex align-items-center gap-3 me-3">
            <button
              className="btn btn-outline-primary btn-sm"
              title="Adicionar cliente"
              aria-label="Adicionar novo cliente"
            >
              <i className="bi bi-person-plus-fill"></i>
              <span className="d-none d-md-inline ms-1">Cliente</span>
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              title="Novo agendamento"
              aria-label="Criar novo agendamento"
            >
              <i className="bi bi-calendar-plus-fill"></i>
              <span className="d-none d-md-inline ms-1">Agendar</span>
            </button>
          </div>

          {/* Perfil do usuário */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              id="dropdownUser"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Menu do usuário"
            >
              <i className="bi bi-person-circle" />
              <span className="d-none d-md-inline">
                {user?.name || 'Usuário'}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
              <li>
                <h6 className="dropdown-header">
                  <i className="bi bi-person me-2"></i>
                  {user?.name || 'Usuário'}
                </h6>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item" to="/account">
                  <i className="bi bi-person-gear me-2"></i>
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/me">
                  <i className="bi bi-person-circle me-2"></i>
                  Meu Perfil
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <Link className="dropdown-item" to="/company">
                    <i className="bi bi-building me-2"></i>
                    Minha Empresa
                  </Link>
                </li>
              )}
              <li><hr className="dropdown-divider" /></li>
              <li>
                <LogoutButton variant="link" className="dropdown-item text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sair
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}; 