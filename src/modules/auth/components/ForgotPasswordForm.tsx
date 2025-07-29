import { useFormContext } from 'react-hook-form';
import type { ForgotPasswordFormData } from '../schemas/authSchemas';
import { getFieldError, getFieldClassName } from '../lib/formUtils';

export const ForgotPasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ForgotPasswordFormData>();

  return (
    <>
      <div className="form-group">
        <label className="mb-2 text-start d-block">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          className={getFieldClassName(errors.email)}
          placeholder="Digite seu email"
          {...register('email')}
        />
        {errors.email && (
          <div className="text-danger fs-12">{getFieldError(errors.email)}</div>
        )}
      </div>

      <div className="text-center">
        <button 
          type="submit" 
          className="btn w-100 py-2"
          style={{ 
            backgroundColor: '#4CAF93', 
            borderColor: '#4CAF93', 
            color: 'white',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3d8b7a';
            e.currentTarget.style.borderColor = '#3d8b7a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4CAF93';
            e.currentTarget.style.borderColor = '#4CAF93';
          }}
        >
          Enviar email de recuperação
        </button>
      </div>
    </>
  );
};