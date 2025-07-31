# Módulo de Pacientes

Este módulo gerencia a funcionalidade de pacientes no sistema Neomedi.

## Estrutura

```
patients/
├── components/          # Componentes React
│   ├── PatientsList.tsx     # Lista de pacientes
│   ├── PatientDetails.tsx   # Detalhes do paciente
│   ├── AddPatientModal.tsx  # Modal para adicionar paciente
│   └── index.ts
├── hooks/              # Hooks personalizados
│   ├── usePatients.ts      # Hook para gerenciar lista de pacientes
│   ├── usePatientDetails.ts # Hook para detalhes de paciente
│   └── index.ts
├── pages/              # Páginas
│   └── Patients.tsx        # Página principal de pacientes
├── services/           # Serviços de API
│   └── patientService.ts   # Comunicação com API de pacientes
├── types/              # Tipos TypeScript
│   └── patient.types.ts    # Interfaces e tipos
└── index.ts            # Exportações do módulo
```

## Funcionalidades

- **Lista de Pacientes**: Exibe todos os pacientes do profissional autenticado
- **Detalhes do Paciente**: Sidebar com informações completas do paciente selecionado
- **Adicionar Paciente**: Modal para criar novos pacientes com criação automática no Firebase
- **Responsivo**: Layout adaptável para diferentes tamanhos de tela

## Fluxo de Criação de Paciente

1. **Formulário**: Preenchimento de nome, email, senha temporária e seleção da empresa
2. **Validação**: Verificação de campos obrigatórios, formato de email e confirmação de senha
3. **Empresas**: Carregamento das empresas do profissional autenticado
4. **Seleção**: Dropdown com empresas ou auto-seleção se houver apenas uma
5. **Firebase**: Criação do usuário no Firebase Auth com email e senha
6. **Token**: Obtenção do token de autenticação do Firebase
7. **API**: Criação do paciente na API usando o token do Firebase
8. **Atualização**: Recarregamento da lista de pacientes

## API Endpoints

- `GET /api/v1/clients/` - Listar pacientes
- `GET /api/v1/clients/{client_id}` - Buscar paciente específico
- `POST /api/v1/clients/` - Criar novo paciente

## Uso

```tsx
import { Patients } from './modules/patients';

// A página está disponível na rota /clients
```

## Componentes

### PatientsList
Lista de pacientes com seleção e informações básicas.

### PatientDetails
Exibe detalhes completos do paciente selecionado.

### AddPatientModal
Modal para adicionar novos pacientes com validação.

## Hooks

### usePatients
Gerencia o estado da lista de pacientes e operações CRUD.

### usePatientDetails
Gerencia o estado dos detalhes de um paciente específico.

### useCompanies
Gerencia o estado das empresas do profissional autenticado. 