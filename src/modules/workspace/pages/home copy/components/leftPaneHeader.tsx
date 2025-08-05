import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "../../../components/UserDropdown"; 
import PatientButton from "../../../components/PatientButton";
import RecordsButton from "../../../components/RecordsButton";
import styles from "../index.module.css";

const LeftPaneHeader: React.FC = () => {
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
        <PatientButton />
      </div>
    </div>
  );
};

export default LeftPaneHeader;
