import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useNotification } from '../hooks/useNotification';

interface LogoutButtonProps {
  className?: string;
  variant?: 'button' | 'link';
  children?: React.ReactNode;
}

export const LogoutButton = ({ 
  className = '', 
  variant = 'button',
  children = 'Sair'
}: LogoutButtonProps) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const handleLogout = () => {
    logout();
    showSuccess('Logout realizado com sucesso');
    navigate('/login');
  };

  if (variant === 'link') {
    return (
      <button 
        onClick={handleLogout}
        className={`btn btn-link text-decoration-none ${className}`}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <button 
      onClick={handleLogout}
      className={`btn btn-outline-danger ${className}`}
      type="button"
    >
      {children}
    </button>
  );
};