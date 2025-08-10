import React from 'react';
import styles from '../styles.module.css';

interface ChatHeaderProps {
  title: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.aiInfo}>
        <div className={styles.aiAvatar}>
          <i className="bi bi-robot"></i>
        </div>
        <div className={styles.aiDetails}>
          <h6>{title}</h6>
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
  );
};
