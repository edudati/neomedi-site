import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../auth/context/AuthContext';
import { LogoutButton } from '../../../../components/ui/buttons/LogoutButton';
import logo from '../../../../images/logo-full.png';

export const Sidebar = () => {
  const { user } = useAuthContext();
  return (
    <aside
      style={{
        width: '12.3rem',
        height: '100vh',
        background: '#fff',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #eee',
      }}
    >
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1rem' }}>
          <img src={logo} alt="Neomedi Logo" width="28" height="28" />
          <span style={{ fontWeight: 'bold', color: '#1976d2' }}>Neomedi</span>
        </Link>
        <Link to="/clients" style={{ display: 'block', padding: '0.5rem', background: '#e3f2fd', borderRadius: '4px', color: '#1976d2', textAlign: 'center', textDecoration: 'none', fontWeight: 500 }}>
          + Paciente
        </Link>
        <Link to="/records" style={{ display: 'block', padding: '0.5rem', color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
          Prontuários
        </Link>
      </div>
    </aside>
  );
};