import React from 'react';

interface DashboardAreaProps {
  children?: React.ReactNode;
}

const DashboardArea: React.FC<DashboardAreaProps> = ({ children }) => {
  return (
    <main 
      className="bg-light"
      style={{ 
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        height: 'calc(100vh - 12rem)' // 100vh - (AppHeader 4rem + AdminDashboardHeader 4rem + AppFooter 4rem)
      }}
    >
      {children}
    </main>
  );
};

export default DashboardArea;