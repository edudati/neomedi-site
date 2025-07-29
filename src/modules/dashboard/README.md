# Módulo Dashboard

Este módulo contém a estrutura base para os dashboards do sistema de gestão de clínicas de medicina integrativa.

## 📁 Estrutura

```
dashboard/
├── components/           # Componentes de layout reutilizáveis
│   ├── AppHeader.tsx     # Header principal (4rem altura, 100% largura, FIXO)
│   ├── DashboardHeader.tsx # Header do dashboard (4rem altura, 100% largura)
│   ├── AdminDashboardHeader.tsx # Header específico para admin (4rem altura, FIXO)
│   ├── PatientDashboardHeader.tsx # Header específico para paciente (4rem altura, FIXO)
│   ├── ProfessionalDashboardHeader.tsx # Header específico para profissional (4rem altura, FIXO)
│   ├── SupportDashboardHeader.tsx # Header específico para suporte (4rem altura, FIXO)
│   ├── SideBar.tsx       # Sidebar lateral (16rem largura, altura dinâmica)
│   ├── DashboardArea.tsx # Área principal do conteúdo (flex: 1)
│   ├── AppFooter.tsx     # Footer (4rem altura, 100% largura)
│   ├── DashboardLayout.tsx # Layout principal que organiza todos os componentes
│   ├── PatientDashboardLayout.tsx # Layout específico para pacientes
│   ├── ProfessionalDashboardLayout.tsx # Layout específico para profissionais
│   ├── SupportDashboardLayout.tsx # Layout específico para suporte
│   └── index.ts          # Exportações dos componentes
├── views/                # Dashboards específicos por role
│   ├── adminDashboard.tsx # Dashboard para administradores (NOVO LAYOUT)
│   ├── patientDashboard.tsx # Dashboard para pacientes (NOVO LAYOUT)
│   ├── professionalDashboard.tsx # Dashboard para profissionais da saúde (NOVO LAYOUT)
│   ├── supportDashboard.tsx # Dashboard para suporte (NOVO LAYOUT)
│   ├── managerDashboard.tsx # Dashboard para gerentes (LAYOUT ANTIGO)
│   └── superDashboard.tsx # Dashboard para super admins (LAYOUT ANTIGO)
├── pages/                # Páginas do dashboard
│   └── dashboard.tsx     # Página principal que renderiza o dashboard apropriado
├── types/                # Tipos TypeScript
│   ├── dashboard.types.ts
│   └── index.ts
└── README.md            # Esta documentação
```

## 🎯 Sistema de Roles

O sistema funciona da seguinte forma:

