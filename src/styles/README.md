# 🎨 Guia de Estilos Neomedi

## Cores e Gradientes

### Gradientes Principais
- **Primary**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` - Usado em telas de auth
- **Secondary**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)` - Alternativa
- **Success**: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)` - Para ações positivas
- **Warning**: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)` - Para alertas

### Cores Base
- **Primary**: `#667eea` (azul)
- **Secondary**: `#764ba2` (roxo)
- **Success**: `#28a745` (verde)
- **Warning**: `#ffc107` (amarelo)
- **Danger**: `#dc3545` (vermelho)
- **Dark**: `#343a40` (cinza escuro)
- **Light**: `#f8f9fa` (cinza claro)

## Componentes Padrão

### Cards de Autenticação
```css
.auth-card {
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}
```

### Botões Personalizados
```css
.btn-neomedi {
  border-radius: 8px;
  padding: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}
```

### Inputs Personalizados
```css
.form-control-neomedi {
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

### Ícones Circulares
```css
.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
}
```

## Classes Utilitárias

### Gradientes
- `.bg-gradient-primary` - Gradiente principal
- `.bg-gradient-secondary` - Gradiente secundário
- `.bg-gradient-success` - Gradiente de sucesso
- `.bg-gradient-warning` - Gradiente de aviso

### Links
- `.link-neomedi` - Links com hover personalizado

### Separadores
- `.separator` - Separador com linhas e texto central

## Espaçamentos

- **xs**: 0.5rem
- **sm**: 1rem
- **md**: 1.5rem
- **lg**: 2rem
- **xl**: 3rem

## Bordas e Sombras

- **Border Radius**: 15px (cards), 8px (botões/inputs)
- **Shadow**: `0 1rem 3rem rgba(0, 0, 0, 0.175)` (cards)
- **Shadow**: `0 0.5rem 1rem rgba(0, 0, 0, 0.15)` (hover)

## Responsividade

- **Mobile**: Cards ocupam 100% da largura com margem
- **Desktop**: Cards com largura máxima de 400px
- **Breakpoints**: Seguindo padrão Bootstrap

## Como Usar

1. Importe o tema: `import './styles/theme.css'`
2. Use as classes CSS personalizadas
3. Para novos gradientes, adicione no `:root` do theme.css
4. Para novos componentes, crie classes seguindo o padrão `.component-neomedi`

## Componentes

### Botões Específicos (Recomendado)

#### PrimaryButton
```tsx
import { PrimaryButton } from '@/components';

<PrimaryButton size="md" fullWidth>Sign In</PrimaryButton>
```

#### SecondaryButton
```tsx
import { SecondaryButton } from '@/components';

<SecondaryButton size="sm">Cancel</SecondaryButton>
```

#### SuccessButton
```tsx
import { SuccessButton } from '@/components';

<SuccessButton loading>Salvando...</SuccessButton>
```

#### DangerButton
```tsx
import { DangerButton } from '@/components';

<DangerButton size="sm">Delete</DangerButton>
```

### BaseButton (Genérico)
```tsx
import { BaseButton } from '@/components';

// Uso básico
<BaseButton variant="primary" size="md">Click me</BaseButton>

// Botão de largura total
<BaseButton variant="dark" size="md" fullWidth>Sign In</BaseButton>

// Botão com loading
<BaseButton variant="success" loading>Salvando...</BaseButton>
```

**Props:**
- `variant?: string` - Cor do botão (primary, secondary, success, danger, warning, info, light, dark, outline-*)
- `size?: 'sm' | 'md' | 'lg'` - Tamanho do botão (padrão: 'md')
- `fullWidth?: boolean` - Largura total
- `loading?: boolean` - Estado de carregamento
- `disabled?: boolean` - Estado desabilitado
- `onClick?: () => void` - Função chamada ao clicar

### GoogleButton
```tsx
import { GoogleButton } from '@/components';

<GoogleButton onClick={() => console.log('Google clicked')} />
```

**Props:**
- `onClick?: () => void` - Função chamada ao clicar
- `disabled?: boolean` - Estado desabilitado
- `className?: string` - Classes CSS adicionais
- `children?: React.ReactNode` - Texto do botão (padrão: "Continue with Google") 