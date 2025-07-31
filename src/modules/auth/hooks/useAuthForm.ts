import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signUpSchema, forgotPasswordSchema, type LoginFormData, type SignUpFormData, type ForgotPasswordFormData } from '../schemas/authSchemas';

type FormType = 'login' | 'signup' | 'forgot-password';

export const useAuthForm = (formType: FormType = 'login') => {
  if (formType === 'signup') {
    const form = useForm<SignUpFormData>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    });
    
    return form;
  }

  if (formType === 'forgot-password') {
    return useForm<ForgotPasswordFormData>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        email: '',
      },
    });
  }

  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
};