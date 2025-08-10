import { useFormContext } from 'react-hook-form';
import type { SignUpFormData } from '../schemas/authSchemas';
import { getFieldError } from '../lib/formUtils';

export const SignUpForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  return (
    <div style={{ fontSize: '16px' }}>
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

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label text-secondary text-start w-100">
          Confirmar senha
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
          placeholder="Confirme sua senha"
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          {...register('confirmPassword')}
          style={{ fontSize: 'inherit' }}
        />
        {errors.confirmPassword && (
          <div id="confirmPassword-error" className="invalid-feedback">
            {getFieldError(errors.confirmPassword)}
          </div>
        )}
      </div>

      <div className="d-grid gap-3">
        <button 
          type="submit" 
          className="btn btn-primary btn-lg py-2"
          aria-label="Criar nova conta"
          disabled={false}
          onClick={() => console.log('Botão clicado')}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
};