import React from 'react';
import ProfessionalDashboardHeader from './ProfessionalDashboardHeader';
import SideBar from './SideBar';
import DashboardArea from './DashboardArea';
import AppFooter from './AppFooter';

interface ProfessionalDashboardLayoutProps {
  headerContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  dashboardContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const ProfessionalDashboardLayout: React.FC<ProfessionalDashboardLayoutProps> = ({
  headerContent,
  sidebarContent,
  dashboardContent,
  footerContent
}) => {
  return (
    <div className="dashboard-layout">
      {/* Container principal com flexbox */}
      <div 
        className="d-flex"
        style={{ 
          minHeight: 'calc(100vh - 8rem)', // 100vh - (AppHeader 4rem + AppFooter 4rem)
          paddingBottom: '4rem' // Espaço para o AppFooter fixo
        }}
      >
        {/* SideBar fixo à esquerda */}
        <SideBar>
          {sidebarContent}
        </SideBar>

        {/* Área principal do dashboard */}
        <div 
          className="d-flex flex-column"
          style={{ 
            marginLeft: '16rem', // Espaço para o SideBar
            width: 'calc(100% - 16rem)',
            paddingTop: '4rem' // Espaço para o ProfessionalDashboardHeader fixo
          }}
        >
          {/* ProfessionalDashboardHeader - fixo logo abaixo do AppHeader */}
          <ProfessionalDashboardHeader>
            {headerContent}
          </ProfessionalDashboardHeader>

          {/* DashboardArea - ocupa o espaço restante */}
          <DashboardArea backgroundColor="#E7F6EC">
            {dashboardContent}
          </DashboardArea>
        </div>
      </div>

      {/* AppFooter fixo na parte inferior */}
      <AppFooter>
        {footerContent}
      </AppFooter>
    </div>
  );
};

export default ProfessionalDashboardLayout;