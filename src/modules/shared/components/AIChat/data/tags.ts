import type { Tag } from '../types';

export const recordTags: Tag[] = [
  { 
    id: '1', 
    label: 'Análise de Exames', 
    prompt: 'Pode analisar os exames recentes deste paciente e identificar pontos relevantes?' 
  },
  { 
    id: '2', 
    label: 'Interações Medicamentosas', 
    prompt: 'Quais são as possíveis interações medicamentosas entre os medicamentos prescritos?' 
  },
  { 
    id: '3', 
    label: 'Histórico', 
    prompt: 'Pode fazer um resumo do histórico médico deste paciente?' 
  },
  { 
    id: '4', 
    label: 'Diagnóstico Diferencial', 
    prompt: 'Com base nos sintomas e exames, quais diagnósticos diferenciais devem ser considerados?' 
  }
];

export const workspaceTags: Tag[] = [
  { 
    id: '1', 
    label: 'Técnicas Cirúrgicas', 
    prompt: 'Pode explicar as técnicas cirúrgicas mais recentes para este tipo de procedimento?' 
  },
  { 
    id: '2', 
    label: 'Protocolos Clínicos', 
    prompt: 'Quais são os protocolos clínicos atuais para este tipo de tratamento?' 
  },
  { 
    id: '3', 
    label: 'Evidências Científicas', 
    prompt: 'Quais são as evidências científicas mais recentes sobre este tema?' 
  },
  { 
    id: '4', 
    label: 'Diretrizes', 
    prompt: 'Quais são as diretrizes atuais para manejo deste tipo de caso?' 
  }
];
