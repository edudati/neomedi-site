import styles from '../pages/home/index.module.css';

const RecordsButton = () => {
  return (
               <button
        className={`btn btn-link btn-md ${styles.recordsButton}`}
        title="Prontuários"
        aria-label="Acessar prontuários"
      >
               <i className="bi bi-file-earmark-text-fill fs-4"></i>
     </button>
  );
};

export default RecordsButton; 