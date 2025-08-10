export type ChatContext = 'records' | 'workspace';

export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface Tag {
  id: string;
  label: string;
  prompt: string;
}

export interface AIChatProps {
  context: ChatContext;
  recordId?: string;
  tags?: Tag[];
  placeholder?: string;
}
