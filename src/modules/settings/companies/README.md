# Módulo Companies

Este módulo gerencia as informações da empresa do usuário administrador.

## Estrutura

```
companies/
├── pages/
│   └── company.tsx          # Página principal de visualização/edição da empresa
├── services/
│   └── company.service.ts   # Serviços para comunicação com a API
├── types/
│   └── company.types.ts     # Tipos TypeScript para Company
└── index.ts                 # Exportações do módulo
```

## Funcionalidades

- **Visualização da empresa**: Exibe todas as informações da empresa do usuário ADMIN
- **Edição da empresa**: Permite editar dados como nome, CNPJ, email, telefone e status
- **Gerenciamento de endereço**: Permite editar o endereço da empresa
- **Validação de permissões**: Apenas usuários com role ADMIN podem acessar

## Rotas

- `/company` - Página principal da empresa (protegida para ADMIN)

## API Endpoints

- `GET /api/v1/companies/user/{user_id}` - Buscar empresa por ID do usuário
- `PUT /api/v1/companies/{company_id}` - Atualizar dados da empresa
- `PUT /api/v1/companies/{company_id}/address` - Atualizar endereço da empresa

## Uso

A página de empresa é acessível através do dropdown do usuário no header, mas apenas para usuários com role ADMIN.

```tsx
import { CompanyPage } from '@/modules/settings/companies';

// A rota já está configurada no App.tsx
<Route path="/company" element={<CompanyPage />} />
``` 