const ProfessionalDashboard = () => {
  return (
    <div>
      <h1 className="display-4 mb-4">Dashboard Profissional</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Atendimento</h5>
              <p className="card-text">Gestão de pacientes e consultas.</p>
              <ul className="list-unstyled">
                <li>• Agenda de consultas</li>
                <li>• Prontuários eletrônicos</li>
                <li>• Prescrições</li>
                <li>• Histórico de pacientes</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recursos Clínicos</h5>
              <p className="card-text">Ferramentas para prática clínica.</p>
              <ul className="list-unstyled">
                <li>• Teleconsulta</li>
                <li>• Resultados de exames</li>
                <li>• Protocolos clínicos</li>
                <li>• Comunicação com equipe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalDashboard
