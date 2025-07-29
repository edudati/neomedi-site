import React from 'react';
import BaseButton from './BaseButton';
import type { BaseButtonProps } from './BaseButton';

export interface PrimaryButtonProps extends Omit<BaseButtonProps, 'variant'> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <BaseButton 
      variant="dark" 
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default PrimaryButton; 