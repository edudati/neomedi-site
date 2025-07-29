import React from 'react';

interface AppHeaderProps {
  children?: React.ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({ children }) => {
  return (
    <header 
      className="bg-white border-bottom shadow-sm"
      style={{ 
        height: '4rem', 
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1030
      }}
    >
      <div className="h-100 d-flex align-items-center px-3">
        {children}
      </div>
    </header>
  );
};

export default AppHeader;