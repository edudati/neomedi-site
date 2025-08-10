import { useFormContext } from 'react-hook-form';
import type { ForgotPasswordFormData } from '../schemas/authSchemas';
import { getFieldError } from '../lib/formUtils';

export const ForgotPasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ForgotPasswordFormData>();

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="email" className="form-label text-secondary text-start w-100">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Digite seu email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <div id="email-error" className="invalid-feedback">
            {getFieldError(errors.email)}
          </div>
        )}
      </div>

      <div className="d-grid">
        <button 
          type="submit" 
          className="btn btn-primary btn-lg py-2"
          aria-label="Enviar email de recuperação"
        >
          Enviar email de recuperação
        </button>
      </div>
    </div>
  );
};