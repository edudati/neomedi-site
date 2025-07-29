import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { LoginFormData } from '../schemas/authSchemas';
import { getFieldError, getFieldClassName } from '../lib/formUtils';

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormData>();

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

      <div className="form-row d-flex justify-content-between mt-4 mb-2">
        <div className="form-group">
          <div className="custom-control custom-checkbox ms-1">
            <input
              type="checkbox"
              className="form-check-input"
              id="basic_checkbox_1"
              {...register('rememberMe')}
            />
            <label className="form-check-label" htmlFor="basic_checkbox_1">
              Lembrar de mim
            </label>
          </div>
        </div>
        <div className="form-group">
          <Link to="/forgot-password" className="text-primary text-decoration-none fs-12">
            Esqueci a senha
          </Link>
        </div>
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
          Entrar
        </button>
      </div>
    </>
  );
}; 