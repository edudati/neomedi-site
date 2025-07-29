import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import logotext from '../../../images/logo-text.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  isLoginPage?: boolean;
  isForgotPasswordPage?: boolean;
}

export const AuthLayout = ({
  children,
  title,
  isLoginPage = false,
  isForgotPasswordPage = false,
}: AuthLayoutProps) => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100 d-flex justify-content-center px-3">
        <div
          className="p-4 w-100 bg-white rounded shadow-lg"
          style={{ maxWidth: '480px' }}
        >
          <div className="text-center mb-4">
            <Link
              to="#"
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: '48px' }}
                className="me-2"
              />
              <img
                src={logotext}
                alt="Texto Logo"
                style={{ height: '20px' }}
              />
            </Link>
            <h4 className="mb-1">{title}</h4>
          </div>

          {children}

          <div className="text-center mt-3">
            <p className="mb-0" style={{ color: '#6c757d' }}>
              {isLoginPage ? (
                <>
                  Não tem uma conta?{' '}
                  <Link className="text-primary fw-semibold" to="/signup">
                    Cadastre-se
                  </Link>
                </>
              ) : isForgotPasswordPage ? (
                <>
                  Lembrou sua senha?{' '}
                  <Link className="text-primary fw-semibold" to="/login">
                    Voltar ao login
                  </Link>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <Link className="text-primary fw-semibold" to="/login">
                    Entrar
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
