import React from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBox = ({ searchTerm, onSearchChange }: SearchBoxProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Encontre o Prontuário</label>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Digite o nome do paciente"
          className={styles.input}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className={styles.button} aria-label="Buscar">
          <i className="bi bi-search" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
