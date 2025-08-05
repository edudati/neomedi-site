import { Link } from 'react-router-dom';
import { useAuthContext } from '../../auth/context/AuthContext';
import { LogoutButton } from '../../../components/ui/buttons/LogoutButton';
import styles from '../pages/home/index.module.css';

const UserDropdown = () => {
  const { user } = useAuthContext();

  return (
    <div className="dropdown w-100">
      <button
        className={`btn btn-link btn-md dropdown-toggle d-flex align-items-center ${styles.userDropdown}`}
        type="button"
        id="dropdownUser"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Menu do usuário"
        title={user?.name || 'Usuário'}
      >
        <i className="bi bi-person-circle fs-4" />
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
  );
};

export default UserDropdown; 