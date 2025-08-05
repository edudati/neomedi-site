# Módulo Workspace

Este módulo implementa a página principal pós-login do sistema, substituindo o dashboard como página inicial autenticada.

## Estrutura

```
workspace/
├── components/          # Componentes específicos do workspace
├── hooks/              # Hooks personalizados
│   ├── index.ts
│   └── useWorkspace.ts
├── layouts/            # Layouts específicos
│   └── WorkspaceLayout.tsx
├── pages/              # Páginas do workspace
│   └── home/           # Página principal
│       ├── index.tsx
│       └── index.module.css
├── types/              # Tipos TypeScript
│   └── index.ts
└── index.ts            # Exportações principais
```

## Funcionalidades

- **Autenticação**: Utiliza o sistema de autenticação existente
- **Proteção de Rotas**: Implementa ProtectedRoute para segurança
- **Layout Responsivo**: Interface com painéis redimensionáveis
- **Token Management**: Gerencia access tokens e refresh tokens automaticamente

## Rotas

- `/workspace` - Página principal pós-login (protegida)

## Integração

O workspace é integrado ao sistema de autenticação existente e utiliza:
- AuthContext para gerenciamento de estado
- ProtectedRoute para segurança
- Sistema de tokens para autenticação persistente 