import type { FieldError } from 'react-hook-form';

export const getFieldError = (error: FieldError | undefined): string => {
  return error?.message || '';
};

export const hasFieldError = (error: FieldError | undefined): boolean => {
  return !!error?.message;
};

export const getFieldClassName = (error: FieldError | undefined, baseClass: string = 'form-control'): string => {
  return `${baseClass} ${hasFieldError(error) ? 'is-invalid' : ''}`;
};