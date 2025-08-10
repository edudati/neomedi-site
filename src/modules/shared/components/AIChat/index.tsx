import React, { useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { TagCloud } from './components/TagCloud';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import type { AIChatProps, Message, Tag } from './types';
import styles from './styles.module.css';

// Mock data para demonstrar o layout
const mockMessages = [
  {
    id: 1,
    type: 'user' as const,
    content: 'Olá! Pode me ajudar a analisar este prontuário?',
    timestamp: new Date('2025-01-08T10:30:00')
  },
  {
    id: 2,
    type: 'ai' as const,
    content: 'Claro! Estou aqui para ajudar você a analisar prontuários médicos. Posso revisar informações, sugerir diagnósticos diferenciais, ou esclarecer dúvidas sobre medicações. Em que posso ajudá-lo especificamente?',
    timestamp: new Date('2025-01-08T10:30:15')
  }
];

const AIChat: React.FC<AIChatProps> = ({ 
  context, 
  recordId, 
  tags,
  placeholder 
}) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // TODO: Implementar envio da mensagem
    console.log('Enviando mensagem:', inputValue);
    setInputValue('');
    setIsTyping(true);
    
    // Simular resposta da IA
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleTagClick = (tag: Tag) => {
    setInputValue(tag.prompt);
  };

  const isRecordContext = context === 'records';
  const title = isRecordContext ? "Assistente do Prontuário" : "Assistente Médico";
  const defaultPlaceholder = isRecordContext 
    ? "Digite sua pergunta sobre o prontuário..." 
    : "Digite sua dúvida sobre procedimentos, técnicas...";

  return (
    <div className={styles.chatContainer}>
      <ChatHeader title={title} />
      
      {tags && tags.length > 0 && (
        <TagCloud 
          tags={tags} 
          onTagClick={handleTagClick} 
        />
      )}
      
      <MessageList 
        messages={messages}
        isTyping={isTyping}
      />
      
      <InputArea 
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        placeholder={placeholder || defaultPlaceholder}
      />
    </div>
  );
};

export default AIChat;
