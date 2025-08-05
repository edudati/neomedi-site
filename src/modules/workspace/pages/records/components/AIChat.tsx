import { useState } from "react";
import styles from "./AIChat.module.css";

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
  },
  {
    id: 3,
    type: 'user' as const,
    content: 'O paciente tem histórico de hipertensão e está tomando Losartana. Quais são as possíveis interações medicamentosas que devo considerar?',
    timestamp: new Date('2025-01-08T10:31:00')
  },
  {
    id: 4,
    type: 'ai' as const,
    content: 'Excelente pergunta! Com Losartana (inibidor do receptor de angiotensina), as principais interações a considerar são:\n\n• **Anti-inflamatórios (AINEs)**: Podem reduzir a eficácia e aumentar risco de lesão renal\n• **Suplementos de potássio**: Risco de hipercalemia\n• **Diuréticos poupadores de potássio**: Mesmo risco de hipercalemia\n• **Lítio**: Losartana pode aumentar níveis séricos\n\nRecomendo monitorar função renal e níveis de potássio regularmente.',
    timestamp: new Date('2025-01-08T10:31:30')
  }
];

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages] = useState<Message[]>(mockMessages);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header do Chat */}
      <div className={styles.chatHeader}>
        <div className={styles.aiInfo}>
          <div className={styles.aiAvatar}>
            <i className="bi bi-robot"></i>
          </div>
          <div className={styles.aiDetails}>
            <h6>Assistente Médico IA</h6>
            <span className={styles.status}>
              <span className={styles.statusDot}></span>
              Online
            </span>
          </div>
        </div>
        <button className={styles.settingsButton} title="Configurações do Chat">
          <i className="bi bi-gear"></i>
        </button>
      </div>

      {/* Área de Mensagens */}
      <div className={styles.messagesArea}>
        {messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${styles[message.type]}`}>
            <div className={styles.messageContent}>
              <div className={styles.messageText}>
                {message.content.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < message.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className={styles.messageTime}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicador de digitação */}
        {isTyping && (
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área de Input */}
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta sobre o prontuário..."
            className={styles.messageInput}
            rows={1}
            style={{ backgroundColor: '#fff' }}
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={styles.sendButton}
            title="Enviar mensagem"
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
        
        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          <i className="bi bi-info-circle me-1"></i>
          As respostas são sugestões educacionais. Sempre consulte literatura médica atualizada.
        </div>
      </div>
    </div>
  );
};

export default AIChat;