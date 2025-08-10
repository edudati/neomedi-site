import React from 'react';
import styles from '../styles.module.css';
import type { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
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
  );
};
