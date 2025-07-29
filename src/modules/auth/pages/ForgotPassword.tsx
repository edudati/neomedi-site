import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuthForm } from '../hooks/useAuthForm';
import { useNotification } from '../hooks/useNotification';
import { AuthLayout } from '../components/AuthLayout';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import type { ForgotPasswordFormData } from '../schemas/authSchemas';
import type { UseFormReturn } from 'react-hook-form';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, successMessage } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  const form = useAuthForm('forgot-password') as UseFormReturn<ForgotPasswordFormData>;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const result = await forgotPassword(data.email);
      
      if (result.success) {
        showSuccess(result.message);
        // Voltar para login após envio bem-sucedido
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        showError(result.message);
      }
    } catch (error) {
      showError('Erro ao enviar email de recuperação');
    }
  };

  return (
    <AuthLayout
      title="Recuperar senha"
      isLoginPage={false}
      isForgotPasswordPage={true}
    >
      <div className="text-center mb-4">
        <p className="text-muted">
          Digite seu email e enviaremos um link para você redefinir sua senha.
        </p>
      </div>

      {/* Formulário */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ForgotPasswordForm />
          
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
    </AuthLayout>
  );
};

export default ForgotPassword;