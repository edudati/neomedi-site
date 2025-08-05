import { useNavigate } from 'react-router-dom';
import styles from '../pages/home/index.module.css';

const RecordsButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/workspace');
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-link btn-md ${styles.recordsButton}`}
      title="Prontuários - Voltar para lista de pacientes"
      aria-label="Voltar para lista de pacientes"
    >
      <i className="bi bi-file-earmark-text-fill fs-4"></i>
    </button>
  );
};

export default RecordsButton; 