### 👑 **Admin** (Novo Layout)
- **AppHeader**: Header principal fixo no topo (4rem altura, 100% largura)
- **AdminDashboardHeader**: Header específico fixo logo abaixo do AppHeader (cinza claro)
- **SideBar**: Menu lateral (16rem largura, cinza claro) - limitador do submenu
- **DashboardArea**: Área principal do conteúdo (flex: 1) - rola independentemente - **Azul claro pastel (#E8F0FE)**
- **AppFooter**: Footer fixo na parte inferior
- Layout responsivo com flexbox

### 👤 **Paciente (Client)** (Novo Layout)
- **AppHeader**: Header principal fixo no topo (4rem altura, 100% largura)
- **PatientDashboardHeader**: Header específico fixo logo abaixo do AppHeader (cinza claro)
- **SideBar**: Menu lateral (16rem largura, cinza claro) - limitador do submenu
- **DashboardArea**: Área principal do conteúdo (flex: 1) - rola independentemente - **Azul claro pastel (#E8F0FE)**
- **AppFooter**: Footer fixo na parte inferior
- Layout responsivo com flexbox

### 👨‍⚕️ **Profissional da Saúde (Professional)** (Novo Layout)
- **AppHeader**: Header principal fixo no topo (4rem altura, 100% largura)
- **ProfessionalDashboardHeader**: Header específico fixo logo abaixo do AppHeader (cinza claro)
- **SideBar**: Menu lateral (16rem largura, cinza claro) - limitador do submenu
- **DashboardArea**: Área principal do conteúdo (flex: 1) - rola independentemente - **Verde menta suave (#E7F6EC)**
- **AppFooter**: Footer fixo na parte inferior
- Layout responsivo com flexbox

### 🎧 **Suporte (Assistant)** (Novo Layout)
- **AppHeader**: Header principal fixo no topo (4rem altura, 100% largura)
- **SupportDashboardHeader**: Header específico fixo logo abaixo do AppHeader (cinza claro)
- **SideBar**: Menu lateral (16rem largura, cinza claro) - limitador do submenu
- **DashboardArea**: Área principal do conteúdo (flex: 1) - rola independentemente - **Lavanda clara (#F0EDFA)**
- **AppFooter**: Footer fixo na parte inferior
- Layout responsivo com flexbox

### 👥 **Outros Roles** (Layout Antigo)
- **Super Admin**: Gestão de sistema e relatórios globais
- **Manager**: Gestão de clínicas e controle operacional

Todos os outros roles continuam usando a estrutura antiga com cards simples dentro de um container.

## 🎯 Componentes

### Layouts Específicos
Cada perfil tem seu próprio layout e header específico:

- **DashboardLayout**: Layout base para admin
- **PatientDashboardLayout**: Layout específico para pacientes
- **ProfessionalDashboardLayout**: Layout específico para profissionais da saúde
- **SupportDashboardLayout**: Layout específico para suporte

### Headers Específicos
- **AdminDashboardHeader**: Header específico do admin (4rem altura, cinza claro, FIXO)
- **PatientDashboardHeader**: Header específico do paciente (4rem altura, cinza claro, FIXO)
- **ProfessionalDashboardHeader**: Header específico do profissional (4rem altura, cinza claro, FIXO)
- **SupportDashboardHeader**: Header específico do suporte (4rem altura, cinza claro, FIXO)

### Componentes Compartilhados
- **SideBar**: Fixo à esquerda (16rem largura, cinza claro) - limitador do submenu
- **DashboardArea**: Ocupa o espaço restante (flex: 1) - rola independentemente - **Cores específicas por perfil**
- **AppFooter**: Fixo na parte inferior (4rem altura)

**Nota**: O AppHeader principal permanece fixo no topo através do AppHeaderLayout.

### Uso Básico

```tsx
import { PatientDashboardLayout } from '../components';

const MyPatientDashboard = () => {
  return (
    <PatientDashboardLayout
      headerContent={<div>Conteúdo do Header Paciente</div>}
      sidebarContent={<div>Menu da Sidebar</div>}
      dashboardContent={<div>Conteúdo Principal</div>}
      footerContent={<div>Rodapé</div>}
    />
  );
};
```

## 📱 Responsividade

O layout é responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Sidebar pode ser colapsada
- **Mobile**: Layout adaptado para telas menores

## 🎨 Estilização

- Utiliza Bootstrap 5 para estilização
- Componentes seguem o design system do projeto
- Cores e espaçamentos consistentes
- Suporte a temas claro/escuro
- **Cores específicas**: 
  - **Headers e Sidebars**: Cinza claro (#f8f9fa)
  - **DashboardArea por perfil**:
    - **Admin/Paciente**: Azul claro pastel (#E8F0FE)
    - **Profissional**: Verde menta suave (#E7F6EC)
    - **Suporte**: Lavanda clara (#F0EDFA)

## 🔧 Customização

Para criar um novo dashboard específico:

1. Crie um novo arquivo em `views/`
2. Para perfis com novo layout: Importe o layout específico
3. Para outros roles: Use a estrutura de cards simples
4. Defina o conteúdo para cada área
5. Exporte o componente

## 📋 Tipos

O módulo inclui tipos TypeScript para:

- Props dos componentes de layout
- Itens de menu da sidebar
- Métricas do dashboard
- Roles de usuário
- Configurações do dashboard

## 🔄 Como Funciona

O `dashboard.tsx` verifica o role do usuário autenticado:

```tsx
const { user } = useAuthContext();

if (['admin', 'client', 'professional', 'assistant'].includes(user?.role || '')) {
  // Renderiza o novo layout diretamente (sem container adicional)
  // O AppHeader permanece fixo através do AppHeaderLayout
  return renderDashboardByRole();
} else {
  // Renderiza a estrutura antiga com container
  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          {renderDashboardByRole()}
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Layout dos Novos Dashboards

```
┌─────────────────────────────────────────────────────────┐
│                    AppHeader (FIXO)                     │ ← Fixo no topo, 100% largura
├─────────────┬───────────────────────────────────────────┤
│             │      [Role]DashboardHeader (FIXO)         │ ← Fixo logo abaixo do AppHeader
│   SideBar   ├───────────────────────────────────────────┤
│ (cinza)     │                                           │
│ limitador   │                                           │
│             │           DashboardArea                   │ ← Conteúdo principal (rola)
│             │        (cor específica por perfil)        │
│             │                                           │
├─────────────┴───────────────────────────────────────────┤
│                    AppFooter (FIXO)                     │
└─────────────────────────────────────────────────────────┘
```

## ✅ Dashboards Implementados

### 👑 **Admin**
- **Header**: "Dashboard Administrativo" + botão "Config"
- **Sidebar**: Menu Principal (Dashboard, Usuários, Clínicas, Relatórios, Configurações)
- **Métricas**: Total de Usuários, Clínicas Ativas, Consultas Hoje, Receita Mensal
- **Cor de Fundo**: Azul claro pastel (#E8F0FE)

### 👤 **Paciente (Client)**
- **Header**: "Meu Painel - Paciente" + botão "Agendar"
- **Sidebar**: Menu do Paciente (Meu Painel, Minhas Consultas, Meu Prontuário, Meus Exames, Prescrições, Meu Perfil)
- **Métricas**: Próxima Consulta, Consultas Realizadas, Exames Pendentes, Prescrições Ativas
- **Cor de Fundo**: Azul claro pastel (#E8F0FE)

### 👨‍⚕️ **Profissional da Saúde (Professional)**
- **Header**: "Painel Profissional" + botão "Nova Consulta"
- **Sidebar**: Menu Profissional (Dashboard, Minha Agenda, Meus Pacientes, Prontuários, Exames, Prescrições, Relatórios)
- **Métricas**: Consultas Hoje, Pacientes Atendidos, Próxima Consulta, Exames Pendentes
- **Cor de Fundo**: Verde menta suave (#E7F6EC)

### 🎧 **Suporte (Assistant)**
- **Header**: "Painel de Suporte" + botão "Atender"
- **Sidebar**: Menu de Suporte (Dashboard, Tickets, Chamados, Usuários, Sistema, Relatórios, Base de Conhecimento)
- **Métricas**: Tickets Abertos, Chamados Hoje, Tempo Médio, Satisfação
- **Cor de Fundo**: Lavanda clara (#F0EDFA)

## ✅ Correções Implementadas

- **AppHeader**: Agora fixo no topo com `position: fixed` e `width: 100%`
- **Headers Específicos**: Cada perfil tem seu header fixo logo abaixo do AppHeader
- **SideBar**: Posicionado corretamente abaixo do AppHeader fixo
- **DashboardArea**: Rola independentemente, sem afetar os headers fixos
- **Cores**: Todos os headers e sidebars com cinza claro (#f8f9fa)
- **Cores de Fundo**: Cada perfil tem sua cor específica no DashboardArea
- **Espaçamento**: Todos os componentes com espaçamento correto
- **Layouts Específicos**: Cada perfil tem seu layout e conteúdo personalizado