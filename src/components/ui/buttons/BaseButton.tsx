import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import type { ButtonProps as BootstrapButtonProps } from 'react-bootstrap';

export interface BaseButtonProps extends Omit<BootstrapButtonProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const BaseButton = ({
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  // Mapeamento de tamanhos para Bootstrap
  const getBootstrapSize = (size: string) => {
    switch (size) {
      case 'sm': return 'sm';
      case 'md': return undefined; // Bootstrap default
      case 'lg': return 'lg';
      default: return undefined;
    }
  };

  // Classes personalizadas baseadas no tamanho
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'btn-neomedi-sm';
      case 'md': return 'btn-neomedi-md';
      case 'lg': return 'btn-neomedi-lg';
      default: return 'btn-neomedi-md';
    }
  };

  return (
    <BootstrapButton
      variant={variant}
      size={getBootstrapSize(size)}
      disabled={disabled || loading}
      className={`btn-neomedi ${getSizeClasses(size)} ${fullWidth ? 'w-100' : ''} ${className}`}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      )}
      {children}
    </BootstrapButton>
  );
};

export default BaseButton; 