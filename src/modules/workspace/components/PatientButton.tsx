import { Link } from 'react-router-dom';
import styles from '../pages/home/index.module.css';

const PatientButton = () => {
  return (
               <Link
        to="/clients"
        className={`btn btn-link btn-md ${styles.patientButton}`}
        title="Adicionar paciente"
        aria-label="Adicionar novo paciente"
      >
       <i className="bi bi-person-plus-fill fs-4"></i>
     </Link>
  );
};

export default PatientButton; 