// ===== CONSTANTES DE ESTILO NEOMEDI =====

export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  dark: '#343a40',
  light: '#f8f9fa',
  textPrimary: '#212529',
  textSecondary: '#6c757d',
  textMuted: '#adb5bd'
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
} as const;

export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem'
} as const;

export const BORDER_RADIUS = {
  sm: '8px',
  md: '15px',
  lg: '20px',
  full: '50%'
} as const;

export const SHADOWS = {
  sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
  md: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  lg: '0 1rem 3rem rgba(0, 0, 0, 0.175)',
  xl: '0 1.5rem 4rem rgba(0, 0, 0, 0.2)'
} as const;

export const BREAKPOINTS = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px'
} as const;

// Classes CSS personalizadas
export const CSS_CLASSES = {
  // Gradientes
  bgGradientPrimary: 'bg-gradient-primary',
  bgGradientSecondary: 'bg-gradient-secondary',
  bgGradientSuccess: 'bg-gradient-success',
  bgGradientWarning: 'bg-gradient-warning',
  
  // Componentes
  authCard: 'auth-card',
  btnNeomedi: 'btn-neomedi',
  formControlNeomedi: 'form-control-neomedi',
  iconCircle: 'icon-circle',
  separator: 'separator',
  linkNeomedi: 'link-neomedi'
} as const;

// Tipos para TypeScript
export type ColorKey = keyof typeof COLORS;
export type GradientKey = keyof typeof GRADIENTS;
export type SpacingKey = keyof typeof SPACING;
export type BorderRadiusKey = keyof typeof BORDER_RADIUS;
export type ShadowKey = keyof typeof SHADOWS;
export type BreakpointKey = keyof typeof BREAKPOINTS;
export type CssClassKey = keyof typeof CSS_CLASSES; 