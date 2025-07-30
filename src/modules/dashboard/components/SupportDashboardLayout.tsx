import React from 'react';
import SupportDashboardHeader from './SupportDashboardHeader';
import SideBar from './SideBar';
import DashboardArea from './DashboardArea';
import { AppFooter } from '@/modules/shared/components/footers';

interface SupportDashboardLayoutProps {
  headerContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  dashboardContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const SupportDashboardLayout: React.FC<SupportDashboardLayoutProps> = ({
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
            paddingTop: '4rem' // Espaço para o SupportDashboardHeader fixo
          }}
        >
          {/* SupportDashboardHeader - fixo logo abaixo do AppHeader */}
          <SupportDashboardHeader>
            {headerContent}
          </SupportDashboardHeader>

          {/* DashboardArea - ocupa o espaço restante */}
          <DashboardArea backgroundColor="#F0EDFA">
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

export default SupportDashboardLayout;