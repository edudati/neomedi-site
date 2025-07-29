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
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12" style={{ maxWidth: '1800px', margin: '0 auto', padding: '0 24px' }}>
            <div className="bg-white rounded shadow-sm p-4">
              <div className="text-center mb-4">
                <Link
                  to="#"
                  className="d-inline-block mb-3"
                  aria-label="Neomedi Logo"
                >
                  <img
                    src={logo}
                    alt="Logo Neomedi"
                    className="img-fluid"
                    width="38"
                    height="38"
                  />
                  <img
                    src={logotext}
                    alt="Neomedi"
                    className="img-fluid ms-2"
                    width="85"
                    height="17"
                  />
                </Link>
                <h1 className="h5 fw-normal text-secondary mb-0">{title}</h1>
              </div>

              {children}

              <div className="text-center mt-4">
                <p className="text-muted small mb-0">
                  {isLoginPage ? (
                    <>
                      Não tem uma conta?{' '}
                      <Link className="link-primary text-decoration-none" to="/signup">
                        Cadastre-se
                      </Link>
                    </>
                  ) : isForgotPasswordPage ? (
                    <>
                      <Link className="link-primary text-decoration-none" to="/login">
                        Voltar ao login
                      </Link>
                    </>
                  ) : (
                    <>
                      Já tem uma conta?{' '}
                      <Link className="link-primary text-decoration-none" to="/login">
                        Entrar
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
