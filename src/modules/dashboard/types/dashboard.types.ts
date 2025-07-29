// Tipos para os componentes de layout
export interface LayoutComponentProps {
  children?: React.ReactNode;
}

// Tipos para o conteúdo do dashboard
export interface DashboardContent {
  headerContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  dashboardContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

// Tipos para itens de menu da sidebar
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  isActive?: boolean;
  children?: MenuItem[];
}

// Tipos para métricas do dashboard
export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

// Tipos para diferentes roles de usuário
export type UserRole = 'admin' | 'manager' | 'professional' | 'assistant' | 'client' | 'super';

// Tipos para configurações do dashboard
export interface DashboardConfig {
  role: UserRole;
  showSidebar: boolean;
  showHeader: boolean;
  showFooter: boolean;
  theme?: 'light' | 'dark';
}