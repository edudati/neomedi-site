import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="d-flex gap-1">
      <Link
        to="/clients"
        className="btn btn-outline-primary btn-sm"
        title="Adicionar paciente"
        aria-label="Adicionar novo paciente"
      >
        <i className="bi bi-person-plus-fill"></i>
      </Link>
      
      <button
        className="btn btn-outline-secondary btn-sm"
        title="Prontuários"
        aria-label="Acessar prontuários"
      >
        <i className="bi bi-file-earmark-text"></i>
      </button>
    </div>
  );
};

export default QuickActions; 