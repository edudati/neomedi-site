import { useFormContext } from 'react-hook-form';
import type { SignUpFormData } from '../schemas/authSchemas';
import { getFieldError, getFieldClassName } from '../lib/formUtils';

export const SignUpForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  return (
    <>
      <div className="form-group">
        <label className="mb-2 text-start d-block">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          className={getFieldClassName(errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <div className="text-danger fs-12">{getFieldError(errors.email)}</div>
        )}
      </div>

      <div className="form-group">
        <label className="mb-2 text-start d-block">
          <strong>Senha</strong>
        </label>
        <input
          type="password"
          className={getFieldClassName(errors.password)}
          {...register('password')}
        />
        {errors.password && (
          <div className="text-danger fs-12">{getFieldError(errors.password)}</div>
        )}
      </div>

      <div className="form-group">
        <label className="mb-2 text-start d-block">
          <strong>Confirmar senha</strong>
        </label>
        <input
          type="password"
          className={getFieldClassName(errors.confirmPassword)}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <div className="text-danger fs-12">{getFieldError(errors.confirmPassword)}</div>
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
          Criar conta
        </button>
      </div>
    </>
  );
};