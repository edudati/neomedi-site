# Módulo Dashboard

Este módulo contém a estrutura base para os dashboards do sistema de gestão de clínicas de medicina integrativa.

## 📁 Estrutura

```
dashboard/
├── components/           # Componentes de layout reutilizáveis
│   ├── AppHeader.tsx     # Header principal (4rem altura, 100% largura, FIXO)
│   ├── DashboardHeader.tsx # Header do dashboard (4rem altura, 100% largura)
│   ├── AdminDashboardHeader.tsx # Header específico para admin (4rem altura, FIXO)
│   ├── SideBar.tsx       # Sidebar lateral (16rem largura, altura dinâmica)
│   ├── DashboardArea.tsx # Área principal do conteúdo (flex: 1)
│   ├── AppFooter.tsx     # Footer (4rem altura, 100% largura)
│   ├── DashboardLayout.tsx # Layout principal que organiza todos os componentes
│   └── index.ts          # Exportações dos componentes
├── views/                # Dashboards específicos por role
│   ├── adminDashboard.tsx # Dashboard para administradores (NOVO LAYOUT)
│   ├── managerDashboard.tsx # Dashboard para gerentes (LAYOUT ANTIGO)
│   ├── professionalDashboard.tsx # Dashboard para profissionais (LAYOUT ANTIGO)
│   ├── assistantDashboard.tsx # Dashboard para assistentes (LAYOUT ANTIGO)
│   ├── clientDashboard.tsx # Dashboard para clientes (LAYOUT ANTIGO)
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
- **DashboardArea**: Área principal do conteúdo (flex: 1) - rola independentemente
- **AppFooter**: Footer fixo na parte inferior
- Layout responsivo com flexbox

### 👥 **Outros Roles** (Layout Antigo)
- **Super Admin**: Gestão de sistema e relatórios globais
- **Manager**: Gestão de clínicas e controle operacional  
- **Professional**: Atendimento e recursos clínicos
- **Assistant**: Suporte e assistência
- **Client**: Acesso limitado ao sistema

Todos os outros roles continuam usando a estrutura antiga com cards simples dentro de um container.

## 🎯 Componentes

### DashboardLayout
Componente principal que organiza todos os elementos do layout usando flexbox:

- **AdminDashboardHeader**: Header específico do admin (4rem altura, cinza claro, FIXO)
- **SideBar**: Fixo à esquerda (16rem largura, cinza claro) - limitador do submenu
- **DashboardArea**: Ocupa o espaço restante (flex: 1) - rola independentemente
- **AppFooter**: Fixo na parte inferior (4rem altura)

**Nota**: O AppHeader principal permanece fixo no topo através do AppHeaderLayout.

### Uso Básico

```tsx
import { DashboardLayout } from '../components';

const MyDashboard = () => {
  return (
    <DashboardLayout
      headerContent={<div>Conteúdo do Header Admin</div>}
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
- **Cores específicas do Admin**: Cinza claro (#f8f9fa) para header e sidebar

## 🔧 Customização

Para criar um novo dashboard específico:

1. Crie um novo arquivo em `views/`
2. Para admin: Importe o `DashboardLayout`
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

if (user?.role === 'admin') {
  // Renderiza o novo layout diretamente (sem container adicional)
  // O AppHeader permanece fixo através do AppHeaderLayout
  return <AdminDashboard />;
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

## 🎯 Layout do Admin

```
┌─────────────────────────────────────────────────────────┐
│                    AppHeader (FIXO)                     │ ← Fixo no topo, 100% largura
├─────────────┬───────────────────────────────────────────┤
│             │      AdminDashboardHeader (FIXO)          │ ← Fixo logo abaixo do AppHeader
│   SideBar   ├───────────────────────────────────────────┤
│ (cinza)     │                                           │
│ limitador   │                                           │
│             │           DashboardArea                   │ ← Conteúdo principal (rola)
│             │                                           │
│             │                                           │
├─────────────┴───────────────────────────────────────────┤
│                    AppFooter (FIXO)                     │
└─────────────────────────────────────────────────────────┘
```

## ✅ Correções Implementadas

- **AppHeader**: Agora fixo no topo com `position: fixed` e `width: 100%`
- **AdminDashboardHeader**: Agora fixo logo abaixo do AppHeader, ocupando 100% da largura entre sidebar e fim da tela
- **SideBar**: Posicionado corretamente abaixo do AppHeader fixo
- **DashboardArea**: Rola independentemente, sem afetar os headers fixos
- **Cores**: AdminDashboardHeader e SideBar com cinza claro (#f8f9fa)
- **Espaçamento**: Todos os componentes com espaçamento correto