import { Link } from "react-router-dom";
import UserDropdown from "../../../components/UserDropdown"; 
import PatientButton from "../../../components/PatientButton";
import RecordsButton from "../../../components/RecordsButton";
import styles from "../index.module.css";

interface LeftPaneHeaderProps {
  onAddPatient?: () => void;
}

const LeftPaneHeader = ({ onAddPatient }: LeftPaneHeaderProps) => {
  return (
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
        <PatientButton onClick={onAddPatient} />
      </div>
    </div>
  );
};

export default LeftPaneHeader;
