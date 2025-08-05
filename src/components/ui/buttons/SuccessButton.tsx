import React from 'react';
import BaseButton from './BaseButton';
import type { BaseButtonProps } from './BaseButton';

export interface SuccessButtonProps extends Omit<BaseButtonProps, 'variant'> {
  children: React.ReactNode;
}

const SuccessButton = ({ 
  children, 
  ...props 
}) => {
  return (
    <BaseButton 
      variant="success" 
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default SuccessButton; 