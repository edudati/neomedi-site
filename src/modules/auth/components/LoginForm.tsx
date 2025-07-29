import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { LoginFormData } from '../schemas/authSchemas';
import { getFieldError } from '../lib/formUtils';

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormData>();

  return (
    <div style={{ minWidth: '400px', fontSize: '16px' }}>
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
          style={{ fontSize: 'inherit' }}
        />
        {errors.email && (
          <div id="email-error" className="invalid-feedback">
            {getFieldError(errors.email)}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="form-label text-secondary text-start w-100">
          Senha
        </label>
        <input
          type="password"
          id="password"
          className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
          placeholder="Digite sua senha"
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
          style={{ fontSize: 'inherit' }}
        />
        {errors.password && (
          <div id="password-error" className="invalid-feedback">
            {getFieldError(errors.password)}
          </div>
        )}
      </div>

      <div className="d-grid mb-3">
        <button 
          type="submit" 
          className="btn btn-primary btn-lg py-2"
          aria-label="Entrar no sistema"
        >
          Entrar
        </button>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-3 gap-md-0">
        <div className="form-check order-1 order-md-0">
          <input
            type="checkbox"
            id="rememberMe"
            className="form-check-input"
            {...register('rememberMe')}
          />
          <label className="form-check-label text-secondary" htmlFor="rememberMe">
            Lembrar de mim
          </label>
        </div>
        <Link 
          to="/forgot-password" 
          className="link-primary text-decoration-none order-0 order-md-1"
        >
          Esqueci a senha
        </Link>
      </div>
    </div>
  );
};
