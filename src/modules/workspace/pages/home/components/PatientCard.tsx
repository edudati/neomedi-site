import React from "react";
import styles from "./PatientCard.module.css";

interface PatientCardProps {
  name: string;
  phone: string;
  email: string;
  age: string;
  lastVisit?: string;
  avatarUrl?: string;
  tags?: string[];
  onClick?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  name,
  phone,
  email,
  age,
  lastVisit,
  avatarUrl: _avatarUrl,
  tags: _tags = [],
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {/* Informações em uma linha */}
      <div className={styles.info}>
        <div className={styles.row}>
          <div className={styles.nameSection}>
            <i className="bi bi-person-fill me-1" /> {name}
          </div>
          <div className={styles.ageSection}>
            <i className="bi bi-calendar3 me-1" /> {age}
          </div>
          {lastVisit && (
            <div className={styles.lastVisitSection}>
              <i className="bi bi-journal-text me-1" /> {lastVisit}
            </div>
          )}
          <div className={styles.contactSection}>
            <i className="bi bi-envelope-fill me-1" /> {email}
          </div>
          <div className={styles.phoneSection}>
            <i className="bi bi-telephone-fill me-1" /> {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
