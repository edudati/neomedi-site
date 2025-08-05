import React from 'react';

interface PatientDashboardHeaderProps {
  children?: React.ReactNode;
}

const PatientDashboardHeader: React.FC<PatientDashboardHeaderProps> = ({ children }) => {
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

export default PatientDashboardHeader;