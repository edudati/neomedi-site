import React from 'react';

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ children }) => {
  return (
    <header 
      className="bg-light border-bottom"
      style={{ 
        height: '4rem', 
        width: '100%'
      }}
    >
      <div className="h-100 d-flex align-items-center justify-content-between px-3">
        {children}
      </div>
    </header>
  );
};

export default DashboardHeader;