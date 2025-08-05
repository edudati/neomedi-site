import React from 'react';
import BaseButton from './BaseButton';
import type { BaseButtonProps } from './BaseButton';

export interface SecondaryButtonProps extends Omit<BaseButtonProps, 'variant'> {
  children: React.ReactNode;
}

const SecondaryButton = ({ 
  children, 
  ...props 
}) => {
  return (
    <BaseButton 
      variant="outline-secondary" 
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default SecondaryButton; 