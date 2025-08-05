import React from "react";
import styles from "./SearchBox.module.css";

const SearchBox: React.FC = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Encontre o Prontuário</label>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Digite o nome do paciente"
          className={styles.input}
        />
        <button className={styles.button} aria-label="Buscar">
          <i className="bi bi-search" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
