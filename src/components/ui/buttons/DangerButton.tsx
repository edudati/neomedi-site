import React from 'react';
import BaseButton from './BaseButton';
import type { BaseButtonProps } from './BaseButton';

export interface DangerButtonProps extends Omit<BaseButtonProps, 'variant'> {
  children: React.ReactNode;
}

const DangerButton = ({ 
  children, 
  ...props 
}) => {
  return (
    <BaseButton 
      variant="danger" 
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default DangerButton; 