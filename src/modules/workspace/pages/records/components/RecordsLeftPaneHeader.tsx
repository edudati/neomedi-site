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
      <div style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
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
              cursor: hasRecord ? 'pointer' : 'not-allowed'
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
