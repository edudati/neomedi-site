import { Link } from "react-router-dom";
import UserDropdown from "../../../components/UserDropdown"; 
import PatientButton from "../../../components/PatientButton";
import RecordsButton from "../../../components/RecordsButton";
import RecordsPatientDetails from "./RecordsPatientDetails";
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
        <button
          onClick={onAddRecord}
          className="btn btn-link"
          title="Adicionar Prontuário"
          aria-label="Adicionar novo prontuário"
          style={{ color: '#0d6efd', padding: '0.5rem' }}
        >
          <i className="bi bi-file-earmark-plus-fill fs-4"></i>
        </button>
        
        {hasRecord && onAddVisit && (
          <button
            onClick={onAddVisit}
            className="btn btn-link"
            title="Adicionar Atendimento"
            aria-label="Adicionar novo atendimento"
            style={{ color: '#198754', padding: '0.5rem' }}
          >
            <i className="bi bi-calendar-plus-fill fs-4"></i>
          </button>
        )}
      </div>

      {/* Detalhes do paciente abaixo do header */}
      <RecordsPatientDetails />
    </div>
  );
};

export default RecordsLeftPaneHeader;
