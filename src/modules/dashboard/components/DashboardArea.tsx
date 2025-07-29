import React from 'react';

interface DashboardAreaProps {
  children?: React.ReactNode;
  backgroundColor?: string;
}

const DashboardArea: React.FC<DashboardAreaProps> = ({ children, backgroundColor = '#f8f9fa' }) => {
  return (
    <main
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        height: 'calc(100vh - 12rem)', // 100vh - (AppHeader 4rem + AdminDashboardHeader 4rem + AppFooter 4rem)
        backgroundColor: backgroundColor
      }}
    >
      {children}
    </main>
  );
};

export default DashboardArea;