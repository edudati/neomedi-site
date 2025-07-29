import React from 'react';

interface AppFooterProps {
  children?: React.ReactNode;
}

const AppFooter: React.FC<AppFooterProps> = ({ children }) => {
  return (
    <footer 
      className="bg-white border-top shadow-sm"
      style={{ 
        height: '4rem', 
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1030
      }}
    >
      <div className="h-100 d-flex align-items-center justify-content-center px-3">
        {children}
      </div>
    </footer>
  );
};

export default AppFooter;