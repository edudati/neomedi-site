import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuthForm } from '../hooks/useAuthForm';
import { useNotification } from '../hooks/useNotification';
import { AuthLayout } from '../components/AuthLayout';
import { SignUpForm } from '../components/SignUpForm';
import { GoogleButton } from '../components/GoogleButton';
import type { SignUpFormData } from '../schemas/authSchemas';
import type { UseFormReturn } from 'react-hook-form';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, handleGoogleAuth, isLoading, error, successMessage } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  const form = useAuthForm('signup') as UseFormReturn<SignUpFormData>;

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUp({
        email: data.email,
        password: data.password,
      });
      
      if (result.success) {
        showSuccess(result.message);
        // Redirecionamento imediato após signup bem-sucedido
        navigate('/dashboard');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Erro ao fazer cadastro');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await handleGoogleAuth();
      
      if (result.success) {
        showSuccess(result.message);
        // Redirecionamento imediato após signup bem-sucedido
        navigate('/dashboard');
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Erro ao criar conta com Google');
    }
  };

  return (
    <AuthLayout
      title="Criar conta"
      isLoginPage={false}
    >
      {/* Formulário */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SignUpForm />
          
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
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="mb-3"
      />
    </AuthLayout>
  );
};

export default SignUp; 