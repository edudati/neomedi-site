import { Link } from "react-router-dom";
import UserDropdown from "../../../components/UserDropdown"; 
import PatientButton from "../../../components/PatientButton";
import RecordsButton from "../../../components/RecordsButton";
import PatientHeader from "./PatientHeader";
import RecordsSummary from "./RecordsSummary";
import styles from "../index.module.css";

interface RecordsLeftPaneHeaderProps {
  onAddRecord: () => void;
  onAddVisit?: () => void;
  hasRecord?: boolean;
}

const RecordsLeftPaneHeader = ({ onAddRecord, onAddVisit, hasRecord }: RecordsLeftPaneHeaderProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.leftPaneHeader}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <Link to="/" className={styles.logoLink}>
            <img
              src="/src/images/logo-full.png"
              alt="Neomedi"
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Botões independentes - ordem: dropdown, profile, add paciente */}
        <div className={styles.buttonsContainer}>
          <UserDropdown />
          <RecordsButton />
          <PatientButton />
        </div>
      </div>

      {/* Botões Adicionar */}
      <div style={{ 
          padding: '0.75rem 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          gap: '0.5rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
        <button
          className="btn btn-link"
          title="Adicionar Exame"
          aria-label="Adicionar novo exame"
          style={{ 
            color: hasRecord ? '#dc3545' : '#6c757d',
            padding: '0.5rem',
            opacity: hasRecord ? 1 : 0.5,
            cursor: hasRecord ? 'pointer' : 'not-allowed',
            flex: 1
          }}
          disabled={!hasRecord}
        >
          <i className="bi bi-heart-pulse-fill fs-4"></i>
        </button>
        <button
          className="btn btn-link"
          title="Adicionar Acompanhamento"
          aria-label="Adicionar novo acompanhamento"
          style={{ 
            color: hasRecord ? '#fd7e14' : '#6c757d',
            padding: '0.5rem',
            opacity: hasRecord ? 1 : 0.5,
            cursor: hasRecord ? 'pointer' : 'not-allowed',
            flex: 1
          }}
          disabled={!hasRecord}
        >
          <i className="bi bi-stopwatch-fill fs-4"></i>
        </button>
        {onAddVisit && (
          <button
            onClick={onAddVisit}
            className="btn btn-link"
            title="Adicionar Atendimento"
            aria-label="Adicionar novo atendimento"
            style={{ 
              color: hasRecord ? '#198754' : '#6c757d',
              padding: '0.5rem',
              opacity: hasRecord ? 1 : 0.5,
              cursor: hasRecord ? 'pointer' : 'not-allowed',
              flex: 1
            }}
            disabled={!hasRecord}
          >
            <i className="bi bi-calendar-plus-fill fs-4"></i>
          </button>
        )}
      </div>

      {/* Detalhes do paciente abaixo do header */}
      <PatientHeader />
      {hasRecord && <RecordsSummary />}
    </div>
  );
};

export default RecordsLeftPaneHeader;
