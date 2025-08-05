import styles from '../pages/home/index.module.css';

interface PatientButtonProps {
  onClick?: () => void;
}

const PatientButton = ({ onClick }: PatientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-link btn-md ${styles.patientButton}`}
      title="Adicionar paciente"
      aria-label="Adicionar novo paciente"
    >
      <i className="bi bi-person-plus-fill fs-4"></i>
    </button>
  );
};

export default PatientButton; 