import React from 'react';

interface SupportDashboardHeaderProps {
  children?: React.ReactNode;
}

const SupportDashboardHeader: React.FC<SupportDashboardHeaderProps> = ({ children }) => {
  return (
    <header 
      className="border-bottom shadow-sm"
      style={{ 
        height: '4rem', 
        backgroundColor: '#f8f9fa', // Cinza claro
        overflow: 'hidden' // Evita que o conteúdo saia da tela
      }}
    >
      <div className="h-100 d-flex align-items-center justify-content-between px-3">
        {children}
      </div>
    </header>
  );
};

export default SupportDashboardHeader;