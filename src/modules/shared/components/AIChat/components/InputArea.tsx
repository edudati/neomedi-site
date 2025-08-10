import React from 'react';
import styles from '../styles.module.css';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Digite sua mensagem...",
  disabled = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputContainer}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={styles.messageInput}
          rows={1}
          disabled={disabled}
        />
        <button 
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className={styles.sendButton}
          title="Enviar mensagem"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
      
      <div className={styles.disclaimer}>
        <i className="bi bi-info-circle me-1"></i>
        As respostas são sugestões educacionais. Sempre consulte literatura médica atualizada.
      </div>
    </div>
  );
};
