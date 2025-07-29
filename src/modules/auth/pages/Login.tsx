import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuthForm } from '../hooks/useAuthForm';
import { useNotification } from '../hooks/useNotification';
import { AuthLayout } from '../components/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { GoogleButton } from '../components/GoogleButton';
import type { LoginFormData } from '../schemas/authSchemas';
import type { UseFormReturn } from 'react-hook-form';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading, error, successMessage } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  const form = useAuthForm('login') as UseFormReturn<LoginFormData>;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      
      if (result.success) {
        showSuccess(result.message);
        // Navegar para dashboard após login bem-sucedido
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Erro ao fazer login');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      
      if (result.success) {
        showSuccess(result.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Erro ao fazer login com Google');
    }
  };

  return (
    <AuthLayout
      title="Entrar"
      isLoginPage={true}
    >
      {/* Formulário */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LoginForm />
          
          {/* Loading state */}
          {isLoading && (
            <div className="text-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          )}
        </form>
      </FormProvider>

      {/* Separador */}
      <div className="text-center my-3">
        <span className="text-muted">ou</span>
      </div>

      {/* Botão Google */}
      <GoogleButton 
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="mb-3"
      />
    </AuthLayout>
  );
};

export default Login; 