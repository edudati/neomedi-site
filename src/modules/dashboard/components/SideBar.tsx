import React from 'react';

interface SideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  return (
    <aside 
      className="border-end shadow-sm"
      style={{ 
        width: '16rem',
        height: 'calc(100vh - 8rem)', // 100vh - (AppHeader 4rem + AppFooter 4rem)
        position: 'fixed',
        left: 0,
        top: '4rem', // Posicionado logo abaixo do AppHeader fixo
        zIndex: 1020,
        overflowY: 'auto',
        backgroundColor: '#f8f9fa' // Cinza claro
      }}
    >
      <nav className="h-100 p-3">
        {children}
      </nav>
    </aside>
  );
};

export default SideBar;